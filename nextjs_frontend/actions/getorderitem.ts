import { getCookie } from "cookies-next"

const getOrderItem = async (order_id: number) => {
    const orderItem = await fetch(`http://localhost:8000/api/getorderitem?order_id=${order_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        }
    })
    if (orderItem.ok) {
        const orderItemResponse = await orderItem.json()
        return orderItemResponse
    } else {
        return { error: "could not get orderitem!" }
    }
}
export default getOrderItem