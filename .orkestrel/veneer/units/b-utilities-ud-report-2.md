# UTIL-DISPLAY (`ud`) report, round 2

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-ud` (branch `unit/ud`,
uncommitted over `e4e6a40`). The unit spawned nothing. Brief: `/home/user/scaffold/.orkestrel/veneer/units/ud-brief-2.md`.

## Outcome

- Every finding `ud-audit-verdict.md` § Rulings carries is closed in the owned files and in
  `/home/user/scaffold/.orkestrel/veneer/units/ud-shared-2.patch`, which supersedes `ud-shared.patch` whole.
- Every case of the style proofs and of the Display and Flex section proofs has a logged mutation
  that reddens it, and the unmutated control is logged green in the same copy.
- The section proofs refuse an inline style, the horizontal-stack centering reading fails when the
  stack stretches its items, and every flex specimen item that demonstrates a class is labeled with
  that class's full name.
- The case tables sit in `tests/setupStyles.ts` as frozen, documented constants, bound to the
  pinned inventory by a case in `tests/setupStyles.test.ts`.
- Every gate the brief names exits 0 in the landing copy, and the patch passes `git apply --check`
  against `e4e6a40` with an `index` line per file.
- No stop condition fired.

All paths in this report are relative to `/home/user/veneer-ud`. The instruments are under
`/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-2/`: the scripts in `tools/`, the logs in `logs/`. Every run took place in
the landing copy, `/home/user/veneer-ud/tmp/probe/land`, and each log names it. That copy is deleted.

## Touched files

The owned files, all untracked:

| File | Round-2 change |
| --- | --- |
| `tests/src/styles/utilities/display.test.ts` | Imports `DISPLAY_VALUES` from `tests/setupStyles.ts`; the local resting scalar is renamed `RESTING_DISPLAY`. |
| `tests/src/styles/utilities/flex.test.ts` | Imports `FLEX_ENTRY_CASES` and `FLEX_RESTING_VALUES`; reads each value as `{ key, value }` and each resting value as `{ declared, computed }`. |
| `tests/src/styles/utilities/vertical-align.test.ts` | Imports `ALIGN_VALUES`. |
| `tests/app/browser/sections/DisplaySection.test.ts` | Asserts `region.querySelector('[style]')` is null; reads the display and alignment keys from the shared tables. |
| `tests/app/browser/sections/FlexSection.test.ts` | Asserts `[style]` is null; derives each family's keys from `FLEX_ENTRY_CASES`; asserts each demonstrated class's label; asserts the text items' heights in the centering case. |
| `src/styles/utilities/_display.scss`, `_flex.scss`, `_vertical-align.scss`, `src/styles/components/_stacks.scss`, `app/browser/sections/DisplaySection.ts`, `FlexSection.ts` | Unchanged from round 1. |

Diffstat of the owned files, measured with `git diff --no-index --numstat /dev/null <path>` per
file: 1098 insertions, 0 deletions. `git status --porcelain` lists only the owned files as `??`
(`tmp/units/ud-2-status.txt`); `git diff --stat e4e6a40` over tracked files is empty. The
concatenated owned diff is `tmp/units/ud-2.diff`.

The shared patch `/home/user/scaffold/.orkestrel/veneer/units/ud-shared-2.patch` comes from `git diff` in the landing copy's own
repository, whose base commit holds every tracked file at `e4e6a40` (the base commit's tree equals
the `e4e6a40` tree; `logs/apply-check.log.txt`). `git diff --shortstat` there read `665 insertions(+),
10 deletions(-)`. It covers `src/styles/index.scss`, `app/browser/constants.ts`,
`app/browser/index.ts`, `app/browser/Showcase.ts`, `tests/app/browser/Showcase.test.ts`,
`tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`,
`tests/setup.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`,
`tests/fixtures/tailwind/markup.html`, `guides/veneer.md`, `tests/setupStyles.ts`, and
`tests/setupStyles.test.ts`, which is the brief's Shared row. The round-1 hunks for the files the
rulings do not name are carried unchanged.

## Findings: site, before, and after

### Claim 3: the matrix's mutations and the control log

- **Display mode case** (`display.test.ts`, the case `reads no token or mode, so a dark island and a
  doubled density factor leave every value`).
  - Before: the round-1 matrix named `display-value-omitted` and `display-important-dropped` for it,
    and neither reddened it.
  - After: `display-mode-override` plants `[data-bs-theme='dark'] .d-inline-flex { display: block
    !important; }` inside the partial's `utilities` layer, after the print block. It reddens that
    case and no other (`logs/record/display-mode-override.log.txt`: `Tests 1 failed | 36 passed
    (37)`).
- **Vertical-stack layout case** (`stacks.test.ts`, the case `lays a vertical stack out as a column
  that fills and stretches inside a flex row`).
  - Before: the round-1 matrix named `stack-important` and `stack-utilities-layer`, which redden
    other stack cases.
  - After: `vstack-direction-dropped` removes `flex-direction: column` from `.vstack`. It reddens
    that case and the layer case, which also reads the column
    (`logs/record/vstack-direction-dropped.log.txt`: `Tests 2 failed | 35 passed (37)`).
- **Control log.** Before: none. After: `logs/record/control.log.txt`, in the same copy as every
  mutation: styles `Tests 37 passed (37)`, sections `Tests 6 passed (6)`, both exit 0.

### Claim 4a: the inline-style refusal

- Site: the render case of each section proof, directly after the region lookup.
- Before: no `[style]` assertion; the markup comparison derives its expectation from the same
  constants, so a planted `style` attribute changed both sides.
- After: `expect(region.querySelector('[style]')).toBeNull()` in `DisplaySection.test.ts` and
  `FlexSection.test.ts`.

### Claim 4b: the centering reading

- Site: `FlexSection.test.ts`, the case `renders the order classes in their own sequence and
  centers the horizontal stack at both variants`.
- Before: the case read only each item's center offset, which is 0 under a stretch too.
- After: the reading also collects, for each `:scope > span` item of the stack, whether its box is
  shorter than the stack's box, and asserts `[false, true, true]`: the tall item sets the row's
  height, and each text item beside it keeps a shorter box.

### Claim 4c: the item labels and the doc comment (patched `app/browser/constants.ts`)

- `Aligned content`: `<div class="col-6">${key}</div>` becomes
  `<div class="col-6">align-content-${key}</div>`.
- `Aligned self`: `<div class="align-self-${key}">${key}</div>` becomes
  `<div class="align-self-${key}">align-self-${key}</div>`; the tall sibling keeps `Tall`.
- `Aligned items`: unchanged; its demonstrating item was already labeled `align-items-${key}`, and
  its tall sibling keeps `Tall`.
- `Fill, grow, and shrink`:
  - fill row: `Fill`, `Fill with longer content`, `Fill` (each a `.flex-fill` item) becomes
    `flex-fill`, an unclassed `Item`, `flex-fill`;
  - grow row: `Fixed`, `Grows into the free space`, `Fixed` becomes `flex-grow-0`, `flex-grow-1`,
    `flex-grow-0`;
  - shrink row: `Shrinks`, `Keeps its width` becomes `flex-shrink-1`, `flex-shrink-0`.
- The stacks keep their prose labels.
- `FLEX_SPECIMENS` doc comment. Before: "Each container labels its first item with the class it
  demonstrates." After: "Every item that demonstrates a class is labeled with that class's full
  name: the item carrying the class, or, where the class sits on the container, one item inside it.
  An item that only gives the demonstration something to act on keeps a prose label, such as the
  tall sibling in the aligned specimens and the items of each stack."
- `FLEX_COPY.paragraph`. Before: "…and the stacks lay out a centered row or a stretched column.
  Resize the viewport to compare how each container fits its items." After: "…and the stacks lay
  out a centered row or a stretched column."
- The render case of `FlexSection.test.ts` asserts the convention: every element carrying a
  demonstrated class, or one of its children, has that class's full name as its text.

### Claim 7: the guide (patched `guides/veneer.md`)

- **§ Tailwind.** Before: round 1's sentence listing `.flex-row` and the other names, placed after
  the `gap-3` reading, with the paragraph rewrapped. After: that sentence is gone, the paragraph's
  base text is restored, and the ruled sentence sits directly after the gap-steps sentence: "Every
  other shipped name off the line reads the same way; Tailwind's `order-first` rule declares the
  `order` longhand alone, and Veneer declares it with `!important`, so the `order-first` class
  resolves Veneer's `-1` rather than Tailwind's `-9999`."
- **Nouns, swept over `### Display utilities` and `### Flex utilities`:**
  - "so `.d-md-flex` lays" becomes "so the `.d-md-flex` class lays";
  - "`.d-print-none` hides its element and `.d-none.d-print-block` shows one" becomes "the
    `.d-print-none` class hides its element, and the `.d-print-block` class shows an element that
    the `.d-none` class hides on screen";
  - "`.flex-fill` and the direction, grow, shrink, and wrap classes" becomes "the `.flex-fill` class
    and the direction, grow, shrink, and wrap classes";
  - "The stack helpers `.hstack` and `.vstack` ship" becomes "The `.hstack` and `.vstack` stack
    helpers ship";
  - "`.flex-fill.flex-grow-0` resolves a `flex-grow` of `0`" becomes "an element carrying the
    `.flex-fill` and `.flex-grow-0` classes resolves a `flex-grow` value of `0`";
  - "`.flex-grow-0.flex-md-fill` resolves a `flex-grow` of `1`" becomes "an element carrying the
    `.flex-grow-0` and `.flex-md-fill` classes resolves a `flex-grow` value of `1`";
  - "as `.hstack.gap-3` does" becomes "as the `.hstack` and `.gap-3` classes do together".
