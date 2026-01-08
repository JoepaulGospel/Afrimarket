const handleMagicScan = async () => {
// STRICT URL CHECK: Ensures it's a real link, not just text
const urlPattern = new RegExp('^(https?:\\/\\/)?'+
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
'((\\d{1,3}\\.){3}\\d{1,3}))'+
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
'(\\?[;&a-z\\d%_.~+=-]*)?'+
'(\\#[-a-z\\d_]*)?$','i');
if (!urlPattern.test(url)) {
return alert("Please paste a valid website link (e.g., https://amazon.com/product)");
}
setLoading(true);
setProduct(null);
try {
const res = await fetch('/api/analyze', { method: 'POST', body: JSON.stringify({ url }) });
const data = await res.json();
// If the AI couldn't find real info, it returns an error
if (data.error || !data.name || data.name === "Unknown") {
throw new Error("Could not extract exact product details.");
}
const origin = getOrigin(url);
const pricing = calculateFullQuote(
data.price_usd,
data.weight_kg,
origin as any,
data.category || 'GENERAL'
);
setProduct({ ...data, origin, pricing, url });
} catch (err) {
alert("Scan Failed: This store might be blocking us, or the link is invalid. Try a direct product page.");
} finally {
setLoading(false);
}
};