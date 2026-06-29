import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "My Listings", href: "/dashboard/listings", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { label: "Inquiries", href: "/dashboard/inquiries", icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" },
  { label: "Settings", href: "/dashboard/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");
  if (session.user.role === "ADMIN") redirect("/admin");

  const provider = session.user.role === "PROVIDER"
    ? await prisma.provider.findUnique({ where: { userId: session.user.id } })
    : null;

  const initials = session.user.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : session.user.email?.slice(0, 2).toUpperCase() ?? "?";

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="bg-white rounded-xl border border-natural-clay p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-ink-blue mb-2">Become a Provider</h1>
          <p className="text-on-surface-variant mb-6">You need to register as a provider to access the dashboard.</p>
          <Link href="/providers/register" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90">
            Register as Provider
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-outline-variant flex flex-col z-50">
        <div className="px-6 py-8">
          <Link href="/dashboard" className="text-xl font-bold text-primary">irugle</Link>
          <p className="text-xs text-on-surface-variant opacity-70 mt-0.5">{provider.name}</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-outline-variant flex flex-col gap-1">
          {provider.status === "PENDING" && (
            <div className="px-4 py-2 mb-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
              Awaiting approval
            </div>
          )}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View site
          </Link>
        </div>
      </aside>

      <div className="ml-64 flex-1 min-h-screen">
        <header className="sticky top-0 z-40 bg-white border-b border-outline-variant flex items-center justify-end px-6 h-16 gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-ink-blue leading-none">{session.user.name || provider.name}</p>
              <p className="text-[11px] font-medium text-on-surface-variant opacity-60">{provider.type.replace(/_/g, " ")}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
