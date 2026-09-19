# Unit S6 — the emitted journey factory is formatter-clean, and the corpus proves it

## Role and engine

`builder` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`,
and `Bash`, the sole writer in the `C:/Users/mikes/WebstormProjects/scaffold` checkout. You open
this brief yourself; every later section is written for you.

## Objective

Make the emitted `appJourney` factory pass the vendored formatter, and extend the emitted-content
formatter corpus so a blueprint carrying the journey axis and both setup runtimes is inside it.

## Context

**Evidence.** The roughnotes visit (`.orkestrel/campaign/findings-roughnotes-visit.md`, V1): after
`scaffold repair` regenerated a browser application's root `vite.config.ts`, `npm run format:check`
reddened on that file alone. The formatter's diff wraps one line:

```text
-export function appJourney(variant: JourneyVariant, variants: readonly JourneyVariant[]): UserConfig {
+export function appJourney(
+	variant: JourneyVariant,
+	variants: readonly JourneyVariant[],
+): UserConfig {
```

The line is emitted from `src/core/templates.ts:352` and is 101 characters against the vendored
`.oxfmtrc.json` width of 100. The fixed-point corpus at `tests/src/core/templates.test.ts:644`
("is an oxfmt fixed point across the emitted content corpus") formats every artifact of each corpus
blueprint and asserts the bytes do not move; no corpus blueprint sets `journey: true` or `setup`,
so the journey factory, the wrapper, the `setup` and `setup:browser` projects, and the
`configs/browsers.ts` doc block never entered it.

**Law.** `AGENTS.md`; `.claude/rules/tests.md`, `typescript.md`, `writing.md`. Skill: none. Guide:
none (no public surface moves).

**Host.** Windows 11; Bash; `node_modules/oxfmt/bin/oxfmt` is the formatter the corpus test runs
through `process.execPath`.

**Measurements.** Baseline `46dde446`, clean. `npm run test:src:core` reads `425 passed (425)`.

**Control identifiers.** `S6-C1`, `S6-C2`. Name a test for what it proves, never for the control
label.

**Standing conditions.** `.orkestrel/campaign/` is untracked and off-limits.

## Unknowns

None.

## The edits

1. In `tests/src/core/templates.test.ts`, add to the corpus `blueprints` array a blueprint carrying
   the journey axis and both setup runtimes beside the browser application, for example
   `createBlueprint('journeyed', { app: ['core', 'browser'], journey: true, setup: ['node', 'browser'] })`,
   and a second one with the axis on and `setup: []`. Run `npm run test:src:core -- --testNamePattern "oxfmt fixed point"`
   and record the red: the test must fail on the journey factory's signature line.
2. In `src/core/templates.ts`, wrap the emitted `appJourney` signature the way the formatter does
   (the four-line form quoted under Evidence), keeping every other byte of the template. Run the
   same command and record the green.
3. Run `npm run test:src:core` whole, `npm run test:src:bin`, and `npm run test:config`, and record
   each totals line; a snapshot or a text pin that carried the one-line signature moves with it,
   and you update it from the run.

## Scope

**Owned.** `src/core/templates.ts` (the signature lines alone), `tests/src/core/templates.test.ts`
(the corpus array alone), any fixture under `tests/src/core/fixtures/` or pin in
`tests/src/core/compilers.test.ts` that carries the one-line signature.

**Off-limits.** Everything else, including `host.json`, `package.json`, `guides/**`, `.orkestrel/**`.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`. Format only your owned files with
`./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <files>`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/s6-report.md`: the corpus red reading (command, failing count, the artifact and
line it named), the green reading after the wrap, the three suite totals lines, the diff, and
`git status --short`. No process diary. Return, as your final message, only "The report is written."
and the path.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle the corpus blueprint names.
Stop and report if the corpus red names any artifact other than the root `vite.config.ts`, or if a
file outside the owned list must change.

## Acceptance criteria

- **S6-C1.** The corpus case is red with the journey blueprint before the wrap (naming the root's
  signature line) and green after; both readings recorded.
- **S6-C2.** `npm run test:src:core`, `npm run test:src:bin`, `npm run test:config` exit 0; scoped
  format and lint over the owned files exit 0; `npm run check` exits 0.

## Review evidence

The actual diff and the actual `git status --short` output, in the report.
