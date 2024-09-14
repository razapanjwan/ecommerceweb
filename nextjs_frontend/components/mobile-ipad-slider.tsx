"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import ProductComp from "./product-comp";
import sliderimg1 from "../public/slider1.png"
import sliderimg2 from "../public/slider2.png"
import sliderimg3 from "../public/slider3.png"

const MobileSlider = () => {
    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,

    };
    return (
        <div className="slider-container">
            <Slider {...settings} arrows={false} className=" mx-auto">
                <ProductComp image={sliderimg1} heading={"flex push button bomber"} price={"225"} />
                <ProductComp image={sliderimg2} heading={"muscle tank"} price={"205"} />
                <ProductComp image={sliderimg3} heading={"brushed bomber"} price={"215"} />
                <ProductComp image={sliderimg1} heading={"flex push button bomber"} price={"225"} />
                <ProductComp image={sliderimg2} heading={"muscle tank"} price={"205"} />
                <ProductComp image={sliderimg3} heading={"brushed bomber"} price={"215"} />
            </Slider>
        </div>
    )
}
export default MobileSlider