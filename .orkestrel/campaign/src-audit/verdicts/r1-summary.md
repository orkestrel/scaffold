# Verification round 1 summary (slices s12-s18, 2026-08-28)

Workflow `wf_2ce5d3a7-015`: two blind Claude Opus 5 lanes per package group (objective
refutation, subjective exception-hunt), one fleet-wide TSDoc convention lane, and an xhigh judge
on every lane disagreement. Every agent completed; no lane returned empty. Full compact verdicts:
`r1-verdicts.json`. Full per-lane rulings with evidence: `r1-lanes.json`.

## Outcome over the 273 findings

- DRIFT, repair stands: 133
- DRIFT-RESHAPE, violation real but the proposed repair corrected: 76
- INVALID, finding misreads the code or the rule: 50
- EXCEPTION, deliberate with citable evidence: 14
- Lane disagreements resolved by judges: 102

The original audit lanes had ruled 258 CONFIRMED and 15 EXEMPT. Verification overturned or
reshaped roughly half of that: only 133 repairs survive as written, and 64 findings produce no
fix work at all. Several EXEMPT rulings were also flipped to DRIFT (for example the tally-count
exemption in interpret, s12-42, where the judge held that a TSDoc rationale is not an exemption
source against the canon).

## Fleet-wide convention rulings (dedicated lane)

- **First-sentence voice: DRIFT, high.** The rule text is literal ("third person with an `-s`
  verb"); the fleet measures 1507 imperative to 442 third-person with the canon repository itself
  at 116 to 7, no migration commit, and no gate. Per-package fixes are selective enforcement; the
  ruling requires one fleet-level decision — migrate the fleet or amend the rule.
- **Boolean `@returns` form: DRIFT, medium.** The rule prescribes the exact "True if …; false
  otherwise" wording; only the all-third-person packages use it.
- **`@example` import specifiers: INVALID, high.** The findings claiming `@src/*` aliases in
  TSDoc examples are drift misread the rule: the cited text governs guide fences, not TSDoc
  `@example` blocks. Every per-group finding of that class is overruled accordingly in the
  reconciliation.

## Standing

These verdicts are the round-1 half of the consolidated record. Round 2 (slices s01-s11,
workflow `wf_bc8d51eb-52f`) runs on identical terms; the h12 supplement is already ruled in
`../h12-audit-verdict.md`. The consolidated fix inventory, exception register, invalid register,
and the fleet-level decisions gate on round 2.
