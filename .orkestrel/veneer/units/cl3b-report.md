# Unit CL3b report — the muted text and raised surface tokens

Effective brief: `cl3b-brief-2.md` over `cl3b-brief.md`. Writer: `opus` on
native Opus 5, sole writer in `C:/Users/mikes/WebstormProjects/veneer`, base `9bb306e`, tracked
tree clean at dispatch. Date: 2026-09-21. Nothing committed, pushed, or discarded.

## Item 1 — the anchor hazard, measured

Instrument: a temporary reading in `tests/src/styles/tokens.test.ts` that paints every
`--vn-color-{role}-{tier}` inside a dark island and prints the resolved `color` each one computes
to, plus `--vn-surface-raised`, plus the `--bs-primary-border-subtle` reading taken after loading
`CUSTOMIZATION_RECIPE` — the scenario `tests/src/styles/integration.test.ts:92` asserts. Command:
`npm run test:src:styles`. The reading is removed; see § Plants.

Readings taken at three states. The `subtle`, `emphasis`, and `base` tiers of every role are
identical in all three, so only the `border` tiers and the raised surface are tabulated.

| Reading | At `9bb306e` | Record raised, anchor unpinned | Record raised, anchor pinned |
| --- | --- | --- | --- |
| `primary-border` | `oklab(0.4675 -0.0467086 -0.0662046)` | `oklab(0.4825 -0.0468296 -0.0666897)` | `oklab(0.4675 -0.0467086 -0.0662046)` |
| `secondary-border` | `oklab(0.3405 -0.00630614 -0.0272793)` | `oklab(0.3555 -0.0064271 -0.0277645)` | `oklab(0.3405 -0.00630614 -0.0272793)` |
| `tertiary-border` | `oklab(0.388 0.0533456 -0.135629)` | `oklab(0.403 0.0532246 -0.136114)` | `oklab(0.388 0.0533456 -0.135629)` |
| `success-border` | `oklab(0.381 -0.0683028 0.0321127)` | `oklab(0.396 -0.0684237 0.0316276)` | `oklab(0.381 -0.0683028 0.0321127)` |
| `info-border` | `oklab(0.3675 -0.0322511 -0.0658705)` | `oklab(0.3825 -0.032372 -0.0663557)` | `oklab(0.3675 -0.0322511 -0.0658705)` |
| `warning-border` | `oklab(0.395 0.0518985 0.0552)` | `oklab(0.41 0.0517775 0.0547149)` | `oklab(0.395 0.0518985 0.0552)` |
| `danger-border` | `oklab(0.37 0.0928787 0.042899)` | `oklab(0.385 0.0927578 0.0424138)` | `oklab(0.37 0.0928787 0.042899)` |
| `light-border` | `oklab(0.608316 -0.00187217 -0.00708771)` | `oklab(0.623316 -0.00199313 -0.00757286)` | `oklab(0.608316 -0.00187217 -0.00708771)` |
| `dark-border` | `oklab(0.248545 -0.00333013 -0.0107112)` | `oklab(0.263545 -0.00345109 -0.0111963)` | `oklab(0.248545 -0.00333013 -0.0107112)` |
| `--vn-surface-raised` | `oklch(0.235 0.013 256)` | `oklch(0.265 0.014 256)` | `oklch(0.265 0.014 256)` |
| `integration.test.ts:92` scenario | `oklab(0.476742 -0.0595026 0.034441)` | `oklab(0.491742 -0.0596236 0.0339558)` | `oklab(0.476742 -0.0595026 0.034441)` |

Unpinned reading, `npm run test:src:styles`: `Test Files 2 failed, 28 passed (30)`,
`Tests 2 failed, 157 passed (159)` — `integration.test.ts:68` and the `CALIBRATED_TIERS` proof in
`tokens.test.ts:69`. Pinned reading, same command: `Test Files 30 passed (30)`,
`Tests 159 passed (159)`. The counts include the temporary reading's own tests.

**Ruling taken: the pin branch**, as brief 2 directs. `$dark`'s `anchor` key
(`src/styles/_tokens.scss:75`) now holds the literal `oklch(0.235 0.013 256)` instead of
`var(--vn-surface-raised)`.

