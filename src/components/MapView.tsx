"use client";

interface MapViewProps {
  lat: number;
  lng: number;
}

export function MapView({ lat, lng }: MapViewProps) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  return (
    <div className="w-full h-64 mb-6 rounded overflow-hidden">
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
