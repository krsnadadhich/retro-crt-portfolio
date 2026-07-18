"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function CRTOverlay() {
  const noiseRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canvas = noiseRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let frame = 0

    const drawNoise = () => {
      frame++
      if (frame % 3 !== 0) {
        animId = requestAnimationFrame(drawNoise)
        return
      }

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() < 0.025 ? Math.random() * 50 : 0
        data[i]     = 200 + noise * 0.6
        data[i + 1] = 110 + noise * 0.3
        data[i + 2] = noise * 0.05
        data[i + 3] = noise * 2
      }

      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(drawNoise)
    }

    drawNoise()
    return () => cancelAnimationFrame(animId)
  }, [reducedMotion])

  return (
    <>
      <div
        className="crt-scanlines crt-vignette fixed inset-0 pointer-events-none"
        style={{ zIndex: 9997 }}
        aria-hidden="true"
      />
      <canvas
        ref={noiseRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9996, mixBlendMode: "screen", opacity: 0.4 }}
        aria-hidden="true"
      />
    </>
  )
}

