# B-FORMS-SELECT — report

`opus` on Opus 5.5, sole writer in `/home/user/veneer-bfs`, detached at `2c10329`. Nothing was
committed, pushed, or installed.

The `form-select` key ships: the partial, its browser proof, the Node case-table proof, the Form
select showcase section and its proof, the capture scenarios, the compatibility rows, the `listed`
entry, the departure table, and the guide section. The format, lint, type, build, styles, app,
guides, policy, journey, and capture gates exit 0. The setup and conformance gates stay red,
each on a condition outside this unit's files:

- `npm run test:setup` reddens on the shipped-key Set literal in `tests/setupServer.test.ts`, which
  is the Orchestrator's integration edit (O1).
- `npm run test:conformance` reddens on its presence case, because the `form-select` key records
  floating-label and input-group selectors that the FLOATING and GROUP partials own and this
  worktree lacks (O2, ruling 11). The ledger, deferral, and tag cases are green.

Deviation D1 needs a decision: the dark theme scope still declares `--bs-form-select-bg-img`.

## Touched files

Owned, created:

- `src/styles/components/_form-select.scss`: the select, its caret read from the icon map, its
  focus, list forms, disabled surface, Gecko focus-ring reset, sizes, and reduced-motion twin, and
  the dark caret rule reading `map.get(tokens.$dark, 'select-indicator')`.
- `tests/src/styles/components/form-select.test.ts`: the browser proof.
- `app/browser/sections/FormSelectSection.ts`: the `Form select` region, in the
  `FormRangeSection` shape.
- `tests/app/browser/sections/FormSelectSection.test.ts`: the section proof.

Owned at anchors, appended:

- `src/styles/index.scss`: `@use 'components/form-select';` directly before
  `@use 'components/form-range';`.
- `app/browser/constants.ts`: `FORM_SELECT_COPY` and `FORM_SELECT_SPECIMENS`, after the range pair.
- `app/browser/Showcase.ts`: the import in alphabetical order, and the construction after
  `FormRangeSection` (alphabetical by region name).
- `app/browser/index.ts`: the re-export after the range section's.
- `tests/setup.ts`: the `CaptureSubject` members, the `CASCADE_KEYS` rows at the array's end,
  `FORM_SELECT_KEYS` after `CLOSE_KEYS`, and its `CAPTURE_KEYS` spread.
- `tests/setup.test.ts`: the import, the export-list name, and the matching spread.
- `tests/setupStyles.ts`: `FORM_SELECT_CASES`, `FORM_SELECT_MARKUP`, and `FORM_SELECT_FOCUS` at the
  file's end.
- `tests/setupStyles.test.ts`: the imports, the export-list names, and a `form select case tables`
  describe at the file's end.
- `tests/app/browser/Showcase.test.ts` and `tests/app/browser/index.test.ts`: the region, specimen,
  and export inventories.
- `tests/app/browser/integration.test.ts`: the specimen import, the portfolio's declared table, and
  the focus journey case.
- `tests/conformance.test.ts`: `'form-select'` in `listed`, sorted.
- `guides/veneer.md`: `### Form select classes` before `### Form range classes`, the § Files row,
  the § Compatibility selector and variable rows, the `#### \`form-select\`` departure table after
  the last table, the `.form-select.is-valid:focus` and `.form-select.is-invalid:focus` row
  deletions from the `is-valid` and `is-invalid` tables (D4), the corrected paragraph under
  § Bootstrap variables Veneer retains, and the § Tests link.

Diffstat, `git diff --stat` over the tracked files:

