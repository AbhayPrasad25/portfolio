"use client";
import { useState } from "react";
import Terminal from "../components/Terminal";
import BootSequence from "../components/BootSequence";

export default function Home() {
  const [showBoot, setShowBoot] = useState(true);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {showBoot && <BootSequence onComplete={() => setShowBoot(false)} />}
      {!showBoot && <Terminal />}
    </div>
  );
}
