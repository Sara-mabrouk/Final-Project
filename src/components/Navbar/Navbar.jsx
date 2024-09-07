/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext'; 
import logo from '../../assets/images/freshcart-logo.svg';

export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let { userToken, setUserToken } = useContext(UserContext);  
    let { numOfCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    function logOut() {
        setUserToken("");
        localStorage.removeItem("token");
        navigate('/login');
    }

    return (
        <nav className="bg-[#987070] p-4 ">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink
                    to={"/"}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src={logo} className="h-8" alt="Fresh cart Logo" />
                </NavLink>
                {userToken &&
                    <div className="hidden md:flex space-x-3 lg:space-x-5">
                        <NavLink to={'/'} className="text-white hover:text-[#DBB5B5] text-lg">Home</NavLink>
                        {/* <NavLink to={'/product'} className="text-white hover:text-[#DBB5B5] text-lg">Products</NavLink> */}
                        <NavLink to={'/categories'} className="text-white hover:text-[#DBB5B5] text-lg">Categories</NavLink>
                        <NavLink to={'/brands'} className="text-white hover:text-[#DBB5B5] text-lg">Brands</NavLink>
                        <NavLink to={'/cart'} className="text-white hover:text-[#DBB5B5] text-lg">Cart</NavLink>
                    </div>
                }
                <div className='flex gap-4'>
                    {!userToken && <>
                        <Link to={'/register'} className="bg-white text-[#C39898] font-semibold py-2 px-4 rounded hover:bg-gray-200 hidden md:block">
                            Register
                        </Link>
                        <Link to={'/login'} className="bg-white text-[#C39898] font-semibold py-2 px-4 rounded hover:bg-gray-200 hidden md:block">
                            Login
                        </Link>
                    </>}

                    {userToken && 
                    <>
                        <Link to={"/cart"} type="button" className="relative inline-flex items-center p-3 mt-1 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-[#DBB5B5]">
                            <i className="fas fa-cart-shopping fa-2x"></i>
                            <span className="sr-only">Cart Items</span>
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#DBB5B5] border-2 border-white rounded-full -top-2 -end-2 dark:border-white">  
10                            </div>
                        </Link >

                        <button onClick={logOut} className="bg-white text-[#C39898] font-semibold py-2 px-4 rounded hover:bg-gray-200 hidden md:block">
                            Logout 
                        </button>
                    </> }
                </div>

                <div className="md:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {userToken && (
                <div className={isMenuOpen ? "mobile-menu md:hidden" : "mobile-menu md:hidden hidden "} >
                    <ul className="flex flex-col space-y-4 text-center pt-2">
                        <li><NavLink to={'/'} className="text-white hover:text-[#C39898] text-lg">Home</NavLink></li>
                        <li><NavLink to={'/categories'} className="text-white hover:text-[#C39898] text-lg">Categories</NavLink></li>
                        <li><NavLink to={'/brands'} className="text-white hover:text-[#C39898] text-lg">Brands</NavLink></li>
                        <li><NavLink to={'/cart'} className="text-white hover:text-[#C39898] text-lg">Cart</NavLink></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
