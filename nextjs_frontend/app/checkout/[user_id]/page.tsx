"use client"
import createOrder from "@/actions/createorder"
import CheckOutForm from "@/components/checkout-form"
import { useState } from "react"
import { toast } from "react-toastify"

const CheckOut = ({ params }: { params: { user_id: number } }) => {
    const [customerFirstName, setCustomerFirstName] = useState("")
    const [customerLastName, setCustomerLastName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhoneno, setCustomerPhoneno] = useState()
    const [streetAddress, setStreetAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")


    const checkOutSubmit = async () => {
        const orderDetails = {
            order_data: {
                customer_name: `${customerFirstName} ${customerLastName}`,
                customer_email: customerEmail,
                customer_phoneno: customerPhoneno,
                order_status: "pending"
            },
            address_data: {
                street_address: streetAddress,
                city: city,
                country: country
            },
            payment_data: {
                payment_method: "cash on delivery"
            }
        };
        try {
            const Order = await createOrder(orderDetails)
            if (Order) {
                console.log(Order, "Order");
                toast.success("Order Success!")
                if (Order.order_id) {
                    window.location.href = `/orderconfirmation/${Order.order_id}`
                }
                console.log(Order, "Order");
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <section>
            <div className="font-sans bg-white p-4" >
                <CheckOutForm customerFirstName={customerFirstName} setCustomerFirstName={setCustomerFirstName} customerEmail={customerEmail} setCustomerEmail={setCustomerEmail} customerLastName={customerLastName} setCustomerLastName={setCustomerLastName} city={city} country={country} customerPhoneno={customerPhoneno} setCity={setCity} setCountry={setCountry} setCustomerPhoneno={setCustomerPhoneno} setStreetAddress={setStreetAddress} streetAddress={streetAddress} checkOutSubmit={checkOutSubmit} />
            </div>
        </section>
    )
}
export default CheckOut