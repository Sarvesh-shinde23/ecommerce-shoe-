"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ShoeViewer3D from "@/components/shoe-viewer-3d"
import ProductCard from "@/components/product-card"
import { Star, Heart, Share2, Truck, RotateCcw, Shield } from "lucide-react"

const PRODUCT_DETAILS: Record<string, any> = {
  "1": {
    id: 1,
    name: "Urban Runner Pro",
    price: 129.99,
    image: "/modern-running-shoe.jpg",
    category: "Running",
    rating: 4.8,
    reviews: 324,
    description:
      "Experience ultimate comfort and performance with the Urban Runner Pro. Engineered for daily running with responsive cushioning and breathable mesh upper.",
    specs: {
      Material: "Mesh + Synthetic",
      Weight: "280g",
      Drop: "10mm",
      Cushioning: "EVA Foam",
      Fit: "True to Size",
    } as Record<string, string>,
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Blue", hex: "#0066FF" },
      { name: "Red", hex: "#FF0000" },
    ],
    inStock: true,
  },
}

const RELATED_PRODUCTS = [
  {
    id: 5,
    name: "Performance Basketball",
    price: 179.99,
    image: "/basketball-shoe.jpg",
    category: "Sports",
    rating: 4.9,
  },
  {
    id: 11,
    name: "Trail Runner",
    price: 139.99,
    image: "/trail-runner.jpg",
    category: "Running",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Trail Blazer",
    price: 149.99,
    image: "/hiking-trail-shoe.jpg",
    category: "Outdoor",
    rating: 4.7,
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCT_DETAILS[params.id] || PRODUCT_DETAILS["1"]
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const addToCart = () => {
    console.log(`Added ${quantity} of ${product.name} in ${selectedColor.name}, size ${selectedSize}`)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation cartCount={0} onCartClick={() => {}} />

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 3D Viewer */}
          <div className="h-96 lg:h-[600px] rounded-lg overflow-hidden">
            <ShoeViewer3D />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-accent font-medium text-sm mb-2">{product.category}</p>
                  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-lg transition ${
                    isWishlisted ? "bg-accent/20 text-accent" : "bg-secondary hover:bg-accent/10"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-4xl font-bold text-accent mb-2">${product.price}</p>
                <p className="text-muted-foreground">Free shipping on orders over $100</p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-lg border-2 transition ${
                        selectedColor.name === color.name ? "border-accent" : "border-border"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{selectedColor.name}</p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border transition ${
                        selectedSize === size
                          ? "bg-accent text-accent-foreground border-accent"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={addToCart}
                className="w-full bg-accent text-accent-foreground py-4 rounded-lg hover:bg-accent/90 transition font-semibold text-lg"
              >
                Add to Cart
              </button>
              <button className="w-full border border-border py-4 rounded-lg hover:bg-secondary transition font-semibold flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="bg-card p-4 rounded-lg border border-border">
                <p className="text-muted-foreground text-sm mb-2">{key}</p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <Truck className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground text-sm">On orders over $100</p>
              </div>
            </div>
            <div className="flex gap-4">
              <RotateCcw className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-muted-foreground text-sm">30-day return policy</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Secure Checkout</h3>
                <p className="text-muted-foreground text-sm">100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_PRODUCTS.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                onMouseEnter={() => setHoveredId(relatedProduct.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                <ProductCard
                  product={relatedProduct}
                  isHovered={hoveredId === relatedProduct.id}
                  onAddToCart={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
