import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getAllCategories() {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/');
                setCategories(data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        getAllCategories();
    }, []);

    return (
        <div className={`d-flex flex-wrap justify-content-center gy-2`}>
            {categories.map((category) => (
                <div key={category?._id} className="d-flex flex-column align-items-center text-center mb-4">
                    <Link to={`/productDetails/${category?._id}`}>
                        <div className='product cursor-pointer px-2 py-3'>
                            <img className='imgCategory' src={category.image} alt={category.name} />
                            <h3 className='h4 text-main mt-2'>{category?.name?.split(' ').slice(0, 2).join(' ')}</h3>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
