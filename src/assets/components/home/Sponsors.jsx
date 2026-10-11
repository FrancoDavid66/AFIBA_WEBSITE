import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/Card3d/index.css';
import { SPONSORS } from '../../data/sponsors';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
  hover: { y: -5 },
};

// Clases planas (sin ternarios dentro de template literals)
const CARD_FRONT = "thefront bg-gray-800 border-[1px] border-gray-500 overflow-hidden";
const CARD_FRONT_NEW = "thefront bg-black border-[1px] border-orange-500/70 overflow-hidden shadow-[0_0_35px_rgba(249,115,22,0.35)]";

const Sponsors = () => {
  return (
    <section className="w-full h-auto">
      <div className="maincontainer w-full m-auto flex flex-col items-center">
        <h4 className="h4 py-9">NUESTROS VALIOSOS SPONSORS</h4>
        <motion.div
          className="w-full flex gap-10 flex-wrap justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {SPONSORS.map((item, i) => {
            const frontClass = item.isNew ? CARD_FRONT_NEW : CARD_FRONT;
            const content = (
              <>
                <img src={item.image} alt={item.name || `Sponsor ${i + 1}`} loading="lazy" />
                {item.isNew && (
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[0_0_18px_rgba(249,115,22,0.6)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                    Nuevo sponsor
                  </span>
                )}
              </>
            );

            return (
              <motion.div
                key={item.name || i}
                className="thecard"
                variants={itemVariants}
                whileHover="hover"
              >
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={frontClass}>
                    {content}
                  </a>
                ) : (
                  <div className={frontClass}>{content}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
