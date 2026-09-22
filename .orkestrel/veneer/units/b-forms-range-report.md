# Unit B-FORMS-RANGE — report

`opus` on Opus, worktree `/home/user/veneer-bfr`, baseline `3a9202a`.

`form-range` ships as a Bootstrap 5.3.8 baseline: the partial, the proof, the showcase section, the
capture scenarios, the compatibility row, and the departure rows. Two gates stay red, each needing a
one-line change in a file this unit may not write, and each carries an exact verified patch under
§ Deviations. One brief obligation is refused by the tree and is reported rather than forced: the
`focus` page frame on `Range` cannot be registered without rewriting two existing assertions in
`tests/setup.test.ts`.

## Touched files

| File | Change |
| --- | --- |
| `src/styles/components/_form-range.scss` | New. Every recorded selector of the key, emitted once per engine from one declaration of the thumb and track pair. |
| `tests/src/styles/components/form-range.test.ts` | New. The browser proof: resolved host readings, the keyboard-focus reading, the WebKit part declarations, the reduced-motion gate, and the mode and override readings. |
| `app/browser/sections/FormRangeSection.ts` | New. The `Form range` region over `FORM_RANGE_COPY` and `FORM_RANGE_SPECIMENS`. |
| `tests/app/browser/sections/FormRangeSection.test.ts` | New. The section proof: the rendered specimens, their names, their states, and the frozen tables. |
| `src/styles/index.scss` | Appended `@use 'components/form-range'` after `@use 'components/vr'`. |
| `app/browser/constants.ts` | Appended `FORM_RANGE_COPY` and `FORM_RANGE_SPECIMENS`. |
| `app/browser/Showcase.ts` | Appended the import and `new FormRangeSection(this.#main)` after `TableSection`. |
| `app/browser/index.ts` | Appended the section re-export. |
| `tests/setup.ts` | Appended `Range` and `Range disabled` to `CaptureSubject`, and the `range` and `range-disabled` keys to `CASCADE_KEYS`. |
| `tests/setupStyles.ts` | Appended `FORM_RANGE_CASES` and `FORM_RANGE_MARKUP`. |
| `tests/setupStyles.test.ts` | Appended the export names, the case-table inventory and compiled-cascade binding, and the markup row. |
| `tests/app/browser/Showcase.test.ts` | Appended the region name, the specimen concatenation, and the import. |
| `tests/app/browser/index.test.ts` | Appended the three export names. |
| `tests/app/browser/integration.test.ts` | Appended `FORM_RANGE_SPECIMENS` to the imports and the declared-subject set, and one journey case reading the slider under keyboard focus. |
| `tests/conformance.test.ts` | Appended `'form-range'` to `listed`, at its sorted position. |
| `guides/veneer.md` | Appended the § Files row, the `### Form range classes` section, and the § Compatibility selector row. |
| `guides/ledger/departures.md` | Appended the `#### \`form-range\`` table. |

## Diffstat

```text
 app/browser/Showcase.ts               |   2 +
 app/browser/constants.ts              |  29 ++++++
 app/browser/index.ts                  |   1 +
 guides/ledger/departures.md           |  33 +++++++
 guides/veneer.md                      | 174 ++++++++++++++++++++++------------
 src/styles/index.scss                 |   1 +
 tests/app/browser/Showcase.test.ts    |   3 +
 tests/app/browser/index.test.ts       |   3 +
 tests/app/browser/integration.test.ts |  37 ++++++++
 tests/conformance.test.ts             |   1 +
 tests/setup.ts                        |  14 +++
 tests/setupStyles.test.ts             |  66 +++++++++++++
 tests/setupStyles.ts                  | 104 ++++++++++++++++++++
 13 files changed, 406 insertions(+), 62 deletions(-)
```

Untracked: `app/browser/sections/FormRangeSection.ts`, `src/styles/components/_form-range.scss`,
`tests/app/browser/sections/FormRangeSection.test.ts`,
`tests/src/styles/components/form-range.test.ts`.

The 62 deletions in `guides/veneer.md` are the § Files table re-padded by `oxfmt`: the new row's
path is longer than the widest existing one, so the formatter rewrote every row's padding. No
existing sentence or cell text changed. Every other guide change is an insertion.