```text
 app/browser/Showcase.ts               |   2 +
 app/browser/constants.ts              |  59 +++++++++++++
 app/browser/index.ts                  |   1 +
 guides/veneer.md                      | 110 +++++++++++++++++++++--
 src/styles/index.scss                 |   1 +
 tests/app/browser/Showcase.test.ts    |   3 +
 tests/app/browser/index.test.ts       |   3 +
 tests/app/browser/integration.test.ts |  45 ++++++++++
 tests/conformance.test.ts             |   1 +
 tests/setup.test.ts                   |   3 +
 tests/setup.ts                        |  58 +++++++++++++
 tests/setupStyles.test.ts             | 100 +++++++++++++++++++++
 tests/setupStyles.ts                  | 158 ++++++++++++++++++++++++++++++++++
 13 files changed, 537 insertions(+), 7 deletions(-)
```

The untracked owned files, by `wc -l`: `src/styles/components/_form-select.scss` 87,
`tests/src/styles/components/form-select.test.ts` 358,
`app/browser/sections/FormSelectSection.ts` 20, and
`tests/app/browser/sections/FormSelectSection.test.ts` 115.

`git status --porcelain` lists the tracked files in the diffstat as ` M` and the created files as
`??`, and nothing else. `tmp/` is ignored; the unit's own `tmp/probe/` directory was removed.

## Coverage matrix

Each row names the inventory selector and condition, the proof case, the subject element, the
specimen, the capture scenario, and the evidence limit. The browser cases sit in
`tests/src/styles/components/form-select.test.ts` unless a row names another file.

| Inventory selector (condition) | Proof case | Subject | Specimen | Scenario | Evidence limit |
| --- | --- | --- | --- | --- | --- |
| `.form-select` (none) | `resolves each recorded declaration on the element its selector matches…` (display, width, padding, font size, weight, line height, appearance, background repeat, position, size, border, radius, `--bs-form-select-bg-img`); `reads the border, the fill, and the disabled surface…`; `lets a direct declaration retune…`; `reads its spacing from the space scale…` | `[aria-label="Plain choice"]` in `FORM_SELECT_MARKUP` | `Form select base` | `form-select-base` (element frame) | Resolved readings |
| `.form-select` (`@media (prefers-reduced-motion: reduce)`) | `gates the border and ring transition…` | plain select | `Form select base` | none; a preference paints no frame | Resolved under `stageMedia({ motion: false })`; condition read through `collectMediaConditions` |
| `.form-select:focus` | `rings the select under keyboard focus…`; journey `reaches the plain select through the keyboard…` in `tests/app/browser/integration.test.ts` | plain select reached by `traverseAccessible` | `Form select base` | `form-select-base-focus` (page frame) | Ring resolved and `readRing` held to `FOCUS_RING` in each mode; border tint held within one channel step of `#86b7fe` |
| `.form-select[multiple]` | `resolves each recorded declaration…` (padding-right, `background-image: none`); `reads its spacing…` | `[multiple]` select | `Form select multiple` | `form-select-multiple` | Resolved readings |
| `.form-select[size]:not([size="1"])` | `resolves each recorded declaration…` (padding-right, `background-image: none`); the `size="1"` select keeps the caret | `size="3"` select, with the `size="1"` select as the excluded control | `Form select sized` | `form-select-sized` | Resolved readings |
| `.form-select:disabled` | `resolves each recorded declaration…` (background color); `reads the border, the fill, and the disabled surface…` (both modes, `readStates`); the traversal refusal in `rings the select…` | disabled select | `Form select disabled` | `form-select-disabled` | Resolved readings |
| `.form-select:-moz-focusring` | Browser: `resolves each recorded declaration…` asserts the CSSOM carries no such rule. Node: `tests/setupStyles.test.ts` › `reads the Gecko focus-ring reset out of the compiled cascade…` | none reachable | none | none | Compiled-contract evidence only; see § Ladder path |
| `.form-select-sm` | `resolves each recorded declaration…` (padding-top, padding-bottom, padding-left, font size, radius); `reads its spacing…` (shorter than the plain select, end padding kept, both factors) | `.form-select-sm` select | `Form select small` | `form-select-small` | Resolved readings |
| `.form-select-lg` | The same cases as `.form-select-sm` | `.form-select-lg` select | `Form select large` | `form-select-large` | Resolved readings |
| `[data-bs-theme=dark] .form-select`, recorded under the `theme` key | `resolves each recorded declaration…` (the dark caret row); `paints the dark caret on the element inside a dark scope…` (a wrapper retune reaches neither caret; a nested light island keeps the dark caret) | plain select in the dark island | `Form select base` | `form-select-base` at `dark-1280` and `dark-390` | Resolved readings |
| `.form-floating > .form-select`, its `~ label` rule, and the `.input-group` select rules | none in this unit | — | — | — | FLOATING and GROUP own them (O2) |
| `.was-validated .form-select:*` and `.form-select.is-*` | `tests/src/styles/components/validation.test.ts`, unchanged and green | — | Validation's `Valid select` and `Invalid select` | Validation's | `_validation.scss` emits them; D4 records the ledger attribution that moved |

`tests/setupStyles.test.ts` › `binds every select case row and the focus treatment to the official
inventory` holds each `FORM_SELECT_CASES` row and `FORM_SELECT_FOCUS` to the pinned inventory. It
also holds the key's own select selectors equal to the rows' selectors plus `.form-select:focus`, so
a recorded select selector no row reads reddens it.

## Mutation per case

Each mutation was planted in `src/styles/components/_form-select.scss`, the named proof was run,
and the exact edit was reversed; `cmp` against the pre-mutation copy reported the partial identical
after the run. Instrument:
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfs/mutate-2.py`, the
successor of `mutate.py` beside it, which read the counts but not the case names; its log is
`mutations-2.log.txt` in the same directory. Each browser run is
`npm run test:src:styles -- tests/src/styles/components/form-select.test.ts`; the Gecko run is
`npx vitest run --config vite.config.ts --project setup tests/setupStyles.test.ts -t "form select case tables"`.

| Mutation | Reading | Cases that went red |
| --- | --- | --- |
| Wrong caret URI (`'check'` for `'select-indicator'`) | 2 failed, 5 passed (7) | `resolves each recorded declaration…`; `paints the dark caret…` |
| Dark rule removed | 2 failed, 5 passed (7) | `resolves each recorded declaration…`; `paints the dark caret…` |
| Ring width written as the release's `0.25rem` | 1 failed, 6 passed (7) | `rings the select under keyboard focus…` |
| `background-image: none` removed from the list rule | 1 failed, 6 passed (7) | `resolves each recorded declaration…` |
| Transition written without the mixin, so no reduced-motion twin | 3 failed, 4 passed (7) | `gates the border and ring transition…`; `lets a direct declaration retune…`; `rings the select…` |
| `.form-select[size]` without the `:not([size="1"])` exclusion | 1 failed, 6 passed (7) | `resolves each recorded declaration…` (the `size="1"` select lost its caret) |
| Padding written as the release's literals | 1 failed, 6 passed (7) | `reads its spacing from the space scale…` |
| `:-moz-focusring` rule removed | 1 failed, 3 passed, 83 skipped (87) | `reads the Gecko focus-ring reset out of the compiled cascade…` |

## Token reuse and literal rulings

Every value met an existing token, a declared global, or a permitted literal. No value needed a
stop, and no token was added.

- Padding `0.375rem` reads `--vn-space-3`, and `0.75rem` reads `--vn-space-6` (the start padding,
  the caret inset in `background-position`, and the list forms' end padding).
- The end padding `2.25rem` is `calc(var(--vn-space-6) * 3)`. The release defines
  `$form-select-indicator-padding` as `$form-select-padding-x * 3`, and no space token resolves to
  `2.25rem`. The expression resolves to the release value and keeps the caret gutter scaling with
  the inset it clears; the range partial's `calc(var(--vn-space-2) * -1)` is the precedent.
- The size classes read `--vn-space-2` (`0.25rem`), `--vn-space-4` (`0.5rem`), and `--vn-space-8`
  (`1rem`).
- The font size reads `--vn-size-3` (`1rem`), `--vn-size-2` (`0.875rem`), and `--vn-size-5`
  (`1.25rem`), the tokens pagination binds.
- The weight reads `--vn-weight-body` (`400`) and the line height `--vn-line-body` (`1.5`), the
  button's bindings.
- The transition `0.15s ease-in-out` reads `var(--vn-motion-feedback) var(--vn-ease-standard)`
  through the `transition` mixin, the button's and the range's binding; it resolves to
  `0.15s ease`.
- The focus ring `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` is
  `0 0 0 var(--vn-focus-width) var(--vn-focus-color)`, per ruling 9.
- The focus border `#86b7fe` is
  `color-mix(in srgb, var(--vn-palette-blue) 50%, var(--vn-palette-white-base))`. The styles rule
  forbids a literal color, and the release bakes this tint as half its blue over white; the range
  partial's held-thumb tint is the precedent.
- These globals are written byte for byte: `var(--bs-body-color)`, `var(--bs-body-bg)`,
  `var(--bs-border-width) solid var(--bs-border-color)`, `var(--bs-border-radius)`,
  `var(--bs-border-radius-sm)`, `var(--bs-border-radius-lg)`, `var(--bs-secondary-bg)`,
  `0 0 0 var(--bs-body-color)`, and the image
  `var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none)`.
- These values stay literal because no token carries them: `display: block`, `width: 100%`,
  `appearance: none`, `background-repeat: no-repeat`, `background-size: 16px 12px` (the caret's
  own size), `outline: 0`, `background-image: none`, and `color: transparent`.
- The carets are `map.get(tokens.$icons, 'select-indicator')` and
  `map.get(tokens.$dark, 'select-indicator')`, per ruling 4. Both are Sass map entries, not tokens.

## Ladder path

`.form-select:-moz-focusring` is the one selector that took the ladder. Chromium discards the
selector at parse time, so no resolved reading exists, and the browser proof asserts that `findRule`
returns nothing for it; an engine that starts keeping the rule reddens that line. The authored
declaration is unreachable through `findRule` and `readRules` for the same reason, so the reading
moves to the compiled cascade: `tests/setupStyles.test.ts` reads `color: transparent` and
`text-shadow: 0 0 0 var(--bs-body-color)` out of `compileExpandedCascade()`. That is
compiled-contract evidence, and the guide names it so. No frame corroborates it, because no Chromium
frame can show a Gecko-only rule. Every other selector took the resolved reading.

## Departure rows and additions

The `#### \`form-select\`` table carries the comparison's own rows:

- `tokenized`: `.form-select` `padding`, `font-size`, `font-weight`, `line-height`,
  `background-position`, and `transition`; `.form-select:focus` `border-color` and `box-shadow`;
  `.form-select[multiple]` and `.form-select[size]:not([size="1"])` `padding-right`;
  `.form-select-sm` and `.form-select-lg` `padding-top`, `padding-bottom`, `padding-left`, and
  `font-size`; `.form-select.is-valid:focus` and `.form-select.is-invalid:focus` `box-shadow`, moved
  from the `is-valid` and `is-invalid` tables (D4).
- `dropped`: `.form-select` `-webkit-appearance` and `-moz-appearance`.

There are no additions. The dark rule `[data-bs-theme=dark] .form-select` is recorded under the
release's `theme` key, which ships as no component, so `attributeSelector` leaves the rule outside
the ledger.

## Deferral rows struck

None. § Deferred selectors names no `form-select` selector: a word-boundary grep for `form-select`
over `guides/veneer.md` returns no deferral row.

## Scenarios, frames, and artifacts

