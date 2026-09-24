<!-- Retained by the Orchestrator: `ut-status.txt` and `ut.diff` captured read-only from /home/user/veneer-ut at retention, because the unit returned none. -->
# UTIL-TEXT (`ut`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-ut` (branch `unit/ut` from
`2a3f223`). Nothing committed. The unit ships the `text` key whole, the `text-truncate` helper, and
the `link` key relocated to the utilities layer, with the Text and Color regions, the mirrored and
section proofs, and every shared-file change returned as one patch. Every criterion reads green on
the validation copy except the one Tailwind profiles case that notes 3 and 5 route to UTIL-PAINT's
revised patch (see "Could not close").

## Decisions a reviewer needs first

1. **The link key's utility entries sit in the `_color.scss` partial, not in the `_link.scss`
   partial.** The `_link.scss` partial holds the colored-link helper alone, at the head of the
   utilities layer (R5); the link opacity, offset, and underline entries sit after the text colors
   in the `_color.scss` partial, where the release's map writes them (family ruling 4: the utilities
   block follows the map order). Writing the entries in the `_link.scss` partial at the head inverts
   the release's resolution of `.text-decoration-underline.link-underline-danger` (the decoration
   shorthand, written later, resets the underline color to the text color). Measured: the mutation
   "link underline entry written in the link partial at the head" reddens the case
   `keeps an underline color class over a text decoration utility on the same element, as the
   release does`. The order case's `entryPaths` record maps the link entries to `utilities/color`.
   The `link.test.ts` proof still reads the whole link key. This is an ancillary placement inside
   owned files; the Orchestrator can reverse it.
2. **A literal release color reads the palette.** `.claude/rules/styles.md` refuses a literal color
   outside `_tokens.scss`, so the pairs' `#fff` and `#000` foregrounds and the `.text-black-50` and
   `.text-white-50` colors read the `--vn-palette-*` tokens (the button's own foreground tokens,
   which resolve to the same bytes). R2's "keep every other value a literal" is read as covering
   non-color values; the rule file wins where they meet. Each is a `tokenized` ledger row.
3. **No shared `foreground($role)` function (R8).** The button's foreground is white for every role
   except light; the release's pairs record black for info, warning, and light. One function cannot
   reproduce both, so `_button.scss` is untouched and the pairs carry their recorded foregrounds.
4. **Profiles patch (notes 3 and 5).** No patch of `tests/service/tailwind/profiles.test.ts` is
   returned. The reading is under "Shared names".

## Touched files (owned)

- `src/styles/utilities/_text.scss` (new): the alignment (responsive), decoration, transform,
  wrapping, and break entries through the `utility` mixin in map order.
- `src/styles/utilities/_color.scss` (new): the `.text-bg-*` pairs at its head, then the color,
  text-opacity, text-color, link-opacity, link-offset, link-underline, and link-underline-opacity
  entries through the `utility` and `utility-variable` mixins, opacity entries gated to the empty
  infix as UTIL-PAINT gates them.
- `src/styles/utilities/_link.scss` (moved from `components/` with `mv`): the colored-link helper
  alone, in the utilities layer; values unchanged.
- `src/styles/components/_text-truncation.scss` (new): the `.text-truncate` helper, normal
  declarations, components layer.
- `tests/src/styles/utilities/text.test.ts` (new): alignment at every infix and boundary, infix
  order, physical sides in RTL, every static value, constrained-box layout, entry order, mode and
  density, priority, escape.
- `tests/src/styles/utilities/color.test.ts` (new): pairs, colors, and emphasis tiers against the
  recorded declaration resolved in the same scope in each mode; opacity order; retune; pair
  precedence; priority; escape.
- `tests/src/styles/utilities/link.test.ts` (moved from `components/` with `mv`): the existing link
  cases plus the text-color precedence, the underline-over-decoration precedence, priority, and
  escape.
- `tests/src/styles/components/text-truncation.test.ts` (new): ellipsis on a constrained box,
  override by a wrapping utility and a later rule, layer, mode and density.
