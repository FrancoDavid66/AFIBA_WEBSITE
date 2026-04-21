import React, { useState, useEffect } from "react";
import { RESULTS } from "../data/results";
import { motion } from "framer-motion";

const Results = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar el loader

  useEffect(() => {
    // Simulamos un tiempo de carga con setTimeout
    const loadData = () => {
      setTimeout(() => {
        setIsLoading(false); // Después de 1.5 segundos, ocultamos el loader
      }, 1500); // Cambia el tiempo si es necesario
    };

    loadData();
  }, []);

  const handleDownload = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = RESULTS.filter((item) => {
    const matchesYear = selectedYear === "All" || item.year === selectedYear;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesYear && matchesSearch;
  });

  // Si está cargando, muestra un spinner o un mensaje
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6 px-10">
      <div className="w-full m-auto text-center py-10">
        <h2 className="h2">HISTORIAL DE RESULTADOS</h2>
      </div>
      <div className="mb-6 flex justify-center py-20 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="p-4 border rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-4 border rounded-md ml-4"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">Todos los años</option>
          {Array.from(new Set(RESULTS.map((item) => item.year))).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }} // Animación inicial para el contenedor
        animate={{ opacity: 1 }} // Animación cuando está listo
        transition={{ duration: 0.5 }} // Duración de la animación
      >
        {filteredResults.map((item, index) => (
          <motion.div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.image})`,
                height: "100%",
                width: "100%",
                filter: "brightness(0.6)",
              }}
              onLoad={() => setIsLoading(false)} // Asegúrate de que las imágenes se carguen
            ></div>
            <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
              <div className="bg-black bg-opacity-60 rounded-lg p-6 text-white text-center">
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-xl mb-6">Año: {item.year}</p>
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                  onClick={() => handleDownload(item.pdf)}
                >
                  Descargar PDF
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Results;
