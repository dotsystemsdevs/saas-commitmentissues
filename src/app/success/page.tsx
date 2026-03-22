'use client'

import { useEffect, useRef, useState } from 'react'
import { toBlob } from 'html-to-image'
import Link from 'next/link'
import SubpageShell from '@/components/SubpageShell'
import CertificateSheet from '@/components/CertificateSheet'
import type { DeathCertificate } from '@/lib/types'

const UI = `var(--font-dm), -apple-system, sans-serif`

export default function SuccessPage() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cert, setCert] = useState<DeathCertificate | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pending_cert')
      if (raw) setCert(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [])

  async function handleDownload() {
    if (!cardRef.current || !cert) return
    setDownloading(true)
    try {
      const blob = await toBlob(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#FAF6EF',
        width: 480,
        height: 679,
      })
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${cert.repoData.name}-death-certificate.png`
        a.click()
        URL.revokeObjectURL(url)
        localStorage.removeItem('pending_cert')
        setDone(true)
      }
    } finally {
      setDownloading(false)
    }
  }

  return (
    <SubpageShell subtitle="Payment confirmed." microcopy={null}>

      <div style={{
        border: '2px solid #0a0a0a',
        borderRadius: '12px',
        padding: 'clamp(24px, 6vw, 36px)',
        background: '#fff',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🪦</div>
        <p style={{ fontFamily: UI, fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 700, color: '#160A06', margin: '0 0 8px 0' }}>
          Your certificate is ready
        </p>
        <p style={{ fontFamily: UI, fontSize: '14px', color: '#938882', margin: '0 0 28px 0', lineHeight: 1.6 }}>
          High-res · Print-quality PNG · No watermark
        </p>

        {cert ? (
          done ? (
            <p style={{ fontFamily: UI, fontSize: '14px', color: '#938882', margin: '0 0 20px 0' }}>
              Downloaded. Check your downloads folder.
            </p>
          ) : (
            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{
                fontFamily: UI,
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#fff',
                textDecoration: 'none',
                background: '#0a0a0a',
                borderRadius: '8px',
                padding: '14px 28px',
                display: 'inline-block',
                border: 'none',
                cursor: downloading ? 'wait' : 'pointer',
                transition: 'background 0.15s',
                marginBottom: '16px',
              }}
            >
              {downloading ? 'Generating…' : `Download — ${cert.repoData.name} →`}
            </button>
          )
        ) : (
          <Link
            href="/"
            style={{
              fontFamily: UI,
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#fff',
              textDecoration: 'none',
              background: '#0a0a0a',
              borderRadius: '8px',
              padding: '14px 24px',
              display: 'inline-block',
            }}
          >
            Issue another certificate →
          </Link>
        )}

        {done && (
          <div>
            <Link
              href="/"
              style={{ fontFamily: UI, fontSize: '13px', color: '#938882', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Issue another certificate →
            </Link>
          </div>
        )}
      </div>

      {/* Hidden certificate rendered offscreen for export — no stamp (paid version) */}
      {cert && !done && (
        <div style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
          <CertificateSheet
            ref={cardRef}
            cert={cert}
            visible={true}
            showStamp={false}
          />
        </div>
      )}

    </SubpageShell>
  )
}
