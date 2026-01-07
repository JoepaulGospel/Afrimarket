import { AFRIMARKET_CONFIG } from './constants';
export interface ProductPricing {
itemNgn: number;
shipNgn: number;
dutyNgn: number;
serviceFeeNgn: number;
localDeliveryNgn: number;
total: number;
}
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
origin: 'US' | 'UK' | 'CA' | 'CN',
category: 'GADGETS' | 'CLOTHING' | 'GENERAL',
destination: 'LAGOS' | 'OUTSIDE_LAGOS'
): ProductPricing {
const cfg = AFRIMARKET_CONFIG;
const itemNgn = usdPrice * cfg.FX_RATE;
const shipNgn = (cfg.SHIPPING_RATES[origin] * weight) * cfg.FX_RATE;
const dutyNgn = itemNgn * cfg.DUTY_RATES[category];
const serviceFeeNgn = itemNgn * cfg.SERVICE_FEE_PERCENT;
const localDeliveryNgn = cfg.LOCAL_DELIVERY[destination];
const total = itemNgn + shipNgn + dutyNgn + serviceFeeNgn + localDeliveryNgn;
return { itemNgn, shipNgn, dutyNgn, serviceFeeNgn, localDeliveryNgn, total };
}