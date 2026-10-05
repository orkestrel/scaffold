# Tailwind completion checklist

The Tailwind track is not complete on 2026-10-05. 136 verified audit items stay open. They reduce to 13 units, 21 lines for the user's defaults message, 1 question, 9 later items, and 26 record fixes.

Read the checklist with the following facts:

- The token units landed on veneer `main` at `4d21de7` on 2026-10-05 (`RECORDS/lanes.md:76-81`). Group 1 holds the units the records placed at or before that landing that the landing did not run. They run first.
- The journey tuning unit is still running.
  - Every command that launches Chromium or loads the CPU runs through the `flock /home/user/.wave/journey.lock` queue (`RECORDS/lanes.md:40`).
  - This checklist runs beside that unit as read-only or Node-gated work (`RECORDS/lanes.md:74`).
  - The journey verdict names these files: `tests/setupBrowser.ts`, `tests/setupStyles.ts`, `tests/setup.ts`, `tests/app/browser/integration.test.ts`, and the guide lines `:2140`, `:2174-2175`, and `:2578` (`RECORDS/showcase/journey-cost-2026-10-05/verdict.md:41-57`). A unit that writes one of them waits for the journey unit's landing.
- The computed task carried only 26 of the 136 open items and stops inside FV-X9.
  - The other 110 come from the verify results in the workflow journal `/root/.claude/projects/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/subagents/workflows/wf_99f2df4c-c24/journal.jsonl`.
  - The 53 items the verify pass closed are left out.
- Veneer lines are read at `4d21de7` (`main` and `origin/main`, clean tree). Record lines are read at scaffold `886d5a67`.
  - Where a sweep citation moved, the line cites the current one.
  - The T4 worktree `/home/user/.wave/veneer-t4` no longer exists, and its text is in `4d21de7`.
- Each line ends with tags that name the sweep and its item id: `flip`, `token`, `lanes`, `units`, and `tree`. The same id can name different items in different sweeps, so lanes TW-08 and tree TW-08 are two items.

Paths use three prefixes: `RECORDS` is `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer`, `VENEER` is `/home/user/veneer`, and `SCAFFOLD` is `/home/user/scaffold`.

## 1. Units the records placed before the token landing

The landing ran 16 gates and none of the following work (`RECORDS/tailwind-flip/units/tokens-landing/gates-4d21de7.txt:1-45`). Run these three units first, in order.

1. **The packed `./tailwindcss/scss` export case.**
   - Source: `RECORDS/tailwind-flip/design-verdict.md:52`; `RECORDS/tailwind-flip/units/flip-records/last.md:71` ("packed Sass assertion pending").
   - Scope: add two cases to the `packed Tailwind recipe` describe (`VENEER/tests/distribution.test.ts:875`) that mirror the Bootstrap pair.
     - One builds the bare `@use '@orkestrel/veneer/tailwindcss/scss'` form that the guide prints (`VENEER/guides/veneer.md:1244`) through Vite, as `distribution.test.ts:832` does.
     - The other compiles the `pkg:` form through `NodePackageImporter`, as `:855` does.
     - Both must equal the packed `dist/src/tailwindcss/index.css` after one round trip with the `/*$vite$:1*/` marker stripped (`VENEER/tests/conformance.test.ts:1655-1658`). Each has a planted-rule control.
   - Also correct the skip reason at `distribution.test.ts:990-992`. The `PING` command (`:65`) runs with `--loglevel=silent`, which hides the refusal from veneer's `devEngines` npm floor (`VENEER/package.json:158-164`). The skip message therefore blames a registry that does answer.
   - [flip FV-X3; units packed-scss-distribution (case half)]
