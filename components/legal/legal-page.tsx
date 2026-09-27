import { company } from '@/lib/content'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/contact'
import { MotionProvider } from '@/components/landing/motion'
import { SkyPhoto } from '@/components/landing/sky'

export type LegalSection = { id: string; title: string; content: React.ReactNode }

/** Shared layout for the Privacy Policy and Messaging Terms. Quiet, readable, same visual world. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  related,
}: {
  eyebrow: string
  title: string
  updated: string
  intro: React.ReactNode
  sections: LegalSection[]
  related: { label: string; href: string }
}) {
  return (
    <MotionProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cloud">
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* morning sky band */}
        <div className="relative isolate overflow-hidden bg-mist pb-16 pt-36 md:pb-24 md:pt-48">
          <div aria-hidden className="absolute inset-0 -z-10 opacity-60">
            <SkyPhoto tone="morning" position="50% 20%" priority />
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-cloud/70 via-cloud/60 to-cloud" />
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <p className="eyebrow flex items-center gap-3 text-ink/55">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {eyebrow}
            </p>
            <h1 className="display mt-6 text-[clamp(3rem,8vw,7.5rem)] text-ink">{title}</h1>
            <p className="mt-6 text-sm text-ink/55">Last updated {updated}</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 sm:px-8 md:pb-40 lg:grid-cols-12 lg:px-12">
          {/* table of contents */}
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-28">
              <p className="eyebrow text-ink/45">On this page</p>
              <ol className="mt-4 space-y-2 border-l border-ink/10 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-0.5 pl-4 text-ink/60 transition-colors hover:border-sun hover:text-ink">
                      <span className="mr-2 font-mono text-[11px] text-ink/35">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <a href={related.href} className="tap mt-8 inline-flex items-center gap-2 text-sm font-medium text-sky-deep hover:text-ink">
                {related.label} <span aria-hidden>→</span>
              </a>
            </nav>
          </aside>

          {/* body */}
          <article className="lg:col-span-7 lg:col-start-5">
            <div className="text-xl leading-relaxed tracking-[-0.01em] text-ink/80 md:text-2xl">{intro}</div>

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-14 scroll-mt-28 border-t border-ink/10 pt-10">
                <p className="eyebrow text-sun">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={`${s.id}-h`} className="mt-2 text-3xl font-medium tracking-[-0.035em] text-ink md:text-4xl">
                  {s.title}
                </h2>
                <div className="legal-prose mt-6">{s.content}</div>
              </section>
            ))}

            {/* contact block, as on the original pages */}
            <section aria-labelledby="legal-contact" className="mt-16 rounded-[2px] bg-deep p-8 text-cloud md:p-10">
              <h2 id="legal-contact" className="eyebrow text-cloud/55">Contact</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-cloud/50">Company</dt>
                  <dd className="mt-1 font-medium">{company.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-cloud/50">Phone (toll-free)</dt>
                  <dd className="mt-1 font-medium"><a href={company.phoneHref} className="underline decoration-sun/50 underline-offset-4 hover:decoration-sun">{company.phone}</a></dd>
                </div>
                <div>
                  <dt className="text-xs text-cloud/50">Email</dt>
                  <dd className="mt-1 font-medium"><a href={`mailto:${company.email}`} className="underline decoration-sun/50 underline-offset-4 hover:decoration-sun">{company.email}</a></dd>
                </div>
                <div>
                  <dt className="text-xs text-cloud/50">Address</dt>
                  <dd className="mt-1 font-medium">{company.address.join(', ')}</dd>
                </div>
              </dl>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </MotionProvider>
  )
}