- **Print block.** Before: "one `@media print` block after the walk that writes every value
  again under the `-print` infix." After: "one `@media print` block, after the walk, that writes
  every value again under the `-print` infix."
- **Spelling.** Before: "[the vertical alignment utilities]" in § Tests. After: "[the
  vertical-alignment utilities]". `grep -n "vertical alignment" guides/veneer.md` on the patched
  guide returned nothing.
- Every ruled site was located on `e4e6a40` plus the round-1 patch.

### Claim 8: the case tables' home

- Before: `DISPLAY_VALUES` and a `RESTING` scalar in `display.test.ts`, `FLEX_ENTRIES` and a
  `RESTING` record in `flex.test.ts`, `ALIGN_VALUES` in `vertical-align.test.ts`, and the same
  lists restated inline in the Display and Flex section proofs.
- After, in `tests/setupStyles.ts` directly after `GAP_STEP_CASES`:
  - `DISPLAY_VALUES`: the `display` utility's values in the release's order;
  - `ALIGN_VALUES`: the vertical-alignment positions in the release's order;
  - `FLEX_ENTRY_CASES`: each flex entry as `{ prefix, property, values }`, each value as
    `{ key, value }`, in map order;
  - `FLEX_RESTING_VALUES`: `{ flex: { declared: 'none', computed: '0 0 auto' } }`, typed by the
    `FlexRestingValue` interface declared beside it.
  - Every level is frozen, and every constant carries TSDoc.
