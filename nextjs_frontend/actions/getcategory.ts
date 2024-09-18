const getCategory = async (category_slug: string) => {
    const category = await fetch(`http://localhost:8000/api/getcategory?category_slug=${category_slug}`, {
        method: "GET"
    })
    if (category.ok) {
        const categoryResponse = await category.json()
        return categoryResponse
    } else {
        return { error: "Could not get category" }
    }
}
export default getCategory