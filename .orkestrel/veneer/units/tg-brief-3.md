# Unit TOGGLES (`tg`) — round 3, the mechanical fix round

Supersedes `tg-brief-2.md` for this round; the earlier briefs stay in place unedited. This brief carries every finding `tg-audit-2-verdict.md` § Reconciliation names, each from the lane verdicts beside it (`tg-audit-2-objective-verdict.md`, `tg-audit-2-subjective-verdict.md`, `tg-audit-2-checker-verdict.md`), all under `/home/user/scaffold/.orkestrel/veneer/units/`.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-tg` (branch `unit/tg`, the round-1 and round-2 writes uncommitted over `a658879`). The executor that opens this brief is that subagent. Every edit here is specified exactly; a choice this brief does not make is not the unit's to make.

## Objective

Every finding of round 2 is closed in the owned files and in a revised shared patch `tmp/units/tg-shared-3.patch` (one unified diff against `a658879`, with an `index` line per file, superseding `tmp/units/tg-shared-2.patch` whole, whose retained copy is `/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`), with every proof still distinguishing its mutation and every gate green on the validation copy.

## Context

Everything in `b-collapse-tg-brief.md` § Context and `tg-brief-2.md` § Context binds unchanged (the law, the family record, the installed primitives, the host, the standing conditions). The round-2 report is `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-tg-report-2.md`; the round-2 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/` (`mutate.py`, `gates.sh`, `sync.sh`, `patch.sh`, `logs/`). Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell.

