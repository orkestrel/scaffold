# Unit J-COLLAPSE-SIZE-PROBE round 2 — the paired basis, and a panel with a border and padding

## Role and engine

`opus` on Opus 5.5, the native subagent that wrote round 1, continuing in its worktree. Read everything this brief names before acting.

## Objective

Extend the round-1 probe with the rows its report left for the Orchestrator's ruling, and measure them on Chromium 153:
1. **The paired basis as its own variant:** `calc-size(min-content, size)` on show and `calc-size(auto, size)` on hide.
2. **Every variant, the pairing included, on a horizontal panel with a border and padding.** Bootstrap's hide writes the rect width, which includes both, and the root sets `box-sizing: border-box`.
3. **The vertical twin of the pairing's hide half:** `calc-size(auto, size)` on hide against the pixel path's `getBoundingClientRect().height`, on a panel with a border and padding. J-COLLAPSE-SIZE adopts `calc-size(auto, size)` vertically in both directions, where round 3 read the show half green.

**What changed from round 1, and why.**
- Round 1 found that no single basis matches the pixel path in both directions.
- `min-content` matches show within a sub-pixel, and only `auto` matches hide (`units/j-collapse-size-probe-report.md`).
- The pairing and the boxed panel are the readings that decide whether J-COLLAPSE-SIZE can adopt `calc-size()` with no departure.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- Your round-1 report `units/j-collapse-size-probe-report.md`.
- Round 1's file, retained as `units/j-collapse-size-probe.test.ts` (SHA-256 `3c837a86…`).
- Round 1's logs, `units/j-collapse-size-probe-153-run-2.log.txt` and `-run-3.log.txt`.
- Bootstrap's `node_modules/bootstrap/js/src/collapse.js`: `show` writes `scroll${Dimension}`, and `hide` writes `getBoundingClientRect()[dimension]`.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/tests.md` for the probe's own discipline. Skill: none. Guide: none.

**Installed primitives.** `@orkestrel/test` for any wait.

**Host.** Round 1's worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size` at `92ca407`, with the same run config and script. A foreground call is capped at 10 minutes. Write programs to files under `tmp/j-collapse-size/`, with no heredoc, no `python -c`, and no `node -e`.

**Measurements.** Every row group keeps a control that separates its cases:
- For the boxed panel, a static control reads the border, the padding, and the resolved `box-sizing`.
- Round 1's rows must read unchanged. Compare them with `compare-runs.sh`.

**Control identifiers.** Row labels stay in the log, and titles say what each row measures.

**Standing conditions.** None.

## Unknowns

- Whether the boxed panel separates `auto` from the pixel path on hide. Report the reading, whatever it is.

## Scope

**Owned.** `tmp/probe/j-collapse-size-probe.test.ts` and `tmp/j-collapse-size/` in the worktree.

**Off-limits.** Every tracked file.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the new phase tables:
  - the pairing on the round-1 fixtures;
  - every variant on the boxed horizontal panel;
  - the vertical boxed hide;
- the new controls' readings;
- the comparison showing round 1's rows unchanged;
- per phase, where the pairing differs from the pixel path, and by how many pixels;
- the file's SHA-256, the run command, and the log paths;
- `git status --short`.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop when a control does not separate its cases. You decide the border and padding values and the row labels.

## Acceptance criteria

1. The file runs to completion on Chromium 153, and every control reads its expected value.
2. Round 1's rows read unchanged.
3. The pairing, the boxed horizontal variants, and the vertical boxed hide each have rows at every phase.

## Review evidence

The Orchestrator re-runs the file and asks the styles session for the same file on Chromium 141.
