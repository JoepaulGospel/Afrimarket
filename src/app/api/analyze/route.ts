import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
try {
const { url } = await req.json();
// API KEYS
const SCRAPINGBEE_KEY = "2XI419JWKIZVTK75TQAOWL7402233UASWWXY1KXMBO6A6UWMUN1GXCNX57BG797PU8FSI69BATUH0SU6";
const GEMINI_KEY = "AIzaSyDLnUIPPoumFDsqPqzJYzrYBA4IqyVGFNo";
// 1. Fetch via ScrapingBee
const beeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_KEY}&url=${encodeURIComponent(url)}&render_js=false&extract_rules=%7B%22text%22%3A%22body%22%7D`;
const beeRes = await fetch(beeUrl);
if (!beeRes.ok) throw new Error("Product scan limit reached.");
const rawData = await beeRes.json();
const pageText = (rawData.text || "").substring(0, 4500);
// 2. Extract with Gemini AI
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const aiResponse = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
contents: [{
parts: [{
text: `Return ONLY a valid JSON object for this product. Do not include markdown code blocks or explanations.
Required fields: "name", "price_usd" (number), "image_url", "weight_kg" (number), "category" (GADGETS or CLOTHING), "is_restricted" (boolean).
Source Text: ${pageText}`
}]
}]
})
});
const aiData = await aiResponse.json();
if (!aiData.candidates?.[0]?.content?.parts?.[0]?.text) {
throw new Error("AI analysis timed out.");
}
let resultText = aiData.candidates[0].content.parts[0].text;
// Safety: Strip markdown if the AI includes it
const cleanJson = resultText.replace(/```json|```/gi, "").trim();
const productInfo = JSON.parse(cleanJson);
return NextResponse.json(productInfo);
} catch (error: any) {
console.error("Fulfillment Error:", error.message);
return NextResponse.json({ error: "System busy. Please check the URL and try again." }, { status: 500 });
}
}