2. **The full-suite reading on the landed tree.**
   - Source: `RECORDS/tailwind-flip/design-verdict.md:104` (U8 lists `npm test`); `RECORDS/lanes.md:93` ("The full suite runs at the token landing"). The landing record holds no such run (`gates-4d21de7.txt:1-32`). The last bare `npm test` and distribution run is stage A on 2026-10-03 (`RECORDS/lanes.md:379`).
   - Scope: on the commit that carries unit 1, inside the queue, with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`:
     - Run bare each script that only the `npm test` script reaches: the `src:core` and `app:core` projects, `test:src:styles`, `test:src:vue`, `test:app:vue`, `test:journey:vue`, and `test:config`.
     - Then run `npm run test:distribution` bare.
     - Read every failure against § Host-bound set (`RECORDS/lanes.md:54-60`). A failure outside that set blocks stage B.
     - Record the counts, and the packed recipe case by title, in a lanes entry and in a gate file under `RECORDS/tailwind-flip/units/tokens-landing/`. Then cite that run from the packed-install claim at `VENEER/ROADMAP.md:143`.
   - This run also backs the Vue claim of § 10 item 12 and the packed proof of item 10.
   - Rule: a bare `npm test` alone is refused, because its `&&` chain (`VENEER/package.json:86`) stops at the six host-bound `src:browser` failures (`:88`). The sweep's "before the merge to `main`" timing has passed.
   - [flip FV-X2; flip FV-O1; flip FV-D12 (Vue half); flip FV-D10 (packed half); units npm-test-whole; units packed-scss-distribution (run half); lanes TW-10]
3. **One falsify round over the token round as landed, then one fix unit.**
   - Source: `SCAFFOLD/.agents/orchestration.md:57` (a large change closes with one `orkestrel-falsify` round on the integrated result); `RECORDS/tailwind-flip/tokens/design-verdict.md:159-168` (the unit list stops at T4).
   - Scope: number the claims in three sets.
     - T1's mechanism: the `$palette` and `$scale` switches, the `swatch` and `measure` functions, the edit over 571 sites, and the writer.
     - T2's Chromium proofs: the derivation through `substituteTokens`, the relation case, the infix case, and the RFS cap case.
     - The three open risks of § 11 (`design-verdict.md:190`).
   - Re-audit only the claims that T3's and T4's refuter reviews repaired (`RECORDS/lanes.md:86`, `:99`; `orchestration.md:60`).
   - Give each lane an engine that did not write its claims. Opus attacks T1 to T3, which Astra wrote. Astra attacks T4, which Opus wrote.
   - Run every Chromium reading through the queue.
   - Record the Orchestrator's ruling that the round completes the audit step the size gate requires and that the token round skipped, and that it does not reopen an accepted criterion (`orchestration.md:167`).
   - One fix unit follows before stage B.
   - Rule: lanes TW-08's whole-tree claim list is narrowed to tree TW-13's, because T3 and T4 already had refuter reviews.
   - [lanes TW-08; tree TW-13]

## 2. Units after the landing and before stage B

The journey tuning unit runs throughout. Units 2 to 5 run beside it, because they write files its verdict does not name. Units 6 to 10 wait for its landing.

1. **The journey run-cost tuning unit (in flight).**
   - Source:
     - `RECORDS/showcase/journey-cost-2026-10-05/verdict.md:11-13` (ruled at scaffold `6c62f0c7`).
     - `RECORDS/lanes.md:64-74` (Q1 ruled yes; lane M running).
     - `RECORDS/tailwind-flip/tokens/design-verdict.md:183` (M6's figure). The 817 s journey at the landing exceeds it (`gates-4d21de7.txt:30`).
   - Scope: the verdict's items and lanes, plus three additions.
     - Lane M's record (`verdict.md:180`, step 14) attributes the growth from the 591.13 s run by case. It compares J-B0's per-case durations with `journey-4.json` and cites P-A's split of the preservation controls and the three partitions per width.
     - The frozen reduction R in `RECORDS/lanes.md` stands as the recorded budget that closes M6. Plan v3's best model leaves the journey near 615 to 640 s (`RECORDS/showcase/journey-cost-2026-10-05/plan-v3.md:20-21`).
     - At the landing, `VENEER/ROADMAP.md:175` changes from future work to the landed result.
   - The 15 s `setup:browser` stall rides on item 9 (`verdict.md:50`), but nothing shows that item 9 fixes it. The landing read 156 passed (`gates-4d21de7.txt:42`). A recurrence blocks a landing, because § Host-bound set names no `setup:browser` title (`RECORDS/lanes.md:60`).
   - Rule:
     - An ablation that strips controls is refused, because the no-proof-loss rule (`verdict.md:15-27`) already supplies J-B0 and P-A as the instruments.
     - Observer repairs stay out of this unit (see unit 6).
     - "L-3" is not this unit's name in the records.
   - [flip FV-X16; token L-3; token O11-M6; lanes TW-12; lanes TW-09 (stall half); units journey-tuning; tree TW-28]
2. **The cross-face Sass load case.**
   - Source: `RECORDS/tailwind-flip/design-verdict.md:117` (§ 10 item 1: "pin the first with a policy case that finds no other cross-face import").
   - Scope: a Node case in `VENEER/tests/conformance.test.ts`. It does not go in the policy files, because `tests/policy.test.ts` and `tests/setupPolicy.ts` are byte-equal to the scaffold-owned copies under `VENEER/node_modules/@orkestrel/scaffold/dist/host/tests/`.
     - The case reads every `@use`, `@forward`, `@import`, and `meta.load-css()` call and every TypeScript import under `src/bootstrap`, `src/tailwindcss`, and `src/styles`.
     - It admits only the `src/tailwindcss` loads of the `src/bootstrap` partials at `VENEER/src/tailwindcss/index.scss:2-5` and `VENEER/src/tailwindcss/_tokens.scss:422`.
     - It covers the barrel `../` star export that the TypeScript rules admit (`VENEER/.oxlintrc.json:238`, `:430`).
   - Controls:
     - A planted `@use '../tailwindcss/tokens'` and a planted `@forward '../bootstrap/mixins'` in `src/styles`.
     - A planted `import '../bootstrap/sheet.js'` in `src/tailwindcss`.
     - A planted `@use '../../tailwindcss/mixins'` in a `src/bootstrap` partial. That load emits no CSS, so no output pin can see it.
   - Rule: a case that admits only `_tokens.scss` is refused, because it fails the shipped `index.scss`.
   - [flip FV-X1; flip FV-R4 (pin half); lanes TW-14; units cross-face-policy; tree TW-18]
3. **The guide case-title gate.**
   - Source: `RECORDS/tailwind-flip/design-verdict.md:103` (U7's acceptance: every backticked case title resolves); `RECORDS/tailwind-flip/units/flip-guide/last.md:8`.
   - Scope: a case in `VENEER/tests/guides.test.ts`.
     - It resolves every span the guide cites as a case against the test titles under `tests/`. A span counts as a case citation when `case` or `cases` follows it, or when it sits in a Case column.
     - `%s`, `$name`, and `${...}` match any text.
     - Its control is a planted unresolved title. A CSS-value span is the negative control.
   - The ignored resolver (`VENEER/tmp/flip-guide/resolve.ts`) flags 48 spans that are not titles at `4d21de7`, as the verify pass read it, so it cannot gate as written.
   - The six truncated citations are already fixed at `4d21de7`.
   - [flip FV-X13; units guide-titles]
4. **The token proof residues.**
   - Source:
     - `RECORDS/tailwind-flip/tokens/design-verdict.md:124`: the palette case computes the base rule "through the `contrastColor` twin".
     - `RECORDS/tailwind-flip/tokens/rulings.md:23`: ramp's scale controls.
     - `VENEER/tests/src/tailwindcss/index.test.ts:81`, `:128` and `VENEER/tests/conformance.test.ts:1564`: unit scratch paths inside tracked cases.
   - Scope:
     - The palette case (`conformance.test.ts:1426-1470`) computes Bootstrap's text choice through a TypeScript `contrastColor` twin. Under identity rows, the same change fails a case (`RECORDS/tailwind-flip/tokens/design/judge-mechanism.md:84`, `:128`).
     - The derivation case's control loop (`index.test.ts:433-444`) gains ramp's two scale controls: one extra changed `--bs-gutter-x`, and one `xl` rule left at `1200px`. Each reads as a sequence that differs from the expected one.
     - The tracked cases stop writing under `tmp/units/tokens-t1` and `tmp/units/tokens-t2`. They log through `console.info` or a scratch path the test owns, and the conformance case takes the default parent of the `createScratch` helper.
     - Every control stays.
   - Rule: the "consumer-theme unit" the sweep names does not exist (the consumer theme case landed at `VENEER/tests/guides.test.ts:174`), so these items ride one Node-gated unit.
   - [token U8-T1; token R-F (finding 12 half); units tests-unit-paths]
5. **The consumer rows with their cases.**
   - Source:
     - `RECORDS/tailwind-flip/design-verdict.md:38`, `:47`.
     - `RECORDS/tailwind-flip/units/flip-guide/last.md:9`.
     - `RECORDS/lanes.md:241`: all five § 2 rows were sent to the fix unit.
     - `RECORDS/tailwind-flip/units/flip-fix-a/brief.md:52-55`: fix A took only three of them.
   - Scope:
     - Add two readings in `VENEER/tests/integration.test.ts`. Under the tuned sheet alone, a shared name such as `mt-3` reads no rule, and the CSSOM holds no `@source` rule. That row also cites the bare `h1` reboot reading at `:384`.
     - Under the tuned sheet beside `recipeRecord.unexcluded`, `.collapse.show` reads `visibility: collapse`. This extends `:385`.
     - The recipe is the control for both readings.
     - The guide gains the "Tailwind absent, `./tailwindcss` linked alone" row (marked unsupported) and the linked-beside row, each citing its case. The sentence at `VENEER/guides/veneer.md:1236-1239` cites them too.
     - The `h5.modal-title` row names `h1.modal-title.fs-5` and cites the caption case. The `TAILWIND_READINGS` rows read `<h1 class="modal-title fs-5">` (`VENEER/tests/setupBrowser.ts:683-694`; `VENEER/app/browser/sections/tailwindcss.html:224`), where Bootstrap's unlayered important `.fs-5` sets 20px under every face.
     - The sentence at `VENEER/guides/veneer.md:2037` names the composition the preflight case actually reads (`tuned` with `recipeRecord.unexcluded`, `integration.test.ts:385`), not the `unexcluded` column (`:1277-1279`).
   - Rule:
     - One case for both linked rows is refused, because they read two different compositions.
     - flip FV-X9's reading that the `h1` and `h5.modal-title` rows close through `TAILWIND_READINGS` is overruled by the `h1.modal-title.fs-5` finding.
   - The unit runs Chromium through the queue. The journey verdict does not name `tests/integration.test.ts`.
   - [flip FV-X9 (linked-alone half); lanes TW-15; units consumer-rows]
6. **The journey observer repair.**
   - Source: `RECORDS/tailwind-flip/units/flip-journeys/seventh-diagnosis.md:12-16`; `RECORDS/tailwind-flip/units/flip-journeys/brief-8.md:15`; `RECORDS/lanes.md:59`.
   - Scope:
     - In the engine section of `VENEER/tests/setupBrowser.ts`, repair the `actOnDisclosureControl` Enter burst, the refusal recorder, and the J8 toast reading. Use the seventh run's traces as the failing evidence.
     - Capture a failing collapse trace first, because the diagnosis traces only the accordion to the observer.
     - Remove each title from § Host-bound set after it passes two full runs.
   - Rule: folding the repair into the journey tuning unit is refused. That verdict holds the host-bound set fixed and compares failures against J-B0 by row and cause (`RECORDS/showcase/journey-cost-2026-10-05/verdict.md:15-27`).
   - [units journey-observers]
7. **Preservation under dark mode and open states, with copies split out of `resolved`.**
   - Source: `RECORDS/tailwind-flip/design-verdict.md:63`, `:110` (§ 4 population and § 9 risk 2); `RECORDS/tailwind-flip/units/flip-curation-audit/last.md:12`, `:119`.
   - Facts:
     - Before the token map, probe-4 read 0 `preflight` and 0 `unattributed` over 28 conditions (`VENEER/tmp/probes/flip5/report.md:113`, `:173-200`).
     - The map depends on color mode (`RECORDS/lanes.md:118`).
     - Since the map, the gate reads `light-1280` only (`VENEER/tests/app/browser/integration.test.ts:1122-1123`) and opens nothing (`:1170-1179`).
   - Scope, as unit `flip-preservation-modes`:
     - Rerun probe-4's matrix (`VENEER/tmp/probes/flip5/`) over the mapped tuned sheet.
     - Where it reads zero residuals and the cost holds, widen the gate to `dark-1280` and the six open states, and fold any derived row.
     - In `attributeDeparture` (`VENEER/tests/setupStyles.ts:574`, `:612`), split copies out of `resolved` into a `curated` cause. The control is a planted copy that exists only in the recipe and departs on an element that is not a witness.
     - Rerun the copy check against the mapped tuned sheet.
     - Give the scoped hazard witnesses a baseline that has the map and no copies (`mapTokenSheet(lifted, record, 'band')`).
   - Rule:
     - The name `flip-preservation-2` is refused, because the F2 unit's second pass already holds it (`RECORDS/tailwind-flip/units/flip-preservation/brief-2.md:1`).
     - Keeping the copy split as a later item is refused, because its trigger fired at T3 and the split did not happen.
   - [flip FV-R2; units resolved-copies]
8. **The nested-aware CSSOM reader, with two TSDoc fixes in the same files.**
   - Source: `RECORDS/lanes.md:241`. U7 handed the shared nested-aware reader to the fix unit, and fix A left it out (`RECORDS/tailwind-flip/units/flip-fix-a/brief.md:36-63`).
   - Facts:
     - The `scanSheetRules` reader (`VENEER/tests/setupStyles.ts:1251`) descends only into a `CSSGroupingRule` (`:1262`).
     - The `readPartitionRules` reader (`VENEER/tests/setupBrowser.ts:1769`) walks on its own and keeps `CSSNestedDeclarations`.
     - No proof runs `scanSheetRules` on a nested sheet.
   - Scope:
     - Add a proof in `VENEER/tests/setupStyles.test.ts` that runs `scanSheetRules` on `.container { @media (...) { max-width: ... } }`. It pins whether the nested declarations come back with their `@media` context and layer, with a flat-rule control. Preflight's `::placeholder` rule, with its nested `@supports`, is a real witness.
     - If they do not come back: descend into `CSSStyleRule`, give `SheetEntry` a selector field, re-read the counts that other proofs pin, and build `readPartitionRules` on the shared walk.
     - If they do come back: record why `readPartitionRules` keeps its own walk, or retire it.
     - The `@param coupled` TSDoc at `VENEER/tests/setupStyles.ts:713` names the visible-to-auto half it follows and the fail-closed reading.
     - The `mapReading` TSDoc (`VENEER/tests/setupBrowser.ts:284-298`) gains a `@remarks` sentence: the helper maps record rows, not breakpoint-band states, at a 16 px root (`:312`).
   - Rule:
     - flip FV-X14's "before the journey tuning unit" is refused. That unit is in flight and edits the partition code in `tests/setupBrowser.ts` (`RECORDS/showcase/journey-cost-2026-10-05/verdict.md:45`).
     - The "later item" alternative is refused, because the shared reader has no nesting proof.
   - [flip FV-X14; lanes TW-16; units nested-reader; tree TW-19; tree TW-20 (remark half)]
9. **Readings for the container and table-scroll captions.**
   - Source: `VENEER/app/browser/sections/containers.html:65-67`; `VENEER/app/browser/sections/tables.html:299-300`; T3 review refuted finding 3 (`RECORDS/tailwind-flip/units/tokens-t3/review/t3-review.json`, `refuted[3]`).
   - Scope: add two `TAILWIND_READINGS` rows, following the description-list precedent (`VENEER/tests/setupBrowser.ts:843`).
     - `.container-sm` `max-width` at 1280 px reads 1140px, 1140px, and 1280px.
     - `.table-responsive-sm` `overflow-x` reads `visible` wide and `auto` narrow, with per-face minimum widths of 576, 576, and 640 px.
   - The caption-text reader is a later item (group 5).
   - [tree TW-22 (rows half)]
10. **`showcase-guide`, carrying every § Showcase prose fix.**
    - Source: `RECORDS/showcase-audit-verdict.md:52`; `RECORDS/lanes.md:132` (the unit belongs to the cloud session); `VENEER/ROADMAP.md:182`.
    - Scope: one Opus unit limited to `VENEER/guides/veneer.md` § Showcase (`:2049`). It runs after the journey tuning lands, because that unit's item 11 rewrites `:2140`, `:2174-2175`, and `:2578` (`RECORDS/showcase/journey-cost-2026-10-05/verdict.md:41`).

    The unit rules each of the five carried claims and records each disposition:
    - Claim 3: write the at-rest qualifier into the Showcase introduction. The page has no `style` attribute at rest, but the engine's placement writes inline styles on the reference, the panel, and the arrow while a placed component is open (`RECORDS/showcase-audit-verdict.md:20`). The unqualified statement sits at `:2054`, `:2268`, `:2387`, and `:2482-2485`.
    - Claim 5: state the generated-pseudo limits of the header neutrality case (`VENEER/tests/app/browser/Showcase.test.ts:466`), taken from `RECORDS/archive/veneer-wt-page/showcase-proofs-5-report.md:103`.
    - Claim 4: close it as superseded by the partition and the paired engine-state case (`RECORDS/tailwind-flip/design-verdict.md:13`; guide `:2164-2200`).
    - Claims 18 and 21: close them, citing `:2077-2079`, `:2067-2076`, and `:2390-2397`.

    The same unit makes these § Showcase fixes:
    - **Faces row (`:2140`).** State the preservation case's bound: it reads the page in light color mode at 1280 and 390 px, with nothing opened, on host elements without pseudo-elements, and it keeps the dark-wrapped specimens it reads (`VENEER/tests/app/browser/integration.test.ts:1122-1123`, `:1170-1179`, `:1197`). The curation lead at `:1205-1206` stops citing the case. Unit 7 lifts the bound. [flip FV-X5]
    - **Header subsection (`:2093-2126`).** Add one sentence: the neutrality case asserts the R12 invariants under every face at 390, 768, and 1280 px. Those invariants are the header at or under 30 % of the viewport, button groups on one row, buttons one line box tall, and one row of groups from 768 px (`VENEER/tests/app/browser/Showcase.test.ts:498-527`). Cite T3's reading of 116, 48, and 48 px (`RECORDS/tailwind-flip/units/tokens-t3/report-5.md:131`). [token S7-10]
    - **Chrome paragraph (`:2068-2073`).** It names only the `d-flex` and `flex-fill` change. Add the `row-gap-3 column-gap-3`, `rounded-2`, and four side-border replacements, and the accepted Tailwind scale on page chrome outside the header. `:2071` must say the census case refuses all five replaced names (`VENEER/tests/app/browser/sections/integration.test.ts:229-259`), as `RECORDS/tailwind-flip/design-verdict.md:89` asks. [flip FV-D8 (guide half)]
    - **Matrix-case sentence (`:2480-2481`).** Add "under the Bootstrap face", or name `#030712` as the dark body under the `tailwindcss` face. [token X-8]
    - **Readings table (`:2215-2237`).** Add the seven specimens that `TAILWIND_READINGS` pins (`VENEER/tests/setupBrowser.ts:678`, `:684-701`, `:714`, `:750`, `:766-822`, `:824-835`, `:843-859`), with their values per face, the checkbox in both color modes, and a note that the description list sits in the typography section. [tree TW-05]
    - **Page weight.** After the user answers § 10 item 9, put the page weight, with its date and commit, beside § Census limit (`:2312`) and § Color mode limit (`:2326`). [flip FV-D9 (guide half)]

    Rule:
    - Closing claim 5 as superseded (tree TW-08) is refused, because `collectPseudos` still feeds the header case (`VENEER/tests/setupBrowser.ts:1510-1544`, `:1635`, `:1663`).
    - "Stage B does not wait on it" (flip FV-X17) is refused under the user's word of 2026-10-05.

    [flip FV-X17; token A-1; lanes TW-13; tree TW-08]

