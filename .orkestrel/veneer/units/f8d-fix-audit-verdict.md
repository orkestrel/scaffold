# F8d IMPORTANCE-LONGHANDS fix-round audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `f8d-fix-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`f8d-fix-audit-analyst-verdict.md`, session `01a0ccc3-5db7-7181-a2fd-55c8451f0faa`, journal swept
at acceptance; FAIL 5, 6), `reviewer` on Opus 5.5 (`f8d-fix-audit-reviewer-verdict.md`, FAIL 5, 6,
7 with one referral), and `checker` on Sonnet (`f8d-fix-audit-checker-verdict.md`, PASS on claims 5
and 7). Every lane ran; none empty. The writer was Opus, so the objective lane on Astra is the
auditor that did not write the work.

## Rulings per claim

1. **CONFIRMED** (both lanes): one `LonghandRule` declaration, the import direction
   `setupService` → `setupServer` only, no `StageRule` in the tree.
2. **CONFIRMED** (both lanes; the analyst's Node probe rejected writes to the frozen record and its
   arrays). The reviewer's observation stands: the freeze assertions sit in a behaviour case where
   the house pattern keeps them in the inventory case. Carrier: round 3 (edit 5).
3. **CONFIRMED** (both lanes; the analyst executed the extracted helper against the case inputs and
   the `rule.properties` mutant returned `['table']`).
4. **CONFIRMED** (both lanes) with the reviewer's referral upheld: replacing
   `longhands.get(name) ?? []` with `[]` leaves every remaining assertion green because the
   snapshots go empty. Carrier: round 3 (edits 2 and 3, the guard over each snapshot's keys, with
   plant A as its proof).
5. **BROKEN** (analyst and reviewer; the checker's CONFIRMED read the guide and the two consumer
   comments and missed the bare tokens the other lanes name). Sites: the consumer comments at the
   branch case and the partial-importance case, the `table` comment in `tests/setupServer.test.ts`,
   the `tests/setupServer.ts` header and the `LonghandRule` remark, and the guide's "a planted
   `!important` declaration" for a plant writing two declarations. The wording came from the
   round-2 brief, so the defect is brief-carried. Carrier: round 3 (edits 1, 4, 6, 7, 8, 9, the
   reviewer's exact sentences).
6. **UNRESOLVED** (both lanes: neither runs Vitest). Both lanes read the mutations as distinguished
   by the assertions (`important = properties`, `important = []`, the per-name plant). Carrier:
   round 3 records the settling runs (plants A and B, the `expand` proof) and the landing chain's
   `test:service` settles the green.
7. **CONFIRMED** (the analyst's `npm run check` exited 0 with an AST inspection of the changed lines;
   the reviewer's and the checker's readings hold the law and the scope). The reviewer's UNRESOLVED
   is the claims file addressing `npm run check` to the objective lane, dropped on the record.

## Findings outside the claims and referrals

- The reviewer's referral on claim 4 is carried under claim 4.
- The analyst's adjacent reading ("an empty required-longhand list remains uncovered") restates the
  `properties.length > 0` guard `collectImportantNames` already carries and claim 3's second
  mutation covers; no change.
- Dispatch defect recorded by the reviewer: the reviewer brief named `f8d.diff` as the whole diff
  where the claims file names `f8d-2.diff`; the lane ruled on `f8d-2.diff`. The round-3 briefs name
  every evidence path afresh.

Every finding has a carrier; nothing dropped without record.

VERDICT: FAIL 5, 6; outside the claims: none
