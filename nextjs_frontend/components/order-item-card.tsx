"use client"
import getImage from "@/actions/getimage";
import Image from "next/image"
import { useEffect, useState } from "react";
import ImageLoader from "./imageloader";


const OrderItem = ({ item, image_id }) => {
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
        <div className="w-full md:px-6 px-2 pb-5 justify-between items-center gap-8 inline-flex border-b border-gray-300">
            <div className="justify-start items-center gap-6 flex md:pb-5">
                {
                    imageLoader ? <ImageLoader /> :
                        <Image className="object-cover w-[100px] h-[100px]" src={imageUrl} alt="order item image" width={100} height={100} />
                }
                <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                    <h5 className="text-gray-900 text-lg font-semibold leading-relaxed">{item.product_name}</h5>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">QTY: {item.total_cart_products}</h6>
                    <h4 className="text-gray-500 text-base font-normal leading-relaxed">SIZE: {item.product_size}</h4>
                </div>
            </div>
            <h4 className="text-right text-gray-900 text-lg font-medium leading-relaxed">{item.product_total}.00$</h4>
        </div>
    )
}
export default OrderItem