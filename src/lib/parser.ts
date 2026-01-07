import { AFRIMARKET_CONFIG, OriginKey, CategoryKey } from './constants';
export function analyzeLink(url: string) {
const urlLower = url.toLowerCase();
// 1. Detect Origin
let origin: OriginKey = 'US';
if (urlLower.includes('.uk')) origin = 'UK';
else if (urlLower.includes('taobao') || urlLower.includes('alibaba')) origin = 'CN';
else if (urlLower.includes('.ca')) origin = 'CA';
// 2. Detect Category & Smart Pricing
let detectedCategory: CategoryKey = 'GENERAL';
let estimatedUsd = 149.99; // Default
let weight = 1.5;
if (urlLower.includes('laptop') || urlLower.includes('tower') || urlLower.includes('pc') || urlLower.includes('gaming')) {
detectedCategory = 'GADGETS';
estimatedUsd = 1850.00; // Realistic start for a PC
weight = 8.5; // Heavier for a Tower
} else if (urlLower.includes('shoe') || urlLower.includes('shirt') || urlLower.includes('zara')) {
detectedCategory = 'CLOTHING';
estimatedUsd = 75.00;
weight = 1.0;
}
// 3. Check for Restricted Items
const restricted = AFRIMARKET_CONFIG.RESTRICTED_KEYWORDS.find(word => urlLower.includes(word));
// 4. Safe Title Extraction
const urlParts = url.split('/');
const rawTitle = urlParts.length > 3 ? urlParts[3].replace(/-/g, ' ') : "Global Product";
const safeTitle = rawTitle.length > 40 ? rawTitle.substring(0, 40) + "..." : rawTitle;
return { origin, isRestricted: !!restricted, restrictedItem: restricted, safeTitle, detectedCategory, estimatedUsd, weight };
}
export function calculateFullQuote(usdPrice: number, weight: number, origin: OriginKey, category: CategoryKey) {
const cfg = AFRIMARKET_CONFIG;
const itemNgn = usdPrice * cfg.FX_RATE;
const shipNgn = (cfg.SHIPPING_RATES[origin] * weight) * cfg.FX_RATE;
const dutyNgn = itemNgn * cfg.DUTY_RATES[category];
const total = itemNgn + shipNgn + dutyNgn + (itemNgn * cfg.SERVICE_FEE_PERCENT) + cfg.LOCAL_DELIVERY.LAGOS;
return { itemNgn, shipNgn, dutyNgn, total };
}