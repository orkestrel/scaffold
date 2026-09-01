# Unit design-memoization — adversarial design round: method memoization for @orkestrel/contract

## Role and engine

The subjective lane: `planner` on Opus 5, native Claude subagent. The objective lane: held by
Opus 5 through the `planner` role file, because the Sol bench is dark (Codex CLI installed
2026-09-01, login pending device approval; recorded in the routing ledger). Lanes run in
parallel, blind to each other, on this one brief; the dispatch prompt names which lane the
reader holds. Argue only your named lane's perspective.

## Objective

A ruled proposal set answering: what does `@orkestrel/contract` adopt from the Zod 4.5
method-memoization pattern, at which seam, and at what cost — each proposal concrete enough to
brief an implementer without further design work.

## Context

**Evidence.** Read these files before proposing; they are the round's evidence slice:

- `/home/user/scaffold/tmp/units/absorb-zod-report.md` — the verified Zod mechanism and claims.
- `/home/user/scaffold/tmp/units/absorb-terrain-report.md` — allocation map and every pin on the
  bundle's observable surface, with `file:line`.
- `/home/user/scaffold/tmp/units/absorb-ecosystem-report.md` — consumer layers and bump
  obligations.
- `/home/user/scaffold/tmp/units/probe-baseline-report.md` — the measured baseline: the 1152 B
  compiler shell, the eager-bundle multiples (2.2x medium, 2.8x deep over guard-only), the
  small-shape inversion caused by `#collect` retention, and the frozen-instance
  `defineProperty` throw.
- Source of record: `/home/user/contract/src/core/types.ts`,
  `/home/user/contract/src/core/ContractCompiler.ts`, `/home/user/contract/src/core/compilers.ts`,
  `/home/user/contract/guides/contract.md`, `/home/user/contract/tests/src/core/ContractCompiler.test.ts`.

**Law.** `AGENTS.md` (scaffold — non-negotiables and design laws bind every proposal),
`.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
`.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/documentation.md`,
`.claude/rules/quality.md`. Skill: none. Guide: `/home/user/contract/guides/contract.md`.

**Host.** Read-only lane; no commands. Repositories at `/home/user/contract` and
`/home/user/scaffold`.

**Measurements.** All in `probe-baseline-report.md`; taken 2026-09-01 on Node v22.22.2 with
controls passing. Do not re-derive them; cite them.

**Control identifiers.** none.

**Standing conditions.** The bundle's own-key, freeze, identity, and eager surface is pinned by
tests, TSDoc, and guide passages (terrain report lists each with `file:line`). A pinned surface
may move — this workspace is greenfield with no compatibility shims — but every pin updates in
the same change, and a materially moved `dist/` obliges a version bump and, at the user's later
release decision, a fleet republish cascade across the consumer layers the ecosystem report
names. Weigh that cost explicitly.

## Candidate seams

Rule on each candidate — adopt, adapt, or reject, with the reason — and add any seam the
candidates miss. The candidates carry no authority; the probes surfaced them.

1. **Lazy bundle.** `createContract` returns an instance whose members resolve through prototype
   getters delegating to a retained `ContractCompiler`, so a family compiles on first touch.
   Zod's own caching form is unavailable on a frozen instance (measured throw); caching would
   stay in the compiler's `#` fields. Moves the pinned own-key/eager surface; inherits the
   `#collect` retention tension.
2. **Shared release sentinels.** The constructor's paired empty arrays and WeakMap release
   siblings become module-scope shared frozen sentinels, cutting most of the 1152 B per-compiler
   shell. Requires proving nothing ever mutates a sentinel after release.
3. **Per-family release.** `#collect` releases each family's plan array when that family's root
   exists, and the node index when every family exists — narrowing the partial-consumer
   retention the probe measured.
4. **Retain the current design.** The compiler is already the lazy, memoized door with identity
   replay; `createContract` stays the eager bundle by documented intent. The adoption is a
   documentation and guidance matter, not a code change.

## Unknowns

- Whether any fleet consumer destructures or spreads the bundle (ecosystem report leaves it
  open; in-repository consumers do not). Treat destructuring compatibility as required: the
  interface's `parse`/`audit`/`explain`/`generate` are methods and `is` is a property — state
  for your proposal whether a destructured member keeps working and why.
- Real consumer artifact-usage distribution (how many of the six a typical consumer touches).
  No measurement exists; argue from the package's own guides and tests, and label the argument.

## Scope

**Owned.** none — read-only design lane. **Shared.** none. **Off-limits.** every write.

**What asserts the state this change ends.** none — no change ships from this unit.

**Tools and limits.** `Read`, `Grep`, `Glob`. No `Edit`, no `Write`, no `Bash`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message:

- `Lane`: which lane you held.
- `Rulings`: for each candidate seam, adopt / adapt / reject with the deciding reason and the
  evidence pointer.
- `Proposal`: your recommended design as an implementable unit list — for each unit: the exact
  type-contract delta in `types.ts` terms, the implementation seam (`file:line`), every pin from
  the terrain report it moves and what each becomes, the expected effect stated against the
  probe numbers, and independently checkable acceptance criteria.
- `Risks`: ranked, each with the condition that would realize it.
- `Exit criterion`: what closes this campaign, stated as enumerable capabilities.
- `Flagged`: claims of your own you could not ground in the evidence slice.

## Deviation contract

Stop and report only when a named evidence file is missing. Anything else ambiguous goes under
`Flagged`.

## Acceptance criteria

1. Every candidate seam carries a ruling with a reason.
2. Every proposal unit names its pins from the terrain report and its type-contract delta.
3. Every memory or time claim cites the probe report rather than restating intuition.

## Review evidence

This unit is a design proposal: the proposal itself, the canon it must satisfy (the Law files),
and the record of what motivated it (the four evidence reports) are the review inputs.
