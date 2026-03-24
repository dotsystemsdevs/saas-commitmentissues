# ☠️ commitmentissues.dev

Official death certificates for abandoned GitHub repos.

**Live demo:** [https://commitmentissues.dev](https://commitmentissues.dev)

Drop a GitHub URL. Get a shareable certificate in seconds.

![MIT License](https://img.shields.io/github/license/dotsystemsdevs/saas-commitmentissues?style=flat-square)
![Vercel Deploy](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel)

## Screenshots

Add product screenshots and one short export GIF here before launch:

- `docs/screenshots/home.png`
- `docs/screenshots/certificate.png`
- `docs/screenshots/leaderboard.png`
- `docs/screenshots/export.gif`

## How it works

1. Paste a GitHub repository URL.
2. Fetch public repo metadata from the GitHub API.
3. Calculate a death score and cause-of-death.
4. Generate and export a Certificate of Death.

## Features

- A4-style death certificate with cause, last words, age, and stats
- PNG export for sharing and print
- Share-to-X flow with prefilled text
- Hall of Shame leaderboard of famously abandoned repos

## Privacy

- No login required
- Only public GitHub data is used
- No analyzed repository data is stored server-side
- Anonymous usage counters only (Vercel KV)

## Leaderboard data

The Hall of Shame list is currently curated for recognizable dead repos and fast first-load UX.

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Fonts | UnifrakturMaguntia · Courier Prime · Inter |
| Deploy | Vercel |
| Storage | Vercel KV (usage counters only) |
| Data | GitHub Public API |

## Run locally

```bash
git clone https://github.com/dotsystemsdevs/saas-commitmentissues
cd saas-commitmentissues
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: add a `GITHUB_TOKEN` in `.env.local` to raise GitHub API limits.

```env
GITHUB_TOKEN=ghp_yourtoken
```

## Testing

```bash
npm test
```

## Project structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── terms/
│   ├── privacy/
│   └── api/
│       ├── repo/
│       ├── stats/
│       └── recent/
├── components/
│   ├── CertificateCard.tsx
│   ├── CertificateSheet.tsx
│   ├── Leaderboard.tsx
│   ├── SearchForm.tsx
│   └── LoadingState.tsx
└── lib/
    ├── scoring.ts
    ├── rateLimit.ts
    ├── recentStore.ts
    └── types.ts
```

Scoring logic is isolated in `src/lib/scoring.ts` so it is easy to test and iterate.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

Built by [Dot Systems](https://github.com/dotsystemsdevs)
