import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
const corsHeaders = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
serve(async (req) => {
if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
try {
const { url } = await req.json()
// Jina Reader Protocol
const readerUrl = `https://r.jina.ai/${url}`
const readerRes = await fetch(readerUrl)
const markdown = await readerRes.text()
// GEMINI 1.5 FLASH ACTIVATION
const apiKey = "AIzaSyDLnUIPPoumFDsqPqzJYzrYBA4IqyVGFNo"
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
const aiRes = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
contents: [{
parts: [{
text: `Extract product data. Return ONLY JSON: { "name": string, "priceUSD": number, "image": string, "description": string, "weightKG": number, "origin": "USA"|"UK"|"CHINA" }. Markdown: ${markdown.substring(0, 7000)}`
}]
}],
generationConfig: { responseMimeType: "application/json" }
})
})
const data = await aiRes.json()
const product = JSON.parse(data.candidates[0].content.parts[0].text)
return new Response(JSON.stringify(product), {
headers: { ...corsHeaders, 'Content-Type': 'application/json' },
})
} catch (err) {
return new Response(JSON.stringify({ error: err.message }), {
status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
})
}
})