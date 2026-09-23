# Unit NAVBAR (`nb`) — round 3, the mechanical fix round

Supersedes `nb-brief-2.md` for this round; the earlier briefs stay in place unedited. This brief carries every finding `nb-audit-2-verdict.md` § Reconciliation and § Findings outside the claims name, each from the lane verdicts beside it (`nb-audit-2-objective-verdict.md`, `nb-audit-2-subjective-verdict.md`, `nb-audit-2-checker-verdict.md`), all under `/home/user/scaffold/.orkestrel/veneer/units/`.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-nb` (branch `unit/nb`, the round-1 and round-2 writes uncommitted over `a658879`). The executor that opens this brief is that subagent. Every edit here is specified exactly; a choice this brief does not make is not the unit's to make.

## Objective

Every finding of round 2 is closed in the owned files and in a revised shared patch `tmp/units/nb-shared-3.patch` (one unified diff against `a658879` with an `index` line per file, superseding `tmp/units/nb-shared-2.patch` whole, whose retained copy is `/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch`), with `tmp/units/nb-offlimits-3.patch` and `tmp/units/nb-retirement-3.patch` regenerated from the same instruments (each expected byte-identical to its round-2 copy, the digests recorded), every proof still distinguishing its mutation, and every gate green on the stage.

## Context

Everything in `b-collapse-nb-brief.md` § Context and `nb-brief-2.md` § Context binds unchanged (the law, the family record, the host, the standing conditions, D1 to D8). The round-2 report is `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report-2.md`; the round-2 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/` (`gates.sh`, `mutate.py`, `readings.sh`, `patches.sh`, `retire.sh`, `retire.py`, `journey.sh`, and `logs/`). Copy them to `tmp/units/nb-instruments-3/`, rewrite every header and path for round 3 before running any of them, and never edit an instrument while it runs. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell. Rebuild the stage the way the round-2 report describes (the worktree plus the shared and off-limits patches applied to a copy), make every shared-file edit in the stage and every owned-file edit in the worktree, and regenerate the patches with `patches.sh`.

## Findings to close

