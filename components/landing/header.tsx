'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import { company, nav } from '@/lib/content'
import { SkyPhoto } from './sky'

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('flex items-center gap-3 transition-colors duration-700 ease-premium', tone === 'light' ? 'text-cloud' : 'text-ink')}>
      <svg aria-hidden viewBox="0 0 32 32" className="size-8">
        <circle cx="16" cy="16" r="15.25" fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" />
        <circle cx="16" cy="17" r="5.5" fill="#d8a45a" />
        <path d="M4.5 19.5 C 10 17, 22 22, 27.5 18.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[-0.02em]">
        Daily VA <span className="font-normal opacity-55">Services</span>
      </span>
    </span>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  // dark sections are looked up once, not on every scroll event
  const darkSections = useRef<Element[]>([])
  useEffect(() => {
    darkSections.current = Array.from(document.querySelectorAll('[data-nav="dark"]'))
  }, [])
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
    // switch to a deep-blue bar while the header sits over a dark section (reads only, no layout writes)
    const probe = 32
    setDark(
      darkSections.current.some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= probe && r.bottom >= probe
      }),
    )
  })
  const onDark = dark && scrolled && !open

  /*
   * Mobile menu — built for 60fps on phones:
   * - always mounted (no mount/image decode when tapping the button), hidden with visibility + inert;
   * - the circular reveal is a small solid circle scaled up with `transform` (GPU), not an animated
   *   clip-path (which repaints the whole screen every frame);
   * - while open, the page's ambient animations pause (it is fully covered and scroll-locked);
   * - tapping a section jumps there *under* the menu, then the menu shrinks away — no long smooth
   *   scroll through heavy sections while the close animation runs.
   */
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const [menuScale, setMenuScale] = useState(30)

  // scale needed for an 80px circle centred on the button to cover the farthest corner
  const measureCircle = () => {
    const b = menuButton.current?.getBoundingClientRect()
    if (!b || !b.width) return
    const cx = b.left + b.width / 2
    const cy = b.top + b.height / 2
    const far = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy))
    setMenuScale(Math.ceil((far * 2) / 80) + 1)
  }
  const openMenu = () => {
    measureCircle()
    setOpen(true)
  }
  const closeMenu = (returnFocus = true) => {
    setOpen(false)
    if (returnFocus) menuButton.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    const root = document.documentElement
    if (open) {
      root.dataset.menu = 'open' // scroll lock: CSS, mobile/tablet widths only (see globals.css)
      const t = window.setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 350)
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
          menuButton.current?.focus({ preventScroll: true })
        }
      }
      // The screen can change while the menu is open (rotating the phone, resizing the window,
      // switching device in responsive mode). Re-cover the new screen; and if it became desktop
      // width — where the menu is hidden — close it so the page is never left scroll-locked.
      const desktop = window.matchMedia('(min-width: 1024px)')
      const onResize = () => (desktop.matches ? setOpen(false) : measureCircle())
      window.addEventListener('keydown', onKey)
      window.addEventListener('resize', onResize)
      return () => {
        window.clearTimeout(t)
        window.removeEventListener('keydown', onKey)
        window.removeEventListener('resize', onResize)
      }
    }
    delete root.dataset.menu
  }, [open])

  const onMenuLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split('#')[1]
    const target = hash && window.location.pathname === '/' ? document.getElementById(hash) : null
    if (!target) return closeMenu(false) // another page: let the browser navigate normally
    e.preventDefault()
    e.currentTarget.dataset.picked = 'true' // instant feedback on the tapped item
    const picked = e.currentTarget
    const root = document.documentElement
    delete root.dataset.menu // unlock before jumping
    root.style.scrollBehavior = 'auto'
    target.scrollIntoView({ block: 'start' }) // instant jump, hidden under the menu
    root.style.scrollBehavior = ''
    history.pushState(null, '', `#${hash}`)
    // Arriving somewhere new (images to decode, entrance animations to set up) costs a few heavy
    // frames: let them happen while the menu still covers the screen, and start the close animation
    // once the main thread is idle (at most 200ms later) so it plays on a quiet thread.
    const close = () => {
      delete picked.dataset.picked
      closeMenu(false)
    }
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(close, { timeout: 200 })
    else setTimeout(close, 120) // Safari
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative z-10">
        {/* Backgrounds are separate layers that only fade (opacity), so the bar never
            changes size or position — no jump when the glass appears or disappears. */}
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 border-b border-ink/10 bg-cloud/75 shadow-[0_8px_30px_-18px_rgba(17,41,58,.35)] backdrop-blur-xl transition-opacity duration-700 ease-premium',
            scrolled && !open && !onDark ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 border-b border-cloud/10 bg-deep/70 backdrop-blur-xl transition-opacity duration-700 ease-premium',
            onDark ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="/" className="tap" aria-label={`${company.name} — home`} onClick={() => setOpen(false)}>
            <Logo tone={onDark ? 'light' : 'dark'} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-10">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={cn('nav-item text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-500', onDark ? 'text-cloud/70 hover:text-cloud' : 'text-ink/70 hover:text-ink')}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={company.phoneHref}
              className={cn(
                'hidden items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tabular-nums transition-colors sm:inline-flex',
                onDark ? 'bg-cloud text-ink hover:bg-white' : 'bg-ink text-cloud hover:bg-deep',
              )}
            >
              Call {company.phone}
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => (open ? closeMenu() : openMenu())}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative flex size-11 items-center justify-center rounded-full border border-ink/15 bg-cloud/80 backdrop-blur lg:hidden"
            >
              <span className={cn('absolute h-px w-4 bg-ink transition-transform duration-500 ease-premium', open ? 'rotate-45' : '-translate-y-[3px]')} />
              <span className={cn('absolute h-px w-4 bg-ink transition-transform duration-500 ease-premium', open ? '-rotate-45' : 'translate-y-[3px]')} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open ? 'true' : 'false'}
        inert={!open}
        className="menu fixed inset-0 lg:hidden"
        style={{ '--menu-scale': menuScale } as React.CSSProperties}
      >
        {/* expanding circle, anchored on the menu button */}
        <div aria-hidden className="menu-circle" />
        {/* sky, fades in over the circle (opacity only) */}
        <div aria-hidden className="menu-sky">
          {/* eager: same file as the hero, already cached — never decoded mid-animation */}
          <SkyPhoto tone="morning" position="30% 20%" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-mist/40 via-cloud/70 to-cloud" />
        </div>
        <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-5 pb-10 pt-28 sm:px-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <a
                key={item.href}
                ref={i === 0 ? firstLink : undefined}
                href={item.href}
                onClick={(e) => onMenuLink(e, item.href)}
                style={{ '--i': i } as React.CSSProperties}
                className="menu-item flex items-baseline gap-4 border-b border-ink/10 py-4 text-[2.6rem] font-medium leading-none tracking-[-0.045em] text-ink"
              >
                <span className="eyebrow text-ink/40">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div style={{ '--i': nav.length + 1 } as React.CSSProperties} className="menu-item mt-auto space-y-1 pt-12 text-sm text-ink/65">
            <a href={company.phoneHref} onClick={() => closeMenu(false)} className="tap block text-lg font-medium text-ink">{company.phone}</a>
            <a href={`mailto:${company.email}`} onClick={() => closeMenu(false)} className="tap block">{company.email}</a>
            <p>{company.hoursShort}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
