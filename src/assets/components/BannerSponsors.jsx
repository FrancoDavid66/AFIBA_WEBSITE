import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { SPONSORS } from '../data/sponsors/index.jsx';

// Estilización con styled-components
const BannerContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 500px; /* Ajusta la altura según sea necesario */
`;

const SponsorImage = styled(motion.a)`
  flex: 1 0 100%;
  display: block;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BannerSponsors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SPONSORS.length);
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <BannerContainer>
      {SPONSORS.map((sponsor, index) => (
        <SponsorImage
          key={sponsor.id}
          href={sponsor.link}  // Cambiado a la URL del patrocinador
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          style={{ display: currentIndex === index ? 'block' : 'none' }}
        >
          <img src={sponsor.image} alt={`Sponsor ${sponsor.id}`} />
        </SponsorImage>
      ))}
    </BannerContainer>
  );
};

export default BannerSponsors;
