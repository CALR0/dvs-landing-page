'use client'

import { useEffect } from 'react'

/** Home sections → tab title, in page order. Several sections belong to the same menu entry. */
const sections: [id: string, title: string][] = [
  ['about', 'About'],
  ['how-we-work', 'About'],
  ['principles', 'About'],
  ['services', 'Services'],
  ['energy', 'Services'],
  ['trust', 'Trust'],
  ['contact', 'Contact'],
]

/**
 * Keeps the browser tab title in step with the section being read: "DVS - Home", "DVS - About"…
 * Current section = the last one whose top has passed the middle of the screen. At the very end
 * of the page (footer) it is always "Contact", whatever the window height or zoom.
 */
export function SectionTitle() {
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const root = document.documentElement
      const atEnd = window.scrollY + window.innerHeight >= root.scrollHeight - 4
      let title = 'Home'
      if (atEnd) title = 'Contact'
      else {
        const middle = window.innerHeight / 2
        for (const [id, name] of sections) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= middle) title = name
        }
      }
      const next = `DVS - ${title}`
      if (document.title !== next) document.title = next
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      document.title = 'DVS - Home'
    }
  }, [])
  return null
}
