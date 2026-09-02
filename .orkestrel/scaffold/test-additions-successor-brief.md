# Unit U1b test-additions-successor — apply the ecosystem-reuse ruling to U1's additions

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. You are the sole writer in the `test`
checkout at `C:\Users\mikes\WebstormProjects\test`. Perform the assignment directly and spawn
nothing.

## Objective

Amend the additions unit U1 made so they carry the ecosystem-reuse ruling: rename `extractEscapes`
to `extractStyles`, count the root element in both of its populations, and put the reuse reasoning
for the statechart constants and the class census into the guide, with gates green.

## What changed since U1 (the successor record)

U1 was briefed before the `orkestrel` reconciler ran (a dispatch deviation recorded in the plan).
The reconciler's return is at
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\ecosystem-reuse-report.md` and the
Orchestrator's ruling on it at `ecosystem-reuse-ruling.md` beside it. Read both first. U1's own
report is at `tmp/units/test-additions-report.md` in this checkout; read it to know what U1 left.
This unit supersedes nothing else in U1.

## Context

**Evidence.** U1's diff in the working tree (`git diff`, `git status --porcelain`). The published
surface as U1 left it: `src/core/{types,constants,helpers}.ts`, `src/browser/{types,helpers}.ts`,
`guides/test.md` § Surface, § Limits, § Patterns, and the tests under `tests/src/`.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `tests.md`,
`documentation.md`, `writing.md`. Skill: none. Guide: `guides/test.md`.

**Host.** Windows 11, Git Bash. `node_modules` is installed.

**Measurements.** none beyond U1's report.

**Control identifiers.** none.

**Standing conditions.** U1's changes are uncommitted in this checkout; you continue on top of them.
Nothing else writes this checkout while you run.

## Unknowns

none.

## Scope

**Owned.** The same files U1 owned: `src/core/{types,constants,helpers,index}.ts`,
`src/browser/{types,helpers,index}.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/browser/helpers.test.ts`, `guides/test.md`, `README.md` where it lists the surface —
plus, granted to this successor because U1's report shows `test:guides` cannot go green without
them: `tests/setup.ts` (the `ROUTED_FENCES` registration) and `tests/guides.test.ts` (the fence
transcription and the four `src/core` inventory listings). Apply U1's patches A and B from its
report as the starting point, re-derived against the tree as it stands.

**Shared (report-only).** none.

**Off-limits.** `package.json` version, `configs/**`, `vite.config.ts`, every other file.

**What asserts the state this change ends.** `tests/guides.test.ts`, `tests/policy.test.ts`, the
browser and core helper suites. Run them.

**Tools and limits.** Read, Grep, Glob, Edit, Bash for scoped `npm run` gates and `git diff`. No
commits, no installs, no `git checkout`/`restore`/`stash`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Rulings on U1's deviations, carried here

- The runner names `executeScenario` and `executeScenarios` are accepted; `run` is the banned
  synonym under `.claude/rules/names.md` § Fixed lifecycle vocabulary. Keep them.
- The `README.md` corrections to the `readInventory` examples are accepted: they replace measured
  false readings, which `.claude/rules/documentation.md` § Parity requires.
- U1's patches A and B close the two `test:guides` failures and are yours to land, with the
  heading rename below applied to them.

## The amendments

0. Land U1's patches A and B: register the browser fence in `ROUTED_FENCES`, transcribe the
   `Drive a statechart table` fence in `tests/guides.test.ts` with the disclosure fixture and the
   failing-row assertion, and correct the four `src/core` inventory listings. Then run
   `npm run test:guides` and read it green.
1. Rename `extractEscapes` to `extractStyles` everywhere: declaration, TSDoc, tests, guide tables,
   guide patterns, the § Limits row, and the Patterns heading `Read the classes and escapes the
   markup carries`, which becomes `Read the classes and styles the markup carries` in the guide, in
   the routed-fence key, and in the browser test's marker comment. The TSDoc's first sentence names what it returns: the
   markup of every element carrying a non-empty `style` attribute and of every `<style>` element,
   in document order, `root` included in both populations when it is an `Element`.
2. Make the implementation count `root` in both populations, and add the test case: a `<style>`
   root and a styled root are each reported; a `<div>` root carrying neither is not.
3. In `guides/test.md` § Limits, give the statechart candidate row the reuse reasoning: no published
   package declares a generic transition record or a closure-walking runner; `@orkestrel/workflow`
   dispatches behaviour by name and sequences structurally, so it neither takes a scenario's
   closures nor runs its three phases in order, and adopting it would move this package off layer
   0; `STATECHART_STATUSES` names a harness's reported run state, not a task's derived status, so it
   does not restate `TaskStatus`; `STATECHART_ATTRIBUTES` is the fleet contract the journey skill's
   statechart reference fixes for every harness and gate.
4. In `guides/test.md`, state beside `readClasses` that `readCascade` reads what the stylesheets
   define and `readClasses` reads what the markup carries, and that their set difference is the
   authored-class census; add that sentence to the pattern fence U1 wrote or write one.

## Output

Return, as your final message, the report you also write to
`tmp/units/test-additions-successor-report.md`: each amendment with the file and line it landed
in, the bare output of every gate you ran, and every claim you could not close.

## Deviation contract

Stop and report when the rename would break a name U1's report shows a sibling repository already
adopted, or when a gate fails outside your owned files. Decide, record, and carry on for wording.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` green.
2. `npm run check` green.
3. `npm run test:src:core`, `npm run test:src:browser`, `npm run test:guides`, `npm run test:policy`
   green; `grep -rn extractEscapes src tests guides README.md` returns nothing.
4. The § Limits statechart row carries the reasoning in item 3, and the `readClasses` sentence in
   item 4 is present.

## Review evidence

Code change: return `git diff --stat` and `git status --porcelain` in the report.