- `app/browser/sections/TextSection.ts`, `app/browser/sections/ColorSection.ts` (new): the Text and
  Color regions as `SpecimenSection` subclasses.
- `tests/app/browser/sections/TextSection.test.ts`, `tests/app/browser/sections/ColorSection.test.ts`
  (new): region contract, compositions, the responsive move at 390 and 1280, the constrained lines
  inside the page at both widths, the pair badges' opaque fills, the reset link.

## Diffstat (worktree against `2a3f223`)

Measured with `wc -l` on the untracked files and `git diff --no-index --numstat` on the moved pair:

```text
+41   src/styles/utilities/_text.scss (new)
+143  src/styles/utilities/_color.scss (new)
+10   src/styles/components/_text-truncation.scss (new)
+8 -37 src/styles/components/_link.scss -> src/styles/utilities/_link.scss
+189  tests/src/styles/utilities/text.test.ts (new)
+207  tests/src/styles/utilities/color.test.ts (new)
+84   tests/src/styles/components/text-truncation.test.ts (new)
+58 -0 tests/src/styles/components/link.test.ts -> tests/src/styles/utilities/link.test.ts
+22   app/browser/sections/TextSection.ts (new)
+22   app/browser/sections/ColorSection.ts (new)
+154  tests/app/browser/sections/TextSection.test.ts (new)
+126  tests/app/browser/sections/ColorSection.test.ts (new)
```

`git status --porcelain`: a ` D` entry for each moved file and `??` entries for the rest; the
index equals `2a3f223` (`git diff --cached --quiet` exit 0).

## Baseline (worktree, before any edit)

- `npm run build:src` exit 0 (`.orkestrel/veneer/units/ut-instruments/ut-baseline-build.log.txt`).
- `npm run test:conformance` exit 0, 22 passed (`.orkestrel/veneer/units/ut-instruments/ut-baseline-conformance.log.txt`).
- `npm run test:service` exit 0, 18 passed (`.orkestrel/veneer/units/ut-instruments/ut-baseline-service.log.txt`).

## Scoped gate exits

Worktree (criterion 1):

- `npm run format:check` exit 0 (`.orkestrel/veneer/units/ut-instruments/ut-wt-format-check.log.txt`).
- `npm run lint:check` exit 0 (`.orkestrel/veneer/units/ut-instruments/ut-wt-lint-check.log.txt`).
- `git diff --check` clean.

Validation copy (`git archive 2a3f223`, owned files over it, `ut-shared.patch` applied, UP round-1
profiles patch applied per note 5; script `.orkestrel/veneer/units/ut-instruments/ut-copy-gates.sh`, summary
`.orkestrel/veneer/units/ut-instruments/ut-copy-summary.log.txt`). The copy was given its own `git init` so `oxfmt` and `oxlint`
stop reading the worktree's ignore file; it is deleted.

- `npm run format:check` exit 0; `npm run lint:check` exit 0.
- `npm run check` exit 0 (criterion 2).
- `npm run build:src` exit 0 (criterion 3). `node .orkestrel/veneer/units/ut-instruments/ut-cascade-count.mjs`: inventory
  selectors under `text`, `text-truncate`, and `link`: 130 distinct sites (the `.text-truncate`
  selector is recorded under both keys); cascade sites naming a `.text-` or `.link-` class: 130;
  sites missing either way: none; priority faults (a property declaration without `!important`, a
  custom property with it, or the normal helper with it): none.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` over the
  owned style proofs: exit 0, 94 passed (criterion 4).
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser` over the
  section proofs, `Showcase.test.ts`, and `index.test.ts`: exit 0, 12 passed (criterion 5).
- `npm run test:conformance` exit 0, 22 passed, with the ledger rows applied (criterion 6).
- `npm run test:setup` exit 0, 267 passed.
- `npm run test:policy` exit 0, 109 passed, 1 skipped (a vendored skip).
- `npm run test:guides` exit 0, 19 passed.
- `npm run test:src:styles` exit 0, 95 files, 1091 passed (observation).
- `npm run test:app` exit 0, 42 files, 119 passed (observation).
- `npm run build:src:styles && npm run test:service` (criterion 7), read with each profiles proof:
  - base `profiles.test.ts`: exit 1, 17 passed, 1 failed:
    `fills Tailwind reset only under the preflight profile`
    (`.orkestrel/veneer/units/ut-instruments/ut-final-service-base-profiles.log.txt`);
  - UP round-1 patch applied: exit 1, 17 passed, 1 failed:
    `declares the one order line in every profile, and leaves the document order unmoved`
    (`.orkestrel/veneer/units/ut-instruments/ut-final-service-up-round1.log.txt`);
  - the preflight case's reading widened to `['--color-black', '--color-white', '--spacing']` on
    the copy as an instrument: exit 0, 18 passed (`.orkestrel/veneer/units/ut-instruments/ut-copy-service.log.txt` of the 02:29
    run and `.orkestrel/veneer/units/ut-instruments/ut-v5-service.log.txt`). That edit is not returned (note 5).

## Shared names

Measured through the consumer proof's own expansion (`collectRuleLonghands` over the instrument and
the built cascade in Chromium), instrument `.orkestrel/veneer/units/ut-instruments/ut-shared-names-probe.test.ts.txt`, log
`.orkestrel/veneer/units/ut-instruments/ut-shared-names.log.txt`. The derived shared set gained these names and no other `text-`
or `link-` name.

| Name          | Tailwind longhands                | Veneer longhands (important where named)                    | Status          |
| ------------- | --------------------------------- | ----------------------------------------------------------- | --------------- |
| `text-center` | `text-align`                      | `text-align` (important)                                    | off the line    |
| `text-end`    | `text-align`                      | `text-align` (important)                                    | off the line    |
| `text-start`  | `text-align`                      | `text-align` (important)                                    | off the line    |
| `text-black`  | `color`                           | `--bs-text-opacity` (normal), `color` (important)           | off the line    |
| `text-white`  | `color`                           | `--bs-text-opacity` (normal), `color` (important)           | off the line    |
| `text-wrap`   | `text-wrap-mode`, `text-wrap-style` | `white-space-collapse`, `text-wrap-mode` (important)      | on the line     |
| `text-nowrap` | `text-wrap-mode`, `text-wrap-style` | `white-space-collapse`, `text-wrap-mode` (important)      | on the line     |

Exclusion-line names returned for the union, in this order after `start-100`: `text-wrap
text-nowrap`, in `tests/setup.css`, `tests/fixtures/tailwind/consumer.css`,
`tests/fixtures/tailwind/preflight.css`, and both recipe fences in `guides/veneer.md`.
`tests/fixtures/tailwind/markup.html` gains an element for each shared name.

Profiles case (notes 3 and 5): `text-black` and `text-white` leave the line, and Tailwind's rule for
each reads `var(--color-black)` or `var(--color-white)` on the `color` longhand, so the `tailwind`
profile's variables read `['--color-black', '--color-white', '--spacing']` where the base case
`fills Tailwind reset only under the preflight profile` expects `['--spacing']`. The UP round-1
patch's second hunk closes that case on this copy. Its first hunk reddens
`declares the one order line in every profile` here (reading: the profile statement is the order
line, not `['properties']`), because the `properties` layer comes from UTIL-PAINT's `border`
names, which this copy does not ship; no UTIL-TEXT name registers a custom property.

Negative controls (log `.orkestrel/veneer/units/ut-instruments/ut-mutations.log.txt`, command `npx vitest run --config
vite.config.ts --no-cache --reporter=dot --project service` after `npm run build:src:styles` exit 0):

- `text-center` written onto every copy of the line: exit 1, 2 failed, 16 passed: `derives the
  shared class names, and mounts an element for every one of them`; `keeps a shared name on the
  line while its importance covers only some of the longhands Tailwind declares`.
- `.text-center` written with a normal declaration: exit 1, 2 failed, 16 passed: the same cases.

## Coverage matrix

Every inventory selector of the unit's keys, by entry. Conditions: the responsive alignments are
recorded under `@media (min-width: 576px)`, `768px`, `992px`, `1200px`, and `1400px`; no other
selector carries a condition. Mutations are the runs in `.orkestrel/veneer/units/ut-instruments/ut-mutations.log.txt`.

| Inventory selectors                                                                                                                                                     | Proof case                                                                                                                                                        | Distinguishing mutation (red cases)                                                                                     | Specimen                                     | Capture scenario                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| `.text-start`, `.text-end`, `.text-center`, and `.text-{sm,md,lg,xl,xxl}-{start,end,center}` under each boundary                                                         | `aligns with every value around the $name boundary` (boundary−1, boundary, boundary+1); `resolves a wider alignment infix over a narrower one…`; `aligns to the physical side…` | priority dropped in the mixin (every boundary case); breakpoint loop run per value (the wider-infix case)              | Text alignment; Responsive text alignment    | `text-alignment`; `responsive-text-alignment` |
| `.text-decoration-none`, `-underline`, `-line-through`                                                                                                                   | `resolves every decoration, transform, wrapping, and break value…`; `writes the later value of one entry…`                                                        | priority dropped in the mixin                                                                                           | Text decoration                              | `text-decoration`                         |
| `.text-lowercase`, `.text-uppercase`, `.text-capitalize`                                                                                                                 | same                                                                                                                                                              | priority dropped in the mixin                                                                                           | Text transform                               | `text-transform`                          |
| `.text-wrap`, `.text-nowrap`                                                                                                                                             | same, and `keeps a sentence on one line, wraps it again, and breaks a long word…`                                                                                 | priority dropped in the mixin                                                                                           | Wrapping                                     | `wrapping`                                |
| `.text-break`                                                                                                                                                            | same                                                                                                                                                              | priority dropped in the mixin                                                                                           | Word break                                   | `word-break`                              |
| `.text-{role}`, `.text-black`, `.text-white`, `.text-body`, `.text-muted`, `.text-black-50`, `.text-white-50`, `.text-body-secondary`, `-tertiary`, `-emphasis`, `.text-reset` | `resolves each text color to the value the release records in light / dark mode`; `retunes a role color and its emphasis tier…`                                    | role color written as a literal triplet (both mode cases and the retune case)                                          | Text roles; Body text tiers; Text reset      | `text-roles`; `body-text-tiers`; `text-reset` |
| `.text-opacity-25`, `-50`, `-75`, `-100`                                                                                                                                 | `sets the alpha each opacity step names over a text color written ahead of it`                                                                                   | opacity entry written ahead of the color entry                                                                          | Text opacity                                 | `text-opacity`                            |
| `.text-{role}-emphasis`                                                                                                                                                  | `resolves each emphasis tier through the alias its own mode declares`                                                                                             | emphasis tier written as the light-mode mix                                                                             | Text emphasis                                | `text-emphasis`                           |
| `.text-bg-{role}`                                                                                                                                                        | `paints each color-and-background pair as the release records it in light / dark mode, at the opacity the scope sets`; `lets a text color and a later background utility…`; priority; escape | foreground swapped (info white): both pair cases; background swapped: pair cases and the later-utility case; opacity fallback dropped: the same; pairs in the components layer: the later-utility case and the escape | Color and background pairs                   | `color-and-background-pairs`              |
| `.text-truncate` (under `text` and `text-truncate`)                                                                                                                      | `clips a sentence to one line with an ellipsis inside a constrained box`; `yields its normal declarations…`; `sits in the components layer…`; `reads no token or mode…` | white-space dropped (the clip case and the mode case)                                                                   | Truncated text                               | `truncated-text`                          |
| `.link-{role}`, `:hover`, `:focus`, `.link-body-emphasis` and its states                                                                                                 | the existing role and emphasis cases in both modes; `yields a colored link to a text color…`; priority; escape                                                   | link partial left in components as the base loaded it: the yield case and the escape; conformance order case            | Links region (not owned, unchanged)          | existing Links rows                       |
| `.link-opacity-{10,25,50,75,100}` and `-hover:hover`                                                                                                                     | `resolves opacity $step and activates its hover twin`                                                                                                            | none run by this unit                                                                                                   | Links region                                 | existing Links rows                       |
| `.link-offset-{1,2,3}` and `-hover:hover`                                                                                                                                | `resolves offset $step and activates its hover twin`; the link priority case                                                                                     | priority dropped in the mixin (the link priority case)                                                                  | Links region                                 | existing Links rows                       |
| `.link-underline-{role}`, `.link-underline`                                                                                                                              | `paints the %s underline independently of text…`; `keeps an underline color class over a text decoration utility…`                                                | underline entry written in the link partial at the head                                                                 | Links region                                 | existing Links rows                       |
| `.link-underline-opacity-{0,…,100}` and `-hover:hover`                                                                                                                   | `resolves underline opacity $step and activates its hover twin`                                                                                                  | the same run reddens these cases, because the moved rules left out the `.link-underline` class                          | Links region                                 | existing Links rows                       |

Section proofs: "truncated specimen without the helper" reddens `renders every declared specimen…`
and `runs each constrained line against its column edge…`; "responsive alignment specimen at the sm
boundary" reddens `moves the responsive alignment at its boundaries…`; "pair badge specimen without
its pair" reddens `renders every declared specimen…` and `paints each pair badge on an opaque fill…`.

## Precedence cases

| Case                                                                        | Resolves                           | Mutation and result                                                                                                  |
| --------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `.link-primary.text-danger`                                                 | the danger color                   | `_link.scss` left in components as the base loaded it: link case red; conformance order case red                     |
| `.text-bg-primary.text-danger`                                              | the danger color on the pair       | pairs written in the components layer: red                                                                           |
| `.text-bg-primary.bg-danger` (a planted later utilities-layer `.bg-danger`) | the danger fill                    | pairs in the components layer: red. "Pairs loaded after `_background.scss`" cannot run at `2a3f223`                 |
| `.text-md-start.text-sm-center` at 767, 768, 991, 992                       | `center`, `left`, `left`, `left`   | breakpoint loop run per value: red                                                                                   |
| `.text-primary.text-opacity-50`                                             | primary at alpha 0.5               | opacity entry written ahead of the color entry: red                                                                  |
| `.text-decoration-underline.link-underline-danger`                          | a danger underline                 | underline entry written in `_link.scss` at the head: red                                                             |
| each partial over a later unlayered rule                                    | the utility                        | priority dropped in the mixin: text, color, and link priority cases red                                              |
| the `@layer utilities` escape                                               | the consumer's override            | text partial outside every layer: text escape red; pairs in components: color escape red; link in components: link escape red |
| `.text-truncate.text-wrap`                                                  | `white-space: normal`              | no mutation run                                                                                                      |

## Ledger rows

`#### text` under `### Departures`, after `#### table`; each category is the one
`classifyDeparture` measured (the conformance gate printed these lines before the rows existed,
`.orkestrel/veneer/units/ut-instruments/ut-v1-conformance.log.txt`):

| Selector             | Property | Bootstrap 5.3.8            | Veneer                                   | Departure |
| -------------------- | -------- | -------------------------- | ---------------------------------------- | --------- |
| `.text-bg-primary`   | `color`  | `#fff`                     | `var(--vn-palette-white-base)`           | tokenized |
| `.text-bg-secondary` | `color`  | `#fff`                     | `var(--vn-palette-white-base)`           | tokenized |
| `.text-bg-success`   | `color`  | `#fff`                     | `var(--vn-palette-white-base)`           | tokenized |
| `.text-bg-info`      | `color`  | `#000`                     | `var(--vn-palette-black-base)`           | tokenized |
| `.text-bg-warning`   | `color`  | `#000`                     | `var(--vn-palette-black-base)`           | tokenized |
| `.text-bg-danger`    | `color`  | `#fff`                     | `var(--vn-palette-white-base)`           | tokenized |
| `.text-bg-light`     | `color`  | `#000`                     | `var(--vn-palette-black-base)`           | tokenized |
| `.text-bg-dark`      | `color`  | `#fff`                     | `var(--vn-palette-white-base)`           | tokenized |
| `.text-black-50`     | `color`  | `rgba(0, 0, 0, 0.5)`       | `rgba(var(--vn-palette-black-rgb), 0.5)` | tokenized |
| `.text-white-50`     | `color`  | `rgba(255, 255, 255, 0.5)` | `rgba(var(--vn-palette-white-rgb), 0.5)` | tokenized |

`### Additions`: no row; the additions gates read green with none. The `#### link` table is
unchanged: the helper and the entries keep their values byte for byte. The pairs' background writes
the release's `RGBA(var(--bs-{role}-rgb), var(--bs-bg-opacity, 1))` byte for byte and every text
color the release's `var(--bs-*)` value byte for byte, so none takes a row.

## Section text

- `TEXT_COPY`: region `Text`; paragraph "Compare the classes that align, wrap, break, transform, and
  decorate a line of text, and the truncation helper that clips a line with an ellipsis. Resize the
  viewport to watch the responsive alignment move at its boundaries."
- `TEXT_SPECIMENS`: `Text alignment`, `Responsive text alignment`, `Wrapping`, `Word break`,
  `Text transform`, `Text decoration`, `Truncated text` (a `.row > .col-4.text-truncate`).
- `COLOR_COPY`: region `Color`; paragraph "Compare the role, emphasis, and body text colors, the
  opacity steps that fade a text color, the reset class that takes its parent's color, and the pairs
  that set a readable foreground on each role's fill. Switch the color mode to watch the emphasis
  and body tiers follow it."
- `COLOR_SPECIMENS`: `Text roles`, `Text emphasis`, `Body text tiers`, `Text opacity`,
  `Text reset`, `Color and background pairs` (`.badge.text-bg-{role}`).
- Both sections construct after `VisibilitySection` and before `NavbarSection`, Text then Color
  (barrel order). One resting `CASCADE_KEYS` row per specimen; no driven row.

## Shared-file patches

One patch, `.orkestrel/veneer/units/ut-shared.patch`, unified diffs against `2a3f223` with `a/` and `b/` paths,
formatter-clean. Verified: `git archive 2a3f223` plus the owned files plus `patch -p1` of this file
reproduces the validated copy byte for byte, the Tailwind profiles proof excepted. It covers:

- `src/styles/index.scss`: drops `components/link`; adds `components/text-truncation` before
  `components/vr`, `utilities/link` ahead of `utilities/visually-hidden`, and `utilities/text` and
  `utilities/color` after `utilities/gap`.
- `tests/conformance.test.ts`: `text` and `text-truncate` in the `listed` literal; the order case's
  `entryPaths` for the text, color, and link entries, the loaded-path membership, and a comment
  sentence.
- `tests/setupServer.test.ts`: `text` and `text-truncate` in the compatibility component set.
- `tests/setupStyles.ts`: `TEXT_ALIGN_CASES`, `TEXT_ENTRY_CASES`, `TEXT_COLOR_CASES`,
  `TEXT_EMPHASIS_CASES`, `TEXT_OPACITY_CASES`, `TEXT_BG_CASES` after `VISUALLY_HIDDEN_READING`.
- `tests/setupStyles.test.ts`: the export list and a case binding every table to the inventory's
  `text` key, the tables together naming every unconditioned rule in inventory order.
- `tests/setup.ts`: the specimen names appended to `CaptureSubject`, and the resting rows appended
  after `navbar-expand-xxl`.
- `app/browser/constants.ts`: `TEXT_COPY`, `TEXT_SPECIMENS`, `COLOR_COPY`, `COLOR_SPECIMENS`
  before the Navbar constants; one `BADGE_COPY` sentence this landing makes false.
- `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/Showcase.test.ts`,
  `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`: the sections and
  their tables.
- `tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`:
  `text-wrap text-nowrap` appended to the exclusion line. `tests/fixtures/tailwind/markup.html`:
  a paragraph per shared name appended after `.invisible`.
- `guides/veneer.md`: the `### Files` rows (the `components/_link.scss` row replaced; the path
  column widens by three characters for `_text-truncation.scss`, so the formatter realigns the whole
  table); the § Tailwind recipe lines and one paragraph on the text names; the Badge paragraph this
  landing makes false; `### Text utilities` (with the note-4 sentence pointing to § Font utilities)
  and `### Color utilities` before `### Deferred selectors`; `#### text`; the compatibility rows
  (`text` selector and variable, `text-truncate` selector, the `link` rows' layer and proof path);
  the § Showcase helper sentence; the § Tests links.
- `ROADMAP.md`: no patch; the landing fold names landing commits this unit cannot know.
- `tests/service/tailwind/profiles.test.ts`: no patch (note 5).

## Unknowns, answered

- Exclusion-line status: measured, preceding table.
- `attributeSelector`: every selector reaches its key without a ladder change. `.text-truncate` is
  recorded under `text` and `text-truncate` and answers to `text-truncate` through the exact-class
  tier; the ledger, additions, presence, and priority gates read green.

## Deviations and process records

- The instruments `inv.cjs`, `inv2.cjs`, `inv3.cjs`, and `inv.txt` were written to the session
  scratchpad at 01:45–01:48 UTC, before note 2 arrived. They were moved to `.orkestrel/veneer/units/ut-instruments/ut-inv*`. Had a
  sibling kept files of those names there, the write at 01:45 replaced them.
- A `git add -N .` run staged intent-to-add entries and both moved files' deletions. It was undone entry by
  entry (`git rm --cached` for each intent-to-add entry; `git update-index --add --cacheinfo` with
  the `2a3f223` blob for each deletion); `git diff --cached --quiet` exits 0.
- `tmp/tailwind/` in the worktree is the candidate list the brief's baseline `npm run test:service`
  wrote; it is ignored and left in place.
- `tmp/probe/` is deleted.

## Could not close

- **Profiles case.** Criterion 7 reads green only with the preflight case's reading widened; the
  carrier is UTIL-PAINT's revised profiles patch (note 5). Case: `fills Tailwind reset only under the
  preflight profile`. Reading: `['--color-black', '--color-white', '--spacing']` against
  `['--spacing']`. Names: `text-black`, `text-white`.
- **Pairs against the real background partial.** `_background.scss` is absent at `2a3f223`, so the
  `.text-bg-primary.bg-danger` case reads a planted `.bg-danger` rule in the utilities layer, and the
  mutation "pairs loaded after `_background.scss`" cannot run. After UTIL-PAINT lands, the planted
  rule duplicates the shipped one and the case keeps passing; the barrel order it depends on is
  held by the conformance order case once UTIL-PAINT's `entryPaths` map `background-color` to
  `utilities/background`.
- **Mutations not run:** `.link-opacity-*` values, `.text-truncate.text-wrap`, and the order inside
  one entry have cases but no recorded mutation.
- **Observations for the Orchestrator:** `npm run test:journey` and `CAPTURE=1` for the resting rows
  this unit adds; the journey's own reading of the registry rows.

## Retained evidence

`tmp/units/`: `ut-shared.patch`; `ut-mutations.log.txt` with `ut-mutate.py` and `ut-mutate-2.py`
(the second marks its first and last mutation `SKIP` unless `UT_ALL=1`); `ut-copy-*.log.txt` with
`ut-copy-gates.sh`; `ut-cascade-count.mjs` and its log; `ut-shared-names.log.txt` with its
instrument; `ut-final-service-*.log.txt`; `ut-guide-all.py`, `ut-guide-edit.py`, and
`ut-guide-sections.md` (the guide edits as run); the baseline and staging logs.

## Appendix: `.orkestrel/veneer/units/ut-shared.patch`

The exact shared patch is `.orkestrel/veneer/units/ut-shared.patch`; the retained copy drops the appended duplicate.
