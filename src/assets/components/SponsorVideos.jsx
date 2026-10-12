import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SPONSORS_VIDEOS } from "../data/sponsors/index.jsx";

// Video compatible con iOS: los atributos muted/playsinline van literales en el HTML
// (si no, Safari no hace autoplay) y además se fuerza muted + play() al cargar.
const AutoVideo = ({ src, poster, className }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current?.querySelector("video");
    if (!el) return;
    el.muted = true;
    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    tryPlay();
    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

  const posterAttr = poster ? ` poster="${poster}"` : "";
  return (
    <div
      ref={ref}
      className="absolute inset-0"
      dangerouslySetInnerHTML={{
        __html: `<video src="${src}"${posterAttr} class="${className}" muted autoplay loop playsinline webkit-playsinline preload="metadata"></video>`,
      }}
    />
  );
};

// Clases planas (evita ternarios dentro de template literals)
const FRAME_BASE =
  "group relative block aspect-video w-full overflow-hidden rounded-2xl bg-black border shadow-[0_10px_30px_rgba(0,0,0,0.35)]";
const FRAME_IDLE = FRAME_BASE + " border-white/10";
const FRAME_NEW = FRAME_BASE + " border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.25)]";
const MEDIA_COVER = "absolute inset-0 h-full w-full object-cover";
const MEDIA_CONTAIN = "absolute inset-0 h-full w-full object-contain";

const SponsorCard = ({ sponsor, index, isMobile }) => {
  const frameClass = sponsor.isNew ? FRAME_NEW : FRAME_IDLE;
  const contain = Boolean(sponsor.vertical);
  const mediaClass = contain ? MEDIA_CONTAIN : MEDIA_COVER;
  // En celular se muestran imágenes (los videos horizontales pesan mucho);
  // los verticales sí van en video porque son livianos y se ven mejor.
  const showVideo = !isMobile || contain;
  const backdrop = sponsor.poster || sponsor.img;

  const inner = (
    <>
      {/* Fondo desenfocado para los videos verticales */}
      {contain && backdrop && (
        <img
          src={backdrop}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl"
        />
      )}

      {showVideo ? (
        <AutoVideo src={sponsor.videoUrl} poster={sponsor.poster || sponsor.img} className={mediaClass} />
      ) : (
        <img src={sponsor.img} alt={sponsor.title} loading="lazy" className={mediaClass} />
      )}

      {/* Degradado + nombre */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-left">
        <p className="font-primary text-lg font-black uppercase tracking-wide text-white drop-shadow">
          {sponsor.title}
        </p>
        {sponsor.tagline && (
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-orange-300/90">
            {sponsor.tagline}
          </p>
        )}
      </div>

      {sponsor.isNew && (
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[0_0_18px_rgba(249,115,22,0.6)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />
          Nuevo
        </span>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {sponsor.link ? (
        <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className={frameClass}>
          {inner}
        </a>
      ) : (
        <div className={frameClass}>{inner}</div>
      )}
    </motion.div>
  );
};

const SponsorVideos = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center gap-4 border-b-2 border-[#ddd] pb-3"
      >
        <h4 className="h4">Nuestros valiosos sponsors</h4>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SPONSORS_VIDEOS.map((sponsor, index) => (
          <SponsorCard key={sponsor.id || sponsor.title} sponsor={sponsor} index={index} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
};

export default SponsorVideos;
