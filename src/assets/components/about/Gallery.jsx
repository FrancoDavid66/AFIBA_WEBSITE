import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { STAFF } from "../../data/about";

const Gallery = () => {
  const [file, setFile] = useState(null);
  console.log(file);

  // Reorganizar STAFF para mostrar las últimas fotos al principio
  const reversedStaff = [...STAFF].reverse();

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="container">
      {/* Título de la galería */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={{ hidden: { opacity: 0, y: 100 }, show: { opacity: 1, y: 0 } }}
        transition={{ delay: 0.3 }}
        className="w-full flex justify-start items-center gap-5"
      >
        <h4 className="h4 uppercase py-10 text-primary-100 flex justify-start items-center gap-5">
          GALERIA{" "}
          <span>
            <FaCamera className="h4" />
          </span>
        </h4>
        <div className="w-full h-[2px] bg-primary-200"></div>
      </motion.div>

      {/* Contenedor de medios */}
      <div className="media-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reversedStaff.map((item, i) => {
          const ref = React.useRef(null);
          const isInView = useInView(ref, { once: true });

          return (
            <motion.div
              ref={ref}
              key={i}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="media cursor-pointer"
              onClick={() => setFile(item)}
            >
              {item.type === "image" ? (
                <img src={item.url} alt={item.url} className="w-full h-auto" />
              ) : (
                <video src={`${item.url}#t=0.001`} muted preload="metadata" className="w-full h-auto"></video>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Popup para mostrar archivo seleccionado */}
      <div className="popup-media" style={{ display: file ? "block" : "none" }}>
        <span onClick={() => setFile(null)}>&times;</span>
        {file?.type === "video" ? (
          <video src={file.url} muted autoPlay controls />
        ) : (
          <img src={file?.url} />
        )}
      </div>
    </div>
  );
};

export default Gallery;
