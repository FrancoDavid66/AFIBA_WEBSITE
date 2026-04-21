import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CALENDAR_AFIBA } from '../../data/calendar';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaInstagram,
  FaDumbbell,
  FaCrown,
  FaLock,
} from 'react-icons/fa';

const pad2 = (n) => String(n).padStart(2, '0');

const startOfDay = (dateLike) => {
  const d = new Date(dateLike);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (dateLike, days) => {
  const d = new Date(dateLike);
  d.setDate(d.getDate() + days);
  return d;
};

const Calendar = () => {
  const [filter, setFilter] = useState('presente');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const allTournaments = useMemo(
    () =>
      Object.values(CALENDAR_AFIBA)
        .flat()
        .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate)),
    []
  );

  const decoratedTournaments = useMemo(() => {
    return allTournaments.map((tournament, index) => {
      const eventDate = startOfDay(`${tournament.fullDate}T00:00:00`);

      const closeAt = addDays(eventDate, -1);
      closeAt.setHours(0, 0, 0, 0);

      let openAt = null;
      if (index === 0) {
        openAt = new Date(0);
      } else {
        const prev = allTournaments[index - 1];
        const prevEventDate = startOfDay(`${prev.fullDate}T00:00:00`);
        openAt = addDays(prevEventDate, 3);
        openAt.setHours(0, 0, 0, 0);
      }

      const isPastEvent = now >= eventDate;
      const isClosedByDeadline = now >= closeAt;
      const isOpenWindow = now >= openAt && now < closeAt;
      const manuallyAvailable = tournament.available !== false;

      const canRegister = manuallyAvailable && isOpenWindow;
      const isBlockedUntilNextWindow = !isPastEvent && now < openAt;
      const isClosed = !canRegister && (isClosedByDeadline || isPastEvent);

      return {
        ...tournament,
        eventDate,
        openAt,
        closeAt,
        canRegister,
        isPastEvent,
        isClosed,
        isBlockedUntilNextWindow,
      };
    });
  }, [allTournaments, now]);

  const activeTournamentKey = useMemo(() => {
    const active = decoratedTournaments.find((t) => t.canRegister);
    return active ? `${active.name}-${active.fullDate}` : null;
  }, [decoratedTournaments]);

  const leftParts = (closeAt) => {
    if (!closeAt) return null;
    const diff = closeAt.getTime() - now.getTime();
    const ms = Math.max(diff, 0);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return { days, hours, minutes, ms };
  };

  const filteredTournaments = decoratedTournaments.filter((t) => {
    if (filter === 'todos') return true;
    if (filter === 'presente') return !t.isPastEvent;
    return t.isPastEvent;
  });

  return (
    <motion.div className="min-h-screen bg-neutral-500 text-white py-20 px-4 font-primary overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[20%] w-[45%] h-[45%] bg-primary-300/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-[-0.05em] italic leading-none"
          >
            AFIBA <span className="text-primary-100 block md:inline">2026</span>
          </motion.h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-100 to-transparent mx-auto mt-6 rounded-full" />
        </div>

        {/* Filtros */}
        <div className="flex justify-center mb-16">
          <div className="bg-primary-500/50 border border-neutral-400/20 p-1 rounded-full flex backdrop-blur-md">
            {['presente', 'terminado', 'todos'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                  filter === f
                    ? 'bg-primary-100 text-white shadow-lg'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {f === 'presente' ? 'Próximos' : f === 'terminado' ? 'Resultados' : 'Todo'}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" layout>
          <AnimatePresence mode="popLayout">
            {filteredTournaments.map((tournament) => {
              const uniqueKey = `${tournament.name}-${tournament.fullDate}`;
              const isActive = activeTournamentKey === uniqueKey;
              const left = leftParts(tournament.closeAt);

              let statusLabel = 'Próximamente';
              if (tournament.canRegister) statusLabel = 'Inscripciones Abiertas';
              else if (tournament.isBlockedUntilNextWindow) statusLabel = 'Aún no disponible';
              else if (tournament.isClosed || tournament.isPastEvent) statusLabel = 'Cerrado / Finalizado';

              return (
                <motion.div
                  layout
                  key={uniqueKey}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: isActive ? [0, -4, 0] : 0,
                  }}
                  transition={{
                    duration: 0.45,
                    y: isActive ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } : undefined,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`relative rounded-[3rem] flex flex-col group overflow-hidden transition-all duration-500 shadow-2xl ${
                    isActive
                      ? 'bg-gradient-to-b from-[#1a1204] via-[#120f08] to-[#0a0805] border border-yellow-500/40 shadow-[0_0_50px_rgba(234,179,8,0.2)] z-20 scale-[1.02]'
                      : 'bg-neutral-200 border border-neutral-400/20' 
                  }`}
                >
                  {/* Aura Épica del Celestial */}
                  {isActive && (
                    <>
                      <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-10 -left-10 w-48 h-48 bg-yellow-500/20 blur-[60px] rounded-full pointer-events-none z-0"
                      />
                      <motion.div
                        animate={{ opacity: [0.15, 0.35, 0.15] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.15),_transparent_50%)] pointer-events-none z-0"
                      />
                    </>
                  )}

                  {/* Imagen */}
                  <div className="relative h-96 overflow-hidden z-10 bg-black/50">
                    {tournament.image ? (
                      <img
                        src={tournament.image}
                        alt={tournament.name}
                        className={`w-full h-full object-cover transition-transform duration-1000 ${
                          isActive
                            ? 'scale-[1.03] brightness-110 saturate-110'
                            : 'grayscale-[80%] opacity-40 group-hover:grayscale-[50%] group-hover:scale-105'
                        }`}
                      />
                    ) : (
                      <div className={`w-full h-full flex flex-col items-center justify-center p-10 relative overflow-hidden ${isActive ? 'bg-[#0f0b05]' : 'bg-neutral-500/10'}`}>
                        {isActive && (
                          <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.3),_transparent_60%)]"
                          />
                        )}
                        {isActive ? (
                          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                            <FaCrown className="text-yellow-500 text-7xl mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                          </motion.div>
                        ) : (
                          // Candado mucho más visible ahora
                          <FaLock className="text-neutral-400/60 text-6xl mb-4" />
                        )}
                        <h4 className={`font-primary text-3xl font-black uppercase italic leading-none tracking-tighter text-center relative z-10 ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                          {tournament.name}
                        </h4>
                      </div>
                    )}

                    <div className={`absolute inset-0 ${isActive ? 'bg-gradient-to-t from-[#120f08] via-transparent to-[rgba(234,179,8,0.05)]' : 'bg-gradient-to-t from-neutral-200 via-transparent to-transparent'}`} />

                    {/* Badge */}
                    <div className="absolute top-8 left-8">
                      <span
                        className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-xl border inline-flex items-center gap-2 ${
                          isActive
                            ? 'bg-gradient-to-r from-yellow-300 to-amber-500 text-black border-yellow-200 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                            : 'bg-neutral-500/60 border-neutral-400/20 text-neutral-300'
                        }`}
                      >
                        {isActive ? <FaCrown /> : tournament.isBlockedUntilNextWindow ? <FaLock className="text-neutral-400" /> : null}
                        {statusLabel}
                      </span>
                    </div>

                    {/* Contador del Celestial */}
                    {isActive && tournament.canRegister && left && (
                      <div className="absolute bottom-8 right-8 flex gap-4 rounded-2xl px-5 py-3 bg-black/40 backdrop-blur-md border border-yellow-500/30 shadow-[0_0_25px_rgba(234,179,8,0.2)]">
                        <div className="text-center">
                          <p className="text-3xl font-black text-yellow-100 leading-none tracking-tighter">{left.days}</p>
                          <p className="text-[9px] uppercase text-yellow-500 font-bold tracking-widest">Días</p>
                        </div>
                        <div className="w-[1px] h-8 bg-yellow-500/30 self-center" />
                        <div className="text-center">
                          <p className="text-3xl font-black text-yellow-100 leading-none tracking-tighter">{pad2(left.hours)}</p>
                          <p className="text-[9px] uppercase text-yellow-500 font-bold tracking-widest">Horas</p>
                        </div>
                        <div className="w-[1px] h-8 bg-yellow-500/30 self-center" />
                        <div className="text-center">
                          <p className="text-3xl font-black text-yellow-100 leading-none tracking-tighter">{pad2(left.minutes)}</p>
                          <p className="text-[9px] uppercase text-yellow-500 font-bold tracking-widest">Min</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body de la Tarjeta */}
                  <div className="p-10 flex flex-col flex-grow relative z-10">
                    <div className="flex-grow space-y-6 mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-yellow-500/10' : 'bg-neutral-500/30'}`}>
                          <FaCalendarAlt className={isActive ? 'text-yellow-500' : 'text-neutral-400'} />
                        </div>
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-1">Fecha del Evento</p>
                          {/* Texto más claro para mejor contraste */}
                          <p className={`text-sm font-bold ${isActive ? 'text-yellow-50' : 'text-white/90'}`}>{tournament.date} - 2026</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-yellow-500/10' : 'bg-neutral-500/30'}`}>
                          <FaMapMarkerAlt className={isActive ? 'text-yellow-500' : 'text-neutral-400'} />
                        </div>
                        <div>
                          <p className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-1">Ubicación</p>
                          <p className={`text-sm font-bold italic line-clamp-1 ${isActive ? 'text-yellow-50/80' : 'text-white/70'}`}>{tournament.location}</p>
                        </div>
                      </div>

                      {/* Mensaje Informativo - Mejorado el contraste de grises */}
                      <div className={`rounded-xl p-4 border text-xs leading-relaxed font-secondary ${
                        isActive ? 'border-yellow-500/20 bg-yellow-500/5 text-yellow-100/90' : 'border-neutral-400/10 bg-neutral-500/20 text-neutral-300'
                      }`}>
                        {tournament.canRegister && (
                          <><strong className="uppercase">Torneo activo:</strong> Evento actualmente habilitado para preinscripción.</>
                        )}
                        {tournament.isBlockedUntilNextWindow && (
                          <><strong className="uppercase">Próximamente:</strong> Se habilita automáticamente 3 días después del torneo anterior.</>
                        )}
                        {(tournament.isClosed || tournament.isPastEvent) && (
                          <><strong className="uppercase">Finalizado:</strong> El periodo de inscripción a este evento ya ha concluido.</>
                        )}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="pt-8 border-t border-white/5 space-y-4 mt-auto">
                      {tournament.canRegister ? (
                        <Link to="/RegistrationForm" state={{ tournament }} className="block">
                          <button className={`w-full font-black uppercase text-xs tracking-[0.25em] py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] ${
                            isActive
                              ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:brightness-110'
                              : 'bg-primary-100 text-white hover:bg-white hover:text-black'
                          }`}>
                            Preinscribirme <FaArrowRight />
                          </button>
                        </Link>
                      ) : (
                        <button disabled className="w-full bg-neutral-500/30 text-neutral-400 border border-neutral-400/10 font-black uppercase text-[10px] tracking-widest py-5 rounded-2xl cursor-not-allowed">
                          {tournament.isBlockedUntilNextWindow ? 'Bloqueado por Fecha' : 'Cerrado'}
                        </button>
                      )}

                      <a
                        href={tournament.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-center gap-2 text-[10px] font-black transition-colors py-2 uppercase tracking-[0.3em] ${
                          isActive ? 'text-yellow-500 hover:text-yellow-300' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <FaInstagram /> Ver Detalles
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Calendar;