'use client'
import { useState, useEffect } from 'react'
import { calculateLandedCost } from '@/lib/logistics-matrix' // Ensure this path matches your setup
export default function ProductPage({ params }) {
const [product, setProduct] = useState(null)
const [costs, setCosts] = useState(null)
useEffect(() => {
const rawData = sessionStorage.getItem('last_analyzed_product')
if (rawData) {
const data = JSON.parse(rawData)
setProduct(data)
// RUNNING THE LOGISTICS MATRIX MATH
const result = calculateLandedCost(
data.priceUSD,
data.weightKG,
data.origin,
"GADGETS" // Default category for test
)
setCosts(result)
}
}, [])
if (!product || !costs) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-zinc-500">RECOVERING METADATA...</div>
// The rest of your UI remains the same, but now uses:
// product.name, costs.totalNGN, etc.
}
