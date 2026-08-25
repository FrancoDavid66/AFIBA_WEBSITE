import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaTrophy, FaFileAlt, FaMedal } from "react-icons/fa";

// ✅ Fit & Beauty: toma automáticamente todo lo que haya en la carpeta,
// sin importar el nombre ni la extensión de los archivos.
const fabModules = import.meta.glob(
  "../../imgs/modalities/fit_and_beauty/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);
const fabImages = Object.keys(fabModules)
  .sort()
  .map((k) => fabModules[k].default);

/* Clases planas (evita ternarios dentro de template literals) */
const ARROW_BASE =
  "absolute z-30 w-11 h-11 sm:w-13 sm:h-13 bg-black/80 border border-yellow-500/30 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black hover:border-transparent transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.8)] active:scale-95";
const DOT_ACTIVE = "w-8 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]";
const DOT_IDLE = "w-2 bg-white/20 hover:bg-white/40";
const CTA_CLASS =
  "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-7 py-3.5 text-xs sm:text-sm font-black uppercase tracking-widest text-slate-950 shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-shadow hover:shadow-[0_0_45px_rgba(234,179,8,0.65)]";

const SLIDES = [
  {
    id: "fit-and-beauty",
    category: "Nueva Categoría",
    title: "Fit & Beauty",
    subtitle: "Dos rounds. Dos estilos. Una presencia impecable.",
    image: fabImages[0] || null,
    cta: { to: "/modalidades", label: "Ver reglamento", icon: "doc" },
    duration: 7000,
  },
  {
    id: "resultados-ba-2026",
    category: "Resultados",
    title: "Buenos Aires IFBB 2026",
    subtitle: "Resultados oficiales disponibles",
    design: {
      eyebrow: "23 de agosto · San Justo",
      lead: "Debut de la categoría Fit & Beauty",
      podium: [
        { place: "1°", name: "Sabrina Elizabeth Serra" },
        { place: "2°", name: "Agustina Díaz" },
      ],
    },
    cta: { to: "/Results", label: "Ver resultados", icon: "trophy" },
    duration: 7000,
  },
];

const NewsModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const actual = SLIDES[idx];

  // Auto-slide
  useEffect(() => {
    if (!showModal || isPaused) return;
    const ms = actual.duration || 6000;
    const timer = setTimeout(() => {
      if (idx < SLIDES.length - 1) setIdx((i) => i + 1);
      else setShowModal(false);
    }, ms);
    return () => clearTimeout(timer);
  }, [showModal, idx, isPaused]);

  // Bloquea el scroll del body mientras el modal está abierto
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  // Cierre con Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const retroceder = () => {
    if (idx > 0) setIdx((i) => i - 1);
    else setIdx(SLIDES.length - 1);
  };

  const avanzarManual = () => {
    if (idx < SLIDES.length - 1) setIdx((i) => i + 1);
    else setIdx(0);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-yellow-500/40 bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-black shadow-[0_0_60px_rgba(234,179,8,0.2)] sm:max-w-lg"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Categoría */}
            <div className="pointer-events-none absolute left-4 top-4 z-30 sm:left-5 sm:top-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={actual.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-yellow-500/30 bg-black/70 px-4 py-2 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md sm:px-5 sm:py-2.5"
                >
                  <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-xs font-black uppercase tracking-widest text-transparent drop-shadow-md sm:text-sm">
                    {actual.category}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Cerrar */}
            <button
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-red-400/50 bg-red-600 text-white shadow-[0_4px_10px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-110 hover:bg-red-700 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenido del slide */}
            <div className="group relative flex h-[55vh] w-full items-center justify-center overflow-hidden sm:h-[62vh]">
              {SLIDES.length > 1 && (
                <button onClick={retroceder} className={ARROW_BASE + " left-3 sm:left-4"}>
                  <FaChevronLeft className="pr-0.5 text-lg sm:text-xl" />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={actual.id}
                  className="relative z-10 flex h-full w-full items-center justify-center"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {actual.image ? (
                    <img
                      src={actual.image}
                      alt={actual.title}
                      className="pointer-events-none h-full w-full select-none object-contain drop-shadow-2xl"
                      draggable="false"
                      loading="eager"
                    />
                  ) : (
                    <SlideDesign data={actual} />
                  )}
                </motion.div>
              </AnimatePresence>

              {SLIDES.length > 1 && (
                <button onClick={avanzarManual} className={ARROW_BASE + " right-3 sm:right-4"}>
                  <FaChevronRight className="pl-0.5 text-lg sm:text-xl" />
                </button>
              )}

              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Texto + CTA + dots */}
            <div className="relative z-20 -mt-12 space-y-4 px-5 pb-7 text-center sm:px-8 sm:pb-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={actual.id + "-txt"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-black uppercase tracking-wide text-white drop-shadow-lg sm:text-2xl">
                    {actual.title}
                  </h2>
                  {actual.subtitle ? (
                    <p className="mt-1.5 text-xs text-white/60 sm:text-sm">{actual.subtitle}</p>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={actual.id + "-cta"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.45 }}
                  className="flex justify-center pt-1"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to={actual.cta.to}
                      onClick={() => setShowModal(false)}
                      className={CTA_CLASS}
                    >
                      <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
                      {actual.cta.icon === "doc" ? (
                        <FaFileAlt className="relative z-10" />
                      ) : (
                        <FaTrophy className="relative z-10" />
                      )}
                      <span className="relative z-10">{actual.cta.label}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 pt-3">
                {SLIDES.map((_, i) => {
                  const dotState = i === idx ? DOT_ACTIVE : DOT_IDLE;
                  return (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={"h-2 rounded-full transition-all duration-300 " + dotState}
                      aria-label={"Ir a la novedad " + (i + 1)}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Slide sin imagen: diseño con glow dorado y podio */
const SlideDesign = ({ data }) => {
  const d = data.design || {};
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-8 text-center">
      {/* Glows */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/15 blur-[90px]"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-500/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative z-10 mb-5 grid h-20 w-20 place-items-center rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaTrophy className="text-3xl drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]" />
      </motion.div>

      {d.eyebrow ? (
        <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-500/80 sm:text-xs">
          {d.eyebrow}
        </span>
      ) : null}

      {d.lead ? (
        <p className="relative z-10 mt-3 max-w-xs text-sm leading-relaxed text-white/75 sm:text-base">
          {d.lead}
        </p>
      ) : null}

      {Array.isArray(d.podium) && d.podium.length ? (
        <div className="relative z-10 mt-5 w-full max-w-xs space-y-2">
          {d.podium.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-left"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-yellow-500/15 text-xs font-black text-yellow-400">
                {p.place}
              </span>
              <span className="truncate text-xs font-semibold text-white/90 sm:text-sm">
                {p.name}
              </span>
              <FaMedal className="ml-auto shrink-0 text-yellow-500/50" />
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NewsModal;