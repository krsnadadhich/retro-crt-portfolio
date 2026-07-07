"use client"

import { useState } from "react"
import { CRTOverlay } from "@/components/crt-overlay"
import { BootSequence } from "@/components/boot-sequence"
import { CRTNav } from "@/components/crt-nav"
import { CRTTicker, CRTHero } from "@/components/crt-hero"
import { CRTServices } from "@/components/crt-services"
import { CRTProjects } from "@/components/crt-projects"
import { CRTExperience } from "@/components/crt-experience"
import { CRTCertifications } from "@/components/crt-certifications"
import { CRTEducation } from "@/components/crt-education"
import { CRTAbout } from "@/components/crt-about"
import { CRTContact } from "@/components/crt-contact"
import { CRTFooter } from "@/components/crt-footer"

function SiteContent() {
  const [booted, setBooted] = useState(false)

  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--crt-bg)",
        animation: "flicker 7s infinite",
      }}
    >
      <CRTOverlay />
      <BootSequence onComplete={() => setBooted(true)} />

      <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <CRTNav />

        <div style={{ paddingTop: "52px" }}>
          <CRTTicker />
        </div>

        <CRTHero />

        <div
          className="max-w-6xl mx-auto px-6 text-xs tracking-[0.2em] py-2"
          style={{ color: "var(--crt-brown-dim)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          -- SKILLS.EXE ------------------------------------------------
        </div>
        <CRTServices />

        <div
          className="max-w-6xl mx-auto px-6 text-xs tracking-[0.2em] py-2"
          style={{ color: "var(--crt-brown-dim)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          -- SELECTED_WORK ---------------------------------------------
        </div>
        <CRTProjects />

        <div
          className="max-w-6xl mx-auto px-6 text-xs tracking-[0.2em] py-2"
          style={{ color: "var(--crt-brown-dim)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          -- WORK_EXPERIENCE.LOG --------------------------------------
        </div>
        <CRTExperience />

        <div
          className="max-w-6xl mx-auto px-6 text-xs tracking-[0.2em] py-2"
          style={{ color: "var(--crt-brown-dim)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          -- CERTIFICATIONS.LOG ----------------------------------------
        </div>
        <CRTCertifications />

        <div
          className="max-w-6xl mx-auto px-6 text-xs tracking-[0.2em] py-2"
          style={{ color: "var(--crt-brown-dim)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          -- EDUCATION.LOG -----------------------------------------------
        </div>
        <CRTEducation />

        <div
          className="max-w-6xl mx-auto px-6 text-xs tracking-[0.2em] py-2"
          style={{ color: "var(--crt-brown-dim)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          -- ABOUT.TXT -------------------------------------------------
        </div>
        <CRTAbout />

        <div
          className="max-w-6xl mx-auto px-6 text-xs tracking-[0.2em] py-2"
          style={{ color: "var(--crt-brown-dim)", borderTop: "1px solid var(--crt-border-col)" }}
        >
          -- CONTACT.SH ------------------------------------------------
        </div>
        <CRTContact />
        <CRTFooter />
      </div>
    </main>
  )
}

export default function Home() {
  return <SiteContent />
}

