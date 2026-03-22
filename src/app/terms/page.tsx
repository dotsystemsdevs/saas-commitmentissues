import Link from 'next/link'

const SERIF = `var(--font-dm), -apple-system, sans-serif`
const SANS  = `var(--font-dm), -apple-system, sans-serif`

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 64px' }}>
      <div style={{ width: '100%', maxWidth: '620px' }}>
        <Link href="/" style={{ fontFamily: SANS, fontSize: '12px', color: '#938882', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '48px' }}>← back</Link>

        <div style={{ borderBottom: '2px solid #160A06', paddingBottom: '24px', marginBottom: '40px' }}>
          <p style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#938882', marginBottom: '12px' }}>commitmentissues.dev</p>
          <h1 style={{ fontFamily: SERIF, fontSize: '2.2rem', fontWeight: 700, color: '#160A06', lineHeight: 1.15, margin: 0 }}>Terms of Service</h1>
          <p style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#938882', marginTop: '8px' }}>Last updated: March 2026</p>
        </div>

        {[
          { title: 'What this is', body: 'commitmentissues.dev is a small indie tool that generates humorous death certificates for abandoned GitHub repositories. It is a parody product. The certificates are not legally valid documents.' },
          { title: 'Use at your own risk', body: 'The data comes from GitHub\'s public API and is presented as-is. We make no guarantee of accuracy. Causes of death are algorithmically generated and should not be taken seriously.' },
          { title: 'Acceptable use', body: 'You may use this service for personal, non-commercial use. Do not use it to harass, defame, or target individuals. Do not attempt to abuse the API or circumvent rate limits.' },
          { title: 'Paid downloads', body: 'The A4 PDF download is a digital product sold for $4.99 per certificate. See our refund policy for details.' },
          { title: 'Changes', body: 'We may update these terms at any time. Continued use of the service means you accept any changes.' },
          { title: 'Contact', body: '', email: 'dot.systems@proton.me' },
        ].map(({ title, body, email }, i, arr) => (
          <div key={title} style={{ padding: '20px 0', borderBottom: i < arr.length - 1 ? '1px solid #E1DFDE' : 'none' }}>
            <p style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, color: '#160A06', marginBottom: '8px' }}>{title}</p>
            <p style={{ fontFamily: SERIF, fontSize: '14px', fontStyle: 'italic', color: '#462D21', lineHeight: 1.75, margin: 0 }}>
              {body}{email && <a href={`mailto:${email}`} style={{ color: '#8b0000', textDecoration: 'none' }}>{email}</a>}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
