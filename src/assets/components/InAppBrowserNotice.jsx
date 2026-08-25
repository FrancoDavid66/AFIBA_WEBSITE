// src/assets/components/InAppBrowserNotice.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaTimes, FaCopy, FaCheck } from "react-icons/fa";

// Detecta navegadores internos de apps (Instagram, Facebook, TikTok, etc.)
const isInAppBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || "";
  return /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|Line|TikTok|Snapchat|Twitter|Pinterest/i.test(ua);
};
const isAndroid = () => /Android/i.test(navigator.userAgent || "");

const InAppBrowserNotice = () => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (isInAppBrowser()) setShow(true);
  }, []);

  const openInBrowser = () => {
    if (isAndroid()) {
      // En Android intentamos abrir directamente en Chrome.
      const clean = url.replace(/^https?:\/\//, "");
      window.location.href = `intent://${clean}#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      // En iOS no hay forma programática confiable: copiamos el link y damos instrucciones.
      copyLink();
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* algunos in-app browsers bloquean el clipboard */
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-md rounded-3xl border border-green-500/25 bg-[#0c1a13] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <button
              onClick={() => setShow(false)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/15 border border-green-500/40 text-green-400"
            >
              <FaExternalLinkAlt size={20} />
            </motion.div>

            <h3 className="text-center text-xl font-black uppercase tracking-tight text-white">
              Abrí esto en tu navegador
            </h3>
            <p className="mt-3 text-center text-sm leading-relaxed text-neutral-300">
              Estás viendo esta página dentro de <strong className="text-green-400">Instagram</strong>. Para que la inscripción funcione bien, abrila en tu navegador (Chrome o Safari).
            </p>

            <div className="mt-5 rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">Cómo abrirla</p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Tocá los <strong>3 puntos</strong> (arriba a la derecha) y elegí <strong>"Abrir en el navegador"</strong> / <strong>"Open in browser"</strong>.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={openInBrowser}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-black shadow-[0_10px_30px_rgba(34,197,94,0.4)]"
              >
                <FaExternalLinkAlt size={12} /> Abrir en el navegador
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={copyLink}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/15 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-200 hover:bg-white/5 transition-colors"
              >
                {copied ? (<><FaCheck size={12} className="text-green-400" /> Link copiado</>) : (<><FaCopy size={12} /> Copiar link</>)}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InAppBrowserNotice;