import { getCookie } from "cookies-next"

const getCart = async () => {
    const cart = await fetch("http://localhost:8000/api/get-cart", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        }
    })
    if (cart.ok) {
        const cart_response = await cart.json()
        return {
            "status": 200,
            "message": cart_response
        }
    } else {
        return {
            "status": 400,
            "message": "There is no cart"
        }
    }
}
export default getCart