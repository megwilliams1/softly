"use client";

interface Props {
  photoURL: string | null;
  displayName: string | null;
  size?: number;
}

function getInitials(name: string | null): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserAvatar({ photoURL, displayName, size = 32 }: Props) {
  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={displayName ?? "User"}
        width={size}
        height={size}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          display: "block",
        }}
      />
    );
  }

  return (
    <div
      aria-label={displayName ?? "User"}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "var(--color-sage)",
        color: "var(--color-white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.4,
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {getInitials(displayName)}
    </div>
  );
}
