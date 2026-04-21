/// 2026
import sanson_cup_2026 from '../../imgs/calendar/2026/sanson_cup.jpeg'

/// 2025 image
import sanson_cup_2025 from '../../imgs/calendar/sanson_cup_2025.svg'
import campeonato_apertura_2025 from '../../imgs/calendar/2025/CAMPEONATO_APERTURA.webp'
import campeonato_bonaerense_2025 from '../../imgs/calendar/2025/campeonato_bonaerense_2025.jpg'
import copa_provincia from '../../imgs/calendar/2025/copa_provincia.jpg'
import campeonato_clausura from '../../imgs/calendar/15_diciembre.jpg'

// 2024 image
import image1 from '../../imgs/results/2024/RESULTADO-SAMSOM-CUP-2024.jpeg'
import image2 from '../../imgs/results/2024/RESULTADO-CAMPEONATO-APERTURA-2024.jpeg'
import image3 from '../../imgs/results/2024/21_julio.jpg'
import image4 from '../../imgs/calendar/13_octubre.jpg'
import image5 from '../../imgs/calendar/15_diciembre.jpg'

/// 2026 pdf
import SANSON_CUP_2026 from '../../pdf/results/2026/sanson_cup_2026.pdf'

// 2025 pdf
import CAMPEONATO_CLAUSURA_2025 from '../../pdf/results/2025/RESULTADOS_CLAUSURA_2025.xlsx'
import SAMSON_CUP_results from '../../pdf/results/2025/SANSON_CUP_2025.xlsx'
import CAMPEONATO_APERTURA from '../../pdf/results/2025/CAMPEONATO_APERTURA.xlsx'
import RESULTADOS_BONAERENSE_2025 from '../../pdf/results/2025/RESULTADOS_BONAERENSE_2025.pdf'
import COPA_PROVINCIA_2025 from '../../pdf/results/2025/COPA_PROVINCIA.pdf'

// 2024 pdf
import pdf1 from '../../pdf/results/2024/RESULTADO-SAMSOM-CUP-2024.pdf'
import pdf2 from '../../pdf/results/2024/RESULTADO-CAMPEONATO-APERTURA-2024.pdf'
import pdf4 from '../../pdf/results/2024/RESULTADOS_COPA_PROVINCIA_2024.pdf'
import pdf5 from '../../pdf/results/2024/RESULTADO_CAMPEONATO_BONAERENSE_2024.pdf'
import pdf6 from '../../pdf/results/2024/RESULTADO_CAMPEONATO_CLAUSURA_2024.xlsx'

// 2023
import image1_2023 from '../../imgs/results/2023/RESULTADO-CAMPEONATO-APERTURA-2023.jpeg'
import image2_2023 from '../../imgs/results/2023/RESULTADO-CAMPEONATO-BONAERENSE-2023.jpeg'
import image3_2023 from '../../imgs/results/2023/RESULTADO-COPA-INDEPENDENCIA-2023.jpeg'
import image4_2023 from '../../imgs/results/2023/RESULTADO-COPA-PROVINCIA-2023.jpeg'
import image5_2023 from '../../imgs/results/2023/RESULTADO-SANSON-CUP-2023.jpeg'

// 2023 pdf
import pdf1_2023 from '../../pdf/results/2023/RESULTADO-CAMPEONATO-APERTURA-2023.pdf'
import pdf2_2023 from '../../pdf/results/2023/RESULTADO-CAMPEONATO-BONAERENSE-2023.pdf'
import pdf3_2023 from '../../pdf/results/2023/RESULTADO-COPA-INDEPENDENCIA-2023.pdf'
import pdf4_2023 from '../../pdf/results/2023/RESULTADO-COPA-PROVINCIA-2023.pdf'
import pdf5_2023 from '../../pdf/results/2023/RESULTADO-SANSON-CUP-2023.pdf'

export const RESULTS = [
  // 2026
  { title: 'SANSON CUP 2026', pdf: SANSON_CUP_2026, image: sanson_cup_2026, year: '2026' },

  // 2025
  { title: 'CAMPEONATO CLAUSURA 2025', pdf: CAMPEONATO_CLAUSURA_2025, image: campeonato_clausura, year: '2025' },
  { title: 'COPA PROVINCIA 2025', pdf: COPA_PROVINCIA_2025, image: copa_provincia, year: '2025' },
  { title: 'RESULTADOS BONAERENSE 2025', pdf: RESULTADOS_BONAERENSE_2025, image: campeonato_bonaerense_2025, year: '2025' },
  { title: 'SANSON CUP 2025', pdf: SAMSON_CUP_results, image: sanson_cup_2025, year: '2025' },
  { title: 'CAMPEONATO APERTURA 2025', pdf: CAMPEONATO_APERTURA, image: campeonato_apertura_2025, year: '2025' },

  // 2024
  { title: 'CAMPEONATO CLAUSURA 2024', pdf: pdf6, image: image5, year: '2024' },
  { title: 'CAMPEONATO BONAERENSE 2024', pdf: pdf5, image: image4, year: '2024' },
  { title: 'COPA PROVINCIA 2024', pdf: pdf4, image: image3, year: '2024' },
  { title: 'CAMPEONATO APERTURA 2024', pdf: pdf2, image: image2, year: '2024' },
  { title: 'SAMSOM CUP 2024', pdf: pdf1, image: image1, year: '2024' },

  // 2023
  { title: 'CAMPEONATO BONAERENSE 2023', pdf: pdf1_2023, image: image1_2023, year: '2023' },
  { title: 'COPA PROVINCIA 2023', pdf: pdf4_2023, image: image4_2023, year: '2023' },
  { title: 'COPA INDEPENDENCIA 2023', pdf: pdf3_2023, image: image3_2023, year: '2023' },
  { title: 'COPA APERTURA 2023', pdf: pdf2_2023, image: image2_2023, year: '2023' },
  { title: 'SANSON CUP 2023', pdf: pdf5_2023, image: image5_2023, year: '2023' },
];