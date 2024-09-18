"use client"
import createOrder from "@/actions/createorder"
import { useState } from "react"
import { toast } from "react-toastify"

const CheckOutForm = ({ customerFirstName, setCustomerFirstName, customerLastName, setCustomerLastName, customerEmail, setCustomerEmail, customerPhoneno, setCustomerPhoneno, streetAddress, setStreetAddress, city, setCity, country, setCountry, checkOutSubmit }) => {

    return (
        <form className="max-w-4xl mx-auto" onSubmit={(e) => { e.preventDefault(); checkOutSubmit() }}>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
            </div>

            <div className="mt-12">
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-300">01</h3>
                        <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
                    </div>

                    <div className="md:col-span-2">
                        <div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" placeholder="First name"
                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" value={customerFirstName} onChange={(e) => { setCustomerFirstName(e.target.value) }} />
                                </div>
                                <div>
                                    <input type="text" placeholder="Last name"
                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" value={customerLastName} onChange={(e) => { setCustomerLastName(e.target.value) }} />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email address"
                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" value={customerEmail} onChange={(e) => { setCustomerEmail(e.target.value) }} />
                                </div>
                                <div>
                                    <input type="number" placeholder="Phone number"
                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" value={customerPhoneno} onChange={(e) => { setCustomerPhoneno(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-12">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-300">02</h3>
                        <h3 className="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
                    </div>

                    <div className="md:col-span-2">
                        <div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" placeholder="Street address"
                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" value={streetAddress} onChange={(e) => { setStreetAddress(e.target.value) }} />
                                </div>
                                <div>
                                    <input type="text" placeholder="City"
                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" value={city} onChange={(e) => { setCity(e.target.value) }} />
                                </div>
                                <div>
                                    <input type="text" placeholder="Country"
                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-12">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-300">03</h3>
                        <h3 className="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
                    </div>

                    <div className="md:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center">
                                <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked />
                                <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer" >
                                    COD(CASH ON DELIVERY)
                                </label>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="flex flex-wrap justify-end gap-4 mt-12">
                    <button type="submit"
                        className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Order now</button>
                </div>
            </div>
        </form>
    )
}
export default CheckOutForm