## Verdict

The following conventions hold for every citation in this plan:

- Repository paths are relative to `/home/user/veneer`, and `integration.test.ts` means `tests/app/browser/integration.test.ts`. Veneer line numbers are those of commit `07694f8` (HEAD at 2026-10-05 03:38 UTC). The cited test, harness, configuration, and guide files are byte-identical at `44b3610`, because `git diff 44b3610 07694f8` touches only `.claude/agents/orkestrel.md`, `guides/browser.md`, `package.json`, and `package-lock.json`.
- `lanes.md` is `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`. It is cited by section or by log-entry heading, because its lines moved at 2026-10-05 03:25 and again at 03:38 UTC. The `j0c-*` records sit in its `showcase/` folder. Scaffold paths are relative to `/home/user/scaffold` at `e2085846`.
- Run A is `tmp/units/tokens-t3/journey-6.log`, the lane's serial run (858.59 s, line 205). Run B is `tmp/units/flip-gates-2/test:journey.log`, the Orchestrator's gate run (817.88 s, line 205). Both ran the final T3 tree.
- Proposals 1, 2, and 3 are `proposal-0-Instrument-level--cu.json`, `proposal-1-Structure-level--cha.json`, and `proposal-2-Runtime-level--the-V.json` in the design folder.

**Finding.** The sixth pass widened the imbalance the first plan attacked:

- Light-1280 spends 292.15 s on preservation and partition in run A (148.99 + 143.16, `journey-6.log:151, 199`) and 252.70 s in run B (139.50 + 113.20, `flip-gates-2/test:journey.log:139, 199`). In the 761.76 s run it spent 219.72 s (135.43 + 84.29, `tmp/units/tokens-t3/journey-5b.log:139, 195`).
- The wall exceeds a four-way split of summed test time by 235.19 s in run A (858.59 − 2493.59 / 4, `journey-6.log:205`) and by 210.69 s in run B (817.88 − 2428.77 / 4, `flip-gates-2/test:journey.log:205`).
- The model in Target and basis ends light-1280 253 s (run A) and 223 s (run B) after the next project. Layer 1 saves at most 172 s, so the schedule has to carry most of the wall gain.

The plan has two layers:

- **Layer 1 (items 0, 11, 1a, 1b, 3, 2, 4 to 7, 9, and 10): identical inputs and outputs, no ruling.** Item 11 splits the two cases per width and keeps all four halves in light-1280. The modeled reduction from J-B0 is 65 to 172 s, central 121 s (14.1 percent of run A, 14.8 percent of run B).
- **Layer 2 (item 12; item 13 deferred): run the halves where the measured slack is, each still reading light-1280.** It needs Q1. A destination in light-390 or dark-390 also needs item 9 landed with P-H green. The modeled total reduction is 185 to 258 s, central 210 to 246 s (25.7 to 28.7 percent).

The following rulings change the first plan:

- Every figure rests on runs A and B, and every saving is a reduction from J-B0, the baseline this unit measures. B0 is renamed J-B0, because stage B's first unit is already called B0 (`lanes.md` § Log, entry "2026-10-04 — engine session to showcase session (the user's rulings: stage B and journey tuning move to you after the Tailwind layer)", bullets "Stage B is yours" and "Chromium 153").
- Item 2 caches the whole matched map, the selector classes, and the face declarations. The inverse partition keeps its position.
- Item 8 moves to Refused changes, because it is a ruling on the user's constraint.
- Item 9 becomes the precondition for any destination that holds a host-bound title.
- Item 11 lands first, together with the shared helper (item 1a), so one lane owns the selector-major match.
- The `test:journey` script stays as it is; the reporters go on the command line.
- Every gate compares normalized lines and the `## Resolved values` section, so it can pass.

**Parallelism.** Inside the run, four renderers on four CPUs is the ceiling. During run A the host read a load average of 9.81, with renderers at 52.3 to 81.9 percent of a core (proposal 3, angle). I uphold proposal 3's refusals 1 to 10.

The run gains parallelism only when its projects end together. In the 591.13 s run, dark-1280, light-390, and dark-390 sat idle for 114.26, 126.10, and 194.15 s (`tmp/units/flip-preservation/journey-4.json:1`, `endTime`).

Across the work, the plan runs in parallel where it can:

- Lanes write code in parallel on separate functions, including while J-B0 runs, because editing takes no host time.
- Equality runs share a window under the lock, with at most four Chromium instances at a time, which is the count a full run launches.
- Price runs hold the host alone (Q2).
- One lane owns each shared function (item 1a).

**What remains before any merge.** The start commit (Measurement plan, step 1) and J-B0. Lanes 0 and 3 can write while J-B0 runs. Q1 gates lane 4 only.

**Notes on the proposals.** The following corrections hold:

- Proposal 3 is complete; it holds five changes. The first plan said its text stops inside change 2, which is wrong, so I rule on its changes 4 and 5 from their text in Refused changes.
- The 14 to 17 ms role-query price sits at `j0c-brief.md:121`. The owner's exclusion of J0c items 7 and 19 sits at `j0c-scope.md:32`.
- Proposal 1 says no change touches a host-bound title's code path. Its changes 6 and 7 do:
  - The reference and class checks run in every guarded row (`tests/setupBrowser.ts:3134-3137`).
  - The focus walk serves the `traverseFocus` function (1209), which the overlay controls call (4683).
  
  Both changes keep outputs identical, and the acceptance failure-set rule covers them.

## Adopted changes

The items keep the first plan's numbers, so the critic's gap references still hold. Item 1a is added, and item 8 is refused.

The items appear in landing order. Each one names:
- its lane and the Measurement plan step at which that lane merges;
- its files;
- its saving, as a reduction from the J-B0 duration of what it changes, with the range modeled on runs A and B;
- its basis;
- the coverage it keeps.

**Item 0. Measure from the command line and keep the evidence (lane M, before J-B0; proposal 3, changes 1 and 2).**

- **Files:** none in the repository. The unit folder is `tmp/units/journey-cost/` in the main checkout, which git ignores (`.gitignore:11`).
- **Change:** every price run passes `--reporter=dot --reporter=json --outputFile=UNIT_FILE` on the command line, inside the sampler and `flock /home/user/.wave/journey.lock`, in the J0c form (`j0c-brief.md:22, 89, 248`). `UNIT_FILE` is a JSON path in the unit folder.
- **Script:** the `test:journey` script (`package.json:101`) stays. Scaffold writes it (`src/core/compilers.ts:492-494`), and its audit reports any differing value (`src/bin/CLI.ts:1250-1260`).
- **Evidence:**
  - After each full run, the lane copies the four `tmp/journey/*.txt` files and the JSON report into the unit folder, because every journey run overwrites them (`integration.test.ts:1860`).
  - Before the unit starts, the lane copies every log this plan cites. `flip-gates-2/test:journey.log` was rewritten at 2026-10-05 03:19 UTC and no longer holds the 895.58 s run.
- **Saving:** 0 s. **Coverage:** no test changes.

**Item 11. Split preservation and partition into one case per width, with all four halves in light-1280 (lane 0, merged at plan step 5; proposal 2, C3; no ruling).**

