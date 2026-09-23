# Unit B-PASSIVE-PROSE — fix round report (round 2, completed by successor brief 3)

## What this unit found on arrival

The fix round (`bpp-brief-2.md`) was interrupted by a container restart before it wrote a report.
`git status` and `git diff 87ff1d0` in the worktree, read against `bpp-brief-2.md`'s findings
(F1 through F7), showed every code edit the fix round required was already present in the tree:

- `git status --porcelain` shows three modified files: `tests/setupServer.ts`,
  `tests/setupStyles.ts`, `tests/src/styles/components/button-group.test.ts`. No other file is
  dirty.
- The F1 residue tags (`SpecifierReader.read`, `scanForbiddenSource`, `extractSpecifiers`,
  `collectLedger` (both sites), `SheetReader.selectors`, `attributeSelector` (`answers` and
  `refuses` sites), `indexRecordingKeys`, `LAYER_COMPONENTS`, `readCompoundTag`,
  `collectRuleLonghands`, the bare tags at the former `collectMandatedRelatives` and
  `matchesSignature` sites in `setupServer.ts`; `REDUCED_MOTION`, `readEscape` (both sites),
  `walkSelector` (`states` sites), `readIdentifier` (`decodes` site), `CUSTOMIZATION_RECIPE`,
  `RETAINED_LENGTH_ALIASES` in `setupStyles.ts`) all carry a noun today. Verified by grepping each
  symbol named in the objective verdict's F1 list; every hit already reads with `helper`,
  `method`, or `constant` inserted.
- F2 (the semicolon capital at the `collectKeyframeNames` "answers" sentence in
  `setupServer.ts`) already reads "...or not; the {@link collectKeyframeNames} helper answers...",
  lowercase after the semicolon.
- F3 (`helper`/`function` alternation): swept both files for the bare noun `function` outside a
  `export function` declaration and a `throws`/`typeof` context. The only two remaining hits are
  `setupServer.ts` ("the key this function renders", near the `renderRuleKey` doc block) and
  `setupStyles.ts` ("this function" in the `compileBreakpointRamp` `@remarks`), both self-referential
  ("this function") rather than a `{@link}` or bare-identifier noun for another symbol, and both
  predate `87ff1d0` (`git diff 87ff1d0` shows neither line touched). They are outside F3's scope,
  which carries only the noun the round-1 rewrites introduced beside `helper` for the same symbol.
  Every symbol F3 named (`collectSelectorClasses`, `readCascadeBlocks`, `collectKeyframeNames`)
  now reads `helper` at every site, with no `function` beside it.
- Claim 3 (`setupStyles.ts` around line 3615): reads "The `engine` field is the axis the range
  family varies on...", matching the required rewrite exactly.
- The `undefined` sense the objective verdict flagged as unsettled ("`undefined` names a selector
  no engine prefix appears in", `setupStyles.ts` near line 3617) is settled by D42 (a literal value
  token is its own noun) and needs no further edit; the site already reads that way.

No further code edit was needed. This unit's work was to complete the full-ledger sweep F4
requires, correct the report's F5/F6 defects, and bound the § Tests patch per F7, then re-run the
gates and write this report.

## The full `{@link}` ledger — every tag in both files, no sample

### `tests/setupServer.ts`

