// components/LottieBackground.js
import React from "react";
import Lottie from "react-lottie-player";
import animationData from "./bg.json"; // Adjust the path
import PomodoroTimer from "./PomodoroTimer";

const LottieBackground = () => {
  return (
    <div
      style={{
        position: "fixed", // Use fixed positioning to keep it in place
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Make sure it's in the background
      }}
    >
      <Lottie
        loop
        animationData={animationData}
        play
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.6)", // Zoom in the animation (increase scale value as needed)
          transformOrigin: "center center", // Ensure the animation covers the full screen
        }}
      />

      {/* Spotify Player Embed */}
      <div
        style={{
          position: "absolute",
          top: "30px", // Position it at the bottom of the page
          left: "0%",
          transform: "translateX(-50%)",
          transform: "scale(0.8)",
          zIndex: 1, // Make sure it's above the Lottie animation
        }}
      >
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/album/4T9OA5fMle6MuTRnLIDLHu?utm_source=generator"
          width="90%"
          height="352"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <div
          style={{
            // Position it at the right side of the page
            zIndex: 2, // Ensure Pomodoro Timer is above the Lottie animation
          }}
        >
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
};

export default LottieBackground;
