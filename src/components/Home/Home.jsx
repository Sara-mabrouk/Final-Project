import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Products from '../Products/Products'
import CategoriesSlider from '../categoriesSlider/categoriesSlider'
import MainSlider from '../mainSlider/mainSlider'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Home() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getProducts()
    }, [])


    async function getProducts() {
        setIsLoading(true)

        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        setProducts(data.data);
        setIsLoading(false)

    }
    return (
        <>
            {
                isLoading ?
                    <LoadingScreen />
                    :
                    <>
                        <MainSlider />
                        <CategoriesSlider />
                        <h2 className='text-[#987070] py-4 text-center'>Shop Popular Products</h2>
                        <div className='row'>
                            {products.map((product, index) => {
                                return <Products product={product} key={index} />
                            })}

                        </div>
                        </>

            }
        </>

    )
}
