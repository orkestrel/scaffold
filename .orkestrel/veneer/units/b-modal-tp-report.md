# Unit TIP (`tp`) report — the `tooltip` and `popover` keys with the `reset-text` mixin

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-tp` (branch `unit/tp`, base `2a3f223`). No commit, push, install, or destructive git command was run. Deviation state: no stop; every criterion reads green on the validation copy. The ancillary choices and the observations the Orchestrator rules on are under § Decisions and observations.

## Outcome

The `tooltip` and `popover` keys ship from `src/styles/components/_tooltip.scss` and `src/styles/components/_popover.scss`. Both read the `reset-text` mixin the shared patch appends after the `utility-variable` mixin. The `--bs-tooltip-zindex` property reads the `--vn-stack-hint` token and the `--bs-popover-zindex` property reads the `--vn-stack-popover` token. A `Tooltip` region and a `Popover` region each render one tip per explicit side, alone inside the `.viewport` frame, with no trigger and no inline style. The ledger, deferral, priority, duplication, and presence gates are green with `tooltip` and `popover` in the `listed` literal, measured on the validation copy (2a3f223 + `.orkestrel/veneer/units/tp-shared.patch` + the owned files, verified byte-equal to a fresh extract with the patch applied).

## Touched files

Owned (new, untracked in the worktree):

| File | Summary |
| --- | --- |
| `src/styles/components/_tooltip.scss` | The tip, its shown state, the arrow per explicit placement from one side map, the `@extend` of each automatic placement, and the inner box. |
| `src/styles/components/_popover.scss` | The box, the two-triangle arrow per explicit placement from one side map, the `@extend` of each automatic placement, the bottom header strip, the header with its empty form, and the body. |
| `tests/src/styles/components/tooltip.test.ts` | The browser proof: selectors, hint rung, opacity, reset, inner box, arrow geometry, automatic placements, and paint in both modes. |
| `tests/src/styles/components/popover.test.ts` | The browser proof: selectors, popover rung, reset, engine classes, box, empty header, arrow geometry, automatic placements, header strip, and paint in both modes. |
| `app/browser/sections/TooltipSection.ts` | The `TooltipSection` class over the `TOOLTIP_COPY` and `TOOLTIP_SPECIMENS` constants. |
| `app/browser/sections/PopoverSection.ts` | The `PopoverSection` class over the `POPOVER_COPY` and `POPOVER_SPECIMENS` constants. |
| `tests/app/browser/sections/TooltipSection.test.ts` | The region contract, the frame and stand-in markup per placement, identity and trigger refusals, and the frame containment at 390 and 1280. |
| `tests/app/browser/sections/PopoverSection.test.ts` | The same contract for the Popover region, the template order, and the refusal of the `fade` and `show` classes. |

Shared (report-only; exact patch in `.orkestrel/veneer/units/tp-shared.patch`, reproduced at the end of this report):

| File | Summary |
| --- | --- |
| `src/styles/index.scss` | The `components/tooltip` and `components/popover` rows after `components/close`. |
| `src/styles/_mixins.scss` | The `reset-text` mixin appended after the `utility-variable` mixin. |
| `tests/src/styles/fixtures/mixins.scss` | The `.vn-fixture-reset` class compiling the mixin alone for its case. This file is in neither the brief's Shared list nor its Off-limits list; see § Decisions and observations. |
| `tests/src/styles/mixins.test.ts` | The mixin case beside the declaration-mixin cases. |
| `tests/setupStyles.ts` | The `TOOLTIP_SELECTORS`, `POPOVER_SELECTORS`, `TIP_PLACEMENTS`, `TIP_ARROW_PROPERTIES`, and `TIP_RESET_CASES` tables. |
| `tests/setupStyles.test.ts` | The tables bound to the inventory, added to the export list, and held frozen. |
| `tests/setup.ts` | The `CaptureSubject` members, the resting `CASCADE_KEYS` rows, and the decline paragraph in the registry's remarks; no `DRIVEN_KEYS` row. |
| `tests/app/browser/integration.test.ts` | The `TOOLTIP_SPECIMENS` and `POPOVER_SPECIMENS` constants in the portfolio's declared set. |
| `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts` | The regions and exports after the Accordion rows. |
| `tests/conformance.test.ts` | The `tooltip` and `popover` names in the `listed` literal and in the passive order case after `close`. |
| `tests/setupServer.test.ts` | The `tooltip` and `popover` names in the dash-proof component set. |
| `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts` | The copy and specimen constants after `ACCORDION_SPECIMENS`, and the sections after `AccordionSection`. |
| `guides/veneer.md` | The § Files rows, the `### Tooltip classes` and `### Popover classes` sections, the `#### tooltip` and `#### popover` tables, the § Compatibility rows, the stacking Alias cell, the outside-ledger and sanitizer sentences, the § Showcase paragraph, and the § Tests links. |

## Diffstat

Owned files (`git diff --no-index --numstat /dev/null <file>`): `_tooltip.scss` +120, `_popover.scss` +165, `tooltip.test.ts` +246, `popover.test.ts` +337, `TooltipSection.ts` +20, `PopoverSection.ts` +20, `TooltipSection.test.ts` +144, `PopoverSection.test.ts` +151.

Shared patch (`git apply --stat .orkestrel/veneer/units/tp-shared.patch`):

