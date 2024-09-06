/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import axios from 'axios';
import mainSlider from '../../assets/images/slider-image-3.jpeg'
import slid1 from '../../assets/images/slider-image-1.jpeg'
import slid2 from '../../assets/images/slider-image-2.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'

import Slider from 'react-slick';

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll:1,
        autoplay:true
    }
    return <>
        <div className='flex row' >
            <div className="w-3/4">

                <Slider {...settings}>
                    <img src={mainSlider} alt="" className="w-full h-[400px]" />
                    <img src={blog1} alt="" className="w-full h-[400px]" />
                    <img src={blog2} alt="" className="w-full h-[400px]" />

                </Slider >
            </div>

            <div className="w-1/4">
                <img src={slid1} alt="" className="w-full h-[200px] " />
                <img src={slid2} alt="" className="w-full h-[200px]" />

            </div>
        </div>
    </>
}
