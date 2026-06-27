import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  const [users, providers, bookings, countries] = await Promise.all([
    prisma.user.count(),
    prisma.provider.count(),
    prisma.booking.count(),
    prisma.country.count(),
  ]);
  const [pendingProviders, recentBookings, pendingBookings] = await Promise.all([
    prisma.provider.count({ where: { status: "PENDING" } }),
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { provider: { select: { name: true } }, product: { select: { name: true } } } }),
    prisma.booking.count({ where: { status: "PENDING" } }),
  ]);
  return { users, providers, bookings, countries, pendingProviders, recentBookings, pendingBookings };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Total Users", value: stats.users, href: "/admin/users", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Providers", value: stats.providers, href: "/admin/providers", color: "bg-green-50 text-green-700 border-green-200", badge: stats.pendingProviders > 0 ? `${stats.pendingProviders} pending` : undefined },
    { label: "Bookings", value: stats.bookings, href: "#", color: "bg-purple-50 text-purple-700 border-purple-200", badge: stats.pendingBookings > 0 ? `${stats.pendingBookings} new` : undefined },
    { label: "Countries", value: stats.countries, href: "/admin/countries", color: "bg-orange-50 text-orange-700 border-orange-200" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-sm text-gray-500 mt-1">Overview of your platform</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className={`rounded-xl border p-5 ${card.color} hover:shadow-md transition-shadow`}>
            <p className="text-sm font-medium opacity-80">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
            {card.badge && <span className="inline-block mt-2 text-xs font-semibold bg-white/60 px-2 py-0.5 rounded-full">{card.badge}</span>}
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
        {stats.recentBookings.length === 0 ? (
          <p className="mt-4 text-sm text-gray-400">No inquiries yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Guest</th>
                  <th className="pb-3 font-medium">Provider</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((b) => (
                  <tr key={b.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="font-medium text-gray-900">{b.guestName}</div>
                      <div className="text-gray-400 text-xs">{b.guestEmail}</div>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{b.provider.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{b.product.name}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        b.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                        b.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        b.status === "DECLINED" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{b.status.toLowerCase()}</span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs whitespace-nowrap">{new Date(b.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
