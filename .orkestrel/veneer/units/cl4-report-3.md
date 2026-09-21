<!-- CL4 stop report 3 (brief 4 over briefs 3, 2, 1), sol on Astra (gpt-6-astra, workspace-write), journal tmp/codex/cl4-3.jsonl (swept at acceptance), thread 01a0c450-d1a6-7311-bc86-a6fad903bd74, exit 0, retained 2026-09-21. The presence scan is green and every assigned partial has a proof; a third deviation stop on the ledger enumerations in the off-limits conformance proof. -->

CL4 is incomplete. The final gate chain passes through `test:policy`, then `test:setup` fails on Button-only assumptions in the off-limits `tests/setupConformance.test.ts` file. The Reboot presence scan is green, every assigned partial has a mirrored Chromium proof, and all plants are removed. The Edge styles and application gates remain unrun.

Execution followed brief 4 over briefs 3, 2, and 1, as the sol role on Astra in the Veneer checkout. HEAD remains `d822d59`. The earlier CL4 work and reports were preserved. No agents were spawned, no files were reset or restored through Git, and nothing was committed.

The scope blocker is concrete. Expected: the setup proofs accept the required `reboot` ledger row. Found: `npm.cmd run test:setup` exits 1 with `Tests 4 failed | 125 passed (129)` in `cl4-4-final-test-setup.log.txt`:

| Location in `tests/setupConformance.test.ts` | Failure |
| --- | --- |
| 621 | Shipped components are `['btn', 'reboot']`; the assertion expects `['btn']`. |
| 642 | The all-shipped ledger produces `['btn', 'reboot']`; the assertion expects `['btn']`. |
| 680 | The written inventory omits Reboot while the real guide includes it: `Shipped component reboot has no official inventory`. |
| 746 | The component set contains `reboot`, `btn`, and `engine`; the assertion expects only `btn` and `engine`. |

These assertions need a scope grant. Brief 3 grants only `normalizeComplexSelector` in `tests/setupStyles.ts` and its cases in `tests/setupStyles.test.ts`; the other setup files and proofs remain off-limits. The standing clause covers enumerations in owned files. The scaffold [deviation protocol](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md) requires: “Stop when a conflict prevents the primary objective or requires an unowned change.” No setupConformance file was edited, and the remaining gate commands were not run after this failure.

The scanner parses the built cascade with PostCSS, walks nested rules across every layer, splits selector lists, and compares members by exact normalized equality. Normalization preserves case, quotes, and vendor identity. It normalizes whitespace and combinators, folds the legacy `:before`, `:after`, `:first-line`, and `:first-letter` spellings, and drops an unqualified universal immediately preceding a pseudo-element. An `Excluded` name must first match a whole inventory selector or property, then remain absent throughout the cascade. Deferral rows require nonempty Name, Owner, and Reason cells. The pinned Reboot projection contains 117 selector entries and no custom-property obligations.

The canonicalization remains within brief 3's grant. Its permanent cases cover the legacy names, unchanged pseudo-classes and literal text, equivalent `*::before`/`::before`/`:before` spellings, preserved unrelated universals, and an unchanged, absent `legend + *`. The final absence case also proves that the prefixed upload name stays unchanged and absent while `::file-selector-button` is present.

The measured comparison records are:

| Cascade | Misses with the original comparison | Misses with canonicalization | Evidence |
| --- | ---: | ---: | --- |
| Entry cascade before the CL4 partials | 64 | 62 | Preserved `cl4-3-count-before.log` and `cl4-3-count-after.log` under ``. |
| Final rebuilt cascade | 12 | 10 | `node --experimental-strip-types cl4-final-count.mjs`, exit 0; `cl4-4-final-count.json`. |

Each comparison recovers only `*::before` and `*::after`. The final remaining misses are exactly the exclusion set; no further inventory selector proved unemittable.

