'use client'

import { MotionConfig } from 'framer-motion'

/** Honours prefers-reduced-motion for every entrance animation (opacity is kept). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
