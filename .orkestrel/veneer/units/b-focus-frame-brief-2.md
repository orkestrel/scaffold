# Unit FOCUS-FRAME (`ff`), brief 2 — round 2: the audit's findings

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 1, resumed in the worktree `/home/user/veneer-ff`
(branch `unit/ff` from `e4a6d7c`, round 1's changes uncommitted in place). `b-focus-frame-brief.md` stands for
everything this brief does not change.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/ff-audit-verdict.md`, with the three lane verdicts
beside it) confirmed scope, P1, the radio fix, and the frames, upheld the P2 ruling, and ruled claims 3 and 8
broken. The helpers in `tests/setup.ts` and their proofs are in scope. The shared focus-frame helper in
`tests/setupBrowser.ts` and the unconverted dropdown and carousel focus drives belong to a later unit
(FRAME-HELPERS); leave them.

## The work, implementation first

1. **The `auto` outline guard (AUTO-OUTLINE-GUARD).** Give the skip-link and list-group focus cases an
   assertion a scripted-focus drive fails: promote the pixel observation the P2 probe used (the focused frame
   against the same frame with the outline suppressed inline, counting differing pixels) into the cases, with the
   unpainted state as the negative control. Run it red with each case's drive reverted to a scripted `focus()`
   after the mode switch's press, at `dark-1280`, and retain the logs.
2. **The helper proofs (claim 3, R2).** Move the `shadows`, `outlines`, and `worn` tables out of
   `tests/setup.test.ts` into frozen, exported setup constants with TSDoc. Give `computeRingReach` a proof row that
   its parenthesis-aware split and color stripping decide (a row a plain comma split reads wrong), or remove the
   logic no row decides; run the mutation that removes it and retain the log.
3. **The pointer (claim 5).** Run the converted check-group case at `dark-1280` with the `releasePointer` call
   deleted, retain the log, and name what the watcher reads. If it reads nothing, move the parked pointer's test
   to where it discriminates, or record that the release guards nothing in the converted frame and remove it.
4. **P2's readings (claim 6).** Retain the list-group row's pixel control beside the skip link's, and the release
   readings the report names but did not keep (the no-press rows and the light scripted-after-press row).
5. **The prose (GUIDE-FOCUS-UNIVERSAL, F3, F4, F5).** Restrict the § Tests paragraph to the converted scenarios;
   follow every code token with a noun in added comments and the patch; reflow the two unwrapped guide
   paragraphs; write "at most 2 CSS pixels" in the `computeRingReach` TSDoc.

## Testing

Run scoped tests only: `tests/setup.test.ts` for the helpers, and the journey filtered with `-t` to the cases you
change. Run a whole project or an unfiltered journey variant at most once, as the final acceptance reading. The
unfiltered capture variants are the Orchestrator's at landing.

## Report

A successor report, `/home/user/veneer-ff/tmp/units/ff-report-2.md`, and the same text as the final message, in
brief 1's output shape over both rounds: each finding with the change that closes it and its proof or reading;
each gate's command exactly as it ran with every argument, its exit, and its result line as the log prints it,
with every gate's log retained; `ff-mutations-2.log.txt`; `ff-shared-2.patch` superseding `ff-shared.patch` whole;
`ff-2.diff` (both rounds against `e4a6d7c`) and `ff-2-status.txt`. It names every case each mutation reddens, and
states no tally of a growable set and no temporal word.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Acceptance criteria

Brief 1's criteria over the round-2 tree, with filtered capture runs satisfying the capture criteria, plus: the
outline guard reddens on the scripted-focus drive for the skip link and the list-group row; the moved tables live
in setup constants.
