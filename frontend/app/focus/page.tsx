"use client";

import React from "react";
import LottieBackground from "./components/LottieBackground";
import PomodoroTimer from "./components/PomodoroTimer";
import RandomQuote from "./components/RandomQuote";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <LottieBackground />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <RandomQuote />
        <div className="absolute flex flex-col right-4 bottom-4">
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
}
