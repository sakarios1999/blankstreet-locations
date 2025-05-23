"use client";
import React from "react";
import type { Location } from "@/types/location";
import { LocationCard } from "./LocationCard";

interface LocationGridProps {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LocationGrid({
  locations,
  selectedId,
  onSelect,
}: LocationGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {locations.map((loc) => (
        <LocationCard
          key={loc.id}
          loc={loc}
          isSelected={loc.id === selectedId}
          onClick={() => onSelect(loc.id)}
        />
      ))}
    </div>
  );
}
