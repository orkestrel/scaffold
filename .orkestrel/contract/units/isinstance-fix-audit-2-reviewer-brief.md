# ISINSTANCE-FIX audit round 2 — the objective lane's brief, held by `reviewer` on Opus 5.5

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **objective** lane (GPT-6 Astra wrote both rounds, so the lanes stay swapped): whether every sentence of the comment and the remark is true of the compiler and the runtime, and whether the proofs now pin the constraint. State your lane in your first line and the model the alias served. The subjective lane is not run on this round (every round-2 sentence adopts a lane's own wording or a measured fact; the round-1 verdict records that in advance), so your lane and the checker decide it; do not hedge toward an imagined consensus.

## Subject

The ISINSTANCE-FIX unit's rounds 1 and 2 as one uncommitted edit set in `C:/Users/mikes/WebstormProjects/contract`, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-brief-2.md` (G1 to G4). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-2.diff` and status `isinstance-fix-2-status.txt`; the report `isinstance-fix-report-2.md` (its stop and the Orchestrator's ruling on it); the round-1 verdict `isinstance-fix-audit-verdict.md` and your lane's `isinstance-fix-audit-reviewer-verdict.md`; the Orchestrator's probes `contract-isinstance-probe-fixed.ts` and `contract-isinstance-probe-structural.ts` and the gate run `isinstance-fix-2-gates.log.txt`; the checkout's files (`src/core/validators.ts`, `src/core/combinators.ts`, `src/core/types.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/combinators.test.ts`, `tests/setup.ts`, `guides/contract.md`) and its `AGENTS.md` with the rules it links; TypeScript's `lib.es5.d.ts` for `Function` and `FunctionConstructor`.

## What the round decides

Whether the fix publishes as `@orkestrel/contract` 0.0.18.

## Already established — do not re-run

Verified by the Orchestrator directly in the checkout (`isinstance-fix-2-gates.log.txt`): the status lists exactly the three files; `npm run check` exits 0; the scoped oxlint and oxfmt checks pass; `npm run test:src` passes 1361 tests in 19 files; `npm run test:guides` passes 48 of 48; `npm run build:src:core` exits 0 and the emitted declaration equals round 1's; under the `=> unknown` constraint `npm run check` fails with exactly the parity and `AnyConstructor` assertions' `TS2344` diagnostics and `validators.ts` was restored byte for byte; the consumer probe against the built declaration compiles every accepted line and refuses the non-constructor once; the structural probe compiles clean. The unit's stop (the brief's criterion 6 wrongly expected the `Function` assertion to fail under `=> unknown`) is ruled in the report: the edits are complete as briefed.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-audit-claims-2.md`, attempting refutation of each; claims 1, 2, and 3 are the ones your lane decides, and on 4 you rule from the source. For claim 2, read each sentence against the declarations and the probes and name any sentence that is still false or overstated; for claim 3, name any wrong signature (the published intersection, the constraint dropped, the return widened, the `=> unknown` constraint) every proof would still pass under. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code or the compiler contradicts.

## Unknowns

1. Whether the comment's "or causing a contained `TypeError`" is true: with `isFunction` removed, does a non-callable object right-hand side throw a `TypeError` that `holds` contains (answering `false` either way), so that the check changes only the `Symbol.hasInstance` case: rule from the specification's `InstanceofOperator` steps and say whether the sentence needs a word.

## Law

`C:/Users/mikes/WebstormProjects/contract/AGENTS.md` and the rules it links; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
