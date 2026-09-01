# Unit m1-dead-memo — remove the dead build-time tracking-memo allocation

## Role and engine

`implementer` on Opus 5, native Claude subagent. Substitution record: this is an objective,
constraint-heavy unit that belongs to the Sol `implementer`; the Sol bench is recorded dark
(device auth expired unapproved 2026-09-01), so the remaining engine takes it.

## Objective

`#trackGuard` and `#trackFaults` in `/home/user/contract/src/core/ContractCompiler.ts` stop
allocating a `WeakMap` at build time, with per-call memoization behavior preserved exactly.

## Context

**Evidence.** `#trackGuard` (`src/core/ContractCompiler.ts:522-547`) and `#trackFaults`
(`555-581`) each initialize `let memo: WeakMap<…> = new ContractCompiler.#weakMap()` at build.
Inside the returned closure, `filled` starts at 0 and `ContractCompiler.#scope` is at least 1 on
every path (an opening call assigns `#scope = ++#visits`; a non-opening call inherits a nonzero
outer scope), so the refresh branch at `534-537` and `569-572` replaces the build-time map before
any read. An instrumented run confirms it: a counting `WeakMap` subclass installed before module
evaluation reports the build-phase track memos never touched through `get`, `set`, or `has`,
while the call-phase replacement memos show reads and writes (the instrument's control). The
instrument and output are `.orkestrel/contract/dead-memo.mjs` and `dead-memo.out` in the
scaffold checkout. The dead map is captured by every published guard, auditor, and reporter
closure, so it rides in each compiled artifact until first call, and forever in an artifact that
only ever receives primitives. The failing proof for this unit is that instrumented run; no
Vitest assertion can observe the allocation after module load, so the regression guards are the
behavioral tests below.

**Law.** `AGENTS.md` (scaffold — the non-negotiables bind: no `any`, no assertions, no
suppressions, no nested function declarations), `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/names.md`. Skill:
none. Guide: `/home/user/contract/guides/contract.md` (no passage moves in this unit).

**Host.** Linux, repository `/home/user/contract`, dependencies installed, Node v22.22.2.
Scoped commands only; do not run the whole suite.

**Measurements.** Baseline gates green 2026-09-01: `format:check`, `lint:check`, `check` all
exit 0 (`/home/user/scaffold/tmp/units/baseline-gates.log`). Record the pre-change pass counts
of the scoped test files before editing.

**Control identifiers.** none. Name any test you add for the property it proves, never for a
probe or a finding label.

**Standing conditions.** `dist/` is built and becomes stale the moment you edit source; do not
rebuild it — the Orchestrator rebuilds before re-running the retained instruments. The
`tmp/probe/` directory may not exist; you do not need it. Both external benches are dark or
reserved; that is recorded and not yours.

## Unknowns

- Whether `let memo: WeakMap<object, boolean> | undefined` with the widened refresh condition
  `if (memo === undefined || filled !== scope)` narrows to non-undefined at the reads
  (`538`/`573`) and writes (`541`/`576`) under this workspace's compiler settings without any
  assertion. Confirm by running `npm run check`. If it does not narrow, the pre-authorized
  fallback is a block-scoped `const active` bound after the refresh branch and used for the
  recall, the answer, and the retain; report which form landed.

## Scope

**Owned.** `/home/user/contract/src/core/ContractCompiler.ts` (only the `#trackGuard` and
`#trackFaults` bodies), `/home/user/contract/tests/src/core/ContractCompiler.test.ts` (added
cases only; change no existing assertion).

**Shared (report-only).** none.

**Off-limits.** Every other file — `src/core/types.ts` above all, `dist/`, `guides/`,
`package.json`, `vite.config.ts`, every other test file.

**What asserts the state this change ends.** No existing test or guide passage pins the
build-time allocation (terrain report, `.orkestrel/contract/absorb-terrain-report.md`). The
files that would catch a behavioral slip are
`tests/src/core/ContractCompiler.test.ts`, `tests/src/core/compilers.test.ts`, and
`tests/src/core/integration.test.ts`; run them scoped.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash` (scoped npm and vitest
commands). No commit, no push, no install, no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message: the exact diff (`git diff` output), the recorded pre-change and
post-change scoped test counts with their commands, which narrowing form landed, and any claim
of your own you flag as unproved. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — on:
a reader of the build-time memo you find that the evidence above missed (this falsifies the
ruling); any existing test going red; the `check` gate rejecting both narrowing forms. The
choice between the two pre-authorized narrowing forms and the placement of added test cases
within the test file are yours to decide and record.

## Acceptance criteria

1. `npm run lint:check` exits 0.
2. `npm run check` exits 0.
3. The diff contains no `as` assertion, no `!` non-null assertion, no suppression directive,
   and no initializer on either `memo` declaration.
4. `npx vitest run tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts tests/src/core/integration.test.ts --config vite.config.ts --no-cache`
   is green, at the recorded pre-change counts plus your added cases.
5. An added case proves cross-call isolation: compile one guard over an object shape, call it
   with a valid object, mutate that object to an invalid state, call again, and assert the
   second call answers `false` — a retained cross-call memo would answer `true`.
6. An added case proves within-call reuse survives: compile a guard over a shape whose one
   authored child node is referenced from two slots (a shared-child DAG), pass a value in which
   one object is reachable through both slots, and assert the guard answers correctly; assert
   through a counting accessor on the value side that the shared object's members are read once
   per call, not twice — the reading that separates a live memo from a removed one.

## Review evidence

The actual diff and the actual `git status --porcelain` output, both returned in the final
message and retained by the Orchestrator.
