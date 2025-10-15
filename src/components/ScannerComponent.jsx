"use client";
import { useRef, useState } from "react";
import { QrReader } from "@cmdnio/react-qr-reader";
import { getGuestByName } from "../services/guestListServices";

import GridLoaders from "./ui/loader/GridLoader";
import { addAttendee } from "../services/guestAttendeeServices";
import { useErrorMessage } from "../context/ErrorContext";


const QrScanner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle")
  const { setError} = useErrorMessage();
  const isScanning = useRef(true);

  const handleScan = async (data) => {
    if(!data || !isScanning.current) return; 

    isScanning.current = false;
    setStatus("loading");
    setModalOpen(true);
    setResult(data)

      try {
          const guest = await getGuestByName(data);
          if (guest?.name === data) {
            const guestAttendee = await addAttendee({ name: guest.name, group: guest.group, userType: guest.userType });

              if(guestAttendee?.error){
                console.error("Error adding attendee:", guestAttendee.error);
                setStatus("error");
              } else {
                setStatus("success");
              }
          } else {
            setError("Guest not found | Invalid QR Code");
            setStatus("error");
          }
        
      } catch (error) {
        console.error("Error fetching guest:", error);
        setStatus("error");
      } 
    
  };

  console.log(result);


  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };
  const handleGoBack = () => {
    setModalOpen(false);
    setResult("");
    setStatus("idle");
    isScanning.current = true;
  };
  return (
    <>
    <GridLoaders
        modalOpen={modalOpen}
        status={status}
        result={result}
        handleGoBack={handleGoBack}
      />
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {status === 'idle' &&  (
        <> 
        <h2 className="text-xl font-bold mb-4">📷 Scan Guest QR Code</h2>
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
        <p className="mt-6 text-lg">
          {result ? (
            <span className="text-green-400">Scanned: {result}</span>
          ) : (
            `No QR code detected yet.`
          )}
        </p>
      </>
       )} 
    </div>
    </>
  );
};

export default QrScanner;
