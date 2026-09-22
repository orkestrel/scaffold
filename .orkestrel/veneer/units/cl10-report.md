<!-- opus on native Opus 5, native subagent, clean context, sole writer in the Veneer checkout.
Dispatched from the CL9 landing 5e011a3. Retained 2026-09-22 from the agent's returned result.
Its brief is cl10-brief.md; its instruments are cl10-control.mjs and cl10-value.mjs; its rendered
evidence is cl10-diff.patch.txt and cl10-status.txt. Section 0 refutes a premise this
Orchestrator folded into the brief from cl10-scope-read-report.md; the refutation is confirmed
first-party and the scope-read report carries a correction header. -->

# CL10 report — the icon-link, ratio, and vertical-rule keys

`opus` on native Opus 5, sole writer in `C:/Users/mikes/WebstormProjects/veneer`, from the CL9
landing `5e011a3` on a clean tracked tree. The assignment was performed directly; nothing was
spawned.

## 0. The brief's reduced-motion premise is false, and this unit read the preference

**Read this first.** The brief and its scope read state that the reduced-motion preference cannot be
driven in this harness, that the setup exposes no control for it, and that "there is no pattern to
follow". All three are contradicted by the tree.

- `@orkestrel/test/browser` exports `stageMedia(options: MediaOptions)` and `releaseMedia()`.
  `MediaOptions` carries a `motion` field, and the installed declaration states: "If `motion` is
  true, uses no preference; if false, uses reduced motion."
  Read at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1619-1625` and `:2666-2688`.
- Proofs in the very project this unit writes into already use it:
  `tests/src/styles/mixins.test.ts:48-53` stages `motion: false`, reads `transition-duration`
  collapse to `0s`, releases, and reads `0.15s` back. `tests/src/styles/components/button.test.ts`
  and `tests/src/styles/elements/button.test.ts` stage it in every case.
- `guides/veneer.md:806` already names the contract: "the installed Test `MediaOptions` contract
  stages print and motion only." Motion is the axis it *does* stage; forced colours is the one it
  does not.

I did not stop the unit on this, because the deviation protocol reserves stopping for a conflict
that blocks the objective or needs an unowned change, and this blocks neither: the brief's
built-cascade fallback and the staged reading are both inside my owned files, and the objective says
"prove each by reading the browser". So this unit does **both**, and no behaviour is recorded as
unread:

- `tests/src/styles/components/icon-link.test.ts` case
  `reads the icon transition from the motion tokens and collapses it under reduced motion` stages
  the preference and reads `0.15s → 0s → 0.15s` across `stageMedia({ motion: false })` and
  `releaseMedia()`.
- The adjacent case `gates the collapsed transition on the preference condition in the shipped
  cascade` reads the gated rule's own declarations out of the built cascade, which is what the brief
  asked for, and it catches a collapse written through some other property that the resolved reading
  would agree with.

No mechanism was invented. `stageMedia` is an installed export the sibling proofs already drive.

**The Orchestrator owns the correction**: the scope read's "confirmed-unreachable-as-scaffolded"
finding is wrong, and any successor brief carrying it forward will mis-scope its unit.

## 1. What shipped, by key and family

Nothing was deferred. Every selector the record carries under the three keys is in the built
cascade, and no deferral row was added.

**`icon-link`** — `src/styles/components/_icon-link.scss`

| Family | Shipped as |
| --- | --- |
| `.icon-link` | `display: inline-flex`, `align-items: center`, `gap: 0.375rem`, `text-decoration-color: rgba(var(--vn-link-rgb), var(--bs-link-opacity, 0.5))`, `text-underline-offset: 0.25em`, `backface-visibility: hidden` |
| `.icon-link > .bi` | `flex-shrink: 0`, `inline-size: 1em`, `block-size: 1em`, `fill: currentcolor`, and the `transition` mixin, which emits the declaration and its reduced-motion pair |
| `.icon-link > .bi` under `@media (prefers-reduced-motion: reduce)` | `transition: none`, emitted by that same mixin |
| `.icon-link-hover:hover > .bi`, `.icon-link-hover:focus-visible > .bi` | `transform: var(--bs-icon-link-transform, translate3d(0.25em, 0, 0))` |

**`ratio`** — `src/styles/components/_ratio.scss`

| Family | Shipped as |
| --- | --- |
| `.ratio` | `position: relative`, `inline-size: 100%` |
| `.ratio::before` | `display: block`, `padding-block-start: var(--bs-aspect-ratio)`, `content: ''` |
| `.ratio > *` | `position: absolute`, `inset-block-start: 0`, `inset-inline-start: 0`, `inline-size: 100%`, `block-size: 100%` |
| `.ratio-{w}x{h}` | `--bs-aspect-ratio` from an `@each` over `(1 1), (4 3), (16 9), (21 9)`, each value `math.div($height, $width) * 100%` |

**`vr`** — `src/styles/components/_vr.scss`: `display: inline-block`, `align-self: stretch`,
`inline-size: var(--bs-border-width)`, `min-block-size: 1em`, `background-color: currentcolor`,
`opacity: 0.25`.

Logical substitutions applied per the standing ruling: `width`/`height` → `inline-size`/`block-size`,
`min-height` → `min-block-size`, `padding-top` → `padding-block-start`, `top`/`left` →
`inset-block-start`/`inset-inline-start`. `tests/src/styles/index.test.ts` reads the whole shipped
cascade for physical inline-axis declarations and reports none.

## 2. Partial placement — three partials, named for their keys

Three partials, one per key, at `src/styles/components/_icon-link.scss`, `_ratio.scss`, and
`_vr.scss`, each loaded once from `src/styles/index.scss` after `components/table` and before
`utilities/gap`.

`.claude/rules/architecture.md` governs TypeScript placement and says nothing about SCSS partials;
`.claude/rules/styles.md` fixes the centralized files and the layer rule and leaves partial
granularity open. So the tree decides, and the tree puts one partial per class family under the
folder whose layer it writes into. I named each file for the inventory key it ships rather than for a
concept word, because the key is what every proof, guide row, conformance list, and deferral row in
this campaign is keyed by, and a reader asking where the `vr` key lives finds it without reading
prose. `elements/_hr.scss`, `_tr.scss`, and `_dl.scss` are the precedent for a short subject name as
a filename; the hyphen in `_icon-link.scss` is the first in this tree, and the policy mirror rule
resolves it correctly (`tests/src/styles/components/icon-link.test.ts` → `_icon-link.scss`).

## 3. The Unknowns

**Whether the browser setup can drive the reduced-motion preference.** It can. See § 0.

**Whether the three keys want three partials or fewer.** Three, per § 2. The convention does not say
otherwise; it says one partial per class family, and these are three unrelated families.

**Whether the shared-block sweep reports anything.** It does not. `scanStyleBlocks()` over
`src/styles` with the new partials present reports `files 56, pairs 1540, shared []`. The standing
assertion in `tests/setupStyles.test.ts` (`carries no shared written declaration block across style
partials`) passes. No fix reaches another partial.

## 4. Red-then-green readings

### 4a. A recorded selector removed from the built cascade

Instrument: `tmp/units/cl10-control.mjs` (saves a pristine copy before its first mutation; `dist/` is
git-ignored build output, so no tracked file is touched).

```text
$ node tmp/units/cl10-control.mjs restore
restore dist/src/styles/index.css sha256 0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2

