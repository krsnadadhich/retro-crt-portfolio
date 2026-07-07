"use client"

const STATS = [
  { label: "PROJECTS BUILT", value: "10+", unit: "SHIPPED" },
  { label: "ML/DL EXPERTISE", value: "FULL", unit: "STACK" },
  { label: "LANGUAGES", value: "5+", unit: "PROFICIENT" },
  { label: "DEPLOYMENTS", value: "98%", unit: "ACCURACY" },
]

const TOOLS = [
  { name: "TENSORFLOW", role: "DEEP LEARNING MODELS", status: "ACTIVE" },
  { name: "PYTHON", role: "CORE DEVELOPMENT", status: "ACTIVE" },
  { name: "SCIKIT-LEARN", role: "ML PIPELINES", status: "ACTIVE" },
  { name: "OPENCV", role: "COMPUTER VISION", status: "ACTIVE" },
  { name: "FLASK", role: "WEB BACKENDS", status: "ACTIVE" },
  { name: "MYSQL", role: "DATA MANAGEMENT", status: "ACTIVE" },
]

export function CRTAbout() {
  return (
    <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 04 -----------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          ABOUT.TXT
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: bio + stats */}
        <div>
          <div
            className="p-6 crt-border text-sm leading-relaxed space-y-4 mb-8"
            style={{ background: "var(--crt-paper)", color: "var(--crt-brown)" }}
          >
            <div className="text-xs tracking-widest glow-dim mb-2">
              $ cat bio.txt
            </div>
            <p>
              I'm Krishna Dadhich — an AI Developer building and shipping ML/DL solutions. Specialized in NLP chatbots, computer vision systems, and predictive models across the full ML lifecycle.
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
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--crt-amber)", boxShadow: "0 0 6px var(--crt-amber)", animation: "blink 2s step-start infinite" }}
                />
                AVAILABLE NOW — OPEN TO OPPORTUNITIES
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-0" style={{ border: "1px solid var(--crt-border-col)" }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-4"
                style={{
                  borderRight: "1px solid var(--crt-border-col)",
                  borderBottom: "1px solid var(--crt-border-col)",
                  background: "var(--crt-paper)",
                }}
              >
                <div
                  className="glow"
                  style={{ fontFamily: "VT323, monospace", fontSize: "2rem" }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: tools list */}
        <div>
          <div className="text-xs tracking-widest glow-dim mb-4">
            $ ls ./tools — {TOOLS.filter(t => t.status === "ACTIVE").length} ACTIVE
          </div>
          <div className="space-y-0" style={{ border: "1px solid var(--crt-border-col)" }}>
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="p-4 group cursor-pointer transition-all duration-100"
                style={{
                  borderBottom: "1px solid var(--crt-border-col)",
                  background: "var(--crt-paper)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(122,74,30,0.06)" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--crt-paper)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="group-hover:glow-sm transition-all"
                      style={{ fontFamily: "VT323, monospace", fontSize: "1.2rem", color: "var(--crt-brown-bright)" }}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
