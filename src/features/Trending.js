import React from 'react'


import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import trending from "../assets/trendingFile.json"


const Trending = () => {

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  // };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear"
  };


  return (
    <div>
      {/* <div className='border border-black my-5 rounded-xl flex justify-center items-center'> */}
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

        {/* <Slider {...settings}>
          <div className='bg-black'>
            <h3>1111</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider> */}
      </div>
    </div>
  )
}

export default Trending;
