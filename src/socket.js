// socket.js
import { io } from "socket.io-client";

export const socket = io("https://guest-attendance-app-8yx3.onrender.com", {
  path: "/socket.io",
  transports: ["websocket"], 
  rejectUnauthorized: false // para i-bypass self-signed cert
});

socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});

socket.on("disconnect", () => {
  console.log("🔌 Disconnected from server");
});

