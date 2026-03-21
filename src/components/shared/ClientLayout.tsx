"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/shared/SplashScreen";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("softly:splashed");
    if (!seen) {
      setShowSplash(true);
    }
  }, []);

  function handleSplashComplete() {
    sessionStorage.setItem("softly:splashed", "1");
    setShowSplash(false);
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {children}
    </>
  );
}
