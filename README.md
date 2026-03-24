# ☠️ commitmentissues.dev

<p align="center">
  <strong>Official death certificates for abandoned GitHub repos.</strong><br/>
  Drop a URL. Find out how dead it is.
</p>

<p align="center">
  <a href="https://commitmentissues.dev"><img src="https://img.shields.io/badge/live-commitmentissues.dev-black?style=flat-square" /></a>
  <img src="https://img.shields.io/github/license/dotsystemsdevs/saas-commitmentissues?style=flat-square" />
  <img src="https://img.shields.io/badge/built%20with-Next.js%2014-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel" />
</p>

---

## What it does

Paste a GitHub repo URL. A **death index scoring algorithm** analyzes commit history, archive status, and issue count — then generates a downloadable death certificate complete with cause of death, last words, and a score from 0–10.

```
https://github.com/atom/atom
            ↓
  Fetches repo metadata + latest commit
  via GitHub public API
            ↓
  Calculates death index (0–10)
            ↓
  ☠️ Certificate of Death
```

---

## Death Index

| Condition | Points |
|-----------|--------|
| Last commit > 2 years ago | +4 |
| Last commit 1–2 years ago | +2 |
| Repo is `archived: true` | +3 |
| 20+ open issues AND inactive 6+ months | +1 |
| 100+ stars but no activity for 1+ year | +1 |

**Maximum: 10.** 0 = alive. 10 = fossil.

**Cause of death** is rule-based — the highest-scoring match wins. See [`src/lib/scoring.ts`](src/lib/scoring.ts) for the full ruleset.

---

## Features

- Death certificate with cause of death, last words, age, mourners, and language
- Circular "REST IN PRODUCTION" stamp with animation
- Download as PNG (share-ready or A4 print)
- Share on X with pre-filled text
- Hall of Shame leaderboard + recently buried repos
- No account required. No data stored.

---

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Fonts | UnifrakturMaguntia · Courier Prime · Inter |
| Deploy | Vercel |
| Storage | Vercel KV (usage counters only) |
| Data | GitHub Public API |

---

## Run locally

```bash
git clone https://github.com/dotsystemsdevs/saas-commitmentissues
cd saas-commitmentissues
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Optional:** add a `GITHUB_TOKEN` to `.env.local` to raise the rate limit from 60 → 5,000 req/hr.

```env
GITHUB_TOKEN=ghp_yourtoken
```

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              ← main UI (search + certificate)
│   ├── about/                ← about / FAQ / privacy info
│   ├── terms/                ← terms of service
│   ├── privacy/              ← privacy policy
│   └── api/
│       ├── repo/             ← GitHub API proxy + death scoring
│       ├── stats/            ← usage counters (buried/shared/downloaded)
│       └── recent/           ← recently analyzed repos
├── components/
│   ├── CertificateCard.tsx   ← certificate UI + export + share
│   ├── CertificateSheet.tsx  ← printable A4 certificate (480×679px)
│   ├── Leaderboard.tsx       ← Hall of Shame marquee
│   ├── SearchForm.tsx        ← URL input + example chips
│   ├── LoadingState.tsx      ← loading animation
│   └── PageHero.tsx          ← page header component
└── lib/
    ├── scoring.ts            ← death index logic, no side effects
    ├── rateLimit.ts          ← per-IP rate limiting
    ├── recentStore.ts        ← in-memory recent repos store
    └── types.ts              ← TypeScript interfaces
```

---

Built by [Dot Systems](https://github.com/dotsystemsdevs)
