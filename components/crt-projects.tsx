"use client"

import Image from "next/image"
import { useState } from "react"

const WORKS = [
  {
    id: "PRJ_001",
    title: "OFFLINE RAG-BASED AI ASSISTANT",
    category: "AI SYSTEM",
    year: "2025",
    desc: "Built a fully offline AI assistant using on-device LLMs and Retrieval-Augmented Generation (RAG) to answer questions and generate insights strictly from a company's private knowledge base. Designed for enterprise use across IT, healthcare, and education with all inference running on-premise for complete data security and zero external API calls.",
    tags: ["PYTHON", "LOCAL LLMs", "RAG"],
    img: "/works/agora.jpg",
    type: "ai-system",
  },
  {
    id: "PRJ_002",
    title: "BANKING CHATBOT SYSTEM",
    category: "NLP PROJECT",
    year: "2025",
    desc: "Built an AI-powered banking chatbot with intent recognition and dialog management that automated over 75% of routine customer queries, reducing manual query handling by over 50%.",
    tags: ["PYTHON", "NLP", "DIALOG MANAGEMENT"],
    img: "/works/skyagent.jpg",
    type: "chatbot",
  },
  {
    id: "PRJ_003",
    title: "FACE RECOGNITION GATE SYSTEM",
    category: "COMPUTER VISION",
    year: "2025",
    desc: "Engineered a real-time biometric access control system using OpenCV and dlib's HOG/CNN detection with 128-D face embeddings, achieving 98% identity match accuracy.",
    tags: ["PYTHON", "OPENCV", "DLIB"],
    img: "/works/brilliance.jpg",
    type: "vision",
  },
  {
    id: "PRJ_004",
    title: "MEAL PLANNER — ANDROID APP",
    category: "MOBILE APP",
    year: "2024",
    desc: "Designed and self-deployed a personal Android app that suggests meals to cook based on groceries currently available at home.",
    tags: ["ANDROID STUDIO", "JAVA"],
    img: "/works/agora.jpg",
    type: "mobile",
  },
  {
    id: "PRJ_005",
    title: "DAY PLANNER & TASK SCHEDULER — ANDROID APP",
    category: "MOBILE APP",
    year: "2024",
    desc: "Built a personal daily-routine Android app to schedule sleep, meals, work blocks, and reading time for better time management.",
    tags: ["ANDROID STUDIO", "JAVA"],
    img: "/works/skyagent.jpg",
    type: "mobile",
  },
  {
    id: "PRJ_006",
    title: "HOUSE PRICE PREDICTION",
    category: "REGRESSION MODEL",
    year: "2023",
    desc: "Regression model on 1,500+ data points across 5 features, achieving an RMSE of 1.25.",
    tags: ["R", "REGRESSION"],
    img: "/works/brilliance.jpg",
    type: "ml-model",
  },
  {
    id: "PRJ_007",
    title: "HOTEL MANAGEMENT SYSTEM",
    category: "DATABASE PROJECT",
    year: "2023",
    desc: "Relational database handling 100+ bookings and 250+ check-in/check-out transactions.",
    tags: ["MYSQL", "SQL"],
    img: "/works/agora.jpg",
    type: "database",
  },
]

export function CRTProjects() {
  return (
    <section id="work" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SECTION 03 -----------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "VT323, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          SELECTED_WORK
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          {WORKS.length} PROJECTS — SORTED BY DATE DESC
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: "1px solid var(--crt-border-col)" }}>
        {WORKS.map((w) => (
          <WorkCard key={w.id} work={w} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({ work }: { work: (typeof WORKS)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer relative overflow-hidden"
      style={{
        background: "var(--crt-paper)",
        borderColor: "var(--crt-border-col)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image
          src={work.img}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: "sepia(0.3) contrast(1.05)",
          }}
        />
        {/* Scanline overlay on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(100,40,0,0.07) 3px,rgba(100,40,0,0.07) 4px)",
          }}
        />
        {/* Hover description overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-200"
          style={{
            background: "rgba(245,237,224,0.92)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <div className="text-xs tracking-widest mb-2" style={{ color: "var(--crt-brown-dim)" }}>
            {work.id}
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--crt-brown)" }}>
            {work.desc}
          </p>
          <div className="flex gap-2 flex-wrap">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5"
                style={{ border: "1px solid var(--crt-border-col)", color: "var(--crt-brown-dim)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderTop: "1px solid var(--crt-border-col)" }}
      >
        <div>
          <div
            className="tracking-wider glow-sm"
            style={{ fontFamily: "VT323, monospace", fontSize: "1.3rem", color: "var(--crt-brown-bright)" }}
          >
            {work.title}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--crt-brown-dim)" }}>
            {work.category}
          </div>
        </div>
        <div className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
          {work.year}
        </div>
      </div>
    </div>
  )
}