| Line | Tag(s) | Sense | Ruling |
| --- | --- | --- | --- |
| 179 | `scanOracleObligation` | function | Permitted: followed by `as a fault`, an `as`-phrase position the file already treats as needing no noun. |
| 309 | `computeArtifactDigest` | function | Permitted: followed by `over the manifest-rooted...`, a preposition-object position. |
| 339 | `FORBIDDEN_RUNTIME` | constant | Permitted: sentence-final, followed by `.`. |
| 370 | `readDepartures` | function | Rewritten: `the {@link readDepartures} helper reads`. |
| 371 | `describeDeparture` | function | Rewritten: `the {@link describeDeparture} helper writes`. |
| 412 | `collectElementTags`, `collectMandatedRelatives` | functions | Rewritten: `the {@link collectElementTags} helper`, `the {@link collectMandatedRelatives} helper to return`. |
| 422 | `LEDGER_CASCADE`, `LEDGER_INVENTORY`, `LEDGER_SHIPPED` | constants | Rewritten: each carries `constant`. |
| 532 | `collectImportantNames` | function | Permitted: `{@link collectImportantNames} proofs read as...` — `proofs` is the sentence's own subject noun, not a noun for the tag; the tag names the population the proofs read, a preposition-free but noun-following position already accepted (predates `87ff1d0`, unflagged by either audit round). |
| 801 | `SpecifierReader.read` | method | Rewritten: `the {@link SpecifierReader.read} method hands out`. |
| 843 | `extractStringArgument` | function | Permitted: sentence-final, followed by `.`. |
| 857 | `SpecifierReader.read` | method | Rewritten: `the {@link SpecifierReader.read} method returns`. |
| 884 | `FORBIDDEN_SIGNATURES`, `matchesSignature` | constant, function | Rewritten: `the {@link FORBIDDEN_SIGNATURES} constant`, `the {@link matchesSignature} helper`. |
| 885 | `scanForbiddenSource` | function | Rewritten: `the {@link scanForbiddenSource} helper reports`. |
| 888 | `extractSpecifiers` | function | Rewritten: `the {@link extractSpecifiers} helper raises`. |
| 911 | `FORBIDDEN_SIGNATURES` | constant | Permitted: `a member of {@link FORBIDDEN_SIGNATURES}.`, sentence-final. |
| 1101 | `collectLedger` | function | Rewritten: `the {@link collectLedger} helper measures`. |
| 1176 | `collectLedger` | function | Rewritten: `the {@link collectLedger} helper measures`. |
| 1223 | `CASCADE_PATH` | constant | Permitted: followed by `under WORKSPACE_ROOT`. |
| 1232 | `VENEER_GUIDE_PATH` | constant | Permitted: followed by `under WORKSPACE_ROOT`. |
| 1256 | `readBuiltCascade` | function | Rewritten: `the {@link readBuiltCascade} helper reads`. |
| 1356 | `collectKeyframeNames` | function | Rewritten: `the {@link collectKeyframeNames} helper` (F1 residue, now closed). |
| 1394 | `collectDeclarationReads` | function | Rewritten: `the {@link collectDeclarationReads} helper`. |
| 1413 | `readCascadeBlocks` | function | Rewritten: `the {@link readCascadeBlocks} helper reads`. |
| 1420 | `renderRuleKey` | function | Rewritten: `the {@link renderRuleKey} helper renders`. |
| 1450 | `readCascadeBlocks` | function | Rewritten: `the {@link readCascadeBlocks} helper reads`. |
| 1454 | `normalizeMediaCondition` | function | Permitted: followed by `helper, is one` — already carries `helper`. |
| 1504 | `collectSelectorClasses` | function | Rewritten: `the {@link collectSelectorClasses} helper reads`. |
| 1559 | `SheetReader.selectors` | member | Rewritten (F1 residue, now closed): `the {@link SheetReader.selectors} member reports`. |
| 1594 | `collectKeyframeNames` | function | Rewritten, F2 closed: `the {@link collectKeyframeNames} helper answers`, lowercase after the preceding semicolon. |
| 1627 | `SheetReader.order` | member | Rewritten: `{@link SheetReader.order} member answers`. |
| 1670 | `SheetReader.order` | member | Permitted: followed by `with no entry`. |
| 1694 | `collectSelectorClasses` | function | Rewritten: `the {@link collectSelectorClasses} helper`. |
| 1740 | `SheetReader.declarations` | member | Permitted: sentence-final, followed by `.`. |
| 1879 | `collectSelectorClasses` | function | Rewritten: `the {@link collectSelectorClasses} helper reads`. |
| 1906 | `collectRuleLonghands` | function | Rewritten (F1 residue, now closed): `the {@link collectRuleLonghands} helper`. |
| 1987 | `attributeSelector` | function | Rewritten (F1 residue, now closed): `the {@link attributeSelector} helper answers`. |
| 2008 | `indexRecordingKeys` | function | Rewritten (F1 residue, now closed): `the {@link indexRecordingKeys} helper builds`. |
| 2015 | `LAYER_COMPONENTS` | constant | Rewritten (F1 residue, now closed): `the {@link LAYER_COMPONENTS} constant answers`. |
| 2020 | `matchSelectorKey` | function | Rewritten: `the {@link matchSelectorKey} helper`. |
| 2024 | `matchSelectorKey` | function | Rewritten: `the {@link matchSelectorKey} helper`. |
| 2097 | `readCascadeBlocks` | function | Rewritten: `the {@link readCascadeBlocks} helper reads`. |
| 2111 | `describeSite` | function | Permitted: `its {@link describeSite} site as it is written` — `site` here is the domain object every row claims, not the generic noun-for-function; predates `87ff1d0`, unflagged by either audit round. |
| 2118 | `attributeSelector` | function | Rewritten: `the {@link attributeSelector} helper names`. |
| 2120 | `matchesRecording` | function | Rewritten: `The {@link matchesRecording} helper is what separates`. |
| 2217 | `readCascadeBlocks` | function | Rewritten: `the {@link readCascadeBlocks} helper reads`. |
| 2219 | `collectKeyframeNames` | function | Rewritten: `the {@link collectKeyframeNames} helper reads`. |
| 2223 | `attributeSelector` | function | Rewritten (F1 residue, now closed): `the {@link attributeSelector} helper refuses`. |
| 2317 | `EMPTY_CELL`, `ABSENT_CELL` | constants | Permitted: `{@link EMPTY_CELL} where it is empty, and {@link ABSENT_CELL} where` — each followed by `where`, a position the file already treats as needing no noun. |
| 2328 | `EMPTY_CELL`, `ABSENT_CELL` | constants | Permitted: `the empty string for the {@link EMPTY_CELL} constant, undefined for the {@link ABSENT_CELL} constant` — the first carries `constant`; the second is parallel to the first and reads as its own constant reference in the same clause. |
| 2435 | `compileExpandedCascade` | function | Rewritten: `the {@link compileExpandedCascade} helper writes`. |
| 2508 | `readCompoundTag` | function | Rewritten (F1 residue, now closed): `the {@link readCompoundTag} helper does not read`. |
| 2513 | `collectMandatedRelatives` | function | Rewritten: `the {@link collectMandatedRelatives} helper is what separates`. |
| 2531 | `collectElementTags` | function | Rewritten: `the {@link collectElementTags} helper reads`. |
| 2798 | `ORACLE_BINDINGS` | constant | Permitted: followed by `.`, sentence-final default-value note. |

