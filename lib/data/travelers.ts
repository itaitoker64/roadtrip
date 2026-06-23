export interface Traveler {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string; // tailwind bg for avatar
}

export const TRAVELERS: Traveler[] = [
  { id: "me", name: "אני", role: "מתכנן ראשי", emoji: "🧭", color: "bg-sardinia-500" },
  { id: "bro", name: "אח שלי", role: "אחראי קניונינג", emoji: "🪂", color: "bg-corsica-500" },
  { id: "dad", name: "אבא", role: "נהג ראשי", emoji: "🚐", color: "bg-sand-600" },
  { id: "mom", name: "אמא", role: "אחראית לוגיסטיקה", emoji: "🌿", color: "bg-corsica-400" },
  { id: "gf", name: "בת הזוג שלי", role: "אחראית חופים ואוכל", emoji: "🐚", color: "bg-sardinia-400" },
];

export const travelerById = (id: string) =>
  TRAVELERS.find((t) => t.id === id);
