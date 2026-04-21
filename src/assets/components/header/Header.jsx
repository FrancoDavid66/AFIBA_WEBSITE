import React, { useEffect, useState } from "react";
import image from "../../imgs/logo.png";
import Nav from "./Nav";
// import react icons
import { RiMenu4Fill, RiCloseFill } from "react-icons/ri";


import { MdMenu } from "react-icons/md";
import NavMobile from "./NavMobile";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ICONS_NETWORKING } from "../../data/header";

const Header = () => {
  //estado del header
  const [isActive, setIsActive] = useState(false);

  //nav mobile estado
  const [navMobile, setNavMobile] = useState(false);

  //scroll event
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 80 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-primary-100  pb-[16px] " : "bg-primary-100    "
      } sticky   top-0 w-full z-30 left-0 right-0 mx-auto  flex-col flex justify-start items-center transition-all duration-300 `}
    >
      <div className=" bg-[#0f4571] flex justify-end items-center w-full gap-10 text-2xl  pr-10 h-10 text-neutral-100 font-semibold tracking-widest  ">
      {ICONS_NETWORKING.map((item,i)=>{
        return(
          <motion.a  initial  animate={{x:20}} target="_blank"  href={item.href}>
            {item.icon}
          </motion.a>
        )
      })}
      </div>
      <motion.div animate={{width:'100%'}} transition={{duration:1, type:'easy'}} className="bg-[#f70808] w-0 h-[3px] "></motion.div>
      <div className="w-full gap-10  flex justify-start items-center  px-[20px] lg:px-[80px] ">
      <div
          onClick={() => setNavMobile(!navMobile)}
          className="sm:hidden    "
        >
          {navMobile ? (
            <RiCloseFill className="text-neutral-100 text-3xl cursor-pointer" />
          ) : (
            <MdMenu className="text-neutral-100 text-3xl cursor-pointer " />
          )}
        </div>
        <div className=" flex items-start justify-start flex-row text-white">
          <Link to={'/'}>
          <h2 className="h3 text-neutral-100 ">
            AFIBA
            </h2>
            </Link>
          <p className="text-[12px] flex items-start justify-start  text-neutral-100">
            &copy;
          </p>
        </div>
        {/*nav initially hidden - show on desktop*/}
        <Nav />
        {/**btns - initially hidden -show on desktop */}

      
        <NavMobile navMobile={navMobile} setNavMobile={setNavMobile} />
      </div>
    </header>
  );
};

export default Header;
