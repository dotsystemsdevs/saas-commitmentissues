'use client'

import { track } from '@vercel/analytics'
import { LeaderboardEntry } from '@/lib/types'

const HALL_OF_SHAME: LeaderboardEntry[] = [
  { fullName: 'atom/atom',              cause: 'GitHub built VS Code and forgot this existed',               score: 10, deathDate: 'Dec 2022', lastWords: 'At least I had good themes.' },
  { fullName: 'angularjs/angular.js',   cause: 'Angular 2 murdered its own parent in cold blood',            score: 9,  deathDate: 'Jan 2022', lastWords: 'They named the replacement Angular too. Nobody was fooled.' },
  { fullName: 'adobe/brackets',         cause: 'Adobe discovered VS Code already existed',                   score: 10, deathDate: 'Sep 2021', lastWords: 'I was actually pretty good. Nobody will know.' },
  { fullName: 'apache/cordova',         cause: 'React Native showed up and everyone switched mid-project',   score: 8,  deathDate: 'Aug 2020', lastWords: 'Hybrid apps were a mistake. I was a mistake.' },
  { fullName: 'gulpjs/gulp',            cause: 'Webpack arrived. Then Vite. Poor Gulp.',                     score: 8,  deathDate: 'Dec 2019', lastWords: 'I streamed data beautifully. Nobody cared.' },
  { fullName: 'meteor/meteor',          cause: 'Promised full-stack bliss. Delivered full-stack confusion.',  score: 7,  deathDate: 'Jun 2018', lastWords: 'I promised real-time. I delivered real pain.' },
  { fullName: 'ariya/phantomjs',        cause: 'Chrome went headless. This went nowhere.',                   score: 9,  deathDate: 'Mar 2018', lastWords: 'I had a headless future. Then so did Chrome.' },
  { fullName: 'bower/bower',            cause: 'npm install happened and nobody looked back',                score: 9,  deathDate: 'Jan 2017', lastWords: 'bower_components. That\'s my legacy.' },
  { fullName: 'facebook/flux',          cause: 'Redux arrived uninvited and never left',                     score: 9,  deathDate: 'Oct 2016', lastWords: 'I was just unidirectional data flow. Redux was also just unidirectional data flow.' },
  { fullName: 'gruntjs/grunt',          cause: 'Gulped by Gulp, then Webpacked into the grave',              score: 8,  deathDate: 'Feb 2016', lastWords: 'Gruntfile.js was 300 lines. That was the problem.' },
  { fullName: 'mootools/mootools-core', cause: 'jQuery killed it softly. Then jQuery died too.',             score: 7,  deathDate: 'Jan 2016', lastWords: 'I prototyped everything. Even things that shouldn\'t be prototyped.' },
  { fullName: 'ftlabs/fastclick',       cause: 'The 300ms delay got fixed. So did this.',                   score: 8,  deathDate: 'Nov 2015', lastWords: 'My entire purpose was 300ms. Mobile browsers fixed it. Nobody told me.' },
  { fullName: 'microsoft/winjs',        cause: 'Windows Phone died and took everything with it',             score: 10, deathDate: 'Sep 2015', lastWords: 'Windows Phone had 3% market share. I had 3% of that.' },
  { fullName: 'jashkenas/coffeescript', cause: 'ES6 stole all its ideas and left',                          score: 7,  deathDate: 'Sep 2015', lastWords: 'I made JavaScript beautiful. JavaScript made me irrelevant.' },
  { fullName: 'knockout/knockout',      cause: 'Vue arrived and everyone forgot their vows',                 score: 8,  deathDate: 'Oct 2015', lastWords: 'ko.observable. ko.computed. ko.gone.' },
]

const FONT = `var(--font-dm), -apple-system, sans-serif`
const MONO = `var(--font-courier), 'Courier New', monospace`
const GOTHIC = `var(--font-gothic), serif`

interface Props {
  onSelect: (url: string) => void
}

