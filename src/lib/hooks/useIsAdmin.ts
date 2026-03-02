"use client";

// Admin UIDs are stored in NEXT_PUBLIC_ADMIN_UIDS as a comma-separated list
// e.g. NEXT_PUBLIC_ADMIN_UIDS=uid1,uid2
const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export function useIsAdmin(uid: string | null) {
  const isAdmin = !!uid && ADMIN_UIDS.includes(uid);
  return { isAdmin, loading: false };
}
