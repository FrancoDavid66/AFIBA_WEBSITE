// src/assets/components/home/OpenInscriptionBanner.jsx
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaInfoCircle } from "react-icons/fa";
import { getOpenEvent, formatFechaLarga } from "../../utils/calendar/openEvent";

const OpenInscriptionBanner = () => {
  const reduce = useReducedMotion();
  const openEvent = useMemo(() => getOpenEvent(), []);
  if (!openEvent) return null;

  const d = openEvent.details || {};
  const start = (d.schedule || []).find((s) => /inicio|competencia/i.test(s.label));

  return (
    <section className="w-[92%] md:w-[90%] max-w-6xl mx-auto mt-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-100 via-[#0e3a2a] to-[#0a2a1f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Brillo que barre */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            initial={{ x: "-150%" }}
            animate={{ x: "500%" }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
          />
        )}

        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-7">
          {/* Flyer */}
          {openEvent.image && (
            <Link to="/info-torneo" state={{ tournament: openEvent }} className="shrink-0 self-center">
              <motion.img
                src={openEvent.image}
                alt={`Flyer ${openEvent.name}`}
                loading="lazy"
                initial={reduce ? false : { rotate: -4, scale: 0.9, opacity: 0 }}
                animate={{ rotate: -3, scale: 1, opacity: 1 }}
                whileHover={reduce ? undefined : { rotate: 0, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 160, damping: 16 }}
                className="w-40 md:w-48 rounded-2xl border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
              />
            </Link>
          )}

          <div className="flex-1 min-w-0 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-white/10 text-neutral-100 font-black uppercase tracking-[0.2em] text-[10px] px-3 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Inscripciones abiertas · Ya te podés anotar
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-neutral-100 uppercase tracking-tight leading-tight mb-3">
              {openEvent.name}
            </h2>

            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-primary-200/90 text-sm font-secondary">
              <span className="inline-flex items-center gap-2">
                <FaCalendarAlt className="text-green-400" /> {formatFechaLarga(openEvent.fullDate)}
              </span>
              {start && (
                <span className="inline-flex items-center gap-2">
                  <FaClock className="text-green-400" /> {start.time}
                </span>
              )}
              {(d.venue || openEvent.location) && (
                <span className="inline-flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-400" /> {d.venue || openEvent.location}
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <Link to="/RegistrationForm" state={{ tournament: openEvent }}>
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-[0.15em] text-sm px-8 py-4 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.35)] transition-colors"
              >
                Inscribirme ahora <FaArrowRight />
              </motion.span>
            </Link>
            <Link to="/info-torneo" state={{ tournament: openEvent }}>
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-neutral-100 font-black uppercase tracking-[0.15em] text-xs px-8 py-3.5 rounded-2xl transition-colors"
              >
                <FaInfoCircle /> Más info del torneo
              </motion.span>
            </Link>
          </div>
        </div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>
    </section>
  );
};

export default OpenInscriptionBanner;
