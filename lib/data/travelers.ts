export interface Traveler {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string; // tailwind bg for avatar
}

export const TRAVELERS: Traveler[] = [
  { id: "me", name: "איתי", role: "תכנון ומסלול", emoji: "🧭", color: "bg-sardinia-500" },
  { id: "bro", name: "טליה", role: "קניונינג ואקשן", emoji: "🪂", color: "bg-corsica-500" },
  { id: "dad", name: "גיא", role: "נהיגה ורכב", emoji: "🚐", color: "bg-sand-600" },
  { id: "mom", name: "עמית", role: "לוגיסטיקה והזמנות", emoji: "🌿", color: "bg-corsica-400" },
  { id: "gf", name: "ענת", role: "חופים ואוכל", emoji: "🐚", color: "bg-sardinia-400" },
];

export const travelerById = (id: string) =>
  TRAVELERS.find((t) => t.id === id);
