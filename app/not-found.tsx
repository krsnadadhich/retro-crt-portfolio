import Link from "next/link"

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="text-xs tracking-widest glow-dim mb-4">
        -- ERROR.LOG ------------------------------------------------
      </div>
      <h1
        className="glow mb-4"
        style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(3rem,10vw,6rem)" }}
      >
        404
      </h1>
      <div className="text-sm glow-sm mb-2" style={{ color: "var(--crt-brown-bright)" }}>
        SIGNAL LOST — PAGE NOT FOUND
      </div>
      <p className="text-xs max-w-md mb-10" style={{ color: "var(--crt-brown-dim)" }}>
        The requested route does not exist on this system. It may have been moved, renamed, or never
        existed in the first place.
      </p>
      <Link
        href="/"
        className="text-xs tracking-[0.2em] px-6 py-3 crt-cta-primary"
      >
        [ RETURN HOME ]
      </Link>
    </section>
  )
}
