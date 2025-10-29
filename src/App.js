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
import FirstRaffle from './page/FirstRaffle';
import FirstRaffleQRScanner from './components/FirstRaffleQRScannerComponent';

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
      <Route path="/raffle/1st/qr-scan" element={<FirstRaffleQRScanner />} />
      <Route path="/raffle" element={<RafflePage />} />
      <Route path="/raffle/1st" element={<FirstRaffle />} />
      <Route path="/raffle/2nd" element={<FirstRaffle />} />
      <Route path="/raffle/3rd" element={<FirstRaffle />} />
    </Routes>
    </>
  );
}

export default App;
