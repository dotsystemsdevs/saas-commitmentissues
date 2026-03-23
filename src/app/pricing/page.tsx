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
      <div style={{
        border: '2px solid #160A06',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#fff',
      }}>

        {/* Free tier */}
        <div style={{ padding: 'clamp(20px, 5vw, 28px)', borderBottom: '1px solid #e8e2d8' }}>
          <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.15em', color: '#b0aca8', margin: '0 0 12px 0' }}>included · always free</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['View certificate + cause of death', 'Last words + death index', 'Share with watermark'].map(item => (
              <p key={item} style={{ fontFamily: UI, fontSize: '14px', color: '#6b6560', margin: 0, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: '#b0aca8', flexShrink: 0 }}>✓</span> {item}
              </p>
            ))}
          </div>
        </div>

        {/* Upgrade */}
        <div style={{ padding: 'clamp(20px, 5vw, 28px)', background: '#FAF6EF' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
            <p style={{ fontFamily: UI, fontSize: '32px', fontWeight: 700, color: '#160A06', margin: 0, lineHeight: 1 }}>$4.99</p>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#8B6B4A', letterSpacing: '0.08em' }}>one-time</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
            {['No watermark', '300 DPI — print-ready', 'Frame it like it deserves'].map(item => (
              <p key={item} style={{ fontFamily: UI, fontSize: '14px', color: '#6b6560', margin: 0, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: '#8B6B4A', flexShrink: 0 }}>✓</span> {item}
              </p>
            ))}
          </div>
          <p style={{ fontFamily: UI, fontSize: '13px', fontStyle: 'italic', color: '#8B6B4A', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            A proper burial deserves proper paperwork.
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
            Download clean certificate →
          </Link>
        </div>

      </div>

      <p style={{ fontFamily: UI, fontSize: '13px', color: '#b0aca8', marginTop: '20px', textAlign: 'center' }}>
        Questions? <Link href="/faq" style={{ color: '#938882', textDecoration: 'underline', textUnderlineOffset: '3px' }}>See FAQ →</Link>
      </p>
    </SubpageShell>
  )
}
