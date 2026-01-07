import { AFRIMARKET_CONFIG } from './constants';
export type OriginKey = 'US' | 'UK' | 'CA' | 'CN';
export type CategoryKey = 'GADGETS' | 'CLOTHING' | 'GENERAL';
export function analyzeLink(url: string) {
let origin: OriginKey = 'US';
if (url.includes('.uk')) origin = 'UK';
else if (url.includes('taobao') || url.includes('alibaba')) origin = 'CN';
else if (url.includes('.ca')) origin = 'CA';
const restricted = AFRIMARKET_CONFIG.RESTRICTED_KEYWORDS.find(word =>
url.toLowerCase().includes(word)
);
// Safe title extraction
const urlParts = url.split('/');
const rawTitle = urlParts.length > 3 ? urlParts[3].replace(/-/g, ' ') : "Global Product";
const safeTitle = rawTitle.length > 50 ? rawTitle.substring(0, 50) + "..." : rawTitle;
return { origin, isRestricted: !!restricted, restrictedItem: restricted, safeTitle };
}
export function calculateFullQuote(usdPrice: number, weight: number, origin: OriginKey, category: CategoryKey) {
const cfg = AFRIMARKET_CONFIG;
const itemNgn = usdPrice * cfg.FX_RATE;
const shipNgn = (cfg.SHIPPING_RATES[origin] * weight) * cfg.FX_RATE;
const dutyNgn = itemNgn * cfg.DUTY_RATES[category];
const serviceFeeNgn = itemNgn * cfg.SERVICE_FEE_PERCENT;
const localDeliveryNgn = cfg.LOCAL_DELIVERY.LAGOS;
return {
itemNgn,
shipNgn,
dutyNgn,
serviceFeeNgn,
localDeliveryNgn,
total: itemNgn + shipNgn + dutyNgn + serviceFeeNgn + localDeliveryNgn
};
}
