# UTIL-FONT (`uf`) round-2 report

The round carries the F-a, F-b, and F-c fixes from `uf-audit-verdict.md`, and every gate the brief
names exits 0 on the rebuilt validation copy. The `uf-shared-2.patch` file replaces the
`uf-shared.patch` file whole, and it applies to a fresh `2a3f223` extract. It differs from the
round-1 patch only at the sites the fixes name, plus the recorded choices under § Decisions. No
stop condition fired.

The unit is `opus` on Opus 5.5, a native subagent in the `/home/user/veneer-uf` worktree (branch
`unit/uf`, base `2a3f223`). It committed nothing and wrote nothing into the session scratchpad.

## Review evidence

Every file was in `/home/user/veneer-uf/tmp/units/` and is retained in `.orkestrel/veneer/units/` (the diff, status, and shared patch) and `.orkestrel/veneer/units/uf-instruments/` (every other file):

- The `uf-shared-2.patch` file: the revised shared patch against `2a3f223`.
- The `uf-2.diff` file: the output of the `git diff 2a3f223` command, plus each untracked file through the `git diff --no-index /dev/null` command.
- The `uf-2-status.txt` file: the output of the `git status --porcelain` command.
- The `uf-mutations-2.sh` instrument and its `uf-mutations-2.log.txt` log: the F-b red runs.
- The `uf-gates-2.sh` instrument and its `uf-gates-2.log.txt` log: the gate runs.
- The `uf-probe-2.log.txt` log: the F-a value readings.

The `uf-2-status.txt` file reads as follows:

```text
 M app/browser/sections/TypeSection.ts
 M tests/app/browser/sections/TypeSection.test.ts
?? src/styles/utilities/_font.scss
?? tests/src/styles/utilities/font.test.ts
```

## F-a: the guide's claims about tokens, the showcase, and the size departure

Every F-a edit is in the `guides/veneer.md` file, which ships as part of the `uf-shared-2.patch` file.

- **The weight sentence.**
  - Before: "The weights, the styles, and the other line heights stay literal, because no published Veneer token carries them."
  - After: "The weights, the styles, and the other line heights stay literal. A weight class names a point on the weight scale, and the `--vn-weight-body` and `--vn-weight-heading` tokens name the weight of a role, so a retuned body weight leaves the `.fw-normal` class at 400. No published Veneer token carries a style or the other line heights."
- **The § Showcase sentence.**
  - Before: "The font utilities join Type beside the heading and display classes whose sizes they share."
  - After: "The font utilities join Type beside the heading classes, whose sizes the size classes share."
- **The coined term for the line-height token.**
  - "so a retuned body line moves the class" becomes "so a retuned `--vn-line-body` token moves the class".
  - "the base line height under a retuned body line" becomes "the base line height under a retuned `--vn-line-body` token".
  - The line-height departure bullet's title, "The base line height reads Veneer's body line.", becomes "The base line height reads Veneer's `--vn-line-body` token." That title carries the same coined term, so the fix reaches it (§ Decisions).
- **The size departure bullet.**
  - Before: "…Veneer writes the `var(--vn-size-8)` to `var(--vn-size-3)` values and no cap, so each class resolves its heading class's size at every viewport."
  - After: "…Veneer writes the `var(--vn-size-8)` to `var(--vn-size-3)` values and no cap, and each class resolves its heading class's size at every viewport, so the classes resolve Veneer's heading sizes rather than the release's: the `.fs-1` class resolves 36px where the release caps at 40px, and the `.fs-5` class resolves 18px where the release resolves 20px."

The values were checked on the copy before they were written. A browser probe on the validation copy read the following values (log `uf-probe-2.log.txt`, command `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/uf-probe-weight.test.ts`, exit 0, deleted after the run):

| Reading | Value |
| --- | --- |
| `.fw-normal` class, host retuning the `--vn-weight-body` token to 700 and the `--vn-weight-heading` token to 900 | `400` |
| `.fs-1` class | `36px` |
| `.fs-4` class | `20px` |
| `.fs-5` class | `18px` |
| Release's `.fs-1` cap, `2.5rem` | `40px` |
| Release's `.fs-4` cap, `1.5rem` | `24px` |
| Release's `.fs-5` value, `1.25rem` | `20px` |

The shipped `font.test.ts` proof pins the same sizes at the 390 and 1280 viewports through its `TYPE_HEADING_CASES` rows (`36px` for the `h1` twin, `18px` for the `h5` twin). The `npm run test:guides` gate exits 0 over the revised guide.

