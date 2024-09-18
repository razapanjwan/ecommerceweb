import Image from "next/image"
import image1 from "../public/event1.webp"
import Link from "next/link"

const ProductCard = ({ product }) => {
    return (
        <div className="md:w-1/4 w-full m-8 md:m-0  bg-white rounded-lg overflow-hidden shadow-lg ">
            <div className="relative bg-gray-600">
                <Image className="w-full" src={image1} alt="Product Image" />
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