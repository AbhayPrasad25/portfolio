"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSound } from "../hooks/useSound";

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const bootSound = useSound("", 0.3);

  const bootMessages = [
    "Initializing Abhay's portfolio system...",
    "Loading developer profile...",
    "Connecting to skill matrix...",
    "Scanning for awesome projects...",
    "Compiling experience database...",
    "Establishing contact protocols...",
    "Welcome to Abhay's Portfolio!",
  ];

  // Try to enable audio immediately on component mount
  useEffect(() => {
    const tryPlayAudio = async () => {
      try {
        setAudioEnabled(true);
        // Try to play immediately - this might fail due to autoplay policy
        await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay for better UX
        bootSound.play();
      } catch {
        console.log("Autoplay blocked, waiting for user interaction");
        setAudioEnabled(false);
      }
    };

    // Try to play as soon as component mounts
    tryPlayAudio();

    // Set up user interaction handlers as fallback
    const enableAudioOnInteraction = () => {
      if (!audioEnabled) {
        setAudioEnabled(true);
        bootSound.play();
        document.removeEventListener("click", enableAudioOnInteraction);
        document.removeEventListener("keydown", enableAudioOnInteraction);
        document.removeEventListener("touchstart", enableAudioOnInteraction);
      }
    };

    document.addEventListener("click", enableAudioOnInteraction);
    document.addEventListener("keydown", enableAudioOnInteraction);
    document.addEventListener("touchstart", enableAudioOnInteraction);

    return () => {
      document.removeEventListener("click", enableAudioOnInteraction);
      document.removeEventListener("keydown", enableAudioOnInteraction);
      document.removeEventListener("touchstart", enableAudioOnInteraction);
    };
  }, [bootSound, audioEnabled]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return prev;
        }

        // Play step sound for each boot message
        if (audioEnabled) {
          const audioContext = new (window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(
            800 - prev * 50,
            audioContext.currentTime
          );
          oscillator.type = "sine";

          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(
            0.1,
            audioContext.currentTime + 0.05
          );
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.2
          );

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        }

        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete, bootMessages.length, audioEnabled]);

  const handleContainerClick = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      bootSound.play();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-pointer"
      onClick={handleContainerClick}
    >
      <div className="max-w-2xl w-full p-8">
        {/* Sound Toggle */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute top-8 right-8 text-green-400 hover:text-green-300 transition-colors flex items-center gap-2 text-sm"
          onClick={() => setAudioEnabled(!audioEnabled)}
        >
          <span>{audioEnabled ? "🔊" : "🔇"}</span>
          <span>{audioEnabled ? "Sound ON" : "Sound OFF"}</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-green-400 text-6xl font-mono mb-4"
            >
              &gt;_
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-green-400 text-2xl font-mono"
            >
              ABHAY&apos;S PORTFOLIO
            </motion.h1>
          </div>

          <div className="space-y-2 font-mono text-sm">
            {bootMessages.slice(0, currentStep + 1).map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-2 ${
                  idx === currentStep ? "text-green-400" : "text-gray-500"
                }`}
              >
                <span className="text-green-400">{">"}</span>
                <span>{message}</span>
                {idx === currentStep && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-green-400"
                  >
                    _
                  </motion.span>
                )}
                {idx < currentStep && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 ml-auto"
                  >
                    [OK]
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(currentStep / (bootMessages.length - 1)) * 100}%`,
            }}
            className="h-1 bg-green-500 rounded-full mt-8"
          />

          {!audioEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm text-green-400 mt-6 text-center border border-green-400/30 rounded-lg p-3 bg-green-400/5"
            >
              🔊 Click anywhere to enable audio and hear the boot sequence
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BootSequence;
