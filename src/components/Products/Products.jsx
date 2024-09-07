
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'
import { addProductToCart } from '../../Context/CartContext';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Products({ product }) {




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

            <div className="w-1/6 p-2 ">
                <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-[#F1E5D1] dark:border-gray-700">
                    <Link to={"/ProductDetails/" + product?._id}>
                        <img className="rounded-t-lg p-8 " src={product?.imageCover} alt="product image" />
                    </Link>
                    <div className="px-2 pb-2">
                        <Link to={"/ProductDetails/" + product?._id}>
                            <h3 className="text-gray-900 font-semibold  tracking-tight dark:text-[#987070] line-clamp-1">{product?.title}</h3>
                        </Link>
                        <p className="line-clamp-2 text-[#508C9B]">
                            {product?.description}
                        </p>

                        <Rating rating={product?.ratingsAverage} />

                        <div className="flex items-center justify-between">
                            <span className=" font-bold text-gray-900 dark:text-[#987070]">${product?.price}</span>
                            <button onClick={() => addProductToCart(product?._id)}
                                className="text-white bg-[#C39898z] hover:bg-[#FEFAE0]focus:ring-4 focus:ring-[#FEFAE0] font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-[#C39898] dark:hover:bg-[#FEFAE0] dark:focus:ring-[#FEFAE0] dark:hover:text-[#6C4E31]">Add
                                to cart</button>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
