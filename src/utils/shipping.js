export const FREE_SHIPPING_THRESHOLD = 3000;

// Orders above the threshold ship free; everything else pays the flat fee.
export const shippingFeeFor = (subtotal, deliveryFee) =>
    subtotal > FREE_SHIPPING_THRESHOLD ? 0 : deliveryFee;
