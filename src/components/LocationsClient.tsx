"use client";

import { useState } from "react";
import type { Location } from "@/types/location";

interface Props {
  locations: Location[];
}

export default function LocationsClient({ locations }: Props) {
  // Group by city slug
  const byCity = locations.reduce<Record<string, Location[]>>((acc, loc) => {
    (acc[loc.marketName] ||= []).push(loc);
    return acc;
  }, {});
  const cities = Object.keys(byCity);

  // UI state
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Blank Street Locations</h1>

      {/* City tabs */}
      <div className="flex space-x-2 mb-8">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => {
              setSelectedCity(city);
              setSelectedLocId(null);
            }}
            className={`px-4 py-2 rounded ${
              city === selectedCity
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {byCity[city][0].marketDisplayName}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* List of location cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {byCity[selectedCity].map((loc) => (
            <div
              key={loc.id}
              onClick={() => setSelectedLocId(loc.id)}
              className={`border rounded-lg p-4 cursor-pointer hover:shadow ${
                loc.id === selectedLocId ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <h2 className="font-semibold text-lg">{loc.name}</h2>
              <p className="text-sm text-gray-600">{loc.shortAddress}</p>
            </div>
          ))}
        </div>

        {/* Placeholder map & detail */}
        <div className="flex-1 space-y-6">
          {/* Map placeholder */}
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            {selectedLocId
              ? `Map for ${
                  byCity[selectedCity].find((l) => l.id === selectedLocId)?.name
                }`
              : "Select a location to view on map"}
          </div>

          {/* Detail sheet */}
          {selectedLocId && (
            <div className="border rounded-lg p-4 bg-white shadow">
              {(() => {
                const loc = byCity[selectedCity].find(
                  (l) => l.id === selectedLocId
                )!;
                return (
                  <>
                    <h3 className="text-xl font-bold mb-2">{loc.name}</h3>
                    <p className="text-gray-700 mb-4">{loc.address}</p>
                    <h4 className="font-semibold mb-1">Hours:</h4>
                    <ul className="mb-4 text-sm text-gray-600">
                      {Object.entries(loc.openingHoursSystem).map(
                        ([day, hours]) => (
                          <li key={day}>
                            {day}: {hours.open} – {hours.close}
                          </li>
                        )
                      )}
                    </ul>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Get Directions
                    </a>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
