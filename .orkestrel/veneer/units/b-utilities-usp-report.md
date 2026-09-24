<!-- Retained by the Orchestrator: `usp-status.txt` and `usp.diff` captured read-only from /home/user/veneer-usp at retention, because the unit returned none. -->
# UTIL-SPACING (`usp`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-usp` (branch `unit/usp` from
`2a3f223`). Every criterion reads green on the validation copy, and the worktree's format and lint
checks exit 0. No stop condition fired. The brief, the family record, and the tree agreed wherever
the unit read them. The shared patches are in the last section and in
`/home/user/scaffold/.orkestrel/veneer/units/usp-shared.patch`. That patch applies cleanly to `2a3f223`
(`patch -p1 --dry-run`).

## Touched files (owned)

Every owned file is new and untracked. Line counts come from `wc -l`.

| File | Lines | Summary |
| --- | --- | --- |
| `src/styles/utilities/_spacing.scss` | 41 | The margin and padding entries through the `utility` mixin in one `breakpoint-each` walk, in the release's map order. Steps `1`–`5` read `--vn-space-2`, `-4`, `-8`, `-12`, and `-24`; `0` and `auto` stay literal. |
| `src/styles/utilities/_interaction.scss` | 11 | The `user-select` entry and the `pe` pointer-events entry at the empty infix only. |
| `tests/src/styles/utilities/spacing.test.ts` | 237 | The spacing proof: every side and step at every infix; the physical end and start sides; the order between entries and between infixes; density and retune; no negative margin; the dark island; priority; escape. |
| `tests/src/styles/utilities/interaction.test.ts` | 198 | The interaction proof: the values; what one press selects; the pointer passing through; keyboard reach; `pe` padding beside `pe` pointer values; no infix; dark and density; priority; escape. |
| `app/browser/sections/SpacingSection.ts` | 22 | The `SpecimenSection` subclass for the Spacing region. |
| `app/browser/sections/InteractionSection.ts` | 21 | The `SpecimenSection` subclass for the Interaction region. |
| `tests/app/browser/sections/SpacingSection.test.ts` | 242 | The Spacing section proof: the render contract and class labels; the room at the 390 and 1280 variants; the auto-margin placement; destruction. |
| `tests/app/browser/sections/InteractionSection.test.ts` | 112 | The Interaction section proof: the render contract and labels; the hit test through the pointer-free link; the selection values; destruction. |

Diffstat of the shared patch against `2a3f223`: `src/styles/index.scss` +2; `tests/conformance.test.ts` +31;
`tests/setupServer.test.ts` +15; `tests/setupStyles.ts` +59; `tests/setupStyles.test.ts` +122;
`tests/setup.ts` +56; `app/browser/constants.ts` +102; `app/browser/Showcase.ts` +4;
`app/browser/index.ts` +2; `tests/app/browser/Showcase.test.ts` +6; `tests/app/browser/index.test.ts` +6;
`tests/app/browser/integration.test.ts` +4; `tests/setup.css` +1 −1;
`tests/fixtures/tailwind/consumer.css` +1 −1; `tests/fixtures/tailwind/preflight.css` +1 −1;
`tests/fixtures/tailwind/markup.html` +91; `guides/veneer.md` +747 −2.

## Baseline (worktree, before any edit)

- `npm run test:conformance`: exit 0, 22 passed (`.orkestrel/veneer/units/usp-instruments/usp-baseline-conformance.log.txt`).
- `npm run test:service`: exit 0, 18 passed (`.orkestrel/veneer/units/usp-instruments/usp-baseline-service.log.txt`).

## Scoped gate exits

Each gate was read from the final run of `.orkestrel/veneer/units/usp-instruments/usp-gates.sh`
(`.orkestrel/veneer/units/usp-instruments/usp-gates.log.txt`). The worktree gates ran in `/home/user/veneer-usp`. The rest ran
on the validation copy `tmp/probe/base` (`2a3f223` + owned files + the shared patch).

