import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Results from "../../components/home/Results";
import Newsletter from "../../components/home/Newsletter";
import OpenInscriptionBanner from "../../components/home/OpenInscriptionBanner";
import NewsModal from "../../components/home/NewsModal";

// Lazy-loaded components
const BannerMain = React.lazy(() => import("../../components/home/BannerMain"));
const Notices = React.lazy(() => import("../../components/home/Notices"));
const HomeCalendar = React.lazy(() => import("../../components/home/HomeCalendar"));
const Sponsors = React.lazy(() => import("../../components/home/Sponsors"));
const Gyms = React.lazy(() => import("../../components/home/Gyms"));
const MaleModalityHome = React.lazy(() => import("../../components/home/MaleModalityHome"));
const FemaleModalityHome = React.lazy(() => import("../../components/home/FemaleModalityHome"));
const FrontPageNews = React.lazy(() => import("../../components/home/FrontPageNews"));

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <motion.section
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Modal de novedades (se muestra al entrar) */}
      <NewsModal />

      <Suspense fallback={<div className="py-20 text-center text-neutral-400">Cargando...</div>}>
        {/* 1. Hero principal */}
        <motion.div variants={itemVariants} className="mb-8">
          <BannerMain />
        </motion.div>

        {/* 2. Inscripciones abiertas (se muestra solo si hay un evento habilitado) */}
        <motion.div variants={itemVariants} className="mb-8">
          <OpenInscriptionBanner />
        </motion.div>

        {/* 3. Calendario */}
        <motion.div variants={itemVariants} className="mb-8">
          <HomeCalendar />
        </motion.div>

        {/* 4. Noticias destacadas */}
        <motion.div variants={itemVariants} className="mb-8">
          <FrontPageNews />
        </motion.div>

        {/* 5. Resultados */}
        <motion.div variants={itemVariants} className="mb-8">
          <Results />
        </motion.div>

        {/* 6. Notices */}
        <motion.div variants={itemVariants} className="mb-8">
          <Notices />
        </motion.div>

        {/* 7. Sponsors */}
        <motion.div variants={itemVariants} className="mb-8">
          <Sponsors />
        </motion.div>

        {/* 8. Gimnasios recomendados */}
        <motion.div variants={itemVariants} className="mb-8">
          <Gyms />
        </motion.div>

        {/* 9. Modalidades */}
        <motion.div variants={itemVariants} className="mb-8">
          <MaleModalityHome />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <FemaleModalityHome />
        </motion.div>

        {/* 10. Newsletter (cierre) */}
        <motion.div variants={itemVariants} className="mb-8">
          <Newsletter />
        </motion.div>
      </Suspense>
    </motion.section>
  );
};

export default Home;