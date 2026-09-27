import { company, nav } from '@/lib/content'
import { Logo } from './header'
import { ArrowLink, Eyebrow, MaskLines, PlayZone, Reveal } from './primitives'
import { LightFlow, SkyPhoto, SunGlow } from './sky'

/** 09 — The next conversation. Golden hour. */
export function Contact() {
  const details = [
    { label: 'Phone (toll-free)', value: company.phone, href: company.phoneHref },
    { label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { label: 'Office', value: company.address.join(', ') },
    { label: 'Hours', value: company.hours },
  ]

  return (
    <PlayZone as="section" id="contact" aria-labelledby="contact-title" className="grain relative isolate overflow-hidden bg-[#caa06a] text-deep">
      <div aria-hidden className="absolute inset-0 -z-20">
        <SkyPhoto tone="golden" position="85% 40%" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f6e3c3]/85 via-[#f3d9a8]/45 to-transparent max-md:bg-gradient-to-b max-md:via-[#f3d9a8]/60" />
      <SunGlow className="-z-10 left-[8%] top-[12%] size-[55vw] max-w-[820px] opacity-90" />
      <LightFlow className="absolute inset-x-0 bottom-[20%] -z-10 h-1/2 w-full opacity-70" tone="light" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-[#f6e3c3]/95 via-[#f6e3c3]/70 to-transparent lg:h-2/5 lg:from-[#f6e3c3]/80 lg:via-transparent" />

      <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-28 sm:px-8 md:pb-16 md:pt-44 lg:px-12">
        <Eyebrow className="text-deep/60">04 — Contact</Eyebrow>
        <h2 id="contact-title" className="display mt-6 text-[clamp(3.2rem,9vw,10rem)]">
          <MaskLines lines={['Let’s start', <span key="c" className="serif">a conversation.</span>]} />
        </h2>
        <Reveal delay={0.15} className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
          <p className="max-w-[360px] text-lg leading-relaxed text-deep/75">Tell us what you&apos;re trying to solve.</p>
          <div className="flex flex-wrap items-center gap-6">
            <ArrowLink href={`mailto:${company.email}`} variant="solid">Contact us</ArrowLink>
            <ArrowLink href={company.phoneHref}>Call {company.phone}</ArrowLink>
          </div>
        </Reveal>

        <dl className="mt-24 grid gap-8 border-t border-deep/20 pt-8 sm:grid-cols-2 lg:mt-36 lg:grid-cols-4">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="eyebrow text-deep/55">{d.label}</dt>
              <dd className="mt-2 text-base font-medium leading-snug">
                {d.href ? (
                  <a href={d.href} className="tap underline decoration-deep/25 underline-offset-4 transition-colors hover:decoration-deep">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </PlayZone>
  )
}

export function Footer() {
  // Phones and tablets: one centred column. From lg (1024px): the three-column layout, left-aligned.
  return (
    <footer data-nav="dark" className="relative overflow-hidden bg-deep text-cloud">
      <div aria-hidden className="absolute inset-0 opacity-[0.14]">
        <SkyPhoto tone="night" position="50% 10%" />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 py-14 text-center sm:px-8 lg:px-12 lg:text-left">
        <div className="grid justify-items-center gap-12 lg:grid-cols-12 lg:justify-items-stretch">
          <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
            <a href="#top" aria-label="Back to top" className="tap"><Logo tone="light" /></a>
            <p className="mt-5 max-w-[320px] text-sm leading-relaxed text-cloud/55">
              Contact center and customer support services.
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="eyebrow text-cloud/40">Explore</p>
            {/* a centred row on phones/tablets, a column on desktop */}
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm lg:flex-col lg:gap-y-2">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="tap inline-block py-1 text-cloud/75 transition-colors hover:text-cloud">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="eyebrow text-cloud/40">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-cloud/75">
              <li><a href={company.phoneHref} className="tap inline-block py-1 hover:text-cloud">{company.phone}</a></li>
              <li><a href={`mailto:${company.email}`} className="tap inline-block py-1 hover:text-cloud">{company.email}</a></li>
              <li>{company.address[0]}<br />{company.address[1]}</li>
              <li>{company.hoursShort}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-cloud/10 pt-6 text-xs text-cloud/45 lg:flex-row lg:justify-between">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <div className="flex gap-6">
            <a href={company.privacyUrl} className="tap hover:text-cloud">Privacy Policy</a>
            <a href={company.smsTermsUrl} className="tap hover:text-cloud">Messaging Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
