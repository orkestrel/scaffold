# Unit J-NATIVE-PROBE, round 3 — settle the arrow and `anchors-visible` with readings that tell the cases apart

Successor of `j-native-probe-brief-2.md`. Its sections stand except where this brief replaces them.

**Why this round exists.** Round 2 (`units/j-native-probe-report-2.md`, file `units/j-native-probe-2.test.ts`) corrected the transition-property, hide-path, and completion readings, and three gaps remain:
- **Size rows dropped.** It left out rows round 1 had: the calc-size show midpoint, the growing-content completion on both paths, the horizontal midpoint and completion on both paths, `interpolate-size: numeric-only`, and the zero-duration transition.
- **Arrow control failed.** The centred-arrow control read `delta=3.00`, where it had to read under 1px. The anchored row reads `arrowCentre=43.00` against `referenceCentre=20.00`. Nothing yet says whether the arrow uses the reference as its anchor at all, or centres in its own tip.
- **`V.*` rows don't tell the cases apart.** The candidate `anchors-visible` rule and the `position-visibility: always` control read the same, because each hit test lands at the overlay's centre from before the scroll, and an anchored overlay moves with its anchor. Separately, the second `show()` ran after `destroy()`, so it reads a torn-down engine.

Round 2 ran on Sonnet, and its defects were measurement-design choices, so this round runs on Opus.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent. You author one probe file and run it on this host.

## Objective

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/probe/j-native-probe-3.test.ts` and run it once on Chromium 153. Every row group must carry a control whose reading differs between the cases the row must separate. Log every reading as one `console.log` line, `ROW <name> <json>`.

## Context

**Read first.** Round 2's brief, its report, and its file, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`. Then E27 and E29 in `decisions.md` there, and the CSS Anchor Positioning specification's definitions of an acceptable anchor element, `anchor-center`, and `position-visibility`. Reuse round 2's file as the starting point, copied, not edited in place.

**Where it runs.** The worktree, the command (with the file name `j-native-probe-3.test.ts`), the host, and the standing conditions are round 2's.

**The rows.**
- **Size rows.** Carry round 2's corrected size rows unchanged. Add every row round 1 had that round 2 dropped, measured with round 2's corrected methods:
  - `size.show.calcSize.midpoint`;
  - `size.pixel.completion.growingContent` and `size.calcSize.completion.growingContent`, where the content grows mid-transition;
  - `size.horizontal.pixel` and `size.horizontal.calcSize`, each with its midpoint and completion, for a 30px child in a 300px container;
  - `size.calcSize.interpolateSizeNumericOnly`;
  - `size.calcSize.zeroDuration`.

  Each completion row reads against a static control built the same way.
- **Arrow rows.** Decide whether an arrow inside the promoted tip uses the reference as its anchor. Place the tip at three offsets: its centre left of the reference's centre, equal to it, and right of it. For each offset, log the reference's centre, the tip's centre, and the arrow's centre, all from `getBoundingClientRect()`. Read the arrow two ways: with `justify-self: anchor-center`, and with `left: anchor(<name> center)` less half the arrow's width. Keep a control that separates the two outcomes: an element outside the tip, promoted on its own, with `position-anchor` naming the reference and `justify-self: anchor-center`. That control must centre on the reference within 1px. If it does not, anchor-centring itself is broken on this build, and you stop. Name the spec's acceptable-anchor condition your fixture meets or fails.
- **`V.*` rows.** Keep round 2's scenarios: `V.clip.dropdown`, `V.partial`, `V.viewport`, `V.tooltip`, and `V.popover`, with real engines and the shipped sheets. Change these readings:
  - After each scroll, read the overlay's current rectangle, and hit-test at its current centre when that centre is inside the viewport. Log the rectangle.
  - Read `checkVisibility()` on the overlay.
  - Run every scenario twice, once under the candidate rule and once under the `position-visibility: always` control. A row is evidence only where the two runs differ on the hit test at the current centre. Log both runs in one row.
  - Before Escape, focus the toggle or the reference with trusted input, and press Escape with `userEvent`.
  - Run the second `show()` before `destroy()`.

  Keep `V.focus` and `V.events`.

## Unknowns

Whether `anchors-visible` hides a promoted overlay whose anchor sits inside a scroller the overlay escapes. The `V.*` rows are that reading.

## Scope

- **Owned:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/probe/j-native-probe-3.test.ts` alone.
- **Off-limits:** every tracked file in every checkout, every other worktree, and round 2's file.
- **Tools and limits:** Read, Grep, Glob, Edit, Write, and Bash. No install, commit, or push.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the file's path;
- the exact command;
- its `Tests` line;
- every `ROW` line verbatim, in order;
- per row group, what the readings show, marked "measured", with each control's expected and actual value;
- for the arrow, which acceptable-anchor condition the fixture meets or fails, with the spec section you read.

## Deviation contract

Stop and report on a control that reads other than expected, or a row this host cannot measure. You decide and record the fixture sizes, the offsets, the scroll distances, and the row order.

## Acceptance criteria

1. The file runs, and every control reads its expected value.
2. Every size row listed in § The rows, every arrow row at the three offsets under both methods, and every `V.*` row under both rules appears as a `ROW` line.
3. `git -C C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe status --short` is empty.

## Review evidence

The Orchestrator re-runs the file itself and retains the file and both logs under the engine's `units/`. The styles session is asked to run it on Chromium 141.
