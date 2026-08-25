// src/assets/components/home/OpenInscriptionBanner.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { getOpenEvent, formatFechaLarga } from "../../utils/calendar/openEvent";

const OpenInscriptionBanner = () => {
  const openEvent = useMemo(() => getOpenEvent(), []);
  if (!openEvent) return null;

  return (
    <section className="w-[92%] md:w-[90%] max-w-6xl mx-auto mt-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-100 via-[#0e3a2a] to-[#0a2a1f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="relative z-10 p-7 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 text-neutral-100 font-black uppercase tracking-[0.2em] text-[10px] px-3 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Inscripciones abiertas
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-neutral-100 uppercase tracking-tight leading-tight mb-3">
              {openEvent.name}
            </h2>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-primary-200/90 text-sm font-secondary">
              <span className="inline-flex items-center gap-2">
                <FaCalendarAlt className="text-green-400" /> {formatFechaLarga(openEvent.fullDate)}
              </span>
              {openEvent.location && (
                <span className="inline-flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-400" /> {openEvent.location}
                </span>
              )}
            </div>
          </div>

          <Link to="/RegistrationForm" state={{ tournament: openEvent }} className="shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-[0.15em] text-sm px-8 py-4 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.35)] transition-colors"
            >
              Inscribirme ahora <FaArrowRight />
            </motion.button>
          </Link>
        </div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>
    </section>
  );
};

export default OpenInscriptionBanner;