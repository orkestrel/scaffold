# UTIL-DISPLAY (`ud`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-ud` (branch `unit/ud`, base `e4e6a40`). The unit spawned nothing.

## Outcome

- The `d` key with its print pass, `flex`, `justify-content`, `align-items`, `align-content`, `align-self`, `order`, `align`, `hstack`, and `vstack` ship through the `utility` mixin, with no `_mixins.scss` change. Every inventory site is in the built cascade, every property is `!important`, the stacks are normal, and no other selector exists under these keys.
- The ledger measured no departure and no addition, so no `#### <key>` table and no `### Additions` row is written.
- All shared names this unit ships are off the exclusion line: `align-*`, `flex-row`, `flex-row-reverse`, `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`, `flex-grow-*`, `flex-shrink-*`, and `order-*`. The line and its copies do not change, so no line names return for the set union.
- **The worktree alone cannot pass criteria 2 to 5.** The partials reach the cascade only through the report-only `src/styles/index.scss` barrel. The sections need the report-only `app/browser/constants.ts` and `app/browser/index.ts` exports. So every gate that depends on shared files was measured in a landing copy: the worktree plus the owned files plus `tmp/units/ud-shared.patch`, applied with `patch -p1`. There every gate is green. See Deviation 1.
- `tests/setup.ts` needs a type change beyond rows and members: the `CaptureStem` type cannot spell the stem of `Fill, grow, and shrink`. See Deviation 2. It needs a ruling.

## Touched files (owned, all untracked)

| File | Summary |
| --- | --- |
| `src/styles/utilities/_vertical-align.scss` | Writes the `align` key through the `utility` mixin in one walk. The entry is not responsive, so it is written at the empty infix only. |
| `src/styles/utilities/_display.scss` | Writes the `d` key at every infix in one walk, then writes the print pass as one `@media print` block after the walk, under the `-print` infix. |
| `src/styles/utilities/_flex.scss` | Writes the `flex`, `flex-direction`, `flex-grow`, `flex-shrink`, `flex-wrap`, `justify-content`, `align-items`, `align-content`, `align-self`, and `order` entries in the release map order, all inside one walk. |
| `src/styles/components/_stacks.scss` | Writes `.hstack` and `.vstack` with the release's normal declarations in the `components` layer. |
| `tests/src/styles/utilities/display.test.ts` | Reads every value at every boundary, the print pass, the infix order, the mode and the density factor, the priority, and the escape. |
| `tests/src/styles/utilities/flex.test.ts` | Reads every value at every boundary. Reads a constrained layout per property at every boundary. Also reads the cross-entry and cross-infix order, the mode and the density factor, the priority, and the escape. |
| `tests/src/styles/utilities/vertical-align.test.ts` | Reads every value, each position on one line, the absence of an infixed class, the mode and the density factor, the priority, and the escape. |
| `tests/src/styles/components/stacks.test.ts` | Reads the centered row composing `.gap-3` and the stretched column. Reads the flex and display utilities overriding each helper declaration, and the layer. Reads the mode and the density factor. |
| `app/browser/sections/DisplaySection.ts` | The `Display` region, fed by `DISPLAY_COPY` and `DISPLAY_SPECIMENS`. |
| `app/browser/sections/FlexSection.ts` | The `Flex` region, fed by `FLEX_COPY` and `FLEX_SPECIMENS`. |
| `tests/app/browser/sections/DisplaySection.test.ts` | Reads the specimen contract, the responsive swap at 390 and 1280, and destruction. |
| `tests/app/browser/sections/FlexSection.test.ts` | Reads the specimen contract, the rendered order sequence and the centered stack at 390 and 1280, and destruction. |

Diffstat: 12 files, 1227 insertions, 0 deletions. All 12 are untracked, and `git diff e4e6a40` over tracked files is empty. `git status --porcelain` lists only the 12 files as `??`, plus the gitignored `tmp/`.

Retained instruments are in `tmp/units/ud-instruments/`:
- `sync.sh` builds the probe copy.
- `mutate.py` holds the mutation table, and `mutate.log.txt` is its last run.
- `cascade.test.ts` is the criterion 3 comparison, run in the `probe` project of a copy.

All of them expect a probe copy at `tmp/probe/tree`. `tmp/probe/` itself is deleted.

## Baseline (at `e4e6a40`, before any edit)

- `npm run test:conformance` exited 0 with 22 passed.
- `npm run test:service` exited 0 with 18 passed.

## Failing-first evidence

The command was `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/display.test.ts tests/src/styles/utilities/flex.test.ts tests/src/styles/utilities/vertical-align.test.ts tests/src/styles/components/stacks.test.ts`.

- **Before the partials:** exit 1, `Test Files 4 failed (4)`, `Tests 37 failed (37)`. Each case failed on the missing class. For example, `expected 'contents' to be 'inline'` and `expected [ 'block', 'row', 'normal', 'auto' ] to deeply equal [ 'flex', 'row', 'center', 'stretch' ]`.
- **After, in the landing copy:** exit 0, `Tests 37 passed (37)`.

Two proof defects were found and fixed before the green run:
- The print case queried `.d-print-block`, and that query also matched the `.d-none.d-print-block` subject.
- The flex resting style wrote a key, such as `grow-1`, where a CSS value belonged.

Failing-first test names:
- `display utilities`:
  - `resolves every value around the $name boundary`, which runs once per boundary
  - `switches to the print values under the print medium, and back to the screen values after it`
  - `resolves a wider infix over a narrower one whatever order the classes are written in`
  - `reads no token or mode, so a dark island and a doubled density factor leave every value`
  - `keeps its priority over a later unlayered consumer rule`
  - `yields to an important override inside the utilities layer and to no unlayered one`
- `flex utilities`:
  - `resolves every flex value around the $name boundary`, which runs once per boundary
  - `moves each constrained layout at and above the $name boundary`, which runs once per boundary
  - `resolves a later entry over an earlier one at one infix, and a wider infix over a narrower one`
  - `reads no token or mode, …`
  - `keeps every flex priority over a later unlayered consumer rule`
  - `yields to an important override …`
- `vertical alignment utilities`:
  - `resolves every value at every viewport, and writes no responsive class`
  - `places each box on its own line position in an inline context`
  - the mode case, the priority case, and the escape case
- `stack helpers`:
  - `lays a horizontal stack out as a centered row that composes the gap utility`
  - `lays a vertical stack out as a column that fills and stretches inside a flex row`
  - `keeps its declarations normal, so an important flex utility overrides each one`
  - `sits in the components layer beneath a later unlayered consumer rule`
  - `reads no token or mode, so a dark island and a doubled density factor leave the stacks`

## Criterion 3 (built cascade, landing copy)

`cascade.test.ts` parses `dist/src/styles/index.css` with PostCSS and compares every site with the inventory. A site is a selector plus its condition.

| Reading | Inventory | Built cascade |
| --- | --- | --- |
| Distinct sites under `d`, `flex`, `justify-content`, `align-items`, `align-content`, `align-self`, `order`, `align`, `hstack`, `vstack` | 343 | 343 present, 0 missing |
| Property declarations without `!important`, excluding the stacks | — | 0 |
| Custom properties with `!important` | — | 0 (none are recorded or emitted) |
| Stack declarations with `!important` | — | 0 |
| Emitted selectors under these prefixes that the inventory does not record | — | 0 |

Per key: `d` 77 (66 responsive + 11 `@media print`), `flex` 72, `justify-content` 36, `align-items` 30, `align-content` 36, `align-self` 36, `order` 48, `hstack` 1, `vstack` 1. The inventory records 108 rows under `align`: 6 vertical-align sites and 102 repeats of the `align-items`, `align-content`, and `align-self` sites. The `attributeSelector` helper sends each repeat to its own key; a probe over the inventory confirmed this for every selector. So the `attributeSelector` ladder needs no change (family ruling 15 does not fire).

