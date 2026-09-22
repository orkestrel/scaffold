# Unit B-PASSIVE-B — `btn-group`, `btn-toolbar` — report

Done, with three blockers that live outside this unit's owned files and are returned as exact
patches, and three shared-file line rewrites recorded for the Orchestrator's ruling.

## Pre-edit comparison reading

Taken on the untouched worktree at `3a9202a`, before any edit:

- `npm run build:src` exit 0; `dist/src/styles/index.css` 89.10 kB.
- `npm run test:conformance` exit 0, 17 passed. The four ledger gates, the deferral gate, and the
  tag gate were green with no row for this unit's keys.
- `guides/ledger/departures.md` already carried the `btn`-attributed rows for
  `.btn-group-lg > .btn` and `.btn-group-sm > .btn` (the size twins `_button.scss` ships). They are
  unchanged by this unit: `attributeSelector` answers `btn` for those selectors, so the comparison
  measures them under `btn` before and after.
- § Deferred selectors carried the `Passive`-owned rows for `.btn-group*`, `.btn-group-vertical*`,
  and `.btn-toolbar`, each located by its name and listed under § Ledger rows.

## Per obligation

### Obligation 1 — the partial

`src/styles/components/_button-group.scss` (new). Emits Bootstrap 5.3.8's recorded surface for both
keys under `@layer components`, less the omitted names: the shared base rule, the child rule,
the `z-index` set, `.btn-toolbar`, the group radius, the negative-margin rules, the positional
radius resets, the vertical direction rule, and the vertical width rule. It
authors nothing for `.btn-group-sm > .btn` or `.btn-group-lg > .btn`, and
`tests/src/styles/components/button.test.ts` is unchanged and green.

`src/styles/index.scss` gains `@use 'components/button-group';` after `@use 'components/vr';`, which
is the position family ruling 8's order gives it among the lines present in this worktree.

### Obligation 2 — the proofs

- `tests/src/styles/components/button-group.test.ts` (new), reported by its own run as 30 passed.
- `tests/setupStyles.ts` gains `BUTTON_GROUP_SELECTORS`, `BUTTON_GROUP_CORNERS`,
  `BUTTON_GROUP_RADIUS_CASES`, `BUTTON_GROUP_STACK_CASES`, `BUTTON_GROUP_MARKUP`, and
  `BUTTON_GROUP_CHECK_MARKUP`, appended at the file's end and frozen.
- `tests/setupStyles.test.ts` gains the export names and the case
  `binds the button group selectors, corner resets, and lift states to the inventory`, which
  partitions the two keys' official vocabulary into the shipped list and the guide's own deferral
  table, holds each lift state against the rules the inventory records with `z-index: 1`, and holds
  each cleared corner against the rules the inventory records at zero.

### Obligation 3 — the showcase and the capture registry

- `app/browser/constants.ts` gains `BUTTON_GROUP_COPY`, `BUTTON_GROUP_ACTIONS`,
  `BUTTON_GROUP_PAIR`, `BUTTON_GROUP_CHOICES`, and `BUTTON_GROUP_SPECIMENS`, whose specimens are
  `Horizontal group`, `Vertical group`, `Nested groups`, `Check group`, `Small group`,
  `Large group`, `Wide toolbar`, and `Crowded toolbar`.
- `app/browser/sections/ButtonGroupSection.ts` (new), re-exported from `app/browser/index.ts` and
  constructed in `app/browser/Showcase.ts` after `TableSection`.
- `tests/app/browser/sections/ButtonGroupSection.test.ts` (new), reported by its own run as 4
  passed.
- `tests/setup.ts` gains a `CaptureSubject` member per specimen, the `checked` `CaptureState`
  member, a `CASCADE_KEYS` row per specimen but the check group, and the `GROUP_KEYS` list spread
  last into `CAPTURE_KEYS`.
- `tests/app/browser/integration.test.ts` gains `BUTTON_GROUP_SPECIMENS` in the declared-subject
  list and a journey case placing the checked element frame beside one driving Tab focus
  and placing the page frame.
- `tests/app/browser/Showcase.test.ts` gains the region and the specimen concatenation;
  `tests/app/browser/index.test.ts` gains the export names.

### Obligation 4 — the accounting

