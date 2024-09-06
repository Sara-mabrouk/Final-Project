import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        async function getAllBrands() {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands/');
                setBrands(data.data);
            } catch (error) {
                console.error('Error fetching Brands:', error);
            }
        }
        getAllBrands();
    }, []);

    return (
        <div className={`d-flex flex-wrap justify-content-center gy-2 `}>
            {brands.map((product) => (
                <div key={product?._id} className="d-flex flex-column align-items-center text-center mb-4">
                    <Link >
                        <div className='product cursor-pointer px-2 py-3 m-1  '>
                            <img className='imgCategory' src={product.image} alt={product.name} />
                            <h3 className='h4 text-main mt-2'>{product?.name?.split(' ').slice(0, 2).join(' ')}</h3>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
