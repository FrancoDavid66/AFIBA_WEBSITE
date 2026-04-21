import React from 'react';
import { Link } from 'react-router-dom';
import { RESULTS } from '../../data/results';

// Flyer + PDF del “estado anterior” de HomeCalendar (Torneo Independencia)
import bannerIndependencia from '../../imgs/calendar/2025/CAMPEONATO_INDEPENDENCIA.webp';
import pdfIndependencia from '../../data/results/2025/INDEPENDENCIA.pdf';

const Results = () => {
  // Resultados 2025 (tres primeros desde el JSON)
  const recentResults = RESULTS.filter(r => r.year === '2025').slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold uppercase">
        ÚLTIMOS RESULTADOS 2025
      </h2>
      <p className="text-sm sm:text-base lg:text-lg mb-4">
        Haz clic para descargar los resultados
      </p>

      {/* Grid responsive para incluir el flyer del Torneo Independencia primero */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        {/* Card fija: Torneo Independencia (flyer + PDF) */}
        <a href={pdfIndependencia} download className="w-full">
          <img
            src={bannerIndependencia}
            alt="Resultados Torneo Independencia 2025"
            className="w-full h-full object-cover rounded-lg"
          />
        </a>

        {/* Resto desde el JSON */}
        {recentResults.map((result, index) => (
          <a key={index} href={result.pdf} download className="w-full">
            <img
              src={result.image}
              alt={`Resultado ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </a>
        ))}
      </div>

      <div className="mt-4 flex justify-center w-full">
        <Link to="/results">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600">
            Ver todos los resultados
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Results;
