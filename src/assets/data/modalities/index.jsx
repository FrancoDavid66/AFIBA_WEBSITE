import bikiniFitness from "../../imgs/modalities/bikini_fitness_reglamento_ifbb.png";
import body_fitness_reglamento_ifbb from "../../imgs/modalities/body_fitness_reglamento_ifbb.png";
import classicphysiquereglamentoifbb from "../../imgs/modalities/classicphysiquereglamentoifbb.png";
import culturismo_clasico_reglamento_ifbb from "../../imgs/modalities/culturismo_clasico_reglamento_ifbb.png";
import fisico_culturismo_parejas_reglamento_ifbb from "../../imgs/modalities/fisico_culturismo_parejas_reglamento_ifbb.jpg";
import fisico_culturismo_reglamento_ifbb from "../../imgs/modalities/fisico_culturismo_reglamento_ifbb.jpg";
import fit_model_masculino_reglamento_ifbb from "../../imgs/modalities/fit_model_masculino_reglamento_ifbb.jpg";
import fit_modelreglamento_ifbb from "../../imgs/modalities/fit_modelreglamento_ifbb.jpg";
import FIT_PAIRS_1 from "../../imgs/modalities/FIT_PAIRS_1.jpg";
import fitness_coreografico_femenino_reglamento_ifbb from "../../imgs/modalities/fitness_coreografico_femenino_reglamento_fbb.jpg";
import fitness_coreografico_masculino_reglamento_ifbb from "../../imgs/modalities/fitness_coreografico_masculino_reglamento_ifbb.jpg";

import games_classic_reglamento_ifbb from "../../imgs/modalities/games_classic_reglamento_ifbb.jpg";
import mens_physique_fitness_reglamento_ifbb from "../../imgs/modalities/mens_physique_fitness_reglamento_ifbb.png";
import muscular_mens_physique_reglamento_ifbb from "../../imgs/modalities/muscular_mens_physique_reglamento_ifbb.jpg";
import wellness_fitness_reglamento_ifbb from "../../imgs/modalities/wellness-fitness-reglamento-ifbb.png";
import womens_physique_reglamento_ifbb from "../../imgs/modalities/womens-physique-reglamento-ifbb.jpg";


import mens_wheelchair from "../../imgs/modalities/mens_wheelchair.png";


