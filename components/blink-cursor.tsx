"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface BlinkCursorProps {
  /** Whether the cursor glyph renders at all. Default true (always-on terminal cursor). */
  show?: boolean
  /** Reserve the glyph's width even when hidden, so hover-triggered cursors don't shift layout. */
  reserveSpace?: boolean
  color?: string
  /** CSS animation-duration, e.g. "0.8s". */
  speed?: string
  className?: string
}

/**
 * Shared blinking block-cursor (`█`), used across the boot sequence, hero terminal
 * line, and nav hover indicator. Under prefers-reduced-motion it renders as a static
 * (non-blinking) glyph rather than disappearing, so the affordance survives.
 */
export function BlinkCursor({ show = true, reserveSpace = false, color, speed = "0.9s", className }: BlinkCursorProps) {
  const reducedMotion = useReducedMotion()

  const cursor = show ? (
    <span
      className={className}
      style={{
        display: "inline-block",
        color,
        animation: reducedMotion ? undefined : `blink ${speed} step-start infinite`,
      }}
    >
      █
    </span>
  ) : null

  if (reserveSpace) {
    return <span style={{ display: "inline-block", width: "0.6em" }}>{cursor}</span>
  }

  return cursor
}
