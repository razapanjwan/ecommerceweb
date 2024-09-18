import Image from "next/image"
import image1 from "../public/event3.webp"
import updateCart from "@/actions/upadatecart"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash } from 'lucide-react';
import deleteCart from "@/actions/deletecart"
import getProductFromCart from "@/actions/getproductfromcart"



const CartProductCard = ({ product, serviceDeleteCart }) => {
    const [quantity, setQuantity] = useState(product.total_cart_products)
    const [totalPrice, setTotalPrice] = useState(product.product_total)
    const router = useRouter()
    const serviceUpdateCart = async (cart_id: number, type: string, product_price: number) => {
        try {
            const cartData = await updateCart(cart_id, type, product_price)
            if (type == "add") {
                setQuantity((qnt) => qnt + 1)
                setTotalPrice(cartData.message.product_total)
            } else if (type == "subtract") {
                setQuantity((qnt) => qnt - 1)
                setTotalPrice(cartData.message.product_total)
            }
            router.refresh()
            console.log(cartData.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (

        <div className="w-full" >
            <div className="bg-white rounded-lg shadow-md p-6 mb-4" >
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left font-semibold">Product</th>
                            <th className="text-left font-semibold">Size</th>
                            <th className="text-left font-semibold">Price</th>
                            <th className="text-left font-semibold">Quantity</th>
                            <th className="text-left font-semibold">Remove</th>
                            <th className="text-left font-semibold">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-4 w-fit">
                                <div className="flex items-center">
                                    <span className="font-semibold uppercase">{product.product_name}</span>
                                </div>
                            </td>
                            <td className="py-4">{product.product_size}</td>
                            <td className="py-4">{product.product_price}.00$</td>
                            <td className="py-4">
                                <div className="flex items-center">
                                    <button onClick={() => { serviceUpdateCart(product.cart_id, "subtract", product.product_price) }} className="border rounded-md py-2 px-4 mr-2">-</button>
                                    <span className="text-center w-8">{quantity}</span>
                                    <button onClick={() => { serviceUpdateCart(product.cart_id, "add", product.product_price) }} className="border rounded-md py-2 px-4 ml-2">+</button>
                                </div>
                            </td>
                            <td className="py-4"><button onClick={() => { serviceDeleteCart(product.cart_id) }}><Trash /></button></td>
                            <td className="py-4">{totalPrice}.00$</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    )
}
export default CartProductCard