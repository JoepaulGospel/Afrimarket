import { AFRIMARKET_CONFIG } from './constants';
export function analyzeProduct(url: string) {
const restricted = AFRIMARKET_CONFIG.RESTRICTED_KEYWORDS.find(word => url.toLowerCase().includes(word));
return { isRestricted: !!restricted, reason: restricted ? `Restricted: ${restricted}` : undefined };
}
export function calculateFullQuote(usdPrice: number, weight: number, origin: 'US'|'UK'|'CA'|'CN', category: 'GADGETS'|'CLOTHING'|'GENERAL', destination: 'LAGOS'|'OUTSIDE_LAGOS') {
const itemNgn = usdPrice * AFRIMARKET_CONFIG.FX_RATE;
const shipNgn = (AFRIMARKET_CONFIG.SHIPPING_RATES[origin] * weight) * AFRIMARKET_CONFIG.FX_RATE;
const dutyNgn = itemNgn * AFRIMARKET_CONFIG.DUTY_RATES[category];
const total = itemNgn + shipNgn + dutyNgn + (itemNgn * AFRIMARKET_CONFIG.SERVICE_FEE_PERCENT) + AFRIMARKET_CONFIG.LOCAL_DELIVERY[destination];
return { itemNgn, shipNgn, dutyNgn, total };
}