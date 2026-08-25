// src/assets/utils/calendar/openEvent.js
// Fuente única para saber qué evento tiene la inscripción abierta.
import { CALENDAR_AFIBA } from "../../data/calendar";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

// Devuelve el evento con inscripción abierta, o null.
// Misma lógica del calendario: abre 3 días después del torneo anterior
// y cierra 1 día antes del evento. Respeta available !== false.
export const getOpenEvent = (reference = new Date()) => {
  const all = Object.values(CALENDAR_AFIBA)
    .flat()
    .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

  for (let i = 0; i < all.length; i++) {
    const t = all[i];
    const eventDate = startOfDay(`${t.fullDate}T00:00:00`);
    const closeAt = startOfDay(addDays(eventDate, -1));
    const openAt = i === 0
      ? new Date(0)
      : startOfDay(addDays(startOfDay(`${all[i - 1].fullDate}T00:00:00`), 3));

    const manuallyAvailable = t.available !== false;
    if (manuallyAvailable && reference >= openAt && reference < closeAt) return t;
  }
  return null;
};

export const formatFechaLarga = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};