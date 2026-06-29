import { prisma } from "@/lib/prisma";
import { createAdminListing } from "../actions";

export default async function AdminNewListingPage() {
  const providers = await prisma.provider.findMany({
    where: { status: "APPROVED" },
    orderBy: { name: "asc" },
    include: { country: { select: { name: true } } },
  });

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Create Listing</h1>
        <p className="text-on-surface-variant mt-1">Add a listing on behalf of a provider</p>
      </div>

      <div className="bg-white border border-natural-clay rounded-xl p-6 lg:p-8">
        <form action={createAdminListing} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-ink-blue mb-1.5">Provider</label>
            <select name="providerId" required className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">Select a provider...</option>
              {providers.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.country.name})</option>
              ))}
            </select>
            {providers.length === 0 && (
              <p className="text-xs text-on-surface-variant mt-1">No approved providers found.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Name</label>
              <input name="name" required className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Type</label>
              <select name="type" required className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option value="ROOM">Room</option>
                <option value="TOUR_PACKAGE">Tour Package</option>
                <option value="ACTIVITY">Activity</option>
                <option value="TABLE">Restaurant Table</option>
                <option value="GUIDE_SERVICE">Guide Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Price</label>
              <input name="price" type="number" step="0.01" required className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant">
            <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
