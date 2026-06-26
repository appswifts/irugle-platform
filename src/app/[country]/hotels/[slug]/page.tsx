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
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link href={`/${country}/hotels`} className="text-sm text-muted-foreground hover:text-primary">
        &larr; Back to hotels
      </Link>

      <div className="mt-6">
        <div className="mb-6 h-64 rounded-xl bg-muted sm:h-96" />

        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <p className="mt-1 text-muted-foreground">
              {hotel.city?.name}, {config.name}
              {hotel.starRating && ` · ★ ${hotel.starRating}`}
            </p>
          </div>
          <Link
            href={`/${country}/inquire/${hotel.id}`}
            className="rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground hover:opacity-90"
          >
            Inquire About Availability
          </Link>
        </div>

        {hotel.description && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{hotel.description}</p>
          </div>
        )}

        {hotel.amenities.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {hotel.amenities.map((a) => (
                <span key={a} className="rounded-full bg-muted px-3 py-1 text-sm">
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {hotel.products.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Room Types</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {hotel.products.map((p) => (
                <div key={p.id} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{p.name}</h3>
                  {p.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  )}
                  <p className="mt-3 text-lg font-bold text-primary">
                    From ${p.price}
                    {p.maxGuests && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
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

        <div className="mt-12 rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Contact Info</h2>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {hotel.email && <p>Email: {hotel.email}</p>}
            {hotel.phone && <p>Phone: {hotel.phone}</p>}
            {hotel.website && (
              <p>
                Website:{" "}
                <a href={hotel.website} target="_blank" className="text-primary underline">
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
