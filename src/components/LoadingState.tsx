'use client'

import { useState, useEffect } from 'react'

const MESSAGES = [
  'Consulting the reaper...',
  'Checking for a pulse...',
  'None found. Proceeding...',
  'Filling out the paperwork...',
  'Stamping the cause of death...',
]

const WIDTHS = ['72%', '88%', '60%', '80%', '68%']
const GH_FONT = `var(--font-dm), -apple-system, sans-serif`

export default function LoadingState() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % MESSAGES.length), 800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 space-y-4">
      <p className="text-sm min-h-[1.5rem]" style={{ fontFamily: GH_FONT, color: '#7A5C38' }}>
        {MESSAGES[index]}
      </p>
      <div style={{ background: '#FDFCF9', border: '1px solid rgba(42,26,14,0.15)', borderRadius: '6px' }}>
        <div className="p-6 space-y-3">
          {WIDTHS.map((w, i) => (
            <div
              key={i}
              className="h-2 animate-pulse"
              style={{ width: w, background: 'rgba(42,26,14,0.1)', animationDelay: `${i * 120}ms`, borderRadius: '2px' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
