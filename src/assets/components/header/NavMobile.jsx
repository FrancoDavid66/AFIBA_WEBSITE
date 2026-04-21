import React, { useEffect, useState } from "react";
//import { Link } from "react-scroll";

import { Link } from "react-router-dom";
import { NAV } from "../../data/header";

const NavMobile = ({ navMobile, setNavMobile }) => {

  const [w, setW] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setW(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    
    <nav
      className={`${
        navMobile ? "min-h-screen" : "min-h-0"
      } lg:hidden w-full bg-primary-100 fixed top-0  left-0 right-0 -bottom-12 -z-10  overflow-hidden transition-all h-0 sm:hidden `}
    >
      {/* controll navmobile width */}
      {w <= 640? null:setNavMobile(false)}
      <ul className="w-full h-full bg-primary-100 flex flex-col items-center justify-center gap-y-8 ">
        {NAV.map((item, index) => {
          return (
            <li
              key={index}
              className="text-white font-primary font-bold  text-body-md cursor-pointer hover:text-primary-400 duration-200 ease-in-out"
            >
              <Link
                onClick={() => setNavMobile(!navMobile)}
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                to={item.href}
              >
                {" "}
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

NavMobile.propTypes = {};

export default NavMobile;
