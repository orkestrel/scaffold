## Verdict

The following conventions hold for every citation in this plan:

- This draft holds the objective lane: correctness, what the contracts permit, and what this host can carry. It closes the 38 check findings and keeps the user's constraint that no proof is lost.
- Repository paths are relative to `/home/user/veneer`, and `integration.test.ts` means `tests/app/browser/integration.test.ts`. Veneer line numbers are those of commit `07694f8`. The T4 merge commit `4d21de7` (`lanes.md` § Log, entry "2026-10-05 — cloud session (token unit T4 committed at veneer `4d21de7` …)", bullet "Process") moves lines in `tests/setup.ts` and `guides/veneer.md`, so step 1 re-resolves every citation at the start commit by searching for its quoted token.
- `lanes.md` is `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`. It is cited by section or by log-entry heading. The `j0c-*` records sit in its `showcase/` folder. Scaffold paths are relative to `/home/user/scaffold`.
- The design folder is `/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/journey-cost/`. Proposals 1, 2, and 3 are its `proposal-0-Instrument-level--cu.json`, `proposal-1-Structure-level--cha.json`, and `proposal-2-Runtime-level--the-V.json`. Check findings are cited as "check N.M", in the order of its `revised-checks.json`.
- Run A is `tmp/units/tokens-t3/journey-6.log`, the lane's serial run (858.59 s, line 205).
- Run B is the Orchestrator's gate run of the T3 tree (817.88 s). The landing gate run that started at 2026-10-05 04:24:53 UTC truncated the original, `tmp/units/flip-gates-2/test:journey.log`, which holds no `Duration` line when this draft read it. Run B is cited from `tmp/units/tokens-t3/review/landing-prev/test_journey.log` (cited as `landing-prev`): `Duration 817.88s` at line 205, with failures at `landing-prev/test_journey.err:13, 42, 63`. Its timing lines sit at the line numbers the earlier drafts cited (39, 59, 79, 125, 139, 199). A second copy is the design folder's `feasibility-evidence/flip-gates-2/test:journey.log`. Check 3.2 matched its SHA-256 to the original's at 04:26:33 UTC, and run B's four artifacts sit beside it in `feasibility-evidence/journey/`.

**Finding.** The sixth pass widened the imbalance that the first plan attacked:

- Light-1280 spends 292.15 s on preservation and partition in run A (148.99 + 143.16, `journey-6.log:151, 199`) and 252.70 s in run B (139.50 + 113.20, `landing-prev/test_journey.log:139, 199`). In the 761.76 s run it spent 219.72 s (135.43 + 84.29, `tmp/units/tokens-t3/journey-5b.log:139, 195`).
- The wall exceeds a four-way split of summed test time by 235.19 s in run A (858.59 − 2493.59 / 4, `journey-6.log:205`) and by 210.69 s in run B (817.88 − 2428.77 / 4, `landing-prev/test_journey.log:205`).
- In the model in Target and basis, light-1280 ends 253.15 s after the next project in run A and 222.61 s after it in run B. Layer 1 saves at most 168.3 s, so the schedule has to carry most of the gain in wall time.

The plan has two layers:

- **Layer 1 (items 0, 11, 1a, 1b, 3, 2, 4 to 7, 9, and 10): identical inputs and outputs, and no ruling needed.** Item 11 splits the two cases per width and keeps all four halves in light-1280. The modeled reduction from J-B0 is 64.7 to 168.3 s, central 118.3 s (13.8 percent of run A, 14.5 percent of run B).
- **Layer 2 (item 12, with item 13 deferred): run the halves where the measured slack is. Each half still reads light-1280.** It needs Q1. A destination in light-390 or dark-390 also needs item 9 landed with P-H green. The modeled total reduction is 186.1 to 255.1 s, central 208.7 to 244.1 s (25.5 to 28.4 percent).

This draft makes the following rulings beyond the second draft:

- **Item 4** keeps the role engine's exact-name match. It calls `resolveSpecimen` one time per distinct title per synchronous set, and its credit falls to 2.7 to 3.3 s per project.
- **Item 5** keeps the two-active-links refusal in every scoped poll and reads links through the role engine.
- **Item 12 and acceptance** cannot hide a host-bound title turning red. Each host-bound title must fail in no more acceptance runs than J-B0 runs.
- **The rows gate** runs one full journey run per lane gate and checks that the artifacts are newer than that run's start.
- **P-I** covers the eight pseudo-elements that `readSurface` reads.
- **The host protocol** is a single serial queue on `/home/user/.wave/journey.lock`, with the following parts:
  - every lane is paused during each price window;
  - a sampler copy reads anonymous memory, not cgroup usage;
  - worktrees are copied outside `/home/user/veneer` and built before J-B0;
  - evidence is copied before any run that truncates;
  - one TypeScript runner writes every run into its own folder and replaces the unlocked `gates.sh` script for the unit;
  - a red under load is not read as a defect until it reruns alone.

**Parallelism.** Inside a full run, four renderers on four CPUs is the ceiling. The host has 4 cores with 1 thread each (check 3.1). During run A the host read a load average of 9.81, with renderers at 52.3 to 81.9 percent of a core (proposal 3, angle). I uphold proposal 3's runtime refusals 1 to 10.

The run gains wall time only when its projects end together. In the 591.13 s run, dark-1280, light-390, and dark-390 sat idle for 114.27, 126.10, and 194.15 s (`tmp/units/flip-preservation/journey-4.json:1`, `endTime`).

Across the work, the plan runs in parallel only where the host permits:

- Lanes write code in parallel on separate functions between price windows.
- Every command that launches Chromium or loads the CPU runs one at a time through the queue (Measurement plan, step 1). Heavy light-1280 work has to run one invocation at a time anyway, because every lane shares one 14,345,031,680-byte memory cgroup (check 3.1, 3.8).
- Price windows hold the queue across all their runs, with every lane paused (Q2).
- One lane owns each shared function (item 1a).

**Calls for the Orchestrator.** Each of the following calls carries my recommendation:

- **The full gate runs of lanes 1, 2, and 3.** You can take one full run of the stacked candidate in place of three, which saves 2 × 858.59 s. Recommend the per-lane runs, because a rows or line difference then names its lane without a bisect.
- **An item whose confirmed floor at step 9 is at or under 0 s.** Recommend reverting it before lane 4 starts. Items 7, 9, and 10 are exempt, because they are state or enumeration fixes credited 0 s.
- **The host-bound count rule tripping at acceptance.** Recommend moving the affected project's pieces back and repeating P5 and P6. Never rerun acceptance until it passes.

**What remains before any merge.** Step 1 (the evidence copies, the lock rule, the worktrees, and the precondition gates) and J-B0. Q1 gates lane 4 only.

**Notes on the proposals.** The following corrections hold:

- Proposal 3 is complete, with five changes. I rule on its changes 4 and 5 in Refused changes.
- The 14 to 17 ms role-query price sits at `j0c-brief.md:121`. The owner's exclusion of J0c items 7 and 19 sits at `j0c-scope.md:32`.
- Proposal 1 says no change touches the code path of a host-bound title. Its changes 6 and 7 do:
  - The reference and class checks run in every guarded row (`tests/setupBrowser.ts:3134-3137`).
  - The focus walk serves the `traverseFocus` function, which the `arrangeDialogHint` and `actOnDialogHint` functions call (4934, 4947). They serve `DIALOG_TOOLTIP_SCENARIOS` (4975) in the tooltip table (5369, dark-390), whose motion=true title is host-bound.

  Both changes keep outputs identical, and the acceptance count rule covers them.

## Adopted changes

The items keep the first plan's numbers, so the critic's and the checks' references still hold. Item 1a is added, and item 8 is refused.

The items appear in landing order. Each one names:

- its lane and the Measurement plan step at which that lane merges;
- its files;
- its saving, as a reduction from the J-B0 duration of what it changes, with the range modeled on runs A and B;
- its basis;
- the coverage it keeps.

**Item 0. Measure from the command line, through the queue, and keep the evidence (lane M, step 1; proposal 3, changes 1 and 2).**

- **Files:** none in the repository. The unit folder is `tmp/units/journey-cost/` in the main checkout, which git ignores (`.gitignore:11`).
- **Command:** every price run invokes Vitest in the J0c form, `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=RUN_FOLDER/report.json` (`j0c-brief.md:89, 248`), under the unit's sampler copy. `RUN_FOLDER` is the run's own folder in the unit folder.
- **Script:** the `test:journey` script (`package.json:101`) stays. Scaffold writes it (`src/core/compilers.ts:492-494`), and its audit reports any differing value (`src/bin/CLI.ts:1250-1260`).
- **Runner:** every unit command goes through one TypeScript runner (Measurement plan, step 1f). The runner holds the queue for the whole invocation, writes into a run folder that it refuses to reuse, and copies outputs before it releases the queue.
- **Evidence:**
  - Before any command runs, lane M copies every cited log and artifact into `tmp/units/journey-cost/evidence/` with a SHA-256 manifest (step 1a).
  - After each full run, the runner copies the four `tmp/journey/*.txt` files and the JSON report into the run folder, because every journey run overwrites them (`integration.test.ts:1860-1861`).
- **Saving:** 0 s. **Coverage:** no test changes.

**Item 11. Split preservation and partition into one case per width, with all four halves in light-1280 (lane 0, merged at step 5; proposal 2, C3; no ruling).**

- **Files:**
  - `integration.test.ts:1122-1439` and `1440-1695`.
  - The `JOURNEY_PLACEMENTS` constant (`tests/setupBrowser.ts:5339-5346`).
  - `guides/veneer.md:1932` and `1965-1966` (the titles), and `2336-2371` (§ Variant placement).
- **Conditions:**
  - Each half builds its page from the light-1280 variant object with its width replaced, as the loops do (1131, 1447). It restores the host's viewport (`OWN`) in its `finally` block (1429-1436, 1685-1692).
  - Each half registers through `it.each` over a placement entry filtered to `VARIANT`, as the shared cases do (459, 686). In this step every entry names light-1280, so the comments at 1122 and 1440 keep their ruling.
  - Each preservation half asserts its own `failures` list. Each partition half keeps its direct `expect` calls, because that case has no `failures` list (check 2.6). Every half keeps the 300 s budget (1438, 1694), parks the pointer in its `finally` block, and takes a title that names its width.
  - The four lines that carry `variant: VARIANT` (1432, 1527, 1550, 1688) put the reading variant's name in `variant` and the project in a separate `host` field, and no other line gains a field. The dot reporter names no project in its stdout headers (`journey-6.log:152`), so the `host` field is the only place a moved line names its project.
  - Each half prefixes its rows (1242, 1475, 1551) with the reading variant's name.
