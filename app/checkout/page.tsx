"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = total
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const finalTotal = subtotal + shipping + tax

  const handleCheckout = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-accent rounded-full" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <a
            href="/"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:bg-accent/90 transition font-semibold"
          >
            Continue Shopping
          </a>
        </div>
      </div>
      <Footer />
    </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-8">Your cart is empty</p>
            <a
              href="/products"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:bg-accent/90 transition font-semibold"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                    {/* Image */}
                    <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Size: {item.size} • Color: {item.color}
                      </p>
                      <p className="text-accent font-bold">${item.price}</p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.id)} className="p-2 hover:bg-secondary rounded transition">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>

                      <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-background rounded transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-background rounded transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-accent">${finalTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">Free shipping on orders over $100</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
