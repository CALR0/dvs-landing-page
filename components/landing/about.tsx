'use client'

import { useRef } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'
import { company, identity, pillars } from '@/lib/content'
import { Eyebrow, MaskLines, Reveal, useCalmMotion, useSmoothScroll } from './primitives'
import { SkyPhoto } from './sky'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

/** 01 — About us, part 1: who the company is. The statement lights up word by word as you read. */
export function AboutIntro() {
  const statementRef = useRef<HTMLParagraphElement>(null)
  const reduce = useCalmMotion()
  const scrollYProgress = useSmoothScroll(statementRef, ['start 85%', 'end 45%'])
  const words = identity.statement.split(' ')

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16 bg-cloud pb-10 pt-24 md:pb-16 md:pt-40">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Eyebrow className="text-ink/50">01 — About us</Eyebrow>
        <h2 id="about-title" className="sr-only">About {company.name}</h2>

        <p
          ref={statementRef}
          className="mt-8 max-w-[22ch] text-[clamp(1.9rem,4.2vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-ink sm:max-w-[24ch]"
        >
          <span>{company.name} </span>
          {reduce
            ? identity.statement
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
        </p>

        <dl className="mt-16 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {identity.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <dt className="eyebrow text-sun">{f.label}</dt>
              <dd className="mt-3 max-w-[280px] text-lg leading-snug tracking-[-0.015em] text-ink">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

/** 01 — About us, part 3: a cinematic pause, then the principles in annual-report form. */
export function Principles() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useCalmMotion()
  const scrollYProgress = useSmoothScroll(ref, ['start end', 'end start'])
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])
  // the image "opens up" with two cloud-coloured curtains that only scale (GPU), not an animated clip-path
  const curtain = useTransform(scrollYProgress, [0, 0.4], reduce ? [0, 0] : [1, 0])

  return (
    <section id="principles" aria-labelledby="principles-title" className="relative bg-cloud pb-16 md:pb-28">
      {/* cinematic image that opens up as it enters */}
      <div ref={ref} className="grain relative h-[80svh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0 will-change-transform">
          <SkyPhoto tone="warm" position="30% 45%" alt="Late-afternoon clouds lit warm by the sun" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep/75 via-deep/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 md:pb-16 lg:px-12">
            <p className="display max-w-[14ch] text-[clamp(2.8rem,7vw,7.5rem)] text-cloud">
              <MaskLines lines={['Behind every', 'conversation', <span key="p" className="serif text-sun-soft">is a person.</span>]} />
            </p>
          </div>
        </div>
        <motion.div aria-hidden style={{ scaleX: curtain }} className="absolute inset-y-0 left-0 z-10 w-[6%] origin-left bg-cloud will-change-transform" />
        <motion.div aria-hidden style={{ scaleX: curtain }} className="absolute inset-y-0 right-0 z-10 w-[6%] origin-right bg-cloud will-change-transform" />
      </div>

      <div className="relative mx-auto mt-24 max-w-[1440px] px-5 sm:px-8 md:mt-40 lg:px-12">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-0 size-[40vw] rounded-full bg-[radial-gradient(circle,rgba(243,217,168,.4),transparent_65%)]" />
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-ink/50">About us — Our principles</Eyebrow>
            <h2 id="principles-title" className="display mt-6 text-[clamp(3.2rem,7vw,7rem)]">
              <MaskLines lines={['People.', 'Process.', <span key="p" className="serif text-sky-deep">Purpose.</span>]} />
            </h2>
            <Reveal delay={0.1} className="mt-10 max-w-[360px] border-t border-ink/10 pt-6 text-base leading-relaxed text-ink/60">
              Three commitments from our{' '}
              <a href={company.privacyUrl} className="underline decoration-sun/60 underline-offset-4 hover:text-ink">Privacy Policy</a>{' '}
              that protect every consumer we speak with.
            </Reveal>
          </div>

          <ol className="relative lg:col-span-6 lg:col-start-7">
            {pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.no}
                delay={i * 0.08}
                className={cn('border-t border-ink/12 py-10', i === 1 && 'lg:ml-[18%]', i === 2 && 'lg:ml-[36%]')}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[clamp(2rem,3.4vw,3.2rem)] font-medium tracking-[-0.045em]">{p.title}</h3>
                  <span className="eyebrow text-sun">{p.no}</span>
                </div>
                <p className="mt-4 max-w-[400px] text-base leading-relaxed text-ink/65">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
