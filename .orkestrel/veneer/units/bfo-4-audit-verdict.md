# B-FORMS-CONTROL round-4 audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfo-4-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfo-4-audit-analyst-verdict.md`, session `01a0ccef-adc6-7e53-a335-501f34367fa9`, journal swept
at acceptance; PASS), `reviewer` on Opus 5.5 (`bfo-4-audit-reviewer-verdict.md`, FAIL 3 on the
`npm run check` exit code it cannot produce), and `checker` on Sonnet
(`bfo-4-audit-checker-verdict.md`, PASS). Every lane ran; none empty. The writer was `builder` on
Sonnet, so both Opus and Astra are auditors that did not write the work.

## Rulings per claim

1. **CONFIRMED** (all three lanes): the delta is the two prescribed edits inside the
   `FORM_CONTROL_CASES` remark and nothing else; the status is the round-3 set.
2. **CONFIRMED** (both lanes; each attacked the sentence with an added `var()` declaration, which
   the Node case distinguishes, and an added literal declaration, which neither the Node case nor
   the recorded-value assertions read, and each read the sentence as claiming only the first).
   The reviewer's observation that the `FORM_RANGE_CASES` remark carries the round-3 overclaim
   ("separates a site holding Bootstrap's own value from one this package routed onto a token")
   is already carried: B-FORMS-CLOSE rewrites that remark with the per-property `reads` map
   (`ROADMAP.md`, the `FORM_RANGE_CASES` row) and copies the settled wording.
3. **CONFIRMED** (the analyst's `npm run check` exited 0 with an AST inspection of the additions
   and a runtime freeze reading; the reviewer's UNRESOLVED and the checker's reading close on
   that exit code; the claims file addressing the run to the objective lane is the reviewer's
   FAIL, dropped on the record).

## Findings outside the claims and referrals

None. Every earlier finding keeps its carrier (`bfo-3-audit-verdict.md`, `bfo-fix-audit-verdict.md`).
B-FORMS-CONTROL is accepted for landing on the session branch from `2c10329` with the integration
edits `bfo-integration.py` and `sort-inventories.py form-control` apply.

VERDICT: PASS
