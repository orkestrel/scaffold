# LEDGER-ADDITIONS audit round 2 — verdict

The Orchestrator's reconciliation of the second audit round over LEDGER-ADDITIONS round 2, on one claims file
(`lad-audit-2-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`lad-audit-2-objective-verdict.md`, journal
`tmp/codex/lad-audit-2-analyst.jsonl`), and the subjective lane, `reviewer` on Opus 5.5
(`lad-audit-2-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran
on an engine that did not write the work. No checker ran: no claim is a mechanical count or path.

**Verdict: FAIL 1, 7; outside the claims: N1, N2.** Claims 2 to 6, 8, and 9 are CONFIRMED by both lanes; the objective
lane also executed the table writer's rejection guard, which closes the reviewer's referral B.

- **Claim 1 (objective BROKEN, subjective CONFIRMED).** The reader tests the raw spelling of the function name, so the
  valid escaped spelling `:\77 here(.nav-link)` returns `[]` where the contract says `['nav-link']`; the objective lane
  ran the live helper on it. The shipped cascade is unaffected, because Sass writes the function name plainly, but the
  helper is exported and states that contract. The function name is decoded through the module's identifier reader
  before it is recognised, and a case asserts the escaped spelling.
- **Claim 7 (subjective BROKEN, objective CONFIRMED).** The ownership paragraph says attribution reads an `:is()` or
  `:where()` class "because that argument matches the element the rule matches". That is false for
  `:where(.carousel-indicators [data-bs-target])`, whose argument is a complex selector, and for the two carousel
  control alternatives. The citations resolve (`guides/veneer.md`, the § Additions ownership paragraph). The objective
  lane confirmed the attribution, not the reason; the reason is replaced.
- **N1 (subjective), accepted.** In CSS the subject of a selector is its last compound; `collectSubjectClasses` returns
  classes from every compound (`':is(.alpha, .beta) > .gamma'` returns all three), and its summary and first remark
  repeat claim 7's false reason. The helper is renamed and its TSDoc rewritten.
- **N2 (subjective), accepted.** `matchSelectorKey`'s `@param classes` names `collectSelectorClasses`, where its only
  production caller passes the renamed reader's output.
- **Referral A (subjective), dropped on the record.** The objective lane reproduced the sweep's selector population with
  an independent Sass compile, and Sass writes each function name in lower case.

## Carrier

LEDGER-ADDITIONS round 3 (`ledger-additions-brief-3.md`, `opus` on Opus 5.5).
