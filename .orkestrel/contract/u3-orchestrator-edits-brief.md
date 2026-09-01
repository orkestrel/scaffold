# Orchestrator edit unit — U3 comment prose (successor pair to U3f)

## Role and engine

Orchestrator (Opus 5), acting directly on three comment lines. This unit is briefed, owned, and audited like any other part: its auditor is the `checker` on Sonnet (mechanical writing-rule sweep) and the round-2 objective lane ruled on the first edit's absence from the audit diff (finding A).

## Objective

Remove every `above` or `below` cross-reference from prose the U3 + U3f diff adds, so item 7 of the U3f checker brief and claim 11 of the round-2 objective brief are met with no other change.

## Scope

Owned: `src/core/helpers.ts` line 1996 (comment); `tests/src/core/helpers.test.ts` lines 2992 and 3254 (comments). Off-limits: every other line. Pre-existing hits at `tests/src/core/helpers.test.ts:1327`, `:3205`, `:3732`, `:3736` and in `tests/src/core/compilers.test.ts` are outside the diff and stay.

## Edits

1. `src/core/helpers.ts:1996`: `names the \`limit\` below,` → `names the fault's \`limit\`,` (applied before the round-2 audit brief's diff was recaptured; the audit brief carried the earlier text — round-2 objective finding A).
2. `tests/src/core/helpers.test.ts:2992`: `so the repeated answers above are the strip rather` → `so the preceding repeated answers are the strip rather` (checker run 1, item 1; objective lane claim 11).
3. `tests/src/core/helpers.test.ts:3254`: `so the empty report above is the argument being` → `so the preceding empty report is the argument being` (same carriers).

## Acceptance criteria

1. `git -C /home/user/contract diff -U0 | grep -c '^+.*\b\(above\|below\)\b'` reports 0.
2. `npm run format:check` and `npm run lint:check` exit 0 on the tree.
3. The independent `verifier` sweep on the resulting tree is GREEN and the `checker` re-sweep of added lines reports no `above` or `below`.
