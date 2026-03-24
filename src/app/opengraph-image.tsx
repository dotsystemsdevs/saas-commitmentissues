import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Match PageHero + page-shell-main (globals.css) — same palette and hierarchy as the live site. */
async function loadGoogleFontWoff2(family: string, weight: number): Promise<ArrayBuffer> {
  const familyParam = family.replace(/\s+/g, '+')
  const cssUrl = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`
  const css = await fetch(cssUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  }).then((r) => r.text())
  const m = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)\s+format\(['"]woff2['"]\)/)
  if (!m) throw new Error(`woff2 not found for ${family}`)
  return fetch(m[1]).then((r) => r.arrayBuffer())
}

export default async function OGImage() {
  let fonts: {
    name: string
    data: ArrayBuffer
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    style: 'normal' | 'italic'
  }[] = []

  try {
    const [gothic, sans] = await Promise.all([
      loadGoogleFontWoff2('Unifraktur Maguntia', 400),
      loadGoogleFontWoff2('Inter', 400),
    ])
    fonts = [
      { name: 'UnifrakturMaguntia', data: gothic, weight: 400, style: 'normal' },
      { name: 'Inter', data: sans, weight: 400, style: 'normal' },
    ]
  } catch {
    // Fallback: system stacks still get correct colors/layout from the real site
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#e8e8e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 920,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 12 }}>🪦</div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 0.95,
              color: '#160a06',
              fontFamily: fonts.length ? 'UnifrakturMaguntia' : 'Georgia, Times New Roman, serif',
              margin: '12px 0 20px 0',
            }}
          >
            Certificate of Death
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.35,
              color: '#5f5f5f',
              fontFamily: fonts.length ? 'Inter' : 'system-ui, -apple-system, sans-serif',
              maxWidth: 560,
            }}
          >
            For projects that never got a goodbye.
          </div>
          <div
            style={{
              marginTop: 36,
              height: 1,
              width: '100%',
              maxWidth: 640,
              background: '#bfbfbf',
            }}
          />
          <div
            style={{
              marginTop: 20,
              fontSize: 15,
              letterSpacing: '0.04em',
              color: '#8a8a8a',
              fontFamily: fonts.length ? 'Inter' : 'ui-monospace, monospace',
            }}
          >
            commitmentissues.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  )
}
