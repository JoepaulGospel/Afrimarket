'use client'
import { useState } from 'react'
import {
Package,
Truck,
MapPin,
CheckCircle2,
Clock,
ArrowRight,
ShieldCheck,
Zap,
Globe
} from 'lucide-react'
import Link from 'next/link'
export default function UserDashboard() {
// INTERNAL SIMULATION: Items currently in the Afrimarket pipeline
const [activeShipments] = useState([
{
id: "AFR-99210",
item: "MacBook Pro M3 Max",
origin: "USA",
status: "In-Transit",
currentLocation: "Lagos Port (Clearing)",
progress: 75,
eta: "Jan 14 - Jan 16",
image: "https://images.unsplash.com/photo-1517336714460-d1bca6278c0e?q=80&w=2000"
}
])
const [orderHistory] = useState([
{ id: "AFR-98102", item: "Nike Air Max Pulse", price: "₦185,000", date: "Dec 20, 2025" }
])
return (
<div className="min-h-screen bg-dark_bg flex flex-col items-center p-6 md:p-12 animate-in fade-in duration-1000">
{/* DASHBOARD HEADER */}
<header className="w-full max-w-5xl flex justify-between items-end mb-12">
<div className="space-y-1">
<p className="text-[9px] font-black uppercase tracking-[0.4em] text-kb_orange">User Terminal</p>
<h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">My <br/> Infrastructure</h1>
</div>
<Link href="/" className="bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-kb_orange hover:text-white transition-all">
+ New Link
</Link>
</header>
<main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
{/* LEFT: ACTIVE PIPELINE */}
<div className="space-y-8">
<h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Active Pipeline</h2>
{activeShipments.map((shipment) => (
<div key={shipment.id} className="glass p-8 md:p-10 rounded-[48px] border-white/5 space-y-8 relative overflow-hidden">
<div className="flex flex-col md:flex-row justify-between gap-8">
<div className="flex gap-6">
<div className="w-20 h-20 rounded-3xl overflow-hidden border border-white/10 shrink-0">
<img src={shipment.image} className="w-full h-full object-cover opacity-60" />
</div>
<div className="space-y-1">
<span className="text-[10px] font-mono text-kb_orange uppercase tracking-widest">{shipment.id}</span>
<h3 className="text-xl font-black tracking-tight uppercase">{shipment.item}</h3>
<p className="text-zinc-500 text-xs flex items-center gap-2">
<Globe size={12} /> From {shipment.origin} to Doorstep
</p>
</div>
</div>
<div className="text-left md:text-right space-y-1">
<p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Est. Arrival</p>
<p className="text-sm font-bold text-white italic">{shipment.eta}</p>
</div>
</div>
{/* PROGRESS TRACKER (THE PULSE) */}
<div className="space-y-6">
<div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
<div
className="absolute top-0 left-0 h-full bg-kb_orange rounded-full transition-all duration-1000 shadow-[0_0_15px_#FF8C00]"
style={{ width: `${shipment.progress}%` }}
/>
</div>
<div className="grid grid-cols-4 gap-2">
{[
{ label: 'Secured', icon: CheckCircle2, done: true },
{ label: 'Warehouse', icon: Package, done: true },
{ label: 'Border', icon: Globe, done: true },
{ label: 'Doorstep', icon: Truck, done: false }
].map((step, i) => (
<div key={i} className={`flex flex-col items-center gap-2 ${step.done ? 'opacity-100' : 'opacity-20'}`}>
<step.icon size={16} className={step.done ? 'text-kb_orange' : 'text-zinc-500'} />
<span className="text-[8px] font-black uppercase tracking-tighter">{step.label}</span>
</div>
))}
</div>
</div>
<div className="bg-white/[0.02] p-5 rounded-3xl border border-white/5 flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
<p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
Current: <span className="text-white">{shipment.currentLocation}</span>
</p>
</div>
<button className="text-[9px] font-black text-kb_orange uppercase tracking-widest flex items-center gap-2 group">
View Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
</button>
</div>
</div>
))}
</div>
{/* RIGHT: ACCOUNT METRICS */}
<aside className="space-y-8">
<div className="glass p-8 rounded-[40px] space-y-6 border-white/5">
<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Security Vault</h3>
<div className="space-y-4">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
<ShieldCheck className="text-green-500" size={20} />
</div>
<div>
<p className="text-[10px] font-black uppercase text-white">Institutional Auth</p>
<p className="text-[10px] text-zinc-500">Payments via Paystack</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-2xl bg-kb_orange/10 flex items-center justify-center">
<Zap className="text-kb_orange" size={20} />
</div>
<div>
<p className="text-[10px] font-black uppercase text-white">Vibecode Engine</p>
<p className="text-[10px] text-zinc-500">AI-Powered Fulfillment</p>
</div>
</div>
</div>
</div>
<div className="space-y-4">
<h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 ml-4">Archive</h3>
{orderHistory.map(order => (
<div key={order.id} className="glass p-6 rounded-3xl border-white/5 flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
<div className="space-y-1">
<p className="text-xs font-bold uppercase tracking-tight">{order.item}</p>
<p className="text-[8px] font-mono text-zinc-600 uppercase">{order.date}</p>
</div>
<div className="text-right">
<p className="text-xs font-black">{order.price}</p>
<p className="text-[8px] font-black text-green-500 uppercase">Delivered</p>
</div>
</div>
))}
</div>
</aside>
</main>
</div>
)
}