## 3. Defaults the user confirms or reverses

Put all of these in one message. No record holds the user's word on any of them (`RECORDS/stage-b/remainder-map-2026-10-04.md:116`; the § Log entries at `RECORDS/lanes.md:64-334`). After the user answers, record the answer in `RECORDS/plan.md` § Standing rulings and in a `RECORDS/lanes.md` § Log entry, as `RECORDS/lanes.md:3` requires.

The flip verdict's § 10 holds 14 defaults "for the user to confirm or reverse" (`RECORDS/tailwind-flip/design-verdict.md:115`). All 14 are built and landed at veneer `77c65cf`. Recommend confirming the 13 open items as built. Item 2 needs no answer, because R12 settles its labels; group 6 adds its § 12 line. [lanes TW-18; units flip-defaults; tree TW-16]

1. **Item 1, the two scaffold law amendments** (`:117`).
   - Recommend: confirm.
   - Quote the landed sentences (`SCAFFOLD/AGENTS.md:28`; `SCAFFOLD/.claude/rules/styles.md:74-76`), not the draft at `:117`. The landed `AGENTS.md` sentence is more general, and the landed `styles.md` sentence adds the `!important` clause.
   - Tell the user that releases 0.0.91 (`913b0542`) and 0.0.92 carry them, and that the 0.0.91 bump record does not name them (`/home/user/.wave/scaffold-main-wt/.orkestrel/release.md:22`).
   - The pin case is group 2 unit 2.
   - [flip FV-D1]
