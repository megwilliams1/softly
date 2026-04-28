"use client";

import { useState, useEffect } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useGoals } from "@/lib/hooks/useGoals";
import { useWeeklySummary } from "@/lib/hooks/useWeeklySummary";
import UserAvatar from "@/components/shared/UserAvatar";
import ImagePicker from "@/components/shared/ImagePicker";
import Sprig from "@/components/shared/Sprig";
import { uploadImage, ImageUploadError } from "@/lib/utils/storage";
import { useSeason } from "@/lib/hooks/useSeason";
import PageSkeleton from "@/components/shared/PageSkeleton";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

export default function AccountPage() {
  const { user, loading } = useRequireAuth();
  const { updateUserProfile, resetPassword, signOut } = useAuth();
  const router = useRouter();
  const uid = user?.uid ?? null;
  const { activeGoal } = useGoals(uid);
  const { daysShown } = useWeeklySummary(uid);
  const season = useSeason();
  const seasonLabel = season.charAt(0).toUpperCase() + season.slice(1);

  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordSent, setPasswordSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (user) setDisplayName(user.displayName ?? "");
  }, [user]);

  if (loading) return <PageSkeleton />;
  if (!user) return null;
  const currentUser = user;

  const isGoogleUser = currentUser.providerData.some((p) => p.providerId === "google.com");
  const isDirty = displayName.trim() !== (currentUser.displayName ?? "") || selectedFile !== null;
  const weekNum = Math.ceil(getDayOfYear() / 7);

  async function handleSave() {
    setSaving(true);
    setUploadError(null);
    try {
      let finalPhotoURL: string | null = currentUser.photoURL ?? null;
      if (selectedFile) {
        finalPhotoURL = await uploadImage(selectedFile, `users/${currentUser.uid}/profile`);
      }
      await updateUserProfile(displayName.trim(), finalPhotoURL);
      setSelectedFile(null);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSaving(false);
      if (err instanceof ImageUploadError) {
        setUploadError(err.message);
      } else {
        setUploadError("Failed to update profile. Please try again.");
      }
    }
  }

  async function handlePasswordReset() {
    if (!currentUser.email) return;
    setSendingReset(true);
    await resetPassword(currentUser.email);
    setSendingReset(false);
    setPasswordSent(true);
    setTimeout(() => setPasswordSent(false), 5000);
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "var(--radius-md)",
    border: "1px solid rgba(176,168,154,0.3)",
    backgroundColor: "var(--color-white)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    color: "var(--color-soil)",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    color: "var(--color-stone)",
    fontFamily: "var(--font-body)",
    marginBottom: "6px",
  };

  const cardStyle = {
    backgroundColor: "var(--color-white)",
    borderRadius: "var(--radius-xl)",
    padding: "28px",
    boxShadow: "var(--shadow-card)",
  };

  return (
    <main
      className="min-h-full px-6 py-10"
      style={{ backgroundColor: "var(--color-cream)", position: "relative", overflow: "hidden" }}
    >
      {/* Botanical sprig — bottom right */}
      <Sprig
        color="var(--color-blush-deep)"
        opacity={0.09}
        size={180}
        flip
        style={{ position: "absolute", right: -20, bottom: 40, zIndex: 0 }}
      />

      <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <p
          style={{
            fontSize: "9.5px",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600,
            color: "var(--color-stone)",
            fontFamily: "var(--font-body)",
            marginBottom: "6px",
          }}
        >
          Your corner of softly
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 42px)",
            fontWeight: 400,
            color: "var(--color-soil)",
            marginBottom: "32px",
            lineHeight: 1.2,
          }}
        >
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: avatar card + softly story */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Avatar card */}
            <div style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <UserAvatar photoURL={currentUser.photoURL ?? null} displayName={displayName || null} size={72} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--color-soil)", marginBottom: "2px" }}>
                  {currentUser.displayName ?? "Welcome"}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-pebble)" }}>
                  {currentUser.email}
                </p>
              </div>

              {/* Quick stats */}
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                <div
                  style={{
                    backgroundColor: "var(--color-garden-tile)",
                    borderRadius: "var(--radius-md)",
                    padding: "10px 16px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-garden-accent)", marginBottom: "2px" }}>
                    Your Garden
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-soil)" }}>
                    {seasonLabel} · Week {weekNum}
                  </p>
                </div>

                {activeGoal && (
                  <div
                    style={{
                      backgroundColor: "var(--color-sanctuary-tile)",
                      borderRadius: "var(--radius-md)",
                      padding: "10px 16px",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-sanctuary-accent)", marginBottom: "2px" }}>
                      Plant Goal
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-soil)" }}>
                      🌿 {activeGoal.text} · Day {activeGoal.checkIns.length}/21
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Softly story stats */}
            <div style={cardStyle}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-stone)", marginBottom: "16px" }}>
                Your Softly Story
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Days this week", value: `${daysShown}/7` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-body)", fontSize: "13px" }}>
                    <span style={{ color: "var(--color-stone)" }}>{label}</span>
                    <span style={{ color: "var(--color-soil)", fontWeight: 500, fontFamily: "var(--font-display)", fontSize: "16px" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: edit profile + preferences */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Profile details */}
            <div style={cardStyle}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-stone)", marginBottom: "20px" }}>
                Profile Details
              </p>

              <div style={{ marginBottom: "16px" }}>
                <ImagePicker
                  currentImageUrl={currentUser.photoURL ?? undefined}
                  onFileSelect={(file) => { setSelectedFile(file); setUploadError(null); }}
                  label="Profile photo"
                  disabled={saving}
                />
                {uploadError && (
                  <p style={{ fontSize: "12px", color: "var(--color-error)", marginTop: "4px", fontFamily: "var(--font-body)" }}>
                    {uploadError}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Display name</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" style={inputStyle} />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Email</label>
                <input type="email" value={currentUser.email ?? ""} readOnly style={{ ...inputStyle, backgroundColor: "var(--color-mist)", color: "var(--color-stone)", cursor: "default" }} />
              </div>

              <button
                onClick={handleSave}
                disabled={!isDirty || saving}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  backgroundColor: isDirty && !saving ? "var(--color-soil)" : "rgba(176,168,154,0.3)",
                  color: isDirty && !saving ? "var(--color-white)" : "var(--color-stone)",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: isDirty && !saving ? "pointer" : "default",
                  transition: "background-color 0.2s ease",
                }}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              {saved && (
                <p style={{ textAlign: "center", marginTop: "10px", fontSize: "13px", color: "var(--color-moss)", fontFamily: "var(--font-body)" }}>
                  Profile updated.
                </p>
              )}
            </div>

            {/* Password reset */}
            {!isGoogleUser && (
              <div style={cardStyle}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-stone)", marginBottom: "16px" }}>
                  Password
                </p>
                <p style={{ fontSize: "13px", color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: "16px" }}>
                  We&apos;ll send a reset link to {currentUser.email}.
                </p>
                <button
                  onClick={handlePasswordReset}
                  disabled={sendingReset || passwordSent}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(176,168,154,0.4)",
                    backgroundColor: "transparent",
                    color: "var(--color-soil)",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    cursor: sendingReset || passwordSent ? "default" : "pointer",
                    opacity: sendingReset || passwordSent ? 0.6 : 1,
                  }}
                >
                  {sendingReset ? "Sending..." : passwordSent ? "Email sent!" : "Send reset email"}
                </button>
              </div>
            )}

            {/* Sign out */}
            <div style={{ ...cardStyle, padding: "18px 28px" }}>
              <button
                onClick={async () => { await signOut(); router.replace("/"); }}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--color-stone)",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
