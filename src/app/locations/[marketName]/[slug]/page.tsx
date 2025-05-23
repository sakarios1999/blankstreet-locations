import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationById } from "@/services/api";

interface Params {
  marketName: string;
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = slug.split("-")[0];
  const loc = await getLocationById(id);
  return { title: loc?.name ?? "Location Detail" };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // 1) await the params object
  const { slug } = await params;
  // 2) extract the ID
  const id = slug.split("-")[0];
  const loc = await getLocationById(id);
  if (!loc) notFound();

  const mapSrc = `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{loc.name}</h1>
      <p className="text-gray-700 mb-6">{loc.address}</p>

      <div className="w-full h-64 mb-6 rounded overflow-hidden">
        <iframe
          src={mapSrc}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>

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

      <Link href="/locations" className="text-blue-600 hover:underline">
        ← Back to locations
      </Link>
    </main>
  );
}
