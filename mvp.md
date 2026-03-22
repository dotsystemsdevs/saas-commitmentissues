# deadrepo.dev — Plan

## What It Is

A single-page tool where users paste a GitHub repo URL and receive a humorous "death certificate" for abandoned repos. No database, no login, no backend — just GitHub's public API and rule-based logic.

---

## How It Works

```
User pastes: https://github.com/facebook/react

        ↓

App extracts: "facebook" + "react"

        ↓

Calls GitHub API (two requests):
1. api.github.com/repos/facebook/react         → metadata
2. api.github.com/repos/facebook/react/commits → latest commit

        ↓

Scoring function calculates death index

        ↓

Death certificate renders
```

---

## GitHub API — What We Fetch

**Request 1 — repo metadata:**

| Field | Description |
|---|---|
| `created_at` | when the repo was created |
| `pushed_at` | last push (= date of death) |
| `open_issues_count` | number of open issues |
| `stargazers_count` | number of stars |
| `forks_count` | number of forks |
| `archived` | true/false |
| `language` | "JavaScript", "Python", etc. |
| `topics` | array of topic tags |

**Request 2 — latest commit:**

| Field | Description |
|---|---|
| `commit.message` | "fix typo in readme" (= last words) |
| `commit.author.date` | exact date of last commit |

All of this is public and free. No API key required.

---

## Scoring Logic (`lib/scoring.ts`)

Start at 0 points:

| Condition | Points |
|---|---|
| Last commit > 2 years ago | +4 |
| Last commit 1–2 years ago | +2 |
| Last commit 6–12 months ago | +1 |
| Repo is archived | +3 |
| >20 open issues AND inactive >6 months | +1 |
| >100 stars BUT no activity for >1 year | +1 |

**Maximum: 10.** Result is a number from 0–10. 0 = alive, 10 = fossil.

---

## Cause of Death Logic (`lib/scoring.ts`)

Each rule has a `score` weight. All rules are evaluated and the highest-scoring match wins. On a tie, picks randomly between top candidates for variation. Checks conditions top-to-bottom by score:

| Score | Condition | Cause of Death |
|---|---|---|
| 10 | `archived = true` | "Officially declared dead by author" |
| 8 | Last commit message contains "fix typo" or "update readme" | "Died whispering: one last fix" |
| 8 | `commitCount === 1` | "Died after 3 commits and a burst of motivation" |
| 8 | `isFork = true` | "Forked but never understood" |
| 7 | `daysSince > 730` AND `stars === 0` | "Died alone, unknown to the world" |
| 7 | `stars > 200` AND inactive | "Started strong. Never finished." |
| 7 | `openIssues > 50` | "Crushed under the weight of expectations" |
| 6 | No description | "No README. No hope." |
| 6 | Description contains "todo" | "Too ambitious for its own good" |
| 5 | `language = JavaScript` or topics include "node" | "Lost in dependency hell" |
| 5 | Description contains "microservice" or "enterprise" | "Killed by overengineering" |
| 4 | `forksCount > stargazersCount` | "Abandoned for a shinier idea" |
| 3 | Description contains "learn", "tutorial", or "course" | "Victim of tutorial fatigue" |
| 3 | Description contains "mvp" or "prototype" | "Left to rot after MVP" |
| 1 | Default (always matches as fallback) | "Side project syndrome" |

---

## Smart Last Words (`lib/scoring.ts`)

Logic in `generateLastWords(repo)` — derives a human-readable "last words" string from repo metadata rather than using the raw commit message directly:

| Condition | Last Words |
|---|---|
| `lastCommitMessage` contains "fix typo" | `"pls work now"` |
| `lastCommitMessage` contains "update readme" | `"at least the docs are good"` |
| `lastCommitMessage` contains "wip" or "work in progress" | `"i'll finish this later"` |
| `lastCommitMessage` contains "merge" | `"dying in a merge conflict"` |
| `daysSince > 730` AND `stars === 0` | `"i'll finish this later"` |
| `stars > 200` AND inactive | `"i thought people liked me"` |
| Default | Raw commit message, truncated to 80 characters |

---

## File Structure

```
deadrepo/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← full UI: input + certificate
│   │   ├── layout.tsx            ← fonts, base layout
│   │   ├── globals.css           ← dark base styles
│   │   └── api/
│   │       └── repo/
│   │           └── route.ts      ← proxies GitHub API (avoids CORS)
│   ├── lib/
│   │   ├── scoring.ts            ← all logic, no side effects
│   │   └── types.ts              ← TypeScript interfaces
│   └── components/
│       ├── CertificateCard.tsx   ← styled certificate card; handles entry animation,
│       │                            stamp overlay, download button, localStorage write
│       ├── Leaderboard.tsx       ← two-tab leaderboard: Hall of Shame + Recently Buried
│       ├── SearchForm.tsx        ← URL input + submit button
│       ├── LoadingState.tsx      ← skeleton loading UI
│       └── ErrorDisplay.tsx      ← error message UI
└── ...config files
```

> **Why an API route?** GitHub API blocks direct browser requests (CORS). The Next.js server makes the request on our behalf — safe and simple.

---

## UI Layout

**Landing:**

```
┌─────────────────────────────────┐
│                                 │
│         ☠ deadrepo              │  ← large serif font
│   official death certificates   │
│   for abandoned github repos    │
│                                 │
│  [ https://github.com/... ] [→] │  ← input + button
│                                 │
└─────────────────────────────────┘
```

**Certificate:**

