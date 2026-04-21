import React from "react";
// Import react-slick
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import DATA
import { CARROUSEL } from "../../data/home";

const Carrousel = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
 
          slidesToScroll: 3,
          infinite: true,
     
        }
      },
      {
        breakpoint: 600,
        settings: {
    
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
    
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="w-full  lg:w-[60%] m-auto text-neutral-100 h-full  overflow-hidden">
      <Slider {...settings}>
        {CARROUSEL.map((item, i) => (
          <div
            key={i}
            className="w-full h-full cursor-pointer  "
       
          >
            <video src={item.image} autoplay loop controls muted />
           {/* <img src={item.image} alt="" className="w-full h-full " />*/}

            <div className=" text-md lg:text-xl   relative -top-[12rem]  left-6 w-[60%]  ">
              <h4  className="h4 text-neutral-100  ">Titulo</h4>
              <h5  className="h5  text-neutral-100 ">Subtitulo</h5>
              <p className="line-clamp-3  text-neutral-100"> {item.title} </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrousel;

{
  /*  <div key={i }  className="  w-full h-full  overflow-hidden"  style={{backgroundImage:`url('${item.image} ')`}}>
            <div className="  w-full h-full  overflow-hidden" >
              <img
                src={item.image}
                alt="image"
                className="w-full h-full   hover:scale-110 transition-all duration-300 "
              />
            </div>
            <div>
              <p className="line-clamp-1">{item.title} </p>
            </div>
          </div> */
}
