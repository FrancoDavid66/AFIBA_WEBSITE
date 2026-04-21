import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";


const Newsletter = () => {
  return (
    <section
      className="w-[90%] m-auto rounded-xl h-auto my-20 bg-gradient-to-r from-blue-500  to-primary-100 flex justify-between items-center max-lg:flex-col gap-10"
      id="contact-us"
    >
      <div className="w-full px-10  text-center  flex flex-col py-10 gap-y-5">
      <h3 className="text-3xl leading-tight lg:max-w-md font-palanquin font-bold text-primary-200 text-center max-lg:text-2xl">
  Regístrate para recibir <span className="">Actualizaciones</span> &
  Boletines
</h3>
<p className="mt-4 text-lg text-white/50 max-lg:text-center">
  Mantente al día con las últimas noticias y eventos. ¡No te pierdas ninguna actualización!
</p>

      </div>

      <div className="lg:max-w-[30%] min-w-[50%] flex justify-center  items-center max-sm:flex-col gap-5 p-2.5 ">
      <form action="" className="flex justify-center   w-full my-auto gap-3 items-center">
            <i>   <MdOutlineEmail /></i>
           
            <input type="email" className="w-full " placeholder="Coloca tu email" required />
            <button type="submit"> <i> <FaArrowRight /> </i> </button>
          </form>
          <div className="flex max-sm:justify-end items-center max-sm:w-full"></div>
      </div>
    </section>
  );
};

export default Newsletter;
