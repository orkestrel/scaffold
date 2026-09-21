# CL5c — report

**Obligation 2's mark ruling is not closed. It cannot be closed from this brief's scope.** Every
other obligation is closed and every gate exits 0 on managed Chromium and Edge. Detail follows.

## Obligation 1 — one implementation carries the three specimen sections

I chose a shared base the three extend, in `app/browser/sections/SpecimenSection.ts`. It holds the
whole behavior: it creates the section, sets the label from its copy, appends the lead paragraph,
appends one container per specimen row, and removes the region on destruction. `ContentSection`,
`TypeSection`, and `MediaSection` are each now a constructor passing their own copy object and
specimen table to `super`.

I chose the base over one parameterized class because the barrel proof pins the exact export-name
set and each section proof constructs its class by name, so each section has to stay its own
constructible export. The base is concrete rather than abstract, because a specimen region built
from a copy and a table is directly usable and directly provable, and
`tests/app/browser/sections/SpecimenSection.test.ts` constructs it with a table no shipped
constant carries.

`ButtonSection` is untouched. It differs in kind: it owns an engine array, mounts through a private
pair, applies a grid class, constructs an engine per specimen the published selector does not
match, and releases those engines before removing its region. A shape covering it would carry
engine lifecycle the three data-only sections do not have.

`app/browser/types.ts` gained `SectionCopy`, the region name and lead paragraph the base reads.
`app/browser/index.ts` gained the `SpecimenSection` row, and `tests/app/browser/index.test.ts`
gained that name in its pinned key set.

## Cases that kept passing with no expectation edited

- `tests/app/browser/sections/ContentSection.test.ts`, `TypeSection.test.ts`, and
  `MediaSection.test.ts`: every case in all three, unedited files.
- `tests/app/browser/Showcase.test.ts`: the region-sequence case still reads
  `['Showcase', 'Buttons', 'Content', 'Type', 'Media']` and the same specimen order, and still
  proves the sections are destroyed before the nodes leave the page.
- `tests/app/browser/integration.test.ts` and `ButtonSection.test.ts`: unedited.

`npm run test:app:browser` went from 6 files / 17 tests to 7 files / 20 tests. The three added
cases are the new `SpecimenSection` proof.

## Obligation 2 — the mark pair: blocked, with the patch

I implemented brief 2's restated ruling exactly, in the three files it grants, and measured what
it does. Both readings are real; neither is a broken gate.

**What I ran.** `--vn-text-mark: marktext` and `--vn-surface-mark: mark` added to the `:root`
block of `src/styles/_tokens.scss`; `mark` in `src/styles/elements/_mark.scss` and `.mark` in
`src/styles/components/_type.scss` each declaring `padding: 0 0.1875em`, `color:
var(--vn-text-mark)`, and `background-color: var(--vn-surface-mark)`.

**Reading 1 — the tag's paint does not move.** `tests/src/styles/elements/mark.test.ts` passed
unedited, in both modes, against the same `TEXT_MARK_CASES` values it reads at HEAD:
`padding-block-start: 0px`, `padding-inline-start: 2.625px`, `color: rgb(0, 0, 0)`,
`background-color: rgb(255, 255, 0)`. Declaring the paint explicitly from tokens holding the system
colours delivers exactly what the user-agent rule was already supplying. Brief 2's required
before-and-after reading is therefore satisfied.

**Reading 2 — the two partials then share one declaration block.**
`npm run test:setup` → exit 1, 1 failed | 137 passed (138), in
`tests/setupStyles.test.ts > styles setup > carries no shared written declaration block across
style partials`:

```text
"declarations": ["padding: 0 0.1875em", "color: var(--vn-text-mark)",
                 "background-color: var(--vn-surface-mark)"]
"left":  { "path": "components/_type.scss", "line": 42 }
"right": { "path": "elements/_mark.scss",   "line": 2 }
```

This is the finding about my own change, not a gate to widen. The rule it reports is
`.claude/rules/styles.md`: a pattern in two partials moves to `_mixins.scss`, which is what CL5b
did for `heading-text` and `image-size`. The sweep reads written SCSS and a block whose only
statement is an `@include` carries no declarations, so the mixin closes it. **`src/styles/_mixins.scss`
is off-limits to this unit.**

Every alternative inside the granted scope is a dodge or a weakening, and I took neither:
perturbing one side's property spelling to drop the intersection below the threshold games the
instrument; leaving the tag on the user-agent rule makes the twin equal by coincidence, so a
consumer retuning either token moves the class and not the tag, which is the property brief 2
names as the point of the ruling.

**Reading 3 — the two tokens need registry rows.**
`tests/src/styles/tokens.test.ts` → 2 failed cases, both reporting the cascade declaring
`--vn-surface-mark` and `--vn-text-mark` that `TOKEN_NAMES` does not carry:

```text
declares the canonical registry and the compatibility list at the document scope
declares the same partitions in the right-to-left cascade
AssertionError: expected [ '--vn-border-color', …(183) ] to deeply equal [ …(181) ]
+ "--vn-surface-mark"
+ "--vn-text-mark"
```

