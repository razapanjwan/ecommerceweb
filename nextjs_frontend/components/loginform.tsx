"use client"
import Link from "next/link"
import { useState } from "react"


interface LoginProps {
    username: string,
    password: any,
    formSubmit: () => void
    setLoginUsername: (username: string) => void
    setLoginpassword: (password: any) => void
    role: UserRole
    setRole: (role: UserRole) => void;
    confirmadmin: string
    setConfirmadmin: (confirmadmin: string) => void;
}
const LoginForm = ({ username, password, formSubmit, setLoginUsername, setLoginpassword, role, confirmadmin, setConfirmadmin }: LoginProps) => {
    const [checked, setChecked] = useState(false)
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                formSubmit()
            }}>
                <div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Username</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="text" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith" value={username} onChange={(e) => {
                                    setLoginUsername(e.target.value)
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="password" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="*************" value={password} onChange={(e) => {
                                    setLoginpassword(e.target.value)
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3 text-center">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-base font-semibold px-1 uppercase" >Are you admin?</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="checkbox" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" value={role.admin} onClick={() => { setChecked(!checked) }} />
                            </div>
                        </div>
                    </div>
                    <div className={`${checked ? "flex -mx-3" : "hidden"} `}>
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">adminpassword</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="password" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="*********" value={confirmadmin} onChange={(e) => { setConfirmadmin(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3">
                            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">LOGIN</button>
                        </div>
                    </div>
                    <p className="mb-0 mt-2 pt-1 font-bold flex justify-center flex-col items-center text-sm uppercase text-gray-400">
                        Dont have an account?
                        <Link
                            href="/signup"
                            className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                        >SignUp
                        </Link>
                    </p>
                </div>

            </form >
        </>
    )
}
export default LoginForm