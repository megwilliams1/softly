"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

type Mode = "signin" | "signup";

function getErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(176, 168, 154, 0.4)",
  fontSize: "0.95rem",
  fontFamily: "var(--font-body)",
  color: "var(--color-soil)",
  backgroundColor: "var(--color-white)",
  outline: "none",
  boxSizing: "border-box",
};

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUpWithEmail, signInWithEmail, resetPassword } = useAuth();

  const [mode, setMode] = useState<Mode>("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setResetSent(false);
  }

  async function handleGoogleSignIn() {
    setError("");
    setLoading(true);
    try {
      await signIn();
      router.replace("/garden");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getErrorMessage(code));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setError("Passwords don't match.");
          setLoading(false);
          return;
        }
        await signUpWithEmail(displayName, email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.replace("/garden");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getErrorMessage(code));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Enter your email above, then click Forgot password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setError(getErrorMessage(code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-cream)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3.5rem",
              fontWeight: 500,
              color: "var(--color-soil)",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            softly
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-stone)" }}>
            your weekly sanctuary
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "var(--color-white)",
            borderRadius: "20px",
            boxShadow: "var(--shadow-card)",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Mode toggle */}
          <div
            style={{
              display: "flex",
              backgroundColor: "var(--color-cream)",
              borderRadius: "var(--radius-full)",
              padding: "4px",
            }}
          >
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  backgroundColor: mode === m ? "var(--color-white)" : "transparent",
                  boxShadow: mode === m ? "var(--shadow-soft)" : "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: mode === m ? 500 : 400,
                  color: mode === m ? "var(--color-soil)" : "var(--color-stone)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                style={inputStyle}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />

            {mode === "signup" && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={inputStyle}
              />
            )}

            {/* Forgot password */}
            {mode === "signin" && (
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "0.8rem",
                    color: "var(--color-stone)",
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    padding: 0,
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Error / success messages */}
            {error && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#c0392b",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                {error}
              </p>
            )}
            {resetSent && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-sage)",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                Reset email sent — check your inbox.
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: "var(--color-butter)",
                color: "var(--color-soil)",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 500,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.6 : 1,
                marginTop: "4px",
                transition: "opacity 0.15s ease",
              }}
            >
              {loading
                ? "..."
                : mode === "signin"
                ? "Sign in"
                : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "var(--color-pebble)",
              fontSize: "0.8rem",
              fontFamily: "var(--font-body)",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(176, 168, 154, 0.3)" }} />
            or
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(176, 168, 154, 0.3)" }} />
          </div>

          {/* Google sign-in */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "12px",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              backgroundColor: "var(--color-white)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--color-soil)",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.15s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
