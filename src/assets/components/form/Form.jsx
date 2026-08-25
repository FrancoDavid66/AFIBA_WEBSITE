// src/assets/components/form/Form.jsx
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaCheck, FaPaperPlane, FaPen, FaPlus, FaTimes, FaWhatsapp } from "react-icons/fa";
import { validateFields } from "../../utils/form/validateForm";

const baseField =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border text-white placeholder-neutral-400 [color-scheme:dark] focus:outline-none focus:ring-2 transition-colors";
const okBorder = "border-white/15 hover:border-white/25 focus:ring-green-500/70 focus:border-green-500/70";
const errBorder = "border-red-500/70 focus:ring-red-500/40";
const labelCls = "block text-[11px] font-black uppercase tracking-[0.18em] text-green-400 mb-2";
const hintCls = "text-neutral-400 text-xs mt-1.5";
const errCls = "text-red-400 text-sm mt-1.5";

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 70 : -70 }),
  center: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -70 : 70, transition: { duration: 0.2 } }),
};
const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } } };
const fieldVariants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

const TextField = ({ label, name, value, onChange, error, type = "text", placeholder, hint, inputMode, autoComplete, optional }) => (
  <div className="w-full">
    <label htmlFor={name} className={labelCls}>
      {label} {optional && <span className="text-neutral-500 normal-case font-normal tracking-normal">(opcional)</span>}
    </label>
    <input id={name} name={name} type={type} inputMode={inputMode} autoComplete={autoComplete}
      value={value} onChange={onChange} placeholder={placeholder}
      className={`${baseField} ${error ? errBorder : okBorder}`} />
    {hint && !error && <p className={hintCls}>{hint}</p>}
    {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className={errCls}>{error}</motion.p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, error, options, placeholder }) => (
  <div className="w-full">
    {label && <label htmlFor={name} className={labelCls}>{label}</label>}
    <select id={name} name={name} value={value} onChange={onChange}
      className={`${baseField} ${error ? errBorder : okBorder} appearance-none cursor-pointer`}>
      <option value="">{placeholder}</option>
      {options.map((opt) => <option key={opt} value={opt} className="text-black">{opt}</option>)}
    </select>
    {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className={errCls}>{error}</motion.p>}
  </div>
);

const STEPS = [
  { title: "Tus datos", subtitle: "Empecemos por lo básico.", fields: ["email", "fullName", "birthDate", "dni"] },
  { title: "De dónde sos", subtitle: "Tu ubicación.", fields: ["country", "province", "locality"] },
  { title: "Tu competencia", subtitle: "Agregá todas las modalidades en las que competís.", fields: ["participations"] },
  { title: "Tus medidas", subtitle: "Peso y altura de competencia.", fields: ["competitionWeight", "height"] },
  { title: "Contacto", subtitle: "Cómo te encontramos.", fields: ["phone", "instagram", "trainer"] },
  { title: "Revisá y enviá", subtitle: "Confirmá que esté todo bien.", fields: [] },
];
const LAST = STEPS.length - 1;

