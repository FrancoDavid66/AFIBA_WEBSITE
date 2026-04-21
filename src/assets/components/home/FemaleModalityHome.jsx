import React, { useState } from "react";
import { TbEyeShare } from "react-icons/tb";
import "../../styles/NoticesHome/index.css";
import { MODALITIES } from "../../data/modalities/index";
import { Link } from "react-router-dom";

// Filtra las modalidades para obtener solo las femeninas
const femaleModalities = MODALITIES.filter(
  (modality) => modality.tag === "femenino"
);

// Limita el número de modalidades a 5
const limitedFemaleModalities = femaleModalities.slice(0, 5);

const FemaleModalityHome = () => {
  // Inicializa el estado con la primera modalidad de la lista
  const [selectedCard, setSelectedCard] = useState(
    limitedFemaleModalities[0]?.title
  );

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  return (
    <section className="h-auto flex flex-col justify-center items-center gap-y-10">
      <h2 className="h2">MODALIDADES FEMENINAS</h2>
      <Link to={"/modalidades"} className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold">Ver todas</Link>

      <div className="wrapper">
        <div className="container">
          {limitedFemaleModalities.map((modality) => (
            <div
              key={modality.title}
              className={`card ${
                selectedCard === modality.title ? "active" : ""
              } bg-top bg-cover bg-no-repeat`}
              onClick={() => handleCardClick(modality.title)}
              style={{ backgroundImage: `url('${modality.image}')` }}
            >
              <div className="row">
                <div className="icon">
                  <Link
                    to={"/modalidades"}
                    className="download-button"
                   
                  >
                    <TbEyeShare size={24} />
                  </Link>
                </div>
                <div className="description">
                  <h4>{modality.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FemaleModalityHome;
