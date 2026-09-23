# Unit B-FORMS-MIXIN report

## Obligations, with site

1. **The mixins.** `src/styles/_mixins.scss`, after the `border-reset` mixin: added `@mixin
   control-type` (`font-size: var(--vn-size-3); font-weight: var(--vn-weight-body); line-height:
   var(--vn-line-body); color: var(--bs-body-color);`) and `@mixin control-border` (`border:
   var(--bs-border-width) solid var(--bs-border-color); border-radius: var(--bs-border-radius);`),
   each with a comment stating what it emits and why, in the file's existing TSDoc-style comment
   form.
2. **The partials.** `src/styles/components/_form-select.scss`, `.form-select`: the four type
   declarations replaced by `@include control-type;` at the same position, the two border
   declarations replaced by `@include control-border;` at the same position. No other declaration
   touched. `src/styles/components/_input-group.scss`, `.input-group-text`: the same two
   substitutions at the same position. That partial carried no `@use '../mixins'`, so one was added
   at the top of the file (`@use '../mixins' as *;`) to reach the new mixins; no other file needed
   this because `_form-select.scss` already used it.
3. **Byte identity.** Baseline: `tmp/units/bfm-baseline.css` (5331 lines) taken before any edit.
   After obligations 1 and 2: `cmp` against the baseline exits `0`. Control: swapped the order of
   the two declarations inside `control-border` (`border-radius` before `border`), recompiled to
   `tmp/units/bfm-control.css`, `cmp` against the baseline exits `1` (first difference at char
   103065, line 3378). Reverted by the exact reverse edit (restored `border` before
   `border-radius`), recompiled, `cmp` against the baseline exits `0` again. Re-ran the byte-identity
   compile once more after the `oxfmt --write` pass (obligation 4): `cmp` exits `0`.
4. Ran `npx oxfmt --config .oxfmtrc.json --write` over the three owned files: no rewrite needed
   (formatting already matched); the following `--check` also exits `0`.

## Unknown's hits and rulings

Grepped `font-weight\|line-height\|border-radius` in `guides/veneer.md`. No hit in either § Form
select classes or § Input group classes describes the type or border declarations by their written
form in the partial. The only hits touching `.form-select` and `.input-group-text` are ledger rows
(around lines 3208-3211 and 3256-3259) that state property, selector, and the token each
declaration reads (for example `font-weight` → `.form-select` → `var(--vn-weight-body)`). Moving the
declaration into `@include control-type;` or `@include control-border;` does not change the
property, the selector, or the token value the ledger row names, so no row goes false. No hit names
`border-radius` for `.form-select` or `.input-group-text` at all (confirmed by a follow-up grep for
`form-select.*border-radius|input-group-text.*border-radius|border.*form-select|border.*input-group-text`,
which returned no matches). No guide patch is needed.

## Gate exits, with counts

- `npx oxfmt --config .oxfmtrc.json --check` over the three owned files: exit `0` ("All matched
  files use the correct format.").
- `npm run build:src`: exit `0` (core, browser, and styles builds each succeeded;
  `dist/src/styles/index.css` emitted).
- `npm run test:setup`: exit `0`, 4 test files passed, 238 tests passed. The duplication-floor case
  ("repeats no partial's written declaration block in another partial beyond the coincidence
  floor") is in this run and passed, closing the standing red condition.
- `npm run test:conformance`: exit `0`, 1 test file passed, 18 tests passed.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/form-select.test.ts tests/src/styles/components/input-group.test.ts`:
  exit `1`. 2 test files, 31 passed, 1 failed:
  `tests/src/styles/components/input-group.test.ts:243` ("squares the control or select inside a
  floating wrapper on the side its neighbour sits"), asserting `expect(selected).toBe(round)` with
  `round` measured at `7` and `selected` at `6`. Re-ran that single case alone (`-t` filter): same
  result, so it is not a one-off flake under load.

## Deviation

Stopping to report per § Deviation protocol on the browser-run failure above, which is outside
this unit's scope to fix.

- **Expected.** The scoped browser run (`form-select.test.ts`, `input-group.test.ts`) to exit `0`,
  per Acceptance criterion 3. The brief's only named standing red condition was the duplication-floor
  case in `test:setup`.
- **Found.** `input-group.test.ts:243` fails on a border-radius pixel measurement (`round` `7` vs.
  `selected` `6`) inside a floating-wrapper corner-squaring case, unrelated on its face to the two
  mixins this unit added.
- **Exact evidence.** The compiled CSS this unit produces is byte-identical to the pre-edit
  baseline: `cmp tmp/units/bfm-baseline.css tmp/units/bfm-after.css` exits `0` both immediately
  after the substitution (obligation 3) and again after the `oxfmt --write` pass. Because the
  stylesheet driving the browser's layout and the assertion is unchanged byte-for-byte, the DOM this
  test measures is identical to what a pre-edit tree would render, so this failure's cause cannot be
  a difference this unit's edit introduced.
- **Done or not done.** Obligations 1 through 4 are done, verified, and byte-identity-proven.
  Acceptance criteria 1, 2, and 4 are met. Acceptance criterion 3 is met for `build:src`,
  `test:setup`, and `test:conformance`, and not met for the scoped browser run, for the reason
  stated.
- **Hypothesis.** A pre-existing browser-measurement discrepancy in the floating-wrapper
  corner-squaring case (`input-group.test.ts:243`) that the byte-identical CSS proves predates this
  unit's edit and was not named as a standing condition in the brief.

## `git status --porcelain`

```
 M src/styles/_mixins.scss
 M src/styles/components/_form-select.scss
 M src/styles/components/_input-group.scss
```

Exactly the three owned files; nothing else.
