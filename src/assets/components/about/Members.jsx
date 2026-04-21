import React, { useEffect, useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { GiBiceps } from "react-icons/gi";
import { useAnimate, motion } from "framer-motion";
import { MEMBERS } from "../../data/about";

const Members = () => {
  const [dropdown, setDropdown] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    setDropdownOptions(Array(MEMBERS.length).fill(false));
  }, []);

  const handleMouseEnter = (index) => {
    setDropdown(index);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  const handleIconMouseEnter = (index) => {
    setDropdownOptions((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleIconMouseLeave = (index) => {
    setDropdownOptions((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  // Ordenar los miembros, moviendo aquellos sin redes sociales al principio
  const sortedMembers = [...MEMBERS].sort((a, b) => {
    if (a.icon_options.length === 0 && b.icon_options.length > 0) {
      return -1;
    }
    if (a.icon_options.length > 0 && b.icon_options.length === 0) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="w-[95%] mx-auto flex flex-col gap-5 h-auto justify-center items-center py-20">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        exit={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", delay: 0.3 }}
        className="w-full flex justify-start items-center gap-5"
      >
        <h4 className="h4 uppercase py-10 text-primary-100 flex justify-start items-center gap-5">
          MIEMBROS{" "}
          <span>
            <GiBiceps className="h4" />
          </span>
        </h4>
        <div className="w-full h-[2px] bg-primary-200"></div>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", delay: 0.3 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sortedMembers.map((item, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            className="w-full text-center h-[450px] rounded-2xl overflow-hidden transition-all duration-300 hover:text-primary-100 hover:shadow-primary-100 hover:shadow-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
          >
            <motion.div
              className="object-cover w-full h-full py-2 bg-cover bg-top bg-no-repeat flex flex-col justify-end items-center"
              style={{ backgroundImage: `url('${item.image}')` }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                onMouseEnter={() => handleIconMouseEnter(index)}
                onMouseLeave={() => handleIconMouseLeave(index)}
                className=" relative pt-5 bottom-[67%] right-3 cursor-pointer w-full duration-200 h-10 flex justify-end items-center rounded-full px-3"
              >
                <motion.div
                  className="pr-5 flex-row w-[80%] justify-end gap-6 flex relative"  // Ajustado el gap
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: dropdownOptions[index] ? 1 : 0, x: dropdownOptions[index] ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Comentar icon_options para evitar errores */}
                  {/* {item.icon_options.map((iconItem, i) => (
                    <motion.div
                      key={i}
                      className="relative cursor-pointer w-10 h-10 hover:scale-110 flex hover:text-primary-100 text-primary-200 justify-center items-center bg-neutral-400 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    >
                      {iconItem.icon}
                    </motion.div>
                  ))} */}
                </motion.div>
           { /*    <motion.div
                  className="w-10 h-10 text-primary-200 flex justify-center items-center bg-neutral-400 rounded-full"
                  whileHover={{ scale: 1.2 }}
                >
                  <IoShareSocial
                    className={`${
                      dropdownOptions[index] ? "text-primary-100" : "text-primary-200"
                    } text-2xl`}
                  />
                </motion.div>*/}
              </div>
              <motion.h5
  className={`${
    dropdown === index
      ? "text-primary-300 scale-110 shadow-xl font-bold"
      : "text-primary-200 font-bold"
  } h5 transition-all duration-200 pb-5 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl `}
>
  {item.name}
</motion.h5>
<motion.h6
  className={`${
    dropdown === index
      ? "text-primary-400 scale-110 text-lg sm:text-xl md:text-2xl shadow-xl font-bold"
      : "text-primary-200 text-lg sm:text-xl md:text-2xl"
  } h6 transition-all duration-200 pb-5 `}
  initial={{ y: -10, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.3 }}
>
  {item.tag}
</motion.h6>

            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Members;
