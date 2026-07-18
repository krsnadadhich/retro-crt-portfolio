"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { BlinkCursor } from "@/components/blink-cursor"
import { crtEase } from "@/lib/motion"

/** One-time glitch duplicate flashing over the real headline text as it settles in. */
function GlitchHeadline({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span>{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ color: "var(--crt-amber)" }}
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{
          opacity: [0, 0.7, 0],
          clipPath: ["inset(0 0 100% 0)", "inset(40% 0 50% 0)", "inset(0 0 100% 0)"],
          x: [0, -4, 0],
        }}
        transition={{ duration: 0.3, delay: 0.55, times: [0, 0.5, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

const TICKER_ITEMS = [
  "▶ AI DEVELOPER — PYTHON • TENSORFLOW • NLP • COMPUTER VISION",
  "◆ BUILDING ML/DL SOLUTIONS — RAG PIPELINES • CHATBOTS • PREDICTIVE MODELS",
  "▶ OPEN TO NEW OPPORTUNITIES — BENGALURU, INDIA",
  "◆ RECENT: OFFLINE RAG ASSISTANT • BANKING CHATBOT • FACE RECOGNITION SYSTEM",
  "▶ TECH STACK: TENSORFLOW • SCIKIT-LEARN • FLASK • MYSQL",
  "◆ EXPERTISE: NLP • COMPUTER VISION • DATA PREPROCESSING • MODEL EVALUATION",
  "▶ CONTACT: krsnadadhich@gmail.com — 09521409593",
  "◆ GITHUB: github.com/krsnadadhich — LINKEDIN: linkedin.com/in/krsnadadhich",
]

export function CRTTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="overflow-hidden border-y text-xs py-1 tracking-widest"
      style={{
        borderColor: "var(--crt-border-col)",
        background: "var(--crt-paper)",
        color: "var(--crt-brown-dim)",
        lineHeight: 1,
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="px-8 shrink-0" style={{ lineHeight: 1 }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function CRTHero() {
  const [dots, setDots] = useState("")
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 500)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden"
      style={{ background: "var(--crt-bg)" }}
    >
      {/* Big title */}
      <div className="text-center relative z-10 w-full max-w-4xl mx-auto">
        {/* System prompt line */}
        <div className="text-xs tracking-[0.3em] mb-6 glow-dim">
          C:\PORTFOLIO\&gt; LOADING_KRISHNA_DADHICH{dots}
        </div>

        {/* Main name */}
        <motion.h1
          className="glow flicker leading-none mb-4"
          style={{
            fontFamily: "var(--font-vt323), monospace",
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            letterSpacing: "0.04em",
            color: "var(--crt-brown-bright)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: crtEase }}
        >
          <GlitchHeadline>KRISHNA</GlitchHeadline>
        </motion.h1>
        <motion.h1
          className="glow flicker leading-none mb-4"
          style={{
            fontFamily: "var(--font-vt323), monospace",
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            letterSpacing: "0.04em",
            color: "var(--crt-brown-bright)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: crtEase }}
        >
          <GlitchHeadline>DADHICH</GlitchHeadline>
        </motion.h1>

        {/* Subtitle */}
        <div
          className="glow-sm mb-2"
          style={{
            fontFamily: "var(--font-vt323), monospace",
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            color: "var(--crt-brown)",
            letterSpacing: "0.2em",
          }}
        >
          AI DEVELOPER • ML/DL ENGINEER
        </div>

        <div className="text-xs tracking-widest glow-dim mb-12">
          ◆ SHIPPING END-TO-END AI SOLUTIONS — BENGALURU, INDIA ◆
        </div>

        {/* Terminal box */}
        <div
          className="crt-border text-left p-6 max-w-xl mx-auto text-sm leading-relaxed mb-10"
          style={{ background: "var(--crt-paper)" }}
        >
          <div className="space-y-2">
            <div>
              <span style={{ color: "var(--crt-brown-dim)" }}>$</span>{" "}
              <span className="glow-sm">whoami</span>
            </div>
            <div style={{ color: "var(--crt-brown)" }}>
              AI Developer building and deploying ML/DL solutions: NLP chatbots, computer vision systems, and predictive models. Skilled in TensorFlow, Python, and the full ML lifecycle from data preprocessing to production deployment.
            </div>
            <div className="mt-3">
              <span style={{ color: "var(--crt-brown-dim)" }}>$</span>{" "}
              <span className="glow-sm">cat ./expertise.txt</span>
            </div>
            <div style={{ color: "var(--crt-brown-dim)" }} className="pl-4 space-y-0.5">
              <div>TENSORFLOW_CNN_RNN/</div>
              <div>NLP_CHATBOTS_RAG/</div>
              <div>COMPUTER_VISION_DEPLOYMENT/</div>
            </div>
            <div className="mt-2">
              <span style={{ color: "var(--crt-brown-dim)" }}>$</span>{" "}
              <span className="glow-sm">./contact_me.sh</span>
              <BlinkCursor color="var(--crt-brown-bright)" speed="1s" />
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href="#experience"
            className="text-xs tracking-[0.2em] px-6 py-3 crt-cta-primary"
            whileTap={{ scale: 0.96 }}
          >
            [ VIEW WORK ]
          </motion.a>
          <motion.a
            href="#contact"
            className="text-xs tracking-[0.2em] px-6 py-3 crt-cta-secondary"
            whileTap={{ scale: 0.96 }}
          >
            [ SEND PROJECT IDEA ]
          </motion.a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest glow-dim"
        style={{ animation: reducedMotion ? undefined : "blink 2s step-start infinite" }}
      >
        ▼ SCROLL DOWN ▼
      </div>
    </section>
  )
}