The dark anchor and the dark raised surface are now separate values. The anchor is the mix base
every dark role tier is calibrated against, from U7's accepted Button portfolio, and it keeps the
value those tiers were read on. The raised surface is a Content value the calibration record fixes
at `oklch(0.265 0.014 256)`. Keeping them as one token would have moved every dark role border tier
by the difference between the two. The reason is recorded in the map beside the key.

`tests/src/styles/integration.test.ts` was neither edited nor needed: its line 92 reading is
byte-identical before and after.

## The tokens

| Token | Light | Dark | Home | Registry leaf | Proof | Guide row |
| --- | --- | --- | --- | --- | --- | --- |
| `--vn-text-muted` | `oklch(0.446 0.043 257.281)` | `oklch(0.704 0.04 256.788)` | `$light`/`$dark` `muted` key; emitted in `theme-tokens` beside `--vn-text-tertiary` | `TOKEN_NAMES.text.muted` | `tokens.test.ts` › `content calibration tokens` › resolves the muted text and the raised surface | § Tokens, Text and surface, new row, source `elements` |
| `--vn-surface-raised` | `oklch(0.968 0.007 247.896)` | `oklch(0.265 0.014 256)` | `$light`/`$dark` `raised` key, retuned | `TOKEN_NAMES.surface.raised`, unchanged | the same proof | § Tokens, Text and surface, values and source cell restated |
| `--vn-surface-code` | `color-mix(in oklab, var(--vn-text-body-base) 12%, transparent)` | the same expression | moved from the emitter literal into the `surface-code` key of both maps; the emitter reads `map.get($values, 'surface-code')` | `TOKEN_NAMES.surface.code`, unchanged | `tokens.test.ts` › `code calibration tokens`, unchanged and green | § Tokens row unchanged; the value did not move |
| `--vn-font-mono-base` | `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace` | the same | `:root` in `_tokens.scss`; renamed from `--vn-font-mono` | `TOKEN_NAMES.font.mono.base` | read through `code-text` by the code, keyboard, preformatted, and sample proofs | § Tokens, Type, row renamed, value and alias unchanged |
| `--vn-font-mono-short` | `SFMono-Regular, Menlo, monospace` | the same | `:root` in `_tokens.scss` | `TOKEN_NAMES.font.mono.short` | `tokens.test.ts` › `content calibration tokens` › resolves the shorter monospace stack and the code block rhythm | § Tokens, Type, new row, source `elements`, alias `none` |
| `--vn-line-code` | `1.6` | the same | `:root` in `_tokens.scss`, beside `--vn-line-body` and `--vn-line-heading` | `TOKEN_NAMES.line.code` | the same proof | § Tokens, Type, folded into the line-height row |

### Why `font.mono` became a group

`--vn-font-mono-short` cannot be a flat leaf. `tests/src/core/index.test.ts` › `names every leaf for
the path it sits at` requires every leaf's value to equal `--vn-` plus its registry path joined with
`-`, so a `mono-short` name needs `font.mono` to be a group. `guides/veneer.md` § Tokens states the
same law and states its consequence: "A group's own value takes the `base` member and the `-base`
suffix with it." So `--vn-font-mono` becomes `--vn-font-mono-base` and the shorter stack sits beside
it. `.claude/rules/names.md` prescribes grouping as the remedy when one word is insufficient, which
agrees.

Every consumer moved in the same change, all inside owned files: the `code-text` mixin, the
`--bs-font-monospace` alias declaration (value unchanged), the registry, the § Tokens row, and one
TSDoc sentence in `tests/setupStyles.ts` that names the token the alias answers. No test asserts the
old name as a string.

The short stack holds the retained families and the consumer writes the leading `ui-monospace`, the
convention `code-text` already follows, so the two siblings carry the same kind of value. The
rendered result on `var` is `ui-monospace, SFMono-Regular, Menlo, monospace`, the record's row.

### Why `line.code` rather than a tag name

`text.code` and `surface.code` already make `code` this registry's word for the code family, and
`pre` is a member of it. The inline code tags take `--vn-line-body` at their reduced size; the
preformatted block takes the looser rhythm. The guide row says so.

## The rebound members

Each reading is `readStyle` on the resolved property, light and dark, from the built cascade.