$ node tmp/units/cl10-control.mjs remove
remove dist/src/styles/index.css sha256 4fab1ecdaff6e8233a5d605c690adf5e2edbc9d9a06ad813a1bd3f3db25aa599

$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup \
    -t "binds the built class-family selector and media-condition multiset to the inventory minus deferrals"
 Test Files  1 failed | 2 skipped (3)
      Tests  1 failed | 153 skipped (154)
```

The failure names the missing entry:

```text
@@ -417,7 +417,6 @@
    "[\".table-warning\",[]]",
-   "[\".vr\",[]]",
```

```text
$ node tmp/units/cl10-control.mjs restore
restore dist/src/styles/index.css sha256 0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2

$ npx vitest run ... --project setup -t "binds the built class-family selector ..."
vitest exit 0
 Test Files  1 passed | 2 skipped (3)
      Tests  1 passed | 153 skipped (154)
```

### 4b. An unrecorded selector added under one of these prefixes

```text
$ node tmp/units/cl10-control.mjs add
add dist/src/styles/index.css sha256 31c75a83708768c1eb4d739ee86f86317ea9a6a90e3c0104560ef660efe4ae18

$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
vitest exit 1
 Test Files  1 failed | 2 passed (3)
      Tests  2 failed | 152 passed (154)

 FAIL  |setup| tests/setupStyles.test.ts > styles setup > binds the built class-family selector and
 media-condition multiset to the inventory minus deferrals
