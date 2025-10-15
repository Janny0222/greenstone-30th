import React from 'react';
import { Routes, Route } from "react-router-dom";
import './index.css';
import QrScanner from './components/ScannerComponent';
import HomePage from './page/HomePage';
import DashboardPage from './page/DashboardPage';
import AttendeePage from './page/AttendeePage';
import RegistrationPage from './page/RegistrationPage';
import Toastify from './components/ToastComponent';
import RafflePage from './page/RafflePage';

function App() {
  return (
    <>
    <Toastify />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/attendees" element={<AttendeePage />} />
      <Route path="/qr-scan" element={<QrScanner />} />
      <Route path="/raffle" element={<RafflePage />} />
    </Routes>
    </>
  );
}

export default App;
