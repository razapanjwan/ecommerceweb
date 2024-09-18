"use client"
import Slider from "react-slick";
import React, { Component, useEffect, useState } from "react";
import ProductComp from "./product-comp";
import sliderimg1 from "../public/slider1.png"
import sliderimg2 from "../public/slider2.png"
import sliderimg3 from "../public/slider3.png"
import getProducts from "@/actions/getproducts";
import getImageById from "@/actions/getproductimage";
import Link from "next/link";
import getImage from "@/actions/getimage";
import PageLoader from "./page-loader";


const DesktopSlider = () => {
    const settingsDesktop = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
    };
    const settingsMobile = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,

    };
    const [products, setProduct] = useState([])
    const [error, setError] = useState<Error | null>(null);
    const [loader, setLoader] = useState(true)

    async function productss() {
        const products: any = await getProducts()

        console.log(products);
        setProduct(products)
    }
    const mobile = 992
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }


    const isMobileOrIpad = width <= 992;
    useEffect(() => {
        async function fetchProducts() {
            try {
                await productss()
            } catch (err) {
                setError(err);
            } finally {
                setLoader(false)
            }
            window.addEventListener('resize', handleWindowSizeChange);

            return () => {
                window.removeEventListener('resize', handleWindowSizeChange);

            }
        }
        fetchProducts();
    }, []);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {
                loader ? <PageLoader /> :
                    <>
                        {isMobileOrIpad ?
                            <>
                                < div className="slider-container" >
                                    <Slider {...settingsMobile} className="mx-auto">

                                        {products.map((product, index) => {
                                            return (
                                                <Link href={`/product/${product.product_id}`}>
                                                    <ProductComp image_id={product.image_id} heading={product.product_name} price={product.product_price} setLoader={setLoader} />
                                                </Link>
                                            )
                                        })}

                                    </Slider>

                                </div >
                            </>
                            :
                            <>
                                < div className="slider-container" >
                                    <Slider {...settingsDesktop} className="mx-auto">

                                        {products.map((product, index) => {
                                            return (
                                                <Link href={`/product/${product.product_id}`}>
                                                    <ProductComp image_id={product.image_id} heading={product.product_name} price={product.product_price} setLoader={setLoader} />
                                                </Link>
                                            )
                                        })}

                                    </Slider>

                                </div >
                            </>
                        }
                    </>
            }
        </>
    )
}

export default DesktopSlider