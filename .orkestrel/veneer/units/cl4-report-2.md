<!-- CL4 stop report 2 (brief 3 over briefs 2 and 1), sol on Astra (gpt-6-astra, workspace-write), journal tmp/codex/cl4-2.jsonl (swept at acceptance), thread 01a0c447-35b6-78d3-9fa5-50301751a1c6, exit 0, retained 2026-09-21. The canonicalization landed and closed the two reset spellings; a second deviation stop on the build dropping the prefixed file-button selector. -->

# CL4 report 2

Stopped under brief 3's deviation contract. The granted canonicalization closes exactly the reset spelling gap, but the rebuilt cascade omits the authored `::-webkit-file-upload-button` selector and retains `::file-selector-button`. Conformance remains red. CL4 is incomplete.

The effective assignment is `cl4-brief-3.md` over `cl4-brief-2.md` and `cl4-brief.md`. Execution used the sol role on Astra, directly in the Veneer checkout, without spawning agents. HEAD remains `d822d59`. The existing guide and `listed` edits were preserved; nothing was restored, reset, or committed. This report supersedes `cl4-report.md`, which remains unedited.

## Deviation

Expected: the inventory's vendor pseudo-element survives the build with its exact spelling, apart from the canonicalization brief 3 grants.

Found: `src/styles/elements/_input.scss` authors these separate rules in the elements layer:

```css
::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}
::file-selector-button {
  font: inherit;
  -webkit-appearance: button;
}
```

After `npm.cmd run build:src:styles` exits 0, PostCSS reads only this file-button rule from `dist/src/styles/index.css`:

```css
::file-selector-button{font:inherit;-webkit-appearance:button}
```

The ensuing `npm.cmd run test:conformance` exits 1 and reports:

```text
Shipped component reboot is missing selector ::-webkit-file-upload-button
Test Files  1 failed (1)
Tests  1 failed | 7 passed (8)
```

Equating these vendor and standard names would exceed the granted legacy-colon and universal rules. Brief 3 requires a stop when the comparison needs that widening. The [scaffold deviation protocol](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md) also states: “Stop when a conflict prevents the primary objective or requires an unowned change.” The Orchestrator must rule on this emitted-selector gap. No vendor equivalence, exclusion, build configuration change, or selector workaround was added.

Exact source/build evidence is saved in `cl4-3-file-selector-evidence.txt`. The build and failing conformance logs are `cl4-3-build-partials.log.txt` and `cl4-3-conformance-partials.log.txt`.

## Comparison and measured scope

`scanCompatibilityPresence` parses the built cascade with PostCSS, walks nested rules across every layer, splits each rule's selector list, and compares normalized members by exact equality. Shipped rows require the inventory names except the names withheld by the guide. An `Excluded` name must first match a whole selector or property name anywhere in the inventory, then remain absent from the entire cascade. Substrings do not match. `readDeferrals` requires nonempty Name, Owner, and Reason cells.

`readOracleInventory` projects selector entries to their `selector` fields and properties to the component's property keys. The pinned Reboot fixture measured 117 selector entries and an empty properties object. Its row has no custom-property obligation. Repeated selector entries remain repeated in the following measurements, matching the reader's projection.

The instrument `cl4-count.mjs` transpiles the actual setup module, calls its normalizer, and compares the pinned fixture against the built stylesheet. These are its readings:

| Cascade and comparison | Missing inventory entries | Evidence |
| --- | ---: | --- |
| Entry cascade, original normalization | 64 | `cl4-3-count-before.log.txt` |
| Same cascade, granted canonicalization | 62 | `cl4-3-count-after.log.txt` |
| Rebuilt CL4 partials, granted canonicalization | 10 | `cl4-3-count-final.log.txt` |

The before/after delta is exactly `*::before` and `*::after`. Canonicalization left the remaining work missing. After the partial build, the missing population is exactly the guide's excluded names plus `::-webkit-file-upload-button`.

## Canonicalization proof

