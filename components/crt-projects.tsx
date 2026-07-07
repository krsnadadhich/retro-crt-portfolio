"use client"

import Image from "next/image"
import { useState } from "react"

const WORKS = [
  {
    id: "PRJ_001",
    title: "OFFLINE RAG ASSISTANT",
    category: "AI SYSTEM — 2025",
    year: "2025",
    desc: "Fully offline AI assistant using on-device LLMs and RAG for enterprise Q&A from private knowledge bases. Designed for IT, healthcare, and education with zero external API calls.",
    tags: ["RAG PIPELINE", "LOCAL LLMs", "PYTHON"],
    img: "/works/agora.jpg",
    type: "ai-system",
  },
  {
    id: "PRJ_002",
    title: "BANKING CHATBOT",
    category: "NLP SYSTEM — 2024",
    year: "2024",
    desc: "AI-powered banking chatbot with intent recognition and dialog management. Automated 75% of routine queries, reducing manual handling by over 50%.",
    tags: ["NLP", "INTENT RECOGNITION", "PYTHON"],
    img: "/works/skyagent.jpg",
    type: "chatbot",
  },
  {
    id: "PRJ_003",
    title: "FACE RECOGNITION GATE",
    category: "COMPUTER VISION — 2024",
    year: "2024",
    desc: "Real-time biometric access control using OpenCV and dlib HOG/CNN detection. 128-D face embeddings achieving 98% identity match accuracy for enterprise security.",
    tags: ["COMPUTER VISION", "DLIB", "DEPLOYMENT"],
    img: "/works/brilliance.jpg",
    type: "vision",
  },
  {
    id: "PRJ_004",
    title: "PREDICTIVE MAINTENANCE MODEL",
    category: "REGRESSION MODEL — 2024",
    year: "2024",
    desc: "Machine learning model predicting equipment failure using sensor data. Achieved 92% accuracy with reduced downtime, saving operational costs by 40%.",
    tags: ["SCIKIT-LEARN", "REGRESSION", "PREDICTION"],
    img: "/works/agora.jpg",
    type: "ml-model",
  },
  {
    id: "PRJ_005",
    title: "IMAGE CLASSIFICATION SYSTEM",
    category: "DEEP LEARNING — 2024",
    year: "2024",
    desc: "CNN-based image classification for product quality control. Real-time detection with 96% precision for automated manufacturing inspection.",
    tags: ["CNN", "TENSORFLOW", "OPENCV"],
    img: "/works/skyagent.jpg",
    type: "vision",
  },
  {
    id: "PRJ_006",
    title: "CUSTOMER SENTIMENT ANALYZER",
    category: "NLP PROJECT — 2023",
    year: "2023",
    desc: "Natural language processing system for analyzing customer feedback. Classifies sentiment with 88% accuracy using LSTM networks and word embeddings.",
    tags: ["NLP", "LSTM", "TEXT MINING"],
    img: "/works/brilliance.jpg",
    type: "nlp",
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
