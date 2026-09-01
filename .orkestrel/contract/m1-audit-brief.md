# Unit m1-audit — falsification round over the m1-dead-memo change

## Subject

The uncommitted working tree of `/home/user/contract` on branch
`claude/method-memoization-contracts-yus26p`, tip cf659e5 plus the m1-dead-memo edit. The chain:
the design round excluded a lazy `createContract` bundle and adopted removing the dead build-time
tracking memos; the m1-dead-memo unit implemented that removal. This is the chain's first audit
round.

## What the round decides

Whether the m1-dead-memo change is committed and the campaign proceeds to its next writing unit.
A finding here is worth more than a clean pass: the alternative is a consumer of
`@orkestrel/contract` finding it after a release, when the version is spent.

## Role and engine

The subjective lane and the objective lane, each a fresh clean-context subagent on Opus 5 through
the `reviewer` role file (the Sol bench is recorded dark; the remaining engine runs every lane).
The dispatch prompt names which lane the reader holds. `checker` on Sonnet runs beside the lanes
for the mechanical claims. Your own engine wrote the half you are auditing — attack it harder; a
clean pass on your own engine's work is the least valuable result a lane can return. Do not hedge
toward an imagined consensus.

## Already established — verified by the Orchestrator directly, do not re-run

- Baseline gates were green before the edit (`format:check`, `lint:check`, `check`, exit 0).
- The scoped suite `npx vitest run tests/src/core/ContractCompiler.test.ts
  tests/src/core/compilers.test.ts tests/src/core/integration.test.ts --config vite.config.ts
  --no-cache` reports `Tests 345 passed (345)` on the edited tree — reproduced by the
  Orchestrator, not carried from the writer.
- The instrumented attribution probe (a counting `WeakMap` subclass installed before module
  evaluation; instrument and outputs retained in `/home/user/scaffold/.orkestrel/contract/`:
  `memo-attribution.mjs`, `dead-memo.mjs`, with pre-change and post-change outputs beside them in
  the Orchestrator's scratchpad copies `dead-memo-postM1.out`, `memo-attribution-postM1.out`)
  shows the `#trackGuard` build-time construction rows present before the edit and absent after
  it, with the call-phase replacement memos showing reads and writes (the instrument's control).
- Post-change heap medians against the pre-change baseline (Node v22.22.2, monotonic retention,
  CONTROL_ARRAY passing at 8248 B against 8192 B expected): medium-shape `createContract`
  12543 to 11677 B/call, deep 52512 to 48449 B/call, deep guard-only 18878 to 17544 B/call —
  each beyond its round spread; small-shape readings moved within the round spread.

## Review evidence

- The exact diff and `git status --porcelain`: in the writer's report,
  `/home/user/scaffold/tmp/units/m1-dead-memo-report.md`, which also records the writer's
  failing-first controls (each added test reddened by a planted reverse edit, then restored) and
  the writer's own flagged unproved claims.
- The live tree at `/home/user/contract` is the subject; read the actual source, not only the
  diff.
- The unit's brief: `/home/user/scaffold/tmp/units/m1-dead-memo-brief.md`.

## Numbered falsifiable claims

`CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is
`UNRESOLVED`, not `CONFIRMED` — say what would settle it.

1. After the edit, `#trackGuard` and `#trackFaults` construct nothing at build time: every
   remaining `new ContractCompiler.#weakMap()` in those two methods sits inside the returned
   closure, behind the refresh branch.
2. The behavior of the refresh branch is unchanged by the widened condition: `memo === undefined`
   can be true only on a closure's first object-bearing call, where `filled !== scope` already
   holds (`filled` starts at 0; `ContractCompiler.#scope` is at least 1 on every path inside the
   closure). No input, state, or interleaving reaches the `recall` read while `memo` is
   `undefined`.
3. Cross-call isolation is pinned: the added test `holds no answer about an object across two
   calls of one compiled guard` fails under a memo retained across calls and passes under the
   edit. The writer's control evidence says so; attack the test's discrimination yourself from
   the source — what retained-memo implementation would it miss?
4. Within-call reuse is pinned: the added test `reads a shared object once per call where two
   slots of one node reach it` fails under a memo rebuilt on every entry (the writer's control
   read `[2, 2]` against the expected `[1, 2]`). Attack its discrimination: what memo-removing
   edit would it pass?
5. The diff touches only the `#trackGuard` and `#trackFaults` bodies in
   `src/core/ContractCompiler.ts` plus added cases in `tests/src/core/ContractCompiler.test.ts`;
   no existing assertion changed; no `as`, no `!`, no suppression directive, no nested function
   declaration, and no initializer on either `memo` declaration entered the tree.
6. The added comment states only constraints the code cannot show, and the added tests are named
   for the properties they prove and sit where the mirror rule places them; no TSDoc or guide
   sentence elsewhere is contradicted by the change.
7. No published door's observable behavior moved: `compileGuard`, `compileAuditor`,
   `compileReporter`, `compileParser`, `compileGenerator`, `compileSchema`, `createContract`,
   and the compiler getters answer as before for every input class the scoped suites cover, and
   no path outside those suites can observe the removed allocation except through heap
   measurement.
8. The comment added in `#trackGuard` ("`#trackFaults` reads the same way") is accurate as
   written for the sibling method it describes.

## Unknowns

- Whether any test outside the scoped set pins allocation behavior of the tracked closures. The
  terrain report (`/home/user/scaffold/.orkestrel/contract/absorb-terrain-report.md`) found no
  such pin; settle by searching `tests/` and report what the search covered.

## Scope

Read-only: `Read`, `Grep`, `Glob` only. Audit the live tree; edit nothing; spawn nothing. You
cannot execute — the executed evidence above is Orchestrator-produced; where a claim needs a run
the evidence does not supply, return `UNRESOLVED` naming the run that would settle it.

## Output

The verdict shape of `.agents/skills/orkestrel-falsify/SKILL.md`: numbered verdicts in the
brief's order (`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED`, evidence per the
Falsification law), findings fitting no claim each substantiated to the `BROKEN` standard, and
exactly one terminal line (`VERDICT: PASS — …` or `VERDICT: FAIL — …`).
