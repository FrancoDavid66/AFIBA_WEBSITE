// src/assets/components/InscriptionFAB.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";
import { getOpenEvent } from "../utils/calendar/openEvent";

const InscriptionFAB = () => {
  const { pathname } = useLocation();
  const ev = useMemo(() => getOpenEvent(), []);

  if (!ev) return null;
  if (pathname.toLowerCase().includes("registrationform")) return null;

  return (
    <Link
      to="/RegistrationForm"
      state={{ tournament: ev }}
      className="fixed bottom-5 right-5 z-50"
      aria-label="Ir a la inscripción"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wide text-xs px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.45)] transition-colors"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 pointer-events-none" />
        <FaDumbbell className="relative" />
        <span className="relative">Inscribite</span>
      </motion.div>
    </Link>
  );
};

export default InscriptionFAB;