"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ParticleField: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; vx: number; vy: number; id: number }>
  >([]);

  useEffect(() => {
    if (!active) return;

    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      id: i,
    }));

    setParticles(newParticles);

    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
          y:
            (particle.y + particle.vy + window.innerHeight) %
            window.innerHeight,
        }))
      );
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((particle, i) =>
          particles.slice(i + 1).map((otherParticle, j) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 100) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke="rgba(34,197,94,0.2)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 - distance / 100 }}
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
};

export default ParticleField;
