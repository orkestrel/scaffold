# J-BINDER audit round 7 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-BINDER unit's round 7 (the fix round on the round-6 findings) in the worktree `veneer-binder` (`unit/binder`, round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 7 uncommitted, claims file `j-binder-audit-claims-7.md`. Lanes that ran, blind and in parallel, on that one file: the objective lane, `analyst` on GPT-6 Astra (thread `01a0d06e-af5c-7921-a219-5499dcc85627`, 46 commands, 346 s; `j-binder-audit-7-objective-verdict.md`, terminal line `FAIL 5; outside the claims: none`); the subjective lane, `reviewer` on Opus 5.5 (`j-binder-audit-7-subjective-verdict.md`, `FAIL 3, 4, 5; outside the claims: none`); the checker on Sonnet (`j-binder-audit-7-checker-verdict.md`, `FAIL none; outside the claims: none`). No lane the round named is not run. Every citation checked below resolves in the file it names. The Orchestrator's own settling run after the lanes returned: the round-7 mutation replay `j-binder-mutations-7-orchestrator.log.txt` (fourteen of the unit's rows through its own instrument over the shared sample, the four new rows included; every recorded tally reproduced exactly, every source restored byte for byte).

## Per-claim rulings

1. **CONFIRMED**, both lanes and the checker: the three `this.pressed` reads leave no local across a door; every destruction and re-entry at each step, including a listener that toggles twice, leaves each write, detail, and return equal to the host when it is taken; the proof read red on the round-6 source and its mutation row reddens it alone.
2. **CONFIRMED**, both lanes and the checker: the overlap proof records what the code does, the three G2 rows each redden it, the contract sentence promises no more than the code delivers (the subjective lane: losing the oldest original is not specific to the overlap and no sentence promises the element's first original across snapshots), and the first-started against first-saved question stays with J-COLLAPSE. The objective lane's bound (the later-save assertion cannot alone tell a live `earlier` from a leaked pending `earlier`) is adopted as brief 8's H3.
3. **BROKEN**, the subjective lane: the rule paragraph scopes the takeover stop to the `await` door, while the canonical takeover (a listener to the cancelable pre-change event calling `show()` again) happens at the dispatch door before any `await`, so a literal reading lets the outer call write over the inner change in flight; the objective lane confirmed the mechanism itself (a competing call is readable from the host without a flag, and the reading is the component's) but did not test the paragraph's scope. Ruling: the takeover stop applies at every door; carried as brief 8's H1 with the subjective lane's wording. The split between mechanism and component policy holds (both lanes).
4. **BROKEN**, the subjective lane: the `#publish` comment in `HostSnapshot.ts` still names a restoration as the owner ("unless another restoration in progress already owns"); the objective lane, the checker, and the unit's acceptance sweep missed it because their patterns matched "each restoration owns" only. Ruling: the snapshot owns everywhere; carried as brief 8's H2 with the widened sweep as H4.
5. **CONFIRMED** by the Orchestrator's replay: every sampled tally reproduced, every source restored; both lanes named the moved tallies against the round-6 results and found no mutation whose recorded reddening its proof could not produce. The checker's referrals: the retired-name grep is in the Orchestrator's own round-7 run (`j-binder-gates-7.log.txt`, the "round 4 and older greps" section, hitting only the guide's `.bs.` conformance rows); the § Surface row count is what `tests/guides.test.ts` asserts (every export documented and every documented name exported), which read green in that run.

## Findings outside the claims, ruled

None from any lane.

## Referrals ruled

- **RF1** (the subjective lane: J-COLLAPSE's carried obligation (b) has no carrier for a first-saved ruling, because the flip changes files that unit does not own): the collapse brief's (b) is scoped to the ruling and its `types.ts` sentence patch, and a ruling for the snapshot that saved first is carried by J-BINDER-PRECEDENCE, a successor writing unit on the binder's files dispatched before J-COLLAPSE integrates (`fill-collapse-brief-3.py`, applied when round 8 lands).
- **RF2** (the subjective lane: the collapse brief is stale against round 7): its base clause and evidence move to rounds 1 to 8 and its obligation (c) cites round 8, in the same fill.
- **RF3** (the objective lane and the subjective lane: the replay): done, named in the head.
- The objective lane's note that the popover `toggle` event is queued rather than dispatched synchronously: the guide's sentence names the events `focus()` and `showPopover()` dispatch before they return, which excludes it; held as a bound.

## Bounds ruled

The rest of both lanes' bounds stay as bounds: the over-long remark line, "the value the restoration recorded", the Button sentence's "whose own write toggles it again", the overlap proof's title, the instrument row's name, and the unstated inner-before-outer order for ancestor listeners.

## Carrier and the round-8 audit

Claims 3 and 4 and the H3 bound are carried by J-BINDER round 8 (`units/j-binder-brief-8.md`, H1 to H4, the same writer resumed on the same uncommitted tree). Round 8 edits prose with the exact wording the lanes proposed and strengthens one assertion whose binding three existing mutation rows and the Orchestrator's replay already prove; it changes no mechanism. Its audit is the checker on Sonnet over the exact sentences and the widened sweep, plus the Orchestrator's gates and replay; the objective and subjective lanes are not run for that round, for that reason, recorded in `j-binder-audit-8-verdict.md`. The overlap ordering question, the shared `classed` target, and the route half stay with J-COLLAPSE's brief. No finding is dropped.

VERDICT: FAIL 3, 4; outside the claims: none
