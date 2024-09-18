"use client"
import getOrder from "@/actions/getorder"
import getOrderItem from "@/actions/getorderitem"
import PageLoader from "@/components/page-loader"
import { useEffect, useState } from "react"
import Link from "next/link"
import getAddress from "@/actions/getaddress"

const OrderConfirmation = ({ params }: { params: { order_id: number } }) => {
    const [order, setOrder] = useState<any>({})
    const [orderItem, setOrderItem] = useState([])
    const [futureDate, setFutureDate] = useState('');
    const [address, setAddress] = useState<any>({})
    const [loader, setLoader] = useState(true)
    const totalPrice = orderItem.reduce((acc, product) => {
        return acc + (product.product_price * product.total_cart_products);
    }, 0);
    const tax = 2
    const shipping = 1
    const subTotal = totalPrice + tax + shipping
    const serviceGetOrder = async () => {
        try {
            let orderResponse = await getOrder(params.order_id)
            if (orderResponse) {
                setOrder(orderResponse)
            }
        } catch (error) {
            console.error(error.message)
        }

    }
    const serviceGetOrderItem = async () => {
        try {
            let orderItemResponse = await getOrderItem(params.order_id)
            if (orderItemResponse) {
                setOrderItem(orderItemResponse)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    const serviceGetAddress = async () => {
        try {
            let addressResponse = await getAddress(params.order_id)
            if (addressResponse) {
                setAddress(addressResponse)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await serviceGetOrder();
            await serviceGetOrderItem();
            await serviceGetAddress();
            const currentDate = new Date();
            const future = new Date(currentDate);
            future.setDate(currentDate.getDate() + 5);
            setFutureDate(future.toDateString());

            setLoader(false);
        };
        fetchData()
    }, [])
    return (
        <>
            {loader ?
                <PageLoader /> :
                <section className="py-24 relative">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                        <div className="w-full flex-col justify-start items-center lg:gap-12 gap-8 inline-flex">
                            <div className="flex-col justify-start items-center gap-3 flex">
                                <h2 className="text-center text-gray-900 text-3xl font-bold font-manrope leading-normal">{order.customer_name}, Thank You for Your Order!</h2>
                                <p className="max-w-xl text-center text-gray-500 text-lg font-normal leading-8">Your order is in good hands! We'll notify you once it's en route. For now, here's a snapshot of your purchase</p>
                            </div>
                            <div className="w-full flex-col justify-start items-center lg:gap-10 gap-8 flex">
                                <div className="w-full flex-col justify-start items-start gap-6 flex">
                                    <div className="w-full flex-col justify-start items-start gap-5 flex">
                                        <div className="w-full md:px-6 px-2 py-4 border-y border-gray-200 justify-between items-center inline-flex">
                                            <h3 className="text-gray-900 text-xl font-medium leading-8">Item</h3>
                                            <h3 className="text-right text-gray-900 text-xl font-medium leading-8">Total</h3>
                                        </div>
                                        {
                                            orderItem && orderItem.map((item) => {
                                                return (
                                                    <div className="w-full md:px-6 px-2 pb-5 justify-between items-center gap-8 inline-flex border-b border-gray-300">
                                                        <div className="justify-start items-center gap-6 flex md:pb-5">
                                                            <img className="object-cover" src="https://pagedone.io/asset/uploads/1717406948.png" alt="Simple Black T-shirt image" />
                                                            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                                                                <h5 className="text-gray-900 text-lg font-semibold leading-relaxed">{item.product_name}</h5>
                                                                <h6 className="text-gray-500 text-base font-normal leading-relaxed">QTY: {item.total_cart_products}</h6>
                                                                <h4 className="text-gray-500 text-base font-normal leading-relaxed">SIZE: {item.product_size}</h4>
                                                            </div>
                                                        </div>
                                                        <h4 className="text-right text-gray-900 text-lg font-medium leading-relaxed">{item.product_total}.00$</h4>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="w-full md:pt-6 justify-start items-center gap-5 flex md:flex-row flex-col">
                                        <div className="w-full md:px-6 px-2 flex-col justify-start items-start gap-5 inline-flex md:border-r md:border-b-0 border-b md:pb-0 pb-5 border-gray-200">
                                            <div className="w-full justify-between items-center inline-flex gap-4">
                                                <h5 className="text-gray-500 text-lg font-normal leading-relaxed">Estimated Delivery:</h5>
                                                <h5 className="text-right text-gray-500 text-lg font-normal leading-relaxed">{futureDate}</h5>
                                            </div>
                                            <div className="w-full justify-between items-center inline-flex gap-4 border-y border-gray-200 py-5">
                                                <h5 className="text-gray-500 text-lg font-normal leading-relaxed">Delivery Address:</h5>
                                                <h5 className="text-right text-gray-500 text-lg font-normal leading-relaxed">{address.street_address}</h5>
                                            </div>
                                            <div className="w-full justify-between items-center inline-flex gap-4">
                                                <h5 className="text-gray-500 text-lg font-normal leading-relaxed">Payment Method</h5>
                                                <h5 className="text-right text-gray-500 text-lg font-normal leading-relaxed">COD</h5>
                                            </div>
                                        </div>
                                        <div className="w-full md:px-6 px-2 flex-col justify-start items-start gap-5 inline-flex">
                                            <div className="w-full pb-6 border-b border-gray-200 flex-col justify-start items-start gap-6 flex">
                                                <div className="w-full justify-between items-start gap-6 inline-flex">
                                                    <h5 className="text-gray-500 text-lg font-normal leading-relaxed">Subtotal</h5>
                                                    <h5 className="text-right text-gray-900 text-lg font-semibold leading-relaxed">{totalPrice}.00$</h5>
                                                </div>
                                                <div className="w-full justify-between items-start gap-6 inline-flex">
                                                    <h5 className="text-gray-500 text-lg font-normal leading-relaxed">Shipping</h5>
                                                    <h5 className="text-right text-gray-900 text-lg font-semibold leading-relaxed">{shipping}.00$</h5>
                                                </div>
                                            </div>
                                            <div className="w-full justify-between items-start gap-6 inline-flex">
                                                <h4 className="text-indigo-600 text-xl font-semibold leading-8">Total</h4>
                                                <h4 className="text-right text-indigo-600 text-xl font-semibold leading-8">{subTotal}.00$</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full justify-center items-center gap-8 flex sm:flex-row flex-col">
                                    <Link href={""} className="md:w-fit w-full px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 transition-all duration-700 ease-in-out rounded-xl justify-center items-center flex">
                                        <span className="px-2 py-px text-indigo-600 text-base font-semibold leading-relaxed">Back to Shopping</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}
export default OrderConfirmation