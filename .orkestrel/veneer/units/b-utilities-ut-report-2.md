# UTIL-TEXT (`ut`) round 2 report

`opus` on Opus 5.5, the native subagent that wrote round 1, in the worktree `/home/user/veneer-ut`
(branch `unit/ut` from `2a3f223`). Nothing is committed. Every fix T-a to T-f is at its site.
Every acceptance criterion reads green: the worktree gates, the rebuilt validation copy's gates, the
retained red runs for T-a and T-d, and `git apply --check` of the revised patch on a fresh
`2a3f223` extract.

## Fixes

### T-d: the pairs load ahead of the colored-link helper (pair-link-order, F1)

- **`src/styles/utilities/_color-bg.scss` (new, owned).** The `.text-bg-*` rules move here from the
  head of the `_color.scss` partial, unchanged, in `@layer utilities`. Its comment states that the
  release's `_helpers.scss` partial loads the pairs ahead of the colored-link helper and every
  utility, so a colored link, a text color, or a background utility on the same element still wins.
- **`src/styles/utilities/_color.scss` (owned).** Before: the pair loop and its comment headed the
  partial. After: the partial opens at the text color maps; the `sass:list` import stays, because
  the color map reads the `list.join` function.
- **`src/styles/index.scss` (shared).** Before: `@use 'utilities/link';` headed the utilities block.
  After: `@use 'utilities/color-bg';` then `@use 'utilities/link';`.
- **`tests/conformance.test.ts` (shared).** Before: `'color-bg': 'utilities/color'` in the
  `helperPaths` record. After: `'color-bg': 'utilities/color-bg'`. The `utilities/color-bg` path
  joins the loaded-path membership. The comment reads: "The `color-bg` helper and the
  `colored-links` helper each take a partial of their own ahead of every utility partial, in the
  release's helper order. The link entries follow the text colors in the `color` partial, where the
  map writes them."
- **`tests/src/styles/utilities/color-bg.test.ts` (new, the mirrored proof of the new partial).**
  - It adds the case `yields its foreground to a colored link on the same element, as the release
    does`. The case mounts `<a class="text-bg-light link-danger">` beside a lone `.link-danger`
    anchor. It reads the paired color equal to the link's color and matching the
    `--vn-color-danger-rgb` channels, and the pair's fill kept.
  - The pair cases move here unchanged from the `color.test.ts` file: the recorded-pair case in each
    mode, and the text-color and later-background case. The `color.test.ts` file keeps its color,
    emphasis, opacity, retune, priority, and escape cases.
- **`guides/veneer.md` (shared).**
  - § Files: `_color-bg.scss` gets a row, "The color-and-background pairs in the utilities layer,
    ahead of the colored-link helper." The `_color.scss` row drops "The color-and-background pairs,".
  - § Color utilities: it names the `_color-bg.scss` partial, which writes the pairs, and the
    `_link.scss` partial, which writes the colored-link helper, "each ahead of every utility partial,
    in the release's helper order".
  - The pairs paragraph reads: "loads them ahead of the colored-link helper and every utility, so
    their partial heads the utilities layer". It gains the input "an element carrying the
    `.text-bg-light` and `.link-danger` classes paints the danger link color on the light fill".
  - The link paragraph opens "The colored-link helper follows the pairs at the head of the utilities
    layer".
  - The proofs paragraph names the `color-bg.test.ts` proof.
  - § Tests links it as "the color-and-background pairs".
- **Readings.**
  - Green on the copy: the owned style proofs, conformance (the order case among them), and
    `npm run build:src` (see "Gates").
  - Red run "T-d: pairs loaded after the colored-link helper" (barrel order swapped):
    - the layer reading is `utilities`;
    - `color-bg.test.ts` exit 1, `Tests 1 failed | 3 passed (4)`, failing `yields its foreground
      to a colored link on the same element, as the release does`;
    - conformance exit 1, `Tests 1 failed | 21 passed (22)`, failing `loads the passive block and
      the helpers in the release order, after every forms partial, each important helper ahead of
      the utilities`.
  - `node .orkestrel/veneer/units/ut-instruments/ut-cascade-count.mjs` on the copy reads 130 recorded sites and 130 cascade
    sites, none missing either way, and no priority fault.

### T-a: the components-layer control, redone (claim 5)

- **Control.** In `_color-bg.scss`, `@layer utilities {` becomes `@layer components {`. The pairs sit
  in their own partial, so this is the top-level components layer. The mutation run records its
  layer before testing: `the .text-bg-primary rule sits in the layer: components`. That reading
  comes from walking the expanded Sass compile with the `postcss` parser. Round 1's control, by
  contrast, compiled to a `utilities.components` layer.
- **Result.** The command ran `color-bg.test.ts` and `color.test.ts`: exit 1,
  `Tests 3 failed | 8 passed (11)`. Failing:
  - `lets a text color and a later background utility on the same element win over a pair, as the
    release does`;
  - `yields its foreground to a colored link on the same element, as the release does`;
  - `yields to an important override inside the utilities layer and to no unlayered one` (in the
    `color.test.ts` file).
- **Restore.** After the run, the layer reading is `utilities` and `npm run build:src:styles` exits
  0.

### T-b: guide sentences (claim 8), all in `guides/veneer.md`

- **§ Text utilities opening.**
  - Before: "The text keys ship whole in the utilities layer from the
    `src/styles/utilities/_text.scss` partial: …".
  - After: "The text formatting entries of the `text` key ship in the utilities layer from the
    `src/styles/utilities/_text.scss` partial: … The key's colors, opacity steps, and
    color-and-background pairs ship under § Color utilities, and its `.text-truncate` helper ships
    beside the formatting entries from the `src/styles/components/_text-truncation.scss` partial."
- **The `text` selector row.** It reads "Every official `.text-*` selector ships in the utilities
  layer, except the `.text-truncate` helper, which the `text-truncate` row records; resolved values
  are proved in the `tests/src/styles/utilities/text.test.ts`,
  `tests/src/styles/utilities/color.test.ts`, and `tests/src/styles/utilities/color-bg.test.ts`
  proofs."
  - The row's enumeration of the key's classes is dropped. It kept the cell inside the table's
    existing column width, so the formatter leaves the compatibility table's other rows alone.
    This is a re-flow decision inside the row the fix touches.
- **Text-opacity statement.**
  - The `text` variable row: "set to the `1` value by every class of the release's `color` entry".
  - § Color utilities: "each class of the release's `color` entry sets that variable to the `1` value
    as a normal declaration; the `.text-*-emphasis` classes set the color alone."
- **Prefixed-decoration bullet.**
  - Before: "**The prefixed decoration color is absent.** … Veneer emits the standard property
    alone …".
  - After, as a sentence after the departures list: "The prefixed `-webkit-text-decoration-color`
    alias is not a departure: the build emits it from the standard property without the source
    declaring it." This is § Icon links' sentence.
- **Link rows.** "the anchor behavior is proved in the `tests/src/styles/elements/a.test.ts` proof
  and the scale in the `tests/src/styles/utilities/link.test.ts` proof", and "proved in the
  `tests/src/styles/utilities/link.test.ts` proof".
- **Tailwind paragraph.** "which Veneer declares with the `!important` flag".
- **Re-flow.** The paragraphs these edits touch are re-flowed at 100 columns, never inside a code
  span: the Tailwind paragraph, the § Text utilities opening, the truncation paragraph, the proofs
  paragraph, the pairs paragraph, and the Badge paragraph. The scripts are `ut-2-guide-reflow.py`
  and `ut-2-guide-reflow2.py`.
- **Readings.** `npm run test:guides` and `npm run test:policy` are green on the copy.
  `oxfmt --check` of the guide exits 0.

### T-c: product sentences (claim 9)

- **`app/browser/constants.ts`, `TEXT_SPECIMENS` remark (shared).**
  - Before: "A line whose behaviour depends … sit in the narrowest column the grid ships, which is
    narrower than each of them at both journey widths and leaves the unwrapped line inside the page
    at the narrowest one".
  - After: "A line whose behavior depends … sit in a two-twelfths column, which is narrower than
    each of them at the 390 and 1280 journey widths and leaves the unwrapped line inside the page at
    the 390 width".
- **`tests/src/styles/components/text-truncation.test.ts` comment (owned).**
  - Before: "A rule inside the utilities layer outranks the components layer whatever its priority."
  - After: "A normal rule inside the utilities layer outranks a normal rule in the components layer."
- **Readings.** `npm run check`, `npm run lint:check`, and the owned proofs are green on the copy.

### T-e: the `text-dark` specimen's surface (F2)

- **`app/browser/constants.ts`, `COLOR_SPECIMENS` `Text roles` markup (shared).** The role map
  callback returns `<p class="text-bg-light"><span class="text-dark">text-dark</span></p>` for the
  dark role, and the dark pair's markup for the light role as before. The callback uses `if` returns
  in place of the round-1 ternary.
- **The remark.** It reads "the light role and the white colors on the dark pair, and the dark role
  and the black colors on the light pair."
- **`tests/app/browser/sections/ColorSection.test.ts` (owned).** It adds the reading
  `[data-specimen="Text roles"] .text-bg-light > .text-dark` beside the dark-pair reading.
- **Readings.**
  - Green: the section proofs, `Tests 12 passed (12)`.
  - Red run "T-e: text-dark specimen off the light pair" (bare `<p class="text-dark">`): exit 1,
    `Tests 1 failed | 2 passed (3)`, failing `renders every declared specimen through the shared
    section contract`.

### T-f: `COLOR_COPY` (F3)

- **`app/browser/constants.ts` (shared).**
  - Before: "…and the pairs that set a readable foreground on each role's fill."
  - After: "…and the pairs that set the foreground the release records on each role's fill."
- **Reading.** `renders every declared specimen…` compares the paragraph to `COLOR_COPY`, and the
  section proofs are green.

### Moved pair cases, re-run

The round-1 pair mutations were re-run against the moved cases in the `color-bg.test.ts` file:

- **Foreground swapped, info reads white:** exit 1, `Tests 2 failed | 2 passed (4)`. The pair case
  fails in each mode.
- **Background swapped:** exit 1, `Tests 3 failed | 1 passed (4)`.
- **Opacity fallback dropped:** exit 1, `Tests 4 failed (4)`.

## Gates

Worktree:

- `npm run format:check` → exit 0, "All matched files use the correct format."
  (`.orkestrel/veneer/units/ut-instruments/ut-2-wt-format-check.log.txt`)
- `npm run lint:check` → exit 0, no diagnostic printed (`.orkestrel/veneer/units/ut-instruments/ut-2-wt-lint-check.log.txt`)
- `git diff --check` → clean

The validation copy was rebuilt under `tmp/probe/base`:

- **Build:** `git archive 2a3f223`, `cp -al node_modules`, the owned files copied over it, round 1's
  `ut-shared.patch`, then this round's `ut-2-shared-edit.py`, `ut-2-guide-edit.py`,
  `ut-2-guide-reflow.py`, `ut-2-guide-reflow2.py`, and `ut-2-guide-row.py`.
- **Formatting:** the formatter ran on the touched shared files.
- **Isolation:** the copy got its own `git init`, so the formatter and linter do not read the
  worktree's ignore file.
- **Gates:** run by `.orkestrel/veneer/units/ut-instruments/ut-2-copy-gates.sh`; each command's line is in
  `.orkestrel/veneer/units/ut-instruments/ut-2-copy-summary.log.txt`.
- **Deleted** before this report.

Results on the copy:

- `npm run format:check` → exit 0, "All matched files use the correct format."
- `npm run lint:check` → exit 0
- `npm run check` → exit 0
- `npm run build:src` → exit 0, "✓ built in 1.96s"
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/text.test.ts tests/src/styles/utilities/color.test.ts tests/src/styles/utilities/color-bg.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/components/text-truncation.test.ts`
  → exit 0, `Tests 95 passed (95)`
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TextSection.test.ts tests/app/browser/sections/ColorSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts`
  → exit 0, `Tests 12 passed (12)`
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`
  → exit 0, `Tests 122 passed (122)`
- `npm run test:conformance` → exit 0, `Tests 22 passed (22)`
- `npm run test:guides` → exit 0, `Tests 19 passed (19)`
- `npm run test:policy` → exit 0, `Tests 109 passed | 1 skipped (110)` (a vendored skip)

Patch check on a fresh `git archive 2a3f223` extract with its own `git init`:
- `git apply --check ../../units/ut-shared-2.patch` → exit 0 (`.orkestrel/veneer/units/ut-instruments/ut-2-apply-check.log.txt`).
- The same extract, with the owned files copied over it and the patch applied, equals the
  validation copy file for file. The only exception is the profiles proof, which carried UTIL-PAINT's
  patch on the copy.

Observation (not a criterion). UTIL-PAINT's `up-unscoped-profiles-2.patch` applied to the copy,
then `npm run build:src:styles` followed by `npm run test:service`:
- Exit 1, `Tests 1 failed | 17 passed (18)`, failing `declares the one order line in every profile,
  and leaves the document order unmoved`. Log: `.orkestrel/veneer/units/ut-instruments/ut-2-service-up2.log.txt`.
- Reading: the profile statement is the order line, where `['properties']` is expected.
- The patch expects the `properties` layer that UTIL-PAINT's `border` names produce, and this copy
  ships none of them. No UTIL-TEXT name registers a custom property.
- The preflight case that `text-black` and `text-white` reddened at base is green with this patch.

## Scope record

- **Owned files changed this round:**
  - `src/styles/utilities/_color-bg.scss` (new);
  - `src/styles/utilities/_color.scss`;
  - `tests/src/styles/utilities/color-bg.test.ts` (new; the mirrored proof of the new partial,
    which the family record's per-partial proof rule obliges);
  - `tests/src/styles/utilities/color.test.ts` (the pair cases moved out, the unused
    `TEXT_BG_CASES` import dropped);
  - `tests/src/styles/components/text-truncation.test.ts`;
  - `tests/app/browser/sections/ColorSection.test.ts`.
- **Shared files changed from round 1:** `src/styles/index.scss`, `tests/conformance.test.ts`,
  `app/browser/constants.ts`, and `guides/veneer.md`. The interdiff is
  `.orkestrel/veneer/units/ut-instruments/ut-2-shared-interdiff.txt`.
- **Not patched:** `tests/service/tailwind/profiles.test.ts`, as in round 1.

## Deviations

- None stopped the unit.
- **Recorded decision: the mirrored proof.** The mirrored proof `color-bg.test.ts` is a new owned
  file, so the round-1 pair cases moved there. The brief names only the partial as newly Owned.
  Round 1's scope grants the mirrored proofs of owned partials.
- **Recorded decision: the `text` row.** The `text` selector row's class enumeration is dropped, as
  described under T-b.
- **Not changed:** the round-1 report's position names and its copy-service citation (claim 9)
  belong to the round-1 record, which this report supersedes.

## Evidence

All files are in `/home/user/veneer-ut/tmp/units/`:
- the revised patch `ut-shared-2.patch`, which supersedes round 1's `ut-shared.patch` whole;
- the interdiff `ut-2-shared-interdiff.txt`;
- `ut-2.diff` (owned files against `2a3f223`, untracked files against the empty file) and
  `ut-2-status.txt`;
- the mutation log `ut-mutations-2.log.txt` and its script `ut-mutate-3.py`;
- the copy logs `ut-2-copy-*.log.txt`, with the gate script `ut-2-copy-gates.sh`;
- `ut-2-cascade-count.log.txt`;
- `ut-2-service-up2.log.txt`;
- the edit scripts `ut-2-shared-edit.py`, `ut-2-guide-edit.py`, `ut-2-guide-reflow.py`,
  `ut-2-guide-reflow2.py`, and `ut-2-guide-row.py`.

`tmp/probe/` is deleted. Nothing was written to the session scratchpad.
