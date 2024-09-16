import { getCookie } from "cookies-next"

const getProductFromCart = async () => {
    const product = await fetch("http://localhost:8000/api/get-product-from-cart", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        },
        cache: "no-store"
    })
    if (product.ok) {
        const product_response = await product.json()
        return {
            "status": 200,
            "message": product_response
        }
    } else {
        return {
            "status": 400,
            "message": "There is no product!"
        }
    }
}
export default getProductFromCart