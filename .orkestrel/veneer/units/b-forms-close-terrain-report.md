# B-FORMS-CLOSE terrain — Cursor Grok distillate

Route `grok` on Cursor Grok (`Grok 4.7 256K High`), `--mode=ask`, read-only, rooted at `/home/user/veneer` at `53628aa`; session `209e0ace-d80f-463d-a1a3-0bfb1dfd1605`, journal `tmp/cursor/b-forms-close-terrain.jsonl` (swept at acceptance), exit 0 on 2026-09-23 (launched 07:44 UTC). Brief: `b-forms-close-terrain-brief.md`. The text is the lane's result verbatim.

I'll start by reading the brief and the repository's agent contracts so I follow the required process.The tip is `53628aa` and the tree is clean. Next I’ll locate every `B-FORMS-CLOSE` carrier and read what each site says.## Question

Where every `B-FORMS-CLOSE` carrier in `ROADMAP.md` lives at `53628aa`, and what each site says today.

## Evidence

### Validation tooltip specimens

`ROADMAP.md:377` assigns `B-FORMS-CLOSE` the resting element frames `Input group valid tooltip` and `Input group invalid tooltip`, over a wrapper that keeps the tooltip's overflow room, plus their scenarios.

The cascade already ships the tooltip rules. `src/styles/components/_validation.scss:21-33` sets `.valid-tooltip` and `.invalid-tooltip` to `position: absolute; top: 100%; z-index: 5; display: none`, with padding, type, color, background, and radius from tokens. `src/styles/components/_validation.scss:35-39` reveals each as `display: block` beside a sibling `.is-valid` or `.is-invalid`, and beside `.was-validated`. `src/styles/components/_input-group.scss:103-114` excludes `.valid-tooltip`, `.valid-feedback`, `.invalid-tooltip`, and `.invalid-feedback` from the overlap pull-back, and the comment says a tooltip is `position: absolute; top: 100%` and takes no part in the wrap.

The showcase renders none. `app/browser/constants.ts:638-642` says no validation row renders a tooltip, because `top: 100%` with no positioned ancestor resolves against the initial containing block. `VALIDATION_SPECIMENS` (`app/browser/constants.ts:644-749`) names `Valid control`, `Invalid control`, `Valid select`, `Invalid select`, `Valid check`, `Invalid check`, `Valid feedback`, `Invalid feedback`, and `Validated form`. The feedback rows include a `*-feedback` element (`app/browser/constants.ts:733-737`). No row includes a `*-tooltip` element. `app/browser/constants.ts:1518-1519` says no input-group specimen renders a validation tooltip, because it hangs below the group and would cover the specimen after it. `INPUT_GROUP_SPECIMENS` (`app/browser/constants.ts:1521-1551`) ends with `Input group validation`, whose markup is `.input-group.has-validation` plus `.invalid-feedback` (`app/browser/constants.ts:1546-1550`). `tests/app/browser/sections/InputGroupSection.test.ts:64` asserts `region.querySelector('.valid-tooltip, .invalid-tooltip')` is null.

`CaptureSubject` (`tests/setup.ts:95-100`, `tests/setup.ts:101-104`, `tests/setup.ts:186-187`) names the current input-group and validation subjects and does not name `Input group valid tooltip` or `Input group invalid tooltip`. `CASCADE_KEYS` (`tests/setup.ts:416-468`) registers `valid-control`, `invalid-control`, `valid-select`, `invalid-select`, `valid-check`, `invalid-check`, `valid-feedback`, `invalid-feedback`, and `validated-form`. `tests/setup.ts:866-898` registers `input-group-plain`, `input-group-addons`, `input-group-button`, `input-group-large`, `input-group-small`, and `input-group-validation` (selector `.has-validation > .invalid-feedback`, property `display`). `VALIDATION_KEYS` (`tests/setup.ts:1047-1049`) is `valid-control-focus` and `invalid-control-focus`. `INPUT_GROUP_KEYS` (`tests/setup.ts:1196-1198`) is `input-group-button-focus`.

