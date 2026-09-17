"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "motion/react"
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { Reveal, StaggerReveal, StaggerItem } from "@/components/reveal"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const STATS = [
  { label: "PROJECTS BUILT", value: "10+", unit: "SHIPPED" },
  { label: "AI/ML EXPERTISE", value: "FULL", unit: "STACK" },
  { label: "LANGUAGES", value: "5+", unit: "PROFICIENT" },
  { label: "DEPLOYMENTS", value: "98%", unit: "ACCURACY" },
]

const DEPLOYMENT_ACCURACY = 98

const TOOLS = [
  { name: "TENSORFLOW", role: "DEEP LEARNING MODELS", status: "ACTIVE" },
  { name: "PYTHON", role: "CORE DEVELOPMENT", status: "ACTIVE" },
  { name: "SCIKIT-LEARN", role: "ML PIPELINES", status: "ACTIVE" },
  { name: "OPENCV", role: "COMPUTER VISION", status: "ACTIVE" },
  { name: "FLASK", role: "WEB BACKENDS", status: "ACTIVE" },
  { name: "MYSQL", role: "DATA MANAGEMENT", status: "ACTIVE" },
  { name: "LANGCHAIN", role: "LLM ORCHESTRATION", status: "ACTIVE" },
  { name: "LLAMAINDEX", role: "RAG DATA FRAMEWORK", status: "ACTIVE" },
  { name: "FAISS / CHROMADB", role: "VECTOR DATABASES", status: "ACTIVE" },
  { name: "OLLAMA / LLAMA.CPP", role: "ON-DEVICE LLM RUNTIME", status: "ACTIVE" },
]

function CountUpStat({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView) return
    const match = value.match(/^(\d+)(\D*)$/)
    if (!match || reducedMotion) {
      setDisplay(value)
      return
    }
    const target = parseInt(match[1], 10)
    const suffix = match[2]
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, reducedMotion, value])

  return (
    <div ref={ref} className="glow" style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "2rem" }}>
      {display}
    </div>
  )
}

function AccuracyGauge() {
  const reducedMotion = useReducedMotion()
  const data = [{ value: DEPLOYMENT_ACCURACY, fill: "var(--crt-amber)" }]

  return (
    <div className="p-4 crt-border mt-4" style={{ background: "var(--crt-paper)" }}>
      <div className="text-xs tracking-widest glow-dim mb-3">$ ./deployment_accuracy.sh</div>
      <div className="relative" style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={14} data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background={{ fill: "var(--crt-border-col)" }}
              dataKey="value"
              cornerRadius={7}
              isAnimationActive={!reducedMotion}
              animationDuration={1200}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="glow" style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "1.8rem" }}>
            {DEPLOYMENT_ACCURACY}%
          </span>
          <span className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
            ACCURACY
          </span>
        </div>
      </div>
      <div className="text-xs text-center mt-1 tracking-widest" style={{ color: "var(--crt-brown-dim)" }}>
        MODEL DEPLOYMENT ACCURACY
      </div>
    </div>
  )
}

export function CRTAbout() {
  return (
    <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- ABOUT.TXT -------------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          ABOUT.TXT
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: bio + stats */}
        <div>
          <Reveal
            className="p-6 crt-border text-sm leading-relaxed space-y-4 mb-8"
            style={{ background: "var(--crt-paper)", color: "var(--crt-brown)" }}
          >
            <div className="text-xs tracking-widest glow-dim mb-2">
              $ cat bio.txt
            </div>
            <p>
              I'm Krishna Dadhich — an AI Engineer building and shipping RAG pipelines and ML/DL solutions. Specialized in LLM applications, NLP chatbots, computer vision systems, and predictive models across the full ML lifecycle.
            </p>
            <p>
              I help teams deploy production-ready AI systems with hands-on experience in TensorFlow, Python, and data pipeline optimization. I focus on shipping functional, end-to-end applications independently and in team settings.
            </p>
            <p style={{ color: "var(--crt-brown-dim)" }}>
              When I'm not coding, I'm exploring new ML frameworks, contributing to GitHub, or playing basketball. Currently pursuing MCA at CMR University while shipping real AI projects.
            </p>
            <div className="pt-3" style={{ borderTop: "1px solid var(--crt-border-col)" }}>
              <span
                className="inline-flex items-center gap-2 text-xs tracking-widest"
                style={{ color: "var(--crt-amber)" }}
              >
                <span className="crt-status-dot" />
                AVAILABLE NOW — OPEN TO OPPORTUNITIES
              </span>
            </div>
          </Reveal>

          {/* Stats grid */}
          <StaggerReveal className="grid grid-cols-2 gap-0" style={{ border: "1px solid var(--crt-border-col)" }}>
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div
                  className="p-4 crt-hover-tint h-full"
                  style={{
                    borderRight: "1px solid var(--crt-border-col)",
                    borderBottom: "1px solid var(--crt-border-col)",
                  }}
                >
                  <CountUpStat value={s.value} />
                  <div className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
                    {s.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <Reveal delay={0.1}>
            <AccuracyGauge />
          </Reveal>
        </div>

        {/* Right: tools list */}
        <div>
          <div className="text-xs tracking-widest glow-dim mb-4">
            $ ls ./tools — {TOOLS.filter(t => t.status === "ACTIVE").length} ACTIVE
          </div>
          <StaggerReveal className="space-y-0" style={{ border: "1px solid var(--crt-border-col)" }}>
            {TOOLS.map((tool) => (
              <StaggerItem key={tool.name}>
                <div
                  className="p-4 group cursor-pointer crt-hover-tint"
                  style={{
                    borderBottom: "1px solid var(--crt-border-col)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className="group-hover:glow-sm transition-all"
                        style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "1.2rem", color: "var(--crt-brown-bright)" }}
                      >
                        {tool.name}
                      </span>
                      <div className="text-xs mt-0.5" style={{ color: "var(--crt-brown-dim)" }}>
                        {tool.role}
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--crt-brown-dim)" }}>
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{
                          background: tool.status === "ACTIVE" ? "var(--crt-amber)" : "var(--crt-brown-dim)",
                          boxShadow: tool.status === "ACTIVE" ? "0 0 6px var(--crt-amber)" : "none",
                        }}
                      />
                      {tool.status}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}