- **Files:**
  - `integration.test.ts:1122-1439` and `1440-1695`.
  - The `JOURNEY_PLACEMENTS` constant (`tests/setupBrowser.ts:5339-5346`).
  - `guides/veneer.md:1932` and `1965-1966` (the titles) and `2336-2368` (Variant placement).
- **Conditions:**
  - Each half builds its page from the light-1280 variant object with its width replaced, as the loops do (1131, 1447). It restores the host's viewport (`OWN`) in its `finally` block (1429-1436, 1685-1692).
  - Each half registers through `it.each` over a placement entry filtered to `VARIANT`, as the shared cases do (459, 686). In this step every entry names light-1280, so the comments at 1122 and 1440 keep their ruling.
  - Each half asserts its own `failures` list, keeps the 300 s budget (1438, 1694), parks the pointer in its `finally` block, and takes a title that names its width.
  - Logging (gap 4): the four lines that carry `variant: VARIANT` (1432, 1527, 1550, 1688) put the reading variant's name in `variant` and the project in a separate `host` field. No other line gains a field. The dot reporter names no project in its stdout headers (`journey-6.log:152`), so the `host` field is the only place a moved line names its project.
  - Rows: each half prefixes its rows (1242, 1475, 1551) with the reading variant's name.
- **Saving:** 0 s. The split gives per-width durations in the JSON report without phase timers.
- **Basis:** the `buildJourney` helper takes the viewport and theme from the variant it receives (`tests/setupBrowser.ts:1153-1162`). Only the `failures` list crosses widths (`integration.test.ts:1127, 1428`).
- **Coverage:** every assertion, control, line, and row runs per width at light theme and WIDTH×800. At this step the counts move from 96 registered and 6 skipped (`journey-6.log:203`) to 92 registered and 0 skipped.

**Item 1a. Give the selector-major match one owner (lane 0, merged at plan step 5; gap 8).**

- **Files:**
  - `tests/setupBrowser.ts`, beside the `collectComponentSignatures` function (1867), in the showcase section of that shared file (`lanes.md` § Paths, shared-files table).
  - A unit proof in `tests/setupBrowser.test.ts`, beside the `component preservation readings` block (1088).
- **Change:**
  - One exported helper, named for what it does (for example `indexSelectorMatches`), takes candidate elements and selector texts.
  - It evaluates each distinct text one time with `element.matches` over the candidates, and returns each text's matching candidates in document order. That is the predicate all three scans use (`tests/setupBrowser.ts:1906, 1994, 2164, 2169`).
  - An alternative form evaluates each text with `querySelectorAll` and intersects the result. A caller takes it only where P-B (items 1b and 2) or P-D (item 3) reads deep equality at both widths and a lower price.
  - Items 1b, 2, and 3 call this helper and build no match of their own.
- **Proof:** a media rule, a pseudo-element selector, a `:hover` selector, one selector repeated across two sheets, and an invalid selector. The helper refuses the invalid selector the same way `element.matches` does.
- **Saving:** 0 s; it enables items 1b, 2, and 3. **Coverage:** the predicate is the code's own.

**Item 1b. Share one matched-rule index across the preservation half's three full attributions (lane 1, merged at plan step 8; proposal 1, change 1; absorbs proposal 2, C1).**

- **Files:**
  - The `collectComponentPreservation` function (`tests/setupBrowser.ts:1938-2056`), with the scan at 1974-1976 and the per-representative filter at 1990-1995.
  - Its options type (`Omit<AttributionOptions, 'ancestors'>`, with `AttributionOptions` at `tests/setupStyles.ts:815-824`), which gains an optional index field.
  - The call sites at `integration.test.ts:1215, 1273, 1282`.
  - Proofs beside `tests/setupBrowser.test.ts:1088`.
- **Conditions:**
  - (a) The index comes from item 1a over the representatives. It appends each matching entry to the representative's per-sheet list in scan order.
  - (b) The function refuses an index built for other sheets, and a unit proof pins the refusal (proposal 2's foreign-sheet proof).
  - (c) The index is built directly before line 1215 and passed only to 1215, 1273, and 1282. No `await` sits between 1215 and 1282; the next one is at 1320. The sheet-rewrite controls (1321, 1355, 1407) keep their own scan.
  - (d) Gap 14: all four mutation targets stay byte-identical and unique, as `tmp/units/tokens-t3/mutations-6.ts:6-9` lists them:
    - `longhand.startsWith('overflow-')` (`tests/setupBrowser.ts:2003`);
    - `face === 'tailwindcss' && options.scales !== undefined` (2294);
    - the `table` target (`tests/setupStyles.ts:628`);
    - the `inherited` target (548).
    
    The script mutates the first occurrence after an `includes` check (13-15), so every lane's gate checks that each target occurs exactly once.
  - (e) The memo in the `attributeDeparture` function (`tests/setupStyles.ts:574-633`) waits until P-A prices the departure loop above the spread of its two runs; it is credited 0 s. That function holds the `table` target (628), so (d) applies.
  - (f) Gap 20: P-A times the log line (`integration.test.ts:1228-1241`), the row (1242), and the artifact write (1860); credited 0 s. If P-A prices the two serializations of `result` above the spread of its runs, lane 1 serializes it one time per width and splices the string into both outputs. The line gate proves the bytes identical.
- **Saving:** reduces the preservation halves' summed J-B0 duration by 42 to 69 s, central 51 s, all on light-1280.
- **Basis:**
  - One full attribution costs (case − first phase at 1280 − first phase at 390 − 4.53) / 4.
    - Run A: (148.99 − 33.21 − 34.25 − 4.53) / 4 = 19.25 s (`journey-6.log:95, 139, 151`).
    - Run B: (139.50 − 34.81 − 30.41 − 4.53) / 4 = 17.44 s (`flip-gates-2/test:journey.log:95, 127, 139`).
  - The first phase is the logged `seconds` field (`integration.test.ts:1236`), which runs from the width's page build through the main attribution.
  - The 4.53 s is the six sheet-rewrite controls before T3: 61.45 − 28.35 − 28.56 (`tmp/units/flip-preservation/journey-4.log:65, 89, 97`).
  - Sharing removes four of the six full scans. At a scan share of 0.6 to 0.9, that is 4 × 17.44 × 0.6 = 41.9 s to 4 × 19.25 × 0.9 = 69.3 s. The central figure is 4 × 18.35 × 0.7 = 51.4 s.
  - The build evaluates 2,612 distinct selector texts in place of 5,276 rules per scan (proposal 1, change 1, basis), so it costs no more than the scan it replaces. P-B measures it.
- **Coverage:** for each representative and sheet, the index yields the same entries as the filter, in the same order. Every cause, exclusion, departure, `lost` entry, line, row, and assertion (1219-1300) stays.

**Item 3. Decide signature membership through item 1a (lane 1, merged at plan step 8; proposal 1, change 3; conditional on P-D).**

- **Files:** the `collectComponentSignatures` loop (`tests/setupBrowser.ts:1902-1909`).
- **Conditions:**
  - Item 1a's predicate (1906).
  - Each rule's conditions evaluated one time, because they read only the window (`tests/setupStyles.ts:415-430`).
  - The 608 component names held in a `Set`.
- **Saving:** reduces the preservation halves' summed J-B0 duration by 0 to 10 s, central 5 s. The floor is 0 s because the `element.matches` form makes the same number of calls; the saving comes from the `querySelectorAll` form, if P-D admits it.
- **Basis:** 548 component-scoped selectors (496 distinct) are tested on every element without a component class, at both widths (proposal 1, change 3, basis). Each width has 10,225 elements and 218 excluded (`journey-6.log:95, 139`). P-D counts the elements without a component class.
- **Coverage:** the groups, keys, and order stay, and so do the logged `signatures` and `excluded` counts.

**Item 2. Share the partition's matched map across its full partitions (lane 2, merged at plan step 8; proposal 1, change 2; absorbs proposal 2, C2 and the critic's cache findings).**

- **Files:**
  - The `collectPartition` function (`tests/setupBrowser.ts:2140-2341`): the matched-map build at 2158-2196, the class-name loop at 2199, and the face declarations at 2224-2240.
  - The `PartitionOptions` interface (222-231), which gains an optional memo field.
  - The call sites at `integration.test.ts:1549, 1553, 1633`, and at 1611 and 1674 after P-C.
  - Proofs in `tests/setupBrowser.test.ts`.
- **Conditions:**
  - (a) The memo key is the element plus the identities of `options.rules` and `subject.values.bootstrap`. The value is the whole `matched` map: sheet, then physical longhand, then declarations.
    - The main call (1549) and the unmapped call (1553) pass the same `subjects` array and the same rules map, with no `await` between them.
    - The inverse call (1636) and the subset calls (1606, 1679) spread `...subject.values` and replace only `tailwindcss`, so `values.bootstrap` keeps its identity.
    - The `resolvePartitionProperty` call reads only `values.bootstrap` (2173), and no call mutates a declaration.
  - (b) The inverse partition stays at 1633. It runs after the face switches at 1578, 1592, and 1595 and the adopted sheets at 1597-1631.
    - The `matchesConditions` function reads only media and supports conditions (`tests/setupStyles.ts:415-430`), so an adopted sheet cannot change a match. A face click can change `:hover` or `:focus` state.
    - So the inverse call and the subset calls take the memo only where P-C reads their fresh matched maps deep-equal to the memo at both widths. Otherwise they compute fresh.
  - (c) The `collectSelectorClasses` function (`tests/setup.ts:1543`) is a per-character tokenizer that runs for every matched selector of every subject (`tests/setupBrowser.ts:2170`). It is memoized by selector text inside the memo. A text that throws is not cached.
  - (d) The `faceDeclarations` map is built one time per subject and face. It reads no class name (2224-2240), and the name loop reads it without mutation, because its filter and sort run on copies.
  - (e) The memo refuses a rules map other than the one it was built for, and a unit proof pins the refusal.
  - (f) The mutation targets follow item 1b(d).
- **Saving:** reduces the partition halves' summed J-B0 duration by 15 to 72 s, central 50 s, on light-1280.
- **Basis:**
  - Since the sixth pass, the unmapped control is a full partition at each width (`tmp/units/tokens-t3/report-5.md:233`; `integration.test.ts:1553`). Each width therefore runs three full partitions (1549, 1553, 1633).
  - One full partition costs about 12.0 s alone: (85.79 − 61.82) / 2 (`report-5.md:317`; `tmp/units/tokens-t3/partition-3-dev.log:46`). That is an upper bound, because the sixth pass also added the role control.
  - Under the full run's contention, which is 1.32 (113.20 / 85.79) to 1.67 (143.16 / 85.79), one partition costs 15.8 to 20.0 s.
  - Run B's growth over the 761.76 s run gives a floor of 14.5 s: (113.20 − 84.29) / 2 (`flip-gates-2/test:journey.log:199`; `journey-5b.log:195`).
  - With 2 or 4 reusing calls and a reuse share of 0.5 to 0.9, the saving is 2 × 0.5 × 14.5 = 14.5 s to 4 × 0.9 × 20.0 = 72.0 s. The central figure is 4 × 0.7 × 17.9 = 50.1 s.
  - P-A splits each call into the matched-map build, the face declarations, and the rest.
- **Coverage:** identical matched maps give identical violations, clauses, skipped counts, differences, rows, and lines. No line changes position.

**Item 4. Resolve each reading set's figures with one role query, keeping both refusals (lane 3, merged at plan step 8; proposal 1, change 4, amended; gap 19).**

- **Files:**
  - The `readTailwind` function (`tests/setupBrowser.ts:1436-1442`), and a set reader beside it.
  - The call sites at `integration.test.ts:400, 415, 1030`.
- **Change:**
  - The set reader resolves the figure population one time per synchronous set and keys it by the `readName` function, as the `indexByName` helper does (1174-1191).
  - For each title it resolves, it refuses zero figures, several figures, and a figure that is not an `HTMLElement`, with the messages of the `resolveSpecimen` function (1385-1386, 1389).
- **Saving:** reduces J4 plus the matrix reads by 3 to 6.5 s per project, central 5 s on light-1280. Summed over the four projects, 12 to 26 s.
- **Basis:**
  - There are 56 readings over 28 specimens (`TAILWIND_READINGS`, `tests/setupBrowser.ts:535-978`; the logged set holds 56 values at `journey-6.log:61`).
  - J4 reads 4 sets (400, plus 415 under 3 faces) and the matrix reads 3 sets (1030). That is 392 role queries per project; the set reader makes 7.
  - At 14 to 17 ms per query (`j0c-brief.md:121`, measured on J2 as a proxy), 385 fewer queries save 5.4 to 6.5 s.
  - The floor is proposal 1's per-title memo: 196 × 14 ms = 2.7 s.
- **Coverage:** the same role, exact name, uniqueness, and element type per title, under the face each set reads. The expectations, the `Journey Tailwind readings` lines, and the rows stay.

**Item 5. Scope the scrollspy polls to the resolved landmarks (lane 3, merged at plan step 8; proposal 1, change 5; conditional on P-F).**

- **Files:** `tests/setupBrowser.ts:5124-5254`.
- **Conditions:**
  - Every wait ends on a whole-document `readScrollspySelection` read that agrees with the scoped read. The whole-document read runs after the scoped read passes.
  - The `assertScrollspySelection` function keeps its whole-document region and link resolution (5177-5188).
  - The condition for ending a wait becomes stricter, not looser.
- **Saving:** reduces the scrollspy-1280 table pair's J-B0 duration by 4 to 11 s, central 8 s. The scrollspy-390 pair in light-390 saves about the same.
- **Basis:**
  - Proposal 1 counts 10 to 20 whole-document role queries per row, over 36 rows per table, at 14 to 17 ms each (`j0c-brief.md:121`).
  - The pairs read 78.70 s (44.67 + 34.03) and 145.75 s (82.37 + 63.38) in the 591.13 s run (`journey-4.json:1`, `testResults[0]` and `[2]`). Runs A and B time no table.
  - P-F counts the queries.
- **Coverage:** the keyboard path, the settle, the activation-event and keyboard-scroll checks (5240-5249), and the from-state and to-state assertions stay. The mutation control points the cached navigation at the Contents navigation, and the row must fail.

