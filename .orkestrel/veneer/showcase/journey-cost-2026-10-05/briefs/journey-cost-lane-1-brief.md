# Unit journey-cost-lane-1: veneer journey run-cost tuning, lane 1 (items 1b and 3)

Route: astra (implementation). You are the sole writer in your checkout `/home/user/.wave/journey-cost/1` (veneer commit 4d21de7 plus lane 0's accepted changes applied as uncommitted edits; own `node_modules`). No other process writes there. Read `git -C /home/user/.wave/journey-cost/1 diff --stat` first: the four changed files are lane 0's split cases, `collectSelectorMatches`, its proof, and the guide titles; they are your base, not your change.

## Objective

Implement verdict § 3 items 1b (one matched-rule index per preservation half, shared across the half's three full attributions) and 3 (signature membership through item 1a's predicate), each with its equality probe (P-B, P-D) run through the host queue and its price part prepared as a command for the Orchestrator's window. Every change keeps every assertion, control, reading, refusal, logged line, and row.

## Governing texts (read first)

- Verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/verdict.md` § 2 (the gate table), § 3 rows for items 1b and 3 (lines 43-44), § 4 refusals, § 7 P-B and P-D (lines 137-138), § 8 lane 1 (line 158).
- Plan: `.../plan-v3.md` items 1b (lines 123-155, every condition (a) to (f)) and 3 (156-166), and the probe rows P-B and P-D (489-490).
- Lane 0's report and candidate: `/home/user/veneer/tmp/units/journey-cost/lane-0/report.md` and `changes.patch` (the per-width halves, `collectSelectorMatches` at `tests/setupBrowser.ts` near 1856-1889 with its proof near `tests/setupBrowser.test.ts:1164`, and the recorder-backed cache proof). Item 1b's index comes from `collectSelectorMatches` over the representatives (plan condition (a)); item 3 uses its predicate.
- Queue usage: `/home/user/veneer/tmp/units/journey-cost/README.md`; the harness `run.ts`, `compare.ts`, `mutations.ts`; the final `mutation-targets.json` (read once at start; the four targets must stay byte-identical and unique: plan condition (d)).
- The host-bound set snapshot: `/home/user/veneer/tmp/units/journey-cost/host-bound.md`. The J-B0 folders: `runs/jb0-1`, `runs/jb0-2`.
- Rules: `/home/user/scaffold/.claude/rules/tests.md` (never mocks or spies for project-owned behavior), `typescript.md`, `architecture.md` (no nested functions), `names.md`, `quality.md` lines 51-53 (a micro optimization lands only on its own measured gain), `writing.md`, and `/home/user/.wave/journey-cost/1/AGENTS.md` (its non-negotiables bind you).

## Scope

- **Owned.** `collectComponentPreservation` and the `collectComponentSignatures` loop in `/home/user/.wave/journey-cost/1/tests/setupBrowser.ts`; `AttributionOptions` in `tests/setupStyles.ts` (the optional index field only); the three call sites of the preservation halves in `tests/app/browser/integration.test.ts` (the main attribution, the wrapping control, and the overflow control: plan condition (c); nothing else in that file); proofs beside the existing ones in `tests/setupBrowser.test.ts`; the probe patches and commands under the worktree's `tmp/units/journey-cost/probes/`; the report folder `/home/user/veneer/tmp/units/journey-cost/lane-1/`.
- **Shared (report-only).** `collectSelectorMatches` (lane 0's helper): consume it; report a needed change to it instead of making one.
- **Off-limits.** Everything else, including the sheet-rewrite controls' own scans (plan condition (c)), the partition code (lane 2), `package.json`, the lockfile, configs, and the main checkout `/home/user/veneer` outside your report and queue folders.
- **Made false by this change.** Nothing in titles or counts if the conditions hold; say so with evidence.

## Items

1. **1b.** The index comes from item 1a over the representatives, appending each matching entry to the representative's per-sheet list in scan order; it travels in its own field at the three calls and never in the shared `options` object; the function refuses an index built for other sheets (a unit proof pins the refusal); the sheet-rewrite controls keep their own scan; the four mutation targets stay byte-identical and unique. P-B: both index forms against the filter, per representative and sheet, at both widths, deep-equal, through the queue; then the price part prepared (not run). Conditions (e) and (f) of the plan wait on P-A and are not yours.
2. **3.** The signature loop uses item 1a's predicate, evaluates each rule's conditions one time, and holds the 608 component names in a `Set`; the groups, keys, order, and the logged `signatures` and `excluded` counts stay. P-D: count the elements without a component class; both signature forms, including a selector text shared by rules under different conditions, deep-equal, through the queue; then the price part prepared. Item 3 lands only on a measured gain in the preservation bundle (the verdict's row); say so in the report.

For every changed function, map its callers (file:line) and show the mapping in the report.

## Host queue

Every command that launches Chromium or loads the CPU (check, lint, format, every Vitest suite) runs only as:

```text
flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/lane1-<name> --kind command --cwd /home/user/.wave/journey-cost/1 -- <command>
```

Scoped and selected runs, equality probes, and the mutation copy use `--kind command` with whatever Vitest arguments the probe needs (`--project 'journey:light-1280*'`, `-t PATTERN`, `--reporter=json --outputFile=<folder>/report.json`). `--kind journey` is the full-run evidence mode and stays the Orchestrator's. Fresh `<name>` per run (a reused folder exits 65). `--configLoader runner` is admitted. If the lock cannot be taken within 30 minutes, report the holder and stop. Never run a full journey run or a price part.

## Iteration and deviations

A red run of a probe or proof you are writing is iteration: fix the instrument, re-run the scoped selection through the queue, and record the red run with its cause in the ledger. A budget timeout of an unchanged case while other lanes share the host is a load reading: re-run that gate once; a second timeout of the same case is the stop. Stop and report when: an item cannot keep an assertion, control, reading, or refusal; a case you did not change fails on an assertion; a mutation target moves or multiplies; the queue lock is unavailable for 30 minutes.

## Your acceptance before handing back (all through the queue except the last)

1. Scoped Vitest runs of the proofs and the four halves (one selected pass each in light-1280); P-B and P-D equality probes.
2. `npm run check`, `npm run lint:check`, `npm run format:check`, `npm run test:setup:browser`, `npm run test:guides`.
3. `git diff --check` (direct). Write `changes.patch` (your diff over lane 0's base: `git diff` of the worktree minus lane 0's patch, or state that the report folder holds the full worktree diff and name lane 0's patch as its base).

## Prepare, do not run (Orchestrator's gate)

Exact commands for: `test:setup:browser`; the mutation copy through `mutations.ts` with `/home/user/veneer/tmp/units/journey-cost/mutation-targets.json`; item 1b's index control red then green (a planted wrong index must fail the refusal proof); one full journey run (`--kind journey`, `CAPTURE=0`) compared with `compare.ts` against both baselines (`--baseline runs/jb0-1 --baseline runs/jb0-2 --host-bound host-bound.md --registration 92/0`); the W8 price runs for items 1b and 3 (the preservation halves in light-1280, twice without and twice with, from the plan's P2 form).

## Sandbox

You run under `danger-full-access`. Your only writable roots: `/home/user/.wave/journey-cost/1` (the owned files, the worktree's `tmp/` and `node_modules/.vite`), `/home/user/veneer/tmp/units/journey-cost/lane-1/`, and `/home/user/veneer/tmp/units/journey-cost/runs/` (folders named `lane1-<name>`). Never write anywhere else.

## Forbidden

Installs, commits, pushes, credentials, destructive commands (`rm -rf`, `git reset`, `git checkout --`, `git clean`, `git stash`), edits to shared or off-limits files, tree-wide mutating gates (`npm run format`, `lint --fix`, any fixer), mocks or spies for project-owned behavior, a second writer, any CPU-loading command outside the queue, a full journey run, a price run.

## Return shape

Report file `/home/user/veneer/tmp/units/journey-cost/lane-1/report.md` with: every command and its exit with its run folder; the caller mapping per changed function; P-B and P-D results and whether each item lands or is withheld pending price; the prepared gate and price commands; deviations; `git status --porcelain` and `git diff --stat` at the end. Your final message is a short summary naming the report path.

## Appended ruling (2026-10-05, after the Opus review: fix; two blocking controls, five minor items, two referred)

The review holds the item 1b and item 3 code under every attack (the index filters on selectors only and `attributeDeparture` re-evaluates conditions live, so a media state change cannot stale it; `matchesConditions` depends on the element only through its document, so one evaluation per rule is exact; the shared matcher is unchanged and every new caller passes the shapes lane 0's proofs pin; the four mutation targets occur once; no assertion removed; no guide sentence made false). It rules the equality evidence not yet accepted, because both negative controls are vacuous, and names five minor items. Fix the following in the owned files and the probe folder; re-run the equality probes.

1. **Blocking: P-B's omitted-entry control cannot fail on a content difference** (`tmp/units/journey-cost/probes/integration.test.ts.equality.patch` near 34-35: `expect(() => expect(actual.slice(1)).toEqual(expected)).toThrow()` fails only on length; `toEqual` sees no own enumerable keys on a `CSSStyleRule`, so any two rules deep-equal, and the per-position identity loop never runs under the control). Ruling: add a same-length content control: at the first list holding two entries with different rules, swap them (or substitute another `CSSStyleRule` entry from the same sheet with equal context and layer), and require the full comparison (`toEqual` plus the per-position `toBe` on `rule`, for the native form and the query form) to throw. Keep the length control beside it. Re-run `lane1-equality-1280` and `lane1-equality-390` in fresh folders (`lane1-equality-2-1280`, `lane1-equality-2-390`) and the fixture run (`lane1-equality-2-fixture`); the report's P-B table cites the new runs.
2. **Blocking: P-D's omitted-group control cannot fail** (`probes/setupBrowser.ts.equality.patch` near 20-21: the JSON of `expected.slice(1)` against the JSON of `expected` differs whenever `expected` is non-empty). Ruling: add a content control that keeps the group count: move one element index between two groups, or change one group's key, and require the same projection to return unequal. Same re-runs as item 1.
3. **The readings control differs by length only** (`probes/readings.ts` near 35). Ruling: change one compared field (`signatures`) in one candidate line and require `equal: false`; re-run `lane1-readings` as `lane1-readings-2`.
4. **The `rules.size !== sheets.size` clause is unpinned** (`tests/setupBrowser.ts` near 2024; both existing refusal cases are caught by the `some(!rules.has)` clause). Ruling: keep the clause and add an extra-sheet case to the proof that expects `Component preservation index requires the same sheets`.
5. **TSDoc staleness and `@throws`** (`tests/setupBrowser.ts` near 1978). Ruling: add to the remarks: "Build the index after the last sheet or DOM change; an index with the same sheets is not checked for staleness." Extend `@throws` to the writing-mode refusal near 2046-2047.
6. **`requireValue(entry.rule.parentStyleSheet)` is a refusal the base did not have** (`tests/setupBrowser.ts` near 1934: a detached rule whose selector names a component now throws). Ruling: keep the refusal, document it under `@throws` in the `collectComponentSignatures` TSDoc, and add one proof case with a detached rule (a rule removed from its sheet through `deleteRule` after scanning) that expects the refusal.
7. **The added proof's override calls cannot fail independently** (`tests/setupBrowser.test.ts` near 1259-1279: the fixture's only departure is `opacity`, neither overflow nor inherited). Ruling: add a fixture departure on an overflow longhand and one on an inherited longhand, so the `coupled: false` and `inherited: new Set()` calls read a difference the default call does not.
8. **Referred items, ruled.** (a) `AttributionOptions.index` stays on the shared type as the brief placed it; add one TSDoc sentence on the field naming its one reader (`collectComponentPreservation`) and that `attributeDeparture` ignores it. (b) The index construction duplicated at `tests/app/browser/integration.test.ts` near 1220-1240 and `tests/setupBrowser.test.ts` near 1232-1252 becomes one exported function in `tests/setupBrowser.ts` (name per `names.md`; TSDoc), consumed by the journey and by the proof, so the proof tests the builder the journey uses.

Acceptance for this pass, through the queue with distinct folders under `runs/lane1-second-*`: the scoped preservation and signature proofs, `npm run check`, `lint:check`, `format:check`, `test:setup:browser` in full (state the count: 161 plus the added cases), `test:guides`, the four scoped halves, `git diff --check`, and the re-runs named in items 1 to 3. Regenerate `changes.patch` against lane 0's base, re-verify the mutation targets' uniqueness, and write the report over `report.md`, keeping the current one as `report-1.md`.
