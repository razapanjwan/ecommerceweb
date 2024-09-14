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


const DesktopSlider = () => {
    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
    };
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    async function productss() {
        const products: any = await getProducts()
        console.log(products);
        setProduct(products)
    }
    useEffect(() => {
        async function fetchProducts() {
            try {
                await productss()
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="slider-container">
            <Slider {...settings} className="mx-auto">

                {products.map((product, index) => {
                    return (
                        <Link href={`/product/${product.product_id}`}>
                            <ProductComp image={sliderimg1} heading={product.product_name} price={product.product_price} />
                        </Link>
                    )
                })}

            </Slider>

        </div>
    )
}

export default DesktopSlider