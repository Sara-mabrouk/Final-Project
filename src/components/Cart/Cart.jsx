import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CartProduct from '../CartProduct/CartProduct'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Cart() {
    const [isLoading, setIsLoading] = useState(false)

    const [cart, setCart] = useState(null)
    useEffect(() => {
        getUserCart()

    }, [])


    async function getUserCart() {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        setCart(data);
        setIsLoading(false)

    }

    return (  <>
        {
            isLoading ?
                <LoadingScreen />
                :
    
      
      <div className=" pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 line-clamp-1">
                <div className="rounded-lg md:w-2/3">
                    {cart?.data.products.map((product, index) => {
                        return <CartProduct key={index} product={product} setCart={setCart} />
                    })}

                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">$0</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice} USD</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <Link to={"/checkout/" + cart?.data._id} className="mt-6 block rounded-md text-white bg-[#987070] hover:bg-[#F1E5D1] focus:ring-4 focus:outline-none focus:ring-[#C39898]-300 font-medium text-sm w-full  px-5 py-2.5 text-center dark:bg-[#987070] dark:hover:bg-[#C39898] dark:focus:ring-[#C39898]">
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Check Out'}
                    </Link>
                </div>
            </div>
        </div> 
}
        </> 
    )
}
