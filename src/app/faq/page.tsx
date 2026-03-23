import Link from 'next/link'
import SubpageShell from '@/components/SubpageShell'

const FONT = `var(--font-dm), -apple-system, sans-serif`

const FAQS = [
  {
    q: 'Is this serious?',
    a: 'Dead serious. But also, it\'s a parody. Don\'t try to use this in a court of law or at a real funeral.',
  },
  {
    q: 'Is the data real?',
    a: 'Yes — we use GitHub\'s public API: commits, stars, issues, archive status.',
  },
  {
    q: 'How is the cause of death determined?',
    a: 'A scoring model based on inactivity, open issues, and archive status. Highest match wins.',
  },
  {
    q: 'Can I analyze private repos?',
    a: 'No. We don\'t break into houses. If the repo is behind closed doors, it\'s not officially dead to the world yet.',
  },
  {
    q: 'How do I share the certificate?',
    a: 'Generate → click "Share the obituary" → pick your option. One click.',
  },
  {
    q: 'What does the $4.99 get me?',
    a: 'A pristine, watermark-free document fit for a frame. Think of it as a premium mahogany casket for your code. High-res, 300 DPI, zero regrets.',
  },
]

export default function FaqPage() {
  return (
    <SubpageShell
      title="FAQ"
      subtitle="Everything you need to know."
      microcopy={null}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {FAQS.map(({ q, a }, i) => (
          <div
            key={q}
            style={{
              padding: '20px 0',
              borderBottom: i < FAQS.length - 1 ? '1px solid #e0e0e0' : 'none',
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 'clamp(15px, 4vw, 16px)', fontWeight: 700, color: '#160A06', margin: '0 0 8px 0' }}>
              {q}
            </p>
            <p style={{ fontFamily: FONT, fontSize: 'clamp(14px, 3.8vw, 15px)', color: '#555', lineHeight: 1.7, margin: 0 }}>
              {a}
            </p>
          </div>
        ))}
      </div>

      <div style={{ paddingTop: '32px', paddingBottom: '8px', textAlign: 'center' }}>
        <Link href="/" className="subpage-faq-cta">
          issue a certificate →
        </Link>
      </div>
    </SubpageShell>
  )
}
