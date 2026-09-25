# Unit E-ID-ANCHOR round 4 report

## Item 1 — `src/styles/components/_dropdown.scss`

Before:

```
// A menu the engine promotes to the top layer computes `position-visibility: anchors-visible`
// while it is open, on Chromium 141 and 153. Neither then paints a menu whose toggle a scroll
// container clips entirely, except Chromium 141 when a pointer press on the toggle opened the
// menu, because the engine does not anchor that menu there. The rule sits in the `components`
// layer and declares nothing important, so a class of your own in a later layer, or in none,
// overrides it without a specificity contest.
```

After:

```
// A menu the engine promotes to the top layer computes `position-visibility: anchors-visible`
// while it is open, on Chromium 141 and 153. Neither then paints a menu whose toggle a scroll
// container clips entirely, except Chromium 141 when the engine showed the menu after a trusted
// pointer press on its toggle, because the engine does not anchor that menu there. The rule sits
// in the `components` layer and declares nothing important, so a class of your own in a later
// layer, or in none, overrides it without a specificity contest.
```

## Item 2 — `guides/veneer.md` Dropdown classes paragraph

Before:

```
A menu the engine promotes to the top layer computes the `position-visibility: anchors-visible`
value while it is open, through the `:where(.dropdown-menu):popover-open` rule, and the initial
value while it is closed. The initial value is `anchors-visible` on Chromium 153 and `always` on
Chromium 141, so the open menu computes the same value on both builds. Under that value neither
Chromium 141 nor Chromium 153 paints an open menu whose toggle a scroll container clips entirely,
except Chromium 141 when a pointer press on the toggle opened the menu, because the engine does not
anchor that menu there. The `anchor-visibility` mixin in the `src/styles/_mixins.scss` file writes
the rule, and the tooltip and popover partials include the same mixin. The rule sits in the
`components` layer and declares nothing important, so a class of your own in a later layer, or in
none, that names the `position-visibility` property overrides the rule without a specificity
contest. § Additions records the rule and its declaration.
```

After:

```
A menu the engine promotes to the top layer computes the `position-visibility: anchors-visible`
value while it is open, through the `:where(.dropdown-menu):popover-open` rule, and the initial
value while it is closed. The initial value is `anchors-visible` on Chromium 153 and `always` on
Chromium 141, so the open menu computes the same value on both builds. Under that value neither
Chromium 141 nor Chromium 153 paints an open menu whose toggle a scroll container clips entirely,
except Chromium 141 when the engine showed the menu after a trusted pointer press on its toggle,
because the engine does not anchor that menu there. The `anchor-visibility` mixin in the
`src/styles/_mixins.scss` file writes the rule, and the tooltip and popover partials include the
same mixin. The rule sits in the `components` layer and declares nothing important, so a class of
your own in a later layer, or in none, that names the `position-visibility` property overrides the
rule without a specificity contest. § Additions records the rule and its declaration.
```

## Item 3 — `guides/veneer.md` § Tokens › § Additions, both `dropdown` popover rows

Before (both rows carried the same Reason cell):

```
The open menu computes `anchors-visible` on Chromium 141 and 153. Neither paints it while a scroll container clips its toggle entirely, except Chromium 141 when a pointer press opened it, which the engine leaves unanchored.
```

After (both rows carry the same Reason cell):

```
The open menu computes `anchors-visible` on Chromium 141 and 153. Neither paints it while a scroll container clips its toggle entirely, except Chromium 141 when shown after a trusted pointer press on the toggle, unanchored.
```

Row lengths (characters, after `oxfmt`):

- `dropdown` / `:where(.dropdown-menu):popover-open` row (changed, selector row): 716
- `dropdown` / `:where(.dropdown-menu):popover-open { position-visibility }` row (changed, declaration row): 718
- `dropdown` / `:where(button.dropdown-item) { transition }` row (unchanged, declaration row, immediately preceding): 718
- `nav` / `:where(button.nav-link)` row (unchanged, selector row, immediately following): 716

Each changed row's length equals its unchanged neighbor of the same row kind (selector vs.
declaration).

## Gate table

| Gate | Command | Log | Exit |
| --- | --- | --- | --- |
| format | `npm run format:check` (run as `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check .`; the local `npm` binaries available in this environment are all below the `devEngines.packageManager` floor of `>=11.6.0` this package declares, so `npm run` itself refuses to start and the underlying command ran directly) | `tmp/units/r4/anchor-format.log.txt` | 0 |
| lint | `npm run lint:check` (run as `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings .`, same `npm` floor reason) | `tmp/units/r4/anchor-lint.log.txt` | 0 |
| test:guides | `npm run test:guides` (run as `node --experimental-strip-types tests/guides.test.ts`, same `npm` floor reason) | `tmp/units/r4/anchor-test-guides.log.txt` | 0 |
| test:policy | `npm run test:policy` (run as `./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project policy`, same `npm` floor reason) | `tmp/units/r4/anchor-test-policy.log.txt` | 0 |

All four gates exit `0`.

## Diff

See `tmp/units/r4/anchor-4.diff` (`git diff ebce3fe`). It touches only `guides/veneer.md` and
`src/styles/components/_dropdown.scss`, exactly the three quoted texts, and no other line.

## Status

See `tmp/units/r4/anchor-4-status.txt`. Working tree shows only `guides/veneer.md` and
`src/styles/components/_dropdown.scss` modified, nothing staged, nothing untracked.
