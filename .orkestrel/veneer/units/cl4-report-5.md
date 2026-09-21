<!-- CL4 completion report (brief 6 over briefs 5 to 1), sol on Astra (gpt-6-astra, workspace-write), journal tmp/codex/cl4-5.jsonl (swept at acceptance), thread 01a0c46f-d6bd-72a2-942f-3fb0f0548a0a, exit 0, retained 2026-09-21. The unit is complete: the gate chain is green on managed Chromium and both Edge runs. -->

CL4 is complete under brief 6. The ordered gate chain exits 0 through the managed Chromium runs and both Edge runs. Reboot remains `shipped`, `listed` remains `['btn', 'reboot']`, and every excluded selector is absent from the rebuilt cascade.

Execution followed `cl4-brief-6.md` over briefs 5, 4, 3, 2, and `cl4-brief.md`, as the sol role on Astra, directly in `C:/Users/mikes/WebstormProjects/veneer` on 2026-09-21. HEAD remains `d822d59`. The existing CL4 work and earlier briefs and reports were preserved. No agents were spawned, no restore or reset ran, and nothing was committed. This report is `cl4-report-5.md`.

The brief 6 edit scopes the ledger-derived category cases to Button before their loops. Their subjects and withholding assertions remain intact:

| Case | Applied change and proof |
| --- | --- |
| Selects shipped CSS keys independently of behavior rows and excludes the shared engine | Filters `readCompatibility()` to `row.component === 'btn'` before mapping statuses. Baseline and accepted-method expectations are `['btn']`. Removing either CSS category or accepting its rows still must return `[]`; the engine exclusion remains asserted. |
| Withholds a component carrying an accepted row beside a shipped one in the same category | Applies the same Button filter. Each category must contain rows, and appending accepted copies still must withhold Button with `[]`. |
| Partitions shipped vocabulary against written CSS | Retains brief 5's Button filter to match the synthetic Button inventory. No Reboot entry was added. Missing selector/property, present-deferred name, unknown name, and missing-inventory messages remain asserted. |
| Skips engine and CSS obligations whose Proof cell is a dash | Retains the component set `{btn, reboot, engine}` and the unchanged full loop. Every selected row has undefined `proof`, and `scanOracleObligation` returns undefined. |

The sweep covered every `readCompatibility` call in `tests/setupConformance.test.ts`, including calls with explicit scratch-file paths. No further case needed scoping: named-row and named-step lookups retain their subjects; oracle-binding checks require a matching row; written-guide cases control their own population; the property-free Reboot case already uses an isolated guide. The dash-proof population case deliberately covers the ledger's selected rows and retains that coverage. No assertion was weakened and no production conformance code changed.

The same scoped command, `npm.cmd run test:setup -- tests/setupConformance.test.ts`, ran before and after the edit. Red: exit 1, `Test Files 1 failed (1)`, `Tests 2 failed | 36 passed (38)`, duration 6.51s. Green: exit 0, `Test Files 1 passed (1)`, `Tests 38 passed (38)`, duration 6.50s. The failures were exactly the category cases expecting `[]` but receiving `['reboot']`. Logs are `cl4-6-setup-red.log.txt` and `cl4-6-setup-green.log.txt`; the launcher is `cl4-6-setup.cmd`.

The following implementation and mutation evidence continues the preserved CL4 record. This continuation changes only the granted setup cases in tracked source. Stylesheets, specimens, canonicalization, exclusions, and mirrored partial proofs remain as carried in the working tree. Historical plants were not repeated; the complete rebuilt suites passed on Chromium and Edge.


The scanner parses the built cascade with PostCSS, walks nested rules across every layer, splits selector lists, and compares members by exact normalized equality. Normalization preserves case, quotes, and vendor identity. It normalizes whitespace and combinators, folds the legacy `:before`, `:after`, `:first-line`, and `:first-letter` spellings, and drops an unqualified universal immediately preceding a pseudo-element. An `Excluded` name must first match a whole inventory selector or property, then remain absent throughout the cascade. Deferral rows require nonempty Name, Owner, and Reason cells. The pinned Reboot projection contains 117 selector entries and no custom-property obligations.

The canonicalization remains within brief 3's grant. Its permanent cases cover the legacy names, unchanged pseudo-classes and literal text, equivalent `*::before`/`::before`/`:before` spellings, preserved unrelated universals, and an unchanged, absent `legend + *`. The final absence case also proves that the prefixed upload name stays unchanged and absent while `::file-selector-button` is present.

The measured comparison records are:

| Cascade | Misses with the original comparison | Misses with canonicalization | Evidence |
| --- | ---: | ---: | --- |
| Entry cascade before the CL4 partials | 64 | 62 | Preserved `cl4-3-count-before.log` and `cl4-3-count-after.log` under ``. |
| Final rebuilt cascade | 12 | 10 | `node --experimental-strip-types cl4-6-final-count.mjs`, exit 0; `cl4-6-final-count.json`. |

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

