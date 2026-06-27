import { prisma } from "@/lib/prisma";
import { approveProvider, rejectProvider } from "./actions";

export default async function AdminProvidersPage() {
  const providers = await prisma.provider.findMany({
    orderBy: { createdAt: "desc" },
    include: { country: { select: { name: true } }, user: { select: { name: true, email: true } }, _count: { select: { products: true, bookings: true } } },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Providers</h1>
          <p className="text-sm text-gray-500 mt-1">{providers.length} total providers</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-4 font-medium">Provider</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Country</th>
              <th className="p-4 font-medium">Owner</th>
              <th className="p-4 font-medium">Products</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.email || "—"}</div>
                </td>
                <td className="p-4 text-gray-600 capitalize">{p.type.toLowerCase().replace(/_/g, " ")}</td>
                <td className="p-4 text-gray-600">{p.country.name}</td>
                <td className="p-4">
                  {p.user ? (
                    <div>
                      <div className="text-gray-900">{p.user.name}</div>
                      <div className="text-xs text-gray-400">{p.user.email}</div>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="p-4 text-gray-600">{p._count.products}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                    p.status === "APPROVED" ? "bg-green-100 text-green-700" :
                    p.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                    p.status === "REJECTED" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>{p.status.toLowerCase()}</span>
                </td>
                <td className="p-4">
                  {p.status === "PENDING" && (
                    <div className="flex items-center gap-2">
                      <form action={approveProvider}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="px-3 py-1.5 text-xs font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Approve
                        </button>
                      </form>
                      <form action={rejectProvider}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                          Reject
                        </button>
                      </form>
                    </div>
                  )}
                  {p.status !== "PENDING" && (
                    <span className="text-xs text-gray-400 italic">Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