| Member | Property | Before | After | Record row |
| --- | --- | --- | --- | --- |
| `address` | `color` | body text `oklch(0.208 0.042 265.755)` / `oklch(0.929 0.013 255.508)` | `oklch(0.446 0.043 257.281)` / `oklch(0.704 0.04 256.788)` | `address` › `color` |
| `dl` › `dd` | `color` | inherited body text | `oklch(0.446 0.043 257.281)` / `oklch(0.704 0.04 256.788)` | `list-dl-dd` › `color` |
| `pre` | `background-color` | `rgba(0, 0, 0, 0)` | `oklch(0.968 0.007 247.896)` / `oklch(0.265 0.014 256)` | `pre` › `background-color` |
| `pre` | `line-height` | `19.6px` from the literal `1.6` | `19.6px` from `var(--vn-line-code)` | `pre` › `line-height` |
| `samp` | `background-color` | `rgba(0, 0, 0, 0)` | `oklch(0.968 0.007 247.896)` / `oklch(0.265 0.014 256)` | `samp` › `background-color` |
| `var` | `background-color` | `rgba(0, 0, 0, 0)` | `oklch(0.968 0.007 247.896)` / `oklch(0.265 0.014 256)` | `var` › `background-color` |
| `var` | `font-family` | `ui-monospace, SFMono-Regular, Menlo, monospace` from a literal stack | the same rendering from `ui-monospace, var(--vn-font-mono-short)` | `var` › `font-family` |
| `code`, `kbd` | `border-start-start-radius` | `4px`, read by nothing | `4px`, pinned by the case table | no record row; the value is Veneer's own `--vn-radius-small` |
| `pre` | `border-start-start-radius` | `6px`, read by nothing | `6px`, pinned by the case table | no record row; the value is Veneer's own `--vn-radius-base` |

Case tables grown in `tests/setupStyles.ts`: `TEXT_ADDRESS_CASES` (the muted colour replaces the
body colour), `TEXT_DL_CASES` (a `muted` field for the description), `TEXT_PRE_CASES`,
`TEXT_SAMP_CASES`, `TEXT_VAR_CASES` (each trades the transparent `background-color` row for a
`background` field the proof reads through `matchesColor`), and `TEXT_CODE_CASES`,
`TEXT_KBD_CASES`, `TEXT_PRE_CASES` (a `radius` field). No export was added or removed, so
`tests/setupStyles.test.ts`'s inventory assertion is unchanged and that file is untouched.

The calibration record carries no radius row for any tag, so the radius rows pin Veneer's own
shipped values, read the way `tests/src/styles/components/button.test.ts` reads one
(`readPixels(element, 'border-start-start-radius')`).

## Red then green

Command for every pair: `npm run test:src:styles`. Restored green after each:
`Test Files 30 passed (30)`, `Tests 162 passed (162)`.

Each plant was reverted and the suite re-run green after it.

**The anchor hazard (item 1).** Planted: the record's raised values with `$dark`'s `anchor` still
reading `var(--vn-surface-raised)`. Red: `Test Files 2 failed, 28 passed (30)`;
`Tests 2 failed, 157 passed (159)` — `integration.test.ts:68` and `tokens.test.ts:69`.

**Muted binding.** Planted: `_address.scss` and `_dl.scss` › `dd` read `var(--vn-text-body-base)`.
Red: `Test Files 2 failed, 28 passed (30)`; `Tests 4 failed, 158 passed (162)` — `address.test.ts`
and `dl.test.ts`, light and dark.

**Raised, rhythm, and stack bindings.** Planted: `_pre.scss`, `_samp.scss`, and `_var.scss`
backgrounds read `var(--vn-surface-code)`; `_pre.scss` line height reads `var(--vn-line-body)`;
`_var.scss` family reads `var(--vn-font-mono-base)`. Red: `Test Files 3 failed, 27 passed (30)`;
`Tests 6 failed, 156 passed (162)` — `pre.test.ts`, `samp.test.ts`, and `var.test.ts`, light and
dark.

**Radius deletion (item 6).** Planted: `border-radius` deleted from the `code-surface` mixin and
from `_pre.scss`. Red: `Test Files 3 failed, 27 passed (30)`; `Tests 6 failed, 156 passed (162)` —
`code.test.ts`, `kbd.test.ts`, and `pre.test.ts`, light and dark.

