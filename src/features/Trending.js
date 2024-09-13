import React from 'react';

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import trending from "../assets/trendingFile.json";

const Trending = () => {

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-black hover:bg-indigo-800 scale-125 text-white rounded-full`}
        style={style}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-black hover:bg-indigo-800 scale-125 text-white rounded-full`}
        style={style}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="bg-gray-100 mx-5 py-8">
      <div className='mx-auto px-4'>
        <Slider {...settings}>
          {
            trending.map((d) => (
              <div key={d.id} className='rounded-xl bg-white shadow-md overflow-hidden'>
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