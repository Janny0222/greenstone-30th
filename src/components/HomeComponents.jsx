import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard , Leaf } from "lucide-react";

export default function HomeComponents() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 flex items-center justify-center text-center text-white overflow-hidden">
      
      {/* Animated background shapes */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-green-400/20 blur-3xl"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Main content */}
      <motion.div
        className="z-10 max-w-2xl px-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-center mb-4">
          <img src="/logo192.png" className="h-14 w-14" alt="" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to the <span className="text-emerald-300">30th Anniversary</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          of Greenstone
        </h2>
        <p className="text-lg md:text-xl text-emerald-100 mb-8">
          Join us in celebrating three decades of growth, innovation, and sustainability. 🌿
        </p>
        
        <motion.a
          href="/dashboard"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-emerald-400 text-green-900 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-emerald-300 transition-all"
        >
          <LayoutDashboard className="w-5 h-5" />
          Go To Dashboard
        </motion.a>
      </motion.div>
    </div>
  );
}
