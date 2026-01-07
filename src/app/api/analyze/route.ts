import { NextResponse } from 'next/server';
export async function POST(req: Request) {
try {
const { url } = await req.json();
const SCRAPINGBEE_KEY = "2XI419JWKIZVTK75TQAOWL7402233UASWWXY1KXMBO6A6UWMUN1GXCNX57BG797PU8FSI69BATUH0SU6";
const GEMINI_KEY = "AIzaSyDLnUIPPoumFDsqPqzJYzrYBA4IqyVGFNo";
// 1. Fetch HTML via ScrapingBee
const beeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_KEY}&url=${encodeURIComponent(url)}&render_js=false&extract_rules=%7B%22text%22%3A%22body%22%7D`;
const beeRes = await fetch(beeUrl);
if (!beeRes.ok) throw new Error("Scraper Blocked");
const rawData = await beeRes.json();
const pageText = rawData.text?.substring(0, 5000) || "";
// 2. Extract with Gemini
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const aiResponse = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
contents: [{
parts: [{
text: `Analyze this text and return a valid JSON object.
Fields: "name", "price_usd" (number), "image_url", "weight_kg" (number), "category" (GADGETS or CLOTHING), "is_restricted" (boolean).
Text: ${pageText}`
}]
}]
})
});
const aiData = await aiResponse.json();
let resultText = aiData.candidates[0].content.parts[0].text;
// DEBUG: Remove AI Markdown clutter
const jsonMatch = resultText.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("AI returned invalid format");
const productInfo = JSON.parse(jsonMatch[0]);
return NextResponse.json(productInfo);
} catch (error: any) {
console.error("DEBUG ERROR:", error.message);
return NextResponse.json({ error: error.message }, { status: 500 });
}
}