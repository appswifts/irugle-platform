import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function InquiriesPage() {
  const session = await auth();
  const provider = await prisma.provider.findUnique({
    where: { userId: session!.user.id },
  });
  if (!provider) return null;

  const bookings = await prisma.booking.findMany({
    where: { providerId: provider.id },
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true } } },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Inquiries</h1>
        <p className="text-on-surface-variant mt-1">{bookings.length} total inquiries</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-natural-clay rounded-xl p-12 text-center">
          <p className="text-on-surface-variant">No inquiries yet. They&apos;ll appear here when travelers reach out.</p>
        </div>
      ) : (
        <div className="bg-white border border-natural-clay rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Listing</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4 text-center">Guests</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary font-bold text-xs">
                          {b.guestName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-ink-blue">{b.guestName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{b.product.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-on-surface-variant">{b.guestEmail}</div>
                      {b.guestPhone && <div className="text-xs text-on-surface-variant opacity-60">{b.guestPhone}</div>}
                    </td>
                    <td className="px-6 py-4 text-center text-on-surface-variant">{b.guests}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                        b.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        b.status === "DECLINED" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{b.status.toLowerCase()}</span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-xs whitespace-nowrap">
                      {new Date(b.createdAt).toLocaleDateString()}
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
