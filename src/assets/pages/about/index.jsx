import React from "react";
import banner from "../../imgs/about/banner.webp";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import Info from "../../components/about/Info";
import Members from "../../components/about/Members";
import Gallery from "../../components/about/Gallery";

const About = () => {
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="w-full h-auto flex flex-col justify-center gap-y-10"
    >
      {/* Hero */}
      <div className="h-auto w-full flex flex-col-reverse">
        <div className="w-full md:bg-gradient-to-l md:from-black md:to-primary-300 bg-gradient-to-t from-[#151515] to-primary-300 h-auto flex flex-col-reverse lg:flex-row justify-center items-center">
          <div className="w-full lg:w-[40%] flex flex-col-reverse text-center m-auto px-5 py-10 lg:py-0">
            <motion.h3
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              className="h4 md:h3 font-bold text-primary-100 md:text-primary-200"
            >
              NOSOTROS
            </motion.h3>
          </div>
          <div className="w-full lg:w-[60%] m-auto h-full overflow-hidden">
            <img src={banner} alt="Banner" className="w-full" />
          </div>
        </div>
      </div>

      {/* Contenedor de texto/banner */}
      <div className="w-full h-auto flex">
        <div className="w-full h-full flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="text-center my-10 flex flex-col gap-y-10"
          >
            <motion.h1 variants={textVariants} className="h1">
              AFIBA
            </motion.h1>
            <motion.h4
              variants={textVariants}
              className="w-[90%] h4 text-center m-auto leading-relaxed tracking-[4px]"
            >
              EN{" "}
              <span>AFIBA</span> SOMOS LÍDERES EN FISICOCULTURISMO, PROMOVIENDO ESTE DEPORTE EN NUESTRA COMUNIDAD Y MÁS ALLÁ. NOS ESFORZAMOS POR CREAR UN AMBIENTE INCLUSIVO Y ACCESIBLE PARA ATLETAS DE TODOS LOS NIVELES.
            </motion.h4>
          </motion.div>
          {/* Texto animado */}
          <motion.h4 variants={textVariants} className="text-center py-5 tracking-widest">
            SOMOS EL EJEMPLO DE...
          </motion.h4>
          <motion.h4 variants={textVariants} className="h4 text-center">
            <ReactTyped
              className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
              strings={["DEDICACION", "CONTANCIA", "DISCIPLINA"]}
              typeSpeed={120}
              backSpeed={70}
              loop
            />
          </motion.h4>
        </div>
      </div>
      <Info />

      {/* Sección de miembros del comité */}
      <Members />
      {/* Galería */}
      <Gallery />
    </motion.section>
  );
};

export default About;
