"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
      >
        Sign in
      </Link>
    );
  }

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : session.user.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <div className="flex items-center gap-3">
      <Link
        href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
        className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold hover:opacity-90 transition-all"
        title={session.user.name ?? session.user.email ?? ""}
      >
        {initials}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}
