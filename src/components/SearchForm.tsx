'use client'

import { FormEvent, useState } from 'react'
import { track } from '@vercel/analytics'
import { CTA_RED, CTA_RED_HOVER } from '@/lib/cta'

const FONT = `var(--font-dm), -apple-system, sans-serif`
const PREFIX = 'https://github.com/'

interface Props {
  url: string
  setUrl: (v: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function SearchForm({ url, setUrl, onSubmit, loading }: Props) {
  const [focused, setFocused] = useState(false)

  const displayValue = url.startsWith(PREFIX) ? url.slice(PREFIX.length) : url

  function handleChange(val: string) {
    const slug = val.replace(/^https?:\/\/(www\.)?github\.com\//i, '')
    setUrl(PREFIX + slug)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!displayValue.trim()) return
    track('repo_submitted')
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* Input row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        border: `2px solid ${focused ? '#888' : '#e0e0e0'}`,
        borderRadius: '8px',
        boxShadow: focused ? '0 0 0 3px rgba(22,10,6,0.08)' : '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        overflow: 'hidden',
        height: '60px',
      }}>
        <span style={{
          fontFamily: FONT,
          fontSize: '16px',
          color: '#160A06',
          fontWeight: 700,
          paddingLeft: '16px',
          paddingRight: '2px',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          flexShrink: 0,
        }}>
          github.com/
        </span>
        <input
          autoFocus
          type="text"
          value={displayValue}
          onChange={e => handleChange(e.target.value)}
          placeholder="owner/repo"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            fontFamily: FONT,
            fontSize: '16px',
            flex: 1,
            height: '100%',
            padding: '0 16px 0 0',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#160A06',
            minWidth: 0,
          }}
        />
      </div>

      {/* Generate button — full width below input */}
      <button
        type="submit"
        disabled={loading}
        aria-label="Issue death certificate"
        style={{
          fontFamily: FONT,
          fontSize: '15px',
          fontWeight: 800,
          letterSpacing: '0.05em',
          width: '100%',
          height: '54px',
          background: CTA_RED,
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'wait' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s, transform 0.1s',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
        }}
        onMouseEnter={e => {
          if (!loading) {
            e.currentTarget.style.background = CTA_RED_HOVER
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = CTA_RED
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)'
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)' }}
        onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
      >
        {loading ? <span className="btn-spinner" /> : 'Generate certificate →'}
      </button>

    </form>
  )
}
