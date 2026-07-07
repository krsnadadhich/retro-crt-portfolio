"use client"

import React from "react"

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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: "1px solid var(--crt-border-col)" }}>
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="p-6 transition-all duration-150 group"
            style={{
              background: "var(--crt-paper)",
              border: "1px solid var(--crt-border-col)",
              minHeight: "140px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(122,74,30,0.06)"
              e.currentTarget.style.borderColor = "var(--crt-brown)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--crt-paper)"
              e.currentTarget.style.borderColor = "var(--crt-border-col)"
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className="text-lg glow-sm"
                style={{ color: "var(--crt-brown-bright)" }}
              >
                {cert.icon}
              </div>
              <div className="flex-1">
                <div
                  className="text-xs tracking-widest glow-sm"
                  style={{
                    fontFamily: "VT323, monospace",
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
                    fontFamily: "VT323, monospace",
                  }}
                >
                  {cert.issuer}
                </div>
                {cert.desc && (
                  <div
                    className="text-xs mt-1"
                    style={{
                      color: "var(--crt-brown-dim)",
                      fontFamily: "VT323, monospace",
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
                    fontFamily: "VT323, monospace",
                    fontSize: "0.7rem",
                  }}
                >
                  {cert.year}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
