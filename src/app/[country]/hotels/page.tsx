import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";
import { prisma } from "@/lib/prisma";

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
    <main className="mx-auto max-w-[1280px] px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-ink-blue tracking-tight">Hotels in {config.name}</h1>
        <p className="mt-2 text-on-surface-variant">{providers.length} {providers.length === 1 ? "property" : "properties"} found</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-natural-clay bg-white p-6">
            <h3 className="mb-5 font-bold text-ink-blue text-sm uppercase tracking-wider">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-ink-blue">Property Type</label>
                <div className="mt-3 space-y-2">
                  {providerTypes.map((t) => (
                    <Link
                      key={t.type}
                      href={`/${country}/hotels?type=${t.type}`}
                      className="block text-sm text-on-surface-variant hover:text-primary transition-colors capitalize"
                    >
                      {t.type.replace(/_/g, " ").toLowerCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {providers.length === 0 ? (
            <div className="rounded-2xl border border-natural-clay bg-surface-container-low p-16 text-center">
              <p className="text-on-surface-variant">No hotels found in this area.</p>
              <Link
                href="/providers/register"
                className="mt-5 inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
              >
                List Your Property
              </Link>
            </div>
          ) : (
            providers.map((p) => (
              <Link
                key={p.id}
                href={`/${country}/hotels/${p.slug}`}
                className="flex flex-col gap-4 rounded-2xl border border-natural-clay bg-white p-5 transition-all hover:shadow-md sm:flex-row"
              >
                <div className="h-40 w-full rounded-xl bg-surface-container-high sm:w-56 shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-ink-blue">{p.name}</h3>
                        <p className="text-sm text-on-surface-variant mt-0.5">
                          {p.city?.name}{p.city?.name ? " · " : ""}{p.type?.replace(/_/g, " ").toLowerCase()}
                        </p>
                      </div>
                      {p.starRating && (
                        <span className="text-sm text-on-surface-variant shrink-0">★ {p.starRating}</span>
                      )}
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-on-surface-variant leading-relaxed">
                      {p.description || "No description available."}
                    </p>
                  </div>
                  {p.amenities.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="rounded-full bg-surface-container-high text-on-surface-variant px-3 py-1 text-xs font-medium">
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
