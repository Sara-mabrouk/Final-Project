
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';


export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false)
const {cartId}=useParams()

    // Validation use Yup
    const validationSchema = Yup.object({
        city: Yup.string().required("City is required"),
        phone: Yup.string().required("phone is required"),
        details: Yup.string().required("details is required"),

    })

    let formik = useFormik({
        initialValues: {
            city: '',
            phone: '',
            details: ''
        },
        validationSchema,
        onSubmit
    })



    function onSubmit(values) {
        console.log(cartId);

        // console.log(values);

        setIsLoading(true)
        axios .post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
            {
            shippingAddress: values,
            }, {
            headers: {
                token: localStorage.getItem("token")
            },
    
            
        }).then (({ data }) => {
            console.log(data);
            setIsLoading(false)
            console.log(data.session.url);
            
            location.href = data.session.url;
        })
            .catch((err) => {
                setIsLoading(false)
            })
            
    }

    return <>

        <div className="py-6 max-w-xl mx-auto">

            <form onSubmit={formik.handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                    <input id="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city :</label>
                </div>

                {/* city */}
                {formik.errors.city && formik.touched.city ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.city}</div> : null
                }




                <div className="relative z-0 w-full mb-5 group">
                    <input id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone :</label>
                </div>

                {/* phone */}
                {formik.errors.phone && formik.touched.phone ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.phone}</div> : null
                }



                <div className="relative z-0 w-full mb-5 group">
                    <input id="details" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="tele" name="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details :</label>
                </div>

                {/* details */}
                {formik.errors.details && formik.touched.details ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.details}</div> : null
                }


                <button type="submit" className="text-white bg-[#987070] hover:bg-[#F1E5D1] focus:ring-4 focus:outline-none focus:ring-[#C39898]-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-[#987070]
            dark:hover:bg-[#C39898] dark:focus:ring-[#C39898]">
                    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Check Out'}
                </button>

            </form>

        </div>

    </>
}
