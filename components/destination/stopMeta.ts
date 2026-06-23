import { StopType } from "@/lib/data";

export const STOP_META: Record<
  StopType,
  { color: string; icon: string; label: string }
> = {
  base: { color: "#6f4e37", icon: "🏠", label: "בסיס" },
  beach: { color: "#0f97a6", icon: "🏖️", label: "חוף" },
  canyon: { color: "#2c4e38", icon: "🪂", label: "קניון" },
  viewpoint: { color: "#b88e57", icon: "🔭", label: "תצפית" },
  restaurant: { color: "#c2410c", icon: "🍽️", label: "עיירה / אוכל" },
  airport: { color: "#475569", icon: "✈️", label: "שדה תעופה" },
};
