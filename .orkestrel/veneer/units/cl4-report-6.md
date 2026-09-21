<!-- CL4 fix-round report (brief 7 over briefs 6 to 1), sol on Astra (gpt-6-astra, workspace-write), journal tmp/codex/cl4-6.jsonl (swept at acceptance), thread 01a0c488-2fdf-7330-aa3a-faa22f12f39d, retained 2026-09-21. The unit is complete: the folder-wide sweep found three shared blocks beyond the two the brief named. -->

CL4 is complete under brief 7. The ordered gate chain exits 0 through managed Chromium and the Edge styles and application runs. The breakpoint and mixin changes preserve the emitted CSS byte for byte. The pointer-focus rule has a permanent value proof that fails on a planted wrong outline. The guide records the colgroup and header-alignment departures.

This report follows `cl4-brief-7.md` over briefs 6 through 2 and `cl4-brief.md`, in `C:/Users/mikes/WebstormProjects/veneer`, on 2026-09-21. HEAD remains `d822d59`. Execution continued from the existing CL4 working tree as the sol role on Astra. No agent was spawned, no restore or reset ran, and nothing was committed. Earlier briefs, reports, and evidence remain intact.

The fixes land at these sites:

| Finding | Change and site |
| --- | --- |
| Hardcoded boundary | `src/styles/elements/_fieldset.scss:1` loads the mixins; line 17 uses `breakpoint-up(xl)`. The existing breakpoint map remains the sole literal width source. No media condition under `src/styles/` hardcodes a breakpoint width. |
| Repeated declarations | `src/styles/_mixins.scss:3` through line 31 contains the declaration emitters listed next. Consumers keep their selectors and distinct declarations. The folder sweep also changes CL3's `_hr.scss`, under brief 7's grant. |
| Non-visible focus | `tests/src/styles/elements/button.test.ts:30` adds light and dark pointer-focus cases. The shipped `button:focus:not(:focus-visible)` rule remains `outline: 0`. |
| Silent departures | `guides/veneer.md:685` and line 686 record the colgroup border reset and the omitted WebKit header-alignment fallback beside the existing cell row. The implementation is preserved. |

Each added mixin emits the following declarations and has these consumers:

| Mixin | Members, in emission order | Consumers |
| --- | --- | --- |
| `control-text` | `margin: 0`; `font-family: inherit`; `font-size: inherit`; `line-height: inherit` | `input`, `select`, `optgroup`, `textarea` in their matching partials |
| `border-reset` | `border-color: inherit`; `border-style: solid`; `border-width: 0` | The group rule in `_table.scss` and the row/cell rule in `_tr.scss` |
| `box-reset` | `margin: 0`; caller content; `border: 0` | `button`, `fieldset`, `hr` |
| `caption-text` | `font-size: 0.875em`; caller content; `color: var(--vn-text-muted)` | `figcaption` in `_figure.scss`; `caption` in `_table.scss` |
| `cell-space` | `padding-block: var(--vn-space-4)`; `padding-inline: var(--vn-space-6)` | `caption` in `_table.scss`; `td, th` in `_tr.scss` |

The content slots preserve the original declaration order. Button keeps its intervening typography and paint declarations; `hr` keeps its inherited color; figcaption keeps its 1.4 line height. The mixins emit no top-level CSS. No expectation was edited for these extractions.

The legend readings come from `node cl4-7-legend.mjs before`, then `after`, with `npm.cmd run build:src:styles` before each reading. Each command exits 0. Chromium 153.0.8010.12 and Edge 153.0.4234.48 return the same readings in light and dark mode:

| Actual viewport width | Before | After |
| ---: | --- | --- |
| 1000px | 23.4px | 23.4px |
| 1199px | 23.997px | 23.997px |
| 1200px | 24px | 24px |
| 1201px | 24px | 24px |

The instrument asserts the actual viewport, independently expected size, and equality to the saved baseline. The records are `cl4-7-legend-before.json`, `cl4-7-legend-after.json`, and `cl4-7-legend-final.json`. Its in-memory control appends a zero-size legend rule: `node cl4-7-legend.mjs control --control` exits 1 with `'0px' !== '23.4px'`. Running `node cl4-7-legend.mjs final` without that control exits 0. The control changes no source or built file.

