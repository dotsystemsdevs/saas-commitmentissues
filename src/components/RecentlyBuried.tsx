'use client'

import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import type { LeaderboardEntry } from '@/lib/types'

const FONT = `var(--font-dm), -apple-system, sans-serif`
const MONO = `var(--font-courier), 'Courier New', monospace`

interface Props {
  onSelect: (url: string) => void
}

export default function RecentlyBuried({ onSelect }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    fetch('/api/recent')
      .then(r => r.json())
      .then((data: LeaderboardEntry[]) => {
        if (Array.isArray(data) && data.length > 0) setEntries(data.slice(0, 10))
      })
      .catch(() => {})
  }, [])

  if (entries.length === 0) return null

  return (
    <div style={{ width: '100%', marginTop: '28px' }}>
      <div style={{ marginBottom: '14px', textAlign: 'center' }}>
        <p style={{ fontFamily: FONT, fontSize: '13px', fontWeight: 700, color: '#727272', margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Recently Buried
        </p>
      </div>
      <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', overflow: 'hidden', padding: '4px 20px 8px' }}>
        <div style={{ display: 'flex', gap: '14px', width: 'max-content' }}>
          {entries.map(entry => (
            <button
              key={entry.fullName}
              type="button"
              onClick={() => {
                track('recent_clicked', { repo: entry.fullName })
                onSelect(`https://github.com/${entry.fullName}`)
              }}
              style={{
                fontFamily: FONT,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '6px',
                width: '296px',
                minHeight: '184px',
                flexShrink: 0,
                padding: '20px',
                background: '#ebebeb',
                border: '2px solid #8c8c8c',
                borderRadius: '0px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s, box-shadow 0.15s, opacity 0.12s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#0a0a0a'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#8c8c8c'
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
              }}
              onMouseDown={e => { e.currentTarget.style.opacity = '0.9' }}
              onMouseUp={e => { e.currentTarget.style.opacity = '1' }}
            >
              <span style={{ fontSize: '20px', lineHeight: 1 }}>🪦</span>
              <span style={{ fontFamily: MONO, fontSize: '15px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.3, wordBreak: 'break-word' }}>
                {entry.fullName}
              </span>
              <span style={{ fontSize: '14px', fontStyle: 'italic', color: '#4d4d4d', lineHeight: 1.6, fontWeight: 500, marginTop: '2px' }}>
                {entry.cause}
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto' }}>
                <span style={{ fontSize: '12px', color: '#787878' }}>
                  {entry.analyzedAt
                    ? new Date(entry.analyzedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
                    : ''}
                </span>
                <span style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 700, color: '#8B0000' }}>
                  {entry.score}/10
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