| Criterion | Command | Result |
| --- | --- | --- |
| 1 | `npm run format:check` (worktree) | exit 0 |
| 1 | `npm run lint:check` (worktree) | exit 0 |
| 2 | `npm run check` | exit 0 |
| 3 | `npm run build:src`, then `node .orkestrel/veneer/units/usp-instruments/usp-cascade.mjs` | exit 0. Inventory 551 selectors under the unit's keys, cascade 551. None missing, none extra, none repeated. 710 declarations: every property declaration `!important`, and no custom property. |
| 4 | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts` | exit 0, 22 passed |
| 5 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts tests/app/browser/sections/InteractionSection.test.ts` | exit 0, 8 passed |
| 6 | `npm run test:conformance` (ledger rows applied in the copy's guide) | exit 0, 22 passed |
| 7 | `npm run build:src:styles && npm run test:service` | exit 0, 18 passed |
| — | `npm run test:setup` | exit 0, 267 passed |

These runs were also read on the copy as observations:

- The full `src:styles` project: 94 files, 1081 passed (`usp-base-styles-all.log.txt`).
- `npm run test:app`: 42 files, 120 passed (`usp-base-app-all.log.txt`).
- `npm run test:policy`: 109 passed and 1 skipped (`usp-base-policy.log.txt`).
- `npm run test:guides`: 19 passed (`usp-base-guides.log.txt`).

The journey and `CAPTURE=1` runs were not taken.

### Failing-first reading

The owned styles proofs ran against the `2a3f223` barrel, which loads neither partial, and then
against the barrel with the unit's `@use` lines (`.orkestrel/veneer/units/usp-instruments/usp-first.sh`,
`.orkestrel/veneer/units/usp-instruments/usp-first.log.txt`).

- The command in both runs was `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts`.
- Before: exit 1, 22 failed (22). Every case failed.
- After: exit 0, 22 passed (22).

## Coverage matrix

The spacing proof is `spacing.test.ts` and the interaction proof is `interaction.test.ts`.
Mutations are named as in `.orkestrel/veneer/units/usp-instruments/usp-mutate.log.txt`. Each one reddened the listed cases and
nothing unrelated.

