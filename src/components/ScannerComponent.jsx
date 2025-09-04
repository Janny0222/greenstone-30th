"use client";
import { useState } from "react";
import { QrReader } from "@cmdnio/react-qr-reader";
import { getGuestByName } from "../services/guestListServices";

const QrScanner = () => {
  const [result, setResult] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      try {
        const guest = await getGuestByName(data);
        if (guest?.name === data) {
          alert(`✅ Guest Found: ${guest.name} from ${guest.company}`);
        } else {
          alert("⚠️ Guest not found in the list.");
        }
      } catch (error) {
        console.error("Error fetching guest:", error);
        alert("❌ Invalid QR Code.");
        setResult("");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-bold mb-4">📷 Scan Guest QR Code</h2>

      {/* Camera Preview */}
      <div className="relative w-full max-w-md aspect-square border-4 border-green-500 rounded-xl overflow-hidden shadow-lg">
        <QrReader
          constraints={{ 
            facingMode: {exact: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
             }} // rear camera
          onResult={(result, error) => {
            
            if (!!result) handleScan(result.getText());
            if (!!error) handleError(error);
          }}
          containerStyle={{ width: "100%", height: "100%" }}
          videoStyle={{ objectFit: "cover" }}
        />

        {/* Overlay border lines (scanner feel) */}
        <div className="absolute inset-0 border-4 border-green-400 rounded-lg pointer-events-none" />
      </div>

      {/* Result Section */}
      <p className="mt-6 text-lg">
        {result ? (
          <span className="text-green-400">Scanned: {result}</span>
        ) : (
          "No QR code detected yet."
        )}
      </p>
    </div>
  );
};

export default QrScanner;
