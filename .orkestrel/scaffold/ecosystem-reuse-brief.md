# Unit U1r ecosystem-reuse — rule each `@orkestrel/test` addition against the published line

## Role and engine

`orkestrel` on Opus 5, native Claude Code subagent, read-only. Perform the reconciliation yourself
and spawn nothing.

## Objective

For each addition unit U1 is making to `@orkestrel/test`, rule whether a published `@orkestrel/*`
package already provides a primitive with matching semantics (reuse it), an overlapping primitive
the addition must compose over or translate from (compose), or nothing (new), and rule where the
addition belongs if a sibling package is its natural home.

## Context

**Evidence.**

- The additions, from `tmp/units/test-additions-brief.md` § The contract to add:
  `StateTransition<TState, TEvent>` and `StateScenario<TState, TEvent, TContext>` (core types);
  `STATECHART_ATTRIBUTES` and `STATECHART_STATUSES` (core constants); `runScenario` and
  `runScenarios` (core helpers walking arrange, act, assert per transition, serially); `readClasses(root)`
  returning every class token a rendered tree carries; `extractEscapes(root)` returning the markup
  of every element carrying a `style` attribute and every `<style>` element.
- `@orkestrel/test` declares zero runtime dependencies and publishes `@orkestrel/test`,
  `@orkestrel/test/server`, and `@orkestrel/test/browser`; `guides/test.md` in this checkout is
  its mirror and § Limits carries the candidate table with prior reuse rulings.
- The catalog table in `.claude/agents/orkestrel.md` (versions, layers, runtime dependencies of
  every published package).
- The guide mirrors in `guides/*.md`, one per published package. Read at minimum, in this order:
  `browser.md`, `html.md`, `workflow.md`, `contract.md`, `emitter.md`, `timeout.md`, `abort.md`,
  `template.md`, `table.md`, `form.md`, `terminal.md`, `toolbox.md`, `workspace.md`, `codec.md`,
  `msg.md`, `markdown.md`, `probe.md`, `supervisor.md`. Read any other mirror whose README row
  suggests DOM, markup, class, style, scenario, transition, or state-machine semantics.
- The consumers today: `elements/tests/setup.ts` and `veneer/tests/setup.ts` declare the
  statechart contract; `elements/tests/setupBrowser.ts` and `veneer/tests/setupBrowser.ts` declare
  the runners; `terrain/tests/app/browser/styles/tokens.test.ts` and taverna's `EntityField.vue`
  are the consumers the class and escape readers serve. Paths are siblings under
  `C:\Users\mikes\WebstormProjects\`.

**Law.** `AGENTS.md` (the `ALWAYS inspect the exact declared and installed @orkestrel/*
capabilities` rule, the no-superfluous-wrapper law, the environment boundaries);
`.claude/rules/patterns.md` § Declared ecosystem capabilities; `.claude/rules/quality.md`
§ Ecosystem reuse; `.claude/rules/architecture.md` § Environment/module placement. Skill: none.
Guide: `guides/test.md`.

**Host.** Windows 11. Read-only; no shell needed beyond reading.

**Measurements.** none.

**Control identifiers.** none.

**Standing conditions.** Unit U1 is implementing these additions in the `test` checkout right now;
its work is provisional until this ruling lands. Do not read its working tree; rule from the
published guides and the brief.

## Unknowns

- Whether `@orkestrel/browser` (`browser.md`) is the natural home for DOM readers rather than
  `@orkestrel/test/browser`. Rule on it: a test helper reads the DOM to assert, a browser package
  reads it to build; say which side each reader falls on and why, and what a consumer that is not a
  test would need.
- Whether `@orkestrel/workflow`'s step or task runner subsumes `runScenarios`. Rule on it with the
  guide's own vocabulary: what a workflow step is, whether arrange, act, assert map onto it, and
  what pulling it in would cost `@orkestrel/test`'s zero-dependency property.

## Scope

**Owned.** Nothing. Read-only.

**Shared (report-only).** Every file named above.

**Off-limits.** Every write.

**What asserts the state this change ends.** Not applicable.

**Tools and limits.** Read, Grep, Glob.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Return, as your final message, exactly:

- `Rulings`: one row per addition — `Addition`, `Ruling` (`reuse <package>.<export>`,
  `compose over <package>.<export>`, `new`), `Home` (`@orkestrel/test` core or browser, or another
  package), `Evidence` (`guides/<name>.md` section and the semantic match or mismatch in one
  clause), `Cost` (the dependency, layer, or property the ruling changes).
- `Blast radius`: which packages re-pin or republish under each ruling, read from the catalog.
- `Drift`: any place the additions restate a primitive the line already publishes under another
  name.
- `Unknowns`: facts the guides do not settle.

No process diary.

## Deviation contract

Stop and report when a guide named above is missing from `guides/`. Decide, record, and carry on
for which further mirrors to open.

## Acceptance criteria

1. Every addition has a ruling with a guide citation.
2. Both unknowns are ruled on with the guide's own vocabulary.
3. The blast radius is read from the catalog table, not estimated.

## Review evidence

A proposal: the additions, the canon (the laws named), and the motivation (the consumers named)
are supplied above.
