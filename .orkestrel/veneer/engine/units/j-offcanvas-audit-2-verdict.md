# J-OFFCANVAS audit round 2 — the Orchestrator's reconciled verdict (2026-09-24)

Subject: the J-OFFCANVAS round-2 tree in `tmp/worktrees/offcanvas` (base `afae42c`), per `j-offcanvas-brief-2.md`, `j-offcanvas-report-2.md`, and `j-offcanvas-audit-claims-2.md`.

## Lanes

| Lane | Role and engine | Retained verdict | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst`, GPT-6 Astra (`codex exec` read-only; thread `01a0d419-d880-7d30-b7a8-5aed5d134df2`, 35 commands, 533 s) | `j-offcanvas-audit-2-objective-verdict.md` | `VERDICT: FAIL 2, 3, 4; outside the claims: F1` |
| Subjective | `reviewer`, Opus 5.5 (native, read-only; the writer's engine) | `j-offcanvas-audit-2-subjective-verdict.md` | `VERDICT: FAIL none; outside the claims: F1, F2, F3` |
| Checker | `checker`, Sonnet (native, read-only) | `j-offcanvas-audit-2-checker-verdict.md` | `VERDICT: PASS` |

Citations spot-checked by line in `Backdrop.ts`, `Isolation.ts`, `Offcanvas.ts`, `Offcanvas.test.ts`, and the mutation logs: they resolve. Neither bench lane executed anything; the objective lane's claim-2 sequence is a derivation carried as a red-first obligation. The subjective lane's OR4 is the same sequence reached from the delegate's point of view.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1 The backdrop's removal is a step of the hide | CONFIRMED by both lanes. The Modal's stopped hide keeps its faded backdrop connected under the "held until a later show" rule (OR1: a host observer re-adding `show` inside the door's microtask leaves the modal shown with its backdrop connected, which is the shown state; a capture would settle the rendered claim and is carried as an observation, not a defect). | — (OR1 to the plan as an observation) |
| 2 The interactive backdrop | **FAIL** on one interleaving: with two live panels, A's isolation observes B's backdrop being appended and claims it inert (B's backdrop is neither A's chain nor A's spare), and B's isolation then skips it as spared, preserving the inert value A wrote, so B's backdrop cannot receive the press. Repair boundary adopted: a spared element is claimed as not inert with the isolation's precedence and restoration, like the chain, at construction and at each observer delivery. | Round 3 (O6) |
| 3 The policy clauses and the contract sentences | **FAIL** on the press departure's universal claim: a non-HTML sibling is outside the isolation's claim (HTML elements only), so "everything outside the panel except its backdrop is inert" overstates; the proven behaviours (an inert HTML element painted above the backdrop, an SVG beneath it) stand. F2 (subjective): the door paragraph's "no door follows the backdrop's writes" is false for the removal step; scope the sentence to the append and the token writes. | Round 3 (O7) |
| 4 The missing control and the instrument | CONFIRMED by both lanes; the replay clause is settled at round 3's instrument by the Orchestrator's replay. OR3 (subjective): the inside-panel press and the container dispatch share one assertion, so the inside-press property is not independently bound. | Round 3 (O9) |
| 5 Gates and scope | CONFIRMED. | — |

## Outside the claims

- **F1 (both lanes).** `BackdropOptions.animated`'s false branch says "adds and removes it at once"; the tokens change without an animation wait and the element leaves only on `destroy`. Round 3 (O7).
- **F3 (subjective).** The `beside` constant's comment describes the round-1 inert backdrop and `beside.y` has no reader. Round 3 (O7).
- **OR2 (subjective).** Each show constructs a new backdrop and binds its `mousedown` listener under the panel's signal, so the registration and the detached element outlive the backdrop until the panel is destroyed. Round 3 (O8): the listener's lifetime ends with the backdrop.
- Bounds (subjective): B4 the `Isolation` constructor summary and `@param options` omit `spare` (folded, round 3); B5 `OffcanvasClassMap.host` "closes" versus the guide's "hides" (folded); B2 wrap breaks in the lines the round touches (folded where touched); B1 `spare`'s part of speech (E19 ruled the name; stays); B6 Modal's bare `destroy()` versus Offcanvas's step (Modal off-limits; noted); B7 the event sentences (round-1 text; J-INTEGRATION's prose pass).

## Deviations

- The generated round-2 briefs still carried the component template's terrain reference (`j-w2-terrain-record.md`, patched to the distillate); the bench lane reported the original name absent, from its own copy of the launch argument. Recorded.

VERDICT: FAIL 2, 3; outside the claims: F1, F2, F3; round 3 under `j-offcanvas-brief-3.md` (O6 the spared claim, O7 the sentences, O8 the listener's lifetime, O9 the inside-press binding) closes on the instrument probe and the landing replay
