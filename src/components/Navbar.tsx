"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "หน้าแรก", href: "#hero" },
  { label: "เกี่ยวกับเรา", href: "#about" },
  { label: "สินค้า", href: "#products" },
  { label: "บริการ", href: "#services" },
  { label: "ผลงาน", href: "#portfolio" },
  { label: "ติดต่อเรา", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-primary">TRUK PHUTRAKSA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.href.replace('#', '');
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 text-sm font-medium text-gray-dark hover:text-primary transition-colors rounded-md hover:bg-gray-bg"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Language */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+66828800878"
              className="flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              <Phone className="w-4 h-4" />
              082-880-0878
            </a>
            <a
              href="#contact"
              className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              ขอใบเสนอราคา
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-dark hover:text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-light">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  const id = link.href.replace('#', '');
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-3 py-2.5 text-base font-medium text-gray-dark hover:text-primary hover:bg-gray-bg rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-light">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                ขอใบเสนอราคา
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
