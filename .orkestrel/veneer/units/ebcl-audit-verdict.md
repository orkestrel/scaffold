# E-ID-BUTTON-CLASSES audit — verdict

The Orchestrator's reconciliation of the audit round over E-ID-BUTTON-CLASSES, on one claims file
(`ebcl-audit-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`ebcl-audit-objective-verdict.md`, journal
`tmp/codex/ebcl-audit-analyst.jsonl`, thread `01a0d6fa-16a6-73a2-ab08-83f5a33f5bb9`), and the subjective lane,
`reviewer` on Opus 5.5 (`ebcl-audit-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so
the objective lane ran on an engine that did not write the work. No checker ran: no claim is a mechanical count or
path.

**Verdict: FAIL 6, 10, 11; outside the claims: F1, F2, R1, R3.** The proofs are real: every include removal kills its
class's case with an assertion, and the oracle is the right one. The defects are a holder sentence that claims one token
too many, a guide sentence about `.page-link`, and the placement of the routine.

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 Coverage | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The form oracle | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The release cascade | CONFIRMED | UNRESOLVED | CONFIRMED |
| 4 Real input | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 Disabled pairing | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 The holder | BROKEN | BROKEN | BROKEN |
| 7 Include removals | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 The minifier guard | BROKEN | CONFIRMED | CONFIRMED as the case title states it |
| 9 Reading the stylesheet as data | CONFIRMED | CONFIRMED | CONFIRMED |
| 10 The shared hunks and the guide | BROKEN | BROKEN | BROKEN |
| 11 Placement | BROKEN | BROKEN | BROKEN |
| 12 Gates | CONFIRMED | UNRESOLVED | CONFIRMED |
| 13 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 3.** The reviewer found `ebcl-probe-shadow-readings.log.txt` empty. The objective lane compared each retained
  `ebcl-instruments/logs/shadow-*.json` map with `ebcl-probe/pages.json` itself and found every cascade and state map
  equal. The executed comparison settles the claim; the empty log is the unit's instrument defect and costs nothing.
- **Claim 6, both lanes.** `BUTTON_RETUNED_HOLDER_STYLE` does not retune `--vn-button-highlight`, which
  `src/styles/elements/_button.scss` reads through the forced-colors ring (around line 57). No proof runs under forced
  colors, and the forced-colors proofs own that token, so the holder stays and the sentences say "outside forced
  colors".
- **Claim 8.** The claims file said "every reset declaration"; the case title says every reset declaration that names
  `revert`. The objective lane's in-memory mutations show the assertion matches the title. The claim was the
  Orchestrator's overstatement, not the code's.
- **Claim 10, both lanes.** The guide repeats claim 6's overstatement, and says an unpaired class has "no disabled
  rule", which is false for `.page-link` (`bootstrap.css`, `.page-link.disabled, .disabled > .page-link`, around line
  4776). It says "no `:disabled` rule".
- **Claim 11, both lanes.** `.claude/rules/tests.md` § Shared test infrastructure requires the routine in a setup
  module; it does not require the cases in `button.test.ts`. The routine inside the reboot case near-duplicates the
  `.btn` form proof's routine in the same file (the drives, the per-state longhand record, the difference filter). The
  lanes differ on where the cases go; the Orchestrator rules for the brief's placement, because the tests mirror source:
  each partial's `button-reboot` include is proved in that partial's test file, one call to the shared routine per
  class, so an include removal reddens the file named for the partial. The case matrix stays in `tests/setupStyles.ts`.
- **Claim 12.** The Orchestrator's re-run command was
  `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "records and reads official control state"`,
  run alone at load 5.63; the retained log carries its output and not its command line.

## Findings outside the claims

- **F1 (subjective), accepted.** `BUTTON_RETUNED_HOLDER_STYLE` is qualified by a property both holders share. It
  becomes `BUTTON_REBOOT_HOLDER_STYLE`, beside `BUTTON_REBOOT_CASES` and `BUTTON_REBOOT_SELECTORS`. The reading named
  `twin` becomes `counterpartReading`, beside `buttonReading`.
- **F2 (subjective), accepted.** Three comments state what the case does not do: "the universal selector stands for a
  state no drive enters", "Every state is read with motion reduced" beside a rest reading taken before, and the holder
  sentence of claim 6.
- **R1 (subjective referral), accepted.** The disabled drive has no entry check: `*` matches anything. Each form takes
  its own selector: `:disabled` for the button, `.disabled` for a paired counterpart, and `*` only for an unpaired one.
- **R3 (subjective referral), accepted.** Nothing ties `BUTTON_REBOOT_CASES` to `BUTTON_REBOOT_SELECTORS`, so a reset
  selector with no case passes every gate. A membership case closes it.
- **R2 (subjective referral), carried.** `tests/setupServer.ts` says a path the browser can read lives in
  `tests/setupStyles.ts`, which holds none. The comment is in a file this unit does not own; LEDGER-RETUNE, which owns
  `tests/setupServer.ts` next, carries it.

## The engine session's Chromium 153 row

`tests/src/styles/elements/button.test.ts` holds the `.btn` form proof the engine session records as its third standing
Chromium 153 row (`engine/units/host-chromium-153-reading.md`): it compares the button form with the anchor form against
a fixed list of differing longhands, and Chromium 153 adds `outline-width` to the pressed state's list. The shared
routine claim 11 requires serves that proof too, on the oracle this unit uses: the Veneer map of button-versus-anchor
differences equals the release's map, read in the same browser. A user-agent default that moves both cascades then
cancels. E-ID-BUTTON-CLASSES round 2 carries it, and E-ID-BUTTON-153 is struck as a separate unit.

## Carrier

E-ID-BUTTON-CLASSES round 2 (`e-id-button-classes-brief-2.md`, `opus` on Opus 5.5).
