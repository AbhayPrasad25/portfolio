"use client";
import { useEffect, useRef } from "react";

interface SoundEffect {
  play: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
}

export const useSound = (
  soundFile: string,
  volume: number = 0.5
): SoundEffect => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Try to create AudioContext immediately
    try {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      console.log("AudioContext creation deferred");
    }

    // Also create a dummy audio element for fallback
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, [soundFile, volume]);

  const play = () => {
    try {
      // Use existing AudioContext or create new one
      let audioContext = audioContextRef.current;
      if (!audioContext || audioContext.state === "closed") {
        audioContext = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
        audioContextRef.current = audioContext;
      }

      const playSound = () => {
        if (!audioContext) return;

        // Create pleasant terminal startup sound
        const createTone = (
          freq: number,
          startTime: number,
          duration: number,
          type: OscillatorType = "sine"
        ) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();

          osc.connect(gain);
          gain.connect(audioContext.destination);

          osc.frequency.setValueAtTime(freq, startTime);
          osc.type = type;

          // Smooth envelope
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(volume * 0.3, startTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

          osc.start(startTime);
          osc.stop(startTime + duration);
        };

        const now = audioContext.currentTime;

        // Pleasant startup sequence - like a gentle computer wake-up
        createTone(523.25, now, 0.4); // C5 - initial tone
        createTone(659.25, now + 0.2, 0.4); // E5 - harmony
        createTone(783.99, now + 0.4, 0.6); // G5 - final pleasant tone

        // Add a subtle low harmonic for richness
        createTone(261.63, now, 0.8, "triangle"); // C4 - bass note
      };

      // Resume context if suspended (required by browser autoplay policy)
      if (audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          playSound();
        });
      } else {
        playSound();
      }
    } catch (error) {
      console.log("Audio not supported or blocked:", error);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  return { play, stop, setVolume };
};

export const useTypingSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      console.log("AudioContext creation deferred");
    }

    return () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playTypingSound = () => {
    if (audioContextRef.current) {
      try {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        // Subtle mechanical keyboard-like sound
        oscillator.frequency.setValueAtTime(
          800 + Math.random() * 400, // Random frequency for variation
          audioContextRef.current.currentTime
        );
        oscillator.type = "triangle"; // Softer than square wave

        gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.05, // Quieter volume
          audioContextRef.current.currentTime + 0.005
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContextRef.current.currentTime + 0.03
        );

        oscillator.start(audioContextRef.current.currentTime);
        oscillator.stop(audioContextRef.current.currentTime + 0.03);
      } catch (error) {
        console.log("Typing sound failed:", error);
      }
    }
  };

  const playCommandSound = () => {
    if (audioContextRef.current) {
      try {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        // Pleasant command confirmation sound
        oscillator.frequency.setValueAtTime(
          523.25, // C5 note
          audioContextRef.current.currentTime
        );
        oscillator.frequency.linearRampToValueAtTime(
          659.25, // E5 note - creates a pleasant upward melody
          audioContextRef.current.currentTime + 0.08
        );
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.1, // Softer volume
          audioContextRef.current.currentTime + 0.02
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContextRef.current.currentTime + 0.12
        );

        oscillator.start(audioContextRef.current.currentTime);
        oscillator.stop(audioContextRef.current.currentTime + 0.12);
      } catch (error) {
        console.log("Command sound failed:", error);
      }
    }
  };

  const playErrorSound = () => {
    if (audioContextRef.current) {
      try {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        // Error sound - descending tone
        oscillator.frequency.setValueAtTime(
          400,
          audioContextRef.current.currentTime
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          200,
          audioContextRef.current.currentTime + 0.3
        );
        oscillator.type = "sawtooth";

        gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.15,
          audioContextRef.current.currentTime + 0.05
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContextRef.current.currentTime + 0.35
        );

        oscillator.start(audioContextRef.current.currentTime);
        oscillator.stop(audioContextRef.current.currentTime + 0.35);
      } catch (error) {
        console.log("Error sound failed:", error);
      }
    }
  };

  return { playTypingSound, playCommandSound, playErrorSound };
};
