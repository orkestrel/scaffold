# Unit absorb-ecosystem — blast radius of a contract bundle change

## Role and engine

`orkestrel` on Sonnet, reached as a native Claude subagent. This role stays native by design; no
substitution applies.

## Objective

A consumer map and obligation statement for a change to the `createContract` bundle and
`ContractCompiler` surface of `@orkestrel/contract`, derived from the catalog your role file
carries and the evidence supplied here.

## Context

**Evidence.** `/home/user/contract/package.json` read 2026-09-01: name `@orkestrel/contract`,
version 0.0.13, no `dependencies` key (zero runtime dependencies), devDependencies include
`@orkestrel/guide` ^0.0.15, `@orkestrel/probe` ^0.0.10, `@orkestrel/scaffold` ^0.0.58,
`@orkestrel/test` ^0.0.11. The package describes itself as the foundation package of the
`@orkestrel` line. The contemplated change: `createContract` returns a frozen plain object whose
own enumerable keys are `schema`, `is`, `parse`, `audit`, `explain`, `generate`, each member
eagerly compiled; a memoization design could replace eager members with lazily resolved ones.
Every package version in the fleet is `0.0.x`, where a caret pins one exact release.

**Law.** `AGENTS.md` (scaffold), `.agents/orchestration.md` § What a bump obliges. Skill: none.
Guide or spec: none.

**Host.** Linux, scaffold checkout at `/home/user/scaffold`, contract checkout at
`/home/user/contract`. Read-only. The catalog table lives in your own role file; treat it as the
declared catalog, not as live registry state, and say so where it matters.

**Measurements.** none beyond the manifest facts in Evidence.

**Control identifiers.** none.

**Standing conditions.** No registry access from this unit; the catalog in the role file is the
best available ordering evidence and may lag the registry.

## Unknowns

- Which fleet packages declare `@orkestrel/contract` in runtime `dependencies`, from the catalog.
  Report the list and each package's layer.
- Whether any catalog package is documented as consuming the contract bundle by destructuring or
  spread, from evidence available in these checkouts. Report sites or report none found.

## Scope

**Owned.** none — this unit is read-only.

**Shared (report-only).** none.

**Off-limits.** Every write.

**Tools and limits.** `Read`, `Grep`, `Glob`. No `Edit`, no `Write`, no `Bash`, no network.

**What asserts the state this change ends.** none — no change ships from this unit.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message, in this shape:

- `Question`: one line.
- `Consumers`: catalog packages that depend on `@orkestrel/contract` at runtime, each with its
  layer, and the publish-order consequence of a contract release.
- `Obligations`: what a behavioral change to the bundle surface obliges downstream under
  `.agents/orchestration.md` § What a bump obliges — for a runtime-visible change and for a
  behavior-preserving internal change, stated separately.
- `Risks`: drift findings — any place the supplied evidence and the catalog disagree.
- `Unknowns`: unresolved facts.

## Deviation contract

Stop and report only when your role file's catalog is absent. Anything else ambiguous goes under
`Unknowns`.

## Acceptance criteria

1. `Consumers` names each dependent package with its layer or states that the catalog names none.
2. `Obligations` separates the runtime-visible case from the behavior-preserving case.
3. No design recommendation appears anywhere in the return.

## Review evidence

This unit is an ecosystem distillate: the evidence is the catalog rows and manifest facts it
cites. No diff and no status output exist for a read-only unit.
