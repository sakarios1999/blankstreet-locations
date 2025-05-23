import LocationsClient from "@/components/LocationsClient";
import { fetchLocations } from "@/services/api";
import type { Location } from "@/types/location";

export const revalidate = 60;

export default async function LocationsPage() {
  const locations: Location[] = await fetchLocations();
  return <LocationsClient locations={locations} />;
}
