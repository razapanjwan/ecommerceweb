import Image from "next/image"

const ProductComp = ({ image, heading, price }: any) => {
    return (
        <div className="w-fit mx-auto overflow-hidden">
            <Image src={image} alt="product image" className="transform transition-transform duration-500 ease-in-out scale-100 hover:scale-110 " />
            <div className="text-[#212121] font-semibold capitalize">
                <p className="mt-[0.5rem] leading-[24px] text-[1.1rem]">{heading}</p>
                <p className="mt-[0.5rem] leading-[24px] text-[1.3rem]">${price}</p>
            </div>
        </div>
    )
}

export default ProductComp