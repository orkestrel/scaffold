# E-ID-MOTION-OFFCANVAS audit — verdict

The Orchestrator's reconciliation of the audit of E-ID-MOTION-OFFCANVAS (`moff-audit-claims.md`, the unit at `73cd4f0`):
the objective lane, `analyst` on GPT-6 Astra (`moff-audit-objective-verdict.md`, thread
`01a0d7f6-fdb8-7fb2-9a66-2f1bc5abe9e2`, journal `tmp/codex/moff-audit-analyst.jsonl`); and the subjective lane,
`reviewer` on Opus 5.5 (`moff-audit-subjective-verdict.md`). The lanes ran blind to each other. The writer was `opus` on
Opus 5.5, so the objective lane ran on an engine that did not write the work. The Orchestrator settled claim 5's showcase
half by rendering it (`moff-instruments/orchestrator-probe/showcase-panel.log.txt`).

**Verdict: FAIL 3, 6; claim 2 BROKEN as the Orchestrator wrote it, with no defect in the change.** The panel motion, the
rows, the design verdict's row, and the scope and gates hold.

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The panel motion | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The in-flow ranges | BROKEN | CONFIRMED | BROKEN in the claim's wording; the change holds |
| 3 The proofs | BROKEN | CONFIRMED | BROKEN |
| 4 The ledger rows | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 Engine and showcase | NOT-EVIDENCED | NOT-EVIDENCED | CONFIRMED on the Orchestrator's rendered reading |
| 6 The guide prose | CONFIRMED | BROKEN | BROKEN |
| 7 The design verdict | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 2, the Orchestrator's error.** The claim promised full opacity to any panel inside an expanded navbar. An
  `.offcanvas-xl` panel inside `.navbar-expand-lg` stays fixed and transparent at `1000px`, because the bar's rule selects
  `.offcanvas` only, as the release's own navbar selector does (objective, from the built cascade). The guide's § Navbar
  classes sentence names the `.offcanvas` rule and holds (objective claim 6). No change follows.
- **Claim 3.** The report states that each case drives the engine's class writes and samples the running transition; the
  state and navbar cases read static classes, and the responsive and factor cases drive the entry only (objective). So a
  planted `.offcanvas-sm.hiding { opacity: 1 }` passes the responsive case, no plant writes the transparent rest or the
  transition at or above a panel's boundary (subjective R1), and no plant writes the transition outside the `transition`
  mixin (subjective R2).
- **Claim 5.** Both lanes found no rendered reading of the showcase specimen. The Orchestrator rendered the
  `Navbar with offcanvas` markup from `app/browser/constants.ts` over the unit's built cascade on Chromium 141.0.7390.37:
  the panel reads `opacity: 1` at `1280` (static, in the bar's row) and at `390` (fixed, shown), and the control without
  `show` at `390` reads `opacity: 0` and `visibility: hidden`.
- **Claim 6, the subjective lane's failing state.** § Offcanvas classes names the panel timing only by its tokens, so a
  consumer asking whether the panel still moves in `0.3s` finds no answer, while every other motion passage in the guide
  states the value a token resolves to at a factor of `1`, and the ledger row beside it reads `tokenized`. The objective
  lane found no false sentence; the subjective finding is a missing fact the reader needs, and it stands.

## Findings outside the claims

- **Text integrity (subjective R3), accepted.** A comment line the unit changed in `offcanvas.test.ts` (the
  `describe('offcanvas in an expanded navbar')` comment, around line 712) runs past 100 columns.
- **Ledger rows (both lanes).** LEDGER-RETUNE's resolver would reclassify the six `--bs-offcanvas-transition` rows
  `retuned`; the rows record what the landing base's gate prints, and the landing regenerates them.

## Carriers

`e-id-motion-offcanvas-brief-3.md` (the same `opus` writer, resumed) carries claims 3 and 6 and the text-integrity
finding. Claims 2 and 5 need no carrier.
