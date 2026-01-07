import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })
export const metadata = {
title: 'Afrimarket | Global Concierge',
description: 'Shop anywhere, receive in Nigeria.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className={jakarta.className}>{children}</body>
</html>
)
}