# CLOSE-GUIDE (`cg`) audit — subjective lane verdict (`reviewer` on Opus 5.5)

Lane: **subjective**, held by `reviewer` on Opus 5.5. Subject: the `/home/user/veneer-cg` worktree over `88684bc`, evidenced by `cg.diff` and `cg-status.txt`, with the unit's report and sweep ledger. I read the files, edited nothing, and ran nothing. Every rerun I describe is a Grep over the worktree guide.

## Numbered verdicts

1. **CONFIRMED.** Attack: I looked for edits outside the three owned files and for changes to machine-read content.
   - `cg-status.txt:1-3` lists only `guides/veneer.md`, `tests/guides.test.ts`, and `tests/src/styles/integration.test.ts`.
   - Every diff hunk in the guide changes prose or the stem table. No `#### <key>` table row, no § Departures or § Additions row, no fence, and no `Summary` cell changes (`cg.diff` hunks at `@@ -2226`, `@@ -3569`, `@@ -4064`).
   - `/home/user/veneer-cg/tests/guides.test.ts:68-84` adds one case inside the `execute` callback. `/home/user/veneer-cg/tests/src/styles/integration.test.ts:76-144` adds one case. The `afterEach` change at `:14-17` releases the staged media for that case and adds no second case.
   - The green gates are recorded only in the report (`close-guide-report.md:131-141`). The claim says "per the report", so it holds on the record. See referral (d).

2. **CONFIRMED.** Attack: I looked for any leftover region list, any sentence describing the order, and any dropped fact with no new home.
   - The order rule is at `/home/user/veneer-cg/guides/veneer.md:3997-4000` and links the Showcase proof. `app/browser/Showcase.ts:92-116` and `tests/app/browser/Showcase.test.ts:80-119` confirm the rule is true.
   - These facts stay: the Content region (`:4000-4001`), helper-key placement (`:4001-4004`), the button, `Delegate`, and `control` (`:4004-4008`), `main` with no id (`:4008-4010`), the Vue paragraph (`:4018-4020`), and the grow spinners (`:4029-4033`).
   - The "cascade carries" list is now a pointer to § Compatibility (`:4022-4023`). § Compatibility does carry per-key rows (`:3916-3941`).
   - "That placement" was correctly re-anchored to "The specimen and region names" (`:4013`).
   - The Close region's specimens moved to § Close classes (`:1705-1706`). The badge's dark surface was already stated (`:1667`).
   - The helper-key sentence names four regions, but it gives placement, not order. This is permitted.
   - Two taste defects come from the brief's own wording, so they are referrals (a) and (b), not rulings against the writer.

3. **CONFIRMED.** Attack: I checked the bound, the three added section sentences, and whether the case can fail.
   - The bound is at `guides/veneer.md:2210-2212`. The palette sentence is at `:2213-2216`.
   - The added sentences are at `:1065-1067` (control), `:1158-1159` (select), and `:1692-1694` (close, naming `--bs-btn-close-focus-shadow`).
   - Mutation 1: point any read paint, for example the active fill in `_list-group.scss`, at `var(--vn-color-primary-base)`. The unretuned reading becomes the primary oklch and the recipe reading becomes `#2e7d32`, so `integration.test.ts:140` reddens.
   - Mutation 2: make a paint a literal. The palette leg then does not move it, so `:143` reddens.
   - Mutation 3: a focus that never applied. The resting gray border ignores `--vn-palette-blue`, so `:143` also reddens. The palette leg therefore also guards against an empty focus reading.
   - Mutation 4: a recipe that never loaded. `:139` reddens.
   - The assertions tell each mutation apart from the passing case. The recorded red run is in `close-guide-report.md:148-158`, and only the report evidences it.
   - One prose defect sits in the section's proof sentence, which is outside this claim: finding F1.

4. **CONFIRMED.** Attack: I reran the brief's grep and a wider one (`partial (loads|sits|follows)|at the barrel|loads (after|before|first|directly)`).
   - The only hits are `guides/veneer.md:155`, which is the § Styles home, and `:182`, which is the utility-escape line.
   - The home at `:154-158` links the conformance proof. `/home/user/veneer-cg/src/styles/index.scss:55-62` matches the release order with validation last. The case is `describe('Bootstrap source order')` at `tests/conformance.test.ts:318-324`.
   - The tie consequences are kept and point at § Styles: floating at `:1337-1340`, input group at `:1414-1417`.
   - The select's "loads after the validation partial" sentence is gone (`:1118-1125`).

5. **CONFIRMED.** Attack: I checked the table's framing, the registry link, and whether the parity case can fail.
   - The stem rule stays at `guides/veneer.md:4059-4066`. The intro sentence and the registry link are at `:4074-4076`. The table has the three frame kinds: `capped-container`, `primary-hover`, and `showcase` (`:4078-4082`).
   - The case reads `files[GUIDE_SPEC]` through `selectSectionBlocks`, `findColumnIndex`, `selectTableColumns`, and `readTableCells`. The last of these flattens a code span to its token (`tests/setupStyles.ts:1001-1014`).
   - Mutation 1: rename `primary-hover` in `tests/setup.ts`. `guides.test.ts:81` reddens.
   - Mutation 2: change that key's subject. `:82` reddens.
   - Mutation 3: drop the table or its `Veneer stem` header. `:75` reddens. An empty table reddens `:79`.
   - The assertions tell each mutation apart from the passing case. The red runs are recorded at `close-guide-report.md:161-172`, and only the report evidences them.

6. **CONFIRMED.** `guides/veneer.md:160-167` is one paragraph naming the `[hidden]` rule, the calendar-picker rule, and the color swatch rules, and the repeated fragment is gone. Attack: I searched `:149-185` for a second mid-sentence fragment and found none.

7. **CONFIRMED on substance.** Attack: I reran the pattern over the worktree guide.
   - Coverage: the verb form and the comma form, over prose lines not starting with `|`, matched line by line rather than block-joined, over `/home/user/veneer-cg/guides/veneer.md` only.
   - Verb-form hits are at `:756, 776, 1533, 1569, 1613, 1641, 1822, 1890, 1958, 1972, 2037, 2204, 2263`. Each is a row ruled permitted in `close-guide-sweep.md`, for example rows 78, 84, 210, 221, 227, 230, 263, 296, 328, 330, 398, 453, and 459.
   - I checked the comma-form hits against the ledger at `:183` through `:4030`, and every one is a permitted row.
   - The link rerun found no prose link lacking `see` except the `and [...]` continuation at `:4161`, which the ledger's pattern excludes.
   - Some ledger labels fall outside R7's closed set. See referral (c).

8. **CONFIRMED.**
   - The delta's prose states no count. My banned-term sweep of the added lines (`should|simply|easy|just|currently|now|new|latest|via|once|since|above|below|ensure|guarantee|etc.|e.g.|i.e.`, case-insensitive) found only spatial senses, at `cg.diff:635, 952, 1407-1409, 1634`.
   - The new rule sentences follow each code token with a noun, or use a permitted CSS token.
   - The added cases contain no `any`, no `as`, no `!`, no suppression, and no mock. Their callbacks are passed directly. They use installed `readRules`, `stageMedia`, `releaseMedia`, and the existing readers. `querySelector<HTMLElement>` is the tree's established idiom and is not an assertion.
   - The report records each criterion's command and exit, and the landed sentences (`close-guide-report.md:131-141, 175-221`).
   - One token is followed by the wrong noun: finding F2.

## Findings outside the claims

**F1: § Customization claims a range-thumb reading that § Form range classes says does not exist.**
- **Where:** `/home/user/veneer-cg/guides/veneer.md:2243-2248` says the recipe proof "reads … each palette paint the recipe leaves in place: … the range thumb". `:1318-1320` says the thumb's "geometry, paint, and transition have no resolved reading".
- **What the proof does:** it reads the thumb rule's declared value out of the CSSOM and resolves it on a stand-in `#thumb` element (`/home/user/veneer-cg/tests/src/styles/integration.test.ts:101-109`).
- **Why it matters:** everywhere else the guide separates a resolved reading from declaration or compiled-contract evidence (`:1099-1101`, `:1324-1326`, `:1399-1400`). The unit's new sentence drops that distinction, and two sections now contradict each other for any reader who compares them.
- **Fix:** qualify the item, for example "the range thumb rule's declared paint, resolved on a stand-in element because Chromium withholds the part's computed style". Keep the other items as they are.

**F2: the § Departures sweep fix calls a departure kind a "value", in a sentence about CSS values.**
- **Where:** `/home/user/veneer-cg/guides/veneer.md:2268-2274` reads "the `tokenized` value routes the release value…", "the `dropped` value writes no declaration at all", and "the `declared` value writes the value in a form or at a value…".
- **Why it matters:** one sentence now uses "value" for both the `Departure` cell's kind and the CSS value. A cell value also cannot route or write anything. The next sentence calls the same tokens a "`declared` row" and a "`dropped` row", so one concept has two terms in one paragraph. The pre-sweep sentence was clearer, so the fix reduced clarity.
- **Fix:** use one noun that names the row, for example "a `tokenized` row routes the release value through a Veneer token, an `aliased` row reads…, a `fallback` row keeps…, a `dropped` row writes no declaration at all, and a `declared` row writes the value in a form or at a value the other members do not name". This agrees with the next sentence's "`declared` row". Change no table cell.

## Attacked and held

- **Rule sentences:** the § Styles home, the § Showcase order rule, the § Customization bound, and the three section sentences are in the guide's voice. They use `see` links whose titles match the guide's existing link titles (`:158` = `:4158`, `:3999` = `:4047`).
- **Rewrap:** I found no code span split across lines in the rewritten paragraphs. Link text split across lines (`:1020-1021`, `:1317-1318`) is valid Markdown and renders correctly.
- **Stem-table case placement:** the case finds the table by section and column rather than through `selectSubsectionTables`. That reader requires a level-3 heading (`tests/setupStyles.ts:941-978`), and the stem table sits directly under `## Tests`. Inlining the lookup here is correct, not duplication.
- **Tie wording:** "tie on one property" (`:1338`) and "carry the same specificity" (`:1415`) are two phrasings of one concept. The second is pre-existing, so it is not a finding.

## Referrals

- **(a) To the Orchestrator (brief wording):** "one per section" in the order rule (`guides/veneer.md:3998-3999`) can mean guide sections, which the same delta calls "sections" at `:2215`. It can also mean the HTML `section` elements the regions mount as. It is true only of the `*Section` classes, which the guide excludes from its published tables. The claim prescribed the phrase. Consider "one per showcase section class", or drop it.
- **(b) To the Orchestrator (brief wording):** the Form label region's specimen paragraph (`:4035-4037`) is kept, as prescribed, but now stands alone after the grow-spinner paragraph. The Close region's equivalent moved to its key's section (`:1705-1706`). One kind of fact now has two homes because the brief gave two instructions. Choose one home.
- **(c) To the objective lane:** some sweep-ledger ruling labels fall outside R7's closed set:
  - "permitted as a CSS declaration" (`close-guide-sweep.md` rows 202, 532, 534);
  - "permitted as a table cell" for a hit in prose (row 265, `guides/veneer.md:1841`);
  - `[multiple]`, ruled permitted and then edited away (row 135).

  The substance holds. Rule on literal set conformance.
- **(d) To the objective lane:** every gate exit and every red-then-green run rests only on the writer's report. Take the executed runs.
- **(e) To the objective lane:** the stem table's `Frame` cells (`:4080-4082`) state the frame kind as prose that no gate checks.
- **(f) To the Orchestrator, naming:** the recipe case title says "every paint on the release blue", but its population is a fixed list of the paints the case reads. The close focus shadow is on the release blue and is not read.
- **(g) To the Orchestrator, dispatch and retention:**
  - This brief cites terrain § 4, the driven-key lists. The sections that apply are §§ 1, 2, 3, 5, and 7.
  - The retained report still names launch paths `tmp/units/cg-report.md` and `tmp/units/cg-sweep.md` (`close-guide-report.md:18-19, 122`) rather than `close-guide-sweep.md`.
  - The report's instruments (`sweep.py`, `rule.py`, `classify.py`, `ledger.py`, `split.awk`, `reflow.py`, `rep.py`) sit only in the scratchpad and are not retained.

VERDICT: FAIL none; outside the claims: F1, F2
