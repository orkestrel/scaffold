The plan has 21 gaps. Gaps 1 to 5 change its figures or its proof. Gaps 6 to 8 and 17 change how much of the work can run in parallel. Repository paths are relative to `/home/user/veneer`, and `integration.test.ts` means `tests/app/browser/integration.test.ts`. `lanes.md` is in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/`, and the `j0c-*` records are in its `showcase/` folder. Scaffold paths are relative to `/home/user/scaffold`.

1. **The plan's numbers come from a run made before the sixth pass, and the partition case has grown by about 59 s since.**
   - **Evidence:**
     - The plan prices everything from `tmp/units/tokens-t3/journey-5b.log` (761.76 s, line 201).
     - Two later full runs on one source tree read 858.59 s (`tmp/units/tokens-t3/journey-6.log:205`) and 817.88 s (`tmp/units/flip-gates-2/test:journey.log:205`). No file under `app/`, `src/`, `tests/`, or `configs/` is newer than the journey-6 start marker (`tmp/units/tokens-t3/journey-6.log.pid`, 2026-10-05 02:31 UTC).
     - In those runs the partition case reads 143.16 s and 113.20 s (line 199 of each log), against the plan's 84.29 s (`journey-5b.log:195`). Run alone it reads 85.79 s (`tmp/units/tokens-t3/report-5.md:317`), against the plan's 61.82 s.
     - The cause is the sixth pass: the unmapped control is a full partition at each width (`report-5.md:233, 317`; `integration.test.ts:1553`). In 5b that control logged only the primary colors (`journey-5b.log:161, 183`). So "three partitions per width" cites a run that partitioned twice.
     - Preservation reads 148.99 s and 139.50 s (`journey-6.log:151`; `flip-gates-2/test:journey.log:139`). The T3 log entry repeats the old figures ("partition 84 s", `lanes.md:68`).
     - The brief's "3 failed in the last two runs" misreads `journey-5.log:183`, which shows 5 failed. One of them is J4 at dark-1280 timing out at 15000 ms (`journey-5.err:13-14`), and J4 is not in the host-bound set (`lanes.md:58`).
   - **Fix:** rebase items 1 and 2, the 122 s sum, the 629 s and 570 s models, and both targets on the sixth-pass runs. State each target as a reduction from B0, not as seconds on the 761.76 s basis.

2. **Item 2 rejects the largest cache that keeps outputs identical, and the reason it gives does not hold in the code. It also misses two costs inside each call.**
   - **Evidence:**
     - The plan refuses to cache declarations because the `resolvePartitionProperty` function reads `values.bootstrap` (`tests/setupBrowser.ts:2173`).
     - The main and unmapped calls pass `subjects` itself (`integration.test.ts:1549, 1553`). The inverse call and both subset calls spread `...subject.values` and replace only `tailwindcss` (1606, 1636, 1679). So every call sees the same `values.bootstrap` map per element and builds the same per-subject `matched` map (`tests/setupBrowser.ts:2158-2196`).
     - Inside each call, the `collectSelectorClasses` function (`tests/setup.ts:1543`), a per-character tokenizer, runs for every matched selector of every subject (`tests/setupBrowser.ts:2170`).
     - The `faceDeclarations` map is rebuilt for every shared class name, but it never reads the name (2199, 2221-2240).
   - **Fix:**
     - Key the memo by element and by the identity of the `values.bootstrap` map, and cache the whole `matched` map across main, unmapped, and inverse. Extend it to the subset calls at 1611 and 1674 after P-C proves equality there.
     - Memoize `collectSelectorClasses` by selector text.
     - Build `faceDeclarations` once per subject and face.
     - Price all three in P-A. With this memo, the inverse move in 2(c) becomes optional.

3. **Item 12 moves the open CDP domains into the projects that hold every host-bound title, and its placement ignores its own preference for dark-1280.**
   - **Evidence:**
     - The `readPartitionRules` function (`tests/setupBrowser.ts:1821`) calls the `readSpecificities` function. That function enables the DOM and CSS domains (`tests/setupStyles.ts:283-284`) and never disables them. Each case calls it (`integration.test.ts:1134, 1508`).
     - The placement puts pieces in light-390 and dark-390, which hold all five host-bound journey titles (`lanes.md:58`).
     - The moved pieces run in the matrix block (`integration.test.ts:860`), which comes before the statechart tables (1698). So the accordion, tooltip, collapse, and navbar-390 tables would run with both domains on.
     - Item 12's own condition prefers dark-1280, yet the placement moves nothing there. Item 9, the only change that turns the domains off, is optional and credited 0 s.
   - **Fix:** make item 12 depend on item 9 landing with P-H green, or restrict destinations to dark-1280 until P-H shows the domains change no host-bound row. Rule which preference wins.

4. **Moved halves would log the host project's variant, not the variant they read, and the per-project artifact captures those lines.**
   - **Evidence:**
     - The cases log `variant: VARIANT` at `integration.test.ts:1432, 1527, 1550, 1688`, and the header table logs it at 1762. In dark-390 these lines would say "dark-390" while reading light-1280.
     - The journal copies every console line into the artifact (`JOURNAL.output` constant, 1877). After the run that ended 2026-10-05 03:19 UTC, the Journal section of `tmp/journey/light-1280.txt` (lines 362-499) holds 24 preservation and partition lines.
     - Acceptance allows only an order change for lines that move.
   - **Fix:** each half logs the reading variant plus a separate host field. Acceptance compares lines after normalizing the host and timing fields, and allows the theme table line's variant to change.

5. **The lane gate "rows file equal to B0's" can never pass byte for byte.**
   - **Evidence:**
     - The artifact's Journal section carries timing fields. In the four `tmp/journey/*.txt` files, the lines matching `seconds` or `milliseconds` number 3, 4, 6, and 3.
     - Every journey run in the checkout overwrites these files (`integration.test.ts:1860-1861`). The T3 gate lane rewrote them between 03:14 and 03:19 UTC on 2026-10-05.
   - **Fix:**
     - Compare the `## Resolved values` section byte for byte, after the prefix normalization item 11 adds.
     - Compare the Journal's console lines after removing their `seconds` and `milliseconds` fields.
     - Copy B0's four files out of `tmp/journey/` as soon as each B0 run ends.

6. **The plan puts the probes before any code, but most probes need the lanes' code, and several "equality" probes also measure time.**
   - **Evidence:**
     - P-B, P-C, P-D, P-E, P-G, and P-I compare a candidate form with the existing code, so the lane must write the candidate first.
     - P-B, P-D, P-E, P-G, P-H, and P-I time their forms. That makes them price probes, yet the plan lets "equality probes" run concurrently.
   - **Fix:**
     - Start the three lanes while B0 runs. Items 1 to 7 keep outputs identical, so writing them does not wait on B0.
     - Each lane keeps its candidate behind an uncommitted switch, runs its equality checks scoped and concurrently, and queues its timing runs under the lock.
     - Fold P-A, P-B, P-C, P-D, and P-I into one instrumented scoped run of the two cases at both widths. Fold P-E, P-F, P-G, and P-H into one instrumented run per affected project.

7. **Item 11 needs no ruling while all four halves stay in light-1280.**
   - **Evidence:**
     - Splitting each case into two width cases that both stay in light-1280 keeps the ruling recorded in the code comments (`integration.test.ts:1122, 1440`) and in the guide (`guides/veneer.md:1966`).
     - The JSON report records a duration per case (`tmp/units/flip-preservation/journey-4.json:1`), so the split yields per-width prices without phase timers.
     - The plan lands item 11 last only because it re-indents the bodies that items 1 and 2 edit.
   - **Fix:** write item 11 first, with all four placements naming light-1280, while B0 runs, and branch lanes 1 and 2 from it. Keep only item 12 conditional on Q1. The counts move from 96 registered and 6 skipped (`journey-5b.log:199`) to 92 and 0 at that step.

8. **Three items build the same selector-major match, in two lanes that run in parallel, with no single owner.**
   - **Evidence:**
     - Items 1(a), 2(b), and 3 each build a selector-major match with the identical predicate.
     - Lanes 1 and 2 both edit `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and the matrix block of `integration.test.ts`.
   - **Fix:** name one exported helper and its unit proof, and land it first as a lane-0 commit or in lane 1. Items 2 and 3 call that helper.

9. **Two runs on the same tree differ by more than the plan's floor saving, and one of the plan's citations has been overwritten.**
   - **Evidence:**
     - The same-tree runs differ by 40.71 s in wall time (858.59 s and 817.88 s, line 205 of each log) and by 29.96 s in the partition case (143.16 s and 113.20 s, line 199 of each).
     - Acceptance asks only that the wall fall by the credited floor, measured against a B0 of two runs.
     - The plan's host-load figure cites `flip-gates-2/test:journey.log:201` at 895.58 s. That file was rewritten at 2026-10-05 03:19 UTC and reads 817.88 s at line 205.
   - **Fix:**
     - State B0 as the range of its runs. Accept when the slower acceptance run sits under B0's faster run by the credited floor.
     - Credit each item from per-case durations, not from the wall.
     - Copy every log the unit cites into the unit's own folder.

10. **The load model applies the full-load factor to the wrong work.**
    - **Evidence:**
      - In the 591.13 s run, light-1280's preservation and partition cases are its 9th and 10th of 22 cases. The 8 cases before them sum to 133.55 s after a 10.29 s start offset (`journey-4.json:1`). So both ran while all four projects were running; the first project ended at 396.97 s.
      - The work that ran with fewer than four projects is light-1280's tail: 114.26 s alone after 476.86 s.
      - Item 12 applies the 1.43× factor (`paired-5.log:19`; `journey-5b.log:59`) to the moved halves and adds 20 s.
    - **Fix:** apply the factor to the tail work that balancing pulls into the four-project phase. For the 114.26 s tail alone, 0.43 × 114.26 s ≈ 49 s, which is more than the 20 s margin. Derive the placement and the target from B0's spans.

11. **Placement ignores memory, and no memory sample exists on the tree being changed.**
    - **Evidence:**
      - The placement runs heavy halves in light-1280, light-390, and dark-390 during the same part of the file order (the matrix block).
      - The last sampled peak is 12,288,905,216 bytes against a 14,345,035,776-byte cap (`j0c-report.md:117`), taken on the J0c tree. The newest sampler files are `tmp/codex/j0c4-final-*-measurement.json`, and neither `report-4.md` nor `report-5.md` records a peak.
      - Scoped runs at a destination run alone, so they cannot show peaks that coincide across projects.
    - **Fix:** run the sampler in B0 and in the checkpoint run with the placement. Make the measured peak an input to the placement, not only an acceptance check.

12. **Item 0 edits a script that scaffold generates.**
    - **Evidence:**
      - Scaffold writes `test:journey` as exactly `vitest run --config … --no-cache --reporter=dot` and derives `test:journey:vue` from it (`src/core/compilers.ts:492-494`). Its script audit reports any value that differs (`src/bin/CLI.ts:1250-1260`).
      - Veneer commit `b242bce` re-pinned scaffold to `^0.0.92` at 2026-10-05 03:30 UTC.
      - J0c passed the JSON reporter on the command line and left the script alone (`j0c-brief.md:89`).
    - **Fix:** keep the script, and pass `--reporter=dot --reporter=json --outputFile=…` on each price run.

13. **The gate lists leave out suites that use the changed helpers, and lane 3's gate names no case.**
    - **Evidence:**
      - The `readLonghands` function (item 10) and the `readSpecificities` function (item 9) are used by `tests/src/tailwindcss/index.test.ts:508, 610, 641` (`test:src:tailwindcss`, `package.json:92`) and by `tests/integration.test.ts:343, 430-431, 528` (`test:integration`, `package.json:108`). Line 343 depends on the enumeration that `readLonghands(document.body)` returns.
      - Items 6 and 7 run in every guarded row (`tests/setupBrowser.ts:3134-3137`) and in the reach case (`integration.test.ts:695`), across all four projects.
    - **Fix:** add `test:src:tailwindcss` and `test:integration` to lane 3's gate and to acceptance. Gate items 6 and 7 with a full run.

14. **The plan protects two of the four mutation targets.**
    - **Evidence:**
      - `tmp/units/tokens-t3/mutations-6.ts:6-9` holds four controls. Items 1(d) and 2(e) cover the two in `tests/setupBrowser.ts`.
      - Item 1(e) rewrites the `attributeDeparture` function (`tests/setupStyles.ts:574-633`), which holds the `table` target at line 628. The `inherited` target is at line 548.
      - The script mutates the first occurrence after an `includes` check (`mutations-6.ts:13-15`), so a second copy of a target string sends the mutation to the wrong code.
    - **Fix:** keep all four targets byte-identical and unique, and check uniqueness in each lane's gate.

15. **The worktree in measurement step 1 cannot run the journeys as written.**
    - **Evidence:**
      - A worktree without `node_modules` fails before collection on `../node_modules/tailwindcss/preflight.css?raw` (`tmp/units/flip-journeys/seventh-report.md:46`; the import is at `tests/setupBrowser.ts:72`).
      - The showcase reads the built sheet from `dist/`, which is ignored and so untracked (`j0c-brief.md:21`; `.gitignore:12`).
      - The sampler and the mutation script sit in the main checkout's ignored `tmp/` (`.gitignore:11`).
    - **Fix:** hard-link `node_modules` as the pre-flip reading did (`lanes.md:53`), run `npm run build`, and call the sampler and `mutations-6.ts` by absolute path.

16. **The start point keeps moving, and the T3 gate shows a red proof on the path item 3 changes.**
    - **Evidence:**
      - At the T3 gate, `test:setup:browser` reads 1 failed (`tmp/units/flip-gates-2/gates-4333d76.txt:42, 56`): the signature proof at `tests/setupBrowser.test.ts:1234` times out at 15000 ms (`tmp/units/flip-gates-2/test:setup:browser.err`).
      - That proof's body is one `readPartitionRules` call over a 2-rule sheet plus three signature scans over a 7-element fixture (1234-1257). By inference, the time sits in the CDP specificity read, not in the scan item 3 changes.
      - The re-pin landed as browser `^0.0.24` and scaffold `^0.0.92` (`b242bce`), not the `^0.0.23` and `^0.0.91` the plan's `lanes.md:73` citation describes. The order is at `lanes.md:70` after a log entry was inserted.
      - The plan's baseline name, B0, collides with stage B's first unit, also called B0 (`lanes.md:116`).
    - **Fix:**
      - Before B0, require every gate to read only its host-bound set.
      - Re-resolve every line citation at the start commit.
      - Add the price of the `DOM.enable` and `CSS.enable` calls to P-H.
      - Record the Chromium build in the baseline, and rename it, for example to J-B0.

17. **Q4 undercounts how long the host must be kept clear.**
    - **Evidence:**
      - Six full runs take 81.8 to 85.9 minutes at 817.88 to 858.59 s each (gap 9's runs).
      - The count leaves out P-A's two runs, the timing probes, each lane's two price runs, the scoped runs at destinations, and `mutations-6.ts`.
    - **Fix:** after batching the probes (gap 6), state the total time the host must be clear in Q4, and name the lanes that pause.

18. **Item 8 is a ruling on the user's constraint, though Layer 1 says no ruling is needed.**
    - **Evidence:**
      - The user's word keeps "every assertion, control, and reading".
      - Item 8 drops the `text` reads on elements other than the representatives (`integration.test.ts:1182-1192`) by the judge's own definition of a reading.
      - It is credited 1 s (range 0 to 2 s).
    - **Fix:** put item 8 to the user alongside Q1, or drop it.

19. **Item 4 loses one refusal.**
    - **Evidence:** the `resolveSpecimen` function refuses a figure that is not an `HTMLElement` (`tests/setupBrowser.ts:1389`). The `indexByName` helper has no such check (1174-1191).
    - **Fix:** the set reader keeps that refusal for every title it resolves.

20. **Nobody has priced the log volume.**
    - **Evidence:**
      - The two preservation log lines are 2,561,198 and 2,552,633 characters (`journey-6.log:95, 139`).
      - The same result is serialized again into the rows (`integration.test.ts:1242`) and into the journal. As a result, `tmp/journey/light-1280.txt` reaches 10,639,806 bytes.
      - Item 11 moves this volume into other projects along with the halves.
    - **Fix:** in P-A, time the log line, the row, and the artifact write, and credit nothing until that timer has a reading.

21. **Three citations are wrong or unstable.**
    - **Evidence:**
      - The checks that run at the end of each table sit at `integration.test.ts:1801-1802`, not 1794-1795.
      - `journey-4.json` and `journey-4.log` are in `tmp/units/flip-preservation/`, not where the preamble implies.
      - `lanes.md` changed at 2026-10-05 03:25 UTC, which moved the line the plan cites as `lanes.md:73`.
    - **Fix:** cite these paths and lines, and pin each `lanes.md` citation to a quoted heading rather than a line number alone.