- `tests/setupStyles.test.ts` imports the constants, extends the export enumeration, and adds the
  case `binds the display values, the vertical-alignment positions, and the flex entries to the
  inventory` directly after `binds the gap steps, values, and infixes to the inventory and ramp`. It
  compares each table with the rules `readOracleInventory()` records outside every condition. It
  holds the resting table's keys equal to the one-value entries and its declared value off every
  written value. It asserts every level frozen.
- The style proofs and the section proofs import the constants and restate no value list.
- The moved tables change no reading: the pre-fix control and the final control pass the same case
  titles (`logs/pre-fix/control.log.txt` and `logs/record/control.log.txt`, compared after stripping
  durations and line positions).
- The binding case can fail. Each control in `logs/setup/` edits one table, runs
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup
  tests/setupStyles.test.ts`, and restores the file (digests equal):

| Control | Result |
| --- | --- |
| `control` (unmutated) | exit=0, `Tests 110 passed (110)` |
| `display-values-reordered` | exit=1, `Tests 1 failed \| 109 passed (110)`, red on the binding case |
| `align-value-dropped` | exit=1, `Tests 1 failed \| 109 passed (110)`, red on the binding case |
| `flex-entry-value-changed` | exit=1, `Tests 1 failed \| 109 passed (110)`, red on the binding case |
| `flex-resting-written` | exit=1, `Tests 1 failed \| 109 passed (110)`, red on the binding case |
| `flex-table-unfrozen` | exit=1, `Tests 1 failed \| 109 passed (110)`, red on the binding case |

## Failing-first evidence

The command is `python3 tmp/units/ud-instruments-2/tools/mutate.py STAGE NAME`. It runs
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser
tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts`
with the named mutation applied. The findings were proofs that could not fail, so the defect reads
green under the mutation before the fix and red after it.

