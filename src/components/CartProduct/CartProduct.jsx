import React from 'react'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'
import { useState } from 'react'

export default function CartProduct({ product, setCart }) {

const [isIncreaseLoading,setIsIncreaseLoading]=useState(false)
const [isDecreaseLoading,setIsDecreaseLoading]=useState(false)


    async function removeProductFromCart(productId) {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }

        })
        setCart(data);

        toast.success("Product Has Been Removed Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

    }

async function updateProductCount(productID,count) {
    if (count> product.count) {
        
        setIsIncreaseLoading(true)
    }else{
        setIsDecreaseLoading(true)
    }
    if(count !=0){

    let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productID,{
        count
    },{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    setCart(data);
}else{
    removeProductFromCart(productID) 
}
setIsIncreaseLoading(false)
setIsDecreaseLoading(false)

}

    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start line-clamp-1">
            <img src={product.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between line-clamp-1">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">${product.price}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <button disabled={product.count==1} onClick={()=>updateProductCount(product.product._id,product.count-1)} className="cursor-pointer rounded-l bg-gray-100 disabled:hover:bg-gray-100 disabled:hover:text-black py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 disabled:cursor-not-allowed">{isDecreaseLoading ? <i className='fas fa-spinner fa-spin'></i>:'- '}</button>
                        <input disabled={isIncreaseLoading} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.count} min="1" />
                        <button onClick={()=>updateProductCount(product.product._id,product.count+1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> {isIncreaseLoading ? <i className='fas fa-spinner fa-spin'></i>:'+ '} </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">${product.price * product.count}</p>
                        <svg onClick={() => removeProductFromCart(product.product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
