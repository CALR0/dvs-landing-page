'use client'

import { motion } from 'framer-motion'
import { company, optOut, trust } from '@/lib/content'
import { ArrowLink, Eyebrow, MaskLines, PlayZone, Reveal } from './primitives'
import { SkyPhoto } from './sky'

/** 07 — The trust. Deep evening blue; the real rules of how Daily VA contacts people. */
export function Trust() {
  return (
    <PlayZone as="section" id="trust" data-nav="dark" aria-labelledby="trust-title" className="grain relative isolate overflow-hidden bg-deep py-24 text-cloud md:py-40">
      {/* slow night clouds */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-40">
        <div className="anim-cloud absolute inset-y-0 -left-[5%] w-[115%]">
          <SkyPhoto tone="night" position="50% 0%" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/40 to-deep" />
      </div>
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-sun/50 to-transparent" />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-cloud/50">03 — Trust</Eyebrow>
            <h2 id="trust-title" className="display mt-6 text-[clamp(3rem,7.5vw,8rem)]">
              <MaskLines lines={['Trust is part', <span key="p" className="serif text-sun-soft">of the process.</span>]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-cloud/65">
              How we contact people matters as much as what we say. These are the rules every conversation follows.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-cloud/12 md:mt-24">
          {trust.map((t, i) => (
            <motion.li
              key={t.word}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group grid gap-4 border-b border-cloud/12 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
            >
              <span className="eyebrow text-sun md:col-span-1">0{i + 1}</span>
              <h3 className="text-[clamp(2.2rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-cloud transition-colors duration-700 group-hover:text-sun-soft md:col-span-6">
                {t.word}
              </h3>
              <p className="max-w-[460px] text-base leading-relaxed text-cloud/70 md:col-span-5">{t.body}</p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="text-lg leading-relaxed text-cloud/80">
              <strong className="font-semibold text-sun-soft">Want us to stop?</strong> Call{' '}
              <a href={company.phoneHref} className="underline decoration-sun/60 underline-offset-4 hover:decoration-sun">{company.phone}</a>,{' '}
              {optOut.text}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap items-end gap-8 md:col-span-4 md:col-start-9 md:justify-end">
            <ArrowLink href={company.smsTermsUrl} tone="light">Messaging Terms</ArrowLink>
            <ArrowLink href={company.privacyUrl} tone="light">Privacy Policy</ArrowLink>
          </Reveal>
        </div>
      </div>
    </PlayZone>
  )
}
