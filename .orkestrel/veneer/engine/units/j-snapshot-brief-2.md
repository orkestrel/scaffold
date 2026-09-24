# Unit J-SNAPSHOT round 2 — the judging rule, the proof repair, the fold, and the wording

Successor to `j-snapshot-brief.md`. What changed and why: round 1's audit (`j-snapshot-audit-verdict.md`) confirmed the mechanism and failed claims 2 and 5 with F2 outside the claims; the subjective lane's R1 exposed a partial-state regression the "last holder judges" rule causes, and the Orchestrator adopted its proposal. This round carries those repairs and the wording bounds.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent ae8fdf37c94c55f5e), a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot` (branch `unit/snapshot`, base `afae42c`, round 1 uncommitted; the Orchestrator applied your `Modal.test.ts` patch to the tree, so that file is now dirty and owned by this round). Perform the assignment directly and spawn nothing.

## Objective

Every departure judges the removal of a `class` or `style` attribute against the shared first reading, so a partial set of holders restoring leaves no empty attribute behind; the Dropdown reproduction's no-later-writes assertion binds; the presence members are one layer under one term; the contract sentences carry no banned term and no campaign unit name; the retained case titles name what they prove; the scoped gates are green.

## Context

**The verdicts are the authority.** `j-snapshot-audit-verdict.md` (the per-claim rulings and carriers), `j-snapshot-audit-objective-verdict.md` (claim 2: the observer defect and its smallest fix; the S2 binding table), `j-snapshot-audit-subjective-verdict.md` (F1 the fold, F2 the four titles, F3 the `once` sites, R1 the scenario, R3 the type question, R4 the unit-name sentences, the Bounds list), `j-snapshot-audit-checker-verdict.md` (F1 the `once` sites with their lines). Read all four before editing.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Design laws: one concept one term, no superfluous wrappers, derive state; § Writing); `.claude/rules/architecture.md`, `typescript.md`, `tests.md`, `documentation.md`, `writing.md` (§ Substitutions: `once` → `after`; § Voice: no human faculty for software). Skill: none. Standing decisions: E6, E13 as amended at this round (`decisions.md`).

**Host and scoped tests.** As round 1: Windows 11, Git Bash, the worktree root, Chromium 153; `npm run test:src:browser -- <file>` runs one file. Run one test file per obligation while you work, the whole browser suite once before the report, no builds. The `prove` MCP server is not reachable to a native subagent; record that you made no call.

## Unknowns

- Whether `HostSnapshot.#presence.get(element) ?? new Map()` widens `records` to `Map<any, any>` (R3). Settle it with a scratch file under `tmp/j-snapshot/` typechecked with `npx tsc --noEmit -p configs/src/tsconfig.browser.json` after adding the scratch to a temporary include, or with a one-line probe in the worktree that you delete; record the reading. Give the `new Map()` in `#join` and in `#publish` an explicit type argument either way.

## Obligations

