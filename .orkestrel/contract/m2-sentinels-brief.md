# Unit m2-sentinels — hoist the release peers to class scope

## Role and engine

`implementer` on Opus 5, native Claude subagent. Substitution record: objective,
constraint-heavy unit belonging to the Sol `implementer`; the Sol bench is recorded dark, so
the remaining engine takes it.

## Objective

`ContractCompiler` stops allocating per-instance empty release peers: the paired empty arrays
become shared frozen `static readonly #` sentinels, `#emptyIndex` is deleted, and `#index`
carries absence as `undefined` — with release, refusal, and replay behavior preserved exactly.

## Context

**Evidence.** The constructor allocates a live collection and an empty release peer for each
working field (`src/core/ContractCompiler.ts:146-175` declarations, `189-219` constructor);
`#release` (`357-369`) assigns the peers; `#collect` (`347-352`) and `#fail` (`338-342`) are
the only release callers. The measured cold shell is 1152 B per instance across small, medium,
and deep shapes (`.orkestrel/contract/contract-baseline-postM1.out` in the scaffold checkout,
controls passing). The no-write-after-release ground: every collection writer sits behind
`#prepare` (`373-394`), which refuses when `#source` is undefined, and `#release` clears
`#source` in the same assignment run; the design record is
`/home/user/scaffold/.orkestrel/contract/plan.md` § Reconciled design. A first-hand correction
recorded there binds this unit: with `#index` typed `WeakMap<ContractShape, number> |
undefined`, the bare `INTRINSICS.apply(INTRINSICS.recall, this.#index, [shape])` in `#locate`
(`465-474`) would throw an uncoded TypeError on an undefined receiver — `#locate` must refuse
with its existing coded `ContractError` before the apply. The reads in `#discover`
(`417`, `420`) need the same narrowing; they run only behind `#prepare`, where the constructor's
live map exists.

**Law.** `AGENTS.md` (non-negotiables: no `any`, no assertions, no suppressions), `.claude/rules/typescript.md`
(the `as const` note and the assertion ban; `Object.freeze` returns a readonly type, so freeze
each sentinel in a separate statement and discard the return, keeping the declared mutable
element type), `.claude/rules/architecture.md`, `.claude/rules/tests.md`,
`.claude/rules/names.md`. Skill: none. Guide: `/home/user/contract/guides/contract.md` (no
passage moves; the class comment prose at `344-346` and `354-356` is yours to restate where the
peer ownership moves).

**Host.** Linux, repository `/home/user/contract`, dependencies installed, Node v22.22.2.
Scoped commands only.

**Measurements.** The tree stands at contract commit 1cd4ac8 (the m1 chain: the lazy-memo edit
and its audit-fix round). The scoped suite `npx vitest run
tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts
tests/src/core/integration.test.ts --config vite.config.ts --no-cache` reports
`Tests 346 passed (346)` on that commit, and the `setup` project reports
`Tests 61 passed (61)` (writer-run 2026-09-01, gates exit 0). One added case in
`tests/src/core/ContractCompiler.test.ts`, `builds no tracking ledger while a compiled family
is assembled`, replaces `globalThis.WeakMap` with a construction-counting subclass around a
dynamic re-import and counts constructions across getter reads and calls — your change moves
which constructions the constructor performs (`#emptyIndex` goes away), and that case asserts a
DELTA between two compilers plus call-phase controls, not absolute totals, so it is expected to
stay green; if it reddens, that is a real interaction to report, not a flake. Record your own
pre-change counts before editing.

**Control identifiers.** none.

**Standing conditions.** `dist/` goes stale on your edit; do not rebuild. The static block at
the class tail calls `pinMembers`; static fields initialize in declaration order ahead of a
later static block, so freezing the sentinels there or in an adjacent block beside their
declarations are both sound — your choice, record it.

## Unknowns

- Whether the prototype-pin test (`tests/src/core/ContractCompiler.test.ts:47-62`) or any other
  test reflects on static members or field counts. The terrain report found no such pin; verify
  before editing and report what the search covered.

## Scope

**Owned.** `/home/user/contract/src/core/ContractCompiler.ts` (field declarations, constructor,
`#release`, `#locate`, `#discover`'s index reads, the static block, and the comments the move
makes false), `/home/user/contract/tests/src/core/ContractCompiler.test.ts` (added cases only;
change no existing assertion).

**Shared (report-only).** none.

**Off-limits.** Every other file — `src/core/types.ts` above all, `dist/`, `guides/`.

**What asserts the state this change ends.** The release test
(`tests/src/core/ContractCompiler.test.ts:112-136`) and the terminal-replay test (`169-183`)
assert the behavior this change must preserve; they stay green unchanged. No file pins the
per-instance peer allocation.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash` (scoped npm and vitest).
No commit, no push, no install, no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message: the exact diff, pre-change and post-change scoped test counts with
commands, where the freeze landed, and any claim you flag as unproved. No process diary.

## Deviation contract

Stop and report on: a write path reaching a shared sentinel that the evidence above missed; any
existing test going red; the narrowing for `#index` failing `check` without an assertion.
Sentinel naming, comment wording, freeze placement, and added-test placement are yours to
decide and record.

## Acceptance criteria

1. `npm run lint:check` exits 0.
2. `npm run check` exits 0.
3. The diff contains no `as` assertion, no `!`, no suppression directive; `#emptyIndex` no
   longer exists; every remaining `#empty*` member is `static readonly` and frozen; `#release`
   constructs nothing.
4. The scoped suite is green at the recorded pre-change counts plus your added cases.
5. An added case proves cross-compiler isolation past release: two compilers over different
   declarations, each driven through its `contract` getter (which releases the working set),
   still answer their own artifacts correctly, and a third compiler constructed afterwards
   refuses a malformed declaration with its own coded `ContractError`.
6. An added case extends terminal replay across the surface: a compiler settled by a refusing
   declaration rethrows the exact same error, by identity, from every getter — `schema`,
   `guard`, `parser`, `auditor`, `reporter`, `generator`, and `contract`.
7. A `#locate` call on a released compiler cannot throw a bare TypeError: the coded refusal
   path is reachable in source ahead of the `recall` apply (prove by reading; no reachable test
   vector exists because release requires every root, and that is the point — the guard is
   defense in depth, stated in its comment).

## Review evidence

The actual diff and the actual `git status --porcelain` output, returned in the final message.
