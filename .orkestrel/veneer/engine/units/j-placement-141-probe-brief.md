# Unit J-PLACEMENT-141-PROBE — a probe that separates why Chromium 141 does not anchor a scroller-resident dropdown menu

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing one probe file in the probe worktree. It is native because the probe runs in Chromium.

## Objective

A probe file whose rows decide, on Chromium 141, which factor stops a dropdown menu inside a scroller from anchoring to its toggle. It must also read the same rows on Chromium 153 here, so each variant has a known-good comparison.

## Context

**The ruling.** Read `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-placement-141-diagnosis-verdict.md` whole. Then read the objective lane's § The deciding probe row in `units/j-placement-141-diagnosis-analyst.md` beside it. That section specifies the rows, and this unit writes them.

**The file to start from.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3.test.ts` is the round-3 probe. Its fixture `buildScrolledDropdown`, its steps `scrollerClipFull`, `scrollerClipPartial`, and `scrollerRestore`, its `runBoth` pair, its `measure` rows, and its controls produced the readings.
- Copy what the new file needs into the new file. A probe file is an instrument, not repository code.
- Keep the baseline's preparation exactly, including the trusted pre-show click, so that the baseline variant reproduces the round-3 reading.

**The rows.** Build `D.initialization` with one variant per factor, each on a fresh `buildScrolledDropdown` fixture under the candidate rule and the `always` control. Run full clipping, partial clipping, and restoration.

| Variant | The one change |
| --- | --- |
| `baseline` | none; it must reproduce the round-3 dropdown rows |
| `prescrolled` | scroll the scroller before `show()`, then scroll further after it |
| `body` | after the Dropdown is constructed and before `show()`, move only its menu to `body` |
| `display` | keep the menu's place; set `display: block` on it and force a layout read before `show()` |
| `noClick` | omit only the trusted pre-show click |
| `entryFocus` | keep the baseline preparation; after showing, read the geometry, focus the menu entry, and read it again |
| `noFallback` | after showing, set `position-try-fallbacks: none` |
| `plainArea` | after showing, change only `position-area` to `bottom` |
| `anchorInsets` | after showing, set `position-area` and `position-try-fallbacks` to none, and use `top: anchor(bottom)` and `left: anchor(left)`, keeping the bottom gap |
| `singleName` | leave only the generated name in the reference's `anchor-name` |
| `missingAnchor` | point `position-anchor` at a name that no element carries; this is the negative control |

**Record at every phase:**
- the reference and menu rectangles;
- the scroller's and the document's scroll offsets;
- the menu's parent;
- the menu's inline style;
- the menu's computed `position`, insets, margins, `position-anchor`, `position-area`, `position-try-fallbacks`, `display`, and `overflow`;
- hit testing and the lifecycle fields, as the round-3 rows do.

**The pass condition, per phase.** The menu's top minus the reference's bottom is `2px`, and the menu moves with the reference's actual movement. The candidate rule loses its hit target only when fully clipped, and `always` keeps it. A passing hit test alone does not count. On Chromium 141 the round-3 control passed with the menu at `top: 2`.

**Controls.** The file checks, and prints as `CONTROL` lines:
- `baseline` reproduces the round-3 geometry on the build it runs on: `283` on Chromium 153;
- `missingAnchor` loses anchoring, so the instrument detects a lost anchor.

A control that fails makes the run's readings void. Say so in the file's output.

**Output format.** Print one `ROW <variant>.<rule>.<phase> <json>` line per reading, as the round-3 file does, so the two builds' logs compare line by line.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, with `.claude/rules/tests.md` for the mechanics a probe borrows.
- The probe is an instrument under `tmp/probe/`, which nothing in the repository imports and no gate reads.
- Skill: none.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The probe worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe` is detached at Veneer `main` `094a71e`, with `node_modules` installed and the Vite pre-bundle cleared.
- Run the file with `npx vitest run --config C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/tools/vite.probe-worktree.config.ts --root C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe --reporter=verbose tmp/probe/j-placement-141-probe.test.ts`.
- A foreground call is capped at 10 minutes. Write each program to a file and run it: no heredoc, no `python -`, no `node -e`.

**Standing conditions.**
- `tmp/probe/j-native-probe-2.test.ts` and `j-native-probe-3.test.ts` sit in the same directory. Leave them unchanged.
- J-SAMEWAY-ENGINES-B owns `Placement`, `Dropdown`, and their tests in another worktree, so this unit changes no source.

## Unknowns

- Whether a variant that changes the menu's computed placement after `show()` reads back through the engine's own `update()`. Record whether `update()` ran between phases.
- Whether moving the menu to `body` breaks the dropdown's own menu lookup. If it does, record the break as that variant's reading rather than working around it.

## Scope

**Owned.** `tmp/probe/j-placement-141-probe.test.ts` in the probe worktree, and `tmp/j-placement-141/` there for programs and logs.

**Off-limits.** Every tracked file in the probe worktree, and every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the file's path and its SHA-256;
- the Chromium 153 run's log path, with the controls' lines and the summary line verbatim;
- a table per variant on Chromium 153: the rule, the phases' menu top minus reference bottom, and the movement against the reference;
- what each variant predicts on Chromium 141 for each candidate cause in the verdict;
- `git status --short` of the probe worktree;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. You decide and record:
- the helper layout inside the file;
- the order of rows;
- how a variant restores what it changed before the next variant runs.

Stop and report when `baseline` does not reproduce `283` on Chromium 153.

## Acceptance criteria

1. The file runs to completion on Chromium 153, with every control line `ok`.
2. Every variant in the table has rows for both rules and every phase.
3. The output names each variant's prediction per candidate cause.

## Review evidence

The Orchestrator re-runs the file on Chromium 153 and checks its digest, retains the file beside the round-3 probe, and asks the styles session for the Chromium 141 run.
