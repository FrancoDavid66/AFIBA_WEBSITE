import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Import motion from framer-motion
import { motion, useCycle } from "framer-motion";



// Import data and components
import { MODALITIES } from "../../../data/modalities";
import Sponsors from "../../home/Sponsors";

const ModalitiesView = () => {
  const { id } = useParams();
  const item = MODALITIES.find((item) => item.id === id);
  const { title, image, description, images, rules } = item;
  const [animation, cycleAnimation] = useCycle("initial", "animate");
  const [animation2, cycleAnimation2] = useCycle("initial", "animate");

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const btn_animation = {
    initial: { scale: 0 },
    animate: { scale: 1 },
  };

  const anime = (v) => {
    v === 1 ? cycleAnimation() : cycleAnimation2();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
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
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="w-full flex flex-col justify-center items-center m-auto gap-y-20">
      {/* Banner Section */}
      <div className="w-[90%] h-auto py-20 flex flex-col justify-center items-center gap-y-7">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold">{title}</h2>
        </div>
        <div className="w-full h-[600px] bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden">
          <img src={image} className="w-full h-full object-cover rounded-xl" alt={title} />
        </div>
      </div>

      {/* Information Section */}
      <div className="pb-12 w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-8">
          <div className="w-full lg:w-1/2">
            <img className="rounded-lg shadow-lg" src={image} alt={title} />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">¿QUÉ ES {title}?</h2>
            <p className="text-lg xl:text-xl tracking-wider font-light">{description}</p>
     
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="w-full flex flex-col">
        <h4 className="h4 text-2xl text-center mb-6">IMÁGENES</h4>
        <Slider {...settings} className="slick-slide_themes">
          {images.map((item, i) => (
            <div key={i} className="flex justify-center items-center">
              <div
                className="rounded-xl m-1 overflow-hidden w-[90%] h-[400px] cursor-pointer bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
                onClick={() => openModal(item.image)}
              >
                <div className="w-full h-full flex justify-center items-center hover:bg-black/50 rounded-xl"></div>
              </div>
              <div className="w-[90%]">
                <p className="text-sm text-center">{item.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Sponsors Section */}
      <Sponsors />

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="relative w-[80%] md:w-[60%] h-[90vh] lg:w-[40%] bg-primary-100 rounded-lg overflow-hidden shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <img src={selectedImage} className="w-full h-full object-contain" alt="Enlarged" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ModalitiesView;
