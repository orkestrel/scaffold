# Unit absorb-terrain — contract repository allocation and pinning terrain

## Role and engine

`scout` on Sonnet, reached as a native Claude subagent. Substitution record: this job belongs to
Cursor Grok first; the Cursor bench reports `Not logged in` (probed 2026-09-01), and the Luna step
requires the Codex bench, which holds no credential. The ladder therefore lands on Sonnet.

## Objective

A `file:line` map of where `@orkestrel/contract` allocates per-compile and per-instance heap, and
of every test, guide passage, and TSDoc sentence that pins the observable surface a lazy
`createContract` bundle would move.

## Context

**Evidence.** The Orchestrator has read `/home/user/contract/src/core/types.ts` (all lines),
`/home/user/contract/src/core/compilers.ts` (all lines), and the getter and bundle sections of
`/home/user/contract/src/core/ContractCompiler.ts` (lines 118-380 and 1984-2016). Facts already
established, which you verify rather than re-derive: the compiler getters build one artifact
family per read and replay by identity; `#buildContract` (line 1986) eagerly builds every family
and freezes a plain-object bundle with own enumerable keys `schema`, `is`, `parse`, `audit`,
`explain`, `generate`; `#collect` releases the node index once every root exists; `pinMembers`
freezes the prototype in a static block (line 2014).

**Law.** `AGENTS.md` (scaffold), `.claude/rules/architecture.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`. Skill: none. Guide or spec: `/home/user/contract/guides/contract.md`.

**Host.** Linux, repository at `/home/user/contract`, scaffold checkout at `/home/user/scaffold`.
Read-only; no commands beyond file reads and searches.

**Measurements.** File sizes measured 2026-09-01 with `wc -l src/core/*.ts`: helpers.ts 2163,
ContractCompiler.ts 2016, ShapeValidator.ts 1562, inferers.ts 1449, shapers.ts 1280,
validators.ts 1131, types.ts 1098, combinators.ts 1086, ShapeCloner.ts 973, parsers.ts 553,
constants.ts 470, compilers.ts 369, JSONCloner.ts 307, SchemaCloner.ts 266, cloners.ts 193,
errors.ts 107, index.ts 16.

**Control identifiers.** none.

**Standing conditions.** A `dist/` build may appear or change while you read; it is generated
output, outside your subject. `node_modules/` is installed. Both benches are dark; recorded, not
yours to diagnose.

## Unknowns

- Which tests pin the bundle's own-key surface, freeze state, member identity, or eagerness.
  Report each with `file:line` and the exact assertion.
- Whether any consumer inside this repository (tests, guides, fixtures) destructures or spreads a
  contract bundle. Report each site.
- What the guides state about `createContract`, the compiler's laziness, and the bundle. Report
  each passage with `file:line`.
- Whether bench or probe infrastructure exists and how it arms (`test:probe`, `test:bench`,
  `tmp/probe/`, the `probe` Vitest project in `vite.config.ts`). Report the wiring with pointers.

## Scope

**Owned.** none — this unit is read-only.

**Shared (report-only).** none.

**Off-limits.** Every write. Do not create, edit, or delete any file.

**What asserts the state this change ends.** none — no change ships from this unit.

**Tools and limits.** `Read`, `Grep`, `Glob`. No `Edit`, no `Write`, no `Bash`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message, in this shape, no process diary and no raw file dumps:

- `Question`: one line.
- `Allocation map`: where each artifact family allocates closures per node
  (`file:line` for each `#build*` family and the per-node plan arrays), what the bundle itself
  allocates, and what `#collect` releases and when.
- `Pinned surface`: every test assertion, TSDoc sentence, and guide passage that would go false
  if the bundle became lazy (member identity across reads, own enumerable keys, freeze, getter
  order on refusal, eager compile), each with `file:line` and a one-line quote.
- `Consumers`: every in-repository site that destructures, spreads, enumerates, or re-exports a
  contract bundle, with `file:line`.
- `Instrumentation`: the probe and bench wiring, with `file:line` into `vite.config.ts`,
  `package.json` scripts, and any existing benches under `tests/`.
- `Unknowns`: unresolved facts.
- `Deviation`: anything that blocked a read.

## Deviation contract

Stop and report only when the repository itself is unreadable. An individual ambiguous site is
yours to record under `Unknowns` and carry on from.

## Acceptance criteria

1. Every entry in `Pinned surface` carries `file:line` and quotes the pinned sentence or
   assertion.
2. `Allocation map` names the plan arrays and the release point by line.
3. No design recommendation appears anywhere in the return.

## Review evidence

This unit is a reconnaissance distillate: the evidence is the pointers themselves. No diff and no
status output exist for a read-only unit.
