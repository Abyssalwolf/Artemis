"use client";

import React from "react";
import Lottie from "react-lottie-player";
import animationData from "./bg.json";

export default function LottieBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        style={{
          position: "absolute",
          top: "10px", // Position it at the top of the page
          left: "10px", // Position it at the left of the page
          transform: "scale(0.8)",
          zIndex: 1,
          backgroundColor: "black", // Change the background color to black
          borderRadius: "12px", // Add border radius for better aesthetics
        }}
      >
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/album/4T9OA5fMle6MuTRnLIDLHu?utm_source=generator"
          width="300" // Adjust the width to fit well in the top-left corner
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.6)",
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}
