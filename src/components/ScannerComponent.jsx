import { useRef, useState, useCallback } from "react";
import { QrReader } from "@cmdnio/react-qr-reader";
import { getGuestByName } from "../services/guestListServices";
import GridLoaders from "./ui/loader/GridLoader";
import { addAttendee } from "../services/guestAttendeeServices";
import { useErrorMessage } from "../context/ErrorContext";
import axios from "axios";

const QrScanner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle");
  const { setErrorMessage } = useErrorMessage();
  const isScanning = useRef(true);
  const lastScanned = useRef("");

  const handleScan = useCallback(
    async (data) => {
      if (!data || !isScanning.current) return;

      const trimmedData = data.trim();
      if (trimmedData === lastScanned.current) return; // ❌ prevent duplicate scans of the same QR

      isScanning.current = false;
      lastScanned.current = trimmedData;
      setStatus("loading");
      setModalOpen(true);
      setResult(trimmedData);

      try {
        const guest = await getGuestByName(trimmedData);
        if (guest?.name === trimmedData) {
          const guestAttendee = await addAttendee({
            name: guest.name,
            department: guest.department,
            group: guest.group,
            userType: guest.userType,
          });

          if (guestAttendee?.error) {
            console.error("Error adding attendee:", guestAttendee.error);
            setErrorMessage(guestAttendee.error || "Failed to add attendee");
            setStatus("error");
          } else {
            setStatus("success");
          }
        } else {
          setErrorMessage(guest?.message || "Invalid QR Code");
          setStatus("error");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
        } else {
          setErrorMessage("Unexpected error occurred.");
        }
        setStatus("error");
      }
    },
    [setErrorMessage, setStatus]
  );

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  const handleGoBack = () => {
    setModalOpen(false);
    setResult("");
    setStatus("idle");
    lastScanned.current = "";

    setTimeout(() => {
      isScanning.current = true;
    }, 1000);
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
        {status === "idle" && (
          <>
            <h2 className="text-xl font-bold mb-4">📷 Scan Guest QR Code</h2>
            <div className="relative w-full max-w-md aspect-square border-4 border-green-500 rounded-xl overflow-hidden shadow-lg">
              <QrReader
                constraints={{
                  facingMode: { exact: "environment" },
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                }}
                onResult={(result, error) => {
                  if (result) handleScan(result.getText());
                  if (error) handleError(error);
                }}
                containerStyle={{ width: "100%", height: "100%" }}
                videoStyle={{ objectFit: "cover" }}
              />
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
