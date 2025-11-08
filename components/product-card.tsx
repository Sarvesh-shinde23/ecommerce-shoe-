"use client"

import Image from "next/image"
import { Star, ShoppingBag } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    category: string
    rating: number
  }
  isHovered: boolean
  onAddToCart: (product: any) => void
}

export default function ProductCard({ product, isHovered, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-64 bg-secondary overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.rating})</span>
        </div>

        {/* Price and Button */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-accent">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isHovered
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