+   "[\".ratio-5x4\",[]]",
```

The plant was `@layer components{.ratio-5x4{--bs-aspect-ratio:80%}}`. The comparison is the assertion
that reads it — the presence scan stayed silent, as expected. A second, unrelated case
(`ships an RTL cascade that needs no flipping`) also fired, because the instrument writes one side of
the byte-identical LTR/RTL pair; that is an artifact of the instrument, not of the comparison.

```text
$ node tmp/units/cl10-control.mjs restore
restore dist/src/styles/index.css sha256 0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2

$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
vitest exit 0
 Test Files  3 passed (3)
      Tests  154 passed (154)
```

### 4c. One emitted value can fail

Instrument: `tmp/units/cl10-value.mjs`, which retunes the vertical rule's opacity in its own partial
and puts back the exact byte it replaced.

```text
$ node tmp/units/cl10-value.mjs break
break src/styles/components/_vr.scss sha256 c20bbb6ad3ceef106d98d2c0cfea725c7eb2be526cde406f6e87a5ca122efd0f

$ npm run test:src:styles
exit 1
 FAIL  |chromium| tests/src/styles/components/vr.test.ts:62:2 > vertical rule > paints the inherited
 color at a quarter opacity
AssertionError: expected '0.35' to be '0.25' // Object.is equality
 Test Files  1 failed | 57 passed (58)
      Tests  1 failed | 410 passed (411)

$ node tmp/units/cl10-value.mjs restore
restore src/styles/components/_vr.scss sha256 cf667ec56a911f951a03ee388a428582a356562688e6c6e7a5e9210b59eceaff

$ npm run test:src:styles
exit 0
 Test Files  58 passed (58)
      Tests  411 passed (411)
```

### 4d. Restoration digests

Current on-disk digests, after the full gate chain re-ran the build:

```text
$ sha256sum src/styles/components/_vr.scss dist/src/styles/index.css
cf667ec56a911f951a03ee388a428582a356562688e6c6e7a5e9210b59eceaff *src/styles/components/_vr.scss
0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2 *dist/src/styles/index.css
```

The cascade digest equals the pristine copy taken before the first mutation, and a full `npm run
build` reproduces it byte for byte, so the source is fully restored.

## 5. Departures recorded

All four are in `guides/veneer.md` § Styles / Helper classes.

- **The prefixed backface property is absent.** Measured, not assumed: the built cascade carries
  `backface-visibility: hidden` on `.icon-link` and no `-webkit-backface-visibility`. The record
  carries both. **The prefixed `-webkit-text-decoration-color` alias is not a departure** — the build
  emits it from the standard property without the source declaring it, which is why `_link.scss` also
  ships it unauthored. So this key's two prefixed properties settle in opposite directions, and the
  tree's own precedent (`::-webkit-file-upload-button`, already Excluded for exactly this reason)
  chose the same treatment for the one the build drops.
- **The icon's transition reads Veneer's motion tokens.** The record carries `0.2s ease-in-out`;
  Veneer writes `var(--vn-motion-feedback) var(--vn-ease-standard)`, resolving to `0.15s ease` and
  rescaling with `--vn-factor-motion`, as `.btn` already does. A literal duration would ignore the
  motion factor this package publishes, and a consumer setting `--vn-factor-motion: 0` would still
  get a moving icon. The proof reads the factor retune (`0.15s → 0.3s → 0.15s`).
- **The shift's inline direction is physical.** `translate3d(0.25em, 0, 0)` carries an inline
  direction no logical property replaces, and one byte stream serves either writing direction. The
  direction scanner's ruled families exclude transforms, so nothing reports it; it is recorded in the
  guide instead. Consistent with the standing no-RTL-variation ruling.
- **The undefined class in the combinator.** `.bi` is Bootstrap Icons' class. The combinator ships
  per CL7's ruling and the bound is stated in the guide. The setup proof asserts that no cascade
  selector *is* `.bi` and that every selector mentioning it names a Veneer class beside it; the
  browser proof reads a bare `.bi` outside any `.icon-link` and finds it unsized.

Two measured facts recorded beside them:

- **No token was needed or added.** The vertical rule reads the pre-declared `--bs-border-width`
  alias, and its `0.25` opacity stays a literal, matching how `elements/_hr.scss` carries its own
  `0.2`. `src/styles/_tokens.scss` and `src/core/constants.ts` are untouched.
- **The build shortens every percentage to six significant digits.** The authored ratio is
  `42.8571428571%` and the shipped value is `42.8571%`; the grid's shipped `.col-1` is `8.33333%`
  against an authored `8.33333333%`. So no reading of the built cascade can tell an eight-decimal
  source from a ten-decimal one, and the terrain record's prediction that the comparison would redden
  on the scale does not hold at the cascade. The scale still matters at the source, and the proof
  reads it there: it compiles `_ratio.scss` with Sass and compares the authored values against the
  record, with a control asserting the eight-decimal scale would differ.

Related measured correction: **the record's precision is Sass's own default emission precision**.
Writing `math.div($height, $width) * 100%` bare emits `100%`, `75%`, `56.25%`, and `42.8571428571%`
verbatim, with no rounding arithmetic. That is why the family carries ten decimal places and the grid
carries eight — the grid's official arithmetic rounds and this family's does not.

## 6. Gate chain

Managed Chromium, in order, each run bare and its exit code read:

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (208 files) |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run build` | 0 | `dist/src/styles/index.css` 91.35 kB; app browser bundle emitted |
| `npm test` | 0 | Every project below |

