# J-SAMEWAY-ENGINES-B round 5 — audit verdict, with round 6's close (2026-09-25)

**Subject.** Veneer `4c9a7dd` on `unit/engines-b` over `3bb9afb`. The claims are `units/j-sameway-engines-b-audit-claims-5.md`, and the replay is `units/j-sameway-engines-b-replay-5.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d784-7898-7960-94d9-2d016a067d37` (`units/j-sameway-engines-b-audit-5-objective-verdict.md`): `VERDICT: FAIL 3`. Opus 5.5 wrote the round, so this lane is the cross-engine auditor.
- **Subjective:** not run. The round changed four test comments and no code, type, or name. The objective lane read the comments' claims against the measurements.
- **Checker:** not run. The replay counts the loop reports mechanically.

**Rulings.**
- **Claims 1, 2, 4, and 5: CONFIRMED.**
  - Each wait drains a report that appears without it.
  - A native-only reproduction reports the loop with no Veneer code, which establishes the tested scenarios.
  - The HTML rendering algorithm and the ResizeObserver processing model explain the waits without any feedback.
  - Only comments changed.
  - The lane also ruled that a consumer can meet the same report through shipped engines alone. That is platform scheduling to document, not a breach of E35's invariant.
- **Claim 3: FAIL.** The report's inventory named `data-popper-placement` where the fixtures configure `data-x-side`. More important, the recorder cannot prove that no callback changes an observed size:
  - it measures each watched element's border box, where `Placement` observes the content box;
  - it brackets writes synchronously only, so a write queued in a microtask escapes it.

  The comments stated "although no callback changes an observed size", which claims more than the measurement shows.

**Round 6 closes the finding without a fresh audit round.** The unit is `units/j-sameway-engines-b-brief-6.md`, run by `builder` on Sonnet, and the commit is `13d4aae`. It adopts the lane's prescription as written, which is to stop presenting the recorder as a proof of no feedback. The clause is deleted from each of the four comments, and nothing else changes (`units/j-sameway-engines-b-6.diff`). The Orchestrator checked three facts:
- every changed line is a comment;
- a search for the clause in both files returns nothing;
- `lint:check` and `format:check` exit 0, per the round's report.

`.claude/rules/quality.md` § Rounds and verdicts lets a fix that adopts the auditor's prescription verbatim close without a fresh round. A comment has no mutation, and the diff check stands in for one.

**The unit closes, and the frame waits are a documented platform behaviour, not an engine defect.** The two release defects the round-4 and round-5 lanes restated are carried by J-RELEASE-POPUPS under E35: the replacement path's lost reach, and the discard's `tip.id` read. J-SAMEWAY-ENGINES-B lands next.

VERDICT: FAIL 3
