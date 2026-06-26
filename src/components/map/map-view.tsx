"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  markers?: Array<{
    lat: number;
    lng: number;
    label: string;
    type?: string;
  }>;
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  height?: string;
}

export function MapView({
  markers = [],
  center,
  zoom = 13,
  className = "",
  height = "400px",
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current || ready) return;

    const defaultCenter =
      center && center.lat && center.lng
        ? [center.lat, center.lng]
        : [-1.9441, 30.0619];

    const map = L.map(containerRef.current).setView(
      defaultCenter as [number, number],
      zoom
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;
    setReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !ready || markers.length === 0) return;

    const markerIcons: Record<string, L.DivIcon> = {
      HOTEL: L.divIcon({
        className: "custom-marker",
        html: '<div style="background:#2563eb;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">🏨</div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
      LODGE: L.divIcon({
        className: "custom-marker",
        html: '<div style="background:#16a34a;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">🏕️</div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    };

    markers.forEach((m) => {
      if (!m.lat || !m.lng) return;
      const icon = markerIcons[m.type || ""] || markerIcons.HOTEL;
      const marker = L.marker([m.lat, m.lng], { icon }).addTo(mapRef.current!);
      marker.bindPopup(`<b>${m.label}</b>`);
    });

    if (markers.length > 1 && mapRef.current) {
      const bounds = L.latLngBounds(
        markers.map((m) => [m.lat, m.lng] as [number, number])
      );
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  }, [markers, ready]);

  const defaultCenter =
    center && center.lat && center.lng
      ? [center.lat, center.lng]
      : [-1.9441, 30.0619];

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border overflow-hidden ${className}`}
      style={{ height, width: "100%" }}
    />
  );
}
