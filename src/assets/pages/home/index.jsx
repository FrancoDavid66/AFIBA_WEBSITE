import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Result from "postcss/lib/result";
import Results from "../../components/home/Results";
import Results2 from "../../components/home/Results2";
import Newsletter from "../../components/home/Newsletter";

// Lazy-loaded components
const BannerMain = React.lazy(() => import("../../components/home/BannerMain"));
const Notices = React.lazy(() => import("../../components/home/Notices"));
const HomeCalendar = React.lazy(() =>
  import("../../components/home/HomeCalendar")
);
const Sponsors = React.lazy(() => import("../../components/home/Sponsors"));

const Gyms = React.lazy(() => import("../../components/home/Gyms"));
const MaleModalityHome = React.lazy(() =>
  import("../../components/home/MaleModalityHome")
);

const FemaleModalityHome = React.lazy(() =>
  import("../../components/home/FemaleModalityHome")
);

import FrontPageNews from "../../components/home/FrontPageNews"; // 👈 importá el componente arriba


const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
              <motion.div variants={itemVariants} className="mb-8">
          <HomeCalendar />
        </motion.div>
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div variants={itemVariants} className="mb-8">
          <BannerMain />
        </motion.div>
         
           
           <motion.div variants={itemVariants} className="mb-8">
           <FrontPageNews />
        </motion.div>
      

        <motion.div variants={itemVariants} className="mb-8">
          <Results />
        </motion.div>
        <motion.div variants={itemVariants} className="mb-8">
          <Sponsors />
        </motion.div>
        <motion.div variants={itemVariants} className="mb-8">
          <Notices />
        </motion.div>



        <motion.div variants={itemVariants} className="mb-8">
          <Newsletter />
        </motion.div>



        <motion.div variants={itemVariants} className="mb-8">
          <Gyms />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <MaleModalityHome />
        </motion.div>



        <motion.div variants={itemVariants} className="mb-8">
          <FemaleModalityHome />
        </motion.div>
      </Suspense>
    </motion.section>
  );
};

export default Home;