| Inventory selectors and condition | Proof case | Distinguishing mutation | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.m-{0..5,auto}`, no condition | spacing: `resolves every side and step around the 'xs' boundary` (read at 375 and 1401); `reads each step from its space token…`; `resolves the same steps inside a dark island`; `keeps every side over a later unlayered consumer rule`; `yields to an important override…` | wrong step map (step 3 reads `--vn-space-6`); a literal in place of the step token; the built `.m-3` rule written normal; the spacing partial left unlayered | Margin steps (`m-0`–`m-5`), Auto margins (`m-auto`) | `margin-steps` (`.m-5`, `margin-top`); `auto-margins` |
| `.m-{sm,md,lg,xl,xxl}-{0..5,auto}`, `@media (min-width: 576px)` … `(min-width: 1400px)` | spacing: `resolves every side and step around the '<name>' boundary`, read at the boundary, one pixel below, and one above; `resolves a later entry over an earlier one…` (`.m-md-3.mx-sm-1` at 767 and 768) | breakpoint loop run per entry; wrong step map | Responsive spacing (`m-sm-2`, `m-md-3`, `m-lg-4`, `m-xl-5`) | `responsive-spacing` (`.m-xl-5`, `margin-top`) |
| `.mx`, `.my`, `.mt`, `.me`, `.mb`, `.ms`, each `-{0..5,auto}` at every infix | spacing: the six boundary cases (every side read against the side table); `writes the end and start sides as the physical right and left sides…`; `resolves a later entry…` (`.m-3.ms-1`) | swapped side (`me` writes `margin-left`); wrong step map | Side margins (each at step 4), Auto margins (`mx-auto`, `my-auto`, `mt-auto`, `me-auto`, `mb-auto`, `ms-auto`) | `side-margins` (`.ms-4`, `margin-left`); `auto-margins` (`.mx-auto`, `margin-left`) |
| `.p-{0..5}` at every infix | spacing: the six boundary cases; token, dark, priority, escape | wrong step map; a literal | Padding steps (`p-0`–`p-5`), Responsive spacing (`p-sm-2`, `p-md-3`, `p-lg-4`, `p-xxl-5`) | `padding-steps` (`.p-5`, `padding-top`) |
| `.px`, `.py`, `.pt`, `.pe`, `.pb`, `.ps`, each `-{0..5}` at every infix | spacing: the six boundary cases; `writes the end and start sides…` (`.ps-2`); `resolves a later entry…` (`.p-3.px-1`); interaction: `writes the pointer values beside the padding steps under the one class` (`.pe-3.pe-none`) | padding-x emitted before padding; wrong step map | Side padding (each at step 4) | `side-padding` (`.ps-4`, `padding-left`) |
| `.pe-none`, `.pe-auto`, no condition | interaction: `resolves each selection and pointer value the release writes`; `lets the pointer reach the element beneath a box that takes no pointer events` (`readHit`); `keeps a link that takes no pointer events in the keyboard focus order`; `writes no breakpoint infix…`; dark and density; priority; escape | pointer-events none written as auto; the built `.pe-none` rule written normal; the interaction partial left unlayered | Pointer events | `pointer-events` (`a.pe-none`, `pointer-events`) |
| `.user-select-{all,auto,none}`, no condition | interaction: `resolves each selection…`; `selects the whole line, places a caret, or selects nothing under one press, by value` (`driveHold`, then `Range`/`Caret`/`None`); `writes no breakpoint infix…`; dark and density; priority; escape | user-select all written as auto; user-select none written as auto; user-select auto written as none | Text selection | `text-selection` (`.user-select-none`, `user-select`) |
| Negative margin (scope control: none recorded, none shipped) | spacing: `writes no negative margin at any infix` (`findRule` control `.m-1` found, no `-n` rule at any infix, `.m-n1` reads zero) | a negative margin step shipped | — | — |

The specimens show ramps rather than every selector: every base step of the shorthand, one step
per side, every `auto` variant, and a responsive ramp that reaches every infix. The proofs read
every one of the 551 selectors at its condition. The setup binding case
`binds the spacing steps, properties, and sides and the interaction values to the inventory` holds
the tables to the inventory. It derives the key population by grammar (`/^[mp][xytebs]?$/u`) and
reads every rule's selector, condition width, and longhands. Each of these table mutations
reddens it: step 3 naming the `--vn-space-6` token, and the end suffix naming the left side.

## Precedence cases with their mutations

| Case | Reading | Mutation that reddens it (logged) |
| --- | --- | --- |
| A later entry at one infix | `.p-3.px-1` reads padding `[16, 4, 16, 4]`; `.m-3.ms-1` reads margin `[16, 16, 16, 4]` | padding-x emitted before padding: 1 failed, 21 passed |
| A wider infix over a narrower one | `.m-md-3.mx-sm-1` reads `[0, 4, 0, 4]` at 767 and `[16, 16, 16, 16]` at 768 (16px `margin-left`) | breakpoint loop run per entry: 1 failed, 21 passed |
| Priority over a later unlayered rule | `.probe { margin: 7px; padding: 7px }` leaves `.m-3` at 16 and `.p-2` at 8. `.mt-4` wins the top alone. `.probe { user-select: text; pointer-events: stroke }` leaves `all` and `none`. | the built `.m-3` and `.pe-none` rules written normal: 4 failed |
| The escape | An unlayered `!important` leaves the utility; the same override inside `@layer utilities` wins (9px, `auto`, `text`) | the spacing partial left unlayered: 1 failed; the interaction partial left unlayered: 1 failed |
| The `pe` class shared by two entries | `.pe-3.pe-none` resolves 16px `padding-right` and `pointer-events: none` | wrong step map; pointer-events none written as auto |

## Shared-name table

The table comes from the consumer proof's expansion on the copy: the shared set is the built
cascade's names that the unexcluded instrument also declares. The longhands are the ones
Chromium expands from Tailwind's rule for each name, and the importance is the built cascade's
(`.orkestrel/veneer/units/usp-instruments/usp-shared-names.txt`, 91 names). In each row, every step reads the same.

| Shared names | Longhands Tailwind declares | Veneer importance covers them | Exclusion line |
| --- | --- | --- | --- |
| `m-0`, `m-1`, `m-2`, `m-3`, `m-4`, `m-5`, `m-auto` | `margin-top`, `margin-right`, `margin-bottom`, `margin-left` | covered | off the line |
| `mx-0`, `mx-1`, `mx-2`, `mx-3`, `mx-4`, `mx-5`, `mx-auto` | `margin-inline-start`, `margin-inline-end` | not covered | on the line |
| `my-0`, `my-1`, `my-2`, `my-3`, `my-4`, `my-5`, `my-auto` | `margin-block-start`, `margin-block-end` | not covered | on the line |
| `ms-0`, `ms-1`, `ms-2`, `ms-3`, `ms-4`, `ms-5`, `ms-auto` | `margin-inline-start` | not covered | on the line |
| `me-0`, `me-1`, `me-2`, `me-3`, `me-4`, `me-5`, `me-auto` | `margin-inline-end` | not covered | on the line |
| `mt-0`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `mt-auto` | `margin-top` | covered | off the line |
| `mb-0`, `mb-1`, `mb-2`, `mb-3`, `mb-4`, `mb-5`, `mb-auto` | `margin-bottom` | covered | off the line |
| `p-0`, `p-1`, `p-2`, `p-3`, `p-4`, `p-5` | `padding-top`, `padding-right`, `padding-bottom`, `padding-left` | covered | off the line |
| `px-0`, `px-1`, `px-2`, `px-3`, `px-4`, `px-5` | `padding-inline-start`, `padding-inline-end` | not covered | on the line |
| `py-0`, `py-1`, `py-2`, `py-3`, `py-4`, `py-5` | `padding-block-start`, `padding-block-end` | not covered | on the line |
| `ps-0`, `ps-1`, `ps-2`, `ps-3`, `ps-4`, `ps-5` | `padding-inline-start` | not covered | on the line |
| `pe-0`, `pe-1`, `pe-2`, `pe-3`, `pe-4`, `pe-5` | `padding-inline-end` | not covered | on the line |
| `pt-0`, `pt-1`, `pt-2`, `pt-3`, `pt-4`, `pt-5` | `padding-top` | covered | off the line |
| `pb-0`, `pb-1`, `pb-2`, `pb-3`, `pb-4`, `pb-5` | `padding-bottom` | covered | off the line |

The `pe-none`, `pe-auto`, `user-select-all`, `user-select-auto`, and `user-select-none` names are
not shared: the instrument declares none of them (`.orkestrel/veneer/units/usp-instruments/usp-unshared-names.txt`). The
measured split matches the brief's expectation name for name.

The unit's line names, appended after `start-100` in `tests/setup.css`,
`tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`, and both guide
recipe fences, for the set union:

`mx-0 mx-1 mx-2 mx-3 mx-4 mx-5 mx-auto my-0 my-1 my-2 my-3 my-4 my-5 my-auto me-0 me-1 me-2 me-3 me-4 me-5 me-auto ms-0 ms-1 ms-2 ms-3 ms-4 ms-5 ms-auto px-0 px-1 px-2 px-3 px-4 px-5 py-0 py-1 py-2 py-3 py-4 py-5 pe-0 pe-1 pe-2 pe-3 pe-4 pe-5 ps-0 ps-1 ps-2 ps-3 ps-4 ps-5`

`tests/fixtures/tailwind/markup.html` gains one element for every Veneer margin and padding name,
appended after the `.invisible` element.

Negative controls, run on the copy and reverted (`.orkestrel/veneer/units/usp-instruments/usp-negative.sh`,
`.orkestrel/veneer/units/usp-instruments/usp-negative.log.txt`):

- (a) `m-3` written onto the line in every copy: `npm run test:service` exit 1, 2 failed, 16
  passed. The failing cases were `derives the shared class names, and mounts an element for every one of them`
  and `keeps a shared name on the line while its importance covers only some of the longhands…`
  (`+ "m-3"`).
- (b) `!important` dropped from the built `.m-3` rule: exit 1, the same two cases failed
  (`- "m-3"`).

Notes 3 and 5: the unit's names redden neither profiles case. Without
`up-unscoped-profiles.patch`, `npm run test:service` reads 18 passed. With that patch applied to
the copy's `profiles.test.ts` (then restored), each of those cases fails, and the cause is the patch's
dependence on UTIL-PAINT's names rather than any name of this unit
(`.orkestrel/veneer/units/usp-instruments/usp-base-service-up-patch.log.txt`):

- `declares the one order line in every profile…` reads a statement of the whole order line
  where the patch expects `['properties']`.
- `fills Tailwind reset only under the preflight profile` reads theme variables `['--spacing']`
  where the patch expects `--color-black`, `--color-white`, and `--spacing`.

The off-line names `m-*`, `mt-*`, `mb-*`, `p-*`, `pt-*`, and `pb-*` read the `--spacing` variable
alone and register no custom property. The unit returns no `profiles.test.ts` patch.

## Ledger rows written

`#### <key>` departure tables were written for `m`, `mb`, `me`, `ms`, `mt`, `mx`, `my`, `p`, `pb`, `pe`,
`ps`, `pt`, `px`, `py`, and `user-select`. Each sits at its sorted position in the ledger's
sorted block, and `user-select` follows `table`. The rows are exactly the ones the ledger gate
printed (`usp-base-conformance-2.log.txt`, 546 rows), written by `.orkestrel/veneer/units/usp-instruments/usp-ledger.py`.

