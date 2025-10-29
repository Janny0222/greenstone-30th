import React, { useState } from "react";
import {
  PlusCircle,
  UsersRound,
  Menu,
  ScanBarcode,
  Gift,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openRaffle, setOpenRaffle] = useState(false);
  const router = useNavigate();

  const handleNavigate = (path) => {
    router(path);
    setMobileMenuOpen(false);
    setOpenRaffle(false);
  };

  const toggleRaffle = () => setOpenRaffle((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white text-green-800 shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo192.png" className="h-10 w-10" alt="Logo" />
            <span className="font-extrabold text-lg">Greenstone @ 30th</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center font-bold gap-2 relative">
            <button
              onClick={() => handleNavigate("/registration")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
            >
              <PlusCircle className="w-5 h-5" />
              Register
            </button>

            {/* RAFFLE DROPDOWN */}
            <div className="relative">
              <button
                onClick={toggleRaffle}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
              >
                <Gift className="w-5 h-5" />
                Raffle
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openRaffle ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openRaffle && (
                <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleNavigate("/raffle/1st")}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 transition"
                  >
                    1st Raffle
                  </button>
                  <button
                    onClick={() => handleNavigate("/raffle/2nd")}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 transition"
                  >
                    2nd Raffle
                  </button>
                  <button
                    onClick={() => handleNavigate("/raffle/3rd")}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 transition"
                  >
                    3rd Raffle
                  </button>
                </div>
              )}
            </div>

            {/* <button
              onClick={() => handleNavigate("/qr-scan")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
            >
              <ScanBarcode className="w-5 h-5" />
              QR Scan
            </button> */}

            <button
              onClick={() => handleNavigate("/attendees")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-white hover:bg-green-700 transition"
            >
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
              onClick={() => handleNavigate("/registration")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700 text-left"
            >
              <PlusCircle className="w-5 h-5" />
              Register
            </button>

            {/* Raffle Dropdown in Mobile */}
            <div>
              <button
                onClick={toggleRaffle}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700 w-full text-left"
              >
                <Gift className="w-5 h-5" />
                Raffle
                <ChevronDown
                  className={`w-4 h-4 ml-auto transition-transform ${
                    openRaffle ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openRaffle && (
                <div className="pl-8 flex flex-col space-y-1">
                  <button
                    onClick={() => handleNavigate("/raffle/1st")}
                    className="px-3 py-1 rounded-lg hover:bg-green-100 text-left"
                  >
                    1st Raffle
                  </button>
                  <button
                    onClick={() => handleNavigate("/raffle/2nd")}
                    className="px-3 py-1 rounded-lg hover:bg-green-100 text-left"
                  >
                    2nd Raffle
                  </button>
                  <button
                    onClick={() => handleNavigate("/raffle/3rd")}
                    className="px-3 py-1 rounded-lg hover:bg-green-100 text-left"
                  >
                    3rd Raffle
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigate("/qr-scan")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700 text-left"
            >
              <ScanBarcode className="w-5 h-5" />
              QR Scan
            </button>

            <button
              onClick={() => handleNavigate("/attendees")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700 text-left"
            >
              <UsersRound className="w-5 h-5" />
              Attendees
            </button>
          </nav>
        )}
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
