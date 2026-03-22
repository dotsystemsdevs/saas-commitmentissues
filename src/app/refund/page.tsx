import Link from 'next/link'

const SERIF = `var(--font-dm), -apple-system, sans-serif`
const SANS  = `var(--font-dm), -apple-system, sans-serif`

export default function RefundPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 64px' }}>
      <div style={{ width: '100%', maxWidth: '620px' }}>
        <Link href="/" style={{ fontFamily: SANS, fontSize: '12px', color: '#938882', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '48px' }}>← back</Link>

        <div style={{ borderBottom: '2px solid #160A06', paddingBottom: '24px', marginBottom: '40px' }}>
          <p style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#938882', marginBottom: '12px' }}>commitmentissues.dev</p>
          <h1 style={{ fontFamily: SERIF, fontSize: '2.2rem', fontWeight: 700, color: '#160A06', lineHeight: 1.15, margin: 0 }}>Refund Policy</h1>
          <p style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#938882', marginTop: '8px' }}>Last updated: March 2026</p>
        </div>

        {[
          { title: 'No refunds on digital downloads', body: 'The A4 PDF certificate is a digital product delivered immediately upon payment. Because the product is delivered instantly and cannot be returned, we do not offer refunds.' },
          { title: 'Something went wrong?', body: 'If your download failed or the certificate was generated incorrectly due to a technical error on our end, contact us and we will make it right. ', email: 'hello@commitmentissues.dev' },
          { title: 'Charged but no download?', body: 'If you were charged but did not receive your download link, contact us immediately with your payment confirmation and we will resolve it.' },
        ].map(({ title, body, email }, i, arr) => (
          <div key={title} style={{ padding: '20px 0', borderBottom: i < arr.length - 1 ? '1px solid #E1DFDE' : 'none' }}>
            <p style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, color: '#160A06', marginBottom: '8px' }}>{title}</p>
            <p style={{ fontFamily: SERIF, fontSize: '14px', fontStyle: 'italic', color: '#462D21', lineHeight: 1.75, margin: 0 }}>
              {body}{email && <a href={`mailto:${email}`} style={{ color: '#8b0000', textDecoration: 'none' }}>{email}</a>}
            </p>
          </div>
        ))}

        <div style={{ marginTop: '48px' }}>
          <Link href="/terms" style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#8b0000', textDecoration: 'none', marginRight: '24px' }}>Terms of Service</Link>
          <Link href="/privacy" style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#8b0000', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
      </div>
    </main>
  )
}
