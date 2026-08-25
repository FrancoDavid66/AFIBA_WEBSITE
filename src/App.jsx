import React, { useEffect, lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./assets/components/LoadingScreen";
import Results from "./assets/components/Results";
import SponsorVideos from "./assets/components/SponsorVideos";
import InscriptionFAB from "./assets/components/InscriptionFAB";
import InAppBrowserNotice from "./assets/components/InAppBrowserNotice";

// Importa componentes de forma diferida
const NavigationButtons = lazy(() =>
  import("./assets/components/NavigationButtons")
);
const EventInfo = lazy(() => import("./assets/components/EventInfo"));
const Header = lazy(() => import("./assets/components/header/Header"));
const Home = lazy(() => import("./assets/pages/home"));
const NoticesViews = lazy(() =>
  import("./assets/components/views/home/NoticesViews")
);
const Footer = lazy(() => import("./assets/components/footer/Footer"));
const RegistrationForm = lazy(() => import("./assets/pages/RegistrationForm"));
const About = lazy(() => import("./assets/pages/about"));
const Calendar = lazy(() => import("./assets/pages/calendar/Calendar"));
const Categorias = lazy(() => import("./assets/pages/categorias"));
const Tournaments = lazy(() => import("./assets/pages/tournaments"));

import ScrollToTop from "./assets/utils/ScrollToTop";

// Definición de variantes y transición
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper component={<Home />} />} />
        <Route path="/About" element={<PageWrapper component={<About />} />} />

        <Route
          path="/Calendar"
          element={<PageWrapper component={<Calendar />} />}
        />

        {/* Modalidades y reglamentos unificados */}
        <Route
          path="/modalidades"
          element={<PageWrapper component={<Categorias />} />}
        />
        {/* Compatibilidad con rutas anteriores */}
        <Route path="/modalidad/:id" element={<Navigate to="/modalidades" replace />} />
        <Route path="/reglaments" element={<Navigate to="/modalidades" replace />} />
        <Route path="/Rules" element={<Navigate to="/modalidades" replace />} />

        <Route
          path="/NoticesViews/:id"
          element={<PageWrapper component={<NoticesViews />} />}
        />
        <Route
          path="/Results"
          element={<PageWrapper component={<Results />} />}
        />
        <Route
          path="/RegistrationForm"
          element={<PageWrapper component={<RegistrationForm />} />}
        />
        <Route
          path="/torneos"
          element={<PageWrapper component={<Tournaments />} />}
        />
        <Route
          path="/navigationButtons"
          element={<PageWrapper component={<NavigationButtons />} />}
        />
        <Route
          path="/eventInfo"
          element={<PageWrapper component={<EventInfo />} />}
        />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ component }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
  >
    {component}
  </motion.div>
);

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="App">
        <HashRouter>
          <ScrollToTop>
            <Header />
            <AnimatedRoutes />
            <SponsorVideos />
            <Footer />

            {/* Botón flotante de inscripción */}
            <InscriptionFAB />

            {/* Aviso para abrir en navegador rea l si se entra desde Instagram/etc. */}
            <InAppBrowserNotice />
          </ScrollToTop>
        </HashRouter>
      </div>
    </Suspense>
  );
}

export default App;