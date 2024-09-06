import React, { useEffect, useState } from 'react'
import Style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
    let navigate = useNavigate();
    const [apiError, setapiError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    function handleRegister(formValues) {
        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
            .then((apiResponse) => {
                navigate('/login');
                setIsLoading(false);

            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setapiError(apiResponse?.response?.data?.message);

            })

    }

    // Validation use Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Min length is 5 characters').max(15, 'Max length is 5 characters').required(),
        email: Yup.string()
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "not a valid email")
            .required(),
        password: Yup.string().matches(/[A-Z][a-zA-Z0-9]+$/, 'password should start with capital letters').min(6).max(16).required(),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'password , re-password not match').required(),
        phone: Yup.string().matches(/^(002)?01[0-25][0-9]{8}$/, 'not valid phone number').required()
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''

        },
        validationSchema: validationSchema,
        onSubmit: handleRegister
    })
    return <>

        <div className="py-6 max-w-xl mx-auto">

            <h2 className='text-2xl text-[#DBB5B5] font-bold mb-6 text-center'>Create Account</h2>
            <form onSubmit={formik.handleSubmit}>

                {apiError ? <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>
                    {apiError}</div> : null}
                <div className="relative z-0 w-full mb-5 group">
                    <input id=" name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>

                </div>
                {/* name */}
                {formik.errors.name && formik.touched.name ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.name}</div> : null
                }

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
                <div className="relative z-0 w-full mb-5 group">
                    <input id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Re-Password :</label>
                </div>

                {/* re pass */}

                {formik.errors.rePassword && formik.touched.rePassword ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.rePassword}</div> : null
                }
                <div className="relative z-0 w-full mb-5 group">
                    <input id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone :</label>
                </div>
                {/* phone */}
                {formik.errors.phone && formik.touched.phone ?
                    <div className='text-red-900  p-4 mb-5 text-sm rounded-lg bg-red-200'>{formik.errors.phone}</div> : null
                }
                <button type="submit" className="text-white bg-[#F1E5D1] hover:bg-[#F1E5D1] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-[#987070]  dark:hover:bg-[#DBB5B5] dark:focus:ring-[#DBB5B5]">
                    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'SignUp'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 pt-2 text-center">
                    Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                </p>
            </form>

        </div>

    </>
}
