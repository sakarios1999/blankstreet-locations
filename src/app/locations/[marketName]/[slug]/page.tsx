import type { Metadata } from "next";
import type { LocationsResponse } from "@/types/location";

// Generate metadata if you like
export async function generateMetadata({
  params,
}: {
  params: Promise<{ marketName: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = slug.split("-")[0];
  const res = await fetch("https://api.blankstreet.com/locations");
  const { locations }: LocationsResponse = await res.json();
  const loc = locations.find((l) => l.id === id);
  return { title: loc?.name ?? "Location Detail" };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ marketName: string; slug: string }>;
}) {
  // 1) await the params object
  const { marketName, slug } = await params;
  // 2) extract the ID
  const id = slug.split("-")[0];

  const res = await fetch("https://api.blankstreet.com/locations");
  if (!res.ok) throw new Error("Failed to load location");
  const { locations }: LocationsResponse = await res.json();
  const loc = locations.find((l) => l.id === id);
  if (!loc) return <p className="p-6">Location not found</p>;

  // build a simple embed map URL
  const mapSrc = `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{loc.name}</h1>
      <p className="text-gray-700 mb-6">{loc.address}</p>

      {/* Embedded map */}
      <div className="w-full h-64 mb-6 rounded overflow-hidden">
        <iframe
          src={mapSrc}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Hours */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Hours</h2>
        <ul className="text-gray-600 space-y-1">
          {Object.entries(loc.openingHoursSystem).map(([day, hrs]) => (
            <li key={day}>
              <strong>{day}:</strong> {hrs.open} – {hrs.close}
            </li>
          ))}
        </ul>
      </section>

      {/* Back link */}
      <p>
        <a href="/locations" className="text-blue-600 hover:underline">
          ← Back to all locations
        </a>
      </p>
    </main>
  );
}
