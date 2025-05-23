import type { LocationsResponse, Location } from "@/types/location";

// Base URL configurable via env var for flexibility
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.blankstreet.com";

/**
 * Fetch all locations (SSR/ISR). Caches for 60s by default.
 */
export async function fetchLocations(): Promise<Location[]> {
  const res = await fetch(`${BASE_URL}/locations`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch locations (${res.status})`);
  }
  const { locations }: LocationsResponse = await res.json();
  return locations;
}

/**
 * Lookup a single location by ID.
 * Note: reuses fetchLocations cache under the hood.
 */
export async function getLocationById(id: string): Promise<Location> {
  const locations = await fetchLocations();
  const loc = locations.find((l) => l.id === id);
  if (!loc) {
    throw new Error(`Location with id ${id} not found`);
  }
  return loc;
}
