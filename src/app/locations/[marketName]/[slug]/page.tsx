import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationById } from "@/services/api";
import { MapView } from "@/components/MapView";
import { LocationDetails } from "@/components/LocationDetails";
import Link from "next/link";

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
  const { slug } = await params;
  const id = slug.split("-")[0];
  const loc = await getLocationById(id);
  if (!loc) notFound();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Title & address */}
      <h1 className="text-3xl font-bold mb-4">{loc.name}</h1>
      <p className="text-gray-700 mb-6">{loc.address}</p>

      {/* Map iframe */}
      <MapView lat={loc.latitude} lng={loc.longitude} />

      {/* Hours & directions */}
      <LocationDetails loc={loc} />

      {/* Back link */}
      <p className="mt-6">
        <Link href="/locations" className="text-blue-600 hover:underline">
          ← Back to locations
        </Link>
      </p>
    </main>
  );
}