2. **Item 3, the 17 shared component names stay Bootstrap's** (`:119`).
   - Recommend: confirm.
   - Present it as an exception to R1, "Tailwind wins at every conflict" (`RECORDS/tailwind-flip/brief.md:13`), and cite `VENEER/tests/integration.test.ts:772` and `:921`.
   - [flip FV-D3]
3. **Item 4, Bootstrap's documented markup that carries a shared name reads Tailwind's meaning** (`:120`).
   - Recommend: confirm.
   - The guide names `w-full` (`VENEER/guides/veneer.md:1306-1312`). A sentence about a form's `mb-3` at 12 px is optional.
   - [flip FV-D4]
4. **Item 5, `[hidden]` is withheld from the Tailwind build** (`:121`).
   - Recommend: confirm.
   - Name the two visible consequences (`VENEER/tests/integration.test.ts:652-683`):
     - Under the recipe, an element with `hidden="until-found"` reads `content-visibility: hidden`, not `display: none`.
     - `hidden` beats `d-flex` under both Tailwind faces.
   - [flip FV-D5]
5. **Item 6, linking `./bootstrap` beside the recipe is unsupported** (`:122`).
   - Recommend: confirm.
   - The `mt-3` class reads 16, 12, and 16 px across the three compositions (`VENEER/tests/integration.test.ts:983-988`), and the guide refuses the link at `VENEER/guides/veneer.md:1268`.
   - [flip FV-D6]
6. **Item 7, curation coverage** (`:123`).
   - Recommend: confirm, after § 12 records the two Orchestrator deviations (group 6).
   - Name both deviations:
     - `:where(.table) tfoot` and `:where(.table) tr` stay on hazard witnesses, although probe-4 did not reproduce them (`RECORDS/tailwind-flip/units/flip-fold-2/brief.md:131`).
     - 19 derived rows stay out (`brief.md:130`). Among them are the description-list margins: 16 px and 8 px under `bootstrap`, 0 px under `tailwindcss`, admitted at `VENEER/tests/setupBrowser.ts:2022-2028`.
   - [flip FV-D7]
7. **Item 8, the chrome replaces five shared names and accepts Tailwind's scale elsewhere** (`:124`).
   - Recommend: confirm, in the narrower form R12 gave it: the accepted scale reaches only page chrome outside the header (`RECORDS/tailwind-flip/brief.md:96`; `RECORDS/tailwind-flip/tokens/design-verdict.md:157`; `VENEER/app/browser/factories.ts:794`, `:820`).
   - P4 read zero box departures at 390 and 1280 px (`RECORDS/lanes.md:268`).
   - [flip FV-D8]
8. **Item 9, the page weight of the embedded layer face** (`:125`).
   - Recommend: accept.
   - Byte counts of `showcase/browser.html`, read in `VENEER` on 2026-10-05 with `git show COMMIT:showcase/browser.html | wc -c`:

     | Commit | When | Bytes |
     | --- | --- | --- |
     | `d0603b4` | before the flip | 951,698 |
     | `77c65cf` | flip landing | 1,378,489 (+44.8 %) |
     | `44b3610` | T3 | 1,384,079 |
     | `4d21de7` | token landing | 1,384,109 |

   - Group 2 unit 10 records the figure in the guide.
   - [flip FV-D9]
9. **Item 10, no bundler package; the recipe is proved through Tailwind's `compile` API** (`:126`).
   - Recommend: confirm.
   - Group 1 unit 2 reads the packed proof. Group 6 adds the limit sentence that `RECORDS/tailwind-flip/design/proposal-consumer-proof.md:523` makes part of this default.
   - [flip FV-D10]
