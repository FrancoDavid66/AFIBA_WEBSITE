// src/assets/components/OpenInscriptionTopBar.jsx
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { getOpenEvent } from "../utils/calendar/openEvent";

const OpenInscriptionTopBar = () => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const ev = useMemo(() => getOpenEvent(), []);

  if (!ev) return null;
  if (pathname.toLowerCase().includes("registrationform")) return null;

  return (
    <Link to="/RegistrationForm" state={{ tournament: ev }} className="block group">
      <motion.div
        initial={reduce ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative w-full bg-green-500 text-black overflow-hidden"
      >
        {/* Brillo que barre */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none"
            initial={{ x: "-160%" }}
            animate={{ x: "360%" }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
          />
        )}

        <div className="relative max-w-7xl mx-auto h-9 px-4 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap">
          <motion.span
            className="w-2 h-2 rounded-full bg-black/70 shrink-0"
            animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-black uppercase tracking-wide text-[11px] sm:text-xs truncate">
            Inscripciones abiertas
            <span className="hidden sm:inline"> — {ev.name}</span>
          </span>
          <motion.span
            className="font-black text-[11px] inline-flex items-center gap-1 shrink-0"
            whileHover={{ x: 3 }}
          >
            · Inscribite <FaArrowRight size={10} />
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
};

export default OpenInscriptionTopBar;