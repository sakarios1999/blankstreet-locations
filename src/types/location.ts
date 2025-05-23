// Days of the week
export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

// Single open/close entry
export interface OpeningHour {
  open: string; // e.g. "06:30:00"
  close: string; // e.g. "20:00:00"
}

// Full week schedule
export type OpeningHoursSystem = Record<Weekday, OpeningHour>;

// Main Location shape
export interface Location {
  id: string;
  squareId: string;
  erpId: string;
  name: string;
  address: string;
  shortAddress: string;
  isEnabled: boolean;
  isKioskEnabled: boolean;
  isKioskOpen: boolean;
  isOrderStatusDisabled: boolean;
  openingHoursSystem: OpeningHoursSystem;
  longitude: number;
  latitude: number;
  imgUrl: string;
  marketName: string; // e.g. "new-york"
  marketDisplayName: string; // e.g. "New York"
  geoName: string; // e.g. "us"
  currency: string; // e.g. "USD"
  status: string; // e.g. "Closed"
  printerSettings: any; // leave `any` unless you have detail
  tags: string[];
  _disableUntil: string | null;
  _isVisible: boolean;
}

// Wrapper the API gives us
export interface LocationsResponse {
  hasMore: boolean;
  locations: Location[];
}