That proof asserts the `:root` `--vn-*` partition equals the registry exactly, so a new root token
is a `src/core/constants.ts` change. **`src/core/constants.ts` is not in this brief's Owned list,
and `tests/src/styles/tokens.test.ts` is not either.**

I reverted all three style files. `src/` is byte-identical to HEAD.

### The patches, for whoever owns those files

`src/styles/_mixins.scss`, beside `heading-text`:

```scss
@mixin mark-text {
	padding: 0 0.1875em;
	color: var(--vn-text-mark);
	background-color: var(--vn-surface-mark);
}
```

`src/core/constants.ts`, in `TOKEN_NAMES`: add `mark: '--vn-text-mark',` to the `text` group after
its `highlight` leaf, and `mark: '--vn-surface-mark',` to the `surface` group after its
`highlight` leaf.

The successor then owns, inside the files this brief already grants: the two `:root` tokens in
`src/styles/_tokens.scss`; `mark { @include mark-text; }` in `src/styles/elements/_mark.scss` with
`@use '../mixins' as *;`; `.mark { @include mark-text; }` in `src/styles/components/_type.scss`;
`TYPE_MARK_CASES` in `tests/setupStyles.ts`, whose `padding` row becomes an inline-axis reading
with a `0px` block-axis reading beside it; and the comparison case in
`tests/src/styles/components/type.test.ts` mounting `<mark>` and `<span class="mark">` in one host
and asserting the resolved paint and padding equal.

## Obligation 2 — the caption pair, measured

Both values read on managed Chromium, from the hosts
`tests/src/styles/components/image.test.ts` already mounts:

| Mode  | Bare `figcaption` — `--vn-text-muted`  | `.figure-caption` — `--bs-secondary-color`         |
| ----- | -------------------------------------- | -------------------------------------------------- |
| light | `oklch(0.446 0.043 257.281)`           | `color(srgb 0.0571636 0.0900503 0.168809 / 0.75)`  |
| dark  | `oklch(0.704 0.04 256.788)`            | `color(srgb 0.885835 0.910244 0.942581 / 0.75)`    |

**Ruling: they do not resolve alike, so neither side moves.** The bare caption takes an opaque
muted colour of its own; the classed caption takes the body text colour at 75% alpha. Bootstrap
styles its bare `figcaption` too, so this pair is not the mark pair's kind of defect, and the
existing assertion at `image.test.ts` recording the difference stands unedited.

## Obligation 2 — the figure pair, read

`tests/src/styles/components/image.test.ts` now reads the residue beside the display on the
classed figure: `display: inline-block`, `flex-direction: column`, `gap: 8px`. The direction and
the gap come from the tag rule and apply to nothing, because the class took the inline box back.
A change giving `.figure` a flex or grid display reddens the display reading in the same case that
records the gap it would re-arm, so the re-arming names itself.

## Obligation 3.1 — the retune tables' invariant

`tests/setupStyles.test.ts`, in the case that freezes the component case tables, now asserts every
`TYPE_HEADING_TOKEN_CASES` and `TYPE_DISPLAY_TOKEN_CASES` retune value is disjoint from every size
`TYPE_HEADING_CASES` and `TYPE_DISPLAY_CASES` carry.

**Red then green, with the final assertion in place.** Planting `TYPE_HEADING_TOKEN_CASES`'s `h1`
row at its own default, `value: '36px'`:

- `npm run test:setup` → exit 1, **1 failed | 137 passed (138)**,
  `AssertionError: expected [ '36px' ] to deeply equal []`.
- `npm run check` → exit 0 with the plant, so the runtime assertion is what catches it.
- Reverted to `'101px'`: `npm run test:setup` → exit 0, **138 passed (138)**.

The plant is the real silent disarm: with `'36px'` in place, `npm run test:src:styles` passed
**50 files / 239 tests** at the time, so the whole retune matrix stayed green while proving
nothing about which token the `h1` level names.

The set is widened to `Set<string>` deliberately. The frozen tables carry literal types, so a
narrowly typed set makes `tsc` refuse the reading outright and the invariant would then rest on
the two unions staying disjoint rather than on an assertion a changed row can fail. A comment in
the case says so.

`tests/setupStyles.ts` is unchanged and byte-identical to HEAD.

## Obligation 3.2 — the colour control has its own case

`tests/src/styles/components/type.test.ts` split. The `TYPE_HEADING_CASES` agreement case keeps
size, line, weight, margin, and the inherited-colour equality, and mounts one host. A new
`it.each(TYPE_HEADING_CASES)` case, `delivers a declared heading color to the $twin class and to
its own tag`, mounts the painted host alone and reads colour alone. It takes the shape
`tests/src/styles/elements/heading.test.ts` already uses for the identical control.

The styles project went from 239 to 245 tests: the six added cases are that split, one per twin.

## Guide rows my rulings imply — listed, not written

`guides/veneer.md` is absent from the diff. For whoever owns it:

- § Showcase: the three text-specimen regions are rendered by one implementation the named
  sections extend, and the application barrel publishes it.
