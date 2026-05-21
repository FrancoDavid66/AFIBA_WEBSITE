import React, { useState, useEffect, useMemo } from "react";
import { RESULTS } from "../data/results";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaDownload, FaSearch, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

const Results = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = useMemo(() => {
    return RESULTS.filter((item) => {
      const matchesYear = selectedYear === "All" || item.year === selectedYear;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesYear && matchesSearch;
    });
  }, [searchTerm, selectedYear]);

  const years = useMemo(
    () =>
      Array.from(new Set(RESULTS.map((i) => i.year))).sort((a, b) =>
        b.localeCompare(a)
      ),
    []
  );

  const grouped = useMemo(() => {
    const map = {};
    filteredResults.forEach((item) => {
      if (!map[item.year]) map[item.year] = [];
      map[item.year].push(item);
    });
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
  }, [filteredResults]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#050505]">
        <motion.div
          className="relative w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-yellow-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaTrophy className="text-yellow-500 text-2xl" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden font-sans py-20">
      {/* Glows de fondo animados */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-yellow-500/10 blur-[140px] rounded-[100%] pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-yellow-600/5 blur-[120px] rounded-[100%] pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FaTrophy className="text-yellow-400" />
            <span>Archivo Histórico</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[1.1] tracking-tight mb-4">
            Historial de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Resultados
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Accedé a todos los resultados oficiales de cada torneo, ordenados por año.
          </p>
        </motion.div>

        {/* FILTROS */}
        <motion.div
          className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl mb-12 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="text"
                placeholder="Buscar torneo por nombre..."
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <select
                className="appearance-none pl-12 pr-10 py-4 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all cursor-pointer min-w-[200px]"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All">Todos los años</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          <motion.div
            key={filteredResults.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-gray-400 flex items-center gap-2"
          >
            <FaFileAlt className="text-yellow-500" />
            <span>
              <strong className="text-white">{filteredResults.length}</strong>{" "}
              {filteredResults.length === 1 ? "resultado" : "resultados"} encontrados
            </span>
          </motion.div>
        </motion.div>

        {/* RESULTADOS AGRUPADOS POR AÑO */}
        <AnimatePresence mode="wait">
          {grouped.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <FaSearch className="text-6xl text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">No se encontraron resultados.</p>
              <p className="text-gray-600 text-sm mt-2">Probá con otros filtros.</p>
            </motion.div>
          ) : (
            <motion.div key="grouped" className="space-y-16">
              {grouped.map(([year, items], yearIndex) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
                >
                  {/* Header del año */}
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      className="relative"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                        delay: yearIndex * 0.1 + 0.2,
                      }}
                    >
                      <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-30 rounded-full" />
                      <div className="relative px-6 py-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl shadow-yellow-500/30">
                        <span className="text-2xl md:text-3xl font-black text-black tracking-wider">
                          {year}
                        </span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 via-yellow-500/10 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: yearIndex * 0.1 + 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                      {items.length} {items.length === 1 ? "torneo" : "torneos"}
                    </span>
                  </div>

                  {/* Grid de tarjetas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.title}-${index}`}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.08,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="group relative"
                      >
                        {/* Glow detrás */}
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/40 group-hover:to-yellow-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Card */}
                        <div className="relative h-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl overflow-hidden group-hover:border-yellow-500/30 transition-all duration-500">
                          {/* Patrón decorativo */}
                          <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all duration-700" />

                          {/* Trofeo */}
                          <motion.div
                            className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/20 flex items-center justify-center mb-5 group-hover:border-yellow-500/50 transition-colors"
                            whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.5 } }}
                          >
                            <FaTrophy className="text-yellow-500 text-xl group-hover:text-yellow-400 transition-colors" />
                          </motion.div>

                          {/* Año pill */}
                          <div className="text-yellow-500/70 text-xs font-bold uppercase tracking-widest mb-2">
                            Temporada {item.year}
                          </div>

                          {/* Título */}
                          <h3 className="text-white text-lg md:text-xl font-black uppercase leading-tight mb-6 min-h-[3.5rem]">
                            {item.title}
                          </h3>

                          {/* Botón */}
                          <button
                            onClick={() => handleDownload(item.pdf)}
                            className="relative w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold uppercase text-sm tracking-wider overflow-hidden group/btn hover:border-yellow-500/50 transition-colors"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            <FaDownload className="relative z-10 group-hover/btn:text-black transition-colors" />
                            <span className="relative z-10 group-hover/btn:text-black transition-colors">
                              Descargar
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Results;