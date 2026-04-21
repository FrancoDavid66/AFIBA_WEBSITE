import React from 'react';
import { motion } from 'framer-motion';
import video from '../videos/afibaGif.mp4';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <motion.div
        className="loader-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <video className="loader-video" autoPlay muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      <style jsx>{`
        .loading-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background-color: #000;
          overflow: hidden;
        }
        .loader-container {
          text-align: center;
        }
        .loader-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
