"use client";
import React, { useState } from 'react';
import { Search, Loader2, ShieldAlert, ShoppingCart, Globe, ArrowRight, X, CheckCircle } from 'lucide-react';
import { analyzeLink, calculateFullQuote } from '../lib/parser';
export default function AfrimarketSovereign() {
const [url, setUrl] = useState('');
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);
const handleMagicDetection = () => {
if (!url) return;
setLoading(true);
setResult(null); // Clear previous result to avoid crash
setTimeout(() => {
const analysis = analyzeLink(url);
// Select High-Res Image based on Category
let imageUrl = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000";
if (analysis.detectedCategory === 'GADGETS') imageUrl = "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000";
const pricing = calculateFullQuote(analysis.estimatedUsd, analysis.weight, analysis.origin, analysis.detectedCategory);
setResult({
name: analysis.safeTitle.toUpperCase(),
image: imageUrl,
origin: analysis.origin,
isRestricted: analysis.isRestricted,
restrictedItem: analysis.restrictedItem,
pricing,
url
});
setLoading(false);
}, 2000);
};
return (
<main className="min-h-screen bg-white text-[#1d1d1f] antialiased">
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-black/5 px-8 py-4 flex justify-between items-center">
<span className="font-black italic text-xl tracking-tighter uppercase">AFRIMARKET</span>
<div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
<span>Global Concierge Node</span>
</div>
</nav>
<div className="max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
{!result && !loading && (
<div className="max-w-3xl mx-auto space-y-12 py-20 animate-in fade-in zoom-in-95 duration-1000">
<h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85]">
Shop the world. <br/><span className="text-zinc-200">Delivered home.</span>
</h1>
<div className="relative max-w-2xl mx-auto">
<input
className="w-full p-8 text-xl bg-[#f5f5f7] border-none rounded-[2.5rem] outline-none focus:ring-4 ring-indigo-500/10 transition-all text-center font-medium placeholder:text-zinc-300"
placeholder="Paste Amazon, Zara, or Taobao link..."
value={url}
onChange={(e) => setUrl(e.target.value)}
/>
<button
onClick={handleMagicDetection}
className="mt-8 px-16 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-black/20 flex items-center gap-3 mx-auto"
>
Scan Link <ArrowRight size={20}/>
</button>
</div>
</div>
)}
{loading && (
<div className="py-40 space-y-6 animate-in fade-in duration-500">
<div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
<p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">Syncing Global Inventory</p>
</div>
)}
{result && !loading && (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left animate-in fade-in slide-in-from-bottom-12 duration-1000">
<div className="relative">
<div className="bg-[#f5f5f7] rounded-[4rem] p-12 aspect-square flex items-center justify-center overflow-hidden border border-black/5">
<img src={result.image} className="w-full h-full object-contain mix-blend-multiply" alt="Product" />
<button onClick={() => setResult(null)} className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-white shadow-sm">
<X size={20}/>
</button>
</div>
</div>
<div className="space-y-12">
<div className="space-y-4">
<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
<CheckCircle size={12}/> Verified Link Detected
</div>
<h2 className="text-5xl font-bold tracking-tighter leading-tight text-slate-900">{result.name}</h2>
</div>
{result.isRestricted ? (
<div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] space-y-4">
<div className="flex items-center gap-3 text-red-600 font-bold">
<ShieldAlert size={24}/> <span className="uppercase tracking-widest text-xs font-black">Security Stop</span>
</div>
<p className="text-sm text-red-700/70 leading-relaxed">
Automated screening flagged <strong>{result.restrictedItem}</strong>. This item cannot be cleared through Nigerian customs via air freight.
</p>
</div>
) : (
<div className="space-y-10">
<div className="space-y-5 border-t border-black/5 pt-10">
<div className="flex justify-between text-base font-medium">
<span className="text-zinc-400">Global Value</span>
<span>₦{result.pricing.itemNgn.toLocaleString()}</span>
</div>
<div className="flex justify-between text-base font-medium">
<span className="text-zinc-400">Intl. Freight ({result.origin})</span>
<span>₦{result.pricing.shipNgn.toLocaleString()}</span>
</div>
<div className="flex justify-between items-end pt-8 mt-4 border-t-2 border-slate-900">
<span className="text-5xl font-bold tracking-tighter">Total NGN</span>
<span className="text-5xl font-black tracking-tighter text-indigo-600">₦{result.pricing.total.toLocaleString()}</span>
</div>
</div>
<button
onClick={() => {
const msg = `ORDER: ${result.name}\nTOTAL: ₦${result.pricing.total.toLocaleString()}\nLINK: ${result.url}`;
window.location.href = `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(msg)}`;
}}
className="w-full py-7 bg-black text-white rounded-[2.5rem] font-bold text-2xl hover:scale-[1.02] transition-transform active:scale-95 shadow-2xl shadow-black/20 flex items-center justify-center gap-4"
>
<ShoppingCart size={24} /> Checkout Locally
</button>
</div>
)}
</div>
</div>
)}
</div>
</main>
);
}
