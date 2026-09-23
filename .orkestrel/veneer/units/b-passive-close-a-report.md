# Unit B-PASSIVE-CLOSE-A — report

## Obligations and sites

1. `src/styles/components/_button.scss`: added the comment and `$sizes` list after the `@use`
   lines, before `@layer components`; replaced the `.btn-sm`/`.btn-group-sm` and
   `.btn-lg`/`.btn-group-lg` blocks with one `@each $size, $x, $y, $font, $radius in $sizes` loop.
2. `src/styles/components/_pagination.scss`: added the comment and `$sizes` list (`lg` then `sm`)
   after `@use '../mixins' as *;`; replaced `.pagination-lg` and `.pagination-sm` with one `@each`
   loop.
3. `src/styles/components/_placeholder.scss`: added the comment and `$sizes: (('xs', 0.6em), ('sm',
   0.8em), ('lg', 1.2em));` before `@layer components`; replaced the three `.placeholder-{xs,sm,lg}`
   blocks with one `@each $size, $height in $sizes` loop, keeping the surrounding comments in place.
4. Byte identity: see § Byte-identity record.
5. `tests/setupStyles.ts`: `BUTTON_FILLED_CASES` TSDoc reads "Holds the role and mode readings for
   the filled-button interaction cases."; `BUTTON_MODES` TSDoc reads "Holds the modes for the
   outline-button interaction cases." (the second Unknown's ruling); `BUTTON_OUTLINE_CASES`'s
   `.filter` destructures `candidate` and its `.map` destructures `mode`, exactly as specified.
   `tests/src/styles/components/button.test.ts` lines 112 and 177 (the `BUTTON_CONTRAST_*`
   lookups) rename their destructured `theme` to `candidate`, since the outer parameter already
   names `mode`; the `data-bs-theme="${mode}"` template sites (lines 37, 79, 119, 170) stay, naming
   the attribute.
6. `tests/setupServer.ts`: the four `path: string = resolve(WORKSPACE_ROOT, 'guides/veneer.md')`
   defaults (lines 967, 1024, 1069, 1144) now read `resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH)`; no
   TSDoc names the literal path, so none changed. `tests/setupStyles.test.ts`: the four
   `readFileSync(VENEER_GUIDE_PATH, 'utf8')` reads (lines 1689, 1902, 2523, 2537) now read
   `readVeneerGuide()`; `readVeneerGuide` was added to the existing `./setupServer.js` named import
   list in sorted position; the `VENEER_GUIDE_PATH` import from `./setupStyles.js` and the
   export-name row at line 309 were kept per the brief's instruction — see § Deviation report,
   because the tree contradicts that instruction.
7. `tests/setupServer.test.ts` line 603: "the row below names" is now "the following row names".
8. `npx oxfmt --config .oxfmtrc.json --write` ran over all nine owned files (collapsed the three
   `$sizes` list literals in `_button.scss`, `_pagination.scss`, and `_placeholder.scss` to one
   line each; no other file changed shape).

## Byte-identity record

- Baseline: `npx sass --no-source-map src/styles/index.scss > tmp/units/bpc-baseline.css`, taken
  before any edit.
- After obligations 1 to 3 (and again after obligation 8's formatting pass): `npx sass
  --no-source-map src/styles/index.scss > tmp/units/bpc-after.css` then `cmp
  tmp/units/bpc-baseline.css tmp/units/bpc-after.css` — exit 0, both times.
- Control: swapped the two tuples of `_button.scss`'s `$sizes` (`lg` first, `sm` second), compiled,
  `cmp tmp/units/bpc-baseline.css tmp/units/bpc-control.css` — exit 1, differing at char 67421,
  line 1921. Restored by the exact reverse edit (swapped the tuples back), recompiled, `cmp` — exit
  0 again.

## Unknown rulings

- Guide-shape grep (`btn-group-sm\|btn-group-lg\|pagination-lg\|placeholder-xs\|size pair\|one
  .@each` over `guides/veneer.md`): hits at lines 875 to 877 (the `.btn-group-sm > .btn` /
  `.btn-group-lg > .btn` twins ship from `_button.scss` through Bootstrap's own `@extend`), lines
  1400 and 1402 (a compatibility-ledger row naming the same selectors), lines 2209 to 2212 and 2217
  to 2220 (per-property ledger rows for `.btn-group-lg > .btn` and `.btn-group-sm > .btn`), lines
  2931 to 2933 (a `pagination-lg` ledger row), and line 3425 (an inventory row: "the
  `.btn-group-sm > .btn` and `.btn-group-lg > .btn` twins declare ship from
  `src/styles/components/_button.scss`"). Every hit names a selector, a token value, or which file
  the declaration ships from — none describes the two-block source shape the `@each` loop replaces,
  and every named value and file stays true after the change. Ruling: unaffected. No guide patch.
- Axis grep (`\btheme\b` over `tests/setupStyles.ts` from the `BUTTON_FILLED_CASES` TSDoc to the end
  of `BUTTON_OUTLINE_CASES`, and over `tests/src/styles/components/button.test.ts`): in
  `setupStyles.ts`, line 1894 ("Holds the role and theme readings…") and line 2047 ("Holds the theme
  modes…") name the light-and-dark axis — ruled to rename, both renamed as shown under obligation 5;
  the `.filter`/`.map` destructured `theme` at lines 2219 to 2221 name the same axis — renamed to
  `candidate`/`mode`. In `button.test.ts`, lines 112 and 177 (`([name, theme]) => name === role &&
  theme === mode`) destructure a `BUTTON_CONTRAST_*_CASES` tuple's mode field — name the axis, ruled
  to rename (to `candidate`, since `mode` is already the outer parameter); lines 37, 79, 119, and 170
  (`data-bs-theme="${mode}"`) name the `data-bs-theme` attribute — ruled to keep.

## Guide and ROADMAP patches

- `guides/veneer.md`: no patch. See the guide-shape ruling; no sentence describes the pre-`@each`
  block shape.
- `ROADMAP.md`: not read; grepped for a size-pair, `BUTTON_OUTLINE_CASES`, ledger-reader-default, or
  `below`-comment row and found none, so no rows to return. (`grep -n "size pair\|BUTTON_OUTLINE\|
  ledger reader\|the row below" ROADMAP.md` — no match; `ROADMAP.md` does not exist in this
  worktree.)

