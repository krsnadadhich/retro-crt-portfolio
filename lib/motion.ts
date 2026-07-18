import type { Transition, Variants } from 'motion/react'

/** Matches the existing .boot-in CSS easing so JS-driven and CSS-driven motion feel like one system. */
export const crtEase = [0.22, 1, 0.36, 1] as const

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: crtEase,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
}

/** Amber phosphor glow-on-hover, for buttons/links/cards. */
export const glowHover: Variants = {
  rest: { boxShadow: '0 0 0px rgba(196, 122, 26, 0)' },
  hover: {
    boxShadow: 'var(--crt-glow-sm)',
    transition: { duration: 0.15 },
  },
}

/** Spring "stamp" overshoot for credential/cert-style reveals. */
export const stampSpring: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

/** CRT "power cycle" — used for boot sequence exit and route/page transitions. */
export const powerCycle: Variants = {
  initial: { opacity: 0, scaleY: 0.01 },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.5, ease: crtEase },
  },
  exit: {
    opacity: 0,
    scaleY: 0.01,
    transition: { duration: 0.3, ease: crtEase },
  },
}
