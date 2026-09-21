# CL6 audit verdict — the link classes and the anchor's retune

Subject: unit CL6 in Veneer over the base `c1c81a4` (the CL5c landing), written by `sol` on Astra
under `units/cl6-brief.md` with `units/cl6-brief-2.md` and `units/cl6-brief-3.md` above it.
Reports: `units/cl6-report.md`, the run that stopped before implementation, and
`units/cl6-report-2.md`, the run that completed. Terrain: `units/cl6-scout-report.md`. Scope read:
`units/cl6-scope-read-report.md`. Claims: `cl6-audit-claims.md`. Evidence:
`units/cl6-diff.patch.txt`, `units/cl6-status.txt`. The hover binding rests on
`units/cl6-hover-mechanism.md` and its instrument `units/cl6-hover-probe.mjs`.

**The first run stopped before writing anything, and stopped correctly.** Its brief required it to
find the hover mechanism in the calibration record before binding a hover value, and the record
does not state one: it gives the hover colour as a resolved triple and shows the specimen's own
colour property identical at rest and hover. The Orchestrator resolved it by measurement rather
than by ruling, and brief 3 carried the answer.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl6-audit-analyst-report.md`, exit 0; Astra wrote the unit, so the lanes swap and the
writer's engine never holds the objective lane); reviewer on Opus 5 holding the OBJECTIVE lane
(`units/lane-cl6-reviewer.md`, workflow `wf_dde38933-d50`); checker on Sonnet
(`units/lane-cl6-checker.md`); verifier on Sonnet (`units/lane-cl6-verifier.md`) over
`units/cl6-gate-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 every selector ships, none excluded | CONFIRMED (**extracted every selector the key carries from the pinned inventory and compared the set against the built cascade: the same members, nothing extra, nothing missing**, and no deferral row names one) | CONFIRMED (the families are ordered as the inventory groups them) | CONFIRMED | — |
| 2 the presence scan guards them | CONFIRMED (the scan resolves by exact normalized membership rather than substring, and the permanent control's removal hits exactly one selector, so it is not degenerate); the one-off run report-only | CONFIRMED on the retained logs; the run report-only | CONFIRMED | `test:conformance` exit 0 |
| 3 the colours are bound by the measured mechanism | CONFIRMED (**recomputed both mixes independently and matched the record to about 1.5e-4**, the record's own decimal rounding); browser readings report-only | CONFIRMED (the calibration arithmetic stays in the token maps and the element rule carries no copied number) | — | — |
| 4 the blast radius is measured and bounded | CONFIRMED (**enumerated every reader of the link tokens independently** and found the Bootstrap aliases read by no rule in the tree, so no alias consumer was missed; the button's partial untouched and its proof moved exactly two assertions) | CONFIRMED against the retained before-and-after readings | CONFIRMED | — |
| 5 the opacity variable is live and proved | CONFIRMED (the variable is assigned nowhere under the source before this unit and only by the new partial now; the utility sets only the variable, so the assertion cannot pass unless it is live) | CONFIRMED (the proof follows one anchor through the whole lifecycle) | — | — |
| 6 the key is listed with the rows required | CONFIRMED (the empty-properties branch cannot admit this key; one selector row and one variable row per property, all shipped) | CONFIRMED | CONFIRMED | — |
| 7 the role classes read Veneer's tokens | CONFIRMED (**the proof falsifies the Bootstrap-literal alternative**: an implementation reading the alias would not see the element-level override the case sets) | CONFIRMED | — | — |
| 8 the sweep reports no shared block | CONFIRMED (the two families share one declaration, below the threshold; the styles rule keeps a one-partial pattern inline) | CONFIRMED | CONFIRMED | `test:setup` exit 0 |
| 9 the section extends the base | CONFIRMED (its class enumeration is independent and covers every class the partial ships) | CONFIRMED | — | `test:app:browser` exit 0 |
| 10 scope, law, gates | CONFIRMED on scope and law; gate half report-only | UNDECIDABLE as a whole; the scope ruling confirmed | CONFIRMED | every step exit 0, status identical before and after |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it.

**The ruling I asked for, and its answer.** The unit edited the conformance setup proof, which
its brief grants only where the key's rows move a population, and the scope read had said that
file's cases run against synthetic rows for other components. **Both lanes read the case and
ruled the scope read wrong**: it calls the whole compatibility table, so its expected population
does move, and the edit sits inside the grant. The unit found this at its own gate and reported
the contradiction rather than working around it.

**Completeness, which is what this family exists to produce.** The objective lane compared the
inventory's selector set for this key against the built cascade in both directions and found them
equal. No selector is excluded, no selector ships that the inventory does not carry, and no
deferral row names one. That is the accounting a future Bootstrap major needs.

**The Orchestrator's first-party reading.** The permanent omitted-selector control ships in the
conformance suite rather than living only in a one-off plant log, and the objective lane verified
it is not degenerate. The Orchestrator ran that suite directly after every lane exited: nine
cases pass, including that control.

Findings, none forcing:

- **Objective 11.** The new partial loads the tokens module unnamespaced while its sibling loads
  it namespaced. No rule names one form, and both compile. Recorded so a later styles unit
  settles one form rather than each partial choosing.
- **Objective 12.** The link base restates, verbatim, the expression the role mixin emits for the
  primary emphasis tier, so in light mode the two are the same computed colour. Correct as
  written, because dark diverges and the link is calibrated independently. **The risk runs the
  other way**: a later reader simplifying the line into a reference to that tier would silently
  couple two independently calibrated values, and only one light-mode row would notice.
- **Objective 13.** The section proof restates lists the setup module already pins, so the two
  enumerations can drift. The drift fails safely, because a showcase omission still reddens.
- **Objective's scope-honesty note.** The guide's token section still states the pre-retune link
  values, and no gate reads those rows. The unit reported them as bounds, which is what its brief
  required, and the carry-forward belongs to the guide's owner.

### Findings carried out of CL6

1. The guide's token section's pre-retune link values and rationale, plus every bound the unit
   listed, to the unit that owns the guide.
2. Objective 11, 12, and 13, to the next unit that owns each file.

### Terminal (round 1)

Verdict: accept. CL6 lands at this tree.
