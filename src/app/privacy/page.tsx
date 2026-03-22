import Link from 'next/link'

const SERIF = `var(--font-dm), -apple-system, sans-serif`
const SANS  = `var(--font-dm), -apple-system, sans-serif`

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 64px' }}>
      <div style={{ width: '100%', maxWidth: '620px' }}>
        <Link href="/" style={{ fontFamily: SANS, fontSize: '12px', color: '#938882', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '48px' }}>← back</Link>

        <div style={{ borderBottom: '2px solid #160A06', paddingBottom: '24px', marginBottom: '40px' }}>
          <p style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#938882', marginBottom: '12px' }}>commitmentissues.dev</p>
          <h1 style={{ fontFamily: SERIF, fontSize: '2.2rem', fontWeight: 700, color: '#160A06', lineHeight: 1.15, margin: 0 }}>Privacy Policy</h1>
          <p style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#938882', marginTop: '8px' }}>Last updated: March 2026</p>
        </div>

        {[
          { title: 'What we collect', body: 'We do not store GitHub URLs you paste. Each request is processed in real time and discarded. No user accounts, no email addresses, no personal data.' },
          { title: 'GitHub API', body: 'We fetch publicly available repository metadata from the GitHub API. This data is already public. We do not access private repositories.' },
          { title: 'Payments', body: 'Payments are handled by Stripe. We do not store your card details. Stripe may collect your payment information subject to their own privacy policy.' },
          { title: 'Analytics', body: 'We use Plausible Analytics, a privacy-friendly tool that collects no personal data and sets no cookies. Aggregate pageview counts only.' },
          { title: 'Cookies', body: 'We set no tracking cookies. Plausible is cookieless. Your recently analyzed repos are stored in your browser\'s localStorage — this data never leaves your device.' },
          { title: 'Contact', body: 'Questions? ', email: 'dot.systems@proton.me' },
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
