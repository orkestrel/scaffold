# Unit console-prose — report

## Standing condition (not this unit's rows)

At dispatch, `git -C /home/user/fleet/console status --short` already showed `src/core/ANSIRenderer.ts`,
`src/core/Logger.ts`, `src/core/LoggerManager.ts`, and their three test twins as unstaged deletions.
The landed commit `cac35cd` moved these classes to `src/core/renderers/` and `src/core/loggers/`
(present, tracked, exercised by the green suite); the old-path deletions are leftover working-tree
state from that move, never staged. Not owned by this unit's rows; left untouched.

## Row 1 — README

- `README.md:4` — "composing five concerns" names the members: "composing style, logging, reporting,
  capture, and animation".
- `README.md:67` — "not just `console.*`" drops `just`: "not `console.*`".
- `README.md:83` — "three environment-scoped entry points" names the members: "the `.`, `./server`,
  and `./browser` environment-scoped entry points".

## Row 2 — test titles

- `tests/src/browser/helpers.test.ts:119` — `e.g.` → `for example,`.
- `tests/src/browser/helpers.test.ts:438` — `e.g.` → `for example,`.
- No `:143` `e.g.` site existed at the landed tip; that line carried a `via` hit instead, closed
  under row 7.

## Row 3 — published examples

Named sites, `@src/core` / `@src/server` → `@orkestrel/console` / `@orkestrel/console/server`:

- `src/core/factories.ts:35,70,118`
- `src/core/types.ts:160`
- `src/core/Styler.ts:102`
- `src/server/factories.ts:40` (and `:41`, `@src/server` → `@orkestrel/console/server`, same
  `@example` fence)

One further site the acceptance criterion's "no `@src/` specifier survives in a published TSDoc
example" reaches beyond the named list: `src/browser/factories.ts:44-45` — a real `@example` fence
importing `@src/core` and `@src/browser` — fixed to `@orkestrel/console` and
`@orkestrel/console/browser`. Every other `@src/` occurrence in `src/**` is a real source import
(top-of-file `import ... from '@src/core'`), not a published example, and stays. `tests/guides.test.ts`
and `guides/console.md` transcribe none of the changed sentences with an `@src/` specifier (the guide
already uses published specifiers throughout); no twin edit was needed.

## Row 4 — `errors.ts`

`src/core/errors.ts:13` (TSDoc `@remarks` on `ConsoleError`) dropped the count and `today`: "an
internal invariant violated at a defensive, structurally-unreachable guard (`INVARIANT`)."

## Row 5 — nested functions

Both sites named in `reports/conform-console-report.md`'s successor-item list:

- **`tests/src/server/ProcessCapture.test.ts:31`** — the `const write = (...) => {...}` nested arrow
  inside `createOverloadProbe`. Extracted by moving the whole factory to `tests/setupServer.ts`
  (the centralized server-test-fixture file `createWriteProbe` already lives in), exported as
  `createOverloadProbe` plus the `WriteCallback` type, with `write` written as an object-method
  literal (not an intermediate `const`) so the closure over `texts` / `encodings` / `callbacks`
  transfers unchanged — same captured state, same mutation order, same return values.
  `tests/src/server/ProcessCapture.test.ts` now imports `createOverloadProbe` from
  `../../setupServer.js` and declares neither the type nor the factory locally.
  Tested in `tests/setupServer.test.ts` (`describe('createOverloadProbe', ...)`, four cases: default
  backpressure/decode/no-callback, string-encoding-plus-3rd-arg-callback, 2nd-arg-callback,
  configured backpressure).
- **`tests/src/core/helpers.test.ts:1199-1201`** — three nested `const log = (): string => 'log'`
  (etc.) assignments inside an `it` callback, built only to prove `selectWriter` returns the
  identical reference it was given. Extracted as `createStubWriter(label)` in `tests/setup.ts`
  (the centralized core-test-fixture file `normalizeVisible` already lives in), returning a fresh
  `() => label` function per call — same behavior (a distinct callable per invocation, returning
  `label`), no captured state to preserve since none of the three original functions closed over
  anything. `tests/src/core/helpers.test.ts` imports `createStubWriter` from `../../setup.js` and
  the site now reads `const log = createStubWriter('log')` (etc.).
  Tested in `tests/setup.test.ts` (`describe('createStubWriter', ...)`, two cases: returns the
  labeled value, each call yields a distinct reference).

No extraction changed a closure's captured state; neither deviation-contract condition fired.

## Row 6 — `normalizeVisible`

