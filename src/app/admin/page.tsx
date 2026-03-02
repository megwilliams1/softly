"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import { useUserProfiles, type UserProfile } from "@/lib/hooks/useUserProfiles";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

// Subcollections to clear for each user
const SINGLE_DOCS = [
  ["meals", "current"],
  ["checklist", "current"],
  ["mood", "current"],
  ["gratitude", "current"],
];
const COLLECTIONS = [
  "activities",
  "children",
  "reminders",
  "goals",
  "weeklyResets",
];

async function clearUserData(uid: string) {
  // Delete single docs
  const batch = writeBatch(db);
  for (const [col, docId] of SINGLE_DOCS) {
    batch.delete(doc(db, "users", uid, col, docId));
  }
  await batch.commit();

  // Delete collection docs
  for (const col of COLLECTIONS) {
    const snap = await getDocs(collection(db, "users", uid, col));
    if (snap.docs.length > 0) {
      const b = writeBatch(db);
      snap.docs.forEach((d) => b.delete(d.ref));
      await b.commit();
    }
  }
}

function Initials({ name, size = 36 }: { name: string | null; size?: number }) {
  const letters = (name ?? "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "var(--color-sage)",
        color: "var(--color-white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {letters}
    </div>
  );
}

function Avatar({ profile, size = 36 }: { profile: UserProfile; size?: number }) {
  if (profile.photoURL) {
    return (
      <img
        src={profile.photoURL}
        alt={profile.displayName ?? "User"}
        width={size}
        height={size}
        style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  return <Initials name={profile.displayName} size={size} />;
}

function formatDate(ts: UserProfile["createdAt"]): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useRequireAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin(user?.uid ?? null);
  const { profiles, loading: profilesLoading } = useUserProfiles();

  const [confirm, setConfirm] = useState<UserProfile | null>(null);
  const [clearing, setClearing] = useState<string | null>(null);

  // Redirect non-admins once both auth and admin check have resolved
  useEffect(() => {
    if (!authLoading && !adminLoading && !isAdmin) {
      router.replace("/garden");
    }
  }, [authLoading, adminLoading, isAdmin, router]);

  if (authLoading || adminLoading || !user || !isAdmin) return null;

  async function handleClearData(profile: UserProfile) {
    setConfirm(null);
    setClearing(profile.uid);
    try {
      await clearUserData(profile.uid);
    } finally {
      setClearing(null);
    }
  }

  return (
    <>
      <main
        className="min-h-screen px-6 py-10"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1 className="text-4xl mb-1">Admin Panel</h1>
          <p style={{ color: "var(--color-stone)", marginBottom: "8px" }}>
            Signed in as {user.email}
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-stone)",
              marginBottom: "40px",
              padding: "10px 14px",
              backgroundColor: "rgba(232, 160, 160, 0.15)",
              borderRadius: "var(--radius-md)",
              borderLeft: "3px solid var(--color-error)",
            }}
          >
            "Clear data" removes all personal Firestore data for that user but does not delete their
            Auth account.{" "}
            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-moss)", textDecoration: "underline" }}
            >
              Go to Firebase console
            </a>{" "}
            to delete Auth accounts.
          </p>

          {profilesLoading && (
            <p style={{ color: "var(--color-stone)", fontSize: "0.9rem" }}>
              Loading users...
            </p>
          )}

          {!profilesLoading && profiles.length === 0 && (
            <p style={{ color: "var(--color-stone)", fontSize: "0.9rem" }}>
              No user profiles found. Profiles are written when users sign up or sign in after this
              feature is deployed.
            </p>
          )}

          {!profilesLoading && profiles.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {profiles.map((profile) => (
                <div
                  key={profile.uid}
                  className="animate-bloom-up"
                  style={{
                    backgroundColor: "var(--color-white)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-card)",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar profile={profile} size={40} />

                  <div style={{ flex: 1, minWidth: "160px" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        color: "var(--color-soil)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {profile.displayName ?? "—"}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-stone)" }}>
                      {profile.email ?? "—"}
                    </p>
                  </div>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-stone)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Joined {formatDate(profile.createdAt)}
                  </p>

                  <button
                    onClick={() => setConfirm(profile)}
                    disabled={clearing === profile.uid}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "transparent",
                      color: clearing === profile.uid ? "var(--color-stone)" : "var(--color-error)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      border: `1px solid ${clearing === profile.uid ? "rgba(176,168,154,0.4)" : "var(--color-error)"}`,
                      cursor: clearing === profile.uid ? "default" : "pointer",
                      opacity: clearing === profile.uid ? 0.5 : 1,
                      transition: "opacity 0.15s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clearing === profile.uid ? "Clearing..." : "Clear data"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {confirm && (
        <ConfirmDialog
          message={`Clear all Softly data for ${confirm.displayName ?? confirm.email ?? "this user"}? This cannot be undone.`}
          confirmLabel="Yes, clear data"
          onConfirm={() => handleClearData(confirm)}
          onClose={() => setConfirm(null)}
        />
      )}
    </>
  );
}
