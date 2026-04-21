import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { SPONSORS_VIDEOS } from '../data/sponsors/index.jsx';

// Estilización con styled-components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const VideoFrame = styled(motion.div)`
  flex: 1 1 calc(33.333% - 20px);
  max-width: 33.333%;
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
  }

  &:hover {
    transform: scale(1.05);
  }

  video,
  img {
    width: 100%;
    height: 100%; // Mantener la altura para que se vea bien
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
  }
`;

const SponsorVideos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SPONSORS_VIDEOS.length);
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  // Verifica si el dispositivo es móvil o tablet
  const isMobileOrTablet = window.innerWidth <= 768; // Cambia 768 por el ancho deseado

  return (
    <Container>
      <TitleContainer
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h4
          className='h4'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Nuestros valiosos sponsors
        </motion.h4>
      </TitleContainer>
      <VideoContainer>
        {SPONSORS_VIDEOS.slice(0, 3).map((sponsor, index) => (
          <VideoFrame
            key={sponsor.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            {isMobileOrTablet ? (
              <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={sponsor.img} // Asegúrate de que `img` esté en el objeto del patrocinador
                  alt={sponsor.title}
                />
              </a>
            ) : (
              <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                <video
                  src={sponsor.videoUrl}
                  muted
                  loop
                  autoPlay
                  controls={false}
                  style={{ borderRadius: '10px' }}
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              </a>
            )}
          </VideoFrame>
        ))}
      </VideoContainer>
    </Container>
  );
};

export default SponsorVideos;