The folder sweep covers every partial under `src/styles/elements/`. Its measured population is 39 files, named here:

```text
_a.scss, _abbr.scss, _address.scss, _b.scss, _blockquote.scss,
_body.scss, _button.scss, _code.scss, _details.scss, _dl.scss,
_fieldset.scss, _figure.scss, _heading.scss, _hr.scss, _html.scss,
_iframe.scss, _img.scss, _input.scss, _kbd.scss, _label.scss,
_mark.scss, _ol.scss, _optgroup.scss, _output.scss, _p.scss,
_pre.scss, _progress.scss, _samp.scss, _select.scss, _small.scss,
_strong.scss, _sub.scss, _sup.scss, _svg.scss, _table.scss,
_textarea.scss, _tr.scss, _ul.scss, _var.scss
```

The instrument is `cl4-7-sweep.mjs`. It compiles each partial with Sass source maps, parses the CSS with PostCSS, and uses `source-map-js` to distinguish declarations authored in that partial from declarations already centralized in mixins. It compares every unordered pair of distinct files and every rule pair within those files. It reports two or more identical property/value/importance declarations even when distinct declarations separate them. This is stronger than a contiguous-text comparison.

The pair population is all 741 unordered pairs of the named files. Every pair is enumerated in `cl4-7-sweep-red.json` and `cl4-7-sweep-green.json`. The extracted patterns have these pair memberships:

| Pattern | File pairs, with `.scss` omitted |
| --- | --- |
| Control reset, named by the brief | `_input`/`_select`, `_input`/`_optgroup`, `_input`/`_textarea`, `_select`/`_optgroup`, `_select`/`_textarea`, `_optgroup`/`_textarea` |
| Border reset, named by the brief | `_table`/`_tr` |
| Margin and border reset, found by the sweep | `_button`/`_fieldset`, `_button`/`_hr`, `_fieldset`/`_hr` |
| Caption size and color, found by the sweep | `_figure`/`_table` |
| Cell padding, found by the sweep | `_table`/`_tr` |

After extracting the named control and border resets, `npm.cmd run test:src:styles` exits 0: 46 files and 197 tests pass. The subsequent sweep with `--check` exits 1 on the remaining five rule-pair findings. After their extraction, the same sweep with `--check` exits 0 with `hits: []`. The stage argument only names the output record: `node cl4-7-sweep.mjs red --check` and `node cl4-7-sweep.mjs green --check`. No shared block remains in the measured population.

The unchanged-cascade proof covers the complete built `index.css` and `index.rtl.css`, not only the extracted declarations. `node cl4-7-cascade.mjs` exits 0 after the named extractions and again after the folder sweep. Each file equals its pre-edit baseline at 58,145 bytes, SHA-256 `d38ea82a3962dd5b4c3f9be8def6afce04109cc87d17c1dc6ead7853efb96e72`. An altered-byte control is rejected. The baseline files and the comparison log are `cl4-7-before.css`, `cl4-7-before.rtl.css`, and `cl4-7-cascade.log`. No extraction changes a resolved reading; the final styles suites retain every earlier expectation.

The focus case establishes keyboard focus first, confirms `:focus-visible`, blurs, and uses the installed `clickAccessible` helper for trusted pointer activation. It then asserts that the button is the active element, matches `:focus:not(:focus-visible)`, and has outline style `none` and width `0`. The direct reading in `cl4-7-focus.json` confirms `focus: true`, `visible: false`, `matches: true`, `style: 'none'`, and `width: '0px'` on Chromium and Edge in light and dark mode. The rule is reachable and proven on these receipts.

The red proof ran before the green proof. Planting `outline: 5px solid currentColor` in that exact rule and rebuilding makes only the pointer-focus cases fail: each browser reports 2 failed and 4 passed, exit 1, with `solid` received where `none` was expected. Restoring the exact `outline: 0` declaration and rebuilding gives 6 passed, exit 0, on each browser. The command on each side is `npm.cmd run test:src:styles -- tests/src/styles/elements/button.test.ts`; the Edge launcher sets `PLAYWRIGHT_CHANNEL=msedge`. Logs and exit records use the `cl4-7-focus-red-*` and `cl4-7-focus-green-*` prefixes. The wrong outline is removed.

