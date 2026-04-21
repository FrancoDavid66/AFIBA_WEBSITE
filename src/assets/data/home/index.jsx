

import resultados from '../../pdf/results/2024/RESULTADO_CAMPEONATO_CLAUSURA_2024.xlsx'


import ASAMBLEA_AFIBA_MARZO_2024 from '../../imgs/notice/ASAMBLEA_AFIBA_MARZO_2024.jpg';


import image from '../../imgs/calendar/15_diciembre.jpg'
import banner from '../../imgs/notice/13_octubre.jpg';


export const NOTICES = [
 
 
  {
    id: "1",
    title: "ASAMBLEA AFIBA MARZO 2024",
    description: "El Ultimo 16 Marzo De 2024 Afiba Famf Ifbb Renovó Su Comision Directiva Para El Nuevo Ciclo 2024 / 2028.Presidenta: Maria Mernes Vicepresidente: Leonardo Zarate Secretario: Pablo Roldan Tesorero: Alejandro Maidana.",
    image: ASAMBLEA_AFIBA_MARZO_2024,
    pdf:null,
  },
  {
    id: "2",
    title: "",
    description: "DESCARGA LOS RESULTADOS DEL CAMPEONATO CLAUSURA 2024",
    image: image,
    pdf:resultados,
  }

];

