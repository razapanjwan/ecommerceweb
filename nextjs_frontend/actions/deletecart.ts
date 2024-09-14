import { getCookie } from "cookies-next"

const deleteCart = async (cart_id: number) => {
    const deletedCart = await fetch(`http://localhost:8000/api/delete-cart?cart_id=${cart_id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        }
    })
    if (deletedCart.ok) {
        const deletedCartResponse = await deletedCart.json()
        return deletedCartResponse
    } else {
        return { "message": "Could not delete cart!" }
    }
}
export default deleteCart