Registered scenarios: the `CASCADE_KEYS` rows `form-select-base`, `form-select-small`,
`form-select-large`, `form-select-multiple`, `form-select-sized`, and `form-select-disabled`
(element frames over the lifted specimen), and the `FORM_SELECT_KEYS` row `form-select-base-focus`
(a page frame reached by keyboard traversal).

The `CAPTURE=1` runs wrote these files under `tmp/capture/states/`, each at `light-1280`,
`dark-1280`, `light-390`, and `dark-390`:

- `form-select-base--<variant>.png`, `form-select-small--<variant>.png`,
  `form-select-large--<variant>.png`, `form-select-multiple--<variant>.png`,
  `form-select-sized--<variant>.png`, `form-select-disabled--<variant>.png`, and
  `form-select-base-focus--<variant>.png`.
- The accessibility artifact `<subject stem>--<variant>-accessibility.txt` for each of the
  `form-select-base`, `form-select-small`, `form-select-large`, `form-select-multiple`,
  `form-select-sized`, and `form-select-disabled` stems.

The `light-1280` and `dark-1280` base frames show the caret in the release's dark gray and light
gray respectively; the multiple frame shows the Northworks, Southgate, and Eastfield options
and no caret; the disabled frame shows the secondary surface. The focus frame at `light-1280`
measures 1280 by 14381 pixels.

## Key the shipped-key Set literal must gain

`tests/setupServer.test.ts` › `skips engine and CSS obligations whose Proof cell is a dash`: add
`'form-select',` directly after `'form-range',`.

## Commands, exit codes, and counts

Every command ran from `/home/user/veneer-bfs` with npm 11.19.1 on `PATH` and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

