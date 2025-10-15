import React, { useState } from "react";
import { List, PlusCircle, UsersRound, Menu, ScanBarcode, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useNavigate();
    const handleAddGuest = () => {
        router("/registration");
    }
    const handleGuestList = () => {
        router("/dashboard");
    }  
    const handleQRScan = () => {
        // Logic for handling QR scan can be implemented here
        router("/qr-scan");
    };

    const handleRaffle = () => {
        // Logic for handling QR scan can be implemented here
        router("/raffle");
    };
    const handleAttendees = () => {
         router("/attendees");
    } 
    return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
        <header className="bg-white text-green-800 shadow-md">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo192.png" className="h-10 w-10" alt="" />
              <span className="font-extrabold text-lg">Greenstone @ 30th</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center font-bold gap-2">
              <button
                onClick={handleGuestList}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
              >
                <List className="w-5 h-5" />
                Guest List
              </button>

              <button
                onClick={handleAddGuest}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
              >
                <PlusCircle className="w-5 h-5" />
                Register
              </button>

              <button
                onClick={handleRaffle}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
              >
                <Gift className="w-5 h-5" />
                Raffle
              </button>

              <button
                onClick={handleQRScan}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
              >
                <ScanBarcode className="w-5 h-5" />
                QR Scan
              </button>

              <button onClick={handleAttendees} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition">
                <UsersRound className="w-5 h-5" />
                Attendees
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center p-2 rounded-lg hover:bg-green-700 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Nav Dropdown */}
          {mobileMenuOpen && (
            <nav className="flex flex-col space-y-2 px-4 pb-4 md:hidden">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700"
              >
                <List className="w-5 h-5" />
                Guest List
              </button>

              <button
                onClick={() => {
                  handleAddGuest();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700"
              >
                <PlusCircle className="w-5 h-5" />
                Add Guest
              </button>
              <button
                onClick={() => {
                  handleRaffle();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
              >
                <Gift className="w-5 h-5" />
                Raffle
              </button>
              <button
                onClick={() => {
                  handleQRScan();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700"
              >
                <ScanBarcode className="w-5 h-5" />
                QR Scan
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700">
                <UsersRound className="w-5 h-5" />
                Attendees
              </button>
            </nav>
          )}
        </header>
        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout