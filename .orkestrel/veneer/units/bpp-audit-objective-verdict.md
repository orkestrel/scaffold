**Audit verdict: B-PASSIVE-PROSE (`bpp`), objective lane**

- **Lane:** objective. `reviewer` on Opus 5.5 ran it in place of the Astra `analyst`, whose Codex bench is dark on quota.
- **Evidence read:** `bpp.diff`, `bpp-status.txt`, `b-passive-prose-brief.md`, `b-passive-prose-report.md`, ruling R9, and the worktree `/home/user/veneer-bpp`.
- **Method:** I used only Read, Grep, and Glob. I edited nothing, ran no command, and spawned nothing.

## Per-claim verdicts

**1. Delta and scope: CONFIRMED.**
- The diff has three file headers: `tests/setupServer.ts`, `tests/setupStyles.ts`, and `tests/src/styles/components/button-group.test.ts`.
- Every hunk in the first two files changes only ` * ` or `/** */` comment lines. In `bpp.diff`, those hunks run from diff line 5 to diff line 321.
- `bpp-status.txt` lists the same three files as ` M` and no untracked file.
- The status shows no change to `guides/veneer.md`, `src/`, `app/`, the vendored `tests/setupPolicy.ts` and `tests/policy.test.ts`, or any other proof.
- Attack that failed: I looked for a code line or a fourth file in the diff and status. Neither exists. The line numbers my greps return in the worktree match the diff's post-image.

**2. The nouns (criterion 4): BROKEN.** Only the clause "the report's caveat is a bounded, named residue" fails. Every other clause holds.
- **What holds:**
  - The criterion regex over `tests/setupServer.ts` and `tests/setupStyles.ts` returns nothing.
  - Every rewritten tag names its symbol's real kind. I checked the declarations: for example `readDepartures` at `setupServer.ts:1103` is a function, `EMPTY_CELL` at `:373` is a constant, and `MANDATED_TAG_PAIRS` at `setupStyles.ts:2406` is a constant. `SpecifierReader.read` is a method.
  - No rewrite changes a sentence's meaning or adds a term from the `writing.md` substitution table.
- **What fails:**
  - The report's caveat (report lines 89–95 and 231–235) bounds nothing. It says "a small number" and "similar constructs", and it names one site, `setupServer.ts:1559`.
  - Two of its four example verbs match no remaining site. `serves` was rewritten at `setupStyles.ts:347`, and no `{@link}` tag in either file is followed by `sits`.
  - The real residue is the list under finding F1. It includes a verb that is in the regex's own list but sits past a line break.
- **Required change:** the report, or the carrier's brief, must enumerate the residue as it appears in F1.

**3. The named sites: BROKEN.**
- **What holds:**
  - `setupServer.ts:2100` reads "as the `collectShippedComponents` function selects them".
  - `:1356` reads "the {@link collectKeyframeNames} function".
  - `:1594` reads "The {@link collectKeyframeNames} function answers". Its capitalisation is a separate defect; see F2.
  - `setupStyles.ts:3623` reads "the `tests/src/styles/components/form-range.test.ts` file reads".
- **What fails:** `setupStyles.ts:3615`, inside the named 3596–3634 remarks, still reads "`engine` is the axis the range family varies on".
  - `engine` is a `FormRangeCase` field, so it is an identifier and needs a noun. The same block writes "the `condition` field" at 3627 and "The `reads` map" at 3629.
  - The report (line 72) claims that `engine` already carries a noun. That claim is false.
- **Required change:** at `setupStyles.ts:3615`, write "The `engine` field is the axis…".
- **Unsettled sense:** "`undefined` names a selector" at `:3617` is a JavaScript value token. The rule does not settle whether a value token is its own noun, and the brief's deviation contract says to stop on such a case. The report does not mention it.

**4. The split (criterion 5, R9): CONFIRMED.**
- No `split(` remains in `button-group.test.ts`; the grep returns nothing.
- `splitTopLevelList` is imported from `'../../../setupStyles.js'` at line 21.
- Both sites map `replaceAll(' ', '')` over the parts:
  - line 312: `splitTopLevelList(rule.selectorText).map((selector) => selector.replaceAll(' ', ''))`
  - lines 397–399: the same, feeding `.includes(...)`.
- **Mutation:** replace `splitTopLevelList` with `(text) => [text]`, so a selector list reads as one string. The assertions distinguish it:
  - `lifted` would then hold whole-list strings. `toContain('.${name}>.btn${state}')` uses array-member equality, so it fails for both names in `lifts the pressed child of a %s` (lines 297–318).
  - `overlap` would become `[]`, so `toEqual(['calc(-1 * var(--bs-border-width))'])` fails at line 403.
  - Both reads depend on the source rules being comma lists. They are: `src/styles/components/_button-group.scss` lines 18–29 and 43–44.
- **Limit of these sites:** none of those selectors has a comma inside a group. These cases therefore cannot tell `splitTopLevelList` from a naive split. The change is behaviour-neutral here, and the idiom's own proof lives with the `splitTopLevelList` function.
- **Report:** it records "34 tests passed (1 test file), same count". A static count of the file agrees: 26 fixed cases, plus 6 `BUTTON_GROUP_RADIUS_CASES`, plus 2 `TEXT_MODES`. That the file runs green rests only on the writer's word, so I rule it UNRESOLVED for the verifier. The claim itself only says the report records it, and that part is confirmed.

**5. The § Tests measurement: CONFIRMED.**
- `guides/veneer.md` § Tests (lines 4032–4170) links none of the 8 named style proofs. The style list sits at lines 4123–4154.
- The only nearby spinner link, at line 4023, is in § Showcase, not § Tests.
- All 8 style proof files exist (Glob).
- The sections directory holds 26 proofs. Only `ButtonSection`, `TypeSection`, and `MediaSection` are linked (lines 4041–4043). The report's 23 listed names match the 23 unlinked files exactly.
- The proposed link phrases are descriptive, contain no `here`, and contain no bare URL.
- The report's counts are wrong; see F6.

**6. Law and report: CONFIRMED.**
- The code delta is one import line plus two call chains.
- It adds no `any`, `as`, `!`, suppression, mock, or new helper. Its only function is a callback passed directly to `.map`.
- The added comment text has no banned term.
- "the three rules" on the rewritten line `setupStyles.ts:3960` is a count, but it is carried over unchanged from the removed line. The delta did not introduce it.
- The report records a command and a result for format, lint, check, the scoped run, and the grep (report lines 5–13). Those results rest on the writer's word, and the authoritative run belongs to the verifier.

## Findings outside the claims

**F1. Residue tags (carrier input).** Each of these `{@link}` tags is followed directly by a verb and is outside the regex's reach:
- `setupServer.ts`:
  - 801 `SpecifierReader.read} hands`
  - 885 `scanForbiddenSource} reports`
  - 888 `extractSpecifiers} raises`
  - 1101 and 1176 `collectLedger} measures`
  - 1559 `SheetReader.selectors} reports`
  - 1987 `attributeSelector} answers`
  - 2008 `indexRecordingKeys} builds`
  - 2015 `LAYER_COMPONENTS} answers`
  - 2223 `attributeSelector} refuses`
  - 2508 `readCompoundTag} does`
  - **1906–1907 `{@link collectRuleLonghands}` then a line break then `returns`.** This verb is in the criterion's own list, and only the line wrap hides it from a line-bound grep.
- `setupStyles.ts`:
  - 59 `REDUCED_MOTION} passes`
  - 369–370 `readEscape}` then a line break then `measures`
  - 465 `walkSelector} states`
  - 1046 `walkSelector} states` and `readIdentifier} decodes`
  - 2526 `CUSTOMIZATION_RECIPE} copies`
  - 2843 `RETAINED_LENGTH_ALIASES} drives`
- The unit rewrote the same "the grammar {@link walkSelector} states" construction at 255, 432, and 488 but left 465 and 1046.
- Two rewritten sentences still hold a bare tag: `setupServer.ts:412` `{@link collectMandatedRelatives} to` and `:884` `{@link matchesSignature}.`.
- **Right looks like:** the carrier grep matches across line breaks (a multiline search), or the sweep is ruled per tag.

**F2. Capitalisation error (introduced by the delta).**
- `setupServer.ts:1593–1594` reads "…a vendor prefix or not;" and then "The {@link collectKeyframeNames} function answers…". A capital letter follows a semicolon.
- **Right looks like:** "…or not; the {@link collectKeyframeNames} function answers…".

**F3. One concept, one term.**
- The rewrites call module functions "function", while the same files call them "helper". The same symbol gets both nouns:
  - `collectSelectorClasses` is "helper" at `setupServer.ts:1504` and "function" at `:1694` and `:1879`.
  - Adjacent `@param` lines at `:2217` and `:2219` read "the {@link readCascadeBlocks} helper reads" and "the {@link collectKeyframeNames} function reads".
- The report (lines 19–21) says the rewrites match the existing `helper` pattern. That is false.
- This breaks the `AGENTS.md` design law "One concept, one term".
- **Right looks like:** pick one noun for exported module functions in these files and apply it to every site.

**F4. Criterion 4's ledger half is unmet.**
- The brief (line 152) requires "the ledger rules every `{@link}` in the two files".
- The report rules only a "sample of the remaining `{@link}` population" (lines 77–87).
- The report also carries drafting residue at line 81: "`{@link SheetReader.selectors} reports` — wait, see caveat below".

**F5. The report misnames the fed cases.**
- Report lines 132–134 say the split sites feed "lifts…over the border it shares" and "the `btn-group-vertical` overlap case".
- The split sites actually feed `lifts the pressed child of a %s` (lines 297–318) and `reads its radius and its overlap from the compatibility variables the token module declares` (line 382, `.btn-group` only).
- No `btn-group-vertical` overlap case exists, and the "over the border it shares" case (lines 320–340) reads no split.

**F6. Report counts are wrong, and counts are banned.**
- Report lines 148–149 and 190 say "out of 24 files", "The remaining 21", and "the 21 missing section links". The directory holds 26 proofs, and 23 are unlinked, as the report's own list shows.
- Report line 166 says "every `tests/src/styles/elements/*.test.ts` file (26 files)". The directory holds 39, and `html.test.ts` and `body.test.ts` are already linked at `guides/veneer.md:4129–4130`.
- `AGENTS.md` § Writing forbids stating a count.

**F7. Scope narrowed without a grant.**
- Brief criterion 6 (line 154) requires "every proof file under `tests/` the section omitted".
- The report (lines 160–170) excluded the element proofs and the infrastructure files on its own decision.
- The deviation contract (brief lines 144–145) grants only the noun choice and the link position, so the unit had to stop and report instead.
- Claim 5 already rules on the row's named scope, so this is a scope decision for the Orchestrator.

## Files

- `/home/user/veneer-bpp/tests/setupServer.ts`
- `/home/user/veneer-bpp/tests/setupStyles.ts`
- `/home/user/veneer-bpp/tests/src/styles/components/button-group.test.ts`
- `/home/user/veneer-bpp/guides/veneer.md`
- `/home/user/scaffold/.orkestrel/veneer/units/b-passive-prose-report.md`
- `/home/user/scaffold/.orkestrel/veneer/units/b-passive-prose-brief.md`

VERDICT: FAIL 2, 3; outside the claims: F1 residue-tags, F2 semicolon-capital, F3 helper-function-alternation, F4 ledger-incomplete, F5 fed-cases-misnamed, F6 report-counts, F7 criterion-6-narrowing