## Coverage matrix

Each row is one rule the inventory records under `form-range`. `Evidence` names the strongest
reading taken, and `Limit` names what the host withheld.

| Recorded rule | Condition | Proof case | Specimen | Scenario | Evidence | Limit |
| --- | --- | --- | --- | --- | --- | --- |
| `.form-range` | — | `strips the native slider chrome and sizes the host over the whole line`; `reads the host height from the space token, the density factor, and a direct override` | Range, Range disabled | `range`, `range-disabled` | Resolved on the host, against a bare `[type=range]` control | None |
| `.form-range:focus` | — | `clears the control outline under keyboard focus and leaves the ring to the thumb` | Range | — | Resolved after `traverseAccessible`, against the bare control's `auto` outline | The focus page frame is not registered; see § Deviations |
| `.form-range:focus::-webkit-slider-thumb` | — | same case | Range | — | Authored declaration through `findRule` | Chromium exposes no computed style for the part, so no ratio and no resolved shadow |
| `.form-range:focus::-moz-range-thumb` | — | `binds every range selector to the inventory, to its engine, and to the tokens it reads` | Range | — | Compiled cascade through `readCascadeBlocks` | Chromium discards the selector, so no browser reading reaches it |
| `.form-range::-moz-focus-outer` | — | same setup case | Range | — | Compiled cascade | Same |
| `.form-range::-webkit-slider-thumb` | — | `keeps the WebKit part rules in the cascade and reports the host style for a part pseudo` | Range | `range` | Authored declaration through `findRule`; the frame shows the painted thumb | No resolved reading for the part |
| `.form-range::-webkit-slider-thumb` | `@media (prefers-reduced-motion: reduce)` | `gates the thumb transition on the reduced-motion preference and reads it from the motion tokens` | Range | — | The gated rule through `collectLayer`, plus the staged preference read through the condition itself | No resolved duration for the part |
| `.form-range::-webkit-slider-thumb:active` | — | `keeps the WebKit part rules…` | Range | — | Authored declaration through `findRule` | A pointer hold on a slider part is not drivable through the installed exports, so no drive and no frame |
| `.form-range::-webkit-slider-runnable-track` | — | `keeps the WebKit part rules…`; `retunes the thumb fill and the track fill with the color mode and with a direct override` | Range | `range` | Authored declaration, the token readings on the host, and the frame | No resolved reading for the part |
| `.form-range::-moz-range-thumb` | — | `binds every range selector…` | Range | — | Compiled cascade | Selector discarded by Chromium |
| `.form-range::-moz-range-thumb` | `@media (prefers-reduced-motion: reduce)` | same | Range | — | The ledger carries the condition; the setup case reads the declaration | The setup case merges a selector's blocks, so the condition is the ledger's reading |
| `.form-range::-moz-range-thumb:active` | — | same | Range | — | Compiled cascade | Selector discarded by Chromium |
| `.form-range::-moz-range-track` | — | same | Range | — | Compiled cascade | Same |
| `.form-range:disabled` | — | `renders the resting and unavailable sliders through the shared section contract`; the `range-disabled` cascade key | Range disabled | `range-disabled` | Resolved `pointer-events` and `readStates` | None |
| `.form-range:disabled::-webkit-slider-thumb` | — | `keeps the WebKit part rules…` | Range disabled | `range-disabled` | Authored declaration, and the frame showing the grey thumb | No resolved reading for the part |
| `.form-range:disabled::-moz-range-thumb` | — | `binds every range selector…` | Range disabled | — | Compiled cascade | Selector discarded by Chromium |

## The mutation each proof case distinguishes

Each mutation below was applied to the partial, the styles build re-run, and
`tests/src/styles/components/form-range.test.ts` re-run alone. Every one reddened the suite; the
file was restored from a copy after each, and `diff` against that copy reports no difference now.

