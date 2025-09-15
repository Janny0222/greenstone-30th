import React, { useEffect, useState } from "react";
import { List, PlusCircle, UsersRound, LogOut, Menu, ScanBarcode } from "lucide-react";
import AddGuestModal from "./modals/AddGuestModal";
import { useGuestListStore } from "../store/guestListStore";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

export default function DashboardComponent() {
  const [activeTab, setActiveTab] = useState("guestList");
  const [addGuestModalOpen, setAddGuestModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { fetchGuests, guests } = useGuestListStore();

  const router = useNavigate();
  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  useEffect(() => {
    socket.on("scan-guest-updated", () => {
      fetchGuests();
    });
    return () => {
      socket.off("scan-guest-updated");
    };
  }, [fetchGuests]);

  useEffect(() => {
    socket.on("new-guest", () => {
      fetchGuests();
    });
    return () => {
      socket.off("new-guest");
    };
  }, [fetchGuests]);


  const handleAddGuest = () => {
      router("/registration");
  } 

  const handleQRScan = () => {
    // Logic for handling QR scan can be implemented here
    router("/qr-scan");
  };
  console.log(guests);
  return (
    <>
      <AddGuestModal
        modalOpen={addGuestModalOpen}
        setModalOpen={setAddGuestModalOpen}
      />

      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <header className="bg-green-800 text-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo192.png" className="h-10 w-10" alt="" />
              <span className="font-extrabold text-lg">Greenstone @ 30th</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setActiveTab("guestList")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  activeTab === "guestList"
                    ? "bg-emerald-400 text-green-900 font-semibold"
                    : "hover:bg-green-700"
                }`}
              >
                <List className="w-5 h-5" />
                Guest List
              </button>

              <button
                onClick={handleAddGuest}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <PlusCircle className="w-5 h-5" />
                Register
              </button>

              <button
                onClick={handleQRScan}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <ScanBarcode className="w-5 h-5" />
                QR Scan
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700 transition">
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
                  setActiveTab("guestList");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  activeTab === "guestList"
                    ? "bg-emerald-400 text-green-900 font-semibold"
                    : "hover:bg-green-700"
                }`}
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
                  handleQRScan();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700"
              >
                <ScanBarcode className="w-5 h-5" />
                QR Scan
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-700">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          )}
        </header>

        {/* Main Content */}
        <main className="container mx-auto flex-1 p-6 lg:p-10">
          {/* Topbar */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-green-900">
              {activeTab === "guestList" ? "Guest List" : "Add Guest"}
            </h1>
            <p className="text-gray-600">
              Manage guests for the 30th Anniversary of Greenstone
            </p>
          </div>

          {/* Guest List */}
          {activeTab === "guestList" && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-y-scroll h-[600px]">
                <table className="w-full table-auto ">
                  <thead className="bg-green-200">
                    <tr className="bg-green-100 text-green-900 text-sm uppercase tracking-wide">
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Company</th>
                      <th className="px-4 py-3 text-left">QR Code</th>
                      <th className="px-4 py-3 text-left">Present</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {guests.length > 0 ? (
                      guests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {guest.name}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {guest.company}
                          </td>
                          <td className="px-4 py-3">
                            <QRCodeGenerator data={guest.name} />
                          </td>
                          <td className="px-4 py-3">
                            {guest.isAttending ? (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                Yes
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 space-x-3">
                            <button className="text-blue-600 hover:underline">
                              Edit
                            </button>
                            <button className="text-red-600 hover:underline">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-gray-500"
                        >
                          No guests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
