"use client"
import getImage from "@/actions/getimage";
import getProducts from "@/actions/getproducts";
import Image from "next/image"
import { useEffect, useState } from "react";
import ImageLoader from "./imageloader";

const ProductComp = ({ image_id, heading, price, setLoader }: any) => {

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
        <div className="w-fit overflow-hidden flex flex-col justify-center items-center md:justify-start md:items-start mx-10 md:mx-auto">
            {imageLoader ?
                <ImageLoader />
                :
                <Image src={imageUrl} alt="product image" className="transform transition-transform duration-500 ease-in-out scale-100 hover:scale-110 w-auto h-auto" width={50} height={50} />
            }
            <div className="text-[#212121] font-semibold capitalize mt-4">
                <p className="mt-[0.5rem] leading-[24px] text-[1.1rem]">{heading}</p>
                <p className="mt-[0.5rem] leading-[24px] text-[1.3rem]">${price}</p>
            </div>

        </div>
    )
}

export default ProductComp