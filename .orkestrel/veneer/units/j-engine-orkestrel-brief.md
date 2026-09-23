# Unit J-ENGINE-ORKESTREL — the Orkestrel primitives an engine can reuse

## Role and engine

`orkestrel` on Sonnet, reached as a native Claude subagent (read-only). The executor that opens this
brief is that subagent.

## Objective

A map of every installed and catalogued `@orkestrel/*` package whose exports an interaction engine
could reuse (guards, emitters, lifecycles, abort handling, deferreds, waits, recorders, focus or
DOM helpers), with the exact export names and declaration pointers, and the packages that offer
nothing for it, so the J-ENGINE design round rules on each candidate rather than assuming.

## Context

**Evidence.** `grep -n '"@orkestrel/' /home/user/veneer/package.json` →
`"@orkestrel/contract": "^0.0.17"` under `dependencies`; `@orkestrel/guide` `^0.0.20`,
`@orkestrel/html` `^0.0.10`, `@orkestrel/markdown` `^0.0.15`, `@orkestrel/probe` `^0.0.16`,
`@orkestrel/scaffold` `^0.0.77`, `@orkestrel/test` `^0.0.20` under `devDependencies`.
`ls /home/user/veneer/node_modules/@orkestrel/` lists the installed set. The engine today is
`src/browser/{Button,ColorMode,Delegate}.ts` importing `isInstance` and `literalOf` from
`@orkestrel/contract` (`src/browser/validators.ts:2-3`). Ruling D41
(`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D41): no runtime dependency
outside `@orkestrel/*`, each candidate ruled on before it enters.

**Law.** `AGENTS.md` (ALWAYS inspect the exact declared and installed `@orkestrel/*` capabilities
before implementing overlapping logic); `.claude/rules/quality.md` § Dependency reuse; the skill:
none; the guide `guides/veneer.md` § Surface.

**Installed primitives.** The subject of this unit.

**Host.** Linux, read-only; `/home/user/veneer` at `87ff1d0`; the scaffold checkout
`/home/user/scaffold` holds the catalog role file `.claude/agents/orkestrel.md` and the package
guides under `guides/` where present.

**Measurements.** None beyond the evidence.

**Control identifiers.** None.

**Standing conditions.** The catalog embedded in the role file is not live state; read the
installed declarations under `node_modules/@orkestrel/*/dist/` for what exists.

## Unknowns

- Whether a catalogued package not installed in Veneer (read the role file's catalog) exports an
  engine primitive: report it as catalogued-not-installed with the guide pointer, never as
  available.

## Scope

**Owned.** None (read-only).

**Shared (report-only).** None.

**Off-limits.** Every file.

**What asserts the state this change ends.** None.

**Tools and limits.** Read, Grep, Glob. No edits.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A distillate with one section per package (installed set first, then catalogued-only): the
exports with declaration pointers grouped by engine concern (guard, emitter, lifecycle, abort,
deferred or wait, recorder, DOM or focus), a one-line reading of each export's semantics from its
doc block, and a closing list of concerns no package covers. Delivered as the final message.

## Deviation contract

Stop and report on a declaration file that cannot be read. Decide, record, and carry on from how
to group an export that fits two concerns.

## Acceptance criteria

1. Every installed `@orkestrel/*` package has a section naming its declaration entry.
2. Every export named resolves in the declaration file cited.

**Observations, not criteria.** None.

## Review evidence

The distillate; the Orchestrator verifies a sample of pointers.
