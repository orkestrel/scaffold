# Unit J-NATIVE-PROBE, round 2 — correct the size and arrow rows, and measure `anchors-visible`

Successor of `j-native-probe-brief.md`. Its sections stand except where this brief replaces them.

**Why this round exists.** The Orchestrator read round 1's log (`units/j-native-probe-153.log.txt`) and found that four row groups measured the probe rather than the platform (`plan.md` § Carried findings, the row naming J-NATIVE-PROBE's size and arrow rows):
- `transitionProperty` read through `getComputedTiming()` reads `unknown`.
- The pixel path's hide midpoint reads no transition.
- The pixel completion rows read a height the cleared inline size should have released.
- The anchored arrow reads 23px off the reference's centre, in coordinates the log does not name.

E29 adds the `V.*` rows for `position-visibility: anchors-visible`.

## Role and engine

`builder` on Sonnet, a native Claude subagent (Read, Grep, Glob, Edit, Write, and Bash). You author one probe file and run it on this host.

## Objective

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/probe/j-native-probe-2.test.ts` and run it once on Chromium 153. Every size and arrow row must read through a method whose control reads a known value, and every `V.*` row must be measured. Log each reading as one `console.log` line, `ROW <name> <json>`.

## Context

**Read first.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Writing and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` § Probes.
- `decisions.md` § E27 and § E29.
- The round-1 file `units/j-native-probe.test.ts` and its log `units/j-native-probe-153.log.txt`.
- The `V.*` specification in `units/j-elements-design-planner-proposal.md` § Units, item 4, and the analyst's probe paragraph in `units/j-elements-design-analyst-proposal.md` § Units, item 4.

Every path is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/` unless it names another root.

**Where it runs.** The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe` is a detached checkout of Veneer `main` at `6dd5034` (J-SNAPSHOT-SHARED's landing) with its own `node_modules`. The Orchestrator creates it before dispatch. `tmp/probe/` is ignored there.

From that worktree, run:

`npx vitest run --config C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/vite.probe-worktree.config.ts --root C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe --reporter=verbose tmp/probe/j-native-probe-2.test.ts`

Import the real engines through the `@src/browser` alias. Import the shipped sheets as `?inline` strings from `../../src/styles/...`, the way `tests/src/browser/Offcanvas.test.ts` does, and inject each one into a `<style>` element that the row removes.

**The corrections.**
- **Transition property.** Read each running transition's property from the animation object itself: for an animation `instanceof CSSTransition`, read `animation.transitionProperty`. Log the list for every animation from `element.getAnimations()`. The control is a transition on `opacity` alone, whose row must read `["opacity"]`.
- **The hide path.** Run it the way Bootstrap's collapse hides:
  1. Write the current height in pixels (`${getBoundingClientRect().height}px`).
  2. Force a reflow.
  3. Add `collapsing` and remove `collapse show`.
  4. Force a reflow.
  5. Clear the inline height, so `.collapsing`'s `height: 0` is the transition's end.

  For the calc-size path, write `calc-size(auto, size)` in step 1. Read the midpoint as round 1 did (`pause()` and `currentTime` at half the duration).
- **Completion.** Complete the transition by calling `finish()` on each running transition and awaiting its `finished`. Then swap `collapsing` for `collapse show` and clear the inline size. Read `getBoundingClientRect().height` against `scrollHeight` plus the vertical borders. The control is a static panel with `display: block` and no transition, whose rendered height must equal its content height plus its borders.
- **Arrow coordinates.** Read the reference's centre and the arrow's centre from `getBoundingClientRect()` in viewport coordinates, and log both with the tip's rectangle. Add a control tip placed exactly centred over a reference of the tip's own width, whose anchored arrow must read a delta under 1px. Keep round 1's no-anchor control arrow.

**The `V.*` rows.** Measure every row the planner's item 4 names: `V.support`, `V.clip.dropdown`, `V.partial`, `V.viewport`, `V.focus`, `V.events`, and `V.tooltip`. Add a `V.popover` row that reads as `V.tooltip` does with a real `Popover`. Use:
- the shipped `_tokens.scss`, `_dropdown.scss`, `_tooltip.scss`, and `_popover.scss`;
- the candidate rule, test-local: `:where(.dropdown-menu, .tooltip, .popover):popover-open { position-visibility: anchors-visible }`;
- the analyst's control, which replaces the candidate with `position-visibility: always` and must fail the suppression reading.

In each clip row, after scrolling back, also read what Escape, an explicit `hide()`, `destroy()`, and a second `show()` leave: `:popover-open`, the public `shown` state, and the events. Record the hit test at the overlay's centre with `document.elementFromPoint`. Wait two animation frames before each reading.

**Host.** Windows 11 with Git Bash. `npm` and `npx` resolve to the `.cmd` shims. The browser is Chromium 153.0.8010.12. Write each multi-step program to a file and run the file. Use no heredoc and no `node -e`. A foreground shell call is capped at 10 minutes.

**Standing conditions.** Other units write in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/cascade` and `.../integration`, and the Orchestrator lands in the main checkout. Touch none of them.

## Unknowns

- Whether a clipped anchor under the top layer counts as hidden for `anchors-visible` on this build. The `V.*` rows are that reading; report what they show.
- Chromium 141 is the styles session's run of the same file, after yours.

## Scope

- **Owned:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/probe/j-native-probe-2.test.ts` alone.
- **Off-limits:** every tracked file in every checkout, and every other worktree.
- **Tools and limits:** no install, commit, or push.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the file's path;
- the exact command;
- its `Tests` line;
- every `ROW` line verbatim, in order;
- one sentence per row group (the corrected size rows, the corrected arrow rows, and the `V.*` rows) saying what the readings show, marked "measured";
- for each control, whether it read its expected value.

## Deviation contract

Stop and report the row and the error when a control reads anything other than its expected value, or when a row cannot be measured on this host. A failed control means the method, not the platform, is in question. You decide and record the fixture sizes, the row order, and the scroll distances.

## Acceptance criteria

1. The file runs, and every control reads its expected value: `control.present` true, `control.absent` false, the opacity transition `["opacity"]`, the static panel's height equal to its content plus borders, the centred arrow's delta under 1px, and the `position-visibility: always` control failing suppression.
2. Every corrected row and every `V.*` row appears as a `ROW` line.
3. No tracked file changed: `git -C C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe status --short` is empty.

## Review evidence

The Orchestrator re-runs the file itself, retains the file and both logs under the engine's `units/`, and asks the styles session to run it on Chromium 141.
