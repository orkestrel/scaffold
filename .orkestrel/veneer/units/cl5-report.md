# Unit CL5 — typography and content classes

Executor: `opus` on native Opus 5, sole writer in the Veneer checkout, from the CL4b landing
(`5240e36`, clean tracked tree). Briefs: `units/cl5-brief.md` and `units/cl5-brief-2.md`. No skill
named.

Every key this unit owns ships, reads `shipped` in the guide's compatibility table, and joins
`collectShippedComponents`. Every gate exits 0 on managed Chromium and on Edge. One file the
change made false appeared in neither the Owned nor the Off-limits list; it was edited and the
exact diff is under § Deviations.

## The keys, their selectors, and the partial that owns each

| Key | Selectors shipped | Partial |
| --- | --- | --- |
| `h1` | `.h1` | `_type.scss` |
| `h2` | `.h2` | `_type.scss` |
| `h3` | `.h3` | `_type.scss` |
| `h4` | `.h4` | `_type.scss` |
| `h5` | `.h5` | `_type.scss` |
| `h6` | `.h6` | `_type.scss` |
| `display` | `.display-1`, `.display-2`, `.display-3`, `.display-4`, `.display-5`, `.display-6` | `_type.scss` |
| `lead` | `.lead` | `_type.scss` |
| `small` | `.small` | `_type.scss` |
| `mark` | `.mark` | `_type.scss` |
| `initialism` | `.initialism` | `_type.scss` |
| `list-unstyled` | `.list-unstyled` | `_list.scss` |
| `list-inline` | `.list-inline`, `.list-inline-item`, `.list-inline-item:not(:last-child)` | `_list.scss` |
| `blockquote` | `.blockquote`, `.blockquote > :last-child`, `.blockquote-footer`, `.blockquote-footer::before` | `_quote.scss` |
| `img` | `.img-fluid`, `.img-thumbnail` | `_image.scss` |
| `figure` | `.figure`, `.figure-img`, `.figure-caption` | `_image.scss` |

Each partial wraps its rules in `@layer components` and is loaded from `src/styles/index.scss`
after `components/button`, in the order `type`, `list`, `quote`, `image`.

The minifier writes `.blockquote-footer::before` as `.blockquote-footer:before`. The presence scan
reads that as the double-colon form through the legacy branch in `normalizeComplexSelector`, so
the shipped cascade satisfies the inventory selector. The conformance run confirms it.

## Where each value comes from

The calibration record (`.orkestrel/veneer/research/calibration-content.md`) carries sections for
tag families only. A case-insensitive search of it for `lead`, `display-`, `initialism`,
`list-unstyled`, `list-inline`, `img-fluid`, `img-thumbnail`, `figure-caption`,
`blockquote-footer`, `.h1`, `.mark`, and `.small` returns nothing, which confirms brief 2's
correction 7. No value in this unit is bound to the record.

