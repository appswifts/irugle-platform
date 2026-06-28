import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";
import { prisma } from "@/lib/prisma";
import { AllHotelsMap } from "@/components/map/all-hotels-map";

export default async function MapPage(
  props: { params: Promise<{ country: string }> }
) {
  const { country } = await props.params;
  const config = getCountryBySlug(country);
  if (!config) notFound();

  const providers = await prisma.provider.findMany({
    where: { country: { code: config.code }, status: "APPROVED" },
    select: { name: true, type: true, lat: true, lng: true, slug: true },
  });

  const markers = providers
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      lat: p.lat!,
      lng: p.lng!,
      label: p.name,
      type: p.type,
      slug: p.slug,
    }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Map of {config.name}</h1>
          <p className="mt-1 text-on-surface-variant">{markers.length} properties on the map</p>
        </div>
        <Link
          href={`/${country}/hotels`}
          className="rounded-lg border border-natural-clay px-4 py-2 text-sm hover:bg-surface-container-high"
        >
          List View
        </Link>
      </div>
      <AllHotelsMap markers={markers} country={country} />
    </main>
  );
}
