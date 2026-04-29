"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/shared/SplashScreen";
import Sidebar from "@/components/layout/Sidebar";
import BottomTabs from "@/components/layout/BottomTabs";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("softly:splashed");
    if (!seen) {
      setShowSplash(true);
    }
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  function handleSplashComplete() {
    sessionStorage.setItem("softly:splashed", "1");
    setShowSplash(false);
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        style={{
          display: "flex",
          height: "100svh",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Sidebar — desktop only */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto pb-[83px] md:pb-0"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom tabs — mobile only */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomTabs />
        </div>
      </div>
    </>
  );
}
