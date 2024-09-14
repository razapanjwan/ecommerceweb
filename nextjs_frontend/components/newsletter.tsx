const NewsLetter = () => {
    return (
        <section className="text-[#212121] text-center  gap-3 relative flex flex-col items-center min-h-[400px] justify-center before:content-['Newsletter'] before:absolute before:text-[#f2f3f7] before:text-[4rem] md:before:text-[7.5rem] before:font-extrabold before:-z-50">
            {/* <div className=""></div> */}
            <h5 className="text-[2rem] font-bold tracking-wider">Subscribe Our Newsletter</h5>
            <p className="font-thin text-base">Get the latest information and promo offers directly</p>
            <form action="" className="flex gap-4 flex-col justify-center items-center  lg:flex-row">
                <input type="text" name="" placeholder="input email address" id="" className="border-gray-600 border-[1px] w-[20rem] pl-5 py-3" />
                <button type="submit" className="lg:py-[10px] lg:px-[20px] px-[20px] py-[10px] bg-[#000] text-[0.9rem] text-white w-fit ">get started</button>
            </form>
        </section>
    )
}
export default NewsLetter