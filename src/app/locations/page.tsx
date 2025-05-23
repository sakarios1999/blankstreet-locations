import Link from "next/link";
import { fetchLocations } from "@/services/api";
import { groupBy } from "@/utils/groupBy";
import { slugify } from "@/utils/slugify";

export const revalidate = 60;

export default async function LocationsPage() {
  const locations = await fetchLocations();
  const byMarket = groupBy(locations, (loc) => loc.marketName);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Locations</h1>
      {Object.entries(byMarket).map(([market, items]) => (
        <section key={market} className="mb-8">
          <h2 className="text-2xl mb-2">{items[0].marketDisplayName}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((loc) => {
              const slug = `${loc.id}-${slugify(loc.name)}`;
              return (
                <Link
                  key={loc.id}
                  href={`/locations/${market}/${slug}`}
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
