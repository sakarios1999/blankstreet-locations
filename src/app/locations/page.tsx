import Link from "next/link";
import type { LocationsResponse } from "@/types/location";

export const revalidate = 60;

export default async function LocationsPage() {
  const res = await fetch("https://api.blankstreet.com/locations");
  if (!res.ok) throw new Error("Failed to load locations");
  const { locations }: LocationsResponse = await res.json();

  // group by city
  const byCity = locations.reduce<Record<string, typeof locations>>(
    (acc, loc) => {
      (acc[loc.marketName] ||= []).push(loc);
      return acc;
    },
    {}
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Locations</h1>
      {Object.entries(byCity).map(([city, locs]) => (
        <section key={city} className="mb-8">
          <h2 className="text-2xl mb-2">{locs[0].marketDisplayName}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locs.map((loc) => {
              // build a slug: "{id}-{name-slugified}"
              const slugified = loc.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const href = `/locations/${loc.marketName}/${loc.id}-${slugified}`;
              return (
                <Link
                  key={loc.id}
                  href={href}
                  className="block border rounded-lg p-4 hover:shadow"
                >
                  <h3 className="font-semibold">{loc.name}</h3>
                  <p className="text-sm text-gray-600">{loc.shortAddress}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
