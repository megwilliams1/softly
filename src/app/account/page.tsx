"use client";

import { useState, useEffect } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useAuth } from "@/lib/hooks/useAuth";
import UserAvatar from "@/components/shared/UserAvatar";
import ImagePicker from "@/components/shared/ImagePicker";
import { uploadImage, ImageUploadError } from "@/lib/utils/storage";

export default function AccountPage() {
  const { user, loading } = useRequireAuth();
  const { updateUserProfile, resetPassword } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordSent, setPasswordSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? "");
    }
  }, [user]);

  if (loading || !user) return null;
  const currentUser = user;

  const isGoogleUser = currentUser.providerData.some((p) => p.providerId === "google.com");
  const isDirty =
    displayName.trim() !== (currentUser.displayName ?? "") ||
    selectedFile !== null;

  async function handleSave() {
    setSaving(true);
    setUploadError(null);
    try {
      let finalPhotoURL: string | null = currentUser.photoURL ?? null;

      if (selectedFile) {
        const path = `users/${currentUser.uid}/profile`;
        finalPhotoURL = await uploadImage(selectedFile, path);
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
    padding: "10px 14px",
    borderRadius: "var(--radius-md)",
    border: "1px solid rgba(176, 168, 154, 0.4)",
    backgroundColor: "var(--color-white)",
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    color: "var(--color-soil)",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    color: "var(--color-stone)",
    fontFamily: "var(--font-body)",
    marginBottom: "6px",
  };

  return (
    <main
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.2rem",
            fontWeight: 500,
            color: "var(--color-soil)",
            marginBottom: "4px",
          }}
        >
          Your Account
        </h1>
        <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: "36px" }}>
          A little corner just for you.
        </p>

        {/* Avatar preview */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <UserAvatar
            photoURL={currentUser.photoURL ?? null}
            displayName={displayName || null}
            size={80}
          />
        </div>

        {/* Profile photo upload */}
        <div style={{ marginBottom: "20px" }}>
          <ImagePicker
            currentImageUrl={currentUser.photoURL ?? undefined}
            onFileSelect={(file) => {
              setSelectedFile(file);
              setUploadError(null);
            }}
            label="Profile photo"
            disabled={saving}
          />
          {uploadError && (
            <p style={{ fontSize: "0.78rem", color: "var(--color-error)", marginTop: "4px", fontFamily: "var(--font-body)" }}>
              {uploadError}
            </p>
          )}
        </div>

        {/* Display name */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Display name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
          />
        </div>

        {/* Email (read-only) */}
        <div style={{ marginBottom: "28px" }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={currentUser.email ?? ""}
            readOnly
            style={{ ...inputStyle, backgroundColor: "var(--color-mist)", color: "var(--color-stone)", cursor: "default" }}
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "var(--radius-full)",
            border: "none",
            backgroundColor: isDirty && !saving ? "var(--color-sage)" : "rgba(176, 168, 154, 0.3)",
            color: isDirty && !saving ? "var(--color-white)" : "var(--color-stone)",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 500,
            cursor: isDirty && !saving ? "pointer" : "default",
            transition: "background-color 0.2s ease",
          }}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>

        {saved && (
          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "0.85rem", color: "var(--color-moss)", fontFamily: "var(--font-body)" }}>
            Profile updated.
          </p>
        )}

        {/* Password reset — email users only */}
        {!isGoogleUser && (
          <>
            <div
              style={{
                borderTop: "1px solid rgba(176, 168, 154, 0.3)",
                marginTop: "36px",
                paddingTop: "28px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "var(--color-soil)",
                  marginBottom: "6px",
                }}
              >
                Change password
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: "16px" }}>
                We'll send a reset link to {currentUser.email}.
              </p>
              <button
                onClick={handlePasswordReset}
                disabled={sendingReset || passwordSent}
                style={{
                  padding: "10px 24px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid rgba(176, 168, 154, 0.4)",
                  backgroundColor: "var(--color-white)",
                  color: "var(--color-soil)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  cursor: sendingReset || passwordSent ? "default" : "pointer",
                  opacity: sendingReset || passwordSent ? 0.6 : 1,
                }}
              >
                {sendingReset ? "Sending..." : passwordSent ? "Email sent!" : "Send reset email"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
