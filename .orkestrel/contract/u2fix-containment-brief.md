# Unit u2fix-containment — restore the hoisted vocabularies' containment

## Role and engine

`implementer`, Opus 5 (recorded substitution for the dark Sol bench). Native subagent: perform
the assignment directly yourself and spawn nothing.

## Objective

Adopt, verbatim in mechanism, the u2-presence audit lane's prescription
(`/home/user/scaffold/.orkestrel/contract/u2-presence-audit-verdict.md`, read it first): in
`/home/user/contract/src/core/ContractCompiler.ts`,

- the auditor object plan's hoisted `declared` vocabulary and the reporter object plan's
  hoisted `known` vocabulary are built at plan time through `attempt` (NOT through `readValue`
  — the plan-time door has no call path and must not throw), holding `undefined` when that
  build fails;
- per call, when the hoisted vocabulary is `undefined`, the plan builds it inside the EXISTING
  per-call containment exactly where the pre-hoist code built it, so a hostile captured `Set`
  surfaces as the same refusal the parent commit produced: the reporter's total fault-array
  answer, and the auditor's coded refusal carrying `path` in its context;
- the parser's pre-existing hoist is OUT of scope (its door's contract admits a compile
  refusal);
- `/home/user/contract/src/core/constants.ts`: the `PRESENCE_MASK_LIMIT` TSDoc sentence gains
  its serial comma ("guard, parser, auditor, and reporter").

## Context

- The finding, executed: with `globalThis.Set` replaced BEFORE the package module evaluates
  (so `INTRINSICS` captures the hostile constructor), commit 99283f9's `compileReporter`
  throws `structure` where its parent returned
  `[{ reason: 'type', path: [], expected: 'object', received: 'object' }]`, and
  `compileAuditor` keeps its refusal but loses `path` from context. The audit lane proved the
  honest-regime answers untouched over a 3240-case differential.
- Read the two object plans at their current state (the tree is at f62d830; U3 and U4 landed
  after the audited commit, so locate the hoists by structure).
- The package documents this exact regime: the `compileReporter` TSDoc totality promise in
  `src/core/compilers.ts` and the in-code comment at the reporter's walk.

## Scope

- Owned: `src/core/ContractCompiler.ts` (the two hoist sites and their per-call fallbacks),
  `src/core/constants.ts` (the one comma). Off-limits: everything else; every existing test
  stays green unmodified. No commit, push, install, git-state commands, tree-wide format/lint.

## Deviation contract

Stop and report when: the hoist sites differ materially from the verdict's description; any
test reddens; the fallback cannot reproduce the parent's exact refusal shape. Ancillary
choices are yours: decide, record, continue.

## Output

Exact diff; commands with tails; decisions. No process diary.

## Acceptance criteria (cheap first)

1. `npm run check:src:core` green.
2. `tests/src/core/compilers.test.ts` and `tests/src/core/ContractCompiler.test.ts` green,
   unmodified, under src:core.
3. oxfmt and oxlint clean on owned files; diff confined to owned files.
4. Observation, not a criterion: the pre-load-sabotage behavior. The Orchestrator runs the
   deciding mutation probe (hostile pre-load `Set`; reporter answers a fault array, auditor's
   refusal context carries `path`) against the rebuilt dist after you exit, red against the
   audited commit's artifact and green against yours.
