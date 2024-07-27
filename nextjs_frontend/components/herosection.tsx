import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import heroimage from "../public/hero-image.webp"
const Hero = () => {
    return (
        <section className="flex items-center justify-center lg:flex-1 m-[2rem] lg:m-0 lg:mt-[6rem] mt-[4rem]">
            <div className="flex flex-col justify-center gap-10">
                <div className="bg-[#e1edff] h-[40px] w-[120px] rounded-md flex items-center justify-center text-blue-800 font-semibold capitalize">sale 70%</div>
                <h1 className="font-bold text-[3.5rem] text-[#212121] leading-[55px] tracking-[.03em] lg:w-10/12">An Industrial Take on Streetwear</h1>
                <p className="font-normal text-[#666] lg:w-6/12 w-10/12 text-base leading-[24px]">Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
                <button className="flex items-center justify-center  lg:p-4 px-8 py-4 text-base bg-[#212121] font-semibold text-white w-fit gap-2 capitalize">
                    <ShoppingCart></ShoppingCart>
                    <p className="lg:w-6/12 w-full">start shopping</p>
                </button>
            </div>
            <div className="hidden lg:block">
                <div className="w-[600px] h-[600px] bg-[#ffece3] rounded-full relative">
                    <Image src={heroimage} alt="hero section image" className="absolute top-[-5%] w-[630px] h-[630px] shrink-0" />
                </div>
            </div>
        </section>
    )
}
export default Hero