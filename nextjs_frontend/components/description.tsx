import DescriptionComp from "./description-comp"
import Image from "next/image"
import FeaturedImage from "../public/feature.webp"
const Description = () => {
    return (
        <section className="flex flex-col px-[4rem] lg:mt-[6rem] mt-[3rem] lg:px-0  from-[180deg, #fff 50%, #fbfcff 0]">
            <div className="flex justify-end mb-12">
                <h2 className="leading-[50px] lg:w-5/12 text-[2.5rem] md:text-[2.75rem] font-bold text-[#212121]">Unique and Authentic Vintage Designer Jewellery</h2>
            </div>
            <div className="flex lg:flex-row flex-col justify-center item-center ">
                {/* left side */}
                <div className="before:content-['Designer Jewellery Different from others'] lg:w-6/12 flex flex-col gap-10 ">
                    <div className="flex flex-1 gap-2 lg:gap-0">
                        <DescriptionComp heading={"Using Good Quality Materials"} description={"Lorem ipsum dolor sit amt, consectetur adipiscing elit."} />
                        <DescriptionComp heading={"100% Handmade Products"} description={"Lorem ipsum dolor sit amt, consectetur adipiscing elit."} />
                    </div>
                    <div className="flex flex-1 gap-2 lg:gap-0">
                        <DescriptionComp heading={"Modern Fashion Design"} description={"Lorem ipsum dolor sit amt, consectetur adipiscing elit."} />
                        <DescriptionComp heading={"Discount for Bulk Orders"} description={"Lorem ipsum dolor sit amt, consectetur adipiscing elit."} />
                    </div>
                </div>
                <div className="flex justify-center items-center mt-12 lg:mt-0 md:flex-row flex-col lg:w-6/12 gap-[2.5rem] ">
                    <Image src={FeaturedImage} alt="FeatureImage" width={300} height={350} className="md:w-[300px] md:h-[350px] " />
                    <div className="flex flex-col gap-12 justify-start items-start">
                        <p className="text-[#212121] text-base font-thin leading-[26px] w-11/12 text-justify">This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.</p>
                        <button className="text-white capitalize bg-[#212121] text-base p-3 lg:py-2 w-fit  flex justify-center items-center" type="button"><p className="lg:w-8/12">see all products</p></button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Description