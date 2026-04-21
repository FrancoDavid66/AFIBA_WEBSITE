export const NAV = [
  { name: "INICIO", href: "/" },
  { name: "NOSOTROS", href: "/about" },
  { name: "CALENDARIO", href: "/Calendar" },

  { name: "RESULTADOS", href: "/Results" },
  { name: "MODALIDADES", href: "/modalidades" },
  { name: "GALERIA", href: "/torneos" },
  { name: "REGLAMENTOS", href: "/Rules" },
 
];
;



export const NAV_LARGE = [
  { name: "INICIO", href: "/" },
  { name: "NOSOTROS", href: "/about" },
  { name: "CALENDARIO", href: "/Calendar" },



 
  {
    name: "TORNEOS",
 
    subMenu: [
      { name: "GALERIA", href: "/torneos" },
      { name: "MODALIDADES", href: "/modalidades" },
      { name: "REGLAMENTOS", href: "/Rules" },
      { name: "RESULTADOS", href: "/Results" },

    ],
  },
];


  import { FaFacebook,FaInstagram,FaWhatsapp,FaCameraRetro } from "react-icons/fa";
  

  export const ICONS_NETWORKING=[
    {icon:<FaWhatsapp/>, href:"https://wa.me/1128729216"},
    {icon:<FaInstagram/>, href:'https://www.instagram.com/afibaoficial/?hl=es'},
    {icon:<FaFacebook/>, href:'https://www.facebook.com/AsociacionFisicoculturistasDeBuenosAires/?locale=es_LA'},
    {icon:<FaCameraRetro/>, href:'https://www.instagram.com/santiagocastrofeijoofotografo?igsh=d3pha3ZlMzY2ZG43'},
  ]