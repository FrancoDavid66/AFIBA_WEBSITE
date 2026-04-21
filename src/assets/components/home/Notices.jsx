import React from "react";
import { IoShareSocial } from "react-icons/io5";
import { NOTICES } from "../../data/home"; // Asegúrate de ajustar la ruta según sea necesario
import { Link } from "react-router-dom";

const Notices = () => {

  const shareLink = (url) => {
    if (navigator.share) {
      navigator.share({
        title: 'Compartir Noticia',
        url: url,
      })
      .then(() => console.log('Compartido exitosamente'))
      .catch((error) => console.log('Error al compartir:', error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('URL copiada al portapapeles');
      }).catch((error) => console.error('Error al copiar URL:', error));
    }
  };

  return (
    <section className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 md:p-8 text-primary-200">
      {NOTICES.map((item, index) => {
        const itemUrl = `#/NoticesViews/${item.id}`;
        
        // Alterna los colores de los botones con los colores solicitados
        const buttonColors = [
          'bg-[#0f4571] hover:bg-white hover:text-[#0f4571]',  // Azul
          'bg-[#f70808] hover:bg-white hover:text-[#f70808]',  // Rojo
          'bg-[#114232] hover:bg-white hover:text-[#114232]'   // Verde
        ];
        const buttonColor = buttonColors[index % buttonColors.length];

        return (
          <div key={item.id} className="relative overflow-hidden rounded-lg shadow-lg h-72">
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 hover:scale-110"
              style={{ backgroundImage: `url('${item.image}')` }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
              <div>
                <p className="text-white text-lg font-bold">{item.title}</p>
                <p className="text-white text-sm mt-2">{item.description}</p>
              </div>

              <div className="flex justify-between items-center">
                {item.pdf ? (
                  <a 
                    href={item.pdf} 
                    download 
                    className={`text-white px-3 py-2 rounded-md transition-colors duration-300 ${buttonColor}`}
                  >
                    Descargar resultados
                  </a>
                ) : (
                  <Link 
                    to={`/NoticesViews/${item.id}`} 
                    className={`text-white px-3 py-2 rounded-md transition-colors duration-300 ${buttonColor}`}
                  >
                    Leer más
                  </Link>
                )}
                <IoShareSocial
                  className="text-3xl text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    shareLink(window.location.origin + itemUrl);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Notices;
