export const EUR_TO_ILS = 4.0; // adjust as needed; used for the ₪/€ toggle

export function money(amount: number, currency: "EUR" | "ILS") {
  const value = currency === "ILS" ? amount * EUR_TO_ILS : amount;
  const symbol = currency === "ILS" ? "₪" : "€";
  return `${symbol}${Math.round(value).toLocaleString("he-IL")}`;
}

export function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}
