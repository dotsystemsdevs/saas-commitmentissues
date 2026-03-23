import Link from 'next/link'
import SubpageShell from '@/components/SubpageShell'

const UI = `var(--font-dm), -apple-system, sans-serif`
const MONO = `var(--font-courier), 'Courier New', monospace`

export default function PricingPage() {
  return (
    <SubpageShell
      title="Pricing"
      subtitle="Death is free. The paperwork costs $4.99."
      microcopy={null}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Free */}
        <div style={{
          border: '1.5px solid #e0dbd5',
          borderRadius: '10px',
          padding: 'clamp(20px, 5vw, 28px)',
          background: '#fff',
        }}>
          <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.15em', color: '#b0aca8', margin: '0 0 10px 0' }}>
            no charge · always
          </p>
          <p style={{ fontFamily: UI, fontSize: '28px', fontWeight: 700, color: '#160A06', margin: '0 0 10px 0', lineHeight: 1 }}>
            $0
          </p>
          <p style={{ fontFamily: UI, fontSize: '14px', color: '#6b6560', lineHeight: 1.7, margin: 0 }}>
            Generate the certificate. See the cause of death, last words, death index. Share with watermark.
          </p>
        </div>

        {/* Premium */}
        <div style={{
          border: '2px solid #160A06',
          borderRadius: '10px',
          padding: 'clamp(20px, 5vw, 28px)',
          background: '#FAF6EF',
        }}>
          <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.15em', color: '#8B6B4A', margin: '0 0 10px 0' }}>
            one-time · incl. VAT
          </p>
          <p style={{ fontFamily: UI, fontSize: '28px', fontWeight: 700, color: '#160A06', margin: '0 0 10px 0', lineHeight: 1 }}>
            $4.99
          </p>
          <p style={{ fontFamily: UI, fontSize: '14px', color: '#6b6560', lineHeight: 1.7, margin: '0 0 24px 0' }}>
            Print-ready PNG at 300 DPI. No watermark. Clean enough to frame.
          </p>
          <Link
            href="/"
            style={{
              fontFamily: UI,
              fontSize: '14px',
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              background: '#160A06',
              borderRadius: '8px',
              padding: '14px 20px',
              textAlign: 'center',
              display: 'block',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
          >
            get the certificate →
          </Link>
        </div>

      </div>

      <p style={{ fontFamily: UI, fontSize: '13px', color: '#b0aca8', marginTop: '20px', textAlign: 'center' }}>
        Questions? <Link href="/faq" style={{ color: '#938882', textDecoration: 'underline', textUnderlineOffset: '3px' }}>See FAQ →</Link>
      </p>
    </SubpageShell>
  )
}
