"use client";
import { useEffect, useState } from "react";
import { QrReader } from "@cmdnio/react-qr-reader";
import { getGuestByName } from "../services/guestListServices";

import GridLoaders from "./ui/loader/GridLoader";

const QrScanner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("loading"); // loading | success

  const handleScan = async (data) => {
    if (data) {
      try {
        const guest = await getGuestByName(data);
        setResult(data);
        setModalOpen(true);

        setTimeout(() => {
          if (guest?.name === data) {
          setStatus("success");
          setModalOpen(false)
          } else {
            alert("⚠️ Guest not found in the list.");
          }
        }, 3000);
        
      } catch (error) {
        console.error("Error fetching guest:", error);
        alert("❌ Invalid QR Code.");
        setResult("");
      }
    }
  };

  console.log(result);


  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };
  const handleGoBack = () => {
    
    setModalOpen(false);
    setResult("");
    setStatus("loading");
  };
  return (
    <>
    <GridLoaders modalOpen={modalOpen} setModalOpen={setModalOpen} guestData={result} setStatus={setStatus} status={status}  />
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {status === 'loading' ? ( <> <h2 className="text-xl font-bold mb-4">📷 Scan Guest QR Code</h2>
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
          `No QR code detected yet.`
        )}
      </p>
      </>
      ) : status === "success" ? (
            <>
            <span className="text-green-500 font-bold">Welcome! <span className="text-white text-xl font-bold">{result}</span></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />
              </svg>
              <h1 className="text-xl font-bold text-green-600">
            Verification Successful!
          </h1>
          
          <form onSubmit={handleGoBack}>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4" onClick={handleGoBack}>
            Go Back
            </button>
          </form>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold text-red-600">
                Verification Failed!
              </h1>
              <form onSubmit={handleGoBack}>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4" onClick={handleGoBack}>
                Try Again
                </button>
              </form>
            </>
          )}
    </div>
    </>
  );
};

export default QrScanner;
