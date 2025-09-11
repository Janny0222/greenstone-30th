import React from 'react';
import { Routes, Route } from "react-router-dom";
import './index.css';
import QrScanner from './components/ScannerComponent';
import HomePage from './page/HomePage';
import DashboardPage from './page/DashboardPage';
import RegistrationComponent from './components/RegistrationComponent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/registration" element={<RegistrationComponent />} />
      <Route path="/qr-scan" element={<QrScanner />} />
    </Routes>
  );
}

export default App;
