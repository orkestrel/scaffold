# ISINSTANCE-FIX audit round 2 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the ISINSTANCE-FIX unit's rounds 1 and 2 as one uncommitted edit set in the contract checkout, claims file `isinstance-fix-audit-claims-2.md`. Lanes that ran on that one file: the objective lane, held by `reviewer` on Opus 5.5 because Astra wrote both rounds (`isinstance-fix-audit-2-reviewer-verdict.md`, terminal line `FAIL 2; outside the claims: none`); the checker on Sonnet (`isinstance-fix-audit-2-checker-verdict.md`, `PASS`). The subjective lane was not run on this round, as the round-1 verdict recorded in advance: every round-2 sentence adopted a lane's own wording or a measured fact. Every citation checked below resolves in the file it names. The Orchestrator's settling probe after the lane returned (`contract-isinstance-probe-subtype.ts`, against the built declaration): a subclass adding only an optional member (`Tagged extends Base { readonly tag?: string }`) is assignable from `Base` (the control compiles) and the false branch of `isInstance(value, Tagged)` over `Base | null` is `Base | null` under the identity `Equal`, so the compiler drops a union member by subtype and not by assignability, as the lane derived from the checker's `getNarrowedTypeWorker`.

## Per-claim rulings

1. **CONFIRMED**: the comment's runtime reason is exact against ECMA-262's `InstanceofOperator` steps (a non-callable right-hand side either consults its `Symbol.hasInstance` handler or throws a `TypeError` that `holds` contains; the check prevents both); the body and the emitted declaration are unchanged from round 1.
2. **BROKEN**, on one word: "assignable to the instance type" overstates; the compiler drops each member of the declared union that is a subtype of the instance type. Ruling: the sentence says "subtype", keeping the structurally identical subclass as the named case; the Orchestrator's probe confirms the lane's counterexample. Every other remark sentence held on the lane's attacks.
3. **CONFIRMED**: the parity and refusal assertions catch the published intersection, the dropped constraint, the widened return, the `=> unknown` constraint (the Orchestrator's mutation run), `new` for `abstract new`, and `abstract new (...args: any) => object`; the residual (`isInstance` and `instanceOf` both changed to `=> {}`) needs an edit to `combinators.ts` and separates `{}` from `object` only for a construct signature returning a primitive, which no class produces; recorded, not a failure.
4. **CONFIRMED**, the lane and the checker.

## Bounds ruled

- "its own `Symbol.hasInstance`" can read as an own property while the lookup reaches an inherited handler: adopted; "its `Symbol.hasInstance`".
- "returning an object" omits a construct signature returning `any`: adopted; "returning an object (or `any`)".
- The relative import of `instanceOf` beside the barrel imports in the same test file: adopted; import from the `@src/core` barrel as the file's other combinators do.

## Carrier

Claim 2's word and the three bounds are carried by ISINSTANCE-FIX round 3 (`units/isinstance-fix-brief-3.md`, `sol` on Astra, the same tree), each an adoption of the objective lane's own wording or a measured fact; the round-3 audit is the checker over the exact sentences plus the Orchestrator's own gates, probes, and mutation check, the objective and subjective lanes not re-run for the reason this verdict records. The release follows that pass. No finding is dropped.

VERDICT: FAIL 2; outside the claims: none