The portfolio case that photographs those resting keys is `tests/app/browser/integration.test.ts:608`, which loops `CASCADE_KEYS`. The validation focus case (`tests/app/browser/integration.test.ts:674-691`) calls `FRAMES.page`. The input-group focus case (`tests/app/browser/integration.test.ts:1410-1447`) calls `FRAMES.page('input-group-button-focus', specimen)`.

A search for `overflow` in `app/browser/constants.ts` returns no match. A search for `FRAMES.element` returns no call. Element frames go through `FrameManager.place` (`tests/setupBrowser.ts:533-550`): the subject is the declared region, and the third argument is the element the frame covers, defaulting to the subject. `readRegion` (`tests/setupBrowser.ts:176-185`) records the subject's box inside that frame. The resting cascade case (`tests/app/browser/integration.test.ts:632-647`) builds a `div`, prepends a clone of the specimen, and calls `FRAMES.place(key.scenario, copy, frame)`, where `copy` is the selector's element and `frame` is the lifted specimen. That wrapper sets no overflow.

Guide sentences that mention tooltips: `guides/veneer.md:780-781` (feedback and tooltip elements each state reveals); `guides/veneer.md:798-800` (feedback gap and tooltip padding read `--vn-space-2` and `--vn-space-4`; tooltip type reads `--vn-size-2`); `guides/veneer.md:809` (the tooltip's placement is among the browser readings); `guides/veneer.md:1299-1302` (feedback and tooltip keys close with the input-group partial); `guides/veneer.md:1306-1309` (feedback and tooltip stay in place; a tooltip is absolutely positioned below the group); `guides/veneer.md:1334-1336` (those keys carry the validation partial's departures); `guides/veneer.md:1347-1348` (the proof reads feedback and tooltip left in place, tooltip below the group).

### `INPUT_GROUP_ROUNDING`

`tests/setupStyles.ts:4388-4398` declares it. The doc block says the text control and select classes carry no radius of their own, so the fixture supplies `border-radius: 7px` from `@layer elements` on `.form-control, .form-select`. The value is `'@layer elements { .form-control, .form-select { border-radius: 7px } }'`.

The shipped rules write a radius. `src/styles/_mixins.scss:59-61` (`control-border`) writes `border` and `border-radius: var(--bs-border-radius)`. `.form-control` includes it at `src/styles/components/_form-control.scss:34`. `.form-select` includes it at `src/styles/components/_form-select.scss:42`.

Consumers are the `scene.load(INPUT_GROUP_ROUNDING)` calls in `tests/src/styles/components/input-group.test.ts:171`, `:204`, and `:246`. No other file loads it. The import is `tests/src/styles/components/input-group.test.ts:20`. The corner case at `:247-249` says the select ships its radius from its own rule while the control reads the fixture until the control family lands. The floating case at `:269-270` says the wrapper itself carries no border. `.form-floating` (`src/styles/components/_form-floating.scss:18-20`) writes `position: relative` only. The label at `:33-47` writes a transparent `border`.

Inventory: the export-name list in `tests/setupStyles.test.ts:254` includes `'INPUT_GROUP_ROUNDING'`, inside the exports case at `:185`. The freeze case at `tests/setupStyles.test.ts:2585-2588` expects the string to start with `@layer elements {` and to contain `.form-control, .form-select`. A search of `tests/setup*.test.ts` names it only in `tests/setupStyles.test.ts`.

Guide, `### Input group classes`: `guides/veneer.md:1351-1354` says the text control and select classes carry no radius of their own, so the proof supplies one from a consumer rule beneath the components layer, and that the floating wrapper is a plain box. The consumer-radius sentence the other carrier names is that same paragraph. The focus-case comment at `tests/app/browser/integration.test.ts:1421-1425` says the button pulls its leading border back over the control's trailing border, so the button's leading border paints over the outer column of that border until the control is lifted past it.

### Cascade-key prose

The `CASCADE_KEYS` doc block (`tests/setup.ts:343-347`) names the rows as the capped container, the numbered-column row, the base table, and the role link. The same four names return at `tests/setup.ts:359-361`.

