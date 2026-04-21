import React, { useState } from "react";
import { MODALITIES } from "../../data/modalities";
import { motion } from "framer-motion";

const Rules = () => {
  const [searchTerm, setSearchTerm] = useState(" ");

  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  const filteredTournaments = MODALITIES.filter(tournament => 
    tournament.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full flex flex-col justify-center h-auto items-center m-auto gap-y-10 bg-[#151515] text-primary-200">
      <div className="w-[90%] h-auto py-20 flex flex-col justify-center items-center gap-y-7">
        <div className="w-full m-auto text-center">
          <h2 className="text-primary-100 h2">REGLAS DE TORNEOS AFIBA</h2>
        </div>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="py-20 w-full mt-1 m-auto">
          <ul className="list-none w-full">
            {filteredTournaments.map((item, i) => (
              <motion.li
                key={i}
                className="bg-primary-200 mb-4 p-4 rounded-lg flex justify-between items-center shadow-md"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg md:text-xl text-primary-500">
                  {item.title}
                </span>
                <motion.button
                  className="py-2 px-4 bg-primary-300 text-white rounded-lg hover:bg-primary-400 transition-colors"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  onClick={() => downloadFileAtURL(item.rules)}
                >
                  Descargar Reglas
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Rules;
