# Unit u4-leafgate — compile-time refinement gate on diagnostic leaves

## Role and engine

`implementer`, Opus 5 (recorded substitution for the dark Sol bench). Native subagent: perform
the assignment directly yourself and spawn nothing.

## Objective

Implement, in `/home/user/contract/src/core/ContractCompiler.ts`, the probe-proven refinement
gate in the diagnostic leaf plans:

- `#auditOf` string case (near line 1327): a string node with no `min`, `max`, or `pattern`
  returns a fresh empty fault list after the type test instead of calling `createStringFaults`.
- `#auditOf` number case (near line 1337): a number node with no `integer`, `min`, or `max`
  likewise skips `createNumberFaults`.
- `#reportOf` string and number cases (near lines 1585-1606): same gates on the parsed value.
- A refined node keeps calling the shared helper UNCHANGED — no refinement logic is duplicated,
  and the helpers keep their `readValue` door and public exports untouched.
- Never share one frozen empty array across clean leaves: each clean return is a fresh `[]`
  (publication identity is a separate ruling this unit does not own).

## Context

- Read first: `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`, then the four
  leaf cases and `createStringFaults`/`createNumberFaults` in
  `/home/user/contract/src/core/helpers.ts:1852-1963` (to confirm an unrefined shape returns
  empty for every accepted leaf value — the equivalence the gate rests on).
- Proven mechanism in built-JS form: `/home/user/scaffold/.orkestrel/contract/u4-patch.mjs`.
- Probe verdicts: marginal A/B 0.868 medium `audit` / 0.939 deep `audit` / 0.891 medium
  `explain`; parity IDENTICAL (`u4-ab.out`).
- Guide precision this unit owns: `/home/user/contract/guides/contract.md:596` — the sentence
  claiming `compileAuditor` and `compileReporter` consume those helpers gains the precision
  that every REFINED leaf consumes them (an unrefined leaf's clean answer needs no helper).
  Keep the edit minimal and true to the mechanism.

## Scope

- Owned: `src/core/ContractCompiler.ts` (the four leaf cases), `guides/contract.md` (the one
  sentence). Off-limits: everything else, `tests/` included — the existing suite must stay
  green UNMODIFIED (a red test is a deviation to report, not to fix).
- No tree-wide format/lint. No commit, push, install, git-state commands.

## Deviation contract

Stop and report when: a leaf case differs materially; ANY test reddens; the guide sentence
cannot be made true in one sentence. Ancillary choices are yours: decide, record, continue.

## Output

Exact diff; commands with tails; recorded decisions. No process diary.

## Acceptance criteria (cheap first)

1. Scoped typecheck green.
2. `tests/src/core/compilers.test.ts` and `tests/src/core/ContractCompiler.test.ts` green,
   unmodified, under src:core.
3. `npm run test:guides` green (the guide edit stays inside parity).
4. oxfmt and oxlint clean on owned files; diff confined to owned files.
5. Observation, not a criterion: timing. The Orchestrator re-runs parity and A/B after exit.
