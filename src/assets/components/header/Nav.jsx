import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { NAV_LARGE } from "../../data/header/index";

const Nav = () => {
  const [dropdown, setDropdown] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const handleMouseEnter = () => setDropdown(true);
  const handleMouseLeave = () => setDropdown(false);

  const handleSubMenuEnter = () => setSubMenuVisible(true);
  const handleSubMenuLeave = () => setSubMenuVisible(false);

  return (
    <nav className="hidden sm:flex">
      <ul className="flex text-primary-200 font-semibold gap-x-6">
        {NAV_LARGE.map((item, index) => (
          <li
            key={index}
            className="relative group text-sm cursor-pointer transition-all duration-100 "
            onMouseEnter={item.name === "TORNEOS" ? handleMouseEnter : null}
            onMouseLeave={item.name === "TORNEOS" ? handleMouseLeave : null}
          >
            <Link to={item.href}>{item.name}</Link>
            {item.subMenu && item.name === "TORNEOS" && dropdown && (
              <ul 
                className="absolute left-0 top-full  bg-primary-100  rounded shadow-lg z-10"
                onMouseEnter={handleSubMenuEnter}
                onMouseLeave={handleSubMenuLeave}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <li key={subIndex} className="px-4 py-2 hover:bg-primary-300 hover:text-primary-400 ">
                    <Link to={subItem.href}>{subItem.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
