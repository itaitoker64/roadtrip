export type Pace = "active" | "calm";

export type StopType =
  | "base"
  | "beach"
  | "canyon"
  | "viewpoint"
  | "restaurant"
  | "airport";

export interface MapStop {
  id: string;
  name: string;
  type: StopType;
  lat: number;
  lng: number;
  note?: string;
  day?: number; // which itinerary day this belongs to (for route lines)
}

export interface Activity {
  time: string;
  title: string;
  detail?: string;
  drive?: string; // e.g. "40 דק׳ נסיעה"
  pace?: Pace;
}

export interface ItineraryDay {
  day: number;
  date: string; // "5 ביולי"
  title: string;
  summary: string;
  pace: Pace;
  activities: Activity[];
  meals?: string;
  stayNote?: string;
}

export interface CostLine {
  label: string;
  amount: number; // EUR per the whole group unless noted
  note?: string;
}

export interface FlightInfo {
  route: string;
  airlines: string;
  duration: string;
  direct: boolean;
  note: string;
  bookingUrl: string;
}

export interface Highlight {
  id: string;
  title: string;
  kind: StopType;
  blurb: string;
}

export interface Destination {
  id: "corsica" | "sardinia";
  name: string;
  tagline: string;
  pitch: string;
  dates: string;
  accent: "corsica" | "sardinia";
  heroGradient: string; // tailwind gradient classes for the cinematic hero
  why: { title: string; text: string }[];
  itinerary: ItineraryDay[];
  stops: MapStop[];
  highlights: Highlight[];
  stay: { base: string; style: string; note: string };
  car: string;
  weather: string;
  flight: FlightInfo;
  costs: CostLine[];
  mapCenter: { lat: number; lng: number; zoom: number };
}