| Selector | Value shipped | Source |
| --- | --- | --- |
| `.h1`–`.h6` | `margin: 0`, `font-weight: var(--vn-weight-heading)`, `line-height: var(--vn-line-heading)`, `color: var(--bs-heading-color)`, `font-size: var(--vn-size-8)` down to `var(--vn-size-3)` | This unit's ruling: the twin reads the tokens `src/styles/elements/_heading.scss` reads |
| `.display-1`–`.display-6` | `font-size: var(--vn-display-1)` to `var(--vn-display-6)`, `line-height: var(--vn-line-heading)` | This unit's ruling for the size token; the line token carries Bootstrap's own `1.2` |
| `.display-1`–`.display-6` | `font-weight: 300` | Retained from Bootstrap's `.display-*` line |
| `.lead` | `font-size: var(--vn-size-5)` (`1.25rem`), `font-weight: 300` | Retained from Bootstrap's `.lead` line; the size is written through the token carrying exactly `1.25rem` |
| `.small` | `font-size: 0.875em` | Retained from Bootstrap's `.small` line |
| `.mark` | `padding: 0.1875em`, `color: var(--bs-highlight-color)`, `background-color: var(--bs-highlight-bg)` | Retained from Bootstrap's `.mark` line, alias for alias |
| `.initialism` | `font-size: 0.875em`, `text-transform: uppercase` | Retained from Bootstrap's `.initialism` line |
| `.list-unstyled`, `.list-inline` | `padding-inline-start: 0`, `list-style: none` | Retained from Bootstrap's `padding-left: 0; list-style: none`, written on the inline axis the cascade's direction gate requires |
| `.list-inline-item` | `display: inline-block` | Retained from Bootstrap's line |
| `.list-inline-item:not(:last-child)` | `margin-inline-end: var(--vn-space-4)` (`0.5rem`) | Retained from Bootstrap's `margin-right: 0.5rem`, written on the inline axis and through the token carrying that value |
| `.blockquote` | `margin-block-end: var(--vn-space-8)` (`1rem`), `font-size: var(--vn-size-5)` (`1.25rem`) | Retained from Bootstrap's line, through the tokens carrying those values |
| `.blockquote > :last-child` | `margin-block-end: 0` | Retained from Bootstrap's `margin-bottom: 0` |
| `.blockquote-footer` | `margin-block-start: calc(var(--vn-space-8) * -1)`, `margin-block-end: var(--vn-space-8)`, `font-size: 0.875em`, `color: var(--vn-gray-600)` | Retained from Bootstrap's `-1rem`, `1rem`, `0.875em`, and `#6c757d`; the color is written as the token whose value is exactly `#6c757d`, because `.claude/rules/styles.md` admits a literal color in `_tokens.scss` alone |
| `.blockquote-footer::before` | `content: '\2014\a0'` | Retained from Bootstrap's `"— "`; the inventory value's code points are `2014 a0`, and the built cascade emits those same code points |
| `.img-fluid`, `.img-thumbnail` | `max-inline-size: 100%`, `block-size: auto` | Retained from Bootstrap's `max-width: 100%; height: auto`, written as logical properties under the settled ruling |
| `.img-thumbnail` | `padding: var(--vn-space-2)` (`0.25rem`), `background-color: var(--bs-body-bg)`, `border: var(--bs-border-width) solid var(--bs-border-color)`, `border-radius: var(--bs-border-radius)` | Retained from Bootstrap's line, alias for alias; the padding is written through the token carrying `0.25rem` |
| `.figure` | `display: inline-block` | Retained from Bootstrap's line |
| `.figure-img` | `margin-block-end: var(--vn-space-4)` (`0.5rem`), `line-height: 1` | Retained from Bootstrap's `margin-bottom: 0.5rem`, written on the block axis and through the token carrying that value |
| `.figure-caption` | `font-size: 0.875em`, `color: var(--bs-secondary-color)` | Retained from Bootstrap's line, alias for alias |

## The rulings this unit settled

**The heading twin reproduces its tag's whole treatment, not its size alone.** Brief 1's ruling
names the size and gives the reason: a class twin that disagrees with its own tag on the same page
is something Bootstrap's contract does not do. That reason reaches every declaration in the block.
Bootstrap's `.h1` carries `font-weight: 500` and `margin-bottom: 0.5rem`, and Bootstrap's `h1` tag
carries the same pair, so the two agree there. Veneer's `h1` tag carries weight `600` and
`margin: 0`, so a `.h1` shipping Bootstrap's weight and margin would put `<h1>` and
`<h1 class="h1">` at different weights and different margins on one page. The class therefore ships
the tag's own block. The guide row says which values that moves.

**The image classes ship logical properties.** Settled by brief 2's correction 6. No coded
predicate governs the axis: `PHYSICAL_LONGHANDS`, `EDGE_SHORTHANDS`, and `SIDE_KEYWORD_PROPERTIES`
in `tests/setupStyles.ts` cover the inline axis and name neither `max-width` nor `height`. The
precedent is `src/styles/elements/_img.scss:4-5`, which the shipped `img` tag already reads. A
guide row records the departure.

**No guard refuses a selector this unit ships.** Settled by brief 2's correction 5 and confirmed by
the run: `.blockquote > :last-child`, `.list-inline-item:not(:last-child)`, and
`.blockquote-footer::before` are all present and the presence scan returns `undefined`.

