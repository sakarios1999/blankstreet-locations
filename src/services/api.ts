import axios from "axios";
import type { LocationsResponse } from "@/types/location";

// Note: relative URL hits your Next.js route
const api = axios.create({
  baseURL: "/api",
});

export async function fetchLocations(): Promise<LocationsResponse> {
  const { data } = await api.get<LocationsResponse>("/locations");
  return data;
}