- `tests/src/core/Spinner.test.ts:315` — `strip(text).replace(/^\r/, '').replace(/\n$/, '')` →
  `normalizeVisible(text)`, imported from `../../setup.js` (file already imported `createRecordingSink`
  from there). Adjacent title/comment at the same site ("asserted via strip" / "Strip ANSI via the
  framework helper") folded into row 7's `via` sweep.
- `tests/src/core/Progress.test.ts:204` — `strip(text).replace(/^\r/, '')` → `normalizeVisible(text)`
  (semantically identical: the source text carries no trailing newline at this site, so
  `normalizeVisible`'s extra `.replace(/\n$/, '')` is a no-op), imported from `../../setup.js`.
  Same-site title/comment folded into row 7.

## Row 7 — substitution sweep

Ran the pattern over `README.md`, `src/**`, and the owned `tests/**` (excluding
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`).

Replaced (banned sense):

- `README.md:67` — `just` deleted (also row 1).
- `tests/src/core/Progress.test.ts:7,11` — `via` → `through` / `asserts by stripping ANSI`.
- `tests/src/core/factories.test.ts:274` — `should` recast: "the sink should snapshot" → "the sink
  snapshots".
- `tests/src/core/Styler.test.ts:37,63` — `via` → `through` / recast to "strip and assert".
- `tests/src/browser/helpers.test.ts:119,438` — `e.g.` (row 2); `:143` — `via` → `through`.
- `tests/src/core/loggers/Logger.test.ts:417` — `simply` deleted.
- `tests/src/core/Reporter.test.ts:331` — `via` → `through`.
- `tests/src/server/helpers.test.ts:103,120,125,144` — `via` → `through`; `should` recast: "decodeChunk
  should honor" → "decodeChunk honors".
- `tests/src/core/Capture.test.ts:9` — `and/or` → ", forward to a sink, or both" (mirror and
  forward-to-sink are independently optional, so "or both" is the accurate replacement); also
  dropped the co-located count "the five console methods" while editing this sentence (not a row-7
  target, but the same line).
- `tests/src/core/Capture.test.ts:359,380` — `via` → `through`.
- `tests/src/core/Spinner.test.ts:17,80,89,313-315` — `via` → `through` / "asserted by stripping
  ANSI" (rows 6 and 7 together).
- `tests/src/core/helpers.test.ts:361` — `just` deleted.
- `tests/src/server/ProcessCapture.test.ts:90,367,376,431` — `via` → `through`.
- `tests/src/core/Progress.test.ts:197,203-204` — `via` → `through` / "asserted by stripping ANSI"
  (rows 6 and 7 together).

Recorded as permitted sense (not changed):

- Every `new X(...)` construction, `Date.now()` / `performance.now()` call, and code-fence content
  across `README.md`, `src/**`, and `tests/**` — `new` names the language keyword or an API method
  name, not a documentation-currency claim.
- Prose describing object creation or execution order with `new` / `now` — for example
  `src/core/Styler.ts:10,120,159,169`, `src/core/types.ts:83,124`, `src/browser/types.ts:62`,
  `src/core/Spinner.ts:110`, `src/server/ProcessCapture.ts:134`, `src/core/factories.ts:120,125`,
  `src/browser/factories.ts:52`, `tests/src/core/Capture.test.ts:43,252,475`,
  `tests/src/core/factories.test.ts:276-277,401`, `tests/src/core/Spinner.test.ts:136`,
  `tests/src/server/ProcessCapture.test.ts:512`, `tests/src/core/Styler.test.ts:7`,
  `tests/src/core/loggers/Logger.test.ts:366`, `tests/src/core/Retention.test.ts:99-101` — each
  describes a constructed value, a state transition, or a timing contrast ("now" vs. "later"),
  never a claim that a fact is true only as of today.
- `tests/src/core/loggers/Logger.test.ts:164` — `'should not run'` is a literal sentinel string a
  test asserts was never invoked, not a prose claim.
- `tests/src/core/Reporter.test.ts:354-355` — `'via default sink'` is a literal string value the
  test writes and reads back, not prose.

No `should`, `simply`, `easy`, `currently`, `utilize`, `leverage`, `in order to`, `i.e.`, `etc.`,
`performant`, `robust`, `allows you to`, `please`, or `dummy` hit survived outside the entries above.

## Gates

- `npm run format:check` — exit 0 ("All matched files use the correct format.").
- `npm run lint:check` — exit 0 (no output, no findings).
- `npm run check` — exit 0 (`tsc --noEmit` root + `check:src:core` + `check:src:browser` +
  `check:src:server`, all clean).
- `npm run build` — exit 0 (`core`, `browser`, `server` bundles + declaration files built; the
  API Extractor TypeScript-version notice is pre-existing tooling noise, no error).
- `npm test` — exit 0 (`test:src` 638 passed, `test:policy` 111 passed, `test:config` 46 passed,
  `test:setup` 29 passed, `test:guides` 91 passed — `test:guides` included and green).

## Audit

`npx scaffold audit --offline` — `0 of 45 planned paths drifted from the plan. Audit compared bytes
at 28, existence at 5, and nothing at 12.` No `configs/browsers.ts` row reappeared.

## Evidence capture

`node /home/user/scaffold/tmp/work/evidence.mjs console` wrote
`/home/user/work/evidence/conform-console.diff` (1976 lines) and
`/home/user/work/evidence/conform-console.status` (28 entries).
`git -C /home/user/fleet/console status --short` lists only Owned paths: `README.md`,
`src/browser/factories.ts`, `src/core/Styler.ts`, `src/core/errors.ts`, `src/core/factories.ts`,
`src/core/types.ts`, `src/server/factories.ts`, `tests/setup.test.ts`, `tests/setup.ts`,
`tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/browser/helpers.test.ts`,
`tests/src/core/Capture.test.ts`, `tests/src/core/Progress.test.ts`, `tests/src/core/Reporter.test.ts`,
`tests/src/core/Spinner.test.ts`, `tests/src/core/Styler.test.ts`, `tests/src/core/factories.test.ts`,
`tests/src/core/helpers.test.ts`, `tests/src/core/loggers/Logger.test.ts`,
`tests/src/server/ProcessCapture.test.ts`, `tests/src/server/helpers.test.ts`, plus the six
pre-existing standing-condition deletions untouched by this unit.