`npm run build:src && npm run test:conformance` reports **no departure row and no addition row** for
either key. The partial writes Bootstrap's recorded values byte for byte, so the comparison finds
nothing to record. The keys are in the `listed` literal in `tests/conformance.test.ts`, the
compatibility rows are in the guide, and every `Passive`-owned deferral row for these keys is struck.

### Obligation 5 — the guide

`guides/veneer.md` gains the `src/styles/components/_button-group.scss` § Files row after the
`_icon-link.scss` row, the `### Button group classes` and `### Button toolbar classes` sections after
`### Helper classes`, and the § Compatibility rows for `btn-group` and `btn-toolbar` after the `vr`
selector row. The struck deferral rows are listed under § Ledger rows. No `guides/ledger/` path is
written into any prose this unit owns.

## Ledger rows

### Departures added

None. The comparison reports no value difference for `btn-group` or `btn-toolbar`.

### Additions added

None. The comparison reports no emitted name the official inventory lacks for either key.

### Deferral rows struck

Every struck row is a `Passive`-owned row in `guides/veneer.md` § Deferred selectors, each with owner
`Passive` and reason `The owning component supplies this relationship.`:

`.btn-group`, `.btn-group-vertical`, `.btn-group > .btn`, `.btn-group-vertical > .btn`,
`.btn-group > .btn-check:checked + .btn`, `.btn-group > .btn-check:focus + .btn`,
`.btn-group > .btn:hover`, `.btn-group > .btn:focus`, `.btn-group > .btn:active`,
`.btn-group > .btn.active`, `.btn-group-vertical > .btn-check:checked + .btn`,
`.btn-group-vertical > .btn-check:focus + .btn`, `.btn-group-vertical > .btn:hover`,
`.btn-group-vertical > .btn:focus`, `.btn-group-vertical > .btn:active`,
`.btn-group-vertical > .btn.active`, `.btn-toolbar`,
`.btn-group > :not(.btn-check:first-child) + .btn`, `.btn-group > .btn-group:not(:first-child)`,
`.btn-group > .btn:not(:last-child):not(.dropdown-toggle)`,
`.btn-group > .btn-group:not(:last-child) > .btn`, `.btn-group > .btn:nth-child(n+3)`,
`.btn-group > :not(.btn-check) + .btn`, `.btn-group > .btn-group:not(:first-child) > .btn`,
`.btn-group-vertical > .btn-group`, `.btn-group-vertical > .btn:not(:first-child)`,
`.btn-group-vertical > .btn-group:not(:first-child)`,
`.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle)`,
`.btn-group-vertical > .btn-group:not(:last-child) > .btn`,
`.btn-group-vertical > .btn:nth-child(n+3)`, `.btn-group-vertical > :not(.btn-check) + .btn`,
`.btn-group-vertical > .btn-group:not(:first-child) > .btn`.

Kept deferred and authored absent: `.btn-toolbar .input-group` (Forms);
`.btn-group > .btn.dropdown-toggle-split:first-child`, `.btn-sm + .dropdown-toggle-split`,
`.btn-group-sm > .btn + .dropdown-toggle-split`, `.btn-lg + .dropdown-toggle-split`,
`.btn-group-lg > .btn + .dropdown-toggle-split` (Disclosure).

## Token reuse and literal rulings, per value

Every value this partial writes is Bootstrap's own, byte for byte, so the ledger records nothing.

| Value                               | Ruling                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `var(--bs-border-radius)`           | Written as recorded. `_tokens.scss` declares it over `--vn-radius-base`, so a retune of either name moves the group |
| `calc(-1 * var(--bs-border-width))` | Written as recorded. `_tokens.scss` declares it over `--vn-border-width`                                            |
| `relative`, `inline-flex`, `middle` | Keywords; nothing to tokenize                                                                                       |
| `1 1 auto`, `100%`, `1`, `0`        | Structural values with no published scale; written as recorded                                                      |
| `column`, `flex-start`, `center`    | Keywords; nothing to tokenize                                                                                       |
| `flex`, `wrap`, `flex-start`        | Keywords; nothing to tokenize                                                                                       |

No token was added to `_tokens.scss`. No value needed a departure row.

## Coverage matrix

Every recorded selector of both keys, less the omitted names. No recorded rule of either key
sits under an at-rule condition, so every row's condition is `—`. The proof file is
`tests/src/styles/components/button-group.test.ts` and the section proof is
`tests/app/browser/sections/ButtonGroupSection.test.ts`, whose case
`renders every grouped class the partial ships at least once` puts every row's selector to the
browser's own engine inside the rendered region.

