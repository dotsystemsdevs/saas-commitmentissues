import { LeaderboardEntry } from './types'

const MAX_RECENT = 20

// Module-level singleton — shared across all requests in the same process
const store: LeaderboardEntry[] = []

export function addRecent(entry: LeaderboardEntry): void {
  const filtered = store.filter(e => e.fullName !== entry.fullName)
  filtered.unshift(entry)
  store.length = 0
  store.push(...filtered.slice(0, MAX_RECENT))
}

export function getRecent(): LeaderboardEntry[] {
  return [...store]
}
