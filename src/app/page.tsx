'use client'

import { useRepoAnalysis } from '@/hooks/useRepoAnalysis'
import SearchForm from '@/components/SearchForm'
import LoadingState from '@/components/LoadingState'
import ErrorDisplay from '@/components/ErrorDisplay'
import Leaderboard from '@/components/Leaderboard'
import CertificateCard from '@/components/CertificateCard'
import CertificateSheet from '@/components/CertificateSheet'
import SiteFooter from '@/components/SiteFooter'
import PageHero from '@/components/PageHero'
import type { DeathCertificate } from '@/lib/types'

const FONT = `var(--font-dm), -apple-system, sans-serif`

const DEMO_CERT: DeathCertificate = {
  repoData: {
    name: 'atom',
    fullName: 'atom/atom',
    description: 'The hackable text editor for the 21st Century',
    createdAt: '2014-02-26T19:34:39Z',
    pushedAt: '2022-12-15T00:00:00Z',
    isArchived: true,
    stargazersCount: 60285,
    forksCount: 17341,
    openIssuesCount: 319,
    language: 'CoffeeScript',
    topics: [],
    isFork: false,
    commitCount: 38001,
    lastCommitMessage: 'Archiving the Atom editor',
    lastCommitDate: '2022-12-15T00:00:00Z',
  },
  deathIndex: 10,
  deathLabel: 'Officially Archived',
  causeOfDeath: 'GitHub built VS Code and forgot this existed',
  deathDate: 'December 15, 2022',
  age: '8 years',
  lastWords: 'At least I had good themes.',
  mourners: '60,285 stargazers',
  shareText: 'RIP atom/atom — officially dead.',
}

export default function Page() {
  const { url, setUrl, certificate, error, loading, analyze, reset } = useRepoAnalysis()

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
          {/* Mobile demo cert — above the hero on small screens */}
          {idle && (
            <div className="demo-cert-mobile" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px', marginBottom: '8px' }}>
              <div style={{ position: 'relative', width: '202px', height: '285px', pointerEvents: 'none' }}>
                <div style={{ width: '480px', transform: 'scale(0.42) rotate(-2deg)', transformOrigin: 'top left' }}>
                  <CertificateSheet cert={DEMO_CERT} visible={true} showStamp={true} />
                </div>
              </div>
              <p style={{ fontFamily: `var(--font-courier), monospace`, fontSize: '10px', color: '#b0aca8', letterSpacing: '0.08em', margin: '6px 0 0 0' }}>← sample certificate</p>
            </div>
          )}

          {/* Desktop: hero + preview side by side */}
          <div className="hero-with-demo">
            <div style={{ flex: 1, marginTop: '32px' }}>
              <PageHero
                subtitle="Drop a GitHub URL. We'll write the obituary it deserves."
                microcopy={null}
              />
            </div>
            {idle && (
              <div className="demo-cert-desktop" style={{ pointerEvents: 'none', flexShrink: 0, alignSelf: 'center' }}>
                <div style={{ position: 'relative', width: '202px', height: '285px' }}>
                  <div style={{ width: '480px', transform: 'scale(0.42) rotate(-2deg)', transformOrigin: 'top left' }}>
                    <CertificateSheet cert={DEMO_CERT} visible={true} showStamp={true} />
                  </div>
                </div>
                <p style={{ fontFamily: `var(--font-courier), monospace`, fontSize: '10px', color: '#b0aca8', letterSpacing: '0.08em', margin: '6px 0 0 0', textAlign: 'center' }}>sample certificate</p>
              </div>
            )}
          </div>

          <div style={{ width: '100%', marginTop: '12px' }}>
            <SearchForm url={url} setUrl={setUrl} onSubmit={() => analyze(url)} onSelect={handleSelect} loading={loading} />
          </div>

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
        <div style={{ width: '100%', marginTop: '64px', paddingBottom: '52px' }}>
          <div style={{ marginBottom: '14px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: '13px', fontWeight: 600, color: '#b0aca8', margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              The Graveyard
            </p>
          </div>
          <Leaderboard onSelect={handleSelect} />
        </div>
      )}

      {loading && <LoadingState />}
      {error && !loading && <ErrorDisplay error={error} onRetry={() => analyze(url)} />}

      <SiteFooter />
      </div>
    </main>
  )
}