| Mutation | Before the fix (`logs/pre-fix/`) | After the fix (`logs/record/`) |
| --- | --- | --- |
| `inline-style-added` | exit=0, `Tests 6 passed (6)` | exit=1, `Tests 2 failed \| 4 passed (6)` |
| `hstack-center-dropped` | exit=0, `Tests 6 passed (6)` | exit=1, `Tests 1 failed \| 5 passed (6)` |

Failing-first test names:
- `DisplaySection > renders every declared specimen through the shared section contract` (the
  `[style]` assertion: `expect(region.querySelector('[style]')).toBeNull()` at the region lookup).
- `FlexSection > renders every declared specimen through the shared section contract` (the same
  assertion; the label assertion reddens under `label-bare`: `expected [ 'auto' ] to include
  'align-self-auto'`).
- `FlexSection > renders the order classes in their own sequence and centers the horizontal stack
  at both variants` (`expected [ false, false, false ] to deeply equal [ false, true, true ]`).

## Proof matrix

Every case the unmutated control ran, with every logged mutation that reddens it
(`tools/matrix.py` over `logs/record/`, output `logs/matrix.md.txt`). No case is left without a
reddening mutation. `display-important-dropped`, `flex-important-dropped`, and
`align-important-dropped` are the same edit, dropping the `utility` mixin's `!important`, logged under
each round-1 name.

