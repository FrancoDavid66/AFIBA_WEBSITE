// src/assets/components/header/NavMobile.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RiCloseFill } from "react-icons/ri";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";
import logo from "../../imgs/logo.png";
import { NAV_LARGE, ICONS_NETWORKING } from "../../data/header";

// Nombre accesible de cada red según su link (lo usa también el Header)
export const socialLabel = (href = "") => {
  if (href.includes("wa.me")) return "WhatsApp";
  if (href.includes("facebook")) return "Facebook";
  if (href.includes("santiagocastro")) return "Fotógrafo oficial";
  if (href.includes("instagram")) return "Instagram";
  return "Red social";
};

// Clases fijas (sin ternarios dentro de template literals)
const ITEM_BASE = "relative flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200";
const ITEM_IDLE = ITEM_BASE + " text-white/80 hover:text-white hover:bg-white/[0.05]";
const ITEM_ACTIVE = ITEM_BASE + " text-white bg-white/[0.08]";

const norm = (p) => (p || "").toLowerCase().replace(/\/+$/, "") || "/";

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } };
const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 320, damping: 26 } },
};

const MobileLink = ({ to, active, onClick, children }) => (
  <Link to={to} onClick={onClick} className={active ? ITEM_ACTIVE : ITEM_IDLE} aria-current={active ? "page" : undefined}>
    {active && <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />}
    <span>{children}</span>
    <FaChevronRight size={11} className="text-white/35" />
  </Link>
);

const NavMobile = ({ open, onClose, openEvent }) => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const current = norm(pathname);
  const onForm = current.includes("registrationform");

  // Con el menú abierto: bloquea el scroll del fondo, cierra con Escape
  // y se cierra solo si la pantalla pasa a tamaño escritorio.
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    const onResize = () => { if (window.innerWidth >= 1024) onClose(); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div key="drawer" className="fixed inset-0 z-[90] lg:hidden">
          {/* Fondo oscuro */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel lateral */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm flex flex-col bg-[#0b2a20] border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
          >
            {/* Cabecera del panel */}
            <div className="flex items-center justify-between h-[72px] px-5 shrink-0">
              <Link to="/" onClick={onClose} className="flex items-center gap-3">
                <img src={logo} alt="AFIBA" className="h-10 w-10 object-contain" />
                <span className="flex flex-col leading-none">
                  <span className="font-primary text-lg font-bold tracking-[0.16em] text-white">AFIBA</span>
                  <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">Fisicoculturismo · Buenos Aires</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="w-10 h-10 -mr-2 grid place-items-center rounded-full text-white hover:bg-white/10 transition-colors"
              >
                <RiCloseFill size={26} />
              </button>
            </div>
            <div className="h-[2px] shrink-0 bg-gradient-to-r from-transparent via-[#f70808] to-transparent" />

            {/* Links */}
            <motion.nav
              aria-label="Navegación principal"
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex-1 overflow-y-auto px-3 py-5"
            >
              {NAV_LARGE.map((item) =>
                item.subMenu ? (
                  <motion.div key={item.name} variants={itemVariants} className="mt-5">
                    <p className="px-4 mb-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-green-400/80">{item.name}</p>
                    {item.subMenu.map((sub) => (
                      <MobileLink key={sub.href} to={sub.href} active={norm(sub.href) === current} onClick={onClose}>
                        {sub.name}
                      </MobileLink>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key={item.name} variants={itemVariants}>
                    <MobileLink to={item.href} active={norm(item.href) === current} onClick={onClose}>
                      {item.name}
                    </MobileLink>
                  </motion.div>
                )
              )}
            </motion.nav>

            {/* Pie del panel: inscripción + redes */}
            <div className="shrink-0 px-5 pt-4 pb-6 border-t border-white/10 space-y-4">
              {openEvent && !onForm && (
                <Link
                  to="/RegistrationForm"
                  state={{ tournament: openEvent }}
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 w-full rounded-2xl bg-green-500 hover:bg-green-400 text-black px-5 py-3.5 shadow-[0_10px_30px_rgba(34,197,94,0.35)] transition-colors"
                >
                  <span className="flex flex-col leading-tight min-w-0">
                    <span className="text-[13px] font-black uppercase tracking-[0.14em]">Inscribite</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-black/70 truncate">{openEvent.name}</span>
                  </span>
                  <FaArrowRight size={13} className="shrink-0" />
                </Link>
              )}
              <div className="flex items-center justify-center gap-2">
                {ICONS_NETWORKING.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={socialLabel(item.href)}
                    className="w-11 h-11 rounded-full grid place-items-center text-lg text-white/75 bg-white/[0.05] hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NavMobile;
