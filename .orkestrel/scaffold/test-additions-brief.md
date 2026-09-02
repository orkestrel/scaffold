# Unit U1 test-additions — publish the statechart contract and two markup readers in `@orkestrel/test`

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. You are the sole writer in the `test`
checkout at `C:\Users\mikes\WebstormProjects\test`. Perform the assignment directly and spawn
nothing.

## Objective

Add to `@orkestrel/test` the statechart contract the fleet repeats, the harness attribute names a
gate polls, and two browser readers the Bootstrap inspection instruments need, each typed first,
tested with a negative control, documented with parity, and gated green in this repository.

## Context

**Evidence.**

- `src/core/index.ts`, `src/browser/index.ts`: star-export barrels over `types`, `constants`,
  `validators`/`helpers`, `factories`. Read both before adding a file.
- `src/browser/helpers.ts:1409` `readCascade(): ReadonlySet<string>` returns every class token the
  loaded stylesheets define; `:1570` `extractOrphans(root, child, parent): readonly string[]`
  returns the markup of every offending element. Match these conventions.
- The statechart contract exists twice today, field-identical:
  `C:\Users\mikes\WebstormProjects\elements\tests\setup.ts:473–486` and
  `C:\Users\mikes\WebstormProjects\veneer\tests\setup.ts` —
  `StateTransition<TState extends string, TEvent extends string> { name, from, event, to }` and
  `StateScenario<TState, TEvent, TContext> { transition, arrange, act, assert }`. The runners
  differ: `elements/tests/setupBrowser.ts:498` `runScenarios(scenarios, build)` walks each
  scenario's closures against a context `build(scenario)` returns; `veneer/tests/setupBrowser.ts:98`
  `runScenarios(label, create, scenarios)` registers `describe`/`it.each` itself. Read both. A
  package helper registers no test, so the published runner is the walking form.
- The harness attributes a gate polls come from
  `C:\Users\mikes\WebstormProjects\elements\app\browser\playgrounds\StatechartHarness.vue:293–298`
  and `elements/tests/app/browser/playgrounds.test.ts:59–120`: `data-statechart-status`
  (`idle | running | passed | failed`, and `pending` before any run), `data-statechart-passed`,
  `data-statechart-failed`, `data-statechart-total`, `data-statechart-scenario`,
  `data-statechart-result`, `data-statechart-state`.
- `guides/test.md` § Surface documents every export in tables by environment and kind, § Limits
  carries a candidate table whose "statechart" row does not yet exist, and § Patterns carries one
  worked fence per family. `tests/guides.test.ts` enforces that every export is documented and
  every documented name exists.
- `.claude/rules/tests.md` § Shared test infrastructure names this package as the owner of what
  the fleet repeats.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`,
`tests.md`, `documentation.md`, `writing.md`. Skill: none. Guide: `guides/test.md` is the spec you
extend.

**Host.** Windows 11, Git Bash. `npm ci` has been run in this checkout by the Orchestrator; confirm
`node_modules` exists before your first gate. Browser tests run in Playwright Chromium through the
`src:browser` project. No network is needed.

**Measurements.** `@orkestrel/test` is 0.0.11. Do not bump the version; the release wave bumps.

**Control identifiers.** none. Name each test for what it proves.

**Standing conditions.** The tree is clean at `95fcf3a`. Nothing else writes this checkout while
you run.

## Unknowns

- Whether `runScenarios` belongs in `src/core` or `src/browser`. Ruling: `src/core`. It walks
  async closures and touches no host API, and a server statechart is a legitimate consumer. Report
  back if the implementation forces a host import.

## Scope

**Owned.** `src/core/types.ts`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/index.ts`
(only if a new file is added), `src/browser/types.ts`, `src/browser/helpers.ts`,
`tests/src/core/helpers.test.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`,
`README.md` (only where it lists the surface).

**Shared (report-only).** none.

