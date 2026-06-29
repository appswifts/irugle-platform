"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function MobileNavInner() {
  const [mounted, setMounted] = React.useState(false);
  const { data: session } = useSession();
  React.useEffect(() => { setMounted(true); }, []);
  const isSignedIn = mounted && !!session?.user;

  const initials = isSignedIn && session.user.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : null;

  const items = [
    { label: "Explore", icon: "search", active: true, href: "/" },
    { label: "Favorites", icon: "heart", href: "/" },
    { label: isSignedIn ? (initials ?? "?") : "Sign In", icon: isSignedIn ? "avatar" : "user", href: isSignedIn ? (session.user.role === "ADMIN" ? "/admin" : "/dashboard") : "/auth/signin" },
    { label: "Menu", icon: "menu", href: "/" },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant z-50 flex items-center justify-around h-16">
      {items.map((item) => (
        <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-0.5 ${item.active ? "text-primary" : "text-on-surface-variant"}`}>
          {item.icon === "search" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
          {item.icon === "heart" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
          {item.icon === "user" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
          {item.icon === "avatar" && (
            <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[9px] font-bold">
              {initials}
            </div>
          )}
          {item.icon === "menu" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
          <span className="text-[10px] leading-none">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
