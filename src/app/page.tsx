"use client";
import React, { useState } from 'react';
import { Search, Loader2, ShieldAlert, ShoppingCart, ArrowRight } from 'lucide-react';
import { analyzeProduct, calculateFullQuote } from '../lib/parser';
export default function GlobalConcierge() {
const [url, setUrl] = useState('');
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);
const handleSearch = () => {
if (!url) return;
setLoading(true);
setTimeout(() => {
const risk = analyzeProduct(url);
const pricing = calculateFullQuote(100, 1.5, 'US', 'GADGETS', 'LAGOS');
setResult({ name: "International Item", origin: 'US', ...risk, pricing });
setLoading(false);
}, 1500);
};
return (
<main className="min-h-screen bg-[#fafafa] p-6 flex flex-col items-center justify-center">
<div className="w-full max-w-xl space-y-8">
<h1 className="text-4xl font-black text-center tracking-tighter">AFRIMARKET</h1>
<div className="relative group">
<input className="w-full p-5 rounded-2xl border-2 border-slate-200 outline-none focus:border-indigo-600 transition-all text-slate-900 shadow-sm" placeholder="Paste link here..." value={url} onChange={(e) => setUrl(e.target.value)} />
<button onClick={handleSearch} className="mt-4 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
{loading ? <Loader2 className="animate-spin" /> : <><Search size={18} /> Analyze Link</>}
</button>
</div>
{result && (
<div className="bg-white p-8 rounded-[32px] shadow-2xl border border-slate-100 animate-in fade-in duration-500">
<h2 className="text-xl font-bold mb-4">{result.name}</h2>
{result.isRestricted ? (
<div className="p-4 bg-red-50 text-red-700 rounded-xl flex gap-2"><ShieldAlert /> <p>{result.reason}</p></div>
) : (
<div className="space-y-3">
<div className="flex justify-between text-slate-500"><span>Total in NGN</span><span className="text-indigo-600 font-black text-2xl">₦{result.pricing.total.toLocaleString()}</span></div>
<button className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"><ShoppingCart size={18}/> Checkout Locally</button>
</div>
)}
</div>
)}
</div>
</main>
);
}
