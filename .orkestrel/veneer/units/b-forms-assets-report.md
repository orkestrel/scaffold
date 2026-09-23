# B-FORMS-ASSETS report

## Obligations and sites

1. **`$assets`.** `src/styles/_tokens.scss` around lines 153 to 167: removed the `'select-indicator'`
   and `'switch-knob'` entries; rewrote the doc comment to state the map now holds the image-valued
   dark variables whose component has not landed (`toggler-icon`, `accordion-icon`,
   `accordion-active-icon`), each declared in the dark scope with Bootstrap's own value until that
   component declares it on its own dark rule, as the check and select partials do for the knob and
   the caret.
2. **`COMPONENT_DARK_ASSETS`.** `tests/setupStyles.ts` directly after `THEME_DARK_ADDITIONS`: added
   `export const COMPONENT_DARK_ASSETS: readonly string[] = Object.freeze(['--bs-form-select-bg-img',
   '--bs-form-switch-bg'])` with the exact TSDoc named in the brief. `tests/setupStyles.test.ts`: added
   the `COMPONENT_DARK_ASSETS` import (alphabetical), the export-name row in the inventory list
   (alphabetical, beside `CLOSE_STATE_CASES`/`CONTAINER_CLASS_CASES`), and a freeze assertion beside
   `THEME_DARK_ADDITIONS`'s case: `it('freezes the component-owned dark assets and names each inside
   the Bootstrap dark scope', …)` asserting `Object.isFrozen(COMPONENT_DARK_ASSETS)` and that every
   name is in `BOOTSTRAP_DARK_VARIABLES`.
3. **The tokens case.** `tests/src/styles/tokens.test.ts`, case "re-declares every theme-dependent
   name inside each mode scope": the expected dark list now filters
   `[...BOOTSTRAP_DARK_VARIABLES, ...THEME_DARK_ADDITIONS].filter((name) =>
   !COMPONENT_DARK_ASSETS.includes(name)).sort()`, with a comment stating the component-owned assets
   are declared on the component's dark rule rather than the scope. Imported `COMPONENT_DARK_ASSETS`.
4. **The theme case.** `tests/src/styles/theme.test.ts`: retitled to "carries the unlanded
   components' dark assets in the dark scope alone and leaves the landed components' to their own
   rules"; reads `--bs-navbar-toggler-icon-bg` instead of `--bs-form-select-bg-img` (empty in light,
   a data URI under dark); asserts every name in `COMPONENT_DARK_ASSETS` reads `''` on the bare `div`
   under dark. Imported `COMPONENT_DARK_ASSETS` from `../../setupStyles.js`.
5. **The select proof.** `tests/src/styles/components/form-select.test.ts`: retitled the case to
   "paints the dark caret on the element inside a dark scope"; rewrote its comment to state the
   select's own rules declare the caret variable on the element in both modes, so a wrapper retuning
   the variable reaches neither mode's caret.
6. **The guide.** `guides/veneer.md`:
   - § Form select classes (around line 1084): "Both declarations sit on the element, so each
     outranks the value the dark theme scope also declares for that variable, and the component
     rules decide the caret in both modes." becomes "Both declarations sit on the element, and the
     dark theme scope declares nothing for that variable, so the component rules decide the caret in
     both modes."
   - § Bootstrap variables Veneer retains (around lines 2010 to 2016): the paragraph now names only
     `--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` as
     declared in the dark scope with Bootstrap's own value, keeping the closing sentence for the
     unlanded components; a new paragraph states `--bs-form-select-bg-img` and `--bs-form-switch-bg`
     are declared on the select's and switch's own dark rules by their partials, so a light island
     nested inside a dark one keeps the dark caret and knob as the release does.
   - § Form check classes (around line 1024): "a declaration on the control outranks any value a
     theme scope passes down to it" becomes "the theme scopes declare nothing for that variable, so
     the control's own rules decide the knob in both modes" (the `$dark` map no longer carries
     `switch-knob`, so no theme scope passes a value down).
   - Rewrapped at or under 100 columns.

## Unknown ruling

Grepped `until the component` and `theme scope` over `guides/veneer.md`. Hits at lines around 1525,
1949, 1997, 3468, 3613, 3826 concern `--bs-btn-close-filter`, state tokens, and unrelated theme-scope
references; none names `select-indicator` or `switch-knob`, so none is made false by this change and
none is rewritten. The hit at (originally) line 2005, "until the component that paints it lands its
canonical token," is under § Bootstrap variables Veneer retains and concerns the still-unlanded
carousel variables; it stays. The hit this unit rewrote is the "The dark scope declares
`--bs-form-select-bg-img` the same way…" sentence, replaced per obligation 6.