The exclusion set is now ten rows, each with Owner `Excluded`:

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
| `::-moz-focus-inner` | The Gecko-only pseudo-element is unreachable on the managed Chromium and Edge receipts. |
| `::-webkit-file-upload-button` | The standard `::file-selector-button` ships the same control part, and the build targets make the prefixed alias redundant. |

The prefixed upload rule was removed from `_input.scss`. Its absence check passes with the rule gone from source, rather than relying on the minifier to discard dead source. The final inventory reading records every excluded name absent and the standard file-button selector present. The vendor selectors were not canonicalized together.

Every assigned partial loads from `src/styles/index.scss`; the layer order is unchanged. Attribute-only selectors remain in their button or input family. No guard change was needed. Calibrated bindings come from scaffold's `.orkestrel/veneer/research/calibration-content.md`; retained bindings come from the installed Bootstrap 5.3.8 `scss/_reboot.scss` file. The authored and proven values are:

| Partial | Selectors shipped | Binding and source |
| --- | --- | --- |
| `_b.scss` | `b` | Retained `bolder`, resolving to 700 against the proof's normal parent. |
| `_figure.scss` | `figure`, `figcaption` | Calibrated zero margin, flex column, 8px token gap; caption .875em, muted token color, and 1.4 line height. The caption resolves to 12.25px/17.15px. |
| `_img.scss` | `img` | Calibrated block display, 100% maximum inline size, automatic block size, and middle alignment. A local 240×160 image resolves to 120×80 inside its constraint. |
| `_svg.scss` | `svg` | Retained middle alignment. |
| `_table.scss` | `table`, `caption`, `thead`, `tbody`, `tfoot`, `colgroup` | Calibrated top caption, collapsed borders, 8px/12px token padding, .875em muted caption, and start alignment. Groups retain inherited border color, solid style, and zero width. |
| `_tr.scss` | `tr`, `td`, `th` | Retained group border reset; calibrated cells have 8px/12px token padding, a 1px solid token-colored end border, middle alignment, and inherited text alignment. Headings resolve to weight 600. |
| `_label.scss` | `label` | Retained inline-block display. |
| `_button.scss` | `button`, its existing hover/active/focus-visible/disabled states, `button:focus:not(:focus-visible)`, `[role=button]`, `[type=button]`, `[type=reset]`, `[type=submit]`, and the button/type `:not(:disabled)` selectors | U7's calibrated treatment preserved. Reboot adds zero margin, no text transform, button appearance, the nonvisible-focus outline reset, and pointer cursors. Enabled and disabled input-button cursors are read. |
| `_input.scss` | `input` and the native-control selectors listed next | Retained zero margin and inherited family, size, and line height. Resolved search appearance/offset and standard file-button typography/appearance are read. Internal native-control declarations are checked in the built cascade. |
| `_select.scss` | `select`, `select:disabled` | Retained zero margin, inherited typography, no text transform, normal wrapping, and disabled opacity 1. |
| `_optgroup.scss` | `optgroup` | Retained zero margin and inherited typography. No inventory obligation requires an `option` selector. |
| `_textarea.scss` | `textarea` | Retained zero margin, inherited typography, and vertical resizing. |
| `_fieldset.scss` | `fieldset`, `legend` | Retained zero minimum inline size, padding, margin, and border. Legend uses logical inline-start float/full inline size, zero padding, 8px token end margin, inherited line height, and the retained responsive size: 23.4px at 1000px and 24px at 1200px. The viewport is restored. |
| `_output.scss` | `output` | Retained inline-block display. |
| `_iframe.scss` | `iframe` | Retained zero border. |
| `_details.scss` | `summary` | Retained list-item display and pointer cursor. Summary belongs to the mandated details family. |
| `_progress.scss` | `progress` | Retained baseline alignment. |

