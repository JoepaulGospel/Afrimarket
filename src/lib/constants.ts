export const AFRIMARKET_CONFIG = {
FX_RATE: 1650,
SERVICE_FEE_PERCENT: 0.05,
SHIPPING_RATES: {
US: 12,
UK: 10,
CA: 11,
CN: 9
},
DUTY_RATES: {
GADGETS: 0.20,
CLOTHING: 0.10,
GENERAL: 0.15
},
LOCAL_DELIVERY: 4500,
RESTRICTED_KEYWORDS: ["battery", "lithium", "liquid", "perfume", "powerbank", "flammable", "aerosol", "oil", "drone", "weapon", "phone"]
};
export function calculateFullQuote(priceUsd: number, weight: number, origin: string, category: string) {
const cfg = AFRIMARKET_CONFIG;
const itemNgn = priceUsd * cfg.FX_RATE;
// Logic to handle rates
const rates = cfg.SHIPPING_RATES as any;
const shipRate = rates[origin] || 12;
const duties = cfg.DUTY_RATES as any;
const dutyRate = duties[category] || 0.15;
const shipNgn = shipRate * weight * cfg.FX_RATE;
const dutyNgn = itemNgn * dutyRate;
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