`npm test` per project: `src:core`+`src:browser` 8 files / 51 tests; `src:styles` 58 files / 411
tests; `app:browser` 10 files / 26 tests; `journey` 4 files / 84 passed, 4 skipped; `policy` 109
passed, 1 skipped; `config` 173 passed, 1 skipped; `setup` 3 files / 154 tests; `setup:browser` 33
tests; `conformance` 10 tests; `guides` 18 tests.

Edge, through `PLAYWRIGHT_CHANNEL=msedge`:

| Command | Exit | Result |
| --- | --- | --- |
| `npm run test:src:styles` | 0 | 58 files, 411 tests passed |
| `npm run test:setup:browser` | 0 | 33 tests passed |
| `npm run test:app:browser` | 0 | 10 files, 26 tests passed |

The journey suite reddened once mid-unit and is green now; see § 8.

## 7. Tree state

```text
$ git status --porcelain --untracked-files=all
 M app/browser/constants.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/sections/LayoutSection.test.ts
 M tests/app/browser/sections/LinkSection.test.ts
 M tests/app/browser/sections/MediaSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/components/_icon-link.scss
?? src/styles/components/_ratio.scss
?? src/styles/components/_vr.scss
?? tests/src/styles/components/icon-link.test.ts
?? tests/src/styles/components/ratio.test.ts
?? tests/src/styles/components/vr.test.ts
```

```text
$ git diff --stat
 app/browser/constants.ts                         |  31 +++-
 guides/veneer.md                                 | 182 ++++++++++++++++-------
 src/styles/index.scss                            |   3 +
 tests/app/browser/sections/LayoutSection.test.ts |   2 +
 tests/app/browser/sections/LinkSection.test.ts   |  11 ++
 tests/app/browser/sections/MediaSection.test.ts  |  24 ++-
 tests/conformance.test.ts                        |   3 +
 tests/setupConformance.test.ts                   |   3 +
 tests/setupStyles.test.ts                        | 105 ++++++++++++-
 tests/setupStyles.ts                             |  41 ++++-
 10 files changed, 339 insertions(+), 66 deletions(-)
```

Every path is in the brief's owned set. Nothing off-limits was touched:
`tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`,
`src/styles/_tokens.scss`, and `src/core/constants.ts` are unchanged.

