import Image from "next/image"
import footerLogo from "../public/Logo.webp"
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = (): any => {
    return (
        <footer className="flex flex-col lg:flex-row justify-between mx-[2rem] md:mx-[4rem] lg:mx-0 gap-[2rem] ">
            <div className="flex flex-col justify-between gap-y-8">
                <Image src={footerLogo} alt="footer logo" className="shrink-0" width={170} height={170} />
                <p className="w-[350px] text-[#666] text-base font-normal">Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>
                <nav>
                    <ul className="flex gap-4 text-3xl text-black">
                        <li className="bg-[#f1f1f1] rounded-lg px-3 py-2"><Facebook /></li>
                        <li className="bg-[#f1f1f1] rounded-lg px-3 py-2"><Twitter /></li>
                        <li className="bg-[#f1f1f1] rounded-lg px-3 py-2"><Linkedin /></li>
                    </ul>
                </nav>
            </div>
            <div className="text-[#666] capitalize flex flex-col gap-2 lg:gap-4">
                <h3 className="font-bold text-[1.2rem]">company</h3>
                <nav>
                    <ul className="flex flex-col gap-3">
                        <li>about</li>
                        <li>term of use</li>
                        <li>privacy policy</li>
                        <li>how it works</li>
                        <li>contact us</li>
                    </ul>
                </nav>
            </div>
            <div className="text-[#666] capitalize flex flex-col gap-2 lg:gap-4">
                <h3 className="font-bold text-[1.2rem]">support</h3>
                <nav>
                    <ul className="flex flex-col gap-3">
                        <li>support carrer</li>
                        <li>24h service</li>
                        <li>quick chat</li>
                    </ul>
                </nav>
            </div>
            <div className="text-[#666] capitalize flex flex-col gap-2 lg:gap-4">
                <h3 className="font-bold text-[1.2rem]">contact</h3>
                <nav>
                    <ul className="flex flex-col gap-3">
                        <li>whatsapp</li>
                        <li>support 24h</li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}
export default Footer