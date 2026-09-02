# Audit verdict — unit breaking-qualifier

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `3db5005` (`units/qualifier.diff`,
`units/qualifier-report.md`), then the fix-up at `a8f71dc`. The subjective lane did not run: one
alias removal, one context type, and the `describe*` renames, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s16-27, s16-30, s16-32, the Carry ruling) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; `QualifierErrorContext` in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (`describe*`, `findRule` kept, the context on every site, the alias gone with its guide row and test block) | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and fences; executed assertions for the context | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | CONFIRMED on the quoted commands | GREEN (349 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

Objective terminal line `FAIL 7` reads UNRESOLVED on the gate claim, which the verifier settles.

Findings and their closure: F1 (the `QualifierError` remark mapped `context.definition` to every
`DEFINITION` while `mapEngineError` raises a `DEFINITION` carrying `{ pass, cause }`) — closed by the
Orchestrator's direct edit to `src/core/errors.ts`, stating that `context.definition` is present only
on the `DEFINITION` that `qualify`'s own validation raises and that an engine-mapped `DEFINITION`,
`DESTROYED`, or `ENGINE` carries `pass` and `cause`; the referral (the guide instructs a consumer to
narrow with `isReasonValidationResult` and no executed assertion backed it, and the removed
validators case was the only pin) — closed by reinstating
`expect(isReasonValidationResult(validation)).toBe(true)` in `tests/src/core/Qualifier.test.ts`
beside the exact-record pin. F2 (the substitution loses no field) and F3 (one context shape) stand
as findings with no change. Both edits are Orchestrator-owned; the fix-up commit `a8f71dc` landed
with the full chain green (`instruments/land-fixup.mjs`, log `land-fixup.log`: format:check 0,
lint:check 0, check 0, build 0, test 0), so the gate evidence for the fix-up is the Orchestrator's
independent run, not the writer's.

Recorded for the next change: the untouched TSDoc voice outside the touched blocks (the voice
wave); the `README.md` link to `guides/src/qualifier.md` (fleet-wide, carried by the W-END
`readme-links` sweep).

Terminal lines: objective PASS on the claims it held with the gate claim settled by the verifier;
checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes **applied** for every row. Tip
packed: `qualifier-a8f71dc.tgz`.
