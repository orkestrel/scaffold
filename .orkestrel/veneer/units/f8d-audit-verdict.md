# F8d IMPORTANCE-LONGHANDS audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `f8d-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`f8d-audit-analyst-verdict.md`, session `01a0ccb1-4910-7351-8ec9-0105a3093c82`, FAIL 3, 4, 5, 6; outside the claims O1),
`reviewer` on Opus 5.5 (`f8d-audit-reviewer-verdict.md`, FAIL 3, 4, 5, 6, 7; two referrals), and
`checker` on Sonnet (`f8d-audit-checker-verdict.md`, FAIL 6). Every lane ran; none empty. The writer
was Opus, so the objective lane on Astra is the auditor that did not write the work.

## Rulings per claim

1. **CONFIRMED** (both lanes; the analyst probed the helper with the per-name mutation and the
   unrelated-property input).
2. **CONFIRMED** (both lanes; the unmatched name maps to an empty list, which the guard keeps from
   covering vacuously).
3. **UNRESOLVED** (both lanes): the proof distinguishes a withheld priority and a wrongly important
   normal declaration; Chromium's declaration order rests on the writer's measurement. Settled at
   the landing by the Orchestrator's run of `npm run test:setup -- tests/setupService.test.ts`
   after `build:src:styles`, retained.
4. **UNRESOLVED** (both lanes): the failing-first counts are the writer's; the fix round re-runs the
   consumer proof with and without the per-name plant and the Orchestrator's chain settles it.
5. **BROKEN** (both lanes): `LonghandRule` and `StageRule` declare one contract twice (the brief's
   conditional design allowed it, wrongly). Carrier: the fix round keeps `LonghandRule` as the one
   declaration, imports the type into `tests/setupService.ts` along the existing direction, and owns
   `tests/service/tailwind/preflight.test.ts` for its import.
6. **BROKEN** (all lanes): "two sheets" and "both longhands" count without naming, the ordinal "A
   second plant", the bare `col-1` token, and the rule restated at three sites; the consumer proof's
   comments carry the same counts. Carrier: the fix round.
7. **CONFIRMED** (the analyst's `npm run check` exited 0 with an AST inspection; the reviewer's
   reading agrees; the reviewer's UNRESOLVED was the run it could not take).

## Findings outside the claims and referrals

- **O1** (analyst): the longhand mapping the two `collectImportantNames` cases share sits in the
  proof rather than the setup module (`tests.md` on shared fixtures). Carrier: the fix round.
- **Referral** (reviewer, the analyst's cardinality note agrees): a `rule.properties` mutant escapes
  both unit cases; the "keeps a name out…" case takes a control rule declaring a name's every
  longhand normally. Carrier: the fix round.
- **Referral** (reviewer): the `arrayContaining` assertion in the branch case cannot fail once the
  branch membership holds. Carrier: the fix round removes it.

Every finding has a carrier; nothing dropped without record.

VERDICT: FAIL 3, 4, 5, 6; outside the claims: O1