## Gate exits

- `npx oxfmt --config .oxfmtrc.json --check` over the nine owned files: exit 0 ("All matched files
  use the correct format.").
- `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files: **exit 1** —
  `tests/setupStyles.ts:2220:12: warning eslint(no-shadow): 'mode' is already declared in the upper
  scope.`; `tests/setupStyles.test.ts:146:2: error eslint(no-unused-vars): Identifier
  'VENEER_GUIDE_PATH' is imported but never used.` See § Deviation report.
- `npm run check`: **exit 2** — `tests/setupStyles.test.ts(146,2): error TS6133: 'VENEER_GUIDE_PATH'
  is declared but its value is never read.`
- Not run: `npm run build:src`, `npm run test:setup`, `npm run test:conformance`, `npm run
  test:guides`, and the scoped `vitest run` for `button.test.ts`, `pagination.test.ts`, and
  `placeholder.test.ts`. Held per the deviation contract, which does not authorize deciding past a
  ruling the tree contradicts.

## `git status --porcelain`

```
 M package-lock.json
 M src/styles/components/_button.scss
 M src/styles/components/_pagination.scss
 M src/styles/components/_placeholder.scss
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/button.test.ts
```

## `git diff d60d91c --stat`

```
 package-lock.json                          | 395 ++++++++++++++---------------
 src/styles/components/_button.scss         |  29 ++-
 src/styles/components/_pagination.scss     |  26 +-
 src/styles/components/_placeholder.scss    |  18 +-
 tests/setupServer.test.ts                  |   2 +-
 tests/setupServer.ts                       |   8 +-
 tests/setupStyles.test.ts                  |   9 +-
 tests/setupStyles.ts                       |  10 +-
 tests/src/styles/components/button.test.ts |   4 +-
 9 files changed, 248 insertions(+), 253 deletions(-)
```

`package-lock.json`'s diff is the pre-existing Orchestrator install normalization named in the
brief's Measurements; this unit did not touch it.

## Deviation report

**Expected:** obligation 5's exact code (`BUTTON_OUTLINE_CASES`'s `.map(([role, mode, fill, ,
active, focus]) => …)`, shadowing the outer `flatMap`'s `mode`) and obligation 6's exact
instruction to keep the `VENEER_GUIDE_PATH` import in `tests/setupStyles.test.ts` after all four
of its `readFileSync` call sites move to `readVeneerGuide()` would both leave the gates green.

**Found:**

- `tests/setupStyles.ts:2220:12: warning eslint(no-shadow): 'mode' is already declared in the upper
  scope.` — `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts` denies
  warnings, so this fails the scoped lint criterion.
- `tests/setupStyles.test.ts:146:2: error eslint(no-unused-vars): Identifier 'VENEER_GUIDE_PATH' is
  imported but never used.` and `tests/setupStyles.test.ts(146,2): error TS6133: 'VENEER_GUIDE_PATH'
  is declared but its value is never read.` — both the scoped `oxlint` run and `npm run check` fail
  on the import the brief names to keep.

**Done or not done:** obligations 1 to 8 are applied exactly as specified, including both
brief-specified code shapes named here. The byte-identity proof (obligation 4) and its control are
done and both cmp exits are recorded. Obligations 5 and 6 are applied as written, not as I would
resolve the lint contradiction myself; I did not rename the shadowing `mode` parameter, and I did
not drop the `VENEER_GUIDE_PATH` import, because the brief names both exactly and this contract
reserves ancillary decisions to comment wording, list placement, and import ordering only — a
naming or an unused-symbol resolution is not among those. `npm run build:src`, the scoped browser
vitest run, `npm run test:setup`, `npm run test:conformance`, and `npm run test:guides` are not run,
because `npm run check` already reddens on the same file the lint denial names, and a later gate
would not change the ruling this stop is about.

**Hypothesis:** the brief's parenthetical for obligation 6 ("line 145's import … stay[s] because
the inventory names it") may have been written against a belief that `VENEER_GUIDE_PATH` still had
a code use inside `tests/setupStyles.test.ts` after the four-site rename, or against a different
no-unused-vars configuration than the one `.oxlintrc.json` and `tsconfig.json` carry here; the
`Object.keys(setup).sort()` inventory assertion at line 309 compares against string literals only
and does not read the import binding, so keeping the binding does not serve that assertion.
