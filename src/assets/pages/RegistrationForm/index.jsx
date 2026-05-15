import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import axios from "axios";
import {
  LOCALITIES,
  MODALITIES,
  CATEGORIES,
  PROVINCES,
  SOUTH_AMERICAN_COUNTRIES,
} from "../../data/form";
import { Link, useLocation } from "react-router-dom";
import { createTask } from "../../../api/tasks.api.js";
import Form from "../../components/form/Form.jsx";
import { FaCheckCircle, FaLock, FaExclamationTriangle, FaArrowLeft, FaTrophy, FaDumbbell } from "react-icons/fa";

const TournamentsForm = () => {
  const TEMPLATE_ID = "template_ylbg0bb";
  const SERVICE_ID = "service_df596ny";
  const PUBLIC_KEY = "xsntWGn3yCXlG9Exn";

  const TEMPLATE_ID_CONFIRMATION = "template_1fqy5mx";
  const SERVICE_ID_CONFIRMATION = "service_df596ny";
  const PUBLIC_KEY_CONFIRMATION = "xsntWGn3yCXlG9Exn";

  const CLOUD_NAME = "dvsyvhqym";
  const UPLOAD_PRESET = "PresetForm";

  const location = useLocation();

  const DEFAULT_TOURNAMENT = useMemo(
    () => ({
      name: "OPEN IFBB TANDIL",
      date: "2026-05-10",
    }),
    []
  );

  const queryTournament = useMemo(() => {
    const params = new URLSearchParams(location.search || "");
    const name = params.get("tournament") || params.get("event") || params.get("name");
    const date = params.get("date");
    if (!name && !date) return null;
    return {
      name: name || DEFAULT_TOURNAMENT.name,
      date: date || DEFAULT_TOURNAMENT.date,
    };
  }, [location.search, DEFAULT_TOURNAMENT]);

  const tournamentFromState = location.state?.tournament;
  const resolvedDate = tournamentFromState?.fullDate || tournamentFromState?.date || queryTournament?.date || DEFAULT_TOURNAMENT.date;

  const tournament = {
    ...tournamentFromState,
    name: tournamentFromState?.name || queryTournament?.name || DEFAULT_TOURNAMENT.name,
    date: resolvedDate
  };

  const EVENT_NAME = tournament.name;
  const eventNameLower = EVENT_NAME.toLowerCase();
  const forceBlocked = eventNameLower.includes("copa provincia");

  // Cierre: 1 día antes a las 00:00 hs
  const CLOSE_AT = useMemo(() => {
    const rawDate = tournament.date;
    const d = new Date(`${rawDate}T00:00:00`);
    if (!Number.isNaN(d.getTime())) {
      d.setDate(d.getDate() - 1);
      return d;
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30, 0, 0, 0);
  }, [tournament.date]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [inscriptionClosed, setInscriptionClosed] = useState(false);

  const pad2 = (n) => String(n).padStart(2, "0");
  const formatCloseAt = (dateObj) => {
    const dd = pad2(dateObj.getDate());
    const mm = pad2(dateObj.getMonth() + 1);
    const yyyy = dateObj.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  useEffect(() => {
    const tick = () => {
      const diff = CLOSE_AT.getTime() - Date.now();

      if (diff <= 0) {
        setInscriptionClosed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setInscriptionClosed(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [CLOSE_AT]);

  const [form, setForm] = useState({
    email: "", fullName: "", birthDate: "", dni: "", locality: "",
    country: "", province: "", modality: "", category: "",
    competitionWeight: "", height: "", phone: "", trainer: "",
    instagram: "", photo: "",
  });

  const [errors, setErrors] = useState({});
  
  // 🔥 ESTADOS DE MODALES
  const [loading, setLoading] = useState(false); // Modal de Carga
  const [modalOpen, setModalOpen] = useState(false); // Modal de Éxito
  
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const formattedValue = value.replace(",", ".");
    if (name === "photo") {
      const file = files?.[0];
      if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
        setForm({ ...form, [name]: file });
      } else {
        alert("Seleccioná una imagen PNG, JPG o JPEG.");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } else {
      setForm({ ...form, [name]: formattedValue });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dniPattern = /^[0-9]+$/;
    const phonePattern = /^\+?[\d\s]+$/;
    const weightPattern = /^[0-9]+\.[0-9]+$/;
    const heightPattern = /^[0-9]+\.[0-9]+$/;

    if (!form.email) tempErrors.email = "Requerido";
    else if (!emailPattern.test(form.email)) tempErrors.email = "Correo no válido";
    if (!form.fullName) tempErrors.fullName = "Requerido";
    if (!form.birthDate) tempErrors.birthDate = "Requerida";
    if (!form.dni) tempErrors.dni = "Requerido";
    else if (!dniPattern.test(form.dni)) tempErrors.dni = "Solo números";
    if (!form.locality) tempErrors.locality = "Requerida";
    if (!form.country) tempErrors.country = "Requerido";
    if (!form.province) tempErrors.province = "Requerida";
    if (!form.modality) tempErrors.modality = "Requerida";
    if (!form.category) tempErrors.category = "Requerida";
    if (!form.competitionWeight) tempErrors.competitionWeight = "Requerido";
    if (!form.height) tempErrors.height = "Requerida";
    if (!form.phone) tempErrors.phone = "Requerido";
    if (!form.trainer) tempErrors.trainer = "Requerido";
    if (!form.photo) tempErrors.photo = "Foto requerida";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔥 ACTIVA EL MODAL DE CARGA

    if (inscriptionClosed || forceBlocked || Date.now() >= CLOSE_AT.getTime()) {
      setLoading(false);
      return;
    }

    if (validateForm()) {
      try {
        // 🔥 Formato para los correos de EmailJS (DD/MM/YYYY)
        const formattedBirthDateForEmail = formatDate(form.birthDate);
        
        // 🔥 Formato para el backend de Django (YYYY-MM-DD)
        let backendDate = form.birthDate;
        if (backendDate.includes('/')) {
          const parts = backendDate.split('/');
          if (parts.length === 3) {
            backendDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
        }

        let photoUrl = "";

        if (form.photo) {
          const formData = new FormData();
          formData.append("file", form.photo);
          formData.append("upload_preset", UPLOAD_PRESET);
          const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
          );
          photoUrl = cloudinaryResponse.data.secure_url;
        }

        // Enviamos la fecha procesada a la API
        const apiData = {
          ...form, birthDate: backendDate, photoUrl, event: EVENT_NAME,
        };

        await createTask(apiData);

        const templateParams = {
          form_name: form.fullName, to_name: form.fullName, to_email: form.email,
          to_birthDate: formattedBirthDateForEmail, // <-- Aquí va la versión DD/MM/YYYY
          to_dni: form.dni, to_locality: form.locality,
          to_country: form.country, to_province: form.province, to_modality: form.modality,
          to_category: form.category, to_competitionWeight: form.competitionWeight,
          to_height: form.height, to_phone: form.phone, to_trainer: form.trainer,
          to_instagram: form.instagram, photo_url: photoUrl, message: "REGISTRO OFICIAL AFIBA",
          tournament_name: EVENT_NAME,
        };

        await emailjs.send(SERVICE_ID_CONFIRMATION, TEMPLATE_ID_CONFIRMATION, templateParams, PUBLIC_KEY_CONFIRMATION);
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        setModalOpen(true); // 🔥 ACTIVA EL MODAL DE ÉXITO
        setForm({
          email: "", fullName: "", birthDate: "", dni: "", country: "", locality: "",
          province: "", modality: "", category: "", competitionWeight: "", height: "",
          phone: "", instagram: "", trainer: "", photo: "",
        });
      } catch (error) {
        console.error("Error al enviar formulario:", error.response?.data || error.message);
      } finally {
        setLoading(false); // 🔥 APAGA EL MODAL DE CARGA
      }
    } else {
      setLoading(false); // Si hay error de validación, se apaga
    }
  };

  const handleRegisterAnother = () => {
    setModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFormClosed = inscriptionClosed || forceBlocked;

  // ===================== VARIANTES DE ANIMACIÓN ÉPICA =====================
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 100, rotateX: -30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.2
      } 
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.4 } 
    }
  };

  // =========================================================================

  return (
    <section className="w-full min-h-screen bg-neutral-500 font-primary flex items-center justify-center p-4 md:p-8">
      
      {/* Contenedor Principal Split-Screen */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 bg-neutral-200 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5 relative z-10">
        
        {/* PANEL IZQUIERDO (Info del Torneo) */}
        <div className="lg:col-span-5 bg-primary-100 p-10 md:p-14 relative flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <Link to="/calendar" className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-10 text-xs font-bold uppercase tracking-widest transition-colors">
              <FaArrowLeft /> Volver
            </Link>

            <div className="mb-4">
              <span className="inline-block bg-neutral-300 text-neutral-200 font-black uppercase tracking-[0.2em] text-[10px] px-3 py-1 rounded-sm">
                Registro de Atletas
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-neutral-100 uppercase tracking-tighter leading-[1.1] mb-6">
              {EVENT_NAME}
            </h1>
            
            <p className="text-primary-200/80 font-secondary text-sm md:text-base leading-relaxed mb-12 max-w-md">
              Completa el formulario con tus datos precisos. La información ingresada tiene carácter de declaración jurada para la participación en el evento oficial.
            </p>
          </div>

          <div className="relative z-10 border-t border-primary-200/20 pt-8 mt-auto">
            <p className="text-primary-200 text-[10px] uppercase font-bold tracking-widest mb-3">Cierre de Inscripción</p>
            <p className="text-2xl font-bold text-neutral-100 mb-8">{formatCloseAt(CLOSE_AT)} <span className="text-sm font-normal text-primary-200/60">00:00 hs</span></p>

            {!isFormClosed ? (
              <div className="flex gap-4 items-end text-neutral-100 tabular-nums">
                {[
                  {l:'Días',v:timeLeft.days},
                  {l:'Hrs',v:pad2(timeLeft.hours)},
                  {l:'Min',v:pad2(timeLeft.minutes)},
                  {l:'Seg',v:pad2(timeLeft.seconds)}
                ].map((t,idx)=>(
                    <React.Fragment key={idx}>
                      <div className="flex flex-col">
                        <span className="text-4xl font-black leading-none">{t.v}</span>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-300 font-bold mt-1">{t.l}</span>
                      </div>
                      {idx < 3 && <span className="text-2xl font-black text-primary-200/30 mb-4">:</span>}
                    </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-primary-400/20 text-primary-400 border border-primary-400/30 px-4 py-2 rounded-lg">
                <FaLock size={12} />
                <span className="text-xs font-bold uppercase tracking-widest">Inscripción Cerrada</span>
              </div>
            )}
          </div>
        </div>

        {/* PANEL DERECHO (Formulario) */}
        <div className="lg:col-span-7 bg-neutral-200 p-8 md:p-14 relative flex flex-col justify-center">
          
          {!isFormClosed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="w-full text-neutral-100">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-neutral-100 uppercase tracking-wide">Datos del Competidor</h3>
                <p className="text-neutral-400 font-secondary text-sm mt-1">Verifica tu información antes de enviar.</p>
              </div>
              <Form form={form} setForm={setForm} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} validateForm={validateForm} fileInputRef={fileInputRef} localities={LOCALITIES} modalities={MODALITIES} categories={CATEGORIES} provinces={PROVINCES} countries={SOUTH_AMERICAN_COUNTRIES} loading={loading} />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full py-20">
              <div className="w-24 h-24 bg-primary-400/5 rounded-full flex items-center justify-center mb-6"> <FaExclamationTriangle className="text-primary-400 text-4xl" /> </div>
              <h3 className="text-3xl font-black text-neutral-100 uppercase tracking-tight mb-4"> No Disponible </h3>
              <p className="text-neutral-400 font-secondary text-base max-w-md"> {forceBlocked ? "Este evento no gestiona inscripciones mediante la plataforma web oficial." : `El tiempo límite para registrarse en el ${EVENT_NAME} ha concluido satisfactoriamente.`} </p>
            </motion.div>
          )}

        </div>
      </div>

      {/* ===================== MODAL DE CARGA (PROCESANDO) ===================== */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-neutral-500/95 z-[60] p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center">
              {/* Anillos Giratorios Épicos */}
              <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                {/* Anillo exterior Mint */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-4 border-b-4 border-neutral-300 shadow-[0_0_20px_#54A17D]"
                />
                {/* Anillo interior Verde Oscuro */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 rounded-full border-r-4 border-l-4 border-primary-100 opacity-80"
                />
                {/* Icono central latiendo */}
                <FaDumbbell className="text-neutral-300 text-3xl animate-pulse" />
              </div>
              
              <motion.h3
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.3em] mb-3"
              >
                Procesando
              </motion.h3>
              <p className="text-neutral-400 font-secondary text-xs tracking-widest uppercase animate-pulse">
                Encriptando datos y subiendo archivos...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== MODAL DE ÉXITO EDITORIAL ===================== */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-neutral-500/95 z-50 p-4 md:p-10 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-neutral-200 p-12 md:p-16 rounded-[3rem] shadow-[0_0_80px_rgba(84,161,125,0.3)] max-w-2xl w-full text-center relative overflow-hidden border border-neutral-300"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ perspective: 1000 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Brillo de fondo sutil que late */}
              <motion.div 
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(84,161,125,0.2),_transparent_70%)] pointer-events-none"
              />

              {/* Icono Check Épico Animado */}
              <motion.div 
                className="w-32 h-32 bg-neutral-300/10 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(84,161,125,0.2)] border border-neutral-300/20"
                variants={iconVariants}
              >
                <FaCheckCircle className="text-neutral-300 text-7xl drop-shadow-[0_0_15px_rgba(84,161,125,0.6)]" />
              </motion.div>
              
              {/* Título Monumental e Épico */}
              <motion.h3 
                className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                variants={itemVariants}
              >
                ¡Registro <br /> Confirmado!
              </motion.h3>
              
              {/* Texto Subrayado (Sutil barra lateral) */}
              <motion.div variants={itemVariants} className="w-24 h-1.5 bg-neutral-300 mx-auto mb-8 rounded-full shadow-[0_0_10px_#54A17D]" />

              {/* Texto de información más grande y claro */}
              <motion.p 
                className="text-neutral-100 font-secondary text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Tus datos han sido procesados y hemos enviado un ticket de confirmación a tu correo electrónico. Por favor, <strong className="text-white font-bold">verifica tu carpeta de SPAM</strong> si no lo encuentras en breve.
              </motion.p>

              {/* Botones de Acción */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  onClick={handleRegisterAnother}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(84,161,125,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-neutral-300 text-neutral-200 font-black uppercase tracking-widest text-xs rounded-2xl transition-shadow shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  Otra Modalidad
                </motion.button>

                <Link to="/" className="w-full">
                  <motion.button 
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 bg-transparent border-2 border-neutral-400/20 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded-2xl transition-all"
                  >
                    Finalizar y Volver
                  </motion.button>
                </Link>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TournamentsForm;