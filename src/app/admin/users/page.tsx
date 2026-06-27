import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { provider: { select: { name: true } }, _count: { select: { bookings: true, reviews: true } } },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">{users.length} total users</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Provider</th>
              <th className="p-4 font-medium">Bookings</th>
              <th className="p-4 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {u.image ? (
                      <img src={u.image} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                        {u.name?.charAt(0) || u.email?.charAt(0) || "?"}
                      </div>
                    )}
                    <span className="font-medium text-gray-900">{u.name || "Unnamed"}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{u.email || "—"}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                    u.role === "ADMIN" ? "bg-purple-100 text-purple-700" :
                    u.role === "PROVIDER" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>{u.role.toLowerCase()}</span>
                </td>
                <td className="p-4 text-gray-600">{u.provider?.name || "—"}</td>
                <td className="p-4 text-gray-600">{u._count.bookings}</td>
                <td className="p-4 text-gray-400 text-xs whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
