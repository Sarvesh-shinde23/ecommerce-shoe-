"use client"

import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import Pagination3D from "@/components/pagination-3d"
import { ChevronDown } from "lucide-react"

const ALL_PRODUCTS = [
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
  {
    id: 5,
    name: "Performance Basketball",
    price: 179.99,
    image: "/basketball-shoe.jpg",
    category: "Sports",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Comfort Loafer",
    price: 119.99,
    image: "/comfort-loafer.jpg",
    category: "Casual",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Winter Boot",
    price: 189.99,
    image: "/winter-boot.jpg",
    category: "Outdoor",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Gym Trainer",
    price: 109.99,
    image: "/gym-trainer.jpg",
    category: "Sports",
    rating: 4.7,
  },
  {
    id: 9,
    name: "Elegant Dress Shoe",
    price: 199.99,
    image: "/dress-shoe.jpg",
    category: "Formal",
    rating: 4.9,
  },
  {
    id: 10,
    name: "Casual Sneaker",
    price: 89.99,
    image: "/casual-sneaker.jpg",
    category: "Casual",
    rating: 4.4,
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
    id: 12,
    name: "Summer Sandal",
    price: 79.99,
    image: "/summer-sandal.jpg",
    category: "Casual",
    rating: 4.3,
  },
]

const CATEGORIES = ["All", "Running", "Casual", "Outdoor", "Sports", "Formal"]
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "$150 - $200", min: 150, max: 200 },
  { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
]
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating" },
  { label: "Newest", value: "newest" },
]

const ITEMS_PER_PAGE = 6

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState("featured")
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = ALL_PRODUCTS.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const priceRange = PRICE_RANGES[selectedPriceRange]
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max
      return categoryMatch && priceMatch
    })

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        break
    }

    return filtered
  }, [selectedCategory, selectedPriceRange, sortBy])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredAndSortedProducts, currentPage])

  const addToCart = (product: any) => {
    setCartItems([...cartItems, { ...product, id: Math.random() }])
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(0)
  }

  const handlePriceChange = (index: number) => {
    setSelectedPriceRange(index)
    setCurrentPage(0)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(0)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation cartCount={cartItems.length} onCartClick={() => {}} />

      {/* Header */}
      <section className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Collection</h1>
          <p className="text-muted-foreground text-lg">
            Discover {filteredAndSortedProducts.length} premium shoes tailored to your style
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-20">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handlePriceChange(index)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedPriceRange === index
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Dropdown */}
            <div className="mb-8 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-card border border-border px-4 py-2 rounded-lg pr-10 cursor-pointer hover:border-accent transition"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="group"
                    >
                      <ProductCard product={product} isHovered={hoveredId === product.id} onAddToCart={addToCart} />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination3D currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No products found matching your filters. Try adjusting your selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
