import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import portadaImg from "../../imgs/noticia_afiba.jpg";

import foto1 from "../../imgs/frontpagenews/maria1.webp";
import foto2 from "../../imgs/frontpagenews/maria2.webp";
import foto3 from "../../imgs/frontpagenews/maria3.webp";
import foto4 from "../../imgs/frontpagenews/maria4.webp";
import foto5 from "../../imgs/frontpagenews/maria5.webp";
import foto6 from "../../imgs/frontpagenews/maria6.webp";

// ✅ Flyers
import cursoCapacitacionAtletas from "../../imgs/frontpagenews/curso_capacitacion.jpeg";
import cursoCapacitacionEntrenadores from "../../imgs/frontpagenews/curso_capacitacion_2.jpeg";

import floridaSummer from "../../imgs/frontpagenews/florida_summer.jpeg";

const FrontPageNews = () => {
  const [openImage, setOpenImage] = useState(null);

  const galleryImages = useMemo(() => [foto1, foto2, foto3, foto4, foto6], []);

  const news = useMemo(
    () => [
      {
        id: 1,
        badge: "Capacitación",
        title:
          "Curso de Capacitación 2026: Normativa y Juzgamiento IFBB (Atletas) – Mar del Plata",
        description:
          "Capacitación orientada a atletas sobre normativa y juzgamiento IFBB, con foco en poses, presencia y control en tarima. Dictado por el Lic. Juan Paredes, en el Costa Galana Hotel (Mar del Plata), en el marco de la Sanson Cup.",
        meta: [
          "👥 Orientado a: Atletas",
          "📅 6 de marzo – 14:00",
          "📍 Costa Galana Hotel – Mar del Plata (Buenos Aires)",
          "🎓 Dictado por: Lic. Juan Paredes",
          "🏆 En el marco de: Sanson Cup",
          "✅ Incluye: Certificado de asistencia",
          "📌 Temas: Poses de competencia · Presencia y control en tarima",
        ],
        image: {
          src: cursoCapacitacionAtletas,
          alt: "Curso de Capacitación 2026 - Normativa y Juzgamiento IFBB - Orientado a atletas",
        },
      },

      {
        id: 2,
        badge: "Capacitación",
        title:
          "Curso de Capacitación 2026: Normativa y Juzgamiento IFBB (Entrenadores) – Mar del Plata",
        description:
          "Capacitación para entrenadores sobre normativa y juzgamiento IFBB, enfocada en criterios de evaluación (equilibrio, simetría y proporción) y ética profesional del coach. Dictado por el Lic. Juan Paredes en el Costa Galana Hotel, en el marco de la Sanson Cup.",
        meta: [
          "👥 Orientado a: Entrenadores",
          "📅 6 de marzo – 14:00",
          "📍 Costa Galana Hotel – Mar del Plata (Buenos Aires)",
          "🎓 Dictado por: Lic. Juan Paredes",
          "🏆 En el marco de: Sanson Cup",
          "🎟️ Se entregará: Credencial de acceso a backstage (eventos 2026)",
          "✅ Incluye: Certificado de asistencia",
          "📌 Temas: Equilibrio · Simetría · Proporción · Ética profesional",
        ],
        image: {
          src: cursoCapacitacionEntrenadores,
          alt: "Curso de Capacitación 2026 - Normativa y Juzgamiento IFBB - Para entrenadores",
        },
      },

      {
        id: 3,
        badge: "Competencia",
        title: "Florida Summer Cup: IFBB Fitness Challenge (Rosario)",
        description:
          "Competencia Florida Summer Cup – IFBB Fitness Challenge. El evento se realiza el 14 de marzo en el Balneario La Florida (Av. Carrasco 2035, Rosario). Categorías: Bronce (M/F), Silver (M/F), Parejas Mixtas y Childrens. Registro 15:00 hs e inicio de competencia 16:00 hs.",
        meta: [
          "📅 14 de marzo",
          "📍 Balneario La Florida – Av. Carrasco 2035, Rosario",
          "🕒 Registro 15:00 / Inicio 16:00",
          "🏅 Categorías: Bronce, Silver, Parejas Mixtas, Childrens",
          "📲 Info: Miguel Luna (+54 9 11 5806-1674) / IG: @ASFF_2024",
        ],
        image: {
          src: floridaSummer,
          alt: "Afiche Florida Summer Cup - IFBB Fitness Challenge",
        },
      },

      {
        id: 4,
        badge: "AFIBA",
        title: "Resumen de la Asamblea General 2025",
        description:
          "La Asamblea General Ordinaria de AFIBA se realizó con éxito. Agradecemos la participación de todos los afiliados que formaron parte de este encuentro clave para la comunidad. Compartimos aquí algunas imágenes del evento.",
        image: { src: foto5, alt: "Foto de portada" },
        showGallery: true,
      },
    ],
    [galleryImages]
  );

  return (
    <>
      <motion.section
        className="w-full py-8 sm:py-10 px-4 sm:px-6 md:px-12 bg-slate-950"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase font-bold text-slate-100 mb-6 sm:mb-8 text-center md:text-left">
            📰 Noticias Destacadas
          </h2>

          {/* ✅ DESTACADO (Convocatoria) */}
          <motion.div
            className="relative rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-slate-900/70 to-slate-900/40 overflow-hidden shadow-2xl shadow-black/40 p-5 sm:p-7 md:p-8 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-300/10 blur-3xl" />

            <div className="flex items-start justify-between gap-5 flex-col md:flex-row">
              <div className="w-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border border-amber-400/40 bg-amber-500/10 text-amber-200">
                    ⭐ Destacado
                  </span>
                  <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border border-slate-700 bg-slate-950/50 text-slate-200">
                    AFIBA
                  </span>
                  <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border border-slate-700 bg-slate-950/50 text-slate-200">
                    Documento
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-100 tracking-tight">
                  Convocatoria – Asamblea General Ordinaria 2026
                </h3>

                <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed">
                  Descargá el documento oficial de convocatoria.
                </p>

                {/* Info extra */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/35 p-4">
                    <div className="text-slate-200 font-semibold">📅 Fecha</div>
                    <div className="text-slate-300">14 de marzo de 2026</div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/35 p-4">
                    <div className="text-slate-200 font-semibold">🕒 Horario</div>
                    <div className="text-slate-300">20:00 hs</div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/35 p-4 sm:col-span-2">
                    <div className="text-slate-200 font-semibold">📍 Lugar</div>
                    <div className="text-slate-300">(Completá acá la dirección / sede)</div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/35 p-4 sm:col-span-2">
                    <div className="text-slate-200 font-semibold">📌 Temas principales</div>
                    <ul className="mt-2 space-y-1 text-slate-300 text-sm sm:text-base list-disc pl-5">
                      <li>Lectura y aprobación del acta anterior</li>
                      <li>Memoria y balance</li>
                      <li>Elección / designaciones (si aplica)</li>
                      <li>Varios</li>
                    </ul>
                  </div>
                </div>

                {/* Botones grandes + animados */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href="/convocatoria_2026.docx"
                    download="Convocatoria_Ordinaria_AFIBA_2026.docx"
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base sm:text-lg font-extrabold
                               bg-amber-300 text-slate-950 hover:bg-amber-200 transition shadow-lg shadow-amber-500/10"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  >
                    ⬇️ Descargar Convocatoria (Word)
                  </motion.a>

                  <motion.a
                    href="/convocatoria_2026.docx"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base sm:text-lg font-bold
                               border border-amber-400/40 text-amber-100 hover:bg-amber-500/10 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    👀 Abrir documento
                  </motion.a>
                </div>
              </div>

              {/* Mini imagen opcional (portada) */}
              <div className="w-full md:w-[320px]">
                <motion.div
                  className="rounded-3xl border border-slate-800 bg-slate-950/30 p-3 shadow-xl shadow-black/30"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={portadaImg}
                    alt="AFIBA"
                    className="w-full h-auto rounded-2xl border border-slate-800"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Noticias */}
          <div className="space-y-8 sm:space-y-10">
            {news.map((item) => (
              <motion.article
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg shadow-black/20"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Texto */}
                  <div className="p-5 sm:p-6 md:p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border border-slate-700 bg-slate-950/60 text-slate-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-slate-100">
                      {item.title}
                    </h3>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {item.meta?.length ? (
                      <ul className="mt-4 space-y-1 text-slate-300 text-sm sm:text-base">
                        {item.meta.map((line, idx) => (
                          <li key={idx} className="leading-snug">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  {/* Imagen */}
                  <div className="p-5 sm:p-6 md:p-7 bg-slate-950/40">
                    {item.image?.src ? (
                      <img
                        src={item.image.src}
                        alt={item.image.alt || "Imagen"}
                        className="w-full rounded-2xl border border-slate-800 shadow-md cursor-pointer transition active:scale-[0.99] hover:brightness-110"
                        onClick={() => setOpenImage(item.image.src)}
                        loading="lazy"
                      />
                    ) : null}

                    {/* Galería solo para Asamblea */}
                    {item.showGallery ? (
                      <>
                        <div className="mt-5">
                          <div className="h-px bg-slate-800 w-full" />
                        </div>

                        <h4 className="mt-4 text-sm sm:text-base font-semibold text-slate-200">
                          Galería del evento
                        </h4>

                        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                          {galleryImages.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Asamblea ${index + 1}`}
                              className="w-full rounded-xl border border-slate-800 shadow-sm cursor-pointer transition active:scale-[0.99] hover:brightness-110"
                              onClick={() => setOpenImage(img)}
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="h-1 bg-slate-700 rounded-full mx-auto mt-8 sm:mt-10"
            style={{ width: "140px" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.section>

      {/* Modal imagen ampliada */}
      <AnimatePresence>
        {openImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenImage(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenImage(null)}
                className="absolute -top-3 -right-3 text-slate-100 text-xl bg-slate-900/80 border border-slate-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-900"
                aria-label="Cerrar"
              >
                ✕
              </button>
              <img
                src={openImage}
                alt="Imagen ampliada"
                className="w-full h-auto rounded-2xl border border-slate-800 shadow-2xl shadow-black/40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FrontPageNews;