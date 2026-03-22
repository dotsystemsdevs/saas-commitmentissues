import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'deadrepo death certificate'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage({
  searchParams,
}: {
  searchParams: { name?: string; cause?: string }
}) {
  const name = searchParams.name ?? null
  const cause = searchParams.cause ?? null

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px',
          fontFamily: 'serif',
          border: '2px solid #8b7355',
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>🪦</div>

        {name ? (
          <>
            <div
              style={{
                fontSize: 14,
                color: '#8b7355',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: 12,
                fontFamily: 'monospace',
              }}
            >
              CERTIFICATE OF DEATH
            </div>
            <div
              style={{
                fontSize: 52,
                color: '#f5f0e8',
                textAlign: 'center',
                marginBottom: 16,
                maxWidth: '900px',
                wordBreak: 'break-all',
              }}
            >
              {name}
            </div>
            {cause && (
              <div
                style={{
                  fontSize: 22,
                  color: '#8b0000',
                  textAlign: 'center',
                  marginBottom: 12,
                  fontFamily: 'monospace',
                }}
              >
                {cause}
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: 64, color: '#f5f0e8', marginBottom: 16 }}>
              deadrepo
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#8b7355',
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
            >
              death certificates for abandoned GitHub repos
            </div>
          </>
        )}

        <div
          style={{
            fontSize: 16,
            color: '#8b7355',
            fontFamily: 'monospace',
            marginTop: 32,
            opacity: 0.6,
          }}
        >
          commitmentissues.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
