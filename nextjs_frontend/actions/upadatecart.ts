import { getCookie } from "cookies-next"

const updateCart = async (cart_id: number, type: string, product_price: number) => {
    const updatedCart = await fetch(`http://localhost:8000/api/update?cart_id=${cart_id}&type=${type}&product_price=${product_price}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        }
    })
    if (!updatedCart.ok) {
        return { "status": 404, "message": await updatedCart.json() }
    }
    const updatedCartData = await updatedCart.json()
    return {
        "status": 200,
        "message": updatedCartData
    }

}
export default updateCart