| Inventory selector                                                  | Proof case                                                           | Subject          | Specimen         | Capture scenario      |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------- | ---------------- | --------------------- |
| `.btn-group`                                                        | lays a horizontal group out as an inline flex line                   | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn`                                                 | lays a horizontal group out as an inline flex line                   | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:hover`                                           | lifts the hovered child of a %s                                      | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:focus`                                           | lifts the focused child of a %s                                      | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:active`                                          | lifts the pressed child of a %s                                      | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn.active`                                          | lifts the written active child of a %s                               | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn-check:checked + .btn`                            | lifts the label of a checked grouped input over the border it shares | Check group      | Check group      | `check-group-checked` |
| `.btn-group > .btn-check:focus + .btn`                              | rings the checked label of the grouped alignment control             | Check group      | Check group      | `check-group-focus`   |
| `.btn-group > :not(.btn-check:first-child) + .btn`                  | rounds the first label of a check group                              | Check group      | Check group      | `check-group-checked` |
| `.btn-group > :not(.btn-check) + .btn`                              | keeps the $name child at position $index rounded                     | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:nth-child(n+3)`                                  | keeps the $name child at position $index rounded                     | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:not(:last-child):not(.dropdown-toggle)`          | keeps the $name child at position $index rounded                     | Horizontal group | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn-group:not(:first-child)`                         | rounds a nested horizontal group at the outer ends                   | Nested groups    | Nested groups    | `nested-groups`       |
| `.btn-group > .btn-group:not(:first-child) > .btn`                  | rounds a nested horizontal group at the outer ends                   | Nested groups    | Nested groups    | `nested-groups`       |
| `.btn-group > .btn-group:not(:last-child) > .btn`                   | rounds a nested horizontal group at the outer ends                   | Nested groups    | Nested groups    | `nested-groups`       |
| `.btn-group-vertical`                                               | lays a vertical group out as a full-width column                     | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn`                                        | lays a vertical group out as a full-width column                     | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:hover`                                  | lifts the hovered child of a %s                                      | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:focus`                                  | lifts the focused child of a %s                                      | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:active`                                 | lifts the pressed child of a %s                                      | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn.active`                                 | lifts the written active child of a %s                               | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn-check:checked + .btn`                   | renders every grouped class the partial ships at least once          | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn-check:focus + .btn`                     | renders every grouped class the partial ships at least once          | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > :not(.btn-check) + .btn`                     | keeps the $name child at position $index rounded                     | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:nth-child(n+3)`                         | keeps the $name child at position $index rounded                     | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:not(:first-child)`                      | pulls each neighbour back by one border width                        | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle)` | keeps the $name child at position $index rounded                     | Vertical group   | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn-group`                                  | stacks a vertical group of groups                                    | Nested groups    | Nested groups    | `nested-groups`       |
| `.btn-group-vertical > .btn-group:not(:first-child)`                | stacks a vertical group of groups                                    | Nested groups    | Nested groups    | `nested-groups`       |
| `.btn-group-vertical > .btn-group:not(:first-child) > .btn`         | stacks a vertical group of groups                                    | Nested groups    | Nested groups    | `nested-groups`       |
| `.btn-group-vertical > .btn-group:not(:last-child) > .btn`          | stacks a vertical group of groups                                    | Nested groups    | Nested groups    | `nested-groups`       |
| `.btn-group-sm > .btn`                                              | keeps the sized group families rounded at their own size radius      | Small group      | Small group      | `small-group`         |
| `.btn-group-lg > .btn`                                              | keeps the sized group families rounded at their own size radius      | Large group      | Large group      | `large-group`         |
| `.btn-toolbar`                                                      | wraps a toolbar onto a second line under pressure                    | Wide toolbar     | Wide toolbar     | `wide-toolbar`        |
| `.btn-toolbar`                                                      | wraps a toolbar onto a second line under pressure                    | Crowded toolbar  | Crowded toolbar  | `crowded-toolbar`     |

The `:not(.dropdown-toggle)` exclusion is exercised in the proof case
`leaves a dropdown toggle its trailing corners where a plain child loses them`, which pairs a plain
child against a `.dropdown-toggle` sibling at the same position. That class is not rendered by a
specimen: the journey's authored-class census refuses a class no loaded stylesheet declares, and
Veneer declares no `.dropdown-toggle` rule because Disclosure owns it. No inventory selector goes
unrendered as a result.

## Written capture names

`CAPTURE=1` over each of the four variants wrote, under `tmp/capture/states/`:

Element and page frames, one per registered scenario and variant — `check-group-checked`,
`check-group-focus`, `horizontal-group`, `vertical-group`, `nested-groups`, `small-group`,
`large-group`, `wide-toolbar`, and `crowded-toolbar`, each expanded as
`<scenario>--light-1280.png`, `<scenario>--dark-1280.png`, `<scenario>--light-390.png`, and
`<scenario>--dark-390.png`.

Accessibility artifacts, one per new subject and variant — `check-group`, `horizontal-group`,
`vertical-group`, `nested-groups`, `small-group`, `large-group`, `wide-toolbar`, and
`crowded-toolbar`, each expanded as `<subject>--<theme>-<viewport>-accessibility.txt`.

`tmp/capture/states/` holds 132 files after the sweep, and the portfolio guard read every one of
them inside its declared region.

## Blockers outside the owned files

Each is returned as an exact patch and none was applied. The repository formatter normalizes a
fenced sample's indentation, so each patch below is shown flush and lands at the indentation its
surrounding construct already carries.

### Blocker 1 — `tests/setupServer.test.ts` (off-limits)

Case `skips engine and CSS obligations whose Proof cell is a dash` compares the compatibility
component set against a written Set literal. Reading before the patch:
`expected Set{…} to deeply equal Set{…}`, received carries `btn-group` and `btn-toolbar`.

Patch, inside the `new Set([…])` literal at around line 1130, after the `'btn',` row:

```ts
				'btn',
				'btn-group',
				'btn-toolbar',
				'col',
