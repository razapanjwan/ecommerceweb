import { getCookie } from "cookies-next"

const getOrder = async (order_id: number) => {
    const order = await fetch(`http://localhost:8000/api/getorder?order_id=${order_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        }
    })
    if (order.ok) {
        const orderResponse = await order.json()
        return orderResponse
    } else {
        return { error: "Could not get Order!" }
    }

}
export default getOrder