"use client";
import React, { useState } from 'react';
import { Search, Loader2, ShieldAlert, ShoppingCart, Globe, Info, Truck, ArrowRight, CheckCircle } from 'lucide-react';
import { analyzeProduct, calculateFullQuote, OriginKey } from '@/lib/parser';
export default function AfrimarketSovereign() {
const [url, setUrl] = useState('');
const [step, setStep] = useState<'input' | 'verify' | 'result'>('input');
const [loading, setLoading] = useState(false);
const [priceInput, setPriceInput] = useState('');
const [finalData, setFinalData] = useState<any>(null);
const startAnalysis = () => {
if (!url) return;
setLoading(true);
setTimeout(() => {
setStep('verify');
setLoading(false);
}, 1200);
};
const completeAnalysis = () => {
const origin: OriginKey = url.includes('.uk') ? 'UK' : url.includes('taobao') ? 'CN' : 'US';
const pricing = calculateFullQuote(Number(priceInput), 1.5, origin, 'GADGETS', 'LAGOS');
setFinalData({
name: "International Merchandise",
// Apple Style: Using high-quality placeholder that mimics a product shot
image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
origin,
pricing,
url
});
setStep('result');
};
return (
<main className="min-h-screen bg-white text-[#1d1d1f] antialiased">
{/* NAV */}
<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#d2d2d7]/30 px-8 py-4">
<div className="max-w-5xl mx-auto flex justify-between items-center text-sm font-semibold tracking-tight">
<div className="flex items-center gap-2 font-bold italic text-lg">AFRIMARKET</div>
<div className="flex gap-8 text-zinc-500 uppercase text-[10px] tracking-widest font-black">
<span>Global Concierge Node</span>
</div>
</div>
</nav>
<div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
{step === 'input' && (
<div className="text-center space-y-12 animate-in fade-in duration-1000">
<h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
Shop the world.<br/><span className="text-zinc-300">Delivered home.</span>
</h1>
<div className="relative max-w-2xl mx-auto">
<input
className="w-full p-8 text-xl bg-[#f5f5f7] border-none rounded-[2.5rem] outline-none focus:ring-2 ring-indigo-500/20 text-center transition-all"
placeholder="Paste Amazon, Zara, or Taobao link..."
value={url}
onChange={(e) => setUrl(e.target.value)}
/>
<button onClick={startAnalysis} className="mt-8 px-16 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 flex items-center gap-3 mx-auto shadow-2xl shadow-black/20">
{loading ? <Loader2 className="animate-spin" /> : <>Start Analysis <ArrowRight size={20}/></>}
</button>
</div>
</div>
)}
{step === 'verify' && (
<div className="max-w-md mx-auto space-y-10 animate-in slide-in-from-bottom-10 duration-700">
<div className="text-center space-y-2">
<h2 className="text-4xl font-bold tracking-tight">One Last Step.</h2>
<p className="text-zinc-400">Confirm the item price to ensure precision.</p>
</div>
<div className="space-y-6">
<div className="space-y-2">
<label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-6">Item Price (USD)</label>
<input
type="number"
className="w-full p-8 text-4xl bg-[#f5f5f7] rounded-[2.5rem] outline-none border-none text-center font-bold"
placeholder="0.00"
value={priceInput}
onChange={(e) => setPriceInput(e.target.value)}
/>
</div>
<button onClick={completeAnalysis} className="w-full py-6 bg-black text-white rounded-[2rem] font-bold text-xl shadow-xl shadow-black/10">
Generate Final Quote
</button>
</div>
</div>
)}
{step === 'result' && finalData && (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 animate-in fade-in duration-1000 items-center">
<div className="space-y-8">
<div className="bg-[#f5f5f7] rounded-[4rem] p-12 aspect-square flex items-center justify-center overflow-hidden">
<img src={finalData.image} className="w-full h-full object-contain mix-blend-multiply" alt="Product" />
</div>
<div className="flex justify-between items-center px-10">
<div className="text-center"><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Origin</p><p className="font-bold text-lg">{finalData.origin} Hub</p></div>
<div className="flex-1 border-t border-dashed border-zinc-200 mx-8"></div>
<div className="text-center"><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Dest.</p><p className="font-bold text-lg text-indigo-600">Nigeria</p></div>
</div>
</div>
<div className="space-y-12">
<div className="space-y-4">
<span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Verified by AI</span>
<h2 className="text-5xl font-bold tracking-tighter leading-tight">{finalData.name}</h2>
</div>
<div className="space-y-5 border-t border-black/5 pt-10">
<div className="flex justify-between text-sm"><span className="text-zinc-400 font-medium tracking-tight">Item Value</span><span className="font-semibold text-slate-900">₦{finalData.pricing.itemNgn.toLocaleString()}</span></div>
<div className="flex justify-between text-sm"><span className="text-zinc-400 font-medium tracking-tight">Global Logistics</span><span className="font-semibold text-slate-900">₦{finalData.pricing.shipNgn.toLocaleString()}</span></div>
<div className="flex justify-between text-sm"><span className="text-zinc-400 font-medium tracking-tight">Duties & Clearing</span><span className="font-semibold text-slate-900">₦{finalData.pricing.dutyNgn.toLocaleString()}</span></div>
<div className="flex justify-between items-end pt-6 mt-4 border-t-2 border-slate-900">
<span className="text-4xl font-bold tracking-tighter text-slate-900">Total NGN</span>
<span className="text-4xl font-black tracking-tighter text-indigo-600">₦{finalData.pricing.total.toLocaleString()}</span>
</div>
</div>
<div className="space-y-4">
<button
onClick={() => {
const message = `ORDER: ${finalData.name}\nLINK: ${finalData.url}\nTOTAL: ₦${finalData.pricing.total.toLocaleString()}`;
window.location.href = `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(message)}`;
}}
className="w-full py-6 bg-black text-white rounded-[2.5rem] font-bold text-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-2xl shadow-black/10 flex items-center justify-center gap-3"
>
<ShoppingCart size={22} /> Checkout Locally
</button>
<p className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Global fulfillment by Afrimarket Express</p>
</div>
</div>
</div>
)}
</div>
</main>
);
}