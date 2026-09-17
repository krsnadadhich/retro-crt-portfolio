"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { crtEase } from "@/lib/motion"
import { BlinkCursor } from "@/components/blink-cursor"

const BOOT_LINES = [
  "PORTFOLIO OS v2026.1 — KRISHNA_DADHICH",
  "RAM CHECK... 16GB OK",
  "LOADING ML/DL MODULES...",
  "TENSORFLOW.EXE ........... OK",
  "NLP_CHATBOTS.EXE ......... OK",
  "COMPUTER_VISION.EXE ...... OK",
  "SIGNAL ACQUIRED [ ████████████ ] 100%",
  "WELCOME — KRISHNA DADHICH — AI ENGINEER",
  "> SYSTEM READY_",
]

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedChars, setDisplayedChars] = useState(0)
  const [done, setDone] = useState(false)
  const skippedRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem("booted")) {
      skippedRef.current = true
      setDone(true)
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    if (skippedRef.current) return

    if (currentLine >= BOOT_LINES.length) {
      setTimeout(() => {
        setDone(true)
        sessionStorage.setItem("booted", "1")
        setTimeout(onComplete, 600)
      }, 500)
      return
    }

    const line = BOOT_LINES[currentLine]
    if (displayedChars < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedChars((c) => c + 1)
      }, 18)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line])
        setCurrentLine((l) => l + 1)
        setDisplayedChars(0)
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, displayedChars, onComplete])

  const currentText =
    currentLine < BOOT_LINES.length
      ? BOOT_LINES[currentLine].slice(0, displayedChars)
      : ""

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: "var(--crt-bg)",
        zIndex: 10000,
        pointerEvents: done ? "none" : "all",
      }}
      initial={{ opacity: 0, scaleY: 0.01 }}
      animate={
        done
          ? { opacity: 0, scaleY: 0.01, transition: { duration: 0.35, ease: crtEase } }
          : { opacity: 1, scaleY: 1, transition: { duration: 0.5, ease: crtEase } }
      }
    >
      {/* Power-off flash */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "var(--crt-amber)", zIndex: 10001 }}
        animate={done ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
        transition={{ duration: 0.35, ease: crtEase }}
      />

      {/* Degauss wobble on mount */}
      <motion.div
        className="w-full max-w-2xl px-8 font-mono"
        initial={{ x: 8, skewX: -3 }}
        animate={{ x: [8, -6, 4, -2, 0], skewX: [-3, 2, -1, 0.5, 0] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mb-8 text-center">
          <div
            className="text-5xl glow"
            style={{ fontFamily: "var(--font-vt323), monospace", letterSpacing: "0.1em" }}
          >
            KRSNADADHICH
          </div>
          <div className="text-xs glow-dim mt-1 tracking-widest">
            AI ENGINEER
          </div>
        </div>

        <div className="space-y-1 text-sm">
          {lines.map((line, i) => (
            <div key={i} className="glow-sm" style={{ color: "var(--crt-brown)" }}>
              {line}
            </div>
          ))}
          {currentLine < BOOT_LINES.length && (
            <div className="glow-sm" style={{ color: "var(--crt-brown-bright)" }}>
              {currentText}
              <BlinkCursor color="var(--crt-brown-bright)" speed="0.8s" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
