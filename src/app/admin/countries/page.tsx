import { prisma } from "@/lib/prisma";
import { toggleCountry, addCountry } from "./actions";

export default async function AdminCountriesPage() {
  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });
  const totalProviders = await prisma.provider.groupBy({ by: ["countryId"], _count: true });

  const providerCounts = Object.fromEntries(totalProviders.map((c) => [c.countryId, c._count]));

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Countries</h1>
          <p className="text-sm text-gray-500 mt-1">{countries.length} countries configured</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Add Country</h2>
        <form action={addCountry} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Code</label>
            <input name="code" placeholder="e.g. KE" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
            <input name="name" placeholder="e.g. Kenya" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
            <input name="slug" placeholder="e.g. kenya" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
          </div>
          <div className="w-24">
            <label className="block text-xs font-medium text-gray-500 mb-1">Currency</label>
            <input name="currency" placeholder="KES" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-container transition-colors">
            Add Country
          </button>
        </form>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-4 font-medium">Code</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Currency</th>
              <th className="p-4 font-medium">Providers</th>
              <th className="p-4 font-medium">Active</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900">{c.code}</td>
                <td className="p-4 text-gray-600">{c.name}</td>
                <td className="p-4 text-gray-400 text-xs">{c.slug}</td>
                <td className="p-4 text-gray-600">{c.currency}</td>
                <td className="p-4 text-gray-600">{providerCounts[c.id] || 0}</td>
                <td className="p-4">
                  <span className={`inline-block w-2 h-2 rounded-full ${c.isActive ? "bg-green-500" : "bg-red-400"}`} />
                </td>
                <td className="p-4">
                  <form action={toggleCountry}>
                    <input type="hidden" name="id" value={c.id} />
                    <button className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      c.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}>
                      {c.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
