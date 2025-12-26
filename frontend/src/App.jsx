import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx'
import HowItWorks from './components/HowItWorks.jsx';

import Home from './pages/Home.jsx';
import PredictionUI from './components/predictionUI.jsx';
export default function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/features' element={<HowItWorks/>} />
          <Route path='/predict' element={<PredictionUI/>} />
          
        </Routes>

        
      </Router>
    </div>
  )
}