The journey's rest case title (`tests/app/browser/integration.test.ts:608`) is `renders the container, the row, the table, and the link the cascade ships, in both modes`. The body loops every `CASCADE_KEYS` row (`tests/app/browser/integration.test.ts:617`).

The frozen array's `scenario` values (`tests/setup.ts:390-1028`) continue past those four: `valid-control`, `invalid-control`, `valid-select`, `invalid-select`, `valid-check`, `invalid-check`, `valid-feedback`, `invalid-feedback`, `validated-form`, `page-strip`, `active-page`, `disabled-page`, `small-pagination`, `large-pagination`, `horizontal-group`, `vertical-group`, `nested-groups`, `small-group`, `large-group`, `wrapping-toolbar`, `progress-base`, `striped-progress`, `animated-progress`, `stacked-progress`, `border-spinner`, `small-border-spinner`, `placeholder-ramp`, `glowing-placeholder`, `waving-placeholder`, `button-placeholder`, `range`, `range-disabled`, `card-base`, `card-rule`, `card-images`, `card-overlay`, `card-list`, `card-list-corners`, `card-tabs`, `card-pills`, `card-group`, `list-group-base`, `list-group-active`, `list-group-disabled`, `list-group-actions`, `list-group-numbered`, `list-group-flush`, `list-group-horizontal`, `list-group-horizontal-sm`, `list-group-horizontal-md`, `list-group-horizontal-lg`, `list-group-horizontal-xl`, `list-group-horizontal-xxl`, `list-group-roles`, `breadcrumb-trail`, `badge-counter`, `close-control`, `close-inverted`, `close-refused-by-attribute`, `close-refused-by-class`, `badge-word`, `badge-at-heading-scale`, `badge-collapsed`, `badge-on-a-button`, `breadcrumb-single-step`, `form-check-box`, `form-check-checked`, `form-check-radios`, `form-check-disabled`, `form-check-reverse`, `form-check-inline`, `form-check-switch`, `form-check-switch-checked`, `form-check-switch-disabled`, `form-check-switch-reverse`, `input-group-plain`, `input-group-addons`, `input-group-button`, `input-group-large`, `input-group-small`, `input-group-validation`, `form-floating-empty`, `form-floating-filled`, `form-floating-textarea`, `form-floating-select`, `form-floating-disabled`, `form-floating-plaintext`, `form-select-base`, `form-select-small`, `form-select-large`, `form-select-multiple`, `form-select-sized`, `form-select-disabled`, `form-control-text`, `form-control-small`, `form-control-large`, `form-control-textarea`, `form-control-file`, `form-control-date`, `form-control-color`, `form-control-plaintext`, `form-control-disabled`, `form-control-readonly`.

### Validated color-control width

`src/styles/components/_validation.scss:89-92` writes `width: calc(3rem + calc(1.5em + 0.75rem))` on `.was-validated .form-control-color:#{$state}` and `.form-control-color.is-#{$state}`.

`src/styles/components/_form-control.scss:170-173` says the resting width is the release's `3rem`, routed through the space token, and `.form-control-color` sets `width: var(--vn-space-24)`.

`tests/src/styles/components/validation.test.ts:87-89` and `:331-333` each say the release widens the swatch by `calc(3rem + 1.5em + 0.75rem)`, which resolves to 81px against the 14px body type, and each expects `readPixels(swatch, 'width')` to be `81`.

`tests/setupStyles.ts` exports no `VALIDATION_CASES`. The validation table there is `FORM_ICON_CASES` (`tests/setupStyles.ts:3046-3058`): `state`, `role`, and `image`, with no width. The resting color row is a `FORM_CONTROL_CASES` entry (`tests/setupStyles.ts:5300-5319`): selector `.form-control-color`, `values.width` `'48px'`, `reads.width` `['--vn-space-24']`.

