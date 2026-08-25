// src/assets/pages/RegistrationForm/index.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Link, useLocation } from "react-router-dom";
import { LOCALITIES, MODALITIES, CATEGORIES, PROVINCES, SOUTH_AMERICAN_COUNTRIES } from "../../data/form";
import { createTask } from "../../../api/tasks.api.js";
import { validateForm } from "../../utils/form/validateForm";
import Form from "../../components/form/Form.jsx";
import { FaCheckCircle, FaLock, FaExclamationTriangle, FaArrowLeft, FaArrowRight, FaBolt } from "react-icons/fa";
import afibaLogo from "../../imgs/logo.png";

const TournamentsForm = () => {
  const TEMPLATE_ID = "template_2b1petm";
  const SERVICE_ID = "service_soiecur";
  const PUBLIC_KEY = "i_NVru_5O1nhFJ0re";
  const TEMPLATE_ID_CONFIRMATION = "template_vunrnaa";
  const SERVICE_ID_CONFIRMATION = "service_soiecur";
  const PUBLIC_KEY_CONFIRMATION = "i_NVru_5O1nhFJ0re";

  const reduce = useReducedMotion();
  const location = useLocation();

  const DEFAULT_TOURNAMENT = useMemo(() => ({ name: "OPEN IFBB TANDIL", date: "2026-05-10" }), []);

  const queryTournament = useMemo(() => {
    const params = new URLSearchParams(location.search || "");
    const name = params.get("tournament") || params.get("event") || params.get("name");
    const date = params.get("date");
    if (!name && !date) return null;
    return { name: name || DEFAULT_TOURNAMENT.name, date: date || DEFAULT_TOURNAMENT.date };
  }, [location.search, DEFAULT_TOURNAMENT]);

  const tournamentFromState = location.state?.tournament;
  const resolvedDate = tournamentFromState?.fullDate || tournamentFromState?.date || queryTournament?.date || DEFAULT_TOURNAMENT.date;
  const tournament = {
    ...tournamentFromState,
    name: tournamentFromState?.name || queryTournament?.name || DEFAULT_TOURNAMENT.name,
    date: resolvedDate,
  };

  const EVENT_NAME = tournament.name;
  const forceBlocked = EVENT_NAME.toLowerCase().includes("copa provincia");

  const CLOSE_AT = useMemo(() => {
    const d = new Date(`${tournament.date}T00:00:00`);
    if (!Number.isNaN(d.getTime())) { d.setDate(d.getDate() - 1); return d; }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30, 0, 0, 0);
  }, [tournament.date]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [inscriptionClosed, setInscriptionClosed] = useState(false);

  const pad2 = (n) => String(n).padStart(2, "0");
  const formatCloseAt = (d) => `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

  useEffect(() => {
    const tick = () => {
      const diff = CLOSE_AT.getTime() - Date.now();
      if (diff <= 0) { setInscriptionClosed(true); setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setInscriptionClosed(false);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [CLOSE_AT]);

  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({
    email: "", fullName: "", birthDate: "", dni: "", locality: "", country: "", province: "",
    participations: [], competitionWeight: "", height: "", phone: "", trainer: "", instagram: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const LOADING_MESSAGES = ["Registrando tu inscripción...", "Confirmando tu lugar...", "Casi listo..."];
  const [loadingMsg, setLoadingMsg] = useState(0);
  useEffect(() => {
    if (!loading) { setLoadingMsg(0); return; }
    const id = setInterval(() => setLoadingMsg((i) => (i + 1) % LOADING_MESSAGES.length), 1600);
    return () => clearInterval(id);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const v = name === "competitionWeight" || name === "height" ? value.replace(",", ".") : value;
    setForm((prev) => ({ ...prev, [name]: v }));
  };

  const formatDate = (s) => { const d = new Date(s); return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`; };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inscriptionClosed || forceBlocked || Date.now() >= CLOSE_AT.getTime()) { setLoading(false); return; }

    const tempErrors = validateForm(form);
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) { setLoading(false); return; }

    try {
      const formattedBirthDateForEmail = formatDate(form.birthDate);
      let backendDate = form.birthDate;
      if (backendDate.includes("/")) { const p = backendDate.split("/"); if (p.length === 3) backendDate = `${p[2]}-${p[1]}-${p[0]}`; }

      // El backend recibe el array de participaciones y crea una fila por cada combo.
      const apiData = { ...form, birthDate: backendDate, event: EVENT_NAME };
      await createTask(apiData);

      const parts = form.participations || [];
      const participationsText = parts.map((p) => `${p.modality} - ${p.category}`).join(" | ");

      const templateParams = {
        form_name: form.fullName, to_name: form.fullName, to_email: form.email,
        to_birthDate: formattedBirthDateForEmail, to_dni: form.dni, to_locality: form.locality,
        to_country: form.country, to_province: form.province,
        to_modality: parts.map((p) => p.modality).join(", "),
        to_category: parts.map((p) => p.category).join(", "),
        to_participations: participationsText,
        to_competitionWeight: form.competitionWeight, to_height: form.height,
        to_phone: form.phone, to_trainer: form.trainer, to_instagram: form.instagram,
        message: "REGISTRO OFICIAL AFIBA", tournament_name: EVENT_NAME, to_event: EVENT_NAME,
      };
      // El mail NO es crítico: la inscripción ya quedó guardada en la base.
      try {
        await emailjs.send(SERVICE_ID_CONFIRMATION, TEMPLATE_ID_CONFIRMATION, templateParams, PUBLIC_KEY_CONFIRMATION);
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } catch (mailError) {
        console.warn("Inscripción guardada, pero el mail de confirmación falló:", mailError?.status || mailError);
      }

      setModalOpen(true);
      setForm({ email: "", fullName: "", birthDate: "", dni: "", country: "", locality: "", province: "", participations: [], competitionWeight: "", height: "", phone: "", instagram: "", trainer: "" });
      setErrors({});
      setStarted(false);
    } catch (error) {
      console.error("Error al enviar formulario:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAnother = () => { setModalOpen(false); setStarted(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const isFormClosed = inscriptionClosed || forceBlocked;

  const countdownUnits = [
    { l: "Días", v: timeLeft.days },
    { l: "Hrs", v: pad2(timeLeft.hours) },
    { l: "Min", v: pad2(timeLeft.minutes) },
    { l: "Seg", v: pad2(timeLeft.seconds) },
  ];

  const introVariants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
  const introItem = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 22 } } };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden font-primary px-4 py-10 md:py-16"
      style={{ background: "radial-gradient(120% 120% at 50% -10%, #0c2a1d 0%, #061410 45%, #03100b 100%)" }}>

      {!reduce && (
        <>
          <motion.div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-500/15 blur-3xl pointer-events-none" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-[#54A17D]/15 blur-3xl pointer-events-none" animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-[#f70808]/10 blur-3xl pointer-events-none" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        </>
      )}

      <Link to="/calendar" className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-neutral-400 hover:text-green-400 text-xs font-bold uppercase tracking-widest transition-colors">
        <FaArrowLeft /> Volver
      </Link>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="relative z-10 w-full max-w-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-7 md:p-12"
      >
        {isFormClosed ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="w-24 h-24 bg-[#f70808]/10 rounded-full flex items-center justify-center mb-6"><FaExclamationTriangle className="text-[#f70808] text-4xl" /></div>
            <h3 className="text-3xl font-black text-neutral-100 uppercase tracking-tight mb-4">No disponible</h3>
            <p className="text-neutral-400 font-secondary max-w-md">
              {forceBlocked ? "Este evento no gestiona inscripciones mediante la plataforma web oficial." : `El tiempo límite para registrarse en el ${EVENT_NAME} ha concluido.`}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div key="intro" variants={introVariants} initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }} className="text-center">
                <motion.span variants={introItem} className="inline-block text-green-400 font-black uppercase tracking-[0.3em] text-[10px] mb-3">Registro oficial · AFIBA</motion.span>
                <motion.h1 variants={introItem} className="text-3xl md:text-5xl font-black text-neutral-100 uppercase tracking-tighter leading-[1.05]">{EVENT_NAME}</motion.h1>
                <motion.span variants={introItem} className="block mt-6 text-neutral-500 text-[10px] uppercase font-bold tracking-widest">Cierra el {formatCloseAt(CLOSE_AT)}</motion.span>
                <motion.div variants={introItem} className="mt-4 flex justify-center gap-2.5">
                  {countdownUnits.map((u, i) => (
                    <div key={i} className="px-3.5 py-2 rounded-xl bg-black/30 border border-white/10 text-center min-w-[54px]">
                      <div className="text-xl md:text-2xl font-black text-neutral-100 tabular-nums leading-none">{u.v}</div>
                      <div className="text-[8px] uppercase tracking-widest text-neutral-500 mt-1 font-bold">{u.l}</div>
                    </div>
                  ))}
                </motion.div>
                <motion.p variants={introItem} className="mt-8 text-neutral-400 font-secondary text-sm max-w-md mx-auto">Completá tu preinscripción oficial en simples pasos.</motion.p>
                <motion.div variants={introItem} className="mt-7 flex justify-center">
                  <motion.button onClick={() => setStarted(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-green-500 text-black font-black uppercase tracking-widest text-sm shadow-[0_15px_40px_rgba(34,197,94,0.45)]">
                    {!reduce && <motion.span aria-hidden className="absolute inset-y-0 w-1/3 bg-white/40 -skew-x-12 pointer-events-none" initial={{ x: "-200%" }} animate={{ x: "400%" }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }} />}
                    <span className="relative inline-flex items-center gap-2"><FaBolt /> Empezar inscripción <FaArrowRight /></span>
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }} exit={{ opacity: 0 }}>
                <div className="text-center mb-8">
                  <span className="inline-block text-green-400 font-black uppercase tracking-[0.3em] text-[10px] mb-1">Registro oficial · AFIBA</span>
                  <h2 className="text-2xl md:text-3xl font-black text-neutral-100 uppercase tracking-tight">{EVENT_NAME}</h2>
                </div>
                <Form
                  form={form} setForm={setForm} errors={errors} setErrors={setErrors}
                  handleChange={handleChange} handleSubmit={handleSubmit} loading={loading}
                  localities={LOCALITIES} modalities={MODALITIES} categories={CATEGORIES}
                  provinces={PROVINCES} countries={SOUTH_AMERICAN_COUNTRIES}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>

      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/85 z-[60] p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-7 flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t-4 border-b-4 border-green-500 shadow-[0_0_25px_#22c55e]" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-2 rounded-full border-r-4 border-l-4 border-[#54A17D]" />
                <motion.img src={afibaLogo} alt="AFIBA" className="relative w-20 h-20 object-contain drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]"
                  animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
              </div>
              <div className="h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p key={loadingMsg} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}
                    className="text-neutral-100 font-bold uppercase tracking-widest text-sm text-center">
                    {LOADING_MESSAGES[loadingMsg]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/85 z-[70] p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ opacity: 0, scale: 0.6, y: 60 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 40 }} transition={{ type: "spring", stiffness: 110, damping: 15 }}
              className="w-full max-w-lg bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 text-center shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 11, delay: 0.2 }} className="flex justify-center mb-6">
                <FaCheckCircle className="text-green-400 text-6xl drop-shadow-[0_0_18px_#22c55e]" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-black text-neutral-100 uppercase tracking-tight mb-2">¡Inscripción enviada!</h3>
              <div className="w-24 h-1.5 bg-green-500 mx-auto mb-7 rounded-full shadow-[0_0_12px_#22c55e]" />
              <p className="text-neutral-300 font-secondary md:text-lg mb-10 leading-relaxed">
                Te enviamos los datos de tu preinscripción a tu correo. <strong className="text-white">Revisá tu carpeta de SPAM</strong> si no lo ves en breve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button onClick={handleRegisterAnother} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-green-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.4)]">Nueva inscripción</motion.button>
                <Link to="/" className="w-full">
                  <motion.button whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 bg-transparent border-2 border-white/15 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded-2xl transition-colors">Finalizar y volver</motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TournamentsForm;