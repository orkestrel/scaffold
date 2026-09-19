# Unit T2 — the statechart harness, its observable statuses, and the worked table

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/test` checkout, dispatched after unit T1's
tree was checkpointed. You open this brief yourself; every later section is written for you.

Routing note: the proofs run in Playwright Chromium, which the Codex bench cannot launch; the audit
round's objective lane runs on the bench.

## Objective

Publish `createHarness` in `@orkestrel/test/browser`, make the statechart statuses observable as
the design defines them, and land the executed worked table the guide and the skill transcribe.

## Context

**Evidence.** Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/design-verdict.md` first;
rulings D3, D4, and D5 are yours. Then read T1's report at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/t1-report.md` and the tree it left: T1 landed
the wait family, `readRefusal`, `createStorage`, `readCensus`, the control builders, and the
browser entry's core imports, and rewrote Contract rules 9 and 13. Build on that tree; change
nothing T1 landed except where a harness proof needs a shared fixture.

Measured directly by the Orchestrator before T1:

- `src/core/types.ts:224-271` declares `StateTransition` and `StateScenario`;
  `src/core/helpers.ts:549-620` implements `executeScenario` (phases awaited in order, the row's
  `name` prepended to whatever the row threw, the original as `cause`) and `executeScenarios`
  (serial rows, one context per row through `build`, stops at the first failing row, a refusing
  builder named `<name>: build refused`).
- `src/core/constants.ts:1-70` declares `STATECHART_ATTRIBUTES` (`status`, `passed`, `failed`,
  `total` on the root; `scenario`, `result` per row; `state` on the state element) and
  `STATECHART_STATUSES` (`pending`, `idle`, `running`, `passed`, `failed`); the doc block defines
  `pending` as "before a run has produced a result for every row", which the design found
  unobservable because a run in flight satisfies it too.
- `tests/src/core/helpers.test.ts:941-1095` proves the runner; nothing in the package mounts a
  harness; `tests/guides.test.ts` asserts the two constants' values.
- The guide's § Patterns → Drive a statechart table (`guides/test.md:1872-1970`) carries a
  `Disclosure` fence whose entity is fictional and a harness paragraph that names the attributes and
  no mechanism. Rule 13 (after T1) admits browser modules importing core through `@src/core`, so
  the harness calls `executeScenario` directly.
- No fleet workspace renders a harness, and no fleet browser entity publishes a state and event
  vocabulary; the design's reopening condition for anything beyond this unit is such an entity.
- `tests/src/browser/helpers.test.ts` builds fixtures with `buildFixture('<details>…')` and drives a
  native disclosure with `clickDisclosure`; `readStates` reads a `details` element's expansion from
  its `open`.

