'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { conversation } from '@/lib/content'
import { Eyebrow, MaskLines, Reveal, useSmoothScroll } from './primitives'

const { stages, principle } = conversation

/**
 * 01 — About us · Our process. "Every conversation has a purpose" + "Human, by design" in one place:
 * pinned on desktop, a ray of warm light travels the five stages and the active one opens up.
 * Below 1024px wide or 700px tall (phones, tablets, short landscape screens) it becomes a plain
 * vertical timeline (no pinning).
 */
export function Conversation() {
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useSmoothScroll(ref, ['start start', 'end end'])
  const line = useTransform(scrollYProgress, [0.06, 0.88], [0, 1], { clamp: true })
  const glowX = useTransform(line, [0, 1], ['0%', '100%'])
  const [active, setActive] = useState(0)
  useMotionValueEvent(line, 'change', (v) => {
    setActive(Math.min(stages.length - 1, Math.floor(v * (stages.length - 1) + 0.15)))
  })

  return (
    <section
      id="how-we-work"
      ref={ref}
      aria-labelledby="how-title"
      className="relative bg-gradient-to-b from-cloud via-ivory/60 to-cloud row:h-[320vh]"
    >
      <div className="relative overflow-hidden py-24 row:sticky row:top-0 row:flex row:h-[100svh] row:flex-col row:justify-center row:pb-0 row:pt-[72px]">

        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 row:px-12">
          <div className="grid gap-10 row:grid-cols-12 row:items-end">
            <div className="row:col-span-7">
              <Eyebrow className="text-ink/50">About us — Our process</Eyebrow>
              <h2 id="how-title" className="display mt-6 text-[clamp(2.6rem,6.4vw,7rem)] row:mt-[min(1.5rem,2.5svh)] row:text-[clamp(2.3rem,min(6.4vw,10.5svh),7rem)]">
                <MaskLines lines={['Every conversation', <span key="p" className="serif text-sky-deep">has a purpose.</span>]} />
              </h2>
            </div>
            <Reveal delay={0.15} className="row:col-span-4 row:col-start-9">
              <p className="serif text-4xl text-ink row:text-[clamp(1.6rem,4.6svh,2.25rem)]">Human, by design.</p>
              <p className="mt-3 text-base leading-relaxed text-ink/65 row:text-[clamp(0.9rem,2.1svh,1rem)]">{principle}</p>
            </Reveal>
          </div>

          <div className="relative mt-14 row:mt-[min(5rem,8svh)]">
            {/* warm light following the head of the ray (desktop) */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 hidden h-80 row:block">
              {/* transform-only (no `left`) so the glow moves on the GPU without repaints */}
              <motion.div style={{ x: glowX }} className="absolute inset-0 will-change-transform">
                <div className="absolute left-0 top-0 size-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,217,168,.55),rgba(243,217,168,0)_65%)]" />
              </motion.div>
            </div>

            <ol className="relative grid gap-8 pl-8 row:grid-cols-5 row:gap-0 row:pl-0 row:pt-[min(2.5rem,4.5svh)]">
              {/* track + light — vertical on phones, horizontal from md */}
              <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-ink/12 row:bottom-auto row:left-0 row:right-0 row:top-0 row:h-px row:w-auto" />
              <motion.span
                aria-hidden
                style={{ scaleY: scrollYProgress }}
                className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-sun-soft via-sun to-sky-deep row:hidden"
              />
              <motion.span
                aria-hidden
                style={{ scaleX: line }}
                className="absolute left-0 right-0 top-0 hidden h-px origin-left will-change-transform bg-gradient-to-r from-sun-soft via-sun to-sky-deep shadow-[0_0_14px_1px_rgba(216,164,90,.6)] row:block"
              />

              {stages.map((stage, i) => {
                const on = i <= active
                return (
                  <li key={stage.title} className="relative row:pr-6">
                    <span
                      aria-hidden
                      className={cn(
                        'absolute -left-8 top-[0.35em] size-[11px] rounded-full border border-sun bg-sun transition-all duration-700 ease-premium row:-top-[calc(min(2.5rem,4.5svh)+5.5px)] row:left-0',
                        !on && 'row:border-ink/25 row:bg-cloud',
                        i === active && 'row:shadow-[0_0_0_7px_rgba(216,164,90,.2)]',
                      )}
                    />
                    <span className="eyebrow block text-ink/40">0{i + 1}</span>
                    <h3
                      className={cn(
                        'mt-1 text-[clamp(1.7rem,2.6vw,2.6rem)] font-medium tracking-[-0.04em] text-ink transition-colors duration-700 row:text-[clamp(1.35rem,min(2.6vw,4.6svh),2.6rem)]',
                        !on && 'row:text-ink/20',
                      )}
                    >
                      {stage.title}
                    </h3>
                    <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-ink/60 row:sr-only">{stage.body}</p>
                  </li>
                )
              })}
            </ol>

            {/* the active stage, told in one line (desktop) */}
            <div className="relative mt-14 hidden h-20 row:mt-[min(3.5rem,6svh)] row:block row:h-[min(5rem,9svh)]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-6 text-[clamp(1.05rem,min(2vw,3.3svh),1.9rem)] font-medium tracking-[-0.025em] text-ink/80"
                >
                  <span className="eyebrow text-sun">0{active + 1} / 0{stages.length}</span>
                  {stages[active].body}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
