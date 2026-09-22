# Unit B-FORMS-VALIDATION-2 — report

Every finding the fix round carried is closed in the owned files. The proof changes each ran red
under the mutation the brief named and green after it was removed. The gates § Execution names exit
0, and `npm run test:journey` passes on this host.

## Findings

### Analyst 4 — the focus ring read a hard-coded length

**Change.** `tests/src/styles/components/validation.test.ts` reads `--vn-focus-width` through a
mounted gauge (`<div id="focus-gauge" style="width: var(--vn-focus-width)">`) and compares the
painted ring against that reading, at each of the sites the analyst named: the case titled `paints
the $state focus ring at the width the focus token resolves to, over the role triplet` and the
scoped case titled `reaches every host through the $state scope as well as through the state class`.
The focus case then retunes `--vn-focus-width` to `0.5rem` on the document element, asserts the
gauge moved, and reads every ring again; the scoped case takes its whole reading under that retune.
The case title no longer says "published focus width", because the width is now whatever the token
resolves to.

**Mutation.** `var(--vn-focus-width)` replaced by `3px` at each of its declarations in
`src/styles/components/_validation.scss`, which is the severed binding a `[0, 0, 0, 3]` literal
could not see.

**Red.** `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts
--no-cache --reporter=dot tests/src/styles/components/validation.test.ts` →
`Tests 4 failed | 13 passed (17)`, reading `expected 8, received 3` in the focus case and in the
scoped case, for the valid and the invalid state.

**Green.** Plant removed, `src/styles/components/_validation.scss` back to SHA-256
`1334133a653b783617de39731755bfd2b9977535c7cfb8d22d0f66d5b91948cf`; `npm run test:src:styles` →
`Tests 433 passed (433)`, exit 0.

### Reviewer R1 — the tooltip radius compared one corner against another

**Change.** The tooltip case mounts `<div id="radius-gauge" style="border-radius:
var(--bs-border-radius)">`, asserts the gauge's resolved radius is greater than zero, and compares
the tooltip's top-left and top-right radius against it. The old comparison was true of a square
corner as well.

**Mutation.** `border-radius: var(--bs-border-radius);` deleted from the `.#{$state}-tooltip` rule in
`src/styles/components/_validation.scss`.

**Red.** The same scoped command → `Tests 3 failed | 14 passed (17)`: the valid and the invalid
tooltip case read `expected 6, received 0` on the gauge comparison, and the density case reddened
beside them.

**Green.** Declaration restored, partial back to the SHA-256 recorded earlier;
`npm run test:src:styles` → `Tests 433 passed (433)`, exit 0.

### Reviewer R2 — seven `$icons` values no proof read

**Change.** The case in `tests/setupStyles.test.ts`, retitled `binds each form mark in the token map
to the release declaration that bakes it`, compiles the `$icons` map through Sass
(`@each $key, $image in tokens.$icons`), walks the release's compiled `bootstrap.css` for every
declaration whose value is a `data:image/svg+xml` URL, and compares the whole binding in one
assertion: each map key against the release property and the release selector that bake its value.
The existing `FORM_ICON_CASES` assertions against the oracle stay beside it.

**Unknown the brief posed.** Every `$icons` value appears verbatim in the release's compiled
stylesheet, and no key's release declaration differs from the escaped map value. The bindings the
run recorded are `check` at `--bs-form-check-bg-image` on `.form-check-input:checked[type=checkbox]`,
`radio` on `.form-check-input:checked[type=radio]`, `indeterminate` on
`.form-check-input[type=checkbox]:indeterminate`, `switch-knob` at `--bs-form-switch-bg` on
`.form-switch .form-check-input`, `switch-focus` on the `:focus` form of that selector,
`switch-checked` on its `:checked` form, `select-indicator` at `--bs-form-select-bg-img` on
`.form-select`, and `valid` and `invalid` at `background-image` on
`.was-validated .form-control:valid` and its invalid twin and at `--bs-form-select-bg-icon` on
`.was-validated .form-select:valid:not([multiple]):not([size])` and its invalid twin.

