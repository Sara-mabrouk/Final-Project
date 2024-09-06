/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Style from './CategoriesSlider.module.css'
import Slider from 'react-slick'
import axios from 'axios';
import { data } from 'autoprefixer';

export default function CategoriesSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay:true
    }
    const [categories, setCategories] = useState([]);

async function getCategories() {
    await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then(({data})=>{
        setCategories(data.data)
    })
.catch((error)=>{

})
    }
    useEffect(() => {
        getCategories();
    }, []);

    return <>

<div className="py-5">
<h2 className='text-green-700 py-4 text-center'>Shop Popular Categories</h2>
<Slider {...settings}>

{categories.map((category)=>
<div>
<img className='category-img w-full p-2' src={category.image} alt="" />  
<h3 className="font-light mt-2 text-green-600">{category.name}</h3>  
</div>)}
</Slider >

</div>

    </>
}