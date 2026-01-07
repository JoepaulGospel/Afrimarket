import { AFRIMARKET_CONFIG } from './constants';
export type OriginKey = 'US' | 'UK' | 'CA' | 'CN';
export type CategoryKey = 'GADGETS' | 'CLOTHING' | 'GENERAL';
export function analyzeProduct(url: string) {
const restricted = AFRIMARKET_CONFIG.RESTRICTED_KEYWORDS.find(word =>
url.toLowerCase().includes(word)
);
return {
isRestricted: !!restricted,
reason: restricted ? `Contains restricted material: ${restricted}` : undefined
};
}
export function calculateFullQuote(
usdPrice: number,
weight: number,
origin: OriginKey,
category: CategoryKey,
destination: 'LAGOS' | 'OUTSIDE_LAGOS'
) {
const cfg = AFRIMARKET_CONFIG;
const itemNgn = usdPrice * cfg.FX_RATE;
const shippingNgn = (cfg.SHIPPING_RATES[origin] * weight) * cfg.FX_RATE;
const dutyNgn = itemNgn * cfg.DUTY_RATES[category];
const serviceFeeNgn = itemNgn * cfg.SERVICE_FEE_PERCENT;
const localDeliveryNgn = cfg.LOCAL_DELIVERY[destination];
const total = itemNgn + shippingNgn + dutyNgn + serviceFeeNgn + localDeliveryNgn;
return { itemNgn, shippingNgn, dutyNgn, serviceFeeNgn, localDeliveryNgn, total };
}