// ✅ Fit & Beauty: toma automáticamente todo lo que haya en la carpeta,
// sin importar el nombre ni la extensión de los archivos.
const fabModules = import.meta.glob(
  "../../imgs/modalities/fit_and_beauty/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);
const fabImages = Object.keys(fabModules)
  .sort()
  .map((k) => fabModules[k].default);


//PDFS RULES
import manual_de_BIKINI_FITNESS from "../../pdf/modalities/1-Manual-de-BIKINI-FITNESS.pdf";
import manual_de_WELLNESS_FITNESS from "../../pdf/modalities/2-Manual-de-WELLNESS-FITNESS.pdf";
import manual_de_WOMENS_FIT_MODEL from "../../pdf/modalities/3-Manual-de-WOMENS-FIT-MODEL.pdf";
import manual_de_BODY_FITNESS from "../../pdf/modalities/4-Manual-de-BODY-FITNESS.pdf";
import manual_de_WOMENS_PHYSIQUE from "../../pdf/modalities/5-Manual-de-WOMENS-PHYSIQUE.pdf";
import manual_de_MENS_PHYSIQUE from "../../pdf/modalities/6-Manual-de-MENS-PHYSIQUE.pdf";
import manual_de_MUSCULAR_MENS_PHYSIQUE from "../../pdf/modalities/7-Manual-de-MUSCULAR-MENS-PHYSIQUE.pdf";
import manual_de_FISICOCULTURISMO_MENS_BODYBUILDING from "../../pdf/modalities/8-Manual-de-FISICOCULTURISMO-MENS-BODYBUILDING.pdf";
import manual_de_CULTURISMO_CLASICO_CLASSIC_BODYBUILDING from "../../pdf/modalities/9-Manual-de-CULTURISMO-CLASICO-CLASSIC-BODYBUILDING.pdf";
import manual_de_GAMES_CLASSIC_BODYBUILDING from "../../pdf/modalities/10-Manual-de-GAMES-CLASSIC-BODYBUILDING.pdf";
import manual_de_CLASSIC_PHYSIQUE from "../../pdf/modalities/11-Manual-de-CLASSIC-PHYSIQUE.pdf";

import manual_de_FISICOCULTURISMO_PAREJAS_MIXED_PAIRS from "../../pdf/modalities/12-Manual-de-FISICOCULTURISMO-PAREJAS-MIXED-PAIRS.pdf";
import manual_de_FITNESS_COREOGRAFICO_FEMENINO_WOMENS_FITNESS from "../../pdf/modalities/13-Manual-de-FITNESS-COREOGRAFICO-FEMENINO-WOMENS-FITNESS.pdf";
import manual_de_FITNESS_COREOGRAFICO_MASCULINO_MENS_FITNESS from "../../pdf/modalities/14-Manual-de-FITNESS-COREOGRAFICO-MASCULINO-MENS-FITNESS.pdf";
import reglamento_fit_model_masculino_ifbb from "../../pdf/modalities/15-Manual-de-FIT-MODEL-MASCULINO.pdf";
import REGLAMENTO_FIT_PAIRS_PAREJAS_FITNESS_CSFF from "../../pdf/modalities/16-Manual-de-FIT-PAIRS-PAREJAS-FITNESS.pdf";
import manual_MENS_WHEELCHAIR from "../../pdf/modalities/17-Manual-de-MENS-WHEELCHAIR.pdf";
import manual_de_FIT_AND_BEAUTY from "../../pdf/modalities/18-Manual-de-FIT-AND-BEAUTY.pdf";


//image bikini fitness
import image_bikini_fitness1 from '../../imgs/modalities/bikini_fitness/image1.png'
import image_bikini_fitness2 from '../../imgs/modalities/bikini_fitness/image2.png'
import image_bikini_fitness3 from '../../imgs/modalities/bikini_fitness/image3.png'
import image_bikini_fitness4 from '../../imgs/modalities/bikini_fitness/image4.png'
import image_bikini_fitness5 from '../../imgs/modalities/bikini_fitness/image5.png'

//image wellness fitness
import image_wellness_fitness1 from '../../imgs/modalities/wellness-fitness/image1.png'
import image_wellness_fitness2 from '../../imgs/modalities/wellness-fitness/image2.png'
import image_wellness_fitness3 from '../../imgs/modalities/wellness-fitness/image3.png'
import image_wellness_fitness4 from '../../imgs/modalities/wellness-fitness/image4.png'
import image_wellness_fitness5 from '../../imgs/modalities/wellness-fitness/image5.png'
//image womens_fit-model
import womens_fit_model1 from '../../imgs/modalities/womens_fit_model/image1.jpg'
import womens_fit_model2 from '../../imgs/modalities/womens_fit_model/image2.jpg'
import womens_fit_model3 from '../../imgs/modalities/womens_fit_model/image3.jpg'
import womens_fit_model4 from '../../imgs/modalities/womens_fit_model/image4.jpg'
import womens_fit_model5 from '../../imgs/modalities/womens_fit_model/image5.jpg'

//image body_fitness-model
import body_fitness1 from '../../imgs/modalities/body_fitness/image1.png'
import body_fitness2 from '../../imgs/modalities/body_fitness/image2.png'
import body_fitness3 from '../../imgs/modalities/body_fitness/image3.png'
import body_fitness4 from '../../imgs/modalities/body_fitness/image4.png'
import body_fitness5 from '../../imgs/modalities/body_fitness/image5.png'


//image womens_physique1
import womens_physique1 from '../../imgs/modalities/womens_physique/image1.jpg'
import womens_physique2 from '../../imgs/modalities/womens_physique/image2.jpg'
import womens_physique3 from '../../imgs/modalities/womens_physique/image3.jpg'
import womens_physique4 from '../../imgs/modalities/womens_physique/image4.jpg'
import womens_physique5 from '../../imgs/modalities/womens_physique/image5.jpg'




//image mens_physique1
import mens_physique1 from '../../imgs/modalities/mens_physique/image1.png'
import mens_physique2 from '../../imgs/modalities/mens_physique/image2.png'
import mens_physique3 from '../../imgs/modalities/mens_physique/image3.png'
import mens_physique4 from '../../imgs/modalities/mens_physique/image4.png'
import mens_physique5 from '../../imgs/modalities/mens_physique/image5.png'



//image muscular_mens_physique
import muscular_mens_physique1 from '../../imgs/modalities/muscular_mens_physique/image1.jpg'
import muscular_mens_physique2 from '../../imgs/modalities/muscular_mens_physique/image2.jpg'
import muscular_mens_physique3 from '../../imgs/modalities/muscular_mens_physique/image3.jpg'
import muscular_mens_physique4 from '../../imgs/modalities/muscular_mens_physique/image4.jpg'
import muscular_mens_physique5 from '../../imgs/modalities/muscular_mens_physique/image5.jpg'



//image culturismo_clasico_bodybuilding1
import culturismo_clasico_bodybuilding1 from '../../imgs/modalities/culturismo_clasico_bodybuilding/image1.png'
import culturismo_clasico_bodybuilding2 from '../../imgs/modalities/culturismo_clasico_bodybuilding/image2.png'
import culturismo_clasico_bodybuilding3 from '../../imgs/modalities/culturismo_clasico_bodybuilding/image3.png'
import culturismo_clasico_bodybuilding4 from '../../imgs/modalities/culturismo_clasico_bodybuilding/image4.png'
import culturismo_clasico_bodybuilding5 from '../../imgs/modalities/culturismo_clasico_bodybuilding/image5.png'


//image games_classic_bodybuilding
import games_classic_bodybuilding1 from '../../imgs/modalities/games_classic_bodybuilding/image1.jpg'
import games_classic_bodybuilding2 from '../../imgs/modalities/games_classic_bodybuilding/image2.jpg'
import games_classic_bodybuilding3 from '../../imgs/modalities/games_classic_bodybuilding/image3.jpg'
import games_classic_bodybuilding4 from '../../imgs/modalities/games_classic_bodybuilding/image4.jpg'
import games_classic_bodybuilding5 from '../../imgs/modalities/games_classic_bodybuilding/image5.jpg'




//image classic_physique
import classic_physique1 from '../../imgs/modalities/classic_physique/image1.png'
import classic_physique2 from '../../imgs/modalities/classic_physique/image2.png'
import classic_physique3 from '../../imgs/modalities/classic_physique/image3.png'
import classic_physique4 from '../../imgs/modalities/classic_physique/image4.png'
import classic_physique5 from '../../imgs/modalities/classic_physique/image5.png'



//image fit_pairs_parejas
import fit_pairs_parejas1 from '../../imgs/modalities/fit_pairs_parejas/image1.jpg'
import fit_pairs_parejas2 from '../../imgs/modalities/fit_pairs_parejas/image2.jpg'
import fit_pairs_parejas3 from '../../imgs/modalities/fit_pairs_parejas/image3.jpg'
import fit_pairs_parejas4 from '../../imgs/modalities/fit_pairs_parejas/image4.jpg'
import fit_pairs_parejas5 from '../../imgs/modalities/fit_pairs_parejas/image5.jpg'

//image fitness_coreografico_femenino
import fitness_coreografico_femenino1 from '../../imgs/modalities/fitness_coreografico_femenino/image1.jpg'
import fitness_coreografico_femenino2 from '../../imgs/modalities/fitness_coreografico_femenino/image2.jpg'
import fitness_coreografico_femenino3 from '../../imgs/modalities/fitness_coreografico_femenino/image3.jpg'
import fitness_coreografico_femenino4 from '../../imgs/modalities/fitness_coreografico_femenino/image4.jpg'
import fitness_coreografico_femenino5 from '../../imgs/modalities/fitness_coreografico_femenino/image5.jpg'


//image fitness_coreografico_femenino
import fitness_coreografico_masculino1 from '../../imgs/modalities/fitness_coreografico_masculino/image1.jpg'
import fitness_coreografico_masculino2 from '../../imgs/modalities/fitness_coreografico_masculino/image2.jpg'
import fitness_coreografico_masculino3 from '../../imgs/modalities/fitness_coreografico_masculino/image3.jpg'
import fitness_coreografico_masculino4 from '../../imgs/modalities/fitness_coreografico_masculino/image4.jpg'
import fitness_coreografico_masculino5 from '../../imgs/modalities/fitness_coreografico_masculino/image5.jpg'




//image fitness_parejas
import fitness_parejas1 from '../../imgs/modalities/fitness_parejas/image1.jpg'
import fitness_parejas2 from '../../imgs/modalities/fitness_parejas/image2.jpg'
import fitness_parejas3 from '../../imgs/modalities/fitness_parejas/image3.jpg'
import fitness_parejas4 from '../../imgs/modalities/fitness_parejas/image4.jpg'
import fitness_parejas5 from '../../imgs/modalities/fitness_parejas/image5.jpg'


export const MODALITIES = [
  { 
    id:'1',
    title: "BIKINI FITNESS",
    description: "Bikini Fitness fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 7 de noviembre de 2010 en Bakú, Azerbaiyán. Es la categoría de menor desarrollo de masa muscular de todas las categorías femeninas. Fue creada para mostrar feminidad, estilo, bellos contornos, buena tonificación muscular (hombros, espalda, piernas), confianza y una atractiva presentación. ",
    image: bikiniFitness,
    rules: manual_de_BIKINI_FITNESS,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "femenino",
    images:[
      {image:image_bikini_fitness1},
      {image:image_bikini_fitness2},
      {image:image_bikini_fitness3},
      {image:image_bikini_fitness4},
      {image:image_bikini_fitness5},    ]
  },

  {
    id:'2',
    title: "WELLNESS FITNESS",
    description: "Wellness Fitness fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 4 de noviembre de 2016 en Benidorm, España. Fue creada para mostrar feminidad, estilo, bellos contornos, buena tonificación muscular (hombros, espalda, piernas), confianza y una atractiva presentación.",
    image: wellness_fitness_reglamento_ifbb,
    rules: manual_de_WELLNESS_FITNESS,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "femenino",
    images:[
      {image:image_wellness_fitness1},
      {image:image_wellness_fitness2},
      {image:image_wellness_fitness3},
      {image:image_wellness_fitness4},
      {image:image_wellness_fitness5},    ]
  
  },
  {
    id:'3',
    title: "WOMEN'S FIT MODEL",
    description: "WOMEN´S FIT MODEL fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 6 de noviembre de 2015 en Benidorm, España. Es calificada la apariencia física general, una apariencia saludable, así como la belleza facial y los detalles asociados a esta: peluquería, maquillaje, tono, color o bronceado de la piel",
    image: fit_modelreglamento_ifbb,
    rules: manual_de_WOMENS_FIT_MODEL,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "femenino",
    images:[
      {image:womens_fit_model1},
      {image:womens_fit_model2},
      {image:womens_fit_model3},
      {image:womens_fit_model4},
      {image:womens_fit_model5},    ]
  },
  {
    id:'4',
    title: "BODY FITNESS",
    description: "Body Fitness fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 27 de octubre de 2002 en El Cairo, Egipto. Esta modalidad deportiva, el énfasis se sitúa en la estética, la belleza, la feminidad, combinada con un físico atlético.",
    image: body_fitness_reglamento_ifbb,
    rules: manual_de_BODY_FITNESS,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "femenino",
    images:[
      {image:body_fitness1},
      {image:body_fitness2},
      {image:body_fitness3},
      {image:body_fitness4},
      {image:body_fitness5},    ]
  },
  {
    id:'5',
    title: "WOMENS PHYSIQUE",
    description: "Women,s Physique fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 11 de noviembre de 2012 en Guayaquil, Ecuador. Esta modalidad está dirigida a las mujeres que prefieren desarrollar un físico musculoso, pero definido, atlético y estético",
    image: womens_physique_reglamento_ifbb,
    rules: manual_de_WOMENS_PHYSIQUE,
 result: [
        {year:'2023', pdf:''}
    ],
    tag: "femenino",
    images:[
      {image:womens_physique1},
      {image:womens_physique2},
      {image:womens_physique3},
      {image:womens_physique4},
      {image:womens_physique5},    ]
  },
  {
    id:'6',
    title: "MENS PHYSIQUE",
    description: "Men´s Physique fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 11 de noviembre de 2012 en Guayaquil, Ecuador. Está dirigida a los hombres que prefieren desarrollar un físico menos musculoso, diferenciándose claramente de las categorías de culturismo, sin embargo, atlético y estéticamente agradable.",
    image: mens_physique_fitness_reglamento_ifbb,
    rules: manual_de_MENS_PHYSIQUE,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    images:[
      {image:mens_physique1},
      {image:mens_physique2},
      {image:mens_physique3},
      {image:mens_physique4},
      {image:mens_physique5},    ]
  },
  {
    id:'7',
    title: "MUSCULAR MENS PHYSIQUE",
    description: "Muscular Men´s Physique fue creada en 2016 e introducida por primera vez en el Campeonato Europeo de Fisicoculturismo y Fitness en mayo de 2016 en Santa Susana, España. Surge por la necesidad de permitir la participación de atletas que han sobrepasado el límite en su estructura muscular de la categoría Men´s Physique. Está dirigida a los hombres que prefieren desarrollar un físico musculoso, atlético y estéticamente agradable, diferenciándose claramente de las categorías de culturismo.",
    image: muscular_mens_physique_reglamento_ifbb,
    rules: manual_de_MUSCULAR_MENS_PHYSIQUE,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    images:[
      {image:muscular_mens_physique1},
      {image:muscular_mens_physique2},
      {image:muscular_mens_physique3},
      {image:muscular_mens_physique4},
      {image:muscular_mens_physique5},    ]
  },
  {
    id:'8',
    title: "FISICOCULTURISMO MENS BODYBUILDING",
    description: "Culturismo Clasico / Classic Bodybuilding fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 27 de noviembre de 2005 en Shanghai, China. Se evalúa exactamente igual, con los mismos parámetros y criterios que las categorías de Físico Culturismo.",
    image: fisico_culturismo_reglamento_ifbb,
    rules: manual_de_FISICOCULTURISMO_MENS_BODYBUILDING,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    
  },
  {
    id:'9',
    title: "CLASSIC BODYBUILDING",
    description: "Culturismo Clasico / Classic Bodybuilding fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 27 de noviembre de 2005 en Shanghai, China. Se evalúa exactamente igual, con los mismos parámetros y criterios que las categorías de Físico Culturismo.",
    image: culturismo_clasico_reglamento_ifbb,
    rules: manual_de_CULTURISMO_CLASICO_CLASSIC_BODYBUILDING,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    images:[
      {image:culturismo_clasico_bodybuilding1},
      {image:culturismo_clasico_bodybuilding2},
      {image:culturismo_clasico_bodybuilding3},
      {image:culturismo_clasico_bodybuilding4},
      {image:culturismo_clasico_bodybuilding5},    ]
    
  },
  {
    id:'10',
    title: "GAMES CLASSIC BODYBUILDING",
    description: "Games Classic Bodybuilding Fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 4 de noviembre de 2016 en Benidorm, España. Nueva categoría creada para la participación de la IFBB en los Juegos Olímpicos Regionales y adicional en los Campeonatos Mundiales y Continentales. Se evalúa exactamente igual, con los mismos parámetros y criterios que las categorías de Físico Culturismo",
    image: games_classic_reglamento_ifbb,
    rules: manual_de_GAMES_CLASSIC_BODYBUILDING,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    images:[
      {image:games_classic_bodybuilding1},
      {image:games_classic_bodybuilding2},
      {image:games_classic_bodybuilding3},
      {image:games_classic_bodybuilding4},
      {image:games_classic_bodybuilding5},    ]
  },

  {
    id:'11',
    title: "CLASSIC PHYSIQUE",
    description: "Classic Physique fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB en noviembre de 2018 en Benidorm, España. Se evalúa exactamente igual, con los mismos parámetros y criterios que las categorías de Físico Culturismo, es decir: Simetría – Proporción y Muscularidad pero con una pose adicional POSE DE VACIO ABDOMINAL, la cual es la que definirá y prevalecerá como primer punto a evaluar.",
    image: classicphysiquereglamentoifbb,
    rules: manual_de_CLASSIC_PHYSIQUE,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    images:[
      {image:classic_physique1},
      {image:classic_physique2},
      {image:classic_physique3},
      {image:classic_physique4},
      {image:classic_physique5},    ]
  },
  {
    id:'12',
    title: "FISICOCULTURISMO PAREJAS MIXED PAIRS",
    description: "Fit Pairs fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB en noviembre de 2020 en Santa Susana, España. 2 Esta categoría estará conformada por parejas de atletas Bikini Fitness y Men’s Physique, por lo que se evaluarán con los mismos criterios de juzgamiento de esas dos modalidades.",
    image: fisico_culturismo_parejas_reglamento_ifbb,
    rules: manual_de_FISICOCULTURISMO_PAREJAS_MIXED_PAIRS,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "mixed",
    images:[
      {image:fit_pairs_parejas1},
      {image:fit_pairs_parejas2},
      {image:fit_pairs_parejas3},
      {image:fit_pairs_parejas4},
      {image:fit_pairs_parejas5},    ]
  },
  {
    id:'13',
    title: "FITNESS COREOGRAFICO FEMENINO  FITNESS",
    description: "Fitness Coreográfico Femenino fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 03 de diciembre de 1995 en Guam, EE.UU",
    image: fitness_coreografico_femenino_reglamento_ifbb,
    rules: manual_de_FITNESS_COREOGRAFICO_FEMENINO_WOMENS_FITNESS,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "femenino",
    images:[
      {image:fitness_coreografico_femenino1},
      {image:fitness_coreografico_femenino2},
      {image:fitness_coreografico_femenino3},
      {image:fitness_coreografico_femenino4},
      {image:fitness_coreografico_femenino5},    ]
  },
  {
    id:'14',
    title: "FITNESS COREOGRAFICO MASCULINO FITNESS",
    description: "Fitness Coreográfico Masculino fue reconocida oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB el 27 de noviembre de 2005 en Shanghái, China",
    image: fitness_coreografico_masculino_reglamento_ifbb,
    rules: manual_de_FITNESS_COREOGRAFICO_MASCULINO_MENS_FITNESS,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    images:[
      {image:fitness_coreografico_masculino1},
      {image:fitness_coreografico_masculino2},
      {image:fitness_coreografico_masculino3},
      {image:fitness_coreografico_masculino4},
      {image:fitness_coreografico_masculino5},    ]
  },
  {
    id:'15',
    title: "FIT MODEL MASCULINO",
    description: "La categoría de modelo de ajuste masculino fue reconocida oficialmente como una nueva disciplina deportiva por el Consejo Ejecutivo de la IFBB y Congreso de la IFBB el 6 de noviembre de 2015, en Benidorm, España",
    image: fit_model_masculino_reglamento_ifbb,
    rules: reglamento_fit_model_masculino_ifbb,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "masculino",
    images:[
      {image:null},
      {image:null},
      {image:null},
      {image:null},
      {image:null},    ]
  },
  {
    id:'16',
    title: "PAREJAS FITNESS",
    description: "El Fisicoculturismo Parejas fue reconocido oficialmente por el Consejo Ejecutivo de la IFBB y miembros afiliados en el Congreso Anual de la IFBB en 1983 en Singapur. En el Congreso Anual de la IFBB en 2013 en Marrakech, Marruecos, se eliminó la modalidad Fisicoculturismo Femenino, por lo que a partir de esa fecha se les permite competir a las atletas de las modalidades Women’s Physique y Body Fitness.",
    image: FIT_PAIRS_1,
    rules: REGLAMENTO_FIT_PAIRS_PAREJAS_FITNESS_CSFF,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "mixed",
    images:[
      {image:fitness_parejas1},
      {image:fitness_parejas2},
      {image:fitness_parejas3},
      {image:fitness_parejas4},
      {image:fitness_parejas5},    ]
  },

  {
    id:'17',
    title: "MENS WHEELCHAIR",
    description: "El Men’s Wheelchair Fisicoculturismo es una categoría dentro del fisicoculturismo diseñada específicamente para atletas en sillas de ruedas. Esta división permite a los competidores que tienen discapacidades físicas mostrar su desarrollo muscular, simetría, definición y estética general, al igual que en las otras categorías del fisicoculturismo tradicional.",
    image: mens_wheelchair,
    rules: manual_MENS_WHEELCHAIR,
    result: [
        {year:'2023', pdf:''}
    ],
    tag: "mixed",
    images:[
      {image:null},
      {image:null},
      {image:null},
      {image:null},
      {image:null},   ]
  
  },

  {
    id:'18',
    title: "FIT & BEAUTY",
    description:
      "Fit & Beauty es una categoria de exhibicion y presencia escenica en la que se evalua " +
      "la armonia general de la atleta: tono muscular equilibrado, proporcion, postura, " +
      "desplazamiento en escenario y presentacion integral. La competencia se desarrolla en " +
      "dos rounds con indumentarias diferenciadas. Round 1 - Sport Wear: top blanco de espalda " +
      "atletica, shorts de lycra, medias blancas hasta la rodilla y zapatillas blancas sin " +
      "plataforma, buscando un look deportivo, fresco y natural. Round 2 - Swimsuit: traje de " +
      "bano negro de malla entera con tiras gruesas y espalda cerrada, acompanado de zapatos " +
      "reglamentarios IFBB transparentes con suela de 1 cm y tacon de 12 cm, buscando elegancia, " +
      "seguridad y presencia escenica. El color de la vestimenta puede variar segun el " +
      "organizador, excepto las medias del Round 1, que son obligatorias.",
    image: fabImages[0] || null,
    rules: manual_de_FIT_AND_BEAUTY,
    result: [
        {year:'2026', pdf:''}
    ],
    tag: "femenino",
    images: fabImages.map((img) => ({ image: img })),
  },

];