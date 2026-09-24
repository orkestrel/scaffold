1. **CONFIRMED — Scope.** The live diff and retained `fp-2.diff` have identical SHA-256 digests. The attack for changes outside ownership found none: the live status matches [fp-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/fp-2-status.txt:1). The shared patch changes only guide prose and the export-list proof; see [fp-shared-2.patch:1](/home/user/scaffold/.orkestrel/veneer/units/fp-shared-2.patch:1) and [fp-shared-2.patch:55](/home/user/scaffold/.orkestrel/veneer/units/fp-shared-2.patch:55). The Orchestrator’s ruling admitting that export-list edit holds.

2. **CONFIRMED — Pressed faces.** N1 restores vertical grouping. The independent lone-host comparison distinguishes that mutation through changed corner radii; the assertion also compares margins, and a separate rectangle comparison rejects overlap. Evidence: [ButtonGroupSection.test.ts:370](/home/user/veneer-fp/tests/app/browser/sections/ButtonGroupSection.test.ts:370), [ButtonGroupSection.test.ts:390](/home/user/veneer-fp/tests/app/browser/sections/ButtonGroupSection.test.ts:390), and [ButtonGroupSection.test.ts:393](/home/user/veneer-fp/tests/app/browser/sections/ButtonGroupSection.test.ts:393).

   I read [fp-mutations-2.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:1), which records N1 failing the corner assertion, and [fp-2-sections.log.txt:82](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-2-sections.log.txt:82), which records the passing case. The toolbar alternative is present at [ButtonGroupSection.test.ts:65](/home/user/veneer-fp/tests/app/browser/sections/ButtonGroupSection.test.ts:65); the copy names disabled forms and pressed faces at [constants.ts:907](/home/user/veneer-fp/app/browser/constants.ts:907).

3. **CONFIRMED — Dark pressed row.** The photographed rows are selected by their primary and danger role classes at [integration.test.ts:1668](/home/user/veneer-fp/tests/app/browser/integration.test.ts:1668). Their measured hover and press ratios are checked against the constant at [integration.test.ts:1777](/home/user/veneer-fp/tests/app/browser/integration.test.ts:1777).

   N3 changes the photographed press to the dark role. The assertion distinguishes it: [fp-mutations-2.log.txt:27](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:27) records rejection of `1.0834694430672245`. N8 changes the threshold to `0.5`; [fp-mutations-2.log.txt:92](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:92) records failure of the lower-bound assertion. The bounds are independently asserted at [setup.test.ts:185](/home/user/veneer-fp/tests/setup.test.ts:185).

   The threshold `1.2` lies between the rejected reading and the photographed readings retained at [report:61](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md:61). I read the passing role-action executions in [fp-2-journey-dark-390.log.txt:100](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-2-journey-dark-390.log.txt:100) and [fp-2-journey-light-1280.log.txt:100](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-2-journey-light-1280.log.txt:100). This establishes the stated calibration, not a universal perceptual threshold.

4. **BROKEN — Disabled-check assertion coverage.** The specimen has the required primary variant, and its TSDoc correctly describes the shared label and enabled tab stop; see [constants.ts:975](/home/user/veneer-fp/app/browser/constants.ts:975) and [constants.ts:1041](/home/user/veneer-fp/app/browser/constants.ts:1041). N2 is distinguished: I read its failure at [fp-mutations-2.log.txt:14](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:14) and the passing case at [fp-2-sections.log.txt:81](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-2-sections.log.txt:81).

   However, [ButtonGroupSection.test.ts:284](/home/user/veneer-fp/tests/app/browser/sections/ButtonGroupSection.test.ts:284) asserts a shared variant signature, not a single variant per host. I evaluated the exact source expression against class lists parsed from the specimen, with mutations held only in memory:

   ```text
   Original: signatures ["btn-primary"]; assertion passes.
   N2: signatures ["btn-primary", "btn-outline-primary"]; assertion fails.
   Every host given btn-primary btn-secondary:
     signatures ["btn-primary,btn-secondary"]; assertion passes.
   ```

   The last input falsifies the claimed per-host guarantee. This was an assertion-only evaluation, not a browser-suite run. The smallest fix is to assert a single matching variant class on each host before asserting shared membership. The rendered specimen and N2 regression coverage remain correct.

5. **CONFIRMED — Population ownership.** The Button population derives from the specimen table at [constants.ts:249](/home/user/veneer-fp/app/browser/constants.ts:249), feeds the pressed specimen, and feeds the pointer case at [integration.test.ts:1383](/home/user/veneer-fp/tests/app/browser/integration.test.ts:1383). The List group specimens map their shared constant at [constants.ts:1562](/home/user/veneer-fp/app/browser/constants.ts:1562). The exemption case consumes setup data at [setup.test.ts:119](/home/user/veneer-fp/tests/setup.test.ts:119).

   The mutation attacks distinguish missing population members:

   - N4 removes outline roles and fails the rendered-population comparison against cascade rules at [ButtonGroupSection.test.ts:342](/home/user/veneer-fp/tests/app/browser/sections/ButtonGroupSection.test.ts:342).
   - N5 removes the dark role and fails the ordered cascade comparison at [ListGroupSection.test.ts:119](/home/user/veneer-fp/tests/app/browser/sections/ListGroupSection.test.ts:119).
   - N6 removes the Link exemption and leaves unmatched driven rows at [setup.test.ts:123](/home/user/veneer-fp/tests/setup.test.ts:123).

   I read their records at [mutation log:40](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:40), [mutation log:53](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:53), and [mutation log:66](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:66), plus the passing section and scoped setup logs. No specimen or case retains the displaced literal populations. The separate stylesheet oracle is an independent expectation.

