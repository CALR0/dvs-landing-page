'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useTransform } from 'framer-motion'
import { company } from '@/lib/content'
import { ArrowLink, MaskLines, useCalmMotion, useMediaQuery, useSmoothScroll } from './primitives'
import { LightFlow, Motes, SkyPhoto, SunGlow } from './sky'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useCalmMotion()
  const inView = useInView(ref)
  const scrollYProgress = useSmoothScroll(ref, ['start start', 'end start'])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.16])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-25%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  /*
   * Touch screens (phones/tablets). Scroll positions there arrive unevenly (iOS main-thread scroll
   * events, momentum, emulators stepping by 100px), and anything locked 1:1 to them stutters.
   * So scroll only sets a *target*: one write per frame at most, and a short CSS transition on
   * opacity/transform (GPU-composited) glides to it. Steps become a continuous fade on every browser.
   * Mouse/trackpad keeps the spring-smoothed framer path above.
   */
  const touch = useMediaQuery('(pointer: coarse)')
  const imageRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const hero = ref.current, image = imageRef.current, copy = copyRef.current
    if (!touch || !hero || !image || !copy) return
    let raf = 0
    let last = -1
    const apply = () => {
      raf = 0
      const p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight))
      if (Math.abs(p - last) < 0.002) return // nothing visible changed
      last = p
      copy.style.opacity = String(Math.max(0, 1 - p / 0.7))
      copy.style.transform = reduce ? '' : `translate3d(0, ${(-25 * p).toFixed(2)}%, 0)`
      image.style.transform = reduce ? 'scale(1.06)' : `translate3d(0, ${(18 * p).toFixed(2)}%, 0) scale(${(1.06 + 0.1 * p).toFixed(4)})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [touch, reduce])

  return (
    <section
      ref={ref}
      data-play={inView ? 'true' : 'false'}
      aria-labelledby="hero-title"
      data-touch={touch ? 'on' : undefined}
      className="hero relative isolate h-[100svh] min-h-[680px] overflow-hidden bg-mist"
    >
      <motion.div
        ref={imageRef}
        style={touch ? undefined : { y: imgY, scale: imgScale }}
        className="hero-image absolute inset-0 -z-20 will-change-transform"
      >
        <SkyPhoto tone="morning" priority position="62% 60%" alt="Soft morning sky with clouds above a quiet residential neighbourhood" />
      </motion.div>

      {/* legibility wash — warm white from the text side, like light through haze */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-cloud/90 via-cloud/45 to-transparent max-md:bg-gradient-to-b max-md:from-cloud/85 max-md:via-cloud/55 max-md:to-cloud/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-cloud to-transparent" />

      <SunGlow className="-z-10 right-[-6%] top-[8%] size-[46vw] max-w-[720px]" />
      <LightFlow className="absolute inset-x-0 bottom-[6%] -z-10 h-[45%] w-full opacity-80" tone="light" />
      <Motes count={12} className="-z-10 hidden md:block" />

      <motion.div
        ref={copyRef}
        style={touch ? undefined : { y: textY, opacity: textOpacity }}
        className="hero-copy mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 pb-12 pt-[88px] sm:px-8 md:pb-24 md:pt-24 lg:px-12 lg:pb-10 lg:pt-28"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="eyebrow flex items-center gap-3 text-ink/60"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-sun" />
          {company.name} — Contact center & customer support
        </motion.p>

        <h1 id="hero-title" className="display mt-6 text-[clamp(3.2rem,9vw,9.5rem)] text-ink">
          <MaskLines
            immediate
            delay={0.2}
            lines={[
              'We connect',
              <>
                <span className="serif text-sky-deep">people</span> with
              </>,
              'the right service.',
            ]}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:gap-16"
        >
          <p className="max-w-[440px] text-base leading-relaxed text-ink/70 md:text-lg">
            Human-led communication, customer support and follow-up — built around the person on the other end of the line.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <ArrowLink href="#services" variant="solid">Explore our services</ArrowLink>
            <ArrowLink href="#contact">Let&apos;s talk</ArrowLink>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 hidden md:block">
        <div className="mx-auto flex max-w-[1440px] items-end justify-between px-8 pb-8 lg:px-12">
          <div className="flex items-center gap-4 text-ink/55">
            <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
              <span className="anim-cue absolute inset-0 bg-ink/60" />
            </span>
            <span className="eyebrow">Scroll</span>
          </div>
          <p className="eyebrow text-ink/55">
            <a href={company.phoneHref} className="tap hover:text-ink">{company.phone}</a> · {company.hoursShort}
          </p>
        </div>
      </div>
    </section>
  )
}
