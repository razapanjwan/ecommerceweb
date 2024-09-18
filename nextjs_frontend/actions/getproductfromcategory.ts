const getProductFromCategory = async (category_id: number) => {
    const productFromCategory = await fetch(`http://localhost:8000/api/getproductbycategory?category_id=${category_id}`, {
        method: "GET"
    })
    if (productFromCategory.ok) {
        const productFromCategoryResponse = await productFromCategory.json()
        return productFromCategoryResponse
    } else {
        return { error: "Could not get Products!" }
    }
}
export default getProductFromCategory