Only `normalizeComplexSelector` and its documentation changed in `tests/setupStyles.ts`. The implementation uses the existing selector walk and identifier reader. At the top level, it folds the exact legacy pseudo-element names and omits an unqualified universal immediately before a pseudo-element. Quoted text, escapes, functional arguments, namespaces, pseudo-classes, and other universals retain their spelling.

The added cases in `tests/setupStyles.test.ts` prove:

- `:before`, `:after`, `:first-line`, and `:first-letter` acquire the double colon.
- `:first-child`, `:focus`, `:beforehand`, and `:before()` stay unchanged; quoted, escaped, and functional-argument text stays unchanged.
- `*::before`, `::before`, and `:before` resolve to `::before`; `*:after` and `*::file-selector-button` lose only their targeted universal.
- `* + *`, `.a *`, and `*:focus` keep their universals. `a *::before` becomes `a ::before`, preserving the descendant relationship. Namespace-qualified and escaped stars stay unchanged.
- The actual built reset selector is found, while `legend + *` remains unchanged and absent from the built cascade. The missing-selector control prevents the spelling correction from passing an actually absent selector.

The same command ran red before implementation and green afterwards:

| Command | Exit | Final result |
| --- | ---: | --- |
| `npm.cmd run test:setup -- tests/setupStyles.test.ts` before the fix | 1 | `Test Files 1 failed (1)`; `Tests 3 failed \| 73 passed (76)`; duration `1.19s` |
| `npm.cmd run test:setup -- tests/setupStyles.test.ts` after the fix | 0 | `Test Files 1 passed (1)`; `Tests 76 passed (76)`; duration `1.17s` |

Logs are `cl4-3-normalization-red.log.txt` and `cl4-3-normalization-green.log.txt`. Real runs supplied the pair because the brief records the `prove` tool as blocked.

## Partials left for review

Every assigned partial exists and loads from `src/styles/index.scss`. The layer order is unchanged. The following bindings are authored and built; their resolved-value proofs have not been written or run. Presence was measured by the inventory comparison, not inferred from source.

The calibrated values come from scaffold's `.orkestrel/veneer/research/calibration-content.md`, specifically the `table-bare`, `figure`, and `img` records. Retained values come from the installed Bootstrap 5.3.8 `scss/_reboot.scss` rules. Existing tokens supply spacing, typography, and borders where available.

| Partial | Selectors authored | Values and source |
| --- | --- | --- |
| `_b.scss` | `b` | Bootstrap `font-weight: bolder`. |
| `_figure.scss` | `figure`, `figcaption` | Calibrated zero figure margin, flex column, 8px gap through `--vn-space-4`; caption `.875em` and `--vn-text-muted`. |
| `_img.scss` | `img` | Calibrated block image, `max-inline-size: 100%`, automatic block size, middle vertical alignment. Contextual inline-image treatment is not imported. |
| `_svg.scss` | `svg` | Bootstrap middle vertical alignment. |
| `_table.scss` | `table`, `caption`, `thead`, `tbody`, `tfoot`, `colgroup` | Calibrated top caption and collapsed borders; caption block/inline padding through `--vn-space-4`/`--vn-space-6`, `.875em`, muted color, and start alignment. Groups retain inherited border color, solid style, and zero width. |
| `_tr.scss` | `tr`, `td`, `th` | Bootstrap group border reset; calibrated cells use 8px/12px token padding, a token-backed block-end border, middle alignment, inherited text alignment, and heading weight 600 for `th`. |
| `_label.scss` | `label` | Bootstrap `display: inline-block`. |
| `_button.scss` | Existing button states; added `button:focus:not(:focus-visible)`, `[role=button]`, `[type=button]`, `[type=reset]`, `[type=submit]`, `button:not(:disabled)`, and each type selector's `:not(:disabled)` twin | Existing U7 calibrated treatment preserved. Added Bootstrap zero margin, no text transform, button appearance, nonvisible-focus outline reset, and pointer cursors. |
| `_input.scss` | `input` and the attribute/vendor selectors listed after this table | Bootstrap zero margin and inherited family, size, and line height; native-control corrections retained. The prefixed upload selector is authored but absent from the build. |
| `_select.scss` | `select`, `select:disabled` | Bootstrap zero margin, inherited family/size/line height, no transform, normal word wrapping, and disabled opacity 1. No `option` selector is required by the inventory. |
| `_optgroup.scss` | `optgroup` | Bootstrap zero margin and inherited family, size, and line height. |
| `_textarea.scss` | `textarea` | Bootstrap zero margin, inherited family/size/line height, and vertical resizing. |
| `_fieldset.scss` | `fieldset`, `legend` | Bootstrap zero minimum inline size, padding, margin, and border for fieldset. Legend uses logical `float: inline-start` and full inline size, zero padding, `--vn-space-4` end margin, inherited line height, and the retained responsive size expressed as `calc(var(--vn-size-6) * .85 + .3vw)`, then `--vn-size-6` at 1200px. The excluded sibling-clear rule is absent. |
| `_output.scss` | `output` | Bootstrap `display: inline-block`. |
| `_iframe.scss` | `iframe` | Bootstrap zero border. |
| `_details.scss` | `summary` | Bootstrap list-item display and pointer cursor. No extra `details` rule is needed to carry the mandated family. |
| `_progress.scss` | `progress` | Bootstrap baseline vertical alignment. |