**Mutation.** The `switch-focus` glyph retinted in `src/styles/_tokens.scss`, `%2386b7fe` to
`%2386b7ff`.

**Red.** `npm run test:setup` → `Tests 1 failed | 161 passed (162)`, reporting
`"switch-focus": []` against the expected `--bs-form-switch-bg at .form-switch .form-check-input:focus`.
The rest of the project passed under the same plant, which is the measurement that the tree had no
other proof of those values.

**Green.** Plant removed, `src/styles/_tokens.scss` back to SHA-256
`8142ccd27c7a96119eda8554cc5f0255a6e6a6f5a1d595e53d0fd1d1165eb81e`; `npm run test:setup` →
`Tests 162 passed (162)`, exit 0.

**Rows.** The binding needed no rows in `tests/setupStyles.ts`, so that file is unchanged this
round: the map is read from its own source through Sass rather than transcribed.

### Analyst 8 and reviewer 8 — the guide

- The § Files row for `src/styles/components/_validation.scss` names its proof: "read by
  `tests/src/styles/components/validation.test.ts`". The row was extended rather than a proof row
  added, because the table gives specific proofs no rows of their own and already carries a
  `tests/src/styles/` row for the directory.
- The density claim is corrected: the feedback gap and the tooltip padding read `--vn-space-2` and
  `--vn-space-4` and rescale with `--vn-factor-density`; the tooltip's type reads `--vn-size-2`,
  which the size scale holds fixed. The unit's own proof pins `14px` before and after the factor is
  doubled.
- The temporal `once` in "again once the control is filled" reads "again after the control is
  filled".
- The numerals are gone: "in their own partial after the vertical rule" and "from a shared mixin as
  well".

The same false generalization in the test comment beside the density case now reads that doubling
the factors doubles the tokenized spacing and radius, holds the type fixed, and leaves the em-based
icon geometry alone.

### Reviewer F2 — the lead paragraph named a treatment no specimen renders

`VALIDATION_COPY.paragraph` in `app/browser/constants.ts` reads "Compare the marks, borders, and
feedback a passing and a failing control carry." Stacking is dropped for B-FORMS-GROUP to add with
the specimen that shows it. `tests/app/browser/sections/ValidationSection.test.ts` reads the
constant by reference, so the change needs no test edit.

### Reviewer F3 — the journey case title

`tests/app/browser/integration.test.ts` titles the case `paints a validation focus ring on the
passing and the failing text control, in the variant this run renders`, which is the pair
`VALIDATION_KEYS` carries and is grammatical.

### Reviewer F4 — banned-sense prose

- `tests/src/styles/components/validation.test.ts`: the case title reads "clears it after it is
  filled"; "read in the cases above" reads "read in the preceding cases"; "in the check case above"
  reads "in the earlier check case".
- `tests/app/browser/integration.test.ts`: "the assertion below" reads "the following assertion".
- `tests/setup.ts`: the `VALIDATION_KEYS` remark reads "Only the text controls are driven".

### Reviewer F5 — `attributeSelector` recomputed and copied

`tests/setupServer.ts` reuses the `classes` binding for the class-prefix fallback and filters
`members` without the `[...members]` copy, because `filter` already returns a fresh array. Behaviour
is unchanged and `tests/setupServer.test.ts` stays as it is.

### Reviewer F6 — the doc block broke its siblings' form

`VALIDATION_COPY` reads "Holds the Validation section's visible copy and accessible name.", the form
every sibling copy block uses.

## Touched files

- `tests/src/styles/components/validation.test.ts` — the focus-width gauge and retune at each ring
  site, the tooltip radius against its alias, the corrected density comment, the banned-sense prose.
- `tests/setupStyles.test.ts` — the icon case extended to bind every `$icons` value to its release
  declaration.
