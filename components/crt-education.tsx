"use client"

const EDUCATION = [
  {
    id: "EDU_001",
    degree: "MASTER OF COMPUTER APPLICATIONS (MCA)",
    institution: "CMR UNIVERSITY",
    location: "Bengaluru, Karnataka",
    duration: "2024 — 2026",
    status: "PURSUING",
    description: "Advanced studies in computer applications with focus on AI and Machine Learning.",
  },
  {
    id: "EDU_002",
    degree: "B.SC. MATHEMATICS",
    institution: "SUBODH PG AUTONOMOUS COLLEGE",
    location: "Rajasthan",
    duration: "2020 — 2023",
    status: "COMPLETED",
    description: "Strong mathematical foundation with coursework in data structures and discrete mathematics.",
  },
]

export function CRTEducation() {
  return (
    <section id="education" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- EDUCATION.LOG ------------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          EDUCATION.TXT
        </h2>
      </div>

      <div className="space-y-0" style={{ border: "1px solid var(--crt-border-col)" }}>
        {EDUCATION.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-6"
            style={{
              background: idx % 2 === 0 ? "var(--crt-paper)" : "rgba(122,74,30,0.02)",
              borderBottom: idx < EDUCATION.length - 1 ? "1px solid var(--crt-border-col)" : "none",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Degree & Institution */}
              <div className="lg:col-span-2">
                <div
                  className="glow text-lg mb-2"
                  style={{ fontFamily: "VT323, monospace", color: "var(--crt-brown-bright)" }}
                >
                  {edu.degree}
                </div>
                <div className="text-sm mb-3" style={{ color: "var(--crt-brown)" }}>
                  {edu.institution}
                </div>
                <div className="text-xs leading-relaxed mb-3" style={{ color: "var(--crt-brown-dim)" }}>
                  {edu.description}
                </div>
              </div>

              {/* Right: Duration & Status */}
              <div className="lg:col-span-1">
                <div className="space-y-2">
                  <div>
                    <div className="text-xs tracking-widest glow-dim mb-1">DURATION</div>
                    <div className="text-xs font-mono" style={{ color: "var(--crt-brown)" }}>
                      {edu.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs tracking-widest glow-dim mb-1">STATUS</div>
                    <div
                      className="inline-block px-2 py-1 text-xs font-mono"
                      style={{
                        background:
                          edu.status === "PURSUING"
                            ? "rgba(240,138,22,0.1)"
                            : "rgba(34,197,94,0.1)",
                        color: edu.status === "PURSUING" ? "var(--crt-amber)" : "var(--crt-green)",
                        border: `1px solid ${
                          edu.status === "PURSUING"
                            ? "rgba(240,138,22,0.3)"
                            : "rgba(34,197,94,0.3)"
                        }`,
                      }}
                    >
                      {edu.status}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs tracking-widest glow-dim mb-1">LOCATION</div>
                    <div className="text-xs" style={{ color: "var(--crt-brown)" }}>
                      {edu.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
