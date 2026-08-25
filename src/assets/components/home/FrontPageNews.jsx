import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTrophy, FaFileAlt } from "react-icons/fa";

// ✅ Fit & Beauty: toma automáticamente todo lo que haya en la carpeta,
// sin importar el nombre ni la extensión de los archivos.
const fabModules = import.meta.glob(
  "../../imgs/modalities/fit_and_beauty/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);
const fabImages = Object.keys(fabModules)
  .sort()
  .map((k) => fabModules[k].default);

const FrontPageNews = () => {
  const news = useMemo(
    () => [
      {
        id: 6,
        badge: "Nueva Categoría",
        title: "FIT & BEAUTY – Nueva categoría oficial",
        description:
          "Se incorpora oficialmente la categoría FIT & BEAUTY. Es una categoría de exhibición y presencia escénica donde se evalúa la armonía general de la atleta: tono muscular equilibrado, proporción, postura, desplazamiento en escenario y presentación integral. La competencia se desarrolla en dos rounds con indumentarias diferenciadas. Ya está disponible el manual de indumentaria oficial.",
        meta: [
          "👟 Round 1 – Sport Wear: top blanco de espalda atlética, shorts de lycra, medias blancas hasta la rodilla y zapatillas blancas sin plataforma",
          "👠 Round 2 – Swimsuit: malla entera negra de tiras gruesas y espalda cerrada, con zapatos reglamentarios IFBB transparentes (suela 1 cm y tacón 12 cm)",
          "🏅 Categoría disponible: OPEN",
          "⚠️ El color de la vestimenta puede variar según el organizador, EXCEPTO las medias del Round 1, que son obligatorias",
        ],
        cta: {
          to: "/modalidades",
          label: "Ver reglamento",
          icon: "doc",
        },
        image: fabImages[0]
          ? {
              src: fabImages[0],
              alt: "Flyer FIT & BEAUTY - Nueva categoría oficial AFIBA",
            }
          : null,
      },

      {
        id: 7,
        badge: "Resultados",
        title: "Resultados Oficiales – Buenos Aires IFBB 2026",
        description:
          "Ya están disponibles los resultados oficiales del Buenos Aires IFBB 2026, disputado el 23 de agosto en San Justo. La competencia marcó además el debut de la categoría FIT & BEAUTY, con Sabrina Elizabeth Serra como primera campeona provincial y Agustina Díaz en el segundo puesto. Consultá el listado completo con todas las categorías y posiciones.",
        meta: [
          "📅 23 de agosto de 2026",
          "📍 San Justo – Provincia de Buenos Aires",
          "🏆 Todas las categorías provinciales: Bodybuilding, Classic Physique, Men´s Physique, Bikini, Wellness, Body Fitness, Women´s Physique, Posing Art y Fit & Beauty",
          "🥇 Debut de FIT & BEAUTY: 1° Sabrina Elizabeth Serra · 2° Agustina Díaz",
        ],
        cta: {
          to: "/Results",
          label: "Ver todos los resultados",
          icon: "trophy",
        },
      },
    ],
    []
  );

  return (
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

        {/* Noticias */}
        <div className="space-y-8 sm:space-y-10">
          {news.map((item) => {
            const hasImage = Boolean(item.image?.src);
            const gridClass = hasImage
              ? "grid grid-cols-1 md:grid-cols-2 gap-0"
              : "grid grid-cols-1 gap-0";
            const textPadClass = hasImage
              ? "p-5 sm:p-6 md:p-7"
              : "p-6 sm:p-8 md:p-10 max-w-3xl mx-auto text-center";
            const metaClass = hasImage
              ? "mt-4 space-y-1 text-slate-300 text-sm sm:text-base"
              : "mt-5 space-y-2 text-slate-300 text-sm sm:text-base inline-block text-left";
            const badgeWrapClass = hasImage
              ? "flex items-center gap-2 mb-3"
              : "flex items-center justify-center gap-2 mb-4";

            return (
              <motion.article
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg shadow-black/20"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
              >
                <div className={gridClass}>
                  {/* Texto */}
                  <div className={textPadClass}>
                    <div className={badgeWrapClass}>
                      <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-slate-100">
                      {item.title}
                    </h3>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {item.meta?.length ? (
                      <ul className={metaClass}>
                        {item.meta.map((line, idx) => (
                          <li key={idx} className="leading-snug">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.cta?.to ? (
                      <div className={hasImage ? "mt-6" : "mt-8"}>
                        <motion.div
                          className="inline-block"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Link
                            to={item.cta.to}
                            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 px-7 py-4 text-sm font-black uppercase tracking-widest text-slate-950 shadow-[0_0_25px_rgba(234,179,8,0.35)] transition-shadow hover:shadow-[0_0_40px_rgba(234,179,8,0.55)]"
                          >
                            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
                            {item.cta.icon === "doc" ? (
                              <FaFileAlt className="relative z-10" />
                            ) : (
                              <FaTrophy className="relative z-10" />
                            )}
                            <span className="relative z-10">
                              {item.cta.label || "Ver más"}
                            </span>
                          </Link>
                        </motion.div>
                      </div>
                    ) : null}
                  </div>

                  {/* Imagen */}
                  {hasImage ? (
                    <div className="p-5 sm:p-6 md:p-7 bg-slate-950/40">
                      <img
                        src={item.image.src}
                        alt={item.image.alt || "Imagen"}
                        className="w-full max-h-[70vh] sm:max-h-none object-contain mx-auto rounded-2xl border border-slate-800 shadow-md select-none pointer-events-none"
                        loading="lazy"
                        draggable="false"
                      />
                    </div>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
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
  );
};

export default FrontPageNews;