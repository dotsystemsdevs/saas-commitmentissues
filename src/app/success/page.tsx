import Link from 'next/link'
import SubpageShell from '@/components/SubpageShell'

const UI = `var(--font-dm), -apple-system, sans-serif`

export default function SuccessPage() {
  return (
    <SubpageShell
      subtitle="Payment confirmed."
      microcopy={null}
    >
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
          High-res, print-quality PNG — no watermark.<br />
          The deceased has been officially processed.
        </p>
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
      </div>

      <p style={{ fontFamily: UI, fontSize: '13px', color: '#b0aca8', textAlign: 'center' }}>
        Check your email for the download link.
      </p>
    </SubpageShell>
  )
}
