import copa_provincia from '../../imgs/calendar/2025/copa_provincia.jpg';
import image5 from '../../imgs/calendar/2026/sanson_cup.jpeg';
// YA NO IMPORTAMOS 'proximamente' AQUÍ.

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
      available: true // INSCRIPCIÓN HABILITADA (Próximo torneo)
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
      available: false
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
      available: false
    }
  ],
  NOVIEMBRE: [
    {
      date: "22 NOV.",
      fullDate: "2026-11-22",
      name: "CAMPEONATO IFBB CLAUSURA",
      location: "Ezeiza - Buenos Aires",
      organizer: "AFIBA - Prom. Marcos Tobio (1156511256)",
      link: "https://www.instagram.com/afibaoficial/",
      image: null, // Flyer no disponible
      available: false
    }
  ]
};