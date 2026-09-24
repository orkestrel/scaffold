# UTIL-PAINT round 2 report

Round 2 of the UTIL-PAINT unit ran on the `opus` role (Opus 5.5, the native subagent that wrote
round 1) in the `/home/user/veneer-up` worktree, on the `unit/up` branch from the `2a3f223` commit.
It carries fixes P-a to P-e from the `up-audit-verdict.md` verdict and changes nothing else.

**Outcome: every acceptance criterion closes, and there is no deviation.**
- Each fix sits at its named site.
- P-a, P-c, and P-e each carry a retained red run, and so does P-d.
- Every gate exits 0 on the rebuilt validation copy.
- The worktree's `format:check` and `lint:check` scripts exit 0.
- The `up-shared-2.patch` file and the `up-unscoped-profiles-2.patch` file each pass the
  `git apply --check` command.

This unit ran no commit, push, install, or destructive git command, and wrote nothing into the
session scratchpad.

## Files

The owned files are written and uncommitted. The `up-2-status.txt` file records the
`git status --porcelain` output, and every entry in it is an untracked owned path:

- the `app/browser/helpers.ts` file, new this round for P-c
- the `tests/app/browser/helpers.test.ts` file, new this round for P-c
- the `app/browser/sections/BackgroundSection.ts` and `app/browser/sections/BorderSection.ts` files,
  unchanged since round 1
- the `src/styles/utilities/_background.scss` and `src/styles/utilities/_border.scss` partials,
  unchanged since round 1
- the `tests/src/styles/utilities/background.test.ts` and
  `tests/src/styles/utilities/border.test.ts` proofs, unchanged since round 1
- the `tests/app/browser/sections/BackgroundSection.test.ts` and
  `tests/app/browser/sections/BorderSection.test.ts` proofs, each of which gains a case for P-d

The `up-2.diff` file holds the `git diff 2a3f223` output, followed by each untracked file through
the `git diff --no-index /dev/null` command.

The shared changes come back as patches:
- The `.orkestrel/veneer/units/up-shared-2.patch` file supersedes the `up-shared.patch` file whole.
- The `.orkestrel/veneer/units/up-unscoped-profiles-2.patch` file applies after it and supersedes the
  `up-unscoped-profiles.patch` file.

## Fixes

### P-a: the profile order is compared whole

This fix is in the `tests/service/tailwind/profiles.test.ts` file.

Before (round 1):

```ts
// Tailwind prepend a generated layer statement of its own, and the order line follows it. The
// following case reads that placement; the reading here is that the order line is declared
// unchanged behind it, and that the page resolves the cascade's own order first.
for (const compiled of [tailwindProfile, preflightProfile, instrumentProfile]) {
	expect(new SheetReader(compiled).statement).toEqual(['properties'])
	expect(new SheetReader(compiled).order.slice(-ORDER.length)).toEqual(ORDER)
	expect(new SheetReader(`${cascade}\n${compiled}`).order.slice(0, ORDER.length)).toEqual(ORDER)
}
```

After:

```ts
// Tailwind prepend a generated layer statement of its own. The reading here is each whole
// order: the profile places that generated layer first and Veneer's named layers after it in
// their declared order, and the page resolves the cascade's own order first with the
// generated layer last, so a layer any profile adds beyond those reddens here.
for (const compiled of [tailwindProfile, preflightProfile, instrumentProfile]) {
	expect(new SheetReader(compiled).statement).toEqual(['properties'])
	expect(new SheetReader(compiled).order).toEqual(['properties', ...ORDER])
	expect(new SheetReader(`${cascade}\n${compiled}`).order).toEqual([...ORDER, 'properties'])
}
```

The patch keeps the scoped reading of theme variables and the exception for the generated
`properties` layer. It drops the comment's claim that the order line is declared unchanged; each
claim that remains is one an assertion reads.

**Red run.** The `vendor-layer-ahead` mutation writes a `@layer vendor;` statement ahead of the order
line in the copy's `tests/setup.css` file. The `npm run build:src:styles && npm run test:service`
command exits 1 with the `Tests  1 failed | 17 passed (18)` summary. The failing case is the
`declares the one order line in every profile, and leaves the document order unmoved` case in the
`profiles.test.ts` proof, as the `up-mutations-2.log.txt` log records.

### P-b: the guide sentences and the comments

These changes are in the `guides/veneer.md` guide, inside the `up-shared-2.patch` file.

- **Background.** "the fill's own rule sets that local to `1`" becomes "the fill's own rule writes
  the `1` value into that local".
- **Border.** "a factor of `2` doubles the `.rounded-2` class" becomes "the `2` factor doubles the
  `.rounded-2` class".
