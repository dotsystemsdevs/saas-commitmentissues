<<<<<<< HEAD
# Commitment Issues

Official death certificates for abandoned GitHub repositories.

**Live:** [commitmentissues.dev](https://commitmentissues.dev)

![MIT License](https://img.shields.io/github/license/dotsystemsdevs/commitmentissues?style=flat-square)
![Vercel Deploy](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel)

## What is Commitment Issues?

Paste a public GitHub repository URL and get a shareable **Certificate of Death**: a tongue-in-cheek summary of how “dead” the repo looks, with a score, cause of death, last words, and exportable graphics for social posts. No account required.
=======
# commitmentissues.dev

Official death certificates for abandoned GitHub repositories.

**Live:** [https://commitmentissues.dev](https://commitmentissues.dev)

[![MIT License](https://img.shields.io/github/license/dotsystemsdevs/commitmentissues?style=flat-square)](LICENSE)
![Vercel Deploy](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel)

Paste a public GitHub repository URL and get a shareable **Certificate of Death** with a score, cause of death, last words, and export-ready visuals.

## What Is Commitment Issues?

Commitment Issues is a tongue-in-cheek product for developers and founder communities. It analyzes public repository signals and generates a stylized death certificate for repos that look abandoned.

No account required.

## Core Features

- Certificate of Death sheet (cause, last words, score, repo age, derived stats)
- Export formats for social platforms (feed, square, story-style)
- Mobile-friendly sharing
- Hall of Shame (curated leaderboard)
- Recently Buried (recent public burials feed)
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)

## How It Works

<<<<<<< HEAD
- **Certificate of Death** — A4-style layout with cause, last words, repo age, and derived stats
- **Exports** — Multiple aspect ratios (feed, square, story-style) for common social platforms
- **Mobile share** — Native share uses a tall story-friendly format on small screens to reduce bad crops
- **Hall of Shame** — Curated leaderboard of famously abandoned repositories
- **Recently Buried** — Live feed of the latest public burials (repo, cause, score, time)

## How scoring works (high level)

| Step | What happens |
|------|----------------|
| Input | You provide a public repo URL |
| Data | The app reads public metadata from the GitHub API |
| Score | A death score and narrative (cause, last words) are computed in `src/lib/scoring.ts` |
| Output | You get an on-screen certificate and optional image exports |

Hall of Shame entries are curated for recognizable repos and fast first paint; Recently Buried reflects real recent usage.

## Screenshots

Home:

![Homepage screenshot](docs/screenshots/homepage.png)

Certificate:

![Certificate screenshot](docs/screenshots/certificate.png)

About:

![About page screenshot](docs/screenshots/about.png)
=======
1. User pastes a public GitHub repo URL.
2. App fetches public repo metadata from the GitHub API.
3. Scoring and narrative are computed in `src/lib/scoring.ts`.
4. Certificate is rendered and can be exported/shared.
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)

## Privacy

- No login required
<<<<<<< HEAD
- Only public GitHub data is used
- Recently Buried stores recent public burial entries (repo, cause, score, timestamp)
- Anonymous aggregate analytics may be used for product metrics

## Tech stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Fonts | UnifrakturMaguntia, Courier Prime, Inter |
| Hosting | Vercel |
| Storage | Upstash Redis (usage counters and recent burials) |
| Data | GitHub public API |

## Getting started
=======
- Uses only public GitHub data
- Recently Buried stores public burial entries (repo, cause, score, timestamp)
- Anonymous aggregate analytics may be used for product metrics

## Tech Stack

| Area | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | UnifrakturMaguntia, Courier Prime, Inter |
| Hosting | Vercel |
| Storage | Upstash Redis (usage counters + recent burials) |
| Data source | GitHub Public API |

## Getting Started
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)

```bash
git clone https://github.com/dotsystemsdevs/commitmentissues.git
cd commitmentissues
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

<<<<<<< HEAD
### Environment

Optional: add a GitHub token to raise API rate limits.
=======
### Optional Environment

Use a GitHub token to raise API rate limits in local dev:
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)

```env
GITHUB_TOKEN=ghp_yourtoken
```

<<<<<<< HEAD
Create a token under GitHub **Settings → Developer settings → Personal access tokens**. Fine-grained tokens work if you limit scope to what this app needs; classic tokens are also fine for local dev.

## Testing
=======
## Scripts
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)

```bash
npm run dev
npm run build
npm test
```

<<<<<<< HEAD
## Contributing

- Read `.github/CONTRIBUTING.md` before opening a PR
- Use the issue and PR templates
- CI runs lint, tests, and build on pull requests to `master`

## Project structure
=======
## Project Structure
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)

```text
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── terms/
│   └── api/
│       ├── repo/
│       ├── stats/
│       └── recent/
├── components/
│   ├── CertificateCard.tsx
│   ├── Leaderboard.tsx
│   ├── SearchForm.tsx
│   └── LoadingState.tsx
└── lib/
    ├── scoring.ts
    ├── rateLimit.ts
    ├── recentStore.ts
    └── types.ts
```

<<<<<<< HEAD
Scoring logic lives in `src/lib/scoring.ts` so it stays easy to test and change.

=======
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)
## Docs

- Release notes: `docs/releases/`
- Screenshots: `docs/screenshots/`
- Repository conventions: `docs/repository-conventions.md`

<<<<<<< HEAD
## License

MIT — see repository license file.
=======
## Screenshots

Add/update screenshots in:

- `docs/screenshots/home.png`
- `docs/screenshots/certificate.png`
- `docs/screenshots/about.png`
>>>>>>> ab3e4b0 (Refine README clarity and onboarding flow.)

Built by [Dot Systems](https://github.com/dotsystemsdevs).

## Chrome extension (MVP)

A local MV3 extension is included under `extension/`.

### Load unpacked in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the repository folder `extension/`

### Test flow

1. Open a GitHub repo root page such as `https://github.com/vercel/next.js`
2. Verify a tombstone badge appears near the repo header
3. Click the badge to open the full certificate on `commitmentissues.dev`
4. Navigate to another repo without full reload; verify no duplicate badge appears

If the API is rate-limited or unavailable, the badge falls back to `Reaper busy`.