## F-b: the binding case's key, property, and table tuples move to a setup table

The inline matrix of tuples in the `tests/setupStyles.test.ts` file moves into a frozen, exported table in the `tests/setupStyles.ts` file, and the binding case iterates that table.

The table added to the `tests/setupStyles.ts` file:

```ts
/**
 * Pairs each font key whose steps a proof reads one by one with the property it sets and the table
 * of its steps, in the release's map order.
 *
 * @remarks
 * These are the font keys the release records with more than one step and no conditioned rule. The
 * `fs` key's capped rows send its steps through the heading tables instead, and the `font` key's
 * single step is the `FONT_ENTRY_CASES` table's row. Each step carries the value the release records
 * for it, so the style values are written as steps whose key is their value.
 */
export const FONT_STEP_TABLES = Object.freeze([
	Object.freeze({
		key: 'fst',
		property: 'font-style',
		cases: Object.freeze(FONT_STYLE_VALUES.map((value) => Object.freeze({ key: value, value }))),
	}),
	Object.freeze({ key: 'fw', property: 'font-weight', cases: FONT_WEIGHT_CASES }),
	Object.freeze({ key: 'lh', property: 'line-height', cases: LINE_HEIGHT_CASES }),
])
```

The binding case in the `tests/setupStyles.test.ts` file, before:

```ts
for (const [key, property, cases] of [
	['fw', 'font-weight', FONT_WEIGHT_CASES],
	['lh', 'line-height', LINE_HEIGHT_CASES],
] as const) {
	expect(
		oracle.components[key].selectors.map(({ selector, declarations }) => [selector, declarations]),
	).toEqual(cases.map((entry) => [`.${key}-${entry.key}`, [{ property, value: entry.value }]]))
}
expect(
	oracle.components.fst.selectors.map(({ selector, declarations }) => [selector, declarations]),
).toEqual(FONT_STYLE_VALUES.map((value) => [`.fst-${value}`, [{ property: 'font-style', value }]]))
```

After:

```ts
for (const { key, property, cases } of FONT_STEP_TABLES) {
	expect(
		oracle.components[key].selectors.map(({ selector, declarations }) => [selector, declarations]),
	).toEqual(cases.map((entry) => [`.${key}-${entry.key}`, [{ property, value: entry.value }]]))
}
// …the existing font-key derivation (`fontKeys`) and the entry-table comparisons, unchanged…
expect(FONT_STEP_TABLES.map(({ key }) => key)).toEqual(
	Object.entries(oracle.components)
		.filter(
			([key, { selectors }]) =>
				fontKeys.includes(key) &&
				selectors.length > 1 &&
				selectors.every((rule) => !('condition' in rule)),
		)
		.map(([key]) => key),
)
```

The new table also joins the frozen-table checks and the frozen-entry checks of the case, and it joins the case's import list and the module's export-name list.

The case keeps every inventory comparison it made in round 1, including the `fst` comparison, which is now a table row. A loop over a table passes when a row is missing, so the completeness assertion is what turns a dropped row red. That assertion derives the covered keys from the inventory itself: every font key recorded with more than one step and no conditioned rule.

The retained red runs are in the `uf-mutations-2.log.txt` log. Every run used the command `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "font entry"` on the validation copy:

| Log section | Mutated site | Exit | Summary | Failing case and reading |
| --- | --- | --- | --- | --- |
| `control` | none | 0 | 1 passed, 121 skipped (122) | none |
| `droplh` | the `lh` row dropped from the `FONT_STEP_TABLES` table | 1 | 1 failed, 121 skipped (122) | `binds the font entry, weight, style, and line-height tables to the inventory in its order`: expected `[ 'fst', 'fw' ]` to deeply equal `[ 'fst', 'fw', 'lh' ]` |
| `dropfst` | the `fst` row dropped from the `FONT_STEP_TABLES` table | 1 | 1 failed, 121 skipped (122) | the same case: expected `[ 'fw', 'lh' ]` to deeply equal `[ 'fst', 'fw', 'lh' ]` |
| `wrongproperty` | the `fw` row's property written as `font-style` | 1 | 1 failed, 121 skipped (122) | the same case, at the per-table inventory comparison |

The log records that the setup module was restored after the runs.

## F-c: the positional, counting, and cross-reference prose

