"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { BlinkCursor } from "@/components/blink-cursor"
import { crtEase, staggerContainer, staggerItem } from "@/lib/motion"

const MORE_ITEMS = [
  { label: "SKILLS", href: "/skills" },
  { label: "EDUCATION", href: "/education" },
  { label: "CERTIFICATIONS", href: "/certifications" },
  { label: "PROJECTS", href: "/projects" },
]
const MORE_PATHS = MORE_ITEMS.map((i) => i.href)

const PRIMARY_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/#experience" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
]

const MOBILE_LINKS = [
  ...PRIMARY_ITEMS.map((i) => ({ ...i, key: i.label as string | null })),
  ...MORE_ITEMS.map((i) => ({ ...i, key: null as string | null })),
]

interface NavLinkProps {
  href: string
  label: string
  sectionKey: string
  isActive: boolean
  hovered: string | null
  onHoverChange: (v: string | null) => void
  onClick?: () => void
}

function NavLink({ href, label, sectionKey, isActive, hovered, onHoverChange, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => onHoverChange(sectionKey)}
      onMouseLeave={() => onHoverChange(null)}
      className="relative transition-all duration-100"
      style={{
        color: isActive ? "var(--crt-brown-bright)" : hovered === sectionKey ? "var(--crt-brown)" : "var(--crt-brown-dim)",
        textShadow: isActive ? "var(--crt-glow-sm)" : "none",
      }}
    >
      {isActive ? `[ ${label} ]` : label}
      <BlinkCursor show={hovered === sectionKey && !isActive} reserveSpace speed="0.8s" />
    </Link>
  )
}

interface CRTNavProps {
  onPlayClick?: () => void
}

export function CRTNav({ onPlayClick }: CRTNavProps) {
  const pathname = usePathname()
  const [clicked, setClicked] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => setClicked(null), [pathname])

  const active =
    MORE_PATHS.includes(pathname) ? "MORE" :
    pathname === "/" ? (clicked ?? "HOME") : null

  useEffect(() => {
    if (!moreOpen) return
    function onClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMoreOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("mousedown", onClickOutside)
      document.removeEventListener("keydown", onEscape)
    }
  }, [moreOpen])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 font-mono"
      style={{ borderBottom: "1px solid var(--crt-border-col)" }}
    >
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ background: "rgba(18,13,6,0.96)", backdropFilter: "blur(2px)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onPlayClick}
            aria-label="Play"
            className="cursor-pointer crt-hover-tint transition-all duration-100"
            style={{ color: "var(--crt-brown-bright)", fontSize: "1.6rem", lineHeight: 1, padding: "2px 6px" }}
          >
            ▶
          </button>
          <Link
            href="/"
            className="glow"
            style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "1.6rem" }}
          >
            KRISHNA.DEV
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs tracking-widest">
          {PRIMARY_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              sectionKey={item.label}
              isActive={active === item.label}
              hovered={hovered}
              onHoverChange={setHovered}
              onClick={() => setClicked(item.label)}
            />
          ))}

          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((o) => !o)}
              onMouseEnter={() => setHovered("MORE")}
              onMouseLeave={() => setHovered(null)}
              className="relative transition-all duration-100"
              style={{
                color: active === "MORE" ? "var(--crt-brown-bright)" : hovered === "MORE" ? "var(--crt-brown)" : "var(--crt-brown-dim)",
                textShadow: active === "MORE" ? "var(--crt-glow-sm)" : "none",
              }}
            >
              {active === "MORE" ? "[ MORE ▾ ]" : "MORE ▾"}
              <BlinkCursor show={hovered === "MORE" && active !== "MORE"} reserveSpace speed="0.8s" />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.15, ease: crtEase }}
                  style={{
                    background: "rgba(18,13,6,0.97)",
                    border: "1px solid var(--crt-border-col)",
                    transformOrigin: "top",
                  }}
                  className="absolute top-full right-0 mt-2 py-2 min-w-[180px]"
                >
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      onMouseEnter={() => setHovered(item.label)}
                      onMouseLeave={() => setHovered(null)}
                      className="block px-4 py-2 transition-all duration-100"
                      style={{
                        color: pathname === item.href ? "var(--crt-brown-bright)" : hovered === item.label ? "var(--crt-brown)" : "var(--crt-brown-dim)",
                        textShadow: pathname === item.href ? "var(--crt-glow-sm)" : "none",
                      }}
                    >
                      {pathname === item.href ? `[ ${item.label} ]` : item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs" style={{ color: "var(--crt-brown-dim)" }}>
          <span className="crt-status-dot" style={{ width: "0.5rem", height: "0.5rem" }} />
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: crtEase }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(18,13,6,0.97)", borderTop: "1px solid var(--crt-border-col)" }}
          >
            <motion.div
              className="px-6 py-4 space-y-3 text-sm tracking-widest"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {MOBILE_LINKS.map((item) => {
                const isActive = item.key ? active === item.key : pathname === item.href
                return (
                  <motion.div key={item.label} variants={staggerItem}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (item.key) setClicked(item.key)
                        setMenuOpen(false)
                      }}
                      className="block"
                      style={{ color: isActive ? "var(--crt-brown-bright)" : "var(--crt-brown-dim)" }}
                    >
                      {">"} {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