Guide ledger. `guides/veneer.md:3136-3140`: under `#### is-invalid`, `.form-control-color.is-invalid` `width` is Bootstrap `calc(3rem + calc(1.5em + 0.75rem))`, Veneer `calc(3rem + 1.5em + 0.75rem)`, departure `declared`. `guides/veneer.md:3143-3147`: the `#### is-valid` row for `.form-control-color.is-valid` `width` is the same pair and the same `declared` departure. The same Veneer cell is on `.was-validated .form-control-color:valid` (`guides/veneer.md:3156`) and `.was-validated .form-control-color:invalid` (`guides/veneer.md:3160`). The resting row (`guides/veneer.md:3401`) is `.form-control-color` `width`: Bootstrap `3rem`, Veneer `var(--vn-space-24)`, departure `tokenized`. Prose at `guides/veneer.md:803-805` says the color control's width is one sum and that Sass flattens the nested calc. Prose at `guides/veneer.md:1206-1208` says the validated color control's width is the validation partial's own `3rem` literal plus the icon room, so a density retune widens the resting control and leaves the validated one.

### `FORM_RANGE_CASES`

`tests/setupStyles.ts:3590-3608` documents the table. `engine` is `undefined`, `'gecko'`, or `'webkit'`. The `reads` remark (`tests/setupStyles.ts:3606-3608`) says: "`reads` names the custom properties the selector's declarations carry. An empty list is the claim that the rule writes no `var()` at all." The table (`tests/setupStyles.ts:3610-3686`) is a frozen array of `{ selector, engine, reads }`. `reads` is a frozen string list. There is no `FormRangeCase` interface.

The Node case is `tests/setupStyles.test.ts:1794` (`binds every range selector to the inventory, to its engine, and to the tokens it reads`). It joins every declaration of a selector into one string (`tests/setupStyles.test.ts:1826-1829`) and compares with:

```text
expect([...entry.reads].filter((name) => !declarations.includes(`var(${name})`))).toEqual([])
```

at `tests/setupStyles.test.ts:1840`. An empty `reads` whose joined text still contains `var(` is pushed and expected empty (`tests/setupStyles.test.ts:1841-1844`).

`InputGroupCase` (`tests/setupStyles.ts:4188-4196`) is `{ selector: string; reads: Readonly<Record<string, readonly string[]>> }`. `FormControlCase` (`tests/setupStyles.ts:4809-4828`) adds `condition`, `evidence`, `subject`, `pseudo`, `state`, and `values`, and uses the same `reads` record. The input-group Node comparison (`tests/setupStyles.test.ts:2556-2559`) and the text-control comparison (`tests/setupStyles.test.ts:1926-1929`) both expect `Object.fromEntries` of properties whose `var()` list is non-empty to equal `entry.reads`.

### Literal-declaration reading

`collectLedger` (`tests/setupServer.ts:2308-2317`) returns `departures` from `collectValueGaps` and `additions` from `collectAdditions`. `collectValueGaps` (`tests/setupServer.ts:2005-2039`) walks each inventory rule's recorded declarations and emits a departure when the emitted value differs. `collectAdditions` (`tests/setupServer.ts:2102-2161`), once the selector is recorded at the same condition, takes every emitted property absent from that recorded set and pushes category `declaration`, with name `` `${block.selector} { ${property} }` ``. A custom property the vocabulary lacks uses category `property` (`tests/setupServer.ts:2153-2156`). `describeAddition` (`tests/setupServer.ts:2240-2241`) joins component, name, condition, and category. `scanLedgerDrift` (`tests/setupServer.ts:2256-2266`) returns `unrecorded` (measured lines the guide lacks) and `stale` (guide lines the measurement lacks). `readAdditions` (`tests/setupServer.ts:1160-1200`) reads the guide's Additions tables.

`tests/conformance.test.ts:181-204` builds that ledger and expects `additions.unrecorded` and `additions.stale` to be empty, in `records every emitted name the official inventory lacks` and `names no addition the compiled cascade no longer emits`. The priority case (`tests/conformance.test.ts:226-256`) iterates the release sheet and compares `important` only for a pair the cascade also declares.

An added property on a shipped `.form-control` rule is an addition. `.form-control` is a shipped selector (`guides/veneer.md:3744`) and a recorded rule (`FORM_CONTROL_CASES` at `tests/setupStyles.ts:4862`, ledger rows from `guides/veneer.md:3368`). The planted proof of that branch (`tests/setupServer.test.ts:1926-1932`) emits `.caption-top { caption-side: top; color: teal }` where the inventory records `caption-side`, and `describeAddition` returns `table | .caption-top { color } | — | declaration`.