6. **CONFIRMED — Spinner restoration.** N7 adds an inline pause that survives reinsertion. The restored animation states are read from the reinserted specimen and compared with running states at [integration.test.ts:1644](/home/user/veneer-fp/tests/app/browser/integration.test.ts:1644) and [integration.test.ts:1654](/home/user/veneer-fp/tests/app/browser/integration.test.ts:1654).

   I read [fp-mutations-2.log.txt:79](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:79): N7 fails that assertion. Its reported line `1655` includes the inserted mutation line. The passing execution appears at [fp-2-journey-light-1280.log.txt:99](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-2-journey-light-1280.log.txt:99). The assertion distinguishes persistent pausing; ordinary reinsertion restarting the animation is valid behavior.

7. **CONFIRMED — Frames.** I inspected these captures for joined corners, an outline check label, and an indistinct pressed row:

   - Pressed roles: [light capture](/home/user/veneer-fp/tmp/capture/states/pressed-roles--light-1280.png), [dark capture](/home/user/veneer-fp/tmp/capture/states/pressed-roles--dark-390.png).
   - Disabled buttons: [light capture](/home/user/veneer-fp/tmp/capture/states/disabled-buttons--light-1280.png), [dark capture](/home/user/veneer-fp/tmp/capture/states/disabled-buttons--dark-390.png).
   - Pressed role action: [light capture](/home/user/veneer-fp/tmp/capture/states/list-group-role-actions-active--light-1280.png), [dark capture](/home/user/veneer-fp/tmp/capture/states/list-group-role-actions-active--dark-390.png).

   Those attacks found no defect. The buttons stand apart with rounded corners; the check label uses the filled primary treatment at disabled opacity; the danger row visibly separates from resting rows. The corresponding source sites are [constants.ts:1041](/home/user/veneer-fp/app/browser/constants.ts:1041), [constants.ts:1051](/home/user/veneer-fp/app/browser/constants.ts:1051), and [integration.test.ts:1720](/home/user/veneer-fp/tests/app/browser/integration.test.ts:1720). I read the passing capture records at [light log:102](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-2-capture-light-1280.log.txt:102) and [dark log:101](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-2-capture-dark-390.log.txt:101).

8. **BROKEN — Law and report.** The report substitutes “the same command with …” for complete invocations at [report:162](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md:162) and [report:164](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md:164). That contradicts the exact-command requirement. Replace those entries with the complete commands from their retained logs.

   The report also admits overwriting the failed setup gate log at [report:210](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md:210), contrary to the requirement to retain every gate log. Its statement that the whole setup project ran “one time” at [report:175](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md:175) conflicts with that admitted failed run and the retained passing run. Recover the failed record if available; otherwise identify it as lost and correct the run account.

   The syntax attack held. A TypeScript AST inspection of added lines found no prohibited assertion, `any` type, or forbidden nested function; an in-memory control containing those constructs was detected. The added-line suppression, mock, spy, and fake-clock search found none. The prose corrections appear at [setup.ts:449](/home/user/veneer-fp/tests/setup.ts:449) and [shared patch:37](/home/user/scaffold/.orkestrel/veneer/units/fp-shared-2.patch:37). I inspected every retained round-2 gate log: each records its command near the head and its exit at the foot, and its result agrees with the report. These findings do not invalidate those passing executions.

   The requested census follows. References address [b-passive-frames-report-2.md](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md).

   ```text
   4, 40, 218: both rounds
   17, 75: two columns
   29, 94: both constants
   32: both photographed fills
   35, 83, 139: one variant
   43–49: diffstat values 103, 411, 176, 100, 63, 34, 168
   50: 7 files; 1006 insertions; 49 deletions
   77: a lone host; no two host boxes overlapping
   78: four rounded corners
   82: two check selectors; one shared label; the only tab-stop host
   91: one population
   137: Tests 1 failed
   158: Tests 300 passed (300)
   159: Tests 21 passed (21)
   160: Tests 14 passed (14)
   161–162: Tests 4 passed | 46 skipped (50)
   163–164: Tests 5 passed | 45 skipped (50)
   170: Tests 20 passed (20)
   171: Tests 1 passed (1)
   172: Tests 198 passed (198)
   175: each whole project ran one time
   180: command headers rewritten into one line
   210: one failed setup run
   ```

   The column and unnamed-constant tallies violate the growable-set prohibition. Quoted diffstat and test results are recorded measurements; corner geometry and per-host cardinality describe constraints. The forward-looking “from here” at [report:179](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md:179) also remains despite the brief’s temporal-word restriction.

Findings outside the claims: none.

Attacked and held: the attacks are recorded in their verdicts. Adjacent correct behavior includes disabled opacity changing the visible fill, shared disabled-check selectors reaching the same label, reinsertion restarting a spinner, and mode-token hover subjects remaining unframed under the accepted ruling.

VERDICT: FAIL 4, 8; outside the claims: none