- `tokenized`: every step `1`–`5` declaration at every infix, Bootstrap's literal length against
  `var(--vn-space-2)` … `var(--vn-space-24)`. The ledger run printed 540 of these rows, across the spacing keys.
- `dropped`: `.user-select-{all,auto,none}` `-webkit-user-select` and `-moz-user-select`, 6
  rows. The ledger reads the compile before the build, so it records `-webkit-user-select` as
  dropped even though the built cascade carries it (the build adds it). The guide's departure bullet
  states this.
- `### Additions`: none. The additions gates read green with no row.

`npm run test:conformance` on the copy with these rows reads 22 passed, so the ledger, stale,
additions, deferral, priority, and order cases are all green.

## Section text

Showcase copy (in the `app/browser/constants.ts` patch):

- Spacing region paragraph: "Compare the margin steps that set the room around a box, the padding
  steps that set the room inside it, each side on its own, the auto margins that push a box along
  its line, and the steps that grow at each breakpoint. Resize the viewport to watch the responsive
  steps change."
- Spacing specimens: `Margin steps`, `Padding steps`, `Side margins`, `Side padding`,
  `Auto margins`, `Responsive spacing`. Every box is a card, whose border shows the edge the room
  is measured from. The auto margins in the vertical direction sit in `ratio-4x3` boxes inside a
  `container-fluid`, whose padding holds the row's gutter inside the page.