The ordered chain ran from `cl4-6-gates.cmd` and exited 0. Its exit record is `cl4-6-gates.tsv`; complete logs are `cl4-6-<gate>.log`, using the labels in that record. Every exit code and final nonempty line follows, with test totals included:

| Gate | Exit | Final lines or result |
| --- | ---: | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.`; `Finished in 833ms on 172 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm.cmd run build` | 0 | `✓ built in 474ms` |
| `npm.cmd run test:src:styles` | 0 | `Test Files  46 passed (46)`; `Tests  197 passed (197)`; `Duration  24.23s (transform 0ms, setup 1.87s, import 597ms, tests 17.82s, environment 0ms)` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  8 passed (8)`; `Duration  4.06s (transform 104ms, setup 44ms, import 713ms, tests 3.14s, environment 0ms)` |
| `npm.cmd run test:app:browser` | 0 | `Test Files  4 passed (4)`; `Tests  13 passed (13)`; `Duration  2.47s (transform 0ms, setup 213ms, import 87ms, tests 930ms, environment 0ms)` |
| `npm.cmd run test:journey` | 0 | `Test Files  4 passed (4)`; `Tests  84 passed \| 4 skipped (88)`; `Duration  21.95s (transform 0ms, setup 2.25s, import 771ms, tests 74.28s, environment 0ms)` |
| `npm.cmd run test:guides` | 0 | `Test Files  1 passed (1)`; `Tests  18 passed (18)`; `Duration  611ms (transform 84ms, setup 43ms, import 410ms, tests 6ms, environment 0ms)` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)`; `Duration  2.21s (transform 108ms, setup 51ms, import 268ms, tests 1.71s, environment 0ms)` |
| `npm.cmd run test:setup` | 0 | `Test Files  3 passed (3)`; `Tests  129 passed (129)`; `Duration  6.85s (transform 289ms, setup 135ms, import 1.70s, tests 6.13s, environment 0ms)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | 0 | `Test Files  46 passed (46)`; `Tests  197 passed (197)`; `Duration  32.27s (transform 0ms, setup 1.96s, import 661ms, tests 19.15s, environment 0ms)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | 0 | `Test Files  4 passed (4)`; `Tests  13 passed (13)`; `Duration  8.72s (transform 0ms, setup 212ms, import 88ms, tests 865ms, environment 0ms)` |

Browser gates use managed Chromium on Windows unless the command names Edge. Journey retains its capture-only case skip under each variant; policy retains its conditional term-file skip. No CL4 proof is skipped. The elements-layer and physical-axis guards pass without edits. The full setup run passes all 129 tests, including the unchanged dash-proof loop with Reboot.

The corrected capture command, `node cl4-6-capture.mjs`, exits 0. It instantiates the real transpiled `ContentSection` with the rebuilt standalone CSS and records 43 specimens on Chromium 153.0.8010.12 and Edge 153.0.4234.48 in light and dark mode. The full-page clip covers Bold through Progress; all resulting frames were opened and visually checked. The frames are `cl4-6-content-chromium-light.png`, `cl4-6-content-chromium-dark.png`, `cl4-6-content-msedge-light.png`, and `cl4-6-content-msedge-dark.png`. Their metadata and accessibility trees are in `cl4-6-captures.json`. These replace the clipped frames as CL4 rendering evidence; they do not claim the later campaign portfolio verdict.

The original pre-partial conformance reading remains recorded in `cl4-conformance-initial.log.txt`: exit 1, 1 failed and 7 passed. The final presence mutation pair and the passing conformance gate establish closure after the authored partials and granted selector rulings.

No plant was introduced during brief 6. Every historical plant remains removed. The full tracked diff is retained in `cl4-6-diff.patch`; `git diff --check` exits 0. Only owned source and test paths appear in status. Reports, instruments, captures, and logs are under ignored ``. Git emits a permission warning for its global ignore file but still returns the repository status with exit 0. The stat reports tracked changes; the untracked partials and proofs appear in the status listing.

The actual `git diff --stat` output is:

```text
 app/browser/constants.ts                          |  72 +++++++++-
 guides/veneer.md                                  | 163 +++++++++++++---------
 src/styles/elements/_button.scss                  |  20 +++
 src/styles/index.scss                             |  16 +++
 tests/app/browser/sections/ContentSection.test.ts |  52 ++++++-
 tests/conformance.test.ts                         |   2 +-
 tests/setupConformance.test.ts                    |  14 +-
 tests/setupStyles.test.ts                         |  41 ++++++
 tests/setupStyles.ts                              |  28 +++-
 tests/src/styles/elements/button.test.ts          |  27 +++-
 10 files changed, 360 insertions(+), 75 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M app/browser/constants.ts
 M guides/veneer.md
 M src/styles/elements/_button.scss
 M src/styles/index.scss
 M tests/app/browser/sections/ContentSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
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
