"use client";

interface MapViewProps {
  title: string | null;
}

export function MapView({ title }: MapViewProps) {
  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      {title ? `Map for ${title}` : "Select a location to view on map"}
    </div>
  );
}