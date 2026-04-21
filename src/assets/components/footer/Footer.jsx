import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube, FaArrowRight, FaFacebookSquare, FaWhatsapp } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { NAV } from "../../data/header";
import "../../styles/Footer/index.css";
import logo from "../../imgs/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col">
          <img src={logo} alt="logo" className="logo" />
          <p>
          En afiba somos líderes en fisicoculturismo, promoviendo este deporte en nuestra comunidad y más allá. Nos esforzamos por crear un ambiente familiar y accesible para atletas de todos los niveles.
          </p>
        </div>
        <div className="col">
  <h3>Office  <div className="underline"> <span></span> </div> </h3>
  
  <p className="email-id">
    <a href="mailto:afibaoficialonline@gmail.com" className="text-white hover:text-primary-400">
      afibaoficialonline@gmail.com
    </a>
  </p>
  <h4>
    <a href="tel:1128729216" className="text-white hover:text-primary-400">
      11 2872-9216
    </a>
  </h4>
</div>
        <div className="col">
          <h3>Links  <div className="underline"> <span></span> </div></h3>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-primary-400">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h3>Newsletter  <div className="underline"> <span></span> </div></h3>
          <form action="">
            <i><MdOutlineEmail /></i>
            <input type="email" className="input" placeholder="Enter Your email id" required />
            <button type="submit"> <i><FaArrowRight /></i> </button>
          </form>
          <div className="social-icons flex justify-center items-center">
  <a 
    href="https://www.instagram.com/tu_perfil" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 bg-white rounded-full"
  >
    <FaInstagram className="text-2xl text-black" />
  </a>
</div>

        </div>
      </div>
      <hr />
      <p className="copyright">AFIBA ALL RIGHT RESERVED</p>
    </footer>
  );
};

export default Footer;
