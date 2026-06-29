import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { toggleListingStatus } from "./actions";

export default async function MyListingsPage() {
  const session = await auth();
  const provider = await prisma.provider.findUnique({
    where: { userId: session!.user.id },
    include: {
      products: { orderBy: { createdAt: "desc" }, include: { _count: { select: { bookings: true } } } },
    },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">My Listings</h1>
          <p className="text-on-surface-variant mt-1">{provider!.products.length} total listings</p>
        </div>
        <Link
          href="/dashboard/listings/new"
          className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Listing
        </Link>
      </div>

      {provider!.products.length === 0 ? (
        <div className="bg-white border border-natural-clay rounded-xl p-12 text-center">
          <p className="text-on-surface-variant mb-4">You haven&apos;t added any listings yet.</p>
          <Link href="/dashboard/listings/new" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90">
            Add Your First Listing
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-natural-clay rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-center">Bookings</th>
                  <th className="px-6 py-4 text-center">Active</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm">
                {provider!.products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4 font-medium text-ink-blue">{p.name}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-surface-container-high text-on-surface-variant capitalize">
                        {p.type.toLowerCase().replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-ink-blue">{p.currency} {p.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-on-surface-variant">{p._count?.bookings ?? 0}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${p.isActive ? "bg-green-500" : "bg-red-400"}`} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/listings/${p.id}`}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-surface-container transition-colors"
                        >
                          Edit
                        </Link>
                        <form action={toggleListingStatus}>
                          <input type="hidden" name="id" value={p.id} />
                          <button className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                            p.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"
                          }`}>
                            {p.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
