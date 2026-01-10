const initiateAnalysis = async () => {
if (!link) return alert("Strategic credentials required (Paste a link).")
setIsScanning(true)
setStatus('Bypassing Origin Firewalls...')
try {
// CALLING THE SUPABASE BRAIN
const { data, error } = await supabase.functions.invoke('parse-link', {
body: { url: link }
})
if (error) throw error
setStatus('Calculating Global Logistics...')
// PASSING THE REAL DATA TO THE PRODUCT HUD
// We use sessionStorage to pass the AI result to the next page for this test
sessionStorage.setItem('last_analyzed_product', JSON.stringify(data))
sessionStorage.setItem('last_analyzed_url', link)
// REDIRECT TO PRODUCT PAGE
window.location.href = `/product/${Math.random().toString(36).substring(7)}`
} catch (err) {
console.error("Infrastructure Failure:", err)
alert("The target site blocked the scan. Try a direct product URL.")
setIsScanning(false)
setStatus('Metadata...')
}
}