**Law.** `AGENTS.md`; `.claude/rules/names.md` (lifecycle vocabulary: the harness's primary
operation is `execute`, never `run`), `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
`.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/browser.md`,
`.claude/rules/documentation.md`, `.claude/rules/quality.md` § Instruments,
`.claude/rules/writing.md`. Skill: none. Guide: `guides/test.md`.

**Installed primitives.** `@orkestrel/test` itself — reuse `executeScenario`, `STATECHART_ATTRIBUTES`,
`STATECHART_STATUSES`, `build`, `mount`, `waitForDelay`, `readStates`, `clickDisclosure`; and
`@orkestrel/contract` 0.0.17. A helper whose job an installed export does is a defect.

**Host.** Windows 11; Bash for commands; working path `C:/Users/mikes/WebstormProjects/test`;
Playwright Chromium installed; multi-line programs go to a file under `tmp/probe/`.

**Measurements.** Take these first and record them: `git status --short` (expected clean at the
checkpoint commit the Orchestrator names in the dispatch message), and the totals of
`npm run test:src:browser` and `npm run test:src:core` at that baseline.

**Control identifiers.** `T2-C1` through `T2-C6` below. Name each test for what it proves.

**Standing conditions.** None known to fail. Do not run `npm run test:distribution`.

## Unknowns

- **How the `pending` → `idle` transition is observed from outside.** Construction mounts every row
  before returning, so the transient `pending` value is written and replaced inside one call. Prove
  the sequence by an observable means and record it — a `MutationObserver` armed on `document.body`
  with `subtree` and the status attribute filtered before construction, read back through
  `takeRecords()`, is one; say which you used and what it recorded.
- **The entity the worked table drives.** It must be real markup in the browser suite, have a
  state union and an event union of its own, and carry an event that leaves the state unchanged
  (the reference requires such a row). A native `<details>` has `toggle` alone, which always
  flips; a two-control disclosure (an opening control and a closing control over one region, the
  opening control a no-op when open) has `summon` and `dismiss` and the unchanged row. Choose,
  build it with `build`, drive it with the journey verbs, and record the choice.

## Scope

**Owned.** `src/core/types.ts` (`StatechartStatus`), `src/core/constants.ts` (the two statechart
doc blocks), `src/browser/types.ts` (`HarnessOptions`, `HarnessInterface`), `src/browser/factories.ts`
(`createHarness`), `src/browser/helpers.ts` (only if a harness helper must be extracted and
exported), `tests/src/browser/factories.test.ts`, `tests/src/core/helpers.test.ts` (a case pinning
the tuple against the union), `tests/setupBrowser.ts` (a shared fixture), `tests/guides.test.ts`,
`guides/test.md`, `README.md`.

**Shared (report-only).** None.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`, `package.json`, `package-lock.json`, `vite.config.ts`, `configs/**`,
`tsconfig.json`, `.claude/**`, `.agents/**`, `src/server/**`, and every T1 export's implementation
and proof except where a shared fixture is genuinely needed by both.

**What asserts the state this change ends.** `tests/guides.test.ts` (Surface bijection, `INTERNAL`,
the transcribed statechart fences), `guides/test.md` § Contract rule 13's harness paragraph, and
the browser barrel order the policy `surface` rule reads.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. `npm run lint` then `npm run format` before
the checks; no other tree-wide mutation.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The contracts

```ts
// src/core/types.ts
/** Names the run state a statechart harness publishes through its status attribute. */
export type StatechartStatus = 'pending' | 'idle' | 'running' | 'passed' | 'failed'
```

Keep `STATECHART_STATUSES` as the frozen tuple; a core test pins the tuple's members against the
union in both directions so the two can disagree (`T2-C6`).

```ts
// src/browser/types.ts
/** Configures the harness that renders one transition table and drives it row by row. */
export interface HarnessOptions<TState extends string, TEvent extends string, TContext> {
	readonly scenarios: readonly StateScenario<TState, TEvent, TContext>[]
	readonly build: (scenario: StateScenario<TState, TEvent, TContext>) => TContext | Promise<TContext>
	readonly state: (context: TContext) => TState
	readonly pause?: number
}

/** Holds a mounted statechart harness, the tally it publishes, and the run it drives. */
export interface HarnessInterface {
	readonly root: HTMLElement
	readonly status: StatechartStatus
	readonly total: number
	readonly passed: number
	readonly failed: number
	readonly failures: readonly string[]
	execute(): Promise<void>
	destroy(): void
}
```

```ts
// src/browser/factories.ts
export function createHarness<TState extends string, TEvent extends string, TContext>(
	options: HarnessOptions<TState, TEvent, TContext>,
): HarnessInterface
```

Semantics (D3, D4):

