/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Style from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
    let navigate = useNavigate();
    const [apiError, setapiError] = useState('');
    const [isLoading, setIsLoading] = useState('');

let {setUserToken}=useContext(UserContext)



    function handleLogin(formValues) {
        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
            .then((data) => {
                if (data.data.message === "success") {
                    setUserToken(data.data.token);
                    localStorage.setItem('token', data.data.token)
                }
                setIsLoading(false);
                navigate('/');

            })
            .catch((error) => {
                setIsLoading(false);
                setapiError(error?.response?.data?.message);
            })
    }



    // Validation use Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "not a valid email")
            .required(),
        password: Yup.string().matches(/[A-Z][a-zA-Z0-9]+$/, 'password should start with capital letters').min(6).max(16).required(),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin
    })
    return <>

        <div className="py-6 max-w-xl mx-auto">

            <h2 className='text-2xl text-[#987070] font-bold mb-6 text-center'>Welcome To FreshCart</h2>
            <form onSubmit={formik.handleSubmit}>

                {apiError ? <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>
                    {apiError}</div> : null}



                <div className="relative z-0 w-full mb-5 group">
                    <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
                </div>

                {/* email */}
                {formik.errors.email && formik.touched.email ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.email}</div> : null
                }

                <div className="relative z-0 w-full mb-5 group">
                    <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
                </div>

                {/* pass */}

                {formik.errors.password && formik.touched.password ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.password}</div> : null
                }

                <button type="submit" className="text-white bg-[#987070] hover:bg-[#F1E5D1] focus:ring-4 focus:outline-none focus:ring-[#C39898]-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-[#987070]
            dark:hover:bg-[#C39898] dark:focus:ring-[#C39898]">
                    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400 pt-2 text-center'>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>

                </p>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400 pt-2 text-center">
                    Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
            </form>

        </div>

    </>
}