Observation: the minifier writes `flex: 1 1 auto` as `flex:auto` in `.flex-fill`, `.flex-{bp}-fill`, and `.vstack`. The two values compute the same. The ledger reads the expanded compile, which writes `1 1 auto`, so it records no row.

## Coverage matrix

Proof files: `D` is `display.test.ts`, `F` is `flex.test.ts`, `V` is `vertical-align.test.ts`, and `S` is `stacks.test.ts`. The mutation names refer to the rows of `mutate.py`, and each red count comes from its logged run.

| Inventory population | Condition | Proof case | Distinguishing mutation (red count) | Specimen | Capture scenario |
| --- | --- | --- | --- | --- | --- |
| `.d-{value}` (11 values) | none | D `… around the 'xs' boundary` (375, 1401); D mode case; D priority and escape (`.d-flex`) | `display-value-omitted` (7 red); `display-important-dropped` (9 red) | Display values | `display-values` (`.d-inline-grid`, `display`) |
| `.d-{sm…xxl}-{value}` | `@media (min-width: 576…1400px)` | D boundary cases at b−1, b, b+1; D infix-order case (767, 768) | `display-breakpoint-omitted` (the lg case red); `display-walk-reversed` (the infix-order case red) | Responsive display | `responsive-display` (`.d-md-flex`, `display`) |
| `.d-print-{value}` | `@media print` | D print case: screen, then `stageMedia({ print: true })`, then 1401 under print, then `releaseMedia()` and screen again | `print-omitted`, `print-screen`, `print-before-walk` (each 1 red: the print case) | Print display | `print-display` (`.d-print-none`, `display`), the screen half; the print pass takes no frame (R13) |
| `.align-{value}` (6 values) | none | V value case; V line-position case; V mode, priority, and escape | `align-initial-value` (5 red); `align-responsive` (1 red); `align-important-dropped` (3 red) | Vertical alignment | `vertical-alignment` (`.align-middle`, `vertical-align`) |
| `.flex-fill`, `.flex-{row,column,row-reverse,column-reverse}`, `.flex-grow-{0,1}`, `.flex-shrink-{0,1}`, `.flex-{wrap,nowrap,wrap-reverse}` | none and each `min-width` | F value cases and F constrained-layout cases per boundary (b−1, b, b+1); F order case; F priority and escape | `flex-initial-value` (14 red); `flex-per-entry` (1 red: the order case); `flex-important-dropped` (8 red) | Flex direction; Flex wrap; Fill, grow, and shrink | `flex-direction` (`.flex-column`), `flex-wrap` (`.flex-wrap`), `fill-grow-and-shrink` (`.flex-grow-1`) |
| `.justify-content-*` | none and each `min-width` | F value and constrained-layout cases (`justify-content{infix}-end`) | `flex-justify-initial` (12 red) | Justified content | `justified-content` (`.justify-content-between`) |
| `.align-items-*`, `.align-content-*`, `.align-self-*` | none and each `min-width` | F value and constrained-layout cases (`-end` at each infix) | `flex-important-dropped` (8 red); the initial-value mutation class | Aligned items; Aligned content; Aligned self | `aligned-items` (`.align-items-center`), `aligned-content` (`.align-content-between`), `aligned-self` (`.align-self-center`) |
| `.order-*` | none and each `min-width` | F value and constrained-layout cases (`order{infix}-first`); F order case (`.order-md-last.order-first`) | `flex-per-entry`; `flex-important-dropped` | Flex order | `flex-order` (`.order-first`) |
| `.hstack` | none | S centered-row case; S override case; S layer case; S mode case | `stack-display-dropped` (2 red); `stack-important` (2 red); `stack-utilities-layer` (1 red) | Horizontal stack | `horizontal-stack` (`.hstack`, `align-items`) |
| `.vstack` | none | S stretched-column case; S override case; S layer case | `stack-important`; `stack-utilities-layer` | Vertical stack | `vertical-stack` (`.vstack`, `flex-direction`) |

Every specimen has a resting `CASCADE_KEYS` row. No driven row applies. The journey ran without the capture flag in the landing copy and passed. The 14 subjects resolve on the rendered surface, and each row's declared property matches between the showcase specimen and the lifted copy at 390 and 1280, light and dark.

## Shared-name table

The measurement ran through the installed compiler: the unexcluded instrument, expanded by Chromium. The shared set is derived per run.

| Name | Longhands Tailwind declares (its value) | Veneer declaration | Line status |
| --- | --- | --- | --- |
| `align-baseline`, `align-top`, `align-middle`, `align-bottom`, `align-text-top`, `align-text-bottom` | `vertical-align` (the same keyword) | `vertical-align` with `!important` | off the line |
| `flex-row`, `flex-row-reverse` | `flex-direction` | `flex-direction` with `!important` | off the line |
| `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse` | `flex-wrap` | `flex-wrap` with `!important` | off the line |
| `flex-grow-0`, `flex-grow-1` | `flex-grow` | `flex-grow` with `!important` | off the line |
| `flex-shrink-0`, `flex-shrink-1` | `flex-shrink` | `flex-shrink` with `!important` | off the line |
| `order-0` … `order-5` | `order` (`0` … `5`) | `order` with `!important` | off the line |
| `order-first`, `order-last` | `order` (`-9999`, `9999`) | `order: -1`, `order: 6`, each with `!important` | off the line; the page resolves Veneer's value |

These names are not shared, because Tailwind generates no rule for them: `d-*`, `flex-column`, `flex-column-reverse`, `flex-fill`, `justify-content-*`, `align-items-*`, `align-content-*`, `align-self-*`, `hstack`, and `vstack`. The executed profiles also emit these names, and `tailwind.variables` stays `['--spacing']`.

Negative controls ran in the landing copy, and each was restored byte for byte:
- **Control A:** `!important` dropped from `.order-first` in the built cascade. `npm run test:service` exited 1 with `2 failed | 16 passed`. The red cases were `consumer > derives the shared class names…` and `consumer > keeps a shared name on the line while its importance covers only some…`, each an exclusion-line equality.
- **Control B:** `order-first` written onto the line in `tests/setup.css`, `consumer.css`, and `preflight.css`. `npm run test:service` exited 1 with `4 failed | 14 passed`. The red cases were:
  - `consumer > executes the recipe the guide ships…`
  - `consumer > derives…`
  - `consumer > keeps a shared name on the line…`
  - `profiles > holds every written copy of the exclusion line equal…`

## Precedence cases and their mutations

| Case | Reading | Mutation that reddens it |
| --- | --- | --- |
| Print over the widest responsive class | `.d-xxl-none.d-print-flex` at 1401 resolves `flex` under print and `none` on screen | `print-before-walk` |
| Wider infix over narrower (display) | `.d-none.d-md-block` resolves `none` at 767 and `block` at 768; `.d-md-none.d-sm-flex` resolves `flex` at 767 and `none` at 768 | `display-walk-reversed` |
| Later entry over earlier at one infix | `.flex-fill.flex-grow-0` resolves `flex-grow: 0` and `flex-basis: auto` | `flex-per-entry` |
| Wider infix over narrower, across entries | `.flex-grow-0.flex-md-fill` resolves `0` at 767 and `1` at 768; `.order-md-last.order-first` resolves `-1` at 767 and `6` at 768 | `flex-per-entry` |
| Shrink entry after the `flex` shorthand | the priority case: `.flex-fill.flex-shrink-0` keeps `flex-shrink: 0` | `flex-shrink-before-flex` (1 red: the priority case) |
| Priority over a later unlayered rule | `.d-flex`, `.align-middle`, and the flex classes keep their values against an unlayered `.probe` rule | `display-important-dropped`, `align-important-dropped`, `flex-important-dropped` |
| `@layer utilities` escape | an unlayered `!important` leaves the utility in place; the same declaration inside `@layer utilities` wins | the same important-dropped mutations |
| Important utility over a normal stack | `.hstack.flex-column.align-items-start.align-self-center.d-inline-flex` and `.vstack.flex-row.flex-grow-0.align-self-end.d-grid` resolve every utility value | `stack-important` |
| Stack beneath an unlayered consumer rule, in `components` | an unlayered `.hstack { flex-direction: column }` wins; the rules sit in the `components` layer and not in `utilities` | `stack-important`, `stack-utilities-layer` |
| Barrel order | the conformance order case: `utilities/vertical-align`, `utilities/display`, `utilities/flex`, `utilities/gap` in map order; `components/stacks` between `components/ratio` and `components/vr` | a partial loaded out of map order (the case's own assertion) |

## Ledger rows

None. The departures and additions gates in the landing copy returned `departures.unrecorded` `[]` and `additions.unrecorded` `[]`, and the stale lists were also `[]` (`npm run test:conformance`, 22 passed). The comparison's own category is therefore empty for every key. The compatibility rows added are `selector` rows with Status `shipped`, one per key. The `listed` literal and the `setupServer.test.ts` compatibility set gain `align`, `align-content`, `align-items`, `align-self`, `d`, `flex`, `hstack`, `justify-content`, `order`, and `vstack`.

## Section text

The guide text is in the `guides/veneer.md` hunk of the following patch:
- `### Display utilities` and `### Flex utilities` sit between `### Gap utilities` and `### Deferred selectors`.
- The `### Files` table gains four rows.
- The compatibility table gains ten rows after the `column-gap` row.
- The § Tailwind importance paragraph gains one sentence.
- The § Showcase paragraph gains one clause for the stacks.
- The § Tests links gain the section proofs and the style proofs.

The specimen copy and markup are in the `app/browser/constants.ts` hunk.

## Scoped gate exits

Worktree (`/home/user/veneer-ud`, shared files untouched):

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | all matched files formatted |
| `npm run lint:check` | 0 | — |
| `npm run check` | 2 | TS2305 and TS2724: `DISPLAY_COPY`, `DISPLAY_SPECIMENS`, `FLEX_COPY`, `FLEX_SPECIMENS`, `DisplaySection`, and `FlexSection` are not exported by `../constants.js` or `@app/browser`; TS7006 follows from those |
| `npm run build:src` | 0 | the cascade carries no selector of these keys (the barrel does not load the partials) |
| the criterion 4 command (the owned styles proofs) | 1 | `Tests 37 failed (37)` (no partial in the barrel) |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts` | 1 | import failure: `does not provide an export named 'DISPLAY_COPY'` |
| `npm run test:conformance` | 0 | 22 passed |
| `npm run test:service` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |

Landing copy (`tmp/probe/land`: `git ls-files` plus the owned files plus `patch -p1 < tmp/units/ud-shared.patch`, with a hard-linked `node_modules`, deleted after the run):

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | — |
| the criterion 4 command | 0 | 4 files, 37 passed |
| the section proofs command (as in the preceding table) | 0 | 2 files, 6 passed |
| `npm run test:conformance` | 0 | 22 passed |
| `npm run build:src:styles && npm run test:service` | 0 | 3 files, 18 passed |
| `npm run test:setup` | 0 | 250 passed |
| `npm run test:guides` | 0 | 19 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` (whole styles project) | 0 | 80 files, 803 passed |
| `npm run test:app` | 0 | 30 files, 72 passed |
| `npm run test:setup:browser` | 0 | 65 passed |
| `npx oxfmt --config .oxfmtrc.json --check <each patched file>` | 0 | 13 files |
| `npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore <each patched .ts file>` | 0 | a planted `any` in a control file reported, so the scoped run lints |
| `npm run test:journey` (observation, no capture flag, run in the patched probe copy) | 0 | 4 files, 152 passed; the first run, before the `integration.test.ts` hunk, went red on `names a specimen the showcase declares…` at every variant (the declared-table enumeration) |

`git apply --check tmp/units/ud-shared.patch` in the worktree exits 0. After `patch -p1`, every patched file in the landing copy is byte-identical to the probe copy the gates ran on.

## Deviations

1. **Shared files gate the owned criteria.**
   - Expected: criteria 2 to 5 and 7 green in the worktree.
   - Found: the partials reach the cascade only through `src/styles/index.scss`, and the sections need `app/browser/constants.ts` and `app/browser/index.ts`. The brief and family ruling 12 make all three report-only. Family ruling 4 says each unit "inserts its `@use` lines", which conflicts with ruling 12. The unit followed the brief and ruling 12.
   - Evidence: the worktree table in § Scoped gate exits.
   - Done: every criterion is green in the landing copy, built from the exact patch.
   - Not done: a green worktree, which needs the patch integrated.
   - Hypothesis: every wave-2 unit that adds a partial or a region meets this.
2. **The `CaptureStem` type cannot spell a subject with a comma.**
   - Expected: appending the subject and row for `Fill, grow, and shrink` (criterion 5 fixes the name) typechecks.
   - Found: `tests/setup.ts(397,14): error TS2322 … Type '"fill-grow-and-shrink"' is not assignable to type 'CaptureScenario'. Did you mean '"fill,-grow,-and-shrink"'?` The `buildStem` function drops the comma at run time, but the type keeps it.
   - Done: the patch changes `CaptureStem` to drop each comma before it hyphenates spaces, and updates its doc comment. It also adds a typed `CaptureStem<'Fill, grow, and shrink'>` constant with a `buildStem` assertion in `tests/setup.test.ts`, so the type and the runtime agree under `npm run check` and `npm run test:setup`.
   - This is a mechanism change in a shared file, beyond "members and rows", so it needs your ruling. The alternative is a specimen name without a comma, which contradicts criterion 5.
3. **Ancillary choices this unit settled, recorded:**
   - The case tables (`DISPLAY_VALUES`, `ALIGN_VALUES`, `FLEX_ENTRIES`, `RESTING`) sit at module scope in the owned proofs, as `GAP_KEYS` does in `gap.test.ts`, and not in the report-only `tests/setupStyles.ts`. `.claude/rules/tests.md` places case matrices in a setup file, so a reviewer can move them there through a successor patch.
   - The `Print display` specimen takes a resting row on its screen half, `.d-inline-block.d-print-none`. The print pass itself takes no frame (R13).
   - The regions are constructed after `InputGroupSection`, `Display` then `Flex`. The union with the sibling regions in barrel order is an integration decision.
   - No `ROADMAP.md` patch: the landing fold is the Orchestrator's commit, as at `e4e6a40`.
   - The guide spelling is `centered`, matching the guide's American spelling.
   - The `### Files` rows are placed after `_vr.scss` and after `_gap.scss`.
4. **The patch covers `tests/app/browser/integration.test.ts`.** The brief scopes that file to "the driven frames". The unit has no driven frame, but the case `names a specimen the showcase declares…` enumerates the specimen tables, and it went red without `DISPLAY_SPECIMENS` and `FLEX_SPECIMENS`. The hunk adds the two imports and the two tables.

## What the unit could not close

- A green worktree for criteria 2 to 5 and 7 needs `tmp/units/ud-shared.patch` integrated.
- The `CaptureStem` hunk needs a ruling (Deviation 2).
- `CAPTURE=1` and the frames for the 14 scenarios belong to the Orchestrator.
- The journey ran without the capture flag in the probe copy and passed. The Orchestrator's run on the integrated tree is the authoritative reading.
- The line and its copies do not change, so this unit adds nothing to the set union. `markup.html` gains the unit's shared names before the button line, and that addition takes part in the union.

## Shared-file patch (`tmp/units/ud-shared.patch`, unified diff against `e4e6a40`)

It covers these files:
- `src/styles/index.scss`
- `app/browser/constants.ts`, `app/browser/index.ts`, and `app/browser/Showcase.ts`
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, and `tests/app/browser/integration.test.ts`
- `tests/setup.ts` and `tests/setup.test.ts`
- `tests/conformance.test.ts` and `tests/setupServer.test.ts`
- `tests/fixtures/tailwind/markup.html`
- `guides/veneer.md`

These shared files are unchanged: `src/styles/_mixins.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setup.css`, `consumer.css`, `preflight.css`, and `ROADMAP.md`.

```diff
diff --git a/src/styles/index.scss b/src/styles/index.scss
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -69,5 +69,9 @@
 @use 'components/placeholder';
 @use 'components/icon-link';
 @use 'components/ratio';
+@use 'components/stacks';
 @use 'components/vr';
+@use 'utilities/vertical-align';
+@use 'utilities/display';
+@use 'utilities/flex';
 @use 'utilities/gap';
diff --git a/app/browser/constants.ts b/app/browser/constants.ts
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -1704,3 +1704,148 @@
 			'<div class="container-fluid"><fieldset class="row"><legend class="col-5 col-form-label">Pickup</legend><div class="col-7"><input class="form-control" type="date" aria-label="Pickup date" value="2026-09-23"></div></fieldset></div>',
 	}),
 ])
+
+/** Holds the Display section's visible copy and accessible name. */
+export const DISPLAY_COPY = Object.freeze({
+	region: 'Display',
+	paragraph:
+		'Display classes set the box an element generates at each breakpoint and in print, and vertical alignment places inline content on its line. Resize the viewport to compare the responsive classes.',
+})
+
+/**
+ * Lists the display and vertical-alignment specimens the section renders, in render order.
+ *
+ * @remarks
+ * A hidden subject shares its line with visible text, so every specimen shows content at every
+ * width: the responsive pair swaps one sentence for the other at the md boundary, and the print
+ * pair shows its screen half. The vertical-alignment line carries a display heading, so each
+ * position is read against a box taller than the text beside it.
+ */
+export const DISPLAY_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Display values',
+		markup:
+			'<p><span class="d-inline">Inline</span> <span class="d-inline-block">Inline block</span></p><div class="d-block">Block</div><div class="d-grid">Grid</div><div class="d-inline-grid">Inline grid</div><div class="d-table"><div class="d-table-row"><div class="d-table-cell">Table cell</div><div class="d-table-cell">Next cell</div></div></div><div class="d-flex gap-2"><span>Flex item</span><span>Next item</span></div><div class="d-inline-flex gap-2"><span>Inline flex item</span><span>Next item</span></div><p>A hidden element follows this sentence.<span class="d-none">Hidden</span></p>',
+	}),
+	Object.freeze({
+		name: 'Responsive display',
+		markup:
+			'<p><span class="d-inline d-md-none">Shown below the md boundary</span><span class="d-none d-md-inline">Shown at the md boundary and wider</span></p><div class="d-block d-md-flex gap-3"><div>Stacked below md</div><div>In a row from md</div></div>',
+	}),
+	Object.freeze({
+		name: 'Print display',
+		markup:
+			'<p><span class="d-inline-block d-print-none">Shown on screen, hidden in print</span> <span class="d-none d-print-inline">Shown in print only</span></p>',
+	}),
+	Object.freeze({
+		name: 'Vertical alignment',
+		markup:
+			'<p><span class="display-6">Aa</span> <span class="align-baseline">baseline</span> <span class="align-top">top</span> <span class="align-middle">middle</span> <span class="align-bottom">bottom</span> <span class="align-text-top">text-top</span> <span class="align-text-bottom">text-bottom</span></p>',
+	}),
+])
+
+/** Holds the Flex section's visible copy and accessible name. */
+export const FLEX_COPY = Object.freeze({
+	region: 'Flex',
+	paragraph:
+		'Flex classes set the direction, wrapping, and alignment of a container and the growth, shrinking, alignment, and order of an item, and the stacks lay out a centered row or a stretched column. Resize the viewport to compare how each container fits its items.',
+})
+
+/**
+ * Lists the flex, alignment, order, and stack specimens the section renders, in render order.
+ *
+ * @remarks
+ * Each container labels its first item with the class it demonstrates. The wrap specimens size
+ * their items with column classes so three items overflow one line at every width, and the
+ * aligned-content boxes take their height from the aspect-ratio class, because packing lines needs
+ * a container taller than its lines. The order specimen writes its items out of order, so the
+ * rendered sequence is the classes' own.
+ */
+export const FLEX_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Flex direction',
+		markup: ['flex-row', 'flex-row-reverse', 'flex-column', 'flex-column-reverse']
+			.map(
+				(name) =>
+					`<div class="d-flex ${name} gap-2"><span>${name}</span><span>Second</span><span>Third</span></div>`,
+			)
+			.join(''),
+	}),
+	Object.freeze({
+		name: 'Flex wrap',
+		markup: ['flex-wrap', 'flex-nowrap', 'flex-wrap-reverse']
+			.map(
+				(name) =>
+					`<div class="d-flex ${name}"><div class="col-5 flex-shrink-1">${name}</div><div class="col-5 flex-shrink-1">Second</div><div class="col-5 flex-shrink-1">Third</div></div>`,
+			)
+			.join(''),
+	}),
+	Object.freeze({
+		name: 'Justified content',
+		markup: ['start', 'end', 'center', 'between', 'around', 'evenly']
+			.map(
+				(key) =>
+					`<div class="d-flex justify-content-${key}"><span>justify-content-${key}</span><span>Item</span></div>`,
+			)
+			.join(''),
+	}),
+	Object.freeze({
+		name: 'Aligned items',
+		markup: ['start', 'end', 'center', 'baseline', 'stretch']
+			.map(
+				(key) =>
+					`<div class="d-flex align-items-${key} gap-2"><div class="display-6">Tall</div><div>align-items-${key}</div><div>Item</div></div>`,
+			)
+			.join(''),
+	}),
+	Object.freeze({
+		name: 'Aligned content',
+		markup: `<div class="row row-cols-2 row-cols-md-3 g-2">${[
+			'start',
+			'end',
+			'center',
+			'between',
+			'around',
+			'stretch',
+		]
+			.map(
+				(key) =>
+					`<div><div class="ratio ratio-4x3"><div class="d-flex flex-wrap align-content-${key}"><div class="col-6">${key}</div><div class="col-6">Item</div><div class="col-6">Item</div><div class="col-6">Item</div></div></div></div>`,
+			)
+			.join('')}</div>`,
+	}),
+	Object.freeze({
+		name: 'Aligned self',
+		markup: `<div class="d-flex flex-wrap gap-2"><div class="display-6">Tall</div>${[
+			'auto',
+			'start',
+			'end',
+			'center',
+			'baseline',
+			'stretch',
+		]
+			.map((key) => `<div class="align-self-${key}">${key}</div>`)
+			.join('')}</div>`,
+	}),
+	Object.freeze({
+		name: 'Fill, grow, and shrink',
+		markup:
+			'<div class="d-flex gap-2"><div class="flex-fill">Fill</div><div class="flex-fill">Fill with longer content</div><div class="flex-fill">Fill</div></div><div class="d-flex gap-2"><div class="flex-grow-0">Fixed</div><div class="flex-grow-1">Grows into the free space</div><div class="flex-grow-0">Fixed</div></div><div class="d-flex gap-2"><div class="col-8 flex-shrink-1">Shrinks</div><div class="col-8 flex-shrink-0">Keeps its width</div></div>',
+	}),
+	Object.freeze({
+		name: 'Flex order',
+		markup: `<div class="d-flex flex-wrap gap-2">${['last', '2', 'first', '5', '0', '4', '1', '3']
+			.map((key) => `<div class="order-${key}">order-${key}</div>`)
+			.join('')}</div>`,
+	}),
+	Object.freeze({
+		name: 'Horizontal stack',
+		markup:
+			'<div class="hstack gap-3"><span class="display-6">Tall</span><div class="vr"></div><span>First item</span><div class="vr"></div><span>Second item</span></div>',
+	}),
+	Object.freeze({
+		name: 'Vertical stack',
+		markup:
+			'<div class="vstack gap-2 col-6"><div class="card card-body">First item</div><div class="card card-body">Second item</div><div class="card card-body">Third item</div></div>',
+	}),
+])
diff --git a/app/browser/index.ts b/app/browser/index.ts
--- a/app/browser/index.ts
+++ b/app/browser/index.ts
@@ -27,3 +27,5 @@
 export * from './sections/BreadcrumbSection.js'
 export * from './sections/CloseSection.js'
 export * from './sections/InputGroupSection.js'
+export * from './sections/DisplaySection.js'
+export * from './sections/FlexSection.js'
diff --git a/app/browser/Showcase.ts b/app/browser/Showcase.ts
--- a/app/browser/Showcase.ts
+++ b/app/browser/Showcase.ts
@@ -9,6 +9,8 @@
 import { CardSection } from './sections/CardSection.js'
 import { CloseSection } from './sections/CloseSection.js'
 import { ContentSection } from './sections/ContentSection.js'
+import { DisplaySection } from './sections/DisplaySection.js'
+import { FlexSection } from './sections/FlexSection.js'
 import { FormCheckSection } from './sections/FormCheckSection.js'
 import { FormControlSection } from './sections/FormControlSection.js'
 import { FormFloatingSection } from './sections/FormFloatingSection.js'
@@ -114,6 +116,8 @@
 			new BreadcrumbSection(this.#main),
 			new CloseSection(this.#main),
 			new InputGroupSection(this.#main),
+			new DisplaySection(this.#main),
+			new FlexSection(this.#main),
 		]
 	}
 
diff --git a/tests/app/browser/Showcase.test.ts b/tests/app/browser/Showcase.test.ts
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -6,6 +6,8 @@
 	BUTTON_SPECIMENS,
 	CLOSE_SPECIMENS,
 	CONTENT_SPECIMENS,
+	DISPLAY_SPECIMENS,
+	FLEX_SPECIMENS,
 	FORM_CHECK_SPECIMENS,
 	FORM_CONTROL_SPECIMENS,
 	FORM_FLOATING_SPECIMENS,
@@ -111,6 +113,8 @@
 				'Breadcrumb',
 				'Close',
 				'Input group',
+				'Display',
+				'Flex',
 			])
 			expect(
 				[...host.querySelectorAll('[data-specimen]')].map((element) =>
@@ -142,6 +146,8 @@
 					...BREADCRUMB_SPECIMENS,
 					...CLOSE_SPECIMENS,
 					...INPUT_GROUP_SPECIMENS,
+					...DISPLAY_SPECIMENS,
+					...FLEX_SPECIMENS,
 				].map((specimen) => specimen.name),
 			)
 			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
diff --git a/tests/app/browser/index.test.ts b/tests/app/browser/index.test.ts
--- a/tests/app/browser/index.test.ts
+++ b/tests/app/browser/index.test.ts
@@ -32,6 +32,11 @@
 			'CardSection',
 			'CloseSection',
 			'ContentSection',
+			'DISPLAY_COPY',
+			'DISPLAY_SPECIMENS',
+			'DisplaySection',
+			'FLEX_COPY',
+			'FLEX_SPECIMENS',
 			'FORM_CHECK_COPY',
 			'FORM_CHECK_SPECIMENS',
 			'FORM_CONTROL_COPY',
@@ -44,6 +49,7 @@
 			'FORM_RANGE_SPECIMENS',
 			'FORM_SELECT_COPY',
 			'FORM_SELECT_SPECIMENS',
+			'FlexSection',
 			'FormCheckSection',
 			'FormControlSection',
 			'FormFloatingSection',
diff --git a/tests/app/browser/integration.test.ts b/tests/app/browser/integration.test.ts
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -46,6 +46,8 @@
 	CARD_SPECIMENS,
 	CLOSE_SPECIMENS,
 	CONTENT_SPECIMENS,
+	DISPLAY_SPECIMENS,
+	FLEX_SPECIMENS,
 	FORM_CHECK_SPECIMENS,
 	FORM_CONTROL_SPECIMENS,
 	FORM_FLOATING_SPECIMENS,
@@ -1679,6 +1681,8 @@
 				CARD_SPECIMENS,
 				CLOSE_SPECIMENS,
 				CONTENT_SPECIMENS,
+				DISPLAY_SPECIMENS,
+				FLEX_SPECIMENS,
 				FORM_CHECK_SPECIMENS,
 				FORM_CONTROL_SPECIMENS,
 				FORM_FLOATING_SPECIMENS,
diff --git a/tests/setup.ts b/tests/setup.ts
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -199,6 +199,20 @@
 	| 'Waving placeholder'
 	| 'Gap steps'
 	| 'Responsive gap'
+	| 'Display values'
+	| 'Responsive display'
+	| 'Print display'
+	| 'Vertical alignment'
+	| 'Flex direction'
+	| 'Flex wrap'
+	| 'Justified content'
+	| 'Aligned items'
+	| 'Aligned content'
+	| 'Aligned self'
+	| 'Fill, grow, and shrink'
+	| 'Flex order'
+	| 'Horizontal stack'
+	| 'Vertical stack'
 
 /**
  * Names one state a journey drives its subject to, or reads that subject in.
@@ -228,12 +242,15 @@
  *
  * @remarks
  * This is {@link buildStem}'s rule at the type level, for the names this registry declares: each
- * space becomes one hyphen and the rest is lowercased. Deriving the stems from the subjects rather
- * than writing them out again is what keeps a subject and its stem one declaration.
+ * comma is dropped, each space becomes one hyphen, and the rest is lowercased, so a comma and the
+ * space after it become one hyphen as they do at run time. Deriving the stems from the subjects
+ * rather than writing them out again is what keeps a subject and its stem one declaration.
  */
-export type CaptureStem<S extends string = CaptureSubject> = S extends `${infer Head} ${infer Tail}`
-	? `${Lowercase<Head>}-${CaptureStem<Tail>}`
-	: Lowercase<S>
+export type CaptureStem<S extends string = CaptureSubject> = S extends `${infer Head},${infer Tail}`
+	? CaptureStem<`${Head}${Tail}`>
+	: S extends `${infer Head} ${infer Tail}`
+		? `${Lowercase<Head>}-${CaptureStem<Tail>}`
+		: Lowercase<S>
 
 /**
  * Names one registered scenario: a subject's stem, and the state a journey drives that subject to.
@@ -1077,6 +1094,90 @@
 		selector: '.gap-md-3',
 		property: 'column-gap',
 	}),
+	Object.freeze({
+		scenario: 'display-values',
+		subject: 'Display values',
+		selector: '.d-inline-grid',
+		property: 'display',
+	}),
+	Object.freeze({
+		scenario: 'responsive-display',
+		subject: 'Responsive display',
+		selector: '.d-md-flex',
+		property: 'display',
+	}),
+	Object.freeze({
+		scenario: 'print-display',
+		subject: 'Print display',
+		selector: '.d-print-none',
+		property: 'display',
+	}),
+	Object.freeze({
+		scenario: 'vertical-alignment',
+		subject: 'Vertical alignment',
+		selector: '.align-middle',
+		property: 'vertical-align',
+	}),
+	Object.freeze({
+		scenario: 'flex-direction',
+		subject: 'Flex direction',
+		selector: '.flex-column',
+		property: 'flex-direction',
+	}),
+	Object.freeze({
+		scenario: 'flex-wrap',
+		subject: 'Flex wrap',
+		selector: '.flex-wrap',
+		property: 'flex-wrap',
+	}),
+	Object.freeze({
+		scenario: 'justified-content',
+		subject: 'Justified content',
+		selector: '.justify-content-between',
+		property: 'justify-content',
+	}),
+	Object.freeze({
+		scenario: 'aligned-items',
+		subject: 'Aligned items',
+		selector: '.align-items-center',
+		property: 'align-items',
+	}),
+	Object.freeze({
+		scenario: 'aligned-content',
+		subject: 'Aligned content',
+		selector: '.align-content-between',
+		property: 'align-content',
+	}),
+	Object.freeze({
+		scenario: 'aligned-self',
+		subject: 'Aligned self',
+		selector: '.align-self-center',
+		property: 'align-self',
+	}),
+	Object.freeze({
+		scenario: 'fill-grow-and-shrink',
+		subject: 'Fill, grow, and shrink',
+		selector: '.flex-grow-1',
+		property: 'flex-grow',
+	}),
+	Object.freeze({
+		scenario: 'flex-order',
+		subject: 'Flex order',
+		selector: '.order-first',
+		property: 'order',
+	}),
+	Object.freeze({
+		scenario: 'horizontal-stack',
+		subject: 'Horizontal stack',
+		selector: '.hstack',
+		property: 'align-items',
+	}),
+	Object.freeze({
+		scenario: 'vertical-stack',
+		subject: 'Vertical stack',
+		selector: '.vstack',
+		property: 'flex-direction',
+	}),
 ])
 
 /**
diff --git a/tests/setup.test.ts b/tests/setup.test.ts
--- a/tests/setup.test.ts
+++ b/tests/setup.test.ts
@@ -1,4 +1,4 @@
-import type { ButtonReading, CaptureSubject } from './setup.js'
+import type { ButtonReading, CaptureStem, CaptureSubject } from './setup.js'
 import { describe, expect, it } from 'vitest'
 import * as setup from './setup.js'
 import {
@@ -162,6 +162,10 @@
 		expect(buildStem('Base')).toBe('base')
 		expect(buildStem('Responsive-sm')).toBe('responsive-sm')
 		expect(buildStem('  Caption at top  ')).toBe('caption-at-top')
+		// The type spells the stem a subject carrying commas reduces to, so a registry row for it
+		// typechecks only where the two readings agree.
+		const listed: CaptureStem<'Fill, grow, and shrink'> = 'fill-grow-and-shrink'
+		expect(buildStem('Fill, grow, and shrink')).toBe(listed)
 	})
 	it('reads a variant name as a theme followed by the viewport width it renders at', () => {
 		// The journey is handed its variant as a plain string by its own project, and every
diff --git a/tests/conformance.test.ts b/tests/conformance.test.ts
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -96,6 +96,10 @@
 		const rows = readCompatibility()
 		const shipped = collectShippedComponents(rows)
 		const listed: readonly string[] = [
+			'align',
+			'align-content',
+			'align-items',
+			'align-self',
 			'badge',
 			'blockquote',
 			'breadcrumb',
@@ -107,8 +111,10 @@
 			'col',
 			'column-gap',
 			'container',
+			'd',
 			'display',
 			'figure',
+			'flex',
 			'form',
 			'form-check',
 			'form-control',
@@ -125,6 +131,7 @@
 			'h4',
 			'h5',
 			'h6',
+			'hstack',
 			'icon-link',
 			'img',
 			'initialism',
@@ -133,6 +140,7 @@
 			'invalid-tooltip',
 			'is-invalid',
 			'is-valid',
+			'justify-content',
 			'lead',
 			'link',
 			'list-group',
@@ -140,6 +148,7 @@
 			'list-unstyled',
 			'mark',
 			'offset',
+			'order',
 			'pagination',
 			'placeholder',
 			'progress',
@@ -153,6 +162,7 @@
 			'valid-feedback',
 			'valid-tooltip',
 			'vr',
+			'vstack',
 			'was-validated',
 		]
 		expect(
@@ -452,6 +462,16 @@
 			'visually-hidden': 'utilities/visually-hidden',
 		}
 		const entryPaths: Readonly<Record<string, string>> = {
+			align: 'utilities/vertical-align',
+			'flex-direction': 'utilities/flex',
+			'flex-grow': 'utilities/flex',
+			'flex-shrink': 'utilities/flex',
+			'flex-wrap': 'utilities/flex',
+			'justify-content': 'utilities/flex',
+			'align-items': 'utilities/flex',
+			'align-content': 'utilities/flex',
+			'align-self': 'utilities/flex',
+			order: 'utilities/flex',
 			'row-gap': 'utilities/gap',
 			'column-gap': 'utilities/gap',
 		}
@@ -464,7 +484,15 @@
 				/^@use '((?:components|utilities)\/[\w-]+)'/gmu,
 			),
 		].flatMap(([, path]) => (path === undefined ? [] : [path]))
-		expect(loadedPaths).toContain('utilities/gap')
+		expect(loadedPaths).toEqual(
+			expect.arrayContaining([
+				'components/stacks',
+				'utilities/vertical-align',
+				'utilities/display',
+				'utilities/flex',
+				'utilities/gap',
+			]),
+		)
 		const components = helperOrder.filter((path) => path.startsWith('components/'))
 		expect(loadedPaths.filter((path) => components.includes(path))).toEqual(
 			components.filter((path) => loadedPaths.includes(path)),
diff --git a/tests/setupServer.test.ts b/tests/setupServer.test.ts
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1336,6 +1336,10 @@
 		)
 		expect(new Set(rows.map((row) => row.component))).toEqual(
 			new Set([
+				'align',
+				'align-content',
+				'align-items',
+				'align-self',
 				'badge',
 				'blockquote',
 				'breadcrumb',
@@ -1347,9 +1351,11 @@
 				'col',
 				'column-gap',
 				'container',
+				'd',
 				'display',
 				'engine',
 				'figure',
+				'flex',
 				'form',
 				'form-check',
 				'form-control',
@@ -1366,6 +1372,7 @@
 				'h4',
 				'h5',
 				'h6',
+				'hstack',
 				'icon-link',
 				'img',
 				'initialism',
@@ -1374,6 +1381,7 @@
 				'invalid-tooltip',
 				'is-invalid',
 				'is-valid',
+				'justify-content',
 				'lead',
 				'link',
 				'list-group',
@@ -1381,6 +1389,7 @@
 				'list-unstyled',
 				'mark',
 				'offset',
+				'order',
 				'pagination',
 				'placeholder',
 				'progress',
@@ -1394,6 +1403,7 @@
 				'valid-feedback',
 				'valid-tooltip',
 				'vr',
+				'vstack',
 				'was-validated',
 			]),
 		)
diff --git a/tests/fixtures/tailwind/markup.html b/tests/fixtures/tailwind/markup.html
--- a/tests/fixtures/tailwind/markup.html
+++ b/tests/fixtures/tailwind/markup.html
@@ -58,5 +58,40 @@
 		<div>Gap step 5</div>
 		<div>Neighbor</div>
 	</div>
+	<div class="d-flex flex-row">
+		<div class="order-first">Order First</div>
+		<div class="order-0">Order 0</div>
+		<div class="order-1">Order 1</div>
+		<div class="order-2">Order 2</div>
+		<div class="order-3">Order 3</div>
+		<div class="order-4">Order 4</div>
+		<div class="order-5">Order 5</div>
+		<div class="order-last">Order Last</div>
+	</div>
+	<div class="d-flex flex-row-reverse">
+		<div class="flex-grow-0">Fixed item</div>
+		<div class="flex-grow-1">Growing item</div>
+	</div>
+	<div class="d-flex flex-nowrap">
+		<div class="flex-shrink-0">Unshrinking item</div>
+		<div class="flex-shrink-1">Shrinking item</div>
+	</div>
+	<div class="d-flex flex-wrap">
+		<div>Wrapping item</div>
+		<div>Neighbor</div>
+	</div>
+	<div class="d-flex flex-wrap-reverse">
+		<div>Reversed wrapping item</div>
+		<div>Neighbor</div>
+	</div>
+	<p>
+		Aligned text
+		<span class="align-baseline">Aligned Baseline</span>
+		<span class="align-top">Aligned Top</span>
+		<span class="align-middle">Aligned Middle</span>
+		<span class="align-bottom">Aligned Bottom</span>
+		<span class="align-text-top">Aligned Text Top</span>
+		<span class="align-text-bottom">Aligned Text Bottom</span>
+	</p>
 	<button type="button" class="btn px-8">Action</button>
 </div>
diff --git a/guides/veneer.md b/guides/veneer.md
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -227,6 +227,7 @@
 | `src/styles/components/_button-group.scss`  | The button group, its vertical twin, their joining relationships, and the toolbar in the components layer, read by `tests/src/styles/components/button-group.test.ts`.                                                                             |
 | `src/styles/components/_ratio.scss`         | The aspect-ratio box, its pseudo-element, and the named aspects in the components layer.                                                                                                                                                           |
 | `src/styles/components/_vr.scss`            | The vertical rule in the components layer.                                                                                                                                                                                                         |
+| `src/styles/components/_stacks.scss`        | The horizontal and vertical stack helpers in the components layer.                                                                                                                                                                                 |
 | `src/styles/components/_card.scss`          | The card box, its caps and body, the image and overlay placements, the header navigations, and the card group in the components layer.                                                                                                             |
 | `src/styles/components/_list-group.scss`    | The list-group box, its item joins, action states, numbering, flush edges, horizontal ramp, and contextual roles in the components layer.                                                                                                          |
 | `src/styles/components/_form-label.scss`    | The form label, the help text, and the horizontal label at each size in the components layer, read by `tests/src/styles/components/form-label.test.ts`.                                                                                            |
@@ -278,6 +279,9 @@
 | `src/styles/elements/_details.scss`         | The details family and its mandated pairs in the elements layer.                                                                                                                                                                                   |
 | `src/styles/elements/_progress.scss`        | The progress family and its mandated pairs in the elements layer.                                                                                                                                                                                  |
 | `src/styles/utilities/_gap.scss`            | The gutter and gap step utilities in the utilities layer.                                                                                                                                                                                          |
+| `src/styles/utilities/_vertical-align.scss` | The vertical-alignment utilities in the utilities layer.                                                                                                                                                                                           |
+| `src/styles/utilities/_display.scss`        | The display utilities and their print pass in the utilities layer.                                                                                                                                                                                 |
+| `src/styles/utilities/_flex.scss`           | The flex, alignment, and order utilities in the utilities layer.                                                                                                                                                                                   |
 | `src/styles/index.scss`                     | The compilation barrel.                                                                                                                                                                                                                            |
 | `src/styles/index.ts`                       | The side-effect entry, and the build's library entry.                                                                                                                                                                                              |
 | `configs/src/vite.styles.config.ts`         | The build and test wrapper, composed from the root's `srcBrowser` factory.                                                                                                                                                                         |
@@ -446,9 +450,14 @@
 `!important`. The proof asserts that the `gap-3` name is in the branch and reads what the rule
 claims: with the exclusion line dropped and Tailwind's own rule on the page, every element carrying
 a name in the branch resolves, for every property that rule declares, what it resolves under the
-cascade alone. A planted rule drives the partial-importance case: it declares `!important` on the
-`grid-column-start` longhand alone, leaving the `grid-column-end` longhand that Tailwind's `col-1`
-rule also declares normal, and the equality still holds with the `col-1` class on the line.
+cascade alone. The vertical-alignment classes, the `.flex-row`, `.flex-row-reverse`, `.flex-wrap`,
+`.flex-nowrap`, and `.flex-wrap-reverse` classes, the grow and shrink steps, and the order classes
+are shipped names off the line on the same reading: Tailwind's rule for each declares one longhand,
+and Veneer declares that longhand with `!important`, so `.order-first` resolves Veneer's `-1`
+rather than Tailwind's `-9999`. A planted rule drives the partial-importance case: it declares
+`!important` on the `grid-column-start` longhand alone, leaving the `grid-column-end` longhand that
+Tailwind's `col-1` rule also declares normal, and the equality still holds with the `col-1` class on
+the line.
 
 The workspace executes the profiles from `tests/setup.css` for the `tailwind` profile and
 `tests/fixtures/tailwind/preflight.css` for the `preflight` profile. Those profiles scan a
@@ -1768,6 +1777,64 @@
   beside `column-gap`; Veneer emits the standard property alone, because the managed Chromium and
   Edge receipts this cascade is proved on resolve it and leave the alias redundant.
 
+### Display utilities
+
+The display key ships whole in the utilities layer from the `src/styles/utilities/_display.scss`
+partial, and the vertical-alignment key from the `src/styles/utilities/_vertical-align.scss`
+partial. The `.d-*` classes set the `display` property to each value the release lists, from
+`inline` to `none`, at every breakpoint infix, so `.d-md-flex` lays its element out as a flex
+container from the md boundary up. The `.align-*` classes set the `vertical-align` property to each
+position the release lists, at the empty infix alone, because the release's entry is not
+responsive.
+
+The display partial writes its key through the `utility` mixin that § Styles describes and walks
+the breakpoints once, then writes the release's print pass: one `@media print` block after the walk
+that writes every value again under the `-print` infix. Under the print medium, `.d-print-none`
+hides its element and `.d-none.d-print-block` shows one. The block follows the whole walk, so a
+print class beats every responsive class of the key, the widest included. No other partial writes a
+print condition.
+
+Every declaration carries the `!important` the release writes, and none reads a token, so neither
+the density factor nor the color mode moves a value. § Styles shows the escape from an important
+utility inside the utilities layer.
+
+The `tests/src/styles/utilities/display.test.ts` proof reads every value at every infix at its
+boundary and one pixel below it, the print pass under the staged print medium and the screen values
+after it, the order between infixes, a dark island and the density factor, the priority over a later
+unlayered rule, and the escape inside the utilities layer. The
+`tests/src/styles/utilities/vertical-align.test.ts` proof reads each value, each position on one line
+against a tall box and a text run, the absence of an infixed class, and the same priority and
+escape.
+
+### Flex utilities
+
+The flex keys ship whole in the utilities layer from the `src/styles/utilities/_flex.scss` partial:
+`.flex-fill` and the direction, grow, shrink, and wrap classes under the `flex` key, and the
+`.justify-content-*`, `.align-items-*`, `.align-content-*`, `.align-self-*`, and `.order-*` classes
+under their own keys, each at every breakpoint infix. The stack helpers `.hstack` and `.vstack` ship
+beside them from the `src/styles/components/_stacks.scss` partial.
+
+The partial walks the breakpoints once and writes every entry inside each infix in the release's map
+order, from the `flex` entry to the `order` entry. So at one infix a later entry beats an earlier one
+on a property both set: `.flex-fill.flex-grow-0` resolves a `flex-grow` of `0`. A wider infix beats
+every narrower one whichever entry each class belongs to: at a 768px viewport,
+`.flex-grow-0.flex-md-fill` resolves a `flex-grow` of `1`. Every declaration carries the
+`!important` the release writes, and none reads a token.
+
+The `.hstack` class lays its children out as a row centered on the cross axis, and the `.vstack`
+class lays them out as a column that fills and stretches inside a flex parent. Neither declares a
+gap; compose one with a gap utility, as `.hstack.gap-3` does. The helpers sit in the `components`
+layer at the release's `_helpers.scss` position, and their declarations are normal, as the release
+writes them. So an important flex or display utility on the same element overrides each one, and so
+does an unlayered rule of your own.
+
+The `tests/src/styles/utilities/flex.test.ts` proof reads every value at every infix at its boundary
+and one pixel below it, a constrained layout per property moving at each boundary, the order between
+entries and between infixes, a dark island and the density factor, the priority over a later
+unlayered rule, and the escape inside the utilities layer. The
+`tests/src/styles/components/stacks.test.ts` proof reads each stack's layout, its composition with
+the gap utility, the flex and display utilities overriding it, and its layer.
+
 ### Deferred selectors
 
 Each row names an official selector or custom property withheld from the built cascade, its reason,
@@ -4007,6 +4074,16 @@
 | row-gap          | selector       | Every official .row-gap step and breakpoint selector ships; resolved margins, padding, and row gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                                                                                                                                                                                                                                                        | —                     | shipped  |
 | gap              | selector       | Every official `.gap-*` step and breakpoint selector ships; resolved row and column gaps are proved in the `tests/src/styles/utilities/gap.test.ts` proof.                                                                                                                                                                                                                                                                                                       | —                     | shipped  |
 | column-gap       | selector       | Every official `.column-gap-*` step and breakpoint selector ships; resolved column gaps are proved in the `tests/src/styles/utilities/gap.test.ts` proof.                                                                                                                                                                                                                                                                                                        | —                     | shipped  |
+| align            | selector       | Every official `.align-*` vertical-alignment selector ships at the empty infix alone, as the release writes it; resolved values and each position on a line are proved in the `tests/src/styles/utilities/vertical-align.test.ts` proof.                                                                                                                                                                                                                         | —                     | shipped  |
+| d                | selector       | Every official `.d-*` value and breakpoint selector ships, the `.d-print-*` print pass included; resolved values at each boundary and under the print medium are proved in the `tests/src/styles/utilities/display.test.ts` proof.                                                                                                                                                                                                                               | —                     | shipped  |
+| flex             | selector       | Every official `.flex-*` fill, direction, grow, shrink, and wrap selector ships at every breakpoint infix; resolved values and constrained layouts are proved in the `tests/src/styles/utilities/flex.test.ts` proof.                                                                                                                                                                                                                                            | —                     | shipped  |
+| justify-content  | selector       | Every official `.justify-content-*` value and breakpoint selector ships; resolved values and constrained layouts are proved in the `tests/src/styles/utilities/flex.test.ts` proof.                                                                                                                                                                                                                                                                              | —                     | shipped  |
+| align-items      | selector       | Every official `.align-items-*` value and breakpoint selector ships; resolved values and constrained layouts are proved in the `tests/src/styles/utilities/flex.test.ts` proof.                                                                                                                                                                                                                                                                                  | —                     | shipped  |
+| align-content    | selector       | Every official `.align-content-*` value and breakpoint selector ships; resolved values and constrained layouts are proved in the `tests/src/styles/utilities/flex.test.ts` proof.                                                                                                                                                                                                                                                                                | —                     | shipped  |
+| align-self       | selector       | Every official `.align-self-*` value and breakpoint selector ships; resolved values and constrained layouts are proved in the `tests/src/styles/utilities/flex.test.ts` proof.                                                                                                                                                                                                                                                                                   | —                     | shipped  |
+| order            | selector       | Every official `.order-*` value and breakpoint selector ships; resolved values and the rendered sequence are proved in the `tests/src/styles/utilities/flex.test.ts` proof.                                                                                                                                                                                                                                                                                      | —                     | shipped  |
+| hstack           | selector       | The `.hstack` helper ships with normal declarations in the components layer; its centered row and its composition with the gap and flex utilities are proved in the `tests/src/styles/components/stacks.test.ts` proof.                                                                                                                                                                                                                                          | —                     | shipped  |
+| vstack           | selector       | The `.vstack` helper ships with normal declarations in the components layer; its stretched column and its composition with the gap and flex utilities are proved in the `tests/src/styles/components/stacks.test.ts` proof.                                                                                                                                                                                                                                      | —                     | shipped  |
 | row              | selector       | Every `.row-gap-*` selector ships; resolved row gaps are proved in `tests/src/styles/utilities/gap.test.ts`.                                                                                                                                                                                                                                                                                                                                                     | —                     | shipped  |
 | row              | selector       | The `.row` family ships with physical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                                                                                                                                                                                                                                                              | —                     | shipped  |
 | row              | selector       | The `.row > *` family ships with physical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                                                                                                                                                                                                                                                          | —                     | shipped  |
@@ -4183,7 +4260,8 @@
 tables, form controls, and interactive tags. Each helper key sits in the region whose subject it
 belongs to rather than in a region of its own, which is how every other section is grouped: the icon
 links sit in Links, the aspect-ratio boxes share Media with the image classes and the figure
-classes, the vertical rule and the gap steps sit in Layout beside the gutters, and the list and quotation classes sit in Type. The
+classes, the vertical rule and the gap steps sit in Layout beside the gutters, the stacks sit in
+Flex beside the flex utilities, and the list and quotation classes sit in Type. The
 showcase's own button drives the controller and announces the selected mode, and its entry
 constructs a `Delegate` instance beside the showcase. The shell's own stylesheet reaches that button
 through the `control` class the showcase sets on it, so no rule of the shell's reaches a specimen
@@ -4232,6 +4310,8 @@
 [card specimens](../tests/app/browser/sections/CardSection.test.ts),
 [close specimens](../tests/app/browser/sections/CloseSection.test.ts),
 [content specimens](../tests/app/browser/sections/ContentSection.test.ts),
+[display specimens](../tests/app/browser/sections/DisplaySection.test.ts),
+[flex specimens](../tests/app/browser/sections/FlexSection.test.ts),
 [form check specimens](../tests/app/browser/sections/FormCheckSection.test.ts),
 [form control specimens](../tests/app/browser/sections/FormControlSection.test.ts),
 [form floating specimens](../tests/app/browser/sections/FormFloatingSection.test.ts),
@@ -4350,7 +4430,11 @@
 [the spinner classes](../tests/src/styles/components/spinner.test.ts),
 [the list group classes](../tests/src/styles/components/list-group.test.ts),
 [the validation classes](../tests/src/styles/components/validation.test.ts),
-[the gutter and gap utilities](../tests/src/styles/utilities/gap.test.ts), and
+[the gutter and gap utilities](../tests/src/styles/utilities/gap.test.ts),
+[the display utilities](../tests/src/styles/utilities/display.test.ts),
+[the vertical alignment utilities](../tests/src/styles/utilities/vertical-align.test.ts),
+[the flex utilities](../tests/src/styles/utilities/flex.test.ts),
+[the stack helpers](../tests/src/styles/components/stacks.test.ts), and
 [the customization recipe](../tests/src/styles/integration.test.ts).
 Those proofs resolve declarations against the cascade's layer order; § Styles states that order and
 names the partial that declares it.
```
