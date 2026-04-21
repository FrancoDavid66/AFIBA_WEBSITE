import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la pantalla a la parte superior
  }, [pathname]);

  return children;
};

export default ScrollToTop;
