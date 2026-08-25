import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrophy, FaDownload, FaArrowRight } from 'react-icons/fa';
import { RESULTS } from '../../data/results';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const Results = () => {
  // Año más reciente disponible, sin hardcodear
  const latestYear = useMemo(
    () =>
      Array.from(new Set(RESULTS.map((r) => r.year)))
        .sort((a, b) => b.localeCompare(a))[0] || '',
    []
  );

  const recentResults = useMemo(
    () => RESULTS.filter((r) => r.year === latestYear).slice(0, 4),
    [latestYear]
  );

  const handleDownload = (pdfUrl) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-20 px-4 sm:px-6 md:px-12">
      {/* Glows de fondo */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-[100%] bg-yellow-500/10 blur-[140px]"
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 right-0 h-[360px] w-[520px] rounded-[100%] bg-yellow-600/5 blur-[120px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Encabezado */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
            <FaTrophy /> Temporada {latestYear}
          </span>

          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Últimos Resultados
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400 sm:text-base">
            Descargá los resultados oficiales de cada competencia.
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {recentResults.map((result, index) => (
            <motion.button
              key={index}
              variants={item}
              type="button"
              onClick={() => handleDownload(result.pdf)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-colors hover:border-yellow-500/50"
            >
              {/* Barrido de luz */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              {/* Glow inferior */}
              <span className="pointer-events-none absolute -bottom-16 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-[100%] bg-yellow-500/0 blur-2xl transition-all duration-500 group-hover:bg-yellow-500/25" />

              <div className="relative z-10 flex min-w-0 items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-yellow-500/25 bg-yellow-500/10 text-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-slate-950">
                  <FaTrophy className="text-lg" />
                </span>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold uppercase tracking-wide text-white sm:text-lg">
                    {result.title}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-yellow-500/80">
                    <FaDownload className="text-[10px]" /> Descargar
                  </p>
                </div>
              </div>

              <FaArrowRight className="relative z-10 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-500" />
            </motion.button>
          ))}
        </motion.div>

        {/* CTA final */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/Results"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-9 py-4 text-sm font-black uppercase tracking-widest text-slate-950 shadow-[0_0_30px_rgba(234,179,8,0.35)] transition-shadow hover:shadow-[0_0_50px_rgba(234,179,8,0.6)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">Ver todos los resultados</span>
              <FaArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;