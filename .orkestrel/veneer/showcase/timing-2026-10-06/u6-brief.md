# Unit task75-U6 — statechart timing entries and the per-row failure log

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-containment` (a detached veneer worktree at `1f6c1f7`, which carries units U3 to U5; `node_modules` installed, `dist` built). Owned files: `tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`. Commit nothing; the Orchestrator lands.

## Objective

Give every statechart test a timing entry the duration instrument can key by variant, and log each failed row the moment the harness announces it, so a test timeout can no longer hide the named cause. Today the two statechart tests (`showcase statecharts > drives the $family header table through the header buttons` and `drives the $family table through its controls with motion=$motion`, `tests/app/browser/integration.test.ts`) leave no per-variant duration, so the instrument pools the `face` header title across variants as unattributed; and `executeShowcaseHarness` (`tests/setupBrowser.ts`) reads announcements only after `execute` returns, so a Vitest timeout during a multi-row failure loses every named cause.

Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 1 (the paragraph on the harness and the timeout) and § Units U6 (read both first; line numbers there were read at veneer `90b96bb`; re-locate by text in `/home/user/.wave/veneer-containment`).

## Context

- The compare instrument (`/home/user/veneer/tmp/units/journey-cost/compare.ts`) excludes any Journal payload carrying `seconds` or `milliseconds` as a timing entry and refuses an entry whose name starts with a `GATED` name (its `GATED` list near the top). The duration instrument (`/home/user/veneer/tmp/units/journey-cost/durations.ts`, its `Statechart duration` parser) expects `{ variant, family, motion?, seconds, rows: [{ name, milliseconds }] }` with `motion` omitted for header tables.
- The harness sets a row's result attribute before announcing it (`@orkestrel/test/dist/src/browser/index.js`, the announcement near `harness.failures`), so logging inside the observer callback sees the failure.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u6-NAME --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run; a file or filtered run takes `--kind command`; a full journey takes `--kind journey` with `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u6-NAME/report.json`; never `cd`; no bash, PowerShell, or Python scripts; one re-run for a Vite optimizer import failure before any test body; the journey host-bound set is empty.

## Scope

- **Change.**
  1. In both statechart tests, record `performance.now()` at the start and at each `build` call; in `finally`, emit `console.info('Statechart duration', JSON.stringify({ variant: VARIANT, family, motion, seconds, rows: [{ name, milliseconds }] }))`, omitting `motion` for header tables; `rows` carries one entry per executed row with its elapsed milliseconds.
  2. In the observer callback of `executeShowcaseHarness`, emit `console.error('Statechart row failed', JSON.stringify({ row, cause }))` once for each name in `harness.failures` not yet logged.
- **Off-limits (must not change).** The existing `Header statechart` entry, any row or its name, the compare's `GATED` list, any test title, every file under `src/`.

## Acceptance criteria

1. Format and lint on both owned files exit 0; `tsc --noEmit --project tsconfig.json` through the queue exits 0.
2. A scratch run (not landed; revert it before the final diff) with one planted failing row in the modal table prints its `Statechart row failed` line before the harness summary in a queued filtered run of that table.
3. A queued full journey run passes 94 of 94 and leaves exactly one `Statechart duration` entry per statechart test in `journey/*.txt`; no entry name starts with a `GATED` name. The Orchestrator compares the run against U3's baseline pair (expected: exit 0, the entries excluded as timing) and runs the duration instrument over it (expected: the `face` header title keyed by variant).
4. `git status --porcelain` lists only the two owned files.

## Output

Final message: the diff; `git status --porcelain`; each gate's command, folder, exit, and bare result line; the planted-row log line and its position; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
