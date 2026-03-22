import Link from 'next/link'

const UI = `var(--font-dm), -apple-system, sans-serif`

const SECTIONS = [
  { title: 'What this is', body: 'commitmentissues.dev is a small indie tool that generates humorous death certificates for abandoned GitHub repositories. It is a parody product. The certificates are not legally valid documents.' },
  { title: 'Use at your own risk', body: 'The data comes from GitHub\'s public API and is presented as-is. We make no guarantee of accuracy. Causes of death are algorithmically generated and should not be taken seriously.' },
  { title: 'Acceptable use', body: 'You may use this service for personal, non-commercial use. Do not use it to harass, defame, or target individuals. Do not attempt to abuse the API or circumvent rate limits.' },
  { title: 'Paid downloads', body: 'The A4 PNG download is a digital product sold for $4.99 per certificate. It is delivered immediately upon payment.' },
  { title: 'Refund policy', body: 'Digital products are non-refundable. If your download failed or the certificate was generated incorrectly due to a technical error on our end, contact us and we will make it right. Charged but nothing arrived? Contact us with your payment confirmation and we resolve it. ', email: 'dot.systems@proton.me' },
  { title: 'Changes', body: 'We may update these terms at any time. Continued use of the service means you accept any changes.' },
  { title: 'Contact', body: '', email: 'dot.systems@proton.me' },
]

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
      <div style={{ width: '100%', maxWidth: '620px' }}>

        <div style={{ textAlign: 'center', paddingTop: '44px', paddingBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '56px', lineHeight: 1, marginBottom: '12px' }}>🪦</div>
            <h1 style={{ fontFamily: 'var(--font-gothic), serif', fontSize: 'clamp(2.4rem, 7vw, 3.6rem)', color: '#160A06', lineHeight: 0.95, marginBottom: '16px' }}>
              Certificate of Death
            </h1>
          </Link>
          <p style={{ fontFamily: UI, fontSize: '15px', color: '#938882', lineHeight: 1.6, margin: '0 auto', maxWidth: '420px' }}>
            The fine print for the fine dead. Terms and refund policy.
          </p>
        </div>

        <div style={{ borderTop: '1px solid #c8c8c8', paddingTop: '40px', paddingBottom: '64px' }}>
          <p style={{ fontFamily: UI, fontSize: '12px', fontStyle: 'italic', color: '#938882', marginBottom: '32px' }}>Last updated: March 2026</p>
          {SECTIONS.map(({ title, body, email }, i) => (
            <div key={title} style={{ padding: '20px 0', borderBottom: i < SECTIONS.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
              <p style={{ fontFamily: UI, fontSize: '15px', fontWeight: 700, color: '#160A06', marginBottom: '8px' }}>{title}</p>
              <p style={{ fontFamily: UI, fontSize: '14px', color: '#555', lineHeight: 1.75, margin: 0 }}>
                {body}{email && <a href={`mailto:${email}`} style={{ color: '#8b0000', textDecoration: 'none' }}>{email}</a>}
              </p>
            </div>
          ))}
          <div style={{ marginTop: '48px' }}>
            <Link href="/privacy" style={{ fontFamily: UI, fontSize: '13px', fontStyle: 'italic', color: '#8b0000', textDecoration: 'none' }}>
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
