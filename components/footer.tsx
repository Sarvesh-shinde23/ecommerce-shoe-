"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold">S</span>
              </div>
              <span className="font-bold text-lg">StepStyle</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium footwear with cutting-edge 3D visualization technology. Discover comfort, style, and quality in
              every step.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-accent transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Newsletter</h3>
            <p className="text-sm text-primary-foreground/70 mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-accent text-accent-foreground px-3 py-2 rounded-lg hover:bg-accent/90 transition">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          {/* Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-primary-foreground/70">© 2025 StepStyle. All rights reserved.</p>

            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-accent transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-accent transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
