"use client";
import React, { useState } from 'react';
import { Search, Loader2, ShieldAlert, ShoppingCart, Globe, Truck, ArrowRight, X, Info } from 'lucide-react';
import { analyzeLink, calculateFullQuote } from '../lib/parser';
export default function AfrimarketSovereign() {
const [url, setUrl] = useState('');
const [loading, setLoading] = useState(false);
const [product, setProduct] = useState<any>(null);
const handleMagicDetection = () => {
if (!url) return;
setLoading(true);
setTimeout(() => {
const { origin, isRestricted, restrictedItem, safeTitle } = analyzeLink(url);
// Automatic detection simulation
const priceUsd = 149.99;
const weight = 1.8;
const category = 'GADGETS';
const pricing = calculateFullQuote(priceUsd, weight, origin, category);
setProduct({
name: safeTitle.toUpperCase(),
image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000",
origin,
isRestricted,
restrictedItem,
pricing,
url
});
setLoading(false);
}, 2000);
};
return (
<main className="min-h-screen bg-white text-[#1d1d1f] antialiased">
{/* Apple-style minimalist nav */}
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-black/5 px-8 py-4 flex justify-between items-center">
<span className="font-black italic text-xl tracking-tighter">AFRIMARKET</span>
<div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
<span>Global Fulfillment Node</span>
</div>
</nav>
<div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
{!product && !loading && (
<div className="max-w-3xl mx-auto text-center space-y-12 py-20 animate-in fade-in zoom-in-95 duration-1000">
<h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85]">
Anything. <br/><span className="text-zinc-200">Imported.</span>
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
className="mt-8 px-16 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-3 mx-auto"
>
Scan Product <ArrowRight size={20}/>
</button>
</div>
</div>
)}
{loading && (
<div className="py-40 text-center space-y-6 animate-in fade-in duration-500">
<div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
<p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">Scanning Global Inventories</p>
</div>
)}
{product && !loading && (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
<div className="relative">
<div className="bg-[#f5f5f7] rounded-[4rem] p-12 aspect-square flex items-center justify-center overflow-hidden border border-black/5">
<img src={product.image} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 hover:scale-110" alt="Product" />
<button onClick={() => setProduct(null)} className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-white shadow-sm">
<X size={20}/>
</button>
</div>
<div className="mt-10 flex justify-between items-center px-10">
<div className="text-center">
<p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Source</p>
<p className="font-bold text-sm">{product.origin} HUB</p>
</div>
<div className="flex-1 h-[1px] bg-zinc-100 mx-8"></div>
<div className="text-center">
<p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Final</p>
<p className="font-bold text-sm text-indigo-600">NIGERIA</p>
</div>
</div>
</div>
<div className="space-y-12">
<div className="space-y-4">
<h2 className="text-5xl font-bold tracking-tighter leading-tight text-slate-900">{product.name}</h2>
<div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest">
<Globe size={14}/> Verified Global Link
</div>
</div>
{product.isRestricted ? (
<div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] space-y-4">
<div className="flex items-center gap-3 text-red-600 font-bold">
<ShieldAlert size={24}/> <span className="uppercase tracking-widest text-xs">Security Block</span>
</div>
<p className="text-sm text-red-700/70 leading-relaxed font-medium">
Automated screening detected <strong>{product.restrictedItem}</strong>. This item cannot be imported via air freight.
</p>
</div>
) : (
<div className="space-y-10">
<div className="space-y-5 border-t border-black/5 pt-10">
<div className="flex justify-between text-base font-medium">
<span className="text-zinc-400">Global Item Value</span>
<span>₦{product.pricing.itemNgn.toLocaleString()}</span>
</div>
<div className="flex justify-between text-base font-medium">
<span className="text-zinc-400">Express Intl. Freight</span>
<span>₦{product.pricing.shipNgn.toLocaleString()}</span>
</div>
<div className="flex justify-between text-base font-medium">
<span className="text-zinc-400">Customs & Delivery</span>
<span>₦{(product.pricing.dutyNgn + product.pricing.localDeliveryNgn).toLocaleString()}</span>
</div>
<div className="flex justify-between items-end pt-8 mt-4 border-t-2 border-slate-900">
<span className="text-5xl font-bold tracking-tighter">Total NGN</span>
<span className="text-5xl font-black tracking-tighter text-indigo-600">₦{product.pricing.total.toLocaleString()}</span>
</div>
</div>
<button
onClick={() => {
const msg = `NEW ORDER\nProduct: ${product.name}\nTotal: ₦${product.pricing.total.toLocaleString()}\nLink: ${product.url}`;
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