export interface Expense {
  id: string;
  label: string;
  category: string;
  planned: number; // EUR
  actual: number; // EUR
  split: string[]; // traveler ids sharing the cost
}

export const BUDGET_CATEGORIES = [
  "טיסות",
  "לינה",
  "רכב",
  "אוכל",
  "אטרקציות/קניונינג",
  "שונות",
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  טיסות: "#0f97a6",
  לינה: "#b88e57",
  רכב: "#475569",
  אוכל: "#c2410c",
  "אטרקציות/קניונינג": "#2c4e38",
  שונות: "#a3784a",
};

const ALL = ["me", "bro", "dad", "mom", "gf"];

const seed: [string, string, number, number][] = [
  ["טיסות (קבוצתי)", "טיסות", 2750, 0],
  ["וילה 6 לילות", "לינה", 2400, 0],
  ["ואן 9 מקומות", "רכב", 980, 0],
  ["מדריך קניונינג + סירה", "אטרקציות/קניונינג", 900, 0],
  ["אוכל ומסעדות", "אוכל", 1400, 0],
  ["דלק, חניות ושונות", "שונות", 500, 0],
];

export const BUDGET_SEED: Expense[] = seed.map(([label, category, planned, actual], i) => ({
  id: `exp-${i}`,
  label,
  category,
  planned,
  actual,
  split: ALL,
}));