**The sections divide the keys by medium.** `TypeSection` renders the heading, display, lead,
small, mark, initialism, list, and quotation classes. `MediaSection` renders the image and figure
classes. Each specimen is one row of `TYPE_SPECIMENS` or `MEDIA_SPECIMENS`, keyed by name, and
every selector this unit ships appears in one of them: the inline-list items supply the spaced
sibling, the quotation supplies the last child, and the attributed quotation supplies the footer
and its prefix.

**The specimen type is reused rather than added.** `ContentSpecimen` is `name` plus `markup`,
which is what the two sections need, so `app/browser/types.ts` gains no type. Its two doc lines
were reworded from "the Content region" to "the region rendering it", because three sections now
read the type.

## Guide rows written

Compatibility, `guides/veneer.md` § Compatibility — one `selector` row per key, Proof `—`, Status
`shipped`, inserted after the `reboot` row. The paragraph under the table now names the Reboot,
typography and media class, Button, and engine obligations.

Departures, `guides/veneer.md` § Tokens § Departures from Bootstrap — three rows, each resting on
a reading taken from the built cascade in the browser:

- `.h1`–`.h6`: the heading tag treatment at every viewport, `36/30/24/20/18/16px`, weight `600`,
  zero margin, against Bootstrap's `2.5/2/1.75/1.5/1.25/1rem` from the `xl` width up with a fluid
  size at narrower viewports, weight `500`, and a `0.5rem` end margin.
- `.display-1`–`.display-6`: Bootstrap's own `5/4.5/4/3.5/3/2.5rem` at every viewport, through
  `--vn-display-1` to `-6`, against the same sizes from the `xl` width up with a fluid size at
  narrower viewports. The value is unchanged; the condition is gone.
- `.img-fluid`, `.img-thumbnail`: `max-inline-size` and `block-size` against `max-width` and
  `height`.

Files — one row per new partial. Showcase — the Type and Media regions and the components-layer
sentence. Tests — the four component-class proofs and the two section proofs.

### The readings behind those rows

Taken by `tests/src/styles/components/type.test.ts` against `dist/src/styles/index.css` in managed
Chromium, all cases passing (`Tests 18 passed (18)`).

| Class | `font-size` | `line-height` | `font-weight` | `margin` |
| --- | --- | --- | --- | --- |
| `.h1` | `36px` | `43.2px` | `600` | `0px` |
| `.h2` | `30px` | `36px` | `600` | `0px` |
| `.h3` | `24px` | `28.8px` | `600` | `0px` |
| `.h4` | `20px` | `24px` | `600` | `0px` |
| `.h5` | `18px` | `21.6px` | `600` | `0px` |
| `.h6` | `16px` | `19.2px` | `600` | `0px` |
| `.display-1` | `80px` | `96px` | `300` | — |
| `.display-2` | `72px` | `86.4px` | `300` | — |
| `.display-3` | `64px` | `76.8px` | `300` | — |
| `.display-4` | `56px` | `67.2px` | `300` | — |
| `.display-5` | `48px` | `57.6px` | `300` | — |
| `.display-6` | `40px` | `48px` | `300` | — |

Each heading case reads its own tag beside the class and asserts the pair equal, so the twin
claim is a comparison rather than two literals that happen to agree. A further case retunes
`--vn-size-6` to `101px` and `--vn-display-3` to `102px` on a host and reads `101px` on both `h3`
and `.h3` and `102px` on `.display-3`, which is what proves each level reads the token its own
level names rather than a literal of the same value.

The image reading, from `tests/src/styles/components/image.test.ts`: a `.img-fluid` host reads
`max-inline-size: 100%` and `block-size: auto`, and the bare sibling reads `max-inline-size: none`;
a `240×160` image carrying the class inside a `120px` host reads `inline-size: 120px` and
`block-size: 80px`.

## Proofs added

- `tests/src/styles/components/type.test.ts` — the heading twins, the display tokens, the token
  retune, the standalone type classes, and the mark paint in both modes.
