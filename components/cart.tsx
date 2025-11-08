"use client"

import { Trash2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeItem, total } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-card border-l border-border shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                <div className="relative w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                  <p className="text-accent font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-1 hover:bg-secondary rounded transition">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-accent">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 transition font-semibold text-center"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
