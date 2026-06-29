import { prisma } from "@/lib/prisma";

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
    { label: "Total Revenue", value: "$--", icon: "payments", sub: "Lead gen (no payments yet)", color: "bg-primary-fixed/30 text-primary" },
    { label: "Active Listings", value: stats.bookings, icon: "holiday_village", sub: `${stats.providers} providers`, color: "bg-secondary-fixed/50 text-secondary" },
    { label: "Total Bookings", value: stats.bookings, icon: "calendar_month", sub: `${stats.pendingBookings} pending`, color: "bg-tertiary-fixed/50 text-tertiary", trend: "down" },
    { label: "Users", value: stats.users, icon: "group", sub: `${stats.countries} countries`, color: "bg-surface-container-high text-ink-blue", trend: "up" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Dashboard</h2>
          <p className="text-on-surface-variant mt-1">Welcome back. Here&apos;s what&apos;s happening today.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl border border-natural-clay flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div className={`p-2 rounded-lg w-fit ${card.color}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={
                  card.icon === "payments" ? "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" :
                  card.icon === "holiday_village" ? "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" :
                  card.icon === "calendar_month" ? "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" :
                  "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                } />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{card.label}</p>
              <h3 className="text-2xl font-bold text-ink-blue mt-1">{card.value}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">{card.sub}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white border border-natural-clay rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
            <h4 className="font-semibold text-ink-blue">Bookings Overview</h4>
          </div>
          <div className="p-6 relative h-64 flex items-end gap-2">
            <div className="absolute inset-x-6 top-10 bottom-6 flex flex-col justify-between pointer-events-none opacity-10">
              {[1,2,3,4].map((i) => <div key={i} className="w-full border-b border-outline" />)}
            </div>
            {[40,65,55,80,95,70,85,60,45,75,90,30].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-sm transition-all ${i === 6 ? "bg-primary" : "bg-primary/20 hover:bg-primary/40"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-artisanal-cream border border-natural-clay rounded-xl p-6 relative overflow-hidden flex flex-col justify-end min-h-[300px]">
          <div className="relative z-10">
            <span className="inline-block bg-primary px-3 py-1 text-white text-xs font-semibold rounded mb-4">
              {stats.pendingProviders > 0 ? `${stats.pendingProviders} pending approvals` : "All clear"}
            </span>
            <h5 className="text-xl font-bold text-ink-blue mb-2 leading-tight">Provider Approvals</h5>
            <p className="text-sm text-on-surface-variant mb-6">
              {stats.pendingProviders > 0
                ? `${stats.pendingProviders} provider${stats.pendingProviders > 1 ? "s" : ""} waiting for review.`
                : "No pending provider requests."}
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white border border-natural-clay rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
          <h4 className="font-semibold text-ink-blue">Recent Inquiries</h4>
        </div>
        {stats.recentBookings.length === 0 ? (
          <p className="p-6 text-sm text-on-surface-variant">No inquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Guest</th>
                  <th className="px-6 py-4 font-semibold">Provider</th>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm">
                {stats.recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary font-bold text-xs">
                          {b.guestName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-medium text-ink-blue">{b.guestName}</span>
                          <div className="text-xs text-on-surface-variant">{b.guestEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{b.provider.name}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{b.product.name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                        b.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        b.status === "DECLINED" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{b.status.toLowerCase()}</span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-xs whitespace-nowrap">{new Date(b.createdAt).toLocaleDateString()}</td>
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
