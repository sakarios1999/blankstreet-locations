"use client";

import React, { useState, useEffect, useMemo } from "react";
import type { Location } from "@/types/location";
import { groupBy } from "@/utils/groupBy";

import { CityTabs } from "./CityTabs";
import { LocationGrid } from "./LocationGrid";
import { MapView } from "./MapView";
import { LocationDetails } from "./LocationDetails";

interface Props {
  locations: Location[];
}

export default function LocationsClient({ locations }: Props) {
  const { byCity, cities } = useMemo(() => {
    const map = groupBy(locations, (l) => l.marketDisplayName);
    return { byCity: map, cities: Object.keys(map) };
  }, [locations]);

  const [selectedCity, setSelectedCity] = useState(() => cities[0] || "");
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedLocId(null);
  }, [selectedCity]);

  const selected = useMemo(
    () => byCity[selectedCity]?.find((l) => l.id === selectedLocId) || null,
    [byCity, selectedCity, selectedLocId]
  );

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Blank Street Locations</h1>

      <CityTabs
        cities={cities}
        selectedCity={selectedCity}
        onSelect={setSelectedCity}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <LocationGrid
          locations={byCity[selectedCity] || []}
          selectedId={selectedLocId}
          onSelect={setSelectedLocId}
        />

        <div className="flex-1 space-y-6">
          <MapView title={selected?.name || null} />
          {selected && <LocationDetails loc={selected} />}
        </div>
      </div>
    </main>
  );
}
