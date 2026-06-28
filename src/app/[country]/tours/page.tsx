import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";
import { prisma } from "@/lib/prisma";

export default async function ToursPage(
  props: { params: Promise<{ country: string }> }
) {
  const { country } = await props.params;
  const config = getCountryBySlug(country);
  if (!config) notFound();

  const providers = await prisma.provider.findMany({
    where: { country: { code: config.code }, type: { in: ["TOUR_OPERATOR", "TOUR_GUIDE", "EXPERIENCE"] }, status: "APPROVED" },
    include: { city: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Tours & Experiences in {config.name}</h1>
      <p className="mt-2 text-on-surface-variant">
        {providers.length} tour operators, guides, and experiences
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <Link
            key={p.id}
            href={`/${country}/inquire/${p.id}`}
            className="group rounded-xl border border-natural-clay bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <h3 className="font-semibold group-hover:text-primary">{p.name}</h3>
            <p className="mt-1 text-sm text-on-surface-variant">
              {p.type?.replace(/_/g, " ").toLowerCase()} · {p.city?.name}
            </p>
            {p.description && (
              <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">{p.description}</p>
            )}
          </Link>
        ))}
        {providers.length === 0 && (
          <p className="col-span-full text-on-surface-variant">No tours listed yet.</p>
        )}
      </div>
    </main>
  );
}
