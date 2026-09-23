# Unit UTIL-PLACEMENT (`upl`) — round 4, the evidence round

Supersedes `upl-brief-3.md` for this round; the earlier briefs stay in place unedited. This brief carries every finding `upl-audit-3-verdict.md` § Reconciliation names, each from the lane verdicts beside it (`upl-audit-3-objective-verdict.md`, `upl-audit-3-checker-verdict.md`), all under `/home/user/scaffold/.orkestrel/veneer/units/`.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-upl` (branch `unit/upl`, the round-1 to round-3 writes uncommitted over `e4e6a40`). The executor that opens this brief is that subagent. Every edit here is specified exactly; a choice this brief does not make is not the unit's to make.

## Objective

The round-3 code stands. This round adds the proof evidence round 3 left unretained or unreachable, one shape assertion, a corrected delta artifact, and a report whose history the retained logs carry: `tmp/units/upl-shared-4.patch` (one unified diff against `e4e6a40` with an `index` line per file, superseding `tmp/units/upl-shared-3.patch` whole, whose retained copy is `/home/user/scaffold/.orkestrel/veneer/units/upl-shared-3.patch`) and `tmp/units/upl-unlisted-4.patch` (expected byte-identical to round 3, its digest recorded).

## Context

Everything in `b-utilities-upl-brief.md`, `upl-brief-2.md`, and `upl-brief-3.md` § Context binds unchanged. The round-3 report is `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-upl-report-3.md`; the round-3 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-3/` (`tools/` with `fresh.sh`, `stage.sh`, `sync.sh`, `patch.sh`, `mutate.py`, `mutations.sh`, `mutations-round3.sh`, `caps-reading.sh`, `matrix.py`, and the rerun scripts; `logs/`; `fresh-run.log.txt`, `fresh-run-2.log.txt`, `round-delta.diff`, `round-delta-shared.diff`); the round-2 instruments under `upl-instruments-2/` carry the setup-control entries in `tools/mutations.sh` (lines 77 to 82). Copy the round-3 instruments to `tmp/units/upl-instruments-4/`, rewrite every header and path for round 4 before running any of them, and never edit an instrument while it runs. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell. Build the fresh copy the way round 3's `fresh.sh` does (`e4e6a40` plus the owned files plus the round-3 patches), make the shared edits of item 4 there, and regenerate the patches with `patch.sh`. Where the section project reads the built `dist/src/styles/index.css` file, rebuild it (`npm run build:src:styles`) after a partial mutation and after its restore, and record in each such log that it did.

## Findings to close

1. **The round delta artifact** (`round-delta.diff`). Reconstruct the round-2 owned files by extracting `e4e6a40` into a scratch directory and applying the owned hunks of `/home/user/scaffold/.orkestrel/veneer/units/upl-2.diff` there; write `tmp/units/upl-instruments-4/round-delta.diff` as `git diff --no-index` between that reconstruction and the worktree for every owned file, so the `_shell.scss` hunk shows the comment change alone. Regenerate `round-delta-shared.diff` the same way between the round-3 and round-4 shared patches applied to two extracts of `e4e6a40`.
2. **The geometric cap mutation.** Add to `tools/mutate.py`'s run list the mutation `max-width-rule-dropped`: in `src/styles/utilities/_sizing.scss` the line `@include utility(mw, max-width, $whole, $infix);` removed. Run the Sizing section proof under it (the section command `mutations-round3.sh` uses), rebuilding the cascade where the project reads the built file. Expected reading: the case that reads the caps reddens at the width comparison (`for (const [capped, limit] of reading.caps) expect(capped).toBe(limit)`), the capped box reading the viewport width while its line reads half the frame; record the log as `logs/mutations/max-width-rule-dropped.log.txt` with the failing assertion's line, and the unmutated control green beside it. Keep `max-width-cap-dropped` and its log. Run `tools/caps-reading.sh` in the fresh copy and retain its output as `logs/caps-reading-4.log.txt`.
3. **The round-2 setup controls re-run.** Run `setup-share-wrong`, `setup-level-wrong`, `setup-infix-dropped`, `setup-clip-wrong`, `setup-width-wrong`, and `start-unfocused` through `mutate.py` in the fresh copy with the edits and commands `upl-instruments-2/tools/mutations.sh` lines 77 to 82 give, one log each under `logs/setup/`, each red on the case its round-2 log names, and the unmutated setup-styles and setup-browser controls green beside them.
4. **The translation fixture's binding** (`tests/setupStyles.test.ts`, shared). Import `TRANSLATION_BOX` beside `PLACEMENT_CONTAINER`; in the placement binding case, directly after the `PLACEMENT_CONTAINER` assertions, add `expect(TRANSLATION_BOX).toMatch(/^width: \d+px; height: \d+px$/u)`. Add the control `translation-box-malformed` (`TRANSLATION_BOX` set to `'width: 100px'`) under `logs/setup/`, red on the binding case alone.
5. **The report.** Write `tmp/units/upl-report-4.md`: each item's site, before, and after; the history the retained logs carry (`fresh-run.log.txt` records a format failure, a passing `check`, and a failed patch reversal; the run that read `TS2724` and `TS7031` has no retained log, and the report says so); every gate command in full as `tools/fresh.sh` runs it, with its result line; no count of a growable set (name the files, the patches, the runs, and the readings); no `now`, `new`, `once`, or other term the substitution table in `.claude/rules/writing.md` bans; each code token followed by a noun; the digests of both patches; the retained path `/home/user/scaffold/.orkestrel/veneer/units/upl-shared-4.patch` once.

## Unknowns

Whether the section project reads the built cascade or compiles the partial live: the unit reads `configs/app/vite.browser.config.ts` and `vite.config.ts`, records which, and rebuilds only where the built file is read.

## Scope

As `b-utilities-upl-brief.md` § Scope: the same owned files; the same shared files, report-only, returned as `tmp/units/upl-shared-4.patch` with index lines; `tests/setupBrowser.test.ts` returned as `tmp/units/upl-unlisted-4.patch`; the same off-limits files, `tests/setupPolicy.ts` and `tests/policy.test.ts` (vendored) included. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; `tmp/probe/` is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report described in item 5, plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from the log file names and the scratch directory layout alone; stop when the geometric mutation does not redden at the width comparison (report the reading and the cascade state), on a gate that reads red for a cause outside these items, and on a disagreement between this brief, the earlier briefs, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the fresh copy.
2. The setup-styles run over `tests/setupStyles.test.ts` exits 0, and `translation-box-malformed` and each round-2 setup control reddens its case (logged).
3. The section proofs exit 0, `max-width-rule-dropped` reddens the cap case at the width comparison (logged), and `caps-reading-4.log.txt` is retained.
4. `test:conformance`, `test:guides`, `test:policy`, `test:setup`, and `test:setup:browser` exit 0 on the fresh copy; `git apply --check` of both patches at `e4e6a40` exits 0 (commands and exits pasted).
5. The report carries every item with its site, before, and after, and the regenerated delta artifacts show only the round-to-round changes.

## Review evidence

`git -C /home/user/veneer-upl status --porcelain`, `git diff e4e6a40 -- app/browser/styles/_shell.scss`, and `git diff --no-index /dev/null <path>` for each untracked owned file, captured by the Orchestrator at hand-back from inside the worktree as `upl-4.diff` and `upl-4-status.txt`, plus the report and the patches.
