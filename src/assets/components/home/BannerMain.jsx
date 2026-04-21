import React, { useState } from "react";
import { Link } from "react-router-dom";
import video from "../../videos/home/presentacion1.mp4";
import video2 from "../../videos/home/presentacion4.mp4";
import video3 from "../../videos/home/presentacion3.mp4";

import image1 from '../../imgs/home/videoImageBanner/presentacion1.png';
import image2 from '../../imgs/home/videoImageBanner/presentacion2.png';
import image3 from '../../imgs/home/videoImageBanner/presentacion3.png';

const CarrouselMain = () => {
  const [video1Error, setVideo1Error] = useState(false);
  const [video2Error, setVideo2Error] = useState(false);
  const [video3Error, setVideo3Error] = useState(false);

  // Verifica si el dispositivo es móvil
  const isMobile = window.innerWidth <= 768; // Cambia 768 por el ancho deseado para definir móviles

  return (
    <div className="h-[auto] w-full bg-cover bg-top bg-no-repeat flex flex-col md:flex-row justify-center items-center md:bg-gradient-to-l md:from-black md:to-primary-300 bg-gradient-to-t from-black to-primary-300">
      <div className="w-full h-auto py-10 md:py-0">
        <div className="w-[90%] h-full m-auto flex flex-col justify-center items-start gap-y-5">
          <h2 className="h5 text-neutral-100">
            ASOCIACION DE FISICOCULTURISMO DE LA PROVINCIA DE BUENOS AIRES
          </h2>
          <p className="w-[100%] text-lg line-clamp-5 sm:line-clamp-none text-neutral-100">
            SIN FINES DE LUCRO.
          </p>
          <button className="btn rounded-3xl border-2 border-neutral-100 hover:scale-110 transition-all duration-200 cursor-pointer">
            <Link to={"/About"}>QUIENES SOMOS</Link>
          </button>
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center">
        {/* Video 1 */}
        <div className="w-1/3 h-full overflow-hidden">
          {isMobile || video1Error ? (
            <img
              className="w-full h-full object-cover"
              src={image1}
              alt="Video 1"
            />
          ) : (
            <video
              className="w-full h-full scale-150 pointer-events-none select-none"
              autoPlay
              loop
              muted
              src={video}
              onError={() => setVideo1Error(true)} // Si falla, mostrar la imagen
            ></video>
          )}
        </div>

        {/* Video 2 */}
        <div className="w-1/3 h-full overflow-hidden">
          {isMobile || video2Error ? (
            <img
              className="w-full h-full object-cover"
              src={image2}
              alt="Video 2"
            />
          ) : (
            <video
              className="w-full h-full scale-150 pointer-events-none select-none"
              autoPlay
              loop
              muted
              src={video2}
              onError={() => setVideo2Error(true)} // Si falla, mostrar la imagen
            ></video>
          )}
        </div>

        {/* Video 3 */}
        <div className="w-1/3 h-full overflow-hidden">
          {isMobile || video3Error ? (
            <img
              className="w-full h-full object-cover"
              src={image3}
              alt="Video 3"
            />
          ) : (
            <video
              className="w-full h-full scale-150 pointer-events-none select-none"
              autoPlay
              loop
              muted
              src={video3}
              onError={() => setVideo3Error(true)} // Si falla, mostrar la imagen
            ></video>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarrouselMain;
