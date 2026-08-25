import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { RiCloseFill } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import image from "../../imgs/logo.png";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import { ICONS_NETWORKING } from "../../data/header";
import OpenInscriptionTopBar from "../OpenInscriptionTopBar";

const Header = () => {
  const [navMobile, setNavMobile] = useState(false);
  const reduce = useReducedMotion();

  // Cascada para el cluster derecho (nav + redes)
  const clusterVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
  };
  const itemVariants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: -14 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 22 } },
  };

  return (
    <header className="sticky top-0 left-0 right-0 w-full z-40">
      {/* Aviso: inscripciones abiertas */}
      <OpenInscriptionTopBar />

      {/* Barra principal con entrada épica */}
      <motion.div
        initial={reduce ? false : { y: -110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="bg-primary-100 border-b-2 border-[#f70808] shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 lg:px-10 h-16">
          {/* Izquierda: menú mobile + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNavMobile(!navMobile)}
              className="sm:hidden text-neutral-100"
              aria-label="Abrir menú"
            >
              {navMobile ? (
                <RiCloseFill className="text-3xl cursor-pointer" />
              ) : (
                <MdMenu className="text-3xl cursor-pointer" />
              )}
            </button>

            <motion.div
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            >
              <Link to="/" className="flex items-center gap-2.5">
                <motion.img
                  src={image}
                  alt="AFIBA"
                  className="h-10 w-auto"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14 }}
                />
                <motion.span
                  className="text-xl font-black text-neutral-100 tracking-tight leading-none"
                  whileHover={{ letterSpacing: "0.04em", color: "#54A17D" }}
                >
                  AFIBA
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Derecha (desktop): nav + redes en cascada */}
          <motion.div
            className="hidden sm:flex items-center gap-6"
            variants={clusterVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <Nav />
            </motion.div>

            <motion.span variants={itemVariants} className="w-px h-6 bg-white/15" />

            <div className="flex items-center gap-3 text-neutral-100">
              {ICONS_NETWORKING.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.18, color: "#54A17D" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-lg transition-colors"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav mobile (overlay) */}
          <NavMobile navMobile={navMobile} setNavMobile={setNavMobile} />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;