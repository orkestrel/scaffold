# Unit veneer-boot-2 — finish veneer-boot: the review's findings and the acceptance ladder

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. You are the sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-boot`, on the branch `veneer-boot`. Commit once on that branch at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Finish the unit `tmp/codex/veneer-boot-brief.md` describes; that brief governs, except where this one states otherwise. Read it, then the first run's report `tmp/codex/veneer-boot-report.md`, then the review below. The first run's implementation is uncommitted in the worktree; keep it and repair it.

## Already changed by the Orchestrator after the first run

- `tests/setup.ts`: `createDepartureFamilies` gains the `integration` family, so the `touch-ownership` rows belong to one family (`npm run test:setup`: 149 passed).
- `tests/setupBrowser.ts`: a triple-slash reference to `@vitest/browser-playwright`'s types at the top, so the scoped `check:app` compiles the harness's `cdp().send` calls (`npm run check:app`: exit 0; root `tsc`: exit 0; lint: exit 0). An `import type {}` form fails the `no-empty-named-blocks` lint rule and the `/context` entry lacks the augmentation; keep the reference.

## The review's findings to repair

An independent reviewer ruled `FAIL 3 4 6 8`. Repair each:

1. **Claim 3, the opt-in proof's control.** `tests/src/browser/Veneer.test.ts` near line 1088: with `boot` false, the case routes the collection plus the two tip plugins with `boot: false`, which masks a collection that boots tips. With `boot` false it must route `createBootstrapPlugins()` alone. Show the mutation that reddens it: `createBootstrapPlugins()` returning the tip plugins with `boot: true`.
2. **Claim 4, the scope still called `engine` in examples.** Rename to `veneer` in `src/browser/Veneer.ts` (the class TSDoc example), `src/browser/factories.ts` (the `createVeneer` example), `src/browser/types.ts` (the `VeneerInterface` example's parameter), and `guides/veneer.md` (the example near line 672, and the link text "engine proofs" near line 582, which becomes "boot and registry proofs").
3. **Claim 6, the `touch-ownership` rows' consumption.** In `tests/src/browser/integration.test.ts`, build `new DepartureLedger(readDepartures(guide, 'Engine departures'), 'integration')`, pass `ledger.rows` filtered by scenario to the touch comparison, and add a `consumes every selected departure` case asserting the ledger's `unused` and `unproven` are empty, as the family proofs do.
4. **Claim 8, stale prose and the fence proof.**
   - `guides/veneer.md` near line 641: "Compose individual plugins or replace one entry in the Bootstrap collection."
   - `src/browser/plugins.ts` near line 375 (`createBootstrapPlugins`) and its guide Summary cell near line 161: "Creates Bootstrap's plugins in bundle order."
   - `src/browser/types.ts` near line 461 (`VeneerInterface`) and its guide Summary cell: the scope serves its listed plugins' data API, not Bootstrap's unconditionally.
   - `guides/veneer.md` near line 954: replace "The boot scope is a blank slate" (a metaphor the writing rules forbid) with "A scope routes and boots only the plugins its list names; tip boot is an opt-in."
   - `tests/guides.test.ts`: remove the spawned browser Vitest child from the Node `guides` project. Pin the `### Boot a Bootstrap page` fence body against the transcription's source text read from `files['tests/src/browser/factories.test.ts']`, the way the Tailwind fence pins `RECIPE_INPUT`, so that changing the transcription to `createVeneer(document)` reddens `npm run test:guides`.
5. **Low findings.**
   - `tests/src/browser/Tip.test.ts` near line 1589: write `row.scenario === label`, and make the scan in `tests/src/browser/integration.test.ts` near lines 239 to 242 accept a ledger-label filter instead of requiring the `startsWith` conjunct.
   - `tests/setupBrowser.ts`: remove the `exception` field of `BOOTSTRAP_PLUGIN_SITES`, `undefined` everywhere and read nowhere.
   - TSDoc forms per `typescript.md`: `src/browser/plugins.ts` near lines 275 and 358 state their defaults as `Default: …`; `src/browser/types.ts` near line 2163 reads "If `true`, …; if `false`, …"; `readTouchListeners` in `tests/setupBrowser.ts` states what it throws and when.
   - `tests/src/browser/helpers.test.ts` near lines 61 to 82: no `describe` between import groups; merge the repeated `@src/browser` imports in `tests/src/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, and `tests/app/browser/main.test.ts`.
   - `tests/distribution.test.ts` near lines 1019 to 1058: the source-consumer case asserts something positive about the `createVeneer` bundle, and its variable names what it holds.
   - `tests/src/browser/Tip.test.ts` near line 1944: the delegation proof uses `createBootstrapPlugins()` as the guide states, not the removed `.filter(...)` recipe.

## Discovery

The scaffold discovery script `node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-harden/scripts/discovery.js` fails on Vite's `[vite] (client) [optimizer]` log line before its JSON (a scaffold defect, recorded for the next scaffold release). Do not run it. Take the census by hand instead: `npx vitest list --config vite.config.ts --project <project> --json=tmp/codex/list-<project>.json` for `src:browser`, `setup`, `setup:browser`, `app:browser`, and `distribution`, and confirm `tests/src/browser/Veneer.test.ts` is collected and `Engine.test.ts` is not. Do not collect `distribution` without the temporary-directory override the explicit distribution runs use.

## Acceptance

After the last edit, in order, each exit code read bare: `npm run format:check`; `npm run lint:check`; `npm run check`; `npm test` (it runs `src:core`, `src:browser`, `setup`, `setup:browser`, `app:browser`, `app:core`, the journeys, `guides`, `policy`, and the rest of the chain); `npm run build`; `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution`; the old-name sweep of the first brief; `git diff --check`. Then one commit on `veneer-boot` and an empty `git status --porcelain`.

## Output

Write the report to `tmp/codex/veneer-boot-2-report.md` and return it as your final message: each finding with its repair and its red-before and green-after command, the census, the acceptance table with exit codes and counts, the commit hash, and any deviation. No process diary.

## Deviation contract

On any conflict with this brief, the law, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.
