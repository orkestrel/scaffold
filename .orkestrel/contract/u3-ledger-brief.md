# Unit u3-ledger — single-slot call ledger in the tracking wrappers

## Role and engine

`implementer`, Opus 5 (recorded substitution for the dark Sol bench). Native subagent: perform
the assignment directly yourself and spawn nothing.

## Objective

Implement, in `/home/user/contract/src/core/ContractCompiler.ts`, the probe-proven single-slot
ledger in `#trackGuard` (near lines 589-613) and `#trackFaults` (near lines 622-648): an inline
one-entry slot (scope tag, value, answer) serves the common one-object-per-node call; a
`WeakMap` is allocated only when a second distinct object arrives inside one scope, carrying
the slot entry into it. `#trackFaults` retains only a clean report, exactly as today — the slot
records a non-clean first value as unretained so a later identical value re-walks, matching the
current map's behavior of never storing a faulted report.

## Context

- Read first: `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`,
  `.claude/rules/tests.md`, then the two wrappers and the surrounding TSDoc comment block
  (`ContractCompiler.ts:552-577`) recording the pathological chain measurement, and the tests
  at `/home/user/contract/tests/src/core/ContractCompiler.test.ts:382-531`.
- The proven mechanism in built-JS form: `/home/user/scaffold/.orkestrel/contract/u3-patch.mjs`
  — read both `replacement` templates; implement exactly that mechanism in the class's style.
- Probe verdicts: marginal A/B 0.909 medium `is` / 0.885 deep `is`; the 30-level shared chain
  and the promotion-forcing alternating graph both inside bounds (`u3-ab.out`,
  `u3-bounds.out`); parity IDENTICAL.
- Baseline: clean tree at the commit U2 landed (your dispatch follows it). Node v22.22.2.

## The test amendment this unit owns (and nothing else in that file)

`tests/src/core/ContractCompiler.test.ts:443-510` ("builds no tracking ledger while a compiled
family is assembled"): its `buildDelta === 0` assertion is the subject and stays UNTOUCHED. Its
control half (`calledFew` / `calledMany` counting WeakMap constructions per call) empties under
the slot, because a call handing each tracked node one object builds no map. Re-derive the
control from values that FORCE promotion — hand a tracked node two distinct objects in one call
(the shape's two slots holding two distinct records) so the counter still proves the
instrumented constructor registers, and the count still rises with tracked-node population.
Amend the comment at lines 448-450 to state the promotion-forcing derivation. Add one case
pinning the slot's per-scope isolation: the same value re-read across two calls after caller
mutation still re-answers (the existing :429-441 case already pins this — extend it only if
your implementation would not be caught by it; otherwise record that it already pins).

## Scope

- Owned: `src/core/ContractCompiler.ts` (the two wrapper methods and, if a sentence there goes
  false, the minimum edit to the comment block at 552-577);
  `tests/src/core/ContractCompiler.test.ts` (the named control amendment only).
- Off-limits: everything else. No tree-wide format/lint. No commit, push, install, git-state
  commands.

## Deviation contract

Stop and report when: the wrapper bodies differ materially from the brief's description; any
test outside the amended control reddens; the mechanism forces an out-of-scope edit. Ancillary
choices are yours: decide, record, continue.

## Output

Exact diff; commands with tails; recorded decisions. No process diary.

## Acceptance criteria (cheap first)

1. Scoped typecheck (`configs/src/tsconfig.core.json`) green.
2. `tests/src/core/ContractCompiler.test.ts` green under the src:core project, including the
   amended control.
3. oxfmt and oxlint clean on owned files; diff confined to owned files.
4. Observation, not a criterion: timing readings. The Orchestrator re-runs parity, A/B, and the
   bounds probe after you exit.