- Interaction region paragraph: "Click each line to compare how much text one press selects, then
  point at each link: a click passes through the link that takes no pointer events and reaches the
  links that take them."
- Interaction specimens: `Text selection` and `Pointer events`. The `.pe-none` link carries
  `tabindex="-1"` and `aria-disabled="true"`, as the release's example does.

The Files rows are `_spacing.scss` ("The margin and padding utilities in the utilities layer.")
and `_interaction.scss` ("The user-select and pointer-events utilities in the utilities layer."),
after the `_flex.scss` row.

The Tests links are the interaction specimens and spacing specimens links, and the spacing
utilities and interaction utilities links. Each was inserted after an existing link line, so no
existing line was rewritten. The compatibility rows are one `selector` row per key after the
`invisible` row. No key records a custom property, so no `variable` row was added.

Guide sections as written:

### Spacing utilities

The margin and padding keys ship whole in the utilities layer from the
`src/styles/utilities/_spacing.scss` partial. The `.m-*` classes set the margin on every side, and
the `.mx-*`, `.my-*`, `.mt-*`, `.me-*`, `.mb-*`, and `.ms-*` classes set it on the horizontal sides,
on the vertical sides, or on one side, each at every step from the `0` step to the `5` step, at the
`auto` step, and at every breakpoint infix. The `.p-*` classes and the `.px-*`, `.py-*`, `.pt-*`,
`.pe-*`, `.pb-*`, and `.ps-*` classes set the padding the same way at the numbered steps; the
release gives the padding no `auto` step. No negative margin ships, because the release's own
default writes none.

Each step from the `1` step to the `5` step reads a space token: the `--vn-space-2`,
`--vn-space-4`, `--vn-space-8`, `--vn-space-12`, and `--vn-space-24` tokens, which resolve to the
release's `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, and `3rem` lengths. Those tokens carry the density
factor, as the components' own internal space does, so the `--vn-factor-density` token moves every
margin and padding step with the components, and a retuned `--vn-space-8` token moves the `.m-3`
and `.p-3` classes on every side. The zero step stays the literal `0` value and the `auto` step the
literal `auto` value, which neither the factor nor a retune moves. The gap steps read the separate
`--vn-gap-*` scale, which carries no density factor, so the density factor moves a margin and leaves
a gap.

The end and start entries write the physical sides, as the release's own stylesheet does: the
`.me-*` and `.pe-*` classes set the right side, and the `.ms-*` and `.ps-*` classes set the left
side, so in a right-to-left scope the `.ms-3` class still sets the left margin. An `auto` margin
takes the room left over on its side: in a flex line the `.ms-auto` class pushes a box to the end of
the line, and the `.mx-auto` class centers a box of definite width.

