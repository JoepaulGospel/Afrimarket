'use client'
import { useState } from 'react'
import {
LayoutDashboard,
Package,
ExternalLink,
CheckCircle,
Clock,
Truck,
Search,
Filter,
DollarSign
} from 'lucide-react'
export default function AdminDashboard() {
// INTERNAL SIMULATION: Active orders for the staff to process
const [orders, setOrders] = useState([
{
id: "ORD-8821",
user: "Joepaul Gospel",
product: "MacBook Pro M3 Max",
sourceUrl: "https://www.amazon.com/dp/B0CM5HCZ6T",
totalNGN: "₦4,265,000",
status: "Pending Purchase", // Options: Pending, Purchased, In-Transit, Arrived, Delivered
origin: "USA",
timestamp: "12 mins ago"
},
{
id: "ORD-8790",
user: "Sarah Chen",
product: "Sony Alpha a7R V",
sourceUrl: "https://www.bhphotovideo.com/...",
totalNGN: "₦2,100,000",
status: "In-Transit",
origin: "USA",
timestamp: "2 hours ago"
}
])
const updateStatus = (id, newStatus) => {
setOrders(orders.map(order =>
order.id === id ? { ...order, status: newStatus } : order
))
}
return (
<div className="min-h-screen bg-[#020202] text-white flex">
{/* SIDEBAR NAVIGATION */}
<aside className="w-64 border-r border-white/5 bg-black p-6 flex flex-col gap-10">
<div className="pt-4">
<h1 className="text-xl font-black italic tracking-tighter text-kb_orange uppercase">AFRIMARKET</h1>
<p className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-2">Staff Terminal v1.0</p>
</div>
<nav className="flex-1 space-y-2">
<button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl text-xs font-bold border border-white/5">
<LayoutDashboard size={16} className="text-kb_orange" /> Operations
</button>
<button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition text-xs font-bold">
<Package size={16} /> Inventory
</button>
<button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition text-xs font-bold">
<DollarSign size={16} /> Ledger
</button>
</nav>
<div className="p-4 glass rounded-2xl border-white/5 bg-white/[0.01]">
<p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">Warehouse Status</p>
<div className="space-y-2">
<div className="flex justify-between items-center text-[10px] font-bold">
<span className="text-zinc-400">USA (Houston)</span>
<span className="text-green-500">Active</span>
</div>
<div className="flex justify-between items-center text-[10px] font-bold">
<span className="text-zinc-400">China (Guangzhou)</span>
<span className="text-green-500">Active</span>
</div>
</div>
</div>
</aside>
{/* MAIN CONTENT AREA */}
<main className="flex-1 overflow-y-auto p-10">
<header className="flex justify-between items-center mb-12">
<div className="space-y-1">
<h2 className="text-3xl font-black tracking-tighter uppercase">Active <br/> Operations</h2>
<p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Awaiting Fulfillment</p>
</div>
<div className="flex gap-4">
<div className="relative">
<Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
<input type="text" placeholder="Search orders..." className="bg-white/5 border border-white/10 rounded-full pl-10 pr-6 py-3 text-xs outline-none focus:border-kb_orange transition-all" />
</div>
<button className="glass p-3 rounded-full border-white/10 hover:bg-white/5 transition-colors">
<Filter size={16} className="text-zinc-400" />
</button>
</div>
</header>
{/* ORDER GRID */}
<div className="grid grid-cols-1 gap-4">
{orders.map((order) => (
<div key={order.id} className="glass p-8 rounded-[32px] border-white/5 flex items-center justify-between group hover:border-kb_orange/20 transition-all">
<div className="flex items-center gap-8">
<div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-kb_orange/30 transition-all">
<Package size={24} className="text-zinc-500 group-hover:text-kb_orange" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-3">
<span className="text-[10px] font-mono text-kb_orange uppercase tracking-widest">{order.id}</span>
<span className="text-[8px] font-black uppercase px-2 py-0.5 bg-white/5 text-zinc-500 rounded">{order.origin}</span>
</div>
<h4 className="text-lg font-black tracking-tight uppercase leading-none">{order.product}</h4>
<p className="text-zinc-500 text-[10px] font-medium uppercase tracking-wider italic">Request by: {order.user}</p>
</div>
</div>
<div className="flex items-center gap-12">
<div className="text-right">
<p className="text-xl font-black tracking-tighter">{order.totalNGN}</p>
<p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{order.timestamp}</p>
</div>
{/* STATUS INDICATOR */}
<div className="flex flex-col items-end gap-3">
<div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border ${
order.status === 'Pending Purchase' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
'bg-green-500/10 text-green-500 border-green-500/20'
}`}>
{order.status === 'Pending Purchase' ? <Clock size={10} /> : <CheckCircle size={10} />}
{order.status}
</div>
<div className="flex gap-2">
{/* THE MAGIC BUTTON: Opens the foreign link for the admin to buy */}
<a href={order.sourceUrl} target="_blank" className="bg-white text-black p-2 rounded-lg hover:bg-kb_orange hover:text-white transition-all">
<ExternalLink size={14} />
</a>
{order.status === 'Pending Purchase' && (
<button
onClick={() => updateStatus(order.id, 'Purchased')}
className="bg-kb_orange text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
>
Confirm Purchase
</button>
)}
{order.status === 'Purchased' && (
<button
onClick={() => updateStatus(order.id, 'In-Transit')}
className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
>
Add Tracking #
</button>
)}
</div>
</div>
</div>
</div>
))}
</div>
{/* WAREHOUSE ADDRESSES GUIDE */}
<section className="mt-20 space-y-6">
<h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Infrastructure Warehouse Network</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div className="glass p-6 rounded-3xl border-white/5 space-y-4">
<div className="flex justify-between items-center">
<span className="text-[11px] font-black text-kb_orange uppercase tracking-widest">USA (Houston)</span>
<Truck size={14} className="text-zinc-600" />
</div>
<p className="text-xs font-mono text-zinc-400 leading-relaxed">
1234 Afrimarket Log Ln,<br/>
Suite 500 (ID: KB-HQ)<br/>
Houston, TX 77001
</p>
<button className="w-full py-2 bg-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Copy Address</button>
</div>
</div>
</section>
</main>
</div>
)
}