**Item 6. Make the reference and class checks linear (lane 3, merged at plan step 8; proposal 1, change 6).**

- **Files:** `tests/setupBrowser.ts:2873-2905`.
- **Conditions:**
  - The registry-name cache stays behind the dynamic `import('@app/browser')` call (2902), because the harness imports no value from `app/` (`lanes.md` § Rules, "The environment boundary").
  - A unit proof covers:
    - an id that occurs three times, which yields two `duplicate:` findings, as the `indexOf` filter does (2875-2877);
    - a dangling `aria-controls` target;
    - a non-fragment `href` value.
- **Saving:** reduces light-1280's table and paired durations by 1 to 3 s, central 2 s; 3 to 9 s summed.
- **Basis:** the duplicate scan calls `indexOf` for each id. The checks run in every guarded row (3134-3137), for each paired face (`integration.test.ts:960`), in each header row (1733), and at each table end (1801-1802). P-G prices one call of each form.
- **Coverage:** the same findings in the same order, including in the host-bound tables' rows.

**Item 7. Read the Tab-walk bound from a live collection (lane 3, merged at plan step 8; proposal 1, change 7).**

- **Files:** `tests/setupBrowser.ts:2847`.
- **Saving:** 0 s on light-1280. 1 to 2 s in each project that runs the reach case (`integration.test.ts:695`). The target credits 0 s.
- **Basis:** each Tab press builds a static list of every element only to read its length (proposal 1, change 7, basis).
- **Coverage:** both forms give the same count at every check.

**Item 9. Disable the DOM and CSS Chrome DevTools Protocol (CDP) domains after the specificity reading (lane 3, merged at plan step 8; proposal 1, change 11; conditional on P-H equality, not on its price; gap 3).**

- **Files:** the `readSpecificities` function (`tests/setupStyles.ts:277-323`). Its `finally` block (320-322) sends `CSS.disable` and then `DOM.disable` after the `CSS.setStyleSheetText` reset (321).
- **Ruling on the domains:**
  - The `readSpecificities` function is the only code that enables either domain (`tests/setupStyles.ts:283-284`; no other `.enable` call under `tests/`, `app/`, or `src/`), and it never disables them.
  - Each preservation and partition width calls it (`integration.test.ts:1134, 1508`), so light-1280 runs every later case with both domains on.
  - Item 12 would carry that state into light-390 and dark-390, which hold all five host-bound journey titles (`lanes.md` § Host-bound set, `journey` bullet). The moved pieces run in the matrix block (`integration.test.ts:860`), before the statechart tables (1698).
  - One CDP stall is on record on this host:
    - The signature proof at `tests/setupBrowser.test.ts:1234` timed out at 15,000 ms in the Orchestrator's gate run (`tmp/units/flip-gates-2/test:setup:browser.err:4-5`; `tmp/units/tokens-t3/review/setup-browser-gates-timeout.err:4-5`).
    - Its only `await` is the `readPartitionRules` call at 1243, so the 15 s sits in a CDP round trip.
    - It passed in three other runs: in 49 ms in the verbose rerun (`review/setup-browser-verbose.log:111`), in a scoped rerun whose tests read 102 ms (`review/setup-groups-iso.log:7-9`), and in the T3 lane's run (`tmp/units/tokens-t3/setup-browser-6b.log:27`, 156 passed).
  - The record shows that a CDP round trip can stall under load. It does not show that the open domains cause the stall.
  - So I adopt item 9 as a state fix, credited 0 s, and make it the precondition for item 12's light-390 and dark-390 destinations. Until item 9 lands with P-H green, item 12 places pieces in dark-1280 only.
  - Measured slack ranks the admitted destinations, and dark-1280 wins a tie because it holds no host-bound title.
  - In the central model, dark-1280 has no slack left after layer 1. The dark-1280-only fallback therefore keeps 147 to 165 s of reduction, against 210 to 246 s with every destination (Target and basis).
- **Saving:** credited 0 s; P-H prices it.
- **Coverage:** the readings complete before the disable. The `readTouchListeners` function issues DOM calls without enabling the domain (`tests/setupBrowser.ts:5643-5690`). It already runs with the domains off in the `src:browser` suites, which never call `readSpecificities` (`tests/src/browser/helpers.test.ts:80-87`; `tests/src/browser/integration.test.ts:74-77`).

**Item 10. Cache the standard longhand names per window (lane 3, merged at plan step 8; proposal 1, change 10; conditional on P-I).**

- **Files:** `tests/setupStyles.ts:1455-1464`.
- **Saving:** credited 0 s.
- **Basis:** the enumeration includes every custom property an element carries: 485 custom names in the recipe and 449 in the built sheet, by proposal 1's textual count (change 10, basis). No run prices it.
- **Coverage:** the map's keys, order, and values stay identical. The proof covers HTML, pseudo-element, SVG, and iframe elements. Line 343 of `tests/integration.test.ts` depends on the enumeration that `readLonghands(document.body)` returns, so item 10's gate includes `test:integration`.

**Item 12. Place the pieces by measured slack (lane 4, plan step 10; proposal 2, C4; proposal 3, change 3). Conditional on Q1; light-390 and dark-390 also need item 9.**

- **Files:** the `JOURNEY_PLACEMENTS` constant and its comment; `guides/veneer.md:2336-2368`.
- **Conditions:**
  - Compute the placement from the checkpoint's spans and memory peak, with the fewest moves (gaps 10 and 11).
  - Before balancing, inflate light-1280's alone-phase work by the contention factor on record, 1.15 to 1.67 (J4: `tmp/units/tokens-t3/j4-5-isolated.log:9` against `journey-5b.log:13-19`; partition: `report-5.md:317` against `journey-6.log:199`).
  - No host-bound title moves (`lanes.md` § Host-bound set). The `theme` header table can move, because its rows read neither width nor theme (`tests/setupBrowser.ts:5342`).
  - Destinations follow item 9's ruling.
  - Each moved piece must:
    - run green in a scoped run at its destination, with its duration recorded (the J0c rule for a moved table, `j0c-brief.md:219`);
    - read red under one mutation there, then green after the restore. The mutation is the coupling target for a preservation half and the partition target for a partition half (`mutations-6.ts:8-9`).
  - A placement trial full run with the sampler reads coinciding memory peaks before acceptance. The peak must stay under the 14,345,035,776-byte cap (`j0c-report.md:117`).
  - Logging follows item 11. The theme table's `Header statechart` line (`integration.test.ts:1762`) names its host, and acceptance lets its `variant` change.
- **Saving:** reduces the wall by a further 89 to 125 s beyond layer 1's central 121 s (modeled), or 26 to 44 s with dark-1280 as the only destination.
- **Basis:** the central placement on both runs (Target and basis):
  - keeps preservation-1280 in light-1280;
  - moves partition-1280 to light-390;
  - moves preservation-390, partition-390, and the theme table to dark-390.
- **Coverage:** no case, assertion, control, or reading changes; only the host project changes. The log volume moves with the halves: each moved preservation half adds about 5.1 MB (a row and a journal line) to its host's artifact (`tmp/journey/light-1280.txt:355-356, 462, 468`).

