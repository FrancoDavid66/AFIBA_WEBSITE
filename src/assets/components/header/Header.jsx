// src/assets/components/header/Header.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import logo from "../../imgs/logo.png";
import Nav from "./Nav";
import NavMobile, { socialLabel } from "./NavMobile";
import { ICONS_NETWORKING } from "../../data/header";
import OpenInscriptionTopBar from "../OpenInscriptionTopBar";
import { getOpenEvent } from "../../utils/calendar/openEvent";

// Clases fijas (sin ternarios dentro de template literals)
const BAR_BASE = "relative backdrop-blur-md transition-[background-color,box-shadow] duration-300";
const BAR_TOP = BAR_BASE + " bg-primary-100";
const BAR_SCROLLED = BAR_BASE + " bg-[#0b2a20]/95 shadow-[0_12px_32px_rgba(0,0,0,0.45)]";

const Header = () => {
  const [navMobile, setNavMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const openEvent = useMemo(() => getOpenEvent(), []);
  const closeMobile = useCallback(() => setNavMobile(false), []);

  // Sombra y fondo más sólido al scrollear
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al cambiar de página se cierra el menú mobile
  useEffect(() => { setNavMobile(false); }, [pathname]);

  const onForm = pathname.toLowerCase().includes("registrationform");
  const showCta = Boolean(openEvent) && !onForm;
  const barClass = scrolled ? BAR_SCROLLED : BAR_TOP;

  return (
    <header className="sticky top-0 inset-x-0 z-40">
      {/* Aviso: inscripciones abiertas */}
      <OpenInscriptionTopBar />

      <motion.div
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 22 }}
        className={barClass}
      >
        <div className="max-w-7xl mx-auto h-[72px] px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
          {/* Marca */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="AFIBA — Inicio">
            <motion.img
              src={logo}
              alt="AFIBA"
              className="h-11 w-11 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
              whileHover={reduce ? undefined : { rotate: -6, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
            <span className="flex flex-col leading-none">
              <span className="font-primary text-[1.35rem] font-bold tracking-[0.16em] text-white">AFIBA</span>
              <span className="hidden min-[380px]:block mt-1.5 text-[9px] sm:text-[9.5px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/55">
                Fisicoculturismo · Buenos Aires
              </span>
            </span>
          </Link>

          {/* Navegación (desktop) */}
          <Nav />

          {/* Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden min-[1200px]:flex items-center gap-1">
              {ICONS_NETWORKING.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={socialLabel(item.href)}
                  title={socialLabel(item.href)}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-full grid place-items-center text-[15px] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>

            {showCta && (
              <Link to="/RegistrationForm" state={{ tournament: openEvent }} className="hidden md:inline-flex">
                <motion.span
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-400 text-black font-bold uppercase tracking-[0.12em] text-[12px] px-5 py-2.5 shadow-[0_8px_24px_rgba(34,197,94,0.35)] transition-colors"
                >
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 w-1/3 bg-white/40 -skew-x-12 pointer-events-none"
                      initial={{ x: "-220%" }}
                      animate={{ x: "420%" }}
                      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
                    />
                  )}
                  <span className="relative">Inscribite</span>
                  <FaArrowRight size={11} className="relative" />
                </motion.span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setNavMobile(true)}
              className="lg:hidden w-11 h-11 -mr-2 grid place-items-center rounded-full text-white hover:bg-white/10 transition-colors"
              aria-label="Abrir menú"
              aria-expanded={navMobile}
            >
              <HiMenuAlt3 className="text-[26px]" />
            </button>
          </div>
        </div>

        {/* Línea de acento AFIBA */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#f70808] to-transparent" />
      </motion.div>

      <NavMobile open={navMobile} onClose={closeMobile} openEvent={openEvent} />
    </header>
  );
};

export default Header;