The partial writes every entry through the `utility` mixin that § Styles describes, so each
declaration carries the `!important` flag the release writes. It walks the breakpoints once and
writes every entry inside each infix in the release's map order: the margin entries, then the
padding entries, the shorthand entry of each ahead of its side entries. So at one infix a side
entry beats the shorthand entry on its own sides: an element carrying the `.p-3` and `.px-1`
classes resolves a 4px horizontal padding and a 16px vertical one. A wider infix beats every
narrower one whichever entry each class belongs to: at a 768px viewport, an element carrying the
`.m-md-3` and `.mx-sm-1` classes resolves a 16px left margin. § Styles shows the escape from an
important utility inside the utilities layer.

The `tests/src/styles/utilities/spacing.test.ts` proof reads every side of every step at every
infix at its boundary and one pixel below it, the physical end and start sides in each direction,
the order between entries and between infixes, the density factor and a retuned token on every
side, the absence of a negative margin, a dark island, the priority over a later unlayered rule,
and the escape inside the utilities layer.

These are the keys' recorded departures.

- **The steps read Veneer's space scale.** The release writes each step from the `1` step to the
  `5` step as a literal length; Veneer writes the `var(--vn-space-2)` to `var(--vn-space-24)`
  values, which resolve to the same lengths at the default density and move with the density
  factor.

### Interaction utilities

The user-select key and the release's pointer-events entry ship whole in the utilities layer from
the `src/styles/utilities/_interaction.scss` partial. The `.user-select-all`, `.user-select-auto`,
and `.user-select-none` classes set what a press selects on an element: one press selects the whole
element, a press selects text the ordinary way, or no press selects any of it. The `.pe-none` class
takes an element out of the pointer's reach, so a click passes through it to whatever lies beneath,
and the `.pe-auto` class brings an element back into reach, including inside an element carrying
the `.pe-none` class. The release writes neither the user-select entry nor the pointer-events entry
at a breakpoint, so no interaction class writes a breakpoint infix.

The `pe` key carries the padding-end steps and the pointer-events values together, because the
release names its pointer-events classes with the class its padding-end entry uses, and the `none`
and `auto` keys are what tell the two apart. The `_spacing.scss` partial writes the padding steps
under the key and this partial writes the pointer values, so an element carrying the `.pe-3` and
`.pe-none` classes resolves both.

The `.pe-none` class stops the pointer and leaves the keyboard alone, so a link carrying it stays
in the keyboard's focus order. The release's own example gives such a link the `tabindex="-1"`
attribute and the `aria-disabled="true"` attribute as well, and the showcase's Interaction region
does the same.

The partial writes each entry through the `utility` mixin, so every declaration carries the
`!important` flag the release writes, and none reads a token, so neither the density factor nor the
color mode moves a value. § Styles shows the escape from an important utility inside the utilities
layer.

The `tests/src/styles/utilities/interaction.test.ts` proof reads each value, what one press
selects under each selection class, the pointer passing through a `.pe-none` cover to the element
beneath it and stopping on a `.pe-auto` cover, the keyboard reaching a `.pe-none` link, the
pointer and padding values under the one class, the absence of an infixed class, a dark island
and the density factor, the priority over a later unlayered rule, and the escape inside the
utilities layer.

These are the key's recorded departures.

- **The prefixed selection properties are absent from the source.** The official cascade writes
  the `-webkit-user-select` and `-moz-user-select` declarations ahead of the `user-select`
  declaration on each class. The partial writes the standard property alone, because the managed
  Chromium and Edge receipts this cascade is proved on resolve it and leave the aliases redundant.
  The build emits the `-webkit-user-select` declaration beside the standard one without the source
  declaring it, and the ledger compares the compile before the build, so it records both aliases as
  dropped.


Tailwind paragraph (a new paragraph after the partial-importance paragraph in § Tailwind):

The margin and padding steps split the same way the offsets do. The `m-*`, `mt-*`, `mb-*`, `p-*`,
`pt-*`, and `pb-*` names are shipped names off the line: Tailwind's rule for each declares the
physical margin or padding longhands, and Veneer declares each of those with `!important`. The
`mx-*`, `my-*`, `me-*`, `ms-*`, `px-*`, `py-*`, `pe-*`, and `ps-*` names stay on the line:
Tailwind's rule for each declares logical longhands, such as the `margin-inline-start` or the
`padding-block-end` longhand, and Veneer's important declarations sit on the physical sides, which
do not cover them. The `pe-none`, `pe-auto`, and `user-select-*` names are not shared, because
Tailwind names those utilities `pointer-events-none`, `pointer-events-auto`, and `select-*`.