| Mutation | Command | Result |
| --- | --- | --- |
| Remove `appearance: none` from `.form-range` | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts` | `Tests  1 failed \| 5 passed (6)` |
| Write `height: 1.5rem` instead of `var(--vn-space-12)` | same | `Tests  2 failed \| 4 passed (6)` |
| Write the focus ring as the release literal `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | same | `Tests  2 failed \| 4 passed (6)` |
| Write the thumb transition directly instead of through the `transition` mixin | same | `Tests  2 failed \| 4 passed (6)` |
| Drop the Gecko row from `$engines`, so only the WebKit half ships | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | `Tests  2 failed \| 69 passed (71)`, one more than the file's standing failure |

Green baseline for the first four: `Tests  6 passed (6)`. Green baseline for the fifth:
`Tests  1 failed | 70 passed (71)`, the standing failure being the shared-block sweep under
§ Deviations.

The Gecko mutation is the one that matters for the evidence ladder: it is the reading that shows the
Gecko half is covered at all, because the browser proof's Gecko assertion (`findRule` returns
nothing) passes whether the rule ships or not, by construction. That assertion reports an engine
that starts keeping those selectors; it does not report a missing rule. The compiled-cascade case in
`tests/setupStyles.test.ts` is what reports a missing rule, and the conformance presence scan and
the ledger carry it as well.

## Token reuse and literal rulings, per value

| Recorded value | Written as | Ruling |
| --- | --- | --- |
| `.form-range` `height: 1.5rem` | `var(--vn-space-12)` | The density-scaled space step resolves to `1.5rem`, so the control rescales with `--vn-factor-density` as the thumb does. |
| thumb `width: 1rem`, `height: 1rem` | `var(--vn-space-8)` | Same scale, same factor. |
| thumb `margin-top: -0.25rem` | `calc(var(--vn-space-2) * -1)` | The negated space step, which is the form `_quote.scss` already uses for a negative margin. |
| track `height: 0.5rem` | `var(--vn-space-4)` | Same scale. |
| thumb and track `border-radius: 1rem` | `var(--vn-radius-xlarge)` | The radius step resolves to `1rem` and rescales with `--vn-factor-radius`. |
| thumb `background-color: #0d6efd` | `var(--vn-color-primary-base)` | The release compiles the active-component fill, which is its primary role colour. |
| held thumb `background-color: #b6d4fe` | `color-mix(in srgb, var(--vn-color-primary-base) 30%, var(--vn-palette-white-base))` | The release bakes `tint-color($primary, 70%)`, which is three tenths of the fill over white. `_table.scss` writes its contextual tints the same way. A literal colour is refused by the styles rule, and no token carries this value. |
| focus shadow outer layer `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 var(--vn-focus-width) var(--vn-focus-color)` | The binding `_button.scss` carries, per the design verdict's ruling 9. |
| focus shadow inner layer `0 0 0 1px #fff` | `0 0 0 1px var(--vn-surface-body-base)` | The colour is the release's own `$body-bg`, so it takes the canonical surface token. The `1px` stays a literal: the release writes a literal there rather than its border-width variable, so a token would invent a retune the release does not offer. |
| thumb `transition: … 0.15s ease-in-out` | `var(--vn-motion-feedback) var(--vn-ease-standard)` through the `transition` mixin | The `.btn` pattern; the mixin emits the reduced-motion twin the inventory records. |
| `.form-range` `background-color: transparent` | `transparent` | No canonical token carries it. `--vn-button-transparent` is the button key's own name, so reading it here would cross vocabularies. |
| `.form-range` `width: 100%`, `padding: 0`, thumb `border: 0`, track `width: 100%`, `color: transparent`, `cursor: pointer`, `border-color: transparent`, `.form-range:focus` `outline: 0`, `::-moz-focus-outer` `border: 0`, `.form-range:disabled` `pointer-events: none` | The release's own value | Structural values with no published scale behind them. |
| track `background-color: var(--bs-secondary-bg)` | byte for byte | The release references a `--bs-*` global this tree declares. |
| disabled thumb `background-color: var(--bs-secondary-color)` | byte for byte | Same. |

No value met the stop condition. No token was added.

## The reading path each pseudo took

Settled by running the engine, not by reading about it. The probe loaded
`dist/src/styles/index.css` into Chromium 141 and read `CSS.supports`, `getComputedStyle` with the
pseudo argument, and the CSSOM rule list.

