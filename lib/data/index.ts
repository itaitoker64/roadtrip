import { corsica } from "./corsica";
import { sardinia } from "./sardinia";
import { Destination } from "./types";

export const DESTINATIONS: Record<"corsica" | "sardinia", Destination> = {
  corsica,
  sardinia,
};

export const DESTINATION_LIST: Destination[] = [corsica, sardinia];

export const TRIP_START = new Date("2026-07-05T00:00:00+02:00");
export * from "./types";
