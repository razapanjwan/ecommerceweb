"use client"
import getCategory from "@/actions/getcategory"
import getProductFromCategory from "@/actions/getproductfromcategory"
import PageLoader from "@/components/page-loader"
import ProductCard from "@/components/product-card"
import { useEffect, useState } from "react"

const AllProducts = () => {
    const [category, setCategory] = useState<any>({})
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)

    const serviceGetProductFromCategory = async (category_id) => {
        try {
            const productFromCategoryResponse = await getProductFromCategory(category_id)
            setProducts(productFromCategoryResponse)
        } catch (error) {
            console.error(error)
        }
    }
    const serviceGetAllProductCategory = async () => {
        try {
            let categoryResponse = await getCategory("all-product")
            await serviceGetProductFromCategory(categoryResponse.category_id)
            setCategory(categoryResponse)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        async function fetchAll() {
            await serviceGetAllProductCategory()
            setLoader(false);
        }
        fetchAll()
    }, [])

    return (
        <>
            {
                loader ? <PageLoader /> :
                    <>
                        <h1 className="uppercase font-bold text-5xl my-10">{category.category_name}</h1>
                        <div className="flex flex-wrap justify-center items-center md:justify-between">
                            {
                                products && products.map((product) => {
                                    return (
                                        <>
                                            <ProductCard product={product} />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </>
            }


        </>
    )
}
export default AllProducts