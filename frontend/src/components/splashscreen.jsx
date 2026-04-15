import React, { useEffect } from "react";
import { motion } from "framer-motion";

function SplashScreen({ onFinish }) {
  useEffect(() => {
    // Total animation time is now slightly faster and snappier (2.4 seconds)
    const timer = setTimeout(() => onFinish(), 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      // The background smoothly fades to transparent at the end
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.8, duration: 0.6, ease: "easeInOut" }} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-teal-950 overflow-hidden pointer-events-none"
    >
      
      {/* 1. The Sphere (The Implosion Effect) */}
      <motion.div 
        className="absolute w-16 h-16 bg-emerald-500 rounded-full shadow-[0_0_60px_rgba(16,185,129,0.8)]"
        initial={{ scale: 0 }}
        // 0 to 1 (appears) -> holds -> 1.2 (quick breath in) -> 0 (vanishes into nothing)
        animate={{ scale: [0, 1, 1, 1.2, 0] }} 
        transition={{ 
          duration: 1.8, 
          times: [0, 0.2, 0.8, 0.9, 1], 
          ease: "easeInOut" 
        }}
      />

      {/* 2. The Brand Name */}
      <motion.h1 
        className="relative z-10 text-5xl md:text-7xl font-black text-white tracking-tight"
        initial={{ opacity: 0, scale: 0.9 }}
        // Text gets "sucked" in: fades out while shrinking to 50% size
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.5] }}
        transition={{ 
          duration: 1.6, 
          times: [0, 0.2, 0.8, 1], 
          ease: "easeInOut" 
        }}
      >
        HomeSphere<span className="text-teal-950">.</span>
      </motion.h1>

    </motion.div>
  );
}

export default SplashScreen;