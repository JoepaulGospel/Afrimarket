import { supabase } from './supabaseClient'
/**
* Saves an AI-parsed product into the Supabase Vault
*/
export async function saveAnalyzedProduct(productData, sourceUrl) {
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
console.error("DONO: No authenticated session found.");
return { error: "Login Required" };
}
const { data, error } = await supabase
.from('orders')
.insert([{
user_id: user.id,
product_name: productData.name,
source_url: sourceUrl,
image_url: productData.image,
price_usd: productData.priceUSD,
weight_kg: productData.weightKG,
origin: productData.origin,
total_ngn: productData.calculatedTotalNGN, // Calculated via LogisticsMatrix
status: 'pending_payment'
}])
.select();
return { data, error };
}