The Node binding case keeps properties that read a `var()` (`tests/setupStyles.test.ts:1915-1929`). The browser proof reads `Object.keys(entry.values)` (`tests/src/styles/components/form-control.test.ts:63-69`).

### Forced colours (D37)

`focus-ring` (`src/styles/_mixins.scss:186-199`) writes `outline: none` and `box-shadow: $shadow`, then `@include forced-colors` writes `outline: $width solid $highlight` and `box-shadow: $reset`. `forced-colors` (`src/styles/_mixins.scss:180-184`) is `@media (forced-colors: active)`.

Includes of `focus-ring`: `src/styles/components/_button.scss:104` and `:196`, and `src/styles/elements/_button.scss:47`. `_button.scss:213` also includes `forced-colors` directly on `.btn`. No forms partial includes `focus-ring`.

`:focus` rules that write `outline: 0` with a `box-shadow` ring:

- `.form-control:focus` (`src/styles/components/_form-control.scss:55-61`): `outline: 0` and `box-shadow: 0 0 0 var(--vn-focus-width) var(--vn-focus-color)`.
- `.form-control-plaintext:focus` (`src/styles/components/_form-control.scss:128-130`): `outline: 0` alone.
- `.form-select:focus` (`src/styles/components/_form-select.scss:54-58`): `outline: 0` and the same focus `box-shadow`.
- `.form-range:focus` (`src/styles/components/_form-range.scss:23-25`): `outline: 0` alone. The ring is `.form-range:focus` plus the thumb pseudo (`src/styles/components/_form-range.scss:41-45`): a `1px` hairline and `0 0 0 var(--vn-focus-width) var(--vn-focus-color)`.
- `.form-check-input:focus` (`src/styles/components/_form-check.scss:75-79`): `outline: 0` and the same focus `box-shadow`.

