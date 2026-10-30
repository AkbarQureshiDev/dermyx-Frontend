// Bundle pricing is derived from the quantity in the cart, so no discounted
// price needs to be encoded in the cart key itself.
export const MAX_BUNDLE_QTY = 3;

export const tierDiscount = (qty) => (qty >= 3 ? 0.10 : qty >= 2 ? 0.05 : 0);

export const bundleUnitPrice = (basePrice, qty) =>
  +(basePrice * (1 - tierDiscount(qty))).toFixed(2);

export const bundleTotal = (basePrice, qty) =>
  +(bundleUnitPrice(basePrice, qty) * qty).toFixed(2);

export const getTiers = (basePrice) =>
  [1, 2, 3].map((qty) => ({
    qty,
    label: `Buy ${qty}`,
    discount: tierDiscount(qty),
    badge: qty === 1 ? null : `${Math.round(tierDiscount(qty) * 100)}% OFF`,
    ribbon: qty === 2 ? 'Most Popular' : null,
    total: bundleTotal(basePrice, qty),
    unit: bundleUnitPrice(basePrice, qty),
    original: qty === 1 ? null : +(basePrice * qty).toFixed(2),
  }));

const isTierKey = (key) => typeof key === 'string' && key.startsWith('tier_');

// Carts written before this change stored the discounted unit price in the size
// key ("tier_864"). Fold those onto 'default' so one product is one line.
export const normalizeCart = (cartItems) => {
  const normalized = {};
  for (const [itemId, sizes] of Object.entries(cartItems || {})) {
    const merged = {};
    for (const [size, qty] of Object.entries(sizes || {})) {
      const key = isTierKey(size) || size === 'undefined' ? 'default' : size;
      merged[key] = +(merged[key] || 0) + Number(qty || 0);
    }
    normalized[itemId] = merged;
  }
  return normalized;
};

// Cart lines used to carry a synthetic "tier_<price>" size key; orders saved
// before the change still have it, so render a readable label for both shapes.
export const sizeLabel = (size, qty) => {
  if (typeof size === 'string' && size.startsWith('tier_')) return 'Bundle';
  return qty > 1 ? `Buy ${qty} Bundle` : 'Single';
};
