# Unit J-NATIVE-PROBE — measure calc-size() for Collapse and the anchor-centred arrow on the gate hosts

## Role and engine

`builder` on Sonnet, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash). You author one probe file and run it on this host. Perform the assignment directly and spawn nothing.

## Objective

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/probe/j-native-probe.test.ts`, the instrument E27 asks for (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E27), and run it once on Chromium 153. It must measure the rows the planner specified in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-design-planner-proposal.md` § Units, J-NATIVE-PROBE: the size rows, the arrow rows, and the risk row. Every reading is logged as one `console.log` line, `ROW <name> <json>`.

## Context

**Read first.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Writing and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` § Probes, then E27 and the planner proposal named above. For the file's shape, read the terrain instrument `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-platform-2.test.ts` and its log `j-engine-terrain-platform-2.log.txt` beside it. They use the same config, `console.log` rows, and controls.

**How it runs.** From `C:/Users/mikes/WebstormProjects/veneer`, run `npx vitest run --config C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/vite.probe-browser.config.ts --root C:/Users/mikes/WebstormProjects/veneer --reporter=verbose tmp/probe/j-native-probe.test.ts`.
- The config composes the workspace's browser project over `tmp/probe/**`, with no setup files.
- `tmp/probe/` is ignored by git.
- The main checkout is clean on `main`, and no unit writes in it.

**The rows (from the planner, measured, never inferred).**
- **Controls.** `control.present` must read `true` (for example, `'addEventListener' in document`). `control.absent` must read `false` (a property no build defines).
- **Size rows.**
  - Read `CSS.supports('height', 'calc-size(auto, size)')`.
  - Build a collapse-like panel with the test-local rules `.collapse:not(.show) { display: none }`, `.collapsing { height: 0; overflow: hidden; transition: height 0.4s ease }`, and the horizontal variant `.collapse-horizontal.collapsing { width: 0; height: auto; transition: width 0.4s ease }`.
  - Run each size row on two paths side by side:
    - the **pixel path**: write `${scrollHeight}px` after adding `collapsing`;
    - the **calc-size path**: write `calc-size(auto, size)`, with a forced reflow before the write.
  - Read on both paths:
    - `getAnimations()`, with each animation's `transitionProperty`, on show and on hide;
    - the rendered height with the animation paused at 50 percent (`animation.pause()`, then `animation.currentTime` at half the duration);
    - the rendered height at completion, after the inline size clears, for a panel whose content grows mid-transition and for a panel with a 3px border;
    - a horizontal panel's width at its midpoint and at completion, with a 30px child in a 300px container;
    - the same transition with `:root { interpolate-size: numeric-only }`;
    - a zero-duration transition, recording whether any animation is created.
- **Arrow rows.**
  - Build a tip promoted with `popover="manual"` and `position: fixed`, anchored to a reference with `anchor-name`, `position-anchor`, and `position-area`, as `C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts` promotes one. Read that file's constructor and `update` for the exact properties.
  - Give the tip an arrow child, `position: absolute`, with `position-anchor` naming the reference's anchor, `justify-self: anchor-center`, `left: 0`, and `right: 0` on a top or bottom side.
  - Read:
    - the arrow's centre against the reference's centre, beside a control arrow whose `position-anchor` names no anchor;
    - the clamp, for a `top span-right` tip under a reference wider than the tip, against `Placement`'s arithmetic, which clamps the arrow to the tip's padding edge;
    - a tip with a 3px border;
    - a flipped side (`position-try-fallbacks: flip-block` with the preferred side overflowing).
- **Risk row.** Build a menu promoted with `popover="manual"` and a `<button commandfor=ID command="hide-popover">`. Show the menu, click the button with `userEvent` from `@vitest/browser/context` (or an equivalent the terrain file used), and read `matches(':popover-open')`.

**Host.** Windows 11, Git Bash; `npm` and `npx` resolve to the `.cmd` shims; Chromium 153.0.8010.12. Write each multi-step program to a file and run the file; no heredoc, no `node -e`.

**Standing conditions.**
- Other units write in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/**`; never touch those.
- Change no tracked file anywhere.

## Unknowns

- Whether each API reads the same on Chromium 141. That is the styles session's run of this same file, after yours.

## Scope

- **Owned:** `C:/Users/mikes/WebstormProjects/veneer/tmp/probe/j-native-probe.test.ts` alone.
- **Off-limits:** every tracked file, and every worktree.
- **Tools and limits:** no install, commit, or push.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Your final message:
- the file's path;
- the exact command;
- its `Tests` line;
- every `ROW` line verbatim, in order;
- one sentence per row group (size, arrow, risk) saying what the readings show, marked "measured".

## Deviation contract

- **Stop and report** if the config cannot run a file from `tmp/probe/`, or if a row cannot be measured on this host. Name the row and the error.
- **Decide and record yourself:** the fixture sizes, the order of rows, and the control choices.

## Acceptance criteria

1. The file runs, and both controls read `true` and `false`.
2. Every row named under The rows appears as a `ROW` line.
3. No tracked file changed: `git -C C:/Users/mikes/WebstormProjects/veneer status --short` is empty.

## Review evidence

The Orchestrator re-runs the file itself, retains the file and both logs under the engine's `units/`, and asks the styles session to run it on Chromium 141.
