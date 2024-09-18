from fastapi import FastAPI,Depends,UploadFile,File,Request,Response
from fastapi.middleware.cors import CORSMiddleware
from ecomweb.database.database import create_all_tables,get_session 
from ecomweb.model.model import *
from ecomweb.service.service import *
from contextlib import asynccontextmanager
from sqlmodel import Session
from typing import Annotated
from fastapi import HTTPException
from datetime import timedelta
from ecomweb.settings.setting import *
from ecomweb.middlewares.middleware import authorize
import io
from fastapi.responses import StreamingResponse

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_all_tables()
    yield
    
app = FastAPI(lifespan=lifespan,title="ecommerce api with sqlmodel",version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/signup",response_model=UserRead,tags=["USER"])
def signup_users(session:Annotated[Session,Depends(get_session)],user_data:UserCreate) -> User:
    """
        This function is used to signup a new user.

        arguments:
            session: The database session.
            user_data: The user data to signup.

        returns:
            The newly created user object.
    """
    user_data.password = get_hash_password(user_data.password)
    user_data.confirm_password = get_hash_password(user_data.confirm_password)
    user = User.model_validate(user_data)
    return service_signup(session,user)

@app.post("/api/login",response_model=Token,tags=["USER"])
def login_user(request:Response,session:Annotated[Session,Depends(get_session)],form_data:OAuth2PasswordRequestForm = Depends()):
    """
        This function is used to login a user.

        arguments:
            session: The database session.
            form_data: The login form data.

        returns:
            The access token and refresh token.
    """
    user = authenticate_user(session,form_data.username,form_data.password)
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expire_time = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub":user.username},expires_delta=access_token_expire_time)

    refresh_token_expire_time = timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    refresh_token = create_refresh_token(data={"id":user.user_id}, expires_delta=refresh_token_expire_time)
    request.set_cookie(key="access_token",value=access_token)
    request.set_cookie(key="refresh_token",value=refresh_token)
    return Token(access_token=access_token,refresh_token=refresh_token,expires_in=access_token_expire_time,token_type="bearer")

@app.get("/logout/{user_id}",tags=["USER"])
def logout_user(response:Response,request:Request,session:Annotated[Session,Depends(get_session)],user:Annotated[User,Depends(get_current_user)],):
    user_loggedout = service_logout_user(session,user.user_id,response,request)
    return user_loggedout

@app.patch("/updateuser",tags=["USER"])
def update_user(session:Annotated[Session,Depends(get_session)],user_update:UserUpdate,user:Annotated[User,Depends(get_current_user)]):
    user = get_user_by_id(session,user.user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user_update.model_dump(exclude_unset = True)
    user.sqlmodel_update(user_data)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@app.delete("/deleteuser",tags=["USER"])
def delete_user(session:Annotated[Session, Depends(get_session)], user_id:int):
    user = get_user_by_id(session, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {
        "message":"User deleted"
    }

@app.get("/api/me")
def get_user(user:User = Depends(get_current_user)):
    return user

@app.post("/upload-file", tags=["Image"])
async def get_file(file: Annotated[UploadFile, File(title="Product Image")], session: Annotated[Session, Depends(get_session)], user: Annotated[User, Depends(get_current_user)]):
    if file.content_type.startswith("image/"):
        try:
            image_data = await file.read()
            image = Image(
                filename=file.filename,
                content_type=file.content_type,
                image_data=image_data
            )
            session.add(image)
            session.commit()
            session.refresh(image)
            return {"id": image.id, "filename": image.filename}
        except Exception as e:
            raise HTTPException(status_code=500, detail="An error occurred while saving the image.")
    else:
        raise HTTPException(status_code=400, detail="Invalid file type. Only images are allowed.")

@app.get("/api/image", tags=["Image"])
def read_image(image_id: int, session: Annotated[Session, Depends(get_session)]):
    image = session.get(Image, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    return StreamingResponse(io.BytesIO(image.image_data), media_type=image.content_type)


@app.post("/addproduct",response_model=ProductRead,tags=["PRODUCT"])
def add_product(session:Annotated[Session, Depends(get_session)], product_data:ProductCreate,user:Annotated[User,Depends(isadmin)]):
    product_info = Product.model_validate(product_data)
    product = product_add(session, product_info,user)
    return product

@app.get("/api/getproduct",response_model=Product,tags=["PRODUCT"])
def get_product_from_id(session:Annotated[Session, Depends(get_session)], product_id:int):
    product = get_product_by_id(session,product_id)
    return product  

@app.get("/api/getproducts",response_model=list[Product],tags=["PRODUCT"])
def get_products(session:Annotated[Session, Depends(get_session)]):
    product = get_all_products(session)
    return product

@app.post("/createcategory",response_model=CategoryRead,tags=["CATEGORY"])
def create_category(session:Annotated[Session,Depends(get_session)],category_data:CategoryCreate,user:Annotated[User,Depends(isadmin)]):
    category_info = Category.model_validate(category_data)
    category = service_create_category(session, category_info)
    return category


@app.post("/productcategoryassociation",response_model=CategoryProductAssociation,tags=["CATEGORY"])
def create_productsubcategoryassociation(session:Annotated[Session,Depends(get_session)],category_product_association_data:CategoryProductAssociation,user:Annotated[User,Depends(isadmin)]) -> CategoryProductAssociation:
    category_product_association_info = CategoryProductAssociation.model_validate(category_product_association_data)
    category_product_association = service_create_productsubcategoryassociation(session, category_product_association_info) 
    return category_product_association

@app.get("/api/getproductbycategory",response_model=list[Product],tags=["CATEGORY"])
def get_product_from_category(session:Annotated[Session,Depends(get_session)],category_id):
    return service_get_product_from_category(session,category_id)

@app.get("/api/getcategory")
def get_category(category_slug:str,session:Annotated[Session,Depends(get_session)]):
    return service_get_category(session=session,category_slug=category_slug)

@app.post("/api/createorder",tags=["ORDER"])
def create_order(order_data:OrderCreate,address_data:AddressCreate,payment_data:PaymentCreate,user:Annotated[User , Depends(get_current_user)],session:Annotated[Session, Depends(get_session)]) -> OrderRead:
    
    order_info = Order.model_validate(order_data)
    order = service_create_order(session, order_info,user)
    service_create_address(session,address_data,order.order_id,user)
    service_create_payment(session,user,order.order_id,payment_data)
    return order

@app.patch("/updateorder",tags=["ORDER"])
def update_order(order_update:OrderUpdate,order_id, user:Annotated[User, Depends(get_current_user)], session:Annotated[Session, Depends(get_session)]):
    order = service_get_order_by_id(session,order_id)
    if order:
        order_data = order_update.model_dump(exclude_unset = True)
        order.sqlmodel_update(order_data)
        session.add(order)
        session.commit()
        session.refresh(order)
        if order.order_status == "cancelled" or order.order_status == "delivered":
            return service_order_update(session,user,order_id)
        return order 

@app.delete("/deleteorder",tags=["ORDER"])
def delete_order(order_id, user:Annotated[User, Depends(get_current_user)], session:Annotated[Session, Depends(get_session)]):
    deleted_order = service_delete_order(session,order_id)
    return deleted_order

@app.get("/api/getorder",tags=["ORDER"])
def get_order_by_id(order_id:int,session:Annotated[Session,Depends(get_session)],user:Annotated[User,Depends(get_current_user)]):
    order = service_get_order_by_id(session,order_id,user)
    return order

@app.post("/api/addtocart",response_model=CartRead,tags=["CART"])
def add_to_cart(product_id:int,cart_info:CartCreate,session:Annotated[Session,Depends(get_session)],user:Annotated[User, Depends(get_current_user)]):
    cart_data = Cart.model_validate(cart_info)
    cart = service_add_to_cart(session,cart_data,user,product_id)
    return cart

@app.get("/api/get-product-from-cart",tags=["CART"])
def get_product_from_cart(session:Annotated[Session,Depends(get_session)],user:Annotated[User, Depends(get_current_user)]):
    cart_items = service_get_product_from_cart(session, user)

    response = [
        {
            "cart_id": cart.cart_id,
            "total_cart_products": cart.total_cart_products,
            "product_total": cart.product_total,
            "product_size": cart.product_size,
            "product_id": product.product_id,
            "product_name": product.product_name,
            "product_description": product.product_description,
            "product_price": product.product_price,
            "product_slug": product.product_slug,
            "image_id": product.image_id  
        }
        for cart, product in cart_items
    ]

    return response

@app.put("/api/update",tags=["CART"])
def update_cart(cart_id:int,type:str,product_price:int,user:User = Depends(get_current_user),session:Session=Depends(get_session)):
    return service_update_cart(cart_id,type,user,session,product_price)

@app.delete("/deletepayment",tags=["ORDER"])
def delete_payment(session:Annotated[Session,Depends(get_session)],order_id:int):
    return service_delete_payment(session,order_id)

@app.delete("/deleteorderitem",tags=["ORDER"])
def delete_order_item(session:Annotated[Session,Depends(get_session)],order_id:int):
    return service_delete_order_item(session,order_id)

@app.delete("/api/delete-cart",tags=["CART"])
def delete_cart(cart_id:int,session:Session = Depends(get_session),user:User = Depends(get_current_user)):
    return service_delete_cart(cart_id,session,user)

@app.get("/api/getorderitem")
def get_orderitem(order_id:int,session:Session = Depends(get_session),user:User = Depends(get_current_user)):
    orderitems = service_get_orderitem(session,user,order_id)
    response = [
        {
            "orderitem_id": orderitem.orderitem_id,
            "total_cart_products": orderitem.total_cart_products,
            "product_total": orderitem.product_total,
            "product_size": orderitem.product_size,
            "product_id": product.product_id,
            "product_name": product.product_name,
            "product_description": product.product_description,
            "product_price": product.product_price,
            "product_slug": product.product_slug,
            "image_id": product.image_id,
            "order_id":orderitem.order_id
        }
        for orderitem, product in orderitems
    ]

    return response

@app.get("/api/getaddress")
def get_address(order_id:int,session:Session = Depends(get_session),user:User = Depends(get_current_user)):
    return service_get_address(session,user,order_id)
