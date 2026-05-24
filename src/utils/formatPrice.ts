export function formatPrice(price: string | number): string {
  const n = typeof price === "string" ? parseFloat(price) : price;
  return `$${n.toFixed(2)}`;
}
