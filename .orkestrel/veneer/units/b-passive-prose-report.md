# Unit B-PASSIVE-PROSE report

## Scoped gates

- `npm run format:check` exits 0.
- `npm run lint:check` exits 0.
- `npm run check` exits 0 (tsc project, `check:src:core`, `check:src:browser`, `check:src:styles`,
  `check:app:browser` all clean).
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/button-group.test.ts` exits 0, 34 tests passed (1 test file), same
  count as the pre-unit measurement.
- `grep -n -E "\{@link [A-Za-z_.#]+\}( (is|are|reads|holds|returns|names|writes|takes|carries|maps|owns|runs|lists|declares|records|keeps|emits|binds)\b|,)" tests/setupServer.ts tests/setupStyles.ts`
  returns no hits (was 33 lines before the unit).

## `{@link}` and code-token ledger — `tests/setupServer.ts` and `tests/setupStyles.ts`

Every `{@link}` in both files was read against the writing rule (identifier sense takes a noun;
CSS property/value/function/custom-property/`!important` sense is its own noun). Rewritten
entries insert the noun `function`, `method`, or `constant` immediately after the `{@link}` tag
(with a leading `the` or `a` article where grammar needs one), matching the pattern already used
throughout both files for compliant tags (for example `the {@link readCascadeBlocks} helper`).

### Rewritten (regex-flagged; all identifier sense, all functions or constants)

| File | Line (pre-edit) | Symbol | Sense | Rewrite noun |
| --- | --- | --- | --- | --- |
| setupServer.ts | 370 | `readDepartures` | function | function |
| setupServer.ts | 371 | `describeDeparture` | function | function |
| setupServer.ts | 412 | `collectElementTags` | function | function |
| setupServer.ts | 422 | `LEDGER_CASCADE`, `LEDGER_INVENTORY`, `LEDGER_SHIPPED` | constants | constant (each) |
| setupServer.ts | 857 | `SpecifierReader.read` | method | method |
| setupServer.ts | 884 | `FORBIDDEN_SIGNATURES` | constant | constant |
| setupServer.ts | 1256 | `readBuiltCascade` | function | function |
| setupServer.ts | 1694 | `collectSelectorClasses` | function | function |
| setupServer.ts | 1879 | `collectSelectorClasses` | function | function |
| setupServer.ts | 2118 | `attributeSelector` | function | function |
| setupServer.ts | 2120 | `matchesRecording` | function | function |
| setupServer.ts | 2219 | `collectKeyframeNames` | function | function |
| setupServer.ts | 2328 | `EMPTY_CELL`, `ABSENT_CELL` | constants | constant (each) |
| setupServer.ts | 2435 | `compileExpandedCascade` | function | function |
| setupServer.ts | 2513 | `collectMandatedRelatives` | function | function |
| setupServer.ts | 2531 | `collectElementTags` | function | function |
| setupStyles.ts | 254 | `matchesCSSWhitespace` (+ `walkSelector` on the next line, same sentence) | functions | function (each) |
| setupStyles.ts | 295 | `matchesCSSWhitespace` | function | function |
| setupStyles.ts | 347 | `splitTopLevelList` | function | function |
| setupStyles.ts | 352-357 | `trimCSSWhitespace`, `splitTopLevelList`, `normalizeComplexSelector`, `readIdentifier` (×2), `extractShadowLayers`, `splitTopLevelList`, `splitTopLevelValues`, `extractBootstrapVariables` | functions | function (each) |
| setupStyles.ts | 377 | `readIdentifier`, `matchesCSSWhitespace` | functions | function (each) |
| setupStyles.ts | 425 | `walkSelector` | function | function |
| setupStyles.ts | 431-432 | `readEscape`, `walkSelector` | functions | function (each) |
| setupStyles.ts | 488-490 | `walkSelector`, `matchesCSSWhitespace` | functions | function (each) |
| setupStyles.ts | 1006 | `selectTableColumns` | function | function |
| setupStyles.ts | 1735 | `MANDATED_TAG_PAIRS` | constant | constant |
| setupStyles.ts | 2439 | `MANDATED_TAG_PAIRS` | constant | constant |
| setupStyles.ts | 3791 | `CARD_GROUP_CASES` | constant | constant |
| setupStyles.ts | 3960 | `LIST_GROUP_ACTION_HOSTS` | constant | constant |
| setupStyles.ts | 4002 | `LIST_GROUP_ACTION_HOSTS` | constant | constant |

### Rewritten (named in the brief, not regex-flagged; bare code tokens beside repaired sites)

| File | Line (pre-edit) | Token | Sense | Rewrite |
| --- | --- | --- | --- | --- |
| setupServer.ts | 1356 | `{@link collectKeyframeNames}` | function, followed by `.` with no noun | added `the … function` |
| setupServer.ts | 1594 | `{@link collectKeyframeNames}` | function, followed by `answers` (not in the sample regex's verb list but still a bare identifier subject) | added `The … function` |
| setupServer.ts | 2100 | `` `collectShippedComponents` `` (backtick, not `{@link}`) | function | added `the … function` |

`{@link collectKeyframeNames}` at setupServer.ts line 2219 was already covered by the regex-flagged
table (it matched `reads`).

### `FormRangeCase` remarks — `tests/setupStyles.ts` (around line 3596-3634)

Swept the `FormRangeCase` interface's doc block and the `FORM_RANGE_CASES` remarks for bare code
tokens. Every backtick token already carries a noun (`` `engine` `` is the axis…, `` `findRule` ``
helper, `` `condition` `` field, `` `reads` `` map) except one: line 3623 named the proof file
`` `tests/src/styles/components/form-range.test.ts` `` directly before the verb `reads`, with no
noun. Rewritten to `the `tests/src/styles/components/form-range.test.ts` file reads`.

### Permitted, no rewrite (sample of the remaining `{@link}` population)

Every other `{@link}` occurrence in both files already carries a noun immediately after the tag
(for example `the {@link readCascadeBlocks} helper`, `{@link SheetReader.selectors} reports`
— wait, see caveat below) or sits in a position the writing rule and the sample regex do not
reach (followed by `as`, `to`, `such as`, `.`, or a noun already in place). Two constants,
`REDUCED_MOTION` (`'(prefers-reduced-motion: reduce)'`) and the CSS-value-shaped constants the
`EMPTY_CELL`/`ABSENT_CELL` ledger already covers, were checked against the CSS-value sense and
ruled: `REDUCED_MOTION` is a media-condition value and is its own noun (no rewrite needed);
`EMPTY_CELL`/`ABSENT_CELL` are table-sentinel strings, not CSS values, so they took the
`constant` noun (see the flagged table).

**Caveat found but not in scope of the flagged/named sets:** a small number of `{@link}` tags in
the "permitted" population are followed directly by a verb outside the sample regex's word list
(for example `{@link SheetReader.selectors} reports it.` at setupServer.ts line 1559, and similar
constructs using verbs such as `answers`, `serves`, `sits`). The brief's acceptance criterion 4
bounds the required fix to the sample regex's verb list; these residual bare-verb constructs were
left unrewritten because they fall outside both that regex and the brief's explicitly named sites.
Flagging this as a closing item below rather than silently leaving it.

## Split-site diffs — `tests/src/styles/components/button-group.test.ts`

Added `splitTopLevelList` to the `setupStyles.js` import, then routed both `split(',')` sites
through it, keeping the existing `replaceAll(' ', '')` per-part (moved from pre-split to
post-split map, so behavior is unchanged: `splitTopLevelList` already trims each part, and mapping
`replaceAll(' ', '')` over the split parts removes internal combinator spacing exactly as the
original pre-split `replaceAll` did).

```diff
-	BUTTON_GROUP_RADIUS_CASES,
-	BUTTON_GROUP_STACK_CASES,
-	TEXT_MODES,
+	BUTTON_GROUP_RADIUS_CASES,
+	BUTTON_GROUP_STACK_CASES,
+	splitTopLevelList,
+	TEXT_MODES,
 } from '../../../setupStyles.js'
