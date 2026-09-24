// src/assets/components/header/Nav.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaChevronDown, FaImages, FaBookOpen, FaTrophy } from "react-icons/fa";
import { NAV_LARGE } from "../../data/header/index";

// Ícono y bajada de cada opción del submenú (por ruta)
const SUB_META = {
  "/torneos": { icon: FaImages, desc: "Fotos de cada campeonato" },
  "/modalidades": { icon: FaBookOpen, desc: "Categorías y reglas oficiales" },
  "/results": { icon: FaTrophy, desc: "Resultados oficiales por torneo" },
};

// Clases fijas (sin ternarios dentro de template literals)
const LINK_BASE = "relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green-400/60";
const LINK_IDLE = LINK_BASE + " text-white/75 hover:text-white hover:bg-white/[0.07]";
const LINK_ACTIVE = LINK_BASE + " text-white";
const SUB_BASE = "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200";
const SUB_IDLE = SUB_BASE + " hover:bg-white/[0.06]";
const SUB_ACTIVE = SUB_BASE + " bg-white/[0.08]";

const norm = (p) => (p || "").toLowerCase().replace(/\/+$/, "") || "/";

const ActiveBar = () => (
  <motion.span
    layoutId="nav-active-bar"
    className="absolute left-4 right-4 -bottom-[2px] h-[2px] rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
    transition={{ type: "spring", stiffness: 380, damping: 30 }}
  />
);

const Nav = () => {
  const { pathname } = useLocation();
  const current = norm(pathname);
  const reduce = useReducedMotion();
  const [openKey, setOpenKey] = useState(null);
  const closeTimer = useRef(null);

  // Cierra el submenú al navegar, con Escape o tocando afuera
  useEffect(() => { setOpenKey(null); }, [pathname]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpenKey(null); };
    const onDown = (e) => { if (!e.target.closest("[data-nav-dropdown]")) setOpenKey(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const openNow = (key) => { clearTimeout(closeTimer.current); setOpenKey(key); };
  const closeSoon = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpenKey(null), 150); };

  const isActive = (item) =>
    item.subMenu ? item.subMenu.some((s) => norm(s.href) === current) : norm(item.href) === current;

  return (
    <nav className="hidden lg:block" aria-label="Navegación principal">
      <ul className="flex items-center gap-1">
        {NAV_LARGE.map((item) => {
          const active = isActive(item);
          const linkClass = active ? LINK_ACTIVE : LINK_IDLE;

          if (!item.subMenu) {
            return (
              <li key={item.name} className="relative">
                <Link to={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                  {item.name}
                  {active && <ActiveBar />}
                </Link>
              </li>
            );
          }

          const open = openKey === item.name;
          return (
            <li
              key={item.name}
              data-nav-dropdown
              className="relative"
              onMouseEnter={() => openNow(item.name)}
              onMouseLeave={closeSoon}
            >
              <button
                type="button"
                className={linkClass}
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpenKey(open ? null : item.name)}
              >
                {item.name}
                <motion.span className="inline-flex" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <FaChevronDown size={9} />
                </motion.span>
                {active && <ActiveBar />}
              </button>

              <AnimatePresence>
                {open && (
                  <div key="dropdown" className="absolute right-0 top-full pt-3 w-[310px]">
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{ transformOrigin: "top right" }}
                      className="rounded-2xl border border-white/10 bg-[#0b2a20]/[0.98] backdrop-blur-xl p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                    >
                      <div className="h-[2px] mx-3 mb-2 rounded-full bg-gradient-to-r from-transparent via-[#f70808] to-transparent" />
                      {item.subMenu.map((sub, i) => {
                        const meta = SUB_META[norm(sub.href)] || {};
                        const Icon = meta.icon;
                        const subActive = norm(sub.href) === current;
                        return (
                          <motion.div
                            key={sub.href}
                            initial={reduce ? false : { opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 * i, duration: 0.2 }}
                          >
                            <Link to={sub.href} className={subActive ? SUB_ACTIVE : SUB_IDLE} aria-current={subActive ? "page" : undefined}>
                              <span className="w-10 h-10 shrink-0 rounded-xl grid place-items-center bg-white/[0.06] text-green-400 transition-colors duration-200 group-hover:bg-green-500 group-hover:text-black">
                                {Icon ? <Icon size={15} /> : null}
                              </span>
                              <span className="flex flex-col min-w-0">
                                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-white leading-snug">{sub.name}</span>
                                {meta.desc && <span className="text-[12px] text-white/50 mt-0.5">{meta.desc}</span>}
                              </span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
