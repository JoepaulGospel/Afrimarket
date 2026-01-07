"use client";
import React, { useState } from 'react';
import {
Search, Loader2, ShieldAlert, ShoppingCart,
Globe, Package, MapPin, CheckCircle2, Info, Truck, RefreshCcw
} from 'lucide-react';
import { analyzeProduct, calculateFullQuote } from '@/lib/parser';
export default function AfrimarketCommerce() {
const [url, setUrl] = useState('');
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);
const [selectedSize, setSelectedSize] = useState('');
const handleSearch = () => {
if (!url) return;
setLoading(true);
setTimeout(() => {
// Determine Origin Hub
let origin: 'US' | 'UK' | 'CN' | 'CA' = 'US';
if (url.includes('.uk')) origin = 'UK';
else if (url.includes('taobao') || url.includes('alibaba')) origin = 'CN';
else if (url.includes('.ca')) origin = 'CA';
const risk = analyzeProduct(url);
// Data extracted from the foreign link (Mocked for now)
const extractedData = {
name: "Premium International Merchandise",
seller: url.includes('amazon') ? "Amazon Global" : "Global Merchant",
image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
priceUsd: 125.00,
weightKg: 1.5,
category: 'GADGETS' as const,
sizes: ['S', 'M', 'L', 'XL'],
};
const pricing = calculateFullQuote(
extractedData.priceUsd,
extractedData.weightKg,
origin,
extractedData.category,
'LAGOS'
);
setResult({ ...extractedData, origin, ...risk, pricing });
setLoading(false);
}, 1500);
};
const resetSearch = () => {
setResult(null);
setUrl('');
};
return (
<main className="min-h-screen bg-[#F8F9FB] pb-20 text-slate-900 font-sans">
{/* Header */}
<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
<div className="max-w-7xl mx-auto flex justify-between items-center">
<div className="flex items-center gap-2">
<div className="bg-indigo-600 p-2 rounded-xl text-white font-bold italic shadow-lg shadow-indigo-200">M</div>
<span className="font-black text-xl tracking-tighter italic">AFRIMARKET</span>
</div>
<div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
<span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full"><Globe size={12}/> Global Node</span>
</div>
</div>
</nav>
<div className="max-w-6xl mx-auto px-6 pt-12">
{/* Search Section */}
<section className="max-w-2xl mx-auto text-center mb-16 space-y-6">
<h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">The World is your<br/>Local Market.</h1>
<div className="relative">
<input
className="w-full p-6 bg-white border-2 border-slate-100 rounded-[2rem] outline-none focus:border-indigo-600 transition-all shadow-xl shadow-indigo-100/10 text-slate-900 pr-40"
placeholder="Paste Amazon, Zara, or Taobao link..."
value={url}
onChange={(e) => setUrl(e.target.value)}
/>
<button onClick={handleSearch} className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 text-white rounded-[1.5rem] font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
{loading ? <Loader2 className="animate-spin" /> : <><Search size={18} /> Analyze</>}
</button>
</div>
</section>
{result && (
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
{/* Left: Product & Logistics */}
<div className="lg:col-span-7 space-y-6">
<div className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
<img src={result.image} className="w-full h-[400px] object-contain rounded-[2rem] bg-slate-50 p-8" alt="Product" />
</div>
<div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex justify-between items-center shadow-sm">
<div className="text-center">
<div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-2">
<MapPin size={20} />
</div>
<p className="text-[10px] font-black text-slate-400 uppercase">Origin Hub</p>
<p className="font-bold text-sm">{result.origin}</p>
</div>
<div className="flex-1 h-[2px] bg-slate-100 mx-4 relative">
<Truck className="absolute -top-3 left-1/2 -translate-x-1/2 text-indigo-200" size={24} />
</div>
<div className="text-center">
<div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-2">
<Package size={20} />
</div>
<p className="text-[10px] font-black text-slate-400 uppercase">Destination</p>
<p className="font-bold text-sm">Nigeria</p>
</div>
</div>
</div>
{/* Right: Checkout & Details */}
<div className="lg:col-span-5 space-y-6">
<div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8">
<div>
<div className="flex justify-between items-start mb-4">
<span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500 tracking-tighter">
Global Import
</span>
<span className="text-green-600 text-xs font-bold flex items-center gap-1">
<CheckCircle2 size={14}/> Verified
</span>
</div>
<h2 className="text-2xl font-black text-slate-900 leading-tight mb-2">{result.name}</h2>
<p className="text-slate-400 text-sm font-medium italic">Provider: {result.seller}</p>
</div>
<div className="bg-[#F8F9FB] p-8 rounded-[2rem] space-y-4 border border-slate-100">
<div className="flex justify-between text-sm">
<span className="text-slate-500 font-medium">Item Value</span>
<span className="text-slate-900 font-bold">₦{result.pricing.itemNgn.toLocaleString()}</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-slate-500 font-medium flex items-center gap-1">Shipping Cost <Info size={12}/></span>
<span className="text-slate-900 font-bold">₦{result.pricing.shipNgn.toLocaleString()}</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-slate-500 font-medium">Duties & Local</span>
<span className="text-slate-900 font-bold">₦{(result.pricing.dutyNgn + result.pricing.localDeliveryNgn).toLocaleString()}</span>
</div>
<div className="pt-4 border-t border-slate-200 flex justify-between items-center">
<span className="text-slate-900 font-black">Total (NGN)</span>
<span className="text-indigo-600 font-black text-3xl tracking-tighter">₦{result.pricing.total.toLocaleString()}</span>
</div>
</div>
{result.isRestricted && (
<div className="p-4 bg-red-50 text-red-700 rounded-2xl flex gap-3">
<ShieldAlert className="shrink-0" />
<p className="text-xs font-bold leading-tight">{result.reason}</p>
</div>
)}
<button
disabled={result.isRestricted}
className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:grayscale"
>
<ShoppingCart size={20} /> Checkout Locally
</button>
<button onClick={resetSearch} className="w-full flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-indigo-500">
<RefreshCcw size={14} /> Analyze Another Link
</button>
</div>
</div>
</div>
)}
</div>
</main>
);
}