**Item 13. Split the paired case per family (proposal 2, C5). Deferred; it falls under Q1's ruling if taken.**

- **Condition:** take it only if, after the placement trial, the longest project still ends more than one light-1280 family after the next one.
  - One family averages 18.07 s in run A and 19.19 s in run B (90.33 / 5 and 95.97 / 5; `journey-6.log:59`; `flip-gates-2/test:journey.log:59`).
  - Its row (`integration.test.ts:986`) names `VARIANT`, so it takes item 11's logging rule.
- **Saving:** credited 0 s.

## Refused changes

I rule on the remaining changes as follows:

- **Item 8 (text membership on the representatives only):** refused (gap 18). It drops the `innerText` and visibility reads on the other elements (`integration.test.ts:1182-1192`), which is a ruling on the user's constraint. Its credit of 0 to 2 s sits inside the 40.71 s spread between two runs of the same tree (858.59 − 817.88).
- **The first plan's move of the inverse partition (its 2(c)):** refused. The move changes the DOM state the inverse reads, exactly as the memo would, but without P-C's proof, and it reorders a line. Item 2(b) keeps the position and proves equality.
- **The first plan's edit of the `test:journey` script:** refused (gap 12). Item 0 passes the reporters on the command line.
- **The first plan's byte-equal rows-file gate:** refused (gap 5). The Journal section carries 3, 4, 6, and 3 timing lines in `tmp/journey/dark-1280.txt`, `dark-390.txt`, `light-1280.txt`, and `light-390.txt`. The Measurement plan's line and rows gates replace it.
- **Proposal 1, change 9 (parse the sheets one time per case):** refused, because it conflicts with item 11: each half parses its own sheets.
- **Proposal 2, C1 and C2 as written:** superseded by items 1b and 2, which keep their proof and mutation-target conditions.
- **An index rebuilt inside each call without sharing:** refused as the main form, because sharing removes four scans either way.
- **Reading both widths in one page build:** refused, because the 390 reading would then depend on the history the 1280 reading leaves.
- **Event waits in place of polls, or a relaxed 4-frame settle or stability window:** refused. Cutting idle waits does not move this wall (`j0c-scope.md:32`), and the stability window is a negative proof.
- **Cheaper `readPerception` and `waitForState` functions:** refused in this unit. The cost belongs to `@orkestrel/test` 0.0.24, whose `readPerception` function runs 7 whole-document role queries per call (`node_modules/@orkestrel/test/dist/src/browser/index.js:919-944`). The record step logs it in `lanes.md` for that package's owner; it needs no user ruling.
- **Header-row page reuse and the carousel image scope:** refused; the owner excluded both as J0c items 7 and 19 (`j0c-scope.md:32`).
- **Reusing J3's link resolution for its click:** refused, because it swaps the `clickAccessible` step for a raw click.
- **The first plan's Q2 (fewer variants for cases that read the same everywhere):** refused without a question, because the user's constraint already keeps every reading. Proposal 2's R1 to R4 stand: R1 drops readings, R2 and R3 couple readings to earlier sheet or page state, and R4 removes what the paired case proves.
- **Proposal 3, change 4 (move the alert, modal, and dropdown tables):** refused, because it changes readings:
  - Each move changes the theme a table's rows read.
  - Alert's move also changes its width from 1280 to 390 (`tests/setupBrowser.ts:5361, 5389, 5431`).
  - Each paired family moves with its table (`integration.test.ts:864`).
  
  Item 12 balances the projects without changing any reading's variant.
- **Proposal 3, change 5 (`TMPDIR=/dev/shm`):** refused. It claims no saving, and two runs per arm cannot resolve a gain smaller than the 40.71 s spread between runs of the same tree. It would also cost four full runs (up to 57 min) of host-clear time.
- **Proposal 3's runtime refusals 1 to 10:** upheld. They refuse:
  - a fifth renderer or file parallelism;
  - concurrency inside a project (`integration.test.ts:165-168`);
  - one shared browser or one shared context;
  - the headless-shell build;
  - virtual time or a faster animation rate;
  - force clicks;
  - `nice` or `chrt` priority for light-1280;
  - budget changes and start-offset changes.
  
  J0c's memory peak was 12,288,905,216 bytes against the 14,345,035,776-byte cap (`j0c-report.md:117`).

## Target and basis

The model applies the first plan's method to runs A and B. Its inputs are:

- **Untimed seconds per project** come from the 591.13 s run: each project's span less its J4, paired, preservation, and partition cases (`journey-4.json:1`). They are 360.18 s for light-1280, 380.12 s for dark-1280, 416.00 s for light-390, and 322.65 s for dark-390, 1,478.95 s in all.
- **Scale factors.** Each run scales those seconds by its own untimed summed time divided by 1,478.95 s:
  - Run A: 2493.59 − 604.30 logged = 1,889.29 s, a factor of 1.2775.
  - Run B: 2428.77 − 577.18 logged = 1,851.59 s, a factor of 1.2520.
  - The logged bodies sit at `journey-6.log:13-19, 39, 59, 79, 125, 151, 199` and `flip-gates-2/test:journey.log:13-19, 39, 59, 79, 125, 139, 199`.
- **Light-1280** is pinned to the observed wall less its 10.29 s start offset. The model's excess (7.37 s in run A, 6.33 s in run B) is spread over the other three projects.
- **Start offsets** of 10.29, 15.54, 16.26, and 16.53 s come from `journey-4.json:1` (`startTime`). The dot reporter records none for runs A and B.

The model puts each project's end at the following second:

| Run | light-1280 | dark-1280 | light-390 | dark-390 |
|---|---:|---:|---:|---:|
| A | 858.6 | 605.4 | 588.0 | 500.1 |
| B | 817.9 | 595.3 | 575.7 | 498.6 |

**Layer 1** reduces light-1280 by 65 s (floor), 121 s (central), or 172 s (ceiling). Those are items 1b, 2, 3, 4, 5, and 6 at their floors (42 + 15 + 0 + 3 + 4 + 1), central figures (51 + 50 + 5 + 5 + 8 + 2), and ceilings (69 + 72 + 10 + 6.5 + 11 + 3). Light-1280 still ends the run at every layer-1 figure, so the wall falls by that amount.

**Layer 2** balances five pieces: the four halves after layer 1, and the theme table (10.30 s in `journey-4.json:1`, scaled to 13.2 s in run A and 12.9 s in run B). Three terms set its wall:

- The balanced bound is (summed time after layer 1 + 58.62 s of offsets) / 4.
- The best placement of the five pieces, found by exhaustive search, cannot split pieces and so adds 4.1 to 16.9 s over the bound.
- A tail allowance of (f − 1) × W / 4. Here f is the contention factor (1.15 to 1.67), and W is light-1280's alone-phase work after layer 1 (59.6 to 191.8 s across the cases). It is divided by 4 because item 12 inflates that work before balancing.

The following table gives the modeled reductions from each run's wall:

| Scope | Run A (s) | Run B (s) | Share of the run's wall |
|---|---:|---:|---|
| Layer 1, central | 121.0 | 121.0 | 14.1 and 14.8 percent |
| Layer 1, range | 65.0 to 171.5 | 65.0 to 171.5 | 7.6 to 21.0 percent |
| Layer 1 and item 12, every destination, central | 228.2 to 246.2 | 210.4 to 224.4 | 25.7 to 28.7 percent |
| Layer 1 and item 12, every destination, range | 203.9 to 258.3 | 184.9 to 228.9 | 22.6 to 30.1 percent |
| Layer 1 and item 12, dark-1280 only, central | 146.8 to 164.8 | 147.6 to 161.7 | 17.1 to 19.8 percent |
| Layer 1 and item 12, dark-1280 only, range | 117.8 to 208.1 | 101.8 to 193.7 | 12.4 to 24.2 percent |

**Target.** The target depends on the user's rulings:

- **With Q1 ruled yes and item 9 landed:** a 25 percent reduction from J-B0's faster run. This is the low edge of the central band.
- **With Q1 ruled yes and dark-1280 as the only destination:** 17 percent.
- **Without Q1:** layer 1's central 14 percent.

The acceptance floor comes from the checkpoint (Measurement plan, step 9), not from this model.

**Load-independent check.** The imbalance, wall − summed test time / 4, reads 235.19 s in run A and 210.69 s in run B. The model predicts 18.8 to 31.6 s after item 12: 14.66 s of offsets (58.62 / 4) plus the placement's granularity.

**Host load.** The two runs on one tree differ by 40.71 s in wall time, and by 29.96 s in the partition case (143.16 against 113.20 s, line 199 of each log). Neither run had the host to itself:

- Run A started at 02:31:51 UTC (`journey-6.log:204`). The T4 lane wrote its acceptance logs from 02:39:16 to 02:44:04 UTC (`/home/user/.wave/veneer-t4/tmp/units/tokens-t4/acceptance-final/` and `acceptance/`), during run A.
- Run B ran from a gate script that takes no lock (`tmp/units/flip-gates-2/gates.sh:12`).

So every comparison is against J-B0, measured alone. The first plan's 895.58 s figure is dropped, because its cited file no longer holds it.

**Unmeasured assumptions.** The following inputs rest on models until the probes measure them:

- the attribution scan share (item 1b);
- the partition reuse share, and whether the inverse can reuse the memo (item 2);
- the role-query price (items 4 and 5);
- the per-call prices (item 6);
- the contention factor f, and the uniform scale of untimed cases;
- the start offsets of runs A and B, taken from the 591.13 s run;
- items 7, 9, and 10, which are credited 0 s.

## Probes

Each probe runs inside the lane that writes the code it needs. A probe can have two parts:

- **Equality part:** runs in an equality window. The lock is held, and up to four Chromium instances run at a time.
- **Timing part:** runs in a price window, alone on the host.

The probes are:

| Probe | Lane | Window | Method | Decides |
|---|---|---|---|---|
| J-B0 | M | Price | Two full runs alone, with the dot and JSON reporters and the sampler. Outputs copied after each run. The resolved Chromium executable and version recorded. | Every credit's basis, stated as the range of the two runs. Spans, memory peak, and failing set. |
| P-A | 0 | Price | Uncommitted timers in the four halves: build, parse, specificity, signatures, box and text reads, longhand reads. Each attribution's filter (1990-1995) against the rest. Each partition call split into matched-map build, face declarations, and the rest. The log line (1228-1241), the row (1242), and the portfolio case's artifact write (1860). Two runs in light-1280. | The scan and reuse shares. The credits of items 1b and 2. Items 1b(e) and 1b(f). |
| P-B | 1 | Equality, then price | Both index forms against the filter at 1990-1995, per representative and sheet, at both widths. Deep equality, then time. | The index form for items 1b and 2. |
| P-D | 1 | Equality, then price | Count the elements without a component class. Both signature forms; groups deep-equal; time. | Item 3. |
| P-C | 2 | Equality, then price | The memo against fresh matched maps at 1553, 1633, 1611, and 1674, at both widths. Results deep-equal. Time with and without the memo, the class memo, and the hoisted face declarations. | Which calls take the memo; item 2's credit. |
| P-E | 3 | Equality, then price | The set reader against 56 `resolveSpecimen` calls under each face. The same element per title, and the same refusals and messages for zero figures, several figures, and a non-`HTMLElement` figure. Time. | Item 4. |
| P-F | 3 | Equality | A counting wrapper on `page.getByRole` during one scrollspy-1280 table in light-1280 and one scrollspy-390 table in light-390. | Item 5's credit; lane 3's price runs supply the price. |
| P-G | 3 | Equality, then price | Both forms of each check at one guarded row. Findings deep-equal. Time. | Item 6. |
| P-H | 3 | Equality, then price | Specificity readings with and without item 9, for the preservation and partition selector sets, deep-equal. `document.styleSheets` length and the head's children equal after each call. Time of the `DOM.enable` and `CSS.enable` round trips, a page build, a face switch, and one carousel row, with the domains on and off. | Item 9, and with it item 12's destinations. |
| P-I | 3 | Equality, then price | Both `readLonghands` forms over the 1,670 partition subjects, plus pseudo-element, SVG, and iframe elements. Keys, order, and values equal. Time. | Item 10. |
| P-J | 4 | Price | Each moved piece in a scoped run at its destination; then one placement trial full run with the sampler. | The placement and its memory peak. |

## Questions for the user

Only the user can rule on the following. Each question carries my recommendation.

**Q1: may the per-width preservation and partition halves, and the theme header table, run in a project other than light-1280, while each half builds its reading from the light-1280 variant object (light theme, WIDTH×800)?**

- The code comments (`integration.test.ts:1122, 1440`) and the guide (`guides/veneer.md:1965-1966`) record a ruling that selects light-1280.
- **Recommend yes**, with item 9 landed before any destination that holds a host-bound title. The case already reads 390×800 inside light-1280 (1129-1131, 1446-1447), so the ruling selects the reading; the host project is a scheduling choice.
- It adds 89 to 125 s of modeled reduction beyond layer 1's central 121 s, or 26 to 44 s with dark-1280 alone.
- Item 13, if ever taken, falls under this ruling.

**Q2: may this host stay clear for the unit's price windows?**

- **How long:**
  - Price windows hold the host alone, with no other Chromium and no other CPU-bound command. They total about 2 h 2 min modeled and at most 2 h 20 min, in eight windows of at most 28.6 min each (two full runs at 858.59 s, `journey-6.log:205`).
  - That total sums:
    - two full runs each for J-B0, the checkpoint, and acceptance, plus one trial run, each at most 858.59 s;
    - the case bodies run alone (95.24 s and 85.79 s, `report-5.md:317`);
    - the scrollspy pairs (78.70 s and 145.75 s, `journey-4.json:1`);
    - about 8 s of start-up per scoped run (18.68 s of duration for 10.60 s of tests, `j4-5-isolated.log:9`).
  - A full gate set takes 737 s (`tmp/units/flip-gates-2/gates-4333d76.txt:14, 22, 24, 26, 28`).
  - The equality and gate windows hold the lock for about 1 h more. During them, other lanes' Chromium suites wait, and their CPU-bound commands run at `nice -n 19` (proposal 3, change 2).
