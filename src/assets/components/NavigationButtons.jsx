import React from "react";
import { Link } from "react-router-dom";

const NavigationButtons = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh] space-y-6">
      <div className="text-center">
        <Link to="/eventInfo">
          <button className="bg-primary-300 text-white font-bold py-2 px-4 rounded">
            INFORMACIÓN DEL EVENTO
          </button>
        </Link>
      </div>

      <Link to="/RegistrationForm">
        <button className="bg-primary-100 hover:bg-primary-100/50 text-white font-bold py-2 px-4 rounded transition duration-300">
          FORMULARIO DE PREINSCRIPCIÓN
        </button>
      </Link>

      {/* <p className="text-red-500 text-sm">El período de preinscripción ha finalizado.</p> */}
    </div>
  );
};

export default NavigationButtons;
