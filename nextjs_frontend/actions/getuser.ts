import { getCookie } from "cookies-next"

const getUser = async () => {
    const user = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`
        }
    })
    if (user.ok) {
        const user_response = await user.json()
        return {
            "status": 200,
            "message": user_response
        }
    } else {
        return {
            "status": 400,
            "message": "Error getting the user!"
        }
    }
}
export default getUser