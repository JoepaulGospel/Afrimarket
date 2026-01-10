export const LOGISTICS_CONFIG = {
// CURRENT EXCHANGE RATES (With a 5% "Vibranium Shield" buffer)
rates: {
USD_TO_NGN: 1650, // Real rate + buffer
GBP_TO_NGN: 2100,
CNY_TO_NGN: 230
},
// SHIPPING RATES PER KG (Origin to Lagos Warehouse)
originRates: {
USA: { pricePerKg: 12, estDays: "7-12", currency: "USD" },
UK: { pricePerKg: 10, estDays: "5-10", currency: "GBP" },
CHINA: { pricePerKg: 8, estDays: "14-21", currency: "USD" } // Usually handled in USD
},
// CATEGORY DUTY MULTIPLIER (Customs Clearing Estimates)
categoryFees: {
GADGETS: 0.05, // 5% of item value
CLOTHING: 0.03, // 3% of item value
GENERAL: 0.02 // 2% of item value
},
// AFRIMARKET SERVICE FEE
serviceFee: 25 // Flat $25 for logistics management
}
export function calculateLandedCost(itemPrice, weightKg, origin, category) {
const config = LOGISTICS_CONFIG.originRates[origin] || LOGISTICS_CONFIG.originRates.USA;
const rate = LOGISTICS_CONFIG.rates[`${config.currency}_TO_NGN`];
const shippingTotal = weightKg * config.pricePerKg;
const dutyTotal = itemPrice * (LOGISTICS_CONFIG.categoryFees[category] || 0.02);
const totalUSD = itemPrice + shippingTotal + dutyTotal + LOGISTICS_CONFIG.serviceFee;
const totalNGN = totalUSD * rate;
return {
totalNGN: Math.ceil(totalNGN),
breakdown: {
item: itemPrice * rate,
shipping: shippingTotal * rate,
duty: dutyTotal * rate,
fee: LOGISTICS_CONFIG.serviceFee * rate
}
}
}