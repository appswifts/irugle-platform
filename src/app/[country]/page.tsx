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
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Discover {config.name} {config.flag}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Hotels, tours, guides, and experiences — curated for your journey.
        </p>
      </div>

      {cities.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold">Popular Destinations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/${country}/hotels?city=${city.slug}`}
                className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <h3 className="font-semibold">{city.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {city._count.providers} places to stay
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 text-xl font-semibold">Featured Properties</h2>
        {providers.length === 0 ? (
          <p className="text-muted-foreground">
            No properties yet.{" "}
            <Link href="/providers/register" className="text-primary underline">
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
                className="group rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="h-48 rounded-t-xl bg-muted" />
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-primary">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
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
