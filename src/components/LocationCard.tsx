"use client";
import React from "react";
import type { Location } from "@/types/location";

interface LocationCardProps {
  loc: Location;
  isSelected: boolean;
  onClick: () => void;
}

export function LocationCard({ loc, isSelected, onClick }: LocationCardProps) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer hover:shadow transition ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <h2 className="font-semibold text-lg">{loc.name}</h2>
      <p className="text-sm text-gray-600">{loc.shortAddress}</p>
    </div>
  );
}
