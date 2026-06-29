import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile } from "./actions";

export default async function SettingsPage() {
  const session = await auth();
  const provider = await prisma.provider.findUnique({
    where: { userId: session!.user.id },
    include: { country: { select: { name: true, code: true } } },
  });
  if (!provider) return null;

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Settings</h1>
        <p className="text-on-surface-variant mt-1">Manage your profile and business information</p>
      </div>

      <div className="bg-white border border-natural-clay rounded-xl p-6 lg:p-8">
        <form action={updateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Business Name</label>
              <input name="name" defaultValue={provider.name} required
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Email</label>
              <input name="email" type="email" defaultValue={provider.email || ""}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Phone</label>
              <input name="phone" defaultValue={provider.phone || ""}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Description</label>
              <textarea name="description" rows={4} defaultValue={provider.description || ""}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Website</label>
              <input name="website" defaultValue={provider.website || ""}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="https://" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Address</label>
              <input name="address" defaultValue={provider.address || ""}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-outline-variant">
            <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