```text
 app/browser/Showcase.ts               |    4 +
 app/browser/constants.ts              |   99 ++++++++++++++
 app/browser/index.ts                  |    2
 guides/veneer.md                      |  202 ++++++++++++++++++++++++++++-
 src/styles/_mixins.scss               |   22 +++
 src/styles/index.scss                 |    2
 tests/app/browser/Showcase.test.ts    |    6 +
 tests/app/browser/index.test.ts       |    6 +
 tests/app/browser/integration.test.ts |    4 +
 tests/conformance.test.ts             |    6 +
 tests/setup.ts                        |   67 ++++++++++
 tests/setupServer.test.ts             |    2
 tests/setupStyles.test.ts             |   97 ++++++++++++++
 tests/setupStyles.ts                  |  228 +++++++++++++++++++++++++++++++++
 tests/src/styles/fixtures/mixins.scss |    6 +
 tests/src/styles/mixins.test.ts       |   34 +++++
 16 files changed, 777 insertions(+), 10 deletions(-)
```

`git apply --check .orkestrel/veneer/units/tp-shared.patch` exits 0 on a fresh `git archive 2a3f223` extract outside any repository, and the applied extract is byte-equal to the validation copy's shared files.

## Ledger rows the gate measured

The first conformance run with the § Compatibility rows in place reported exactly these unrecorded rows; the guide's `#### tooltip` and `#### popover` tables carry them, and the gate then reads `Tests 22 passed (22)`. No addition was measured, and no `### Additions` row is added.

```text
tooltip | .tooltip | --bs-tooltip-zindex | — | 1080 | var(--vn-stack-hint) | tokenized
tooltip | .tooltip | --bs-tooltip-padding-x | — | 0.5rem | var(--vn-space-4) | tokenized
tooltip | .tooltip | --bs-tooltip-padding-y | — | 0.25rem | var(--vn-space-2) | tokenized
tooltip | .tooltip | --bs-tooltip-font-size | — | 0.875rem | var(--vn-size-2) | tokenized
tooltip | .tooltip | font-weight | — | 400 | var(--vn-weight-body) | tokenized
tooltip | .tooltip | line-height | — | 1.5 | var(--vn-line-body) | tokenized
tooltip | .tooltip | text-align | — | left | start | declared
popover | .popover | --bs-popover-zindex | — | 1070 | var(--vn-stack-popover) | tokenized
popover | .popover | --bs-popover-font-size | — | 0.875rem | var(--vn-size-2) | tokenized
popover | .popover | --bs-popover-header-padding-x | — | 1rem | var(--vn-space-8) | tokenized
popover | .popover | --bs-popover-header-padding-y | — | 0.5rem | var(--vn-space-4) | tokenized
popover | .popover | --bs-popover-header-font-size | — | 1rem | var(--vn-size-3) | tokenized
popover | .popover | --bs-popover-body-padding-x | — | 1rem | var(--vn-space-8) | tokenized
popover | .popover | --bs-popover-body-padding-y | — | 1rem | var(--vn-space-8) | tokenized
popover | .popover | font-weight | — | 400 | var(--vn-weight-body) | tokenized
popover | .popover | line-height | — | 1.5 | var(--vn-line-body) | tokenized
popover | .popover | text-align | — | left | start | declared
```

## Resting rows and subjects

`CaptureSubject` gains `Top tooltip`, `Right tooltip`, `Bottom tooltip`, `Left tooltip`, `Top popover`, `Right popover`, `Bottom popover`, and `Left popover`. The `CASCADE_KEYS` rows, appended at the registry's end, each read `background-color`:

| Scenario | Subject | Selector |
| --- | --- | --- |
| `top-tooltip` | `Top tooltip` | `.bs-tooltip-top .tooltip-inner` |
| `right-tooltip` | `Right tooltip` | `.bs-tooltip-end .tooltip-inner` |
| `bottom-tooltip` | `Bottom tooltip` | `.bs-tooltip-bottom .tooltip-inner` |
| `left-tooltip` | `Left tooltip` | `.bs-tooltip-start .tooltip-inner` |
| `top-popover` | `Top popover` | `.bs-popover-top .popover-header` |
| `right-popover` | `Right popover` | `.bs-popover-end .popover-header` |
| `bottom-popover` | `Bottom popover` | `.bs-popover-bottom .popover-header` |
| `left-popover` | `Left popover` | `.bs-popover-start .popover-header` |

No `DRIVEN_KEYS` row: the tips have no pointer or focus state. The registry's remarks gain the decline paragraph for the tip without the `show` class, the automatic placements, and the empty popover header. `tests/setup.test.ts` and `tests/setupStyles.test.ts` read `Tests 145 passed (145)` on the validation copy.

## R19 proof matrix

Every recorded selector's `condition` field is absent for both keys (the inventory's `media` count is `0`, and no selector object carries a condition), so each row's Condition is `—`. Case names are the `it` titles; `T` rows are in `tests/src/styles/components/tooltip.test.ts`, `P` rows in `tests/src/styles/components/popover.test.ts`, and `M` in `tests/src/styles/mixins.test.ts`. "Executed" marks a mutation run retained in `.orkestrel/veneer/units/tp-instruments/tp-mutations.log.txt`.

Cases:

