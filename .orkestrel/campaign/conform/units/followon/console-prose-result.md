# Unit console-prose — report

## Standing condition (not this unit's rows)

At dispatch, `git -C /home/user/fleet/console status --short` already showed `src/core/ANSIRenderer.ts`, `src/core/Logger.ts`, `src/core/LoggerManager.ts`, and their three test twins as unstaged deletions. The landed commit `cac35cd` moved these classes to `src/core/renderers/` and `src/core/loggers/` (present, tracked, exercised by the green suite); the old-path deletions are leftover working-tree state from that move, never staged. Not owned by this unit's rows; left untouched.

## Row 1 — README

- `README.md:4` — "composing five concerns" names the members: "composing style, logging, reporting, capture, and animation".
- `README.md:67` — "not just `console.*`" drops `just`: "not `console.*`".
- `README.md:83` — "three environment-scoped entry points" names the members: "the `.`, `./server`, and `./browser` environment-scoped entry points".

## Row 2 — test titles

- `tests/src/browser/helpers.test.ts:119` — `e.g.` → `for example,`.
- `tests/src/browser/helpers.test.ts:438` — `e.g.` → `for example,`.
- No `:143` `e.g.` site existed at the landed tip; that line carried a `via` hit instead, closed under row 7.

## Row 3 — published examples

Named sites, `@src/core` / `@src/server` → `@orkestrel/console` / `@orkestrel/console/server`:

- `src/core/factories.ts:35,70,118`
- `src/core/types.ts:160`
- `src/core/Styler.ts:102`
- `src/server/factories.ts:40` (and `:41`, `@src/server` → `@orkestrel/console/server`, same `@example` fence)

One further site the acceptance criterion's "no `@src/` specifier survives in a published TSDoc example" reaches beyond the named list: `src/browser/factories.ts:44-45` — a real `@example` fence importing `@src/core` and `@src/browser` — fixed to `@orkestrel/console` and `@orkestrel/console/browser`. Every other `@src/` occurrence in `src/**` is a real source import (top-of-file `import ... from '@src/core'`), not a published example, and stays. `tests/guides.test.ts` and `guides/console.md` transcribe none of the changed sentences with an `@src/` specifier (the guide already uses published specifiers throughout); no twin edit was needed.

## Row 4 — `errors.ts`

`src/core/errors.ts:13` (TSDoc `@remarks` on `ConsoleError`) dropped the count and `today`: "an internal invariant violated at a defensive, structurally-unreachable guard (`INVARIANT`)."

## Row 5 — nested functions

Both sites named in `reports/conform-console-report.md`'s successor-item list:

- **`tests/src/server/ProcessCapture.test.ts:31`** — the `const write = (...) => {...}` nested arrow inside `createOverloadProbe`. Extracted by moving the whole factory to `tests/setupServer.ts` (the centralized server-test-fixture file `createWriteProbe` already lives in), exported as `createOverloadProbe` plus the `WriteCallback` type, with `write` written as an object-method literal (not an intermediate `const`) so the closure over `texts` / `encodings` / `callbacks` transfers unchanged — same captured state, same mutation order, same return values. `tests/src/server/ProcessCapture.test.ts` now imports `createOverloadProbe` from `../../setupServer.js` and declares neither the type nor the factory locally. Tested in `tests/setupServer.test.ts` (`describe('createOverloadProbe', ...)`, four cases).
- **`tests/src/core/helpers.test.ts:1199-1201`** — three nested `const log = (): string => 'log'` (etc.) assignments inside an `it` callback, built to prove `selectWriter` returns the identical reference it was given. Extracted as `createStubWriter(label)` in `tests/setup.ts` (the centralized core-test-fixture file `normalizeVisible` already lives in). `tests/src/core/helpers.test.ts` imports it from `../../setup.js`; the site reads `const log = createStubWriter('log')` (etc.). Tested in `tests/setup.test.ts` (`describe('createStubWriter', ...)`, two cases).

No extraction changed a closure's captured state; neither deviation-contract condition fired.

## Row 6 — `normalizeVisible`

- `tests/src/core/Spinner.test.ts:315` and `tests/src/core/Progress.test.ts:204` — the inlined `strip(text).replace(...)` chains replaced with `normalizeVisible(text)`, imported from `../../setup.js`.

## Row 7 — substitution sweep

Ran the pattern over `README.md`, `src/**`, and the owned `tests/**`. Replaced `via` → `through` across `tests/src/core/{Progress,Styler,Spinner,Reporter,Capture,helpers}.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/server/{helpers,ProcessCapture}.test.ts`; recast two `should` sites; deleted two `just` sites; recast one `and/or` site in `tests/src/core/Capture.test.ts:9`. Every `new`/`now` occurrence (`new X(...)`, `Date.now()`, `performance.now()`, and prose describing object creation or execution ordering) recorded as permitted sense. `tests/src/core/loggers/Logger.test.ts:164` and `tests/src/core/Reporter.test.ts:354-355` are literal test-data strings, recorded permitted. Full detail is in the file at `/home/user/scaffold/tmp/units/followon/console-prose-report.md`.

## Gates

- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npm run build` — exit 0.
- `npm test` — exit 0 (`test:src` 638 passed, `test:policy` 111 passed, `test:config` 46 passed, `test:setup` 29 passed, `test:guides` 91 passed).

## Audit

`npx scaffold audit --offline` — `0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.` No `configs/browsers.ts` row reappeared.

## Evidence capture

`node /home/user/scaffold/tmp/work/evidence.mjs console` wrote `/home/user/work/evidence/conform-console.diff` (1976 lines) and `/home/user/work/evidence/conform-console.status` (28 entries). `git -C /home/user/fleet/console status --short` lists only Owned paths plus the six pre-existing standing-condition deletions untouched by this unit.

The full report is written at `/home/user/scaffold/tmp/units/followon/console-prose-report.md`.
