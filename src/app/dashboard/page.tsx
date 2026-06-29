import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardOverview() {
  const session = await auth();
  const provider = await prisma.provider.findUnique({
    where: { userId: session!.user.id },
    include: {
      _count: { select: { products: true, bookings: true } },
      products: { take: 5, orderBy: { createdAt: "desc" }, select: { id: true, name: true, price: true, currency: true, isActive: true, _count: { select: { bookings: true } } } },
    },
  });

  const pendingInquiries = await prisma.booking.count({
    where: { providerId: provider!.id, status: "PENDING" },
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Overview</h2>
          <p className="text-on-surface-variant mt-1">Welcome back, {provider!.name}.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-natural-clay flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="p-2 rounded-lg w-fit bg-primary-fixed/30 text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Listings</p>
            <h3 className="text-2xl font-bold text-ink-blue mt-1">{provider!._count.products}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-natural-clay flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="p-2 rounded-lg w-fit bg-secondary-fixed/50 text-secondary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Inquiries</p>
            <h3 className="text-2xl font-bold text-ink-blue mt-1">{provider!._count.bookings}</h3>
            {pendingInquiries > 0 && (
              <span className="inline-block mt-2 text-xs font-semibold bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                {pendingInquiries} pending
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-natural-clay flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="p-2 rounded-lg w-fit bg-surface-container-high text-ink-blue">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</p>
            <h3 className="text-2xl font-bold mt-1 capitalize" style={{ color: provider!.status === "APPROVED" ? "#16a34a" : provider!.status === "PENDING" ? "#ca8a04" : "#dc2626" }}>
              {provider!.status.toLowerCase()}
            </h3>
          </div>
        </div>
      </section>

      <section className="bg-white border border-natural-clay rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
          <h4 className="font-semibold text-ink-blue">Recent Listings</h4>
          <Link href="/dashboard/listings" className="text-xs font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {provider!.products.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-on-surface-variant mb-4">No listings yet.</p>
            <Link href="/dashboard/listings/new" className="inline-block bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">
              Add Your First Listing
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container-low text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-center">Bookings</th>
                  <th className="px-6 py-4 text-center">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {provider!.products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4 font-medium text-ink-blue">{p.name}</td>
                    <td className="px-6 py-4 text-right text-on-surface-variant">{p.currency} {p.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-on-surface-variant">{p._count.bookings}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${p.isActive ? "bg-green-500" : "bg-red-400"}`} />
                    </td>
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
