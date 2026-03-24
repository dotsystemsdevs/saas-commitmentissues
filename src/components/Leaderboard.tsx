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
  { fullName: 'nicowillis/ratchet',     cause: 'Bootstrap Mobile never shipped. Neither did this.',           score: 7,  deathDate: 'Aug 2015', lastWords: 'I was mobile-first before mobile-first was cool. Then I wasn\'t.' },
  { fullName: 'adobe/phonegap',         cause: 'Cordova forked it. React Native buried them both.',           score: 8,  deathDate: 'Oct 2020', lastWords: 'I was Cordova before Cordova. Nobody remembers.' },
  { fullName: 'postcss/autoprefixer',   cause: 'Browsers finally agreed on things. Took them long enough.',   score: 7,  deathDate: 'Jan 2023', lastWords: 'I added -webkit- to everything. Even things that didn\'t need it.' },
  { fullName: 'joyent/node',            cause: 'io.js forked it, then everyone made up and pretended nothing happened', score: 7, deathDate: 'May 2015', lastWords: 'The fork was mostly about a callback style disagreement. We don\'t talk about it.' },
  { fullName: 'twbs/ratchet',           cause: 'Nobody actually built apps with Bootstrap anyway',            score: 6,  deathDate: 'Mar 2016', lastWords: 'I had 11,000 stars. Zero shipped apps.' },
  { fullName: 'mattdesl/budo',          cause: 'Webpack devServer ate the entire category',                   score: 6,  deathDate: 'Feb 2018', lastWords: 'browserify was already losing. I never stood a chance.' },
  { fullName: 'strongloop/loopback',    cause: 'Express stayed simple. This did not.',                        score: 7,  deathDate: 'Jun 2019', lastWords: 'I had a visual API composer. I thought that was good.' },
  { fullName: 'yahoo/mojito',           cause: 'Yahoo slowly forgot it existed, then forgot everything else', score: 9,  deathDate: 'Dec 2014', lastWords: 'I was isomorphic JavaScript in 2012. Too early. Also Yahoo.' },
  { fullName: 'dojo/dojo',             cause: 'jQuery won the 2008 framework wars. Dojo was not informed.',   score: 8,  deathDate: 'Dec 2021', lastWords: 'I had AMD modules before AMD was a thing. Nobody used them.' },
  { fullName: 'Polymer/polymer',        cause: 'Web Components were supposed to be the future. They were not.', score: 8, deathDate: 'Apr 2021', lastWords: 'HTML Imports. I thought that was a good idea. It was not.' },
  { fullName: 'tencent/wepy',           cause: 'WeChat\'s own framework killed its own ecosystem',            score: 7,  deathDate: 'Nov 2019', lastWords: 'Even Tencent forgot about me.' },
  { fullName: 'marionettejs/backbone.marionette', cause: 'Backbone died. So did everything built on Backbone.', score: 8, deathDate: 'Mar 2020', lastWords: 'I was Backbone but organized. Backbone wasn\'t organized. Or alive.' },
  { fullName: 'mikeal/request',         cause: 'fetch() shipped natively and deprecated an entire generation', score: 9, deathDate: 'Feb 2020', lastWords: 'I was downloaded 30 million times a week. Then fetch happened.' },
  { fullName: 'nicolo-ribaudo/jest-light-runner', cause: 'Vitest arrived and made everyone feel bad about Jest', score: 6, deathDate: 'Jan 2023', lastWords: 'I was faster Jest. Vitest was even faster. Also had a UI.' },
]

const FONT = `var(--font-dm), -apple-system, sans-serif`
const MONO = `var(--font-courier), 'Courier New', monospace`

interface Props {
  onSelect: (url: string) => void
}

export default function Leaderboard({ onSelect }: Props) {
  return (
    <div style={{ width: '100%', marginTop: '2px' }}>
      <p style={{ fontFamily: FONT, fontSize: '26px', fontWeight: 700, color: '#160A06', margin: '0 0 2px 0', letterSpacing: '-0.01em' }}>
        The Great GitHub Graveyard
      </p>
      <p style={{ fontFamily: FONT, fontSize: '13px', color: '#938882', margin: '0 0 10px 0' }}>
        Click any repo to instantly generate its certificate.
      </p>

      <div style={{ overflowX: 'auto', borderRadius: '12px' }}>
        <div style={{ minWidth: '620px', border: '1px solid #d8d4d0', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px minmax(160px, 1fr) minmax(220px, 2fr) 90px',
            gap: '10px',
            alignItems: 'center',
            padding: '10px 12px',
            borderBottom: '1px solid #e8e4de',
            background: '#f8f7f5',
            fontFamily: MONO,
            fontSize: '11px',
            color: '#8f8680',
            letterSpacing: '0.04em',
          }}
        >
          <span>☠</span>
          <span>repo</span>
          <span>cause of death</span>
          <span>died</span>
        </div>

          {HALL_OF_SHAME.map((entry, i) => (
            <button
            key={entry.fullName}
            type="button"
            onClick={() => { track('graveyard_clicked', { repo: entry.fullName }); onSelect(`https://github.com/${entry.fullName}`) }}
            style={{
              width: '100%',
              border: 'none',
              borderBottom: i < HALL_OF_SHAME.length - 1 ? '1px solid #efebe6' : 'none',
              background: '#fff',
              padding: '10px 12px',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: FONT,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#faf7f3' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
          >
            <span
              style={{
                display: 'grid',
                gridTemplateColumns: '32px minmax(160px, 1fr) minmax(220px, 2fr) 90px',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '15px', color: '#6f6761' }}>🪦</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#160A06', lineHeight: 1.25 }}>{entry.fullName}</span>
              <span style={{ fontSize: '14px', color: '#5d5752', fontStyle: 'italic', lineHeight: 1.35 }}>{entry.cause}</span>
              <span style={{ fontSize: '13px', color: '#8f8680', textAlign: 'right' }}>{entry.deathDate}</span>
            </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
