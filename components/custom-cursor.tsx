"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const INTERACTIVE_SELECTOR = "a, button, [role='button'], .cursor-pointer"
const TEXT_SELECTOR = "input, textarea, select, [contenteditable='true']"

/**
 * Custom amber crosshair cursor replacing the native arrow on fine-pointer devices.
 * Snaps into a `[ o ]` bracket frame over links/buttons/cards, echoing the site's
 * "[ HOME ]" nav bracket motif. Falls back to the native cursor on touch devices,
 * text inputs (need the real I-beam), and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches)
  }, [])

  useEffect(() => {
    if (!enabled || reducedMotion) return

    document.documentElement.classList.add("custom-cursor-active")

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as Element
      setHidden(!!target.closest(TEXT_SELECTOR))
      setHovering(!!target.closest(INTERACTIVE_SELECTOR))
    }
    const onLeaveWindow = () => setHidden(true)
    const onEnterWindow = () => setHidden(false)

    window.addEventListener("pointermove", onMove)
    document.documentElement.addEventListener("mouseleave", onLeaveWindow)
    document.documentElement.addEventListener("mouseenter", onEnterWindow)
    return () => {
      document.documentElement.classList.remove("custom-cursor-active")
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow)
      document.documentElement.removeEventListener("mouseenter", onEnterWindow)
    }
  }, [enabled, reducedMotion, x, y])

  if (!enabled || reducedMotion) return null

  return (
    <>
      <style>{`
        html.custom-cursor-active, html.custom-cursor-active * {
          cursor: none !important;
        }
        html.custom-cursor-active input,
        html.custom-cursor-active textarea,
        html.custom-cursor-active select,
        html.custom-cursor-active [contenteditable='true'] {
          cursor: auto !important;
        }
      `}</style>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[10001] -translate-x-1/2 -translate-y-1/2 font-mono"
        style={{
          left: springX,
          top: springY,
          opacity: hidden ? 0 : 1,
        }}
      >
        {hovering ? (
          <div
            className="flex items-center gap-1 text-sm tracking-wider"
            style={{ color: "var(--crt-amber)", textShadow: "var(--crt-glow-sm)" }}
          >
            <span>[</span>
            <span
              className="inline-block rounded-full"
              style={{ width: 5, height: 5, background: "var(--crt-amber)", boxShadow: "var(--crt-glow-sm)" }}
            />
            <span>]</span>
          </div>
        ) : (
          <div className="relative" style={{ width: 20, height: 20 }}>
            <span
              className="absolute left-1/2 top-0 -translate-x-1/2"
              style={{ width: 1, height: 6, background: "var(--crt-amber)" }}
            />
            <span
              className="absolute left-1/2 bottom-0 -translate-x-1/2"
              style={{ width: 1, height: 6, background: "var(--crt-amber)" }}
            />
            <span
              className="absolute top-1/2 left-0 -translate-y-1/2"
              style={{ width: 6, height: 1, background: "var(--crt-amber)" }}
            />
            <span
              className="absolute top-1/2 right-0 -translate-y-1/2"
              style={{ width: 6, height: 1, background: "var(--crt-amber)" }}
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 3, height: 3, background: "var(--crt-amber)", boxShadow: "var(--crt-glow-sm)" }}
            />
          </div>
        )}
      </motion.div>
    </>
  )
}
