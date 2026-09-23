# Unit ACCORDION (`ac`) — round 2, the fix round

Supersedes `b-collapse-ac-brief.md` for this round; that brief stays in place unedited. This brief carries every finding `ac-audit-verdict.md` § Reconciliation names, each from the lane verdicts beside it (`ac-audit-objective-verdict.md`, `ac-audit-subjective-verdict.md`, `ac-audit-checker-verdict.md`).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-ac` (branch `unit/ac`, the round-1 writes uncommitted over `a658879`). The executor that opens this brief is that subagent.

## Objective

Every finding of round 1 is closed in the owned files and in a revised shared patch `tmp/units/ac-shared-2.patch` (one unified diff against `a658879`, with an `index` line per file, superseding `tmp/units/ac-shared.patch` whole), with every proof still distinguishing its mutation and every gate green on the validation copy.

## Context

Everything in `b-collapse-ac-brief.md` § Context binds unchanged (the law, the family record, the installed primitives, the host, the standing conditions). The round-1 report is `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-ac-report.md`; the round-1 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/ac-instruments/` and the worktree's `tmp/units/ac-instruments/`. The validation copy is rebuilt the way the round-1 report describes (`git archive a658879`, hard-linked `node_modules`, `git init`, the owned files copied in, the patch applied).

## Findings to close

1. **The failing-first evidence (claim 3).** Retain the executed empty-partial control: run the accordion proof on the validation copy with `_accordion.scss` emptied (the cascade rebuilt first), log it to `tmp/units/ac-instruments-2/logs/empty-partial.log.txt`, restore the partial by digest, and log the green control beside it. Add the mutation `button-padding-literal` (`.accordion-button` padding written as the literal `1rem 1.25rem`, the slot reads dropped) to `mutate.py`, run it, and log it red on C4's `--bs-accordion-btn-padding-x` and `--bs-accordion-btn-padding-y` rows. Retain the output of `built-selectors.mjs` as `logs/built-selectors.log.txt`. Retain the final application, guide, and policy runs' logs after the last edit.
2. **The specimen headers (S1).** `ACCORDION_SPECIMENS` in `app/browser/constants.ts` and `ACCORDION_MARKUP` in `tests/setupStyles.ts` write `<h2 class="accordion-header">`, the release's markup, in place of `<h3 …>`; the report's reason for the level names the page's one `h1` and the region's absence of a heading.
3. **The plain variant's name (S2).** `Accordion items` becomes `Accordion base`, with the scenarios `accordion-base` and `accordion-base-focus`, across `CaptureSubject`, `CASCADE_KEYS`, `DRIVEN_KEYS`, the journey case in `tests/app/browser/integration.test.ts`, the section proof's name lists, and the `ACCORDION_SPECIMENS` doc block; `Accordion flush` stays.
4. **Token nouns in the guide (claim 7).** In `### Accordion classes` and the rewritten retained-variables pair: "a `z-index` value of `2`" and "of `3`"; "a `0s` duration"; "the release's `1rem` length"; "the `--vn-factor-density` factor"; "the `--vn-palette-blue` token"; "The `--bs-navbar-toggler-icon-bg` variable" and "The `--bs-form-select-bg-img`, … variables" (the pair's opening tokens); sweep the whole section and pair for any other bare token.
5. **Token nouns elsewhere (claim 8).** `_accordion.scss` (the opening comment: "the release's `1.25rem` length"); the `ACCORDION_SPECIMENS` doc block ("its panel carries the `show` class", "carries the `collapsed` class over a panel without the `show` class", "through the `aria-expanded` attribute", "through the `aria-controls` attribute"); `tests/setupStyles.ts` (the comment naming selectors bare, and "the `source` field is"). Sweep every comment the delta adds.
6. **The report (claim 8 and F-counts).** This round's report states no count of a growable set (no line counts per file; "both names", "both transitions", "both subjects", "twice each", and "one timing failure" name their members or drop the tally), names no list item by its position, describes the worktree's `npm run check` diagnostics as the consequences of the missing shared exports rather than as missing exports each, and records each gate's command and result line with its retained log.

## Unknowns

None.

## Scope

As `b-collapse-ac-brief.md` § Scope: the same owned files; the same shared files, report-only, returned as one patch `tmp/units/ac-shared-2.patch` with index lines; the same off-limits files (`tests/src/styles/theme.test.ts` stays NAVBAR's). No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-ac/tmp/units/ac-report-2.md` with: each finding's site, before, and after; the proof matrix with the added mutation and the retained empty-partial control; the scoped gate exits with their commands on the validation copy (`format:check`, `lint:check`, `check`, `build:src`, the accordion proof, the section proof under `--project app:browser`, `test:setup`, `test:conformance`, `test:guides`, `test:policy`, `test:app`), each with its log under `tmp/units/ac-instruments-2/logs/`; the exact patch; every deviation; and a closing list of what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from a sentence's exact wording within the forms named, a log's name, and a case title; stop on a proof whose reading changes under the rename, and on a disagreement between this brief, the round-1 brief, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the validation copy.
2. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/accordion.test.ts` exits 0 with the round-1 case titles, the empty-partial control is logged red, and `button-padding-literal` is logged red on the C4 padding rows.
3. The section proof exits 0 under `--project app:browser`, and the round-1 section mutations still redden their cases.
4. `test:setup`, `test:conformance`, `test:guides`, `test:policy`, and `test:app` exit 0 on the validation copy, and the journey observation on one variant reads the renamed rows green.
5. The report carries every item of § Findings to close with its site, before, and after, and the patch applies to `a658879` with `git apply --check`.

## Review evidence

`git -C /home/user/veneer-ac status --porcelain` and the owned files' diffs, captured by the Orchestrator at hand-back as `ac-2.diff` and `ac-2-status.txt`, plus the report and the patch.