**Token values.** Planted: `$light` `muted` set to the body text, `$light` `raised` set to its old
value, `--vn-font-mono-short` shortened, `--vn-line-code` set to `1.5`. Red:
`Test Files 6 failed, 24 passed (30)`; `Tests 10 failed, 152 passed (162)` — the two new
`content calibration tokens` cases plus the members that read those tokens.

**The anchor again, against the new proof.** Planted: `$dark`'s `anchor` set back to
`var(--vn-surface-raised)`. Red: `Test Files 2 failed, 28 passed (30)`;
`Tests 3 failed, 159 passed (162)` — `integration.test.ts:68`, the `CALIBRATED_TIERS` proof, and
`content calibration tokens` › leaves the dark role border tiers on the anchor.

## Plants

Every plant is removed. Two kinds were used and both are gone.

- The item 1 reading block (`describe('CL3B measurement plant', …)` and its `CUSTOMIZATION_RECIPE`
  import) was appended to `tests/src/styles/tokens.test.ts` and deleted after the final reading.
  `grep -rn "CL3B\|console\.log" tests/ src/` returns only the pre-existing TSDoc example at
  `src/browser/helpers.ts:30`, which this unit did not touch.
- Each red-then-green plant was applied and reverted in place. One revert failed mid-run: the radius
  deletion could not be undone by the reverting script, because its forward direction removed text
  and the reverse had nothing to match. It was repaired by hand in the same turn, and the two
  following plant readings were discarded and re-run on the repaired tree, which is why their
  failing sets in the preceding table are the clean ones. `git diff --stat` after the repair is
  byte-identical to the pre-plant diffstat (174 insertions, 64 deletions).

## Guide rows corrected

All inside § Tokens.

- **Role tier table, the `--vn-color-{role}-border` dark expression.** Was
  `color-mix(in oklab, {fill} 50%, var(--vn-surface-raised))`; now
  `color-mix(in oklab, {fill} 50%, oklch(0.235 0.013 256))`.
- **The paragraph after that table.** Gained the sentence naming why the dark tier mixes against a
  literal and where `src/styles/_tokens.scss` holds it.
- **Text and surface table.** New `--vn-text-muted` row. The `--vn-surface-raised` row takes the
  record's values, and its `Source` cell now names the code block, sample, and variable surface
  rather than the popover and drawer.
- **The paragraph after that table.** Restated for what reads the raised surface, and gained a
  paragraph separating `--vn-text-muted` from `--vn-text-secondary`, which answers
  `--bs-secondary-color` and is what Bootstrap's `.text-muted` class reads.
- **Type table.** `--vn-font-mono` row renamed to `--vn-font-mono-base` with its stack written out
  and its `Source` corrected from "no Elements specimen renders code" to the code family's own
  stack, which the content record measures. New `--vn-font-mono-short` row. The line-height row now
  carries `--vn-line-code`.
- **§ Departures from Bootstrap.** The agreement sentence now names `--vn-font-mono-base` beside
  `--vn-line-heading` and `--vn-radius-base`.

No § Departures row closed, because none existed for these values: CL3 recorded the muted text and
the raised surfaces as comments in the proofs, not as guide rows. Those comments are restated in
`address.test.ts`, `dl.test.ts`, `pre.test.ts`, `samp.test.ts`, and `var.test.ts` to describe what
each proof now reads. § Compatibility is untouched.

## Gates

Chromium, in the brief's order.

| Gate | Exit | Final line |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | no diagnostics |
| `npm run build` | 0 | `✓ built in 438ms` |
| `npm run test:src:core` | 0 | `Tests 8 passed (8)` |
| `npm run test:src:styles` | 0 | `Tests 162 passed (162)` |
| `npm run test:setup` | 0 | `Tests 126 passed (126)` |
| `npm run test:conformance` | 0 | `Tests 8 passed (8)` |
| `npm run test:app:browser` | 0 | `Tests 13 passed (13)` |
| `npm run test:journey` | 0 | `Tests 84 passed, 4 skipped (88)` |
| `npm run test:guides` | 0 | `Tests 18 passed (18)` |
| `npm run test:policy` | 0 | `Tests 109 passed, 1 skipped (110)` |

Edge.

| Gate | Exit | Final line |
| --- | --- | --- |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Tests 162 passed (162)` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser` | 0 | `Tests 13 passed (13)` |