| Pseudo | Resolved reading | Authored declaration in the CSSOM | Path taken |
| --- | --- | --- | --- |
| `::-webkit-slider-thumb` | Unavailable. `CSS.supports('selector(::-webkit-slider-thumb)')` returns true, so `readStyle` does not refuse the pseudo, and the value it returns is the host's own: the declared `1rem` width comes back as the control's line width. | Present | Authored declaration through `findRule`, corroborated by the capture frames |
| `::-webkit-slider-runnable-track` | Unavailable, the same way | Present | Same |
| `::-moz-range-thumb` | Unavailable. `CSS.supports` returns false and Chromium discards the rule at parse time. | Absent | Compiled cascade through `readCascadeBlocks`, in the Node setup proof |
| `::-moz-range-track` | Unavailable, the same way | Absent | Same |
| `::-moz-focus-outer` | Unavailable, the same way | Absent | Same |

No source reading is called a rendered proof anywhere in the tests or the guide. The rendered
evidence for the thumb and the track is the capture portfolio, and the frames show what they claim:
`range--light-1280.png` renders a pale track with a round blue thumb at mid-track, and
`range-disabled--dark-1280.png` renders a dark track with a grey thumb.

## Ledger rows

Written into `guides/ledger/departures.md` in this worktree, which is the launch-time location.
Under ruling D14 the Orchestrator moves them into `guides/veneer.md` under `## Tokens`.

### Departures — `#### \`form-range\``

| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |
| --- | --- | --- | --- | --- | --- | --- |
| `form-range` | `.form-range` | `height` | — | `1.5rem` | `var(--vn-space-12)` | tokenized |
| `form-range` | `.form-range` | `-webkit-appearance` | — | `none` | — | dropped |
| `form-range` | `.form-range` | `-moz-appearance` | — | `none` | — | dropped |
| `form-range` | `.form-range:focus::-webkit-slider-thumb` | `box-shadow` | — | `0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 1px var(--vn-surface-body-base), 0 0 0 var(--vn-focus-width) var(--vn-focus-color)` | tokenized |
| `form-range` | `.form-range:focus::-moz-range-thumb` | `box-shadow` | — | `0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 1px var(--vn-surface-body-base), 0 0 0 var(--vn-focus-width) var(--vn-focus-color)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-thumb` | `width` | — | `1rem` | `var(--vn-space-8)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-thumb` | `height` | — | `1rem` | `var(--vn-space-8)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-thumb` | `margin-top` | — | `-0.25rem` | `calc(var(--vn-space-2) * -1)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-thumb` | `-webkit-appearance` | — | `none` | — | dropped |
| `form-range` | `.form-range::-webkit-slider-thumb` | `background-color` | — | `#0d6efd` | `var(--vn-color-primary-base)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-thumb` | `border-radius` | — | `1rem` | `var(--vn-radius-xlarge)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-thumb` | `-webkit-transition` | — | `background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out` | — | dropped |
| `form-range` | `.form-range::-webkit-slider-thumb` | `transition` | — | `background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out` | `background-color var(--vn-motion-feedback) var(--vn-ease-standard), border-color var(--vn-motion-feedback) var(--vn-ease-standard), box-shadow var(--vn-motion-feedback) var(--vn-ease-standard)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-thumb` | `-webkit-transition` | `@media (prefers-reduced-motion: reduce)` | `none` | — | dropped |
| `form-range` | `.form-range::-webkit-slider-thumb:active` | `background-color` | — | `#b6d4fe` | `color-mix(in srgb, var(--vn-color-primary-base) 30%, var(--vn-palette-white-base))` | tokenized |
| `form-range` | `.form-range::-webkit-slider-runnable-track` | `height` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `form-range` | `.form-range::-webkit-slider-runnable-track` | `border-radius` | — | `1rem` | `var(--vn-radius-xlarge)` | tokenized |
| `form-range` | `.form-range::-moz-range-thumb` | `width` | — | `1rem` | `var(--vn-space-8)` | tokenized |
| `form-range` | `.form-range::-moz-range-thumb` | `height` | — | `1rem` | `var(--vn-space-8)` | tokenized |
| `form-range` | `.form-range::-moz-range-thumb` | `-moz-appearance` | — | `none` | — | dropped |
| `form-range` | `.form-range::-moz-range-thumb` | `background-color` | — | `#0d6efd` | `var(--vn-color-primary-base)` | tokenized |
| `form-range` | `.form-range::-moz-range-thumb` | `border-radius` | — | `1rem` | `var(--vn-radius-xlarge)` | tokenized |
| `form-range` | `.form-range::-moz-range-thumb` | `-moz-transition` | — | `background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out` | — | dropped |
| `form-range` | `.form-range::-moz-range-thumb` | `transition` | — | `background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out` | `background-color var(--vn-motion-feedback) var(--vn-ease-standard), border-color var(--vn-motion-feedback) var(--vn-ease-standard), box-shadow var(--vn-motion-feedback) var(--vn-ease-standard)` | tokenized |
| `form-range` | `.form-range::-moz-range-thumb` | `-moz-transition` | `@media (prefers-reduced-motion: reduce)` | `none` | — | dropped |
| `form-range` | `.form-range::-moz-range-thumb:active` | `background-color` | — | `#b6d4fe` | `color-mix(in srgb, var(--vn-color-primary-base) 30%, var(--vn-palette-white-base))` | tokenized |
| `form-range` | `.form-range::-moz-range-track` | `height` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `form-range` | `.form-range::-moz-range-track` | `border-radius` | — | `1rem` | `var(--vn-radius-xlarge)` | tokenized |

