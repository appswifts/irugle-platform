import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";
import { prisma } from "@/lib/prisma";
import { HotelMap } from "@/components/map/hotel-map";

export default async function HotelDetailPage(
  props: { params: Promise<{ country: string; slug: string }> }
) {
  const { country, slug } = await props.params;
  const config = getCountryBySlug(country);
  if (!config) notFound();

  const hotel = await prisma.provider.findFirst({
    where: {
      country: { code: config.code },
      slug,
      type: { in: ["HOTEL", "LODGE", "GUEST_HOUSE", "APARTMENT"] },
    },
    include: {
      city: true,
      products: { where: { isActive: true } },
      _count: { select: { reviews: true } },
    },
  });
  if (!hotel) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Link href={`/${country}/hotels`} className="text-sm text-on-surface-variant hover:text-primary transition-colors">
        &larr; Back to hotels
      </Link>

      <div className="mt-6">
        <div className="mb-6 h-64 rounded-2xl bg-surface-container-high sm:h-96" />

        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h1 className="text-3xl font-bold text-ink-blue tracking-tight">{hotel.name}</h1>
            <p className="mt-1 text-on-surface-variant">
              {hotel.city?.name}, {config.name}
              {hotel.starRating && ` · ★ ${hotel.starRating}`}
            </p>
          </div>
          <Link
            href={`/${country}/inquire/${hotel.id}`}
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all text-center"
          >
            Inquire About Availability
          </Link>
        </div>

        {hotel.description && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-ink-blue">About</h2>
            <p className="mt-3 text-on-surface-variant leading-relaxed">{hotel.description}</p>
          </div>
        )}

        {hotel.amenities.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-ink-blue">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {hotel.amenities.map((a) => (
                <span key={a} className="rounded-full bg-surface-container-high text-on-surface-variant px-4 py-1.5 text-sm font-medium">
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {hotel.products.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-ink-blue">Room Types</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {hotel.products.map((p) => (
                <div key={p.id} className="rounded-2xl border border-natural-clay bg-white p-5">
                  <h3 className="font-bold text-ink-blue">{p.name}</h3>
                  {p.description && (
                    <p className="mt-1 text-sm text-on-surface-variant">{p.description}</p>
                  )}
                  <p className="mt-4 text-lg font-bold text-primary">
                    From ${p.price}
                    {p.maxGuests && (
                      <span className="ml-2 text-sm font-normal text-on-surface-variant">
                        · Up to {p.maxGuests} guests
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <HotelMap lat={hotel.lat} lng={hotel.lng} name={hotel.name} />

        <div className="mt-12 rounded-2xl border border-natural-clay bg-white p-8">
          <h2 className="text-xl font-bold text-ink-blue">Contact Info</h2>
          <div className="mt-4 space-y-2 text-sm text-on-surface-variant">
            {hotel.email && <p>Email: {hotel.email}</p>}
            {hotel.phone && <p>Phone: {hotel.phone}</p>}
            {hotel.website && (
              <p>
                Website:{" "}
                <a href={hotel.website} target="_blank" className="text-primary font-semibold underline">
                  {hotel.website}
                </a>
              </p>
            )}
            {hotel.address && <p>Address: {hotel.address}</p>}
            {hotel.licenseNo && <p>License: {hotel.licenseNo}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
