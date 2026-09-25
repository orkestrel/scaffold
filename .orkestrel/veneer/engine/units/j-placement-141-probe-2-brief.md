# Unit J-PLACEMENT-141-PROBE-2 — which rendering order anchors a scroller-resident menu on Chromium 141

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing one probe file in a probe worktree. It is native because the probe runs in Chromium.

## Objective

A successor probe whose variants decide between the two designs in `units/j-placement-141-fix-design-verdict.md`. It reads them on Chromium 153 here, and the styles session runs it unchanged on Chromium 141.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-placement-141-fix-design-verdict.md`, and both proposals it names.
- The probe to succeed: `units/j-placement-141-probe.test.ts`, with its brief `units/j-placement-141-probe-brief.md`.
- Its runs:
  - Chromium 153: `units/j-placement-141-probe-153-orchestrator.log.txt`;
  - Chromium 141: the styles session's `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/native141/j-placement-141-probe-141.log.txt`.
- Keep the `baseline` preparation exactly, including the trusted pre-show click, and keep the controls: `always`, the hit test, and `missingAnchor`.

**The variants.** Each runs on a fresh fixture under the candidate rule and the `always` control, with full clipping, partial clipping, and restoration, as the first probe's do. Each also runs a second show, because the fault recurs there.
- **`tokenFirst`.** Before `dropdown.show()`, add the menu's shown token with no layout read. The engine then finds the token present, so it places a rendered menu. This emulates design A.
- **`tokenFirstLayout`.** The same, plus an `offsetWidth` read before `show()`. This is the first probe's `display` mechanism through the token instead of an inline `display`.
- **`deferAnchor`.** Emulate the deferred design outside `Dropdown`: promote the hidden menu first (`popover="manual"`, then `showPopover()`), then add its shown token, then write the anchoring the placement writes, for the first time after the menu renders:
  - the reference's `anchor-name`;
  - the menu's `position-anchor`;
  - `position-area`;
  - the fallbacks;
  - the insets and offset margins.

  Take the declaration values from `src/browser/Placement.ts` at the base, and name each in the probe.

Report each variant's `pass` and `anchored` fields in the first probe's line shape, so the two runs compare line by line.

**The first probe's controls.** Its `ROUND3['141']` control pins the failing geometry `[2, 2, 2]`. That stays true for `baseline` at an unfixed tip. Keep it, and give the new variants no such pin: a variant reports its geometry and whether it anchored.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md` § Probes, and `.claude/rules/quality.md` § Probes before arguments.
- Skill: none. Guide: none.

**Installed primitives.** `@orkestrel/test` for trusted input, as the first probe uses it.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The probe worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-141b`, detached at Veneer `main` `d33b27c`, with `node_modules` installed.
- Run the file with `npx vitest run --config C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/tools/vite.probe-worktree.config.ts --root C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-141b --reporter=verbose tmp/probe/j-placement-141-probe-2.test.ts`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-placement-141/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.

**Measurements.** The whole run on Chromium 153, three times, with every variant's line.

**Control identifiers.** The variant names are control identifiers, and they stay in the probe.

**Standing conditions.** None.

## Unknowns

- Whether `deferAnchor`'s hand emulation matches what `Placement` would write. Name each declaration and its source line in `Placement.ts`.

## Scope

**Owned.** `tmp/probe/j-placement-141-probe-2.test.ts` and `tmp/j-placement-141/` in the probe worktree.

**Shared (report-only).** None.

**Off-limits.** Every tracked file.

**What asserts the state this change ends.** Nothing; the probe changes no tracked file.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the probe's variant table: name, preparation, and what it emulates;
- the three Chromium 153 runs' variant lines, verbatim;
- `deferAnchor`'s declarations and their `Placement.ts` sources;
- the file's SHA-256, for the styles session's run;
- `git status --short`, which should show no tracked change;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a variant cannot be emulated without an engine change. You decide the probe's layout and the helper names inside it.

## Acceptance criteria

1. The file runs on Chromium 153 three times, and every run reports every variant.
2. `baseline` reproduces its first-probe reading on 153, and `missingAnchor` still fails to anchor.
3. No tracked file changes.

**Observations, not criteria.** The variants' 153 readings. Chromium 141 decides.

## Review evidence

The Orchestrator reads the report, sends the file to the styles session for the 141 run, and rules the design from the two runs.
