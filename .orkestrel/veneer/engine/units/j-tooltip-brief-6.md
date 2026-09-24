# Unit J-TOOLTIP round 6 — the second merge: main with J-OFFCANVAS and the styles landing

Successor to `j-tooltip-brief-5.md`. What changed and why: while round 5 ran, Veneer `main` took the styles session's landing (`0fdadf4`) and then J-OFFCANVAS lands over it, so the tooltip's branch (`0807a4f`, round 5 committed by the Orchestrator as the merge commit) must merge `main` once more before its landing audit. The Orchestrator's dry run names the conflicts: `guides/veneer.md`, `src/browser/constants.ts`, `src/browser/index.ts`, `src/browser/validators.ts`, and `tests/src/browser/index.test.ts`; `src/browser/parsers.ts` and `types.ts` auto-merge. This round is the resolution only; no mechanism changes.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent ac01697e5b3344cdc), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip` (branch `unit/tooltip`). The Orchestrator has run `git merge main` in the worktree, which stopped on the conflicts; the guide's Compatibility table block is resolved by the Orchestrator's script where it conflicts, every other conflict is yours. Perform the assignment directly and spawn nothing. Do not commit.

## Objective

Every conflict resolved keeping both sides — the tooltip's declarations beside the offcanvas's (both appended to the same tables, barrels, guards, and export lists) and the styles landing untouched — with one import block, one export order (the barrel's), one Surface table in `main`'s order with the tooltip's rows inserted, and the tooltip's `#### Tooltip` section beside `#### Offcanvas` in the guide's engine order; the full landing chain green.

## Context

`main`'s tip after the offcanvas landing is what the Orchestrator's resume message names. The offcanvas side added `OFFCANVAS_*` tables after the toast rows in `constants.ts`, `export * from './Offcanvas.js'` in `index.ts`, `isOffcanvasEvent` in `validators.ts`, the offcanvas rows in `tests/src/browser/index.test.ts`, and `#### Offcanvas` with its Surface, Methods, Delegation, and plugin rows in the guide; the styles landing touched `guides/veneer.md` too (styles sections, the roadmap carriers). The tooltip side added `TOOLTIP_*` tables, `export * from './Tooltip.js'` and the sanitizer barrel row, `isTooltipEvent` and the sanitize-target guard, the tooltip export rows, and `#### Tooltip` with its rows. Where both sides appended to the same table or list, keep both in the barrel's order (tooltip after toast and offcanvas after tooltip, or the alphabetical order the file already uses — read the file's convention and follow it). Law as round 5.

## Obligations

- **M1** Resolve the five files as the Objective states; run oxfmt on the guide alone; confirm `git diff --name-only --diff-filter=U` is empty.
- **M2** Run the landing chain once (`tmp/j-tooltip/acceptance-6.sh`: `format:check`, `lint:check`, `check`, `test:guides`, `test:policy`, `test:src:browser`, `build:src:core`, `build:src:styles`, `build:src:browser`, `test:conformance`, `test:setup`), every exit recorded. Where `test:src:browser` fails in a file the merge touched, repair the resolution, not the engine.
- **M3** The report: the resolution per file (which side each hunk kept), the chain's exit lines, `git status --short`, and `git diff --stat MERGE_HEAD` (the landing diff the audit reads).

## Scope

**Owned.** The five conflicted files for their resolution only, `tmp/j-tooltip/**`. **Off-limits.** Every engine's logic, every test's assertions, and every file not conflicted; a change one needs is a report-only patch.

**Tools and limits.** As round 5; no commit, install, push, or discarding git command; `git merge --abort` barred.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the order within a shared table or list per the file's convention. Stop and report when a conflict's two sides contradict in behaviour, or when the chain reddens outside a merge-touched file.

## Acceptance criteria

1. No unmerged path; the landing chain green once, every exit recorded.
2. The status lists the five files (staged) and nothing else outside `tmp/`.