- `guides/veneer.md` — the § Files row's proof, the density claim, the temporal `once`, the numerals.
- `app/browser/constants.ts` — the `VALIDATION_COPY` doc block and lead paragraph.
- `tests/app/browser/integration.test.ts` — the journey case title and the cross-reference.
- `tests/setup.ts` — the `VALIDATION_KEYS` remark.
- `tests/setupServer.ts` — `attributeSelector`.

`tests/setupStyles.ts` is unchanged this round.

## Gates

| Command                    | Exit | Reading                          |
| -------------------------- | ---- | -------------------------------- |
| `npm run format:check`     | 0    | All matched files use the correct format (215 files) |
| `npm run lint:check`       | 0    | No diagnostic                    |
| `npm run check`            | 0    | Root, src core, src browser, src styles, app browser |
| `npm run build:src`        | 0    | `dist/src/styles/index.css` 96.18 kB |
| `npm run test:setup`       | 0    | `Tests 162 passed (162)`         |
| `npm run test:src:styles`  | 0    | `Tests 433 passed (433)`         |
| `npm run test:app`         | 0    | `Tests 28 passed (28)`           |
| `npm run test:guides`      | 0    | `Tests 18 passed (18)`           |
| `npm run test:policy`      | 0    | 109 passed and 1 skipped (110)   |

Observations, taken beside the gates and not criteria: `npm run test:journey` exits 0 with
`Tests 104 passed (104)` in 47.27 s of wall time on this host, which is the idle-host reading the
earlier round left open; `npm run test:conformance` exits 0 with `Tests 17 passed (17)`, run because
this unit edits `guides/veneer.md`.

## Prose sweep

Pattern `\b(once|above|below|should|simply|just|easy|easier)\b`, case-insensitive, over
`tests/src/styles/components/validation.test.ts`, `tests/setupStyles.test.ts` (the icon case),
`guides/veneer.md` (§ Files and § Validation classes), `app/browser/constants.ts` (the
`VALIDATION_COPY` block), `tests/app/browser/integration.test.ts` (the validation case),
`tests/setup.ts` (the `VALIDATION_KEYS` remark), and `tests/setupServer.ts` (`attributeSelector`).

Hits, both in `tests/src/styles/components/validation.test.ts` and both ruled permitted: "each rule
twice: once under a `.was-validated` ancestor … and once against the state class", which is
frequency and names its members; and the case title "stacks a failing input-group child above a
passing one", which is the spatial stacking the `z-index` reading measures. No other hit.

## `git status --porcelain`

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/ValidationSection.ts
?? src/styles/components/_validation.scss
?? tests/app/browser/sections/ValidationSection.test.ts
?? tests/src/styles/components/validation.test.ts
```

The list is the VALIDATION set the brief names, with nothing added. Working-tree diffstat for the
whole unit, both rounds: `17 files changed, 615 insertions(+), 65 deletions(-)` plus the four
untracked files.

## Deviations

No stop. Recorded choices under the deviation contract:

- **The red readings required transient mutations in files this unit does not own.** The named
  mutations live in `src/styles/components/_validation.scss` and `src/styles/_tokens.scss`, so each
  was planted, measured, and removed in the same step, and each file's SHA-256 is byte-identical to
  its pre-plant value: `1334133a653b783617de39731755bfd2b9977535c7cfb8d22d0f66d5b91948cf` for the
  partial and `8142ccd27c7a96119eda8554cc5f0255a6e6a6f5a1d595e53d0fd1d1165eb81e` for the tokens
  partial. No `git` command that discards a working-tree change was run; each plant was removed by
  the exact reverse edit.
- **The § Files finding is closed inside the validation row.** The table gives specific proofs no
  rows of their own, so a proof row would have duplicated the `tests/src/styles/` row it already
  carries.
- **The `$icons` binding needed no rows in `tests/setupStyles.ts`.** Compiling the map through Sass
  reads the values from their own source, and a transcribed copy could drift from it.
