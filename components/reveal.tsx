"use client"

import { motion, type Variants } from "motion/react"
import type { CSSProperties, ReactNode } from "react"
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion"

interface RevealProps {
  children: ReactNode
  delay?: number
  variants?: Variants
  className?: string
  style?: CSSProperties
}

/** One-time scroll reveal — the shared primitive every section wraps its content in. */
export function Reveal({ children, delay = 0, variants = fadeUp, className, style }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Parent wrapper for staggered list/grid reveals — pair with <StaggerItem> for each child. */
export function StaggerReveal({ children, className, style }: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  variants?: Variants
  className?: string
  style?: CSSProperties
}

export function StaggerItem({ children, variants = staggerItem, className, style }: StaggerItemProps) {
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  )
}
