export const BASE_PRICE = 39900; // cents

export function priceOfOptions(opts) {
  let price = BASE_PRICE;
  if (opts.material === "leather") price += 8000;
  if (opts.material === "fabric") price += 3000; // fabric upgrade vs. baseline foam
  if (opts.legsFinish === "gold") price += 6000;
  if (opts.legsFinish === "black") price += 1500;
  if (opts.armStyle === "4D") price += 5000;
  return price;
}

export function formatCurrency(cents) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
    (cents || 0) / 100
  );
}
