"use client";

import { useState, useEffect } from "react";
import UserDetailsForm from "@/components/UserDetailsForm";
import HyperText from "../components/ui/hyper-text";
import "./styles.css";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <div data-glitch="Loading..." className="glitch">
            Loading...
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-background">
          <div className="relative p-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center">
                Welcome to{" "}
                <span>
                  <HyperText>Artemis</HyperText>
                </span>
              </h1>
              <UserDetailsForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
