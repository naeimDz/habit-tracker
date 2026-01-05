# Copilot Instructions — HabitFlow (habit-tracker)

## Quick context
- Framework: **Next.js 15** (app router / `src/app`) with TypeScript (strict).
- Purpose: Small PWA habit tracker. Offline-first local storage (IndexedDB via `idb`) + a local "sync queue" to simulate server sync.
- Key files: `src/components/HabitTracker.tsx`, `src/components/HabitCard.tsx`, `src/hooks/useSync.ts`, `src/lib/db.ts`, `src/hooks/useBadging.ts`, `src/components/InstallPrompt.tsx`, `next.config.ts`, `public/manifest.json`, `public/sw.js`.

---

## What to know to be productive (concise)
- Big picture: UI is built as client components (add `"use client"` at top). Habit state lives in IndexedDB (`src/lib/db.ts`) and updates are *optimistically* applied in `HabitTracker` and then queued (`addToSyncQueue`) for background sync (`useSync`).
- Storage schema: `habit-tracker-db` has object stores `habits` (keyPath `id`) and `syncQueue` (autoIncrement key, index `by-timestamp`). If you change the schema, increment `DB_VERSION` in `src/lib/db.ts` and implement upgrade logic.
- Sync flow: `addToSyncQueue('UPDATE_HABIT', payload)` → `useSync.processSyncQueue()` reads `getSyncQueue()` and calls `clearSyncQueue()` after a (currently simulated) sync. To plug a real backend, modify `processSyncQueue()` to POST queued items to your API and handle partial failures.
- PWA & SW: next-pwa is configured in `next.config.ts`. Note: PWA is disabled in development (see `disable: process.env.NODE_ENV === 'development'`). To test service worker behavior, run a production build (`npm run build && npm run start`) and inspect via DevTools > Application > Service Workers.
- Platform APIs used: App Badging (`navigator.setAppBadge`), Notifications API (used in `HabitTracker`), and `beforeinstallprompt` event (handled in `InstallPrompt.tsx`). These are feature-detected; guard code is present.
- Import aliases: `@/*` maps to `./src/*` (see `tsconfig.json`). Use `@/lib/db` etc. for imports.

---

## Starter workflows & commands
- Start dev server (no SW): `npm run dev` (fast feedback loop; note service worker is disabled in dev by design).
- Build & run prod (SW active): `npm run build && npm run start` — use this to validate PWA behavior and service-worker caching.
- Lint: `npm run lint` (uses Next's ESLint config).

---

## Project-specific conventions & gotchas
- Use `"use client"` in components that use hooks, client state, or browser APIs (see `HabitTracker.tsx`, `HabitCard.tsx`). Default files in `src/app` are server components.
- Habit shape: see `src/types/habit.ts`. The `days` array is length 7 (S–S). Keep that invariant when adding features.
- Optimistic updates: UI updates immediately, then writes to IDB and queues sync. Follow this pattern when adding features to avoid UI jank.
- Sync actions are currently `UPDATE_HABIT` only. If you add new actions, add typed handlers and update the queue-processing logic consistently.
- DB access is lazy (`initDB()` called inside helpers). To change DB internals, edit `src/lib/db.ts` and make sure to handle upgrades.
- The service worker config avoids caching `/api/auth/` and uses network-first for `/api/` (see generated `public/sw.js`). If adding an API, be mindful of caching strategy and SW behavior.

---

## Where to make common changes (examples)
- UI change to check/uncheck a day: `src/components/HabitTracker.tsx` (function `handleToggle`).
- Persist / schema changes: `src/lib/db.ts` (update `DB_VERSION` and `upgrade` code).
- Background sync behavior: `src/hooks/useSync.ts` (function `processSyncQueue`).
- Add feature flags / PWA config: `next.config.ts`.

---

## Debugging tips
- Inspect IndexedDB: DevTools → Application → IndexedDB → `habit-tracker-db` to view `habits` and `syncQueue` entries.
- Use console logs in `useSync` (already logs queue processing) to trace sync behavior.
- To reproduce SW behavior reliably: build & start in production, open site in an incognito window and use DevTools to unregister and re-register the SW as needed.

---

If any detail above is unclear or you want more examples (e.g., a walkthrough for adding a real backend sync or a suggested test harness), tell me which area to expand. I'm ready to iterate. ✅
