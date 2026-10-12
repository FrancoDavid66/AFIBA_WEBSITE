// src/assets/components/EventInfo.jsx
// Página de información del torneo (/info-torneo).
// Toma el torneo que llega por el link (state) o, si entran directo, el que tiene
// la inscripción abierta (o el próximo del calendario).
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram,
  FaDownload,
  FaDirections,
  FaExpand,
  FaTimes,
  FaUserTie,
  FaBolt,
  FaTicketAlt,
  FaPlusCircle,
  FaIdCard,
} from "react-icons/fa";
import {
  getAllEvents,
  getEventWindow,
  getOpenEvent,
  getNextEvent,
  findEventByName,
} from "../utils/calendar/openEvent";

const pad2 = (n) => String(n).padStart(2, "0");

const formatDateNice = (iso) => {
  if (!iso) return "Fecha a confirmar";
  const [y, m, d] = iso.split("-").map(Number);
  const txt = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};

const formatShort = (d) => `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

// 60000 -> "$ 60.000"
const formatPesos = (n) => "$ " + String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Ícono según el tipo de tarifa
const FeeIcon = ({ label }) => {
  const l = String(label || "").toLowerCase();
  if (l.includes("adicional")) return <FaPlusCircle />;
  if (l.includes("libreta") || l.includes("afilia")) return <FaIdCard />;
  return <FaTicketAlt />;
};

const slug = (s) =>
  String(s || "evento")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// Clases planas (sin ternarios dentro de template literals)
const CARD = "relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)]";
const ICON_BOX = "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-green-500/10 text-green-400";
const LABEL = "text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400";
const BADGE_OPEN = "inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-500/15 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-green-300";
const BADGE_SOON = "inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-yellow-300";
const BADGE_DONE = "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 22 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

const EventInfo = () => {
  const reduce = useReducedMotion();
  const { state } = useLocation();
  const [lightbox, setLightbox] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Torneo a mostrar: el del link > el que tiene inscripción abierta > el próximo
  const tournament = useMemo(() => {
    const fromState = state?.tournament;
    if (fromState?.name) return findEventByName(fromState.name) || fromState;
    return getOpenEvent() || getNextEvent();
  }, [state]);

  // Ventana de inscripción (misma regla que el calendario)
  const win = useMemo(() => {
    if (!tournament?.fullDate) return null;
    const all = getAllEvents();
    const i = all.findIndex((t) => t.name === tournament.name && t.fullDate === tournament.fullDate);
    return i >= 0 ? getEventWindow(all, i) : null;
  }, [tournament]);

  // Cierra el lightbox con Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  if (!tournament) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#061410] px-6 text-center">
        <FaCalendarAlt className="mb-4 text-5xl text-neutral-400/40" />
        <h2 className="mb-2 text-2xl font-black uppercase text-neutral-100">No hay torneos próximos</h2>
        <p className="mb-6 text-neutral-400">Mirá el calendario para ver las próximas fechas.</p>
        <Link to="/Calendar" className="rounded-2xl bg-green-500 px-6 py-3 text-xs font-black uppercase tracking-widest text-black">
          Ver calendario
        </Link>
      </section>
    );
  }

  const d = tournament.details || {};
  const isOpen = Boolean(win) && tournament.available !== false && now >= win.openAt && now < win.closeAt;
  const isPast = Boolean(win) && now >= win.eventDate;

  const diff = win ? Math.max(win.closeAt.getTime() - now.getTime(), 0) : 0;
  const countdown = [
    { l: "Días", v: Math.floor(diff / 86400000) },
    { l: "Hrs", v: pad2(Math.floor((diff / 3600000) % 24)) },
    { l: "Min", v: pad2(Math.floor((diff / 60000) % 60)) },
    { l: "Seg", v: pad2(Math.floor((diff / 1000) % 60)) },
  ];

  const address = d.address || tournament.location || "";
  const mapsQuery = encodeURIComponent([d.venue, address].filter(Boolean).join(", "));
  const waText = encodeURIComponent(`¡Hola! Quiero más información sobre el ${tournament.name} de AFIBA.`);
  const instagram = d.instagram || { user: "afibaoficial", url: tournament.link || "https://www.instagram.com/afibaoficial/" };

  let badgeClass = BADGE_SOON;
  let badgeText = "Próximamente";
  if (isOpen) { badgeClass = BADGE_OPEN; badgeText = "Inscripciones abiertas"; }
  else if (isPast) { badgeClass = BADGE_DONE; badgeText = "Finalizado"; }

  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 py-10 font-primary md:py-16"
      style={{ background: "radial-gradient(120% 120% at 50% -10%, #0c2a1d 0%, #061410 45%, #03100b 100%)" }}
    >
      {/* Glows de fondo */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-green-500/15 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-20 top-1/3 h-[26rem] w-[26rem] rounded-full bg-fuchsia-600/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-32 left-1/4 h-[24rem] w-[24rem] rounded-full bg-yellow-500/10 blur-3xl"
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          to="/Calendar"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 transition-colors hover:text-green-400"
        >
          <FaArrowLeft /> Volver al calendario
        </Link>

        {/* ===== HERO: flyer + datos principales ===== */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          {/* Flyer */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -40, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/30 via-green-500/20 to-yellow-500/30 blur-2xl" />
            {tournament.image ? (
              <motion.button
                type="button"
                onClick={() => setLightbox(true)}
                whileHover={reduce ? undefined : { scale: 1.02, rotate: 0.5 }}
                className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                aria-label="Ver flyer en grande"
              >
                <img src={tournament.image} alt={`Flyer ${tournament.name}`} className="block w-full" />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-90 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  <FaExpand /> Ampliar
                </span>
              </motion.button>
            ) : (
              <div className="relative grid aspect-[4/5] place-items-center rounded-[1.75rem] border border-white/15 bg-black/40">
                <FaCalendarAlt className="text-6xl text-green-400/50" />
              </div>
            )}
          </motion.div>

          {/* Datos */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.div variants={fadeUp}>
              <span className={badgeClass}>
                <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
                {badgeText}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-neutral-100 md:text-6xl"
            >
              {tournament.name}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-lg font-bold text-green-300 md:text-xl">
              {formatDateNice(tournament.fullDate)}
            </motion.p>
            {d.venue && (
              <motion.p variants={fadeUp} className="mt-1 font-secondary text-sm text-white/75 md:text-base">
                {d.venue} · {tournament.location}
              </motion.p>
            )}

            {isOpen && (
              <motion.div variants={fadeUp} className="mt-7">
                <p className={LABEL}>La inscripción cierra el {formatShort(win.closeAt)}</p>
                <div className="mt-3 flex justify-center gap-2.5 lg:justify-start">
                  {countdown.map((u) => (
                    <div key={u.l} className="min-w-[62px] rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-center">
                      <div className="text-2xl font-black tabular-nums leading-none text-neutral-100">{u.v}</div>
                      <div className="mt-1 text-[8px] font-bold uppercase tracking-widest text-white/45">{u.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              {isOpen && (
                <Link to="/RegistrationForm" state={{ tournament }}>
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-green-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-black shadow-[0_15px_40px_rgba(34,197,94,0.45)] sm:w-auto"
                  >
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/40"
                        initial={{ x: "-200%" }}
                        animate={{ x: "400%" }}
                        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    <span className="relative inline-flex items-center gap-2">
                      <FaBolt /> Inscribirme ahora <FaArrowRight />
                    </span>
                  </motion.span>
                </Link>
              )}
              {tournament.image && (
                <motion.a
                  href={tournament.image}
                  download={`flyer_${slug(tournament.name)}.jpg`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/15 px-7 py-4 text-xs font-black uppercase tracking-widest text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
                >
                  <FaDownload /> Descargar flyer
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* ===== DETALLES ===== */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {/* Fecha y horarios */}
          <motion.div variants={fadeUp} className={CARD}>
            <div className="mb-6 flex items-center gap-4">
              <div className={ICON_BOX}><FaClock /></div>
              <div>
                <p className={LABEL}>Fecha y horarios</p>
                <p className="text-lg font-black uppercase text-neutral-100">{formatDateNice(tournament.fullDate)}</p>
              </div>
            </div>
            {Array.isArray(d.schedule) && d.schedule.length ? (
              <ul className="space-y-3">
                {d.schedule.map((s, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                    <span className="font-secondary text-sm text-white/75">{s.label}</span>
                    <span className="font-black tabular-nums text-green-300">{s.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-secondary text-sm text-neutral-400">Horarios a confirmar. Seguinos en Instagram para novedades.</p>
            )}
          </motion.div>

          {/* Contacto */}
          <motion.div variants={fadeUp} className={CARD}>
            <div className="mb-6 flex items-center gap-4">
              <div className={ICON_BOX}><FaWhatsapp /></div>
              <div>
                <p className={LABEL}>Más información</p>
                <p className="text-lg font-black uppercase text-neutral-100">Consultas por WhatsApp</p>
              </div>
            </div>
            <div className="space-y-3">
              {(d.contacts || []).map((c) => (
                <a
                  key={c.phone}
                  href={`https://wa.me/${c.whatsapp}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 transition-colors hover:border-green-400/40 hover:bg-green-500/10"
                >
                  <FaUserTie className="shrink-0 text-neutral-400 transition-colors group-hover:text-green-400" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold uppercase text-neutral-100">{c.name}</span>
                    <span className="block font-secondary text-xs text-neutral-400">{c.phone}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-500 px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-black">
                    <FaWhatsapp className="text-sm" /> Escribir
                  </span>
                </a>
              ))}
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 transition-colors hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10"
              >
                <FaInstagram className="shrink-0 text-lg text-fuchsia-400" />
                <span className="flex-1 text-sm font-bold uppercase text-neutral-100">@{instagram.user}</span>
                <FaArrowRight className="text-xs text-white/45 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Tarifas */}
          {Array.isArray(d.fees) && d.fees.length > 0 && (
            <motion.div variants={fadeUp} className={CARD + " md:col-span-2 overflow-hidden"}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-500/10 blur-3xl" />
              <div className="relative mb-6 flex items-center gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-yellow-500/10 text-yellow-400">
                  <FaTicketAlt />
                </div>
                <div>
                  <p className={LABEL}>Tarifas</p>
                  <p className="text-lg font-black uppercase text-neutral-100">Valores del torneo</p>
                </div>
              </div>
              <div className="relative grid gap-4 sm:grid-cols-3">
                {d.fees.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 180, damping: 20 }}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 px-5 py-6 text-center transition-colors hover:border-yellow-400/40"
                  >
                    <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-yellow-500/10 text-yellow-400 transition-transform group-hover:scale-110">
                      <FeeIcon label={f.label} />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/75">{f.label}</p>
                    <p className="mt-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-3xl font-black tabular-nums text-transparent md:text-4xl">
                      {formatPesos(f.amount)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sede + mapa */}
          <motion.div variants={fadeUp} className={CARD + " md:col-span-2"}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className={ICON_BOX}><FaMapMarkerAlt /></div>
                <div>
                  <p className={LABEL}>Sede</p>
                  <p className="text-lg font-black uppercase text-neutral-100">{d.venue || tournament.location}</p>
                  {address && <p className="font-secondary text-sm text-neutral-400">{address}</p>}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-neutral-100 transition-colors hover:bg-white/20"
              >
                <FaDirections /> Cómo llegar
              </a>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                width="100%"
                height="340"
                loading="lazy"
                allowFullScreen
                className="block grayscale-[30%]"
                title={`Ubicación ${tournament.name}`}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox del flyer */}
      <AnimatePresence>
        {lightbox && tournament.image && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-red-600 text-white shadow-lg"
            >
              <FaTimes />
            </button>
            <motion.img
              src={tournament.image}
              alt={`Flyer ${tournament.name}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventInfo;
