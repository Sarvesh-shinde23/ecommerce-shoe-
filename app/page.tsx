"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"

export default function Home() {
  const { addItem } = useCart()

  const addToCart = (product: any) => {
    addItem({
      id: Math.random().toString(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "10",
      color: "Black",
      quantity: 1,
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedProducts onAddToCart={addToCart} />
      <Footer />
    </main>
  )
}
