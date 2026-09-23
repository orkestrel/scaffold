# B-FORMS-LABEL-SHOW (`bfw`) audit — reconciled verdict

Round: rounds 1 and 2 of `bfw` (`b-forms-label-show-brief.md`, `-brief-2.md`; reports `-report.md`, `-report-2.md`) over `bfw.diff` and `bfw-status.txt` against `dd855e9`. Lanes: `analyst` on GPT-6 Astra (objective; `bfw-audit-analyst-verdict.md`, session `01a0cdc2-cf93-7241-939e-b81d13612931`), `reviewer` on Opus 5.5 (subjective; `bfw-audit-reviewer-verdict.md`), `checker` on Sonnet (mechanical, claims 1, 3, 4, 7, 8; `bfw-audit-checker-verdict.md`). Every lane ran; every citation sampled resolves in the file it names.

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED (the `.container-fluid` wrapper is an ancillary framing choice) | CONFIRMED (the wrapper is the right frame; the Layout specimens set the precedent) | — | holds; the wrapper stands |
| 3 | CONFIRMED | CONFIRMED (order mutation distinguished by `Showcase.test.ts`) | CONFIRMED | holds |
| 4 | CONFIRMED (the `legend` mutation executed in memory) | CONFIRMED | CONFIRMED (the regex evaluated by hand) | holds |
| 5 | CONFIRMED (browser mutations not rerun in the lane) | CONFIRMED (each mutation traced to the assertion that distinguishes it) | — | holds; the positional slices are a readability note, not a defect |
| 6 | CONFIRMED (bounded to the recorded Chromium runs; restoring the earlier starts reproduces the date-control obstruction) | UNRESOLVED (rests on the writer's run; an undershoot is caught only by the traversal assertion) | — | holds on the analyst's reading: the traversal assertion is the guard, and a start on a date field reaches the date input twice and stops, which is the obstruction the round-1 report recorded; the integrated journey run at landing (the regeneration of every variant) is the settling evidence and is part of the landing procedure |
| 7 | CONFIRMED | CONFIRMED | CONFIRMED | holds for the § Showcase sentence; the stem rows are ruled out by the referral ruling that follows |
| 8 | BROKEN (`for`, `id`, `aria-describedby` in the doc block; `for` in the section proof; `legend` in the registry comment) | BROKEN (the same doc block and proof sites; recast the "every control announces" clause to the labelled controls) | BROKEN (the doc block) | broken; the exact text is fixed at landing as an integration edit (`bfw-integration.py`, retained as `bfw-probe-bfw-integration.py`), verified by the landing checker |

## Rulings on the referrals

- **The § Tests stem table.** The table lists the stems the CL13 round shot against the Bootstrap 5.3.8 counterpart portfolio, as its introduction states, and no forms key added after that round has a row in it. The label key takes none either. The stem rows `bfw` returned are not landed; `bfl`'s guide integration carries the § Showcase sentence alone, and its brief drops the "Tests rows" clause before dispatch.
- **Ruling E's date control in the legend row.** The ruling stands: the legend specimen is a date control by design, and the two-Tab start with the focus assertion is the least machinery the installed walk allows. Recorded as an observation; no unit.
- **The `FORM_CHECK_SPECIMENS` doc block's bare `id` token** (`app/browser/constants.ts` around line 1041) predates the unit. Carrier: B-PASSIVE-CLOSE-B, recorded in `ROADMAP.md` § Carriers at the bfw fold.
- **`npm run check`** exited 0 in the analyst's lane.

VERDICT: FAIL 8; outside the claims: none — fixed at landing as an integration edit, verified PASS in `bfw-landing-checker-verdict.md`
