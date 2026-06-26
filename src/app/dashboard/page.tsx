import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const userId = (session.user as any).id;
  const provider = await prisma.provider.findUnique({ where: { userId } });

  if (!provider) {
    return (
      <main className="mx-auto max-w-lg px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-4 text-muted-foreground">
          You don&apos;t have a property listed yet.
        </p>
        <Link
          href="/providers/register"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
        >
          List Your Property
        </Link>
      </main>
    );
  }

  const bookings = await prisma.booking.findMany({
    where: { providerId: provider.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{provider.name}</h1>
          <p className="text-sm text-muted-foreground">
            Status: {provider.status.toLowerCase()}
          </p>
        </div>
        <Link
          href="/dashboard/listings"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
        >
          Manage Listings
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Recent Inquiries ({bookings.length})</h2>
        {bookings.length === 0 ? (
          <p className="mt-4 text-muted-foreground">No inquiries yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{b.guestName}</h3>
                    <p className="text-sm text-muted-foreground">{b.guestEmail}</p>
                    {b.guestPhone && (
                      <p className="text-sm text-muted-foreground">{b.guestPhone}</p>
                    )}
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                    {b.status.toLowerCase()}
                  </span>
                </div>
                {b.checkIn && b.checkOut && (
                  <p className="mt-2 text-sm">
                    {new Date(b.checkIn).toLocaleDateString()} —{" "}
                    {new Date(b.checkOut).toLocaleDateString()} · {b.guests} guests
                  </p>
                )}
                {b.notes && (
                  <p className="mt-2 text-sm text-muted-foreground">&ldquo;{b.notes}&rdquo;</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
