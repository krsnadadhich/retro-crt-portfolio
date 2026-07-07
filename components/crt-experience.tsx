"use client"

const EXPERIENCE = [
  {
    id: "EXP_001",
    company: "INTERNSHIP",
    position: "AI/ML Developer",
    duration: "JUL 2024 — DEC 2024",
    location: "Bengaluru, India",
    description: "Developed and deployed end-to-end ML solutions in production environments. Built RAG-based chatbots, computer vision systems, and predictive models. Worked independently on multiple projects while collaborating with senior engineers on architectural decisions.",
    highlights: [
      "Designed and implemented offline RAG assistant with 98% query accuracy",
      "Developed banking chatbot reducing manual queries by 50%",
      "Built face recognition system achieving 98% identity match accuracy",
      "Optimized data pipelines reducing processing time by 35%",
    ],
    skills: ["Python", "TensorFlow", "Flask", "MySQL", "OpenCV", "NLP"],
  },
  {
    id: "EXP_002",
    company: "PERSONAL PROJECTS",
    position: "AI/ML Developer & Researcher",
    duration: "JAN 2023 — PRESENT",
    location: "Bengaluru, India",
    description: "Independently developed and shipped multiple AI/ML projects. Focused on building practical solutions from data preprocessing through model deployment. Continuously exploring new frameworks and best practices in ML.",
    highlights: [
      "Built predictive maintenance model with 92% accuracy",
      "Developed CNN-based image classification achieving 96% precision",
      "Created sentiment analysis system using LSTM networks",
      "Implemented full-stack ML pipelines with Flask backends",
    ],
    skills: ["TensorFlow", "Scikit-Learn", "Python", "CNNs", "RNNs", "Data Science"],
  },
  {
    id: "EXP_003",
    company: "EDUCATION",
    position: "Master of Computer Applications (MCA)",
    duration: "JUL 2023 — JUN 2025",
    location: "CMR University, Bengaluru",
    description: "Pursuing advanced studies in computer applications with specialization in AI and Machine Learning. Strong foundation in data structures, algorithms, and software engineering principles.",
    highlights: [
      "Focused coursework in Machine Learning and Data Science",
      "Completed projects in Computer Vision and NLP",
      "Maintained strong academic performance throughout",
      "Active participation in coding competitions and hackathons",
    ],
    skills: ["Python", "Data Structures", "Algorithms", "ML", "Database Design"],
  },
]

export function CRTExperience() {
  return (
    <section id="experience" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 03.5 -------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          EXPERIENCE
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          {EXPERIENCE.length} ENTRIES — REVERSE CHRONOLOGICAL ORDER
        </div>
      </div>

      <div className="space-y-px" style={{ border: "1px solid var(--crt-border-col)" }}>
        {EXPERIENCE.map((exp, idx) => (
          <ExperienceCard key={exp.id} experience={exp} isLast={idx === EXPERIENCE.length - 1} />
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({ experience, isLast }: { experience: (typeof EXPERIENCE)[0]; isLast: boolean }) {
  return (
    <div
      className="group cursor-pointer transition-all duration-150"
      style={{
        background: "var(--crt-paper)",
        borderBottom: isLast ? "1px solid var(--crt-border-col)" : "1px solid var(--crt-border-col)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-start justify-between border-b"
        style={{ borderColor: "var(--crt-border-col)" }}
        onMouseEnter={(e) => {
          e.currentTarget.parentElement!.style.background = "rgba(122,74,30,0.04)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.parentElement!.style.background = "var(--crt-paper)"
        }}
      >
        <div>
          <div
            className="glow-sm tracking-widest"
            style={{ fontFamily: "VT323, monospace", fontSize: "0.9rem", color: "var(--crt-brown-dim)" }}
          >
            [{experience.id}]
          </div>
          <h3
            className="mt-1 glow-sm tracking-wider"
            style={{ fontFamily: "VT323, monospace", fontSize: "1.5rem", color: "var(--crt-brown-bright)" }}
          >
            {experience.position}
          </h3>
          <div className="text-xs mt-2" style={{ color: "var(--crt-brown)" }}>
            {experience.company}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs tracking-widest" style={{ color: "var(--crt-brown-dim)" }}>
            {experience.duration}
          </div>
          <div className="text-xs mt-2" style={{ color: "var(--crt-brown-dim)" }}>
            {experience.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-4">
        {/* Description */}
        <p className="text-xs leading-relaxed" style={{ color: "var(--crt-brown)" }}>
          {experience.description}
        </p>

        {/* Highlights */}
        <div>
          <div className="text-xs tracking-widest mb-3" style={{ color: "var(--crt-brown-dim)" }}>
            KEY ACHIEVEMENTS:
          </div>
          <ul className="space-y-2">
            {experience.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="text-xs leading-relaxed pl-4"
                style={{
                  color: "var(--crt-brown)",
                  borderLeft: "2px solid var(--crt-brown-dim)",
                }}
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="pt-3" style={{ borderTop: "1px solid var(--crt-border-col)" }}>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 tracking-wider"
                style={{
                  border: "1px solid var(--crt-brown-dim)",
                  color: "var(--crt-brown-dim)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
