# J-INTEGRATION round-3 audit — the reconciled verdict (2026-09-24)

Subject: Veneer `7fd28dc` on `unit/integration` (claims `j-integration-audit-claims-3.md`). Lanes: `analyst` on GPT-6 Astra (objective; Opus 5.5 wrote the round), thread `01a0d589-8b7d-7c13-beff-e299d70556ba`, `j-integration-audit-3-objective-verdict.md`, a source review with no executed reproduction; `checker` on Sonnet on claims 1, 2, 7, and 9, PASS. The subjective lane did not run: the round changes no public shape, name, or guide section beyond the takeover paragraphs the round-2 reviewer read, so this round's audit is the objective lane and the checker. The Orchestrator's own run: the scoped gates and all 29 mutation rows red with sources restored byte for byte (`j-integration-mutations-3-orchestrator.log.txt`), and the landing chain on the merge over `b1d314d` green (`test:src:browser` 903 of 903, `tools/w2-land-2c-integration.log.txt`), the fast-forward held for this verdict.

| Claim | Objective lane | Checker | Ruling |
| --- | --- | --- | --- |
| 1 identity guards every returning write | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 only a call that starts a change moves the identity | FAIL: the identity moves after the cancelable pre-change dispatch, not before it | CONFIRMED | Dropped as a claim-wording error: the claim said "before the call's first write or dispatch"; the pre-change event precedes the change by design, and the lane confirms the ownership half. No defect. |
| 3 the step runs with the change released | FAIL: Modal `show` around `:299–301` and Offcanvas `show` around `:290–292` release `#changing` in `#holds`, then run `isolation.destroy()`, whose restoration can run a reaction that starts a nested `show` before `#rehide` captures `#change`, so the stale step captures the nested identity and strips the nested show's writes and backdrop | — | **Open, carried** (source trace; not yet executed) |
| 4 a stale step writes nothing after a nested change | FAIL: the step's `backdrop.show()` inserts the backdrop; a reaction to the insertion calls the engine's `hide()`, whose `backdrop.hide()` returns before moving the backdrop's identity because the token is still absent, so the interrupted backdrop show adds `show` after the insertion over the nested hide | — | **Open, carried** (source trace; not yet executed) |
| 5 the removed writes change nothing | CONFIRMED | — | CONFIRMED |
| 6 each identity proof binds | CONFIRMED, mutation named and distinguished | — | CONFIRMED |
| 7 each returning write has its own row | CONFIRMED | CONFIRMED (write-to-row map) | CONFIRMED |
| 8 R4 binds to the removal door | CONFIRMED, mutation named and distinguished | — | CONFIRMED |
| 9 no dead state or residue | CONFIRMED | CONFIRMED | CONFIRMED |

**The seam budget fires.** This is the third audit round on one seam, a reaction inside a Modal or Offcanvas change starting another change (round 1: the backdrop alone returned, E22; round 2: the stale returning step, round 3's identity; round 3: the identity captured after consumer code ran, and a sub-component's own identity blind to its owner's). The recurrence has a direction: each fix moves the class one station down the call chain, from the engine's sequence into the steps, then into the sub-components (`Backdrop`, `Isolation`) that run consumer code inside their writes. Per `.claude/rules/quality.md` § Rounds and verdicts, the next step is one breadth round over the stations of that chain, executed, not a fourth repair: `j-reentry-sweep-brief.md`. The downstream fix unit is planned from its map, together with J-SAMEWAY (the same seam in the change's own direction, whose design round is in flight).

**Landing.** Held. `unit/integration` stays at `e0dee7e` (round 3 plus the merge of `b1d314d`); it lands with the fix unit the sweep plans. J-GUARDS, which also edits `Modal.ts` and `Offcanvas.ts`, is cut from Veneer `main` `b1d314d` and dispatched now, so the two writers never own one file at once; the fix unit starts after J-GUARDS lands and merges it.

VERDICT: FAIL 3, 4
