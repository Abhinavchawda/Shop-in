import React from 'react'

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import trending from "../assets/trendingFile.json"


const Trending = () => {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear"
  };

  return (
    <div>
      <div>
        <Slider {...settings}>
          {
            trending.map((d) => (
              <div key={d.id} className='rounded-xl'>
                <img src={d.image} alt='trending' className='mx-auto rounded-xl w-[80vw] h-[400px]'></img>
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  )
}

export default Trending;
