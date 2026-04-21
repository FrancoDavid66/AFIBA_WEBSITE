import React from 'react';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
// Flyer de respaldo (se usa si el del torneo no está disponible para PDF)
import fallbackFlyer from "../imgs/calendar/2025/copa_provincia.jpg";

const formatDateNice = (iso) => {
  if (!iso) return "Fecha a confirmar";
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const formatter = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  // Capitaliza la primera letra
  const txt = formatter.format(date);
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};

const inferImgType = (src) => {
  if (typeof src !== 'string') return 'JPEG';
  const s = src.toLowerCase();
  if (s.endsWith('.png')) return 'PNG';
  if (s.endsWith('.jpg') || s.endsWith('.jpeg')) return 'JPEG';
  // jsPDF no soporta WEBP, forzamos fallback
  return 'UNSUPPORTED';
};

const EventInfo = () => {
  const { state } = useLocation();
  const t = state?.tournament || {};

  const title = t.name || 'Copa Provincia';
  const dateLabel = t.date ? formatDateNice(t.date) : 'Domingo 16 de noviembre de 2025';
  const sede = t.location || 'Complejo Aeropuerto – Ruta 7 KM 101, San Andrés de Giles, Buenos Aires';
  const hour = t.hour || '15:00 hs';
  const contact = t.info || '';
  const flyerSrc = t.image || fallbackFlyer;

  const mapsQuery = encodeURIComponent(sede);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Márgenes y espaciado
    let y = 20;
    const lineHeight = 10;
    const margin = 10;

    // Título
    doc.setFontSize(16);
    doc.text(title.toUpperCase(), margin, y);
    y += lineHeight;

    doc.setFontSize(11);
    doc.text('Información del evento', margin, y);
    y += lineHeight * 1.5;

    doc.text(`Fecha: ${dateLabel}`, margin, y);
    y += lineHeight;
    doc.text(`Ubicación: ${sede}`, margin, y);
    y += lineHeight;
    if (contact) {
      doc.text(`Contacto: ${contact}`, margin, y);
      y += lineHeight;
    }
    doc.text(`Competencia: ${hour}`, margin, y);

    // Flyer (intenta con el del torneo; si no, usa fallback)
    const detected = inferImgType(flyerSrc);
    try {
      if (detected === 'UNSUPPORTED') {
        // si no soporta (p.ej. webp), usar fallback
        doc.addImage(fallbackFlyer, 'JPEG', margin, y + 10, 180, 120);
      } else {
        doc.addImage(flyerSrc, detected, margin, y + 10, 180, 120);
      }
    } catch (e) {
      // fallback seguro
      doc.addImage(fallbackFlyer, 'JPEG', margin, y + 10, 180, 120);
    }

    const fileSafe = title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    doc.save(`${fileSafe || 'evento'}.pdf`);
  };

  return (
    <section className="bg-primary-300 py-10">
      <div className="p-6 rounded-lg max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between">
        {/* Info */}
        <div className="md:w-1/2 md:pr-6 text-white">
          <h2 className="text-3xl font-bold mb-1 uppercase">{title}</h2>
          <p className="mb-4 text-white/90">
            Detalles del torneo seleccionado
          </p>

          <p className="mb-2"><strong>Fecha:</strong> {dateLabel}</p>
          <p className="mb-2"><strong>Ubicación:</strong> {sede}</p>
          <p className="mb-2"><strong>Competencia:</strong> {hour}</p>
          {contact && <p className="mb-4"><strong>Contacto:</strong> {contact}</p>}

          <div className="mb-4">
            <strong>Ubicación en Google Maps:</strong>
            <div className="mt-2">
              <iframe
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
                title="Ubicación del evento"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Flyer + PDF */}
        <div className="md:w-1/2 md:pl-6">
          <div className="mb-4">
            <img
              src={flyerSrc}
              alt={`Flyer ${title}`}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <button
            onClick={generatePDF}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-3 rounded transition duration-300"
          >
            Descargar PDF del Evento
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventInfo;
