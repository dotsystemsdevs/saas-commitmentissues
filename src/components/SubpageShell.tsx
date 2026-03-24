import type { ReactNode } from 'react'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import PageHero from '@/components/PageHero'

type Props = {
  subtitle: ReactNode
  title?: string
  microcopy?: ReactNode | null
  /** Primary CTA under the two-line hero (e.g. FAQ) */
  headerExtra?: ReactNode
  children: ReactNode
}

export default function SubpageShell({ subtitle, title, microcopy, headerExtra, children }: Props) {
  return (
    <main className="page-shell-main">
      <div className="page-shell-inner">
        <Link href="/" className="subpage-back-link" aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6"></path>
            <path d="M9 12h12"></path>
          </svg>
        </Link>
        <PageHero subtitle={subtitle} title={title} microcopy={microcopy} brandHref="/" />
        {headerExtra ? <div className="page-hero-extra">{headerExtra}</div> : null}

        <div className="page-shell-body page-shell-body--subpage">{children}</div>

        <SiteFooter />
      </div>
    </main>
  )
}