function MiniCert({ entry }: { entry: LeaderboardEntry }) {
  const repoName = entry.fullName.split('/')[1]
  return (
    <div style={{
      width: '86px',
      height: '122px',
      background: '#FAF6EF',
      border: '1.5px solid #1A0F06',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '6px 5px 5px',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '2px',
    }}>
      <div style={{ textAlign: 'center', borderBottom: '1px solid #1A0F06', paddingBottom: '3px', marginBottom: '4px' }}>
        <p style={{ fontFamily: MONO, fontSize: '3.5px', letterSpacing: '0.3em', color: '#8B6B4A', margin: '0 0 2px 0', textTransform: 'uppercase' as const }}>commitmentissues.dev</p>
        <p style={{ fontFamily: GOTHIC, fontSize: '7.5px', color: '#1A0F06', margin: 0, lineHeight: 1.1 }}>Certificate of Death</p>
      </div>
      <p style={{ fontFamily: MONO, fontSize: '5px', letterSpacing: '0.3em', color: '#8B6B4A', textAlign: 'center', margin: '0 0 3px 0', textTransform: 'uppercase' as const }}>this certifies the death of</p>
      <p style={{ fontFamily: FONT, fontSize: '7px', fontWeight: 700, color: '#1A0F06', textAlign: 'center', margin: '0 0 5px 0', lineHeight: 1.2, wordBreak: 'break-word' as const }}>
        {repoName}
      </p>
      <p style={{ fontFamily: FONT, fontSize: '5.5px', fontStyle: 'italic', color: '#8B0000', lineHeight: 1.5, textAlign: 'center', margin: 0, flex: 1, overflow: 'hidden' }}>
        {entry.cause}
      </p>
      {/* Stamp */}
      <div style={{ position: 'absolute', bottom: '10px', right: '3px', transform: 'rotate(-12deg)', border: '1px solid rgba(139,26,26,0.65)', padding: '1px 3px', background: 'rgba(139,26,26,0.03)' }}>
        <span style={{ fontFamily: FONT, fontSize: '3.5px', fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(139,26,26,0.65)', textTransform: 'uppercase' as const, display: 'block', whiteSpace: 'nowrap' as const }}>REST IN PRODUCTION</span>
      </div>
    </div>
  )
}

function GraveyardCard({ entry, onSelect }: { entry: LeaderboardEntry; onSelect: (url: string) => void }) {
  return (
    <button
      onClick={() => { track('graveyard_clicked', { repo: entry.fullName }); onSelect(`https://github.com/${entry.fullName}`) }}
      style={{
        fontFamily: FONT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: '14px',
        width: '300px',
        flexShrink: 0,
        padding: '18px',
        background: '#fff',
        border: '1.5px solid #e0dbd5',
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'border-color 0.15s, transform 0.15s, box-shadow 0.15s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#0a0a0a'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#e0dbd5'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
      }}
    >
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <span style={{ fontSize: '18px', lineHeight: 1 }}>🪦</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.3, wordBreak: 'break-word' }}>
          {entry.fullName}
        </span>
        <span style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.15em', color: '#b0aca8', textTransform: 'uppercase' as const }}>
          Cause of death
        </span>
        <span style={{ fontSize: '11px', fontStyle: 'italic', color: '#938882', lineHeight: 1.5 }}>
          {entry.cause}
        </span>
        <span style={{ fontSize: '10px', color: '#b0aca8', marginTop: 'auto' }}>
          {entry.deathDate}
        </span>
      </div>
      {/* Mini certificate */}
      <MiniCert entry={entry} />
    </button>
  )
}

export default function Leaderboard({ onSelect }: Props) {
  return (
    <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', overflow: 'hidden', padding: '4px 0 8px' }}>
      <div style={{
        display: 'flex',
        gap: '12px',
        animation: 'marquee 80s linear infinite',
        width: 'max-content',
      }}>
        {HALL_OF_SHAME.map((entry) => (
          <GraveyardCard key={entry.fullName} entry={entry} onSelect={onSelect} />
        ))}
        {/* Duplicate for seamless loop */}
        <div aria-hidden style={{ display: 'contents' }}>
          {HALL_OF_SHAME.map((entry) => (
            <GraveyardCard key={`loop-${entry.fullName}`} entry={entry} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  )
}
