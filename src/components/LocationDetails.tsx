"use client";
import React from "react";
import type { Location } from "@/types/location";

interface LocationDetailsProps {
  loc: Location;
}

export function LocationDetails({ loc }: LocationDetailsProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h3 className="text-xl font-bold mb-2">{loc.name}</h3>
      <p className="text-gray-700 mb-4">{loc.address}</p>
      <h4 className="font-semibold mb-1">Hours:</h4>
      <ul className="mb-4 text-sm text-gray-600 space-y-1">
        {Object.entries(loc.openingHoursSystem).map(([day, hours]) => (
          <li key={day}>
            {day}: {hours.open} – {hours.close}
          </li>
        ))}
      </ul>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Get Directions
      </a>
    </div>
  );
}
