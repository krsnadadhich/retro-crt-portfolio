import Link from "next/link"
import { StaggerReveal, StaggerItem } from "@/components/reveal"

export function CRTFooter() {
  return (
    <footer
      className="px-6 py-12"
      style={{ borderTop: "1px solid var(--crt-border-col)", background: "var(--crt-paper)" }}
    >
      <div className="max-w-6xl mx-auto">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <StaggerItem>
            <div
              className="glow text-3xl mb-2"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              KRISHNA.DEV
            </div>
            <div className="text-xs glow-dim tracking-widest mb-4">
              AI ENGINEER
            </div>
            <div className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
              Building and shipping ML/DL solutions<br />
              that solve real problems in production.
            </div>
          </StaggerItem>

          {/* Links */}
          <StaggerItem>
            <div className="text-xs tracking-widest glow-dim mb-4">NAVIGATE</div>
            <div className="space-y-2 text-xs" style={{ color: "var(--crt-brown)" }}>
              {[
                { label: "HOME", href: "/" },
                { label: "WORK", href: "/#experience" },
                { label: "ABOUT", href: "/#about" },
                { label: "CONTACT", href: "/#contact" },
                { label: "SKILLS", href: "/skills" },
                { label: "EDUCATION", href: "/education" },
                { label: "CERTIFICATIONS", href: "/certifications" },
                { label: "PROJECTS", href: "/projects" },
              ].map(({ label, href }) => (
                <div key={label}>
                  <Link href={href} className="hover:glow-sm transition-all">
                    {">"} {label}
                  </Link>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Socials */}
          <StaggerItem>
            <div className="text-xs tracking-widest glow-dim mb-4">FIND ME</div>
            <div className="space-y-2 text-xs" style={{ color: "var(--crt-brown)" }}>
              {[
                { label: "GITHUB", href: "https://github.com/krsnadadhich" },
                { label: "LINKEDIN", href: "https://linkedin.com/in/krsnadadhich" },
                { label: "EMAIL", href: "mailto:krsnadadhich@gmail.com" },
                { label: "RESUME", href: "/resume.pdf", download: true },
              ].map(({ label, href, download }) => (
                <div key={label}>
                  <a
                    href={href}
                    target={download ? undefined : "_blank"}
                    rel={download ? undefined : "noopener noreferrer"}
                    download={download}
                    className="hover:glow-sm transition-all"
                  >
                    {">"} {label}
                  </a>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerReveal>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-xs"
          style={{
            borderTop: "1px solid var(--crt-border-col)",
            color: "var(--crt-brown-dim)",
          }}
        >
          <div>© 2025–2026 KRISHNA DADHICH — ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-2">
            <span className="crt-status-dot" />
            <span>OPEN TO OPPORTUNITIES</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