10. **Item 11, record writers under `tmp/units/` with durable copies** (`:127`).
    - Recommend: confirm.
    - Group 6 repairs the stale preflight writer and adds the missing token writers.
    - [flip FV-D11]
11. **Item 12, the Vue entry is unaffected, browse serves the rebuilt page, and U6 records the journey cost** (`:128`).
    - Recommend: confirm.
    - Group 1 unit 2 reads the Vue projects. The cost drivers are on `main` at `VENEER/ROADMAP.md:175`.
    - [flip FV-D12]
12. **Item 13, the landing rule** (`:129`).
    - Recommend: confirm the rule together with the journey reading at `RECORDS/lanes.md:249`. Both the flip and the token units landed under it (`RECORDS/lanes.md:157`, `:78-79`).
    - The clause that sends the after-landing reading to the engine session's host goes to group 4.
    - [flip FV-D13]
13. **Item 14, percentage shared names read Tailwind's spacing multiples** (`:130`).
    - Recommend: confirm.
    - Group 6 adds the guide sentence the item requires.
    - [flip FV-D14]

The token round's six defaults are "reversible at the user's word" (`RECORDS/tailwind-flip/tokens/rulings.md:3`; `RECORDS/tailwind-flip/tokens/design-verdict.md:172`). All six landed at `4d21de7`. Recommend confirming defaults 1 to 4, and report defaults 5 and 6 without asking. [lanes TW-19; units token-defaults; tree TW-17]

14. **Default 1, fonts, radii, and shadows as `var(--TOKEN, LITERAL)` references** (`rulings.md:7`).
    - Recommend: confirm.
    - A consumer's `@theme` font, radius, and shadow reach Bootstrap's components, and the fallback pins the default rendering (`VENEER/guides/veneer.md:1605-1615`; `VENEER/tests/guides.test.ts:174`).
    - [token D9-1]
15. **Default 2, colors pinned to Tailwind's default palette as sRGB hex, with the Sass `$palette` switch deferred** (`rulings.md:8`).
    - Recommend: confirm both parts.
    - The guide states the limit (`VENEER/guides/veneer.md:1645`).
    - The switch waits for a first Sass consumer, because the Minimal public API law refuses a capability before its first real consumer (`SCAFFOLD/AGENTS.md:65`). It stays at `VENEER/ROADMAP.md:173`.
    - [token D9-2; token L-1]
16. **Default 3, container widths equal Tailwind's breakpoints** (`rulings.md:9`).
    - Recommend: confirm. The guide names the bands.
    - [token D9-3]
17. **Default 4, `@custom-variant dark` as an optional guide sentence** (`rulings.md:10`).
    - Recommend: confirm (`VENEER/guides/veneer.md:2336-2340`).
    - [token D9-4]
18. **Defaults 5 and 6** (`rulings.md:11-12`).
    - Report these and ask nothing.
    - The `styles.md` clause landed at scaffold `4e94add7` (`SCAFFOLD/.claude/rules/styles.md:77-81`), and no release carries it yet (group 6).
    - No veneer release shipped between the flip and the token landing (`RECORDS/lanes.md:80`).
19. **R12's face-neutral chrome, re-read under R11 as "departs only by the token rows"** (`RECORDS/tailwind-flip/tokens/design-verdict.md:157`).
    - Recommend: confirm.
    - The header uses Bootstrap's classes and ships no sheet and no `style` attribute of its own. Every header button reads 4.5:1 or more under every face (`RECORDS/tailwind-flip/units/tokens-t3/report-5.md:111-116`).
    - Tell the user that the face-neutral clause is the Orchestrator's reading at `RECORDS/tailwind-flip/brief.md:96`, not the user's own words at `:94`. Record the answer beside R12.
    - [token D-R12; lanes TW-20]

Two more defaults belong in the same message:

- **The contrast floor** (`VENEER/tests/src/tailwindcss/index.test.ts:123`). The Orchestrator rewrote the verdict's § 2 to this floor at scaffold `a72ffeed` (`RECORDS/tailwind-flip/tokens/design-verdict.md:13`).
  - Recommend: accept.
  - Every text pairing reads at or over the lesser of Bootstrap's own ratio and 4.5:1. 33 pairings read under Bootstrap's own ratio, all of them at 4.5:1 or more.
  - Holding Bootstrap's ratio would need a darker step for each affected role, and no run has measured that.
  - The sweep filed this as a question, but it is a ruling already applied.
  - [token Q-1]
- **The `oklch()` output form, deferred past stage B** (`RECORDS/tailwind-flip/tokens/design-verdict.md:156`; `VENEER/ROADMAP.md:174`).
  - Recommend: confirm the deferral.
  - The design kept hex on purpose. M7 read no pixel difference on an sRGB display (`design-verdict.md:184`). The guide states the wide-gamut residual (`VENEER/guides/veneer.md:1688-1698`).
  - [token L-2]

## 4. Questions for the user

One question is still open.

