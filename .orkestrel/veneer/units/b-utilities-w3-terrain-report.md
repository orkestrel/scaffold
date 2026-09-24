# B-UTILITIES wave-3 terrain report (Cursor Grok, `grok-4.7-high`, read-only)

The `grok` lane's final answer to `b-utilities-w3-terrain-brief.md`, verbatim below the rule. Journal `tmp/cursor/b-utilities-w3-terrain.jsonl` (swept at acceptance), session `eb67de5f-f769-4f20-91f2-f29373879e6e`, launched 2026-09-24 00:17:53 UTC by `cursor-queue.sh`, exit 0 at 00:27:00 UTC; `git status --porcelain` in `/home/user/veneer` empty before and after, HEAD `2a3f223`.

---

I'll start by reading the brief and the repository's agent contracts so I follow the required process.The brief is a read-only terrain check. I'll load the scaffold contracts and the verdict, family record, and drafts before checking the tree.The search stayed inside the veneer tree, so I’ll read the scaffold verdict, family record, and drafts directly.The drafts predate the display, placement, navbar, and specimen-band landings. I'll check those facts against the tree at `2a3f223`.Display and placement already occupy the utilities barrel and the showcase. Next I’ll read their registration, the exclusion line, and the tests those six keys already touch.Git status `--porcelain` was empty before and after this reading. HEAD is `2a3f223`.

## 1. Stale facts per draft

Shared sentences are checked once, then named again under every unit. A sentence holds when the tree at `2a3f223` still matches it.

### UTIL-PAINT (`up`)

**Role and engine, “from `BASE_SHA`, the commit on which UTIL-SPACER has landed.”** False as a description of this tree. HEAD is `2a3f223` (`Fold the UTIL-PLACEMENT and NAVBAR landings into the roadmap`). The utilities barrel, the showcase, and the capture registry already contain the display, placement, navbar, and specimen-band products.

**Shared, “sections, constructed after every component region in barrel order.”** False. `Showcase.#mount` builds `DisplaySection`, `FlexSection`, `PositionSection`, `SizingSection`, and `VisibilitySection`, then `NavbarSection` (`app/browser/Showcase.ts:135`). The region list in `mounts its sections after the region` ends `'Visibility', 'Navbar'` (`tests/app/browser/Showcase.test.ts:136`).

**Shared, “`CaptureSubject` members and the resting and driven rows appended at the end.”** Moved. The last resting subjects are the navbar rows (`tests/setup.ts:269`, `tests/setup.ts:1587`). The last driven rows are `navbar-collapsed-focus` and `navbar-expanded-hover` (`tests/setup.ts:1704`).

**Context, “the theme re-declares the role RGB triplets, the subtle and emphasis tiers, and `--bs-border-*` per mode (`theme-tokens`).”** Holds. The `theme-tokens` mixin is at `src/styles/_mixins.scss:271`. It writes `--bs-primary-rgb` (`:313`), `--bs-#{$role}-bg-subtle` (`:316`), and `--bs-border-color` (`:341`).

**Context, “the textual ledger compares values after whitespace collapse (`collectValueGaps`).”** Holds. `collectValueGaps` is at `tests/setupServer.ts:2145`.

**Context, “the `utility` and `utility-variable` mixins.”** Holds. Signatures are at `src/styles/_mixins.scss:368` and `:419`, each with `$state` last.

### UTIL-TEXT (`ut`)

**Role and engine, the `BASE_SHA` sentence.** False, same tree as UTIL-PAINT.

**Shared, “after every component region.”** False, same `NavbarSection` placement (`app/browser/Showcase.ts:140`).

**Shared, capture rows “appended at the end.”** Moved to the navbar anchors above.

**Context, “`_link.scss` carries important colored-link rules in the `components` layer.”** Holds. The barrel still has `@use 'components/link'` (`src/styles/index.scss:48`). The `### Files` row still says the components layer (`guides/veneer.md:673`). Declarations in `src/styles/components/_link.scss:8` still carry `!important`.

**Context, “the guide’s `### Files` row and `#### link` table name it.”** Holds. The files row is `guides/veneer.md:673`. The heading `#### link` is `guides/veneer.md:4239`.

### UTIL-FONT (`uf`)

**Role and engine, the `BASE_SHA` sentence.** False, same tree.

**Shared, “after every component region” and capture “appended at the end.”** False and moved, same sites as UTIL-PAINT.

