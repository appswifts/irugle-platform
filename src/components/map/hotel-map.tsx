"use client";

import dynamic from "next/dynamic";

const MapViewDynamic = dynamic(
  () => import("@/components/map/map-view").then((mod) => ({ default: mod.MapView })),
  { ssr: false, loading: () => <div className="h-[300px] rounded-xl border border-natural-clay bg-surface-container-high animate-pulse" /> }
);

interface HotelMapProps {
  lat: number | null;
  lng: number | null;
  name: string;
}

export function HotelMap({ lat, lng, name }: HotelMapProps) {
  if (!lat || !lng) return null;

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-xl font-semibold">Location</h2>
      <MapViewDynamic
        markers={[{ lat, lng, label: name, type: "HOTEL" }]}
        center={{ lat, lng }}
        zoom={15}
        height="350px"
      />
    </div>
  );
}