1. **Token nouns in the selector docs** (`tests/setupStyles.ts`, shared). In the `NAV_SELECTORS` doc comment: "The release records `.nav-link` unconditionally" becomes "The release records the `.nav-link` selector unconditionally"; "`.card-header-tabs .nav-link.active` is recorded under this key" becomes "The `.card-header-tabs .nav-link.active` selector is recorded under this key". In the `NAVBAR_SELECTORS` doc comment: "The release records `.navbar-toggler` unconditionally" becomes "The release records the `.navbar-toggler` selector unconditionally".
2. **The `{@link}` nouns** (`tests/setupStyles.ts`, shared). In the `NAVBAR_LENGTH_CASES` doc comment "each wrapped around {@link NAVBAR_MARKUP} and marked by" becomes "each wrapped around the {@link NAVBAR_MARKUP} constant and marked by"; in the `NAVBAR_DARK_SPELLING_CASES` doc comment "carrying that spelling around {@link NAVBAR_MARKUP}." becomes "carrying that spelling around the {@link NAVBAR_MARKUP} constant.".
3. **NAV-HALF** (`tests/setupStyles.ts`, the `NAV_SELECTORS` doc comment). "It is the nav partial's half of the key's official vocabulary:" becomes "It is the half of the key's official vocabulary that no navbar rule carries:".
4. **LENGTH-SENTENCE** (`tests/setupStyles.ts`, the `NAVBAR_LENGTH_CASES` doc comment). "and the `target` field addresses the element whose property named by the `reads` field consumes it, inside a proof" becomes "the `target` field addresses the element that consumes it, and the `reads` field names the property read there, inside a proof".
5. **MODE-SCHEME.** In `guides/veneer.md` (`### Navbar classes`, shared) the sentence "The card's dark scope alone paints a plain bar's brand white, so the class bar sets its own scheme to light to show the class's paint." becomes "The card's dark scope alone paints a plain bar's brand white, so the class bar carries the `data-bs-theme="light"` attribute, a light island inside the card, and the white it shows is the class's paint." In the `NAVBAR_SPECIMENS` doc block (`app/browser/constants.ts`, shared) the sentence ending "so the class bar sets its own scheme to light, and the white it shows is the class's paint." becomes "so the class bar opens a light island with its own `data-bs-theme` attribute, and the white it shows is the class's paint."; in the comment beside the light-attribute assertion in `tests/app/browser/sections/NavbarSection.test.ts` (owned) the sentence ending "so the class bar sets its own scheme to light, and the white it shows over the card is the class's paint." becomes "so the class bar opens a light island with its own `data-bs-theme` attribute, and the white it shows over the card is the class's paint." Re-flow each edited block at 100 columns.
6. **TOKENS-ICONS-HEADER** (`src/styles/_tokens.scss`, shared, the `$icons` comment). "The forms glyphs and the navbar toggler icon Bootstrap paints in one value across the light and dark modes, each as the escaped data URI the release compiles its own variable to." becomes "The forms glyphs and the navbar toggler icon at their light values, each as the escaped data URI the release compiles its own variable to." The later sentence naming the caret, the unchecked knob, and the toggler icon as entries of the `$dark` map stays.
7. **INLINE-CASE-TABLES** (`tests/src/styles/components/navbar.test.ts`, owned; `tests/setupStyles.ts` and `tests/setupStyles.test.ts`, shared). Move each inline matrix to `tests/setupStyles.ts` directly after `NAVBAR_DARK_SPELLING_CASES`, in this order, each frozen at every level with TSDoc in the file's form, exported, added to the import list, the export-list case, the table-freeze loop, and the row-freeze loop of `tests/setupStyles.test.ts`, and read by the proof through the import with no row restated:
   - `NAVBAR_EXPAND_READINGS`: rows `{ viewport, expanded }` with `readonly expanded: readonly string[]`, the rows `{ viewport: 390, expanded: [] }` and `{ viewport: 1280, expanded: ['sm', 'md', 'lg', 'xl'] }`, replacing the `[viewport, expanded]` tuples in the case that expands the sm through xl bars; TSDoc: "Lists the journey widths and the expand infixes whose bars read expanded at each, the xl bar included at 1280 because its boundary is 1200 px."
   - `NAVBAR_DARK_CONSUMER_CASES`: rows `{ target, reads, property }`, the rows `{ target: '.navbar-brand', reads: 'color', property: '--bs-navbar-brand-color' }`, `{ target: 'a[href="#plain"]', reads: 'color', property: '--bs-navbar-color' }`, and `{ target: '.navbar-toggler', reads: 'border-top-color', property: '--bs-navbar-toggler-border-color' }`, replacing the `[target, property, slot]` tuples inside the dark-spelling case, whose loop reads `readStyle(element, reads)` against `readToken(retuned, property)`; TSDoc: "Lists the consumers a dark spelling's retuned slots reach, each as the element the proof addresses, the property it reads there, and the slot the value comes from."; in `tests/setupStyles.test.ts` the navbar case-tables case also asserts that each row's `property` is the `property` of a `NAVBAR_COLOR_CASES` row.
   - `NAVBAR_PAINT_MOVE_CASES`: rows `{ selector, moves }`, the rows `{ selector: '.navbar:not(.navbar-dark) .navbar-brand', moves: true }`, `{ selector: '.navbar:not(.navbar-dark) .navbar-toggler', moves: true }`, `{ selector: '.navbar-dark .navbar-brand', moves: false }`, and `{ selector: '.navbar-dark .navbar-toggler', moves: false }`, replacing the `[selector, moves]` tuples in the case that reads one plain bar paint in light and another in dark; TSDoc: "Lists the elements whose paint moves between the light and dark modes and those whose dark-class paint holds in each."
   Add to `mutate.py` one control per table (`expand-readings-unfrozen`, `dark-consumers-unfrozen`, `paint-moves-unfrozen`: the table's outer `Object.freeze(` removed) and record each red on the setup file's freeze case, plus `dark-consumers-property-foreign` (a row's `property` changed to `--bs-navbar-missing`) red on the navbar case-tables case; record the unmutated setup file green and the styles run over `navbar.test.ts` green with the round-2 case titles.
8. **The report.** This round's report states no count of a growable set (name the members: "the light-390 and dark-1280 variants", the specimens by name, the runs by name), names no list item by its position, follows every code token with a noun, records each gate's command in full and its result line, gives every deviation its expected, found, evidence, and done fields, records the digests of the three patches and whether the off-limits and retirement patches equal their round-2 copies, and names the retained path `/home/user/scaffold/.orkestrel/veneer/units/nb-shared-3.patch` once. Write it to `tmp/units/nb-report-3.md`; where the harness refuses the file, return the same text as the final message and say so.

## Unknowns

None. Every edit is specified.

## Scope

As `b-collapse-nb-brief.md` § Scope: the same owned files; the same shared files, report-only, returned as one patch `tmp/units/nb-shared-3.patch` with index lines; the off-limits patch and the retirement patch returned as `tmp/units/nb-offlimits-3.patch` and `tmp/units/nb-retirement-3.patch`; the same off-limits files, `tests/setupPolicy.ts` and `tests/policy.test.ts` (vendored) included. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; the stage and the retirement copy are deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report described in item 8, plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from line wrapping alone; stop on a proof whose reading changes, on a gate that reads red for a cause outside these items, and on a disagreement between this brief, the earlier briefs, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the stage.
2. The styles run over `navbar.test.ts`, `theme.test.ts`, and `container.test.ts` exits 0 with the round-2 case titles; the section proof exits 0; the setup-project run over `tests/setupStyles.test.ts` exits 0, and each control of item 7 reddens the case it names (logged).
3. `test:conformance`, `test:guides`, `test:policy`, and `test:app` exit 0 on the stage; the retirement copy's gates exit 0 as in round 2.
4. `git apply --check` of the shared and off-limits patches exits 0 in the worktree (command and exit pasted), and the retirement patch applies to the simulated state as in round 2.
5. The report carries every item of § Findings to close with its site, before, and after.

## Review evidence

`git -C /home/user/veneer-nb diff a658879` for the tracked owned file, `git diff --no-index /dev/null <path>` for each untracked owned file, and `git -C /home/user/veneer-nb status --porcelain`, captured by the Orchestrator at hand-back from inside the worktree as `nb-3.diff` and `nb-3-status.txt`, plus the report and the patches.