The following readings are each command's own output.

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json` over the owned files | 0 | Formatted in place; only owned files changed |
| `npm run format:check` | 0 | All matched files use the correct format (266 files) |
| `npm run lint:check` | 0 | No diagnostic |
| `npm run check` | 0 | Root, `src` core, browser, and styles, and `app` browser projects clean |
| `npm run build:src` | 0 | Taken after the mutation runs restored the partial |
| `grep -oF` over `dist/src/styles/index.css` | — | `.form-select{` 3 (the rule, the reduced-motion twin, and the dark rule's tail); `.form-select:focus{`, `.form-select[multiple],.form-select[size]:not([size="1"]){`, `.form-select:disabled{`, `.form-select:-moz-focusring{`, `.form-select-sm{`, `.form-select-lg{`, `[data-bs-theme=dark] .form-select{`, and `@media (prefers-reduced-motion:reduce){.form-select{transition:none}}` 1 each |
| `npm run test:setup` | 1 | 1 failed, 185 passed (186); the failure is O1 |
| `npm run test:src:styles` | 0 | 71 files, 641 passed (641), after the final build |
| `npm run test:app` | 0 | 23 files, 55 passed (55) |
| `npm run test:conformance` | 1 | 1 failed, 16 passed (17), after the final build; the failure is O2, and the ledger, deferral, and tag cases pass |
| `npm run test:guides` | 0 | 18 passed (18) |
| `npm run test:policy` | 0 | 109 passed, 1 skipped (110) |
| `npm run test:journey` | 0 | 4 files, 132 passed (132), in 111 s |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` | 0 | 33 passed (33) |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-1280*'` | 0 | 33 passed (33) |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-390*'` | 0 | 33 passed (33) |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-390*'` | 0 | 33 passed (33) |
| `npm test` (observation) | 1 | Stopped at `test:setup` on O1; see O4 |

Every reading was taken after the last source and test edit. The last guide edits, under
§ Bootstrap variables Veneer retains and § Form select classes, came before the `format:check`,
`lint:check`, `check`, `test:guides`, `test:policy`, `test:setup`, and `test:conformance` readings in
the table.

## Failing-first evidence

- `npm run test:src:styles -- tests/src/styles/components/form-select.test.ts`, with the proof, the
  case table, and the markup written and no partial: exit 1, 7 failed of 7. The same command after
  the partial and the barrel line: exit 0, 7 passed of 7.
- The Node case-table cases and the section proof were written after the partial existed and never
  ran red against an absent partial; the Gecko mutation in § Mutation per case is the red reading
  for the compiled-cascade case, and the section proof asserts markup this unit declares.

## Deviations

- **D1 — the dark theme scope still declares `--bs-form-select-bg-img`.** Expected, per ruling 4:
  VALIDATION removes the `select-indicator` entry from `$assets`. Found: `src/styles/_tokens.scss`
  still carries `'select-indicator': '--bs-form-select-bg-img',` inside `$assets` (around line 162),
  and the `@each` over `tokens.$assets` in `src/styles/_theme.scss` (around line 21) emits it on
  `[data-bs-theme='dark']`. Both files are off-limits here, and `ROADMAP.md` § Carriers names
  B-FORMS-SELECT as the unit that removes the entry, so the plan of record and this brief disagree.
  The brief's standing condition names the action, so the component rules landed anyway. They
  declare the caret on the element, and the proof reads what the element resolves: a retune of the
  variable on a dark or light wrapper reaches neither caret (`paints the dark caret…`). The brief's
  deviation contract also lists this as a stop; the standing condition was followed because it
  names the action for exactly this case. Done: the component rules and the guide sentence stating
  the leftover declaration. Not done: the removal. Exact patch for the removal:

  ```diff
  --- a/src/styles/_tokens.scss
  +++ b/src/styles/_tokens.scss
   $assets: (
  -	'select-indicator': '--bs-form-select-bg-img',
   	'switch-knob': '--bs-form-switch-bg',
  ```

  Files that patch makes false, found by a grep for `select-indicator`, `bs-form-select-bg-img`, and
  `$assets` over `src/`, `tests/`, and `guides/` and not run: `tests/src/styles/theme.test.ts` ›
  `carries the dark-only component assets in the dark scope alone` (reads the variable on a bare
  element); `tests/src/styles/tokens.test.ts` › `re-declares every theme-dependent name inside each
  mode scope` (compares the dark scope with `BOOTSTRAP_DARK_VARIABLES`, which lists the variable);
  and the sentence this unit added under § Bootstrap variables Veneer retains. Hypothesis: the
  VALIDATION report's patch, which the roadmap row cites, covers the tests.
- **D2 — the plain specimen is `Form select base`, not `Form select`.** `readSubject` in
  `tests/setupBrowser.ts` refuses a name a specimen and a region both answer to, so a specimen named
  `Form select` beside the `Form select` region failed the portfolio cases in every variant. The
  name follows `Card base` and `List group base`. Ancillary; settled in scope.
- **D3 — `npm run test:conformance` is not fully green.** Criterion 6 names it; ruling 11 makes the
  sibling-absent red an observation. The reading is O2.
- **D4 — the validated select's focus rows moved to the `form-select` ledger table.**
  `attributeSelector` prefers the longest class a selector carries, so
  `.form-select.is-valid:focus` and `.form-select.is-invalid:focus` attribute to `form-select` once
  it ships. The conformance loop reported them stale under
  `is-valid` and `is-invalid` and unrecorded under `form-select`; the unit deleted the stale rows and
  wrote them into the `form-select` table. Ancillary; settled in scope, reported because it touches
  tables VALIDATION wrote.
- **D5 — the section's construction sits after `FormRangeSection`.** The brief names the
  alphabetical position; region names sort `Form range` before `Form select`, so the region follows
  the range region even though the barrel loads the select partial first. Ancillary.

## Observations

- **O1.** `npm run test:setup` fails only `tests/setupServer.test.ts` › `skips engine and CSS
  obligations whose Proof cell is a dash`, on the missing `'form-select'` member.
- **O2.** `npm run test:conformance` fails only `carries every shipped component selector and custom
  property in the built cascade`, on `Shipped component form-select is missing selector
  .form-floating > .form-select`. A probe (`tmp/probe/form-select-presence.test.ts`, retained as
  `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfs/form-select-presence.test.ts`
  and removed from the tree) listed every withheld
  `form-select` selector: `.form-floating > .form-select` (twice), `.form-floating > .form-select ~
  label`, `.input-group > .form-select`, `.input-group > .form-select:focus`,
  `.input-group-lg > .form-select` (twice), `.input-group-sm > .form-select` (twice),
  `.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-select`,
  `.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-select`, and
  `.input-group > .form-floating:not(:first-child) > .form-select`. Control: the same reading over a
  cascade with `.form-select-sm` renamed no longer finds that selector, and `.form-select` and the
  dark rule are found in the unplanted cascade.
- **O3.** The journeys ran green under sibling load (load average between 6 and 14 during the runs).
- **O4.** `npm test`, taken once after the final build, exits 1. Its chain passed `test:src`
  (8 files, 77 passed), `test:src:styles` (71 files, 641 passed), `test:src:tailwind` (8 passed),
  `test:app` (23 files, 55 passed), `test:journey` (4 files, 132 passed), `test:policy`
  (109 passed, 1 skipped), and `test:config` (173 passed, 1 skipped), then stopped at `test:setup`
  on O1, so `test:setup:browser`, `test:conformance`, and `test:guides` did not run inside it.
  `test:conformance` and `test:guides` have their own readings in § Commands; this unit did not run
  `test:setup:browser`.
- **O5.** A case-insensitive word sweep for the substitution table's terms (`should`, `simply`,
  `easy`, `easier`, `just`, `currently`, `now`, `new`, `latest`, `utilize`, `leverage`, `via`,
  `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `since`,
  `once`, `above`, `below`, `please`, `sanity`, `dummy`, `ensure`, `guarantee`) over the added lines
  of `git diff` for `guides/`, `app/`, `tests/`, and `src/`, and over the created files, returned
  only the code token `new` (a constructor call); every hit is permitted.

## `ROADMAP.md` patch

The B-FORMS unit row and the § Carriers row change. The full unified diff, against the padded
table lines, is `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfs/ROADMAP.patch`; run
the formatter on `ROADMAP.md` after applying it, because the replaced cells change the column
widths.

- In the B-FORMS row of the unit table, replace `GROUP is next` with
  ``SELECT ran in `/home/user/veneer-bfs` on Opus 5.5 and awaits audit; GROUP is next``.
- In the § Carriers row `Theme-scope select caret and switch knob`, replace the carrier cell
  ``B-FORMS-SELECT removes `select-indicator` and B-FORMS-CHECK removes `switch-knob` from `$assets`,
  each with the `tokens.test.ts`, `theme.test.ts`, and guide patch the VALIDATION report carries, in
  the change that ships the component rule declaring the dark value`` with
  ``B-FORMS-SELECT shipped the component rules declaring both carets with `_tokens.scss` off-limits,
  so removing `select-indicator` from `$assets` (with the `tokens.test.ts`, `theme.test.ts`, and
  guide patch the VALIDATION report carries) has no carrier yet; B-FORMS-CHECK removes `switch-knob`
  in the change that ships its dark rule``.

## Claims flagged unverified

- The set of files the D1 removal makes false is a grep bound, not a run.
- The capture frames were read by eye for the `light-1280` and `dark-1280` base frames, the
  `light-1280` multiple and disabled frames, and the `light-390` base frame; the focus page frames
  were not opened, and the journey's own ring reading is their evidence.
- `readRing` on the select matches `FOCUS_RING` to 3 decimal places in the styles proof (light) and
  in each journey variant. That the reader resolves the page surface as the backdrop in both places,
  which is why the button's calibration applies, is inferred rather than read, and no case varies
  the backdrop.
- The forced-colors rendering of the focus treatment is unread; the release writes `outline: 0`
  and a shadow, and this unit ships the same pair.
