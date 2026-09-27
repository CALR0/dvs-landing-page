'use client'

import { useRef } from 'react'
import { motion, useInView, useTransform } from 'framer-motion'
import { energy } from '@/lib/content'
import { ArrowLink, Eyebrow, MaskLines, Reveal, useCalmMotion, useSmoothScroll } from './primitives'
import { LightFlow, Motes, SkyPhoto, SunGlow } from './sky'

/** 06 — The energy. Full-bleed; a home under open sky, and the path a decision travels. */
export function Energy() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '120px 0px' })
  const reduce = useCalmMotion()
  const scrollYProgress = useSmoothScroll(ref, ['start end', 'end start'])
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1.1, 1.1] : [1.22, 1.05])
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])
  const rays = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-8, 8])

  return (
    <section
      id="energy"
      ref={ref}
      data-play={inView ? 'true' : 'false'}
      aria-labelledby="energy-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-mist text-ink"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0 -z-20 will-change-transform">
        <SkyPhoto tone="clear" position="75% 100%" alt="Modern homes beneath a wide blue sky and drifting clouds" />
      </motion.div>

      {/* sunlight rays from the upper right */}
      <motion.div
        aria-hidden
        style={{ rotate: rays }}
        className="absolute -right-[20%] -top-[30%] -z-10 size-[110vmax] origin-top-right bg-[repeating-conic-gradient(from_200deg_at_100%_0%,rgba(255,240,210,.0)_0deg,rgba(255,244,222,.16)_3deg,rgba(255,240,210,0)_7deg)] will-change-transform [mask-image:radial-gradient(circle_at_100%_0%,black,transparent_70%)]"
      />
      <SunGlow className="-z-10 right-[4%] top-[6%] size-[36vw] max-w-[560px]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[65%] bg-gradient-to-b from-cloud/85 via-cloud/40 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-gradient-to-t from-deep/95 via-deep/60 to-transparent lg:h-[55%] lg:from-deep/90 lg:via-deep/50" />
      <Motes count={8} className="-z-10 hidden md:block" />

      <div className="mx-auto w-full max-w-[1440px] px-5 pt-28 sm:px-8 md:pt-36 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow className="text-ink/60">Services — Residential energy</Eyebrow>
            <h2 id="energy-title" className="display mt-6 text-[clamp(2.8rem,7vw,7.5rem)]">
              <MaskLines lines={['Making energy', <>choices <span className="serif text-sky-deep">easier</span></>, 'to understand.']} />
            </h2>
          </div>
          <Reveal delay={0.15} className="self-end lg:col-span-4">
            <p className="max-w-[380px] text-base leading-relaxed text-ink/75">
              {energy.body}
            </p>
            <div className="mt-6">
              <ArrowLink href="#contact">Ask us a question</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>

      {/* the flow */}
      <div className="relative mt-auto w-full pb-12 pt-24 text-cloud md:pb-16">
        <LightFlow className="absolute inset-x-0 top-0 hidden h-40 w-full md:block" tone="sun" />
        <ol className="relative mx-auto grid max-w-[1440px] gap-6 px-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:px-8 lg:grid-cols-5 lg:gap-0 lg:px-12">
          <span aria-hidden className="absolute left-12 right-12 top-[7px] hidden h-px bg-white/25 lg:block" />
          {energy.flow.map((step, i) => (
            <Reveal as="li" key={step.title} delay={0.1 + i * 0.12} className="relative flex gap-4 lg:block lg:pr-8">
              <span
                aria-hidden
                className="relative z-10 mt-1 block size-[15px] shrink-0 rounded-full border border-sun-soft bg-deep lg:mt-0"
              >
                <span className="absolute inset-[3px] rounded-full bg-sun-soft" style={{ opacity: 0.35 + i * 0.16 }} />
              </span>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em] lg:mt-6">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-cloud/65">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
