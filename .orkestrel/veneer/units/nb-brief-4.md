# Unit NAVBAR (`nb`) — round 4, the membership round

Supersedes `nb-brief-3.md` for this round; the earlier briefs stay in place unedited. This brief carries every finding `nb-audit-3-verdict.md` § Reconciliation and § Findings outside the claims name, each from the lane verdicts beside it (`nb-audit-3-objective-verdict.md`, `nb-audit-3-checker-verdict.md`), all under `/home/user/scaffold/.orkestrel/veneer/units/`.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-nb` (branch `unit/nb`, the round-1 to round-3 writes uncommitted over `a658879`). The executor that opens this brief is that subagent. Every edit here is specified exactly; a choice this brief does not make is not the unit's to make.

## Objective

Each of the three tables round 3 added is bound by member in the setup case, a deletion control per table reads red there, the section comment's token is backticked, and a revised shared patch `tmp/units/nb-shared-4.patch` (one unified diff against `a658879` with an `index` line per file, superseding `tmp/units/nb-shared-3.patch` whole, whose retained copy is `/home/user/scaffold/.orkestrel/veneer/units/nb-shared-3.patch`) carries it, with `tmp/units/nb-offlimits-4.patch` and `tmp/units/nb-retirement-4.patch` regenerated from the same instruments, every proof still distinguishing its mutation, and every gate green on the stage.

## Context

Everything in `b-collapse-nb-brief.md` § Context, `nb-brief-2.md` § Context, and `nb-brief-3.md` § Context binds unchanged (the law, the family record, the host, the standing conditions, D1 to D8, the stage rebuilt as the round-3 report describes with `cp -al` for `node_modules`). The round-3 report is `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report-3.md`; the round-3 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-3/`. Copy them to `tmp/units/nb-instruments-4/`, rewrite every header and path for round 4 before running any of them, and never edit an instrument while it runs. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell. Make the shared-file edit in the stage and the owned-file edit in the worktree, and regenerate the patches with `patches.sh`.

The setup case this round edits is `it('binds the navbar selectors, published properties, dark retunes, ramp, and markup to the inventory', …)` in `tests/setupStyles.test.ts` (shared); the round-3 instruments' `TABLES` command already selects it with `-t "binds the navbar selectors"`. In that case the comment "Every consumer row reads a slot a color row also names." opens the consumer-property loop, and the comment "The published properties are closed over the tables and the readings named beside them" opens the closure assertion; the edits of item 1 sit between those two blocks. `NAVBAR_EXPAND_CASES` is the breakpoint table filtered to the named boundaries (`sm` 576, `md` 768, `lg` 992, `xl` 1200, `xxl` 1400), each row `{ name, boundary, readings }`.

## Findings to close