- **Background proof paragraph.** "each class written once at no infix and read at every boundary and
  one pixel below it" becomes "each class written once at no infix, the `.bg-danger` and
  `.bg-opacity-50` composition and the `.bg-warning-subtle` class read at every boundary and one pixel
  below it". Those are the elements the boundary case in the `background.test.ts` proof mounts.
- **Border proof paragraph.** "each radius step against the value the release writes and under the
  radius factor, … each class written once at no infix and read at every boundary and one pixel below
  it" becomes "each radius step against the value the release writes, the `.rounded` and `.rounded-2`
  classes under the radius factor, … each class written once at no infix, the composition of the
  `.border`, `.border-top-0`, `.border-3`, and `.rounded-top-5` classes read at every boundary and one
  pixel below it". Those are the factor subjects and the composition the border proof mounts.
- The paragraphs these fixes touch are re-flowed to 100 columns, and a neighbouring sentence ("The
  release writes the rounded entries later…") re-flows with them. Its wording is unchanged.

The table comments are in the `tests/setupStyles.test.ts` file, inside the `up-shared-2.patch` file.

- "the release's `rgba()` over one channel alias" becomes "the release's `rgba()` function over one
  channel alias".
- "a bare `var()` over the role's subtle alias" becomes "a bare `var()` function over the role's
  subtle alias".

The `BACKGROUND_SPECIMENS` remark is in the `app/browser/constants.ts` file, inside the
`up-shared-2.patch` file. "whose caption names the class the swatch shows" becomes "whose caption
names the classes the swatch carries". The `BORDER_SPECIMENS` remark takes the same wording.

**Sweep.** A script extracted every added guide line and every comment line in the added code and
listed each code token that is followed by a function word or by nothing. Every hit outside the
cited sites was a list member that shares the noun closing its list, such as "the `.border-top`,
`.border-end`, …, and `.border-start` sides". The hit outside that pattern was in the helper's TSDoc:
"such as `bg-primary border`." became "such as the `bg-primary border` class string."

### P-c: a single swatch-grid helper

The helper is the `renderSwatches` function in the new, owned `app/browser/helpers.ts` file:

```ts
export function renderSwatches(swatches: readonly string[]): string {
	return `<div class="row row-cols-3 row-cols-md-5 g-2">${swatches
		.map(
			(classes) =>
				`<div class="col"><figure class="figure w-100"><div class="ratio ratio-4x3 ${classes}"></div><figcaption class="figure-caption">${classes}</figcaption></figure></div>`,
		)
		.join('')}</div>`
}
```

The helper is pure and carries full TSDoc: a description and the `@param`, `@returns`, `@remarks`,
and `@example` tags. Its name follows the `render*` prefix, which names a helper that produces markup
from a value.

The rest of P-c is in the shared patch:
- **Constants.** In the `app/browser/constants.ts` file, each Background and Border specimen is an
  `Object.freeze({ name, markup: renderSwatches([...]) })` call. This replaces the round-1 form, in
  which each list mapped `{ name, swatches }` literals through a copy of the grid template. The file
  imports the helper through an `import { renderSwatches } from './helpers.js'` declaration.
- **Barrel.** The `app/browser/index.ts` barrel gains an `export * from './helpers.js'` row after the
  constants row. The `tests/app/browser/index.test.ts` proof gains the `'renderSwatches'` key at the
  end of its sorted enumeration.

The proof is the new, owned `tests/app/browser/helpers.test.ts` file. Its cases:
- The `renders one captioned ratio figure per class string inside the swatch grid, in order` case
  reads the grid classes and a `col` column per swatch. Each column holds a `figure figure w-100`
  element with an empty `ratio ratio-4x3` box that carries the swatch's classes, and a
  `figcaption.figure-caption` element whose text equals those classes. The case also reads that the
  markup carries no inline style.
- The `names in each caption the classes its own box carries beside the ratio classes` case reads
  each caption against the box's own class list.
- The `renders the grid alone for an empty list` case reads the row element with no column.

**Red run.** The `caption-other-string` mutation draws the caption from a
`classes.replace('bg-', 'fill-')` expression in the `helpers.ts` file. The helper proof and the
section proofs exit 1 with the `Tests  4 failed | 7 passed (11)` summary. The red cases are:
- the helper proof's cases at the `helpers.test.ts:7` and `helpers.test.ts:48` lines
- the `renders every declared specimen as captioned swatches…` case of each section proof, at the
  `BackgroundSection.test.ts:32` and `BorderSection.test.ts:31` lines

### P-d: swatches that match the canvas

These changes are in the `app/browser/constants.ts` file, inside the `up-shared-2.patch` file.

A throwaway probe measured every swatch in the light and dark modes. It read each swatch's fill
against the canvas, and each border against its backdrop. The instrument is the
`up-instrument-probe-contrast.test.ts` file, and its output is in the `up-probe-contrast.log.txt` and
`up-probe-contrast-rows.txt` logs.

This unit set the bar for "matches the canvas" at a contrast below 1.2:1. That bar catches the
bare-eye matches the verdict names:
- the `bg-white` class, light 1.00
- the `bg-black` class, dark 1.19
- the `border-white` swatch, light 1.00
- the `border-black` swatch, dark 1.19

The bar also catches their siblings on the same reading:
- the `bg-light` class, light 1.05
- the `bg-dark` class and the `bg-dark bg-gradient` pair, dark 1.15
- the subtle tiers, from 1.01 to 1.20 in the light or the dark mode
- the `bg-opacity-10` step, light 1.15 and dark 1.09
- the `border-light` swatch, light 1.05
- the `border-dark` swatch, dark 1.15
- the `border-light-subtle` swatch, light 1.02
- the `border-dark-subtle` swatch, dark 1.10

Each fill swatch under the bar gains the `border` class, which the body-surface swatches already
carry:
- the `bg-light border`, `bg-dark border`, `bg-black border`, and `bg-white border` swatches
- every `bg-*-subtle border` swatch
- the `bg-success bg-opacity-10 border` swatch
- the `bg-dark bg-gradient border` swatch

Each border-color swatch under the bar gains a fill its border stands against in the light and dark
modes:
- The `bg-dark` fill goes to the `border-light`, `border-white`, and `border-light-subtle` swatches.
- The `bg-light` fill goes to the `border-dark`, `border-black`, and `border-dark-subtle` swatches.

The captions follow on their own, because each caption is the swatch's class string.

These swatches are outside the rule, recorded as such:
- The `border-opacity-10` step: a fill cannot lift a border drawn at 10% alpha, and the step's
  faintness is what it shows.
- The `border border-0` removal: its subject is the absent border.

The rule is a case in each section proof:
- The Background proof's `draws every swatch box against the canvas in either mode, with a border
  where its fill matches the canvas` case mounts the region in a light island and a dark island. It
  requires every swatch's fill, or the border it carries, to read at least 1.2:1 against that
  island's canvas.
- The Border proof's `draws every color swatch border against its own fill in either mode, with a
  fill where the border matches the canvas` case does the same for every role and subtle border
  swatch. It reads the border against the swatch's own fill over the canvas, and it pins which swatch
  carries which color class. It selects its swatches inside the `Border roles` and `Subtle borders`
  specimens, because the opacity ramp also carries the `border-success` class.

**Red runs.** Each run exits 1 with the `Tests  1 failed | 10 passed (11)` summary and reddens only
its section's new case:
- The `bg-white-unbordered` and `bg-black-unbordered` mutations redden the case at the
  `BackgroundSection.test.ts:140` line.
- The `border-white-unfilled` and `border-black-unfilled` mutations redden the case at the
  `BorderSection.test.ts:167` line.

### P-e: the proofs' mutations re-run, and the count instrument's control

**The mutation re-run.** The `up-instrument-mutate-2.py` instrument carries round 1's style
mutations, unchanged in site and edit. It also carries round 1's table, section, and ledger
mutations, with their sites moved where round 2 moved the code: the caption into the `helpers.ts`
file, and the dropped opacity step to the `bg-success bg-opacity-10 border` string. The instrument
ran them all against the shipped round-2 proofs.

Every run reddened its named cases. Each failing line cites the file and line of the shipped case:
- in the `background.test.ts` proof, the lines 19, 59, 76, 124, 171, 205, 241, and 254
- in the `border.test.ts` proof, the lines 23, 50, 86, 134, 180, 232, 274, 378, and 393

Each of those is the line of an `it(` call in the file as it ships, and the log ends with the
`{"restored": true, "rebuild_exit": 0}` record.

A reading moved from round 1. The `literal-role-fill` mutation no longer reddens the `writes the
aliased roles alone…` case. Round 1's reading of that case compared whole selector texts, and it went
red only because the minifier grouped the identical rules. The shipped proof splits each selector
list, as round 1's report records, so this mutation reddens the alias cases alone.

**The count instrument.** The `up-instrument-count-cascade-2.mjs` instrument adds a layer check and an
exit code to the round-1 count. Every paint rule must sit in the `utilities` layer and under no other
at-rule, and any finding exits 1. Its readings are in the `up-cascade-count-2.log.txt` log:
- The built cascade reads 111 inventory selectors against 111 cascade selectors, with no finding and
  exit 0.
- A copy with the `.rounded-pill` rule dropped reads 110 cascade selectors and lists the
  `.rounded-pill` selector as missing, exit 1.
- A copy with the `.bg-gradient` rule moved into the `components` layer reports the `.bg-gradient`
  selector outside the utilities layer, exit 1.
- The round-1 instrument, with a path argument added, reads the moved copy with no finding and exit
  0. That run records the gap the new instrument closes.

## Gates on the rebuilt validation copy

The validation copy under the `tmp/probe/base` directory was rebuilt from the `git archive 2a3f223`
output, with the `node_modules` directory linked in through the `cp -al` command. Round 1's patches
were applied and committed in the copy's own repository as a base, and the owned files were copied
over it. The round-2 edits were made on that base, and the round-2 patches are the copy's diff from
the pristine extract.

The `up-2-gates.sh` script ran each gate as written, and the `up-2-gates.log.txt` log records each
result:

| Command | Result |
| --- | --- |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/background.test.ts tests/src/styles/utilities/border.test.ts` | `Tests  22 passed (22)`, exit 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/BackgroundSection.test.ts tests/app/browser/sections/BorderSection.test.ts tests/app/browser/helpers.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | `Tests  16 passed (16)`, exit 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | `Tests  122 passed (122)`, exit 0 |
| `npm run test:conformance` | `Tests  22 passed (22)`, exit 0 |
| `npm run build:src:styles && npm run test:service`, with the revised shared and profiles patches | `Tests  18 passed (18)`, exit 0 |
| `npm run test:guides` | `Tests  19 passed (19)`, exit 0 |
| `npm run test:policy` | `Tests  109 passed \| 1 skipped (110)`, exit 0 |

In the worktree, the `npm run format:check` command exits 0 with the `All matched files use the
correct format.` line, as the `up-2-worktree-format-check.log.txt` log records. The
`npm run lint:check` command exits 0 with no diagnostic, as the `up-2-worktree-lint-check.log.txt`
log records.

**Patch checks.** The `up-2-apply-check.log.txt` log records the checks on a fresh extract of the
`2a3f223` commit:
- The `git apply --check up-shared-2.patch` command exits 0.
- The `git apply --check up-unscoped-profiles-2.patch` command, run after the shared patch is
  applied, exits 0.

**Difference from round 1.** Round 1's patches and round 2's were each applied to a fresh extract,
and the trees were compared in the `up-2-interdiff.txt` record. The trees differ in these files
alone:
- the `app/browser/constants.ts` file, for the P-b remarks, P-c, and P-d
- the `app/browser/index.ts` barrel, for P-c
- the `guides/veneer.md` guide, for P-b
- the `tests/app/browser/index.test.ts` proof, for P-c
- the `tests/service/tailwind/profiles.test.ts` proof, for P-a
- the `tests/setupStyles.test.ts` proof, for the P-b comments

The validation copy was deleted before this report.

## Retained records

These records are under the `.orkestrel/veneer/units/up-instruments/` directory:
- the `up-report-2.md` report
- the `up-shared-2.patch` and `up-unscoped-profiles-2.patch` patches
- the `up-2.diff` diff and the `up-2-status.txt` status
- the `up-mutations-2.log.txt` log, from the `up-instrument-mutate-2.py` instrument, with its
  `up-mutations-2-summary.log.txt` summary
- the `up-cascade-count-2.log.txt` log, from the `up-instrument-count-cascade-2.mjs` instrument
- the `up-probe-contrast.log.txt` and `up-probe-contrast-rows.txt` logs, from the
  `up-instrument-probe-contrast.test.ts` instrument
- the `up-2-gates.log.txt` log, from the `up-2-gates.sh` script
- the `up-2-apply-check.log.txt` log and the `up-2-interdiff.txt` record
- the `up-2-worktree-format-check.log.txt` and `up-2-worktree-lint-check.log.txt` logs

## Deviations

None. This unit settled these choices within the contract:
- the helper's name and signature, the `renderSwatches(swatches: readonly string[]): string`
  signature
- the P-d bar of 1.2:1
- the `border` class for fills
- the `bg-dark` and `bg-light` fills for borders
- the exclusion of the faint opacity border and the `border-0` removal from the rule
- re-flowing the paragraphs P-b touches

## Could not close

Nothing in this round's scope. These are the Orchestrator's runs at landing:
- the whole `npm run test:setup` run
- the journey
- the `CAPTURE=1` capture run, including the `background-roles` and `border-roles` frames in the
  light and dark modes
- the whole styles project