- **Is a Windows reading needed, or is this host the arbiter of § Host-bound set?**
  - Source: `RECORDS/lanes.md:125` (the user is asked); `:132` (the desktop session runs no veneer reading); `:47` (§ Rules names the engine session's host); `:158` and `:251` (open asks for engine-host readings); `RECORDS/tailwind-flip/design-verdict.md:129` (the reading clause of § 10 item 13). No answer is recorded.
  - Recommend: no Windows reading. This host's reading is the arbiter.
    - Before stage B, take one Chromium 153 reading on this host of `test:src:browser`, `test:src:tailwindcss`, `test:integration`, `test:conformance`, and `test:journey`.
    - This needs a 153 browser installed first. `/opt/pw-browsers` holds only the `1194` builds, while `VENEER/node_modules/playwright-core/browsers.json:8` pins `153.0.8010.12`.
    - That reading also answers the host half of the floor question (D-10) at `RECORDS/lanes.md:149`.
  - After the answer, rewrite `RECORDS/lanes.md:47` and the clause of § 10 item 13 to name this host, and retire the asks at `:158` and `:251`.
  - Rule:
    - A Windows reading by the desktop session (lanes TW-21) is refused, because that session runs no veneer reading.
    - Leaving the 153 reading to stage B (tree TW-15) is refused. The integration and journey code that the flip and the token round changed has never run on 153, and the user puts the Tailwind track first.
  - [flip FV-R5 (reader half); flip FV-D13 (reading clause); lanes TW-21; lanes TW-33 (residue); units host-reading; tree TW-15]

## 5. Later items

Each of these can wait past stage B. Each line names its trigger and the record that keeps it from being lost.

- **The record and token writers for the next `tailwindcss` or `bootstrap` version.**
  - Source: `RECORDS/plan.md:28` (map writers only); `RECORDS/tailwind-flip/tokens/design-verdict.md:109` (the token writer stays under the ignored `tmp/units/`).
  - Why it can wait: both packages are pinned to exact versions, and the token round re-derived none of the map records.
  - Home before stage B: one `VENEER/ROADMAP.md` § Next line, and the same list at `RECORDS/plan.md:28`. Both name the trigger and every writer:
    - `tailwind-oracle.ts`, `cascade-classes.ts`, `tailwind-comparison.ts`, `tailwind-rows.ts`, and `tailwind-relations.ts`.
    - The Bootstrap instruments `cascade-inventory.ts`, `cascade-regions.ts`, `cascade-port.ts`, and `class-names.ts`.
    - The T1 token writer.
  - The map writers exist nowhere on this host. Group 6 copies the token writers.
  - [token L-4; lanes TW-35]
- **The one-row palette wording.**
  - Source: `RECORDS/tailwind-flip/tokens/design-verdict.md:119`; `VENEER/tests/conformance.test.ts:1556`.
  - Why it can wait: it is record wording only, with no behavior change.
  - Trigger: the next edit to that describe. At that edit:
    - Amend § 4 to "64 conditions (39 grid `min-width` and 25 `.98px` `max-width`; the 12 RFS conditions stay literal)".
    - Amend § 5 to "a full identity palette with one changed row changes the digest".
    - Retitle the case, together with `VENEER/guides/veneer.md:1532`, which quotes the title.
  - Group 2 unit 2 edits the same file. Take the trigger there if it touches that describe.
  - [units one-row-palette]
- **Band keying in `mapReading`.**
  - Source: `VENEER/tests/setupBrowser.ts:299`, `:312`; T3 review refuted finding 7 (`RECORDS/tailwind-flip/units/tokens-t3/review/t3-review.json`).
  - Why it can wait: every caller reads at 1280 or 390 px, and group 2 unit 8 adds the remark.
  - Trigger: a caller that reads inside a band.
  - [tree TW-20 (later half)]
- **The inherited-longhand fixture.**
  - Source: `VENEER/tests/setupStyles.ts:438`; T3 review refuted finding 0.
  - Why it can wait: the set is tied to the Chromium floor ruling (D-10).
  - Trigger: that ruling. Then re-derive the set from that version's metadata and pin it with set equality to a committed fixture.
  - [tree TW-21]
- **The caption-text reader.**
  - Source: `VENEER/tests/setupBrowser.ts:843`.
  - Why it can wait: the existing reader compares computed values and never reads caption text, so this reader needs its own design.
  - [tree TW-22 (later half)]
- **The bash gate runners.**
  - Source: `VENEER/tmp/units/tokens-t3/review/overwrite-gates.sh:1`; `SCAFFOLD/AGENTS.md:47` ("Never write a bash, PowerShell, or Python script").
  - Why it can wait: the journey unit retires the unlocked `gates.sh` runner for its duration (`RECORDS/lanes.md:73`), and the next gate sets run through `VENEER/tmp/units/journey-cost/run.ts` under the lock.
  - Home: a debrief item that names both runners. Group 6 archives the `07694f8` record.
  - [units bash-gate-script (runner half)]
- **The `engine.destroy()` line in the guide's Browser entry.**
  - Source: `VENEER/guides/veneer.md:672-676`; `RECORDS/browser-stage-b-verdict.md:919` (a stage A fix); `RECORDS/lanes.md:132`.
  - Why it can wait: the entry sits outside the Tailwind track, which the user's word of 2026-10-05 puts first. Nothing ties it to stage B.
  - Home: a `VENEER/ROADMAP.md` § Next line. Land the fix at the first veneer guide write after the track closes.
  - Its companion sentence at `:954` waits for B7.
  - [lanes TW-36]
- **The D-4 Linux `browse` run.**
  - Source: `RECORDS/lifecycle/reassessment-2026-10-04.md:7`.
  - Why it can wait:
    - It is a `browse` package task that writes only the browser checkout and the records.
    - The queue rule (`RECORDS/lanes.md:73`) and the user's word hold it.
    - It must run against a settled browser release (0.0.25, or the contexts release if that lands first), not 0.0.24.
  - Home: one `RECORDS/lanes.md` § Log entry that places it after this checklist and the journey tuning unit.
  - It is not a question for the user, who set its timing on 2026-10-04.
  - [lanes TW-22]
- **The stage B prerequisites.**
  - Source: `RECORDS/lanes.md:147-149`.
  - Why it can wait: the user holds stage B until the Tailwind track is complete.
  - Keep these:
    - The user's rulings 1 to 6.
    - P0.
    - The Chromium floor (D-10), with the 153 reading from group 4.
    - The elements addendum's 19 correction rows and its open questions (`RECORDS/stage-b/elements-clone-addendum-2026-10-05.md:26-50`, `:497`).
  - Drop these, because they are done: the addendum read (scaffold `18bdc494`) and the remainder-map corrections (scaffold `98c1613e`).
  - [lanes TW-37]

## 6. Record drifts to fix by hand

None of these changes behavior. Fix them in records commits on scaffold and in one prose commit on veneer `main` gated by `test:guides`. The § Showcase prose fixes ride on group 2 unit 10.

### `RECORDS/lanes.md`

The lanes log needs the following seven fixes.

- **The user's word of 2026-10-05 is unrecorded.**
  - Source: `RECORDS/lanes.md:3` (record a ruling that changes a lane); `:147` (stage B opens when T1 to T4 land on `main`).
  - Fix:
    - Append a dated entry with the word: finish the Tailwind track completely and well before stage B, and leave nothing out.
    - The entry supersedes the `:147` reading, so stage B waits on this checklist.
    - Source the order at `RECORDS/plan.md:35` to that entry.
  - [token X-9; lanes TW-24 (word gap)]
- **The T3 gate record.**
  - Source: `RECORDS/lanes.md:100`.
    - It cites `units/tokens-t3/gates-44b3610.txt`, which exists nowhere.
    - It reports "setup browser 156" for the Orchestrator's run. That run read 155 of 156, with a 15000 ms timeout (`RECORDS/tailwind-flip/units/tokens-t3/review/gates-orchestrator-final-tree.txt:24`, `:56`).
  - Fix:
    - Cite `review/gates-orchestrator-final-tree.txt` instead.
    - State the timeout on the case at `VENEER/tests/setupBrowser.test.ts:1234`, the verbose rerun at 156 (the case ran in 49 ms), and the landing read at 156 (`gates-4d21de7.txt:42`).
    - Call the timeout non-reproducing, not host-bound.
    - Copy `setup-browser-gates-timeout.err`, `setup-browser-verbose.log`, `setup-groups-iso.log`, and the three review files the archived brief cites from `VENEER/tmp/units/tokens-t3/review/` into `RECORDS/tailwind-flip/units/tokens-t3/review/`.
  - [token U8-T3; units t3-gate-record; tree TW-02; lanes TW-24 (gate gap); lanes TW-09 (archive half)]
- **The landing rule.**
  - Source:
    - `RECORDS/lanes.md:47` requires `src/`, `tests/src/`, and `tests/integration.test.ts` to equal `main`, and the token units changed all three.
    - The landing entry (`:76-81`) names no rule.
    - `RECORDS/tailwind-flip/tokens/design-verdict.md:190`.
  - Fix:
    - Add a bullet to the landing entry stating that the token landing met the flip's rule (`RECORDS/lanes.md:334`; § 10 item 13) together with the journey reading of `:249`. Under that rule, `src/browser/**`, `src/core/**`, and `tests/src/browser/**` equal `77c65cf` byte for byte, and every gate failure is a § Host-bound set title.
    - Rewrite `:47` to that form for the cloud session. Set the host read-back clause from the group 4 answer.
    - The strict copy of the rule at `RECORDS/showcase/status.md:58` goes when that file is retired.
  - [lanes TW-11; tree TW-14; units landing-rule; token U8-LAND; flip FV-R5 (rule half)]
- **The false durable-writer claim.**
  - Source: `RECORDS/lanes.md:197` says "the durable preflight writer drops its `141` assertion". The durable copy still asserts it (`RECORDS/tailwind-flip/writers/flip-integration/preflight-record.test.ts:12`).
  - Fix: correct the sentence in the same commit that repairs the writer.
  - [flip FV-X4 (claim half); units writers-durable (claim half)]
- **The log layout and the host-bound header.**
  - Source: `RECORDS/lanes.md:211` (the "Newest first" preamble sits between entries, below the § Log heading at `:62`); `:54` (the header cites `43ca8a0` and `d0603b4`).
  - Fix:
    - Move the preamble up to sit directly under the heading.
    - Restate the header with the `4d21de7` landing reading: the 6 `src:browser` titles, and the journey failing the accordion and collapse titles (`gates-4d21de7.txt:47-54`).
  - [lanes TW-24 (layout and header gaps)]
- **The scaffold release owner and the token clause.**
  - Source: `RECORDS/lanes.md:49` ("The engine session prepares a scaffold release") contradicts `:9`.
  - Fix: name the desktop session, and add an entry asking it to carry scaffold `4e94add7` in its next release.
  - [lanes TW-23 (lanes half)]
- **The overwrite's script drifts.**
  - Source: `RECORDS/lanes.md:92` gives one blanket "stands as before" for five planned-script drifts, with a reason that fits only `test:src:vue`.
  - Fix: rule on each script separately (keep the declared script or take the planned one), and record each ruling.
  - [tree TW-01]

### `RECORDS/plan.md`, `RECORDS/showcase/status.md`, and `RECORDS/ledger.md`

The three standing records need the following fixes.

- **`RECORDS/plan.md:18` and `:28`.**
  - `:18` presents § 10 defaults (the 17 names, the long face labels, the item 1 amendments) as the user's ruling of 2026-10-04. It also keeps the labels that R12 superseded (`RECORDS/tailwind-flip/brief.md:96`).
  - `:28` says the sheet ships the preflight mirror, which R4 removed.
  - Fix, after the group 3 answer:
    - Cite the confirmation.
    - Use the short labels (`VENEER/tests/setupBrowser.ts:481-485`).
    - Add a reversal clause at `:28` that points to `:18`.
  - [flip FV-X7]
- **`RECORDS/plan.md:19` and `:22`.**
  - `:19` says the token round "has not landed", which contradicts `:35`.
  - `:22` says "never the Claude CLI", but T4 ran on the `opus` route.
  - Fix:
    - Point `:19` at `:35`.
    - Point `:22` at the `SCAFFOLD/.agents/orchestration.md` routes, keeping the user's ruling at `RECORDS/ledger.md:7` scoped to the Windows desktop host.
  - [token X-7; lanes TW-26; units landing-records (plan half)]
- **`RECORDS/showcase/status.md`.**
  - The file still describes the 2026-10-03 handoff:
    - the owner (`:3`, `:9`)
    - veneer `main` at `9401839` (`:10`)
    - the unused branch (`:11`)
    - scaffold 0.0.88 (`:12`)
    - the browse row (`:14`)
    - `showcase-proofs` in flight (`:18`)
    - the planned 0.0.22 re-pin (`:23-24`)
    - two faces (`:41`)
    - the preflight mirror (`:43`)
    - the pre-flip landing rule (`:58`)
  - Fix:
    - Retire the file into `RECORDS/lanes.md` § Sessions and § Log.
    - Keep the resume rules that still bind (`:53`, `:54`, `:56`, `:57`, `:59`, `:61`) and the rulings that still hold (`:44-48`).
    - Repoint `RECORDS/plan.md:37` and `RECORDS/showcase/browse.md:3`.
  - Rule: rewriting the file in place is refused. It would keep a second home for the showcase state, which `RECORDS/lanes.md:10` and `:132` already hold.
  - [flip FV-X8; token X-12 (status half); lanes TW-25; tree TW-27 (status half); units landing-records (status half)]
- **`RECORDS/ledger.md:3`.**
  - The ledger claims to hold every dispatch but has no row for the flip or token lanes. Its last change is scaffold `6b3861dd` (2026-10-03).
  - Fix: make `:3` name `RECORDS/tailwind-flip/units/` and the § Log entries of 2026-10-04 and 2026-10-05 as the record for those lanes.
  - Rule:
    - Copying 27 lanes into rows is refused, because it creates a second home.
    - Deferring to the debrief (flip FV-X18) is refused, because the fix is one sentence.
  - [flip FV-X18; lanes TW-27; token X-12 (ledger half); units landing-records (ledger half)]

### The two verdicts and the unit records

The verdicts and unit records need the following amendments and notes.

- **The flip verdict's § 12.** Its last entry is `RECORDS/tailwind-flip/design-verdict.md:159`, and its last commit is `65779967`. Append three lines:
  - F10 at veneer `527ea39` renames `$shared`, `$curation`, and `$defaults` to `$withhold`, `$curated`, and `$restored`. The line covers every reference at `:29`, `:57`, `:58`, and `:67`, and keeps the switch count at five.
  - R12 replaces item 2's labels and keeps the three faces.
  - Probe-4 and fold-2 depart from item 7 in the two ways that group 3 item 6 names.
  - [flip FV-X6; flip FV-D7 (record half)]
- **The token verdict's text** (`RECORDS/tailwind-flip/tokens/design-verdict.md`, last commit `a72ffeed`). Amend:
  - The dark cells at `:43` and `:51` to the split values (`#e5e7eb`; `rgba(229, 231, 235, 0.75)` and `0.5`), or mark both rows as amended by § 3.1, as `:49` already is.
  - `:94` and `:104` to the explicit `$context: null` argument and its six call sites. Name the two dark-block sites that keep `gray-300`.
  - `:56`, `:60`, and `:95` to cite T2's measured run.
  - `:123` and `:124` to the tree's case titles.
  - `:132` to the floor wording of `:13`.
  - `:149` to 56 rows (38 reboot, 11 restore, 7 scoped; veneer `bc35a3e`).
  - [token X-1; token X-2; token X-3; token X-4; lanes TW-29; token S7-8; tree TW-27 (verdict half)]
- **The token verdict's § 11.** `:190` still lists three open risks. Append a closure:
  - M8 and M1 close by `VENEER/tests/conformance.test.ts:1329` and `VENEER/tests/src/tailwindcss/index.test.ts:104`, with the `mapReading` dark-context residual noted.
  - M7 closes by T4's ruling that the sRGB pixel sentence stays backed by the run (`RECORDS/tailwind-flip/units/tokens-t4/report-2.md:59`). Cite `:184`, `VENEER/guides/veneer.md:1688-1698`, and `VENEER/tests/guides.test.ts:206`.
  - Rule: a Chromium paint case for M7 is refused under that ruling.
  - [units token-open-risks; token O11-CLIP (closure half)]
- **`RECORDS/tailwind-flip/tokens/rulings.md`** has no closure note (`:16`).
  - Close findings 1 to 11 and 13 to 16, citing their cases.
  - Keep finding 12's scale controls open under group 2 unit 4.
  - [token R-F (closure half)]
- **The falsify claims.**
  - Source: `RECORDS/tailwind-flip/units/flip-falsify/reviewer-verdict.md:40`.
  - Append one dated note:
    - Claims 50 and 51 are superseded by § 12 and by the preservation gate at `77c65cf`.
    - Claim 54 is superseded by the showcase brief's four permitted longhand kinds and by the census that fix A widened at `527ea39`.
    - The reviewer's refutation of claim 51 (`:11`, "no `resolved` member") has been false since `77c65cf` (`VENEER/tests/setupStyles.ts:812`).
  - Leave the briefs as written.
  - [units falsify-claims]
- **Where the token readings live.**
  - Source: `RECORDS/tailwind-flip/units/tokens-t4/brief.md:31` (the readings table gains the token rows).
  - Fix: beside T4's acceptance, record the ruling that the Faces table (`VENEER/guides/veneer.md:2232-2237`) and the Token map table (`:1547-1615`) hold the token readings. The composition table (`:1281-1292`) therefore gains none.
  - [token X-14]

### Archives and writers

The records need the following copies from veneer's ignored `tmp/` folder.

- **Run outputs that the guide and the records cite.**
  - Copy `m2.json` and `m7.json` into `RECORDS/tailwind-flip/units/tokens-probe-2/`, and fix that folder's `report.md:27` link and `last.md:9` path. `m7.json` is the only raw source for the guide's pixel sentence.
  - Copy `consumer-reading.json` and `gamut-reading.txt` from `VENEER/tmp/units/tokens-t4/` into `units/tokens-t4/`.
  - Copy `p4-6a.json` and `p4-cmp-6.json` into `units/tokens-t3/`.
  - Copy the `07694f8` overwrite gate record into the token records.
  - [token X-10; token S7-7; token O11-CLIP (archive half); units bash-gate-script (record half)]
- **The durable writers.**
  - Source: `RECORDS/tailwind-flip/design-verdict.md:85`, `:127`.
  - Replace `RECORDS/tailwind-flip/writers/flip-integration/preflight-record.test.ts` with T2's port (`VENEER/tmp/units/tokens-t2/preflight.test.ts`). The current copy asserts Chromium 141 at `:12` and reads `dist/src/bootstrap/index.css` at `:3`. T2's port reads the tuned sheet and wrote the 2793-row record.
  - Add these folders:
    - `writers/tokens-t1/`: `write-tokens.test.ts`, `TokenWriter.ts`, `vite.writers.config.ts`, `generate.ts`, and `helpers.ts`.
    - `writers/tokens-t2/`: `maps.test.ts`, `preflight.test.ts`, and both configurations.
    - `writers/tokens-t4/`: `write-table.ts`.
  - [flip FV-D11; flip FV-X4; lanes TW-28; units writers-durable; lanes TW-35 (copy half)]

### `VENEER/ROADMAP.md`, in one prose commit

The roadmap at `4d21de7` needs the following corrections.

- **§ Scaffold propagation.**
  - `:151` lists adoptions only through 0.0.88. Add:
    - 0.0.90: pinned at `8159757`, overwritten at `24ae43d`, 2026-10-03.
    - 0.0.92: pinned at `b242bce`, overwritten at `07694f8`, 2026-10-05.
    - A note on the 0.0.91 pin at `a036694`, which `b242bce` replaced before any overwrite.
  - Item 8 (`:160`): the 0.0.22 re-pin landed at `8159757`, and `b242bce` replaced it with `^0.0.24`.
  - Item 11 (`:163`): "Carried by scaffold `0.0.91` (`913b0542`) and `0.0.92`; adopted on 2026-10-05 at `b242bce` and `07694f8`."
  - Add item 12: the token-substitution clause at scaffold `4e94add7` (2026-10-05). No release through 0.0.92 carries it. After the desktop session's next release, the re-pin adopts it, and `VENEER/guides/veneer.md:1535-1536` names that version.
  - At `:165`, record that the three `preflight.json` integration cases left § Host-bound set at `1b15a22`, and move the gate paragraph to the landing gates at `4d21de7`.
  - Rule: lanes TW-02's "0.0.90 at `8159757`" and flip FV-X10's "0.0.90 at `24ae43d`" are each half of the record. `git log` shows `8159757` as the re-pin and `24ae43d` as the overwrite.
  - [flip FV-D1 (roadmap half); flip FV-R4 (adoption half); flip FV-X10; flip FV-X11; token U8-LAW; token X-11; lanes TW-02; lanes TW-23 (roadmap half); units styles-clause-propagation; tree TW-10; tree TW-01 (records half)]
- **The landed showcase units.**
  - `:144` says "`showcase-proofs` is open". It landed on 2026-10-03 at `3807993`, `608d646`, and `4929856`.
  - In § Next, drop showcase item 1 (`:181`) and item 3 (`:183`, the 0.0.22 re-pin), and renumber.
  - After group 2 unit 10, mark `showcase-guide` (`:182`) closed.
  - [token X-13; lanes TW-06; units roadmap-showcase-proofs; tree TW-07 (showcase half)]
- **The track order.**
  - `:177` says the two tracks run in parallel and neither waits. The order of record is the journey tuning unit, then this checklist, then stage B at the user's word (`RECORDS/lanes.md:81`).
  - Fix: state that order.
  - [tree TW-07 (order half); token L-3 (order caution)]
- **The tenet and the standing shape.**
  - `:15` says `preflight.json` measures drift "away from lifted Bootstrap". The record case actually reads the tuned sheet (`VENEER/tests/integration.test.ts:342`, `:544`), as `:143` says.
  - `:54` describes the built sheet without the token map.
  - `:99` omits `$palette` and `$scale` (`VENEER/src/bootstrap/_tokens.scss:8-9`; `VENEER/src/tailwindcss/_tokens.scss:1`, `:129`).
  - `:100` omits the two switches (`VENEER/src/bootstrap/_mixins.scss:14-15`) and the `swatch` and `measure` functions (`:330`, `:345`).
  - [tree TW-09]

### `VENEER/guides/veneer.md` § Tailwind compatibility sheet, beside the journey unit

The guide's Tailwind section needs the following sentences.

- **Percentage shared names.**
  - Source: `RECORDS/tailwind-flip/design-verdict.md:46`, `:130`.
  - Fix:
    - After `VENEER/guides/veneer.md:1306-1312`, name `top-50` at 12.5rem, `start-100` at 25rem, and `w-25` at 6.25rem, citing `VENEER/tests/integration.test.ts:772`.
    - Add the § 2 row to the composition table (`:1281-1292`).
  - [flip FV-D14 (guide half); flip FV-X9 (percentage half)]
- **The departures the layer leaves to the consumer.**
  - Source: `VENEER/guides/veneer.md:1395` ("Curation keeps a Bootstrap component's look where preflight would move it"), which the guide's own definition at `:1396-1397` contradicts; `RECORDS/tailwind-flip/units/flip-specimens/documented-markup.md:1442`, `:1446`.
  - Fix: add one paragraph after the curation forms. It names the description-list margins with the `mb-2` path, the `.card > hr` residual, and the preservation case's admission (`VENEER/tests/setupBrowser.ts:2022-2028`). It cites the `attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths` case.
  - At `4d21de7`, the showcase caption at `VENEER/app/browser/sections/typography.html:220-223` is the only place that discloses these departures.
  - [units guide-consumer-owned; flip FV-D7 (guide half)]
- **The `compile` API limit.**
  - After the group 3 answer on item 10, add one sentence to § Load real Tailwind (`:1835`): the recipe is proved through Tailwind's `compile` API, and the bundler path stays unproven.
  - [flip FV-D10 (prose half)]