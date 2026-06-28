"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const MapViewDynamic = dynamic(
  () => import("@/components/map/map-view").then((mod) => ({ default: mod.MapView })),
  { ssr: false, loading: () => <div className="h-[600px] w-full rounded-xl border border-natural-clay bg-surface-container-high animate-pulse" /> }
);

interface AllHotelsMapProps {
  markers: Array<{
    lat: number;
    lng: number;
    label: string;
    type: string;
    slug: string;
  }>;
  country: string;
}

export function AllHotelsMap({ markers, country }: AllHotelsMapProps) {
  if (markers.length === 0) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-xl border border-natural-clay bg-surface-container-high">
        <p className="text-on-surface-variant">No properties with location data yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-natural-clay">
      <MapViewDynamic
        markers={markers}
        center={{ lat: markers[0].lat, lng: markers[0].lng }}
        zoom={7}
        height="600px"
      />
      <div className="flex flex-wrap gap-1 bg-white p-3">
        {markers.slice(0, 20).map((m) => (
          <Link
            key={m.slug}
            href={`/${country}/hotels/${m.slug}`}
            className="rounded-full bg-surface-container-high px-2.5 py-1 text-xs hover:bg-primary hover:text-white transition-colors"
          >
            {m.label}
          </Link>
        ))}
        {markers.length > 20 && (
          <span className="rounded-full bg-surface-container-high px-2.5 py-1 text-xs text-on-surface-variant">
            +{markers.length - 20} more
          </span>
        )}
      </div>
    </div>
  );
}