| Proof case | Mutations that redden it |
| --- | --- |
| display: resolves every value around the `xs`, `sm`, `md`, `xl`, and `xxl` boundaries | `display-value-omitted`, `display-important-dropped` |
| display: resolves every value around the `lg` boundary | `display-value-omitted`, `display-breakpoint-omitted`, `display-important-dropped` |
| display: switches to the print values under the print medium, and back | `print-omitted`, `print-screen`, `print-before-walk`, `display-value-omitted`, `display-important-dropped` |
| display: resolves a wider infix over a narrower one whatever order the classes are written in | `display-walk-reversed` |
| display: reads no token or mode (dark island, density factor) | `display-mode-override` |
| display: keeps its priority over a later unlayered consumer rule | `display-important-dropped` |
| display: yields to an important override inside the utilities layer and to no unlayered one | `display-important-dropped` |
| flex: resolves every flex value around each boundary | `flex-initial-value`, `flex-justify-initial`, `flex-important-dropped` |
| flex: moves each constrained layout at and above each boundary | `flex-initial-value`, `flex-justify-initial` |
| flex: resolves a later entry over an earlier one at one infix, and a wider infix over a narrower one | `flex-per-entry` |
| flex: reads no token or mode | `flex-initial-value` |
| flex: keeps every flex priority over a later unlayered consumer rule | `flex-shrink-before-flex`, `flex-important-dropped` |
| flex: yields to an important override inside the utilities layer | `flex-initial-value`, `flex-important-dropped` |
| vertical alignment: resolves every value at every viewport, and writes no responsive class | `align-initial-value`, `align-responsive`, `align-important-dropped` |
| vertical alignment: places each box on its own line position | `align-initial-value` |
| vertical alignment: reads no token or mode | `align-initial-value` |
| vertical alignment: keeps its priority over a later unlayered consumer rule | `align-initial-value`, `align-important-dropped` |
| vertical alignment: yields to an important override inside the utilities layer | `align-initial-value`, `align-important-dropped` |
| stacks: lays a horizontal stack out as a centered row that composes the gap utility | `stack-display-dropped`, `hstack-center-dropped` |
| stacks: lays a vertical stack out as a column that fills and stretches inside a flex row | `vstack-direction-dropped` |
| stacks: keeps its declarations normal, so an important flex utility overrides each one | `stack-important`, `flex-initial-value` |
| stacks: sits in the components layer beneath a later unlayered consumer rule | `stack-important`, `stack-utilities-layer`, `vstack-direction-dropped` |
| stacks: reads no token or mode | `stack-display-dropped`, `hstack-center-dropped` |
| DisplaySection: renders every declared specimen through the shared section contract | `inline-style-added` |
| DisplaySection: swaps the responsive sentence and lays the pair out as a row at the md boundary | `display-walk-reversed` |
| DisplaySection: releases its region and preserves neighboring content through repeated destruction | `section-residue-left` |
| FlexSection: renders every declared specimen through the shared section contract | `inline-style-added`, `label-bare` |
| FlexSection: renders the order classes in their own sequence and centers the horizontal stack | `hstack-center-dropped`, `stack-display-dropped` |
| FlexSection: releases its region and preserves neighboring content through repeated destruction | `section-residue-left` |

The per-boundary rows are collapsed where every boundary reddens under the same mutations;
`logs/matrix.md.txt` lists each boundary case on its own row.

## Mutation record

`tools/record.sh` ran `tools/mutate.py record …` in the landing copy. Each run applies its
mutation, refusing one that does not apply, and rebuilds the styles cascade with `npm run
build:src:styles`. It then runs the styles command (`npx vitest run --config
configs/src/vite.styles.config.ts --no-cache --reporter=verbose` over the display, flex,
vertical-alignment, and stack proofs) and the sections command (the one in § Failing-first evidence), and restores every mutated file byte for
byte. Each log names the copy, each mutated file with its SHA-256 digest before the mutation and
after the restore, both commands, their exit codes and tallies, the red case titles, the mutation
diff, and the full runner output. Every log records `equal=True` for each restored file. `label-bare`
ran afterwards as its own invocation, `python3 mutate.py record label-bare`, in the same copy.

