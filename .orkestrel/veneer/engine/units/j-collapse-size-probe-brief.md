# Unit J-COLLAPSE-SIZE-PROBE — which `calc-size()` basis runs a horizontal collapse to Bootstrap's extent

## Role and engine

`opus` on Opus 5.5, a native subagent that writes probe files in its own worktree. Read everything this brief names before acting.

## Objective

Measure, on this host's Chromium 153, how far a horizontal `.collapse-horizontal` panel's width runs, and in what shape, under Bootstrap's pixel path and under each `calc-size()` basis:
- `auto`;
- `max-content`;
- `fit-content`;
- `min-content`.

Measure it at every phase of show and hide. The result tells J-COLLAPSE-SIZE which basis, if any, adopts `calc-size()` without departing from Bootstrap's horizontal extent (E27 as J-NATIVE-PROBE round 3 amended it).

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- `decisions.md` § E27, and the amendment "E27 and E29 amended at J-NATIVE-PROBE round 3". It records the departure this probe measures: a horizontal panel's `calc-size(auto, size)` runs to the block's auto width (300px in the fixture), while Bootstrap's pixel path runs to the child's scroll width (30px) and then jumps to auto when the inline width clears.
- `units/j-native-probe-3.test.ts`, the pattern.
  - Its horizontal fixture is around line 234: a 30px child in a 300px container, `collapse-horizontal show collapsing`.
  - `installHorizontalRule` is around line 172, with Bootstrap's `.collapse-horizontal.collapsing { width: 0; height: auto; transition: width 0.4s ease }`.
  - Its `size.horizontal.pixel` and `size.horizontal.calcSize` rows are around lines 507-516.
  - Its width twin of `pausedHeightAtHalf` is around line 99.
  - Its readings are `units/j-native-probe-3-153.log.txt`.
- Bootstrap's pixel path: `node_modules/bootstrap/js/src/collapse.js`, `show` and `hide` (the `scroll${capitalizedDimension}` write, then the inline clear at `complete`).
- The run pattern: `units/j-placement-141-probe-2-run.sh` and `units/j-placement-141-probe-2-vite.config.ts`. That config composes the worktree's own `srcBrowser`, includes `tmp/probe/**/*.test.ts`, and uses no setup files.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md` for the probe's own discipline.

The probe is an instrument, not a shipped test. Skill: none. Guide: none.

**Installed primitives.** `@orkestrel/test` for any wait.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size`, cut from Veneer `main` at `92ca407`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-collapse-size/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.

**Measurements.** Every row group carries a control whose reading separates the cases. J-NATIVE-PROBE's rounds 1 and 2 measured the probe rather than the platform where a row had no such control.
- Reproduce round 3's static control (`control.completion.horizontal.static`: `300px`, 300, 300).
- Reproduce the `auto` basis running to 300 against the pixel path's 30, before any new row counts.

**Control identifiers.** Row labels such as `size.horizontal.maxContent.show.half` stay in the log, and the test titles say what each row measures.

**Standing conditions.** None. The worktree is fresh at `92ca407`, and every gate reads green there.

## Unknowns

- Whether a `calc-size()` basis both runs to the child's scroll width and ends in the same state as Bootstrap's inline clear. Report the reading, whatever it is.

## Scope

**Owned.**
- `tmp/probe/j-collapse-size-probe.test.ts` in the worktree.
- `tmp/j-collapse-size/`: its config, run script, and logs.

**Off-limits.** Every tracked file in the worktree. The probe changes no source, no test, and no config.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- **A table per variant**, for show and for hide, with the panel's computed width and its rect width at each phase:
  - the start;
  - the transition paused at half, through the width twin of `pausedHeightAtHalf`;
  - the end before the inline clear;
  - after the inline clear.
- **A growth row for each `calc-size()` basis:** content that grows mid-transition.
- **Every control's reading.**
- **Which basis, if any, matches the pixel path at every phase.** Name each phase where each basis differs, by how many pixels.
- **The file's SHA-256, the run command, and the log paths.**
- **`git status --short`.**

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a control reads a value that does not separate its cases. You decide the row labels, the variant order, and the fixture's exact markup beyond round 3's.

## Acceptance criteria

1. The probe file runs to completion on Chromium 153, and every control reads its expected value.
2. Each basis has show and hide rows at every phase, plus a growth row.
3. The run command reproduces the log.

## Review evidence

The Orchestrator re-runs the file, checks the controls, and asks the styles session for the same file on Chromium 141.
