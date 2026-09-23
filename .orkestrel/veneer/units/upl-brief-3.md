# Unit UTIL-PLACEMENT (`upl`) — round 3, the mechanical fix round

Supersedes `upl-brief-2.md` for this round; the earlier briefs stay in place unedited. This brief carries every finding `upl-audit-2-verdict.md` § Reconciliation names, each from the lane verdicts beside it (`upl-audit-2-objective-verdict.md`, `upl-audit-2-subjective-verdict.md`, `upl-audit-2-checker-verdict.md`).

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-upl` (branch `unit/upl`, the round-1 and round-2 writes uncommitted over `e4e6a40`). The executor that opens this brief is that subagent. Every edit here is specified; a choice this brief does not make is not the unit's to make.

## Objective

Every finding of round 2 is closed in the owned files and in revised patches `tmp/units/upl-shared-3.patch` and `tmp/units/upl-unlisted-3.patch` (each a unified diff against `e4e6a40` with an `index` line per file, superseding the round-2 patches whole), with every proof still distinguishing its mutation and every gate green on the fresh copy.

## Context

Everything in `b-utilities-upl-brief.md` § Context and `upl-brief-2.md` § Context binds unchanged. The round-2 report is `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-upl-report-2.md`; the round-2 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-2/` and the worktree's `tmp/units/upl-instruments-2/` (`tools/stage.sh`, `sync.sh`, `patch.sh`, `fresh.sh`, `mutate.py`, `mutations.sh`, `matrix.py`, `caps-reading.sh`). Rebuild the land copy with `tools/stage.sh` and `tools/sync.sh`, apply the round-2 patches there, and make the edits below there and in the owned files; write this round's instruments under `tmp/units/upl-instruments-3/`. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell.

## Findings to close

1. **The width cap's visibility (F-CAP).** In `app/browser/constants.ts`, the `Maximum sizes` specimen's line inside the frame carries the shipped `w-50` step: `<div class="viewport"><p class="w-50"><span class="placeholder vw-100 mw-100" …>` (the height half unchanged). Add to the `SIZING_SPECIMENS` remark: "The line inside the frame is half the frame's width, so a box the width cap does not hold runs past the line to the frame's edge, where the frame clips it, and the capped box stops at the line." Add the section mutation `max-width-cap-dropped` (the `mw-100` class removed from that span) to `mutate.py`; record it red on the Sizing section proof's cap case, with the control green. Re-run `tools/caps-reading.sh` and record the readings after the change.
2. **The binding case's independent memberships (claim 5).** In `tests/setupStyles.test.ts`, the placement binding case: derive the required offset edges from the inventory's unconditioned rule names matching `^\.(top|bottom|start|end)-` (the edge is the text before the first hyphen after the dot) and assert `OFFSET_EDGES` equals that set sorted, each once; derive the required viewport cases from the inventory names `.vw-100`, `.vh-100`, `.min-vw-100`, and `.min-vh-100` and assert `VIEWPORT_SIZE_CASES` covers each exactly once; assert `STICKY_SCROLLER.offset` is greater than zero and `STICKY_SCROLLER.style` contains `overflow: auto`. Keep every existing assertion. Add the controls `edges-emptied` (`OFFSET_EDGES` frozen empty), `viewport-cases-emptied`, and `scroller-offset-zero` under `logs/setup/`, each red on the binding case alone, and re-run the round-2 setup controls and the control green.
3. **The fixtures (F-FIXTURE).** `tests/setupStyles.ts` exports `TRANSLATION_BOX` (`'width: 100px; height: 40px'`, frozen, documented "Carries the inline box the translation proofs read their offsets from."); the translation case and the later-value case in `tests/src/styles/utilities/position.test.ts` read it instead of the inline style; `tests/src/styles/utilities/sizing.test.ts` around line 37 composes `${PLACEMENT_CONTAINER}; display: flex; align-items: flex-start` instead of restating the container. Add `TRANSLATION_BOX` to the export list and the freeze case.
4. **The compatibility rows (F-ROWS).** In `guides/veneer.md` § Compatibility: "reading the `--vn-stack-fixed` token" and "reading the `--vn-stack-sticky` token"; "The official `.translate-middle`, `.translate-middle-x`, and `.translate-middle-y` selectors ship".
5. **The setup names and order (F-SETUP).** Rename `SIZE_STEP_CASES` to `SIZING_STEP_CASES` at every site (the constant, its TSDoc, its consumers, the export list, the freeze case); the `OFFSET_STEP_CASES` doc opens "Lists the position offset steps"; "class stem" becomes "class prefix" in every TSDoc and comment the round-2 patch added; in `tests/setupStyles.test.ts` the export literal and the import list place `PLACEMENT_*` after `PLACEHOLDER_SIZE_CASES` and `POSITION_*` before `PROGRESS_MARKUP` (code-point order, as the file keeps it).
6. **The shell comment (F-SHELL).** `app/browser/styles/_shell.scss` around lines 39 to 47: add that the bounded height gives a percentage height or offset a definite height to resolve against, so the `Edge offsets`, `Centered translation`, `Stacking levels`, and `Height steps` specimens use the frame for that reason.
7. **The ledger table's position.** Read the rule in `guides/veneer.md` § Departures ("One table follows per component, in the order the shipped keys sort", around line 2889) and the order the existing `#### ` tables follow at `e4e6a40`; place the `#### position` table where that order puts it, and record the reading in the report.
8. **The log headers (claim 2).** `tools/mutate.py` writes into each log header the copy it ran in and the SHA-256 of each mutated file before the mutation and after the restore, with `equal=True` or `equal=False`.
9. **The report.** This round's report states no count of a growable set ("One file outside the Shared row" becomes "`tests/setupBrowser.test.ts` sits outside the Shared row"; "both patches" becomes "the shared and unlisted patches"; "both logs" names the logs), names no list item by its position, states the actual failing-first history (red before, green after) and the section proofs' execution population (one viewport under the `app:browser` project; the journey covers the variants), states that the frame contains and clips a viewport-sized box while the percentage caps resolve against their containing blocks (viewport units stay viewport-relative), and regenerates `round-delta-shared.diff` against the final patch.