### Additions

None. The comparison measured no emitted name the official inventory lacks for this key.

### Deferral rows struck

None. The § Deferred selectors table carries no row naming a `form-range` selector or property; the
search `grep -c "range" guides/veneer.md` over the table's own line range returned `0` before the
change.

## Compatibility row

One selector row, added after the `vr` row:

```text
| form-range    | selector       | The `.form-range` family ships in the components layer, the focus, active, and disabled thumb and track rules included; resolved geometry, paint, and motion are proved in `tests/src/styles/components/form-range.test.ts`.        | —                     | shipped  |
```

No variable row. The inventory records no custom property for this key
(`inventory.components['form-range'].properties` is `{}`), and `collectShippedComponents` admits a
key with no variable row exactly when that map is empty. Family ruling 7 states the same condition;
the brief's obligation 4 reads "its selector and variable rows", and the terrain and the tree win.

## Scenarios, frames, and artifacts

Registered at the end of `CASCADE_KEYS`:

| Scenario | Subject | Selector | Property | Frame |
| --- | --- | --- | --- | --- |
| `range` | Range | `.form-range` | `height` | Element frame over the lifted specimen |
| `range-disabled` | Range disabled | `.form-range:disabled` | `pointer-events` | Element frame over the lifted specimen |

`CAPTURE=1 npm run test:journey` wrote these files under `tmp/capture/states/`:

```text
range--dark-1280.png            range--dark-1280-accessibility.txt
range--dark-390.png             range--dark-390-accessibility.txt
range--light-1280.png           range--light-1280-accessibility.txt
range--light-390.png            range--light-390-accessibility.txt
range-disabled--dark-1280.png   range-disabled--dark-1280-accessibility.txt
range-disabled--dark-390.png    range-disabled--dark-390-accessibility.txt
range-disabled--light-1280.png  range-disabled--light-1280-accessibility.txt
range-disabled--light-390.png   range-disabled--light-390-accessibility.txt
```

The `range-focus` page frame is not registered. See § Deviations.

## Guide

`### Form range classes` sits after `### Helper classes` and before `### Deferred selectors`, which
is the partial's position in the barrel. It states what the key ships, why the family is written
once per engine, the recorded departures, the values that record none, and the two evidence limits
this host imposes. The § Files row for `src/styles/components/_form-range.scss` follows the `_vr.scss`
row. No `guides/ledger/` path appears in any prose this unit wrote.

## Commands and exit codes

