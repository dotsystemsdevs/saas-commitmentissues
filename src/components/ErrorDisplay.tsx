'use client'

import { AnalysisError } from '@/hooks/useRepoAnalysis'

const GH_FONT = `var(--font-dm), -apple-system, sans-serif`

interface Props {
  error: AnalysisError
  onRetry: () => void
}

export default function ErrorDisplay({ error, onRetry }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6" style={{ fontFamily: GH_FONT }}>
      <div style={{
        borderLeft: '3px solid #8B1A1A',
        paddingLeft: '16px',
      }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#8B1A1A', marginBottom: '4px' }}>
          {error.message}
        </p>
        {error.retryAfter ? (
          <p style={{ fontSize: '13px', color: '#7A5C38' }}>retry in {error.retryAfter}s</p>
        ) : (
          <button
            onClick={onRetry}
            style={{ fontSize: '13px', color: '#7A5C38', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#2A1A0E')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7A5C38')}
          >
            try again →
          </button>
        )}
      </div>
    </div>
  )
}
