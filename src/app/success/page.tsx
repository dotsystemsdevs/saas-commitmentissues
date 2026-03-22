'use client'

import Link from 'next/link'

const SERIF = `var(--font-dm), -apple-system, sans-serif`

export default function SuccessPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>🪦</div>
        <h1 style={{ fontFamily: SERIF, fontSize: '1.8rem', fontWeight: 700, color: '#160A06', marginBottom: '16px' }}>
          Payment confirmed.
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: '15px', fontStyle: 'italic', color: '#462D21', lineHeight: 1.8, marginBottom: '36px' }}>
          Your A4 death certificate is ready for download. The deceased has been officially processed.
        </p>
        <button
          onClick={() => console.log('download-a4')}
          style={{ fontFamily: SERIF, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', background: '#1a1a1a', color: '#fff', border: 'none', padding: '12px 28px', cursor: 'pointer', marginBottom: '24px', display: 'block', width: '100%' }}
        >
          ⬇ Download A4 Certificate
        </button>
        <Link href="/" style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#938882', textDecoration: 'none' }}>
          issue another →
        </Link>
      </div>
    </main>
  )
}
