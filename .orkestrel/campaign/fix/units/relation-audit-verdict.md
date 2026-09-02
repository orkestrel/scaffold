# Audit verdict — unit breaking-relation

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `e675bd0` (`units/relation.diff`,
`units/relation-report.md`). The subjective lane did not run: one union reshape, one rename, and
two carriers, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s17-10, s17-11 rename half, the s17-09/s17-13 carriers) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name (`models` survives only as the English noun); the five arms in `types.ts` and published | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (the union discriminated on `relationship`, `#through` narrowed to its arm, no `?? ''`, the Types row's kind change, the `extends` break stated) | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and the narrowing fence; `INTERNAL` empty | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | CONFIRMED on the quoted commands | GREEN (235 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

The requested findings: the union's five arms cover every relationship the resolver produces and
narrow on `relationship` without a cast; the extends-parity carriers are vacuous here because no
behavioral interface extends another. No fix-up.

Recorded for the next change: the pre-existing count at `src/core/types.ts:23` ("The five
relation shapes.") beside the two the report names; the helpers file's mixed TSDoc voice, which
the brief's "where you touch a block" scoping produces and the voice wave closes.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for every row. Tip packed: `relation-e675bd0.tgz`.
