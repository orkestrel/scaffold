# CL4 audit verdict — the remaining Reboot tags and the `reboot` key

Subject: unit CL4 in Veneer over the base `d822d59` (the CL3b landing), written by `sol` on
Astra under six briefs: `units/cl4-brief.md` with `units/cl4-brief-2.md` (the scope read's
corrections and the scan's mechanics), and the Orchestrator's rulings on its four deviation
stops, `units/cl4-brief-3.md` to `units/cl4-brief-6.md`. Reports: `units/cl4-report.md` to
`units/cl4-report-4.md` (the stops) and `units/cl4-report-5.md` (completion). Scope read:
`units/cl4-scope-read-report.md`. Terrain: `units/cl4-scout-report.md`. Claims:
`cl4-audit-claims.md`. Evidence: `units/cl4-diff.patch.txt`, `units/cl4-status.txt`.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl4-audit-analyst-report.md`, thread `01a0c478-bb03-7802-915c-e776b619abe2`, exit 0;
Astra wrote the unit, so the lanes sit as CL3's did); reviewer on Opus 5 holding the OBJECTIVE
lane (`units/lane-cl4-reviewer.md`, workflow `wf_8a769c99-934`); checker on Sonnet
(`units/lane-cl4-checker.md`); verifier on Sonnet (`units/lane-cl4-verifier.md`) over
`units/cl4-gate-brief.md`.

| Claim | Analyst (subjective, Astra) | Reviewer (objective, Opus) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 the key ships, the scan proves it | CONFIRMED (executed the live readers and scanner in memory; removing `b` from the in-memory cascade returned exactly that missing selector) | CONFIRMED (checked every non-excluded inventory name against the built cascade by hand) | CONFIRMED | `test:conformance` exit 0 |
| 2 partials, one bare tag each | CONFIRMED (ran the selector and physical-axis predicates against the built CSS: empty defect lists) | CONFIRMED (the guards genuinely admit every new selector, and each expanded physical longhand has its opposite twin) | CONFIRMED | — |
| 3 values bound or retained, each named | CONFIRMED | CONFIRMED (every calibrated value traced to its record row and every retained one to Bootstrap's own line, including the legend's responsive size at two widths) | — | — |
| 4 ten exclusions, each absent | CONFIRMED (planting `legend + *` inside nested layer and media rules returned exactly the excluded-name message) | CONFIRMED (each name traced to its inventory entry; a sweep of the built cascade returns nothing) | CONFIRMED | — |
| 5 the canonicalization cannot mask an absence | CONFIRMED | CONFIRMED (read both rewrite branches and looked specifically for a masking pair; `*|*::before`, `.\*::before`, `*:focus`, and `:not(:before)` are all untouched) | CONFIRMED | — |
| 6 mirrored proofs | CONFIRMED | CONFIRMED (checked each proof against its partial's declaration set) | — | — |
| 7 the section renders the families | CONFIRMED | CONFIRMED with an inaccuracy in the claim: that file carries no count assertion, and its name and markup assertions compare the table against itself, so the tag sequence is the only independent control | — | — |
| 8 the conformance cases keep their subjects | CONFIRMED | CONFIRMED (swept every ledger call in the file independently) | CONFIRMED | — |
| 9 scope, law, gates | UNDECIDABLE on the gate half | CONFIRMED on scope and law; gate half report-only | CONFIRMED on scope and law; gate half UNRESOLVED | every step exit 0, no non-zero exit |

Reconciliation. Every claim is CONFIRMED by every lane that could rule on it, and the verifier's
eighteen steps close the gate half the other three left open. Claim 7's wording is corrected
against the claim: there is no count assertion, and the independent control is the tag sequence.
Three findings force a fix round and two do not.

Findings:

- **Reviewer 10 (forces the round).** `src/styles/elements/_fieldset.scss` hardcodes
  `@media (width >= 1200px)` where CL2 landed `breakpoint-up` over the single Sass source of the
  ramp, so `1200px` now appears twice under `src/` and a retune of the ramp would move the
  published token while leaving the legend's step behind, with no gate comparing them. Ten other
  partials already load the mixins, so this closes inside the unit's own file.
- **Analyst 10 and reviewer 11 (the same defect, forces the round).** Two declaration patterns
  are repeated verbatim across partials with no mixin: the control reset in `_input.scss`,
  `_select.scss`, `_optgroup.scss`, and `_textarea.scss`, and the border reset in `_table.scss`
  and `_tr.scss`. The styles rule moves a pattern shared by two partials into `_mixins.scss`,
  and the repository already applies it to this class through `code-text`, `script-text`, and
  `list-space`. Needs a `_mixins.scss` grant.
- **Reviewer 12 (forces the round).** `button:focus:not(:focus-visible) { outline: 0 }` ships
  with no value proof: the button proof's outline reading is taken after the button has become
  focus-visible, which is the state that rule excludes, so changing its value leaves every gate
  green while only the presence scan guards the selector. Brief 1 requires every partial's
  values proven.
- **Reviewer 13 (carried into the round, cheap).** Two silent departures from values the report
  calls retained: `colgroup` is added to Bootstrap's border-reset group, and `th` keeps
  `text-align: inherit` without Bootstrap's `-webkit-match-parent` fallback. Both are inert on
  the managed receipts; record each as a departure row or match Bootstrap.
- **Reviewer 14 (observation, no action).** The `::-moz-focus-inner` exclusion means the
  published cascade ships no Gecko inner-focus repair where Bootstrap's does. Recorded so the
  exclusion's product cost is on the record beside its proof cost, and reported to the user with
  the family's open questions.
- **Reviewer's note on claim 7 (carried).** `ContentSection`'s name and markup assertions read
  the specimen table against itself. The next unit that owns that proof gives them an
  independent control, as the tag sequence already is.

### Findings carried into the fix round (`units/cl4-brief-7.md`)

1. Reviewer 10: `_fieldset.scss` reads `breakpoint-up(xl)`.
2. Analyst 10 and reviewer 11: both shared patterns into `_mixins.scss`, with a sweep of every
   partial pair in the folder.
3. Reviewer 12: a value proof for the non-visible focus rule.
4. Reviewer 13: the two departures recorded or matched.

### Terminal (round 1)

Verdict: fix round. `units/cl4-brief-7.md` on Astra (the writer); the Opus reviewer stays the
objective auditor; round 2 runs all four lanes.