**Context, “the Type region (`TypeSection.ts`, existing).”** Holds. `TypeSection` exists and extends `SpecimenSection` (`app/browser/sections/TypeSection.ts:13`).

**Context, “`.fs-N` to `--vn-size-{9-N}` (the heading treatment).”** Holds. Both partials write `font-size: var(--vn-size-#{9 - $level})` (`src/styles/elements/_heading.scss:14`, `src/styles/components/_type.scss:14`).

**Context, “the way the `#### h1` rows do.”** Holds. The heading `#### h1` is `guides/veneer.md:4163`.

**Context, “`.font-monospace` reads the existing mono alias.”** Holds as an alias that exists. `--bs-font-monospace` is `var(--vn-font-mono-base)` (`src/styles/_tokens.scss:408`). No `.font-monospace` rule is in the utilities directory.

### UTIL-SPACING (`usp`)

**Role and engine, the `BASE_SHA` sentence.** False, same tree.

**Shared, “after every component region” and capture “appended at the end.”** False and moved, same sites.

**Acceptance, “through `GRID_BREAKPOINT_CASES`.”** Holds. The constant is `tests/setupStyles.ts:1551`.

### UTIL-FLOW (`ufl`)

**Role and engine, the `BASE_SHA` sentence.** False, same tree.

**Shared, “after every component region” and capture “appended at the end.”** False and moved, same sites.

**Objective, “the Links region gains `Stretched link` … `LinkSection.test.ts`.”** The region exists. `LinkSection` is mounted (`app/browser/Showcase.ts:108`). The proof’s name list ends at `'Underline opacity'` (`tests/app/browser/sections/LinkSection.test.ts:22`). `Stretched link` is absent from that list.

### UTIL-EFFECT (`ue`)

**Role and engine, the `BASE_SHA` sentence.** False, same tree.

**Shared, “after every component region” and capture “appended at the end.”** False and moved, same sites.

**Context, “`focus-ring-color` over the eight roles.”** False against Veneer’s role list. `$roles` is nine names and includes `tertiary` (`src/styles/_tokens.scss:7`). The comment on that line says `tertiary` carries no Bootstrap alias.

**Context, “`grep -n forced-ring` in `_pagination.scss`.”** Holds. The include is `src/styles/components/_pagination.scss:83`. The same mixin is also included from `_nav.scss:46`, `_navbar.scss:125`, `_accordion.scss:95`, `_close.scss:45`, and the form control, select, range, and check partials.

**Acceptance, “`readRing`.”** Holds as a symbol the journey already calls (`tests/app/browser/integration.test.ts:27`).

## 2. The sibling pattern

UTIL-DISPLAY and UTIL-PLACEMENT shipped these pieces.

**Partials.** `src/styles/utilities/` has `_display.scss`, `_flex.scss`, `_vertical-align.scss`, `_gap.scss`, `_position.scss`, `_sizing.scss`, `_visibility.scss`, and `_visually-hidden.scss`.

**Barrel.** `src/styles/index.scss:82` through `:89` uses, in order, `utilities/visually-hidden`, `utilities/vertical-align`, `utilities/display`, `utilities/position`, `utilities/sizing`, `utilities/flex`, `utilities/gap`, `utilities/visibility`. Component helpers just ahead of that block are `icon-link`, `ratio`, `position` as `position-component`, `stacks`, and `vr` (`src/styles/index.scss:77`).

**Mixins.** `utility` takes `$class`, `$properties`, `$values`, `$infix: ''`, `$responsive: false`, `$locals: ()`, `$state: ()` (`src/styles/_mixins.scss:368`). An empty `$class` drops the infix hyphen (`:386`). `utility-variable` takes `$class`, `$variable`, `$values`, `$state: ()` (`:419`).

**Case tables.** `tests/setupStyles.ts` exports `DISPLAY_VALUES` (`:1843`), `ALIGN_VALUES` (`:1858`), `FLEX_ENTRY_CASES` (`:1875`), `SIZING_STEP_CASES` (`:2091`), `SIZING_ENTRY_CASES` (`:2099`), `POSITION_VALUES` (`:2119`), and `POSITION_ENTRY_CASES` (`:2147`). Proofs also use `GRID_BREAKPOINT_CASES` (`:1551`).