- **Saving:** 0 s. The split gives per-width durations in the JSON report without phase timers.
- **Basis:** the `buildJourney` helper takes the viewport and theme from the variant it receives (`tests/setupBrowser.ts:1153-1161`). Only the `failures` list (`integration.test.ts:1127, 1428`) and the start time cross widths.
- **Coverage:**
  - Every assertion, control, line, and row runs per width, at light theme and WIDTH×800.
  - The split adds coverage: a failed `expect` at 1280 no longer stops the 390 reading.
  - Each case's duration line (1430-1433, 1686-1689) becomes one line per half. These are timing lines, outside the line gate.
  - The counts move from 96 registered and 6 skipped (`journey-6.log:203`) to 92 registered and 0 skipped.

**Item 1a. Give the selector-major match one owner (lane 0, merged at step 5; gap 8).**

- **Files:**
  - `tests/setupBrowser.ts`, beside the `collectComponentSignatures` function (1867), in the showcase section of that shared file (`lanes.md` § Paths, shared-files table).
  - A unit proof in `tests/setupBrowser.test.ts`, beside the `component preservation readings` block (1088).
- **Change:**
  - One exported helper, named for what it does (for example `indexSelectorMatches`), takes candidate elements and selector texts.
  - It evaluates each distinct text one time with `element.matches` over the candidates, and returns each text's matching candidates in document order. That is the predicate all three scans use (`tests/setupBrowser.ts:1906, 1994, 2164, 2169`).
  - An alternative form evaluates each text with `querySelectorAll` and intersects the result. A caller takes it only where P-B (items 1b and 2) or P-D (item 3) reads deep equality at both widths and a lower price.
  - Items 1b, 2, and 3 call this helper and build no match of their own.
- **Proof:** a media rule, a pseudo-element selector, a `:hover` selector, one selector repeated across two sheets, and an invalid selector. The helper refuses the invalid selector the same way `element.matches` does.
- **Saving:** 0 s, because it enables items 1b, 2, and 3. **Coverage:** the predicate is the code's own.

**Item 1b. Share one matched-rule index across the preservation half's three full attributions (lane 1, merged at step 8; proposal 1, change 1; absorbs proposal 2, C1).**

- **Files:**
  - The `collectComponentPreservation` function (`tests/setupBrowser.ts:1938-2058`), with the scan at 1974-1976 and the per-representative filter at 1990-1995.
  - Its options type (`Omit<AttributionOptions, 'ancestors'>`, with `AttributionOptions` at `tests/setupStyles.ts:815-824`), which gains an optional index field.
  - The call sites at `integration.test.ts:1215, 1273, 1282`.
  - Proofs beside `tests/setupBrowser.test.ts:1088`.
- **Conditions:**
  - (a) The index comes from item 1a over the representatives. It appends each matching entry to the representative's per-sheet list in scan order.
  - (b) The function refuses an index built for other sheets, and a unit proof pins the refusal (proposal 2's foreign-sheet proof).
  - (c) The index is built directly before line 1215 and passed only at 1215, 1273, and 1282. The awaits nearest that span are at 1172 and 1320 (check 2.7).
    - The index travels in its own field at those three calls and never in the shared `options` object (1209), so the `...options` spreads at 1334, 1368, and 1411 cannot carry it into the sheet-rewrite controls.
    - The controls (1321, 1355, 1407) keep their own scan, because each `textContent` write replaces the sheet object.
  - (d) All four mutation targets stay byte-identical and unique, as `tmp/units/tokens-t3/mutations-6.ts:6-9` lists them:
    - `longhand.startsWith('overflow-')` (`tests/setupBrowser.ts:2003`);
    - `face === 'tailwindcss' && options.scales !== undefined` (2294);
    - the `table` target (`tests/setupStyles.ts:628`);
    - the `inherited` target (548).

    The script mutates the first occurrence after an `includes` check (`mutations-6.ts:13-15`), so every lane's gate checks that each target occurs exactly once.
  - (e) The memo in the `attributeDeparture` function (`tests/setupStyles.ts:574-633`) waits until P-A prices the departure loop above the spread of its two runs, and it is credited 0 s. That function holds the `table` target (628), so condition (d) applies.
  - (f) P-A times the log line (`integration.test.ts:1228-1241`), the row (1242), and the artifact write (1860), credited 0 s. If P-A prices the two serializations of `result` above the spread of its runs, lane 1 serializes `result` one time per width and splices the string into both outputs. The line gate proves the bytes identical.
- **Saving:** reduces the preservation halves' summed J-B0 duration by 42 to 69 s, central 51 s, all on light-1280.
- **Basis:**
  - One full attribution costs (case − first phase at 1280 − first phase at 390 − 4.53) / 4.
    - Run A: (148.99 − 33.21 − 34.25 − 4.53) / 4 = 19.25 s (`journey-6.log:95, 139, 151`).
    - Run B: (139.50 − 34.81 − 30.41 − 4.53) / 4 = 17.44 s (`landing-prev/test_journey.log:95, 127, 139`).
  - The first phase is the logged `seconds` field (`integration.test.ts:1236`), which runs from the width's page build through the main attribution.
  - The 4.53 s is the six sheet-rewrite controls before T3: 61.4511 − 28.3547 − 28.5637 = 4.5327 s (`tmp/units/flip-preservation/journey-4.log:65, 89, 97`). The rounded operands would give 4.54 s.
  - Sharing removes four of the six full scans. At a scan share of 0.6 to 0.9, that is 4 × 17.44 × 0.6 = 41.9 s to 4 × 19.25 × 0.9 = 69.3 s, and the central figure is 4 × 18.35 × 0.7 = 51.4 s. The model uses the whole seconds 42, 51, and 69.
  - The build evaluates 2,612 distinct selector texts in place of 5,276 rules per scan (proposal 1, change 1, basis), so it costs no more than the scan it replaces. P-B measures it.
- **Coverage:** for each representative and sheet, the index yields the same entries as the filter, in the same order. Every cause, exclusion, departure, `lost` entry, line, row, and assertion (1219-1300) stays.

**Item 3. Decide signature membership through item 1a (lane 1, merged at step 8; proposal 1, change 3; conditional on P-D).**

- **Files:** the `collectComponentSignatures` loop (`tests/setupBrowser.ts:1902-1909`).
- **Conditions:**
  - It uses item 1a's predicate (1906).
  - It evaluates each rule's conditions one time, because they read only media and supports conditions through the element's window (`tests/setupStyles.ts:415-430`).
  - It holds the 608 component names in a `Set`.
- **Saving:** reduces the preservation halves' summed J-B0 duration by 0 to 10 s, central 5 s. The floor is 0 s, because the `element.matches` form makes the same number of calls. The saving comes from the `querySelectorAll` form, if P-D admits it.
- **Basis:** 548 component-scoped selectors (496 distinct) are tested on every element without a component class, at both widths (proposal 1, change 3, basis). Each width has 10,225 elements and 218 excluded (`journey-6.log:95, 139`). P-D counts the elements without a component class.
- **Coverage:** the groups, keys, and order stay, and so do the logged `signatures` and `excluded` counts.

**Item 2. Share the partition's matched map across its full partitions (lane 2, merged at step 8; proposal 1, change 2; absorbs proposal 2, C2 and the critic's cache findings).**

- **Files:**
  - The `collectPartition` function (`tests/setupBrowser.ts:2140-2325`): the matched-map build at 2158-2196, the class-name loop at 2199, and the face declarations at 2224-2240.
  - The `PartitionOptions` interface (222-231), which gains an optional memo field.
  - The call sites at `integration.test.ts:1549, 1553, 1633`, and at 1611 and 1674 after P-C.
  - Proofs in `tests/setupBrowser.test.ts`.
- **Conditions:**
  - (a) The memo key is the element plus the identities of `options.rules` and `subject.values.bootstrap`. The value is the whole `matched` map: sheet, then physical longhand, then declarations.
    - The main call (1549) and the unmapped call (1553) pass the same `subjects` array and the same rules map, with no `await` between them.
    - The inverse call (1636) and the subset calls (1606, 1679) spread `...subject.values` and replace only `tailwindcss`, so `values.bootstrap` keeps its identity.
    - The `resolvePartitionProperty` call reads only `values.bootstrap` (2173), and no call mutates a declaration.
    - The map reads neither `scales` nor `values.tailwindcss`, so the partition mutation target (2294) stays outside the memo (check 2.8).
  - (b) The inverse partition stays at 1633. It runs after the face switches at 1578, 1592, and 1595 and the adopted sheets at 1597-1631.
    - An adopted sheet cannot change a match, because the `matchesConditions` function reads only media and supports conditions (`tests/setupStyles.ts:415-430`).
    - A face click (`tests/setupBrowser.ts:1345-1349`) can change `:hover` or `:focus` state. The last face clicked before 1549, 1611, 1633, and 1674 is `tailwindcss` (the `FACES` order, `app/browser/constants.ts:31-35`; `integration.test.ts:1592, 1595`), so pointer and focus match (check 2.8).
    - The inverse call and the subset calls take the memo only where P-C reads their fresh matched maps deep-equal to the memo at both widths. Otherwise they compute fresh maps.
  - (c) The `collectSelectorClasses` function (`tests/setup.ts:1543`) is a pure per-character tokenizer that runs for every matched selector of every subject (`tests/setupBrowser.ts:2170`). It is memoized by selector text inside the memo, and a text that throws is not cached.
  - (d) The `faceDeclarations` map is built one time per subject and face. It reads only `matched` and `options.faces` (2224-2240), and the name loop reads it without mutation, because its `filter` and `sort` run on copies.
  - (e) The memo refuses a rules map other than the one it was built for, and a unit proof pins the refusal.
  - (f) The mutation targets follow item 1b, condition (d).
- **Saving:** reduces the partition halves' summed J-B0 duration by 15 to 72 s, central 50 s, on light-1280.
- **Basis:**
  - From the sixth pass on, the unmapped control is a full partition at each width (`tmp/units/tokens-t3/report-5.md:233`; `integration.test.ts:1553`). Each width therefore runs three full partitions (1549, 1553, 1633).
  - One full partition costs about 12.0 s alone: (85.79 − 61.82) / 2 (`report-5.md:317`; `tmp/units/tokens-t3/partition-3-dev.log:46`). That figure is an upper bound, because the role control and the primary-map demonstration fall inside the 23.97 s difference. Both were added after the pass-3 run, and both ran in the fifth pass (`journey-5b.log:161, 163, 183, 185`).
  - Under the full run's contention, which is 1.32 (113.20 / 85.79) to 1.67 (143.16 / 85.79), one partition costs 15.8 to 20.0 s.
  - Run B's growth over the 761.76 s run gives a floor of 14.5 s: (113.20 − 84.29) / 2 (`landing-prev/test_journey.log:199`; `journey-5b.log:195`).
  - With 2 or 4 reusing calls and a reuse share of 0.5 to 0.9, the saving is 2 × 0.5 × 14.5 = 14.5 s to 4 × 0.9 × 20.0 = 72.0 s. The central figure is 4 × 0.7 × 17.9 = 50.1 s. The model uses 15, 50, and 72.
  - P-A splits each call into the matched-map build, the face declarations, and the rest.