| Run | Mutated file | Styles | Sections | Log |
| --- | --- | --- | --- | --- |
| `control` | none | exit=0, `Tests 37 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/control.log.txt` |
| `print-omitted` | `_display.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/print-omitted.log.txt` |
| `print-screen` | `_display.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/print-screen.log.txt` |
| `print-before-walk` | `_display.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/print-before-walk.log.txt` |
| `display-value-omitted` | `_display.scss` | exit=1, `Tests 7 failed \| 30 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/display-value-omitted.log.txt` |
| `display-breakpoint-omitted` | `_display.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/display-breakpoint-omitted.log.txt` |
| `display-walk-reversed` | `_display.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=1, `Tests 1 failed \| 5 passed (6)` | `logs/record/display-walk-reversed.log.txt` |
| `display-important-dropped` | `_mixins.scss` | exit=1, `Tests 20 failed \| 17 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/display-important-dropped.log.txt` |
| `display-mode-override` | `_display.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/display-mode-override.log.txt` |
| `flex-initial-value` | `_flex.scss` | exit=1, `Tests 15 failed \| 22 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/flex-initial-value.log.txt` |
| `flex-justify-initial` | `_flex.scss` | exit=1, `Tests 12 failed \| 25 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/flex-justify-initial.log.txt` |
| `flex-per-entry` | `_flex.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/flex-per-entry.log.txt` |
| `flex-shrink-before-flex` | `_flex.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/flex-shrink-before-flex.log.txt` |
| `flex-important-dropped` | `_mixins.scss` | exit=1, `Tests 20 failed \| 17 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/flex-important-dropped.log.txt` |
| `align-initial-value` | `_vertical-align.scss` | exit=1, `Tests 5 failed \| 32 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/align-initial-value.log.txt` |
| `align-responsive` | `_vertical-align.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/align-responsive.log.txt` |
| `align-important-dropped` | `_mixins.scss` | exit=1, `Tests 20 failed \| 17 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/align-important-dropped.log.txt` |
| `stack-display-dropped` | `_stacks.scss` | exit=1, `Tests 2 failed \| 35 passed (37)` | exit=1, `Tests 1 failed \| 5 passed (6)` | `logs/record/stack-display-dropped.log.txt` |
| `stack-important` | `_stacks.scss` | exit=1, `Tests 2 failed \| 35 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/stack-important.log.txt` |
| `stack-utilities-layer` | `_stacks.scss` | exit=1, `Tests 1 failed \| 36 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/stack-utilities-layer.log.txt` |
| `vstack-direction-dropped` | `_stacks.scss` | exit=1, `Tests 2 failed \| 35 passed (37)` | exit=0, `Tests 6 passed (6)` | `logs/record/vstack-direction-dropped.log.txt` |
| `hstack-center-dropped` | `_stacks.scss` | exit=1, `Tests 2 failed \| 35 passed (37)` | exit=1, `Tests 1 failed \| 5 passed (6)` | `logs/record/hstack-center-dropped.log.txt` |
| `inline-style-added` | `app/browser/constants.ts` (a `style="width: 40px"` on the `.d-block` specimen element and on the `.vstack` specimen element) | exit=0, `Tests 37 passed (37)` | exit=1, `Tests 2 failed \| 4 passed (6)` | `logs/record/inline-style-added.log.txt` |
| `section-residue-left` | `DisplaySection.ts`, `FlexSection.ts` (each constructor appends an `hr` it never releases) | exit=0, `Tests 37 passed (37)` | exit=1, `Tests 2 failed \| 4 passed (6)` | `logs/record/section-residue-left.log.txt` |
| `label-bare` | `app/browser/constants.ts` (the `Aligned self` labels back to bare keys) | exit=0, `Tests 37 passed (37)` | exit=1, `Tests 1 failed \| 5 passed (6)` | `logs/record/label-bare.log.txt` |

## Conformance and the cascade comparison

- **Conformance, the gate:** `npm run test:conformance` exit=0, `Tests 22 passed (22)`
  (`logs/gates/test-conformance.log.txt`).
- **Conformance, verbose:** `npx vitest run --config vite.config.ts --no-cache --reporter=verbose
  --project conformance` exit=0, `Tests 22 passed (22)` (`logs/gates/conformance-verbose.log.txt`).
  Its passing ledger cases are:
  - `cascade ledger > records every measured value difference in the guide ledger` (the
    departures);
  - `names no departure the compiled cascade no longer carries` (the stale departures);
  - `records every emitted name the official inventory lacks` (the additions);
  - `names no addition the compiled cascade no longer emits` (the stale additions);
  - `defers no name the built cascade ships`;
  - `Bootstrap component oracle > carries every shipped component selector and custom property in
    the built cascade`;
  - `Bootstrap source order > loads the passive block and the helpers in the release order, after
    every forms partial, …`.
- **Cascade comparison** (`tools/cascade.test.ts`, run by `tools/cascade.sh` in the copy's `probe`
  project after `npm run build:src:styles`). The instrument asserts every inventory site present,
  and zero missing, unimportant, important-custom-property, and extra sites.
  - Planted `.d-probe { display: block !important; }` in `@layer utilities` of `_display.scss`:
    `EXTRA .d-probe|`, `SUMMARY inventory=343 present=343 missing=0 unimportant=0 customImportant=0
    extra=1`, vitest exit=1. The partial was restored with sha256
    `5118ac2913a73d62520599d4e3765de70732f572fa14d85ab34dfea49812d25a` before and after
    (`logs/cascade-planted.log.txt`).
  - Clean: `SUMMARY inventory=343 present=343 missing=0 unimportant=0 customImportant=0 extra=0`,
    vitest exit=0 (`logs/cascade-clean.log.txt`).

## Tailwind controls

`tools/tailwind.sh` ran in the landing copy; the logs are in `logs/tailwind/`.

| Run | Command | Result | Red cases |
| --- | --- | --- | --- |
| Clean, before | `npm run build:src:styles && npm run test:service` | exit=0, `Tests 18 passed (18)` | none |
| Control A: `.order-first{order:-1!important}` becomes `.order-first{order:-1}` in `dist/src/styles/index.css` | `npm run test:service` | exit=1, `Tests 2 failed \| 16 passed (18)` | `consumer > derives the shared class names, and mounts an element for every one of them`; `consumer > keeps a shared name on the line while its importance covers only some of the longhands Tailwind declares` |
| Control B: `order-first` written onto the exclusion line in `tests/setup.css`, `consumer.css`, and `preflight.css` | `npm run test:service` | exit=1, `Tests 4 failed \| 14 passed (18)` | `consumer > executes the recipe the guide ships, apart from the markup line each one names`; `consumer > derives the shared class names…`; `consumer > keeps a shared name on the line…`; `profiles > holds every written copy of the exclusion line equal to the profile that declares it` |
| Clean, after | `npm run build:src:styles && npm run test:service` | exit=0, `Tests 18 passed (18)` | none |

The restoration digests, each file's SHA-256 before the control and after the restore:

| File | Before | After |
| --- | --- | --- |
| `dist/src/styles/index.css` (control A) | `9d6ad69d893749500b129f877f0a48bd2b7b0c8e837d772b42c4c6f08a24f875` | the same |
| `tests/setup.css` (control B) | `1096b128869ab8cb7d8a2d44b08afae3ea649484c7e4e30216c87b76eefb8823` | the same |
| `tests/fixtures/tailwind/consumer.css` (control B) | `fc9d2a01aca323a077d4d684275d7a526e7bb92cfba8187de3d20bf3e1a1f520` | the same |
| `tests/fixtures/tailwind/preflight.css` (control B) | `91652bfa2725c2d1838943bff3cdfc72c1ce45f27a6a829da9ba7be5138576d9` | the same |

## Gates on the landing copy

The landing copy holds the owned files and the patch applied, with a hard-linked `node_modules`.
`tools/gates.sh` ran the gates in order; the logs are in `logs/gates/` and the summary is
`logs/gates.log.txt`.

| Command | Exit | Result line |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | the `oxlint --deny-warnings` run printed no finding |
| `npm run check` | 0 | every `tsc` and `vue-tsc` stage printed no diagnostic |
| `npm run build:src` | 0 | the core, browser, and styles builds completed |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/display.test.ts tests/src/styles/utilities/flex.test.ts tests/src/styles/utilities/vertical-align.test.ts tests/src/styles/components/stacks.test.ts tests/setupStyles.test.ts` | 0 | `Test Files 4 passed (4)`, `Tests 37 passed (37)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Test Files 4 passed (4)`, `Tests 11 passed (11)` |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |
| `npm run test:setup` | 0 | `Test Files 4 passed (4)`, `Tests 251 passed (251)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |
| `npm run build:src:styles && npm run test:service` | 0 | `Test Files 3 passed (3)`, `Tests 18 passed (18)` |

Scoped read-only checks over the owned files in the worktree: `npx oxfmt --config .oxfmtrc.json
--check <owned files>` printed `All matched files use the correct format.`; `npx oxlint --config
.oxlintrc.json --deny-warnings <owned .ts files>` printed no finding.

## Patch check

`tools/apply-check.sh` (`logs/apply-check.log.txt`) returned the copy to `e4e6a40`. It ran `git
apply -R` of the patch (exit 0) and removed the copied owned files. `git status --porcelain` was then
empty, `git diff --quiet HEAD` exited 0, and the base commit's tree equalled the `e4e6a40` tree. Then:

`git -C tmp/probe/land apply --check tmp/units/ud-shared-2.patch` → `git apply --check exit=0`.

Each file in the patch carries its `index` line (`grep -c '^index '` equals `grep -c '^diff
--git'`). The patch's SHA-256 is `7e63cf84da9a939329ff8e5f9e45973e2e60c75caa6f2c1901db9b53412e9688`.

## Decisions settled inside the deviation contract

- **Constants' shapes.**
  - `FLEX_ENTRY_CASES` holds named fields (`prefix`, `property`, `values` of `{ key, value }`)
    rather than round 1's tuples.
  - `FLEX_RESTING_VALUES` is keyed by property with `{ declared, computed }`, typed by an exported
    `FlexRestingValue` interface in `tests/setupStyles.ts`, as `InputGroupCase` is.
  - The display proof's `contents` scalar stays local as `RESTING_DISPLAY`, because it is a scalar
    that only the display proof reads, not a table.
- **Centering assertion.** The tall item sets the row's height, so no stack state makes it shorter
  than the stack. The assertion therefore reads `[false, true, true]` over the stack's `span` items:
  the tall item equal to the row, and each text item beside it shorter. A stretch reads `[false,
  false, false]`.
- **Labels.** The fill row shows a `flex-fill` item on each side of an unclassed `Item`, so every item
  carrying the class takes the class's full name and the row still shows the fill against an item
  that does not fill.
- **Paragraph wrapping.** The § Tailwind paragraph keeps its base lines after the inserted
  sentence, leaving a short line, so the hunk stays small for the three-way landing. The edited
  paragraphs of `### Display utilities` and `### Flex utilities` are rewrapped at 100 columns.
