import { type User } from "firebase/auth";

const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS ?? "")
  .split(",")
  .map((uid) => uid.trim())
  .filter(Boolean);

export function isAdminUser(user: User | null): boolean {
  if (!user) return false;
  return ADMIN_UIDS.includes(user.uid);
}
