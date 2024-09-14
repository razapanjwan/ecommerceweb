const DescriptionComp = ({ heading, description }: any) => {
    return (
        <div className="flex flex-col lg:gap-2 gap-1">
            <h3 className="text-[1.125rem] text-[#212121] tracking-[0.03em] font-semibold mb-4 flex lg:w-8/12 ">{heading}</h3>
            <p className="font-light text-base leading-[22px] tracking-[0.05em] text-[#212121] lg:w-8/12">{description}</p>
        </div>
    )
}
export default DescriptionComp