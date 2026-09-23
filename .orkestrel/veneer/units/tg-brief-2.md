# Unit TOGGLES (`tg`) — round 2, the fix round

Supersedes `b-collapse-tg-brief.md` for this round; that brief stays in place unedited. This brief carries every finding `tg-audit-verdict.md` § Reconciliation names, each from the lane verdicts beside it (`tg-audit-objective-verdict.md`, `tg-audit-subjective-verdict.md`, `tg-audit-checker-verdict.md`).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-tg` (branch `unit/tg`, the round-1 writes uncommitted over `a658879`). The executor that opens this brief is that subagent.

## Objective

Every finding of round 1 is closed in the owned files and in a revised shared patch `tmp/units/tg-shared-2.patch` (one unified diff against `a658879`, with an `index` line per file, superseding `tmp/units/tg-shared.patch` whole), with every proof still distinguishing its mutation and every gate green on the validation copy.

## Context

Everything in `b-collapse-tg-brief.md` § Context binds unchanged (the law, the family record, the installed primitives, the host, the standing conditions). The round-1 report is `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-tg-report.md`; the round-1 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments/` and the worktree's `tmp/units/tg-instruments/`. `tests/setupStyles.ts` and `tests/setupStyles.test.ts` are shared (report-only): write their edits in the validation copy and return them in the patch. The section proofs already import from `tests/setupStyles.ts` elsewhere in the tree (UTIL-DISPLAY's fix round did the same); Vite prints `Module "path" has been externalized` warnings for it, which fail nothing.

## Findings to close

