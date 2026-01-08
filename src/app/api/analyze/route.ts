import { NextRequest, NextResponse } from 'next/server';
import { AFRIMARKET_CONFIG } from '@/lib/constants';
export async function POST(req: NextRequest) {
try {
const { url } = await req.json();
const SCRAPINGBEE_KEY = process.env.SCRAPINGBEE_KEY;
const GEMINI_KEY = process.env.GEMINI_KEY;
// 1. IMPROVED SCRAPING: Use render_js=true and premium proxies for Amazon/Zara
// This makes ScrapingBee act like a real Chrome browser
const beeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_KEY}&url=${encodeURIComponent(url)}&render_js=true&premium_proxy=true&extract_rules=%7B%22text%22%3A%22body%22%7D`;
const beeRes = await fetch(beeUrl);
const rawData = await beeRes.json();
// We get the first 8000 characters to give the AI more data to work with
const pageText = (rawData.text || "").substring(0, 8000);
if (pageText.length < 200) {
return NextResponse.json({ error: "Empty page. Store might be blocking access." }, { status: 400 });
}
// 2. STRICT AI PROMPT: Tells Gemini to NOT hallucinate
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
const prompt = `
You are a precise data extractor. Extract product info from this text: "${pageText}"
Return ONLY a JSON object.
If you cannot find a clear Product Name or Price, return {"error": "not_found"}.
DO NOT MAKE UP A PRODUCT.
{
"name": "Exact Product Name",
"price_usd": number (if price is in GBP/CNY, convert to USD),
"image_url": "Main product image link",
"weight_kg": number (estimate based on item type: e.g. Phone=0.2, Laptop=2.0),
"category": "GADGETS" | "CLOTHING" | "GENERAL",
"is_restricted": boolean
}
RESTRICTION RULES: Set is_restricted to true if the item is a: ${AFRIMARKET_CONFIG.RESTRICTED_KEYWORDS.join(", ")}.
`;
const aiResponse = await fetch(geminiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
});
const aiData = await aiResponse.json();
const resultText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
const jsonMatch = resultText.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("AI parsing error");
const finalData = JSON.parse(jsonMatch[0]);
if (finalData.error) {
return NextResponse.json({ error: "Could not find an exact product on this page." }, { status: 400 });
}
return NextResponse.json(finalData);
} catch (error: any) {
return NextResponse.json({ error: "System overload. Try again in a moment." }, { status: 500 });
}
}