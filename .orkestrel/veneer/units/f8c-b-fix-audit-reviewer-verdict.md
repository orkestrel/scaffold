# F8c-B MOVE fix rounds 2 to 4 — `reviewer` on Opus 5.5, subjective lane

Claims: `f8c-b-2-audit-claims.md` plus the round 3 and 4 passages (`f8c-b-brief-3.md`, `f8c-b-brief-4.md`, `f8c-b-report-3.md`, `f8c-b-report-4.md`). Evidence: `f8c-b-4.diff`, `f8c-b-4-status.txt`, `f8c-b-1.diff`, `f8c-b-2-report.md`, the worktree `/home/user/veneer-f8b`. Read-only; nothing ran (the lane reported claim 11's `npm run check` as a dispatch defect for its allowlist); blind to the analyst lane.

Lane: `reviewer` on Opus 5.5, subjective lane, on the F8c-B fix rounds 2, 3, and 4 in the `/home/user/veneer-f8b` worktree. Evidence used: `f8c-b-4.diff`, `f8c-b-4-status.txt`, `f8c-b-1.diff`, `f8c-b-2-report.md`, `f8c-b-brief-3.md`, `f8c-b-brief-4.md`, `f8c-b-report-3.md`, `f8c-b-report-4.md`, and the live files in the worktree.

**Dispatch defect:** claim 11 tells this lane to run `npm run check`. The `reviewer` role has no shell, so I ran nothing.

**Line references:** they are approximate. Find each site by the symbol, case, or sentence named beside it.

## Numbered verdicts

1. **CONFIRMED.**
   - **Where:** the `keeps an important shared declaration whatever the recipe withholds` case in `/home/user/veneer-f8b/tests/service/tailwind/consumer.test.ts` (around lines 170–218), and `/home/user/veneer-f8b/guides/veneer.md` around lines 391–393.
   - **Why "the cascade and the plant alone" is true:**
     - The first reading comes after `stage.mount` and `stage.load(planted)` (around line 195) and before `stage.load(instrumentProfile)`.
     - The `afterEach` hook calls `stage.clear`, which leaves only the linked cascade, so "alone" holds.
     - `properties` is built from `stage.expand(instrumentProfile)`, filtered to rules whose selector classes fall in the branch (around lines 184–193). That matches "for every property that rule declares".
     - The guide and the comment at around line 202 say the same thing.
   - **Mutation I named:** move `stage.load(planted)` after the first reading. The baseline then reads `grid-column-start: auto` and the second reading reads `5`. The case reddens with `auto became 5`, so "and the plant" is the load-bearing wording.
   - **Attack that failed:** reading the sentence as a cascade-only baseline.

2. **CONFIRMED.**
   - **Where:** the § Files rows at `guides/veneer.md` around lines 262–263, and § Scripts around lines 637–657.
   - **Result:** the `tests/setupService.ts` row uses the colon-and-semicolon grammar. The `tests/setupServer.ts` row reads "the installed and built cascades and the guide". § Scripts reads "the `prepublishOnly` chain runs it" and "before the `test:service` script". Neither row has a bare code token, a banned term, or a count.
   - **Attacks that failed:**
     - Bare command tokens as objects (`names \`npm run build:src:styles\``). This follows the canon's own "Run `npm run …`" form.
     - The `tests/setupServer.ts` row's comma series. It parses on a first read.
   - The "pinned browser" wording is carried by F3.

3. **CONFIRMED.**
   - **Mutation I named:** the R1 plant, `color: rgb(1, 2, 3) !important` on `.col-1`. `color` is a longhand that Tailwind's `.col-1` rule does not declare, so this plant is also the plant the claim's second question asks about.
   - **Why the assertion distinguishes it:**
     - The comparison (around lines 207–217) walks only `properties`, which is `grid-column-start` and `grid-column-end` from the expanded instrument.
     - Under R1 the baseline `grid-column-start` is Veneer's normal `auto`, and after the instrument loads it is `1`. The list is non-empty, so the case fails.
     - Under the passing plant, `grid-column-start: 5 !important` holds 5 in both readings, and `grid-column-end` stays `auto` in both.
   - **Corroboration:** the writer's log, `…/scratchpad/f8cb2-mutations.log.txt` lines 1–6, shows `[ 'grid-column-start: auto became 1' ]` and matching SHA-256 values before and after.
   - **Consequence:** `expect(branch).toContain('col-1')` still holds under R1, because the importance reading works per class name. That is F1.

4. **UNRESOLVED.**
   - **Citation choice:** whether the brief's original citations were wrong rests only on the writer's quote in the round-2 report, § Deviations 1. The sandbox has no network.
   - **Settles it:** fetch `https://www.w3.org/TR/css-cascade-5/#at-import` and `#layer-empty`, and confirm that CSS Syntax Level 3 has no `@import` section.
   - **Paraphrase against the quote:** the guide sentence at around lines 316–317 ("valid only ahead of every rule other than `@charset` and `@layer` statements") drops the quote's qualifier "all other *valid* at-rules". That matters for the paragraph's own example. To a browser, a `@source` rule is an unknown at-rule, which might not end the import block, so the consequence sentence at around lines 319–321 might describe the `postcss-import` plugin's behaviour rather than the spec's. Referred as R-a.
   - **Link text:** it follows `writing.md` (introduced by "see", with the destination's titles).

5. **CONFIRMED.**
   - **Where:** `TAILWIND_PATHS` in `/home/user/veneer-f8b/tests/setupService.ts` (around lines 69–87), `readVeneerGuide` in `/home/user/veneer-f8b/tests/setupServer.ts` (around lines 1164–1180), and the proofs `TAILWIND_PATHS › locates each…` in `setupService.test.ts` and `server setup › reads the Veneer guide anchored…` in `setupServer.test.ts`.
   - **The `tailwind` key:** it is the same defect. `tests/setup.css` was the literal repeated in `profiles.test.ts` and in the `CANDIDATE_FLOOR` case.
   - **Key vocabulary:** it matches the guide. `tailwind` and `preflight` are profile names, and `instrument` is the guide's own word for the `unexcluded.css` file. Every key is one word.
   - **Absolute paths:** they are what `compileProfile`'s `from` needs. A relative `from` resolves against the working directory, which is the same defect `readVeneerGuide` removes.
   - **Mutations I named:**
     - `consumer` pointed at `unexcluded.css`. The pinned relative-path list changes, so the case reddens (log line 27).
     - The guide loader reading relative to the working directory under `process.chdir`. It throws `ENOENT` (log line 38).
   - **Rival reading that passes, correctly:** a loader anchored some other valid way, such as a `new URL` import.

6. **CONFIRMED.**
   - **Where:** `profiles.test.ts` around lines 36–43 and 111–113, and `guides/veneer.md` around lines 306–309.
   - **Result:** the guide adds one sentence that states the limit. The test comment says the proof "assumes" the sequence. The guide says the proof "fixes" it, which is accurate because the profiles proof builds `${cascade}\n${compiled}` itself.
   - **No stage member is added:** no `StageManager` member hunk appears anywhere in `f8c-b-4.diff`.

7. **CONFIRMED.**
   - **Where:** `setupServer.ts` around lines 1697–1698.
   - **Result:** only the `@param source` lines of `collectInlineSources` changed (diff hunk `@@ -1675,8 +1694,8`). The new wording matches how the proofs call it: a file read, and joined fences.

8. **CONFIRMED.**
   - **Search:** the Grep tool with `candidates\.txt|CANDIDATES_PATH`, glob `{tests,configs,src,app}/**`, over `/home/user/veneer-f8b`.
   - **Result:** it returns the declaration and the one write (`setupService.ts:67` and `setupService.ts:274–276`), the four `setupService.test.ts` hits (lines 14, 31, 199, and 264, all reads), and the `@source` reads (`tests/setup.css:13`, `fixtures/tailwind/preflight.css:5`, `fixtures/tailwind/unexcluded.css:7`). Nothing else.

9. **BROKEN**, on "every added guide sentence follows `writing.md`".
   - **Failing sentence from round 1:** `guides/veneer.md` around line 411, "…and `npm test` does not." A bare code token is the clause subject. See F3.
   - **Failing sentence rewritten in round 4:** around line 363, "moves `.col-1`'s `grid-column-start`". That is a possessive code token, which `writing.md` § Code tokens bans outright.
   - **Smallest fix:** see F2 and F3.
   - **Mechanical items:** in the added TypeScript I read no `any`, no `as`, no `!`, no suppression, no nested named function, and no mutable interface member, and `endpoint` is one word. The objective lane owns ruling on those.

10. **CONFIRMED.**
    - **Status:** the status file is the round-1 set plus `tests/setupServer.ts` and `tests/setupServer.test.ts`. Rounds 3 and 4 touched only `guides/veneer.md` and `tests/setupService.ts`, both already in the set. The `tmp/probe/` directory is absent (Glob returned nothing). No vendored file is touched.
    - **Claim wording:** "one-row fix" is inaccurate. Round 1 changed two `ROADMAP.md` rows: the mirror-law ledger row and the F8 TAILWIND row. Both are byte-identical in `f8c-b-1.diff` and `f8c-b-4.diff`, so nothing moved after round 1.
    - **The observation is a defect.**
      - `readCompatibility`, `readDeferrals`, `readDepartures`, and `readAdditions` default to `resolve(WORKSPACE_ROOT, 'guides/veneer.md')` (`setupServer.ts` around lines 935, 992, 1037, and 1112). That module already imports `VENEER_GUIDE_PATH` at line 37.
      - `setupStyles.test.ts` reads `VENEER_GUIDE_PATH` relative to the working directory at around lines 1321, 1468, 1551, and 1565. That is the exact defect `readVeneerGuide` removes.
    - **Smallest fix for the carrier:**
      - Change the four defaults to `resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH)`.
      - Replace the four `readFileSync(VENEER_GUIDE_PATH, 'utf8')` calls with `readVeneerGuide()`.
      - Also check `tests/guides.test.ts:16` (`GUIDE_SPEC = 'guides/veneer.md'`), a third copy the report does not name. It might be an input the `GuideCommand` class requires, so check that before replacing it.

11. **UNRESOLVED.** The only evidence is the writer's report. The Orchestrator's independent chain at the F8c landing settles it, and this lane cannot run `npm run check` (see the dispatch defect).

## Findings outside the claims

**F1. The importance rule is stated per class name, but the R1 run shows importance works per declaration. The suite has no green state for a partly important shared name.**
- **Sites:** `guides/veneer.md` around lines 370–374 ("A shared name Veneer ships with its `!important` declaration wins by importance whatever the layer order") and around lines 387–389 ("a name Veneer starts declaring with `!important` leaves it"); `collectImportantNames` in `setupServer.ts` around lines 1672–1686; the equality in the `derives the shared class names…` case of `consumer.test.ts` around line 126.
- **Failing input:** a release ships the R1 plant as a real rule, `@layer components { .col-1 { color: rgb(1, 2, 3) !important } }`.
  - `collectImportantNames` then reports `col-1`, so the equality requires `col-1` off the exclusion line, and the guide tells the maintainer the same.
  - With `col-1` off the line, Tailwind's `.col-1` rule moves `grid-column-start` from `auto` to `1`. That is the R1 reading, and it breaks the guide's own sentence at around lines 359–360: "every element carrying a shared class name resolves exactly what the shipped cascade alone resolves".
  - Keeping `col-1` on the line reddens the equality instead.
- **Why it matters:**
  - Round 2 narrowed the branch reading to Tailwind's longhands, so the proof reads per property. The rule sentence and the equality still read per name, so the prose now teaches consumers a rule that the proof beside it contradicts.
  - The defect is latent (guide around line 390: no shipped shared name is important). It is still exactly the half of the rule this branch exists to prove.
- **What right looks like:** state the rule per property. A shared name leaves the line only where Veneer declares with `!important` every longhand that Tailwind's rule for that name declares. Apply that wording at both guide sites and in the `collectImportantNames` doc block. The code half is referred as R-b.

**F2. Rounds 3 and 4 did not close the bare-code-token-subject class across the scope they claimed to sweep, and a banned possessive remains.**
- **Scope claimed:** brief 4 states that the whole `### Tailwind` section and the whole `tests/setupService.ts` file were swept. The same class survives in both. Each site, with its fix:

| Site | Present text | Fix |
| --- | --- | --- |
| Guide, around line 314 | "`@source './src'` is the line you change" | "the `@source './src'` line is the one you change" |
| Guide, around line 350 | "— `@source './markup.html';` names the markup fixture" | "— its `@source './markup.html';` line names the markup fixture" |
| Guide, around line 360 | "and `px-8` moves the button's padding" | "and the `px-8` utility moves the button's padding" |
| Guide, around line 363 | "`.col-1`'s `grid-column-start`" (possessive, banned outright) | "the `grid-column-start` property of the `.col-1` element" |
| `READINESS_INPUT` remarks | "`source(none)` keeps the compiler from scanning" | "The `source(none)` argument keeps…" |
| `resolveBrowserTarget` `@param options` | "as `resolveBrowser` in `configs/browsers.ts` returns them" | "as the `resolveBrowser` function in the `configs/browsers.ts` file returns them" |
| `importCompiler` `@returns` | "The plugin creator `@tailwindcss/postcss` exports" | "The plugin creator the `@tailwindcss/postcss` package exports" |
| `compileProfile` remarks | "every relative `@import` and `@source` in the profile resolves" | "every relative `@import` rule and `@source` rule…" |
| `StageManager.open` `@throws` | "anything an earlier `open` acquired" | "anything an earlier `open` call acquired" |
| `StageManager.expand` remarks | "so `border: 0 solid` reports the width" | "so an authored `border: 0 solid` declaration reports…" |

- **Round 4 missed one in its own block:** it fixed `resolveBrowser` three lines further into the same `resolveBrowserTarget` doc block and missed the `@param` line.
- **Optional, same pattern round 4 used:** around guide line 399, "The instrument `tests/fixtures/tailwind/unexcluded.css`" can become "The `tests/fixtures/tailwind/unexcluded.css` instrument".
- **Why it matters:** the round records the class as closed while it is still present in the subject. A later sweep finds it again, one door at a time.

**F3. The § Tailwind readiness paragraph drifts from § Scripts and § Files, which describe the same facts.**
- **Site:** `guides/veneer.md` around lines 407–411.
  - "The `prepublishOnly` script runs it, and `npm test` does not." The "it" can attach to either command in the preceding sentence, and `npm test` is a bare subject.
  - "script" names what § Scripts, after the round-2 fix, calls "the `prepublishOnly` chain".
  - This paragraph and § Scripts say "the pinned Chromium", while the `tests/setupService.ts` § Files row lists the same readiness gate as "the pinned browser".
- **Why it matters:** round 2 fixed this wording in § Scripts and did not carry it to the sibling sentence. That breaks "one concept, one term" and the `writing.md` pronoun rule.
- **What right looks like:**
  - Rewrite the sentence as "The `prepublishOnly` chain runs the `test:service` script, and the `test` script does not."
  - Make the § Files row read "the pinned Chromium".

**F4. A sentence opens in lowercase with link text as its subject.**
- **Site:** `guides/veneer.md` around line 299, "[stylesheet profiles](../tests/service/tailwind/profiles.test.ts) reads that difference." This text predates round 1, which changed only the path.
- **Rule:** `writing.md` § Code tokens, references, and links wants link text introduced by "see".
- **What right looks like:** "The stylesheet profiles proof reads that difference; see [stylesheet profiles](../tests/service/tailwind/profiles.test.ts)."

## Attacked and held

- **Adjacent behaviour that is correct:**
  - The `consumer.test.ts` attribute selector `[class~="${name}"]` needs no escape.
  - The ragged rewrap from round 4 (guide around lines 349–364 and 376–381) is formatter-clean and breaks no rule.
  - "today" in the importance-case comment of `consumer.test.ts` is not a registered term.
  - The inventory case names, the `endpoint` member name, and the `readVeneerGuide` `{verb}{Noun}` form hold.
- **Attacks that failed:**
  - On claim 5: a wrong-key vocabulary reading of `instrument` and `tailwind`.
  - On claim 6: a guide-comment verb mismatch, "fixes" against "assumes".

## Referrals

- **R-a (objective lane):** does a `@source` rule count as a "valid at-rule" under Cascade 5 § Importing Style Sheets? If it does not, the guide's "because" clause and its consequence sentence (around lines 316–321) attribute the `postcss-import` plugin's behaviour to the spec. The honest wording would name the plugin's own rule instead. Settles it: the spec text plus a `postcss-import` run with `@source` ahead of `@import`.
- **R-b (objective lane):** should `collectImportantNames`, or the equality in `derives the shared class names…`, compute importance over the longhands Tailwind's rule declares (for example through `stage.expand`), so that the equality and the branch case enforce the same rule (F1)?
- **R-c (Orchestrator):** the F2 class also appears in `setupServer.ts` doc text that was accepted at the F8c-A checkpoint, not written by this unit:
  - the `SheetReader` remarks: "so `@layer outer { @layer inner { … } }` reads as…"
  - the `SheetReader.statement` remarks: "{@link SheetReader.order} answers…"
  - the `SheetReader.declarations` remarks: "so `.container { @media … }` reports `max-width`"
  - The Orchestrator decides whether a carrier takes these sites.
- **R-d (Orchestrator):** `guides/veneer.md` around line 419 runs past 100 columns ("…before and after the profile loads. Each property Veneer's own rules declare for"). Round 1 introduced it. The same round-4 standing condition that rewrapped other paragraphs applies to it.

VERDICT: FAIL 4, 9, 11; outside the claims: F1, F2, F3, F4
