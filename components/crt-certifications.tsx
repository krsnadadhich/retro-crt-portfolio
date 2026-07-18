"use client"

import React from "react"
import { Reveal, StaggerReveal, StaggerItem } from "@/components/reveal"
import { stampSpring } from "@/lib/motion"

const CERTIFICATIONS = [
  {
    id: "CERT_001",
    title: "AI FLUENCY",
    issuer: "Anthropic",
    year: "2025",
    icon: "◈",
  },
  {
    id: "CERT_002",
    title: "CLAUDE 101",
    issuer: "Anthropic",
    year: "2025",
    icon: "◆",
  },
  {
    id: "CERT_003",
    title: "DEEP LEARNING WITH TENSORFLOW",
    issuer: "IBM",
    year: "2024",
    icon: "▲",
  },
  {
    id: "CERT_004",
    title: "INTRODUCTION TO GENERATIVE AI",
    issuer: "Google Cloud Skills Boost",
    year: "2024",
    icon: "▼",
  },
  {
    id: "CERT_005",
    title: "THE JOY OF COMPUTING USING PYTHON",
    issuer: "NPTEL, IIT Madras",
    year: "2024",
    desc: "Elite, 71%",
    icon: "◉",
  },
]

export function CRTCertifications() {
  return (
    <section id="certifications" className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- CERTIFICATIONS.LOG ----------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          CERTIFICATIONS.LOG
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          {CERTIFICATIONS.length} CREDENTIALS
        </div>
      </Reveal>

      <StaggerReveal
        className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ border: "1px solid var(--crt-border-col)" }}
      >
        {CERTIFICATIONS.map((cert) => (
          <StaggerItem
            key={cert.id}
            variants={stampSpring}
            className="p-6 crt-hover-card group"
            style={{ minHeight: "140px" }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className="text-lg glow-sm group-hover:glow"
                style={{ color: "var(--crt-brown-bright)" }}
              >
                {cert.icon}
              </div>
              <div className="flex-1">
                <div
                  className="text-xs tracking-widest glow-sm group-hover:glow"
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    color: "var(--crt-brown-bright)",
                    fontSize: "0.85rem",
                  }}
                >
                  {cert.title}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{
                    color: "var(--crt-brown-dim)",
                    fontFamily: "var(--font-vt323), monospace",
                  }}
                >
                  {cert.issuer}
                </div>
                {cert.desc && (
                  <div
                    className="text-xs mt-1"
                    style={{
                      color: "var(--crt-brown-dim)",
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "0.75rem",
                    }}
                  >
                    {cert.desc}
                  </div>
                )}
                <div
                  className="text-xs mt-2"
                  style={{
                    color: "var(--crt-amber)",
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: "0.7rem",
                  }}
                >
                  {cert.year}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  )
}
