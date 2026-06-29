import { prisma } from "@/lib/prisma";
import { toggleProductStatus } from "./actions";

export default async function AdminListingsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      provider: { select: { name: true, country: { select: { name: true } } } },
      _count: { select: { bookings: true } },
    },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Listings</h1>
          <p className="text-on-surface-variant mt-1">{products.length} total listings</p>
        </div>
      </div>

      <div className="bg-white border border-natural-clay rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Provider</th>
                <th className="px-6 py-4 font-semibold">Country</th>
                <th className="px-6 py-4 font-semibold text-right">Price</th>
                <th className="px-6 py-4 font-semibold text-center">Bookings</th>
                <th className="px-6 py-4 font-semibold text-center">Active</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-ink-blue">{p.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-surface-container-high text-on-surface-variant capitalize">
                      {p.type.toLowerCase().replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{p.provider.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{p.provider.country.name}</td>
                  <td className="px-6 py-4 text-right font-medium text-ink-blue">
                    {p.currency} {p.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center text-on-surface-variant">{p._count.bookings}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block w-2 h-2 rounded-full ${p.isActive ? "bg-green-500" : "bg-red-400"}`} />
                  </td>
                  <td className="px-6 py-4">
                    <form action={toggleProductStatus}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        p.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}>
                        {p.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-on-surface-variant text-sm">
                    No listings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