### `tests/setupStyles.ts`

| Line | Tag(s) | Sense | Ruling |
| --- | --- | --- | --- |
| 59 | `REDUCED_MOTION` | constant | Rewritten (F1 residue, now closed): `the {@link REDUCED_MOTION} constant passes`. |
| 140 | `BOOTSTRAP_SCOPE_PATTERNS` | constant | Permitted: sentence-final, followed by `.`. |
| 254 | `matchesCSSWhitespace` | function | Rewritten: `the {@link matchesCSSWhitespace} helper names`. |
| 255 | `walkSelector` | function | Rewritten: `the {@link walkSelector} helper states`. |
| 295 | `matchesCSSWhitespace` | function | Rewritten: `the {@link matchesCSSWhitespace} helper names`. |
| 347 | `splitTopLevelList` | function | Rewritten: `the {@link splitTopLevelList} helper serves`. |
| 352 | `trimCSSWhitespace`, `splitTopLevelList` | functions | Rewritten: each carries `helper`. |
| 353 | `normalizeComplexSelector`, `readIdentifier` | functions | Rewritten: each carries `helper`. |
| 354 | `readIdentifier` | function | Rewritten: `the {@link readIdentifier} helper, which reads`. |
| 356 | `extractShadowLayers` | function | Rewritten: `The {@link extractShadowLayers} helper is built`. |
| 357 | `splitTopLevelList`, `splitTopLevelValues` | functions | Rewritten: each carries `helper`. |
| 361 | `extractBootstrapVariables` | function | Rewritten: `the {@link extractBootstrapVariables} helper, which matches`. |
| 369 | `readEscape` | function | Rewritten (F1 residue, now closed): `the {@link readEscape} helper`. |
| 375 | `readIdentifier` | function | Rewritten (F1 residue, now closed): `the {@link readIdentifier} helper decodes`. |
| 377 | `matchesCSSWhitespace` | function | Rewritten: `the {@link matchesCSSWhitespace} helper names`. |
| 387 | `normalizeComplexSelector` | function | Permitted: `{@link normalizeComplexSelector} as text and is copied` — followed by `as`. |
| 425 | `walkSelector` | function | Rewritten: `the {@link walkSelector} helper returns`. |
| 431 | `readEscape` | function | Rewritten (F1 residue, now closed): `the {@link readEscape} helper`. |
| 432 | `walkSelector` | function | Rewritten: `the {@link walkSelector} helper states`. |
| 463 | `trimCSSWhitespace` | function | Rewritten: `the {@link trimCSSWhitespace} helper so`. |
| 465 | `walkSelector` | function | Rewritten (F1 residue, now closed): `the {@link walkSelector} helper states puts`. |
| 488 | `walkSelector` | function | Rewritten: `the {@link walkSelector} helper states reads`. |
| 490 | `matchesCSSWhitespace` | function | Rewritten: `the {@link matchesCSSWhitespace} helper names`. |
| 562 | `collectTokenNodes` | function | Permitted: `This is {@link collectTokenNodes} reduced to its leaves` — an apposition naming the output of the function, not a bare-subject-plus-verb construction; predates `87ff1d0`, unflagged by either audit round. |
| 1006 | `selectTableColumns` | function | Rewritten: `the {@link selectTableColumns} helper returns`. |
| 1046 | `walkSelector`, `readIdentifier` | functions | Rewritten (F1 residue, now closed): each carries `helper` (`states`, `decodes`). |
| 1735 | `MANDATED_TAG_PAIRS` | constant | Rewritten: `the {@link MANDATED_TAG_PAIRS} constant names`. |
| 2439 | `MANDATED_TAG_PAIRS` | constant | Rewritten: `the {@link MANDATED_TAG_PAIRS} constant names`. |
| 2526 | `CUSTOMIZATION_RECIPE` | constant | Rewritten (F1 residue, now closed): `the {@link CUSTOMIZATION_RECIPE} constant copies`. |
| 2843 | `RETAINED_LENGTH_ALIASES` | constant | Rewritten (F1 residue, now closed): `the {@link RETAINED_LENGTH_ALIASES} constant drives`. |
| 2891 | `RETAINED_COLOR_ALIASES` | constant | Permitted: sentence-final, followed by `.`. |
| 3008 | `VENEER_GUIDE_PATH` | constant | Permitted: followed by `itself and requires`. |
| 3791 | `CARD_GROUP_CASES` | constant | Rewritten: `the {@link CARD_GROUP_CASES} constant carries`. |
| 3855 | `GRID_BREAKPOINT_CASES` | constant | Permitted: followed by `rather than written again`. |
| 3960 | `LIST_GROUP_ACTION_HOSTS` | constant | Rewritten: `the {@link LIST_GROUP_ACTION_HOSTS} constant carries`. |
| 4002 | `LIST_GROUP_ACTION_HOSTS` | constant | Rewritten: `the {@link LIST_GROUP_ACTION_HOSTS} constant names`. |
| 4302 | `INPUT_GROUP_DEFERRED` | constant | Permitted: sentence-final, followed by `.`. |
| 5053 | `FORM_CONTROL_MARKUP` | constant | Permitted: followed by `the selector matches`, a relative clause on the preposition object. |

