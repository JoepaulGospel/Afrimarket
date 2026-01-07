import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
try {
const { url } = await req.json();
const SCRAPINGBEE_KEY = "2XI419JWKIZVTK75TQAOWL7402233UASWWXY1KXMBO6A6UWMUN1GXCNX57BG797PU8FSI69BATUH0SU6";
const GEMINI_KEY = "AIzaSyDLnUIPPoumFDsqPqzJYzrYBA4IqyVGFNo";
// 1. Fetch via ScrapingBee
const beeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_KEY}&url=${encodeURIComponent(url)}&render_js=false&extract_rules=%7B%22text%22%3A%22body%22%7D`;
const beeRes = await fetch(beeUrl);
const rawData = await beeRes.json();
const pageText = (rawData.text || "").substring(0, 4000);
// 2. Extract with Gemini AI
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const aiResponse = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
contents: [{ parts: [{ text: `Analyze this product and return ONLY a JSON object: {"name": "string", "price_usd": number, "image_url": "string", "weight_kg": number, "category": "GADGETS"|"CLOTHING", "is_restricted": boolean}. Text: ${pageText}` }] }]
})
});
const aiData = await aiResponse.json();
const resultText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
// Safety: Extract only the JSON part from AI response
const jsonMatch = resultText.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("AI returned invalid format");
return NextResponse.json(JSON.parse(jsonMatch[0]));
} catch (error: any) {
return NextResponse.json({ error: "Scan Failed" }, { status: 500 });
}
}