- **Coverage:** identical matched maps give identical violations, clauses, skipped counts, differences, rows, and lines. No line changes position.

**Item 4. Resolve each title one time per reading set through `resolveSpecimen` (lane 3, merged at step 8; proposal 1, change 4, in its per-title form; gap 19; check 2.1).**

- **Files:**
  - The `readTailwind` function (`tests/setupBrowser.ts:1436-1442`), and a set reader beside it.
  - The call sites at `integration.test.ts:400, 415, 1030`. Each is a synchronous `map` with no `await` inside it.
- **Change:**
  - The set reader takes one set's readings. It calls `resolveSpecimen` (1383-1391) one time per distinct `specimen` title and reads each reading's subject from that figure.
  - `resolveSpecimen` keeps the role engine's exact-name query, `page.getByRole('figure', { name: title, exact: true })` (1384). It also keeps both refusals and their messages: zero or several figures (1385-1386), and a figure that is not an `HTMLElement` (1389).
  - The per-reading refusal `Specimen "…" holds no …` (1437-1440) stays.
  - No reader keys figures by the `readName` function, because `readName` differs from the engine's name computation. The engine adds `::before` and `::after` content and joins inline children without a space (`node_modules/@vitest/browser/dist/index.js:5617, 5621, 5629`, @vitest/browser 4.1.11). `readName` joins text nodes with a space and reads no generated content (`node_modules/@orkestrel/test/dist/src/browser/index.js:1029-1038, 1093-1097`, @orkestrel/test 0.0.24).
- **Saving:** reduces J4 plus the matrix reads by 2.7 to 3.3 s per project, central 3.0 s. Summed over the four projects, that is 10.8 to 13.3 s.
- **Basis:**
  - There are 56 readings over 28 specimens (`TAILWIND_READINGS`, `tests/setupBrowser.ts:535-978`, and the logged set of 56 values at `journey-6.log:61`).
  - J4 reads 4 sets (line 400, plus line 415 under 3 faces), and the matrix reads 3 sets (1030). That is 7 × 56 = 392 role queries per project, and the set reader makes 7 × 28 = 196.
  - At 14 to 17 ms per query (`j0c-brief.md:121`, measured on J2 as a proxy), the 196 fewer queries save 2.74 to 3.33 s.
- **Coverage:** the same engine query, exact name, uniqueness, and element type per title, under the face each set reads. The expectations, the `Journey Tailwind readings` lines, and the rows stay.

**Item 5. Scope the scrollspy polls to the resolved navigation, keeping the two-active-links refusal (lane 3, merged at step 8; proposal 1, change 5, in its stated form; conditional on P-F; check 2.2).**

- **Files:** `tests/setupBrowser.ts:5124-5254`.
- **Conditions:**
  - Each row resolves its navigation one time through the whole-document query (5126).
  - Each scoped poll reads `page.elementLocator(navigation).getByRole('link').elements()` (`node_modules/@vitest/browser/context.d.ts:849`), filters on `active`, and throws `Scrollspy marks more than one link active` when two links are active, as `readScrollspySelection` does (5130).
    - This holds in the polls of `assertScrollspySelection` and `actOnScrollspyControl`, and in every attempt of `scrollComponentTo` (5156-5168).
    - The `waitForCondition` function awaits its predicate without a catch (`node_modules/@orkestrel/test/dist/src/browser/index.js:239-252`), so the throw fails the row.
  - Every wait, and the exit of the `scrollComponentTo` loop, ends on one whole-document `readScrollspySelection` read that must agree with the scoped read. That read runs after the scoped read passes.
  - The `assertScrollspySelection` function keeps its whole-document region and link resolution (5177-5188).
  - A navigation element that the page replaces leaves the scoped locator on a detached element. The closing whole-document read then disagrees, and the row fails.
- **Saving:** reduces the scrollspy-1280 table pair's J-B0 duration by 4.0 to 11.0 s, central 7.3 s, in light-1280. The scrollspy-390 pair in light-390 saves the same modeled amount.
- **Basis:**
  - Each scrollspy table holds 18 rows, so a pair holds 36. `SCROLLSPY_SCENARIOS` builds 18 per width (5256-5310), and each table filters to its own width (5435-5446).
  - Proposal 1 counts 10 to 20 whole-document role queries per row. The closing whole-document reads give back one query per wait, and the model assumes two waits per row (the from-state and to-state assertions), so the net removal is 8 to 18 queries per row.
  - The saving is 8 × 36 × 14 ms = 4.0 s to 18 × 36 × 17 ms = 11.0 s, with a central figure of 13 × 36 × 15.5 ms = 7.3 s (`j0c-brief.md:121`).
  - The pairs read 78.70 s (44.67 + 34.03) and 145.75 s (82.37 + 63.38) in the 591.13 s run (`journey-4.json:1`, `testResults[0]` and `[2]`). Runs A and B time no table.
  - P-F counts both the removed queries and the closing reads.
- **Coverage:** the keyboard path, the settle, the activation-event and keyboard-scroll checks (5240-5249), the two-active refusal at every poll, and the from-state and to-state assertions stay. The mutation control points the cached navigation at the Contents navigation, and the row must fail.

**Item 6. Make the reference and class checks linear (lane 3, merged at step 8; proposal 1, change 6).**

- **Files:** `tests/setupBrowser.ts:2873-2905`.
- **Conditions:**
  - The registry-name cache stays behind the dynamic `import('@app/browser')` call (2902), because the harness imports no value from `app/` (`lanes.md` § Rules, "The environment boundary").
  - A unit proof covers the following cases:
    - an id that occurs three times, which yields two `duplicate:` findings, as the `indexOf` filter does (2875-2877);
    - a dangling `aria-controls` target;
    - a non-fragment `href` value.
- **Saving:** reduces light-1280's table and paired durations by 1 to 3 s, central 2 s. Summed over the four projects, it is 3 to 9 s.
- **Basis:**
  - The duplicate scan calls `indexOf` for each id.
  - Both checks run in every guarded row (3134-3137; the class check at 3136) and at each table end (`integration.test.ts:1801-1802`; the class check at 1802).
  - The reference check alone also runs for each paired face (960) and one time after each header table (1733), which runs after `executeShowcaseHarness` returns (1732) and outside `guardShowcaseScenarios` (1725).
  - P-G prices one call of each form.
- **Coverage:** the same findings in the same order, including in the host-bound tables' rows.

**Item 7. Read the Tab-walk bound from a live collection (lane 3, merged at step 8; proposal 1, change 7).**

- **Files:** `tests/setupBrowser.ts:2847`.
- **Saving:** 0 s on light-1280, and 1 to 2 s in each project that runs the reach case. That case registers only in dark-1280 and light-390 (`tests/setupBrowser.ts:5345`; `integration.test.ts:686, 695`). The target credits 0 s.
- **Basis:** each Tab press builds a static list of every element only to read its length (proposal 1, change 7, basis).
- **Coverage:** a live collection's `length` equals the static list's length at each evaluation.

**Item 9. Disable the DOM and CSS Chrome DevTools Protocol (CDP) domains after the specificity reading (lane 3, merged at step 8; proposal 1, change 11; conditional on P-H equality, not on its price; gap 3).**

- **Files:** the `readSpecificities` function (`tests/setupStyles.ts:277-323`). Its `finally` block (320-322) sends `CSS.disable` and then `DOM.disable` after the `CSS.setStyleSheetText` reset (321).
- **Ruling on the domains:**
  - The `readSpecificities` function is the only code that enables either domain (`tests/setupStyles.ts:283-284`, with no other `.enable` call under `tests/`, `app/`, or `src/`), and it never disables them.
  - The journey reaches it through `readPartitionRules` (called at `integration.test.ts:1134, 1508`), whose `readSpecificities` call sits at `tests/setupBrowser.ts:1821`. Light-1280 therefore runs every later case with both domains on.
  - Item 12 would carry that state into light-390 and dark-390, which hold all five host-bound journey titles (`lanes.md` § Host-bound set, `journey` bullet). The moved pieces run in the matrix block (`integration.test.ts:860`), before the statechart tables (1698).
  - One CDP stall is on record on this host:
    - The signature proof at `tests/setupBrowser.test.ts:1234` timed out at 15,000 ms in the Orchestrator's unlocked gate run (`tmp/units/tokens-t3/review/setup-browser-gates-timeout.err:4-5`; the design folder's `feasibility-evidence/flip-gates-2/test:setup:browser.err:4-5`). The original `flip-gates-2/test:setup:browser.err` was truncated at 04:31:36 UTC (check 3.2).
    - Its only `await` is the `readPartitionRules` call at 1243, so the 15 s sits in a CDP round trip.
    - The proof passed in four other runs:
      - in 49 ms in the verbose rerun (`review/setup-browser-verbose.log:111`);
      - in a scoped rerun whose tests read 102 ms (`review/setup-groups-iso.log:7-9`);
      - in the T3 lane's run (`tmp/units/tokens-t3/setup-browser-6b.log:27`, 156 passed);
      - in the later gate run copied to `landing-prev/test_setup_browser.log:28` (156 passed).
  - The record shows that a CDP round trip can stall under load. It does not show that the open domains cause the stall.
  - I adopt item 9 as a state fix, credited 0 s, and make it the precondition for item 12's light-390 and dark-390 destinations. Until item 9 lands with P-H green, item 12 places pieces in dark-1280 only.
  - Measured slack ranks the admitted destinations, and dark-1280 wins a tie, because it holds no host-bound title.
- **Saving:** credited 0 s. P-H prices it.
- **Coverage:**
  - The readings complete before the disable, and a disable that throws fails `tests/setupStyles.test.ts:239` rather than passing silently (check 2.9).
  - The `readTouchListeners` function issues DOM calls without enabling the domain (`tests/setupBrowser.ts:5643-5694`). It already runs with the domains off in the `src:browser` suites, which never call `readSpecificities` (`tests/src/browser/helpers.test.ts:80-87`; `tests/src/browser/integration.test.ts:74-77`). The journey never calls it.

**Item 10. Cache the standard longhand names per window and per pseudo-element (lane 3, merged at step 8; proposal 1, change 10; conditional on P-I; check 2.5).**

- **Files:** `tests/setupStyles.ts:1455-1464`.
- **Conditions:**
  - The cache key is the window plus the pseudo-element, because a single cached list would return every standard longhand for every pseudo-element.
  - The `readSurface` function reads every pseudo-element that `collectPseudos` returns (`tests/setupBrowser.ts:1511-1543, 1611-1617`): `::before`, `::after`, `::placeholder`, `::file-selector-button`, `::backdrop`, `::marker`, `::first-letter`, and `::first-line`.
  - If P-I reads two elements of the same pseudo-element whose per-call enumerations differ, item 10 is dropped.
  - The `isExposed` function gives the same answer in both forms, because it compares a `color` value (`tests/setupStyles.ts:1476-1497`).
