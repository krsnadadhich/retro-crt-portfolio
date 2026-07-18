"use client"

import { useState } from "react"
import { MotionConfig } from "motion/react"
import { CRTOverlay } from "@/components/crt-overlay"
import { CursorHalo } from "@/components/cursor-halo"
import { CustomCursor } from "@/components/custom-cursor"
import { BootSequence } from "@/components/boot-sequence"
import { CRTNav } from "@/components/crt-nav"
import { CRTTicker } from "@/components/crt-hero"
import { CRTFooter } from "@/components/crt-footer"
import { PageTransition } from "@/components/page-transition"
import { NowPlayingWidget } from "@/components/now-playing-widget"
import { crtEase } from "@/lib/motion"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.3, ease: crtEase }}>
      <main
        className="min-h-screen"
        style={{
          background: "var(--crt-bg)",
          animation: "flicker 7s infinite",
        }}
      >
        <CRTOverlay />
        <CursorHalo />
        <CustomCursor />
        <BootSequence onComplete={() => setBooted(true)} />

        <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <CRTNav onPlayClick={() => setPlayerOpen((o) => !o)} />

          <div style={{ paddingTop: "64px" }}>
            <CRTTicker />
            <PageTransition>{children}</PageTransition>
          </div>

          <CRTFooter />
        </div>

        <NowPlayingWidget open={playerOpen} onClose={() => setPlayerOpen(false)} />
      </main>
    </MotionConfig>
  )
}
