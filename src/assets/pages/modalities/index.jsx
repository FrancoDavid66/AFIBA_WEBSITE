import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import images
import image_female from '../../imgs/modalities/section/female.jpg';
import image_male from '../../imgs/modalities/section/male.jpg';
import image_mixto from '../../imgs/modalities/section/mixto.jpg';

// Import data
import { MODALITIES } from "../../data/modalities";

const Modalities = () => {
  // Estado para controlar el filtro de modalidades
  const [filter, setFilter] = useState("All");

  // Filtra las modalidades según el estado del filtro
  const filteredModalities = filter === "All" ? MODALITIES : MODALITIES.filter(modality => modality.tag === filter);

  // Determina la imagen del banner según el filtro seleccionado
  const bannerImage = filter === "masculino" ? image_male
                     : filter === "mixto" ? image_mixto
                     : image_female; // Imagen por defecto (femenino) para "All" y otros filtros

  return (
    <section className="w-full flex flex-col justify-center h-auto items-center m-auto gap-y-10">
      <div className="w-[90%] h-auto py-20 flex flex-col justify-center items-center gap-y-7">
        {/* Título de la sección */}
        <div className="w-full m-auto text-center">
          <h2 className="h2">MODALIDADES</h2>
        </div>

        {/* Imagen del banner según el filtro */}
        <div
          className="h-[300px] md:h-[400px] w-full bg-cover bg-top bg-no-repeat rounded-xl overflow-hidden"
          style={{ backgroundImage: `url('${bannerImage}')` }}
        ></div>

        {/* Botones de filtro */}
        <div className="flex justify-center items-center gap-4 mb-10 flex-wrap"> {/* Aumenté el gap aquí */}
          <button
            className={`py-2 px-3 rounded-lg ${filter === "femenino" ? "bg-green-500 text-white" : "bg-gray-200 text-black"} text-xs md:text-base`}
            onClick={() => setFilter("femenino")}
          >
            Femenino
          </button>
          <button
            className={`py-2 px-3 rounded-lg ${filter === "masculino" ? "bg-green-500 text-white" : "bg-gray-200 text-black"} text-xs md:text-base`}
            onClick={() => setFilter("masculino")}
          >
            Masculino
          </button>
          <button
            className={`py-2 px-3 rounded-lg ${filter === "mixto" ? "bg-green-500 text-white" : "bg-gray-200 text-black"} text-xs md:text-base`}
            onClick={() => setFilter("mixto")}
          >
            Mixto
          </button>
          <button
            className={`py-2 px-3 rounded-lg ${filter === "All" ? "bg-green-500 text-white" : "bg-gray-200 text-black"} text-xs md:text-base`}
            onClick={() => setFilter("All")}
          >
            Ver todas
          </button>
        </div>

        {/* Grid de modalidades filtradas */}
        <div className="py-20 w-full mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-5 m-auto">
          {filteredModalities.map((item, i) => (
            <div
              key={i}
              className="bg-black w-full h-[300px] md:h-[400px] rounded-lg flex flex-col justify-center bg-center bg-cover bg-no-repeat shadow-md transition-shadow duration-300 hover:shadow-xl"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <h4 className="text-lg md:text-xl text-primary-200 text-center py-4 bg-gradient-to-b from-black to-transparent rounded-t-lg">
                {item.title}
              </h4>
              <div className="w-full h-full p-4 flex flex-col justify-end bg-gradient-to-t from-black to-transparent rounded-b-lg">
                <div className="w-full flex justify-around items-center mt-4">
                  <Link
                    to={`/modalidad/${item.id}`}
                    className="text-md text-primary-200 hover:text-primary-400 transition-all cursor-pointer hover:scale-105"
                  >
                    VER MÁS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modalities;