- **The `font.test.ts` comment.**
  - Before: "so an infixed rule for any value, not only the one read above, reddens here."
  - After: "so an infixed rule for any value, not only the `-md` class this case reads at the 1401 viewport, reddens here."
- **"Under two parent weights"** becomes "under a 400 and a 600 parent weight" at each site:
  - the guide's proof sentence;
  - the obligation cell of the `fw` compatibility row;
  - the comment on the weight case in the `font.test.ts` file.
- **"Its first four sizes"** becomes "the `.fs-1` to `.fs-4` sizes" in the guide. The same phrase in the `font.test.ts` comment on the size case also becomes "the `.fs-1` to `.fs-4` sizes".
- **The sweep of every added line.**
  - The test name "resolves the relative weight steps differently under the two parent weights" becomes "resolves the relative weight steps differently under a 400 and a 600 parent weight".
  - The guide sentence "No two entries set one property" becomes "No entry sets a property another entry sets".
  - The sweep read the guide section, the compatibility rows, the setup-module doc blocks, the setup-proof comments, the constants remark, the partial's comments, and the `font.test.ts` file. The pattern was `above|below|two|three|four|five|first|second|last|once|now`, with each hit read by its sense. The remaining hits name a value, name no set, or quote specimen copy, and each was ruled a permitted sense:
    - "one token", "one size", and "one class" in the `font.test.ts` comments and the setup doc block;
    - "at least one of them";
    - the specimen copy "one font size apart", "two font sizes apart", and "one phrase";
    - "`First entry`" in the pre-existing list specimen;
    - the test name "carries two of its classes", which describes the markup of the case.

## Gates on the rebuilt validation copy

The validation copy was `git archive 2a3f223`, with the node modules hard-linked, the owned files copied over it, the round-1 patch applied, and then F-a and F-b applied. The copy was deleted before this report. The log is `uf-gates-2.log.txt`.

| Command | Result |
| --- | --- |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/font.test.ts` | exit 0, `Tests  28 passed (28)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TypeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | exit 0, `Tests  7 passed (7)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | exit 0, `Tests  122 passed (122)` |
| `npm run test:conformance` | exit 0, `Tests  22 passed (22)` |
| `npm run test:guides` | exit 0, `Test Files  1 passed (1)` |
| `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| `oxlint --config .oxlintrc.json --deny-warnings --no-ignore tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles/utilities/font.test.ts` | exit 0 |
| `oxfmt --config .oxfmtrc.json --check --ignore-path=.prettierignore tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md tests/src/styles/utilities/font.test.ts` | exit 0 |

The worktree checks also exit 0:

| Command | Result |
| --- | --- |
| `npm run format:check` | exit 0, `All matched files use the correct format.` |
| `npm run lint:check` | exit 0 |

The patch checks:

- `git apply --check ../../units/uf-shared-2.patch`, run in a fresh `git archive 2a3f223` extract: exit 0.
- `diff uf-shared.patch uf-shared-2.patch` changes only these sites:
  - the `FONT_STEP_TABLES` table;
  - the binding case, its import list, and its export-name list;
  - the `### Font utilities` paragraphs and bullets that F-a and F-c name;
  - the obligation cell of the `fw` compatibility row;
  - the § Showcase sentence;
  - the hunk offsets these edits shift.

## Decisions (within the deviation contract)

- **The table's exported name is `FONT_STEP_TABLES`.** The `fst` comparison becomes a row of that table rather than staying beside the loop, because the completeness assertion covers every key with more than one unconditioned step. That rule includes the `fst` key, so the `fst` comparison moves into the table instead of standing beside it.
- **The bullet title "Veneer's body line" became "Veneer's `--vn-line-body` token".** The audit's claim 7 finding names the coined term, and the bullet title is another site of that term.
- **The weight paragraph and the map-order paragraph were re-flowed** to hold the replaced sentences. The words "so each class resolves" became "and each class resolves", so the appended clause's "so" does not repeat.
- **The 36px, 40px, 18px, and 20px values** were read on the copy before they were written.
- **The `9 - $level` mapping** stays where round 1 wrote it, as the brief directs.

## What the unit could not close

- The observations the brief leaves to the Orchestrator at landing: the whole `test:setup` project, the journey, the `CAPTURE=1` run, the `test:service` project, and the whole styles project.
- The `TYPE_SPECIMENS` wrap sentence, which the Orchestrator rules on at the capture run.
