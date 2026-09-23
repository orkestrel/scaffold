# B-FORMS-LABEL terrain — Cursor Grok distillate

Retained verbatim from the Grok lane (session `92d39f3f-4a69-4dbb-ad89-2400bdbed044`, model `Grok 4.7 256K High`, launch journal `tmp/cursor/b-forms-label-terrain.jsonl`, swept at the design round's acceptance). The brief is `b-forms-label-terrain-brief.md` beside this file; the tree is Veneer `e0c901a`.

---

I'll read the brief and the repository's agent contract so I follow both.The brief is a read-only terrain pass. I'll load the scaffold contract next, then capture git status and read the sites it names.HEAD is `e0c901a` and the tree is clean. Next I’ll read the form-floating shipping sites and the key lists the brief names.## Question

At `e0c901a`, a unit that ships the `form` key has to touch the same shipping sites the `form-floating` key already uses, plus the shipped-key lists, the `.form-switch` attribution, and the `.col-form-label*` deferrals.

## Evidence

### 1. How `form-floating` ships

`src/styles/components/_form-floating.scss:3` opens `@layer components`. The header at `src/styles/components/_form-floating.scss:4-17` says the partial writes floating geometry only, every inset reads a `--vn-space-*` token, and height and the floated top inset multiply `--vn-space-8`. Token reads in the rules include `--vn-space-8`, `--vn-space-6`, `--vn-space-5`, `--vn-space-3`, `--bs-border-width`, `--bs-body-color-rgb`, `--bs-body-bg`, `--bs-border-radius`, `--bs-secondary-bg`, and `--vn-gray-600` (`src/styles/components/_form-floating.scss:25-40`, `src/styles/components/_form-floating.scss:64-69`, `src/styles/components/_form-floating.scss:86-89`).

`src/styles/index.scss:55-61` loads `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `validation` in that order. There is no `@use` of `labels` or `form-text`.

`tests/src/styles/components/form-floating.test.ts` case titles: "makes the container the positioning box…", "rests the label over the control…", "hides the placeholder…", "floats the label and moves the text down…", "keeps the label floated over a filled control…", "floats the select label…", "floats the plaintext label…", "paints the backdrop behind a filled textarea label…", "paints no backdrop behind an empty textarea label…", "paints the disabled backdrop on the secondary surface", "grays the label of a disabled control…", "keeps the validation icon room…", "transitions the label opacity and transform…", "scales the height and every inset together…", "reads the border width, the body color, both backdrop surfaces, and the backdrop radius…", "retunes the label fade and the backdrop…", "authors every case selector in the components layer…", "holds each autofill rule…".

`FORM_FLOATING_CASES` at `tests/setupStyles.ts:4421` has no interface of its own. Each row is `{ selector, rendered, reads }` and `reads` is a frozen array of custom-property names (`tests/setupStyles.ts:4418-4419`). `FormFloatingDensityCase` at `tests/setupStyles.ts:4541` is a separate density table. The Node case "binds every floating selector to the inventory, to its condition, and to the tokens it reads" is `tests/setupStyles.test.ts:2707`. The browser comparison is `tests/src/styles/components/form-floating.test.ts:496-510`.

`FormFloatingSection` at `app/browser/sections/FormFloatingSection.ts:12-18` extends `SpecimenSection` with `FORM_FLOATING_COPY` and `FORM_FLOATING_SPECIMENS`. `app/browser/Showcase.ts:105` constructs it after `FormCheckSection` and before `FormControlSection`. `app/browser/index.ts:23` re-exports the section module. Copy at `app/browser/constants.ts:1554-1557` names the region `Form floating`. Specimens at `app/browser/constants.ts:1570-1596` are `Form floating empty`, `Form floating filled`, `Form floating textarea`, `Form floating select`, `Form floating disabled`, `Form floating plaintext`.

`tests/app/browser/sections/FormFloatingSection.test.ts:13` is "renders every floating control through the shared section contract, each named by its label" and checks those specimen names at `tests/app/browser/sections/FormFloatingSection.test.ts:24-30`.

`CaptureSubject` members at `tests/setup.ts:121-126` are `Form floating disabled`, `Form floating empty`, `Form floating filled`, `Form floating plaintext`, `Form floating select`, `Form floating textarea`. Cascade rows at `tests/setup.ts:901-936` are `form-floating-empty` (`transform`), `form-floating-filled` (`transform`), `form-floating-textarea` (`padding-top`), `form-floating-select` (`padding-top`), `form-floating-disabled` (`color`), `form-floating-plaintext` (`border-left-width`). `FORM_FLOATING_KEYS` at `tests/setup.ts:1215-1217` adds `form-floating-empty-focus`. `CAPTURE_KEYS` spreads it at `tests/setup.ts:1270`.

`tests/app/browser/index.test.ts:39-40` and `tests/app/browser/index.test.ts:47` require `FORM_FLOATING_COPY`, `FORM_FLOATING_SPECIMENS`, and `FormFloatingSection`. `tests/app/browser/Showcase.test.ts:102` expects the region name `Form floating`, and `tests/app/browser/Showcase.test.ts:132` expects `FORM_FLOATING_SPECIMENS` in specimen order. The journey case "floats the empty field label under keyboard focus and photographs the floated field" is `tests/app/browser/integration.test.ts:952`.

`guides/veneer.md:1360` is `### Form floating classes`. Paragraphs at `guides/veneer.md:1362-1388` say the key ships the container, floated controls, label transforms, textarea backdrop, and disabled and plaintext labels, and that validation and input-group rules recorded against the container are emitted by those partials. Departure bullets at `guides/veneer.md:1390-1407` are density scaling through `--vn-space-*` and the disabled label reading `--vn-gray-600`. The ledger has no `#### form-floating` heading. The `form-floating` departure rows sit in the table opened by `#### form-check` at `guides/veneer.md:3278`, with Component cell `form-floating`, from `guides/veneer.md:3312` (`height`, `tokenized`) through `guides/veneer.md:3339` (`color`, `tokenized`).

### 2. Where shipped keys are listed

`tests/conformance.test.ts:93-149` is the `listed` array compared with `collectShippedComponents` at `tests/conformance.test.ts:153-155`. Forms members present: `form-check`, `form-control`, `form-floating`, `form-range`, `form-select`. `col` is present. `form` is absent. `tests/conformance.test.ts:264-291` holds the barrel's forms `@use` names to Bootstrap's `_forms.scss` order, which is `labels`, `form-text`, `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `validation`, with `floating-labels` renamed to `form-floating`.

`collectShippedComponents` at `tests/setupServer.ts:2424-2444` returns a key whose selector rows, and whose variable rows when `inventory.components[key].properties` is nonempty, are all `shipped`. `matchShippedKey` at `tests/setupServer.ts:1387-1391` picks the longest shipped key a class token equals or opens with. `attributeSelector` at `tests/setupServer.ts:1895-1927` filters recording keys to shipped members, prefers the member whose name is a class on the selector, longest name first, and otherwise takes the first shipped member in inventory order (`tests/setupServer.ts:1888-1893`).

`tests/setupServer.test.ts:1326-1384` expects the same component set, including `form-floating` at `tests/setupServer.test.ts:1343` and `col` at `tests/setupServer.test.ts:1336`, and omitting `form`. The membership proof is "attributes a selector two shipped keys record to the more specific key" at `tests/setupServer.test.ts:2111-2165`: `.form-control:focus` recorded under `form` and `form-control` attributes to `form-control` when both are shipped; `textarea:focus` recorded under `form` and `form-floating` attributes to `form` because the selector carries neither key as a class.

`tests/setup.ts` and the journey have no shipped-key `listed` literal. `CAPTURE_KEYS` at `tests/setup.ts:1258-1273` composes scenario lists. `tests/setupStyles.test.ts:233` names the export `FORM_FLOATING_CASES`.

The inventory summary at `tests/fixtures/oracle/inventory.json:113058-113063` records the `form` key with nonempty `properties`. Those properties, at `tests/fixtures/oracle/inventory.json:25785-25826`, are `--bs-form-select-bg-img`, `--bs-form-check-bg`, `--bs-form-check-bg-image`, `--bs-form-switch-bg`, and `--bs-form-select-bg-icon`. The `## Compatibility` table has no `form` component row (`guides/veneer.md` search for a `form` row is empty).

### 3. The switch row under `form`

`guides/veneer.md:1021-1022` says the release records the switch row's own inset only under the umbrella `form` key, and that the check partial ships it because the switch track needs it. `src/styles/components/_form-check.scss:113-115` writes `.form-switch { padding-left: 2.5em; }`.

Inventory: `.form-switch` with `padding-left: 2.5em` is at `tests/fixtures/oracle/inventory.json:20655-20660`, inside the `form` object that opens at `tests/fixtures/oracle/inventory.json:19202`. The same selector's other hit, `tests/fixtures/oracle/inventory.json:24270`, is still before `form-control` at `tests/fixtures/oracle/inventory.json:25864`. `.form-switch .form-check-input` is under `form` at `tests/fixtures/oracle/inventory.json:20669` and under `form-check` (object opens at `tests/fixtures/oracle/inventory.json:30025`) at `tests/fixtures/oracle/inventory.json:30388`.

The ledger's only `.form-switch` departure row is `guides/veneer.md:3294`: Component `form-check`, selector `.form-switch .form-check-input`, property `transition`, Departure `tokenized`. There is no `.form-switch` / `padding-left` departure cell.

Once `form` is shipped, `attributeSelector` at `tests/setupServer.ts:1901-1908` and `tests/setupServer.ts:1920` does this. `.form-switch` is recorded only under `form`, so the sole shipped member is `form` (the class token is `form-switch`, so the class filter is empty and `members.at(0)` is `form`). `.form-switch .form-check-input` is recorded under `form` then `form-check`. Neither key name is a class on that selector, so the class-length preference does not fire and the recording-order member is `form`. Today `form` is absent from `shipped`, so that same selector's shipped member is `form-check`, which is why the transition row's Component cell is `form-check`.

### 4. The `col` key's label rows

Deferral rows at `guides/veneer.md:1652-1654`: `.col-form-label`, `.col-form-label-lg`, `.col-form-label-sm`, Owner `Forms`, reason "Form-label typography belongs to Forms; the col inventory key is its only record." `readDeferrals` at `tests/setupServer.ts:1040-1069` reads Name, Owner, and Reason from `### Deferred selectors`. `scanShippedDeferrals` at `tests/setupServer.ts:2281-2294` returns deferred names the cascade already writes. `tests/conformance.test.ts:211` expects that scan to be empty.

`col` is shipped: `tests/conformance.test.ts:102`, compatibility rows `guides/veneer.md:3654-3659` with status `shipped`. The inventory `col` object opens at `tests/fixtures/oracle/inventory.json:9839` and its properties object at `tests/fixtures/oracle/inventory.json:12341` is empty. `.col-form-label` declarations at `tests/fixtures/oracle/inventory.json:11400-11421` are `padding-top` and `padding-bottom` `calc(0.375rem + var(--bs-border-width))`, `margin-bottom` `0`, `font-size` `inherit`, `line-height` `1.5`. `.col-form-label-lg` at `tests/fixtures/oracle/inventory.json:11430-11442` uses `calc(0.5rem + var(--bs-border-width))` and `font-size` `1.25rem`. `.col-form-label-sm` at `tests/fixtures/oracle/inventory.json:11452-11464` uses `calc(0.25rem + var(--bs-border-width))` and `font-size` `0.875rem`. Those selector hits all fall before the `form` object at `tests/fixtures/oracle/inventory.json:19202`. `src/` contains no `col-form-label`, `form-label`, or `form-text` rule.

The Styles headings have no Layout or Grid classes section. The column family is named in the Files row for `src/styles/components/_grid.scss` at `guides/veneer.md:195`. Departure tables include `#### row` at `guides/veneer.md:3015` and `#### container` at `guides/veneer.md:2473`. There is no `#### col` heading. `## Showcase` at `guides/veneer.md:3818` names a Layout region for container, grid, and gutter specimens. The grid proof link is `guides/veneer.md:3966`.

### 5. `FORM_FLOATING_CASES` reads shape

`reads` is one frozen array per selector (`tests/setupStyles.ts:4422-4537`). Empty arrays: `.form-floating`, both `::placeholder` selectors, both `.form-control` label transforms, `.form-select ~ label`, and the autofill label rule. `--bs-border-width`, `--vn-space-8`, `--vn-space-6` on `.form-floating > .form-control` and `.form-control-plaintext`. The select row adds `--vn-space-5`. The label row is `--vn-space-8`, `--vn-space-6`, `--bs-body-color-rgb`, `--bs-border-width`. Focus and filled padding rows are `--vn-space-8`, `--vn-space-5`. The plaintext label row is `--bs-border-width`. Textarea `::after` rows are `--vn-space-8`, `--vn-space-3`, `--bs-body-bg`, `--bs-border-radius`. The disabled textarea backdrop row is `--bs-secondary-bg`. Both disabled label rows are `--vn-gray-600`.

The Node case at `tests/setupStyles.test.ts:2745-2755` spreads `entry.reads`, requires each name to appear as `var(name)` in the selector's compiled declarations, and pushes any `var(--…)` in those declarations that the array omits. The browser case at `tests/src/styles/components/form-floating.test.ts:509-510` does the same against joined `cssText`.

`FormControlCase` at `tests/setupStyles.ts:4810-4829` types `reads` as `Readonly<Record<string, readonly string[]>>`, keyed by property. The Node comparison for that table is an equality of the per-property map at `tests/setupStyles.test.ts:1926-1929`. `FORM_RANGE_CASES` at `tests/setupStyles.ts:3610-3614` still types `reads` as a frozen array. `InputGroupCase` at `tests/setupStyles.ts:4188-4195` already uses the per-property map.

### 6. Tokens the label rules would read

`src/styles/_tokens.scss:286` is `--vn-space-2: calc(0.25rem * var(--vn-factor-density))`. `src/styles/_tokens.scss:287` is `--vn-space-3: calc(0.375rem * var(--vn-factor-density))`. `src/styles/_tokens.scss:288` is `--vn-space-4: calc(0.5rem * var(--vn-factor-density))`. `src/styles/_tokens.scss:264` is `--vn-size-2: 0.875rem`. No `--vn-size-*` declaration holds `0.875em`. The literal `0.875em` in Veneer styles is the `caption-text` mixin at `src/styles/_mixins.scss:69`.

`--bs-secondary-color` is assigned in the `theme-tokens` mixin at `src/styles/_mixins.scss:298` as `var(--vn-text-secondary)`. `--vn-text-secondary` is `color-mix(in srgb, var(--vn-text-body-base) 75%, transparent)` at `src/styles/_mixins.scss:261`. `src/styles/_theme.scss:10-16` includes that mixin on `[data-bs-theme='light']` and `[data-bs-theme='dark']`.

`input-text` at `src/styles/_mixins.scss:48-53` reads `--vn-size-3`, `--vn-weight-body`, `--vn-line-body`, and `--bs-body-color`. The comment at `src/styles/_mixins.scss:46-47` says this is the run the release derives from `$input-*`. `input-border` at `src/styles/_mixins.scss:57-59` reads `--bs-border-width`, `--bs-border-color`, and `--bs-border-radius`. `--vn-line-body` is `1.5` at `src/styles/_tokens.scss:279`.

Bootstrap `node_modules/bootstrap/scss/forms/_labels.scss:4-35` writes `.form-label` from `$form-label-*`, and `.col-form-label` padding as `add($input-padding-y, $input-border-width)` with `line-height: $input-line-height`. The size variants use `$input-padding-y-lg` / `$input-font-size-lg` and `$input-padding-y-sm` / `$input-font-size-sm`. `node_modules/bootstrap/scss/forms/_form-text.scss:4-10` writes `.form-text` from `$form-text-*`. Defaults in `node_modules/bootstrap/scss/_variables.scss`: `$form-label-margin-bottom` `.5rem` at line 877, `$form-text-margin-top` `.25rem` at line 869, `$form-text-font-size` `$small-font-size` at line 870, `$small-font-size` `.875em` at line 681, `$form-text-color` `var(--bs-secondary-color)` at line 873, `$input-padding-y` `.375rem` at line 885 via `$input-btn-padding-y` at line 789, `$input-line-height` `1.5` at line 890 via `$line-height-base` at line 629, `$input-border-width` `var(--bs-border-width)` at line 907, `$input-padding-y-lg` `.5rem` at line 896, `$input-padding-y-sm` `.25rem` at line 892, `$form-switch-padding-start` `$form-switch-width + .5em` at line 977 with `$form-switch-width` `2em` at line 976.

Inventory values match those defaults: `.form-label` `margin-bottom` `0.5rem` at `tests/fixtures/oracle/inventory.json:19205-19210`; `.form-text` `margin-top` `0.25rem`, `font-size` `0.875em`, `color` `var(--bs-secondary-color)` at `tests/fixtures/oracle/inventory.json:19219-19231`.

### 7. Guide sections the key touches

`### Deferred selectors` opens at `guides/veneer.md:1616`. The prose at `guides/veneer.md:1618-1623` says the owning unit deletes the row when it ships the name, and the conformance proof refuses a deferred name found in the cascade.

Forms sections, in guide order: `### Form check classes` `guides/veneer.md:1016`, `### Form select classes` `guides/veneer.md:1083`, `### Form control classes` `guides/veneer.md:1158`, `### Form range classes` `guides/veneer.md:1234`, `### Input group classes` `guides/veneer.md:1291`, `### Form floating classes` `guides/veneer.md:1360`. The Files table names those partials at `guides/veneer.md:210-215` and names no label or form-text partial.

`## Showcase` at `guides/veneer.md:3813-3831` names regions through Close, then Placeholder, Progress, and Spinner at `guides/veneer.md:3852`. That prose does not name the form regions. The code order is in `app/browser/Showcase.ts:104-114` and the proof list is `tests/app/browser/Showcase.test.ts:101-111`.

`## Tests` stem table at `guides/veneer.md:3895-3919` maps stems such as `progress-base`, `border-spinner`, and `button-placeholder`. It does not include `form-floating-empty` or any other form scenario. The style-proof paragraph at `guides/veneer.md:3974-3979` already links the check, control, range, input-group, floating-label, and select proofs.

## Distillate

Files the `form-floating` shipping pattern already owns, which a `form` unit meets the same way: a new partial under `src/styles/components/`, its `@use` in `src/styles/index.scss`, a browser proof under `tests/src/styles/components/`, a case table and markup in `tests/setupStyles.ts`, the Node binding in `tests/setupStyles.test.ts`, a section under `app/browser/sections/`, registration in `app/browser/Showcase.ts` and `app/browser/index.ts`, copy and specimens in `app/browser/constants.ts`, `tests/app/browser/sections/`, `CaptureSubject` and capture rows in `tests/setup.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/integration.test.ts`, and `guides/veneer.md` (Files row, a forms section, a departure table, a Compatibility row, the Showcase region paragraph, the Tests stem table, and the proof-link paragraph).

Assertions a shipped `form` key makes false as they stand:

- `tests/conformance.test.ts:153-155` equates `collectShippedComponents` with `listed` at `tests/conformance.test.ts:93-149`, which omits `form`. The inventory `properties` object is nonempty (`tests/fixtures/oracle/inventory.json:25785`), so `collectShippedComponents` at `tests/setupServer.ts:2432-2440` also requires a shipped variable row.
- `tests/setupServer.test.ts:1326-1384` expects that same set from `readCompatibility()`.
- `tests/conformance.test.ts:211` expects `scanShippedDeferrals` to be empty. Emitting `.col-form-label`, `.col-form-label-lg`, or `.col-form-label-sm` while `guides/veneer.md:1652-1654` still defer them fails that scan.
- `guides/veneer.md:3294` records the `.form-switch .form-check-input` `transition` departure under Component `form-check`. Membership at `tests/setupServer.ts:1904-1908` moves that selector to `form` once `form` is a shipped recorder, so the measured ledger and that cell disagree.
- Adding a section export makes `tests/app/browser/index.test.ts:9` false. Adding a region makes `tests/app/browser/Showcase.test.ts:86` false. Adding a `setupStyles` export makes the sorted export list that includes `FORM_FLOATING_CASES` at `tests/setupStyles.test.ts:233` false.
- Changing `FORM_FLOATING_CASES.reads` from an array to the `FormControlCase` map makes the spreads at `tests/setupStyles.test.ts:2750-2753` and `tests/src/styles/components/form-floating.test.ts:510` false. The per-property equality those would follow is `tests/setupStyles.test.ts:1926-1929`.

Attribution consequence: `.form-switch { padding-left: 2.5em }` is already emitted from `src/styles/components/_form-check.scss:113-115` and recorded only under `form`. Shipping `form` attributes that selector to `form`. The cascade value matches the inventory value `2.5em`, so the value comparison at `tests/setupServer.ts:2018` records a departure only if the written value changes. Selectors recorded under both `form` and a sibling, whose selector does not carry the sibling key as a class, follow `textarea:focus` in `tests/setupServer.test.ts:2162-2164` and attribute to `form`.

## Unknowns

- The full set of selectors recorded under `form` and under no other key. The three named selectors (`.form-label`, `.form-text`, `.form-switch`) were located inside the `form` object only. The rest of that object's selector list was not enumerated.
- The live return of `attributeSelector` on the pinned inventory. The membership branch is cited from source. The function was not executed.
- Whether `collectLedger` currently emits an unattributed row for `.form-switch` / `padding-left`. The guide has no such cell. The ledger command was not run.
- A Styles section that records `col` departure rows under a Layout heading. Heading search found the Compatibility rows and the Files row, and no `#### col` table.

## Journal

`/home/user/scaffold/tmp/cursor/b-forms-label-terrain.jsonl`, session `92d39f3f-4a69-4dbb-ad89-2400bdbed044`.

## Deviation

`git status --porcelain` was empty before the reading and empty after. HEAD is `e0c901a`.
