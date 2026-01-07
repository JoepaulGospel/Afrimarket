"use client";
import React, { useState } from 'react';
import { Search, Loader2, ShieldAlert, ShoppingCart, Globe, ArrowRight, X, AlertCircle } from 'lucide-react';
import { calculateFullQuote } from '../lib/constants';
export default function AfrimarketSovereign() {
const [url, setUrl] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [product, setProduct] = useState<any>(null);
const handleMagicScan = async () => {
if (!url.startsWith('http')) return alert("Please paste a valid product link.");
setLoading(true);
setError(null);
setProduct(null);
try {
const res = await fetch('/api/analyze', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ url }),
});
const data = await res.json();
if (data.error) throw new Error(data.error);
const origin = url.includes('.uk') ? 'UK' : url.includes('taobao') ? 'CN' : 'US';
const pricing = calculateFullQuote(data.price_usd || 100, data.weight_kg || 1.5, origin as any, data.category || 'GENERAL');
setProduct({ ...data, origin, pricing, url });
} catch (err: any) {
setError(err.message || "Failed to analyze link. Try again.");
} finally {
setLoading(false);
}
};
return (
<main className="min-h-screen bg-white text-[#1d1d1f] antialiased">
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-black/5 px-8 py-4 flex justify-between items-center">
<span className="font-black italic text-xl tracking-tighter uppercase">AFRIMARKET</span>
<div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 italic">
<span>Global Concierge Active</span>
</div>
</nav>
<div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
{!product && !loading && (
<div className="max-w-3xl mx-auto text-center space-y-12 py-20 animate-in fade-in zoom-in-95 duration-700">
<h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85]">
Shop the world. <br/><span className="text-zinc-200">Delivered home.</span>
</h1>
<div className="relative group">
<input
className="w-full p-8 text-xl bg-[#f5f5f7] border-none rounded-[2.5rem] outline-none focus:ring-4 ring-indigo-500/10 transition-all text-center font-medium placeholder:text-zinc-300"
placeholder="Paste Amazon, Zara, or Taobao link..."
value={url}
onChange={(e) => setUrl(e.target.value)}
/>
<button
onClick={handleMagicScan}
className="mt-8 px-16 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-black/20 flex items-center gap-3 mx-auto"
>
Scan Product <ArrowRight size={20}/>
</button>
{error && <p className="mt-4 text-red-500 font-bold text-sm flex items-center justify-center gap-2"><AlertCircle size={14}/> {error}</p>}
</div>
</div>
)}
{loading && (
<div className="py-40 text-center space-y-6">
<div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
<p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 italic">Syncing Global Inventory...</p>
</div>
)}
{product && !loading && (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
<div className="relative">
<div className="bg-[#f5f5f7] rounded-[4rem] p-12 aspect-square flex items-center justify-center overflow-hidden border border-black/5">
<img src={product.image_url || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000"} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-110" alt="Product" />
<button onClick={() => setProduct(null)} className="absolute top-8 right-8 p-3 bg-white/50 backdrop-blur-md rounded-full hover:bg-white shadow-sm">
<X size={20}/>
</button>
</div>
</div>
<div className="space-y-12 text-left">
<div className="space-y-4">
<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
<Globe size={12}/> AI Verified Product
</div>
<h2 className="text-5xl font-bold tracking-tighter leading-tight text-slate-900">{product.name}</h2>
</div>
{product.is_restricted ? (
<div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] space-y-4 shadow-sm">
<div className="flex items-center gap-3 text-red-600 font-bold">
<ShieldAlert size={24}/> <span className="uppercase tracking-widest text-xs font-black">Security Block</span>
</div>
<p className="text-sm text-red-700/70 leading-relaxed">
Automated screening detected restricted materials. This item cannot be imported via air freight.
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