- `tests/src/styles/components/list.test.ts` — the two list classes against an untouched `ul`
  beside each, and the inline items' display and spacing.
- `tests/src/styles/components/quote.test.ts` — the raised quotation size, the last-child clearing
  read against a first child that keeps its margin, and the footer's pull, size, paint, and
  rendered prefix in both modes.
- `tests/src/styles/components/image.test.ts` — the fluid constraint on a host the `img` tag rule
  never reaches, the constrained image, the thumbnail frame, and the figure family read against a
  bare `figcaption` that keeps the muted token.
- `tests/app/browser/sections/TypeSection.test.ts` and `MediaSection.test.ts` — the region label,
  the rendered order, the name control, the markup control, the element-name control, the frozen
  table, and repeated destruction beside a neighbor.
- `tests/setupStyles.test.ts` — a case over the new component case tables: their rows, their mode
  ramps, the footer color's mode independence, and their freeze.

## Red-then-green pairs

**The presence scan.** Command: `npm run build:src:styles && npm run test:conformance`.

- Planted: the `.initialism` block removed from `src/styles/components/_type.scss`.
  `Tests 1 failed | 7 passed (8)`, the failure reading
  `"Shipped component initialism is missing selector .initialism"`.
- Restored: `Tests 8 passed (8)`.
- Removal confirmed: `src/styles/components/_type.scss` carries the block again, and the file's
  content is the written one.

**The specimen markup controls.** Command: `npm run test:app`. One plant changed three specimens'
markup without changing any element name or any specimen name — the abbreviation's `title` value in
`CONTENT_SPECIMENS`, the lead's wording in `TYPE_SPECIMENS`, and the framed image's `alt` value in
`MEDIA_SPECIMENS`.

- Planted: `Tests 3 failed | 14 passed (17)`, failing
  `ContentSection > renders every Content specimen in table order inside the named region`,
  `MediaSection > renders every Media specimen in table order inside the named region`, and
  `TypeSection > renders every Type specimen in table order inside the named region`.
- Restored: `Tests 17 passed (17)`.
- Removal confirmed: `git diff app/browser/constants.ts` reports no deletion line, and a search for
  `Hypertext markup language`, `that holds it`, and `Framed image specimen` returns nothing.

This closes the obligation CL4b carried: before the control, the file's markup assertion compared
the rendered page with the table's own `markup` values, so any change inside a specimen's markup
left every assertion green. The control is a literal markup list beside the literal name list the
file already carried, and the two new sections carry the same pair from the start.

**The shared-block sweep's own control.** `.figure` and `.list-inline-item` already share
`display: inline-block` across two partials. Adding `line-height: 1` to each took the pair to two
identical declarations, and the sweep reported
`_image.scss .figure and _list.scss .list-inline-item share display:inline-block line-height:1`.
Restoring both returned `result: no shared block`, and the partials are back to their written
content.

## The shared-block sweep

Instrument: `tmp/sweep-shared.mjs`. It compiles each partial under `src/styles/components/` on its
own with Sass, parses the emitted CSS with postcss, and reports every pair of rules from two
different partials whose `property:value` sets intersect in two or more members.

- Population: `_button.scss`, `_image.scss`, `_list.scss`, `_quote.scss`, `_type.scss`.
- Pairs compared: `10`.
- Result: `no shared block`.

`_button.scss` was read and not edited, because the sweep found nothing to extract from it.
`src/styles/_mixins.scss` was granted for this correction and is unchanged: no block shared by two
of this unit's partials exists, so no mixin was needed. Two within-partial repeats were folded into
grouped selectors as the partials were written — `.list-unstyled` with `.list-inline`, and
`.img-fluid` with `.img-thumbnail`.

## Gate evidence

Managed Chromium, in `AGENTS.md` order, from the checkout root. Log: `tmp/gates.log.txt`.

| Step | Exit | Final line |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | no diagnostic |
| `npm run build` | 0 | `✓ built in 506ms` |
| `npm test` | 0 | see the project table that follows |

`npm test` by project:

| Project | Result |
| --- | --- |
| `test:src` | `Test Files 8 passed (8)`, `Tests 51 passed (51)` |
| `test:src:styles` | `Test Files 50 passed (50)`, `Tests 228 passed (228)` |
| `test:app` | `Test Files 6 passed (6)`, `Tests 17 passed (17)` |
| `test:journey` | `Test Files 4 passed (4)`, `Tests 84 passed | 4 skipped (88)` |
| `test:policy` | `Test Files 1 passed (1)`, `Tests 109 passed | 1 skipped (110)` |
| `test:config` | `Test Files 1 passed (1)`, `Tests 173 passed | 1 skipped (174)` |
| `test:setup` | `Test Files 3 passed (3)`, `Tests 130 passed (130)` |
| `test:setup:browser` | `Test Files 1 passed (1)`, `Tests 33 passed (33)` |
| `test:conformance` | `Test Files 1 passed (1)`, `Tests 8 passed (8)` |
| `test:guides` | `Test Files 1 passed (1)`, `Tests 18 passed (18)` |

Edge, `PLAYWRIGHT_CHANNEL=msedge`. Log: `tmp/edge.log.txt`.

| Step | Exit | Final lines |
| --- | --- | --- |
| `npm run test:src:styles` | 0 | `Test Files 50 passed (50)`, `Tests 228 passed (228)` |
| `npm run test:setup:browser` | 0 | `Test Files 1 passed (1)`, `Tests 33 passed (33)` |
| `npm run test:app:browser` | 0 | `Test Files 6 passed (6)`, `Tests 17 passed (17)` |

## The tree

`git diff --stat`:

```text
 app/browser/Showcase.ts                           |   9 +-
 app/browser/constants.ts                          |  81 ++++++++++
 app/browser/index.ts                              |   2 +
 app/browser/types.ts                              |   4 +-
 guides/veneer.md                                  | 175 +++++++++++++---------
 src/styles/index.scss                             |   4 +
 tests/app/browser/Showcase.test.ts                |  16 +-
 tests/app/browser/index.test.ts                   |   6 +
 tests/app/browser/sections/ContentSection.test.ts |  48 ++++++
 tests/conformance.test.ts                         |  21 ++-
 tests/setupConformance.test.ts                    |  24 ++-
 tests/setupStyles.test.ts                         |  52 +++++++
 tests/setupStyles.ts                              |  97 ++++++++++++
 13 files changed, 460 insertions(+), 79 deletions(-)
```

`git status --porcelain --untracked-files=all`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/types.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/sections/ContentSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/MediaSection.ts
?? app/browser/sections/TypeSection.ts
?? src/styles/components/_image.scss
?? src/styles/components/_list.scss
?? src/styles/components/_quote.scss
?? src/styles/components/_type.scss
?? tests/app/browser/sections/MediaSection.test.ts
?? tests/app/browser/sections/TypeSection.test.ts
?? tests/src/styles/components/image.test.ts
?? tests/src/styles/components/list.test.ts
?? tests/src/styles/components/quote.test.ts
?? tests/src/styles/components/type.test.ts
```

`tmp/` is ignored by this repository, so the instruments and logs this unit wrote are outside the
status. They are `tmp/sweep-shared.mjs`, `tmp/plant-sweep.mjs`, `tmp/plant-presence.mjs`,
`tmp/plant-markup.mjs`, `tmp/gen-markup.mjs`, `tmp/gen-content.mjs`, `tmp/patch-content.mjs`,
`tmp/fix-newline.mjs`, `tmp/patch-showcase.mjs`, `tmp/patch-guide.mjs`, `tmp/patch-rows.mjs`,
`tmp/patch-conformance.mjs`, `tmp/gates.sh`, `tmp/edge.sh`, `tmp/gates.log.txt`, and
`tmp/edge.log.txt`.

The guide's diffstat is larger than the rows added because `oxfmt` re-aligned the compatibility and
departures tables to their widest new cell. Every deletion outside a table row is one of the four
sentences this unit replaced.

## Deviations

**One file the change made false was in neither list.** `tests/app/browser/index.test.ts` asserts
the app barrel's exact runtime key set, which the two new sections and their tables make false.
Brief 1's Owned list grants `app/browser/index.ts` and brief 2's correction 1 narrows that grant to
the two re-export lines, but neither brief names the proof that reads the barrel, and the
Off-limits list does not name it either. Leaving it would have left `npm test` red and closed no
acceptance criterion. It was edited, and the whole change is the six names:

```diff
 			'CONTENT_COPY',
 			'CONTENT_SPECIMENS',
 			'ContentSection',