Run from `/home/user/veneer-bfr` with npm 11.19.1 on `PATH` and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | no diagnostics |
| `npm run build:src` | 0 | `dist/src/styles/index.css  91.43 kB` |
| `npm run test:setup` | non-zero | `Tests  2 failed \| 160 passed (162)`; both failures are under § Deviations |
| `npm run test:src:styles` | 0 | `Test Files  59 passed (59)` / `Tests  422 passed (422)` |
| `npm run test:app` | 0 | `Test Files  11 passed (11)` / `Tests  28 passed (28)` |
| `npm run test:conformance` | 0 | `Tests  17 passed (17)` |
| `npm run test:guides` | 0 | `Tests  18 passed (18)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run test:journey` | 0 at 21:11 | `Test Files  4 passed (4)` / `Tests  104 passed (104)` |
| `CAPTURE=1 npm run test:journey` | 0 at 21:12 | `Test Files  4 passed (4)` / `Tests  104 passed (104)`, frames listed earlier |

### Built cascade

```text
$ node -e 'const css=require("fs").readFileSync("dist/src/styles/index.css","utf8"); …'
recorded selectors: 14 missing from built cascade: []
bare range rule present: false
```

Every selector the inventory records under `form-range` is present in the built stylesheet, the
Gecko pseudo-element rules included, and no rule keyed to the bare `[type=range]` attribute ships.

### Timing observations, not verdicts

The container carries six sibling units. `uptime` reported a load average of 28 to 42 on 4 cores
throughout. Three gates failed on time under that load and passed when re-run:

- `npm run test:policy` timed out at 21:24 and 21:26 in
  `enforces the workspace policy laws including surface ownership` (5000 ms cap), then passed three
  times in a row at 21:27 and later.
- `tests/setupServer.test.ts` timed out at 21:03 in the Bootstrap oracle recorder (10100 ms cap) and
  passed at 21:47.
- `npm run test:journey` passed `104 passed (104)` at 21:11 and 21:12 at lower load, then reported
  8 and then 21 timeouts at 21:47 and 21:54 as the load average rose from 33 to 42. Every one is a
  15000 ms cap on a keyboard-traversal or browser-launch case, and most name cases this unit did not
  touch — `toggles a native host and an anchor host through the keyboard`,
  `paints a focus ring on every variant reached through the keyboard`, and
  `matches the official recording step for step on the same markup`.

Per the orchestration rule on re-running a timing failure alone, the deciding journey run belongs to
the Orchestrator after this unit exits. This unit's own readings are the 21:11 and 21:12 runs.

## Deviations

### D1. `tests/setupServer.test.ts` enumerates the shipped keys and is off-limits

Expected: `npm run test:setup` exits 0.
Found: `tests/setupServer.test.ts > server setup > skips engine and CSS obligations whose Proof cell
is a dash` compares `readCompatibility()`'s component set against a written `Set` literal that names
every shipped key. Adding the `form-range` compatibility row puts `form-range` in the measured set
and not in the literal.

```text
AssertionError: expected Set{ 'g', 'gx', 'gy', 'row-gap', …(29) } to deeply equal Set{ 'blockquote', 'btn', 'col', …(29) }
+   "form-range",
```

That file is off-limits to every unit under family ruling 13, and the brief's scope does not grant
it. The unit did not write it; `git status --porcelain` does not list it.

Patch, inside the `Set([…])` argument in that case:

```diff
 				'figure',
+				'form-range',
 				'g',
```

Every B-FORMS and B-PASSIVE unit that ships a key hits this same literal, so it is worth granting in
each remaining brief rather than patching seven times.

### D2. The style-block sweep refuses the host rule, and the fix needs `_mixins.scss`

Expected: `npm run test:setup` exits 0.
Found: `tests/setupStyles.test.ts > styles setup > carries no shared written declaration block across
style partials` reports one intersection:

```text
left:  components/_form-range.scss line 15 — width: 100%, height: var(--vn-space-12), padding: 0, appearance: none, background-color: transparent
right: elements/_fieldset.scss   line 9  — float: left, width: 100%, padding: 0, margin-bottom: …, line-height: inherit, font-size: …
shared: width: 100%, padding: 0
```

Bootstrap declares both `width: 100%` and `padding: 0` on `.form-range`, and the `legend` rule
already declares the same pair, so the sweep sees a block shared across two partials. The sweep's
prescribed fix is the one `.claude/rules/styles.md` states: move the pattern into `_mixins.scss`.
That file and `src/styles/elements/_fieldset.scss` are both off-limits to this unit. No form of the
declarations inside the owned partial clears the sweep without changing what the cascade emits, and
splitting the rule to dodge the sweep would be suppressing a gate rather than answering it.

