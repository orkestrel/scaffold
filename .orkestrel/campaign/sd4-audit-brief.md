# Audit SD4 — zero-parameter project factories (scaffold)

Role: analyst. Engine: GPT-5.6 Sol. Read-only: you audit, you do not edit. Attempt REFUTATION of
each claim; a claim you cannot break is CONFIRMED with the evidence that convinced you; a broken
claim is BROKEN with the exact failing input and the smallest correct fix. End with one terminal
line: `PASS` (no BROKEN claims) or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/scaffold` (baseline commit d8de174). The
diff = `git diff` over: `src/core/templates.ts`, `src/core/compilers.ts`, `vite.config.ts`,
`configs/src/vite.{core,server,bin}.config.ts`, `tests/src/core/templates.test.ts`,
`tests/src/core/compilers.test.ts`. The writer was Claude Opus 5 (unit SD4, ruling 4 of
`.orkestrel/campaign/d2d-reconciliation.md`); the compilers.test.ts edits are the Orchestrator's
serial application of the writer's report-only patches. Gates already read on the host:
compilers+templates 119/119, `test:src:core` 360/360, `test:config` 44/44, `check:src` exit 0.
The four `tests/src/bin/CLI.test.ts` TS7053 root-check errors are pre-existing at baseline
(measured with the SD4 files reverted) and are owned by the queued SD2-FIX unit — they are not
this audit's subject.

## Claims

1. Every emitted project factory (all selection-matrix shapes) declares `(): UserConfig` with no
   parameter list, and no emission path still carries `options?: UserConfig` or a
   `mergeConfig(base, options ?? {})` spine.
2. The four materialized wrappers under `configs/src/` compose
   `defineConfig(mergeConfig(<factory>(), {...}))`, importing `mergeConfig` beside
   `defineConfig` from `vite`, and both the factory's fields and the wrapper's overrides survive
   the compose.
3. Emitted root configurations no longer import `mergeConfig`, and no emitted file is left with
   an unused import that its own lint or `noUnusedLocals` would refuse.
4. The new pin in `tests/src/core/templates.test.ts` (`declares every emitted project factory
   without a parameter list`) reads declarations off the TypeScript parser, sweeps every module
   of the selection matrix, and its per-module plant control makes an unread module impossible —
   a planted parameter in ANY matrix module fails the test.
5. The `appBrowser` seal is `export function appBrowser(): UserConfig {
   return applicationBrowser(false) }`; `applicationBrowser(showcase: boolean)` stays unexported
   and unregistered; the inverted control at `templates.test.ts` ~997 proves a project-row call
   with an argument now reports `Expected 0 arguments, but got 1`.
6. The `probe` label color change `'gray'`→`'black'` is forced by the now-checked `LabelColor`
   union, `'black'` collides with no other project's label, and nothing else in the tree pins
   `'gray'`.
7. The `src/core/compilers.ts` diff is fill-indentation only — no behavior, selection, or
   structure moved — and the emitted corpus stays at the oxfmt fixed point.
8. The Orchestrator's applied patches to `tests/src/core/compilers.test.ts` pin the real emitted
   bytes (not weakened equivalents), and every remaining assertion in that file agrees with the
   sealed emission.
9. The runtime half of ruling 4's second pin (a sentinel-env invocation proof in the vendored
   `tests/config.test.ts`) is NOT in this diff, and its carry to the SD3 unit is recorded — the
   deviation is a recorded carry, not a silent drop (check
   `tmp/units/sd3-prepack-assertion-brief.md` and the SD4 report's deviation 5).

## Method

Read the diff and the emitted corpus through the real compilers (you can run read-only commands;
the sandbox denies network and spawn-heavy suites — scoped `vitest` runs that worked for prior
audits are fine, and if a run is denied, judge from source and say so per claim). Do not edit any
file.

## Output

Per-claim verdicts with evidence, then the terminal line.