**Proofs.** `tests/src/styles/utilities/` has `display.test.ts` (`describe('display utilities')`, `:17`), `flex.test.ts`, `vertical-align.test.ts`, `position.test.ts`, `sizing.test.ts`, `visibility.test.ts`, `visually-hidden.test.ts`, and `gap.test.ts`.

**Sections.** `DisplaySection`, `FlexSection`, `PositionSection`, `SizingSection`, and `VisibilitySection` each extend `SpecimenSection` and pass `<KEY>_COPY` and `<KEY>_SPECIMENS` (`app/browser/sections/DisplaySection.ts:13`). Constants start at `DISPLAY_COPY` (`app/browser/constants.ts:2160`). `Showcase.#mount` constructs them after `AccordionSection` and before `NavbarSection` (`app/browser/Showcase.ts:134`). `app/browser/index.ts:36` re-exports them. `SpecimenSection` itself is exported at `app/browser/index.ts:11` and is not constructed by `Showcase`.

**Captures.** `CaptureSubject` includes `'Display values'`, `'Flex direction'`, `'Position values'`, and the navbar subjects (`tests/setup.ts:236`, `:269`). Resting rows include `scenario: 'display-values'` (`tests/setup.ts:1388`). Driven navbar rows are at `tests/setup.ts:1704`.

**Exclusion line.** One line is shared by three files: `tests/setup.css:14`, `tests/fixtures/tailwind/consumer.css:7`, and `tests/fixtures/tailwind/preflight.css:6`. The line is `caption-bottom` through `col-12`, `collapse`, `container`, `table`, and `end-0`, `end-50`, `end-100`, `start-0`, `start-50`, `start-100`. `tests/fixtures/tailwind/markup.html` carries the display, flex, align, sizing, offset, `z-*`, `visible`, and `invisible` class names (`:62` through `:126`). The profiles proof `holds every written copy of the exclusion line equal to the profile that declares it` is `tests/service/tailwind/profiles.test.ts:167`.

**Guide.** `### Files` rows for the shipped utility partials are `guides/veneer.md:747` through `:754`. Mechanism sections are `### Display utilities` (`:2757`), `### Flex utilities` (`:2786`), `### Position utilities` (`:2816`), `### Sizing utilities` (`:2869`), and `### Visibility utilities` (`:2895`). Compatibility rows for `d`, `flex`, `align`, and the placement keys start at `guides/veneer.md:5324`.

**Order case.** `loads the passive block and the helpers in the release order…` (`tests/conformance.test.ts:408`) maps `color-bg` to `utilities/color`, `colored-links` to `utilities/link`, and `visually-hidden` to `utilities/visually-hidden` (`:505`). `entryPaths` sends the flex, position, sizing, gap, and `z-index` entries to the partials that shipped (`:509`). A loaded utilities path must equal that derived order (`:559`).

## 3. The collision map

These files are on every unit’s shared list. The region is the slot the sibling order case and the current barrel leave.