## Unknowns

None.

## Scope

As `b-utilities-upl-brief.md` § Scope: the same owned files; the same shared files, report-only, returned as `tmp/units/upl-shared-3.patch` with index lines; `tests/setupBrowser.test.ts` report-only as `tmp/units/upl-unlisted-3.patch`; the same off-limits files. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; the copies under `tmp/probe/` are deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-upl/tmp/units/upl-report-3.md` with: each finding's site, before, and after; the added mutation and controls with their logs; the cap readings after the change; the scoped gate exits with their commands on the fresh copy (the round-2 gate list: `format:check`, `lint:check`, `check`, `build:src`, the style proofs, the setup tables, the section proofs, `test:conformance`, `test:service`, `test:guides`, `test:policy`, `test:setup`, `test:setup:browser`), each with its log; the exact patches; every deviation; and a closing list of what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from a log's name and the exact regular expressions the derivations use where the ones given do not match the inventory's names; stop on any other choice, on a proof whose reading changes beyond the cap case, and on a disagreement between this brief, the earlier briefs, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the fresh copy.
2. The style proofs exit 0 with the round-2 case titles, and the section proofs exit 0 with `max-width-cap-dropped` logged red on the cap case and the control green.
3. The setup-project run over `tests/setupStyles.test.ts` exits 0, and `edges-emptied`, `viewport-cases-emptied`, and `scroller-offset-zero` are each logged red on the binding case alone, with the round-2 controls still red.
4. `test:conformance`, `test:service`, `test:guides`, `test:policy`, `test:setup`, and `test:setup:browser` exit 0 on the fresh copy.
5. The report carries every item of § Findings to close with its site, before, and after, and each patch applies to `e4e6a40` with `git apply --check`.

## Review evidence

`git -C /home/user/veneer-upl status --porcelain` and the owned files' diffs with paths relative to the worktree, captured by the Orchestrator at hand-back as `upl-3.diff` and `upl-3-status.txt`, plus the report and the patches.
