"use client"

import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { powerCycle } from "@/lib/motion"

/**
 * CRT "power cycle" transition between routes. Keyed on pathname only (not the hash
 * fragment), so in-page anchor scrolling on `/` never triggers this — only real
 * route changes do.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={powerCycle}
        style={{ transformOrigin: "top" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
