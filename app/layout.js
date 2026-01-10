import './globals.css' // Note: If you don't have globals.css, just remove this line
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
title: 'AFRIMARKET | Global Bridge',
description: 'Creative Infrastructure for Borderless Commerce',
}
export default function RootLayout({ children }) {
return (
<html lang="en" className="dark">
<body className={`${inter.className} bg-dark_bg text-white min-h-screen antialiased`}>
{/* Stark-style background beam overlay */}
<div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-20">
<div className="absolute top-[-10%] left-[10%] w-[1px] h-[120vh] bg-kb_orange blur-[2px] rotate-12" />
<div className="absolute top-[-20%] left-[40%] w-[1px] h-[120vh] bg-white blur-[1px] rotate-12" />
</div>
<main>{children}</main>
</body>
</html>
)
}