The departure choice preserves the implementation and corrects the record. Colgroup receives inherited border color, solid style, and zero width, whereas Bootstrap 5.3.8 omits it from the Reboot border-reset group. Header cells retain `text-align: inherit` without Bootstrap's subsequent `text-align: -webkit-match-parent`. These are documented departures, not retained Bootstrap behavior. The existing calibrated cell row remains alongside them.

The preceding CL4 implementation remains in place. The presence scanner parses the built cascade with PostCSS, walks rules across every layer and nesting level, splits selector lists, and compares normalized members by exact equality. Normalization preserves case, quoting, and vendor identity; it normalizes whitespace and combinators, folds the legacy `:before`, `:after`, `:first-line`, and `:first-letter` spellings, and removes an unqualified universal immediately before a pseudo-element. An Excluded name must match a whole official inventory name and remain absent throughout the cascade.

The pinned Reboot inventory projects to 117 selector entries and an empty custom-property list. The preserved pre-partial comparison misses 64 selectors before canonicalization and 62 after it; the completed cascade misses 12 before and 10 after. Each comparison recovers only `*::before` and `*::after`. Evidence remains in `cl4-3-count-before.log.txt`, `cl4-3-count-after.log`, and `cl4-6-final-count.json`. The byte-identical completed cascade and the passing conformance gate preserve that result.

The canonicalization proofs still cover legacy spellings, unchanged pseudo-classes and literal text, equivalent universal spellings, preserved unrelated universals, and the genuinely absent `legend + *`. The prefixed upload selector remains unchanged by normalization and absent, while `::file-selector-button` is present. No further normalization or exclusion was added in this round.

Every exclusion remains a guide row with Owner `Excluded`, with these reasons:

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
| `::-moz-focus-inner` | The Gecko-only pseudo-element is unreachable on the managed receipts. |
| `::-webkit-file-upload-button` | The standard file-button selector ships the same control part; build targets make the prefixed alias redundant. |

The exclusion set remains ten rows. The prefixed upload rule is absent from `_input.scss`, so the absence check does not rely on retaining source that the minifier drops. The Gecko exclusion also leaves Gecko's inner-focus repair unshipped; this round makes no Gecko rendering claim.

Every assigned partial loads from `src/styles/index.scss` with unchanged layer order. The values and sources remain as follows; calibrated values come from scaffold's `.orkestrel/veneer/research/calibration-content.md`, and retained values come from the installed Bootstrap 5.3.8 `scss/_reboot.scss`:

| Partial | Shipped selectors | Values and source |
| --- | --- | --- |
| `_b.scss` | `b` | Retained `bolder`, resolving to 700 against the proof's normal parent. |
| `_figure.scss` | `figure`, `figcaption` | Calibrated zero margin, flex column, 8px gap; .875em muted caption with 1.4 line height, resolving to 12.25px/17.15px. |
| `_img.scss` | `img` | Calibrated block display, 100% maximum inline size, automatic block size, middle alignment; the 240×160 fixture resolves to 120×80. |
| `_svg.scss` | `svg` | Retained middle alignment. |
| `_table.scss` | `table`, `caption`, `thead`, `tbody`, `tfoot`, `colgroup` | Calibrated top caption, collapsed borders, 8px/12px caption padding, .875em muted caption, start alignment. Retained group border reset, extended to colgroup as a recorded departure. |
| `_tr.scss` | `tr`, `td`, `th` | Retained border reset; calibrated 8px/12px cell padding, 1px solid token-colored end border, middle alignment, heading weight 600. Inherited alignment with the omitted WebKit fallback recorded. |
| `_label.scss` | `label` | Retained inline-block display. |
| `_button.scss` | `button`, its hover/active/focus-visible/disabled states, `button:focus:not(:focus-visible)`, `[role=button]`, the button/reset/submit type selectors and enabled-state selectors | U7's calibrated treatment; retained zero margin, no transform, button appearance, pointer cursors, and non-visible-focus outline reset. |
| `_input.scss` | `input` and the native-control selectors listed next | Retained zero margin and inherited family, size, and line height; search offset/appearance, file-button typography/appearance, and emitted internal-control declarations. |
| `_select.scss` | `select`, `select:disabled` | Retained control reset, no transform, normal wrapping, disabled opacity 1. |
| `_optgroup.scss` | `optgroup` | Retained control reset; no inventory obligation requires an `option` selector. |
| `_textarea.scss` | `textarea` | Retained control reset and vertical resizing. |
| `_fieldset.scss` | `fieldset`, `legend` | Retained zero minimum size, padding, margin, border; logical legend float/full inline size, zero padding, 8px end margin, inherited line height, responsive size proven across the xl boundary. |
| `_output.scss` | `output` | Retained inline-block display. |
| `_iframe.scss` | `iframe` | Retained zero border. |
| `_details.scss` | `summary` | Retained list-item display and pointer cursor, in the mandated details family. |
| `_progress.scss` | `progress` | Retained baseline alignment. |

