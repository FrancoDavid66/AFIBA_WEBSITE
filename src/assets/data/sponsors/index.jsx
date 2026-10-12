import americaForce from "../../imgs/sponsors/americaForce.jpeg";
import americaForce2 from "../../imgs/sponsors/americaForce2.jpg";
import fox from "../../imgs/sponsors/fox.jpeg";
import j2f from "../../imgs/sponsors/j2f.jpeg";
import jeho from "../../imgs/sponsors/jeho.png";
import megaMass from "../../imgs/sponsors/megaMass.jpeg";

import mega_mass_bikini from "../../imgs/sponsors/mega_mass_bikini.png";

import muscleTandil from "../../imgs/sponsors/muscleTandil.jpeg";

import panteraFitness from "../../imgs/sponsors/panteraFitness.jpeg";
import premiumFitness from "../../imgs/sponsors/premiumFitness.jpeg";
import augeFitt from "../../imgs/sponsors/augeFitt.jpg";
// NO PAGO ASI QUE NO LO PONEMOS POR EL MOMENTO
import technicalFitness from "../../imgs/sponsors/technicalFitness.jpeg";

// ✅ NUEVO SPONSOR: ProteiFuel (tortillas proteicas)
import proteifuel from "../../imgs/sponsors/proteifuel.jpg";
import proteifuel_info from "../../imgs/sponsors/proteifuel_info.jpg";
import proteifuel_poster from "../../imgs/sponsors/proteifuel_poster.jpg";

// Link de ProteiFuel (Instagram / WhatsApp). Cuando lo tengas, reemplazá el null.
const PROTEIFUEL_LINK = null;

export const SPONSORS = [
  { name: "ProteiFuel", href: PROTEIFUEL_LINK, image: proteifuel, isNew: true },
  { name: "J2F", href: "https://www.instagram.com/j2finnovar/", image: j2f },
  { name: "Mega Mass", href: "https://www.instagram.com/neodsign.ar/", image: megaMass },
  { name: "Mega Mass Bikini", href: "https://www.instagram.com/neodsign.ar/", image: mega_mass_bikini },
  { name: "America Force", href: "https://americanforcenew.com.ar/multimedia", image: americaForce },
  {
    name: "Pantera Fitness",
    href: "https://www.instagram.com/panterafitness.ok?igsh=NGx3OWtlZnN6ZG0z",
    image: panteraFitness,
  },
  { name: "Premium Fitness", href: "https://www.veesfitness.net/en", image: premiumFitness },
  { name: "Fox", href: "https://www.equipamientosfox.com/", image: fox },
  { name: "Jeho", href: "https://www.instagram.com/jeho.training/", image: jeho },
  { name: "Muscle Tandil", href: null, image: muscleTandil },
  { name: "Auge Fitt", href: "https://www.instagram.com/augefactoryfitness/", image: augeFitt },
];

import america_force from "../../videos/sponsors/america_force.mp4";
import fox_video from "../../videos/sponsors/FOX_video_explicativo.mp4";
import jeho_video from "../../videos/sponsors/jeho.mp4";
import proteifuel_video from "../../videos/sponsors/proteifuel.mp4";

// vertical: true -> el video es de celular (9:16). Se muestra entero, con fondo desenfocado.
export const SPONSORS_VIDEOS = [
  {
    id: "proteifuel",
    title: "ProteiFuel",
    tagline: "Tortillas proteicas · 37 g de proteína por unidad",
    videoUrl: proteifuel_video,
    img: proteifuel_info,
    poster: proteifuel_poster,
    link: PROTEIFUEL_LINK,
    vertical: true,
    isNew: true,
  },
  { id: "america-force", title: "America Force", videoUrl: america_force, img: americaForce2, link: "https://americanforcenew.com.ar/multimedia" },
  { id: "fox", title: "Fox", videoUrl: fox_video, img: fox, link: "https://www.equipamientosfox.com/" },
  { id: "jeho", title: "Jeho", videoUrl: jeho_video, img: jeho, link: "https://www.instagram.com/jeho.training/" },
];

// Datos del sponsor destacado (para el aviso de "Nuevo sponsor")
export const FEATURED_SPONSOR = {
  name: "ProteiFuel",
  tagline: "Combustible proteico para gente en movimiento",
  logo: proteifuel,
  info: proteifuel_info,
  link: PROTEIFUEL_LINK,
};
