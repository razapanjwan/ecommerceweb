"use client"
import getProduct from "@/actions/getproduct";
import addToCart from "@/actions/addtocart";
import { useEffect, useState } from "react";
import Image from "next/image";
import Slider1 from "@/public/123.png"
import { ShoppingBag } from "lucide-react";
import { toast } from "react-toastify"
import { getCookie, setCookie } from "cookies-next";
import PageLoader from "@/components/page-loader";
import getImage from "@/actions/getimage";


const product = ({ params }: { params: { id: number } }) => {
    const [product, setProduct] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")
    const [show, setShow] = useState(true)
    const sizes = ["large", "small", "medium"]
    const [selectedDiv, setSelectedDiv] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageLoader, setImageLoader] = useState(true)
    async function productss() {
        const products: any = await getProduct(params.id)
        console.log(products);
        setProduct(products)
    }
    const eventAddToCart = async () => {


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

        try {
            let prd = await getProduct(params.id)
            const cart_item = {
                "total_cart_products": quantity,
                "product_total": prd.product_price * quantity,
                "product_size": size
            }
            if (size) {
                if (quantity > 0 && quantity !== 0) {
                    let cart = await addToCart(params.id, cart_item)
                    console.log(cart);
                    if (cart.status == 200) {
                        toast.success("Added to Cart!")
                    } else {
                        toast.error(cart.message)
                    }
                } else if (quantity < 0) {
                    toast.error("Cart can not be negative!")
                } else if (quantity == 0) {
                    toast.error("Add item to your cart!")
                } else {
                    throw new Error("CART ERROR")
                }

            } else {
                let cart = await addToCart(params.id, cart_item)
                toast.error("Enter the value of size")
                if (cart.status == 400) {
                    setShow(true)
                }
            }

        } catch (error) {
            throw new Error("Error adding to cart")
        }
    }
    useEffect(() => {
        async function fetchProducts() {
            try {
                await productss()
                // await serviceGetI
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
            return (
                setShow(true)
            )
        }
        fetchProducts();
        setCookie("quantity", quantity)
    }, []);
    return (
        <>
            {
                loading ? <PageLoader /> :
                    error ? <div>Error: {error.message}</div> :
                        <section className="bg-[#fcfcfc] p-16 flex flex-col gap-[5rem]">
                            <div className="flex flex-col lg:flex-row gap-[79px] ">
                                <Image src={Slider1} alt="product Image" className="w-[582px] h-[626px]" />
                                <div className={`mt-[4rem] flex-col gap-[2.5rem]  flex`}>
                                    <div>
                                        <h3 className="font-normal text-[1.625rem] leading-[35px] tracking-[.03em] text-[#212121] capitalize">{product.product_name}</h3>
                                        <h4 className="font-semibold text-[1.3rem] opacity-[.3] capitalize">sweater</h4>
                                    </div>
                                    <div>
                                        <h5 className="text-[#212121] uppercase text-[.9rem] tracking-[.05em] leading-[16px] font-bold ">select size</h5>
                                        <ul className="flex gap-4 capitalize mt-[1rem] w-full">
                                            {
                                                sizes.map((size, index) => {
                                                    return (
                                                        <>
                                                            <li key={index} className={`font-bold flex justify-center items-center rounded-md p-2 cursor-pointer text-base text-[#666] hover:shadow-xl hover:bg-gray-300 ${selectedDiv === index ? "bg-yellow-700 text-white" : "bg-white"} `} onClick={() => { setSize(size); setSelectedDiv(index) }}>
                                                                {size}
                                                            </li>
                                                        </>
                                                    )

                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="flex gap-[2rem] items-center">
                                        <h5 className="capitalize text-[#212121] font-semibold text-base">quantity:</h5>
                                        <div className="flex gap-4 items-center">
                                            <div className="border-[2px] border-[#f1f1f1] bg-[#f1f1f1] rounded-full flex justify-center items-center cursor-pointer w-[40px] h-[40px]" onClick={() => setQuantity((qut) => qut -= 1)}>-</div>
                                            <div>{quantity}</div>
                                            <div className="border-[2px] border-black rounded-full flex justify-center items-center w-[40px] h-[40px] cursor-pointer" onClick={() => setQuantity((qut) => qut += 1)}>+</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <button className="flex capitalize gap-2 items-center text-white bg-black py-4 px-6" onClick={() => { eventAddToCart(); }}>
                                            <ShoppingBag />
                                            <p className="font-medium text-base ">add to cart</p>
                                        </button>
                                        <p className="text-3xl font-semibold tracking-wider">{product.product_price}.00$</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold text-[1.4rem] tracking-[.03em] text-[#212121] pb-[3rem]">product information</h2>
                                <div className="flex gap-[6rem] mb-10">
                                    <h3 className="w-full font-bold text-base tracking-[.05em] text-[#666] uppercase">product details</h3>
                                    <p className="font-light text-base text-justify tracking-[.05em] text-[#212121] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                </div>
                                <div className="flex gap-[10rem] ">
                                    <h3 className="font-bold text-base tracking-[.05em] text-[#666] uppercase">product care</h3>
                                    <ul className="text-base font-bold text-[#212121] tracking-[.05em] text-justify list-disc">
                                        <li>Wash hand using cold water</li>
                                        <li>Do not use bleach</li>
                                        <li>Hang it to dry</li>
                                        <li>Iron on low temprature</li>
                                    </ul>
                                </div>
                            </div>
                        </section >
            }
        </>
    )
}
export default product