The input-family selectors beyond `input` are:

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

Their retained declarations hide the datalist indicator with important display suppression, remove datetime/color-wrapper padding, retain automatic spin-button height, set search textfield appearance and a -2px outline offset, set search cancellation's pointer and grayscale filter, remove search-decoration appearance, and inherit the standard file-button font with button appearance. Attribute-only and vendor selectors stay in their owning input or button partial. No guard edit was needed. Internal shadow-part declarations are proven in the emitted cascade; the report does not claim resolved readings for every such part. Select and optgroup inheritance fixtures disable native appearance to expose the authored line height.

The Content specimen table retains Bold, Figure, Image, SVG, Table, Table row, Label, Button, Input, Select, Option group, Textarea, Fieldset, Output, Frame, Details, and Progress. The existing renderer supports their markup. The section proof preserves its independent tag-sequence assertion and its table/markup checks; the latter are not independent content-value controls. Earlier corrected captures remain at `cl4-6-content-{chromium,msedge}-{light,dark}.png`, with metadata and accessibility trees in `cl4-6-captures.json`. Those captures show the real ContentSection with the same compiled CSS this round preserves.

The setup-conformance population fixes also remain intact. The category-withholding cases and the synthetic-inventory partition case filter real ledger rows to Button. They still prove withholding and the same missing/deferred/unknown-name messages. The dash-proof case retains `{btn, reboot, engine}` and its full loop. The earlier sweep of every `readCompatibility()` call found no other population-dependent case requiring scoping; this round adds no setup-file edit. Reboot remains `shipped`, and `listed` remains `['btn', 'reboot']`.

The preserved red/green evidence from preceding briefs remains part of this assignment's record. These pairs were not repeated as plants in this round:

| Command and subject | Red | Green |
| --- | --- | --- |
| `npm.cmd run test:setup -- tests/setupStyles.test.ts`; canonicalization | Exit 1; 3 failed, 73 passed | Exit 0; 76 passed |
| `npm.cmd run test:src:styles -- tests/src/styles/elements`; wrong values across CL4 partials | Exit 1; 17 files failed, 22 passed; 34 tests failed, 51 passed | Exit 0; 39 files and 85 tests passed |
| `npm.cmd run test:conformance`; shipped `b` selector removed, rebuilt | Exit 1; 1 failed, 7 passed; `Shipped component reboot is missing selector b` | Exit 0; 8 passed after restoration and rebuild |
| `npm.cmd run test:app:browser -- tests/app/browser/sections/ContentSection.test.ts`; Details markup | Exit 1; 1 failed, 1 passed | Exit 0; 2 passed after `open=""` serialization |
| `npm.cmd run test:journey`; Input specimen | Exit 1; 7 failed, 77 passed, 4 skipped | Exit 0; 84 passed, 4 skipped after retaining one control for the family |
| `npm.cmd run test:setup -- tests/setupConformance.test.ts`; population-independent withholding | Exit 1; 2 failed, 36 passed | Exit 0; 38 passed |

The value and presence mutation logs use the `cl4-4-values-{red,green}.log` and `cl4-4-presence-{red,green}.log` paths. Setup population logs are `cl4-6-setup-{red,green}.log`. The initial pre-partial conformance run remains `cl4-conformance-initial.log`, exit 1 with 1 failed and 7 passed. Earlier canonicalization, application, and journey evidence remains recorded in `cl4-report-5.md` and its named logs.