1. **EMPTY-TABLE-PROOFS** (`tests/setupStyles.test.ts`, shared). Directly after the consumer-property loop, insert these assertions, each under a comment in the case's voice:
   - The expand readings: the viewports are the journey widths and each row's infixes are the expand boundaries the width reaches.
     ```ts
     expect(NAVBAR_EXPAND_READINGS.map(({ viewport }) => viewport)).toEqual([390, 1280])
     for (const { viewport, expanded } of NAVBAR_EXPAND_READINGS)
     	expect({ viewport, expanded: [...expanded] }).toEqual({
     		viewport,
     		expanded: NAVBAR_EXPAND_CASES.filter(({ boundary }) => boundary <= viewport).map(
     			({ name }) => name,
     		),
     	})
     ```
   - The dark consumers: the rows are the brand, the plain link, and the toggler edge, each named by its member.
     ```ts
     expect(
     	NAVBAR_DARK_CONSUMER_CASES.map(({ target, reads, property }) => ({ target, reads, property })),
     ).toEqual([
     	{ target: '.navbar-brand', reads: 'color', property: '--bs-navbar-brand-color' },
     	{ target: 'a[href="#plain"]', reads: 'color', property: '--bs-navbar-color' },
     	{
     		target: '.navbar-toggler',
     		reads: 'border-top-color',
     		property: '--bs-navbar-toggler-border-color',
     	},
     ])
     ```
   - The paint moves: the rows are the plain bar's and the dark bar's brand and toggler, the plain bar's paint moving and the dark class's holding.
     ```ts
     expect(NAVBAR_PAINT_MOVE_CASES.map(({ selector, moves }) => ({ selector, moves }))).toEqual(
     	['.navbar:not(.navbar-dark)', '.navbar-dark'].flatMap((bar) =>
     		['.navbar-brand', '.navbar-toggler'].map((consumer) => ({
     			selector: `${bar} ${consumer}`,
     			moves: bar === '.navbar:not(.navbar-dark)',
     		})),
     	),
     )
     ```
   Keep the existing consumer-property loop, the freeze loops, and the closure assertion as they are. Re-flow at 100 columns and let the formatter settle the layout. Add to `mutate.py` one deletion control per table, each red on the setup file's navbar case (the `TABLES` command) and each restored by the instrument's own write-back: `expand-readings-row-deleted` (the `1280` row's `Object.freeze({ viewport: 1280, expanded: Object.freeze(['sm', 'md', 'lg', 'xl']) }),` line removed), `dark-consumers-row-deleted` (the `a[href="#plain"]` row's `Object.freeze({ … }),` block removed), and `paint-moves-row-deleted` (the `.navbar-dark .navbar-toggler` row's line removed). Re-run the four round-3 controls (`expand-readings-unfrozen`, `dark-consumers-unfrozen`, `paint-moves-unfrozen`, `dark-consumers-property-foreign`) red on the cases they name, and record the unmutated setup file green and the styles run over `navbar.test.ts` green with the round-2 case titles. A test is named for what it proves, never for the control that specified it.
2. **The section comment's token** (`tests/app/browser/sections/NavbarSection.test.ts`, owned). In the comment beside the light-attribute assertion, "opens a light island with its own data-bs-theme attribute" becomes "opens a light island with its own `data-bs-theme` attribute", as `nb-brief-3.md` item 5 gave it; re-flow the comment at 100 columns.
3. **The gates log keeps every pass** (`tmp/units/nb-instruments-4/gates.sh`). Replace the `: > "$LOG"` truncation with a run header appended to the log (`echo "=== run $(date -u +%Y-%m-%dT%H:%M:%SZ) HEAD $(git -C /home/user/veneer-nb rev-parse --short HEAD)" >> "$LOG"`), so a failing first pass stays in the log beside the pass that follows it, and cite each pass in the report by its header.
4. **The report.** This round's report is `tmp/units/nb-report-4.md` (where the harness refuses the file, return the same text as the final message and say so), written under `AGENTS.md` § Writing and `.claude/rules/writing.md`: it states no count of a growable set (name the members: the three tables by name, the controls by name, the runs by name), names no list item by its position, follows every code token with a noun and never possessivizes or inflects one, writes no temporal `new`, `now`, or `currently` and no cross-reference `above` or `below`, records each gate's command in full as the instrument runs it (the exact `npx vitest run --config … ` strings, the `npm run` scripts, and the retirement patch-check command as `retire.sh` runs it in the simulated repository, never abbreviated to a description) with its result line and the gates-log header it comes from, gives every deviation its expected, found, evidence, and done fields (the round-3 report's `node_modules` deviation restated with those fields and its evidence pointing at the retained first-pass header where one exists in this round's log, or stating that round 3's first pass is not retained because its instrument truncated the log), records the digests of the three patches and whether the off-limits and retirement patches equal their round-3 copies (the retirement patch's `setupStyles.test.ts` hunk header is expected to move again with the lines item 1 adds; state the shift), and names the retained path `/home/user/scaffold/.orkestrel/veneer/units/nb-shared-4.patch` once.

## Unknowns

None. Every edit is specified.

## Scope

As `b-collapse-nb-brief.md` § Scope: the same owned files (this round edits `tests/app/browser/sections/NavbarSection.test.ts` alone among them); the same shared files, report-only, returned as one patch `tmp/units/nb-shared-4.patch` with index lines (this round's shared delta from round 3 sits in `tests/setupStyles.test.ts` alone); the off-limits patch and the retirement patch returned as `tmp/units/nb-offlimits-4.patch` and `tmp/units/nb-retirement-4.patch`; the same off-limits files, `tests/setupPolicy.ts` and `tests/policy.test.ts` (vendored) included. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; the stage and the retirement copy are deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report described in item 4, plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from line wrapping and comment wording alone; stop on a proof whose reading changes, on a gate that reads red for a cause outside these items, and on a disagreement between this brief, the earlier briefs, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the stage.
2. The setup-project run over `tests/setupStyles.test.ts` exits 0; each of the three deletion controls and the four round-3 controls reddens the case it names (logged, one log each); the unmutated setup file reads green after them.
3. The styles run over `navbar.test.ts`, `theme.test.ts`, and `container.test.ts` exits 0 with the round-2 case titles; the section proof exits 0.
4. `test:conformance`, `test:guides`, `test:policy`, and `test:app` exit 0 on the stage; the retirement copy's gates exit 0 as in round 3.
5. `git apply --check` of the shared and off-limits patches exits 0 in the worktree (command and exit pasted), and the retirement patch applies to the simulated state as in round 3.
6. The report carries every item of § Findings to close with its site, before, and after.

## Review evidence

`git -C /home/user/veneer-nb diff a658879` for the tracked owned file, `git diff --no-index /dev/null <path>` for each untracked owned file, and `git -C /home/user/veneer-nb status --porcelain`, captured by the Orchestrator at hand-back from inside the worktree as `nb-4.diff` and `nb-4-status.txt`, plus the report and the patches.