Every rewritten line above closes an F1, F2, or F3 finding, or matches the pattern round 1 already
applied to the rest of that file's compliant tags. Every "Permitted" ruling sits in a grammatical
position the writing rule and the existing convention both treat as needing no inserted noun
(sentence-final before `.`, an object of a preposition, an `as`-phrase, or an apposition), and none
of those lines were named by either audit round's findings.

## The multiline sweep (criterion 3)

```
$ grep -Pzo '\{@link [^}]+\}\s*\n?\s*(is|are|reads|holds|returns|names|writes|takes|carries|maps|owns|runs|lists|declares|records|keeps|emits|binds|hands|reports|raises|measures|answers|builds|refuses|does|passes|states|decodes|copies|drives|serves|sits)\b' tests/setupServer.ts tests/setupStyles.ts
(no output, exit 1)

$ grep -n "{@link [A-Za-z_.#]*} function" tests/setupServer.ts tests/setupStyles.ts
(no output, exit 1)
```

## F2 — the capitalisation fix

`tests/setupServer.ts`, the `collectKeyframeNames` `@remarks` sentence: "...a `@keyframes` rule
carries a vendor prefix or not; the {@link collectKeyframeNames} helper answers the neighbouring
question about the animations themselves." The clause after the semicolon opens lowercase.

## Claim 3 — the `engine` field

`tests/setupStyles.ts`, the `FormRangeCase` `@remarks`: "The `engine` field is the axis the range
family varies on: a selector naming one engine's pseudo-element is discarded whole by the other,
so Bootstrap writes the thumb and the track out once per engine and this key ships both halves."

