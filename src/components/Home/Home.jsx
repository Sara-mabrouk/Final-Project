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
                        <div className='d-flex flex-wrap justify-content-center gap-2'>
                            {products.map((product, index) => {
                                return <Products product={product} key={index} />
                            })}

                        </div></>

            }
        </>

    )
}
