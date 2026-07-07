"use client"

import { useState } from "react"

const NAV_ITEMS = [
  { label: "HOME",    href: "#home" },
  { label: "WORK",    href: "#work" },
  { label: "SKILLS",  href: "#skills" },
  { label: "ABOUT",   href: "#about" },
  { label: "CONTACT", href: "#contact" },
]

export function CRTNav() {
  const [active, setActive] = useState("HOME")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 font-mono"
      style={{ borderBottom: "1px solid var(--crt-border-col)" }}
    >
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: "rgba(245,237,224,0.96)", backdropFilter: "blur(2px)" }}
      >
        <a
          href="#home"
          className="flex items-center gap-3 glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "1.6rem" }}
        >
          <span style={{ color: "var(--crt-brown-bright)" }}>▶</span>
          KRISHNA.DEV
        </a>

        <div className="hidden md:flex items-center gap-6 text-xs tracking-widest">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className="transition-all duration-100"
              style={{
                color: active === item.label ? "var(--crt-brown-bright)" : "var(--crt-brown-dim)",
                textShadow: active === item.label ? "var(--crt-glow-sm)" : "none",
              }}
            >
              {active === item.label ? `[ ${item.label} ]` : item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs" style={{ color: "var(--crt-brown-dim)" }}>
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "var(--crt-amber)",
              boxShadow: "0 0 6px var(--crt-amber)",
              animation: "blink 2s step-start infinite",
            }}
          />
          ONLINE
        </div>

        <button
          className="md:hidden text-xs tracking-widest glow-sm"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ color: "var(--crt-brown)" }}
        >
          {menuOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 space-y-3 text-sm tracking-widest"
          style={{ background: "rgba(245,237,224,0.99)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => { setActive(item.label); setMenuOpen(false) }}
              className="block"
              style={{ color: active === item.label ? "var(--crt-brown-bright)" : "var(--crt-brown-dim)" }}
            >
              {">"} {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
