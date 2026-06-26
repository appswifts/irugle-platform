import { notFound, redirect } from "next/navigation";
import { getCountryBySlug } from "@/config/countries";
import { prisma } from "@/lib/prisma";
import { inquireAction } from "@/server/actions/inquire.action";

export default async function InquirePage(
  props: { params: Promise<{ country: string; id: string }> }
) {
  const { country, id } = await props.params;
  const config = getCountryBySlug(country);
  if (!config) notFound();

  const provider = await prisma.provider.findUnique({
    where: { id },
    include: { products: { where: { isActive: true } } },
  });
  if (!provider) notFound();

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold">Inquire at {provider.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your inquiry will be sent directly to {provider.name}. They&apos;ll respond to confirm availability.
      </p>

      <form
        action={inquireAction}
        className="mt-8 space-y-5"
      >
        <input type="hidden" name="providerId" value={provider.id} />
        <input type="hidden" name="country" value={country} />

        <div>
          <label htmlFor="guestName" className="block text-sm font-medium">
            Your Name
          </label>
          <input
            id="guestName"
            name="guestName"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm"
          />
        </div>

        <div>
          <label htmlFor="guestEmail" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="guestEmail"
            name="guestEmail"
            type="email"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm"
          />
        </div>

        <div>
          <label htmlFor="guestPhone" className="block text-sm font-medium">
            Phone (optional)
          </label>
          <input
            id="guestPhone"
            name="guestPhone"
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium">
              Check-in
            </label>
            <input
              id="checkIn"
              name="checkIn"
              type="date"
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="checkOut" className="block text-sm font-medium">
              Check-out
            </label>
            <input
              id="checkOut"
              name="checkOut"
              type="date"
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium">
            Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            defaultValue={1}
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm"
          >
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium">
            Message (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Any special requests or questions..."
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
        >
          Send Inquiry
        </button>
      </form>
    </main>
  );
}
