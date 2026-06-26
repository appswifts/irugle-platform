import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function HotelsPage(
  props: {
    params: Promise<{ country: string }>;
    searchParams: Promise<{ city?: string; type?: string }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { country } = params as unknown as { country: string };
  const { city, type } = searchParams as unknown as { city?: string; type?: string };

  const config = getCountryBySlug(country);
  if (!config) notFound();

  const where: Record<string, unknown> = {
    country: { code: config.code },
    status: "APPROVED",
    type: { in: ["HOTEL", "LODGE", "GUEST_HOUSE", "APARTMENT"] },
  };
  if (city) {
    where.city = { slug: city };
  }

  const providers = await prisma.provider.findMany({
    where,
    include: { city: true },
    orderBy: { name: "asc" },
  });

  const providerTypes = await prisma.provider.findMany({
    where: { country: { code: config.code }, status: "APPROVED" },
    select: { type: true },
    distinct: ["type"],
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hotels in {config.name}</h1>
        <p className="mt-2 text-muted-foreground">{providers.length} properties found</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-4 font-semibold">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Property Type</label>
                <div className="mt-2 space-y-2">
                  {providerTypes.map((t) => (
                    <Link
                      key={t.type}
                      href={`/${country}/hotels?type=${t.type}`}
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      {t.type.replace(/_/g, " ").toLowerCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          {providers.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center">
              <p className="text-muted-foreground">No hotels found in this area.</p>
              <Link
                href="/providers/register"
                className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                List Your Property
              </Link>
            </div>
          ) : (
            providers.map((p) => (
              <Link
                key={p.id}
                href={`/${country}/hotels/${p.slug}`}
                className="flex flex-col gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md sm:flex-row"
              >
                <div className="h-32 w-full rounded-lg bg-muted sm:w-48" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {p.city?.name} · {p.type?.replace(/_/g, " ").toLowerCase()}
                      </p>
                    </div>
                    {p.starRating && (
                      <span className="text-sm text-muted-foreground">★ {p.starRating}</span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {p.description || "No description available."}
                  </p>
                  {p.amenities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
