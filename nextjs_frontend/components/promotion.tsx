import Image from "next/image"
import eventone from "../public/event1.webp"
import eventtwo from "../public/event2.webp"
import eventthree from "../public/event3.webp"
const Promotion = () => {
    return (
        <section className="mx-[4rem] lg:mx-0 lg:mt-[6rem] mt-[3rem]">
            <div className="flex flex-col items-center">
                <h6 className="uppercase text-xs text-[#0062f5] font-bold tracking-[0.1em]">promotions</h6>
                <h2 className="capitalize text-[32px] text-center md:tracking-[0.03em] text-[#212121] font-bold">our promotion events</h2>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center md:block lg:flex w-full lg:gap-10 gap-7">
                {/* left banner */}
                <div className="flex flex-col gap-5">
                    <div className="flex bg-[#d6d6d8]  items-center px-[2rem] justify-center tracking-[.05em] text-[#212121]">
                        <div className="md:w-4/12">
                            <h3 className="font-bold md:text-[1.75rem] text-[1rem]  md:leading-[35px] ">GET UP TO <span className="font-extrabold lg:text-[2.25rem] text-[1.5rem] leading-[45px]">60%</span></h3>
                            <p className="font-normal md:text-[1.125rem] text-[0.7rem] md:leading-[25px] tracking-[.03em] ">For the summer season</p>
                        </div>
                        <Image src={eventone} alt="eventone" width={260} height={260} />
                    </div>
                    <div className="bg-[#212121] text-white flex flex-col items-center justify-center pt-12 pb-8">
                        <h3 className="font-extrabold md:text-[2.25rem] text-[1.8rem] leading-[45px] tracking-[.03em] mb-4">GET 30% Off</h3>
                        <p className="font-normal text-[.875rem] leading-[18px] tracking-[.03em]">USE PROMO CODE</p>
                        <button className="font-bold text-[17px] w-fit mx-3 md:mx-0  leading-[21px] tracking-[.25em] bg-[#474747] py-[.5rem] px-[2.5rem] mt-[5px] rounded-[8px]">DINEWEEKENDSALE</button>
                    </div>
                </div>
                {/* right banner */}
                <div className="flex flex-col md:flex-row lg:gap-5 md:mt-6 mt-3 lg:mt-0 gap-10 justify-center ">
                    <div className="bg-[#efe1c7] pt-[1.5rem] flex flex-col justify-between">
                        <div className="ml-8">
                            <p className="font-normal text-[15px] leading-[24px] tracking-[.03em]">Flex Sweatshirt</p>
                            <div className="">
                                <span>$100.00</span><span className="font-semibold text-[18px] ml-[10px]">$75.00</span>
                            </div>
                        </div>
                        <Image src={eventtwo} alt="eventtwo" />
                    </div>
                    <div className="bg-[#d7d7d9] pt-[1.5rem] flex flex-col justify-between">
                        <div className="ml-8">
                            <p className="font-normal text-[15px] leading-[24px] tracking-[.03em]">Flex Push Button Bomber</p>
                            <div>
                                <span>$225.00</span><span className="font-semibold text-[18px] ml-[10px]">$190.00</span>
                            </div>
                        </div>
                        <Image src={eventthree} alt="eventthree" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Promotion