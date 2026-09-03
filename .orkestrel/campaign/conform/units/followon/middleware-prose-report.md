# Unit middleware-prose — report

## Sites

### `tests/guides.test.ts:2-3`

Old:
```
// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The four constants below are this
// package's own, and are the only part a sibling package changes.
```

New:
```
// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The constants following are this
// package's own, and are the only part a sibling package changes.
```

### `tests/guides.test.ts:40`

Old:
```
 * A class that one-class-per-file evicted from its single consumer cannot become a
 * local, so it stays exported without being public. Naming it here is what makes that
 * intentional rather than forgotten — and the second assertion below fails when a name
 * here stops being stranded, so the list cannot rot.
```

New:
```
 * A class that one-class-per-file evicted from its single consumer cannot become a
 * local, so it stays exported without being public. Naming it here is what makes that
 * intentional rather than forgotten — and the `names no symbol internal that the barrel
 * already exports` assertion later in this file fails when a name here stops being
 * stranded, so the list cannot rot.
```

### `tests/src/server/middlewares.test.ts:1182`

Old:
```
// throws `MODULE_NOT_FOUND` unconditionally, confirmed through a direct
// `node -e "require('@orkestrel/server/server')"` repro — an external
// peer-package build defect, out of this dispatch's scope to fix. The
// capstone below substitutes a real `node:http` socket (this repo's own
```

New:
```
// throws `MODULE_NOT_FOUND` unconditionally, confirmed through a direct
// `node -e "require('@orkestrel/server/server')"` repro — an external
// peer-package build defect, out of this dispatch's scope to fix. The
// following capstone substitutes a real `node:http` socket (this repo's own
```

### `tests/src/core/middlewares.test.ts:1905`

Old:
```
// ── createCookieTransport / createHeaderTransport (from factories.ts, exercised indirectly above; direct smoke) ──
```

New:
```
// ── createCookieTransport / createHeaderTransport (from factories.ts, exercised indirectly earlier in this file; direct smoke) ──
```

## Sweep

Pattern `\b(above|below)\b`, case-insensitive, over `tests/**` excluding `node_modules`:

- `tests/setupPolicy.ts:2098` — vendored, off-limits, excluded.
- `tests/policy.test.ts:544` — vendored, off-limits, excluded.
- `tests/src/core/helpers.test.ts:358,381,460,497` — numeric-comparison sense (`above-threshold`, `below threshold`); permitted, unchanged.
- `tests/src/core/stores/MemorySessionStore.test.ts:130` — numeric-comparison sense (`at or below an explicit capacity`); permitted, unchanged.
- `tests/src/server/middlewares.test.ts:1159` — numeric-comparison sense (`skips below threshold`); permitted, unchanged.
- `tests/src/server/MultipartParser.test.ts:110` — numeric-comparison sense (`cap sits below the body's own length`); permitted, unchanged.

No document-reference sense of `above` or `below` remains in `tests/**` outside the vendored files.

## Gates

- `npm run format:check` — exit 0 (`All matched files use the correct format.`)
- `npm run lint:check` — exit 0 (no output, no warnings)
- `npm run check` — exit 0 (`tsc --noEmit` for the root project, `check:src:core`, `check:src:server` all clean)
- `npm run build` — exit 0 (core and server builds completed; declaration files generated)
- `npm test` — exit 0 (`432 passed | 1 skipped` core/server suite, `111 passed` policy, `46 passed` config, `36 passed` setup, `38 passed` guides)

## Audit

`npx scaffold audit --offline`:
```
0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
```

## Evidence

`node /home/user/scaffold/tmp/work/evidence.mjs middleware`:
```
/home/user/work/evidence/conform-middleware.diff 50 lines
/home/user/work/evidence/conform-middleware.status 3 entries
```

`git -C /home/user/fleet/middleware status --short` lists only the three owned paths: `tests/guides.test.ts`, `tests/src/core/middlewares.test.ts`, `tests/src/server/middlewares.test.ts`.
