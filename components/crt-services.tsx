"use client"

const SKILLS = [
  {
    id: "01",
    title: "DEEP LEARNING",
    desc: "CNN and RNN architectures for computer vision and sequence modeling. Building and training neural networks with TensorFlow for production deployment.",
    stat: "TOOL: TENSORFLOW + KERAS",
    icon: "◉",
  },
  {
    id: "02",
    title: "NLP & CHATBOTS",
    desc: "Intent recognition, dialog management, and knowledge-base-grounded chatbots. RAG pipelines for offline LLMs and enterprise AI applications.",
    stat: "TOOL: PYTHON + RAG FRAMEWORKS",
    icon: "▓",
  },
  {
    id: "03",
    title: "COMPUTER VISION",
    desc: "Real-time face recognition, object detection, and image processing. Building biometric systems and edge-deployed vision solutions.",
    stat: "TOOL: OPENCV + DLIB + CNN",
    icon: "◈",
  },
  {
    id: "04",
    title: "DATA PREPROCESSING",
    desc: "EDA, feature engineering, and data pipeline optimization. Handling missing values, normalization, and dataset preparation at scale.",
    stat: "TOOL: PANDAS + SCIKIT-LEARN",
    icon: "▶",
  },
  {
    id: "05",
    title: "MODEL EVALUATION",
    desc: "Regression and classification with rigorous testing. Metric selection, cross-validation, and performance optimization for production models.",
    stat: "TOOL: SCIKIT-LEARN + METRICS",
    icon: "◆",
  },
  {
    id: "06",
    title: "FULL STACK ML",
    desc: "End-to-end ML pipelines: from data collection to model deployment. Flask backends, database integration, and production-ready systems.",
    stat: "TOOL: PYTHON + FLASK + SQL",
    icon: "◐",
  },
]

export function CRTServices() {
  return (
    <section
      id="skills"
      className="px-6 py-24 max-w-6xl mx-auto"
    >
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 02 -----------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          SKILLS.EXE
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          DISCIPLINES AND TOOLS
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ border: "1px solid var(--crt-border-col)" }}
      >
        {SKILLS.map((s) => (
          <SkillCard key={s.id} skill={s} />
        ))}
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: (typeof SKILLS)[0] }) {
  return (
    <div
      className="p-6 group cursor-pointer transition-all duration-150"
      style={{
        background: "var(--crt-paper)",
        border: "1px solid transparent",
        borderColor: "var(--crt-border-col)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.background = "rgba(122,74,30,0.06)"
        el.style.borderColor = "var(--crt-brown)"
        el.style.boxShadow = "inset 0 0 20px rgba(122,74,30,0.06)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = "var(--crt-paper)"
        el.style.borderColor = "var(--crt-border-col)"
        el.style.boxShadow = "none"
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="text-3xl glow-sm group-hover:glow"
          style={{ color: "var(--crt-brown-bright)", fontFamily: "VT323, monospace" }}
        >
          {skill.icon}
        </div>
        <span className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
          [{skill.id}]
        </span>
      </div>
      <div
        className="text-lg mb-3 glow-sm group-hover:glow tracking-wider"
        style={{ fontFamily: "VT323, monospace", color: "var(--crt-brown-bright)" }}
      >
        {skill.title}
      </div>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--crt-brown)" }}>
        {skill.desc}
      </p>
      <div
        className="text-xs tracking-widest pt-3"
        style={{
          color: "var(--crt-brown-dim)",
          borderTop: "1px solid var(--crt-border-col)",
        }}
      >
        {skill.stat}
      </div>
    </div>
  )
}
