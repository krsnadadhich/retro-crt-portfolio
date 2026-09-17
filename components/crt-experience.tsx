"use client"

import { motion } from "motion/react"
import { Reveal } from "@/components/reveal"
import { staggerContainer, staggerItem } from "@/lib/motion"

const EXPERIENCE = [
  {
    id: "EXP_001",
    company: "MEDHA TECH SOLUTIONS",
    position: "AI/ML Intern",
    duration: "SEP 2025 — NOV 2025",
    location: "Bengaluru, India",
    description: "Built and shipped core features for MIRA, a RAG-powered domain-restricted chatbot — spanning backend engineering, admin tooling, and Agile delivery.",
    highlights: [
      "Developed and enhanced MIRA, an AI-powered domain-restricted chatbot using Retrieval-Augmented Generation (RAG) to generate accurate, context-aware responses exclusively from organization-specific knowledge bases — significantly reducing hallucinations while keeping answers source-grounded",
      "Engineered core backend features — knowledge base management, chatbot configuration, conversation history, user authentication, and role-based administration — using PHP, MySQL, and REST APIs",
      "Built an admin dashboard to manage chatbot instances, branding, subscriptions, and user access",
      "Collaborated in an Agile development environment using Jira and GitHub for version control and project management",
    ],
    skills: ["RAG", "PHP", "MYSQL", "REST API", "CHATBOTS", "GITHUB", "JIRA", "AGILE"],
  },
]

export function CRTExperience() {
  return (
    <section id="experience" className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- WORK_EXPERIENCE.LOG --------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          EXPERIENCE
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          {EXPERIENCE.length} ENTRIES — REVERSE CHRONOLOGICAL ORDER
        </div>
      </Reveal>

      <div className="relative pl-4">
        {/* Timeline connector — draws in on scroll */}
        <motion.div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: 2, background: "var(--crt-amber)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="space-y-px" style={{ border: "1px solid var(--crt-border-col)" }}>
          {EXPERIENCE.map((exp, idx) => (
            <ExperienceCard key={exp.id} experience={exp} isLast={idx === EXPERIENCE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ experience, isLast }: { experience: (typeof EXPERIENCE)[0]; isLast: boolean }) {
  return (
    <Reveal
      className="group crt-hover-tint"
      style={{
        borderBottom: isLast ? "1px solid var(--crt-border-col)" : "1px solid var(--crt-border-col)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-start justify-between border-b"
        style={{ borderColor: "var(--crt-border-col)" }}
      >
        <div>
          <div
            className="glow-sm tracking-widest"
            style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "0.9rem", color: "var(--crt-brown-dim)" }}
          >
            [{experience.id}]
          </div>
          <h3
            className="mt-1 glow-sm tracking-wider"
            style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "1.5rem", color: "var(--crt-brown-bright)" }}
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
          <motion.ul
            className="space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {experience.highlights.map((highlight, idx) => (
              <motion.li
                key={idx}
                className="text-xs leading-relaxed pl-4"
                style={{
                  color: "var(--crt-brown)",
                  borderLeft: "2px solid var(--crt-brown-dim)",
                }}
                variants={staggerItem}
              >
                {highlight}
              </motion.li>
            ))}
          </motion.ul>
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
    </Reveal>
  )
}