## Plant record

Obligation 4's plant: re-added `'select-indicator': '--bs-form-select-bg-img'` to `$assets` in
`_tokens.scss`, ran `npm run build:src` (exit 0), then the scoped browser run on
`tests/src/styles/theme.test.ts`. The retitled case reddened exactly on the new
`COMPONENT_DARK_ASSETS` assertion:

```
AssertionError: expected 'url("data:image/svg+xml,%3csvg xmlns=…' to be '' // Object.is equality
+ url("data:image/svg+xml,...select caret glyph...")
❯ tests/src/styles/theme.test.ts:140:78
```

Reversed the plant exactly (removed the re-added entry), ran `npm run build:src` (exit 0), and the
scoped run returned green: 6 passed (6).

## ROADMAP closing text

Returned verbatim, the "Theme-scope select caret and switch knob" row's closing text
(`ROADMAP.md` around line 376):

> B-FORMS-ASSETS (`builder` on Sonnet, per D26) removes `select-indicator` and `switch-knob` from
> `$assets` after B-FORMS-CHECK and B-FORMS-SELECT land their component-level dark rules, and
> amends every site the `select-indicator` removal makes false: the `tokens.test.ts` case
> `re-declares every theme-dependent name inside each mode scope` (its dark `--bs-*` comparison
> against `BOOTSTRAP_DARK_VARIABLES`); the `theme.test.ts` case `carries the dark-only component
> assets in the dark scope alone`; the `$assets` doc comment in `_tokens.scss`; the § Form select
> classes sentence "Both declarations sit on the element, so each outranks the value the dark
> theme scope also declares for that variable"; the § Bootstrap variables Veneer retains
> paragraph's sentence "The dark scope declares `--bs-form-select-bg-img` the same way"; and in
> `form-select.test.ts` the case title `paints the dark caret on the element inside a dark scope,
> over the one the theme scope declares` and its comment opening "The dark scope declares the caret
> variable on itself as well"; B-FORMS-CHECK's report names the `switch-knob` sites

## Gate exits

- `npx oxfmt --config .oxfmtrc.json --check` over the owned files: exit 0, "All matched files use
  the correct format."
- `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files: exit 0, no
  output (no warnings or errors).
- `npm run check`: exit 0 (`tsc --noEmit` across core, browser, styles, and app projects, no
  diagnostics printed).
- `npm run build:src`: exit 0; `dist/src/styles/index.css` rebuilt (136.87 kB).
- `npm run test:setup`: exit 1 at the suite level — 238 passed, 1 failed. The one failure is
  `tests/setupStyles.test.ts`'s pre-existing duplication-gate case ("repeats no partial's written
  declaration block in another partial beyond the coincidence floor"), which reports
  `_form-select.scss` and `_input-group.scss` sharing declarations under D40's still-unlanded
  `control-type`/`control-border` mixins. Confirmed pre-existing and unrelated to this unit by
  running the identical case (`npx vitest run --config vite.config.ts --no-cache --reporter=dot
  --project setup -t "repeats no partial"`) against the worktree's base commit through `git stash`:
  it fails identically before any of this unit's edits. `src/styles/components/**` is off-limits to
  this unit; see Deviations.
- `npm run test:conformance`: exit 0, 18 passed (18).
- `npm run test:guides`: exit 0, 18 passed (18).
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/tokens.test.ts tests/src/styles/theme.test.ts
  tests/src/styles/components/form-select.test.ts tests/src/styles/components/form-check.test.ts`:
  exit 0, 73 passed (73).

## `git status --porcelain`

```
 M guides/veneer.md
 M src/styles/_tokens.scss
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/form-select.test.ts
 M tests/src/styles/theme.test.ts
 M tests/src/styles/tokens.test.ts
```

Every listed file is an owned file. No file outside § Scope changed.

## Deviations

`npm run test:setup` exits non-zero because of one pre-existing failure in
`tests/setupStyles.test.ts`'s duplication-gate case, caused by `_form-select.scss` and
`_input-group.scss` sharing declarations that D40's `control-type`/`control-border` mixins (carried
by B-FORMS-MIXIN and the CONTROL fix round) have not yet consolidated. Confirmed pre-existing per the
`git stash` comparison above; the affected files (`src/styles/components/_form-select.scss`,
`src/styles/components/_input-group.scss`) are off-limits to this unit, and the fix belongs to
B-FORMS-MIXIN's carrier per D40. No other deviation: the tokens and theme cases reddened for the
expected reason only, the plant reddened as expected, and no gate named a file outside § Scope.
