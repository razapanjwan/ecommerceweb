"use client"
import getCart from "@/actions/getcart"
import CartProductCard from "@/components/cart-product"
import getProduct from "@/actions/getproduct"
import { useEffect, useState } from "react"
import getProductFromCart from "@/actions/getproductfromcart"

const CartPage = () => {
    const [products, setProducts] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
        const serviceGetCart = async () => {
            try {
                const productData = await getProductFromCart();
                setProducts(productData.message);
            } catch (error) {
                console.error(error.message);
            }
        };
        serviceGetCart();
    }, [refreshFlag]);
    const cartEmpty = products.length == 0
    return (
        <>
            {
                cartEmpty ? <h1 className="font-bold text-7xl flex items-center justify-center h-[200px]">CART IS EMPTY</h1> :
                    <section>
                        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                        <div className="py-4">
                            <div className="container mx-auto px-4">
                                <div className="flex flex-row gap-4">
                                    <div className="w-full">
                                        {
                                            products && products.map((product, index) => {
                                                return (
                                                    <>
                                                        <CartProductCard product={product} setRefreshFlag={setRefreshFlag} />
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="md:w-1/4">
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                            <div className="flex justify-between mb-2">
                                                <span>Subtotal</span>
                                                <span>$19.99</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>Taxes</span>
                                                <span>$1.99</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>Shipping</span>
                                                <span>$0.00</span>
                                            </div>

                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold">Total</span>
                                                <span className="font-semibold">$21.98</span>
                                            </div>
                                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </section >
            }

        </>
    )
}
export default CartPage 