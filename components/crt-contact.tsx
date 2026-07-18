"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Reveal } from "@/components/reveal"

const INFO_ROWS = [
  { k: "EMAIL", v: "krsnadadhich@gmail.com" },
  { k: "PHONE", v: "+91 9521409593" },
  { k: "GITHUB", v: "github.com/krsnadadhich" },
  { k: "LINKEDIN", v: "linkedin.com/in/krsnadadhich" },
  { k: "LOCATION", v: "Bengaluru, Karnataka" },
  { k: "AVAILABILITY", v: "Available Now" },
]

const STATUS_BARS = [
  { name: "ML EXPERTISE", val: 95 },
  { name: "DEPLOYMENT READY", val: 100 },
  { name: "COFFEE LEVEL", val: 90 },
  { name: "PROJECT PIPELINE", val: 80 },
]

export function CRTContact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message")
      }
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setSending(false)
    }
  }

  function handleReset() {
    setSent(false)
    setError(null)
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <section id="contact" className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- CONTACT.SH ------------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          CONTACT.SH
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          LET'S BUILD SOMETHING BEAUTIFUL TOGETHER
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left column: info + status */}
        <div className="space-y-6">

          <Reveal className="p-6 crt-border" style={{ background: "var(--crt-paper)" }}>
            <div className="text-xs tracking-widest glow-dim mb-4">CONTACT INFO</div>
            <div className="space-y-3 text-sm" style={{ color: "var(--crt-brown)" }}>
              {INFO_ROWS.map(({ k, v }) => (
                <div key={k} className="flex gap-4">
                  <span
                    className="w-28 shrink-0 text-xs tracking-widest"
                    style={{ color: "var(--crt-brown-dim)" }}
                  >
                    {k}
                  </span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="p-6 crt-border" style={{ background: "var(--crt-paper)" }}>
            <div className="text-xs tracking-widest glow-dim mb-4">SYSTEM STATUS</div>
            <div className="space-y-3">
              {STATUS_BARS.map(({ name, val }) => (
                <div key={name} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span style={{ color: "var(--crt-brown-dim)" }}>{name}</span>
                    <span style={{ color: "var(--crt-brown)" }}>{val}%</span>
                  </div>
                  <div className="h-1 w-full" style={{ background: "var(--crt-border-col)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${val}%`,
                        background: "var(--crt-amber)",
                        boxShadow: "0 0 6px var(--crt-amber)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>

        {/* Right column: form */}
        <Reveal delay={0.15} className="p-6 crt-border" style={{ background: "var(--crt-paper)" }}>
          <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4"
            >
              <div
                className="text-6xl glow"
                style={{ fontFamily: "var(--font-vt323), monospace" }}
              >
                SENT
              </div>
              <div className="text-xs tracking-widest glow-dim">
                TRANSMISSION COMPLETE
              </div>
              <div className="text-sm" style={{ color: "var(--crt-brown)" }}>
                Message received. I'll be back in touch soon.
              </div>
              <button
                onClick={handleReset}
                className="text-xs tracking-widest mt-4 px-4 py-2 crt-cta-secondary"
              >
                [ SEND ANOTHER ]
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6">
              <div className="text-xs tracking-widest glow-dim mb-2">
                $ ./compose_message.sh
              </div>

              <div>
                <label className="block text-xs tracking-widest mb-2 glow-dim">
                  YOUR_NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full text-sm px-3 py-2 outline-none crt-input"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest mb-2 glow-dim">
                  YOUR_EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full text-sm px-3 py-2 outline-none crt-input"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest mb-2 glow-dim">
                  MESSAGE_BODY
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full text-sm px-3 py-2 outline-none resize-none crt-input"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="w-full py-3 text-xs tracking-[0.3em] crt-cta-primary"
                style={{ color: sending ? "var(--crt-brown-dim)" : undefined }}
                animate={sending ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
                transition={sending ? { duration: 1, repeat: Infinity } : { duration: 0.15 }}
              >
                {sending ? "[ TRANSMITTING... ]" : "[ SEND MESSAGE ]"}
              </motion.button>

              {error && (
                <div className="text-xs text-center" style={{ color: "#ff6b6b" }}>
                  ⚠ {error} — please try again or email me directly.
                </div>
              )}
            </motion.form>
          )}
          </AnimatePresence>
        </Reveal>

      </div>
    </section>
  )
}