`guides/veneer.md` reports 182 changed lines because the formatter reflowed the Files table's column
padding after a longer row joined it. Ignoring whitespace the change is 73 insertions and 5
deletions, and the five removed lines are the table separator plus the four sentences I deliberately
replaced.

`tmp/` is git-ignored and out of scope; it holds the instruments and gate logs this report cites.

## 8. What each file does

- `src/styles/components/_icon-link.scss`, `_ratio.scss`, `_vr.scss` — the three keys, one partial
  each, in the components layer.
- `src/styles/index.scss` — loads the three partials once, after `components/table`.
- `tests/setupStyles.ts` — the collector's selector prefix now admits `icon-link`, `ratio`, and `vr`
  and its doc names the population and the preference condition; adds `RATIO_CASES` (each aspect
  bound to the record and to its own name) and `ICON_LINK_MARKUP`.
- `tests/setupStyles.test.ts` — the comparison's key tuple gains the three keys; adds a permanent
  prefix-admission control (each prefix read against a longer name that merely begins with it, and
  the legacy pseudo-element the build lowers read back in its double-colon form), the ratio
  scale-and-record binding with its eight-decimal control, and the icon-class binding.
- `tests/src/styles/components/icon-link.test.ts`, `ratio.test.ts`, `vr.test.ts` — the browser
  proofs.
- `tests/conformance.test.ts`, `tests/setupConformance.test.ts` — the three keys added to the two
  component enumerations, in sorted position.
- `guides/veneer.md` — Files rows, a Helper classes subsection with the departures and bounds,
  Compatibility rows (`icon-link` selector; `ratio` selector and variable; `vr` selector), and the
  Showcase and Tests paragraphs.
- `app/browser/constants.ts` and the three section proofs — the showcase specimens.

## 9. Showcase placement, and the assertion that caught it

No new section. The three specimens went into the sections that own their subjects: the icon links to
**Links**, the aspect ratios to **Media**, the vertical rule to **Layout**. The tree groups sections
by subject rather than by Bootstrap's documentation category — `.blockquote` sits in Type, not in a
"Typography" region, and `.img-*` and `.figure*` share Media — so a "Helpers" region would have been
the first section grouped the other way. Neither enumerating assertion needed to grow: the barrel key
list and the region title list are both unchanged, and the Showcase proof's specimen-name list derives
from the constants.

**One assertion did catch me, and its fix was in my own scope.** My first specimens used inline
`style` attributes for the ratio host width and the vertical rule's flex row. The journey proof
`tests/app/browser/integration.test.ts:620` asserts `extractStyles(mounted.host)` is empty — the
showcase may declare no inline style anywhere. That file is off-limits to this unit, and correctly
so: the fix belongs in the specimens. They now use shipped classes only — `.container-fluid` +
`.row.row-cols-4` for the ratio grid, and `.navbar > .container-fluid` for the vertical rule's flex
row. `npm run test:journey` exits 0 with 84 passed, 4 skipped.

## 10. What I could not close

Nothing in the unit's scope is open. Three items for the Orchestrator:

1. **The scope read's reduced-motion finding is wrong** (§ 0). It is retained at
   `.orkestrel/veneer/units/cl10-scope-read-report.md` and was folded into the brief, so it will
   propagate unless corrected.
2. **The terrain record's rounding prediction does not hold at the cascade** (§ 5). The record says a
   grid-copied scale "reddens the comparison"; the build shortens both scales to the same six
   significant digits, so no cascade reading distinguishes them. The scale claim is true at the
   source and this unit proves it there. This does not change what shipped — the authored value
   matches the record either way — but a successor brief repeating the prediction would mis-state its
   evidence.
3. **Chrome serializes a translate on an outermost `svg` element with its translation zeroed.**
   `getComputedStyle(svg).transform` reports `matrix(1, 0, 0, 1, 0, 0)` for
   `translate3d(3.5px, 0, 0)`, for an inline `translate(3.5px, 0)`, and for the shipped rule alike,
   while the resting state correctly reports `none`. So a transform-string assertion on an SVG icon
   passes for every distance. The proof reads the painted offset from
   `getBoundingClientRect()` instead, after `waitForAnimations`, and the reason is recorded in a
   comment above the case. Any later unit asserting a transform on an SVG needs the same treatment.
