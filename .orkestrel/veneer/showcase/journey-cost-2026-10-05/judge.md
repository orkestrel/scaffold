## Verdict

All repository paths in this plan are relative to `/home/user/veneer`. `lanes.md` and the `j0c-*` records sit in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/`.

The run's wall time is light-1280's serial span. Six full preservation attributions and six full partitions drive that span, and their rule scans repeat the same work. The plan has two layers:

- **Layer 1 (items 1 to 10): cut the repeated CPU work while keeping inputs and outputs identical.** No ruling is needed. The central saving on light-1280 is 122 s, which models the wall near 640 s on the 761.76 s basis (`tmp/units/tokens-t3/journey-5b.log:201`).
- **Layer 2 (items 11 and 12): split preservation and partition into one case per width, pin each half to the light-1280 reading, and place the pieces by measured slack.** The aim is for the four projects to end together. This layer needs the user's hosting ruling (Q1). The model puts the wall near 570 s, and the target is 590 s.

**Parallelism.** Inside the run, four renderers on 4 CPUs is the ceiling. Nothing adds renderers without adding contention, so I uphold every refusal in proposal 3. The run gains parallelism only when its projects end together. In the 591.13 s run, dark-1280, light-390, and dark-390 sat idle for 114.26 s, 126.10 s, and 194.15 s at the end (`journey-4.json:1`, `endTime`). Across the work, the plan runs in parallel where it can:
- Equality probes can run concurrently.
- Price measurements run alone under the lock.
- Three code lanes write in parallel on separate functions.
- A fourth lane (structure) follows one checkpoint run.

**What remains before any code:**
1. Baseline B0 and the probes in the following "Probes before implementation" section.
2. The user's ruling on Q1.
3. The lanes.

**Notes on the proposals:**
- Proposal 3's text stops partway through its change 2 ("Give the gate the host. Wr…"). I ruled its changes 3 and 4 from its angle text, which names "filling that idle tail through the four projects' schedule."
- Two citations in the proposals need correcting:
  - The 14 to 17 ms role-query price sits at `j0c-brief.md:121`, not line 119.
  - The owner's exclusion of J0c items 7 and 19 sits at `j0c-scope.md:32`, not line 28.
- Proposal 1 says no change touches a host-bound title's code path. That does not hold for its changes 6 and 7:
  - The reference and class checks run in every guarded table row (`tests/setupBrowser.ts:3135-3138`).
  - The focus walk serves `traverseFocus` (`tests/setupBrowser.ts:1209`), which the overlay controls call (`tests/setupBrowser.ts:4683`).
  - Both changes keep their outputs identical, and the acceptance failure-set rule covers them.

## Adopted changes

The following items are in landing order. Each one names its source proposal, files, saving, basis, and how coverage stays.

0. **Record per-case seconds in the gate, and price runs with the host to themselves (proposal 3, changes 1 and 2).**
   - **Files:** the `test:journey` script at `package.json:101` gains `--reporter=json --outputFile=tmp/journey/report.json` beside the dot reporter. This is the form J0c ran (`j0c-brief.md:89`).
   - **Saving:** 0 s. This item enables measurement.
   - **Basis:** the dot reporter prints no per-case duration. As a result, the brief's 234.95 s of growth in summed test time is unattributed: 1871.42 s in `journey-4.log:169` against 2231.49 s in `journey-5b.log:201`.
   - **Coverage:** no test changes. `tmp` is ignored (`.gitignore:11`). The only writer under `tmp/journey/` is the portfolio case (`integration.test.ts:1861`), and nothing lists that folder.
   - **Change 2, visible part:** every price run holds `/home/user/.wave/journey.lock` (`j0c-brief.md:22`) with no other Chromium lane running (see Q4).

1. **Share one matched-rule index across the preservation case's three full attributions per width (proposal 1, change 1, with conditions; absorbs proposal 2, C1).**
   - **Files:**
     - In `tests/setupBrowser.ts`, the `collectComponentPreservation` function (1938-2056): the scan at 1974-1976 and the per-representative filter at 1990-1995.
     - Call sites at `integration.test.ts:1215, 1273, 1282`.
     - Proofs in `tests/setupBrowser.test.ts` beside lines 1107-1175.
   - **Conditions:**
     - (a) Build the index with the predicate the code uses today, `element.matches(selectorText)`, in selector-major order. Evaluate each distinct selector text one time over the representatives, then append entries to each representative's per-sheet list in scan order. Because the predicate is identical, no `:scope` or `&` branch is needed. Use proposal 1's `document.querySelectorAll` form only if probe P-B prices it cheaper and its equality holds at both widths; in that case, keep proposal 1's fallback.
     - (b) Pass the index as an options field, the way the `AttributionOptions` interface passes `rules` (`tests/setupStyles.ts:815-824`). The function refuses an index built for other sheets, and a unit proof pins that refusal. This is proposal 2's foreign-sheet proof.
     - (c) Build the index directly before line 1215 and pass it only to the calls at 1215, 1273, and 1282. No `await` sits between 1215 and 1282 (the next one is at 1320). The sheet-rewrite controls at 1321, 1355, and 1407 keep their own scan.
     - (d) Keep the mutation target `longhand.startsWith('overflow-')` byte-identical. It is unique in the file today (`tmp/units/tokens-t3/mutations-6.ts:8`).
     - (e) Take proposal 1's memo in the `attributeDeparture` function (`tests/setupStyles.ts:574-633`) only if probe P-A prices the departure loop above the spread of the scoped run. This plan credits it 0 s.
   - **Saving:** 68 s on light-1280 (floor 40 s, ceiling 86 s), all on the critical path.
   - **Basis:**
     - One full attribution costs 16.66 s in the 761.76 s run: (135.43 − 31.26 − 33.00 − 4.53) / 4, from `journey-5b.log:97, 127, 139`. The 4.53 s is the sheet-rewrite controls: 61.45 − 28.35 − 28.56, from `journey-4.log:65, 89, 97`.
     - Run alone, one attribution costs 11.40 s: (98.82 − 24.20 − 25.04 − 4) / 4, from `preservation-5b.log:5, 17, 29`.
     - The case runs six full attributions. Sharing removes four scans outright, worth 40 to 60 s at a 60 to 90 percent scan share.
     - The selector-major build also shrinks the remaining two scans **if** per-call selector parsing dominates. That is an unmeasured hypothesis. It comes from 1,458 representatives (`journey-5b.log:97`) × proposal 1's 5,276 style rules, about 7.7 million calls per attribution. At 11.40 s alone, that is near 1.5 µs per call, which is closer to a parse than to a cached match. Probe P-B settles it.
   - **Coverage:** for each representative and sheet, the index yields the same entries in the same order as the filter at 1990-1995. Every cause, exclusion, departure, `lost` entry, logged line, and assertion (1219-1300) stays the same.

2. **Share one match memo across the partition case's three full partitions per width, and move the inverse partition next to them (proposal 1, change 2, with conditions; absorbs proposal 2, C2).**
   - **Files:**
     - In `tests/setupBrowser.ts`, the `collectPartition` function (2140-2341): the per-subject match at 2158-2170.
     - Call sites at `integration.test.ts:1549` and `1553`. The inverse partition at 1633-1647 moves to directly follow 1553.
     - Proofs in `tests/setupBrowser.test.ts`.
   - **Conditions:**
     - (a) The memo holds only the match results: the entries whose selector and conditions match, plus the individual selectors that match. Each call derives declarations the same way the code does today, because the `resolvePartitionProperty` function reads the subject's `values.bootstrap`. Proposal 1's declaration cache waits for probe P-A and is credited 0 s.
     - (b) Build selector-major with the identical predicate, as in item 1(a).
     - (c) Move the inverse partition so that it follows line 1553 directly. Today it runs after the face switches at 1578, 1592, and 1595 and after the adopted-sheet controls. After the move, all three partitions run in one synchronous span, so the memo is valid by construction. One log line changes position: the unexcluded `Partition control` line prints before `Primary map demonstration`.
     - (d) The subset partitions at 1611 and 1674 take no memo.
     - (e) Keep the mutation target `face === 'tailwindcss' && options.scales !== undefined` byte-identical and unique (`mutations-6.ts:9`).
   - **Saving:** 35 s on light-1280 (range 18 to 50 s).
   - **Basis:** the case reads 84.29 s in the 761.76 s run (`journey-5b.log:195`) and 61.82 s alone (`partition-3-dev.log:46`). Each width partitions 1,670 subjects three times (`journey-5b.log:149, 175`), and sharing removes two of those three scans. No run splits the case by phase; probe P-A prices it.
   - **Coverage:** identical matches give identical violations, clauses, skips, differences, rows, and logged lines (only the order of the one line in (c) changes).

3. **Decide signature membership selector-major (proposal 1, change 3; conditional on probe P-D).**
   - **Files:** the `collectComponentSignatures` function, loop at `tests/setupBrowser.ts:1902-1909`.
   - **Conditions:** keep the identical predicate. Evaluate each rule's conditions one time; they read only the window (`tests/setupStyles.ts:416-433`). Hold the 608 component names in a `Set`.
   - **Saving:** 5 s (range 2 to 10 s).
   - **Basis:** proposal 1 counts 548 component-scoped selectors, each tested on every element that carries no component class. No log records how many such elements there are; P-D counts them.
   - **Coverage:** groups, keys, order, and the logged `signatures` and `excluded` counts (`journey-5b.log:97`) stay the same.

4. **Resolve each reading set's figures with one role query (proposal 1, change 4, amended).**
   - **Files:**
     - The `readTailwind` function (`tests/setupBrowser.ts:1436-1442`), with a set reader beside it.
     - Call sites at `integration.test.ts:400, 415, 1030`.
   - **Amendment:** proposal 1 caches by title, which still means 28 queries per set. Instead, the set reader calls the `indexByName` helper (`tests/setupBrowser.ts:1174-1191`) one time per synchronous set. That helper refuses a name with zero or several matches. It is the shape J0c adopted for J3 (`j0c-brief.md:117-121`).
   - **Saving:** 3 s on light-1280 and 11 to 13 s summed, using proposal 1's figure. The same price proxy puts the amended form near 5.5 s per variant. Probe P-E settles it.
   - **Basis:** 56 readings over 28 specimens (`tests/setupBrowser.ts:535-978`, from a textual count). Each variant reads 7 sets. Each query costs 14 to 17 ms (`j0c-brief.md:121`), a proxy priced from J2.
   - **Coverage:** the same role, exact name, and uniqueness per title, under the face each set reads. The expectations, the `Journey Tailwind readings` lines, and the rows stay the same.

5. **Scope the scrollspy polls to the resolved landmarks (proposal 1, change 5; conditional on probe P-F).**
   - **Files:** `tests/setupBrowser.ts:5124-5254`.
   - **Conditions:**
     - Every wait ends on a whole-document `readScrollspySelection` read that agrees with the scoped read. The scoped read is evaluated first; the whole-document read runs only after it passes.
     - The `assertScrollspySelection` function keeps its whole-document region and link resolution (5177-5188).
     - Mutation control: point the cached navigation at the Contents navigation. The row must fail.
   - **Saving:** 8 s on light-1280, where scrollspy-1280 reads 44.67 s and 34.03 s (`journey-4.json:1`). About 8 s on light-390 too.
   - **Basis:** proposal 1 counts 10 to 20 whole-document queries per row, over 36 rows per table, at 14 to 17 ms each (`j0c-brief.md:121`). Probe P-F counts the queries.
   - **Coverage:** the keyboard path, the settle, the activation-event and keyboard-scroll checks (5240-5249), and the from-state and to-state assertions all stay.

6. **Make the per-row reference and class checks linear (proposal 1, change 6).**
   - **Files:** `tests/setupBrowser.ts:2873-2905`.
   - **Condition:** the registry-name cache stays behind the dynamic `import('@app/browser')` call, because the harness imports no value from `app/` (`lanes.md:40`). A unit proof covers an id that occurs three times, a dangling `aria-controls` target, and a non-fragment `href` value.
   - **Saving:** 2 s on light-1280 and 3 to 9 s summed. Probe P-G prices it.
   - **Basis:** the duplicate scan is quadratic, because it calls `indexOf` for each id. It runs at every guarded row (3135-3138) and at every table end (`integration.test.ts:1794-1795`).
   - **Coverage:** the same findings in the same order, including in the host-bound tables' rows.

7. **Read the Tab-walk bound from a live collection (proposal 1, change 7).**
   - **Files:** `tests/setupBrowser.ts:2847`.
   - **Saving:** 0 s on light-1280. Elsewhere it saves 1 to 2 s in each project that runs the reach case (`integration.test.ts:695`). The target credits it 0 s.
   - **Coverage:** both forms give the same element count at every check.

8. **Read text membership only on the representatives (proposal 1, change 8; conditional on probe P-A).**
   - **Files:** `integration.test.ts:1180-1192`.
   - **Ruling:** a value that no assertion, control, logged line, or row consumes is not a reading. The `text` set is read only on representatives (`tests/setupBrowser.ts:2015`; `integration.test.ts:1387`), and the logged line reports `boxes`, not a text count. The box reads stay on all elements because the `lost` check uses them (1978-1981).
   - **Saving:** 1 s (range 0 to 2 s).

9. **Disable the DOM and CSS Chrome DevTools Protocol (CDP) domains after the specificity reading (proposal 1, change 11; conditional on probe P-H).**
   - **Files:** `tests/setupStyles.ts:277-323`. The domains are enabled at 283-284 and never disabled.
   - **Saving:** credited 0 s until P-H prices it.
   - **Basis:** after preservation, light-1280 runs 305.23 s of tables with both domains on (`journey-4.json:1`). The other projects never enable them and pass the same table code, so no table depends on them. This item matters more if item 12 moves the halves into other projects.

10. **Cache the standard longhand names per window (proposal 1, change 10; conditional on probe P-I).**
    - **Files:** `tests/setupStyles.ts:1455-1464`.
    - **Saving:** credited 0 s.
    - **Proof:** HTML, pseudo-element, SVG, and iframe elements.

11. **Split preservation and partition into one case per width, each reading light-1280 (proposal 2, C3; proposal 3, change 3 by its angle). Conditional on Q1.**
    - **Files:**
      - `integration.test.ts:1122-1695`.
      - The `JOURNEY_PLACEMENTS` constant (`tests/setupBrowser.ts:5339-5346`).
      - `guides/veneer.md:1932, 1965-1966, 2338-2368`.
    - **Conditions:**
      - Each half builds `{ ...light-1280, width }`, as the loop does today (1131, 1447).
      - Each half registers through `it.each` over the placements.
      - Each half asserts its own `failures` list, restores the host viewport in its `finally` block, and prefixes its rows with the reading variant.
      - The split lands after items 1 and 2, because it re-indents their bodies.
    - **Saving:** 0 s alone. It enables item 12.
    - **Basis:** the `buildJourney` helper takes the viewport and theme from the variant it receives (`tests/setupBrowser.ts:1153-1162`). Projects differ only in the provided variant and the initial viewport (`vite.config.ts:412, 416`), over one shared provider (`vite.config.ts:324`).
    - **Coverage:** every assertion, control, line, and row runs per width at light theme and WIDTH×800. The counts change from 96 registered and 6 skipped (`journey-5b.log:199`) to 92 and 0.

12. **Place the pieces by measured slack (proposal 2, C4; proposal 3, change 4 by its angle).**
    - **Files:** the `JOURNEY_PLACEMENTS` constant and its comment; `guides/veneer.md:2338-2368`.
    - **Conditions:**
      - Compute the placement from the checkpoint run, not from a model, using the fewest moves.
      - No host-bound title moves (`lanes.md:58`).
      - The `theme` header table can move, because its rows read neither width nor theme (`tests/setupBrowser.ts:5342`).
      - Prefer dark-1280 as a destination where it has slack, because it holds no host-bound title.
      - Run each moved piece green in a scoped run at its destination (`j0c-brief.md:219`).
      - Record the memory peak.
    - **Saving:** about 70 s of wall time, modeled.
    - **Basis:**
      - Modeled spans after items 1 to 10: light-1280 about 629 s, dark-1280 about 530 s, light-390 about 513 s, dark-390 about 434 s. These come from the `journey-4.json:1` spans with untimed cases scaled by 1.16, as proposal 2 does, plus the logged bodies at `journey-5b.log:13-19, 39, 59, 79, 125`.
      - Move preservation-390 and partition-390 (about 58 s) and the theme table (about 12 s) to dark-390. Move preservation-1280 (about 34 s) to light-390.
      - With the start offsets of 10.29, 15.54, 16.26, and 16.53 s (`journey-4.json:1`), the projects end near 548, 546, 551, and 521 s.

13. **Split the paired case per family (proposal 2, C5). Deferred; conditional on Q3 and on the acceptance run.**
    - **Condition:** take it only if light-1280 still ends the run by more than one family's measured seconds. One light-1280 family averages 17.17 s (85.83 / 5, `journey-5b.log:59`).
    - **Saving:** credited 0 s.

## Refused changes

I rule on the remaining changes as follows:

- **Proposal 1, change 9 (parse the sheets one time per case, outside the width loop):** refused, because it conflicts with item 11. Each half parses its own sheets, and sharing parsed sheets across cases would couple the cases. If the user refuses Q1, adopt it (0.5 to 1.5 s).
- **Proposal 2, C1 and C2 as written:** superseded by items 1 and 2, which do the same sharing and add the selector-major build and the inverse move. Their proof and mutation-target conditions carry over.
- **An index rebuilt inside each call, without sharing:** refused as the main form. Its whole saving rests on the parse hypothesis, while sharing removes four scans either way.
- **Reading both widths in one page build:** refused, because the 390 reading would then depend on the history left by the 1280 reading.
- **Event waits in place of polls, or relaxing the 4-frame settle or the stability window:** refused. Cutting idle waits does not move this wall (`j0c-scope.md:32`), and the stability window is a negative proof.
- **Cheaper `readPerception` and `waitForState`:** refused here. That cost belongs to `@orkestrel/test` 0.0.24 (`node_modules/@orkestrel/test/dist/src/browser/index.js:919-944`); see Q5.
- **Header-row page reuse and the carousel image scope:** refused. The owner excluded both as J0c items 7 and 19 (`j0c-scope.md:32`).
- **Reusing J3's link resolution for its click:** refused, because it swaps the `clickAccessible` step for a raw click.
- **Proposal 2's refusals R1 to R4:** I uphold all four.
  - R1 drops readings. The matrix-reads case uses fixed tokens to prove theme distinction and width invariance across projects (`integration.test.ts:1009`).
  - R2 and R3 couple readings to earlier sheet or page state.
  - R4 removes what the paired case proves.
- **Proposal 3's runtime refusals 1 to 10:** I uphold all ten:
  - A fifth renderer or file parallelism: J0c's memory peak was 12,288,905,216 bytes against a 14,345,035,776-byte cap (`j0c-report.md:117`).
  - Concurrency inside a project: the cases share the `proven`, `placed`, and `rows` sets (`integration.test.ts:165-168`).
  - One browser shared by all projects, or one shared browser context.
  - The headless-shell build, which would re-baseline every reading and the host-bound set.
  - Virtual time or a faster animation rate, because the motion=true rows prove real transitions.
  - Force clicks, which drop the reachability proof that each click carries.
  - Raising light-1280's priority with `nice` or `chrt`, which takes CPU from the projects that hold every host-bound title.
  - Budget changes.
  - Start-offset changes.

## Target and basis

The target is **590 s on the 761.76 s basis**, 22.5 percent under it. If the user refuses Q1, the target falls back to **640 s** from items 1 to 10 alone. The basis follows:

- **Items 1 to 10:** the central saving on light-1280 is 122 s (68 + 35 + 5 + 3 + 8 + 2 + 1), with a floor of about 70 s and a ceiling of about 165 s.
  - Light-1280's span in the 761.76 s run is about 751.47 s: the wall less a 10.29 s start offset, proposal 2's method using the offset in `journey-4.json:1`.
  - After these items, light-1280 still ends the run: about 629 s against dark-1280's modeled 530 s. That puts the wall near 640 s.
- **Summed test time:** about 2231.49 − 150 = 2081 s. Divided four ways, that is 520 s; adding the last start offset of 16.53 s gives a bound near 537 s.
- **Items 11 and 12:** the projects model to end near 551 s.
  - The moved halves will run under full load. Full load has cost 1.43× on the paired case (59.90 s alone in `paired-5.log:19` against 85.83 s in `journey-5b.log:59`).
  - Adding 20 s for that gives about 570 s. The 590 s target leaves 20 s for model error.
- **Load-independent check:** wall time minus summed test time divided by 4. It reads 203.89 s in the 761.76 s run and 123.27 s in the 591.13 s run (`journey-4.log:169`).
- **Host load:** on one tree, host load alone moved the wall by 133.82 s, from 761.76 s to 895.58 s (`flip-gates-2/test:journey.log:201`). So every comparison is against B0, measured alone.
- **Unmeasured assumptions:**
  - The savings for items 1 to 6 and 8 rest on scan shares or prices that no run has measured yet.
  - Items 9 and 10 are credited 0 s.
  - Item 12's figures rest on the 1.16 scale model.

## Probes before implementation

Each probe prices or proves one item. Equality probes read fixed values, so they can run concurrently as scoped single-project runs within the memory cap. Price probes run alone under the lock.

| Probe | Settles | Method | Decides |
|---|---|---|---|
| P-0 (B0) | Every modeled figure | Two full runs alone, with the dot reporter, the JSON reporter, and the `tmp/codex/j0b-measure.ts` sampler | Per-case seconds, project spans, and memory peak on the landed tree |
| P-A | Items 1, 1(e), 2, 2(a), 8 | Uncommitted phase timers around the filter at 1990-1995, each match-map build in the `collectPartition` function, the departure loop, and the text reads; light-1280, two runs | Scan shares and their credit |
| P-B | Item 1(a) and the parse hypothesis | At both widths: the current filter against the selector-major and `querySelectorAll` forms; deep equality and timing | Index form |
| P-C | Item 2 | Memo against the current code for main, unmapped, and the moved inverse partition, at both widths | Equality |
| P-D | Item 3 | Count the elements without a component class; time both forms; compare groups | Take or drop |
| P-E | Item 4 | 56 `resolveSpecimen` calls against one `indexByName('figure')` call, under each face | Equality and price |
| P-F | Item 5 | Counting wrapper on `page.getByRole` during one scrollspy-1280 table | Credit |
| P-G | Item 6 | Price one call of each form; compare findings | Credit |
| P-H | Item 9 | A page build, a face switch, and one carousel row, with the domains on and off | Take or drop |
| P-I | Item 10 | Both forms over the 1,670 partition subjects, plus pseudo, SVG, and iframe elements | Take or drop |

## Questions for the user

Only the user can rule on the following. Each question carries my recommendation.

- **Q1: may the per-width preservation and partition halves run in any project while each one reads light-1280 (light theme, WIDTH×800)?** The code comments (`integration.test.ts:1122, 1440`) and the guide (`guides/veneer.md:1965-1966`) record a ruling that selects light-1280. **Recommend yes:** the case already reads 390×800 inside the light-1280 project (1129-1131, 1446-1447), so the ruling selects the reading and the host project is a scheduling choice. This adds 70 s of modeled wall saving.
- **Q2: may cases that read the same at every width or theme drop to fewer variants?** These are J6, the disabled and aria-disabled refusal, and the matrix reads. **Recommend no:** that drops readings, and after balancing, those seconds no longer sit on the critical path.
- **Q3: may the paired case become one case per family, 18 titles in place of one?** **Recommend defer** until the acceptance run shows the need.
- **Q4: may other lanes pause their browser suites during B0, the checkpoint, and the acceptance runs?** That is about six full runs. **Recommend yes:** under load, a saving cannot be told apart from noise.
- **Q5: may the `readPerception` cost (7 whole-document role queries per call) go on the `@orkestrel/test` roadmap?** **Recommend yes**, and keep it out of this unit.

## Measurement plan

The steps run in the following order:

1. **Start point.** Branch a worktree from the commit where the token units land on `main`. The order is T3, then the re-pin, then T4 (`lanes.md:73`).
2. **Baseline and probes.** Run P-0 alone, then the price probes alone, with the equality probes alongside.
3. **Write three lanes in parallel**, each on separate functions, merging in this order:
   1. Lane 1: items 1, 3, and 8.
   2. Lane 2: item 2.
   3. Lane 3: items 4 to 7, plus items 9 and 10 if their probes pass.
4. **Gate each lane** with all of the following:
   - `test:setup:browser`.
   - The changed case run twice alone.
   - Each logged reading line equal to B0's after removing the `seconds` and `milliseconds` fields.
   - The rows file equal to B0's.
   - `mutations-6.ts` reading red, then green after the restore.
   - One mutation control per index: drop the lifted sheet; drop the recipe; key the figure lookup to one title; point the cached navigation at Contents.
5. **Checkpoint.** Run two full runs alone and credit items 1 to 10 from the measured results.
6. **Lane 4 (items 11 and 12).** Start after Q1 is ruled. Compute the placement from the checkpoint spans, and run scoped runs at each destination.
7. **Acceptance.** Run two consecutive full runs alone, with the JSON reporter and the sampler. Each run passes when all of the following hold:
   - Every failure is in the host-bound set (`lanes.md:58`). A host-bound title that passes is not reclassified.
   - The case counts are 96 registered and 6 skipped, or 92 and 0 with item 11.
   - Each logged reading equals B0's for its kind and width. Only the order of the moved inverse line, and of lines that change project, may differ.
   - The union of rows equals B0's, apart from the reading-variant prefix.
   - The memory peak stays under the cap and is recorded.
   - The wall falls by at least the floor of the credited savings. With item 12, wall time minus summed time over 4 stays at or under the last start offset plus the largest piece the placement left unmoved.
   - These scripts exit 0: `check`, `lint:check`, `format:check`, `test:setup:browser`, `test:src:browser`, `test:app:browser` (the harness reaches every browser suite, `lanes.md:45`), `test:journey:vue`, `test:guides`, and `test:policy`.
8. **Record.** Log B0, the checkpoint, the acceptance runs, the spans, and the placement in `lanes.md`.