- **S1' The judging rule.** `#leave(element, attribute)` returns `!record.present` on every departure, not only the last holder's; the record is forgotten (and the element's map entry deleted) when the last holder leaves; `restore` removes the attribute when the departure returns true and the list (class) or the inline style (style) is empty, as now. Red first: the R1 scenario as a real `Button` and `Collapse` on one trigger with no `class` attribute — the button toggles on (saving `active`), the collapse hides then shows (saving `collapsed` and removing it), the button toggles off leaving `class=""`, `button.destroy()` runs while the collapse is live — asserts `trigger.hasAttribute('class')` false after the destroy; record its red reading against round 1's source, then green. The four round-1 S1 cases and the Modal case stay green. Amend the contract sentences (types remarks, class remarks, the guide's § Ownership and restoration, `#### Modal`) from "only the last snapshot holding a record judges" to: every restoration that recorded the attribute absent removes it when its own writes leave the list empty, the reading shared from the first save, so neither a complete set of restorations in any order nor a partial one leaves the attribute present and empty unless a write throws.
- **S2' The proof repair.** In "restores the whole placement before a dropdown destroy a reaction to the placement popover restoration calls returns": retain the observer's deliveries in a recorder (a plain array the callback pushes into) and assert after the awaited `hide()` that the recorder is empty and `takeRecords()` is empty; add the negative control the objective lane names — a mutation that writes `data-popper-placement="late"` on the menu after the outer restoration's `removeAttribute('popover')` returns must redden the case (an instrument row). Keep the nested-return reading.
- **S3' The sentences.** Replace temporal `once` with `after` in the `HostSnapshotInterface.restore` remarks, the § Ownership and restoration paragraph, and the case title "…found absent once every snapshot…"; reword the `#### Tab` sentence (around line 1230) and the `#### Carousel` sentence (around line 1805) to state each bound in the guide's own voice with no campaign unit name (what the code does, and what a consumer meets), keeping the bound's substance; replace "judges" with a verb that names the software's action (removes, reads, decides is acceptable only if the rule's voice sentence admits it; prefer "removes … when"). Sweep the added prose for the substitution table's unconditional rows and the judged rows and record the pattern and the paths.
- **S4' The type argument.** Per Unknowns.
- **S5' The fold.** Delete `#hold` and `#depart`; `#join(element, attribute)` and `#leave(element, attribute): boolean` become instance methods that reach the static `#presence` directly and carry the take-back and membership logic their callers had; `#joined` and `#leaving` stay. The class comments describe each once.
- **F2 The titles.** Retitle the four cases the subjective lane lists for what each proves (its proposals are acceptable); a title names no removed mechanism (`classed`, `styled`, "hands pending presence", "taken presence recording").
- **Bounds (wording, folded).** The class remarks' first paragraph carries the judging rule; the `#pending` comment reads that the mark is set before the write runs; the `#publish` comment reads the current throw sentence; the instrument row for the `written` mark is named for what it removes.
- **The instrument.** `tmp/j-snapshot/mutations-2.py` carries round 1's rows that still name a live line, the S1' row (judge only at the last holder: the R1 case reddens), the S2' late-write control row, and a row per retitled case's binding where round 1 had one; the log records each row's first failure line and ends with the digest receipt.
- **The report.** As round 1: obligations with cases, red and green readings verbatim, the `types.ts` and guide diffs, the instrument table verbatim, the R3 reading, the scoped chain's exit lines, `git status --short`, `git diff --stat`, the deviation state.

## Scope

**Owned.** `src/browser/HostSnapshot.ts`; the `HostSnapshotInterface` remarks in `src/browser/types.ts`; in `guides/veneer.md` § Ownership and restoration, the `#### Modal` presence paragraph, the `#### Dropdown` re-entry sentence, the `#### Tab` and `#### Carousel` snapshot sentences; `tests/src/browser/HostSnapshot.test.ts`; `tests/src/browser/Modal.test.ts` (the one case round 1 patched, and the R1 case if you place it there rather than in `HostSnapshot.test.ts`); `tmp/j-snapshot/**`.

**Off-limits.** Every engine file (`Button.ts`, `Collapse.ts`, `Dropdown.ts`, `Modal.ts`, …), `Placement.ts`, `helpers.ts`, `tests/setupBrowser.ts`, the vendored files, `ROADMAP.md`, and every file not owned.

**Tools and limits.** No install, commit, push, or discarding git command; no tree-wide `format` or lint `--fix`. Scoped checks: `npm run check:src:browser`, `npm run check`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`, `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`, `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts`, then once: `npm run test:src:browser`, `npm run test:guides`, `npm run test:policy`. Write the chain to `tmp/j-snapshot/acceptance-2.sh` and run the file.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the retitled titles' wording, where the R1 case sits, the guide sentences' exact words within S3'. Stop and report when the judging rule reddens a consumer suite you cannot repair inside the owned files (return the patch), or when the R1 case cannot be made red against round 1's source.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run check`, oxlint, and oxfmt exit 0.
2. `HostSnapshot.test.ts` green with the R1 case present and its red reading recorded; the Dropdown reproduction carries the recorder assertions.
3. The instrument log: every row `EXACT` or `JOINED` with its first failure line, `GREEN?` rows at 0 failed, the digest receipt; the late-write control row reddens the Dropdown reproduction.
4. `npm run test:src:browser`, `npm run test:guides`, and `npm run test:policy` exit 0 once at the end.
5. `#hold` and `#depart` are absent; no `once` in a temporal sense, no campaign unit name, and no "judges" in the owned prose; the status lists the owned files only.

## Review evidence

The Orchestrator takes `git diff HEAD` and `git status --short` after the report, runs the scoped gates, and names both in the round-2 audit brief.