```
┌─────────────────────────────────┐
│  ════ CERTIFICATE OF DEATH ════ │
│                                 │
│         awesome-todo-app        │  ← large serif
│                                 │
│  Date of Death   14 march 2023  │
│  Age             2 years, 3 mo  │
│  Cause of Death  Side project   │
│                  syndrome       │  ← red/muted color
│  Last Words      "fix typo"     │  ← italic, monospace
│  Mourned by      3 stars, 1 fork│
│  Language        JavaScript     │
│                                 │
│      8 / 10                     │  ← large death index
│      death index                │
│                                 │
│  [ share on X ↗ ]               │
└─────────────────────────────────┘
```

**Design:** Black/off-white, serif font for titles, monospace for data fields, aged document aesthetic.

---

## Share Text

Opens Twitter/X with pre-filled text in the following format:

```
This repo just died.

{name}
Cause: {cause}
Death index: {score}/10

🪦 deadrepo.dev
```

---

## Death Animation

When the certificate first renders:

1. **Entry:** Certificate card starts at `opacity-0 scale-95`, transitions to `opacity-100 scale-100` over 400ms (`transition-all duration-400 ease-out`). Implemented with `useEffect` + `useState(false)` → `setTimeout(() => setVisible(true), 50)` to trigger the transition after mount.

2. **Stamp overlay:** After 600ms, a "CERTIFIED DEAD" stamp appears center-stage — bold red/dark text, rotated -15deg, `border-4`, fades out after 1200ms. Implemented with a separate `showStamp` state: `setTimeout(() => setShowStamp(true), 600)` → `setTimeout(() => setShowStamp(false), 1800)`.

---

## Download as Image

Uses `html2canvas` (the only extra npm dependency):

```
npm install html2canvas
```

A **Download** button is added to `CertificateCard`. The certificate `<div>` is wrapped in a `ref`. On click:

```ts
html2canvas(cardRef.current).then(canvas => {
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `${repoName}-death-certificate.png`
  a.click()
})
```

Button row in `CertificateCard`:

```
[ 𝕏 Share ]  [ Copy ]  [ ⬇ Download ]  [ Try another → ]
```

---

## Leaderboard

No database needed — two approaches combined in `src/components/Leaderboard.tsx` with two tabs:

### Tab 1 — "Hall of Shame" (static)

A hardcoded curated list of 6 famously dead repos with their pre-scored certificates. Values can be hardcoded or called from our own API at build time. Examples: old abandoned Google projects, forgotten frameworks, notorious half-finished tools.

### Tab 2 — "Recently Buried" (localStorage)

Stores the last 5 repos the current user analyzed in `localStorage` under the key `deadrepo:recent`. Each entry is `{ fullName, cause, score }`. Written by `CertificateCard` after each successful analysis via a `useEffect`. Shown as clickable cards that prefill the search input.

Both tabs render below the search form, above loading/results.

---

## Error Handling

| Situation | Message |
|---|---|
| Private repo | "This repo is private or doesn't exist" |
| Typo in URL | "Could not find the repo, check the URL" |
| GitHub API down | "Something went wrong, please try again" |
| Rate limit hit | "GitHub rate limit reached. Resets at {time}." |

---

## Stack & Deploy

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3 + Playfair Display (serif) + Courier Prime (mono) via `next/font/google`
- **Colors:** `ink` (#1a1a1a), `parchment` (#f5f0e8), `aged` (#8b7355), `bloodred` (#8b0000)
- **Extra dependency:** `html2canvas` (download as image)
- **Deploy:** Push to GitHub → connect to Vercel (free tier)
- **Rate limiting:** 1hr server-side cache on GitHub API responses; optional `GITHUB_TOKEN` env var raises limit from 60 to 5,000 req/hr

---

## Monetization & Roadmap

### Phase 1 — Go Viral (free, no monetization)

Before thinking about money, you need traffic. The only goal in phase 1 is getting people to share death certificates.

**Do this on day 1:**
- Post on r/programming and r/webdev with a death certificate for a famous dead repo (e.g. an old abandoned Google project)
- Show HN on HackerNews — devs love this
- Tweet 3 funny death certificates for well-known abandoned repos
- Add a "powered by deadrepo.dev" link on every shared certificate

---

### Phase 2 — First Revenue

**Sponsored by** — simplest and fastest.

Once you have traffic, dev tools pay well. Perfect sponsors:

| Sponsor | Angle |
|---|---|
| Sentry | "keeps your code alive" |
| Linear | "so your issues don't die" |
| Railway / Render | "deploy before you lose motivation" |

The copy writes itself: *"This death certificate is sponsored by Sentry — for repos that actually live."*

---

### Phase 3 — Product Development

Features that add real value and can charge money:

**Private repos — $5/month**
GitHub OAuth login → analyze your own private repos. That's where people's real side-project skeletons live.

**Org report — $15/month**
"How dead are ALL the repos at your company?"
A consolidated report across an entire GitHub organization. Engineering leads buy this to show in a meeting. Half joke, half genuinely useful technical debt overview.

**Death certificate as PDF — $3 one-time**
Nicely formatted, printable. Hang it in the office. Sounds ridiculous — devs will buy it.

**Watch mode — $3/month**
"Alert me when this repo dies" — subscribe to a repo and receive an email with the death certificate when activity drops below a threshold. Actually useful for people building on open-source dependencies.

---

### Unexpected Angle — B2B

The org report solves a real problem. Companies often have 50–200 repos and nobody knows which ones are still in use. The same product can be pitched as:

| Version | Pitch |
|---|---|
| Consumer | funny death certificate to share |
| B2B | technical debt dashboard for engineering managers |

Same data, completely different framing, two markets.

---

### Realistic Timeline

| Timeframe | Goal |
|---|---|
| Week 1 | Build MVP, deploy |
| Week 2 | Post, go viral (hopefully) |
| Month 2 | Add private repos + payment |
| Month 3 | Org report, start pitching sponsors |
| Month 6 | Watch mode, B2B pitch |
