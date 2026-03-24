'use client'

import { useEffect, useState } from 'react'
import { useRepoAnalysis } from '@/hooks/useRepoAnalysis'
import SearchForm from '@/components/SearchForm'
import LoadingState from '@/components/LoadingState'
import ErrorDisplay from '@/components/ErrorDisplay'
import Leaderboard from '@/components/Leaderboard'
import CertificateCard from '@/components/CertificateCard'
import SiteFooter from '@/components/SiteFooter'
import PageHero from '@/components/PageHero'
import CertificateSheet from '@/components/CertificateSheet'
import { DeathCertificate } from '@/lib/types'

const FONT = `var(--font-dm), -apple-system, sans-serif`
const MONO = `var(--font-courier), 'Courier New', monospace`
const BASE_COUNT = 1449
const CERT_PREVIEW: DeathCertificate = {
  repoData: {
    name: 'brackets',
    fullName: 'adobe/brackets',
    description: 'A modern open-source code editor for web design and frontend development.',
    createdAt: '2012-09-04T00:00:00Z',
    pushedAt: '2021-09-01T00:00:00Z',
    isArchived: true,
    stargazersCount: 35200,
    forksCount: 7500,
    openIssuesCount: 0,
    language: 'JavaScript',
    topics: [],
    isFork: false,
    commitCount: 1,
    lastCommitMessage: 'maintenance',
    lastCommitDate: '2021-09-01T00:00:00Z',
  },
  deathIndex: 92,
  deathLabel: 'Very Dead',
  causeOfDeath: 'Started strong. Never finished.',
  deathDate: 'Sep 2021',
  age: '9 years',
  lastWords: 'At least I had good themes.',
  mourners: '35,200 stars, 7,500 forks',
  shareText: 'RIP adobe/brackets',
}

export default function Page() {
  const { url, setUrl, certificate, error, loading, analyze, reset } = useRepoAnalysis()
  const [buried, setBuried] = useState<number | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then((d: { buried: number }) => setBuried(BASE_COUNT + (d.buried ?? 0)))
      .catch(() => {})
      .finally(() => setStatsLoading(false))
  }, [])

  function handleSelect(selectedUrl: string) {
    setUrl(selectedUrl)
    analyze(selectedUrl)
  }

  const idle = !loading && !certificate && !error

  return (
    <main className="page-shell-main">
      <div className="page-shell-inner">

      {/* Hero + Search — hidden once certificate is shown */}
      {!certificate && (
        <>
          <div style={{ marginTop: '12px' }}>
            <PageHero
              subtitle="Paste a repo. See what killed it."
              microcopy={null}
            />
          </div>

          <div style={{ width: '100%', marginTop: '12px' }}>
            <SearchForm url={url} setUrl={setUrl} onSubmit={analyze} onSelect={handleSelect} loading={loading} />
          </div>

          <div style={{ width: '100%', marginTop: '12px' }}>
            <div className="homepage-cert-preview">
              <CertificateSheet cert={CERT_PREVIEW} visible={true} showStamp={false} />
            </div>
            <p style={{ fontFamily: MONO, fontSize: '11px', color: '#938882', textAlign: 'center', margin: '10px 0 0 0', letterSpacing: '0.06em' }}>
              Example death certificate
            </p>
          </div>

          {statsLoading && (
            <p style={{ fontFamily: MONO, fontSize: '11px', color: '#b0aca8', textAlign: 'center', margin: '14px 0 0 0', letterSpacing: '0.06em' }}>
              loading burials...
            </p>
          )}
          {!statsLoading && buried !== null && buried >= 100 && (
            <p style={{ fontFamily: MONO, fontSize: '11px', color: '#b0aca8', textAlign: 'center', margin: '14px 0 0 0', letterSpacing: '0.06em' }}>
              {buried.toLocaleString()} repos buried and counting
            </p>
          )}

        </>
      )}

      {/* Certificate — inline, no redirect */}
      {certificate && !loading && (
        <div className="certificate-scroll-zone" style={{ width: '100%' }}>
          <CertificateCard cert={certificate} onReset={reset} />
        </div>
      )}

      {/* Graveyard — right below social proof */}
      {idle && (
        <div style={{ width: '100%', marginTop: '48px', paddingBottom: 0 }}>
          <div style={{ marginBottom: '14px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: '13px', fontWeight: 600, color: '#b0aca8', margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Famous Deaths
            </p>
          </div>
          <Leaderboard onSelect={handleSelect} />
        </div>
      )}

      {loading && <LoadingState />}
      {error && !loading && <ErrorDisplay error={error} onRetry={() => analyze(url)} />}

      <SiteFooter compact={idle} />
      </div>
    </main>
  )
}
