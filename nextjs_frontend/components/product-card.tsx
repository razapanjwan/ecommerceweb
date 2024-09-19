"use client"
import Image from "next/image"
import image1 from "../public/event1.webp"
import Link from "next/link"
import getImage from "@/actions/getimage"
import { useEffect, useState } from "react"
import ImageLoader from "./imageloader"

const ProductCard = ({ product, image_id }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [imageLoader, setImageLoader] = useState(true)
    async function serviceGetImage(image_id: number) {
        try {
            const imageBlob: any = await getImage(image_id)
            const url = URL.createObjectURL(imageBlob);
            setImageUrl(url);
        } catch (error) {
            console.error(error.message)
        } finally {
            setImageLoader(false)
        }

    }
    useEffect(() => {
        serviceGetImage(image_id)
    }, [])
    return (
        <div className="md:w-1/4 w-full m-8 md:m-0  bg-white rounded-lg overflow-hidden shadow-lg ">
            <div className="relative">
                {
                    imageLoader ? <ImageLoader /> :
                        <Image className="w-full" src={imageUrl} alt="Product Image" width={100} height={100} />
                }
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{product.product_name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.product_description}.</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{product.product_price}.00$</span>
                    <Link href={`/product/${product.product_id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ProductCard