"use client"
import getCart from "@/actions/getcart"
import CartProductCard from "@/components/cart-product"
import getProduct from "@/actions/getproduct"
import { useEffect, useState } from "react"
import getProductFromCart from "@/actions/getproductfromcart"
import updateCart from "@/actions/upadatecart"
import deleteCart from "@/actions/deletecart"
import { toast } from "react-toastify"
import Link from "next/link"

const CartPage = ({ params }: { params: { user_id: number } }) => {
    const [products, setProducts] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const serviceGetCart = async () => {
        try {
            const productData = await getProductFromCart();
            setProducts(productData.message);
        } catch (error) {
            console.error(error.message);
        }
    };
    const serviceDeleteCart = async (cart_id: number) => {
        try {
            const deletedCart = await deleteCart(cart_id)
            console.log(deletedCart);
            if (deletedCart) {
                toast.success(deletedCart.message)
                serviceGetCart()
            } else {
                console.error('Failed to delete the cart item');
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    const totalPrice = products.reduce((acc, product) => {
        return acc + (product.product_price * product.total_cart_products);
    }, 0);
    useEffect(() => {
        serviceGetCart();
    }, []);


    const cartEmpty = products.length == 0
    const tax = 2
    const shipping = 1
    const subTotal = totalPrice + tax + shipping
    return (
        <>
            {
                cartEmpty ? <h1 className="font-bold text-7xl flex items-center justify-center h-[200px]">CART IS EMPTY</h1> :
                    <section>
                        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                        <div className="py-4">
                            <div className="container mx-auto px-4">
                                <div className="flex flex-row gap-4">
                                    <div className="w-full">
                                        {
                                            products && products.map((product, index) => {

                                                return (
                                                    <>
                                                        <CartProductCard product={product} serviceDeleteCart={serviceDeleteCart} />

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="md:w-1/4">
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                            <div className="flex justify-between mb-2">
                                                <span>Subtotal</span>
                                                <span>{totalPrice}.00$</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>Taxes</span>
                                                <span>{tax}.00$</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>Shipping</span>
                                                <span>{shipping}.00$</span>
                                            </div>

                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold">Total</span>
                                                <span className="font-semibold">{subTotal}.00$</span>
                                            </div>
                                            <Link href={`/checkout/${params.user_id}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</Link>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </section >
            }

        </>
    )
}
export default CartPage 