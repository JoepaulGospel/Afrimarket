import { NextRequest, NextResponse } from 'next/server';
import { AFRIMARKET_CONFIG } from '../../../lib/constants'; // Fixed Path
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
try {
const { url } = await req.json();
const SCRAPINGBEE_KEY = process.env.SCRAPINGBEE_KEY;
const GEMINI_KEY = process.env.GEMINI_KEY;
if (!SCRAPINGBEE_KEY || !GEMINI_KEY) {
return NextResponse.json({ error: "API Keys missing in Vercel Dashboard" }, { status: 500 });
}
const beeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_KEY}&url=${encodeURIComponent(url)}&render_js=true&premium_proxy=true&extract_rules=%7B%22text%22%3A%22body%22%7D`;
const beeRes = await fetch(beeUrl);
const rawData = await beeRes.json();
const pageText = (rawData.text || "").substring(0, 8000);
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const prompt = `Extract product info from: "${pageText}". Return ONLY JSON: {"name": "string", "price_usd": number, "image_url": "string", "weight_kg": number, "category": "GADGETS"|"CLOTHING"|"GENERAL", "is_restricted": boolean, "reason": "string"}. RULES: If it is ${AFRIMARKET_CONFIG.RESTRICTED_KEYWORDS.join(", ")}, set is_restricted to true.`;
const aiResponse = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
});
const aiData = await aiResponse.json();
const resultText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
const jsonMatch = resultText.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("AI failed");
return NextResponse.json(JSON.parse(jsonMatch[0]));
} catch (error: any) {
return NextResponse.json({ error: "Scan Failed" }, { status: 500 });
}
}