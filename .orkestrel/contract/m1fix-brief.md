# Unit m1fix — carry the m1-audit findings

Successor of `m1-dead-memo-brief.md` and its audit round (`m1-audit-brief.md`; lane returns
`m1-audit-subjective.md`, `m1-audit-objective.md`, `m1-audit-checker.md`, all beside this file).
The audit confirmed the edit itself on every behavioral claim; the findings are about the comment
and about what guards the change. Claim-7's exception clause was the Orchestrator's wording
defect and carries no code change. The reconciliation record is
`/home/user/scaffold/.orkestrel/contract/plan.md`.

## Role and engine

`implementer` on Opus 5, native Claude subagent. Sol bench recorded dark; substitution recorded.

## Objective

The comment, the regression guard, and the test-instrument consolidation the audit round
requires, landed exactly as bounded here — nothing else moves.

## Context

**Evidence.**

- FIX-A carrier (subjective claim 6 BROKEN; objective claim 6 tense correction): the comment at
  `src/core/ContractCompiler.ts:523-528` restates what the declaration shows, narrates a
  build-time map the edit deleted, sits inside one method while describing both, and omits the
  one fact that keeps the change from being undone: the `memo === undefined` operand is
  runtime-dead (the audit proved no reachable state has it true while `filled === scope`) and
  exists to prove the receiver at the `recall` and `retain` dispatches, because
  `INTRINSICS.apply` — `Reflect.apply` — infers its receiver type from the argument, so the
  narrower `if (filled !== scope)` also passes `check` while letting `undefined` reach
  `WeakMap.prototype.get` as far as the types know.
- FIX-B carrier (objective outside finding F1): the change ships with no regression guard — a
  future edit restoring the build-time initializer passes every gate. The premise that no Vitest
  case can observe it is false: `tests/src/core/integration.test.ts:1009-1037` replaces a host
  intrinsic, calls `vi.resetModules()`, dynamically re-imports a `src/core` module, asserts on
  what module evaluation did, and restores in a `finally`. `ContractCompiler` captures `WeakMap`
  at class definition (`src/core/ContractCompiler.ts:127`), so a counting subclass installed
  before a re-import is reached.
- FIX-B assertion shape, measured by the Orchestrator (2026-09-01, instrument
  `promotion-shape.mjs` beside the campaign records): a raw "no constructions during the getter
  read" assertion false-fails, because `#prepare` constructs `ShapeValidator` working maps — the
  build read constructs 12 for a shape with 3 tracked nodes and 12 for one with 7. The
  discriminating property is the DELTA: between those shapes the build-read delta is 0 after the
  m1 edit and equals the tracked-node difference when a build-time initializer returns; the
  call-phase counts are 3 and 7 — they scale with tracked nodes and are the control proving the
  counter sees closure-level constructions. This is a recorded departure from the auditor's
  verbatim wording, forced by that measurement.
- FIX-C carrier (subjective outside finding F1): the added case at
  `tests/src/core/ContractCompiler.test.ts:327-365` re-implements inline what `buildCountedGraph`
  (`tests/setup.ts:2724-2757`, proved at `tests/setup.test.ts:947-964`, imported at line 31 of
  the test file) already exports: counting-accessor records with a shared-against-distinct
  control. The shared-slot variant (one authored child node filling two object slots) has no
  exported factory yet.

**Law.** `AGENTS.md`, `.claude/rules/typescript.md` § Comments, `.claude/rules/tests.md`
§ Shared test infrastructure and § Probes, `.claude/rules/architecture.md`,
`.claude/rules/names.md`, `.claude/rules/writing.md` (comment prose). Skill: none. Guide:
`/home/user/contract/guides/contract.md` (no passage moves).

**Host.** Linux, `/home/user/contract`, dependencies installed, Node v22.22.2. Scoped commands
only.

**Measurements.** Scoped suite green at `Tests 345 passed (345)` on commit b3852d9
(Orchestrator-run). The `setup` project runs through
`npx vitest run --config vite.config.ts --no-cache --project setup`.

**Control identifiers.** none.

**Standing conditions.** `dist/` is stale against b3852d9 plus your edit; do not rebuild. The
tree is committed clean at b3852d9; your diff is the only change.

## Unknowns

- Whether the shared-slot factory fits `CountedGraphInterface` or needs a sibling interface in
  `tests/setup.ts`. Follow the existing pattern and report which you chose.

## Scope

**Owned.** `src/core/ContractCompiler.ts` (comment lines only — no executable line moves),
`tests/setup.ts` (the added factory and its type beside `buildCountedGraph`),
`tests/setup.test.ts` (the factory's proof), `tests/src/core/ContractCompiler.test.ts` (the
reduced within-call case and the added regression case; change no other existing assertion).

**Shared (report-only).** none.

**Off-limits.** Every other file. In `src/core/ContractCompiler.ts`, every non-comment line.

**What asserts the state this change ends.** The scoped suites named in the acceptance criteria;
no other file goes false. The policy sweep does not read comments or test bodies for these
changes.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash` (scoped npm and vitest).
No commit, no push, no install, no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message: the exact diff, pre-change and post-change counts for each scoped
run with commands, the mutation-probe evidence for FIX-B, which interface choice FIX-C took, and
any claim you flag as unproved. No process diary.

## Deviation contract

Stop and report on: any executable source line moving; the regression case proving flaky across
runs; an existing assertion needing change. Comment wording within the bounds of FIX-A, factory
naming within the naming rules, and test placement details are yours to decide and record.

## Acceptance criteria

1. FIX-A: the `#trackGuard` body comment shrinks to at most a pointer; the rationale lives in
   the `=== Call-scoped value ledger` section comment (ending near line 520), covering both
   methods, stating the clock-start fact and the receiver-proof fact, and describing no deleted
   code. `npm run lint:check` and `npm run format:check` exit 0.
2. FIX-C: the shared-slot factory is exported from `tests/setup.ts` with the shared-control
   parameter, proved in `tests/setup.test.ts` the way `buildCountedGraph` is proved, and the
   within-call case reduces to construction, call, and assertions with no inline
   `Object.defineProperty` counting records. `npx vitest run --config vite.config.ts --no-cache
   --project setup` is green.
3. FIX-B: a regression case in `tests/src/core/ContractCompiler.test.ts` installs a
   construction-counting `WeakMap` subclass on `globalThis`, calls `vi.resetModules()`,
   dynamically imports `ContractCompiler`, reads `guard` on compilers over a
   fewer-tracked-nodes shape and a more-tracked-nodes shape, asserts the build-read construction
   DELTA between them is 0, asserts the call-phase counts are positive and larger for the shape
   with more tracked nodes (the control), and restores the global and module registry in a
   `finally`. No assertion on absolute build counts, no byte or heap figure, no seam added to
   `src/`.
4. Mutation probe for FIX-B, recorded in the report: with a build-time initializer planted back
   on one `memo` declaration, the regression case fails; with the plant reverted, it passes.
   Leave the tree unplanted.
5. `npm run check` exits 0.
6. `npx vitest run tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts
   tests/src/core/integration.test.ts --config vite.config.ts --no-cache` is green at the
   recorded pre-change counts, adjusted only by your added and reduced cases.

## Review evidence

The actual diff and the actual `git status --porcelain` output, returned in the final message.
