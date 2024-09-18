import { getCookie } from "cookies-next"

const createOrder = async (orderDetails) => {
    const order = await fetch("http://localhost:8000/api/createorder", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
    })
    if (order.ok) {
        const orderResponse = await order.json()
        return orderResponse
    } else {
        return { error: "Could not create order!" }
    }
}
export default createOrder