# J-TOOLTIP audit round 4 — the Orchestrator's reconciled verdict (2026-09-24)

Subject: the J-TOOLTIP round-4 tree in `tmp/worktrees/tooltip` (base `e8251cf`), per `j-tooltip-brief-4.md`, `j-tooltip-brief-4-resume.md`, `j-tooltip-report-4.md`, and `j-tooltip-audit-claims-4.md`; the round implements E18.

## Lanes

| Lane | Role and engine | Retained verdict | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst`, GPT-6 Astra (`codex exec` read-only; thread `01a0d423-3601-7b10-929b-c1a3a20708bb`, 55 commands, 528 s) | `j-tooltip-audit-4-objective-verdict.md` | `VERDICT: FAIL 1, 3, 4, 5, 7; outside the claims: none` |
| Subjective | `reviewer`, Opus 5.5 (native, read-only; the writer's engine) | `j-tooltip-audit-4-subjective-verdict.md` | `VERDICT: FAIL 5, 7; outside the claims: S2, S3` |
| Checker | `checker`, Sonnet (native, read-only) | `j-tooltip-audit-4-checker-verdict.md` | `VERDICT: FAIL 1; outside the claims: substitution-sweep finding (Tooltip.ts causal "since")` |

Citations spot-checked by line in `Tooltip.ts`, `Placement.ts`, `Tooltip.test.ts`, and the logs: they resolve. The objective lane's claim-1 and claim-4 interleavings are derivations carried as red-first obligations; its claim 3 rests on the retained executed probe.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1 The primitive and the predicate | The mechanism is CONFIRMED by both lanes; the checker's FAIL is on the claim's enumeration, which omitted the completed-event dispatches E18 places after the release by design (the claim is corrected here, not the code). **FAIL** on the objective lane's interleaving: a settled shown tooltip whose `show` listener moves the existing tip or removes its token during a rebuild's pre-show dispatch passes the `undefined` predicate, the old-tip discard's false report is ignored, and a replacement tip is built. | Round 5 (L2) |
| 2 The build | CONFIRMED by both lanes; the `MISSED` id row is indistinguishable by the Proof limit, not unreachable. | — |
| 3 Publication, promotion, completion | CONFIRMED on the sequence; **FAIL** on the promotion's consequence: `Placement`'s constructor finishes its positioning writes on a tip an opening `beforetoggle` listener moved, and the tip stays promoted and positioned in the other container until destruction (the retained probe). E18 reserved the `Placement` change to a successor; both lanes recommend the guard now. **Ruling under the user's landing instruction:** the tooltip lands with the bound stated in the guide and the `show` remarks, and the `Placement` guard is carried to J-POPOVER, which owns the tip's `Placement` work through the R12 seam (`plan.md` § Carried findings). E18 is amended to name the bound. | Round 5 (L4); J-POPOVER |
| 4 Discard, conceal, fill | **FAIL** on the objective lane's interleaving: a closing `beforetoggle` listener that restores the `shown` token without moving the tip passes the parent-only read in `#discard`, the tip is removed and `hidden` dispatches. Repair: ordinary concealment reads the token as well as the parent after the teardown and reports false on takeover; destruction and the rebuild's discard keep their cleanup. | Round 5 (L3) |
| 5 The interface and the guide | **FAIL**: the sentences promise the stopping behaviour claims 1, 3, and 4 contradict; L2 and L3 make them true, L4 states the promotion bound. S2 (the restoration sentence names the bound J-SNAPSHOT closed on `main`) and S3 ("a hide takes a show in flight over" is false before the token write) are wording repairs. | Round 5 (L4, L5) |
| 6 The round-3 carries | CONFIRMED by both lanes. | — |
| 7 Instrument, gates, tree repair, scope | UNRESOLVED on the Orchestrator's replay only (settled at the landing over round 5's instrument); the tree repair after the collided run is confirmed by the checker file by file and by the objective lane's hash comparison. | The landing replay |

## Outside the claims

- **ORC1 (subjective).** The value-ferrying arrays (`accepted`, `built`, `left`) are an idiom E18's letter forced; ruled: E18 admits the construction form for a value-returning step (call, use the value, then `#holds`), as `#place` uses. Round 5 (L5).
- **ORC2 (subjective).** E18's constraint clause "does not defend against the E13 re-entry" is superseded by J-SNAPSHOT on `main`; E18 amended. Round 5 rewrites the guide sentence (S2).
- **ORC3 (subjective), B1 and B2.** "conceals" → "hides", "may" → "can" in the E18 sentences; E18 amended so the verbatim requirement follows the corrected wording. Round 5 (L5).
- The checker's causal `since` in a `Tooltip.ts` comment: round 5 (L5).
- Bounds B3 to B11 (subjective): B4, B7, B9 folded into round 5 where the sentence is touched; B5, B6, B8, B10, B11 carried to J-POPOVER in `plan.md`.

## Deviations

- The generated round-4 briefs carried the component template's landed-pattern sentence, subject files, and a garbled terrain clause; both bench-side and native lanes reported it and ruled from the dispatch message and the claims file. Recorded, and the round-5 landing audit briefs are generated with `patch-landing-briefs.py` and read start to finish before launch.
- Round 5 adopts the auditors' prescriptions for claims 1 and 4 and states the bound for claim 3, so it closes on the instrument probe, the Orchestrator's replay, and the landing audit over the landing diff (the objective lane and the checker), not on a further fix round.

VERDICT: FAIL 1, 3, 4, 5; outside the claims: S2, S3, ORC1, ORC2, ORC3; round 5 (`j-tooltip-brief-5.md`) is the landing round
