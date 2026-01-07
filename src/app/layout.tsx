import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })
export const metadata = {
title: 'Afrimarket | Global Link Concierge',
description: 'Shop global, deliver local.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className={jakarta.className}>{children}</body>
</html>
)
}