- **What pauses:**
  - The stage B prerequisite readings on this host, such as the Chromium floor check (`lanes.md` § Log, entry "2026-10-04 — engine session to showcase session (the user's rulings: stage B and journey tuning move to you after the Tailwind layer)", bullet "Chromium 153").
  - The D-4 Linux run, if it runs here (entry "2026-10-05 — cloud session (veneer re-pinned …)", bullet "Acknowledged").
  - Any other veneer worktree's gates.
- **What continues:** the elements read is read-only and continues. T4 lands before the unit starts (entry "2026-10-05 — cloud session (token unit T3 committed …)", bullets "In parallel" and "Order from here").
- **Recommend yes**, with the windows scheduled back to back where the lane order permits. Under load, a saving cannot be told apart from the 40.71 s spread between runs of the same tree.

## Measurement plan

The steps run in the following order. Lane M is the Orchestrator's measurement lane; lanes 0 to 4 write code.

1. **Start point (lane M).**
   - The start is the `main` commit that carries T1 to T4 and the landing gates' record. That follows the order in `lanes.md` § Log, entry "2026-10-05 — cloud session (token unit T3 committed at veneer `44b3610` …)", bullet "Order from here".
     - The re-pin landed as browser `^0.0.24`, scaffold `^0.0.92`, and probe `^0.0.20` at `b242bce`. The overwrite landed as `07694f8` at 2026-10-05 03:38 UTC (entry "2026-10-05 — cloud session (veneer re-pinned …)").
     - `main` reads `da3bf40`, which does not contain `44b3610`.
   - The start keeps moving, so the lane re-resolves every line this plan cites at the start commit, by searching for each quoted token.
     - HEAD moved from `b242bce` to `07694f8` while this plan was being judged.
     - At 03:52 UTC the main checkout held an uncommitted edit, which from its file set is the T4 merge. It moves `tests/setup.ts:1543` to 1596, and the guide's lines 1932, 1965, and 2336 to 2141, 2175, and 2579.
   - Precondition: every gate on the start commit fails only titles in its host-bound set. `setup:browser` lists none (`lanes.md` § Host-bound set), so a repeat of the 1234 timeout blocks J-B0 as a defect.
   - Worktrees: lane M, lane 0, and lane 3 start at the start commit; lanes 1 and 2 start later. Each worktree needs the following:
     - **Its own `node_modules`.** Hard-link the main checkout's after `cmp` shows the two `package-lock.json` files are equal, as the pre-flip reading did (`lanes.md` § Host-bound set, first paragraph). Otherwise run `npm ci`. A worktree without `node_modules` fails before collection on `../node_modules/tailwindcss/preflight.css?raw` (`tmp/units/flip-journeys/seventh-report.md:46`; the import is at `tests/setupBrowser.ts:72`).
     - **`npm run build`**, because the showcase imports the built sheet from `dist/`, which git ignores (`j0c-brief.md:21`; `.gitignore:12`).
     - **The Playwright Chromium path:** `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` and the toolchain `PATH` (`j0c-brief.md:20`) in every shell.
       - Playwright 1.63.0 pins Chromium revision 1243 (`node_modules/playwright-core/browsers.json`), which `/opt/pw-browsers` lacks. The `resolveManagedBrowser` function (`configs/browsers.ts:154-175`) then falls back to the `chromium` alias, which is the 1194 build.
       - With the variable unset, the pinned path lies under `~/.cache/ms-playwright`, which does not exist, and resolution falls to the bundled globs (`configs/browsers.ts:37`).
       - J-B0 records the resolved executable and its version: 141.0.7390.37 on the T3 tree (`tmp/units/tokens-t3/chromium.txt:1`).
     - **Copies of the sampler and the mutation script** in the unit folder, with their outputs rewritten to that folder. An absolute path is not enough:
       - The sampler writes `tmp/codex/LABEL-measurement.json` relative to the working directory (`tmp/codex/j0b-measure.ts:1, 18`). `LABEL` is the run's name.
       - The mutation script runs `node_modules/.bin/vitest` and writes its logs relative to the working directory (`mutations-6.ts:16-17`).
       - The mutation copy also checks that each target occurs exactly once (gap 14).
2. **Window P0, J-B0 (lane M, price).**
   - Run two full runs alone, as item 0 states, and copy the outputs after each run.
   - State J-B0 as the range of its two runs, per case and per project.
   - Precondition for every later gate: J-B0's two runs agree byte for byte on each file's `## Resolved values` section. If they do not, the unit stops and reports the unstable rows.
   - During P0, lanes 0 and 3 write code and run nothing. Lanes 1 and 2 write their function changes in `tests/setupBrowser.ts`.
3. **Window E1 (equality).**
   - Lane 0 runs item 1a's proof (`test:setup:browser`) and the split's scoped run in light-1280, comparing its lines with J-B0's.
   - Lane 3 runs the equality parts of P-E, P-F, P-G, P-H, and P-I.
4. **Window P1 (price).**
   - Lane 0 runs P-A twice.
   - Lane 3 runs the timing parts of P-E, P-G, P-H, and P-I in one light-1280 run, twice.
5. **Merge lane 0** (items 11 and 1a; the counts read 92 registered and 0 skipped). Lanes 1 and 2 rebase onto it and write their call-site edits; lane 3 continues on separate functions.
6. **Window E2 (equality).** Lanes 1 and 2 run the equality parts of P-B, P-C, and P-D, and their unit proofs.
7. **Window P2 (price).** Lanes 1 and 2 run the timing parts of P-B, P-C, and P-D.
8. **Gate and merge lanes 1, 2, and 3, in that order.** Lane 3 can merge any time after lane 0, because it touches separate functions. Each lane's gate requires all of the following:
   - **Suites, in an equality window:** `test:setup:browser`. Lane 3 adds `test:src:tailwindcss`, `test:integration`, and `test:src:browser`, because items 9 and 10 change functions those suites call (`tests/src/tailwindcss/index.test.ts:508, 610, 641`; `tests/integration.test.ts:343, 430-431, 528`; the `readTouchListeners` function in the `src:browser` suites).
   - **Mutation script:** with the adapted script, each of the four targets is unique, reads red, then reads green after the restore.
   - **Index controls:** one control per index, each red and then green:
     - drop the lifted sheet from item 1b's index;
     - drop the recipe from item 2's memo;
     - key item 4's set reader to one title;
     - point item 5's cached navigation at the Contents navigation.
   - **Line gate:** each logged reading line equals J-B0's after removing its `seconds`, `milliseconds`, and `host` fields. The lines are `Component preservation`, `Component repaired causes`, `Component reader controls`, the three `Component control` lines, `Partition population`, `Partition`, `Partition unmapped control`, `Primary map demonstration`, `Partition role control`, `Partition control`, `Journey Tailwind readings`, `Face census`, `Engine equality`, `Collapse exclusion control`, and `Header statechart`.
   - **Rows gate:** the `## Resolved values` section equals J-B0's byte for byte after removing the reading-variant prefix.
   - **Price runs, in a price window:** the changed cases, twice each, alone.
     - Lanes 1 and 2 run their halves.
     - Lane 3 runs J4 and the matrix reads in light-1280, the scrollspy-1280 tables in light-1280, the scrollspy-390 tables in light-390, and one guarded table such as alert (30.64 s in `journey-4.json:1`).
   - Items 6 and 7 run in every guarded row and in the reach case (`integration.test.ts:695`) across all four projects, so the checkpoint's full runs serve as their full-run gate.
