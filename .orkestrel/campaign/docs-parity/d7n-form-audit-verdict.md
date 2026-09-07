# Audit verdict — form (P.1 and P.2)

Workflow `wf_60dfdb35-f31` (the form slice), 2026-09-07: the subjective lane (`reviewer`, Opus 5) `FAIL 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 12`, the checker (Sonnet) `PASS`; lanes retained as `d7n-form-audit-{subjective,objective,checker-form}.md`. Every claim but 12 PASS on every lane (claim 11 CANNOT RULE on the subjective lane, PASS on the objective lane's attribution; the closure's `verifier` settles it); claim 12 fails on the reports' counts alone (annotated).

## Findings carried into the fix round (`d7n-form-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| F1 | The `### Constants` table has no `Shape` column and the budget literals left the cells for section prose; the ancillary decision cited Ruling 15's trigger and reached neither Ruling 18 nor the brief's own sentence | subjective F1, objective F1 and F2 |
| F2 | The `### Guards` table has no `Shape` column while Ruling 15's guard sentence presupposes it | subjective F1, objective F5 → Ruling 20 |
| F3 | `## Controls`'s `Its own options` column restates the members the `Shape` cells hold | subjective F2 |
| F4 | "Contract 10 states:" and "Contract 4 states" name a list item by its position | subjective F3 |
| F5 | The `clear` row reads an outside reference to a row the reader is inside (`FormInterface.baseline`) | subjective F4 |
| F6 | The opening paragraph leads with a negative and puts its thesis second | subjective F5 |
| F7 | `FormInterface`'s description and `Form`'s read circularly | subjective F7 |
| F8 | `fill`, `disable`, `enable` rows state one overload's behaviour as the method's | objective F4 |
| F9 | The drop-in departs from the pilot's bytes: `/Interface$/u`, `resolveRoot(import.meta)` | objective F3 → Ruling 20 |

## Rulings and carries

- Ruling 20 settles the referrals: the convention sentence sits once per table that carries the column (form's three under three headings are the form); a dedicated guard table heads `Shape`; the drop-in's bytes are the pilot's, a package's own cases appended.
- The reports' counts and placeholder gate lines are annotated; the P.2 unit's instruments (`cells.py`, the `step1` to `step10` scripts) are retained under `instruments/d7/units/form/` (objective F6).
- Claim 3's `@orkestrel/guide` range question (subjective R3) is the campaign's standing condition: every checkout re-pins after the guide publishes (Ruling 8).

The fix round dispatches to the Opus `implementer`; the closure runs `checker` over the fix and `verifier` over the whole chain against the final tarball.
