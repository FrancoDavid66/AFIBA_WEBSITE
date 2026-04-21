import React from "react";
// Importar imágenes
import imageInfo from "../../imgs/about/info/image1.jpg";
import imageInfo2 from "../../imgs/about/info/image3.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Info = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      exit={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", delay: 0.3 }}
      className="gap-y-5 flex flex-col py-5"
    >
      {/* Sección de Información 1 */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", delay: 0.3 }}
        className="w-full p-10 h-auto m-auto flex flex-col md:flex-row justify-center gap-y-5 md:gap-5 items-center md:items-start"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-1/2 m-auto"
        >
          <img src={imageInfo} alt="image-info" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="w-full md:w-2/3 m-auto text-left px-5 gap-5 flex flex-col"
        >
          <h2 className="h3">NUESTRA MISION</h2>
          <p className="w-11/12 text-lg md:text-base xl:text-xl tracking-wider font-light">
            El foco principal de la Federación será estandarizar las promociones
            de las competiciones de culturismo natural. Al lograr esto, los
            competidores, público, proveedores y cualquier otra persona
            involucrada tendrá una experiencia más agradable y se van con una
            impresión increíble de lo que acaban de ver. También tendrá un
            Director de juzgar. Esa persona será el responsable de la formación
            y la contratación de un grupo de jueces que estarán disponibles para
            juzgar a cualquier muestra.
          </p>
        </motion.div>
      </motion.div>

      {/* Sección de Información 2 */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", delay: 0.3 }}
        className="w-full p-10 h-auto m-auto flex flex-col md:flex-row justify-center gap-y-5 md:gap-5 items-center md:items-start"
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="w-full md:w-2/3 m-auto text-left px-5 gap-5 flex flex-col"
        >
          <h2 className="h3">MIRAMOS HACIA EL FUTURO</h2>
          <p className="w-11/12 text-lg md:text-base xl:text-xl tracking-widest">
            Miramos hacia el futuro AFIBA está abriendo una nueva página en el
            libro del físico culturismo. La nueva norma será el espectáculo, que
            es tan buena como la organización y si usted está compitiendo,
            coaching, a juzgar, espectador o un proveedor en un evento nacional
            de la federación de culturismo, sabe que va a ser una experiencia
            eficiente, justa y agradable para todos los involucrados!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="w-full lg:w-1/2 m-auto"
        >
          <img src={imageInfo2} alt="image-info" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Info;
