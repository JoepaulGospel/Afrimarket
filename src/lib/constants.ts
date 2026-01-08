export type OriginKey = 'US' | 'UK' | 'CA' | 'CN';
export type CategoryKey = 'GADGETS' | 'CLOTHING' | 'GENERAL';
export const AFRIMARKET_CONFIG = {
FX_RATE: 1650,
SERVICE_FEE_PERCENT: 0.05,
SHIPPING_RATES: {
US: 12,
UK: 10,
CA: 11,
CN: 9
} as Record<OriginKey, number>,
DUTY_RATES: {
GADGETS: 0.20,
CLOTHING: 0.10,
GENERAL: 0.15
} as Record<CategoryKey, number>,
LOCAL_DELIVERY: 4500,
RESTRICTED_KEYWORDS: ["battery", "lithium", "liquid", "perfume", "powerbank", "flammable", "aerosol", "oil", "drone", "weapon", "phone"]
};
export function calculateFullQuote(priceUsd: number, weight: number, origin: OriginKey, category: CategoryKey) {
const cfg = AFRIMARKET_CONFIG;
const itemNgn = priceUsd * cfg.FX_RATE;
const shipNgn = (cfg.SHIPPING_RATES[origin] || 12) * weight * cfg.FX_RATE;
const dutyNgn = itemNgn * (cfg.DUTY_RATES[category] || 0.15);
// Service fee applied to Item + Shipping
const serviceFeeNgn = (itemNgn + shipNgn) * cfg.SERVICE_FEE_PERCENT;
return {
itemNgn,
shipNgn,
dutyNgn,
serviceFeeNgn,
localDelivery: cfg.LOCAL_DELIVERY,
total: itemNgn + shipNgn + dutyNgn + serviceFeeNgn + cfg.LOCAL_DELIVERY
};
}