The patch below was applied to a scratch copy of `src/styles` and measured there. After it,
`scanStyleBlocks(root).shared` returns `[]`, and `sass` emits byte-identical declarations for both
`legend` and `.form-range`.

`src/styles/_mixins.scss`, before `@mixin border-reset`:

```scss
// Fills the line and carries no padding of its own. The pair is what a block-level control and a
// full-width caption both reset, and `scanStyleBlocks` refuses two partials whose rules write it
// out twice.
@mixin flush-box {
	width: 100%;
	padding: 0;
}
```

`src/styles/elements/_fieldset.scss`:

```diff
 	legend {
 		float: left;
-		width: 100%;
-		padding: 0;
+		@include flush-box;
 		margin-bottom: var(--vn-space-4);
```

`src/styles/components/_form-range.scss`:

```diff
 	.form-range {
-		width: 100%;
+		@include flush-box;
 		height: var(--vn-space-12);
-		padding: 0;
 		appearance: none;
 		background-color: transparent;
 	}
```

The compiled output after the patch, from `npx sass --load-path=<root> <root>/index.scss`:

```css
  legend {
    float: left;
    width: 100%;
    padding: 0;
    margin-bottom: var(--vn-space-4);
    line-height: inherit;
    font-size: calc(var(--vn-size-6) * 0.85 + 0.3vw);
  }
```

```css
  .form-range {
    width: 100%;
    padding: 0;
    height: var(--vn-space-12);
    appearance: none;
    background-color: transparent;
  }
```

The ledger is unaffected: the same properties carry the same values, and the comparison reads by
property rather than by order. The three range parts of the patch must land together, because the
mixin has to exist before either caller includes it.

### D3. The `focus` page frame on `Range` cannot be registered without rewriting `tests/setup.test.ts`

Expected: obligation 3's third scenario — `focus` on `Range` as a page frame driven by keyboard
traversal.
Found: the registry refuses it on three counts, each of which is an existing assertion or type in a
shared file this unit may only append to.

- `CASCADE_KEYS` is `readonly CascadeKey[]`, and every entry needs a `selector` and a `property`,
  neither of which a page frame has. `BUTTON_KEYS` holds the one existing focus page frame
  (`primary-focus`) and is `readonly CaptureKey[]` for that reason.
- `tests/setup.test.ts` asserts
  `expect(new Set(CASCADE_KEYS.map((key) => key.subject)).size).toBe(CASCADE_KEYS.length)`, so one
  subject answers for one entry there. A `range-focus` entry and the `range` entry both name
  `Range`, and the second one reddens that assertion.
- The journey's existing case `renders the container, the row, the table, and the link the cascade
  ships, in both modes` iterates all of `CASCADE_KEYS` and calls `FRAMES.place` on every entry. A
  `range-focus` entry there would be photographed at rest under a name claiming a driven state, and
  a second placement by a focus journey is refused outright: `FrameManager.place` documents
  "a scenario already placed" as a refusal.

The clean shape is a separate `readonly CaptureKey[]` list beside `CASCADE_KEYS`, concatenated into
`CAPTURE_KEYS`. That needs one existing line in `tests/setup.test.ts` rewritten:

```diff
-		expect(CAPTURE_KEYS).toStrictEqual([...SHOWCASE_KEYS, ...BUTTON_KEYS, ...CASCADE_KEYS])
+		expect(CAPTURE_KEYS).toStrictEqual([
+			...SHOWCASE_KEYS,
+			...BUTTON_KEYS,
+			...CASCADE_KEYS,
+			...FORM_RANGE_KEYS,
+		])
```

and, in `tests/setup.ts`:

```diff
 export const CAPTURE_KEYS: readonly CaptureKey[] = Object.freeze([
 	...SHOWCASE_KEYS,
 	...BUTTON_KEYS,
 	...CASCADE_KEYS,
+	...FORM_RANGE_KEYS,
 ])
