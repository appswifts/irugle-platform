import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";
import { prisma } from "@/lib/prisma";

export default async function CountryPage(
  props: { params: Promise<{ country: string }> }
) {
  const { country } = await props.params;
  const config = getCountryBySlug(country);
  if (!config) notFound();

  const cities = await prisma.city.findMany({
    where: { country: { code: config.code }, isActive: true },
    include: { _count: { select: { providers: true } } },
    orderBy: { name: "asc" },
  });

  const providers = await prisma.provider.findMany({
    where: { country: { code: config.code }, status: "APPROVED" },
    include: { city: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-ink-blue tracking-tight">
          Discover {config.name} {config.flag}
        </h1>
        <p className="mt-3 text-on-surface-variant text-lg">
          Hotels, tours, guides, and experiences — curated for your journey.
        </p>
      </div>

      {cities.length > 0 && (
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-ink-blue tracking-tight">Popular Destinations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/${country}/hotels?city=${city.slug}`}
                className="rounded-2xl border border-natural-clay bg-surface-container-low p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <h3 className="font-bold text-ink-blue text-lg">{city.name}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {city._count.providers} {city._count.providers === 1 ? "place" : "places"} to stay
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-8 text-2xl font-bold text-ink-blue tracking-tight">Featured Properties</h2>
        {providers.length === 0 ? (
          <p className="text-on-surface-variant">
            No properties yet.{" "}
            <Link href="/providers/register" className="text-primary font-semibold underline">
              Be the first to list
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((p) => (
              <Link
                key={p.id}
                href={`/${country}/hotels/${p.slug}`}
                className="group rounded-2xl border border-natural-clay bg-white transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="h-48 bg-surface-container-high" />
                <div className="p-5">
                  <h3 className="font-bold text-ink-blue group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {p.city?.name || config.name}
                    {p.type && ` · ${p.type.replace(/_/g, " ").toLowerCase()}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
