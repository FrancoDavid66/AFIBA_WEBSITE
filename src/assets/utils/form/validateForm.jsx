// src/assets/utils/form/validateForm.jsx
// Fuente única de validación del formulario de preinscripción.

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dniPattern = /^[0-9]+$/;
const phonePattern = /^\+?[\d\s().-]{6,}$/;
const numberPattern = /^\d+([.,]\d+)?$/;

const fechaInvalida = (value) => {
  if (!value) return true;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return true;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (d > hoy) return true;
  if (d.getFullYear() < 1900) return true;
  return false;
};

export const fieldValidators = {
  email: (f) => !f.email ? "Ingresá tu correo." : (!emailPattern.test(f.email) ? "Revisá el correo, no parece válido." : null),
  fullName: (f) => !f.fullName?.trim() ? "Ingresá tu nombre y apellido." : null,
  birthDate: (f) => !f.birthDate ? "Elegí tu fecha de nacimiento." : (fechaInvalida(f.birthDate) ? "Revisá la fecha de nacimiento." : null),
  dni: (f) => !f.dni ? "Ingresá tu DNI." : (!dniPattern.test(f.dni) ? "El DNI lleva solo números, sin puntos." : null),
  country: (f) => !f.country ? "Elegí tu país." : null,
  province: (f) => (f.country === "ARGENTINA" && !f.province) ? "Elegí tu provincia." : null,
  locality: (f) => !f.locality?.trim() ? "Ingresá tu localidad." : null,

  // Múltiples participaciones (modalidad + categoría)
  participations: (f) => (!f.participations || f.participations.length === 0)
    ? "Agregá al menos una modalidad con su categoría."
    : null,

  competitionWeight: (f) => !f.competitionWeight ? "Ingresá tu peso." : (!numberPattern.test(f.competitionWeight) ? "Poné un número, por ejemplo 80 o 80.5." : null),
  height: (f) => !f.height ? "Ingresá tu altura." : (!numberPattern.test(f.height) ? "Poné tu altura en metros, por ejemplo 1.80." : null),
  phone: (f) => !f.phone ? "Ingresá tu teléfono." : (!phonePattern.test(f.phone) ? "Revisá el teléfono." : null),
  trainer: (f) => !f.trainer?.trim() ? "Ingresá el nombre de tu entrenador." : null,
  // instagram es opcional.
};

export const ALL_FIELDS = Object.keys(fieldValidators);

export const validateFields = (form, fields) => {
  const errors = {};
  fields.forEach((name) => {
    const v = fieldValidators[name];
    if (!v) return;
    const msg = v(form);
    if (msg) errors[name] = msg;
  });
  return errors;
};

export const validateForm = (form) => validateFields(form, ALL_FIELDS);