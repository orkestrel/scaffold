# Unit SD5 — scaffold: seed byte-pin + release-skew limit sentence

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. Read `/home/user/scaffold/AGENTS.md` and `.claude/rules/tests.md` before editing.

## Objective

In `/home/user/scaffold` (baseline: the head commit when you start — read
`git log --oneline -1`), land ruling 5 from
`/home/user/scaffold/.orkestrel/campaign/d2d-reconciliation.md` (read it first). The ruling
REFUSED a seed-history table (an empty mechanism with no consumer fails silently in the defect's
own direction); the row closes as documented, and the future table shape is already recorded in
the reconciliation — you do not build it.

1. **The byte-exact pins.** In the templates suite (`tests/src/core/templates.test.ts`), pin the
   planned setup seeds byte-exact: `ARTIFACT_TEMPLATES.tests.setup` and
   `ARTIFACT_TEMPLATES.tests.global` (read `src/core/templates.ts` for the exact member paths —
   re-derive them if the names moved). The pin asserts the exact current bytes, taken from a run
   that prints them, never from derivation.
2. **The mutation control.** Beside the pins, the control that must fail: following the file's
   existing control idiom, drive the assertion against a one-byte-mutated copy and assert the
   comparison reports the difference. The control proves the pin can fail; record it failing
   against the real seed once (plant, watch red, remove) before relying on it.
3. **The limit sentence.** In `guides/scaffold.md`, the release-skew paragraph gains: "audit
   compares each setup module only with the seed the installed release plans; it does not retain
   earlier seed bytes" — locate the paragraph by its subject, keep the guide's voice, and adapt
   the sentence to the surrounding prose without weakening the limit.
4. **The digest half.** `guides/scaffold.md` is `dist/host` surface: run
   `npm run build:inventory` last and leave the regenerated `host.json` in the tree.

## Environment

Native run in `/home/user/scaffold`; `node_modules` installed; Vitest runs for you. The tree
must be clean at your start — verify with `git status --porcelain` and stop if a file you do not
own is dirty. Run scoped suites only (`npx vitest run --project src:core
tests/src/core/templates.test.ts`); the whole-suite reading is the Orchestrator's.

## Scope

- Owned: `tests/src/core/templates.test.ts`, `guides/scaffold.md` (the one paragraph),
  `host.json` (through `npm run build:inventory` only).
- Off-limits: `src/**`, `tests/config.test.ts`, everything else. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on the test file.
2. `npm run check:src:core` green.
3. The pins green against the real seeds; the mutation control recorded red once then landed as
   the failing-comparison assertion; the scoped templates suite green.
4. `npm run build:inventory` run last; `host.json` regenerated; `npm run test:config` green.

## Deviation contract

Stop and report on: a conflict with the primary objective, seed members absent under the named
paths, or a dirty tree at start. Ancillary wording and placement are yours.

## Output

Final message = report: the pinned member paths, the control's red record, the guide sentence in
place, gate tails, `git diff --stat`, `git status --porcelain`, deviations or none.
