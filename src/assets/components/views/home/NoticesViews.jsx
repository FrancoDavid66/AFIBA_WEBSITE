import React from "react";
import { useParams } from "react-router-dom";
import {  NOTICES } from "../../../data/home";
import { ICONS_NETWORKING } from "../../../data/header";
import { SPONSORS } from "../../../data/sponsors";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import motiopn
import { motion, useCycle } from "framer-motion";
//import image/videos


import afibaGif from '../../../videos/afibaGif.gif'
import Sponsors from "../../home/Sponsors";

const NoticesViews = () => {
  const { id } = useParams();

  const item = NOTICES.find((item) => item.id === id);
  const { title, image, description } = item;
  const [animation, cycleAnimation] = useCycle("initial", "animate");
  const [animation2, cycleAnimation2] = useCycle("initial", "animate");

  const  btn_animation = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
    },
  };
  const  btn_animation2 = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
    },
  };

 

  const anime = (v) => {
    v === 1 ? cycleAnimation():
   
    cycleAnimation2()
  };
  

 
  return (
    <section className="w-full flex flex-col justify-center h-auto items-center m-auto gap-y-10">
      <div className="w-[90%] h-auto py-20 flex flex-col justify-center items-center gap-y-7 ">
        <div className="w-full m-auto  text-center ">
          <h2 className="h2"> {title} </h2>
        </div>

        <div className="h-[600px] w-full  bg-cover bg-top bg-no-repeat rounded-xl  overflow-hidden"
        style={{backgroundImage:`url('${image}')`}}
        >
     
        </div>
     
      </div>

      {/* informacion */}
      <div className="pb-12  w-[90%]">
        <div className=" mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:justify-between">
            <div className="w-full lg:w-1/2 lg:pr-8 mb-6 lg:mb-0 flex justify-center">
              <img className="rounded-lg shadow" src={image} alt="Misión" />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <p className="text-neutral-100">
               {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* sponsors */}
     <Sponsors/>
{/* inscription and rules */}

    </section>
  );
};

export default NoticesViews;
