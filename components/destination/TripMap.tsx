"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { MapStop, StopType } from "@/lib/data";
import { STOP_META } from "./stopMeta";

function pin(type: StopType) {
  const m = STOP_META[type];
  return L.divIcon({
    className: "",
    html: `<div class="trip-pin" style="background:${m.color}"><span style="font-size:13px">${m.icon}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
    popupAnchor: [0, -26],
  });
}

export default function TripMap({
  stops,
  center,
  zoom,
  accent,
  height = 460,
}: {
  stops: MapStop[];
  center: { lat: number; lng: number };
  zoom: number;
  accent: string;
  height?: number;
}) {
  const route = stops
    .filter((s) => s.day != null && s.type !== "airport")
    .sort((a, b) => (a.day! - b.day!))
    .map((s) => [s.lat, s.lng] as [number, number]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height, width: "100%", borderRadius: "1.25rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {route.length > 1 && (
        <Polyline
          positions={route}
          pathOptions={{ color: accent, weight: 3, dashArray: "2 8", opacity: 0.8 }}
        />
      )}
      {stops.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]} icon={pin(s.type)}>
          <Popup>
            <div dir="rtl" style={{ textAlign: "right", minWidth: 150 }}>
              <strong>{s.name}</strong>
              <div style={{ fontSize: 12, color: "#6b726c", marginTop: 2 }}>
                {STOP_META[s.type].label}
                {s.day ? ` · יום ${s.day}` : ""}
              </div>
              {s.note && (
                <div style={{ fontSize: 12, marginTop: 4 }}>{s.note}</div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