const Form = ({ form, setForm, errors, setErrors, handleChange, handleSubmit, loading, localities, modalities, categories, provinces, countries }) => {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [otherLocality, setOtherLocality] = useState(false);
  const [pickModality, setPickModality] = useState("");
  const [pickCategory, setPickCategory] = useState("");

  const isArgentina = form.country === "ARGENTINA";
  const showLocalitySelect = isArgentina && form.province === "BUENOS AIRES";
  const showLocalityField = !isArgentina || !!form.province;
  const participations = form.participations || [];

  const clearErr = (...names) => setErrors((prev) => { const n = { ...prev }; names.forEach((k) => delete n[k]); return n; });

  const onChange = (e) => {
    handleChange(e);
    const { name } = e.target;
    if (errors[name]) clearErr(name);
  };

  const handleCountryChange = (e) => {
    const v = e.target.value;
    setForm((p) => ({ ...p, country: v, province: "", locality: "" }));
    setOtherLocality(false);
    clearErr("country", "province", "locality");
  };
  const handleProvinceChange = (e) => {
    const v = e.target.value;
    setForm((p) => ({ ...p, province: v, locality: "" }));
    setOtherLocality(false);
    clearErr("province", "locality");
  };
  const handleLocalitySelect = (e) => {
    const v = e.target.value;
    if (v === "OTRA...") { setOtherLocality(true); setForm((p) => ({ ...p, locality: "" })); }
    else { setOtherLocality(false); setForm((p) => ({ ...p, locality: v })); }
    if (errors.locality) clearErr("locality");
  };

  const addParticipation = () => {
    if (!pickModality || !pickCategory) return;
    const exists = participations.some((p) => p.modality === pickModality && p.category === pickCategory);
    if (exists) { setPickModality(""); setPickCategory(""); return; }
    setForm((p) => ({ ...p, participations: [...(p.participations || []), { modality: pickModality, category: pickCategory }] }));
    setPickModality(""); setPickCategory("");
    if (errors.participations) clearErr("participations");
  };
  const removeParticipation = (idx) => {
    setForm((p) => ({ ...p, participations: (p.participations || []).filter((_, i) => i !== idx) }));
  };

  const goNext = () => {
    const e = validateFields(form, STEPS[step].fields);
    setErrors(e);
    if (Object.keys(e).length === 0) { setDirection(1); setStep((s) => Math.min(s + 1, LAST)); }
  };
  const goBack = () => { setErrors({}); setDirection(-1); setStep((s) => Math.max(s - 1, 0)); };
  const jumpTo = (t) => { setErrors({}); setDirection(t > step ? 1 : -1); setStep(t); };
  const onSubmit = (e) => { e.preventDefault(); if (step < LAST) goNext(); };

  const reviewGroups = [
    { step: 0, title: "Tus datos", rows: [["Correo", form.email], ["Nombre", form.fullName], ["Fecha de nacimiento", form.birthDate], ["DNI", form.dni]] },
    { step: 1, title: "Ubicación", rows: [["País", form.country], ...(isArgentina ? [["Provincia", form.province]] : []), ["Localidad", form.locality]] },
    { step: 2, title: "Competencia", rows: participations.map((p, i) => [`Participación ${i + 1}`, `${p.modality} — ${p.category}`]) },
    { step: 3, title: "Medidas", rows: [["Peso (kg)", form.competitionWeight], ["Altura (m)", form.height]] },
    { step: 4, title: "Contacto", rows: [["Teléfono", form.phone], ["Instagram", form.instagram || "—"], ["Entrenador", form.trainer]] },
  ];

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col" noValidate>
      {/* STEPPER */}
      <div className="relative mb-8 max-w-md mx-auto w-full">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-white/10" />
        <motion.div className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 bg-green-500 shadow-[0_0_10px_#22c55e]"
          initial={false} animate={{ width: `${(step / LAST) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        <div className="relative flex justify-between">
          {STEPS.map((s, i) => {
            const done = i < step, active = i === step;
            return (
              <button type="button" key={i} onClick={() => done && jumpTo(i)} aria-label={`Paso ${i + 1}: ${s.title}`} className={done ? "cursor-pointer" : "cursor-default"}>
                <motion.span animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }} transition={active ? { duration: 1.6, repeat: Infinity } : {}}
                  className={`flex w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center text-[11px] sm:text-xs font-black border-2 transition-colors ${
                    done ? "bg-green-500 border-green-500 text-black"
                    : active ? "bg-[#0a1f16] border-green-500 text-green-400 shadow-[0_0_18px_rgba(34,197,94,0.55)]"
                    : "bg-[#0a1f16] border-white/15 text-neutral-500"
                  }`}>
                  {done ? <FaCheck size={10} /> : i + 1}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HEADER PASO */}
      <div className="mb-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={`h-${step}`} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }}>
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-green-400/70">Paso {step + 1} de {STEPS.length}</span>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1">{STEPS[step].title}</h3>
            <p className="text-neutral-400 font-secondary text-sm mt-1">{STEPS[step].subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CAMPOS */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="min-h-[260px]">
          <motion.div variants={listVariants} initial="hidden" animate="show" className="flex flex-col gap-5">
            {/* PASO 0 — DATOS */}
            {step === 0 && (
              <>
                <motion.div variants={fieldVariants}><TextField label="Correo electrónico" name="email" type="email" inputMode="email" autoComplete="email" placeholder="ejemplo@correo.com" hint="Acá te llega la confirmación. Ej: nombre@gmail.com" value={form.email} onChange={onChange} error={errors.email} /></motion.div>
                <motion.div variants={fieldVariants}><TextField label="Nombre y apellido" name="fullName" autoComplete="name" placeholder="Juan Pérez" hint="Escribí tu nombre completo." value={form.fullName} onChange={onChange} error={errors.fullName} /></motion.div>
                <motion.div variants={fieldVariants}><TextField label="Fecha de nacimiento" name="birthDate" type="date" hint="Tocá el campo y elegí tu fecha en el calendario." value={form.birthDate} onChange={onChange} error={errors.birthDate} /></motion.div>
                <motion.div variants={fieldVariants}><TextField label="DNI" name="dni" inputMode="numeric" placeholder="12345678" hint="Solo los números, sin puntos ni espacios. Ej: 12345678" value={form.dni} onChange={onChange} error={errors.dni} /></motion.div>
              </>
            )}

            {/* PASO 1 — UBICACIÓN */}
            {step === 1 && (
              <>
                <motion.div variants={fieldVariants}><SelectField label="País" name="country" value={form.country} onChange={handleCountryChange} error={errors.country} options={countries} placeholder="Seleccioná tu país" /></motion.div>
                {isArgentina && <motion.div variants={fieldVariants}><SelectField label="Provincia" name="province" value={form.province} onChange={handleProvinceChange} error={errors.province} options={provinces} placeholder="Seleccioná tu provincia" /></motion.div>}
                {showLocalityField && (
                  <motion.div variants={fieldVariants}>
                    {showLocalitySelect ? (
                      <>
                        <SelectField label="Localidad" name="localitySelect" value={otherLocality ? "OTRA..." : form.locality} onChange={handleLocalitySelect} error={errors.locality} options={localities} placeholder="Seleccioná tu localidad" />
                        <AnimatePresence>
                          {otherLocality && (
                            <motion.input initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 12 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              name="locality" value={form.locality} onChange={onChange} placeholder="Escribí tu localidad" className={`${baseField} ${errors.locality ? errBorder : okBorder}`} />
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <TextField label="Localidad" name="locality" placeholder="Escribí tu localidad" hint="Escribí tu ciudad o localidad." value={form.locality} onChange={onChange} error={errors.locality} />
                    )}
                  </motion.div>
                )}
              </>
            )}

            {/* PASO 2 — COMPETENCIA (participaciones) */}
            {step === 2 && (
              <>
                <motion.div variants={fieldVariants} className="rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-4">
                  <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                    <strong className="text-green-400">¿Cómo se carga?</strong> Elegí una <strong>modalidad</strong> y su <strong>categoría</strong>, después tocá <strong>"Agregar participación"</strong>. Repetí el paso para sumar todas las que quieras competir.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SelectField label="Modalidad" name="pickModality" value={pickModality} onChange={(e) => setPickModality(e.target.value)} options={modalities} placeholder="Elegí modalidad" />
                    <SelectField label="Categoría" name="pickCategory" value={pickCategory} onChange={(e) => setPickCategory(e.target.value)} options={categories} placeholder="Elegí categoría" />
                  </div>
                  <motion.button type="button" onClick={addParticipation} disabled={!pickModality || !pickCategory}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/15 border-2 border-green-500/40 text-green-400 font-black uppercase tracking-widest text-xs hover:bg-green-500/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <FaPlus size={11} /> Agregar participación
                  </motion.button>
                  {errors.participations && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className={errCls}>{errors.participations}</motion.p>}
                </motion.div>

                {participations.length > 0 ? (
                  <motion.div variants={fieldVariants} className="flex flex-col gap-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">Tus participaciones ({participations.length})</span>
                    <AnimatePresence>
                      {participations.map((p, i) => (
                        <motion.div key={`${p.modality}-${p.category}-${i}`}
                          initial={{ opacity: 0, x: -20, height: 0 }} animate={{ opacity: 1, x: 0, height: "auto" }} exit={{ opacity: 0, x: 20, height: 0 }}
                          className="flex items-center justify-between gap-3 rounded-xl bg-green-500/10 border border-green-500/25 px-4 py-3">
                          <span className="text-sm text-white font-medium break-words"><strong className="text-green-400">{p.modality}</strong> · {p.category}</span>
                          <button type="button" onClick={() => removeParticipation(i)} aria-label="Quitar" className="shrink-0 text-neutral-400 hover:text-red-400 transition-colors"><FaTimes /></button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.p variants={fieldVariants} className="text-white/50 text-sm text-center">Todavía no agregaste ninguna participación.</motion.p>
                )}
              </>
            )}

            {/* PASO 3 — MEDIDAS */}
            {step === 3 && (
              <>
                <motion.div variants={fieldVariants}>
                  <TextField label="Peso de competencia (kg)" name="competitionWeight" inputMode="decimal" placeholder="80.5"
                    hint="Escribí solo el número en kilos. Podés usar punto o coma. Ej: 80 o 80.5" value={form.competitionWeight} onChange={onChange} error={errors.competitionWeight} />
                </motion.div>
                <motion.div variants={fieldVariants}>
                  <TextField label="Altura (m)" name="height" inputMode="decimal" placeholder="1.80"
                    hint="En METROS, no en centímetros. Ej: 1.80 (no escribas 180)." value={form.height} onChange={onChange} error={errors.height} />
                </motion.div>
              </>
            )}

            {/* PASO 4 — CONTACTO */}
            {step === 4 && (
              <>
                <motion.div variants={fieldVariants}><TextField label="Teléfono" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+54 9 11 2173 6846" hint="Con código de país y área. Ej: +54 9 11 2173 6846" value={form.phone} onChange={onChange} error={errors.phone} /></motion.div>
                <motion.div variants={fieldVariants}><TextField label="Instagram" name="instagram" optional placeholder="tu_usuario" hint="Solo tu usuario, sin la @. Ej: tu_usuario" value={form.instagram} onChange={onChange} error={errors.instagram} /></motion.div>
                <motion.div variants={fieldVariants}><TextField label="Entrenador" name="trainer" placeholder="Nombre del entrenador" hint="Nombre de tu entrenador. Si no tenés, escribí 'Sin entrenador'." value={form.trainer} onChange={onChange} error={errors.trainer} /></motion.div>
              </>
            )}

            {/* PASO 5 — REVISIÓN */}
            {step === LAST && (
              <div className="flex flex-col gap-4">
                {reviewGroups.map((g) => (
                  <motion.div variants={fieldVariants} key={g.step} whileHover={{ scale: 1.01, borderColor: "rgba(34,197,94,0.4)" }} className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-black uppercase tracking-[0.18em] text-green-400">{g.title}</h4>
                      <button type="button" onClick={() => jumpTo(g.step)} className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white transition-colors"><FaPen size={10} /> Editar</button>
                    </div>
                    <dl className="space-y-1.5">
                      {g.rows.length === 0 ? (
                        <p className="text-white/50 text-sm">Sin datos.</p>
                      ) : g.rows.map(([l, v], idx) => (
                        <div key={`${l}-${idx}`} className="flex justify-between gap-4 text-sm">
                          <dt className="text-white/55">{l}</dt>
                          <dd className="text-white font-medium text-right break-words">{v || "—"}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* NAVEGACIÓN */}
      <div className="flex items-center gap-3 mt-9">
        {step > 0 && (
          <motion.button type="button" onClick={goBack} disabled={loading} whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-white/15 text-neutral-300 font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors disabled:opacity-50">
            <FaArrowLeft size={12} /> Atrás
          </motion.button>
        )}
        {step < LAST ? (
          <motion.button key="next" type="button" onClick={goNext} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden ml-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-green-500 text-black font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(34,197,94,0.4)]">
            {!reduce && <motion.span aria-hidden className="absolute inset-y-0 w-1/3 bg-white/40 -skew-x-12 pointer-events-none" initial={{ x: "-200%" }} animate={{ x: "400%" }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4 }} />}
            <span className="relative inline-flex items-center gap-2">Siguiente <FaArrowRight size={12} /></span>
          </motion.button>
        ) : (
          <motion.button key="submit" type="button" onClick={handleSubmit} disabled={loading} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden ml-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-green-500 text-black font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(34,197,94,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
            {!reduce && !loading && <motion.span aria-hidden className="absolute inset-y-0 w-1/3 bg-white/40 -skew-x-12 pointer-events-none" initial={{ x: "-200%" }} animate={{ x: "400%" }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2 }} />}
            <span className="relative inline-flex items-center gap-2">{loading ? "Enviando..." : (<>Enviar inscripción <FaPaperPlane size={12} /></>)}</span>
          </motion.button>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <a href="https://wa.me/541164235336" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-neutral-400 hover:text-green-400 font-bold text-sm transition-colors">
          <FaWhatsapp /> ¿Ayuda? Escribinos: +54 11 6423-5336
        </a>
      </div>
    </form>
  );
};

export default Form;