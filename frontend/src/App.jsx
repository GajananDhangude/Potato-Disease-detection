import React, { useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx'
import HowItWorks from './components/HowItWorks.jsx';

import Home from './pages/Home.jsx';
import PredictionUI from './components/predictionUI.jsx';
import Footer from './components/Footer.jsx';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(location.hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return null;
};
export default function App() {
  return (
    <div>
      <Router>
        <ScrollToHash />
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/features' element={<HowItWorks/>} />
          <Route path='/predict' element={<PredictionUI/>} />
          
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}
