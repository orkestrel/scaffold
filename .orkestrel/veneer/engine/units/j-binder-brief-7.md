# Unit J-BINDER — successor brief 7: the round-6 audit's findings

This brief supersedes `j-binder-brief-6.md` for the unit's seventh round, run by the same executor on the same uncommitted tree. What changed and why: the round-6 audit (`units/j-binder-audit-6-verdict.md`, reconciling the objective lane's `FAIL 3, 4`, the subjective lane's `FAIL 4`, and the checker) confirmed the snapshot-as-owner change on every path and the rewritten guide sentence, and found one door the re-read rule still misses in `Button.toggle` (a reaction to the `aria-pressed` write that toggles again leaves the outer call dispatching the detail it read before that write; the Orchestrator reproduced it on Chromium 153, `units/j-binder-probe-aria-reentry.log.txt`: details `[false, true]`), one contract sentence with no executed assertion (the overlap precedence and the identity half of the owner comparison), a third door the rule paragraph must name for the asynchronous engines, and one wording bound folded in. Every ruling is an edit here. The report-only patches stay unapplied.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 2 to 6, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, tip `cea3359`, rounds 2 to 6 uncommitted in the tree).

## Objective

Make `Button.toggle`'s event detail come from a read after its last reaction-capable write, prove the overlap precedence and the identity half of the owner comparison, name the third door in the rule paragraph, and keep the round-2 acceptance commands green.

## Context

**Evidence.** `units/j-binder-audit-6-verdict.md` (every ruling), `units/j-binder-audit-6-objective-verdict.md` (claim 3's counterexample and its smallest correction; claim 4's mutation table), `units/j-binder-audit-6-subjective-verdict.md` (R1's third door and its interleaving; R2's untested mutation and the overlapping-restoration interleaving; the bounds), `units/j-binder-probe-aria-reentry.test.ts` and `.log.txt` (the Orchestrator's reproduction: on the round-6 source the outer and inner details read `[false, true]` while the host and both returns read `false`). Locate each site by its symbol.

**Law, host, and standing conditions.** As in `j-binder-brief-4.md` (the `types.ts` grant covers the sentences G3 and G4 name).

## The edits

- **G1 (claim 3): the detail from the last read.** In `Button.toggle`, after the lifetime check that follows the `aria-pressed` write, read `this.pressed` again and dispatch that value as the event detail; the attribute write still takes the read after the token write; the return stays the read after the dispatch. The proof, red first: the Orchestrator's probe as a case (a host observing `aria-pressed` whose one-shot reaction to that write calls `toggle()` again), asserting the host without its token, `aria-pressed="false"`, both details `pressed: false`, and both returns `false`. Add its mutation row (the detail from the read before the attribute write). The guide's Button consequence sentence and the round-6 comment in `toggle` say the detail comes from the read after the attribute write.
- **G2 (R2): the overlap precedence has a proof.** In `HostSnapshot.test.ts`, the overlapping-restoration case over two consumer-constructed snapshots on one element and one attribute target: `S1` and `S2` both save `K` before either restores (with `S2` saving first, so its recorded original is the element's original and `S1`'s is `S2`'s written value), `S1.restore()` publishes `K`, a `class` reaction to `S1`'s token write calls `S2.restore()`, and the assertions pin that `S2` neither publishes nor writes `K`, that `S1` writes `K` back with the value it recorded, and that no entry for the element remains after both. Add the mutation rows the subjective lane named: `#withdraw` comparing presence instead of the owner (`pending?.has(key) !== true`), and the same in `#writeBack`; each must redden the new case. State in the report which value the element ends with and whether the first-started rule is right for that ordering; the contract sentence stays as it is unless the proof shows it false, in which case stop and report per § Deviation protocol.
- **G3 (R1): the third door.** In the guide's § Ownership and restoration rule paragraph, add the asynchronous sequence's door: a sequence that awaits meets a third door at each `await`, and after it reads its lifetime and the host again the same way, stopping and resolving `false` when the engine was destroyed; a sequence that awaits also stops when the host shows that another call has taken the change over, and each entity's guide subsection states what that reads as for its host (the mechanism is the rule's; the reading is the component's). Name, in the same paragraph, that a custom element's reaction also runs inside a child-list write and that `focus()` and `showPopover()` dispatch their events synchronously, so those are the same two doors.
- **G4 (the bound): one noun for the owner.** Where the round-6 text says "each restoration owns" and where it says "the snapshot that owns", use one form throughout `HostSnapshot.ts`, `types.ts`, and the guide: the snapshot owns what its restoration publishes.
- **G5 (the instrument).** Extend the instrument into a round-7 file with round 6's rows plus the G1 and G2 rows; each mutation named once per list, and a re-run of a row after a proof change goes in the second list with the same name (the Orchestrator reads the second list as re-runs).

## Unknowns

1. Whether the overlap proof's ordering (`S2` saved first, `S1` started first) ends with the element carrying `S1`'s recorded value (which is `S2`'s written value, not the element's original), and whether that is the right precedence or the sentence must instead give the target to the restoration whose snapshot saved it first (G2): the Orchestrator expects the first-started rule to hold as the code's behaviour and the ordering question to stay with J-COLLAPSE, where two engines meet it; report the element's final value and stop only if the sentence is false of the code.
2. Whether the third door's "another call has taken the change over" can be stated without naming a component (G3): the Orchestrator expects yes, as the sentence above; report the sentence as landed.

## Scope, execution, tools, and limits

As in `j-binder-brief-4.md`.

## Output

Return the report as your final message: per edit G1 to G5, what changed and the finding it closes; each new proof's red and green readings; the Unknowns' answers; the mutation rows for every new proof; the output of the round-2 acceptance criteria 1 to 6 verbatim; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1 to 6 of `j-binder-brief-2.md`; the G1 and G2 proofs present, red before and green after; `grep -n "each restoration owns\|the snapshot that owns" src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md` returns hits of one form only; the guide's rule paragraph names `await`.

## Review evidence

The actual diff (`git diff HEAD` with the renames intent-to-add) and status of the worktree, captured by the Orchestrator as `j-binder-7.diff` and `j-binder-7-status.txt` (rounds 2 to 7 together), and the report.