+			'MEDIA_COPY',
+			'MEDIA_SPECIMENS',
+			'MediaSection',
 			'SHOWCASE_COPY',
 			'Showcase',
+			'TYPE_COPY',
+			'TYPE_SPECIMENS',
+			'TypeSection',
 		])
```

**A second assertion in the showcase proof's owned case went false.** Brief 2's correction 4 names
the region-label sequence at line 58. The assertion that follows it, in the same case, compares
every `[data-specimen]` attribute across the host with `CONTENT_SPECIMENS`, and the two new
sections mount their own specimens into the same `main` element. It now compares against
`[...CONTENT_SPECIMENS, ...TYPE_SPECIMENS, ...MEDIA_SPECIMENS]`. The amended criterion permits
this: no other case in the file is touched.

**`app/browser/types.ts` was edited for two doc lines.** Brief 1 grants the file for a specimen
type "only if the existing `ContentSpecimen` does not fit". It fits, so no type was added; but its
doc named the Content region, and three sections now read it. The change is the interface's summary
line and the `name` member's line.

## Findings carried forward

These are outside this unit's enumerated scope. Each names what closes it and what a successor
would have to own.

**The heading twin duplicates the tag block across two partials.** `src/styles/components/_type.scss`
now carries `margin: 0; font-weight: var(--vn-weight-heading); line-height: var(--vn-line-heading);
color: var(--bs-heading-color)`, which is the same block `src/styles/elements/_heading.scss` carries.
`.claude/rules/styles.md` moves a pattern appearing in two partials into `src/styles/_mixins.scss`.
Closing it needs both partials to include one mixin, and `src/styles/elements/**` is off-limits to
this unit, so it was left inline. This unit's sweep is bounded to `src/styles/components/` by
correction 9 and does not see it. A successor owning `src/styles/elements/_heading.scss`,
`src/styles/components/_type.scss`, and `src/styles/_mixins.scss` closes it in one edit.

**The three specimen sections have one body.** `TypeSection`, `MediaSection`, and `ContentSection`
differ only in the copy and specimen table they read: each creates a `section`, sets its
`aria-label`, appends a lead paragraph, appends one `div[data-specimen]` per row, and removes the
region on `destroy`. `app/browser/sections/ContentSection.ts` is outside this unit's Owned list, so
the extraction could not be made here without leaving a third copy behind. A successor owning the
three section files, `app/browser/types.ts`, and `app/browser/index.ts` can replace them with one
class taking its copy and its table, or with a shared base the three extend.

**Two classes disagree with the tag Veneer ships beneath them.** `.mark` paints from
`--bs-highlight-color` and `--bs-highlight-bg` and pads on all sides, while Veneer's `mark` tag
carries `padding: 0 0.1875em` and no paint, so `<mark>` and `<mark class="mark">` render
differently. `.figure-caption` reads `--bs-secondary-color` while Veneer's `figcaption` reads
`--vn-text-muted`. In Bootstrap each pair agrees, because Bootstrap's Reboot paints `mark` and
leaves `figcaption` alone. Both differences come from the tag side, which CL3 calibrated against
Elements' own readings, not from the class side, which retains Bootstrap's line as correction 7
directs. Whichever way a successor resolves them, the resolution belongs to the partial that
departed. The image proof reads the caption difference deliberately, and the type proof reads the
mark difference deliberately, so a later change to either side reddens a named case.

**The departures table is under § Tokens and carries selector rows.** The rows this unit added
join `figure`, `img`, `table`, `td`, and `legend`, which are already selectors rather than tokens.
The table's heading column is `Token`. Nothing this unit could do inside its scope fixes the
mismatch, and splitting the table is a guide-structure decision.