9. **Window P3, checkpoint (lane M, price).**
   - Run two full runs alone on the merged tree.
   - Credit each item from per-case durations. An item's confirmed floor is J-B0's faster duration of the cases it changes, less the checkpoint's slower duration of the same cases.
   - Apply the failure-set rule, the line and rows gates, and the memory record.
10. **Lane 4, after Q1.**
    - Compute the placement from the checkpoint's spans, with the tail inflated and the memory peak as an input.
    - Run P-J's scoped destination runs in window P4 (price), and each piece's mutation in an equality window.
    - Run the placement trial full run with the sampler in window P5 (price).
11. **Window P6, acceptance (lane M, price).** Run two consecutive full runs alone with the JSON reporter and the sampler. Each run passes when all of the following hold:
    - Every failure is in the § Host-bound set. A title outside the set blocks acceptance, including a J4 timeout like `tmp/units/tokens-t3/journey-5.err:13-14`. A host-bound title that passes is not reclassified.
    - 92 cases are registered and 0 skipped.
    - The line gate holds. The theme table's `Header statechart` line may name its host in `variant`.
    - The multiset of `## Resolved values` rows across the four files, after removing the reading-variant prefix, equals J-B0's. Each file's rows that no move touched keep J-B0's order.
    - The memory peak stays under 14,345,035,776 bytes and is recorded.
    - The slower acceptance run beats J-B0's faster run by at least the sum of the confirmed floors from step 9, plus layer 2's floor recomputed from the checkpoint's spans with f = 1.67. The target is 25 percent.
    - The imbalance reads at or under the placement's prediction, plus the spread of J-B0's two imbalance readings.
    - These scripts exit 0, or fail only host-bound titles: `check`, `lint:check`, `format:check`, `test:setup:browser`, `test:src:browser`, `test:app:browser` (`lanes.md` § Rules, "Gates before landing on `main`"), `test:src:tailwindcss`, `test:integration`, `test:journey:vue`, `test:guides`, and `test:policy`.
12. **Record (lane M).**
    - Log J-B0, the checkpoint, the placement trial, the acceptance runs, the spans, the placement, and the memory peaks in `lanes.md`.
    - Replace the T3 entry's pre-sixth-pass figures with these.
    - Log the `readPerception` cost for the owner of `@orkestrel/test`.

## Gaps closed

Every gap from the critic is closed. Three of them close with a change to the critic's proposed fix, as each entry states.

1. **Pre-sixth-pass figures.** Closed.
   - Items 1b and 2, the layer sums, the models, and the targets rest on runs A and B. Every target is a reduction from J-B0 (Target and basis).
   - The misread "3 failed" no longer matters: acceptance refuses any failure outside the set, including J4's 15,000 ms timeout (`journey-5.err:13-14`). J4's 60 s budget stays (`integration.test.ts:438`).
   - The T3 entry's "partition 84 s" (`lanes.md` § Log, T3 entry, bullet "Journey cost") is replaced in step 12.
2. **Item 2's caches.** Closed with a change, in item 2:
   - The whole matched map, keyed by element, rules identity, and `values.bootstrap` identity.
   - The selector-class memo.
   - The face declarations, built one time per subject and face.
   - The subset calls, after P-C.
   
   The change: the inverse move is refused rather than made optional. P-C, run at the inverse's current position, proves what the move would only assume.
3. **CDP domains in host-bound projects.** Closed by the ruling in item 9:
   - Item 9 is the precondition for light-390 and dark-390 destinations; until then, dark-1280 is the only destination.
   - Slack ranks the admitted destinations, and dark-1280 wins a tie.
   - P-H prices the enables.
4. **Variant logging of moved halves.** Closed in item 11: `variant` names the reading variant, `host` names the project, rows carry the reading-variant prefix, and the line gate removes `host`. The theme table's line may change its `variant`.
5. **A rows gate that can pass.** Closed:
   - The rows gate compares `## Resolved values` after prefix removal.
   - The line gate compares normalized lines.
   - J-B0's two runs must agree first.
   - Item 0 copies the files after each run.
6. **Probe and lane order.** Closed:
   - Lanes write during J-B0.
   - Each probe runs in the lane that writes its code.
   - Each probe's equality part runs in an equality window, and its timing part in a price window (Probes; Measurement plan, steps 2 to 8).
7. **Item 11 needs no ruling.** Closed: item 11 lands first with every half in light-1280, and lanes 1 and 2 branch from it. Only item 12 waits for Q1.
8. **One owner for the selector-major match.** Closed: item 1a, owned by lane 0, with its unit proof.
9. **Same-tree spread and the overwritten citation.** Closed:
   - J-B0 is a range of two runs.
   - Acceptance compares the slower acceptance run with J-B0's faster run.
   - Items earn credit from per-case durations.
   - Every cited log is copied.
   - The 895.58 s figure is dropped.
10. **The load factor's target.** Closed: item 12 inflates light-1280's alone-phase work before balancing, the target carries the tail allowance, and the placement comes from the checkpoint's spans.
11. **Memory.** Closed: the sampler runs in J-B0, the checkpoint, and the placement trial, and the peak is an input to the placement.
12. **The generated script.** Closed: the script stays as it is, and item 0 passes the reporters on the command line.
13. **Missing gates.** Closed:
    - Lane 3's gate adds `test:src:tailwindcss`, `test:integration`, and `test:src:browser`, and names its cases.
    - The checkpoint's full runs gate items 6 and 7.
    - Acceptance adds both suites.
14. **Mutation targets.** Closed: all four targets stay byte-identical and unique, and each gate checks this.
15. **Worktree facts.** Closed with a change. Each worktree gets:
    - hard-linked `node_modules`, after a lockfile check;
    - the build;
    - `PLAYWRIGHT_BROWSERS_PATH`;
    - adapted copies of the sampler and the mutation script, because calling them by absolute path still leaves their outputs relative to the working directory.
16. **The moving start point and the red proof.** Closed:
    - The start commit is defined, and citations are re-resolved by token.
    - The precondition gate covers `setup:browser`.
    - P-H prices the enables.
    - J-B0 records the Chromium build.
    - B0 is renamed J-B0.
17. **Host time.** Closed in Q2: about 2 h 2 min modeled and at most 2 h 20 min of price windows, about 1 h of lock-held windows, and the paused work named.
18. **Item 8 in layer 1.** Closed by refusing item 8.
19. **Item 4's lost refusal.** Closed: the set reader keeps both refusals and their messages, and P-E proves it.
20. **Log volume.** Closed with a change:
    - P-A times the log line, the row, and the artifact write, credited 0 s.
    - Lane 1 serializes one time only if P-A prices the duplicate serialization.
    - Item 12 records where the volume moves.
21. **Citations.** Closed:
    - The table-end checks sit at `integration.test.ts:1801-1802`.
    - `journey-4.json` and `journey-4.log` are cited under `tmp/units/flip-preservation/`.
    - Every `lanes.md` citation names its section or entry heading.