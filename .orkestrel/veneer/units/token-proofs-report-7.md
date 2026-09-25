# Unit TOKEN-PROOFS round 7 report

## Items 1-6: before and after

**Item 1** (`guides/veneer.md`, § Customization opening paragraph).
Before: "an element inside it that declares the token again gives its own subtree that value."
After: "an element inside it that declares the token again, such as a `[data-bs-theme]` element
whose mode scope declares it, gives its own subtree that value."

**Item 2** (list, first item).
Before: "An override on the root element, in a `:root` rule or any rule that matches the root,
reaches every rule, tier, and alias that reads the token, except inside a `[data-bs-theme]`
element below the root whose mode scope declares that token again."
After: "An override on the root element, in a `:root` rule or any rule that matches the root,
reaches every rule, tier, and alias that reads the token."

**Item 3** (list, fourth item).
Before: "An override of a `--bs-*` alias works the same way: the validation rules follow an
override of their aliases on an ancestor, except inside a `[data-bs-theme]` element whose mode
scope declares those aliases again."
After: "An override of a `--bs-*` alias works the same way: the validation rules follow an
override of their aliases on an ancestor."

**Item 4** (`tests/src/styles/tokens.test.ts`, comment above `describe('ancestor token
overrides')`).
Before: "and a rule reading that alias follows it from an ancestor, except inside a mode scope
that declares it again."
After: "and a rule reading that alias follows it from an ancestor, except inside a mode scope
below that ancestor that declares it again."

**Item 5** (comment above the scope case).
Before: "A document-element override reaches both, except inside a mode scope that re-declares
the token itself, and a root-only alias follows it where the document element carries a mode,
because the alias resolves on that same element."
After: "A document-element override reaches both whether or not the document element carries a
mode, because the override wins over that element's own mode scope, and a mode scope below it
that re-declares the token keeps its own value."

**Item 6** (scope case's last block).
Before: the block ended after the radius override assertions, with `finally` removing only the
radius property; the case title read "...and moves a root-only alias from a document element
that carries a mode".
After: inside the same `try`, after the radius assertions, the block now asserts `#outside` reads
`--bs-primary` as the earlier `primary` value, sets `TOKEN_NAMES.color.primary.base` to
`rgb(4, 5, 6)` on `document.documentElement`, asserts `#outside` then reads `--bs-primary` as
`rgb(4, 5, 6)`, and asserts `#held` still reads `primary`; `finally` now removes the primary
property beside the radius property. The title now reads "...and moves a mode alias and a
root-only alias from a document element that carries a mode".

## Item 7: plant reading

Read from the built stylesheet: the light mode scope (`[data-bs-theme=light]` in
`dist/src/styles/index.css`) sets `--vn-color-primary-base:oklch(48% .255 264)`, and `--bs-primary`
resolves through `var(--vn-color-primary-base)` in every scope. Appended to `src/styles/_theme.scss`
inside `@layer theme`:

```scss
:root[data-bs-theme] {
	--bs-primary: oklch(48% .255 264);
}
```

`:root[data-bs-theme]` outranks `[data-bs-theme='light']` by specificity on the document root once
it carries `data-bs-theme`, so the literal wins there and the inline override of
`--vn-color-primary-base` no longer reaches `--bs-primary` on that element. `#held`'s ancestor
`<div data-bs-theme>` is not the document root, so it is unaffected.

Result: `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts
-t "moves a mode-scope alias"` failed with
`AssertionError: expected 'oklch(48% .255 264)' to be 'rgb(4, 5, 6)'` at the new
`expect(readToken(outside, '--bs-primary')).toBe('rgb(4, 5, 6)')` line, while every earlier
assertion in the case held (1 failed, 45 skipped by the `-t` filter, no other failures). Restored
`src/styles/_theme.scss` byte-identically (`diff` against the pre-plant backup empty; `git diff
--stat -- src/styles/_theme.scss` empty) and rebuilt (`npm run build:src:styles` exit 0). Full log:
`tkp-instruments/r7/tkp-7-plant-root-primary.log.txt`.

## Gate table

| Gate | Command | Exit | loadavg |
| --- | --- | --- | --- |
| format | `oxfmt --config .oxfmtrc.json guides/veneer.md tests/src/styles/tokens.test.ts --check` | 0 | 15.12 11.03 9.85 |
| check | `npm run check` | 0 | 20.55 16.57 12.56 |
| lint:check | `npm run lint:check` | 0 | 19.63 16.60 12.65 |
| build:src:styles | `npm run build:src:styles` | 0 | 18.01 16.43 12.68 |
| vitest tokens | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` | 0 (46 passed) | 19.42 16.97 12.98 |
| test:guides | `npm run test:guides` | 0 (20 passed) | 16.91 16.58 12.98 |
| test:policy (observation) | `npm run test:policy` | 0 (109 passed, 1 skipped) | 16.93 16.60 13.05 |

Logs: `tkp-instruments/r7/tkp-7-oxfmt-check.log.txt`, `tkp-instruments/r7/tkp-7-check.log.txt`,
`tkp-instruments/r7/tkp-7-lint.log.txt`, `tkp-instruments/r7/tkp-7-buildstyles.log.txt`,
`tkp-instruments/r7/tkp-7-vitest.log.txt`, `tkp-instruments/r7/tkp-7-guides.log.txt`, `tkp-instruments/r7/tkp-7-policy.log.txt`,
plus the plant's own build/run/restore-build logs folded into
`tkp-instruments/r7/tkp-7-plant-root-primary.log.txt`.

## Diffs and status

- `tkp-7.diff` — `git diff 2376710` (566 lines, rounds 1-7).
- `tkp-instruments/r7/tkp-7-delta.diff` — this round alone, against the pre-edit backups
  (`tkp-instruments/r7/tkp-7-veneer.md.bak`, `tkp-instruments/r7/tkp-7-tokens.test.ts.bak`).
- `tkp-instruments/r7/tkp-7-status.txt` — `git status --short`:
  ```
   M guides/veneer.md
   M tests/src/styles/tokens.test.ts
  ```

## Deviations

None. Every Evidence reading matched the tree before editing.
