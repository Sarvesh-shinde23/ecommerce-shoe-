"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X, Search } from "lucide-react"
import Cart from "./cart"

interface NavigationProps {
  cartCount: number
  onCartClick: () => void
}

export default function Navigation({ cartCount, onCartClick }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline">StepStyle</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm hover:text-accent transition">Home</Link>
              <Link href="/products" className="text-sm hover:text-accent transition">Shop</Link>
              <Link href="#" className="text-sm hover:text-accent transition">Collections</Link>
              <Link href="#" className="text-sm hover:text-accent transition">About</Link>
              <Link href="#" className="text-sm hover:text-accent transition">Contact</Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-secondary rounded-lg transition hidden sm:block">
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setCartOpen(true)
                  onCartClick()
                }}
                className="relative p-2 hover:bg-secondary rounded-lg transition"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
              <Link href="/" className="block px-4 py-2 hover:bg-secondary rounded-lg">Home</Link>
              <Link href="/products" className="block px-4 py-2 hover:bg-secondary rounded-lg">Shop</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-secondary rounded-lg">Collections</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-secondary rounded-lg">About</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-secondary rounded-lg">Contact</Link>
            </div>
          )}
        </div>
      </nav>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
