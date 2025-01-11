import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25); // Default Pomodoro time (25 minutes)
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(intervalId); // Stop timer once 0 minutes are reached
              return 0;
            }
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId); // Clear interval when timer is not active
    }

    return () => clearInterval(intervalId); // Cleanup interval on component unmount or stop
  }, [isActive, minutes]); // Trigger effect whenever `isActive` or `minutes` changes

  const startStopTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setMinutes(25); // Reset to 25 minutes for Pomodoro
    setSeconds(0); // Reset seconds
    setIsActive(false); // Stop the timer
  };

  return (
    <div style={styles.timerContainer}>
      <div style={styles.timerDisplay}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={startStopTimer}
          style={isActive ? styles.stopButton : styles.startButton}
        >
          {isActive ? "Stop" : "Start"}
        </button>
        <button onClick={resetTimer} style={styles.resetButton}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  timerContainer: {
    position: "fixed", // Fix the position
    bottom: "-30rem", // Position 20px from the bottom
    right: "-90rem", // Position 20px from the right
    textAlign: "center",
    zIndex: 2,
    fontFamily: "'Digital-7', monospace", // Use a digital-like font
  },
  timerDisplay: {
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: "20px 40px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.7)", // Glow effect
    display: "inline-block",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  startButton: {
    backgroundColor: "#4CAF50", // Green for start
    color: "white",
    padding: "10px 20px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  stopButton: {
    backgroundColor: "#f44336", // Red for stop
    color: "white",
    padding: "10px 20px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  resetButton: {
    backgroundColor: "#9E9E9E", // Gray for reset
    color: "white",
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default PomodoroTimer;
