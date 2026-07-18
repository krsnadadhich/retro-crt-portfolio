"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * Site-wide cursor-reactive phosphor glow. Fixed to the viewport (not a page section)
 * and composited with a brightening blend mode + high z-index, same layering approach
 * as the scanline/vignette/noise CRT effects — the only way the glow can show through
 * the many sections that have their own opaque backgrounds.
 */
export function CursorHalo() {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    let frame: number | null = null
    const onMove = (e: PointerEvent) => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--mx", `${e.clientX}px`)
        ref.current?.style.setProperty("--my", `${e.clientY}px`)
        frame = null
      })
    }
    window.addEventListener("pointermove", onMove)
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9995,
        mixBlendMode: "screen",
        background: "radial-gradient(circle at var(--mx, 50%) var(--my, 20%), rgba(255,140,0,0.12), transparent 35%)",
      }}
    />
  )
}