The validation copy was deleted after round 2. Rebuild it before editing, from `/home/user/veneer-tg`: `mkdir -p tmp/probe/base tmp/probe/orig`; `git archive a658879 | tar -x -C tmp/probe/base`; `git archive a658879 | tar -x -C tmp/probe/orig`; `cp -al node_modules tmp/probe/base/node_modules`; `git -C tmp/probe/base init -q`; `git -C tmp/probe/base apply /home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`; then the round-3 `sync.sh`. Copy the round-2 instruments to `tmp/units/tg-instruments-3/` and rewrite every header and path for round 3 before running any of them (`LOGS` in `mutate.py`, `I` in `gates.sh`, the output path `tg-shared-3.patch` in `patch.sh`, and each file's header sentence naming what changed from round 2). Never edit an instrument while it runs.

Make every edit to a shared file (`app/browser/constants.ts`, `guides/veneer.md`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`) in the validation copy `tmp/probe/base`, and every edit to an owned file in the worktree, then `sync.sh`.

## Findings to close

1. **Guide, § Button group classes, the corners paragraph** (`guides/veneer.md`, the sentence at `tg-shared-2.patch:218`). Replace "because the release expects its hidden menu to follow it, which often leaves the toggle as the group's visible end while it is not the last child." with "because the release's markup puts its hidden menu after it, which often leaves the toggle as the group's visible end while it is not the last child."
2. **Guide, § Button group classes, the opening paragraph** (`tg-shared-2.patch:205-211`). Re-flow the paragraph so no line exceeds 100 columns. Change no word.
3. **Constants doc blocks** (`app/browser/constants.ts`, the `BUTTON_GROUP_SPECIMENS` block at `tg-shared-2.patch:23-24` and the `INPUT_GROUP_SPECIMENS` block at `:85`). In both, "each toggle announces `aria-expanded="false"`:" becomes "each toggle announces the `aria-expanded="false"` state:". Re-flow each block's lines at 100 columns.
4. **Partial comment** (`src/styles/components/_button-group.scss`, the size loop comment, `tg-2.diff:52-54`). Replace the comment's text with: "Each size writes the form after a button carrying the size class and the form inside a group carrying it, as the release's own extend of the group twin does, because a sized split can sit in either position." wrapped at 100 columns with the `//` prefix.
5. **The `side` field becomes `margin`.**
   - `tests/setupStyles.ts`, `BUTTON_GROUP_CARET_CASES` (`tg-shared-2.patch:1552-1571`): the row field `side` becomes `margin` (`margin: pseudo === '::before' ? 'margin-right' : 'margin-left'`).
   - Its TSDoc remarks become: "Each row is derived from the {@link DROPDOWN_DIRECTION_CASES} constant, so the pseudo-element a direction paints its caret on has one home. The `group` field is the wrapper's class list: the plain direction's `dropdown` wrapper is the `btn-group` class alone, and every other direction adds its wrapper class to that one. The `margin` field names the property that stands the caret apart from the toggle's text: the `margin-right` property on a `::before` caret and the `margin-left` property on an `::after` caret."
   - `tests/setupStyles.test.ts`, the binding case (`tg-shared-2.patch:1125` and `:1161-1167`): the title becomes `binds the split toggle padding forms, caret margins, and specimen forms to the inventory and the capture registry`; the destructuring becomes `({ group, pseudo, margin })` and the declaration `{ property: margin, value: '0' }`.
   - `tests/src/styles/components/button-group.test.ts`, the caret case (`tg-2.diff:402-416`): the title becomes `'drops the caret $margin on the $pseudo of a split toggle in a $group wrapper'`, the parameter `({ group, pseudo, margin })`, and both `readPixels` calls take `margin` in place of `side`.
   - No other file names the field; confirm with `grep -rn "side" tests/src/styles/components/button-group.test.ts tests/setupStyles.test.ts` over the changed hunks and report the command.
6. **Field nouns in the four new TSDoc blocks** (`tests/setupStyles.ts`). Replace each block's `@remarks` text as follows, keeping the summary sentence.
   - `BUTTON_GROUP_SPLIT_CASES` (`tg-shared-2.patch:1389-1400`): "The `group` field is the wrapper's class list, and the `button` field the class list the action button and its split toggle each carry, so a sized form reads its size either from its buttons or from its group. A sized group leaves its buttons unsized, which leaves the group's own selector the only rule that can resize its toggle. The `pixels` field is the release's own padding for the form, three quarters of the action button's inline step: that step reads 12 pixels at rest, 8 in a small form, and 16 in a large form."
   - `BUTTON_GROUP_SPLIT_FORMS` (`:1434-1443`): "The `name` field is the specimen's name and the `selectors` field the forms its frame shows. Each selector reaches a toggle no other selector of the same specimen reaches, so the frame shows every form on a toggle of its own. The plain split names its wrappers by what they lack, because the plain wrapper carries the `btn-group` class alone and every direction wrapper carries that class too."
   - `INPUT_GROUP_TOGGLE_CASES` (`:1512-1524`): "The `group` field is the group's class list and the `markup` field its children: a toggle and its hidden menu before a text control, and a second toggle and menu after it. The `corners` field holds one row per toggle in document order, each listing the toggle's corners clockwise from the top left, where `1` is the radius an ungrouped button carries and `0` a squared corner. A toggle is squared while at least two children follow it, and while at least three follow it in a group carrying the `has-validation` class, whose feedback is the extra child. The unvalidated row with feedback carries the validated row's children in a group without that class, so its trailing toggle, three from the end, is squared, and the class is what keeps the validated row's trailing corners."
   - `BUTTON_GROUP_CARET_CASES`: item 5's text.
   Re-flow each block at 100 columns.
7. **The caret comment** (`tests/src/styles/components/button-group.test.ts`, around line 318, the block before the `it.each(BUTTON_GROUP_CARET_CASES)` case). Replace its text with: "Each toggle in this case carries text, because the release's `:empty` rule already drops the `margin-left` value of an empty toggle's `::after` caret, and a reading on an empty toggle under the plain, `.dropup`, or `.dropend` wrapper could not tell the split rule from that one. The `.dropstart` caret is a `::before` pseudo-element whose `margin-right` value the `:empty` rule leaves, so the split rule alone clears it on an empty toggle too, which the following case reads on an empty pair. The plain toggle beside each split one is the reading the split rule moves." wrapped at 100 columns with the `//` prefix.
8. **The adopted probe.** Directly after the `it.each(BUTTON_GROUP_CARET_CASES)` case, add this case (indentation as the file's):
   ```ts
   it('clears the caret margin of an empty split toggle in a dropstart wrapper, where the empty-toggle rule leaves it', () => {
   	const host = scene.mount(
   		`<div class="btn-group dropstart"><button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false" aria-label="Plain caret"></button></div><div class="btn-group dropstart"><button type="button" class="btn btn-outline-secondary">Split action</button><button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" aria-expanded="false" aria-label="Split caret"></button></div>`,
   	)
   	const plain = requireValue(
   		host.querySelector('.dropdown-toggle:not(.dropdown-toggle-split)'),
   		'No plain toggle',
   	)
   	const split = requireValue(host.querySelector('.dropdown-toggle-split'), 'No split toggle')
   	expect(readPixels(plain, 'margin-right', '::before')).toBeCloseTo(0.255 * readPixels(plain, 'font-size'), 2)
   	expect(readPixels(split, 'margin-right', '::before')).toBe(0)
   })
   ```
   Add to `mutate.py` the entry `'dropstart-caret-rule-omitted-empty'`: the same edit as `dropstart-caret-rule-omitted`, with the proof `STYLES + [BGT, '-t', 'empty split toggle in a dropstart wrapper']`. Record it red on the added case, and record the unmutated control green beside it.
9. **The case list.** Run `npx vitest list --config configs/src/vite.styles.config.ts tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts` in the validation copy and retain its output as `tmp/units/tg-instruments-3/logs/list-styles.log.txt`. Report that the titles equal round 2's plus the added case and the two retitled caret cases, naming them.
10. **The report.** This round's report states no count of a growable set (name a reading that moved by its mutation, never as "one reading"); writes no `above` or `below` as a cross-reference; names no list item by its position; records each gate's command and result line; and names the retained path `/home/user/scaffold/.orkestrel/veneer/units/tg-shared-3.patch` for the patch once and the superseded patch by its retained path.

## Unknowns

None. Every edit is specified.

## Scope

As `b-collapse-tg-brief.md` § Scope: the same owned files (`src/styles/components/_button-group.scss`, `src/styles/components/_input-group.scss`, `tests/src/styles/components/button-group.test.ts`, `tests/src/styles/components/input-group.test.ts`, `tests/app/browser/sections/ButtonGroupSection.test.ts`, `tests/app/browser/sections/InputGroupSection.test.ts`); the same shared files, report-only, returned as one patch `tmp/units/tg-shared-3.patch` with index lines; the same off-limits files, `tests/setupPolicy.ts` and `tests/policy.test.ts` (vendored) included. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; `tmp/probe/` is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-tg/tmp/units/tg-report-3.md` with: each finding's site, before, and after; the proof matrix, re-executed whole through the round-3 `mutate.py` (every round-2 mutation and table control, plus `dropstart-caret-rule-omitted-empty`, one log per run under `tmp/units/tg-instruments-3/logs/`, the unmutated controls in the same copy); the scoped gate exits with their commands on the validation copy (the round-3 `gates.sh`: `format:check`, `lint:check`, `check`, `build:src`, the styles proofs over `button-group.test.ts` and `input-group.test.ts`, the section proofs, the scoped setup run over `tests/setupStyles.test.ts`, `test:conformance`, `test:guides`, `test:policy`); the exact patch and its SHA-256; every deviation; and a closing list of what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from line wrapping alone; stop on a proof whose reading changes, on a gate that reads red for a cause outside these items, and on a disagreement between this brief, the earlier briefs, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the validation copy (`a658879` plus the owned files plus the patch).
2. The styles proofs over `button-group.test.ts` and `input-group.test.ts` exit 0, with the round-2 case titles plus the added case and the retitled caret cases, and every mutation in the round-3 `mutate.py` reddens its case (logs retained), `dropstart-caret-rule-omitted-empty` included.
3. The section proofs exit 0, and `dropstart-toggle-after-action`, `dropstart-action-removed`, `group-size-on-buttons`, and `trailing-toggle-kept-count-broken` still redden their cases.
4. The scoped setup run over `tests/setupStyles.test.ts` exits 0, and every table control reddens its freeze or binding case (logged).
5. `test:conformance`, `test:guides`, and `test:policy` exit 0 on the validation copy.
6. The report carries every item of § Findings to close with its site, before, and after, and the patch applies to `a658879` with `git apply --check` (command and exit pasted).

## Review evidence

`git -C /home/user/veneer-tg diff a658879` and `git -C /home/user/veneer-tg status --porcelain`, captured by the Orchestrator at hand-back from inside the worktree as `tg-3.diff` and `tg-3-status.txt`, plus the report and the patch.