**Off-limits.** `package.json` version, `configs/**`, `vite.config.ts`, every other file.

**What asserts the state this change ends.** `tests/guides.test.ts` (parity over the barrels and
the guide), `tests/policy.test.ts` (placement and kind purity), `tests/setup.test.ts` if the setup
modules re-export anything you add. Run them.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for scoped `npm run` gates and `git diff`.
No commits, no installs, no `git checkout`/`restore`/`stash`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## The contract to add

Types first, in `src/core/types.ts`:

```ts
export interface StateTransition<TState extends string, TEvent extends string> {
	readonly name: string
	readonly from: TState
	readonly event: TEvent
	readonly to: TState
}

export interface StateScenario<TState extends string, TEvent extends string, TContext> {
	readonly transition: StateTransition<TState, TEvent>
	arrange(context: TContext, state: TState): Promise<void> | void
	act(context: TContext, event: TEvent): Promise<void> | void
	assert(context: TContext, state: TState): Promise<void> | void
}
```

Constants, in `src/core/constants.ts`, frozen: `STATECHART_ATTRIBUTES` mapping `status`, `passed`,
`failed`, `total`, `scenario`, `result`, `state` to their `data-statechart-*` attribute names, and
`STATECHART_STATUSES` as the frozen tuple `pending`, `idle`, `running`, `passed`, `failed`.

Helpers, in `src/core/helpers.ts`:

- `runScenario(scenario, context)`: `arrange(context, transition.from)`, then
  `act(context, transition.event)`, then `assert(context, transition.to)`, awaiting each. A throw
  from any phase propagates with the transition's `name` prepended to the message so a failing row
  is named.
- `runScenarios(scenarios, build)`: for each scenario in order, `runScenario(scenario, build(scenario))`.
  `build` may return a promise. Run serially; a statechart's rows share a page.

Readers, in `src/browser/helpers.ts`:

- `readClasses(root: ParentNode): ReadonlySet<string>` — every class token carried by `root`
  itself when it is an `Element` and by every descendant element, in document order of first
  sighting. An SVG `className` is an `SVGAnimatedString`; read `classList` so both element kinds
  count.
- `extractEscapes(root: ParentNode): readonly string[]` — the `outerHTML` of every element under
  `root` (root included when it is an `Element`) that carries a non-empty `style` attribute, and of
  every `<style>` element, in document order. Nothing else is an escape: a class, a `data-*`
  attribute, and an inline SVG `style` on a `<path>` all count only under that same rule.

## Output

Return, as your final message, the report `tmp/units/test-additions-report.md` you also write in
this checkout's `tmp/` directory (create it; it is git-ignored): the exact exports added by file,
each test's name and the control it carries, the guide sections added, the bare output of each
gate you ran, and every claim you could not close.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a
published export would have to be renamed, when a gate fails for a reason outside your owned
files, or when the `src:browser` project cannot launch Chromium. Decide, record, and carry on for
the exact wording of a guide sentence, the order of table rows, and the name of a test.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` green.
2. `npm run check` green.
3. `npm run test:src:core`, `npm run test:src:browser`, `npm run test:guides`, `npm run test:policy`
   green, and each new export has a test whose control is drawn from outside its population: a
   scenario table whose `to` state is wrong fails at `assert` with the row's name in the message;
   `readClasses` of a tree carrying no class returns an empty set and a class absent from the
   cascade appears in the difference against `readCascade()`; `extractEscapes` of a tree with no
   `style` attribute and no `<style>` element returns an empty list.
4. `guides/test.md` documents every new export in the matching Surface table, adds one Patterns
   fence per family, and updates the § Limits candidate table so the statechart row reads `Ships`.

**Observations, not criteria.** `npm run build` and `npm test` as a whole: report their reading;
the Orchestrator takes the authoritative run.

## Review evidence

Code change: return `git diff --stat` and `git status --porcelain` in the report, and keep the
full diff in the tree for the audit lane.
