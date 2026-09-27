'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { services } from '@/lib/content'
import { Eyebrow, MaskLines, Reveal, useMediaQuery } from './primitives'
import { SkyPhoto, type SkyTone } from './sky'

type Visual = (typeof services)[number]['visual']

const scenes: Record<Visual, { tone: SkyTone; position: string; zoom: number; label: string }> = {
  signal: { tone: 'clear', position: '20% 20%', zoom: 1.25, label: 'Clear sky — the first call' },
  home: { tone: 'warm', position: '100% 100%', zoom: 1.9, label: 'Homes in warm afternoon light' },
  thread: { tone: 'warm', position: '80% 35%', zoom: 1.3, label: 'The same conversation, carried forward' },
}

function Motif({ kind }: { kind: Visual }) {
  const common = { fill: 'none', stroke: 'white', strokeLinecap: 'round' as const }
  return (
    <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 m-auto size-[70%] max-h-[420px] max-w-[420px]">
      {kind === 'signal' &&
        [40, 80, 120, 160].map((r, i) => (
          <motion.circle
            key={r}
            cx="200" cy="200" r={r} {...common}
            strokeOpacity={0.7 - i * 0.14} strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      {kind === 'signal' && <circle cx="200" cy="200" r="6" fill="#f3d9a8" />}
      {kind === 'home' && (
        <>
          <circle cx="270" cy="150" r="34" fill="#f3d9a8" fillOpacity=".9" />
          <motion.path
            d="M40 290 H140 V230 L190 190 L240 230 V290 H360" {...common} strokeWidth="1.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M40 320 C 140 300, 260 340, 360 314" {...common} strokeWidth="1" strokeOpacity=".6" strokeDasharray="2 8"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }}
          />
        </>
      )}
      {kind === 'thread' && (
        <>
          <motion.path
            d="M40 260 C 110 120, 170 120, 200 200 S 290 290, 360 140" {...common} strokeWidth="1.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
          {[[40, 260], [200, 200], [360, 140]].map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r="6" fill="#f3d9a8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.5 }} />
          ))}
        </>
      )}
    </svg>
  )
}

function Scene({ kind, className }: { kind: Visual; className?: string }) {
  const s = scenes[kind]
  return (
    <div className={cn('grain relative overflow-hidden bg-mist', className)}>
      <div className="absolute inset-0" style={{ transform: `scale(${s.zoom})`, transformOrigin: s.position }}>
        <SkyPhoto tone={s.tone} position={s.position} sizes="(min-width: 1024px) 55vw, 100vw" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/35 via-ink/5 to-transparent" />
      <Motif kind={kind} />
      <p className="eyebrow absolute bottom-5 left-5 text-white/80">{s.label}</p>
    </div>
  )
}

/** 04 — The service. Editorial sequence; each chapter drives the pinned visual. */
export function Services() {
  const [active, setActive] = useState(0)
  // The pinned visual only exists on desktop. On phones/tablets each service shows its own image,
  // so nothing hidden is mounted/unmounted while scrolling (that caused 60ms+ stalls on mobile).
  const isDesktop = useMediaQuery('(min-width: 1024px) and (min-height: 480px)')

  return (
    <section id="services" aria-labelledby="services-title" className="relative border-t border-ink/10 bg-cloud pb-24 pt-20 md:pb-40 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-b border-ink/10 pb-10 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-ink/50">02 — Services</Eyebrow>
            <h2 id="services-title" className="display mt-6 text-[clamp(3.4rem,9vw,9.5rem)]">
              <MaskLines lines={['What we do.']} />
            </h2>
          </div>
          <Reveal className="max-w-[340px] text-base leading-relaxed text-ink/60">
            Three lines of work, one way of working: by telephone, with a person on the line.
          </Reveal>
        </div>

        <div className="relative mt-4 pin:grid pin:grid-cols-12 pin:gap-12">
          {/* chapters */}
          <div className="pin:col-span-5">
            {services.map((s, i) => (
              <motion.article
                key={s.no}
                onViewportEnter={isDesktop ? () => setActive(i) : undefined}
                viewport={{ margin: '-45% 0px -45% 0px' }}
                aria-labelledby={`svc-${s.no}`}
                className="border-b border-ink/10 py-12 pin:flex pin:min-h-[80vh] pin:flex-col pin:justify-center pin:py-0"
              >
                <Scene kind={s.visual} className="mb-8 aspect-[4/3] pin:hidden" />
                <div className="flex items-baseline gap-5">
                  <span className={cn('eyebrow transition-colors duration-500', active === i ? 'text-sun' : 'text-ink/35')}>{s.no}</span>
                  <h3
                    id={`svc-${s.no}`}
                    className={cn(
                      'text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium leading-none tracking-[-0.05em] transition-colors duration-700',
                      active === i ? 'text-ink' : 'pin:text-ink/25',
                    )}
                  >
                    {s.title}
                  </h3>
                </div>
                <div className="mt-6 max-w-[440px] pl-0 sm:pl-10">
                  <p className="text-xl font-medium leading-snug tracking-[-0.02em]">{s.lead}</p>
                  <p className="mt-4 text-base leading-relaxed text-ink/65">{s.body}</p>
                  {'link' in s && (
                    <a href={s.link.href} className="tap mt-5 inline-flex items-center gap-3 text-sm font-medium text-sky-deep hover:text-ink">
                      <span aria-hidden className="h-px w-6 bg-sun" />
                      {s.link.label} ↓
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* pinned visual */}
          {isDesktop && (
          <div className="hidden pin:col-span-7 pin:block">
            <div className="sticky top-24 h-[calc(100svh-8rem)] py-6">
              <div className="relative h-full overflow-hidden rounded-[2px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Scene kind={services[active].visual} className="h-full" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute right-6 top-6 flex gap-1.5" aria-hidden>
                  {services.map((s, i) => (
                    <span key={s.no} className={cn('h-1 rounded-full bg-white transition-all duration-500', i === active ? 'w-8' : 'w-2 opacity-50')} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