- **Saving:** credited 0 s.
- **Basis:** the enumeration includes every custom property that an element carries: 485 custom names in the recipe and 449 in the built sheet, by proposal 1's textual count (change 10, basis). No run prices it.
- **Coverage:** the map's keys, order, and values stay identical for HTML, SVG, and iframe elements and for each of the eight pseudo-elements. Line 343 of `tests/integration.test.ts` depends on the enumeration that `readLonghands(document.body)` returns, so item 10's gate includes `test:integration`.

**Item 12. Place the pieces by measured slack (lane 4, step 10; proposal 2, C4; proposal 3, change 3). It is conditional on Q1, and light-390 and dark-390 also need item 9.**

- **Files:** the `JOURNEY_PLACEMENTS` constant and its comment; `guides/veneer.md:2336-2371`.
- **Conditions:**
  - Compute the placement from the checkpoint's spans and anonymous memory peaks, with the fewest moves (gaps 10 and 11).
  - Before balancing, inflate light-1280's alone-phase work by the contention factor on record, 1.15 to 1.67. For J4 the readings are `tmp/units/tokens-t3/j4-5-isolated.log:9` against `journey-5b.log:13-19`. For the partition they are `report-5.md:317` against `journey-6.log:199`.
  - No host-bound title moves (`lanes.md` § Host-bound set). The `theme` header table can move, because its rows read neither width nor theme (`tests/setupBrowser.ts:5342`) and arrange their own from-state (2590-2630).
  - Destinations follow item 9's ruling.
  - Each moved piece must:
    - run green in a scoped run at its destination, with its duration recorded (the J0c rule for a moved table, `j0c-brief.md:219`);
    - read red under one mutation there, then green after the restore. The mutation is the coupling target for a preservation half and the partition target for a partition half (`mutations-6.ts:8-9`).
  - The placement trial (P5) is a full run with the sampler copy. It must hold all of the following:
    - `oom_kill` is unchanged;
    - the anonymous peak plus the largest single-renderer peak stays at or under the live cgroup limit;
    - each host-bound title fails in the trial only if it failed in at least one J-B0 run (check 2.3).
  - Logging follows item 11. The theme table's `Header statechart` line (`integration.test.ts:1762`) names its host, and acceptance lets its `variant` change.
- **Saving:** reduces the wall by a further 90 to 126 s beyond layer 1's central 118.3 s, or by 24 to 42 s with dark-1280 as the only destination (modeled; Target and basis).
- **Basis:** the central every-destination placement on both runs has the following shape:
  - light-1280 keeps one half;
  - light-390 takes one half;
  - dark-390 takes two halves and the theme table.

  Ties exist, and the unit's placement comes from the checkpoint's spans.