- Refuses an empty `scenarios` with `Statechart harness mounted no transition`.
- Mounts a framework-free root into `document.body` carrying, from `STATECHART_ATTRIBUTES` and never
  from a literal, `status`, `passed`, `failed`, and `total` on the root; one row element per
  scenario carrying `scenario` (the transition's `name`) and `result`; one element carrying `state`
  that renders the entity's current state as `options.state(context)` reports it; a `role="status"`
  announcer narrating each step in a sentence. Rows are rendered in table order with a legible
  label naming `from`, `event`, and `to`.
- Writes `pending` first, mounts every row, then writes `idle` with `passed` and `failed` at zero
  and `total` at the row count. `idle` is what a mounted, unrun harness reads; `pending` is what a
  harness reads before its inventory is complete, and a gate that finds it has found a harness whose
  rows never mounted.
- `execute()` writes `running`, then drives each row in order through `executeScenario` against a
  context from `build`, awaiting `pause` milliseconds between rows through `waitForDelay` when
  `pause` is set, writes each row's `result` (`passed` or `failed`) and updates the `state`
  element after each row, continues past a failing row, records the failing row's name in
  `failures`, and ends by writing `passed` when no row failed or `failed` otherwise. A second
  `execute()` re-runs from a fresh tally. A builder that throws counts as that row failing, named
  the way `executeScenarios` names it.
- `status`, `total`, `passed`, `failed`, and `failures` read from the root's attributes (so the
  object and the markup cannot disagree); `failures` hands out a snapshot.
- `destroy()` removes the root; repeated calls do nothing.

## The guide

- § Surface: rows for `StatechartStatus`, `HarnessOptions`, `HarnessInterface`, `createHarness`;
  § Methods: a table for `HarnessInterface`; § Voices: the empty-table refusal; § Contract: the
  harness paragraph in rule 13's successor (or its own rule) stating that the harness is test-side
  because a page cannot import a development dependency that imports `vitest/browser`; § Limits:
  rows for the harness (ships), a separate gate reader (refused — the object carries the tally),
  and a generated or published harness page (refused — product). Rewrite the `STATECHART_STATUSES`
  doc block and the guide's statement of each status per D4.
- § Patterns → Drive a statechart table: replace the fictional `Disclosure` fence with the executed
  worked table (the entity you chose, its two unions, a row for each event in each state including
  the unchanged one, and the door each row used in its `name`), and add the harness fence showing
  `createHarness`, `execute`, and the tally read back. Transcribe every claimed value into
  `tests/guides.test.ts` where the package's own runtime can run it; the browser fence's values are
  pinned in `tests/src/browser/factories.test.ts` and the fence says so.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/t2-report.md` and return its path as your
final message: the exports landed with file and line; the entity chosen and why; the observation
method for `pending` → `idle` and what it recorded; each control with the command, the failing
count before, and the passing count after; every gate command with exit code and totals; what you
could not close; the claims you flag as least certain. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most —
where a contract above cannot be implemented as declared or a scoped gate cannot go green without
an off-limits file. Decide, record, and carry on on: the harness markup, the announcer's sentences,
the row label's wording, the entity and its fixture, TSDoc wording, and row order in a guide table.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run format:check` and `npm run lint:check` exit 0.
3. `npm run test:src:core` exits 0 and includes `T2-C6`: the tuple's members equal the union's
   members in both directions.
4. `npm run test:src:browser` exits 0 and includes:
   - `T2-C1` an empty table is refused with the stated voice and mounts nothing.
   - `T2-C2` after `execute()` on an all-passing table, the root's attributes read `passed`,
     `passed` equal to `total`, `failed` zero, every row's `result` `passed`, and the object's
     getters agree with the attributes.
   - `T2-C3` a table with one failing row and rows after it: status `failed`, `failed` one,
     `failures` naming that row, the rows after it carrying `passed`, and the failing row's
     `result` `failed`.
   - `T2-C4` the sequence `pending` → `idle` observed at construction and recorded; `running`
     observed during an `execute()` whose row awaits a deferred the test controls.
   - `T2-C5` a second `execute()` re-runs from a fresh tally; `destroy()` removes the root and a
     repeated `destroy()` does nothing.
5. `npm run test:guides` exits 0.
6. `npm run test:policy` exits 0.
7. `npm run build` exits 0 and `dist/src/browser/index.js` carries no literal
   `data-statechart-status` string (the map is imported from core, not inlined).

**Observations, not criteria.** The whole `npm test` chain.

## Review evidence

The audit lane receives `git diff` and `git status --short` of this checkout taken after you
return, plus your report and T1's.
