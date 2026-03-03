"use client";

import { useState, useRef } from "react";
import { ImagePlus, X } from "lucide-react";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

interface Props {
  /** Pre-filled image URL (existing profile photo, OG image, etc.) */
  currentImageUrl?: string;
  /** Called when the user selects or clears a file */
  onFileSelect: (file: File | null) => void;
  label?: string;
  disabled?: boolean;
}

export default function ImagePicker({
  currentImageUrl,
  onFileSelect,
  label = "Image",
  disabled = false,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayUrl = previewUrl ?? currentImageUrl ?? null;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!ACCEPTED.includes(file.type)) {
      alert("Please select a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_SIZE) {
      alert("Image must be under 5 MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect(file);
  }

  function handleClear() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "var(--color-stone)",
          marginBottom: "6px",
          fontFamily: "var(--font-body)",
        }}
      >
        {label} <span style={{ fontWeight: 400 }}>(optional)</span>
      </label>

      {displayUrl ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={displayUrl}
            alt="Preview"
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
              display: "block",
            }}
          />
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              background: "rgba(255,255,255,0.85)",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: disabled ? "default" : "pointer",
              padding: 0,
            }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            border: "1px dashed rgba(176, 168, 154, 0.5)",
            backgroundColor: "transparent",
            color: "var(--color-stone)",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            cursor: disabled ? "default" : "pointer",
            width: "100%",
          }}
        >
          <ImagePlus size={16} />
          Choose an image
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
