import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * One photograph, graded for different moments of the day.
 * The page travels morning → clear sky → warm light → deep blue → golden hour
 * using the same landscape, so every section stays in the same visual world.
 */
const tones = {
  morning: 'saturate(0.95) brightness(1.04)',
  clear: 'saturate(1.08) contrast(1.02)',
  warm: 'sepia(0.32) saturate(1.2) hue-rotate(-10deg) brightness(1.03)',
  golden: 'sepia(0.62) saturate(1.55) hue-rotate(-16deg) contrast(1.06) brightness(0.98)',
  night: 'brightness(0.38) saturate(0.7) hue-rotate(8deg) contrast(1.1)',
} as const

export type SkyTone = keyof typeof tones

export function SkyPhoto({
  tone = 'clear',
  position = 'center',
  priority = false,
  className,
  sizes = '100vw',
  alt = '',
}: {
  tone?: SkyTone
  position?: string
  priority?: boolean
  className?: string
  sizes?: string
  alt?: string
}) {
  return (
    <Image
      src="/images/energy-sky.png"
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn('object-cover', className)}
      style={{ objectPosition: position, filter: tones[tone] }}
    />
  )
}

/** Slow, organic lines — energy travelling through air, not through wires. */
export function LightFlow({ className, tone = 'sun' }: { className?: string; tone?: 'sun' | 'sky' | 'light' }) {
  const id = `flow-${tone}`
  const stops = {
    sun: ['#f3d9a8', '#d8a45a'],
    sky: ['#ffffff', '#9cc5d9'],
    light: ['#ffffff', '#f3d9a8'],
  }[tone]
  return (
    <svg aria-hidden viewBox="0 0 1440 600" preserveAspectRatio="none" className={cn('pointer-events-none', className)}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor={stops[0]} stopOpacity="0" />
          <stop offset=".45" stopColor={stops[0]} stopOpacity=".9" />
          <stop offset="1" stopColor={stops[1]} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeLinecap="round">
        <path className="anim-flow" strokeWidth="1.4" d="M-40 420 C 260 300, 520 520, 820 360 S 1260 220, 1500 300" />
        <path className="anim-flow-slow" strokeWidth="1" d="M-40 470 C 300 380, 560 560, 880 420 S 1280 300, 1500 360" />
        <path strokeWidth=".6" opacity=".55" d="M-40 380 C 240 250, 500 470, 800 320 S 1240 170, 1500 250" />
      </g>
    </svg>
  )
}

/** A handful of light motes. CSS-only, paused off-screen, hidden on phones. */
export function Motes({ count = 10, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      {Array.from({ length: count }).map((_, i) => {
        // deterministic pseudo-random layout (no hydration mismatch)
        const x = (i * 37 + 11) % 100
        const y = 30 + ((i * 53) % 60)
        const d = (i * 1.3) % 9
        const s = 2 + (i % 3)
        return (
          <span
            key={i}
            className="anim-mote absolute rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,236,200,.55)]"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
          />
        )
      })}
    </div>
  )
}

/** Soft sun glow. */
export function SunGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'anim-sun pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(255,238,205,.95)_0%,rgba(248,214,160,.45)_30%,rgba(248,214,160,0)_70%)] will-change-transform',
        className,
      )}
    />
  )
}
