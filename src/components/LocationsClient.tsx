"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // ← add this
import type { Location } from "@/types/location";
import { groupBy } from "@/utils/groupBy";
import { CityTabs } from "./CityTabs";
import { LocationGrid } from "./LocationGrid";
import { slugify } from "@/utils/slugify";

interface Props {
  locations: Location[];
}

export default function LocationsClient({ locations }: Props) {
  const router = useRouter(); // now defined

  // group locations by market slug
  const byMarket = useMemo(
    () => groupBy(locations, (loc) => loc.marketName),
    [locations]
  );
  const markets = Object.keys(byMarket);

  const [selectedMarket, setSelectedMarket] = useState(markets[0] || "");

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Locations</h1>

      <CityTabs
        cities={markets}
        selectedCity={selectedMarket}
        onSelect={setSelectedMarket}
      />

      <LocationGrid
        locations={byMarket[selectedMarket] || []}
        selectedId={null}
        onSelect={(id) => {
          const loc = byMarket[selectedMarket].find((l) => l.id === id)!;
          const slug = `${id}-${slugify(loc.name)}`;
          router.push(`/locations/${selectedMarket}/${slug}`);
        }}
      />
    </main>
  );
}