1. **Guide, § Button group classes, the corners paragraph** (`tg-shared.patch` around line 167). Replace "A child carrying the `.dropdown-toggle` class keeps its trailing corners, because its hidden menu follows it and the toggle is the group's visible end." with "A child carrying the `.dropdown-toggle` class keeps its trailing corners, because the release expects its hidden menu to follow it, which often leaves the toggle as the group's visible end while it is not the last child." Keep the split-toggle exception sentence.
2. **Guide, § Input group classes, the withheld paragraph** (around line 130). "so the toggle is the row's visible end while it is not the last child" becomes "so the toggle can be the row's visible end while it is not the last child".
3. **Guide, § Button group classes, the split-toggle paragraph** (around lines 173 to 176). Give each `calc(...)` token its noun: "the `calc(var(--vn-space-6) * 0.75)` value at rest, the `calc(var(--vn-space-4) * 0.75)` value after a small button or inside a small group, and the `calc(var(--vn-space-8) * 0.75)` value after a large button or inside a large group."
4. **Guide, § Input group classes, the proof sentence** (around line 146). "with and without that class" becomes "with and without the `has-validation` class".
5. **Guide, § Dropdown classes, the opening paragraph** (around line 157). Split the rewritten sentence after "them" so no "which" is ambiguous.
6. **Guide, § Button group classes, the opening list** (the section's first paragraph). Add the split toggle to the list of what the key ships.
7. **Constants doc blocks** (`app/browser/constants.ts`, the patched `BUTTON_GROUP_SPECIMENS` block around `tg-shared.patch` lines 22 to 23 and the `INPUT_GROUP_SPECIMENS` block around lines 82 to 83). "Every class is set in markup and announces `aria-expanded="false"`" becomes "Every class is set in markup, and each toggle announces `aria-expanded="false"`". Replace "no script opens a menu here" in both blocks with "no script opens a menu in this region".
8. **Partial comment** (`src/styles/components/_button-group.scss`, the size loop comment around line 94). "both forms" names the forms: "the form after a button carrying the size class and the form inside a group carrying it".
9. **The dropstart caret limit.** The `:empty` rule in `_dropdown.scss` clears only the `::after` `margin-left`; the dropstart caret is a `::before` with `margin-right`, which the split rule clears, so the `Split dropstart` specimen's frame shows that rule. Correct the comment in `tests/src/styles/components/button-group.test.ts` around line 321 to limit the empty-toggle explanation to the plain, `.dropup`, and `.dropend` `::after` carets, and state the same limit in this round's report § Not closed.
10. **The case tables** (`.claude/rules/tests.md`: a case matrix belongs in a setup file at any size). Move to `tests/setupStyles.ts`, each frozen at every level, documented with TSDoc, exported, and added to the export-list and freeze cases in `tests/setupStyles.test.ts`, and import them where the rows sat:
    - `BUTTON_GROUP_SPLIT_CASES`: the padding rows (`{ label, group, button, pixels }`, `group` and `button` complete class lists; `Base`, `Small`, `Small group`, `Large`, `Large group`), replacing the inline table around `button-group.test.ts` line 270, its `''` sentinel and leading-space concatenation, the `toHaveLength` count, the `?? ''` label, and the parallel pixel literal; the density case reads the `Base` row instead of restating its markup and pixels.
    - `BUTTON_GROUP_CARET_CASES`: `{ group, pseudo, side }`, replacing the `it.each` rows around line 324; derive it from `DROPDOWN_DIRECTION_CASES` (`tests/setupStyles.ts` around line 5700: `group` is `btn-group` for the `dropdown` wrapper and `btn-group <wrapper>` otherwise, `side` is `margin-right` where `pseudo` is `::before`, else `margin-left`) where that reads well, else a literal table.
    - `INPUT_GROUP_TOGGLE_CASES`: the `INPUT_GROUP_FLOATING_CASES` shape (`{ group, markup, corners }` around line 4433), one corner row per toggle, the plain, `has-validation`, and unvalidated-with-feedback groups, replacing `input-group.test.ts` around lines 257 to 266 and 277 to 296.
    - `BUTTON_GROUP_SPLIT_FORMS`: the section proof's `[name, selectors]` matrix at `ButtonGroupSection.test.ts` around lines 164 to 182 (and the list at line 217 where it restates the same names).
    - The input group section case (`InputGroupSection.test.ts` around lines 257 to 266) filters `CASCADE_KEYS` from `tests/setup.ts` by subject instead of restating the two rows.
11. **The guard** (`button-group.test.ts` around lines 361 to 364). Replace the `.map((group) => requireValue(group, 'No group'))` over a `querySelectorAll` result with the file's own idiom: index the list, then `requireValue(groups[0], 'No leading group')` and `requireValue(groups[1], 'No trailing group')`.
12. **The stale exclusion comment** (`button-group.test.ts` around lines 205 to 206). "why a split toggle keeps its trailing corners where every other non-last child loses them" is false for a leading split toggle; say "why a split toggle further in keeps its trailing corners" or point at the leading-split case.
13. **The trailing menu's alignment.** Give the `Input group dropdown` and `Input group dropdown validated` specimens' trailing menus the `dropdown-menu-end` class, as the unit's own fixture in `input-group.test.ts` carries it.
14. **The report.** This round's report states no count of a growable set (`both`, `pair`, and `one <list>` included where they tally members the sentence does not name), names no list item by its position, records each gate's command and result line, and names the retained path `/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch` for the patch.

## Unknowns

Whether `BUTTON_GROUP_CARET_CASES` derived from `DROPDOWN_DIRECTION_CASES` reads well; the unit decides and records the choice.

## Scope

As `b-collapse-tg-brief.md` § Scope: the same owned files; the same shared files, report-only, returned as one patch `tmp/units/tg-shared-2.patch` with index lines; the same off-limits files. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-tg/tmp/units/tg-report-2.md` with: each finding's site, before, and after; the proof matrix, unchanged where the assertions did not move and re-executed for every case whose rows moved (the same mutations, one log per run under `tmp/units/tg-instruments-2/logs/`, the unmutated control in the same copy); the scoped gate exits with their commands on the validation copy (`format:check`, `lint:check`, `check`, `build:src`, the styles proofs over `button-group.test.ts` and `input-group.test.ts`, the section proofs, `test:setup` over `tests/setupStyles.test.ts`, `test:conformance`, `test:guides`, `test:policy`); the exact patch; every deviation; and a closing list of what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from a table's row order, a TSDoc sentence, a case title, and the caret table's derivation; stop on a proof whose reading changes when its rows move, and on a disagreement between this brief, the round-1 brief, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the validation copy (`a658879` plus the owned files plus the patch).
2. The styles proofs over `button-group.test.ts` and `input-group.test.ts` exit 0 with the same case titles as round 1, and every mutation the round-1 matrix names still reddens its case (logs retained).
3. The section proofs exit 0 under the config the sibling section proofs use, and `dropstart-toggle-after-action`, `dropstart-action-removed`, `group-size-on-buttons`, and `trailing-toggle-kept-count-broken` still redden their cases.
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` exits 0, and unfreezing or reordering any moved table reddens its freeze or binding case (one control per table, logged).
5. `test:conformance`, `test:guides`, and `test:policy` exit 0 on the validation copy.
6. The report carries every item of § Findings to close with its site, before, and after, and the patch applies to `a658879` with `git apply --check`.

## Review evidence

`git -C /home/user/veneer-tg diff a658879` and `git -C /home/user/veneer-tg status --porcelain`, captured by the Orchestrator at hand-back as `tg-2.diff` and `tg-2-status.txt`, plus the report and the patch.