The input-family attribute and pseudo-element selectors are:

```text
[list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator
::-webkit-datetime-edit-fields-wrapper
::-webkit-datetime-edit-text
::-webkit-datetime-edit-minute
::-webkit-datetime-edit-hour-field
::-webkit-datetime-edit-day-field
::-webkit-datetime-edit-month-field
::-webkit-datetime-edit-year-field
::-webkit-inner-spin-button
[type=search]
[type=search]::-webkit-search-cancel-button
::-webkit-search-decoration
::-webkit-color-swatch-wrapper
::-webkit-file-upload-button
::file-selector-button
```

Their retained declarations hide the datalist indicator with `!important`, remove datetime and color-wrapper padding, retain automatic spin-button height, use textfield search appearance and `-2px` outline offset, give the search cancel button a pointer and grayscale filter, remove search decoration appearance, and inherit file-button font with button appearance. Attribute-only and vendor selectors stay in their owning button/input partials. No elements-layer guard edit was made.

## Exclusions and unfinished work

The preserved guide rows use Owner `Excluded` with these reasons:

| Name | Reason |
| --- | --- |
| `ol ol` | Nested list treatment infers styling from tag composition. |
| `ul ul` | Nested list treatment infers styling from tag composition. |
| `ol ul` | Nested list treatment infers styling from tag composition. |
| `ul ol` | Nested list treatment infers styling from tag composition. |
| `pre code` | Contextual code treatment infers styling from tag composition. |
| `a > code` | Contextual code treatment infers styling from tag composition. |
| `kbd kbd` | Nested keyboard treatment infers styling from tag composition. |
| `legend + *` | Sibling clearing infers layout from adjacency to a legend. |
| `::-moz-focus-inner` | This Gecko-only pseudo-element is unreachable on the managed Chromium and Edge receipts. |

The conformance scan passes exclusion membership and absence checks before reporting the missing upload selector. The independent final inventory reading also records all these names absent.

The guide's `reboot` row remains `shipped` and `listed` remains `['btn', 'reboot']`, as the brief requires for the development readings. These unfinished edits do not establish completed shipping. Mirrored partial proofs, wrong-value plants, the shipped-selector removal/restoration pair, ContentSection specimens and proof updates, and the guide's files/departure rows remain undone. The elements-layer and physical-axis browser guards have not run against these partials. No browser receipt proves their resolved values.

No wrong-value or selector-removal plant was made, so no plant remains. The canonicalization tests are permanent regression cases, not plants. No off-limits source, fixture, setup function, or vendored file was edited.

## Executed development evidence

