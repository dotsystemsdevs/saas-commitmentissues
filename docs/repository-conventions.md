# Repository conventions

This project keeps file naming and layout simple on purpose.

## Naming

- Use `kebab-case` for docs and config file names (`v1.0.0.md`, `repository-conventions.md`)
- Use `lowercase` folder names (`docs`, `screenshots`, `releases`)
- Keep React component files in `PascalCase` (`CertificateCard.tsx`)
- Keep utility modules in `camelCase` (`recentStore.ts`, `rateLimit.ts`)

## Folders

- `src/app`: routes and API handlers
- `src/components`: UI components
- `src/lib`: pure logic and shared utilities
- `docs/screenshots`: README images and GIFs
- `docs/releases`: release notes

## Scope rule

Prefer small, focused changes over broad refactors.
