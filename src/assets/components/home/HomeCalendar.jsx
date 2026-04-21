import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight, FaTrophy } from "react-icons/fa";

// Flyer nuevo
import flyer from "../../imgs/calendar/2026/open_2026.jpeg";

// Sponsors
import video1 from "../../videos/sponsors/america_force/video1.mp4";
import video2 from "../../videos/sponsors/america_force/video2.mp4";
import image1 from "../../imgs/sponsors/americaForce2.jpg";
import image2 from "../../imgs/sponsors/americaForce3.jpg";

const HomeCalendar = () => {
  const isMobileOrTablet = window.innerWidth <= 768;
  const CALENDAR_PATH = "/calendar";

  return (
    <section className="relative w-full bg-[#050505] py-20 overflow-hidden font-sans">
      {/* Fondo Premium - Subtle Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-[100%] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Contenedor Principal Glassmorphism */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 lg:p-12 backdrop-blur-xl shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LADO IZQUIERDO: CONTENIDO (7 columnas) */}
            <div className="lg:col-span-7 flex flex-col space-y-8">
              
              {/* Badge */}
              <div className="inline-flex">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                  <FaTrophy className="text-yellow-400" />
                  <span>Evento Principal</span>
                </div>
              </div>

              {/* Título */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[1.1] tracking-tight">
                  Campeonato <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    Open IFBB 2026
                  </span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                  El escenario está listo. Asegurá tu lugar completando la <strong>preinscripción obligatoria</strong> a través de nuestro calendario oficial.
                </p>
              </div>

              {/* Grid de Información (Diseño Limpio) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bloque 1: Fecha y Hora */}
                <div className="flex flex-col p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-yellow-500/30 transition-colors group">
                  <div className="flex items-center gap-3 text-yellow-500 mb-3 group-hover:scale-105 transition-transform origin-left">
                    <FaCalendarAlt size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">Cuándo</span>
                  </div>
                  <p className="text-white text-lg font-semibold">10 de Mayo, 2026</p>
                  <div className="mt-2 text-gray-400 text-sm flex items-center gap-2">
                    <FaClock className="text-gray-500" />
                    <span>Reg: 10hs | Inicio: 15hs</span>
                  </div>
                </div>

                {/* Bloque 2: Lugar */}
                <div className="flex flex-col p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-yellow-500/30 transition-colors group">
                  <div className="flex items-center gap-3 text-yellow-500 mb-3 group-hover:scale-105 transition-transform origin-left">
                    <FaMapMarkerAlt size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">Dónde</span>
                  </div>
                  <p className="text-white text-lg font-semibold">C.C. Universitario</p>
                  <p className="mt-2 text-gray-400 text-sm">
                    Yrigoyen 662, Tandil, Bs. As.
                  </p>
                </div>
              </div>

              {/* Pasos - Diseño en Línea/Timeline */}
              <div className="pt-2">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-yellow-500" />
                  Pasos para anotarte:
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  {['Abrí el Calendario', 'Buscá el OPEN', 'Clic en Preinscripción', 'Llená tus datos'].map((step, i) => (
                    <div key={i} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xs font-black">
                        {i + 1}
                      </span>
                      <span className="text-xs md:text-sm text-gray-300 font-medium leading-tight">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  to={CALENDAR_PATH}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest rounded-xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative z-10">Ir al Calendario de Torneos</span>
                  <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

            {/* LADO DERECHO: FLYER (5 columnas) */}
            <div className="lg:col-span-5 relative w-full h-full min-h-[400px] lg:min-h-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-md group">
                {/* Glow detrás del flyer */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-yellow-600 to-yellow-300 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <img
                  src={flyer}
                  alt="Flyer Oficial Open IFBB"
                  className="relative w-full object-cover rounded-[2rem] shadow-2xl border border-white/10 transform transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>

          {/* SPONSORS - Sección Minimalista Integrada */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">
              Main Sponsors
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[ {v: video1, i: image1}, {v: video2, i: image2} ].map((sponsor, idx) => (
                <div key={idx} className="relative h-24 md:h-32 rounded-xl overflow-hidden bg-black/50 border border-white/5 group cursor-pointer">
                  {isMobileOrTablet ? (
                    <img
                      src={sponsor.i}
                      alt={`Sponsor ${idx + 1}`}
                      className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <video
                      className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                      loop muted autoPlay playsInline
                    >
                      <source src={sponsor.v} type="video/mp4" />
                    </video>
                  )}
                  {/* Overlay sutil de gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeCalendar;