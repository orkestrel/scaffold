# UTIL-FLOW (`ufl`) report

Unit UTIL-FLOW on `opus` (Opus 5.5, native subagent), worktree `/home/user/veneer-ufl`, branch
`unit/ufl` from `2a3f223`. Brief: `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-ufl-brief.md`,
with mid-campaign note `w2-w3-note-1.md` applied.

## Outcome

The float, clearfix, overflow (with its `-x` and `-y` forms), object-fit, and stretched-link keys ship
from their five owned partials. The Float, Overflow, and Object fit regions render, and the Links
region gains the `Stretched link` specimen. Every owned proof passes on the validation copy, and each
named mutation reddens its proof. The conformance ledger and the Tailwind consumer and profiles
proofs pass with the shared patch applied.

One deviation is open. The stretched link rule repeats the card overlay's five-declaration edge
block, and the `findDuplication` gate in `tests/setupStyles.test.ts` refuses that repeat. The gate's
repair touches `src/styles/components/_card.scss`, which is off-limits to this unit. See
§ Deviations for the evidence and for a tested patch set (Route B) that turns the gate green.

## Touched files (owned)

- `src/styles/utilities/_float.scss` (new): the responsive `float` entry, physical sides, written through the `utility` mixin.
- `src/styles/utilities/_overflow.scss` (new): the `overflow`, `overflow-x`, and `overflow-y` entries in map order at the empty infix.
- `src/styles/utilities/_object-fit.scss` (new): the responsive `object-fit` entry, with the `scale` key writing the `scale-down` value.
- `src/styles/components/_clearfix.scss` (new): the normal `.clearfix::after` helper in the components layer.
- `src/styles/components/_stretched-link.scss` (new): the normal `.stretched-link::after` helper, with physical edges at the `1` stacking level.
- `tests/src/styles/utilities/float.test.ts` (new): the float proof.
- `tests/src/styles/utilities/overflow.test.ts` (new): the overflow proof.
- `tests/src/styles/utilities/object-fit.test.ts` (new): the object-fit proof, which photographs the pictures it fits.
- `tests/src/styles/components/clearfix.test.ts` (new): the clearfix proof.
- `tests/src/styles/components/stretched-link.test.ts` (new): the stretched-link proof.
- `app/browser/sections/FloatSection.ts`, `OverflowSection.ts`, `ObjectFitSection.ts` (new): the `SpecimenSection` subclasses for the Float, Overflow, and Object fit regions.
- `tests/app/browser/sections/FloatSection.test.ts`, `OverflowSection.test.ts`, `ObjectFitSection.test.ts` (new): the section proofs.
- `tests/app/browser/sections/LinkSection.test.ts` (modified): adds the `Stretched link` name, the `stretched-link` class, the cascade import, and a corner hit-test case.

Diffstat against `2a3f223`: the `LinkSection.test.ts` file has 35 insertions and 1 deletion. The
new files are 21, 21, 21, 10, 15, 19, 21, 13, 112, 120, 123, 68, 100, 138, 159, and 154 lines, in
the order `git status` lists them. `git status --porcelain` shows only owned paths.

## Baseline (worktree at `2a3f223`, before any edit)

- `npm run test:conformance`: exit 0, 22 passed (`.orkestrel/veneer/units/ufl-instruments/ufl-baseline-conformance.log.txt`).
- `npm run test:service`: exit 0, 18 passed (`.orkestrel/veneer/units/ufl-instruments/ufl-baseline-service.log.txt`).

## Coverage matrix

Every inventory selector of the unit's keys, read against the built cascade by
`.orkestrel/veneer/units/ufl-instruments/ufl-count.mjs`. The run reported 62 inventory selectors and 62 cascade selectors, with none
missing and none extra. All 60 utility rules carry `!important` on every declaration and declare no
custom property. Neither helper rule carries `!important`, as the release writes them.

| Inventory selectors and conditions | Proof case | Distinguishing mutation (log) | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.float-{start,end,none}`, no condition | `float utilities > resolves every side around the 'xs' boundary`, `places each side against the physical edge of its container in either writing direction` | layer moved to components reddens the escape case (`ufl-mutation-layer-moved.log.txt`) | `Float sides` | `float-sides` |
| `.float-{sm,md,lg,xl,xxl}-{start,end,none}` under `@media (min-width: 576px)` to `(min-width: 1400px)` | `resolves every side around the '<infix>' boundary` at the boundary and one pixel below; `resolves a wider infix over a narrower one…` | infix omitted: sm to xxl cases and the order case red, 6 failed (`ufl-mutation-infix-omitted.log.txt`) | `Responsive float` | `responsive-float` |
| `.clearfix::after` | `clearfix helper > stretches its host around its floated children, where a bare host collapses`, `writes its generated box…`, `holds its floats inside a dark island…`, `sits in the components layer…` | `clear: both` omitted: 3 failed (`ufl-mutation-clear-omitted.log.txt`) | `Cleared floats` | `cleared-floats` |
| `.overflow-{auto,hidden,visible,scroll}` | `resolves every shorthand value on both axes`, `spills the content past the box only under the visible value`, `resolves an axis class over the shorthand…` | priority dropped on the x entry: order and priority cases red (`ufl-mutation-priority-dropped.log.txt`) | `Overflow values` | `overflow-values` |
| `.overflow-x-*`, `.overflow-y-*` (no condition) | `computes the '<x>' x value beside the '<y>' y value and scrolls each axis apart` (one per `OVERFLOW_AXIS_CASES` row), `writes every entry at no breakpoint infix…` | swapped axis: every axis case, the order case, and the mode, priority, and escape cases red, 9 failed (`ufl-mutation-axis-swapped.log.txt`) | `Axis overflow` | `axis-overflow` |
| `.object-fit-{contain,cover,fill,scale,none}`, no condition | `fits a picture unlike its box by every value around the 'xs' boundary` (painted regions and computed value), priority, escape | `fill` for `cover`: every case red, 10 failed (`ufl-mutation-fill-for-cover.log.txt`) | `Object fit values` | `object-fit-values` |
| `.object-fit-{sm..xxl}-*` under the breakpoint conditions | `fits a picture unlike its box by every value around the '<infix>' boundary`, `resolves a wider infix over a narrower one…` | the same run: sm to xxl cases red | `Responsive object fit` | `responsive-object-fit` |
| `.stretched-link::after` | `stretched link helper > answers a pointer at every corner of its positioned ancestor…`, `writes its generated box absolute…`, `covers the nearest positioned ancestor…`, `stacks its generated box at level 1…`, dark island, layer | `::after` inset omitted: 5 failed (`ufl-mutation-inset-omitted.log.txt`) | `Stretched link` (Links, appended) | `stretched-link` |

Each proof also reads a dark island. Each utility proof reads the doubled density factor, the
priority over a later unlayered rule, and the `@layer utilities` escape. Each helper proof reads its
layer beneath a later unlayered rule.

## Shared-name table

The shared set was measured by the consumer proof over the installed compiler (`tailwindcss`
v4.3.3). The Tailwind longhands come from compiling the names through `@tailwindcss/postcss`.

| Shared name | Tailwind declares | Veneer declares | Exclusion-line status |
| --- | --- | --- | --- |
| `float-start`, `float-end` | `float: inline-start` / `inline-end` (the `float` longhand) | `float: left` / `right` with the `!important` flag | off the line |
| `float-none` | `float: none` | `float: none !important` | off the line |
| `overflow-{auto,hidden,visible,scroll}` | the `overflow` shorthand, which Chromium expands to the `overflow-x` and `overflow-y` longhands | the same shorthand with the `!important` flag | off the line |
| `overflow-x-*`, `overflow-y-*` | the `overflow-x` or `overflow-y` longhand | the same longhand with the `!important` flag | off the line |

The `object-fit-*`, `clearfix`, and `stretched-link` names are not shared: Tailwind generates
`object-cover` and the other `object-*` names and no rule for these class names. The exclusion line
and its copies are unchanged. The consumer proof's equality held with these names off the line, so
the line needs no union entry from this unit.

Negative controls (criterion 7), both on the validation copy:
- `float-start` written onto the `consumer.css` line: 4 failed, including `derives the shared class names…` and `holds every written copy of the exclusion line equal…` (`ufl-mutation-line-written.log.txt`).
- `!important` dropped from the float partial: 2 failed, `derives the shared class names…` and `keeps a shared name on the line…` (`ufl-mutation-important-dropped.log.txt`).

## Precedence cases and their mutations

- A later unlayered rule loses to each utility: `float-start` keeps the `left` value against `.probe { float: right }`; `.probe.overflow-x-auto` keeps `auto` on x while the consumer's `scroll` wins on y; `object-fit-cover` keeps the `cover` value. The mutation that writes the x entry with normal declarations reddens the overflow priority case (`ufl-mutation-priority-dropped.log.txt`).
- The escape: an unlayered `!important` loses, and the same declaration inside `@layer utilities` wins, read for `float-start`, `overflow-y-hidden`, and `object-fit-cover`. The mutation that moves the float partial into the components layer reddens the escape case only (`ufl-mutation-layer-moved.log.txt`).
- Cross-entry order: an axis class beats the shorthand on its own axis in either class order. The swapped-axis mutation reddens that case.
- Infix order: a wider infix wins in either class order, read at 767, 768, and 992 from the md and lg cases in `GRID_BREAKPOINT_CASES`. The infix-omitted mutation reddens it for float.
- Helpers: a later unlayered rule on the generated box overrides each helper. `.clearfix::after { clear: none }` collapses the host, and `.stretched-link::after { position: static }` returns the corner to the host.

## Ledger rows

The `#### object-fit` table goes under `### Departures`, before `#### offset`. It has 30 rows, one
per inventory selector, and each row's comparison category is `dropped`. For example:

| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |
| --- | --- | --- | --- | --- | --- | --- |
| `object-fit` | `.object-fit-contain` | `-o-object-fit` | — | `contain` | — | dropped |
| `object-fit` | `.object-fit-sm-contain` | `-o-object-fit` | `@media (min-width: 576px)` | `contain` | — | dropped |

No `### Additions` row and no deferral row. Float, overflow, clearfix, and stretched link record no
departure. With the rows applied, `npm run test:conformance` passed 22 on the copy
(`ufl-gate-conformance2.log.txt`).

## Section text

- Float: `FLOAT_COPY.paragraph` is 'Compare a card floated to each side with text wrapping between them, a card that changes sides at the md boundary, and a box the clearfix helper stretches around its floated card. Resize the viewport to watch the responsive card move.' The specimens are `Float sides`, `Responsive float`, and `Cleared floats`. Each float host carries `.clearfix`, and the cleared box is an `.alert`, because a card is a flex container.
- Overflow: 'Compare a bar wider than its card under each overflow value, then cards that clip or scroll each axis on its own. Scroll the auto and scroll cards to reach what they hold.' The specimens are `Overflow values` and `Axis overflow`. Both render inside the shell's `viewport` frame, on `w-75` cards holding `vw-100` and `vh-100` placeholder bars with the `aria-hidden` attribute.
- Object fit: 'Compare one wide picture fitted into a square box by each object-fit value, then a tall picture whose box changes its value at the md boundary. Resize the viewport to watch the responsive picture switch.' The specimens are `Object fit values` and `Responsive object fit`. They use inline SVG pictures in `.ratio` boxes with `.img-thumbnail`.
- Links: the `LINK_COPY` paragraph gains 'a card whose stretched link answers a pointer anywhere on the card'. `Stretched link` is a card whose anchor reads 'Stretched link to the tour schedule'.
- Regions are constructed after `VisibilitySection` and before `NavbarSection`.

## Shared-file patches

`.orkestrel/veneer/units/ufl-shared.patch` holds one unified diff against `2a3f223` covering the following files.
`git apply --check` passed on a fresh `git archive 2a3f223`, and the applied result is
byte-identical to the validation copy.

- `src/styles/index.scss`: `components/clearfix` before `components/icon-link`; `components/stretched-link` after `components/stacks`; `utilities/float`, `utilities/object-fit`, `utilities/overflow` after `utilities/vertical-align`. UTIL-EFFECT's `utilities/opacity` belongs between `object-fit` and `overflow` in map order.
- `app/browser/constants.ts`: `FLOAT_*`, `OVERFLOW_*`, `OBJECT_FIT_*` after `VISIBILITY_SPECIMENS`; the `Stretched link` specimen appended to `LINK_SPECIMENS`; the `LINK_COPY` paragraph.
- `app/browser/Showcase.ts`, `app/browser/index.ts`: the imports and constructions after `VisibilitySection`.
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`: the region labels, specimen spreads, the sorted export keys, and the portfolio tables.
- `tests/conformance.test.ts`: `listed` gains `clearfix`, `float`, `object-fit`, `overflow`, `stretched-link`; `entryPaths` maps `overflow-x` and `overflow-y` to `utilities/overflow`; the `arrayContaining` list gains the five paths.
- `tests/setupServer.test.ts`: the compatibility component set gains the five keys.
- `tests/setup.ts`: the `CaptureSubject` members, a `CASCADE_KEYS` remark on generated-box keys, and the resting rows appended after the navbar rows. There are no driven rows.
- `tests/setupStyles.ts`: `FLOAT_VALUES`, `OVERFLOW_ENTRIES`, `OVERFLOW_VALUES`, `OVERFLOW_AXIS_CASES`, `OBJECT_FIT_VALUES`, `OBJECT_FIT_FIXTURE`, `OBJECT_FIT_PAINT_CASES`, before `RATIO_CASES`.
- `tests/setupStyles.test.ts`: the export list and one binding case. The case derives the float, overflow, and object-fit tables from the inventory, the computed and scrolled axis pairs from the CSS rule, and every paint reading from the fitting rules over the fixture's sizes.
- `tests/fixtures/tailwind/markup.html`: the shared names appended after the `invisible` element.
- `guides/veneer.md`: the `### Files` rows; the stretched link in `### Helper classes`; the `### Float utilities`, `### Overflow utilities`, and `### Object fit utilities` sections before `### Deferred selectors`; the Tailwind sentence on the float and overflow names; the `#### object-fit` table; the compatibility rows after the `invisible` row; the § Showcase grouping and frame sentences; the § Tests links.
- Not patched, no change needed: `tests/setup.test.ts`, `tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, and `tests/fixtures/tailwind/preflight.css` (the exclusion line is unchanged).
- `ROADMAP.md`: not patched, because the fold names the landing commit, which only the integrator holds. Suggested clause: "UTIL-FLOW landed as `<sha>` (the float, clearfix, overflow, object-fit, and stretched-link keys with the Float, Overflow, and Object fit regions after Visibility and the `Stretched link` specimen in Links; a first round on `opus`)".

## Scoped gate exits

The worktree readings cover owned files only:
- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.

The following readings were taken on the validation copy `tmp/probe/base`, with owned files and the
shared patch applied. The copy was deleted after the readings.
- `npm run check`: exit 0.
- `npm run build:src`: exit 0.
- Scoped `oxlint --no-ignore` and `oxfmt --check` over the patched shared files: exit 0.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot <five owned proofs>`: exit 0, 43 passed.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser <the Float, Overflow, Object fit, Link, Showcase, and index proofs>`: exit 0, 17 passed.
- `npm run test:conformance`: exit 0, 22 passed (`ufl-gate-conformance2.log.txt`). One earlier run under load average 22 timed out on the Button oracle case.
- `npm run build:src:styles && npm run test:service`: exit 0, 18 passed.
- `npm run test:policy`: exit 0. `npm run test:guides`: exit 0.
- `npm run test:setup` (an observation): exit 1. A run at load average 12 failed only the duplication gate, with 266 passed (§ Deviations); the later run overwrote its log. The retained logs, `ufl-gate-setup.log.txt` and `ufl-gate-setup2.log.txt`, come from runs at load average 22 to 25. They show the duplication gate failing beside timeouts in the Button oracle and range cases. The deciding re-run of those timing cases belongs to the Orchestrator.

The failing-first evidence is the mutation logs, `.orkestrel/veneer/units/ufl-instruments/ufl-mutation-*.log.txt`. Each log names
the site, the command, the build and command exits, the summary line, and the failing cases. The
instrument is `.orkestrel/veneer/units/ufl-instruments/ufl-mutate.sh`, and the gate script is `.orkestrel/veneer/units/ufl-instruments/ufl-gates.sh`.

## Deviations

1. **The duplication gate refuses the stretched link's edge block (stopped, not closed).** Expected: `repeats no partial's written declaration block in another partial beyond the coincidence floor` passes. Found: `findDuplication` reports `components/_stretched-link.scss` line 6 against `components/_card.scss` line 140. They share `position: absolute; top: 0; right: 0; bottom: 0; left: 0`, which is 5 of 7 declarations, above the floor the gate records. Both blocks copy the release's own values. The rule in `.claude/rules/styles.md` keeps such a coincidence inline, but the gate's floor refuses it, and the gate names `_mixins.scss` as the repair. That repair edits `_card.scss`, which is off-limits. Not closed in the owned tree: the worktree ships Route A, the inline block. Route B is `.orkestrel/veneer/units/ufl-routeb.patch`: a `cover-block` mixin in `_mixins.scss` with its fixture and case, the `_card.scss` overlay, and the owned `_stretched-link.scss` including the mixin. On the copy, Route B passed the mixins, card, and stretched-link proofs (41 passed), conformance (22 passed), and the duplication gate; its only `test:setup` failures were load timeouts (`ufl-routeb-*.log.txt`). Writing the edges as `inset: 0` was measured and refused: it adds 4 `dropped` departure rows and 1 declaration addition. Hypothesis: the edge block is one decision, covering the containing block, so Route B is the repair, owned by UTIL-SPACER's `_mixins.scss` and the card partial's owner.
2. **The Button oracle and range cases time out under host load.** These are observations and not repaired; see § Scoped gate exits.

Ancillary choices recorded:
- The `Cleared floats` capture row reads the floated card's `float` property, and the `Stretched link` row reads the card's `position` property. A computed style reads no property of a generated box. The `CASCADE_KEYS` remark states this.
- No driven row is registered. The stretched link has no focus reveal of its own.

## Could not close

- The duplication gate stays red on Route A until the Orchestrator routes Route B or rules otherwise.
- The journey, `CAPTURE=1`, and the frames of the eight scenarios are the Orchestrator's runs.
- The object-fit pictures paint the default black fill, so in dark mode they contrast weakly with the thumbnail's surface. The Media specimens already have this limit. No literal color was added to fix it.
