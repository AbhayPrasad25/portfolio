"use client";
import React from "react";
import { motion } from "framer-motion";

const HackerEffect: React.FC = () => {
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500 font-mono text-xs opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
          }}
          animate={{
            y: window.innerHeight + 20,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {chars[Math.floor(Math.random() * chars.length)]}
        </motion.div>
      ))}

      {/* Glitch lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute w-full h-px bg-red-500 opacity-20"
          style={{ top: `${20 + i * 30}%` }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.2,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
};

export default HackerEffect;
