import axios from 'axios';
import { createContext } from 'react';
import { Bounce, toast } from 'react-toastify'
export let CartContext = createContext(0);
export async function addProductToCart(productId ) {
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
            productId: productId
        }, {
        headers: {
            token:localStorage.getItem("token")
        }

    })
    // console.log(data);

    toast.success(data.message, {
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

