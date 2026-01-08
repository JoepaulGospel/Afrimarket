"use client";
import React, { useState } from 'react';
import { ShieldAlert, ShoppingCart, ArrowRight, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { calculateFullQuote } from '../lib/constants';
export default function AfrimarketSovereign() {
const [url, setUrl] = useState('');
const [loading, setLoading] = useState(false);
const [product, setProduct] = useState<any>(null);
const getOrigin = (link: string) => {
if (link.includes('.uk')) return 'UK';
if (link.includes('.ca')) return 'CA';
if (link.includes('taobao') || link.includes('alibaba')) return 'CN';
return 'US';
};
const handleMagicScan = async () => {
if (!url.startsWith('http')) return alert("Please paste a valid product link");
setLoading(true);
setProduct(null);
try {
const res = await fetch('/api/analyze', { method: 'POST', body: JSON.stringify({ url }) });
const data = await res.json();
if (data.error) throw new Error(data.error);
const origin = getOrigin(url);
const pricing = calculateFullQuote(
data.price_usd || 100,
data.weight_kg || 1.5,
origin as any,
data.category || 'GENERAL'
);
setProduct({ ...data, origin, pricing, url });
} catch (err) {
alert("This link couldn't be scanned. Try a common store like Amazon or Zara.");
} finally {
setLoading(false);
}
};
return (
<main className="min-h-screen bg-white text-[#1d1d1f] antialiased">
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-black/5 px-8 py-4 flex justify-between items-center">
<span className="font-black italic text-xl tracking-tighter uppercase">AFRIMARKET</span>
<span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Global Hub</span>
</nav>
<div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
{!product && !loading && (
<div className="max-w-3xl mx-auto text-center space-y-12 py-20">
<h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85]">
Shop the world.<br/><span className="text-zinc-200">Delivered home.</span>
</h1>
<div className="relative">
<input
className="w-full p-8 text-xl bg-[#f5f5f7] border-none rounded-[2.5rem] outline-none text-center font-medium"
placeholder="Paste Amazon, Zara, or Taobao link..."
value={url}
onChange={(e) => setUrl(e.target.value)}
/>
<button onClick={handleMagicScan} className="mt-8 px-16 py-5 bg-black text-white rounded-full font-bold text-lg shadow-2xl flex items-center gap-3 mx-auto transition-transform active:scale-95">
Scan Product <ArrowRight size={20}/>
</button>
</div>
</div>
)}
{loading && (
<div className="py-40 text-center space-y-8 animate-pulse">
<div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
<p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">Analyzing Global Logistics</p>
</div>
)}
{product && !loading && (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center animate-in fade-in slide-in-from-bottom-12 duration-700">
<div className="relative bg-[#f5f5f7] rounded-[4rem] p-12 aspect-square flex items-center justify-center border border-black/5 overflow-hidden">
<img src={product.image_url || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000"} className="w-full h-full object-contain mix-blend-multiply" />
<button onClick={() => setProduct(null)} className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur-md rounded-full"><X size={20}/></button>
</div>
<div className="space-y-12">
<div className="space-y-4">
<div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${product.is_restricted ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
{product.is_restricted ? <ShieldAlert size={12}/> : <CheckCircle size={12}/>}
{product.is_restricted ? 'Restricted Item' : 'AI Verified'}
</div>
<h2 className="text-5xl font-bold tracking-tighter leading-tight">{product.name}</h2>
</div>
{product.is_restricted ? (
<div className="p-8 bg-red-50 rounded-[2.5rem] border border-red-100 space-y-4">
<div className="flex items-center gap-2 text-red-700 font-bold uppercase text-xs tracking-widest"><AlertTriangle size={18} /> Shipping Alert</div>
<p className="text-red-900 font-medium text-lg leading-relaxed">
This item ({product.reason || 'contraband'}) cannot be shipped to Nigeria due to logistics regulations.
</p>
<button onClick={() => setProduct(null)} className="text-red-700 font-bold underline">Try another product</button>
</div>
) : (
<div className="space-y-10">
<div className="space-y-5 border-t border-black/5 pt-10">
<div className="flex justify-between text-base font-medium"><span className="text-zinc-400">Origin</span><span className="font-bold italic">{product.origin}</span></div>
<div className="flex justify-between text-base font-medium"><span className="text-zinc-400">Weight</span><span className="font-bold italic">{product.weight_kg} kg</span></div>
<div className="flex justify-between text-base font-medium"><span className="text-zinc-400">Delivery to Nigeria</span><span className="font-bold italic">₦{product.pricing?.total?.toLocaleString()}</span></div>
<div className="flex justify-between items-end pt-8 mt-4 border-t-2 border-slate-900"><span className="text-5xl font-bold tracking-tighter">Total</span><span className="text-5xl font-black tracking-tighter text-indigo-600">₦{product.pricing?.total?.toLocaleString()}</span></div>
</div>
<button
onClick={() => window.location.href = `https://wa.me/234XXXXXXXXXX?text=NEW ORDER: ${product.name}\nTOTAL: ₦${product.pricing?.total?.toLocaleString()}\nLINK: ${url}`}
className="w-full py-7 bg-black text-white rounded-[2.5rem] font-bold text-2xl shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-95"
>
<ShoppingCart size={24} /> Checkout via WhatsApp
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