Every plant is removed. This round restores the exact pointer-outline declaration. The legend control and altered-byte comparison control exist only in instrument memory. Earlier value plants were reversed at their exact sites: b weight; figure gap; image/SVG alignment; table caption side; cell block padding; label/output display; button/input/select/optgroup margin; textarea resize; fieldset minimum size; frame border; summary display; and progress alignment. The presence plant restored the saved `_b.scss` bytes. The byte-identical final cascade and green value/presence suites confirm that these plants are not in the shipped CSS.

The ordered gate chain ran from `cl4-7-gates.cmd` and exited 0. Per-gate exits are in `cl4-7-gates.tsv`; full logs use `cl4-7-<gate>.log`. Browser runs use managed Chromium unless the command names Edge. The actual exit codes and final lines follow:

| Gate | Exit | Final lines |
| --- | ---: | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.`; `Finished in 833ms on 172 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm.cmd run build` | 0 | `✓ built in 458ms` |
| `npm.cmd run test:src:styles` | 0 | `Test Files  46 passed (46)`; `Tests  199 passed (199)`; `Duration  24.17s (transform 0ms, setup 1.81s, import 606ms, tests 18.00s, environment 0ms)` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  8 passed (8)`; `Duration  4.04s (transform 97ms, setup 44ms, import 700ms, tests 3.14s, environment 0ms)` |
| `npm.cmd run test:app:browser` | 0 | `Test Files  4 passed (4)`; `Tests  13 passed (13)`; `Duration  2.47s (transform 0ms, setup 219ms, import 86ms, tests 891ms, environment 0ms)` |
| `npm.cmd run test:journey` | 0 | `Test Files  4 passed (4)`; `Tests  84 passed \| 4 skipped (88)`; `Duration  21.95s (transform 0ms, setup 2.50s, import 525ms, tests 74.38s, environment 0ms)` |
| `npm.cmd run test:guides` | 0 | `Test Files  1 passed (1)`; `Tests  18 passed (18)`; `Duration  608ms (transform 86ms, setup 45ms, import 402ms, tests 6ms, environment 0ms)` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)`; `Duration  2.18s (transform 99ms, setup 43ms, import 261ms, tests 1.72s, environment 0ms)` |
| `npm.cmd run test:setup` | 0 | `Test Files  3 passed (3)`; `Tests  129 passed (129)`; `Duration  6.78s (transform 258ms, setup 149ms, import 1.60s, tests 6.08s, environment 0ms)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | 0 | `Test Files  46 passed (46)`; `Tests  199 passed (199)`; `Duration  32.80s (transform 0ms, setup 2.04s, import 648ms, tests 19.46s, environment 0ms)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | 0 | `Test Files  4 passed (4)`; `Tests  13 passed (13)`; `Duration  8.69s (transform 0ms, setup 203ms, import 86ms, tests 882ms, environment 0ms)` |

Journey retains its capture-only conditional skips, and policy retains its conditional term-file skip. No CL4 proof is skipped. The elements-layer and physical-axis guards pass unchanged. The styles runs include the added pointer-focus cases, and the setup run includes the unchanged dash-proof loop with Reboot.

The tracked diff is retained in `cl4-7-diff.patch`. `git diff --check` exits 0. Status contains only paths owned by the effective briefs. Reports, logs, instruments, and captures stay under ignored ``. Git emits a permission warning for its global ignore file but returns status with exit 0. The stat covers tracked changes; the added partials and proofs remain untracked and appear in the status output.

The actual `git diff --stat` output is:

```text
 app/browser/constants.ts                          |  72 +++++++++-
 guides/veneer.md                                  | 165 +++++++++++++---------
 src/styles/_mixins.scss                           |  30 ++++
 src/styles/elements/_button.scss                  |  38 +++--
 src/styles/elements/_hr.scss                      |   8 +-
 src/styles/index.scss                             |  16 +++
 tests/app/browser/sections/ContentSection.test.ts |  52 ++++++-
 tests/conformance.test.ts                         |   2 +-
 tests/setupConformance.test.ts                    |  14 +-
 tests/setupStyles.test.ts                         |  41 ++++++
 tests/setupStyles.ts                              |  28 +++-
 tests/src/styles/elements/button.test.ts          |  45 +++++-
 12 files changed, 424 insertions(+), 87 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M app/browser/constants.ts
 M guides/veneer.md
 M src/styles/_mixins.scss
 M src/styles/elements/_button.scss
 M src/styles/elements/_hr.scss
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
