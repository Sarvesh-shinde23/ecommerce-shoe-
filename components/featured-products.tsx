"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import { ShoppingBag } from "lucide-react"

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Urban Runner Pro",
    price: 129.99,
    image: "/modern-running-shoe.jpg",
    category: "Running",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Classic Leather",
    price: 159.99,
    image: "/premium-leather-shoe.jpg",
    category: "Casual",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Trail Blazer",
    price: 149.99,
    image: "/hiking-trail-shoe.jpg",
    category: "Outdoor",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Minimalist Slip-On",
    price: 99.99,
    image: "/minimalist-slip-on-shoe.jpg",
    category: "Casual",
    rating: 4.6,
  },
]

interface FeaturedProductsProps {
  onAddToCart: (product: any) => void
}

export default function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collection</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked shoes for every occasion. Discover quality, comfort, and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <ProductCard product={product} isHovered={hoveredId === product.id} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:bg-accent/90 transition font-medium">
            <ShoppingBag className="w-4 h-4" />
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}
