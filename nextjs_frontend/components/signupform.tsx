import Link from "next/link"
import { FormEvent } from "react"

interface UserProps {
    username: string
    email: string
    firstname: string
    lastname: string
    password: string
    confirm_password: string
    role: UserRole
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setRole: (role: UserRole) => void;
    onsubmit: (event: FormEvent<HTMLFormElement>) => any;
}

const Signupform = (props: UserProps) => {

    let { username, email, firstname, lastname, password, confirm_password, role, setUsername, setEmail, setFirstName, setLastName, setPassword, setConfirmPassword, setRole, onsubmit } = props

    return (
        <>
            <form action="" onSubmit={(event) => { onsubmit(event) }} className="flex flex-col gap-2 ">
                <div>
                    <div className="flex -mx-3">
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">First name</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" value={firstname} onChange={(e) => { setFirstName(e.target.value) }} />
                            </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Last name</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" value={lastname} onChange={(e) => { setLastName(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Username</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="text" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="email" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="password" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Confirm Password</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="password" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" value={confirm_password} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3 text-center">
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1 uppercase">admin</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="checkbox" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" value={role.admin} />
                            </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1 uppercase">User</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="checkbox" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" value={role.user} />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3">
                            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                        </div>
                    </div>
                    <p className="mb-0 mt-2 pt-1 font-bold flex justify-center flex-col items-center text-sm uppercase text-gray-400">
                        Already have an account!
                        <Link
                            href="/login"
                            className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                        >Login
                        </Link>
                    </p>
                </div>
            </form>
        </>
    )
}
export default Signupform