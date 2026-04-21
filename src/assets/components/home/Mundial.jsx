import React from "react";
// Import react-slick
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MUNDIAL } from "../../data/home";
import { Link } from "react-router-dom";

const Mundial = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    centerMode: true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
  return (
    <section className="h-[300px] ">
      <div className="p-5 ">
        <h4 className=" font-black ">INSIDE AFIBA</h4>
      </div>
      <div>
        <Slider {...settings} className="slick-slide2">
          {MUNDIAL.map((item, i) => (
            <Link to={`/MundialViews/${item.id}`} key={i}  >
                <div className="rounded-xl m-1 overflow-hidden ml-3 cursor-pointer">
                <img
                src={item.image}
                alt="image"
                className="w-[400px] h-[150px]  rounded-lg hover:scale-105 transition-all duration-300"
              />
                </div>
                <div>
                    <p className="line-clamp-1">{item.title} </p>
                </div>
             
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Mundial;
