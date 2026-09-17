"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Reveal, StaggerReveal, StaggerItem } from "@/components/reveal"

const WORKS = [
  {
    id: "PRJ_001",
    title: "OFFLINE RAG-BASED AI ASSISTANT",
    category: "AI SYSTEM",
    year: "2025",
    desc: "Built a fully offline AI assistant using on-device LLMs and Retrieval-Augmented Generation (RAG) to answer questions and generate insights strictly from a company's private knowledge base. Designed for enterprise use across IT, healthcare, and education — including auto-generating quiz and question papers from course material — with all inference running on-premise for complete data security and zero external API calls.",
    tags: ["PYTHON", "LOCAL LLMs", "RAG"],
    img: "/works/rag-assistant.png",
    type: "ai-system",
    link: "https://github.com/krsnadadhich/RAG-based-Local-AI-Assistant",
  },
  {
    id: "PRJ_002",
    title: "BANKING CHATBOT SYSTEM",
    category: "NLP PROJECT",
    year: "2025",
    desc: "Built an AI-powered banking chatbot with intent recognition and dialog management that automated over 75% of routine customer queries, reducing manual query handling by over 50%. Optimized response accuracy and latency through iterative testing and model tuning, ensuring reliable performance under real-world query variations.",
    tags: ["PYTHON", "NLP", "DIALOG MANAGEMENT"],
    img: "/works/banking-chatbot.png",
    type: "chatbot",
    link: "https://github.com/krsnadadhich",
  },
  {
    id: "PRJ_003",
    title: "FACE RECOGNITION GATE SYSTEM",
    category: "COMPUTER VISION",
    year: "2025",
    desc: "Engineered a real-time biometric access control system using OpenCV and dlib's HOG/CNN detection with 128-D face embeddings, achieving 98% identity match accuracy. Designed a live webcam-based detection loop capable of identifying registered residents in real time and simulating gate-open/access-denied responses based on match confidence.",
    tags: ["PYTHON", "OPENCV", "DLIB"],
    img: "/works/face-recognition.png",
    type: "vision",
    link: "https://github.com/krsnadadhich/face_recognition_gatesystem",
  },
  {
    id: "PRJ_004",
    title: "MEAL PLANNER — ANDROID APP",
    category: "MOBILE APP",
    year: "2024",
    desc: "Designed and self-deployed a personal Android app that suggests meals to cook based on groceries currently available at home.",
    tags: ["ANDROID STUDIO", "JAVA"],
    img: "/works/meal-planner.png",
    type: "mobile",
    link: "https://github.com/krsnadadhich/meal-mate-planner",
  },
  {
    id: "PRJ_005",
    title: "DAY PLANNER & TASK SCHEDULER — ANDROID APP",
    category: "MOBILE APP",
    year: "2024",
    desc: "Built a personal daily-routine Android app to schedule sleep, meals, work blocks, and reading time for better time management.",
    tags: ["ANDROID STUDIO", "JAVA"],
    img: "/works/day-planner.png",
    type: "mobile",
    link: "https://github.com/krsnadadhich/discipline-engine",
  },
  {
    id: "PRJ_006",
    title: "HOUSE PRICE PREDICTION",
    category: "REGRESSION MODEL",
    year: "2023",
    desc: "Regression model on 1,500+ data points across 5 features, achieving an RMSE of 1.25.",
    tags: ["R", "REGRESSION"],
    img: "/works/house-price.png",
    type: "ml-model",
    link: "https://github.com/krsnadadhich",
  },
  {
    id: "PRJ_007",
    title: "HOTEL MANAGEMENT SYSTEM",
    category: "DATABASE PROJECT",
    year: "2023",
    desc: "Relational database handling 100+ bookings and 250+ check-in/check-out transactions.",
    tags: ["MYSQL", "SQL"],
    img: "/works/hotel-management.png",
    type: "database",
    link: "https://github.com/krsnadadhich",
  },
]

export function CRTProjects() {
  return (
    <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- PROJECTS.LOG ------------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          PROJECTS.LOG
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          {WORKS.length} PROJECTS — SORTED BY DATE DESC
        </div>
      </Reveal>

      <StaggerReveal
        className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ border: "1px solid var(--crt-border-col)" }}
      >
        {WORKS.map((w, i) => (
          <StaggerItem key={w.id} className={i === WORKS.length - 1 && WORKS.length % 2 === 1 ? "md:col-span-2" : undefined}>
            <WorkCard work={w} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  )
}

const cardVariants = {
  rest: {},
  hover: {},
}
const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
}
const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
}

function WorkCard({ work }: { work: (typeof WORKS)[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16])

  return (
    <motion.a
      ref={cardRef}
      href={work.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer relative overflow-hidden block"
      style={{
        background: "var(--crt-paper)",
        borderColor: "var(--crt-border-col)",
      }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <motion.div
          className="absolute inset-x-0"
          style={{ top: "-8%", bottom: "-8%", y }}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={work.img}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ filter: "sepia(0.3) contrast(1.05)" }}
          />
        </motion.div>
        {/* Scanline overlay on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)",
          }}
        />
        {/* Hover description overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{ background: "rgba(18,13,6,0.92)" }}
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
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
          <div className="text-xs tracking-widest mt-3 glow-sm" style={{ color: "var(--crt-brown-bright)" }}>
            VIEW ON GITHUB →
          </div>
        </motion.div>
      </div>

      {/* Card footer */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderTop: "1px solid var(--crt-border-col)" }}
      >
        <div>
          <div
            className="tracking-wider glow-sm"
            style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "1.3rem", color: "var(--crt-brown-bright)" }}
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
    </motion.a>
  )
}