```

with `FORM_RANGE_KEYS` holding `{ scenario: 'range-focus', subject: 'Range' }`, and a journey case
placing it with `FRAMES.page` after `traverseAccessible`.

Family ruling 13 refuses a rewrite of an existing line and tells a unit that needs one to stop and
report, so this unit did not apply it. What it shipped instead: the two rest scenarios as element
frames, and a journey case `reaches the range slider through the keyboard and leaves its ring to the
thumb` that drives the traversal, reads the cleared outline, records that `readRing` reports nothing
because the ring is worn by the thumb, and pushes the reading into the run's artifact. That case
places no frame.

This constraint is not this unit's alone. Every B-PASSIVE and B-FORMS unit the design verdict gives
a driven-state scenario — `btn-close` hover and focus, pagination focus, list-group actions,
`btn-group`, and `form-check` `indeterminate` — meets the same three refusals.

### D4. Settled inside the owned scope, recorded here

- **The partial loads `../mixins` alone.** The brief says the partial opens after `@use '../tokens'`.
  It reads no member of the tokens module, and `_icon-link.scss` is the shipped partial with the
  same need, which loads `'../mixins' as *` and nothing else. An unused `@use` would be a dead load.
- **The thumb and track family is emitted from one `@each` over a partial-local list.** The styles
  rule refuses a repeated per-variant block and tells a partial to drive shared structure from one
  list. The list carries each engine's two pseudo-element names and whether that engine's thumb takes
  the track-centring offset, which is the only asymmetry between the halves. Rule order inside each
  engine is the release's, so the disabled thumb still follows the focused and held thumbs at equal
  specificity.
- **The specimen markup names each control with `aria-label`.** That is how the Content region's bare
  controls are named, and it avoids a document-unique `id` in markup the showcase and two proofs each
  mount. The names differ between the pair so keyboard traversal resolves one of them.
- **The `FORM_RANGE_CASES` table is keyed by selector and carries the engine and the custom
  properties the rule reads**, rather than the full declaration text. Declaration values are already
  pinned by the departure rows against Bootstrap's own; what no other gate carried was which token
  each site reads, and whether a site with no token writes no `var()` at all.

## `ROADMAP.md` patch

None. `ROADMAP.md` names the B-FORMS family and its keys and states that no per-key status belongs
in the file: "State no status a run recomputes in this file. Read which keys ship from the
conformance run, never from this queue." The conformance run now reports `form-range` as shipped, so
the queue is already correct.

## Prose this unit could not keep current

Two existing lines in `tests/setup.ts` and `tests/app/browser/integration.test.ts` enumerate the
cascade keys in prose and are now incomplete. Both are existing lines in shared files, so this unit
did not rewrite them. They need a carrier before the family lands:

- The `CASCADE_KEYS` doc block opens "The rows are the keys the consumer page reads out of the packed
  stylesheet — the capped container, the numbered-column row, the base table, and the role link".
- The journey case is titled `renders the container, the row, the table, and the link the cascade
  ships, in both modes`.

Every sibling unit adding a cascade key makes both staler. One unit at the family's close should own
both, and B-FORMS-CLOSE is the natural carrier.

## Claims this unit flags as unverified

- **The Gecko rules render correctly in Gecko.** Nothing here ran Firefox. What is proven is that the
  rules ship with the declarations the release records, measured against the pinned inventory. The
  rendered claim is open, and no test or guide sentence states it.
- **The focus ring's contrast ratio.** `FOCUS_RING` is not compared for this key. The ring is worn by
  a pseudo-element Chromium exposes no computed style for, and `readRing` reads the first colour in a
  `box-shadow`, which for this two-layer shadow is the hairline rather than the ring. What is proven
  is that the declaration binds `--vn-focus-width` and `--vn-focus-color`, the same pair `.btn`
  binds. A forced-colors reading is likewise absent, for the reason § Compatibility already records
  against the button.
- **The held thumb.** `::-webkit-slider-thumb:active` has a declaration reading and no drive and no
  frame. A pointer hold on a slider part is not reachable through the installed browser exports, and
  a hold on the control itself moves the value rather than entering the part's `:active`.
- **The journey's green reading is from 21:11 and 21:12.** Later runs under heavier load timed out on
  cases this unit did not touch. The deciding run is the Orchestrator's.
