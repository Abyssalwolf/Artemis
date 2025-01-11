"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timerRef.current!);
          setIsActive(false);
          playSound(mode);
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = (newMode: string) => {
    setIsActive(false);
    setMode(newMode);
    switch (newMode) {
      case "pomodoro":
        setMinutes(25);
        break;
      case "shortBreak":
        setMinutes(5);
        break;
      case "longBreak":
        setMinutes(15);
        break;
    }
    setSeconds(0);
  };

  const playSound = (soundMode: string) => {
    const audio = new Audio(
      soundMode === "pomodoro" ? "/backtowork.mp3" : "/break.mp3"
    );
    audio.play();
  };

  return (
    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg ">
      <div className="space-x-2 mb-4">
        <Button
          onClick={() => resetTimer("pomodoro")}
          variant={mode === "pomodoro" ? "default" : "outline"}
        >
          Pomodoro
        </Button>
        <Button
          onClick={() => resetTimer("shortBreak")}
          variant={mode === "shortBreak" ? "default" : "outline"}
        >
          Short Break
        </Button>
        <Button
          onClick={() => resetTimer("longBreak")}
          variant={mode === "longBreak" ? "default" : "outline"}
        >
          Long Break
        </Button>
      </div>
      <div className="text-6xl font-bold mb-4 text-black px-20">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <Button onClick={toggleTimer} className="w-full">
        {isActive ? "Pause" : "Start"}
      </Button>
    </div>
  );
}
