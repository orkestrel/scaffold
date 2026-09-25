# LEDGER-ADDITIONS audit round 3 — verdict

The Orchestrator's reconciliation of the third audit round over LEDGER-ADDITIONS round 3, on one claims file
(`lad-audit-3-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`lad-audit-3-objective-verdict.md`, journal
`tmp/codex/lad-audit-3-analyst.jsonl`), and the subjective lane, `reviewer` on Opus 5.5
(`lad-audit-3-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran
on an engine that did not write the work. This is the seam's third round, so the Orchestrator rules the fix.

**Verdict: FAIL 3, 4.** Claims 1, 2, and 5 to 7 are CONFIRMED by both lanes; the objective lane executed the decoded-name
recognition against escaped, upper-case, and non-ASCII spellings.

- **Claim 3 (subjective BROKEN, objective CONFIRMED).** `collectMatchingClasses` promises the classes an element matching
  the selector carries. For `.item:nth-child(2 of .row)` the matching element must carry `.row`, and the reader returns
  only `['item']` (`tests/setupServer.test.ts`, the reading case); the only reading under which the name holds for every
  pinned input rests on `:is()` having once been drafted as `:matches()`, which a consumer cannot predict
  (`.claude/rules/names.md`, the predictability rule). The objective lane confirmed the code, not the name's
  predictability, which is the subjective lane's to rule. Ruling: the reader is `collectAttributionClasses`, named for
  what it collects — the classes attribution reads a selector by — which is true of every input by definition.
- **Claim 4 (subjective BROKEN, objective CONFIRMED).** The summary "Collects every class a selector writes, reading
  through `:is()` and `:where()` arguments." includes the `:not()` classes the reader's own `@returns` and `@example`
  exclude. The Orchestrator prescribed that sentence in `ledger-additions-brief-3.md`; the unit followed it. Ruling:
  "Collects every class a selector writes at its own level or inside an `:is()` or a `:where()` argument."
- **Referral A (subjective), dropped on the record.** No assertion pins the name-ends-at-the-parenthesis check; the only
  input that tells it apart, `:is/**/(.x)`, is not valid CSS, and the shipped cascade never writes it.
- **Referral B (subjective), closed.** The objective lane executed `:iſ(.hidden)` and the reader rejects it.

## Carrier

LEDGER-ADDITIONS round 4 (`ledger-additions-brief-4.md`, `builder` on Sonnet): the rename and the summary, verbatim;
then a `checker` read.