## Other shared-file notes

- `tests/setupServer.test.ts`: the dash-proof component set gains the unit's keys. `test:setup`
  read red without them.
- `tests/setup.ts`: one `CaptureSubject` member per specimen was appended after
  `'Navbar expand xxl'`, and one `CASCADE_KEYS` row per specimen after `navbar-expand-xxl`. No driven rows were added: neither
  mechanism has a focus reveal or a driven state the grammar names.
- `tests/setup.test.ts`: no change needed. `test:setup` is green with the rows.
- `ROADMAP.md`: no patch. The fold names the landing commit. Suggested fragment for the B-UTILITIES
  row: "UTIL-SPACING landed as `<sha>` (the margin, padding, pointer-events, and user-select keys
  with the Spacing and Interaction regions)".
- `tests/service/tailwind/profiles.test.ts`: no patch (notes 3 and 5).
- Barrel: `@use 'utilities/spacing'` after `utilities/flex` and before `utilities/gap`, and
  `@use 'utilities/interaction'` after `utilities/gap` and before `utilities/visibility`.
  `entryPaths` maps the margin, padding, `user-select`, and `pointer-events` entries.
- Section construction: after `VisibilitySection` and before `NavbarSection`, with Spacing before
  Interaction.

## Deviations

- The transient output files `/tmp/usp-null` and `/tmp/usp-gate` were written to the system
  temporary directory by `usp-mutate.sh` and `usp-gates.sh`. They are outside `tmp/units/`.
  Each was removed, and their readings are in the retained logs. The retained scripts are left
  exactly as executed.
- The terrain's ("unresolved") `attributeSelector` walk: each of the 551 selectors is recorded
  under exactly one inventory key (`.orkestrel/veneer/units/usp-instruments/usp-inventory-2.cjs` found no selector recorded under
  more than one key). The ledger attributed every measured row to that key. No ladder change was
  needed.
- After the final gate run, the patch rewrapped one paragraph of the `### Interaction utilities`
  section to the 100-column width. The words are unchanged. The unit re-read only
  `oxfmt --check` on that guide (exit 0, on a scratch copy since deleted), not the other gates.
- `tmp/tailwind/candidates.txt` in the worktree was written by the service readiness during the
  baseline `npm run test:service`. It is git-ignored and was left in place. `tmp/probe/` was
  deleted.
- The final message carries this file's text up to the patch section. For the patch body, it
  names the byte-identical file `.orkestrel/veneer/units/usp-shared.patch` (SHA-256
  `8346b6f5471bd106ed5cfdf7c0a043edd49b520c843cc8975d5186ac8000a8e3`, 1638 lines) instead of
  retyping it, because a hand retyping of the ledger rows could drift from the file. This file
  carries the patch in full.

## What the unit could not close

- The journey and `CAPTURE=1` runs are the Orchestrator's. The resting rows are unverified by
  a journey run: frames, the blank-region guard, and the subject reader.
- The selection press case depends on the `driveHold` export's pressed-state read-back. An early
  probe with inline spans on one line had the drive refuse `auto` and `none` targets ("did not
  enter the pressed state"). The shipped case presses one block line per value. It passed three
  consecutive runs and every mutation run, but the read-back is the risk to watch under load.
- The ledger's `-webkit-user-select` rows read `dropped` while the built cascade carries the
  declaration. This is the ledger's pre-build comparison, as the `.btn` and `.btn-close` rows
  already record.
- The union of the `listed` literal, the dash-proof set, the exclusion line and its copies,
  `entryPaths`, the barrel lines, `CaptureSubject`, `CASCADE_KEYS`, the section order, the Files
  rows, and the Tests links with the sibling units' patches is the Orchestrator's integration.
  Each hunk here is an insertion, except the exclusion line, which is replaced whole in each of its
  copies.

## Shared-file patch (unified diff against `2a3f223`)

The exact shared patch is `.orkestrel/veneer/units/usp-shared.patch`; the retained copy drops the appended duplicate.
