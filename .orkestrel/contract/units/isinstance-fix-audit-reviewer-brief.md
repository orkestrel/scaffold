# ISINSTANCE-FIX audit — the objective lane's brief, held by `reviewer` on Opus 5.5

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; this round you hold the **objective** lane, because GPT-6 Astra wrote the unit and the lanes swap so the auditor of the correctness questions is an engine that did not write it: the signature's correctness against the compiler's semantics, the proofs' binding, and the consumers. State your lane in your first line and the model the alias served. The subjective lane runs blind on Astra after you; do not hedge toward an imagined consensus.

## Subject

The ISINSTANCE-FIX unit's uncommitted edit set in `C:/Users/mikes/WebstormProjects/contract` (`main` at `743e4a3`, version 0.0.17), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-brief.md` (F1 to F3). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix.diff` and status `isinstance-fix-status.txt`; the report `isinstance-fix-report.md`; the synthesis `isinstance-round-1-synthesis.md` and the refuters' probes `isinstance-round-1-refute-A.md`, `-B.md`, `-C.md`; the Orchestrator's probes `contract-isinstance-probe.ts` and `contract-isinstance-probe-fixed.ts` with the gate run `isinstance-fix-gates.log.txt`; the checkout's files (`src/core/validators.ts`, `src/core/combinators.ts`, `src/core/types.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/combinators.test.ts`, `tests/setup.ts` around lines 3397 to 3420, `guides/contract.md` around line 126) and its `AGENTS.md` with the rules it links.

## What the round decides

Whether the fix publishes as `@orkestrel/contract` 0.0.18, the version every consumer that narrows through `isInstance` re-pins to; the Veneer engine's binder mechanisms are the first such consumer.

## Already established — do not re-run

Verified by the Orchestrator directly in the checkout (`isinstance-fix-gates.log.txt`): the status lists exactly the three files; `npm run check` exits 0; the scoped oxlint and oxfmt checks pass; `npm run test:src` passes 1357 tests in 19 files; `npm run test:guides` passes 48 of 48; `npm run build:src:core` exits 0 and `dist/src/core/index.d.ts` declares the new signature; the consumer probe against the built declaration compiles every accepted line and refuses the non-constructor line with exactly one `TS2345`. The published signature's defect was measured before the fix (`contract-isinstance-probe.ts`: `TS2740` on the `Element | null` narrowing).

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-audit-claims.md`, attempting refutation of each; claims 1, 2, and 4 are the ones your lane decides, and on 3 and 5 you rule from the source. For claim 2, say for each compile-time proof which mutation of the signature (the published intersection restored; the constraint dropped; the return widened to `object`) it would catch, and name any proof that passes under a wrong signature. For claim 4, name any consumer pattern in the fleet sweep the constraint or the narrowing could break that the probes did not model. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code or the compiler contradicts.

## Unknowns

1. Whether `Expect<Equal<{} extends Parameters<typeof isInstance>[1] ? true : false, false>>` proves the constraint or only that `{}` fails a construct-signature check any constraint would impose: rule, and say what a stronger proof would assert.
2. Whether the remark's sentence "a `Function`-typed value ... refused at the call" is true of the compiler (`Function` has no construct signature in the DOM and ES libraries) and whether `FunctionConstructor` (the value `Function` itself) is accepted, since it declares construct signatures returning `Function`: rule from the declarations.

## Law

`C:/Users/mikes/WebstormProjects/contract/AGENTS.md` and the rules it links; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