| File | Region each unit touches |
| --- | --- |
| `src/styles/index.scss` | Utilities block is `:82`–`:89`. UTIL-FLOW’s `float` and `object-fit` go after `vertical-align` (`:83`) and before `display` (`:84`). UTIL-EFFECT’s `opacity` and `overflow` companions sit in that same gap, and its `shadow` goes after `display` and before `position` (`:85`). UTIL-PAINT’s `border` goes after `position` and before `sizing` (`:86`); its `background` goes after `gap` (`:88`) and before `visibility` (`:89`). UTIL-SPACING’s margin and padding go after `flex` (`:87`) and before `gap`; `user-select` and `pointer-events` go before `visibility`. UTIL-FONT goes after `gap` and before `visibility`. UTIL-TEXT’s `color` and `link` partials are the important helpers the order case already names ahead of `visually-hidden` (`tests/conformance.test.ts:505`); `text-truncation` is a components helper before `vr` (`index.scss:81`). UTIL-FLOW’s `clearfix` and UTIL-EFFECT’s `focus-ring` are components helpers before `icon-link` (`:77`). UTIL-FLOW’s `stretched-link` is a components helper before `vr`. |
| `tests/conformance.test.ts` | The `listed` literal (`:98`) and `entryPaths` / `helperPaths` inside the order case (`:504`). |
| `tests/setupStyles.ts` | New case tables beside `DISPLAY_VALUES` (`:1843`) and `POSITION_ENTRY_CASES` (`:2147`). |
| `tests/setup.css` and `tests/fixtures/tailwind/consumer.css`, `preflight.css` | The single `@source not inline(...)` line (`tests/setup.css:14` and the two fixture copies). |
| `tests/fixtures/tailwind/markup.html` | Class names appended after the placement block that ends at `.invisible` (`:126`). |
| `app/browser/constants.ts` | `<KEY>_COPY` and `<KEY>_SPECIMENS` after `VISIBILITY_SPECIMENS` (`:2428`). UTIL-FONT appends to `TYPE_SPECIMENS` (`:367`). UTIL-FLOW appends to `LINK_SPECIMENS` (`:464`). |
| `app/browser/Showcase.ts` | Constructor list. Utility sections now end at `VisibilitySection` (`:139`) and `NavbarSection` follows (`:140`). |
| `app/browser/index.ts` | Re-exports. `SpecimenSection` is `:11`. Display through navbar are `:36`–`:41`. |
| `tests/setup.ts` | `CaptureSubject` (`:81`, navbar members `:269`) and the ends of `CASCADE_KEYS` (`:1587`) and `DRIVEN_KEYS` (`:1704`). |
| `tests/app/browser/Showcase.test.ts` | The aria-label list (`:99`) whose last two labels are `'Visibility'` and `'Navbar'`. |
| `tests/app/browser/index.test.ts` | The sorted export-key list (`:9`). |
| `guides/veneer.md` | `### Files` utility rows (`:747`). New `### <Page> utilities` sections beside `### Display utilities` (`:2757`). Compatibility rows beside the `d` row (`:5325`). Ledger headings beside `#### h1` (`:4163`). § Tests links beside the link-classes link (`:5724`). |
| `ROADMAP.md` | The family row each landing folds, the same kind of edit as HEAD’s message. |

`src/styles/_mixins.scss` stays the spacer owner. The six drafts each say a mixin change is a report-only patch. No second unit writes the mixin body.

## 4. Files each unit makes false

Shared assertions, hit by every unit that mounts a section, exports it, marks a key shipped, adds an `@use`, or changes one copy of the exclusion line:

- `tests/app/browser/index.test.ts`, `exports the showcase surface, the specimen table, and the sections family` (`:9`), the sorted key list.
- `tests/app/browser/Showcase.test.ts`, `mounts its sections after the region` (`:99`), the aria-label list.
- `tests/conformance.test.ts`, `carries every shipped component selector and custom property in the built cascade` (`:95`), the `listed` literal (`:98`). `link` is already in that literal (`:156`). `bg`, `border`, `rounded`, `text`, `font`, `fs`, `fst`, `fw`, `lh`, the spacing keys, `float`, `overflow`, `object-fit`, `clearfix`, `stretched-link`, `shadow`, `opacity`, `focus-ring`, and `user-select` are not.
- The same file, `loads the passive block and the helpers in the release order…` (`:408`). A loaded path whose stem is not a map entry and not a `helperPaths` / `entryPaths` record fails `:559`.
- `tests/service/tailwind/profiles.test.ts`, `holds every written copy of the exclusion line equal` (`:167`), when one of the three copies changes.
- `tests/app/browser/integration.test.ts`, `names a specimen the showcase declares, or its own region, as every scenario subject` (`:2094`), when a capture subject has no specimen.

### UTIL-PAINT (`up`)

`@use 'utilities/background'` is not a default map path. The map names are `background-color`, `bg-opacity`, `subtle-background-color`, and `gradient`. That `@use` fails the order case until `entryPaths` maps them. `@use 'utilities/border'` matches the `border` entry. `border-top`, `border-color`, `border-width`, `border-opacity`, `rounded`, and the other rounded entries default to their own unloaded paths and are filtered out until `entryPaths` points them at `utilities/border`. No existing test mounts `.bg-*`, `.border`, or `.rounded` as members of these keys. `tests/fixtures/tailwind/markup.html` does not contain them.

### UTIL-TEXT (`ut`)

`@use 'utilities/text'` fails the order case until the text entries map to it. `helperPaths` already expects `utilities/color` and `utilities/link` ahead of `utilities/visually-hidden` (`tests/conformance.test.ts:505`). Loading `utilities/link` after `visually-hidden` fails that order. The components proof `tests/src/styles/components/link.test.ts` mirrors `components/_link.scss`. These guide sites name that components path: the files row (`guides/veneer.md:673`), the compatibility rows (`:5356`), and the tests link (`:5724`). Existing members are the `link-opacity-*` and `link-underline-opacity-*` classes in `LINK_SPECIMENS` (`app/browser/constants.ts:473`) and in `tests/src/styles/components/link.test.ts:69`.

