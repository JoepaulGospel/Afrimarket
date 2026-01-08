import { NextRequest, NextResponse } from 'next/server';
import { AFRIMARKET_CONFIG } from '@/lib/constants';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
try {
const { url } = await req.json();
// These will come from your Vercel Dashboard (see instructions below)
const SCRAPINGBEE_KEY = process.env.SCRAPINGBEE_KEY;
const GEMINI_KEY = process.env.GEMINI_KEY;
if (!SCRAPINGBEE_KEY || !GEMINI_KEY) {
throw new Error("API keys are missing in Environment Variables");
}
// 1. Fetch via ScrapingBee
const beeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_KEY}&url=${encodeURIComponent(url)}&render_js=false&extract_rules=%7B%22text%22%3A%22body%22%7D`;
const beeRes = await fetch(beeUrl);
const rawData = await beeRes.json();
const pageText = (rawData.text || "").substring(0, 5000);
// 2. AI Extraction with specific Business Rules
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const prompt = `
Analyze this product page text: "${pageText}"
Return ONLY a JSON object:
{
"name": "string",
"price_usd": number,
"image_url": "string",
"weight_kg": number,
"category": "GADGETS" | "CLOTHING" | "GENERAL",
"is_restricted": boolean,
"reason": "string (why is it restricted?)"
}
RULES:
1. Check if the product is one of these: ${AFRIMARKET_CONFIG.RESTRICTED_KEYWORDS.join(", ")}. If yes, set is_restricted to true.
2. If price is missing, use 100. If weight is missing, estimate it (e.g., Laptop=2.5kg, Shirt=0.3kg).
`;
const aiResponse = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
});
const aiData = await aiResponse.json();
const resultText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
const jsonMatch = resultText.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("AI failed to read product");
return NextResponse.json(JSON.parse(jsonMatch[0]));
} catch (error: any) {
console.error("API Error:", error);
return NextResponse.json({ error: "Product scan failed. Try a direct product link." }, { status: 500 });
}
}