- T-rules: writes the recorded tooltip selectors and no other rule on their classes — mutation: a rule dropped or added (executed through the `show` rule drop, which reddens it).
- T-rung: stacks on the hint rung and follows a wrapper that retunes it — mutation: the literal `1080` value (executed).
- T-show: rests transparent without the show class and takes its own opacity slot with it — mutation: the `.tooltip.show` rule dropped (executed).
- T-reset: resets the text around it to the body face at the body weight, aligned to the start, wrapping — mutation: the `reset-text` call dropped from `_tooltip.scss` (executed).
- T-box: caps, pads, rounds, and sizes the inner box from its own slots and the density and type scales — mutation: an inset or text size written as the release's literal; the density and type retunes then leave it unmoved (named, not executed).
- T-arrow: hangs the arrow from the edge facing the host and paints the triangle side toward it in the fill — mutation: the top and bottom entries swapped (executed).
- T-auto: resolves each automatic placement to the geometry of the explicit side its attribute names — mutation: the top automatic placement extending the bottom class (executed).
- T-paint: paints the emphasis alias as its fill and the body surface alias as its text, in light and in dark — mutation: a literal fill (executed).
- P-rules, P-rung (literal `1070` value, executed), P-reset (the `reset-text` call dropped from `_popover.scss`, executed), P-engine (paints the same with and without the classes its engine sets; a guard, no mutation named), P-box (literal inset or size, named, not executed; the header's inherited text is read in P-paint), P-empty (the `:empty` rule dropped, executed), P-arrow (the end and start entries swapped, executed), P-auto (the start automatic placement extending the end class, executed), P-strip (the strip rule dropped, executed), P-paint (a literal header fill, executed).
- M: resets every text treatment the tip rules reset, over a treatment staged beneath it — mutation: one declaration dropped (executed for the `text-decoration` declaration and for the `line-break` declaration).

| Recorded selector | Condition | Cases | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| `.tooltip` | — | T-rules, T-rung, T-reset, T-box, M | every tooltip specimen | `top-tooltip`, `right-tooltip`, `bottom-tooltip`, `left-tooltip` |
| `.tooltip.show` | — | T-rules, T-show | every tooltip specimen | the same |
| `.tooltip .tooltip-arrow` | — | T-rules, T-arrow, T-auto | every tooltip specimen | the same |
| `.tooltip .tooltip-arrow::before` | — | T-rules, T-arrow, T-auto | every tooltip specimen | the same |
| `.bs-tooltip-top .tooltip-arrow` and its `::before` twin | — | T-rules, T-arrow, T-auto, T-paint | `Top tooltip` | `top-tooltip` |
| `.bs-tooltip-end .tooltip-arrow` and its `::before` twin | — | T-rules, T-arrow, T-auto | `Right tooltip` | `right-tooltip` |
| `.bs-tooltip-bottom .tooltip-arrow` and its `::before` twin | — | T-rules, T-arrow, T-auto | `Bottom tooltip` | `bottom-tooltip` |
| `.bs-tooltip-start .tooltip-arrow` and its `::before` twin | — | T-rules, T-arrow, T-auto | `Left tooltip` | `left-tooltip` |
| `.bs-tooltip-auto[data-popper-placement^=top\|right\|bottom\|left] .tooltip-arrow` and each `::before` twin | — | T-rules, T-auto; the `setupStyles.test.ts` pairing case binds each to its explicit twin | none (engine-written, M2 and M9) | none (declined) |
| `.tooltip-inner` | — | T-rules, T-box, T-paint | every tooltip specimen | every tooltip scenario (the key's region) |
| `.popover` | — | P-rules, P-rung, P-reset, P-engine, P-box, P-paint, M | every popover specimen | `top-popover`, `right-popover`, `bottom-popover`, `left-popover` |
| `.popover .popover-arrow`, `::before`, `::after` | — | P-rules, P-arrow, P-auto | every popover specimen | the same |
| `.bs-popover-top > .popover-arrow`, `::before`, `::after` | — | P-rules, P-arrow, P-auto, P-paint | `Top popover` | `top-popover` |
| `.bs-popover-end > .popover-arrow`, `::before`, `::after` | — | P-rules, P-arrow, P-auto | `Right popover` | `right-popover` |
| `.bs-popover-bottom > .popover-arrow`, `::before`, `::after` | — | P-rules, P-arrow, P-auto | `Bottom popover` | `bottom-popover` |
| `.bs-popover-bottom .popover-header::before` | — | P-rules, P-strip, P-auto | `Bottom popover` | `bottom-popover` |
| `.bs-popover-start > .popover-arrow`, `::before`, `::after` | — | P-rules, P-arrow, P-auto | `Left popover` | `left-popover` |
| `.bs-popover-auto[data-popper-placement^=top\|right\|bottom\|left] > .popover-arrow`, each `::before` and `::after` twin, and the bottom `.popover-header::before` twin | — | P-rules, P-auto; the pairing case | none (engine-written) | none (declined) |
| `.popover-header` | — | P-rules, P-box, P-paint | every popover specimen | every popover scenario (the key's region) |
| `.popover-header:empty` | — | P-rules, P-empty | none (declined; see § Decisions and observations) | none |
| `.popover-body` | — | P-rules, P-box, P-paint | every popover specimen | read in each popover frame |

## Failing-first and mutation record

Failing first, on the validation copy with the final proofs and tables but without the partials, the barrel rows, and the mixin (`.orkestrel/veneer/units/tp-instruments/tp-failing-first.log.txt`):

```text
npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/src/styles/mixins.test.ts
Test Files  3 failed (3)
Tests  19 failed | 1 passed (20)
```

The `mixins.test.ts` file fails at import in that run, because its fixture includes a mixin that does not exist yet, so its cases are not collected; the passing case is the P-engine guard, which holds with no popover rule at all. The same command after the partials, the barrel rows, and the mixin landed: `Test Files 3 passed (3)`, `Tests 31 passed (31)`.

Mutations (each applied to the validation copy, styles rebuilt, the named file run, the file restored; the full site, command, exits, summary, and failing case names are in `.orkestrel/veneer/units/tp-instruments/tp-mutations.log.txt`):

| Mutation | Site | Summary line | Failing cases |
| --- | --- | --- | --- |
| `--bs-tooltip-zindex: 1080` | `_tooltip.scss` | `Tests 1 failed \| 8 passed (9)` | T-rung |
| `--bs-popover-zindex: 1070` | `_popover.scss` | `Tests 1 failed \| 10 passed (11)` | P-rung |
| `@include reset-text` removed | `_tooltip.scss` | `Tests 1 failed \| 8 passed (9)` | T-reset |
| `@include reset-text` removed | `_popover.scss` | `Tests 1 failed \| 10 passed (11)` | P-reset |
| `text-decoration: none` removed | `_mixins.scss` | `Tests 1 failed \| 10 passed (11)` | M |
| `line-break: auto` removed | `_mixins.scss` | `Tests 1 failed \| 10 passed (11)` | M |
| `.tooltip.show` rule removed | `_tooltip.scss` | `Tests 2 failed \| 7 passed (9)` | T-rules, T-show |
| top entry given the bottom side and edge | `_tooltip.scss` | `Tests 5 failed \| 4 passed (9)` | T-rules, T-arrow, T-auto, T-paint in both modes |
| end entry given the left side and right edge | `_popover.scss` | `Tests 3 failed \| 8 passed (11)` | P-rules, P-arrow, P-auto |
| top automatic placement extends `.bs-tooltip-bottom` | `_tooltip.scss` | `Tests 1 failed \| 8 passed (9)` | T-auto |
| start automatic placement extends `.bs-popover-end` | `_popover.scss` | `Tests 1 failed \| 10 passed (11)` | P-auto |
| strip rule renamed away | `_popover.scss` | `Tests 2 failed \| 9 passed (11)` | P-rules, P-strip |
| `.popover-header:empty` rule removed | `_popover.scss` | `Tests 2 failed \| 9 passed (11)` | P-rules, P-empty |
| `--bs-tooltip-bg: rgb(0, 0, 0)` | `_tooltip.scss` | `Tests 2 failed \| 7 passed (9)` | T-paint in both modes |
| `--bs-popover-header-bg: rgb(233, 236, 239)` | `_popover.scss` | `Tests 2 failed \| 9 passed (11)` | P-paint in both modes |

Each build exited 0 and each run exited 1; the restoring build exited 0.

## Gates on the validation copy

`.orkestrel/veneer/units/tp-instruments/tp-gates.log.txt` holds the final run (every gate after the last edit):

| Command | Result |
| --- | --- |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/src/styles/mixins.test.ts` | exit 0, `Tests 31 passed (31)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TooltipSection.test.ts tests/app/browser/sections/PopoverSection.test.ts` | exit 0, `Tests 8 passed (8)` |
| `npm run test:conformance` | exit 0, `Tests 22 passed (22)` (baseline before any edit in the worktree: exit 0, `Tests 22 passed (22)`) |
| `npm run test:guides` | exit 0, `Tests 19 passed (19)` |
| `npm run test:policy` | exit 0, `Tests 109 passed \| 1 skipped (110)` |
| `npx vitest run … --project setup tests/setupStyles.test.ts tests/setup.test.ts` | exit 0, `Tests 145 passed (145)` |
| `npx vitest run … --project setup tests/setupServer.test.ts` | exit 0, `Tests 101 passed (101)` |
| `npx oxfmt --check` over every changed file | exit 0 |
| `npx oxlint --deny-warnings --no-ignore` over every changed TypeScript file | exit 0 |
| `npx vitest run … --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | exit 0, `Tests 5 passed (5)` (an earlier run, before the last prose edits, which touch neither file) |
| `npx vitest run --config configs/src/vite.styles.config.ts … tests/src/styles/index.test.ts tests/src/styles/components/validation.test.ts tests/src/styles/components/input-group.test.ts` | exit 0, `Tests 46 passed (46)` (the forms tooltip neighbors; an earlier run) |

In the worktree itself, `npm run format:check` exits 0 over 359 files and `npm run lint:check` exits 0. The validation copy sits under an ignored `tmp/` directory, so the tools there run over the explicit changed-file list with the ignore file emptied.

Built cascade against the inventory (criterion 2): a PostCSS walk of `dist/src/styles/index.css` finds every recorded `tooltip` selector and every recorded `popover` selector, and no other rule naming a `.tooltip*`, `.bs-tooltip-*`, `.popover*`, or `.bs-popover-*` class. Each recorded declaration is present with its value except the ledger rows listed earlier and these minifier rewrites: the `transparent` keyword written as `#0000`, and each popover triangle's `border-color`, `border-style`, and `border-width` longhands merged into one `border: 0 solid #0000` shorthand. The ledger reads the expanded compile, where both agree with the inventory.

## Hanging reading

No tip hangs. A probe (deleted) mounted both sections and read each frame at 390 and 1280 through the installed `readClipEdge` function: every tip's box and every arrow's box lie inside its `.viewport` frame, the smallest gap between a tip or arrow and a frame edge is `89.5px` (the side popovers at 390), and no key element's top reaches its host's bottom. The section proofs hold the same containment as assertions at both widths. Each resting row reads the tip's inner box or header, whose parent is the tip, so the journey's hanging-key set stays exactly the forms keys' input-group tooltip pairs. A top tip's arrow sits wholly below its tip, so a row keyed on an arrow would have entered the hanging branch; no row is.

The same probe measured the popover's width: `195px` at the 390 test viewport and `276px` at 1280. The stand-in's `left: 50%` offset leaves an absolutely positioned popover half its frame to lay out in, so at 390 it wraps narrower than its `276px` cap; the tooltips (`110px` to `138px`) are unaffected. The guide's § Popover classes states this limit.

## Shared-name reading

`grep -oE` over the built cascade gives the class names these keys ship: `tooltip`, `tooltip-arrow`, `tooltip-inner`, `bs-tooltip-top`, `bs-tooltip-end`, `bs-tooltip-bottom`, `bs-tooltip-start`, `bs-tooltip-auto`, `popover`, `popover-arrow`, `popover-header`, `popover-body`, `bs-popover-top`, `bs-popover-end`, `bs-popover-bottom`, `bs-popover-start`, `bs-popover-auto`, and the existing `show` class. Compiling those names as candidates through the installed `tailwindcss` compiler with `tailwindcss/utilities.css` generates none of them, while the controls `collapse` and `table`, both on the `tests/setup.css` exclusion line, generate CSS in the same run. No shared name appears, so `test:service` stays an observation (M17) and no Tailwind fixture changes.

## Guide text

The two sections sit after `### Close classes` and before `### Carousel classes`, in the barrel's position:

````markdown
### Tooltip classes

The tooltip key ships whole: the tip and its shown state, the arrow at each explicit placement and at
each automatic placement the engine writes, and the inner box.

The `.tooltip` rule declares every slot it reads on itself, so a consumer retunes a tip through a
rule of their own that selects it. The tip stacks on the hint rung: the `.tooltip` rule applies its
`z-index` property from the `--bs-tooltip-zindex` property, which reads the `--vn-stack-hint` token,
so a scope retuning that token moves every tip inside it, and the hint rung sits above the popover
rung. The `.tooltip-inner` rule's inset reads Veneer's density scale, and the `.tooltip` rule's text
size reads the `--vn-size-2` token of the type scale. The inner box's fill reads the
`--bs-emphasis-color` alias and its text reads the `--bs-body-bg` alias, so a tip inverts the surface
around it in either color mode, and its radius reads the `--bs-border-radius` alias. The
`reset-text` mixin resets the text a tip inherits to the body face, weight, and rhythm, aligned to
the start of its line and wrapping as ordinary text does, and the popover writes the same reset. The
`--bs-tooltip-margin` property is declared empty, as the release declares it, so the tip's margin
resolves to none. A tip rests transparent, and the `show` class raises it to the value of the
`--bs-tooltip-opacity` property.

Each explicit placement class, the `bs-tooltip-top`, `bs-tooltip-end`, `bs-tooltip-bottom`, or
`bs-tooltip-start` class, names the side of its host the tip sits on. The arrow hangs outside the
tip's edge that faces the host, and its triangle paints the tip's fill on the side toward the host.
The placements are physical, as the release writes them: a tip carrying the `bs-tooltip-end` class
sits on the right of its host. The arrow's `0.8rem` width and `0.4rem` depth are Bootstrap's
literals, because no space step resolves to either. The engine writes the `bs-tooltip-auto` class
with a `data-popper-placement` attribute instead of an explicit class, and each automatic placement
extends the explicit class of the side its attribute names, so the two resolve the same geometry.

The tooltip classes are set in markup. The release's Tooltip plugin, which builds a tip, places it,
and moves it between rest and the `show` class, is behavior the engine owns, and § Compatibility
records it. The engine writes a tip's position and offset on the element, so the showcase stands in
for them with the shipped `position-absolute`, `top-50`, `start-50`, and `translate-middle`
utilities on each tip and the `translate-middle-x` or `translate-middle-y` utility on its arrow.

These are the key's recorded departures.

- **The stacking level reads the hint rung.** The release writes the `1080` value for the
  `--bs-tooltip-zindex` property; Veneer writes the `var(--vn-stack-hint)` value, which resolves to
  the same level.
- **The inset and the text size read Veneer's scales.** The release writes the `0.5rem` and
  `0.25rem` lengths for the inset and the `0.875rem` length for the text; Veneer writes the
  `--vn-space-4`, `--vn-space-2`, and `--vn-size-2` tokens, which resolve to those lengths, so the
  `--vn-factor-density` token moves the inset.
- **The reset reads the body weight and rhythm, and its fallback alignment is absent.** The release
  writes the `font-weight: 400` declaration and the `line-height: 1.5` declaration; Veneer writes the
  `--vn-weight-body` and `--vn-line-body` tokens, which resolve to the same values. The release
  writes the `text-align: left` declaration ahead of the `text-align: start` declaration as a
  fallback for engines without the `start` keyword; Veneer writes the `start` keyword alone, because
  the managed Chromium and Edge receipts this cascade is proved on resolve it. The popover carries
  the same departures from the same mixin.

The showcase's Tooltip region renders a shown tip on each side of its host, each alone inside the
shell's frame with no trigger, and each carrying the release's `tooltip` role and an `id` attribute
a trigger's `aria-describedby` attribute would name; no specimen claims that wiring. The region
renders no tip without the `show` class and no automatic placement, because the engine writes both:
a tip without the class paints nothing, and an automatic placement resolves the geometry of the
explicit placement it extends. The capture registry declines both frames, and the proof reads each
of them.

The `tests/src/styles/components/tooltip.test.ts` proof reads each resolved treatment in the
browser: the written selectors, the hint rung and a wrapper retuning it, the transparent and the
shown tip, the reset over an inherited treatment, the inner box's cap, inset, radius, and text size
under the density, radius, and type retunes, each placement's arrow against its tip, each automatic
placement against its explicit side, and the paint in light and inside a dark island.

### Popover classes

The popover key ships whole: the box, the arrow at each explicit placement and at each automatic
placement the engine writes, the header with its strip under an upward arrow and its empty form,
and the body.

The `.popover` rule declares every slot it reads on itself. The box stacks on the popover rung: the
`.popover` rule applies its `z-index` property from the `--bs-popover-zindex` property, which reads
the `--vn-stack-popover` token, and that rung sits below the hint rung, so a tooltip paints over a
popover. The header and body insets read Veneer's density scale, and the box and header text sizes
read the `--vn-size-2` and `--vn-size-3` tokens of the type scale. The box paints the `--bs-body-bg`
alias inside an edge of the `--bs-border-color-translucent` alias, and its radius reads the
`--bs-border-radius-lg` alias. The header paints the `--bs-secondary-bg` alias and inherits the
popover's own text color, and the body text reads the `--bs-body-color` alias, so a popover follows
the color mode around it. The release declares the `--bs-popover-box-shadow` property and no release
rule applies it, and Veneer does the same. The popover writes the tooltip's text reset through the
same `reset-text` mixin. An empty header is removed from the flow, so a popover given no title shows
its body alone.

The arrow is two triangles in one box: the first paints the popover's edge color, and the second,
one edge width further in, paints its fill, so the arrow carries the border around its fill. Each
explicit placement class hangs the arrow outside the popover's edge that faces its host, past the
border, and the placements are physical, as the tooltip's are. A popover below its host lays a strip
of the header's fill, as wide as the arrow, along the top of the header where the arrow meets it.
The arrow's `1rem` width and `0.5rem` depth are Bootstrap's literals, kept beside the tooltip's,
because an arrow is geometry rather than spacing and does not follow the density factor. The engine
writes the `bs-popover-auto` class with a `data-popper-placement` attribute instead of an explicit
class, and each automatic placement extends the explicit class of the side its attribute names, the
header strip included.

The popover classes are set in markup. The release's Popover plugin builds on the Tooltip plugin and
sets the `fade` class and the `show` class, which no popover rule reads; that behavior is the
engine's, and § Compatibility records it. The engine writes a popover's position and offset on the
element, so the showcase stands in for them with the shipped `position-absolute`, `top-50`,
`start-50`, and `translate-middle` utilities on each popover and the `translate-middle-x` or
`translate-middle-y` utility on its arrow.

These are the key's recorded departures.

- **The stacking level reads the popover rung.** The release writes the `1070` value for the
  `--bs-popover-zindex` property; Veneer writes the `var(--vn-stack-popover)` value, which resolves
  to the same level.
- **The insets and the text sizes read Veneer's scales.** The release writes the `1rem` and `0.5rem`
  lengths for the header inset, the `1rem` length for the body inset, the `0.875rem` length for the
  box's text, and the `1rem` length for the header's; Veneer writes the `--vn-space-8`,
  `--vn-space-4`, `--vn-size-2`, and `--vn-size-3` tokens, which resolve to those lengths, so the
  `--vn-factor-density` token moves both insets.
- **The reset departs as the tooltip's does.** § Tooltip classes gives the weight, rhythm, and
  alignment departures the shared mixin writes.

The showcase's Popover region renders a popover with a header and a body on each side of its host,
each alone inside the shell's frame with no trigger, and each carrying the `tooltip` role the
release's template writes and an `id` attribute a trigger's `aria-describedby` attribute would name;
no specimen claims that wiring. Each header is an `h2` element, the level under the page's `h1`
element. The offset the `start-50` utility writes leaves a popover half its frame's width to lay out
in, so at the 390 viewport a popover wraps narrower than its `276px` cap. The region renders no
automatic placement, for the reason § Tooltip classes states, and no `fade` class or `show` class.
It renders no empty header either, because the release's template removes an empty header before the
popover renders, so the rule that hides one guards markup the release's plugin never writes; the
capture registry declines that frame, and the proof reads the rule.

The `tests/src/styles/components/popover.test.ts` proof reads each resolved treatment in the browser:
the written selectors, the popover rung below a tooltip and a wrapper retuning it, the reset over an
inherited treatment, the box beside the engine's classes, the cap, edge, radii, insets, and text
sizes under the density, radius, and type retunes, the header's inherited text, the empty header,
each placement's two triangles against the box, each automatic placement against its explicit side,
the header strip, and the paint in light and inside a dark island.
````

The other guide sentences this unit rewrites against what ships, each quoted as the patch leaves it:

- `### Outside the ledger`, the hint-surface sentence: "`scroll-padding` on the document waits on the first sticky header, which fixes the offset, and the component-scoped tokens wait on the components that paint them. The tooltip paints its hint surface from the release's `--bs-emphasis-color` and `--bs-body-bg` aliases, so Veneer declares no hint surface token of its own."
- `### Outside the ledger`, the popover-asymmetry sentence: "Elements' popover snaps open and fades closed. The popover key ships no motion, because no popover rule the release records reads the `fade` class or the `show` class, so that asymmetry is recorded as an Elements decision for J-ENGINE, which opens and closes a popover."
- § Compatibility closing paragraph, the sanitizer sentence: "The sanitizer allowlist and sanitizer overrides are J-ENGINE's, and the Tooltip row names the `Sanitizer` and `TemplateFactory` utilities that carry them."
- Stacking table: the `--vn-stack-popover`, `-hint`, `-toast` row's Alias cell reads `` `--bs-popover-zindex`, `--bs-tooltip-zindex` ``; TOAST's patch adds its own entry and integration joins them in rung order. The paragraph under the table stays as the base has it, for MODAL.
- § Showcase gains a paragraph after the Carousel decline paragraph: the Tooltip and Popover regions render each tip inside the frame through the stand-in utilities, each tip's box and arrow lie inside the frame at 390 and 1280, and the capture registry declines the tip without the `show` class and the automatic placements, linking both section proofs and both style proofs. § Tests gains the `popover specimens` and `tooltip specimens` links in the application list and `the tooltip classes` and `the popover classes` links after `the close classes`.
- § Files gains the `_tooltip.scss` and `_popover.scss` rows after the `_close.scss` row.
- § Compatibility gains the `tooltip` and `popover` selector and variable rows after the `alert` rows, and these `plugin` rows after the Carousel row, each within the Obligation column's existing width so the table keeps its padding:
  - "Tooltip: constructed by a consumer, no data API; `placement: 'top'`, `trigger: 'hover focus'`, and `sanitize: true` defaults; `show`, `hide`, and `setContent` methods; cancelable `show.bs.tooltip` and `hide.bs.tooltip` events; the trigger's `aria-describedby` attribute names the tip's `id` attribute; the `bs-tooltip-auto` class and `data-popper-placement` attribute from placement; `Sanitizer` and `TemplateFactory` utilities. Owner: J-ENGINE."
  - "Popover: extends Tooltip, inheriting its construction, methods, sanitizing, and ARIA under `.bs.popover` events; `content: ''`, `offset: [0, 8]`, `placement: 'right'`, and `trigger: 'click'` defaults; the `.popover-header` element takes the title and the `.popover-body` element the content, an empty one removed; the `bs-popover-auto` class and `data-popper-placement` attribute from placement; sets the `fade` and `show` classes. Owner: J-ENGINE."

## Decisions and observations

Ancillary choices this unit settled, each recorded for the audit:

1. **The `reset-text` mixin writes the `start` alignment alone and reads the weight and rhythm tokens.** The release writes `text-align: left` ahead of `text-align: start`; no browser reading can tell the fallback's presence from its absence, because the later declaration always wins, so a criterion demanding that dropping any one declaration reddens a case could not hold with the fallback written. Veneer writes the logical value alone, the precedent the sticky helpers set for `-webkit-sticky`, and the ledger records the `declared` row on both keys. The `400` weight and the `1.5` rhythm read the `--vn-weight-body` and `--vn-line-body` tokens under family rule 5 (bind a value to a matching token), as the `.btn` and `.dropdown-item` rules do. The brief's phrase "as the inventory records the declarations" is read as the declaration set; say so if a literal reading was meant.
2. **The mixin case needs a fixture row.** `tests/src/styles/fixtures/mixins.scss` is the tree's home for compiling a declaration mixin alone, and it is in neither the brief's Shared list nor its Off-limits list, so the `.vn-fixture-reset` class rides in the shared patch.
3. **Values that stay literal.** The arrow sizes (`0.8rem`, `0.4rem`, `1rem`, `0.5rem`), the `200px` and `276px` caps, and the `0.9` opacity stay the release's literals: no space step resolves to the tooltip's arrow sizes, and an arrow is geometry rather than spacing, so the popover's arrow stays literal beside it.
4. **Placement stand-ins.** Each tip carries the `position-absolute`, `top-50`, `start-50`, and `translate-middle` utilities, and each arrow the `position-absolute` utility with `start-50 translate-middle-x` (top and bottom) or `top-50 translate-middle-y` (right and left). The popover width limit at 390 follows from the `left: 50%` offset and is stated in the guide.
5. **Names and markup.** Specimens are named for the physical side (`Top tooltip`, `Right tooltip`, `Bottom tooltip`, `Left tooltip`, and the popover twins), because the `end` and `start` classes are physical. Tooltip specimens carry the `show` class; popover specimens carry neither the `fade` class nor the `show` class. Each popover header is an `h2` element rather than the template's `h3` element, the accordion precedent for the heading level under the page's `h1` element. Each tip carries `role="tooltip"` and a unique `id` attribute (`top-tooltip` through `left-popover`), and no specimen carries an `aria-describedby` attribute.
6. **Resting rows read the painted box.** Each row reads `background-color` on the tooltip's inner box or the popover's header, not on an arrow, because a top tip's arrow sits wholly below its tip and a row keyed on it would enter the journey's hanging branch.
7. **Placement of new rows.** New § Compatibility selector and variable rows sit after the `alert` rows, new `plugin` rows after the Carousel row, the `#### tooltip` and `#### popover` tables after `#### btn-close`, and the registry rows at each table's end.

For the Orchestrator's ruling:

- **The empty popover header renders no specimen.** The `.popover-header:empty` rule is a pseudo-class state, and the release's template removes an empty header before a popover renders, so the rule guards markup the release's plugin never writes. P-empty proves it on its own elements, and the decline reason is recorded in the registry's remarks, the `POPOVER_SPECIMENS` constant's TSDoc, and § Popover classes. If M2 is read to require a frame for it, one more popover specimen without a placement class is the smallest carrier; the brief's "one specimen per explicit side" wording is why this unit did not add one.
- **The stacking paragraph now disagrees with its table.** The paragraph under the stacking table still says each rung "answers no `--bs-*` alias" while this patch fills the popover and hint Alias cell. The brief assigns that paragraph's rewrite to MODAL; until MODAL lands, the two disagree.
- **`npm run test:setup` as a whole project, a timing observation.** On the validation copy the whole `setup` project twice reported `Tests 1 failed | 257 passed | 12 skipped (270)`: the `tests/setupServer.test.ts` cases "oracle action bindings and exclusions" (hook timed out in 10100ms) and "records and reads official control state and rejects contradicted or absent obligation steps" (test timed out in 10100ms), both driving the Bootstrap oracle in a browser while the sibling units run on the same host. An earlier whole-project run on the same copy read `Tests 270 passed (270)`, and the file alone reads `Tests 101 passed (101)` after the last edit. This unit's change to that file adds two names to a set. The deciding re-run is the Orchestrator's.
- **Observations, not criteria.** The journey, `CAPTURE=1`, `test:service`, and the whole styles project were not run.
- **A shared scratchpad collision.** The session scratchpad directory is shared by every subagent of the session. This unit wrote generic names there (`report-head.md`, `report-mid.md`, `guide.py`, `guide-final.md`, `guide-sections.txt`, `env.sh`, and a `fresh/` extract it removed with `rm -rf` after each patch check). A sibling unit overwrote `report-head.md` with the MODAL report while this unit was assembling its own, which this unit detected and rebuilt from a unit-scoped `tp-unit/` directory. If a sibling unit also used a `fresh/` directory there, this unit's removals may have deleted it; no sibling file is known to have been lost.

The mid-campaign note `w2-w3-note-1.md` arrived during the unit, and each rule is applied:

1. Every code token in the added guide prose, TSDoc, and comments is followed by its noun (the `.tooltip` rule, the `--vn-stack-hint` token, the `1080` value, the `show` class, the `start` keyword, the `bs-tooltip-end` class).
2. No case population sits in a test file: the section proofs derive the specimen names and the placement order from the `TIP_PLACEMENTS` table, the component reset cases read the `TIP_RESET_CASES` table (which gained an `inherited` field the proofs check against the browser in both directions), and the side lists read the `TIP_PLACEMENTS` table.
3. Every mutation run's site, command, exits, summary line, and failing case names are retained in `.orkestrel/veneer/units/tp-instruments/tp-mutations.log.txt`, and the failing-first run in `.orkestrel/veneer/units/tp-instruments/tp-failing-first.log.txt`.
4. The guide states which rule applies each value: "the `.tooltip` rule applies its `z-index` property from the `--bs-tooltip-zindex` property", the `.popover` rule likewise, and "The release declares the `--bs-popover-box-shadow` property and no release rule applies it, and Veneer does the same"; the popover variable row claims a reading only for each property "a release rule reads".
5. The binding cases derive each table from the inventory: the selector sets, the explicit-to-automatic pairing, the pinned side and edge, and the reset run and its standing values. The literal alignment pair that restated the inventory was removed from the binding case.

## Review evidence

`.orkestrel/veneer/units/tp.diff` (the owned files rendered through `git diff --no-index /dev/null <file>`), `.orkestrel/veneer/units/tp-status.txt` (`git status --porcelain` at hand-back: the owned files untracked, nothing else), `.orkestrel/veneer/units/tp-shared.patch`, `.orkestrel/veneer/units/tp-instruments/tp-gates.log.txt`, `.orkestrel/veneer/units/tp-instruments/tp-mutations.log.txt`, `.orkestrel/veneer/units/tp-instruments/tp-failing-first.log.txt`, and this report. The validation copy `tmp/probe/` was deleted before hand-back; the readings in this report are the copy's.

## Shared patch

The exact shared patch is `.orkestrel/veneer/units/tp-shared.patch`; the retained copy drops the appended duplicate.
