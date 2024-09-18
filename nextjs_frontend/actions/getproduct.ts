const getProduct = async (product_id: number) => {
    try {
        const product = await fetch(`http://localhost:8000/api/getproduct?product_id=${product_id}`, {
            method: "GET",
            cache: "no-store"
        })
        if (product.ok) {
            const data = await product.json()
            return data
        }
        throw new Error('Network response was not ok');
    } catch (error) {
        console.log(error)
    }
}
export default getProduct