### UTIL-FONT (`uf`)

`@use 'utilities/font'` fails the order case until `font-family`, `font-size`, `font-style`, `font-weight`, and `line-height` map to it. `tests/app/browser/sections/TypeSection.test.ts`, `renders every Type specimen in table order` (`:7`), freezes the name list from `'Heading class 1'` through `'Attributed quotation'` (`:18`). Appending `Font sizes`, `Font weights`, `Font styles`, `Line heights`, or `Monospace` makes that list false.

### UTIL-SPACING (`usp`)

`@use 'utilities/spacing'` and `@use 'utilities/interaction'` fail the order case until the margin, padding, `user-select`, and `pointer-events` entries map to those stems. `tests/src/styles/components/close.test.ts:162` reads the `user-select` property of the close control. That assertion names the property, not a `.user-select-*` class. `markup.html:97` has `btn px-8`. That token is not one of the spacer steps `0`–`5`.

### UTIL-FLOW (`ufl`)

`utilities/float`, `utilities/overflow`, and `utilities/object-fit` match map entries. `overflow-x` and `overflow-y` default to their own unloaded paths. `components/clearfix` and `components/stretched-link` match helper defaults and join the helper subsequence, so a barrel position other than the release helper order fails `:556`. `tests/app/browser/sections/LinkSection.test.ts`, `renders the declared specimens` (`:7`), freezes `'Role links'` through `'Underline opacity'` (`:16`). Appending `Stretched link` makes that list false. The bootstrap helper-name expect at `tests/conformance.test.ts:482` reads Bootstrap’s `_helpers.scss` and already lists `clearfix`, `focus-ring`, and `stretched-link`.

### UTIL-EFFECT (`ue`)

`utilities/shadow` and `utilities/opacity` match map entries. The map entry `focus-ring` defaults to `utilities/focus-ring`. A component-only `_focus-ring.scss` leaves that path unloaded, so the filter drops it. `components/focus-ring` still has to sit in the helper subsequence (`tests/conformance.test.ts:556`), before `icon-link`. No proof mounts `.shadow`, `.opacity-*`, or `.focus-ring` as members of these keys.

## Contradictions

- Every draft’s Shared paragraph says utility sections are constructed after every component region. `Showcase.#mount` constructs `NavbarSection` after the utility sections (`app/browser/Showcase.ts:135`). The family record’s ruling 8 says the same thing as the drafts. The record’s own rule is that the tree wins where they disagree.
- The order case already maps `colored-links` to `utilities/link` and `color-bg` to `utilities/color` (`tests/conformance.test.ts:505`). The barrel still loads `components/link` (`src/styles/index.scss:48`) and has no `utilities/color`. The case stays green because it filters to loaded paths.
- UTIL-EFFECT’s Context says the focus-ring map covers eight roles. `$roles` has nine names, including `tertiary` (`src/styles/_tokens.scss:7`).
- The `### Files` table is not the barrel order. It lists `_position.scss`, `_sizing.scss`, and `_gap.scss` before `_vertical-align.scss` and `_display.scss` (`guides/veneer.md:747`). The barrel order is the `@use` list at `src/styles/index.scss:82`.

## Unresolved inputs

- Porcelain was empty before and after. HEAD remained `2a3f223a046aeb3c2d03039a70a12b3a4dd6f0e4`.
- The four named commits were not re-resolved with `merge-base` in this session. The tree contains their products: display and placement partials, `NavbarSection`, and `SpecimenSection`.
- Bootstrap’s `$theme-colors` count was not re-read. The draft’s “eight roles” was checked only against Veneer’s `$roles`.
- The drafts’ shared-name lists (`bg-black`, `text-center`, `m`, `float-*`, `opacity-*`, `shadow`) were not re-measured against Tailwind. Those names are absent from the exclusion line at `tests/setup.css:14`.
- `attributeSelector` exists (`tests/setupServer.ts:2052`). Its assignment for the six units’ selectors was not walked.
- The staging logs named beside the drafts (`up-stage.log.txt` and the five siblings) were not opened.
- Selector counts and inventory membership from the terrain report were not re-counted. `tests/fixtures/oracle/**` was not read.