- **Log placement.**
  - `logs/record/` holds the mutation record.
  - `logs/pre-fix/` holds the round-1-proof runs.
  - `logs/setup/` holds the binding-case controls.
  - `logs/tailwind/` holds the Tailwind runs.
  - `logs/gates/` holds the gates.
- **Mutations beyond the brief.** `section-residue-left` and `label-bare` give the destruction cases
  and the label assertion a reddening mutation. Every mutation ran over the style proofs and the
  section proofs, not over one proof, so a red set can be wider than round 1's.

## Observations

- The styles command the brief's acceptance criteria give names `tests/setupStyles.test.ts`. The
  styles configuration's `include` (`tests/src/styles/**/*.test.ts`) does not collect it, and the run reports `Test Files
  4 passed (4)`. The file runs in the `setup` project: `npm run test:setup` and every `logs/setup/`
  run.
- Importing `tests/setupStyles.ts` into the section proofs makes the `app:browser` run print Vite's
  `Module "path" has been externalized for browser compatibility` warnings. The styles project
  prints the same warnings when it loads that module
  (`npx vitest run --config configs/src/vite.styles.config.ts … vertical-align.test.ts` printed 46
  such lines in the landing copy). The warnings fail nothing, and nothing suppresses them.
- The host load average read 20.14 on 4 CPUs when the unit started (`uptime`), with sibling units
  running. No run failed on timing.

## Deviation state

No stop condition fired:
- every added mutation reddened its named case;
- the moved tables changed no proof's reading;
- every guide site the ruling names was located on `e4e6a40` plus the round-1 patch.

The unit did not run the journey or `CAPTURE=1`; the brief makes them the Orchestrator's
observations at landing.
