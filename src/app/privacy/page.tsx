import Link from 'next/link'

const UI = `var(--font-dm), -apple-system, sans-serif`

const SECTIONS = [
  { title: 'What we collect', body: 'We do not store GitHub URLs you paste. Each request is processed in real time and discarded. No user accounts, no email addresses, no personal data.' },
  { title: 'GitHub API', body: 'We fetch publicly available repository metadata from the GitHub API. This data is already public. We do not access private repositories.' },
  { title: 'Payments', body: 'Payments are handled by Stripe. We do not store your card details. Stripe may collect your payment information subject to their own privacy policy.' },
  { title: 'Analytics', body: 'We use Plausible Analytics — a privacy-friendly, cookieless tool that collects no personal data. Aggregate pageview counts only.' },
  { title: 'Cookies', body: 'We set no tracking cookies. Your recently analyzed repos are stored in your browser\'s localStorage and never leave your device.' },
  { title: 'Contact', body: 'Questions? ', email: 'dot.systems@proton.me' },
]

export default function PrivacyPage() {
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
            We know nothing. We store nothing. We are ghosts.
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
            <Link href="/terms" style={{ fontFamily: UI, fontSize: '13px', fontStyle: 'italic', color: '#8b0000', textDecoration: 'none' }}>
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
