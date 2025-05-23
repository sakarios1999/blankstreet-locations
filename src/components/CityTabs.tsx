"use client";
import React from "react";

interface CityTabsProps {
  cities: string[];
  selectedCity: string;
  onSelect: (city: string) => void;
}

export function CityTabs({ cities, selectedCity, onSelect }: CityTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className={`px-4 py-2 rounded transition-colors duration-150 focus:outline-none ${
            city === selectedCity
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
