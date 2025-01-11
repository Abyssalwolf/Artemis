"use client";

import React from "react";
import LottieBackground from "./components/LottieBackground";
import PomodoroTimer from "./components/PomodoroTimer";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <LottieBackground />
      <div className="relative z-10 flex flex-col items-center justify-center h-full -right-1/4 -bottom-64">
        <PomodoroTimer />
      </div>
    </div>
  );
}
