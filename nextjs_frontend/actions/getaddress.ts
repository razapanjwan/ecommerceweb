import { getCookie } from "cookies-next"

const getAddress = async (order_id: number) => {
    const address = await fetch(`http://localhost:8000/api/getaddress?order_id=${order_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        }
    })
    if (address.ok) {
        const addressResponse = await address.json()
        return addressResponse
    } else {
        return { error: "Could not get Address!" }
    }
}
export default getAddress