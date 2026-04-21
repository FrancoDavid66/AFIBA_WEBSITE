import React, { useState } from 'react';
import { TOURNAMENTS_2024_IMAGES } from '../../data/tournaments/index.jsx'; // Ajusta la ruta según tu estructura de proyecto
import { FaEye } from 'react-icons/fa'; // Importa el ícono de react-icons
import { motion } from 'framer-motion'; // Importa motion de framer-motion

const Tournaments = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (images) => {
    setCurrentImages(images);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImages([]);
    setSelectedImage(null);
  };

  const openImageDetail = (image) => {
    setSelectedImage(image);
  };

  const closeImageDetail = () => {
    setSelectedImage(null);
  };

  // Animaciones para el modal
  const modalVariants = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: '100vh', transition: { duration: 0.5 } }
  };

  // Animaciones para las tarjetas
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  // Animaciones para las imágenes dentro del modal
  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <section className="w-full flex flex-col justify-center h-auto items-center m-auto gap-y-10">
      <div className="w-[90%] h-auto py-20 flex flex-col justify-center items-center gap-y-7">
        <div className="w-full m-auto text-center">
          <h2 className="h2">GALERIA DE TORNEOS AFIBA</h2>
        </div>

        <div className="py-20 w-full mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-5 m-auto">
          {TOURNAMENTS_2024_IMAGES.map((tournament) => (
            <motion.div
              key={tournament.id}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openModal(tournament.images)}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <img src={tournament.src} alt={tournament.title} className="w-full h-96 object-cover rounded-t-lg" />
              <div className="p-4 bg-gray-100">
                <h3 className="text-lg font-semibold text-center text-primary-100">{tournament.title}</h3>
              </div>
              <div className="absolute top-2 right-2 flex items-center justify-center bg-primary-400 p-2 rounded-full shadow-lg">
                <FaEye className="text-xl text-gray-700 cursor-pointer" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {modalIsOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full"
            variants={modalVariants}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              &times;
            </button>
            <div className="h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => openImageDetail(image)}
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <img src={image} alt={`Tournament Image ${index}`} className="w-full h-auto object-cover rounded-lg" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full"
            variants={modalVariants}
          >
            <button
              onClick={closeImageDetail}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <motion.img
                src={selectedImage}
                alt="Selected Image"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                variants={imageVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Tournaments;