- **Coverage:**
  - No case, assertion, control, or reading changes. Only the host project changes.
  - All four projects share one browser instance list and differ only in `viewport` (`vite.config.ts:413-420`; `configs/app/vite.journey.config.ts:10-15`). A half built from the light-1280 variant object therefore reads the same media in any project (check 2.10).
  - Rows and lines move to the host's artifact. Each moved preservation half adds about 5.1 MB (a row and a journal line) to its host's artifact (run B's copy, `feasibility-evidence/journey/light-1280.txt:355-356, 462, 468`).

**Item 13. Split the paired case per family (proposal 2, C5). Deferred, and it falls under Q1's ruling if taken.**

- **Condition:** take it only if, after the placement trial, the longest project still ends more than one light-1280 family after the next one.
  - One family averages 18.07 s in run A and 19.19 s in run B (90.33 / 5 and 95.97 / 5; `journey-6.log:59`; `landing-prev/test_journey.log:59`).
  - Its row (`integration.test.ts:986`) names `VARIANT`, so it takes item 11's logging rule.
- **Saving:** credited 0 s.

## Refused changes

I rule on the remaining options as follows:

- **Item 8 (text membership on the representatives only):** refused (gap 18). It drops the `innerText` and visibility reads on the other elements (`integration.test.ts:1182-1192`), which is a ruling on the user's constraint. Its credit of 0 to 2 s sits inside the 40.71 s spread between two runs of the same tree (858.59 − 817.88).
- **The second draft's item 4 set reader, keyed by `readName`:** refused (check 2.1). A title span that gains generated content fails J4 and the matrix reads, but it would pass that set reader.
- **A scoped scrollspy read through `querySelectorAll`, or one without the two-active throw:** refused (check 2.2). The first counts links that the role engine excludes. The second lets a transient double-active state pass every intermediate poll.
- **Acceptance that tolerates every host-bound failure:** refused (check 2.3). Run A failed 4 host-bound titles (`tmp/units/tokens-t3/journey-6.err:13, 30, 61, 82`) and run B failed 3 (`landing-prev/test_journey.err:13, 42, 63`). The navbar-390 motion=false table passed in both runs. A placement that turned it red would keep the assertion but run it green nowhere.
- **A rows gate that reads the last full run's files:** refused (check 2.4). The portfolio case writes `tmp/journey/VARIANT.txt` only after `expect(placed).toEqual(new Set(STATES))` (`integration.test.ts:1855, 1860-1861`), so a scoped run writes no artifact.
- **The first plan's move of the inverse partition (its 2(c)):** refused. The move changes the DOM state that the inverse reads, as the memo would, but without P-C's proof, and it reorders a line. Item 2, condition (b), keeps the position and proves equality.
- **The first plan's edit of the `test:journey` script:** refused (gap 12). Item 0 passes the reporters on the command line.
- **The first plan's byte-equal rows-file gate:** refused (gap 5). The Journal section carries 3, 4, 6, and 3 timing lines in run B's `dark-1280.txt`, `dark-390.txt`, `light-1280.txt`, and `light-390.txt` (copies in `feasibility-evidence/journey/`). The line and rows gates in the Measurement plan replace it.
- **Proposal 1, change 9 (parse the sheets one time per case):** refused, because it conflicts with item 11: each half parses its own sheets.
- **Proposal 2, C1 and C2 as written:** superseded by items 1b and 2, which keep their proof and mutation-target conditions.
- **An index rebuilt inside each call without sharing:** refused as the main form, because sharing removes four scans either way.
- **Reading both widths in one page build:** refused, because the 390 reading would then depend on the history that the 1280 reading leaves.
- **Event waits in place of polls, or a relaxed 4-frame settle or stability window:** refused. Cutting idle waits does not move this wall (`j0c-scope.md:32`), and the stability window is a negative proof.
- **Cheaper `readPerception` and `waitForState` functions:** refused in this unit. The cost belongs to `@orkestrel/test` 0.0.24, whose `readPerception` function runs 7 whole-document role queries per call (`node_modules/@orkestrel/test/dist/src/browser/index.js:919-944`). The record step logs it in `lanes.md` for that package's owner.
- **Header-row page reuse and the carousel image scope:** refused. The owner excluded both as J0c items 7 and 19 (`j0c-scope.md:32`).
- **Reusing J3's link resolution for its click:** refused, because it swaps the `clickAccessible` step for a raw click.
- **The first plan's Q2 (fewer variants for cases that read the same everywhere):** refused without a question, because the user's constraint already keeps every reading. Proposal 2's R1 to R4 stand: R1 drops readings, R2 and R3 couple readings to earlier sheet or page state, and R4 removes what the paired case proves.
- **Proposal 3, change 4 (move the alert, modal, and dropdown tables):** refused, because it changes readings:
  - Each move changes the theme that a table's rows read.
  - Alert's move also changes its width from 1280 to 390 (`tests/setupBrowser.ts:5361, 5389, 5431`).
  - Each paired family moves with its table (`integration.test.ts:864`).

  Item 12 balances the projects without changing any reading's variant.
- **Proposal 3, change 5 (`TMPDIR=/dev/shm`):** refused. It claims no saving, and two runs per arm cannot resolve a gain smaller than the 40.71 s spread. It would also cost four full runs (at most 57.2 min) of price-window time.
- **Proposal 3's runtime refusals 1 to 10:** upheld. They refuse the following:
  - a fifth renderer or file parallelism;
  - concurrency inside a project (`integration.test.ts:165-168`);
  - one shared browser or one shared context;
  - the headless-shell build;
  - virtual time or a faster animation rate;
  - force clicks;
  - `nice` or `chrt` priority for light-1280;
  - budget changes and start-offset changes.
- **A turnstile plus shared and exclusive mode locks with a four-slot semaphore (check 3.3, 3.4):** not taken, though it is admissible. Heavy light-1280 work and every gate suite must run alone anyway (check 3.8, 3.9), so the shared mode would carry only the light probes (P-E, P-F, and P-G). That gain does not pay for a reader-preference starvation guard and a semaphore with a retry loop. The single serial queue has neither failure mode.
- **A bash window script or bash lock lines (check 3.3, 3.4 as written):** refused. `AGENTS.md:47` reads: "Never write a bash, PowerShell, or Python script." The runner is TypeScript and spawns `flock` with an argument array.
- **The Orchestrator's `gates.sh` during the unit:** refused. It takes no lock and redirects each gate with `>` into `tmp/units/flip-gates-2/` (`tmp/units/flip-gates-2/gates.sh:7, 10-12`). The unit's runner replaces it.
- **Lanes writing during a price window, including J-B0:** refused (check 3.5). One agent process used 9.5 percent of a core (check 3.5, `ps` reading). Acceptance runs with the lanes idle, so a J-B0 taken with lanes busy biases the comparison toward the plan.
- **The cgroup `memory.usage_in_bytes` sampler and the check against 14,345,035,776 bytes:** refused (check 3.7).
  - The reading includes page cache: 9,233,301,504 bytes with `total_rss` at 3,321,856 and no test running.
  - The live limit reads 14,345,031,680, which is 4,096 bytes under the figure the second draft checked against, so that check always passes.
  - J0c's 12,288,905,216-byte peak (`j0c-report.md:117`) was the same cache-inclusive reading (`tmp/codex/j0b-measure.ts:7-12`), so it is not comparable with the unit's anonymous readings.
- **Hard-linked `node_modules`, or a worktree nested inside `/home/user/veneer`:** refused (check 3.12).
  - npm rewrote `node_modules/.package-lock.json` in place, and a linked worktree shared that inode.
  - Node's upward lookup lets a nested worktree hide a missing package (`tmp/units/flip-journeys/seventh-report.md:46`).

## Target and basis

The model applies the first plan's method to runs A and B. Its inputs are the following:

- **Untimed seconds per project** come from the 591.13 s run: each project's span less its J4, paired, preservation, and partition cases (`journey-4.json:1`). They are 360.18 s for light-1280, 380.12 s for dark-1280, 416.00 s for light-390, and 322.65 s for dark-390, 1,478.95 s in all.
- **Scale factors.** Each run scales those seconds by its own untimed summed time divided by 1,478.95 s:
  - Run A: 2493.59 − 604.30 logged = 1,889.29 s, a factor of 1.2775.
  - Run B: 2428.77 − 577.18 logged = 1,851.59 s, a factor of 1.2520.
  - The logged bodies sit at `journey-6.log:13-19, 39, 59, 79, 125, 151, 199` and `landing-prev/test_journey.log:13-19, 39, 59, 79, 125, 139, 199`.
- **Start offsets** of 10.29, 15.54, 16.26, and 16.53 s (58.62 s in all) come from `journey-4.json:1` (`startTime`). The dot reporter records none for runs A and B.
- **End rule.** Each project's predicted end is its offset, plus its scaled untimed seconds, plus its logged bodies. Light-1280's end is pinned to the observed wall. The model's excess over the wall (7.37 s in run A, 6.33 s in run B) is added to the other three projects in proportion to their untimed seconds (380.12, 416.00, and 322.65 over 1,118.77). The four ends then sum to summed test time plus offsets (check 1.14).

The end rule puts each project's end at the following second:

| Run | light-1280 | dark-1280 | light-390 | dark-390 |
|---|---:|---:|---:|---:|
| A | 858.6 | 605.4 | 588.0 | 500.1 |
| B | 817.9 | 595.3 | 575.7 | 498.6 |

**Layer 1** reduces light-1280 by 64.7 s (floor), 118.3 s (central), or 168.3 s (ceiling). Those figures sum items 1b, 2, 3, 4, 5, and 6 as follows:

- floors: 42 + 15 + 0 + 2.7 + 4.0 + 1;
- central figures: 51 + 50 + 5 + 3.0 + 7.3 + 2;
- ceilings: 69 + 72 + 10 + 3.3 + 11.0 + 3.

Light-1280 still ends the run at every layer-1 figure, so the wall falls by that amount.

**Rules for the other projects after layer 1** (check 1.15) are the following:

- Every project loses item 4's per-project figure.
- The three other projects each lose one third of item 6's summed figure less light-1280's share.
- Light-390 also loses item 5's figure for its scrollspy-390 pair.

**Half-split rule** (check 1.15). The five pieces that layer 2 balances are the following:

- A preservation half is its width's first phase (`seconds`, `integration.test.ts:1236`) plus half the remainder of the case. The remainder is 81.53 s in run A (148.99 − 33.21 − 34.25) and 74.28 s in run B (139.50 − 34.81 − 30.41).
- A partition half is half the case: 71.58 s in run A and 56.60 s in run B.
- Items 1b and 3 come off the two preservation halves equally, and item 2 comes off the two partition halves equally.
- The theme table is 10.30 s (`journey-4.json:1`) times the run's scale factor, 13.16 s in run A and 12.90 s in run B, and it sits in light-390.

**Search and wall rules** are the following:

- **Every destination:** an exhaustive search over the 4^5 assignments of the five pieces to the four projects, keeping the assignment with the smallest largest end.
- **Dark-1280 only:** the four halves go to light-1280 or dark-1280, and the theme table stays in light-390, its home. Check 1.15's reconstruction forced the theme table into dark-1280, which explains part of its lower figures.
- **Wall:** the best largest end, plus the tail allowance (f − 1) × W / 4. Here f is the contention factor (1.15 to 1.67), and W is light-1280's end after layer 1 less the largest other end after layer 1. The allowance is divided by 4 because item 12 inflates that work before balancing.
- **Rows:** a central row runs the central item figures at f = 1.67 and 1.15. A range row runs from the floor figures at f = 1.67 to the ceiling figures at f = 1.15.

The rules give the following intermediate figures. The light-390 column includes the theme table, and the pieces are listed in the order preservation-1280, preservation-390, partition-1280, partition-390:

| Case | light-1280 | dark-1280 | light-390 | dark-390 | W | Pieces (s) | Best, every destination | Best, dark-1280 only |
|---|---:|---:|---:|---:|---:|---|---:|---:|
| A floor | 793.89 | 602.07 | 580.68 | 496.76 | 191.82 | 52.98, 54.01, 64.08, 64.08 | 622.82 | 709.06 |
| A central | 740.29 | 601.11 | 576.41 | 495.80 | 139.18 | 45.98, 47.01, 46.58, 46.58 | 609.23 | 693.28 |
| A ceiling | 690.29 | 600.14 | 571.74 | 494.83 | 90.15 | 34.48, 35.51, 35.58, 35.58 | 600.14 | 654.71 |
| B floor | 753.18 | 591.90 | 568.30 | 495.21 | 161.28 | 50.95, 46.55, 49.10, 49.10 | 604.80 | 687.55 |
| B central | 699.58 | 590.93 | 564.03 | 494.25 | 108.65 | 43.95, 39.55, 31.60, 31.60 | 590.93 | 654.13 |
| B ceiling | 649.58 | 589.97 | 559.36 | 493.28 | 59.61 | 32.45, 28.05, 20.60, 20.60 | 589.97 | 621.53 |

The following table gives the modeled reductions from each run's wall. They are computed by the preceding rules and are not run readings:

| Scope | Run A (s) | Run B (s) | Share of the run's wall |
|---|---:|---:|---|
| Layer 1, central | 118.3 | 118.3 | 13.8 and 14.5 percent |
| Layer 1, range | 64.7 to 168.3 | 64.7 to 168.3 | 7.5 to 20.6 percent |
| Layer 1 and item 12, every destination, central | 226.0 to 244.1 | 208.7 to 222.9 | 25.5 to 28.4 percent |
| Layer 1 and item 12, every destination, range | 203.6 to 255.1 | 186.1 to 225.7 | 22.8 to 29.7 percent |
| Layer 1 and item 12, dark-1280 only, central | 142.0 to 160.1 | 145.5 to 159.7 | 16.5 to 19.5 percent |
| Layer 1 and item 12, dark-1280 only, range | 117.4 to 200.5 | 103.3 to 194.1 | 12.6 to 23.7 percent |

**Target and floor.** Every reduction is measured from J-B0, which runs alone. Seconds saved under contention might shrink alone, so the plan states targets as shares of J-B0's faster run. Each target sits under its central band:

- **With Q1 ruled yes and item 9 landed:** the target is 25 percent, which is 0.5 points under the central band's low edge (25.5 percent). The modeled floor is 22.8 percent.
- **With Q1 ruled yes and dark-1280 as the only destination:** the target is 16 percent, under the band's low edge of 16.5 percent. The modeled floor is 12.6 percent.
- **Without Q1:** the target is 13 percent, under layer 1's central 13.8 percent. The modeled floor is 7.5 percent.

Acceptance passes on the measured floor, not on the target (Measurement plan, step 11). The measured floor is the sum of the confirmed per-item floors from the checkpoint, plus layer 2's floor recomputed from the checkpoint's spans with f = 1.67. A missed target with the floor met is recorded, not refused.

**Load-independent check.** The imbalance, wall − summed test time / 4, reads 235.19 s in run A and 210.69 s in run B. After item 12 the model predicts 14.66 s of offsets (58.62 / 4), plus the placement's granularity of 2.6 to 16.9 s (best largest end less the balanced bound), plus the tail allowance of 2.2 to 32.1 s. Before the tail, that is 17.3 to 31.6 s.

**Host load.** The two runs on one tree differ by 40.71 s in wall time, and by 29.96 s in the partition case (143.16 against 113.20 s, line 199 of each log). Neither run had the host to itself:

- Run A started at 02:31:51 UTC (`journey-6.log:204`). The T4 lane wrote its acceptance logs from 02:39:16 to 02:44:04 UTC (`/home/user/.wave/veneer-t4/tmp/units/tokens-t4/acceptance-final/` and `acceptance/`), during run A.
- Run B ran from a gate script that takes no lock (`tmp/units/flip-gates-2/gates.sh:10-12`).

Every comparison is therefore against J-B0, measured alone with the lanes paused. The 895.58 s figure is dropped, because its cited file no longer holds it.

**Unmeasured assumptions.** The following inputs rest on models until the probes measure them:

- the attribution scan share (item 1b);
- the partition reuse share, and whether the inverse can reuse the memo (item 2);
- the role-query price, and item 5's waits per row (items 4 and 5);
- the per-call prices (item 6);
- the contention factor f, and the uniform scale of untimed cases;
- the start offsets of runs A and B, taken from the 591.13 s run;
- items 7, 9, and 10, which are credited 0 s;
- the anonymous memory footprint of a full run, which no run on record measures;
- the duration of `test:journey:vue`, which no gate file on record lists.

## Probes

Each probe runs inside the lane that writes the code it needs. Every probe command runs through the queue (Measurement plan, step 1f), and a probe can have two parts:

- **Queue part (equality):** runs through the queue while the other lanes can keep editing.
- **Price part (timing):** runs in a price window, through the queue, with every lane paused.

The probes are the following:

| Probe | Lane | Window | Method | Decides |
|---|---|---|---|---|
| J-B0 | M | Price (P0) | Two full runs in the J0c form, with the sampler copy and the outside-CPU reading. Outputs are copied inside the same queue hold. The resolved Chromium executable and its version are recorded. | Every credit's basis, as the range of the two runs. Spans, anonymous peaks, outside-CPU band, and the failing set with per-title counts. |
| P-A | 0 | Price (P1) | Uncommitted timers in the four halves: build, parse, specificity, signatures, box and text reads, and longhand reads. Each attribution's filter (1990-1995) against the rest. Each partition call split into matched-map build, face declarations, and the rest. The log line (1228-1241), the row (1242), and the portfolio case's artifact write (1860). Two runs in light-1280. | The scan and reuse shares; the credits of items 1b and 2; item 1b, conditions (e) and (f). |
| P-B | 1 | Queue, then price (P2) | Both index forms against the filter at 1990-1995, per representative and sheet, at both widths. Deep equality, then time. | The index form for items 1b and 2. |
| P-D | 1 | Queue, then price (P2) | Count the elements without a component class. Both signature forms, including a selector text shared by rules under different conditions (check 2.9). Groups deep-equal, then time. | Item 3. |
| P-C | 2 | Queue, then price (P2) | The memo against fresh matched maps at 1553, 1633, 1611, and 1674, at both widths, with results deep-equal. Time with and without the memo, the class memo, and the hoisted face declarations. | Which calls take the memo, and item 2's credit. |
| P-E | 3 | Queue, then price (P1) | The set reader against 56 `resolveSpecimen` calls under each face: the same element per title. A unit proof with fixture figures for zero figures, two figures, a non-`HTMLElement` figure, and a title span with `::before` content, each giving the same result and message as `resolveSpecimen`. Time. | Item 4. |
| P-F | 3 | Queue | A counting wrapper on `page.getByRole` and `page.elementLocator` during one scrollspy-1280 table in light-1280 and one scrollspy-390 table in light-390. It counts the removed queries and the closing whole-document reads per row. A fixture with two active links throws at the first scoped poll. | Item 5's credit; lane 3's price runs supply the price. |
| P-G | 3 | Queue, then price (P1) | Both forms of each check at one guarded row. Findings deep-equal, then time. | Item 6. |
| P-H | 3 | Queue, then price (P1) | Specificity readings with and without item 9, for the preservation and partition selector sets, deep-equal. `document.styleSheets` length and the head's children equal after each call. Time of the `DOM.enable` and `CSS.enable` round trips, a page build, a face switch, and one carousel row, with the domains on and off. | Item 9, and with it item 12's destinations. |
| P-I | 3 | Queue, then price (P1) | Both `readLonghands` forms over the 1,670 partition subjects, plus HTML, SVG, and iframe elements and each of `::before`, `::after`, `::placeholder`, `::file-selector-button`, `::backdrop`, `::marker`, `::first-letter`, and `::first-line`. At least two elements per pseudo-element. Keys, order, and values equal, then time. | Item 10. |
| P-J | 4 | Price (P4, P5) | Each moved piece in a scoped run at its destination; then one placement trial full run with the sampler copy and the host-bound count rule. | The placement, its anonymous peak, and its host-bound counts. |

## Questions for the user

Only the user can rule on the following. Each question carries my recommendation.

**Q1: may the per-width preservation and partition halves, and the theme header table, run in a project other than light-1280, while each half builds its reading from the light-1280 variant object (light theme, WIDTH×800)?**

- The code comments (`integration.test.ts:1122, 1440`) and the guide (`guides/veneer.md:1965-1966`) record a ruling that selects light-1280.
- **Recommend yes**, with item 9 landed before any destination that holds a host-bound title. The case already reads 390×800 inside light-1280 (1129-1131, 1446-1447), so the ruling selects the reading, and the host project is a scheduling choice.
- Acceptance refuses a placement under which any host-bound title fails more often than in J-B0, so no proof is lost to the move.
- It adds 90 to 126 s of modeled reduction beyond layer 1's central 118.3 s, or 24 to 42 s with dark-1280 alone.
- Item 13, if ever taken, falls under this ruling.

**Q2: may this host run nothing outside the unit's queue for the unit's duration, and may every lane pause during the price windows?**

- **What the queue means for other work:** every command on this host that launches Chromium or loads the CPU (build, check, lint, format, every Vitest suite, `npm ci`) runs as `flock /home/user/.wave/journey.lock COMMAND`, the J0c form (`j0c-brief.md:22`). Work outside the unit waits its turn and does not run beside the queue.
- **How long, as bounds from contended runs:** the following table gives the bounds; J-B0 replaces them with alone readings.

| Kind | Content | Bound (s) |
|---|---|---:|
| Price windows (8; lanes paused) | 7 full runs at 858.59 s (`journey-6.log:205`): J-B0, checkpoint, and acceptance twice each, and the trial once | 6,010.1 |
| | P1: P-A twice at 189.0 s (95.24 + 85.79 alone, `report-5.md:317`, plus 8 s start-up, the 18.68 s duration less 10.60 s of tests at `j4-5-isolated.log:9`), and lane 3's run twice at 227.8 s (J4 13.08 at `journey-6.log:13-19`, paired 90.33 at `journey-6.log:59`, alert 30.64 at `journey-4.json:1`, partition 85.79, and 8 s) | 833.8 |
| | P2: lane 1's halves twice at 103.2 s, and lane 2's halves twice at 93.8 s | 394.1 |
| | Step 8 price runs: lanes 1 and 2 as in P2 (394.1 s), and lane 3 twice at 374.5 s (J4, paired, the scrollspy-1280 pair at 78.70 s, alert, and 8 s; then the scrollspy-390 pair at 145.75 s and 8 s) | 1,143.1 |
| | P4: each piece at its destination (95.24 + 85.79 + 10.30 + 3 × 8) | 215.3 |
| Queue outside price windows | Precondition gates on the start commit: every suite but `test:journey` (`tmp/units/flip-gates-2/gates-4333d76.txt:2-28, 32`) | 948 |
| | Lane 0's gate: `test:setup:browser` (243 s, line 24), one full run, and the mutation copy (4 controls × red and green × the 60 s cap, `mutations-6.ts:16`) | 1,581.6 |
| | Lanes 1 and 2's gates: as lane 0, plus each lane's index control red and green | 3,557.2 |
| | Lane 3's gate: its five suites (35 + 158 + 243 + 107 + 194 = 737 s, lines 14, 22, 24, 26, and 28), one full run, the mutation copy, and two index controls red and green | 2,471.8 |
| | Lane 4: `test:setup:browser`, and each piece's mutation red and green | 673.7 |
| | Acceptance scripts: 817 s from lines 2, 4, 6, 14, 16, 18, 22, 24, 26, and 28, plus `test:journey:vue`, which is unmeasured | 817 |
| | E1 and E2 queue parts: item 1a's proof, the split run, lane 3's equality runs, and P-B, P-C, and P-D | 1,739.6 |
| Total | | 20,385.2 (5 h 40 min) |

- The price windows total 8,596.3 s (2 h 23 min), and the longest is 1,717.2 s (28.6 min, two full runs).
- The full gate set takes 1,769 s, or 948 s without its 821 s `test:journey` run (`gates-4333d76.txt:2-32`).
- **What pauses:**
  - The stage B prerequisite readings on this host, such as the Chromium floor check (`lanes.md` § Log, entry "2026-10-04 — engine session to showcase session (the user's rulings: stage B and journey tuning move to you after the Tailwind layer)", bullet "Chromium 153").
  - The D-4 Linux run, if it runs here (entry "2026-10-05 — cloud session (veneer re-pinned …)", bullet "Acknowledged").
  - Any other veneer worktree's gates, and every lane's turns during each price window.
- **What continues:** the read-only work of reading the elements clone, file edits between windows, and the queue's own commands.
- **Recommend yes.** Under load, a saving cannot be told apart from the 40.71 s spread between runs of the same tree. The 1234 timeout and J4's timeout (`tmp/units/tokens-t3/journey-5.err:13-14`) show that load also turns proofs red.

## Measurement plan

The following table names the lanes. Lane M is the Orchestrator's measurement lane, and lanes 0 to 4 write code. Every writer lane loads the coding contract, and the Orchestrator chooses each lane's engine at dispatch:

| Lane | Role | Items | Owned files | Depends on | Done when |
|---|---|---|---|---|---|
| M | measure, record | 0 | `tmp/units/journey-cost/**`; the `lanes.md` rule and record | the user's Q2 | steps 1, 2, 9, 11, and 12 pass |
| 0 | writer | 11, 1a | `integration.test.ts:1122-1695`; `JOURNEY_PLACEMENTS`; the guide titles and § Variant placement; item 1a's helper and proof | J-B0 | step 5's gate passes |
| 1 | writer | 1b, 3 | `collectComponentPreservation`; the `collectComponentSignatures` loop; `AttributionOptions`; call sites 1215, 1273, and 1282 | lane 0 merged | step 8's gate passes |
| 2 | writer | 2 | `collectPartition`; `PartitionOptions`; call sites 1549, 1553, 1611, 1633, and 1674 | lane 0 merged | step 8's gate passes |
| 3 | writer | 4, 5, 6, 7, 9, 10 | `readTailwind` and the set reader; call sites 400, 415, and 1030; `tests/setupBrowser.ts:2847, 2873-2905, 5124-5254`; `tests/setupStyles.ts:277-323, 1455-1464` | J-B0 | step 8's gate passes |
| 4 | writer | 12 (13 deferred) | `JOURNEY_PLACEMENTS` and its comment; § Variant placement | Q1, checkpoint | step 10 passes |

The steps run in the following order:

1. **Evidence, lock, start point, and worktrees (lane M).**
   1. **Copy the evidence before any other command.** Copy the following into `tmp/units/journey-cost/evidence/` with a SHA-256 manifest, and compare each hash with its source where the source still holds the cited line:
      - the design folder's `feasibility-evidence/` folder;
      - `tmp/units/tokens-t3/review/`, with `landing-prev/`;
      - `tmp/units/tokens-t3/` logs `journey-6.log`, `journey-6.err`, `journey-5b.log`, `journey-5.err`, `report-5.md`, `partition-3-dev.log`, `j4-5-isolated.log`, `setup-browser-6b.log`, `chromium.txt`, and `mutations-6.ts`;
      - `tmp/units/flip-preservation/journey-4.json` and `journey-4.log`;
      - `tmp/units/flip-gates-2/gates-4333d76.txt` and `gates.sh`;
      - `tmp/codex/j0b-measure.ts` and `j0c-sampler-control-measurement.json`;
      - `tmp/units/flip-journeys/seventh-report.md`.

      The design folder is session-scoped, so this copy is the durable one.
   2. **Wait for a quiet host.** `ps` must show no `gates.sh`, Vitest, or Chromium process outside the queue. The landing gate run started at 04:24:53 UTC must end before any unit command runs. No one runs `gates.sh` during the unit.
   3. **Log the lock rule.** Before P0, add the following rule to `lanes.md` § Rules: "When a command on this host launches Chromium or runs a build, check, lint, format, install, or test, run it as `flock /home/user/.wave/journey.lock COMMAND`." This closes the gap that check 3.5 found, where no instruction file names the lock.
   4. **Resolve the start point.** The start is the `main` commit after the landing fast-forward that carries T1 to T4 (`lanes.md` § Log, entry "2026-10-05 — cloud session (token unit T4 committed at veneer `4d21de7` …)", bullet "Order from here").
      - The lane re-resolves every cited line at the start commit by searching for its quoted token. The uncommitted T4 merge read at 03:52 UTC moved `tests/setup.ts:1543` to 1596, and the guide's lines 1932, 1965, and 2336 to 2141, 2175, and 2579.
   5. **Create six worktrees (M, 0, 1, 2, 3, and 4)** under `/home/user/.wave/journey-cost/`, outside `/home/user/veneer`, before P0 (check 3.10, 3.12). In each worktree:
      - Check that no `node_modules` folder exists in `/home/user/.wave` or `/home/user`, so that Node's upward lookup cannot hide a missing package.
      - After `cmp` shows the two `package-lock.json` files are equal, copy the main checkout's `node_modules` with `cp -a`, never `cp -al`. Otherwise run `npm ci` in the worktree, through the queue. Six copies take about 2.1 GB of the 13,496,668,160 free bytes (check 3.13).
      - Run `npm run build` through the queue. The showcase imports the built sheet from `dist/` (`j0c-brief.md:21`; `.gitignore:12`), and the build starts with `clean`, which deletes `dist/` (`package.json:68, 110`).
      - Items 0 to 12 touch only `tests/` and `guides/`, so a rebase at step 5 or step 10 needs no rebuild.
      - In every shell, export the toolchain `PATH` (`j0c-brief.md:20`) and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, which this session's environment already carries (check 3.13).
      - Playwright 1.63.0 pins Chromium revision 1243 (`node_modules/playwright-core/browsers.json`), which `/opt/pw-browsers` lacks. The `resolveManagedBrowser` function (`configs/browsers.ts:154-184`) therefore takes the `chromium` alias (164-167), the 1194 build.
      - With the variable unset, `resolveBrowser` (311) calls `resolveBundledBrowser` (198-213) over `BUNDLED_CHROMIUM_LAYOUTS` (46-50) under `BUNDLED_BROWSERS_ROOT` (37). Its first layout is the same alias.
      - J-B0 records the resolved executable and version, which read 141.0.7390.37 on the T3 tree (`tmp/units/tokens-t3/chromium.txt:1`). A later run that resolves another executable is refused.
   6. **Write the unit tools.** Write them in TypeScript, run by Node with `node:` modules only (`AGENTS.md:47`), in `tmp/units/journey-cost/`:
      - **Runner (`run.ts`).** The runner is always invoked as `flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts …`.
        - It runs its command list bare, because a nested `flock` on the same file would deadlock.
        - It writes each command's output into a run folder named for the run, and refuses a folder that exists.
        - It copies `tmp/journey/*.txt` and the JSON report into the run folder before it exits, and records SHA-256 hashes.
        - For a gate, it writes into `tmp/units/journey-cost/gates/COMMIT/`, and it checks that the worktree's `git status` reads clean before and after.
        - A window longer than the 10-minute foreground cap runs as a background command with an internal timeout (`/home/user/scaffold/.claude/AGENTS.md:11`).
      - **Sampler copy (`measure.ts`)** from `tmp/codex/j0b-measure.ts` (check 3.7). At the sampling interval it records the following:
        - `total_rss + total_shmem` from `memory.stat`;
        - each renderer's resident set size (RSS), grouped by browser root process;
        - `oom_kill` from `memory.oom_control`, before and after the run;
        - the live `memory.limit_in_bytes`;
        - the CPU time outside the run's process tree: `/proc/stat` busy time less the run tree's `utime`, `stime`, `cutime`, and `cstime` (check 3.5).

        It writes into the run folder, not into `tmp/codex/` (`j0b-measure.ts:18`).
      - **Mutation copy (`mutations.ts`)** from `mutations-6.ts`. It writes into the run folder, not into `tmp/units/tokens-t3/` (`mutations-6.ts:17`), and adds the following:
        - a check that each target occurs exactly once;
        - a green run after each restore;
        - a report of `result.signal` and `result.error` apart from a surviving mutation, because a timed-out `spawnSync` returns a null status that line 19 reads as a survival (check 3.9).
   7. **Run the precondition gates** on the start commit through the queue: every suite but `test:journey` (J-B0 is its reading). Every failure must be in § Host-bound set. `setup:browser` lists none, so a repeat of the 1234 timeout in this queued run blocks J-B0 as a defect.
2. **Window P0, J-B0 (lane M, price, every lane paused).**
   - Hold the queue across two full runs and their copies, as item 0 states.
   - State J-B0 as the range of its two runs, per case and per project. Record the anonymous peaks, the outside-CPU band (the two readings and their difference), and each host-bound title's failure count out of 2.
   - Precondition for every later gate: J-B0's two runs agree byte for byte on each file's `## Resolved values` section. If they do not, the unit stops and reports the unstable rows.
3. **Lanes 0 and 3 write; E1 runs through the queue.**
   - Lane 0 runs item 1a's proof (`test:setup:browser`) and the split's scoped run in light-1280, comparing its lines with J-B0's.
   - Lane 3 runs the queue parts of P-E, P-F, P-G, P-H, and P-I, one invocation at a time.
4. **Window P1 (price, every lane paused).**
   - Lane 0 runs P-A twice.
   - Lane 3 runs the price parts of P-E, P-G, P-H, and P-I in one light-1280 run, twice.
5. **Gate and merge lane 0** (items 11 and 1a). The gate is step 8's gate, with no index control, and the counts read 92 registered and 0 skipped. Lanes 1 and 2 then rebase onto lane 0 and write their call-site edits, and lane 3 continues on separate functions.
6. **Lanes 1 and 2 write; E2 runs through the queue.** Lanes 1 and 2 run the queue parts of P-B, P-C, and P-D, and their unit proofs, one invocation at a time.
7. **Window P2 (price, every lane paused).** Lanes 1 and 2 run the price parts of P-B, P-C, and P-D.
8. **Gate and merge lanes 1, 2, and 3, in that order.** Lane 3 can merge any time after lane 0, because it touches separate functions. Each lane's gate is one runner invocation through the queue on a clean worktree, and it requires all of the following:
   - **Suites:** `test:setup:browser`. Lane 3 adds `test:src:tailwindcss`, `test:integration`, and `test:src:browser`, because items 9 and 10 change functions those suites call (`tests/src/tailwindcss/index.test.ts:508, 610, 641`; `tests/integration.test.ts:343, 430-431, 528`; the `readTouchListeners` function in the `src:browser` suites).
   - **Mutation copy:** each of the four targets is unique, reads red, then reads green after the restore.
   - **Index controls:** one control per index, each red and then green:
     - drop the lifted sheet from item 1b's index;
     - drop the recipe from item 2's memo;
     - key item 4's set reader to one title;
     - point item 5's cached navigation at the Contents navigation.
   - **One full journey run (check 2.4).** The gate checks that the four `tmp/journey/*.txt` files are newer than that run's start before it compares them. That run serves the following gates:
     - **Line gate:** each logged reading line equals J-B0's after removing its `seconds`, `milliseconds`, and `host` fields. The lines are `Component preservation`, `Component repaired causes`, `Component reader controls`, the three `Component control` lines, `Partition population`, `Partition`, `Partition unmapped control`, `Primary map demonstration`, `Partition role control`, `Partition control`, `Journey Tailwind readings`, `Face census`, `Engine equality`, `Collapse exclusion control`, and `Header statechart`. That list covers every console line in the journey file except the four timing lines (`integration.test.ts:433, 995, 1431, 1687`) and the failure dump (1746, 1816) (check 2.10).
     - **Rows gate:** the `## Resolved values` section equals J-B0's byte for byte after removing the reading-variant prefix.
     - **Items 6 and 7:** they run in every guarded row, and item 7 also runs in the reach case in dark-1280 and light-390, so this run is their full-run gate.
     - **Failures:** every failure is in § Host-bound set.
   - **Reds:** a red in a run whose outside-CPU reading lies outside J-B0's band, widened by the band's own width, is unresolved and reruns in a price window. A red that reproduces there is a defect unless its title is in § Host-bound set (check 3.9).
   - **Price runs, in window W8 (price, every lane paused):** the changed cases, twice each, alone.
     - Lanes 1 and 2 run their halves.
     - Lane 3 runs J4 and the paired case in light-1280, the scrollspy-1280 tables in light-1280, the scrollspy-390 tables in light-390, and the alert table (30.64 s in `journey-4.json:1`).
9. **Window P3, checkpoint (lane M, price, every lane paused).**
   - Run two full runs on the merged tree.
   - Credit each item from per-case durations. An item's confirmed floor is J-B0's faster duration of the cases it changes, less the checkpoint's slower duration of the same cases.
   - Apply the line, rows, and failure gates, the host-bound count rule, and the memory rule.
10. **Lane 4, after Q1.**
    - Compute the placement from the checkpoint's spans, with the tail inflated and the anonymous peaks as inputs.
    - Run P-J's scoped destination runs in window P4 (price), and each piece's mutation through the queue.
    - Run the placement trial in window P5 (price), under the trial's memory and host-bound rules (item 12).
    - Run lane 4's gate: `test:setup:browser`, with the trial as its full run.
11. **Window P6, acceptance (lane M, price, every lane paused).** Run two consecutive full runs with the JSON reporter and the sampler copy. Acceptance passes when all of the following hold:
    - Every failure is in § Host-bound set. A title outside the set blocks acceptance, including a J4 timeout like `tmp/units/tokens-t3/journey-5.err:13-14`.
    - Each host-bound title fails in no more of the two acceptance runs than in J-B0's two runs (check 2.3). A host-bound title that passes is not reclassified.
    - 92 cases are registered and 0 are skipped.
    - The line gate holds. The theme table's `Header statechart` line can name its host in `variant`.
    - The multiset of `## Resolved values` rows across the four files, after removing the reading-variant prefix, equals J-B0's. Each file's rows that no move touched keep J-B0's order.
    - `oom_kill` is unchanged, and the anonymous peak plus the largest single-renderer peak stays at or under the live limit. Both are recorded.
    - Each run's outside-CPU reading lies inside J-B0's band, widened by the band's own width.
    - The slower acceptance run beats J-B0's faster run by at least the sum of the confirmed floors from step 9, plus layer 2's floor recomputed from the checkpoint's spans with f = 1.67. The target in Target and basis is recorded against the result.
    - The imbalance reads at or under the placement's prediction, plus the spread of J-B0's two imbalance readings.
    - Through the queue, the following scripts exit 0 or fail only host-bound titles:
      - `test:src:browser` and `test:setup:browser` (`lanes.md` § Rules, "Gates before landing on `main`", which also names `test:journey`);
      - `format:check`, `lint:check`, and `check` (`AGENTS.md:96`);
      - `test:app:browser`, `test:integration`, `test:guides`, and `test:policy` (`lanes.md` § Log, entry "2026-10-05 — cloud session (veneer re-pinned …)", bullet "Gates at `07694f8`");
      - `test:src:tailwindcss` (item 10);
      - `test:journey:vue` (`package.json:86, 102`).
12. **Record (lane M).**
    - Log J-B0, the checkpoint, the placement trial, the acceptance runs, the spans, the placement, the anonymous peaks, and the host-bound counts in `lanes.md`.
    - Replace the T3 entry's pre-sixth-pass figures with these.
    - Log the `readPerception` cost for the owner of `@orkestrel/test`.

## Gaps closed

Every gap from the critic is closed. Where this draft changes a closure, the entry says so.

1. **Pre-sixth-pass figures.** Closed.
   - Every figure rests on runs A and B, and every target is a reduction from J-B0 (Target and basis).
   - Acceptance refuses any failure outside the set, including J4's 15,000 ms timeout (`journey-5.err:13-14`). J4's 60 s budget stays (`integration.test.ts:438`).
   - The T3 entry's "partition 84 s" (`lanes.md` § Log, T3 entry, bullet "Journey cost") is replaced in step 12.
2. **Item 2's caches.** Closed with a change, in item 2: the whole matched map, the selector-class memo, the face declarations, and the subset calls after P-C. The inverse move is refused rather than made optional.
3. **CDP domains in host-bound projects.** Closed by the ruling in item 9: item 9 is the precondition for the light-390 and dark-390 destinations, slack ranks the admitted destinations, dark-1280 wins a tie, and P-H prices the enables.
4. **Variant logging of moved halves.** Closed in item 11: `variant` names the reading variant, `host` names the project, rows carry the reading-variant prefix, and the line gate removes `host`.
5. **A rows gate that can pass.** Closed:
   - The rows gate compares `## Resolved values` after prefix removal, and the line gate compares normalized lines.
   - J-B0's two runs must agree first.
   - This draft adds one full run per lane gate, with an mtime check, so the gate reads rows that its own run wrote.
6. **Probe and lane order.** Closed with a change:
   - Lanes no longer write during J-B0. Every lane pauses in each price window (check 3.5).
   - Each probe runs in the lane that writes its code, with its queue part and its price part separated.
7. **Item 11 needs no ruling.** Closed: item 11 lands first with every half in light-1280, and only item 12 waits for Q1.
8. **One owner for the selector-major match.** Closed: item 1a, owned by lane 0, with its unit proof.
9. **Same-tree spread and the overwritten citation.** Closed:
   - J-B0 is a range of two runs, and acceptance compares the slower acceptance run with J-B0's faster run.
   - Run B is cited from `landing-prev` and the hashed design-folder copy.
   - Step 1 copies every cited file before any command.
10. **The load factor's target.** Closed: item 12 inflates light-1280's alone-phase work before balancing, the target carries the tail allowance, and the placement comes from the checkpoint's spans.
11. **Memory.** Closed with a change: the sampler copy reads anonymous memory, per-renderer RSS, `oom_kill`, and the live limit, and the peak is an input to the placement.
12. **The generated script.** Closed: the script stays, and item 0 passes the reporters on the command line.
13. **Missing gates.** Closed:
    - Lane 3's gate adds `test:src:tailwindcss`, `test:integration`, and `test:src:browser`.
    - Each lane's full gate run covers items 6 and 7.
    - Acceptance cites a source for each script.
14. **Mutation targets.** Closed: all four targets stay byte-identical and unique, and the mutation copy checks this.
15. **Worktree facts.** Closed with a change: six worktrees outside the main checkout, with copied `node_modules`, the build, the browser path, and the unit tools, all made before P0.
16. **The moving start point and the red proof.** Closed:
    - The start commit is defined, and citations are re-resolved by token.
    - The precondition gate runs through the queue, and P-H prices the enables.
    - J-B0 records the Chromium build, and B0 is renamed J-B0.
17. **Host time.** Closed with a change: Q2 itemizes 8,596.3 s of price windows and 20,385.2 s of queue time in all, with each bound's source.
18. **Item 8 in layer 1.** Closed by refusing item 8.
19. **Item 4's lost refusal.** Closed with a change: the set reader calls `resolveSpecimen` per distinct title, so the engine query and both refusals are the original code.
20. **Log volume.** Closed: P-A times the log line, the row, and the artifact write, credited 0 s. Lane 1 serializes one time only if P-A prices the duplicate, and item 12 records where the volume moves.
21. **Citations.** Closed:
    - The table-end checks sit at `integration.test.ts:1801-1802`.
    - `journey-4.json` and `journey-4.log` are cited under `tmp/units/flip-preservation/`.
    - Every `lanes.md` citation names its section or entry heading.

## Check findings closed

The following list gives each of the 38 check findings with its disposition.

**Check 1 (figures and citations, 15 findings):**

- **1.1 (most figures verified):** kept. Run B's citations move to `landing-prev` (check 3.2), and the verified figures stand.
- **1.2 (item 2's upper-bound attribution):** fixed. The role control and the primary-map demonstration are dated after the pass-3 run, citing `journey-5b.log:161, 163, 183, 185`.
- **1.3 (737 s is not a full gate set):** fixed. 737 s is lane 3's five suites. The full set is 1,769 s, or 948 s without `test:journey` (`gates-4333d76.txt:2-32`).
- **1.4 (18 rows per scrollspy table; item 5's saving):** fixed. The basis states 18 rows per table and 36 per pair, and the net removal of 8 to 18 queries per row gives 4.0 to 11.0 s. The layer sums are recomputed.
- **1.5 (`traverseFocus` caller):** fixed in Notes on the proposals: 4934 and 4947, with the tooltip table at 5369.
- **1.6 (item 6, line 1733):** fixed. Line 1733 runs one time after each header table, and lines 960 and 1733 run the reference check only. The class check sits at 1802 and `tests/setupBrowser.ts:3136`.
- **1.7 (reach case projects):** fixed. Step 8 and item 7 name dark-1280 and light-390 (`tests/setupBrowser.ts:5345`; `integration.test.ts:686`).
- **1.8 (item 4's floor arithmetic):** fixed by the redesign in check 2.1. Item 4 credits 2.7 to 3.3 s per project from 196 fewer queries, and the layer-1 floor reads 64.7 s.
- **1.9 (source of the acceptance scripts):** fixed. Each script cites `lanes.md` § Rules, `AGENTS.md:96`, the re-pin entry's gate bullet, item 10, or `package.json`.
- **1.10 (browser path citations):** fixed in step 1e: `j0c-brief.md:20` for `PATH` only, with the browser variable from this session's environment, and `configs/browsers.ts:37, 46-50, 154-184, 164-167, 198-213, 311`. An unset variable resolves the same alias.
- **1.11 (line ranges):** fixed: 2140-2325, 1938-2058, 5643-5694, 1153-1161, and guide 2336-2371. Item 9 cites `readPartitionRules` at 1134 and 1508, with `readSpecificities` at `tests/setupBrowser.ts:1821`.
- **1.12 (25 percent against a 25.7 percent band):** fixed. The recomputed central band starts at 25.5 percent, and the target is stated as 0.5 points under it.
- **1.13 (rounding):** fixed: 114.27 s, and the 4.53 s from the unrounded operands 61.4511 − 28.3547 − 28.5637.
- **1.14 (end-table method):** fixed. The end rule states the proportional spread over untimed seconds.
- **1.15 (unstated half-split and dark-1280 rules; Q2 hours):** fixed.
  - The half-split, other-project, search, and wall rules are stated, with every intermediate figure in a table.
  - The dark-1280-only row keeps the theme table in light-390.
  - Q2 itemizes every run with its bound and source.

**Check 2 (coverage, 10 findings):**

- **2.1 (item 4 loses the engine's exact-name match):** fixed. The reader calls `resolveSpecimen` per distinct title (proposal 1's form), the `readName` keying is refused, and P-E adds a generated-content fixture.
- **2.2 (item 5 can drop the two-active refusal):** fixed. Scoped polls go through `page.elementLocator(navigation).getByRole('link')`, every poll and `scrollComponentTo` attempt throws the same error, and P-F adds a two-active fixture.
- **2.3 (item 12 can hide host-bound reds):** fixed. The trial and acceptance apply the per-title count rule against J-B0, and the dark-1280 fallback holds until item 9 lands.
- **2.4 (the rows gate has no run that writes rows):** fixed. Each lane's gate runs one full journey run and checks the artifacts' mtimes against that run's start.
- **2.5 (P-I and pseudo-elements):** fixed. P-I names the eight pseudo-elements, the cache keys on the pseudo-element, and a differing enumeration drops item 10.
- **2.6 (item 11 keeps coverage; partition has no `failures` list):** fixed in wording. Partition halves keep their `expect` calls, and the duration lines are named as timing lines outside the line gate.
- **2.7 (item 1b keeps coverage; the options spread):** closed. The index travels in its own field, never in the shared `options` object, and condition (b) refuses it if it reaches a control.
- **2.8 (item 2 keeps coverage):** no change needed. The `FACES` order and the `scales` facts are recorded in condition (b).
- **2.9 (items 3, 6, 7, and 9 keep coverage):** closed. P-D adds a selector text that rules share under different conditions, and item 9 records the `setupStyles.test.ts:239` failure path.
- **2.10 (item 12's readings and the line gate keep coverage):** no change needed. The shared browser list and the line-gate exclusions are recorded in item 12 and step 8.

**Check 3 (feasibility on this host, 13 findings):**

- **3.1 (host facts):** recorded. The plan reads the live cgroup limit (14,345,031,680 bytes) at run time and caps nothing at 14,345,035,776.
- **3.2 (URGENT, evidence being overwritten):** fixed.
  - Run B is cited from `landing-prev` and the hashed design-folder copy, and the 1234 timeout from `review/setup-browser-gates-timeout.err:4-5` and the design-folder copy.
  - Step 1a copies everything before any command, and the runner writes into per-run and per-commit folders that it refuses to reuse.
- **3.3 (exclusive `flock` deadlocks a shared window):** fixed with a single serial queue. Every unit command takes the lock exclusively in its own runner invocation, and the runner never nests `flock`. The turnstile design is listed in Refused changes as not taken.
- **3.4 (price windows starved by shared locks):** fixed. The queue has no shared holders, and lanes pause before a price window takes the queue.
- **3.5 (`gates.sh` takes no lock; no instruction names the lock):** fixed. `gates.sh` is not run during the unit, the runner replaces it under the lock, step 1b waits for a quiet host, and step 1c adds the lock rule to `lanes.md` § Rules before P0.
- **3.6 (lanes' editing CPU):** fixed. Every lane pauses in every price window, including P0. The sampler copy records the CPU outside the run tree, and a run outside J-B0's widened band reruns.
- **3.7 (the sampler reads cache):** fixed. The sampler copy reads `total_rss + total_shmem`, per-renderer RSS by browser root, `oom_kill` before and after, and the live limit. Acceptance and the trial use those readings.
- **3.8 (equality by instance count):** fixed. Every command runs one at a time through the queue, so the heavy light-1280 work never overlaps.
- **3.9 (reds under load read as defects):** fixed.
  - Gates and mutations run through the queue, and a red outside J-B0's CPU band is unresolved until it reruns in a price window.
  - The mutation copy reports `signal` and `error` apart from a survival.
- **3.10 (several commands in one worktree):** fixed. The global queue runs one command at a time, and a gate requires a clean worktree before and after.
- **3.11 (worktree setup inside P0):** fixed. Step 1e creates, copies, and builds all six worktrees before P0, and rebases need no rebuild.
- **3.12 (hard-linked `node_modules`; nested worktrees):** fixed. `node_modules` is copied with `cp -a` into worktrees under `/home/user/.wave/journey-cost/`, with an ancestor `node_modules` check.
- **3.13 (feasible as written):** kept. Disk, inode count, the browser alias, the toolchain, and port fallback are recorded where the plan relies on them.
