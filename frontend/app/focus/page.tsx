"use client";
import React from "react";
import LottieBackground from "./components/LottieBackground";

const HomePage = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <LottieBackground />
      {/* Add your content here */}
      <div style={{ zIndex: 1, position: "relative" }}>
        {/* Your page content */}
      </div>
    </div>
  );
};

export default HomePage;
