# E-ID-ANCHOR audit — verdict

The Orchestrator's reconciliation of the audit round over E-ID-ANCHOR, on one claims file (`anchor-audit-claims.md`):
the objective lane, `analyst` on GPT-6 Astra (`anchor-audit-objective-verdict.md`, thread
`01a0d79b-09d0-7ae2-9447-59f0572d88f3`); and the subjective lane, `reviewer` on Opus 5.5
(`anchor-audit-subjective-verdict.md`). The lanes ran blind to each other. The writer was `opus` on Opus 5.5, so the
objective lane ran on an engine that did not write the work. The checker did not run: the brief's acceptance criteria
are gate exits and rows, which both lanes read (claims 3 and 8).

**Verdict: FAIL 2, 4, 6, 7; outside the claims: MID-LOG, F1, F2, R1.** The computed value, the per-partial placement,
the ledger rows, the reboot population, and the scope hold. Round 2 carries every finding below
(`e-id-anchor-brief-2.md`).

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The rendered value | CONFIRMED | CONFIRMED | CONFIRMED: the computed value only |
| 2 The placement | BROKEN | CONFIRMED | BROKEN on the mixin comment; the placement holds |
| 3 The ledger rows | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 The enumeration cases | CONFIRMED | BROKEN | BROKEN |
| 5 The reboot population | CONFIRMED | CONFIRMED | CONFIRMED on the objective lane's enumeration |
| 6 The proofs | UNRESOLVED | CONFIRMED on Chromium 141 | BROKEN on the record |
| 7 The guide | BROKEN | BROKEN | BROKEN |
| 8 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 2.** Both lanes hold the shape: one rule per partial through the `anchor-visibility` mixin, which the
  attribution probe requires. The mixin comment at `src/styles/_mixins.scss` (around line 644) says the overlay "shows
  only while its anchor is visible", which the `V.viewport` reading falsifies (objective; subjective F1). The
  claim is broken on that comment alone.
- **Claim 4, the lanes disagree.** The dropdown comment, written by this unit, says "The reading is the set of
  components-layer selectors … while an extra selector and a second rule on a recorded selector leave the reading
  unchanged". An extra selector adds a member to the `selected` set, so the reading changes; the assertion's result is
  what stays unchanged. The subjective lane reads the sentence correctly, and the objective lane ruled the assertion,
  not the sentence. The comment names an object the assertion does not read, the seam ruling's defect class
  (`ebc-audit-3-verdict.md`).
- **Claim 5.** The subjective lane cites `anchor-mid.log.txt` as showing the old population failing; that log reads
  120 passed and no failure (see MID-LOG). That citation is discarded; the claim stands on the objective lane's
  enumeration of the built cascade, which shows the old `startsWith(':where(')` predicate admitting the three anchored
  rules.
- **Claim 6.** Every component case and the mixins case fail on the deletion mutation with an assertion
  (`anchor-mutation-styles.log.txt`). The report's base-run claim covers the component cases only
  (`anchor-red.log.txt` filters `computes anchored visibility`), so the mixins case has no base red on the record
  (objective). The deletion mutation leaves the cascade as the base leaves it for this property, so its red stands in
  (subjective); round 2 states that in its report rather than claiming a base run. On Chromium 153, whose initial value
  is `anchors-visible`, the deletion and closed-state catches the component comments name cannot fire (F2).
- **Claim 7, both lanes.** (a) "shows only while its toggle is visible" (and "trigger") overclaims on both builds:
  `V.viewport` and `V.partial` suppress nothing. (b) The dropdown paint sentence and Reason cells are false on
  Chromium 141, where `V.clip.dropdown` reads the clipped menu hit-testable (J-PLACEMENT-141). The tooltip and popover
  paint claims hold on both builds. (c) The override reason names `:where()`; the unlayered consumer wins by layer
  order, and the guide already states that mechanism (§ Tokens, "a class of your own in a later layer, or in none").
  The paragraphs, the mixin, and the tests name the starting value three ways; "initial value" is the term.

## Findings outside the claims

- **MID-LOG (objective), accepted.** `e-id-anchor-report.md` cites `anchor-mid.log.txt` as showing the button-reboot
  case failing under the old predicate; the log reads a passing run. Round 2 runs that case with the old predicate over
  the final cascade, retains the failing log, and cites it.
- **F1 (subjective), accepted.** The comments above each `@include anchor-visibility(…)` and the mixin's own comment
  carry claim 7 (a)'s overclaim, the dropdown's carries (b), and the mixin's override clause carries (c).
- **F2 (subjective), accepted.** The anatomy comments of the three anchored-visibility cases claim the dropped and
  closed-state catches on every build; they fire only on a build whose initial value is `always`. The `!important`
  catch and the mixins case's text reading hold on every build.
- **R1 (subjective referral), ruled by the Orchestrator and accepted.** `mixins.test.ts` records `''` as the selector of
  a declaration outside a style rule, against "Absence is `undefined`"; and the revert case still scopes the reboot
  population with `startsWith(':where(')` while the reboot case uses the whole-group pattern, two definitions of one
  population.
- **R2 (subjective referral), the Orchestrator's.** D47 names the combined `:where(.dropdown-menu, .tooltip,
  .popover)` rule; D47a records the shipped shape. E29 is the engine session's, told through `plan.md`.
- **R3 (subjective referral), the Orchestrator's.** Round 2 states the Chromium 141 limit of the dropdown's paint now.
  The sentence that lifts the limit after J-PLACEMENT-141-FIX lands is a new unit, ANCHOR-PAINT, which `plan.md`
  names under the engine unit it waits on.

## Carriers

Every finding in this verdict is carried by `e-id-anchor-brief-2.md`: claim 2 and F1 by Item 1, claim 4 by Item 2,
claim 6, F2, and MID-LOG by Item 3, claim 7 by Item 4, and R1 by Item 5. R2 is carried by D47a in
`decisions-round-2.md`, and R3 by ANCHOR-PAINT in `plan.md`.
