import React from "react";
import { GIMS } from "../../data/gims";
import '../../styles/Card3d/index.css';

const Gyms = () => {
  return (
    <section className="w-full h-auto">
      <div className="maincontainer w-full m-auto flex flex-col items-center">
        <h3 className="h3 py-9 text-center">¡GIMNASIOS RECOMENDADOS!</h3>
        <div className="w-full flex gap-10 flex-wrap justify-center items-center">
          {GIMS.map((gym, index) => (
            <div key={index} className="thecard">
              <div className="thefront bg-gray-800 border-[1px] border-gray-500">
                <img src={gym.image} alt={`Imagen de ${gym.href}`} />
              </div>
              <div className="theback border-[1px] border-gray-500 bg-gray-800">
                <img src={gym.image} alt={`Imagen de ${gym.href}`} />
                <div className="overlay">
                  <h3>{gym.name}</h3> {/* Nombre del gimnasio */}
                  <div className="flex justify-center gap-10">
                    <a href={gym.href} target="_blank" rel="noopener noreferrer">
                      INSTAGRAM
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gyms;