```

```diff
-				? rule.selectorText.replaceAll(' ', '').split(',')
+				? splitTopLevelList(rule.selectorText).map((selector) => selector.replaceAll(' ', ''))
 				: [],
```

```diff
-			rule.selectorText
-				.replaceAll(' ', '')
-				.split(',')
-				.includes('.btn-group>.btn-group:not(:first-child)')
+			splitTopLevelList(rule.selectorText)
+				.map((selector) => selector.replaceAll(' ', ''))
+				.includes('.btn-group>.btn-group:not(:first-child)')
```

Verified: the vitest run above passed all 34 cases in this file after the change, including the
two cases these split sites feed (`lifts...over the border it shares` and the `btn-group-vertical`
overlap case).

## § Tests measurement — `guides/veneer.md`

`find tests -name "*.test.ts"` against every relative `.test.ts` link under `## Tests` found the
following proof files with no link anywhere in that section (verified with `comm -23` against the
extracted link set):

**Style component proofs the brief names directly:** `tests/src/styles/components/pagination.test.ts`,
`tests/src/styles/components/button-group.test.ts`, `tests/src/styles/components/progress.test.ts`,
`tests/src/styles/components/spinner.test.ts`, `tests/src/styles/components/placeholder.test.ts`,
`tests/src/styles/components/card.test.ts`, `tests/src/styles/components/list-group.test.ts`,
`tests/src/styles/components/validation.test.ts`.

