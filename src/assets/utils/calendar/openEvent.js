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

// Todos los torneos ordenados por fecha
export const getAllEvents = () =>
  Object.values(CALENDAR_AFIBA)
    .flat()
    .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

// Ventana de inscripción de un torneo:
// - abre 3 días después del torneo anterior (o desde "openFrom" si el torneo lo tiene)
// - cierra 1 día antes del evento
export const getEventWindow = (all, i) => {
  const t = all[i];
  const eventDate = startOfDay(`${t.fullDate}T00:00:00`);
  const closeAt = startOfDay(addDays(eventDate, -1));

  let openAt;
  if (t.openFrom) openAt = startOfDay(`${t.openFrom}T00:00:00`);
  else if (i === 0) openAt = new Date(0);
  else openAt = startOfDay(addDays(startOfDay(`${all[i - 1].fullDate}T00:00:00`), 3));

  return { eventDate, openAt, closeAt };
};

// Devuelve el evento con inscripción abierta, o null. Respeta available !== false.
export const getOpenEvent = (reference = new Date()) => {
  const all = getAllEvents();

  for (let i = 0; i < all.length; i++) {
    const t = all[i];
    const { openAt, closeAt } = getEventWindow(all, i);
    const manuallyAvailable = t.available !== false;
    if (manuallyAvailable && reference >= openAt && reference < closeAt) return t;
  }
  return null;
};

// Próximo torneo que todavía no se jugó (tenga o no la inscripción abierta), o null.
export const getNextEvent = (reference = new Date()) => {
  const all = getAllEvents();
  return all.find((t) => startOfDay(`${t.fullDate}T00:00:00`) > reference) || null;
};

// Busca un torneo por su nombre (sin importar mayúsculas)
export const findEventByName = (name) => {
  if (!name) return null;
  const n = String(name).trim().toLowerCase();
  return getAllEvents().find((t) => t.name.toLowerCase() === n) || null;
};

export const formatFechaLarga = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};
