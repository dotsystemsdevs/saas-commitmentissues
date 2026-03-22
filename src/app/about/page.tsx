import Link from 'next/link'

const SERIF = `var(--font-dm), -apple-system, sans-serif`
const SANS  = `var(--font-dm), -apple-system, sans-serif`

const FAQ = [
  {
    q: 'Is the data real?',
    a: 'Yes. Everything comes from GitHub\'s public API — last commit date, stars, forks, open issues, and archive status.',
  },
  {
    q: 'How is the cause of death determined?',
    a: 'A scoring algorithm weighs inactivity, star count, open issues, and whether the repo is archived. The highest-matching rule wins.',
  },
  {
    q: 'Can I analyze private repos?',
    a: 'No — we only have access to public repositories.',
  },
  {
    q: 'How do I share the certificate?',
    a: 'Hit "Share free" to get a 1080×1350 image perfect for Instagram or X. Download A4 gives you a printable version.',
  },
  {
    q: 'Is this serious?',
    a: 'The data is real. The certificates are not.',
  },
]

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 64px' }}>
      <div style={{ width: '100%', maxWidth: '620px' }}>

        {/* Back */}
        <Link href="/" style={{ fontFamily: SANS, fontSize: '12px', color: '#938882', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '48px' }}>
          ← back
        </Link>

        {/* Header */}
        <div style={{ borderBottom: '2px solid #160A06', paddingBottom: '24px', marginBottom: '40px' }}>
          <p style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#938882', marginBottom: '12px' }}>
            commitmentissues.dev
          </p>
          <h1 style={{ fontFamily: SERIF, fontSize: '2.2rem', fontWeight: 700, color: '#160A06', lineHeight: 1.15, margin: 0 }}>
            About
          </h1>
        </div>

        {/* About */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontFamily: SERIF, fontSize: '17px', color: '#160A06', lineHeight: 1.8, marginBottom: '16px' }}>
            Official death certificates for abandoned GitHub repos.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: '15px', fontStyle: 'italic', color: '#462D21', lineHeight: 1.8, marginBottom: '16px' }}>
            Paste any public GitHub URL. We analyze commit history, stars, open issues, and archive status — then issue a certified cause of death.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: '15px', color: '#462D21', lineHeight: 1.8 }}>
            Download the certificate. Share it. Mourn accordingly.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 style={{ fontFamily: SERIF, fontSize: '1.1rem', fontWeight: 700, color: '#160A06', letterSpacing: '0.02em', marginBottom: '28px', paddingBottom: '12px', borderBottom: '1px solid #b0aca8' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FAQ.map(({ q, a }, i) => (
              <div key={q} style={{ padding: '20px 0', borderBottom: i < FAQ.length - 1 ? '1px solid #E1DFDE' : 'none' }}>
                <p style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, color: '#160A06', marginBottom: '8px' }}>{q}</p>
                <p style={{ fontFamily: SERIF, fontSize: '14px', fontStyle: 'italic', color: '#462D21', lineHeight: 1.75, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer link */}
        <div style={{ marginTop: '56px', paddingTop: '24px', borderTop: '1px solid #E1DFDE' }}>
          <Link href="/" style={{ fontFamily: SERIF, fontSize: '14px', fontStyle: 'italic', color: '#8b0000', textDecoration: 'none' }}>
            Issue a death certificate →
          </Link>
        </div>

      </div>
    </main>
  )
}
