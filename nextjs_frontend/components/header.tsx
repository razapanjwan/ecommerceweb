"use client"

import Image from "next/image"
import logo from "../public/Logo.webp"
import Link from "next/link"
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa'; // Using FontAwesome icons for example
import { getCookie } from "cookies-next";
import getUser from "@/actions/getuser";
import { useRouter } from "next/navigation";



const Header = (): any => {
    const [isOpen, setIsOpen] = useState(true)
    const [id, setId] = useState()
    const router = useRouter()
    const url = window.location.href.split("/")
    const lastUrl = url[url.length - 1]
    useEffect(() => {
        const getUserId = async () => {
            try {
                const user = await getUser()
                console.log(user.message.user_id, "user_id");
                setId(user.message.user_id)
            } catch (error) {
                console.log(error.message)
            }
        }
        if (lastUrl === "login" || lastUrl === "signup") {
            return
        } else {
            getUserId()
        }

    }, [])
    return (
        <>
            <header className="flex my-[2rem] items-center justify-between">
                <div className="flex justify-between lg:w-fit w-full lg:mx-0 mx-5 relative z-50 items-center">
                    <Image src={logo} alt="DINE MART LOGO" width={150} height={150} className="max-w-[130px] md:max-w-full" />
                    <div className="flex justify-center items-center lg:hidden">
                        {isOpen ? (
                            <div className="icon-container" onClick={() => setIsOpen(false)}>
                                <FaBars className="icon text-2xl transform transition ease-in-out duration-500 animate-rotateIn" />
                            </div>
                        ) : (
                            <div className="icon-container" onClick={() => setIsOpen(true)}>
                                <FaTimes className="icon text-2xl transform transition ease-in-out duration-500 animate-rotateIn" />
                            </div>
                        )}
                    </div>
                </div>
                <div className={`${isOpen ? "hidden" : "flex bg-white"} lg:flex-row justify-center lg:relative lg:top-none items-center left-0 fixed right-0 top-0 bottom-0 lg:h-fit h-screen gap-[1rem] mx-auto lg:mx-0 flex-col lg:flex lg:justify-between lg:items-center transform transition-transform duration-500 ease-in-out animate-fadeIn  `}>
                    <nav>
                        <ul className="lg:flex lg:flex-row capitalize lg:gap-16 text-xl text-center flex gap-5 flex-col ">
                            <li><Link href={"/"}>female</Link></li>
                            <li><Link href={"/"}>male</Link></li>
                            <li><Link href={"/"}>kid</Link></li>
                            <li><Link href={"/"}>all products</Link></li>
                        </ul>
                    </nav>
                    <div>
                        <form action="" className={`${isOpen ? "block" : "hidden"}`}>
                            <input type="search" name="" id="" className="w-[270px] outline-2 border-[2px] px-3 py-1 rounded-md border-slate-100" placeholder="what are you looking for?" />
                        </form>
                    </div>
                    <div className="rounded-full bg-[#f1f1f1] relative flex max-w-fit p-[12px] hover:transition hover:duration-300 hover:ease-in-out">
                        <Link href={`/cart/${id}`} >
                            <ShoppingCart width={20} height={20}></ShoppingCart>
                            {/* <div className="bg-red-500 absolute top-0 right-0 rounded-full text-white p-[0.1rem] -z-10">{0}</div> */}
                        </Link>
                    </div>
                </div>
            </header >
        </>
    )
}
export default Header