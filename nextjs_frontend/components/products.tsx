"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import DesktopSlider from "./desktop-prduct-slider";
import MobileSlider from "./mobile-ipad-slider";
import getProducts from "@/actions/getproducts";



const Products = () => {

    const mobile = 992
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);

        }
    }, []);

    const isMobileOrIpad = width <= 992;

    return (
        <section className="mt-[3rem] lg:mt-[6rem]">
            <div className="flex flex-col justify-center items-center">
                <h6 className="text-[12px] text-[#0062f5] leading-[15px] tracking-[.1em] font-bold uppercase">products</h6>
                <h3 className="text-[32px] font-bold text-[#212121]">Check What We Have</h3>
            </div>
            {isMobileOrIpad ? <MobileSlider /> : <DesktopSlider />}
        </section>
    )
}
export default Products