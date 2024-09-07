import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    async function getAllCategories() {

        try {
            setIsLoading(true)

            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/');
            setIsLoading(false)

            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            {

                isLoading ?
                    <LoadingScreen />
                    :
                    <div className="row">
                        {categories.map((product) => <div key={product?._id} className="col-md-3 text-center px-2 py-2">

                            <Link to={`/ProductDetails/${product?._id}`}>
                                <div className='product cursor-pointer  px-2 py-3'>
                                    <img className='imgCategory w-100' src={product?.image} alt="" />
                                    <h3 className='h4 text-main mt-2'>{product?.name?.split(' ').slice(0, 2).join(' ')}</h3>

                                </div>
                            </Link>

                        </div>)}
                    </div>






            }



        </>



    );
}