The input-family selector set, excluding the removed alias, is:

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
::file-selector-button
```

Their retained declarations hide the datalist indicator with important display suppression, remove datetime/color-wrapper padding, retain automatic spin-button height, set textfield search appearance and a -2px outline offset, give search cancellation a pointer and grayscale filter, remove search-decoration appearance, and inherit the standard file-button font with button appearance. The internal pseudo-element proof measures emitted declarations; it does not claim resolved readings of every browser shadow part. Select and optgroup inheritance proofs disable native select appearance so Chromium exposes the authored line height.

The frozen Content table adds the Bold, Figure, Image, SVG, Table, Table row, Label, Button, Input, Select, Option group, Textarea, Fieldset, Output, Frame, Details, and Progress specimens. The existing renderer supports their markup without a class edit. The section proof grows its tag sequence and retains exact markup, order, freezing, and destruction assertions. The guide gains the files and departure rows, keeps Reboot `shipped`, and agrees with `listed = ['btn', 'reboot']`.

Real runs supplied these red/green pairs because the brief records the `prove` tool as blocked:

| Command and control | Red | Green |
| --- | --- | --- |
| `npm.cmd run test:setup -- tests/setupStyles.test.ts`; canonicalization cases from brief 3 | Exit 1; 3 failed, 73 passed | Exit 0; 76 passed. Preserved normalization logs from brief 3. |
| `npm.cmd run test:src:styles -- tests/src/styles/elements`; initial value proofs | Exit 1; 6 failed, 79 passed | Exit 0; 85 passed after adding calibrated figcaption line height and disabling native select appearance in the inheritance fixtures. |
| Same element command; wrong value in every CL4 partial | Exit 1; 17 files failed, 22 passed; 34 tests failed, 51 passed | Exit 0; 39 files and 85 tests passed after removing every plant. |
| `npm.cmd run test:conformance`; `b` removed from its partial, with a rebuild before each reading | Exit 1; 1 failed, 7 passed; `Shipped component reboot is missing selector b` | Exit 0; 8 passed after restoring `b` and rebuilding. |
| `npm.cmd run test:app:browser -- tests/app/browser/sections/ContentSection.test.ts` | Exit 1; 1 failed, 1 passed on the Details `open` serialization | Exit 0; 2 passed after authoring `open=""`. |
| `npm.cmd run test:journey` | Exit 1; 7 failed, 77 passed, 4 skipped | Exit 0; 84 passed, 4 skipped after reducing the Input row to the brief's single control per family. |

Value-plant logs are `cl4-4-values-red.log.txt` and `cl4-4-values-green.log`. Presence logs are `cl4-4-presence-red.log` and `cl4-4-presence-green.log`, with corresponding build logs. The initial styles readings are `cl4-4-styles-initial.log` and `cl4-4-styles-fixed.log`. Journey readings are `cl4-4-test-journey.log` and `cl4-4-journey-fixed.log`. The initial application pair is in the CLI transcript. The added input declaration case raises the final styles population beyond the earlier plant run.

Each value plant was removed by reversing only its exact replacement: b weight; figure gap; image/SVG alignment; table caption side; cell block padding; label/output display; button/input/select/optgroup margin; textarea resize; fieldset minimum size; frame border; summary display; progress alignment. The presence plant restored only the saved `_b.scss` bytes. No plant remains, and the final rebuilt styles and conformance gates pass.

The final ordered gate run is `cl4-gates-final.cmd`. Exit codes are retained in `cl4-4-final-gates.tsv`; each gate's complete log uses the same `cl4-4-final-` prefix and its colon-separated name converted to hyphens. These are its actual results:

| Gate | Exit | Final lines or result |
| --- | ---: | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.`; `Finished in 840ms on 172 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | `oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics. |
| `npm.cmd run check` | 0 | Ends with `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics. |
| `npm.cmd run build` | 0 | Final app CSS 58.48 kB, JavaScript 13.77 kB; `built in 470ms`. |
| `npm.cmd run test:src:styles` | 0 | `Test Files 46 passed (46)`; `Tests 197 passed (197)`; 24.03s. |
| `npm.cmd run test:conformance` | 0 | `Test Files 1 passed (1)`; `Tests 8 passed (8)`; 4.44s. |
| `npm.cmd run test:app:browser` | 0 | `Test Files 4 passed (4)`; `Tests 13 passed (13)`; 2.48s. |
| `npm.cmd run test:journey` | 0 | `Test Files 4 passed (4)`; `Tests 84 passed | 4 skipped (88)`; 22.13s. |
| `npm.cmd run test:guides` | 0 | `Test Files 1 passed (1)`; `Tests 18 passed (18)`; 624ms. |
| `npm.cmd run test:policy` | 0 | `Test Files 1 passed (1)`; `Tests 109 passed | 1 skipped (110)`; 2.36s. |
| `npm.cmd run test:setup` | 1 | `Test Files 1 failed | 2 passed (3)`; `Tests 4 failed | 125 passed (129)`; 6.67s. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | — | Not run after the stop. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | — | Not run after the stop. |

Browser gates in this chain use managed Chromium. Journey skips are the existing capture-only filename case under each variant; policy retains its existing conditional term-file skip. No CL4 proof is skipped. The style guards pass without edits. The setupStyles proofs pass within the failed setup project; the failures belong to setupConformance.

A separate ContentSection capture instrument instantiated the real transpiled class with built CSS on Chromium 153.0.8010.12 and Edge 153.0.4234.48 in light and dark; its DOM readings recorded 43 specimens per run. The saved frames were clipped to the viewport and do not show every family, so they are not complete visual acceptance evidence. The instrument correction was written but not rerun before the setup stop. No Edge resolved-value or gate claim rests on those captures.

The remaining work requires authorization to repair `tests/setupConformance.test.ts`, followed by the ordered gates, the Edge receipts, and complete capture verification. No further selector ruling is needed by the measured cascade. All changed tracked and untracked source files are owned by this unit. Reports, logs, and instruments remain under ignored ``.

The actual tracked diff is retained in `cl4-4-diff.patch`. `git diff --check` exits 0. Git reports that the global ignore file cannot be accessed; the following repository status still enumerates the changes. The actual `git diff --stat` output is:

```text
 app/browser/constants.ts                          |  72 +++++++++-
 guides/veneer.md                                  | 163 +++++++++++++---------
 src/styles/elements/_button.scss                  |  20 +++
 src/styles/index.scss                             |  16 +++
 tests/app/browser/sections/ContentSection.test.ts |  52 ++++++-
 tests/conformance.test.ts                         |   2 +-
 tests/setupStyles.test.ts                         |  41 ++++++
 tests/setupStyles.ts                              |  28 +++-
 tests/src/styles/elements/button.test.ts          |  27 +++-
 9 files changed, 350 insertions(+), 71 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M app/browser/constants.ts
 M guides/veneer.md
 M src/styles/elements/_button.scss
 M src/styles/index.scss
 M tests/app/browser/sections/ContentSection.test.ts
 M tests/conformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/elements/button.test.ts
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
?? tests/src/styles/elements/b.test.ts
?? tests/src/styles/elements/details.test.ts
?? tests/src/styles/elements/fieldset.test.ts
?? tests/src/styles/elements/figure.test.ts
?? tests/src/styles/elements/iframe.test.ts
?? tests/src/styles/elements/img.test.ts
?? tests/src/styles/elements/input.test.ts
?? tests/src/styles/elements/label.test.ts
?? tests/src/styles/elements/optgroup.test.ts
?? tests/src/styles/elements/output.test.ts
?? tests/src/styles/elements/progress.test.ts
?? tests/src/styles/elements/select.test.ts
?? tests/src/styles/elements/svg.test.ts
?? tests/src/styles/elements/table.test.ts
?? tests/src/styles/elements/textarea.test.ts
?? tests/src/styles/elements/tr.test.ts
```
