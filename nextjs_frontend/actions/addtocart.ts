import { getCookie, setCookie } from "cookies-next"
const addToCart = async (product_id: number, cart_info) => {
    console.log(getCookie("access_token"));
    const cart_data = await fetch(`http://localhost:8000/api/addtocart?product_id=${product_id}`, {
        method: "POST",
        body: JSON.stringify(cart_info),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie("access_token")}`
        },
    })
    if (cart_data.ok) {
        const cartdata_response = await cart_data.json()
        setCookie("cart_id", cartdata_response.cart_id)
        return {
            "status": 200,
            "message": cartdata_response
        }
    } else {
        return {
            "status": 400,
            "message": "There is a error!"
        }
    }
}


export default addToCart