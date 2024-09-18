const getImage = async (image_id: number) => {
    const image = await fetch(`http://localhost:8000/api/image?image_id=${image_id}`, {
        method: "GET"
    })
    if (image.ok) {
        const imageResponse = await image.blob()
        return imageResponse
    } else {
        return { error: "Could not get Image!" }
    }
}
export default getImage