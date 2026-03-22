'use client'

import Link from 'next/link'

const SERIF = `var(--font-dm), -apple-system, sans-serif`
const SANS  = `var(--font-dm), -apple-system, sans-serif`

export default function PricingPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 64px' }}>
      <div style={{ width: '100%', maxWidth: '620px' }}>

        <Link href="/" style={{ fontFamily: SANS, fontSize: '12px', color: '#938882', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '48px' }}>
          ← back
        </Link>

        <div style={{ borderBottom: '2px solid #160A06', paddingBottom: '24px', marginBottom: '40px' }}>
          <p style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#938882', marginBottom: '12px' }}>commitmentissues.dev</p>
          <h1 style={{ fontFamily: SERIF, fontSize: '2.2rem', fontWeight: 700, color: '#160A06', lineHeight: 1.15, margin: 0 }}>Pricing</h1>
        </div>

        {/* Free tier */}
        <div style={{ border: '1px solid #b0aca8', padding: '28px', marginBottom: '16px' }}>
          <p style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#938882', marginBottom: '12px' }}>Free</p>
          <p style={{ fontFamily: SERIF, fontSize: '2rem', fontWeight: 700, color: '#160A06', marginBottom: '16px' }}>$0</p>
          <ul style={{ fontFamily: SERIF, fontSize: '14px', color: '#462D21', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
            <li>Death certificates for any public repo</li>
            <li>Share image (1080×1350px)</li>
            <li>Recently buried history</li>
          </ul>
        </div>

        {/* Paid tier */}
        <div style={{ border: '2px solid #160A06', padding: '28px', marginBottom: '40px' }}>
          <p style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8b0000', marginBottom: '12px' }}>Premium</p>
          <p style={{ fontFamily: SERIF, fontSize: '2rem', fontWeight: 700, color: '#160A06', marginBottom: '16px' }}>$4.99 <span style={{ fontSize: '14px', fontWeight: 400, color: '#938882' }}>per certificate</span></p>
          <ul style={{ fontFamily: SERIF, fontSize: '14px', color: '#462D21', lineHeight: 2, paddingLeft: '20px', margin: '0 0 24px 0' }}>
            <li>Everything in Free</li>
            <li>Download as A4 PDF — print-ready</li>
            <li>High resolution (300 DPI)</li>
          </ul>
          <button
            onClick={() => console.log('stripe-a4')}
            style={{ fontFamily: SERIF, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', background: '#1a1a1a', color: '#fff', border: 'none', padding: '12px 24px', cursor: 'pointer' }}
          >
            Buy A4 Download — $4.99
          </button>
        </div>

        <Link href="/" style={{ fontFamily: SERIF, fontSize: '14px', fontStyle: 'italic', color: '#8b0000', textDecoration: 'none' }}>
          Issue a death certificate →
        </Link>

      </div>
    </main>
  )
}
