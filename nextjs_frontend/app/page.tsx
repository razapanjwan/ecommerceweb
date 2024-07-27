import Description from "@/components/description";
import Footer from "@/components/footer";
import FooterBottom from "@/components/footer-bottom";
import Header from "@/components/header";
import Hero from "@/components/herosection";
import NewsLetter from "@/components/newsletter";
import Product from "@/components/products";
import Promotion from "@/components/promotion";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <Promotion />
      <Product />
      <Description />
      <NewsLetter />
      <Footer />
    </main>
  );
}
