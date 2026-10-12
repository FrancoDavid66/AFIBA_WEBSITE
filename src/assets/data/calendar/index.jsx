import copa_provincia from '../../imgs/calendar/2025/copa_provincia.jpg';
import image5 from '../../imgs/calendar/2026/sanson_cup.jpeg';
import clausura_2026 from '../../imgs/calendar/2026/clausura_2026.jpg';
// YA NO IMPORTAMOS 'proximamente' AQUÍ.

// Campos opcionales por torneo:
// - openFrom: "AAAA-MM-DD" -> abre la inscripción desde esa fecha (pisa la regla de "3 días después del torneo anterior").
// - details: datos para la página de información del torneo (/info-torneo).
//   details.fees: tarifas del torneo [{ label, amount }] (amount en pesos, sin puntos).

export const CALENDAR_AFIBA = {
  MARZO: [
    {
      date: "7 MARZO",
      fullDate: "2026-03-07",
      name: "SANSON CUP",
      location: "Mar del Plata - Buenos Aires",
      organizer: "AFIBA - Prom. Jose Lombardo (2266440219)",
      link: "https://www.instagram.com/afibaoficial/",
      image: image5,
      available: false // Finalizado
    }
  ],
  MAYO: [
    {
      date: "10 MAYO",
      fullDate: "2026-05-10",
      name: "OPEN IFBB",
      location: "Tandil - Buenos Aires",
      organizer: "AFIBA - Prom. Andres Zanzberro (2494638743)",
      link: "https://www.instagram.com/afibaoficial/",
      image: null, // Flyer no disponible -> Señal para diseño front-end
      available: true // Finalizado (se gestiona por fecha)
    }
  ],
  AGOSTO: [
    {
      date: "23 AGOSTO",
      fullDate: "2026-08-23",
      name: "BUENOS AIRES IFBB CUP",
      location: "San Justo - Buenos Aires",
      organizer: "AFIBA - Prom. Seba Barrientos (549 2325479243)",
      link: "https://www.instagram.com/afibaoficial/",
      image: null, // Flyer no disponible
      available: true // Finalizado (se gestiona por fecha)
    }
  ],
  OCTUBRE: [
    {
      date: "11 OCTUBRE",
      fullDate: "2026-10-11",
      name: "CAMPEONATO BONAERENSE",
      location: "Provincia de Buenos Aires",
      organizer: "AFIBA - Prom. Pablo Roldan (2281584117)",
      link: "https://www.instagram.com/afibaoficial/",
      image: null, // Flyer no disponible
      available: true // Finalizado (se gestiona por fecha)
    }
  ],
  NOVIEMBRE: [
    {
      date: "15 NOV.",
      fullDate: "2026-11-15",
      name: "CAMPEONATO CLAUSURA 2026",
      location: "San Justo - Buenos Aires",
      organizer: "AFIBA - Info: Gabriel Casado / María Mernes",
      link: "https://www.instagram.com/afibaoficial/",
      image: clausura_2026,
      available: true, // ✅ INSCRIPCIÓN HABILITADA (cierra sola el 14/11 a las 00:00)
      openFrom: "2026-10-11", // abre ya, sin esperar los 3 días después del Bonaerense
      details: {
        venue: "Centro Deportivo Huracán de San Justo",
        address: "Ignacio Arieta 2967, San Justo, Provincia de Buenos Aires",
        schedule: [
          { label: "Registro de atletas", time: "10:00 a 12:00 hs" },
          { label: "Inicio de la competencia", time: "15:00 hs" },
        ],
        fees: [
          { label: "Inscripción", amount: 60000 },
          { label: "Categoría adicional", amount: 30000 },
          { label: "Libreta anual de afiliación", amount: 40000 },
        ],
        contacts: [
          { name: "Gabriel Casado", phone: "+54 9 11 6458-4453", whatsapp: "5491164584453" },
          { name: "María Mernes", phone: "+54 9 11 2872-9216", whatsapp: "5491128729216" },
        ],
        instagram: { user: "afibaoficial", url: "https://www.instagram.com/afibaoficial/" },
      },
    }
  ]
};
