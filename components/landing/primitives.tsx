'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

/** Reduced-motion preference, but only after mount — keeps SSR and hydration identical. */
export function useCalmMotion() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !!reduce
}

/** True when the media query matches. False on the server and first paint (hydration-safe). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

/**
 * Scroll progress for a target, smoothed by a light spring.
 * A mouse wheel moves the page in ~100px steps; the spring turns every step into one continuous
 * glide, so all scroll-linked motion (parallax, lines, reveals) stays fluid whatever the input.
 * Smoothing is kept even with reduced motion: it removes abrupt jumps, it doesn't add movement.
 * (Large movement such as parallax is switched off separately via useCalmMotion.)
 * On touch screens the raw value is used: native touch scrolling is already continuous, and a
 * spring there makes content trail behind the finger (measured: up to 29% lag on the hero fade).
 */
type ScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>
export const SCROLL_SPRING = { stiffness: 110, damping: 26, mass: 0.35, restDelta: 0.0005 }
export function useSmoothScroll(target: React.RefObject<HTMLElement | null>, offset: ScrollOptions['offset']) {
  const { scrollYProgress } = useScroll({ target: target as React.RefObject<HTMLElement>, offset })
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING)
  const touch = useMediaQuery('(pointer: coarse)')
  return touch ? scrollYProgress : smooth
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p'
}) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </M>
  )
}

/** Headline revealed line by line, each line rising out of a mask. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  immediate?: boolean
}) {
  // The trigger lives on the unclipped wrapper: the lines themselves start hidden
  // behind their masks, so an IntersectionObserver on them would never fire.
  return (
    <motion.span
      className={cn('block', className)}
      initial="hidden"
      {...(immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn('block', lineClassName)}
            variants={{
              hidden: { y: '105%' },
              show: { y: '0%', transition: { duration: 1.1, delay: delay + i * 0.09, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', className)}>
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  )
}

export function ArrowLink({
  href,
  children,
  tone = 'dark',
  variant = 'line',
  className,
}: {
  href: string
  children: React.ReactNode
  tone?: 'dark' | 'light'
  variant?: 'line' | 'solid'
  className?: string
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'tap group inline-flex items-center gap-3 text-[13px] font-medium tracking-[-0.005em] transition-colors duration-300',
        variant === 'line' && 'border-b pb-1.5',
        variant === 'line' && tone === 'dark' && 'border-ink/25 text-ink hover:border-ink',
        variant === 'line' && tone === 'light' && 'border-white/35 text-white hover:border-white',
        variant === 'solid' && 'rounded-full py-3 pl-5 pr-4',
        variant === 'solid' && tone === 'dark' && 'bg-ink text-cloud hover:bg-deep',
        variant === 'solid' && tone === 'light' && 'bg-cloud text-ink hover:bg-white',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  )
}

/** Sets data-play on its wrapper so CSS ambient animations pause off-screen. */
export function PlayZone({
  children,
  className,
  as = 'div',
  ...rest
}: { children: React.ReactNode; className?: string; as?: 'div' | 'section' } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '120px 0px' })
  const Tag = as as 'div'
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} data-play={inView ? 'true' : 'false'} className={className} {...rest}>
      {children}
    </Tag>
  )
}
