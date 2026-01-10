const handlePayment = async () => {
const productData = JSON.parse(sessionStorage.getItem('last_analyzed_product'))
const sourceUrl = sessionStorage.getItem('last_analyzed_url')
// COMMIT TO SUPABASE VAULT
const { data, error } = await supabase
.from('orders')
.insert([{
product_name: productData.name,
source_url: sourceUrl,
image_url: productData.image,
price_usd: productData.priceUSD,
weight_kg: productData.weightKG,
origin: productData.origin,
total_ngn: summary.landedCost + summary.deliveryFee,
status: 'pending_payment',
shipping_address: formData // The JSONB address object
}])
if (error) {
alert("Vault Sync Error: " + error.message)
} else {
setStep(2) // Confirmation
}
}