```

### Blocker 2 — `tests/setupStyles.test.ts` (off-limits instrument; the repair is in off-limits partials)

Case `carries no shared written declaration block across style partials` reports one overlap:
`.btn-toolbar` in `components/_button-group.scss` around line 36 and `.row` in
`components/_grid.scss` around line 6 share `display: flex` and `flex-wrap: wrap`. The partial
cannot drop either declaration: family ruling 1 requires Bootstrap's recorded set exactly, and
`_mixins.scss` and `_grid.scss` are off-limits. No declaration was split or reordered to dodge the
sweep.

Measured on a scratch copy of `src/styles` outside the worktree:

- compiled output byte-identical, 112045 bytes on each side, `sass.compile(entry, { style: 'expanded' })`;
- `scanStyleBlocks(scratch)` returns `shared: []` against the shipped tree's one overlap, over the
  same 57 partials.

Patch, in `src/styles/_mixins.scss`, before the `border-reset` mixin at around line 40:

```scss
// Lays content out as a flex line that wraps.
//
// The grid row and the button toolbar each write this pair beside declarations of their own, and
// neither owns the other's, so the pair moves here rather than staying written twice.
@mixin wrap-line {
	display: flex;
	flex-wrap: wrap;
}
```

Patch, in `src/styles/components/_grid.scss`, in the `.row` rule:

```scss
	.row {
		@include alias-gutters;
		@include wrap-line;
		margin-top: calc(-1 * var(--bs-gutter-y));
```

Patch, in `src/styles/components/_button-group.scss` (this unit's own file, applied by the same
change because the mixin does not exist until the first patch lands):

```scss
.btn-toolbar {
	@include wrap-line;
	justify-content: flex-start;
}
```

### Blocker 3 — `tests/app/browser/sections/ButtonSection.test.ts` (unowned; in neither list)

Case `declares a specimen for every button variant the shipped cascade carries` filters the shipped
`btn-*` classes to the ones the Button table must render, and its exclusion names `btn-group*` and
`btn-check` but not `btn-toolbar`. Reading before the patch:
`expected [ 'btn-toolbar' ] to strictly equal []`. A toolbar is a grouping container rather than a
button variant, so it belongs in the exclusion beside `btn-group`.

Patch, at around line 72:

```ts
const variants = declared.filter(
	(name) => !name.startsWith('btn-group') && name !== 'btn-toolbar' && name !== 'btn-check',
)
```

## Deviations

### Recorded and carried on

1. **`tests/setup.test.ts` — one existing line rewritten.** The `CAPTURE_KEYS` concatenation
   assertion gains the `GROUP_KEYS` spread. The Orchestrator's mid-unit note authorizes this line
   for a per-family driven-state list.

   ```ts
   expect(CAPTURE_KEYS).toStrictEqual([
   	...SHOWCASE_KEYS,
   	...BUTTON_KEYS,
   	...CASCADE_KEYS,
   	...GROUP_KEYS,
   ])
   ```

2. **`tests/setup.ts` — the `CaptureState` line rewritten** to add `'checked'`, which the baseline
   addendum names as the extension a unit registering a checked specimen makes.

3. **`tests/app/browser/Showcase.test.ts` — one existing line rewritten. Not covered by any
   authorization; the Orchestrator rules on it.** The case
   `mounts its sections after the region and destroys them before removing the nodes` read every
   `.btn` in the whole showcase and compared the population with `BUTTON_SPECIMENS`. A button group
   renders `.btn` children by definition, so that population is no longer the Button table's alone.
   The read is scoped to the Button region, which is the claim the surrounding comments state. The
   assertion below it, that no `.btn` sits outside `main`, still reads the whole host and is
   unchanged.

   Before: `const specimens = [...host.querySelectorAll(`.${BUTTON_CLASS}`)]`

   After: `const specimens = [...host.querySelectorAll(`section[aria-label="Buttons"] .${BUTTON_CLASS}`)]`

4. **`tests/app/browser/integration.test.ts` — one existing case body reordered. Not covered by any
   authorization; the Orchestrator rules on it.** The case
   `toggles a native host and an anchor host through the keyboard` traversed to `Toggle` and then to
   `Anchor`, which the Button table renders earlier, so the second traversal wrapped once around the
   whole document. Its cost is one browser round trip per focusable control the showcase renders.

   Measured alone on an idle container at the wide variant, with nothing else running:

   | Tree                                                  | Elapsed  | Budget   | Result |
   | ----------------------------------------------------- | -------- | -------- | ------ |
   | Without the Button group section                      | 11131 ms | 15000 ms | passes |
   | With the Button group section, original order         | 30816 ms | 15000 ms | fails  |
   | With the Button group section, anchor traversed first | 5546 ms  | 15000 ms | passes |

   The reorder removes the wrap, so the case no longer depends on how many controls the showcase
   renders. Both hosts are still driven and asserted; only the order changed, and a comment records
   why. Every sibling unit that renders a focusable specimen meets the same wall, so this is a
   family-level ruling rather than this unit's alone.

### Decided within the owned scope

- **The `.dropdown-toggle` child lives in the proof, not in a specimen.** The journey's
  authored-class census refuses a class no loaded stylesheet declares, and Veneer declares no
  `.dropdown-toggle` rule. Its exclusion is proved by pairing a plain child against a
  `.dropdown-toggle` sibling in the browser proof.
- **The wrapping toolbar specimen is named `Crowded toolbar`.** An inline style is refused on the
  showcase surface, so the specimen carries more groups rather than a declared width, and it wraps
  at the narrow variant. The wrapping boundary itself is read at a controlled width in the proof.
- **The check group takes two scenarios and no resting scenario of its own.** `CASCADE_KEYS` admits
  one row per subject, so `check-group-checked` is the specimen's resting frame — the specimen
  renders its middle input checked — and `check-group-focus` is the driven one. Both sit in
  `GROUP_KEYS`.
- **The ring reading is taken on the input with the label as the worn element.** The label never
  matches `:focus-visible`, so a reading taken on it alone reports nothing.
- **The journey case was split in two.** Each frame this journey places costs its own capture, and
  the pair sat at 11727 ms inside one 15000 ms budget on the heaviest variant.
- **The specimen tables use `BUTTON_GROUP_PAIR` for the nested, sized, and toolbar specimens.** A
  third action in each of those reaches no further selector and adds a stop to the document's tab
  order, which the Button journey's traversal pays for.
- Specimen wording, case titles, the reason sentences, and the guide sections' paragraph order were
  settled inside this unit.

## Commands run, with exit codes

Gate chain run after the final edit, cheap first, each command's own exit code:

| Command                    | Exit | Reading                                                   |
| -------------------------- | ---- | --------------------------------------------------------- |
| `npm run format:check`     | 0    | All matched files use the correct format                  |
| `npm run lint:check`       | 0    | No diagnostic                                             |
| `npm run check`            | 0    | Root, src core, src browser, src styles, and app browser  |
| `npm run build:src`        | 0    | `dist/src/styles/index.css` 90.86 kB                      |
| `npm run test:setup`       | 1    | 2 failed, 159 passed — both failures are Blockers 1 and 2 |
| `npm run test:src:styles`  | 0    | 59 files, 446 passed                                      |
| `npm run test:app`         | 1    | 1 failed, 29 passed — the failure is Blocker 3            |
| `npm run test:conformance` | 0    | 17 passed                                                 |
| `npm run test:guides`      | 0    | 18 passed                                                 |
| `npm run test:policy`      | 0    | 109 passed, 1 skipped                                     |
| `npm run test:journey`     | 0    | 4 files, 108 passed                                       |

`CAPTURE=1 npm run test:journey`, run per variant so no two Chromium variants contend: 27 passed on
each of `light-1280`, `dark-1280`, `light-390`, and `dark-390`, 108 in total, each exit 0.

Earlier measurements retained because they bear on the blockers: the pre-edit
`npm run build:src && npm run test:conformance` reading in § Pre-edit comparison reading; the
scratch-copy measurement in Blocker 2; the traversal table in Deviation 4.

## Acceptance criteria

1. `format:check`, `lint:check`, `check` — exit 0. **Met.**
2. `build:src` exit 0, and the built cascade carries every recorded selector less the omitted names.
   **Met.** Reading over `dist/src/styles/index.css`, comparing normalized selector text:
   `recorded selectors 38 shipped 34` (the run's own tallies), `missing from the built cascade: []`,
   `omitted names found in the built cascade: []`.
3. `test:setup` with the case tables in the inventory. **Not met — Blockers 1 and 2.** The case this
   unit adds passes; `tests/setup.test.ts` passes whole.
4. `test:src:styles` with the owned proofs present. **Met.** 446 passed, this unit's own among them.
5. `test:app` with the sections in the inventory. **Not met — Blocker 3.** This unit's section proof,
   `Showcase.test.ts`, and `index.test.ts` all pass.
6. `test:conformance` with the keys in `listed` and the gates green. **Met.** 17 passed.
7. `test:guides` and `test:policy` — exit 0. **Met.**
8. `test:journey` exit 0, and `CAPTURE=1 npm run test:journey` writing the unit's scenarios. **Met.**
   The contended four-way capture run is load-sensitive on this container; see § Observations.
9. `git status --porcelain` lists owned and shared files only. **Met.**

## Observations, not criteria

- **The whole-chain `npm test` was not run**, because `test:setup` and `test:app` carry the three
  blockers and a whole-chain reading would report them again with nothing added.
- **The contended capture run is load-sensitive on this container.** Four Chromium variants in
  parallel report 384 to 448 seconds of test time inside 122 to 197 seconds of wall clock. Two such
  runs reported 2 and 11 timeouts, every one of them in a pre-existing Button journey case that
  drives keyboard traversal or the pointer, and none of them in a case this unit added. The same
  four variants run one at a time report 27 passed each. The authoritative reading belongs to the
  Orchestrator after this unit exits.
- **`npm run test:policy` timed out twice at its 5000 ms budget during the unit** and passed on the
  final chain. A probe measured `inspectPolicyWorkspace` at 2769 ms with **no findings**, so the
  policy laws hold and the budget is what the container's load moves.
- **The comparison's wall clock**: `npm run test:conformance` runs in 7 to 26 seconds depending on
  load, of which the ledger describe's own compile and comparison is the bulk.

## Claims of mine flagged as unverified

- **The `_mixins.scss` mixin name `wrap-line` is a proposal.** The measurement in Blocker 2 proves
  the shape works and the output is unchanged; the name is the Orchestrator's to settle, and
  `_grid.scss` belongs to another axis.
- **Blocker 3's patch is reasoned rather than executed.** The gate names `btn-toolbar` as the only
  unrendered class, and the partial adds no other `btn-*` name outside `btn-group*`, so the
  exclusion closes it. The file is unowned, so the patch was never run.
- **The traversal table in Deviation 4 was measured at the `light-1280` variant alone.** The other
  three variants were not measured separately; the full four-variant run after the reorder is green,
  which is the corroboration.
