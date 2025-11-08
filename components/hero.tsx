"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(200, 150, 100, 0.1)")
      gradient.addColorStop(1, "rgba(100, 150, 200, 0.1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated circles
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 5) * (i + 1) + Math.sin(time + i) * 50
        const y = canvas.height / 2 + Math.cos(time + i) * 50
        const radius = 30 + Math.sin(time + i) * 10

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200, 150, 100, ${0.3 + Math.sin(time + i) * 0.2})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6 inline-block">
          <span className="text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-full">
            New Collection 2025
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Step Into Style</h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Experience premium footwear with cutting-edge 3D visualization. Explore our collection and find your perfect
          pair.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium"
          >
            Shop Now
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button className="inline-flex items-center justify-center gap-2 border border-border px-8 py-3 rounded-lg hover:bg-secondary transition font-medium">
            View Collection
          </button>
        </div>
      </div>
    </section>
  )
}