Commands ran on Windows using the default managed Chromium configuration. Edge was not run. The conformance command's official Button behavior case passed in each recorded run.

| Command | Exit | Final result |
| --- | ---: | --- |
| `node --experimental-strip-types cl4-count.mjs`, before and after canonicalization and after the partial build | 0 | Miss counts `64`, `62`, and `10`, respectively. |
| `npm.cmd run test:conformance`, after canonicalization with partials absent | 1 | Missing `b`; `Test Files 1 failed (1)`; `Tests 1 failed \| 7 passed (8)`; duration `3.97s`. |
| `npm.cmd run build:src:styles`, with partials authored | 0 | `index.css 58.12 kB`; `index.rtl.css 58.12 kB`; `built in 351ms`. |
| `npm.cmd run test:conformance`, after the partial build | 1 | Missing `::-webkit-file-upload-button`; `Test Files 1 failed (1)`; `Tests 1 failed \| 7 passed (8)`; duration `3.95s`. |
| `./node_modules/.bin/oxfmt.cmd` over the owned setup edits, index, and CL4 partials | 0 | `Finished in 9ms on 20 files using 16 threads.` |
| `git diff --check` | 0 | No output. |

The initial conformance log is `cl4-3-conformance-initial.log.txt`; formatter output is `cl4-3-format.log.txt`. Normalization's complete red/green pair is recorded earlier. The presence-scan pair remains red; no green result is claimed. Formatting ran after the measured build and tests; no subsequent stylesheet proof was read.

## Acceptance gates

The ordered acceptance chain did not start after the stop condition. Development readings are not acceptance gates.

| Gate | Exit and final lines |
| --- | --- |
| `npm.cmd run format:check` | Not run. |
| `npm.cmd run lint:check` | Not run. |
| `npm.cmd run check` | Not run. |
| `npm.cmd run build` | Not run. |
| `npm.cmd run test:src:styles` | Not run. |
| `npm.cmd run test:conformance` | Development runs exited 1, as recorded earlier; acceptance run not reached. |
| `npm.cmd run test:app:browser` | Not run. |
| `npm.cmd run test:journey` | Not run. |
| `npm.cmd run test:guides` | Not run. |
| `npm.cmd run test:policy` | Not run. |
| `npm.cmd run test:setup` | The scoped setupStyles development pair ran; the whole setup gate was not run. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | Not run. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | Not run. |

## Working-tree evidence

The actual `git diff --stat` output is:

```text
 guides/veneer.md                 | 136 +++++++++++++++++++++------------------
 src/styles/elements/_button.scss |  20 ++++++
 src/styles/index.scss            |  16 +++++
 tests/conformance.test.ts        |   2 +-
 tests/setupStyles.test.ts        |  36 +++++++++++
 tests/setupStyles.ts             |  28 +++++++-
 6 files changed, 172 insertions(+), 66 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M guides/veneer.md
 M src/styles/elements/_button.scss
 M src/styles/index.scss
 M tests/conformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/elements/_b.scss
?? src/styles/elements/_details.scss
?? src/styles/elements/_fieldset.scss
?? src/styles/elements/_figure.scss
?? src/styles/elements/_iframe.scss
?? src/styles/elements/_img.scss
?? src/styles/elements/_input.scss
?? src/styles/elements/_label.scss
?? src/styles/elements/_optgroup.scss
?? src/styles/elements/_output.scss
?? src/styles/elements/_progress.scss
?? src/styles/elements/_select.scss
?? src/styles/elements/_svg.scss
?? src/styles/elements/_table.scss
?? src/styles/elements/_textarea.scss
?? src/styles/elements/_tr.scss
```

The actual tracked diff is saved in `cl4-3-diff.patch`. Untracked partials appear in status and remain available for review; Git's diff statistic does not include them. Git also reports that `C:\Users\mikes/.config/git/ignore` cannot be accessed because permission is denied. Reports and execution artifacts under ignored `` do not appear in porcelain output. Only owned files changed.
