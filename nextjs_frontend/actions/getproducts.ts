const getProducts = async () => {
    try {
        const products = await fetch("http://localhost:8000/api/getproducts", {
            method: "GET",
            // credentials: 'include',
            cache: "no-store"
        })
        if (products.ok) {
            console.log("function run");

            let productData = await products.json()
            console.log(productData);
            return productData
        }
    } catch (error) {
        throw error
    }
}

export default getProducts