Run outside the brief's list, as observations, each exit 0: `npm run test:src:browser`
(`Test Files 6 passed (6)`), `npm run test:setup:browser` (`Test Files 1 passed (1)`),
`npm run test:config` (`Test Files 1 passed (1)`). They read `src/core/constants.ts` and the built
cascade, so the registry rename would have surfaced there.

The styles suite grew from `157 passed (157)` at `9bb306e` to `162 passed (162)`: the two new
`content calibration tokens` cases run in light and dark, and the anchor separation proof runs once.

## Diffstat and status

```text
 guides/veneer.md                          | 50 ++++++++++++++----------
 src/core/constants.ts                     |  7 +++-
 src/styles/_mixins.scss                   |  5 ++-
 src/styles/_tokens.scss                   | 19 ++++++---
 src/styles/elements/_address.scss         |  1 +
 src/styles/elements/_dl.scss              |  1 +
 src/styles/elements/_pre.scss             |  3 +-
 src/styles/elements/_samp.scss            |  1 +
 src/styles/elements/_var.scss             |  3 +-
 tests/setupStyles.ts                      | 14 ++++---
 tests/src/styles/elements/address.test.ts |  2 +-
 tests/src/styles/elements/code.test.ts    |  5 ++-
 tests/src/styles/elements/dl.test.ts      | 39 +++++++++++--------
 tests/src/styles/elements/kbd.test.ts     |  5 ++-
 tests/src/styles/elements/pre.test.ts     |  8 ++--
 tests/src/styles/elements/samp.test.ts    |  5 ++-
 tests/src/styles/elements/var.test.ts     |  5 ++-
 tests/src/styles/tokens.test.ts           | 65 +++++++++++++++++++++++++++++++
 18 files changed, 174 insertions(+), 64 deletions(-)
```

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/elements/_address.scss
 M src/styles/elements/_dl.scss
 M src/styles/elements/_pre.scss
 M src/styles/elements/_samp.scss
 M src/styles/elements/_var.scss
 M tests/setupStyles.ts
 M tests/src/styles/elements/address.test.ts
 M tests/src/styles/elements/code.test.ts
 M tests/src/styles/elements/dl.test.ts
 M tests/src/styles/elements/kbd.test.ts
 M tests/src/styles/elements/pre.test.ts
 M tests/src/styles/elements/samp.test.ts
 M tests/src/styles/elements/var.test.ts
 M tests/src/styles/tokens.test.ts
```

Every path is in the brief's owned set. `tests/src/styles/integration.test.ts` and
`tests/setupStyles.test.ts` are unchanged. This report sits at `cl3b-report.md`, which
git ignores, so it carries no status row. `guides/veneer.md` and
`tests/src/styles/elements/dl.test.ts` were rewritten by
`npx oxfmt --config .oxfmtrc.json --write` scoped to those two paths, the granted scoped formatter;
no tree-wide `format` was run.

## Ancillary choices settled inside scope

- **The `font.mono` group and the `--vn-font-mono-base` rename.** Reason and blast radius under
  § Why `font.mono` became a group. The value, the alias, and the rendered stack are unchanged.
- **`--vn-line-code` rather than a tag-named token.** Reason under § Why `line.code` rather than a
  tag name.
- **`background-color: var(--vn-surface-raised)` stays inline in `_pre.scss`, `_samp.scss`, and
  `_var.scss`.** `.claude/rules/styles.md` moves a pattern shared by partials into `_mixins.scss`,
  and `AGENTS.md` refuses a wrapper that adds no boundary, invariant, or composition. One
  declaration is not a pattern: `code-surface` earns its mixin by carrying a surface and a corner
  together. A mixin here would only rename the token.
- **Case-row placement.** Each new field sits beside the field of its kind: `radius` with the
  geometry, `background` and `muted` with the colour fields the proof reads through `matchesColor`.
- **Guide wording** inside each table's existing shape.

## Deviation state

No deviation. No stop condition fired: no gate went red after a fix inside owned files, no
rebinding moved a reading the record does not cover, and no member's record row disagreed with the
token the brief named.

## What this unit did not close

- The `--vn-surface-raised` component consumers are still unwritten; the guide says they land with
  their components, unchanged from CL3.
- The dark anchor is a literal with no token of its own. It is the calibrated mix base and nothing
  else reads it, so no name was invented for it. A later unit that gives dark role tiers a second
  consumer will have to decide whether that value earns one.
