"use client";

import { useEffect, useState } from "react";

function detectInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /FBAN|FBAV|FB_IAB|Instagram|LinkedInApp|Twitter|Snapchat/i.test(ua);
}

export default function InAppBrowserGate({ children }: { children: React.ReactNode }) {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    setIsInApp(detectInAppBrowser());
  }, []);

  if (isInApp) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f0e8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "360px" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>🌿</div>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "2rem",
              fontWeight: 500,
              color: "#6b4f3a",
              marginBottom: "12px",
            }}
          >
            softly
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#8a7968",
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            For the best experience — and to sign in with Google — please open Softly in Safari or Chrome.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#a89880" }}>
            Tap the <strong>···</strong> or <strong>⋮</strong> menu and choose <strong>"Open in browser"</strong>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