- § Tokens: no row yet. A row for `--vn-text-mark` and `--vn-surface-mark` is owed by the unit
  that lands the mark ruling, with the departure it carries — the Veneer mark highlight follows
  the system colours the calibration measured rather than `--bs-highlight-bg` and
  `--bs-highlight-color`, so a consumer retuning those Bootstrap properties moves nothing.
- § Tests: the figure class case records the inert flex residue; the caption pair is two bindings
  on purpose and not a twin defect.

## Gates

Ordered chain from the checkout root, managed Chromium:

| Step                    | Exit | Final reading                                    |
| ----------------------- | ---- | ------------------------------------------------ |
| `npm run format:check`  | 0    | `All matched files use the correct format.` (186 files) |
| `npm run lint:check`    | 0    | no diagnostics                                   |
| `npm run check`         | 0    | root, src core, src browser, src styles, app browser |
| `npm run build`         | 0    | `✓ built in 537ms`                               |
| `npm test`              | 0    | every project passed; styles 50 files / 245 tests, app:browser 7 files / 20 tests, setup 3 files / 138 tests |

Edge, `PLAYWRIGHT_CHANNEL=msedge`:

| Step                        | Exit | Final reading              |
| --------------------------- | ---- | -------------------------- |
| `npm run test:src:styles`   | 0    | 50 files / 245 tests       |
| `npm run test:setup:browser`| 0    | 1 file / 33 tests          |
| `npm run test:app:browser`  | 0    | 7 files / 20 tests         |

## Status

```text
 M app/browser/index.ts
 M app/browser/sections/ContentSection.ts
 M app/browser/sections/MediaSection.ts
 M app/browser/sections/TypeSection.ts
 M app/browser/types.ts
 M tests/app/browser/index.test.ts
 M tests/setupStyles.test.ts
 M tests/src/styles/components/image.test.ts
 M tests/src/styles/components/type.test.ts
?? app/browser/sections/SpecimenSection.ts
?? tests/app/browser/sections/SpecimenSection.test.ts
```

```text
 app/browser/index.ts                      |  1 +
 app/browser/sections/ContentSection.ts    | 31 ++++---------------------------
 app/browser/sections/MediaSection.ts      | 31 ++++---------------------------
 app/browser/sections/TypeSection.ts       | 31 ++++---------------------------
 app/browser/types.ts                      |  8 ++++++++
 tests/app/browser/index.test.ts           |  6 ++++--
 tests/setupStyles.test.ts                 | 16 ++++++++++++++++
 tests/src/styles/components/image.test.ts |  8 +++++++-
 tests/src/styles/components/type.test.ts  | 29 +++++++++++++++++------------
 9 files changed, 65 insertions(+), 96 deletions(-)
```

Every path is in the Owned set. `guides/veneer.md`, `src/styles/_tokens.scss`, `_mixins.scss`,
every partial, `src/core/constants.ts`, `tests/setupConformance.ts`, `tests/setupStyles.ts`, and
the vendored files are all absent from it.

## Acceptance criteria

| Criterion | State |
| --- | --- |
| 1 one implementation, no repeat, existing cases unedited | met |
| 2 showcase region sequence unchanged | met |
| 3 mark twin renders the same paint and padding | **not met — blocked** |
| brief 2: the tag's paint unmoved by declaring it | measured and true; ships with criterion 3 |
| brief 2: `_tokens.scss` gains exactly the two tokens | **not met — blocked** |
| 4 caption pair reported, existing assertion left | met |
| 5 figure case reads the residual gap | met |
| 6 disjointness asserted, red then green | met |
| 7 painted colour host has its own case | met |
| 8 `guides/veneer.md` absent from the diff | met |
| 9 every gate exits 0 on both engines | met |
| 10 status lists only owned files | met |

## Deviation

Reported under `.agents/orchestration.md` § Deviation protocol.

- **Expected:** brief 2's mark ruling closes inside `src/styles/_tokens.scss`,
  `elements/_mark.scss`, and `components/_type.scss`.
- **Found:** it needs two files the brief does not grant — `src/styles/_mixins.scss` for the
  shared treatment, and `src/core/constants.ts` for the two registry rows. Evidence is Reading 2
  and Reading 3 preceding, each taken with the ruling implemented in the granted files.
- **Done:** obligations 1, 3.1, and 3.2, and obligation 2's caption and figure items. The tag's
  before-and-after paint reading brief 2 asks for is taken and recorded.
- **Not done:** obligation 2's mark item and its two criteria. The tree carries none of it; `src/`
  is byte-identical to HEAD.
- **Hypothesis:** brief 2's correction was drafted against the styles rule's prose and not against
  the shared-block sweep CL5b landed or the registry partition `tests/src/styles/tokens.test.ts`
  asserts, so the ruling is right and its scope is one mixin and two registry rows short.

Ancillary choices I settled myself, as the contract scopes: the shared shape and its name
(`SpecimenSection`, a concrete base the three extend); where the figure residue is read (the
classed figure's case in `image.test.ts`, beside the display reading it pairs with); the
disjointness set's widening to `Set<string>`; and the split colour case staying per-twin.