**Application section proofs — "all but three":** the § Tests application paragraph links only
`ButtonSection.test.ts`, `TypeSection.test.ts`, and `MediaSection.test.ts` out of 24 files under
`tests/app/browser/sections/`. The remaining 21 are unlinked: `BadgeSection.test.ts`,
`BreadcrumbSection.test.ts`, `ButtonGroupSection.test.ts`, `CardSection.test.ts`,
`CloseSection.test.ts`, `ContentSection.test.ts`, `FormCheckSection.test.ts`,
`FormControlSection.test.ts`, `FormFloatingSection.test.ts`, `FormLabelSection.test.ts`,
`FormRangeSection.test.ts`, `FormSelectSection.test.ts`, `InputGroupSection.test.ts`,
`LayoutSection.test.ts`, `LinkSection.test.ts`, `ListGroupSection.test.ts`,
`PaginationSection.test.ts`, `PlaceholderSection.test.ts`, `ProgressSection.test.ts`,
`SpecimenSection.test.ts`, `SpinnerSection.test.ts`, `TableSection.test.ts`,
`ValidationSection.test.ts`.

**Other files with no link (out of this unit's stated scope — infrastructure, not proofs the § Tests
prose narrates):** `tests/config.test.ts`, `tests/distribution.test.ts`, `tests/guides.test.ts`,
`tests/policy.test.ts`, `tests/setup.test.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/index.test.ts`, `tests/src/browser/Button.test.ts`,
`tests/src/browser/Delegate.test.ts`, `tests/src/browser/helpers.test.ts`,
`tests/src/browser/index.test.ts`, `tests/src/core/errors.test.ts`, and every
`tests/src/styles/elements/*.test.ts` file (26 files). These are not in the roadmap carrier row's
named scope (`the proofs for pagination, button group, progress, spinner, placeholder, card, list
group, and validation, and all but three section proofs`), so this unit lists them here rather than
proposing links, per the deviation contract's instruction to decide, record, and carry on: adding
links for a scope the roadmap row did not name would be a rescope, not a passive-prose fix.

### Proposed patch for `guides/veneer.md` § Tests (Orchestrator applies; not line-anchored per the
brief's Unknowns row — CLOSE-GUIDE has not landed at `87ff1d0`)

In the style proofs paragraph (the one starting "The style proofs bind the cascade to the registry
and to the calibration"), add, each introduced the same way the existing entries are (a
lowercase-first descriptive phrase in `[...]()` inside the existing `see` list):

- `[the card classes](../tests/src/styles/components/card.test.ts)`
- `[the button group classes](../tests/src/styles/components/button-group.test.ts)`
- `[the pagination classes](../tests/src/styles/components/pagination.test.ts)`
- `[the placeholder classes](../tests/src/styles/components/placeholder.test.ts)`
- `[the progress classes](../tests/src/styles/components/progress.test.ts)`
- `[the spinner classes](../tests/src/styles/components/spinner.test.ts)`
- `[the list group classes](../tests/src/styles/components/list-group.test.ts)`
- `[the validation classes](../tests/src/styles/components/validation.test.ts)`