## The corrected fed-case names (F5)

The button-group proof's split sites feed two cases:

- `it.each(['btn-group', 'btn-group-vertical'])('lifts the pressed child of a %s', ...)`, which
  builds the `lifted` array through `splitTopLevelList` and asserts each state's selector with
  `toContain`.
- `it('reads its radius and its overlap from the compatibility variables the token module
  declares', ...)`, which builds the `overlap` array through `splitTopLevelList` and asserts it
  with `toEqual`.

Neither case is named `btn-group-vertical overlap case`, and no case reads "over the border it
shares" through a split site (that case, `lifts the label of a checked grouped input of a %s over
the border it shares`, reads no split).

## Split-site diffs (unchanged from round 1, re-verified)

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

## The § Tests patch, bounded per F7 (row scope: the eight style proofs and the section proofs)

`guides/veneer.md` § Tests (`## Tests`, currently starting around line 4032) still omits, in that
section alone, the eight style proofs the roadmap carrier row names and every section proof but
`ButtonSection.test.ts`, `TypeSection.test.ts`, and `MediaSection.test.ts` — confirmed by grepping
the section's byte range for each proof's relative path. CLOSE-GUIDE has since linked all eight
style proofs elsewhere in the guide (§ Compatibility rows and the components paragraph starting
"`tests/src/styles/components/<name>.test.ts` reads each resolved treatment in the browser"), but
none of those links sits inside § Tests itself, so the row's gap in that section stands. The
element proofs and the infrastructure files (`tests/config.test.ts`, `tests/distribution.test.ts`,
`tests/guides.test.ts`, `tests/policy.test.ts`, `tests/setup.test.ts`,
`tests/setupBrowser.test.ts`, `tests/app/browser/index.test.ts`,
`tests/src/browser/Button.test.ts`, `tests/src/browser/Delegate.test.ts`,
`tests/src/browser/helpers.test.ts`, `tests/src/browser/index.test.ts`,
`tests/src/core/errors.test.ts`, and every `tests/src/styles/elements/*.test.ts` file) are outside
this row's named scope per F7 and are not part of this patch; the Orchestrator records that link
gap as an observation carried to X-EXIT's documentation check.

**Style proofs** — add each, introduced the same way the paragraph's existing entries are (a
lowercase-first descriptive phrase in `[...]()` inside the existing `see` list in the style-proofs
paragraph):

- `[the card classes](../tests/src/styles/components/card.test.ts)`
- `[the button group classes](../tests/src/styles/components/button-group.test.ts)`
- `[the pagination classes](../tests/src/styles/components/pagination.test.ts)`
- `[the placeholder classes](../tests/src/styles/components/placeholder.test.ts)`
- `[the progress classes](../tests/src/styles/components/progress.test.ts)`
- `[the spinner classes](../tests/src/styles/components/spinner.test.ts)`
- `[the list group classes](../tests/src/styles/components/list-group.test.ts)`
- `[the validation classes](../tests/src/styles/components/validation.test.ts)`

**Section proofs** — add each, introduced the same way the application-proofs paragraph's existing
three entries are (a descriptive phrase naming the section), to the paragraph starting "The
application proofs drive the shell through its interface":

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

The exact sentence position and wording within each paragraph is left to the integrator, per the
round-1 report's own Unknowns row.

## Scoped gates (this round's run, in the worktree)

- `npm run format:check` exits 0.
- `npm run lint:check` exits 0.
- `npm run check` exits 0 (`tsc --noEmit --project tsconfig.json`, `check:src:core`,
  `check:src:browser`, `check:src:styles`, `check:app:browser` all clean).
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/button-group.test.ts` exits 0, 34 tests passed (1 test file), the
  same case count as the round-1 measurement.
- `grep -Pzo '\{@link [^}]+\}\s*\n?\s*(is|are|...)\b' tests/setupServer.ts tests/setupStyles.ts`
  returns nothing (exit 1).
- `grep -n "{@link [A-Za-z_.#]*} function" tests/setupServer.ts tests/setupStyles.ts` returns
  nothing (exit 1).

## What this unit could not close

Nothing in this round's scope. The § Tests patch is returned as a report-only patch for the
integrator to apply, per the brief's ownership of `guides/veneer.md`, and the link-gap observation
over the element and infrastructure proofs is carried to X-EXIT rather than closed here, per F7's
ruling.
