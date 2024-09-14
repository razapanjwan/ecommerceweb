const getImageById = async (image_id: number) => {
    try {
        const image = await fetch(`http://localhost:8000/api/images/${image_id}`, {
            body: null,
            method: "GET",

        })

        let imageData = await image.json()
        const url = URL.createObjectURL(imageData);
        console.log(imageData, "imageData");

        return url
    } catch (error) {
        console.error(error)
    }
}
export default getImageById