In the application proofs paragraph (the one starting "The application proofs drive the shell
through its interface"), add the 21 missing section links, each introduced the same way the
existing three are (a descriptive phrase naming the section):

- `[badge specimens](../tests/app/browser/sections/BadgeSection.test.ts)`
- `[breadcrumb specimens](../tests/app/browser/sections/BreadcrumbSection.test.ts)`
- `[button group specimens](../tests/app/browser/sections/ButtonGroupSection.test.ts)`
- `[card specimens](../tests/app/browser/sections/CardSection.test.ts)`
- `[close specimens](../tests/app/browser/sections/CloseSection.test.ts)`
- `[content specimens](../tests/app/browser/sections/ContentSection.test.ts)`
- `[form check specimens](../tests/app/browser/sections/FormCheckSection.test.ts)`
- `[form control specimens](../tests/app/browser/sections/FormControlSection.test.ts)`
- `[form floating specimens](../tests/app/browser/sections/FormFloatingSection.test.ts)`
- `[form label specimens](../tests/app/browser/sections/FormLabelSection.test.ts)`
- `[form range specimens](../tests/app/browser/sections/FormRangeSection.test.ts)`
- `[form select specimens](../tests/app/browser/sections/FormSelectSection.test.ts)`
- `[input group specimens](../tests/app/browser/sections/InputGroupSection.test.ts)`
- `[layout specimens](../tests/app/browser/sections/LayoutSection.test.ts)`
- `[link specimens](../tests/app/browser/sections/LinkSection.test.ts)`
- `[list group specimens](../tests/app/browser/sections/ListGroupSection.test.ts)`
- `[pagination specimens](../tests/app/browser/sections/PaginationSection.test.ts)`
- `[placeholder specimens](../tests/app/browser/sections/PlaceholderSection.test.ts)`
- `[progress specimens](../tests/app/browser/sections/ProgressSection.test.ts)`
- `[specimen table rendering](../tests/app/browser/sections/SpecimenSection.test.ts)`
- `[spinner specimens](../tests/app/browser/sections/SpinnerSection.test.ts)`
- `[table specimens](../tests/app/browser/sections/TableSection.test.ts)`
- `[validation specimens](../tests/app/browser/sections/ValidationSection.test.ts)`

The exact sentence position and wording within each paragraph is left to the integrator, since
CLOSE-GUIDE is rewriting this section concurrently and the landed shape at integration time may
differ from the `87ff1d0` text quoted above.

## `tests/guides.test.ts` reading (second Unknown)

`grep -n "\.test\.ts\|link\|guides/veneer" tests/guides.test.ts` shows this file runs
`@orkestrel/guide`'s generic checks only: `resolves every relative link` (every link target exists)
and `links only to test files that exist` (`report.tests`). Neither check enumerates or requires
every `tests/**/*.test.ts` file to appear as a link, so no existing case in this file asserts § Tests
completeness. A parity case that enumerates the links (if the Orchestrator wants one) is a new test,
owned by whoever integrates the § Tests patch, not by this unit's scope.

## What this unit could not close

1. The residual "permitted" `{@link}` tags followed by a verb outside the sample regex's word list
   (for example `answers`, `serves`, `reports`, `sits`) were left unrewritten: they are outside both
   the regex the acceptance criteria bind to and the brief's explicitly named sites. Flagged above
   under "Caveat found"; a follow-up brief can extend the verb list and sweep these if the intent is
   full-population compliance rather than the regex-and-named-sites bound this unit was given.
2. The § Tests patch is returned as prose (proposed link sentences plus their insertion paragraph),
   not as a line-anchored diff, per the brief's own Unknowns row: § Tests is mid-rewrite by
   CLOSE-GUIDE in a sibling worktree and has not landed at `87ff1d0`.
3. No parity test enumerating § Tests links exists today; this unit names that gap rather than
   adding a test, since the carrier of that test is the patch's integrator, per the brief's second
   Unknowns row.
