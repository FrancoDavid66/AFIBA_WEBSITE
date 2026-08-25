import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTimes,
  FaDownload,
  FaFileAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaVenus,
  FaMars,
  FaVenusMars,
  FaLayerGroup,
} from "react-icons/fa";

import { MODALITIES } from "../../data/modalities";

const TAGS = [
  { id: "All", label: "Todas", icon: <FaLayerGroup /> },
  { id: "femenino", label: "Femenino", icon: <FaVenus /> },
  { id: "masculino", label: "Masculino", icon: <FaMars /> },
  { id: "mixed", label: "Mixto", icon: <FaVenusMars /> },
];

const TAG_LABELS = {
  femenino: "Femenino",
  masculino: "Masculino",
  mixed: "Mixto",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Categorias = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [lightbox, setLightbox] = useState({ images: [], index: 0, open: false });

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Bloquea scroll con el lightbox abierto
  useEffect(() => {
    document.body.style.overflow = lightbox.open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox.open]);

  // Navegación del lightbox con teclado
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox((s) => ({ ...s, open: false }));
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return MODALITIES.filter((m) => {
      const matchTag = filter === "All" || m.tag === filter;
      const matchSearch =
        !term ||
        (m.title || "").toLowerCase().includes(term) ||
        (m.description || "").toLowerCase().includes(term);
      return matchTag && matchSearch;
    });
  }, [filter, searchTerm]);

  const downloadFileAtURL = (url, id) => {
    if (!url) return;
    setDownloading(id);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        window.URL.revokeObjectURL(blobURL);
      })
      .catch(() => {})
      .finally(() => setDownloading(null));
  };

  const getGallery = (mod) => {
    if (!mod || !Array.isArray(mod.images)) return [];
    return mod.images.map((x) => x.image).filter(Boolean);
  };

  const openLightbox = (images, index) =>
    setLightbox({ images, index, open: true });

  const prevImage = () =>
    setLightbox((s) => ({
      ...s,
      index: (s.index - 1 + s.images.length) % s.images.length,
    }));

  const nextImage = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));

  const toggle = (id) => setOpenId(openId === id ? null : id);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <motion.div
          className="relative h-24 w-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-yellow-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaLayerGroup className="text-2xl text-yellow-500" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] font-sans">
        {/* Glows de fondo */}
        <motion.div
          className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-[100%] bg-yellow-500/10 blur-[140px]"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-[100%] bg-yellow-600/5 blur-[120px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Encabezado */}
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
              <FaFileAlt /> Categorías oficiales IFBB
            </span>

            <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              Modalidades
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
              Tocá una categoría para ver su descripción, galería y descargar el
              reglamento oficial.
            </p>
          </motion.div>

          {/* Buscador */}
          <motion.div
            className="mx-auto mb-6 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <div className="group relative">
              <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-yellow-500" />
              <input
                type="text"
                placeholder="Buscar categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-yellow-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(234,179,8,0.15)] sm:text-base"
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-4 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-xs text-slate-400 transition hover:bg-yellow-500 hover:text-slate-950"
                >
                  <FaTimes />
                </button>
              ) : null}
            </div>
          </motion.div>

          {/* Filtros */}
          <motion.div
            className="mb-8 flex flex-wrap items-center justify-center gap-2.5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            {TAGS.map((tag) => {
              const active = filter === tag.id;
              const base =
                "relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 sm:text-sm";
              const state = active
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-950 shadow-[0_0_22px_rgba(234,179,8,0.4)]"
                : "border border-white/10 bg-white/[0.03] text-slate-400 hover:border-yellow-500/40 hover:text-yellow-400";

              return (
                <motion.button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    setFilter(tag.id);
                    setOpenId(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className={base + " " + state}
                >
                  {tag.icon}
                  {tag.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Contador */}
          <motion.p
            className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.26 }}
          >
            {filtered.length}{" "}
            {filtered.length === 1 ? "categoría" : "categorías"}
          </motion.p>

          {/* Grilla / acordeón */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-14 text-center"
              >
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-600">
                  <FaSearch className="text-xl" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                  Sin resultados
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Probá con otro término o cambiá el filtro.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("All");
                  }}
                  className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300 transition hover:border-yellow-500/50 hover:text-yellow-400"
                >
                  Limpiar filtros
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={filter + searchTerm}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filtered.map((mod) => {
                  const isOpen = openId === mod.id;
                  const gallery = getGallery(mod);
                  const isDownloading = downloading === mod.id;
                  const hasRules = Boolean(mod.rules);
                  const spanClass = isOpen
                    ? "sm:col-span-2 lg:col-span-3"
                    : "";

                  return (
                    <motion.div
                      key={mod.id}
                      layout
                      variants={cardVariants}
                      className={
                        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-yellow-500/50 " +
                        spanClass
                      }
                    >
                      {/* Cabecera clickeable */}
                      <motion.button
                        layout
                        type="button"
                        onClick={() => toggle(mod.id)}
                        className="relative block w-full text-left"
                      >
                        <div
                          className={
                            isOpen
                              ? "relative h-64 w-full overflow-hidden bg-black md:h-80"
                              : "relative h-48 w-full overflow-hidden bg-black"
                          }
                        >
                          {mod.image ? (
                            <img
                              src={mod.image}
                              alt={mod.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#141414] to-black">
                              <FaFileAlt className="text-4xl text-yellow-500/25" />
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/25 to-transparent" />

                          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow-400 backdrop-blur-sm">
                            {TAG_LABELS[mod.tag] || "General"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 px-6 py-5">
                          <h3 className="text-sm font-bold uppercase leading-snug tracking-wide text-white sm:text-base">
                            {mod.title}
                          </h3>

                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-yellow-500/25 bg-yellow-500/10 text-yellow-400 transition-colors group-hover:bg-yellow-500 group-hover:text-slate-950"
                          >
                            <FaChevronDown className="text-xs" />
                          </motion.span>
                        </div>
                      </motion.button>

                      {/* Panel expandible */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 px-6 py-7">
                              <div className="grid gap-6 lg:grid-cols-3">
                                {/* Descripción */}
                                <div className="lg:col-span-2">
                                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-500/80">
                                    Sobre la categoría
                                  </h4>
                                  <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                                    {mod.description || "Sin descripción disponible."}
                                  </p>
                                </div>

                                {/* Reglamento */}
                                <div>
                                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-500/80">
                                    Reglamento
                                  </h4>
                                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-yellow-500/25 bg-yellow-500/10 text-yellow-400">
                                      <FaFileAlt />
                                    </span>
                                    <p className="text-xs leading-relaxed text-slate-500">
                                      Manual oficial IFBB vigente para esta
                                      modalidad.
                                    </p>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        downloadFileAtURL(mod.rules, mod.id)
                                      }
                                      disabled={!hasRules || isDownloading}
                                      className="group/btn relative mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-yellow-500/50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                      <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-transform duration-300 group-hover/btn:translate-y-0" />

                                      {isDownloading ? (
                                        <motion.span
                                          className="relative z-10 h-3.5 w-3.5 rounded-full border-2 border-yellow-500/30 border-t-yellow-500"
                                          animate={{ rotate: 360 }}
                                          transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            ease: "linear",
                                          }}
                                        />
                                      ) : (
                                        <FaDownload className="relative z-10 text-[11px] transition-colors group-hover/btn:text-slate-950" />
                                      )}

                                      <span className="relative z-10 transition-colors group-hover/btn:text-slate-950">
                                        {hasRules
                                          ? isDownloading
                                            ? "Descargando"
                                            : "Descargar PDF"
                                          : "No disponible"}
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Galería */}
                              {gallery.length > 0 ? (
                                <div className="mt-8">
                                  <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-yellow-500/80">
                                    Galería
                                  </h4>
                                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                                    {gallery.map((img, i) => (
                                      <motion.button
                                        key={i}
                                        type="button"
                                        onClick={() => openLightbox(gallery, i)}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                          duration: 0.4,
                                          delay: i * 0.06,
                                        }}
                                        whileHover={{ y: -5 }}
                                        className="group/img relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 transition-colors hover:border-yellow-500/50"
                                      >
                                        <img
                                          src={img}
                                          alt={mod.title + " " + (i + 1)}
                                          className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                          loading="lazy"
                                        />
                                        <span className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover/img:opacity-100" />
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nota al pie */}
          <motion.p
            className="mx-auto mt-16 max-w-2xl text-center text-xs leading-relaxed text-slate-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Los reglamentos publicados corresponden a los manuales oficiales IFBB
            vigentes. Ante cualquier duda sobre su aplicación, consultá con la
            organización del evento antes de la fecha de competencia.
          </motion.p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox((s) => ({ ...s, open: false }))}
          >
            <button
              onClick={() => setLightbox((s) => ({ ...s, open: false }))}
              aria-label="Cerrar"
              className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-yellow-500 hover:text-slate-950"
            >
              <FaTimes />
            </button>

            {lightbox.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Anterior"
                className="absolute left-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/70 text-white transition hover:bg-yellow-500 hover:text-slate-950 sm:left-8"
              >
                <FaChevronLeft />
              </button>
            )}

            <motion.img
              key={lightbox.index}
              src={lightbox.images[lightbox.index]}
              alt="Ampliada"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            {lightbox.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Siguiente"
                className="absolute right-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/70 text-white transition hover:bg-yellow-500 hover:text-slate-950 sm:right-8"
              >
                <FaChevronRight />
              </button>
            )}

            {lightbox.images.length > 1 && (
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 text-xs font-bold tracking-widest text-slate-400">
                {lightbox.index + 1} / {lightbox.images.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Categorias;