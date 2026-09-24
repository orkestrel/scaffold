# J-OFFCANVAS audit round 1 — the Orchestrator's reconciled verdict (2026-09-24)

Subject: the J-OFFCANVAS round-1 tree in `tmp/worktrees/offcanvas` (base `afae42c`), per `j-offcanvas-brief.md`, `j-offcanvas-report.md`, and `j-offcanvas-audit-claims.md`.

## Lanes

| Lane | Role and engine | Retained verdict | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst`, GPT-6 Astra (`codex exec` read-only; thread `01a0d3d8-b27e-79d2-af42-3ea4359b68f7`, 38 commands, 655 s) | `j-offcanvas-audit-objective-verdict.md` | `VERDICT: FAIL 2, 3, 4, 8, 9; outside the claims: none` |
| Subjective | `reviewer`, Opus 5.5 (native, read-only; the writer's engine, so the objective lane is the cross-engine auditor) | `j-offcanvas-audit-subjective-verdict.md` | `VERDICT: FAIL 1, 2, 3, 4, 5, 6, 7, 8; outside the claims: F1, F2` |
| Checker | `checker`, Sonnet (native, read-only) | `j-offcanvas-audit-checker-verdict.md` | `VERDICT: PASS` |

The subjective lane's failures on claims 1 to 8 rest on one clause: the Orchestrator's replay is absent. That clause is settled at the landing round's instrument, per the pipeline, and is not a finding against the source; the lane confirmed every other clause of those claims. Citations spot-checked by line in `Offcanvas.ts`, `Backdrop.ts`, `Isolation.ts`, `Delegate.ts`, and the test files: they resolve. The objective lane executed nothing; its claim-3 interleaving and claim-4 attack are derivations carried as red-first obligations and a capture.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1 Construction | CONFIRMED by both lanes. | — |
| 2 The show | Mechanism CONFIRMED. The claim's wording put `reflow` inside `#apply`; the source calls it directly and a layout read needs no door. A claim correction, no source change. | The round-2 claims |
| 3 The hide | **FAIL.** `backdrop.hide()` starts before the `shown` removal step; when a reaction to that removal adds `shown` back, the panel's door fails and the hide stops, but the backdrop's own wait resumes and removes the element — a write after a stopped change, contradicting the class remarks and the guide. Repair: the backdrop's removal is a step of the hide sequence after the post-settle door, the fade staying concurrent; `Backdrop.hide()` fades and resolves without removing, `Backdrop.destroy()` removes (Modal calls `hide` then `destroy`, so its behaviour is unchanged and its suite must stay green). Proof: a document child-list observer through the backdrop's settlement, red first. | Round 2 (O1) |
| 4 The press | **UNRESOLVED → ruled.** The objective lane's SVG-sibling attack (`Isolation` claims only HTML elements inert, so a painted non-HTML sibling is a non-inert target that does not contain the backdrop and is refused where Bootstrap's backdrop would have received the press) and the subjective lane's OR1 (a press on an inert element painted above the backdrop falls through to `body` and counts where Bootstrap's would not) show the containment heuristic diverges in both directions. Ruling (E19): the backdrop stays interactive under the isolation through a one-word `IsolationOptions` key the panel passes (`spare`), the press listener counts the backdrop element itself as Bootstrap's `Backdrop` does, and the containment reading goes. Proof: trusted presses beside the panel, inside it, on the backdrop through an inert element painted above it (counts, and the guide states the departure), and with an SVG sibling under the backdrop (counts), red first. | Round 2 (O2) |
| 5 The responsive hide | CONFIRMED. | — |
| 6 Destruction | CONFIRMED within the inherited snapshot bounds. | — |
| 7 The delegate routes | CONFIRMED; the "destroyed dismiss route" case has no instrument control (an added row). | Round 2 (O5) |
| 8 Declarations, guide, instrument, gates, scope | **FAIL** on three source-policy and documentation clauses: a local arrow `hook` assigned in `Offcanvas.test.ts` (a nested function outside the exceptions; the checker referred it too); the guide's hide sequence places the backdrop removal after the attribute removals while the code removes it inside the fade (closes with claim 3); `types.ts` says the trigger travels on `show` alone while `shown` carries it too. The replay clause is settled at the landing. | Round 2 (O3) |
| 9 The shape | Names CONFIRMED. The guard question: the objective lane rules one shared guard (`isRelatedEvent`) over a shared detail contract; the subjective lane rules the pair stays because the `is{Entity}Event` family already repeats bodies and merging two splits it. **Ruling:** the pair stays this unit; the family-wide consolidation by detail shape is a design question routed to J-INTEGRATION with the objective lane's proposal (already carried in `plan.md`). The `parseBackdrop` remarks name the offcanvas too. | Round 2 (O4, the remarks); J-INTEGRATION (the family) |

## Outside the claims

- **F1 (subjective).** The `OffcanvasSelectorMap`, its `trigger`, `OffcanvasOptions.selectors`, and `OffcanvasAttributeMap.target` sentences describe behaviour the panel lacks; adopt the Toast shape, with the § Surface row equal to the new summary. Round 2 (O4).
- **F2 (subjective).** The departures list omits the class-token timeline (the engine adds `shown` with `showing` before the slide and removes it before the slide out; Bootstrap's panel carries `showing` alone, then `show hiding`). Round 2 (O4).
- **OR3 (subjective).** Design verdict R5 names a delegate construction-time scan for `.offcanvas.show`; the brief excluded load adoption and the guide says construct over shown markup. **Ruled:** R5's letter is amended (E19); no scan.
- **Bounds B1 to B7 (subjective), folded into round 2 as wording:** the `parseBackdrop` remarks; the agreement bullet moved out of the departures list; one term for the toggle route across `#### Offcanvas` and § Delegation; the `#conflicts` locals named by entity; "restores" for a backdrop destruction removes; the `Delegate` TSDoc wrap; the fence lead-in's "panel".

## Deviations

- No replay this round; the landing round's instrument settles the clause for every round (the pipeline's standing rule).
- The generated briefs named `j-w2-terrain-record.md`, which does not exist; both bench lanes reported it. The template's terrain reference is corrected in the round-2 briefs.

VERDICT: FAIL 3, 4, 8; outside the claims: F1, F2; round 2 under `j-offcanvas-brief-2.md` (O1 backdrop removal as a step, O2 the interactive backdrop and its press, O3 the three policy clauses, O4 the contract and departure sentences with the bounds, O5 the missing control); the guard family to J-INTEGRATION; replay at the landing round
