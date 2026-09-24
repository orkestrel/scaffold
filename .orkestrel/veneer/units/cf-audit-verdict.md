# Audit round 1 — FADE (`cf`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the FADE unit (`opus` on Opus 5.5 in `/home/user/veneer-cf` from `42fd88e`), claims file
`cf-audit-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst` on GPT-6 Astra
(`cf-audit-objective-verdict.md`, thread `01a0d1d7-6291-7272-8e2d-6dc9b86917a1`, journal
`tmp/codex/cf-audit-analyst.jsonl`); the subjective lane, `reviewer` on Opus 5.5
(`cf-audit-subjective-verdict.md`); and the checker on Sonnet (`cf-audit-checker-verdict.md`, claims 1,
6, and 7). The reviewer and the checker ran in workflow `wf_08be7f20-50c`. The Orchestrator's apply
checks: `cf-shared.patch` and `cf-offlimits.patch` each on a fresh `git archive 42fd88e` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by every lane.
2. **CONFIRMED** by both adversarial lanes; the objective lane compiled the patched barrel with the fade
   import omitted and moved after `collapse` as controls.
3. **CONFIRMED on the unit; the claim's wording is ruled.** The objective lane broke "each case reads
   computed values": the selector and declaration cases read the source's declared text through the CSS
   object model. The subjective lane read the same and ruled it a defect of the claims file, because the
   landed collapse proof reads the same way. D45 governs a value the browser serializes; a declared-text
   comparison is build-independent, and the M6 mutation shows the structural case catching a surface
   change the computed readings miss. Every mutation M1 to M8 reddens the shipped cases the log names,
   and both lanes confirm that each assertion distinguishes its mutation. The failing-first logs
   without the partial ran against an earlier revision of `fade.test.ts` (the subjective lane's
   referral: the case titles in those logs differ from the shipped ones). Carrier: F-d re-runs them
   against the shipped files.
4. **NOT-EVIDENCED for the frames, as the brief planned.** The brief made the capture the Orchestrator's
   observation at landing; the source, the placements, and the section proof hold under both lanes. The
   `fade-shown` and `fade-hidden` frames and their region readings are taken at FADE's landing, after
   PAGE-FRAME lands.
5. **CONFIRMED** by both adversarial lanes. The ladder probe is an instrument with no negative control;
   it records a reading and is no shipped proof.
6. **BROKEN (subjective lane).** The § Fade classes Tests sentence, the case title "fades each component
   the release animates", and the `FADE_COMPONENT_CASES` TSDoc claim every component the release fades,
   and the table holds the alert, toast, tooltip, and popover alone. The release fades a tab pane and a
   modal through the `fade` class (`bootstrap/js/src/tab.js`, `modal.js`), and so does the engine
   (`src/browser/types.ts`, the tab class map's `fade` member and the modal's `fade` token). The § Nav
   sentence "A tab pane stays hidden until it carries the `active` class" is true and incomplete: a
   faded pane stays transparent until the `show` class joins it. The objective lane and the checker
   confirmed the claim on the sentences they read and did not test the table against the release's
   plugins. Carrier: F-a.
7. **BROKEN** on the report by the objective lane and the subjective lane, and confirmed by the checker
   on the sites it sampled; the report is the round's record, accepted on the record. The code clauses
   hold under every lane.

## Findings outside the claims

- **F1 (subjective lane).** The paragraph the unit adds to the `CASCADE_KEYS` TSDoc states a registry
  rule for every key whose rule writes `opacity: 0` at rest, and the same block declines such keys (the
  resting tooltip, the toast carrying `showing`, the modal and offcanvas backdrops carrying `fade`
  alone). Carrier: F-b.
- **The names (subjective lane's referral to the Orchestrator).** The section passes `TRANSITION_COPY`
  and `TRANSITION_SPECIMENS` where every other section passes constants named for its own stem, and the
  unit's setup tables are `FADE_*`: one concept, two terms. The Orchestrator rules `FADE_COPY` and
  `FADE_SPECIMENS`, and keeps `transition` for the inventory key and its ledger rows; this amends X5's
  naming. Carrier: F-c. THEME's brief inherits the same rule for X11's `ColorModeSection`.
- **The report's diffstat (objective lane).** Per-file figures label changed lines as additions. The
  report is the record; accepted on the record.

## Carrier

Round 2 on the same `opus` subagent (`b-cross-cf-brief-2.md`) carries F-a to F-d. Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because F-a, F-b,
and F-c adopt that lane's findings with its recommended fixes.

VERDICT: FAIL 3, 4, 6, 7; outside the claims: F1, the names, the report's diffstat. Accepted: claims 3
and 4 as ruled; F-a to F-d go to round 2.