A search for `forced-colors` under `tests/src/styles/components/` returns no match. Every `stageMedia` call in that tree passes `{ motion: false }` only, including `form-control.test.ts`, `form-select.test.ts`, `form-range.test.ts`, `form-check.test.ts`, and `validation.test.ts`. The proof that stages forced colours is `tests/src/styles/mixins.test.ts:67-92`: it finds a `(forced-colors: active)` media rule, then calls `sendProtocol('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] })`. Its comment at `:81-83` says `MediaOptions` carries a print axis and a motion axis and no forced-colors axis. The installed contract (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1692-1699`) declares `MediaOptions` with `print?`, `motion?`, and `forced?`. `stageMedia` (`index.d.ts:2772-2787`) maps `forced: true` to active forced colours. `guides/veneer.md:3633-3635` says Button's forced-colors browser reading remains open because the installed `MediaOptions` contract stages print and motion only.

D37 (`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md:380-387`): `.form-select:focus` and `.form-range` write `outline: 0` with a `box-shadow` ring, so under forced colours the shadow does not paint and the control shows no focus indicator, while `.btn` takes the `focus-ring` mixin's system-colour outline. Whether the forms controls take that mixin's forced-colours outline is ruled once for the family. Carrier: `B-FORMS-CLOSE`.

### `reads` remarks

`FORM_RANGE_CASES` (`tests/setupStyles.ts:3606-3608`): "`reads` names the custom properties the selector's declarations carry. An empty list is the claim that the rule writes no `var()` at all, which is what separates a site holding Bootstrap's own value from one this package routed onto a token."

`INPUT_GROUP_CASES` (`tests/setupStyles.ts:4210-4214`): "`reads` is keyed by property, across every rule the selector heads: a sized select heads its size rule and the rule that restores its indicator room, and the two write different properties. A property the row leaves out is the claim that its declaration writes no `var()`, so an empty row separates a rule holding Bootstrap's own values from one this package routed onto tokens, and a token moved from the property that consumes it onto another reads as a different row."

## Distillate

- **Tooltip specimens.** Own `app/browser/constants.ts`, `tests/setup.ts` (`CaptureSubject`, `CASCADE_KEYS`), `tests/app/browser/integration.test.ts`, and `tests/app/browser/sections/InputGroupSection.test.ts`. A result that renders the two tooltip frames makes false the two "no specimen renders a tooltip" remarks, the null tooltip query, and the subject and scenario lists that omit those names. The cascade rules in `_validation.scss` and `_input-group.scss` already describe the tooltip. `app/browser/constants.ts` contains no `overflow` rule, and no `FRAMES.element` call exists; the element-frame form in use is `FRAMES.place(scenario, subject, frame)`.
- **`INPUT_GROUP_ROUNDING`.** Own `tests/setupStyles.ts`, `tests/src/styles/components/input-group.test.ts`, `tests/setupStyles.test.ts` (the export list and the freeze expectations), `guides/veneer.md` (`### Input group classes`, including `guides/veneer.md:1351-1354`), and the outer-column comment at `tests/app/browser/integration.test.ts:1421-1425`. Retiring the fixture makes false the export, the three `scene.load` calls, the `@layer elements` expectations, the doc block's "carry no radius" sentence, the corner comment that the control reads the fixture, and the guide's consumer-radius and plain-box sentences. `.form-control` and `.form-select` already include `control-border`, which writes `border-radius: var(--bs-border-radius)`.
- **Cascade-key prose.** Own the doc block at `tests/setup.ts:343-347` and the case title at `tests/app/browser/integration.test.ts:608`. A rewrite that names the frozen array's scenarios makes those two enumerations (capped container, numbered-column row, base table, role link; and container, row, table, link) false as the list of keys.
- **Validated color width.** Own `src/styles/components/_validation.scss:89-92`, the `81` expectations in `tests/src/styles/components/validation.test.ts`, and the `#### is-valid` / `#### is-invalid` width rows plus `guides/veneer.md:803-805` and `:1206-1208`. There is no `VALIDATION_CASES` table. The resting `.form-control-color` width already reads `--vn-space-24` and is ledgered as `tokenized`. Changing the validated `3rem` literal makes the `declared` ledger cells and the `81` pixel expectations false.
- **`FORM_RANGE_CASES`.** Own `tests/setupStyles.ts:3590-3686` and the Node case at `tests/setupStyles.test.ts:1794-1844`. Giving `reads` the `InputGroupCase` / `FormControlCase` record, and switching the comparison to the per-property `Object.fromEntries` equality, makes the string-list remark and the `declarations.includes(`var(${name})`)` comparison false.
- **Literal declaration.** The addition reader already reports an extra property on a recorded shipped selector as a `declaration` addition (`${selector} { ${property} }`), and `tests/conformance.test.ts:199` expects `additions.unrecorded` empty. `collectValueGaps` walks inventory declarations. The binding case compares `var()` properties. The browser proof compares `Object.keys(entry.values)`. A planted literal on `.form-control` that is absent from `reads` and from `values` leaves those two proofs green and makes `additions.unrecorded` non-empty until the Additions table records it.
- **Forced colours.** Own the `:focus` rules in `_form-control.scss`, `_form-select.scss`, `_form-range.scss`, and `_form-check.scss`, and any proof that stages `forced`. `focus-ring` already writes the forced-colours outline; the forms rules do not include it. Component proofs call `stageMedia({ motion: false })` only. The installed `MediaOptions` already has `forced?`. Adopting the mixin on those rules makes the current `outline: 0` plus `box-shadow` focus blocks false under `(forced-colors: active)`.
- **`reads` remarks.** The two sentences quoted above are the ones a per-property range table and a retired input-group sentence replace. The input-group sentence already describes a property-keyed map.

## Unknowns

None. Every `B-FORMS-CLOSE` carrier row was read. `VALIDATION_CASES`, `FRAMES.element`, and `overflow` in `app/browser/constants.ts` were searched and are absent.

## Journal

`/home/user/scaffold/tmp/cursor/b-forms-close-terrain.jsonl`, session `209e0ace-d80f-463d-a1a3-0bfb1dfd1605`.

## Deviation

None. `git status --porcelain` was empty before and after. `HEAD` is `53628aab53298183357fe8f116feb395e97bf8cf`.