"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useChiptunePlayer } from "@/hooks/use-chiptune-player"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

interface NowPlayingWidgetProps {
  open: boolean
  onClose: () => void
}

export function NowPlayingWidget({ open, onClose }: NowPlayingWidgetProps) {
  const reducedMotion = useReducedMotion()
  const { trackName, loopDuration, elapsed, isPlaying, play, pause, next, stop } = useChiptunePlayer()

  useEffect(() => {
    if (open) {
      play()
    } else {
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleClose = () => {
    stop()
    onClose()
  }

  const progress = loopDuration > 0 ? (elapsed / loopDuration) * 100 : 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-6 right-6 crt-border font-mono text-xs"
          style={{ background: "var(--crt-paper)", zIndex: 60, width: 260 }}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="tracking-widest glow-dim">NOW PLAYING</span>
              <button
                onClick={handleClose}
                aria-label="Close player"
                className="cursor-pointer"
                style={{ color: "var(--crt-brown-dim)" }}
              >
                ✕
              </button>
            </div>

            <div
              className="h-1.5 w-full mb-1"
              style={{ background: "var(--crt-border-col)" }}
            >
              <div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: "var(--crt-amber)",
                  boxShadow: "0 0 6px var(--crt-amber)",
                }}
              />
            </div>
            <div className="flex justify-between mb-3" style={{ color: "var(--crt-brown-dim)" }}>
              <span>{formatTime(elapsed)}</span>
              <span>{formatTime(loopDuration)}</span>
            </div>

            <div className="text-center mb-3 tracking-wider glow-sm" style={{ color: "var(--crt-brown-bright)" }}>
              ♪ {trackName} ♪
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => (isPlaying ? pause() : play())}
                className="cursor-pointer px-3 py-1"
                style={{ color: "var(--crt-brown-bright)" }}
              >
                {isPlaying ? "[ || ]" : "[ ▶ ]"}
              </button>
              <button
                onClick={next}
                className="cursor-pointer px-3 py-1"
                style={{ color: "var(--crt-brown-dim)" }}
              >
                [ ▶▶ ]
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
