"use client"
import Description from "@/components/description";
import Footer from "@/components/footer";
import FooterBottom from "@/components/footer-bottom";
import Header from "@/components/header";
import Hero from "@/components/herosection";
import NewsLetter from "@/components/newsletter";
import Products from "@/components/products";
import Promotion from "@/components/promotion";
import getProducts from "@/actions/getproducts";
// import { useEffect } from "react";
// import { useRouter } from "next/router";


export default function Home() {
  // const router = useRouter()
  // useEffect(() => {
  //   router.reload()
  // }, [])

  return (
    <main className="">
      <Hero />
      <Promotion />
      <Products />
      <Description />
      <NewsLetter />
    </main>
  );
}
