import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
try {
const { url } = await req.json();
const SCRAPINGBEE_KEY = "2XI419JWKIZVTK75TQAOWL7402233UASWWXY1KXMBO6A6UWMUN1GXCNX57BG797PU8FSI69BATUH0SU6";
const GEMINI_KEY = "AIzaSyDLnUIPPoumFDsqPqzJYzrYBA4IqyVGFNo";
const beeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_KEY}&url=${encodeURIComponent(url)}&render_js=false&extract_rules=%7B%22text%22%3A%22body%22%7D`;
const beeRes = await fetch(beeUrl);
if (!beeRes.ok) throw new Error("Scraper limit reached");
const rawData = await beeRes.json();
const pageText = (rawData.text || "").substring(0, 4500);
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const aiResponse = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
contents: [{ parts: [{ text: `Return ONLY JSON for this product: {"name": "string", "price_usd": number, "image_url": "string", "weight_kg": number, "category": "GADGETS"|"CLOTHING", "is_restricted": boolean}. Text: ${pageText}` }] }]
})
});
const aiData = await aiResponse.json();
const resultText = aiData.candidates[0].content.parts[0].text;
const cleanJson = resultText.match(/\{[\s\S]*\}/);
if (!cleanJson) throw new Error("AI analysis failed");
return NextResponse.json(JSON.parse(cleanJson[0]));
} catch (error: any) {
return NextResponse.json({ error: "System busy. Check URL." }, { status: 500 });
}
}