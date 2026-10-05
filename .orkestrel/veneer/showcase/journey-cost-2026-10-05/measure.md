Per-case seconds come from the last full run that records every case. That run is `/home/user/veneer/tmp/units/flip-preservation/journey-4.json`, the flip-preservation lane's 591.13 s run from 2026-10-04 (lanes.md:126). It has the same 96 cases as the T3 runs and reads 87 passed, 3 failed, and 6 skipped (`journey-4.log:166-169`). The file is a single line, so it is cited as `journey-4.json:1`. Entries `testResults[0]` to `[3]` are light-1280, dark-1280, light-390, and dark-390, matched by the component tables each one ran.

The two T3 runs used the dot reporter: `/home/user/veneer/tmp/units/tokens-t3/journey-5b.log` (761.76 s) and `journey-5.log` (872.76 s). That reporter prints no per-case duration, so their only per-case seconds are the ten elapsed bodies the file logs. The last column gives those from `journey-5b.log`.

In the variant columns, a dash marks a case the variant does not register, and `skip` marks a case that is registered and skips. Every case title and line is in `/home/user/veneer/tests/app/browser/integration.test.ts`.

| Case (line) | What it does | light-1280 | dark-1280 | light-390 | dark-390 | 761.76 s run, logged body (journey-5b.log line) |
|---|---|---:|---:|---:|---:|---|
| J1 arrival (206) | 1 page build (`buildJourney` helper: viewport, `Showcase` mount, theme click, `waitForPaint` helper), engine boot, 5 pressed-state reads; at 390, 5 computed-style reads for the button heights; 2 portfolio placements | 2.07 | 3.41 | 2.89 | 3.20 | none |
| J2 keyboard (284) | 2 page builds; Shift+Tab 4 or 5 times; 7 focus reads; a Tab walk to Email address; Enter on the skip link and a focus wait | 9.01 | 6.58 | 5.18 | 5.29 | none |
| J3 sections (324) | 1 page build at reduced motion; for each of the 72 sections: a contents click, a landing wait (5,000 ms budget, line 358), a scroll settle (4 equal frames), a scroller-hint check, and a placement; the last section lands under smooth scroll | 28.70 | 30.46 | 28.42 | 28.59 | none |
| J4 faces (394) | 1 page build and engine boot; the `TAILWIND_READINGS` set read 4 times (one computed-style read per reading); 3 face clicks, each with 3 pressed-state waits, a status-text wait, and a paint wait | 9.19 | 11.29 | 9.96 | 9.60 | 12.50 (17), 12.80 (19), 12.71 (13), 12.22 (15) |
| J6 vocabulary (440) | 1 page build, 3 face switches (`applyFace` helper: click, pressed wait, paint wait), 4 whole-page text reads | 2.61 | 3.16 | 2.46 | 2.87 | none |
| J7 native controls (459) | 1 page build at reduced motion; typing into 3 fields, a select, 4 checkbox, radio, and switch clicks with state waits, a slider key, and a link and a submit with frame waits | - | 14.34 | 13.16 | - | none |
| J8 live engine (516) | 1 page build (default motion in light-390) and engine boot; drives the alert, notice, toggle, route, accordion, dropdown, archive dialog twice, 3 tab lists, toast, 2 tooltips, popover, and end panel twice, with a paint wait after each | - | 12.07 | 11.01, failed (host-bound) | - | none |
| Refusal: reach every control (686) | 1 page build and engine boot; one Tab press per tab stop across the page; for each enabled control, a `pointer-events` read, `scrollIntoView`, a frame, and an `elementFromPoint` hit test per client rect | - | 35.46 | 27.04 | - | none |
| Refusal: disabled engine routes (725) | 9 page builds, one per `DISABLED_SPECIMENS` entry (setupBrowser.ts:2748); waits for the opener animations; each activation is observed for the computed transition window, a fixed `AbortSignal.timeout` wait (setupBrowser.ts:3052) | - | 18.11 | 13.22 | - | none |
| Refusal: disabled and aria-disabled (782) | 1 page build; one refusal read per `REFUSED_CONTROLS` entry | 1.13 | 1.78 | 1.06 | 1.30 | none |
| Refusal: frozen specimens (800) | 1 page build and engine boot; for each reachable control in each frozen root, a click, Enter, and Escape, each followed by a paint wait and a frozen-state read; a theme click, a viewport swap, and the `FROZEN_CONTROLS` clicks | - | 35.16 | 24.45 | - | none |
| Matrix: paired engine (861) | for each family in the variant (5, 6, 2, and 5) and each of the 3 faces: 1 page build (line 874), face click, arrange, trigger scroll and settle, act, panel animation waits, a collapse-rule delete and restore control at the unexcluded face (disclosure families), assert, engine-output read, and reference scan; the popover reading repeats under the 2 other faces; 15, 18, 6, and 15 page builds | 71.62 | 69.91 | 22.80 | 48.18 | 85.83 (59), 82.27 (125), 24.25 (79), 53.77 (39) |
| Matrix: reads (1001) | 1 page build at default motion; for each of the 3 faces: a face switch, the readings, a census control mount, and a class census over the body; sticky and escape checks; contrast reads per subject under the tailwindcss face | 9.22 | 11.56 | 9.27 | 9.63 | none |
| Matrix: preservation (1123), light-1280 only, 1280 then 390 in series | for each width: 1 page build, a tuned-sheet parse, 1458 signatures over 10225 elements, and a baseline-sheet swap; for 2 faces: a face switch, paused animations, box, visibility, and `innerText` reads on 10225 elements, and every computed longhand on the readers and their ancestors; 3 full attributions (main, wrapping control, overflow control), each matching every served and lifted rule against each signature (setupBrowser.ts:1989-1995); 3 sheet-rewrite controls | 62.40 | skip | skip | skip | 135.43 (139); scans 31.26 at 1280 (97) and 33.00 at 390 (127) |
| Matrix: partition (1441), light-1280 only, 1280 then 390 in series | for each width: 1 page build, 3 sheet parses, 8271 elements in 1670 signatures, longhand reads for 209 class names, token scales, and rule reads over 3 sheets; for 3 faces: a face switch and full longhand reads on 1670 elements; 3 full partitions (main, unmapped, inverse) and 3 subset partitions; 3 adopted control sheets with paint waits; 4 more face switches for the map and role controls | 77.44 | skip | skip | skip | 84.29 (195) |
| Statechart header: face (1721) | 9 rows; the harness builds a full page for each row | - | 29.39 | 25.89 | - | none |
| Statechart header: theme | 4 rows, each a page build | - | - | 10.30 | - | none |
| Statechart header: pair | 6 rows, each a page build | - | - | 25.66 | - | none |
| Component tables (1782), motion=true / motion=false | rows reuse the mounted page (`buildComponent` helper, setupBrowser.ts:3198-3238); each row arranges, acts, and asserts with condition waits; unchanged rows wait out the computed transition window; motion=true rows run the real transitions | alert 16.07 / 14.57; popover 51.99 / 10.77; carousel 58.27 / 18.74; modal 35.11 / 21.01; scrollspy-1280 44.67 / 34.03 | button 9.65 (motion=true only); tab 38.68 / 23.86; dropdown 42.63 (motion=true only); offcanvas 25.25 / 15.49; navbar-1280 8.95 / 5.72; responsive-offcanvas-1280 3.50 / 2.63 | accordion 48.97 / 19.43 (failed, host-bound); scrollspy-390 82.37 / 63.38 | tooltip 42.10 / 36.61; collapse 20.82 / 14.26 (failed, host-bound); toast 28.48 / 21.25; navbar-390 45.31 / 23.22; responsive-offcanvas-390 23.50 / 14.04 | none |
| Component tables, subtotal | sum of the preceding row | 305.23 | 176.38 | 214.14 | 269.59 | none |
| Portfolio: no capture (1839) | 1 page build, 1 no-op placement, 1 file listing | 0.90 | 1.10 | 1.02 | 0.94 | none |
| Portfolio: places every state (1848) | 1 page build, capture-name checks, tree and focus dumps, and a write of the variant's file under `tmp/journey/`; asserts `placed` (1855) and `proven` (1884) | 1.32 | 1.16 | 0.83 | 1.26 | none |
| Project span (end offset) | per project, from `startTime` and `endTime` | 580.83 (591.12) | 461.32 (476.86) | 448.76 (465.02) | 380.44 (396.97) | not recorded |
| Cases run | registered minus skipped | 22 | 26 | 22 | 20 | 90 |

In the 761.76 s run, the failing titles are J8 and accordion motion=false at light-390, and navbar-390 motion=false at dark-390 (journey-5b.err:10, 27, 48). In the 591.13 s run, collapse motion=false failed in place of navbar-390.

The following table gives each run's totals from its Vitest summary.

| Run | Start | Wall | Summed tests | Result | Source |
|---|---|---:|---:|---|---|
| flip-preservation lane | 2026-10-04 19:52 | 591.13 s | 1871.42 s | 87 passed, 3 failed, 6 skipped | tmp/units/flip-preservation/journey-4.log:167-169 |
| T2 | 2026-10-04 21:58 | 492.84 s | 1669.09 s | 72 passed, 18 failed, 6 skipped | tmp/units/tokens-t2/accept-22-test-journey.log:793-795 |
| T3, first | 2026-10-04 23:45 | 872.76 s | 2400.67 s | 85 passed, 5 failed, 6 skipped | tmp/units/tokens-t3/journey-5.log:183-185 |
| T3, final | 2026-10-05 00:02 | 761.76 s | 2231.49 s | 87 passed, 3 failed, 6 skipped | tmp/units/tokens-t3/journey-5b.log:199-201 |
| Gates lane, T3 tree on `4333d76` | 2026-10-05 00:34 | 895.58 s | 2453.26 s | 87 passed, 3 failed, 6 skipped | tmp/units/flip-gates-2/test:journey.log:199-201; gates-4333d76.txt:30, 45 |

Between the 591.13 s run and the 761.76 s run, summed test time grew by 360.07 s. The logged bodies explain 125.12 s of that: preservation +73.97 (journey-4.log:97 to journey-5b.log:139), partition +7.36 (journey-4.log:161 to journey-5b.log:195), paired +33.61, and J4 +10.18. The other 234.95 s spreads over cases the dot reporter does not time.

## Drivers

[
 {
  "case": "showcase matrix > attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths (preservation)",
  "variant": "light-1280 (reads 1280, then 390)",
  "seconds": 135.43,
  "what_it_does": "For each width: 1 page build at default motion, a tuned-sheet parse with rule reads, and 1458 component signatures collected over 10225 elements. It swaps the baseline sheet to the tuned sheet. Under the bootstrap and tailwindcss faces it switches the face, pauses running animations, reads box, visibility, and innerText on all 10225 elements, and reads every computed longhand on the readers and their ancestors. Each attribution matches every style rule of the served and lifted sheets against each of the 1458 signatures. The case runs one main attribution and two reader-control attributions (a narrowed inherited set and `coupled: false`), plus three controls that rewrite the served sheet and wait for paint (stripped curation, preserved curation, planted preflight). The main scans take 31.26 s at 1280 and 33.00 s at 390, and the controls take the remaining 71.17 s. Before T3 added the two reader controls, the case read 61.45 s with 4.53 s of controls. Run alone, it reads 98.82 s with 49.59 s of controls, so the full run's contention adds 37.0 percent. All three full attributions in a width read the same sheet set. No run separates selector-matching time from attribution time.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:97, 127, 139; tmp/units/tokens-t3/journey-5.log:83, 111, 123 (139.52 s); tmp/units/flip-gates-2/test:journey.log:95, 123, 135 (150.93 s); run alone: tmp/units/tokens-t3/preservation-5b.log:5, 17, 29, 35; pre-T3: tmp/units/flip-preservation/journey-4.log:65, 89, 97; code: tests/app/browser/integration.test.ts:1123-1439 (attributions at 1215, 1273-1276, and 1282-1285; sheet controls at 1314-1426), tests/setupBrowser.ts:1989-1995; tmp/units/tokens-t3/report-4.md:242 records that the controls repeat the attribution scan twice per width"
 },
 {
  "case": "showcase matrix > compares paired open engine states under bootstrap, unexcluded, and tailwindcss (paired engine)",
  "variant": "light-1280",
  "seconds": 85.83,
  "what_it_does": "Covers 5 families (alert, popover, carousel, modal, scrollspy-1280) under each of 3 faces: 15 page builds at reduced motion. Each build adds a face click, the family's arrange, a trigger scroll and settle, the act, the assert, an engine-output read, and a reference scan. The popover reading repeats under the two other faces, adding face clicks, theme clicks, and output reads. The modal case closes after each face. Run alone, the case reads 59.90 s, so the full run's contention adds 43.3 percent.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:59 (families at 25, 35, 41, 55, and 57); tmp/units/flip-gates-2/test:journey.log:59 (93.44 s); journey-4.json:1 testResults[0] (71.62 s); run alone: tmp/units/tokens-t3/paired-5.log:19; tests/app/browser/integration.test.ts:864-991"
 },
 {
  "case": "showcase matrix > paired engine",
  "variant": "dark-1280",
  "seconds": 82.27,
  "what_it_does": "Covers 6 families (button, tab, dropdown, offcanvas, navbar-1280, responsive-offcanvas-1280) under each of 3 faces: 18 page builds, the most of any variant. navbar-1280 adds a control that deletes and restores the `.collapse` rule, with panel animation waits, at the unexcluded face.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:125 (families at 93, 109, 113, 115, 121, and 123; collapse control at 119); tmp/units/flip-gates-2/test:journey.log:141 (85.18 s); journey-4.json:1 testResults[1] (69.91 s); tests/app/browser/integration.test.ts:888-951"
 },
 {
  "case": "showcase matrix > paired engine",
  "variant": "dark-390",
  "seconds": 53.77,
  "what_it_does": "Covers 5 families (tooltip, collapse, toast, navbar-390, responsive-offcanvas-390) under each of 3 faces: 15 page builds, with the collapse-rule control on collapse and navbar-390.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:39 (families at 21, 27, 29, 33, and 37; controls at 23 and 31); tmp/units/flip-gates-2/test:journey.log:41 (58.83 s); journey-4.json:1 testResults[3] (48.18 s)"
 },
 {
  "case": "showcase matrix > paired engine",
  "variant": "light-390",
  "seconds": 24.25,
  "what_it_does": "Covers 2 families (accordion, scrollspy-390) under each of 3 faces: 6 page builds, with one collapse-rule control on accordion.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:79 (families at 75 and 77; control at 73); tmp/units/flip-gates-2/test:journey.log:79 (25.16 s); journey-4.json:1 testResults[2] (22.80 s)"
 },
 {
  "case": "showcase matrix > partitions the shared names under the three faces at both widths (partition)",
  "variant": "light-1280 (reads 1280, then 390)",
  "seconds": 84.29,
  "what_it_does": "For each width: 1 page build at reduced motion, 3 `replaceSync` sheet parses (built Bootstrap, unexcluded, and recipe), 8271 elements grouped into 1670 signatures, and longhand reads for 209 class names. It reads the border variables, token scales, and rules of the 3 sheets. Under each of the 3 faces it switches the face and reads every computed longhand plus the border variables on the 1670 signature elements. It then runs 3 full partitions (main, unmapped, inverse) and 3 partitions over the `mt-3` subset. It adopts 2 planted control sheets and 1 stripped-curation sheet, each with a paint wait, and switches faces 4 more times for the primary-map and modal-role controls.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:149, 175 (populations), 159, 181 (partition results), 195 (duration); tmp/units/tokens-t3/journey-5.log:179 (83.62 s); tmp/units/flip-gates-2/test:journey.log:195 (87.56 s); tmp/units/flip-preservation/journey-4.log:161 (76.93 s); tests/app/browser/integration.test.ts:1441-1695"
 },
 {
  "case": "showcase matrix > reads resolved values, Tailwind readings, the census, and contrast under its declared variant (matrix reads)",
  "variant": "all four (largest in dark-1280)",
  "seconds": 11.56,
  "what_it_does": "Builds 1 page at default motion. Under each of the 3 faces it switches the face, reads the `TAILWIND_READINGS` set, mounts a census control, and takes a class census over the whole body. It checks the sticky offset and the style escapes, then reads contrast for each subject under the tailwindcss face. The case costs 9.22 to 11.56 s per variant, about 40 s summed across the four.",
  "evidence": "journey-4.json:1 testResults[0..3] (9.22, 11.56, 9.27, and 9.63 s); tests/app/browser/integration.test.ts:1001-1121"
 },
 {
  "case": "showcase statecharts > component tables in light-1280 (carousel, scrollspy-1280, popover, modal, alert; motion=true and motion=false)",
  "variant": "light-1280",
  "seconds": 305.23,
  "what_it_does": "This is the largest block on the critical path. Per table, motion=true plus motion=false: carousel 58.27 + 18.74, scrollspy-1280 44.67 + 34.03, popover 51.99 + 10.77, modal 35.11 + 21.01, alert 16.07 + 14.57. Rows reuse the mounted page and arrange, act, and assert with condition waits (5,000 ms budget). Unchanged rows wait out the computed transition window, and motion=true rows run the real transitions. A table's case budget is 10,000 ms plus 2,500 ms times the largest row count.",
  "evidence": "journey-4.json:1 testResults[0]; tests/app/browser/integration.test.ts:1777-1835; tests/setupBrowser.ts:3023-3054 (stability window), 3113-3141 (guarded rows), 3198-3238 (mount reuse), 5349 (COMPONENT_TABLES)"
 },
 {
  "case": "showcase statecharts > drives the 'scrollspy-390' table, motion=true and motion=false",
  "variant": "light-390",
  "seconds": 145.75,
  "what_it_does": "The most expensive single table: 82.37 s at motion=true and 63.38 s at motion=false. Each row scrolls the spy region and asserts the active link. The table held 36 rows at J0c, and J0c left its arrange-skip cut (item 15) unexecuted.",
  "evidence": "journey-4.json:1 testResults[2]; /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-brief.md:189-193; j0c-scope.md:32"
 },
 {
  "case": "showcase statecharts > component tables in dark-390 (tooltip, navbar-390, toast, responsive-offcanvas-390, collapse)",
  "variant": "dark-390",
  "seconds": 269.59,
  "what_it_does": "Per table, motion=true plus motion=false: tooltip 42.10 + 36.61, navbar-390 45.31 + 23.22, toast 28.48 + 21.25, responsive-offcanvas-390 23.50 + 14.04, collapse 20.82 + 14.26. collapse motion=false and navbar-390 motion=false are in the host-bound set. In the 591.13 s run, this project ended 194.15 s before light-1280.",
  "evidence": "journey-4.json:1 testResults[3]; /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md:58"
 },
 {
  "case": "showcase statecharts > component tables in dark-1280 and the accordion table in light-390",
  "variant": "dark-1280, light-390",
  "seconds": 244.78,
  "what_it_does": "dark-1280 totals 176.38 s: dropdown 42.63 (motion=true only), tab 38.68 + 23.86, offcanvas 25.25 + 15.49, button 9.65 (motion=true only), navbar-1280 8.95 + 5.72, and responsive-offcanvas-1280 3.50 + 2.63. light-390 adds accordion at 48.97 + 19.43; accordion motion=false is host-bound and fails after its 5,000 ms Enter-burst wait.",
  "evidence": "journey-4.json:1 testResults[1], [2]; tmp/units/tokens-t3/journey-5b.err:27-28"
 },
 {
  "case": "showcase statecharts > drives the face, theme, and pair header tables",
  "variant": "face in dark-1280 and light-390; theme and pair in light-390",
  "seconds": 91.24,
  "what_it_does": "For every row, the harness builds a full page through its `build` callback, then clicks the header buttons and waits for the pressed state. Rows per table: face 9, theme 4, and pair 6. Times: face 29.39 s (dark-1280) and 25.89 s (light-390), pair 25.66 s, and theme 10.30 s.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:95, 111, 117, 169 (row totals); journey-4.json:1 testResults[1], [2]; tests/app/browser/integration.test.ts:1699-1775; tests/setupBrowser.ts:5339-5345 (JOURNEY_PLACEMENTS)"
 },
 {
  "case": "showcase journeys > J3 browses every section through the contents",
  "variant": "all four",
  "seconds": 116.17,
  "what_it_does": "Costs 28.42 to 30.46 s per variant. For each of the 72 sections it clicks a contents link, waits up to 5,000 ms for the landing, waits for 4 equal scroll frames, checks the scroller hints, and places the portfolio state. Every project must run this case, because the portfolio case asserts that `placed` equals every state.",
  "evidence": "journey-4.json:1 testResults[0..3]; tests/app/browser/integration.test.ts:324-391, 1855; tests/setupBrowser.ts:2955-2969"
 },
 {
  "case": "showcase refusals > reaches every control, frozen specimens, and disabled engine routes",
  "variant": "dark-1280 and light-390",
  "seconds": 88.73,
  "what_it_does": "dark-1280 totals 88.73 s: reach 35.46, frozen 35.16, and disabled routes 18.11. light-390 totals 64.71 s: 27.04, 24.45, and 13.22. The reach case presses Tab once per tab stop and runs a scroll, a frame, and a hit test per control. The frozen case clicks each frozen control, presses Enter and Escape, and waits for paint after each. The disabled-routes case builds 9 pages and waits a fixed transition window per activation.",
  "evidence": "journey-4.json:1 testResults[1], [2]; tests/app/browser/integration.test.ts:686-857; tests/setupBrowser.ts:2748, 2843-2870, 3052"
 },
 {
  "case": "showcase journeys > J4 compares the three faces through the Stylesheets buttons",
  "variant": "all four",
  "seconds": 12.8,
  "what_it_does": "Costs 12.22 to 12.80 s per variant in the 761.76 s run, against 10.60 s run alone. In the 872.76 s run, the dark-1280 J4 exhausted Vitest's default 15 s budget. Its case budget became 60 s with no assertion changed.",
  "evidence": "tmp/units/tokens-t3/journey-5b.log:13, 15, 17, 19; tmp/units/tokens-t3/j4-5-isolated.log:9; tmp/units/tokens-t3/journey-5.err:13-14; tmp/units/tokens-t3/report-4.md:238-240; tests/app/browser/integration.test.ts:438"
 },
 {
  "case": "showcase journeys > J7, J8, J2, J1, and J6",
  "variant": "J7 and J8 in dark-1280 and light-390; J1, J2, and J6 in all four",
  "seconds": 26.41,
  "what_it_does": "J7 and J8 together cost 26.41 s in dark-1280 and 24.17 s in light-390. J2 costs 5.18 to 9.01 s, with 2 page builds and a Tab walk. J1 costs 2.07 to 3.41 s and J6 2.46 to 3.16 s. One page build costs about 1 s under contention.",
  "evidence": "journey-4.json:1 testResults[0..3]; tests/app/browser/integration.test.ts:206-683"
 },
 {
  "case": "showcase portfolio > writes no capture, and places every registered state",
  "variant": "all four",
  "seconds": 2.26,
  "what_it_does": "Costs 0.83 to 1.32 s per case, with 1 page build each, so this cost is negligible. Its constraint matters more than its cost. It writes the variant's journey file and asserts that `placed` equals all 76 states and `proven` equals every family. Every project must therefore keep J1, J3, and J4, plus at least one Journey, Refusal, Matrix, and Statechart case.",
  "evidence": "journey-4.json:1 testResults[0..3] (0.90 + 1.32, 1.10 + 1.16, 1.02 + 0.83, 0.94 + 1.26 s); tests/app/browser/integration.test.ts:137-159, 1838-1889; /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-report.md:112 (304 captures = 76 states x 4 variants)"
 }
]

## Structure

The journey run has four Vitest browser projects, one per variant. The `appJourney` factory builds each project (`/home/user/veneer/vite.config.ts:398-424`) from the four `VARIANTS` entries (`configs/app/vite.journey.config.ts:10-15`): light-1280 and dark-1280 at 1280x800, and light-390 and dark-390 at 390x844. Each project:

- includes the single file `tests/app/browser/integration.test.ts` (vite.config.ts:410).
- sets its own viewport (vite.config.ts:416).
- inherits from `appBrowser` one headless Chromium instance through the Playwright provider (vite.config.ts:324-325, 417-419).
- inherits `fileParallelism: false` (vite.config.ts:327).

The journey config sets `sequence.groupOrder` to `Math.floor(index / 4) + 1` (`configs/app/vite.journey.config.ts:45`). All four projects therefore share group 1 and run at once, and a fifth project would fall into group 2 and start only after the first four end.

No `pool`, `isolate`, `maxWorkers`, or `testTimeout` is set for these projects (vite.config.ts:298-332, 398-424), so Vitest's browser defaults apply. With one file per project, isolation adds no per-file cost. The default case budget is 15 s, which J4 exhausted in the 872.76 s run (`tmp/units/tokens-t3/journey-5.err:14`). Cases set their own budgets: 60 s for J4 and 120 to 300 s for the heavy cases (integration.test.ts:322, 391, 438, 1000, 1121, 1438, 1694, 1774). Component tables get 10,000 ms plus 2,500 ms times the largest row count (integration.test.ts:1834).

The file declares no concurrent case, so each project runs its cases in series: 22, 28, 24, and 22 registered cases (`journey-4.json:1`). The npm script runs `--no-cache --reporter=dot` (`package.json:101`). That reporter prints no per-case duration, so the T3 runs time only the ten bodies the file logs.

Cases in one project share module state: `proven`, `placed`, `rows`, the journal (integration.test.ts:165-168), and the mounted showcase (`tests/setupBrowser.ts:1134-1141`). The portfolio case asserts `placed` and `proven` (integration.test.ts:1855, 1884). Concurrency inside a project is therefore unavailable: every case drives the single document and feeds those sets. Parallelism exists only across projects.

**Critical path.** The wall ends when the slowest project ends. In the 591.13 s run, light-1280 ends at 591.12 s, while dark-1280, light-390, and dark-390 end at 476.86, 465.02, and 396.97 s (`journey-4.json:1`, `startTime` and `endTime`). The four-way mean of the 1871.42 s summed test time is 467.86 s (`journey-4.log:169`). Light-1280 alone runs preservation and partition, and each reads both widths in series (integration.test.ts:1123, 1129, 1441, 1446). It also carries 305.23 s of component tables. In the 761.76 s run, light-1280's four logged bodies alone sum to 318.05 s (journey-5b.log:17, 59, 139, 195). That run's summed test time is 2231.49 s (journey-5b.log:201), a four-way mean of 557.87 s, so imbalance and start offsets account for about 204 s of its wall.

**Contention.** The host has 4 CPUs (`nproc`) and runs four Chromium instances beside the Vite server. Comparing a case run alone with the same case in the full run:

- Paired engine reads 59.90 s alone and 85.83 s in the full run (`tmp/units/tokens-t3/paired-5.log:19`; journey-5b.log:59).
- Preservation reads 98.82 s alone and 135.43 s in the full run (`preservation-5b.log:29`; journey-5b.log:139).
- J4 reads 10.60 s alone and 12.22 to 12.80 s in the full run (`j4-5-isolated.log:9`; journey-5b.log:13-19).

With four projects, J0c measured a memory peak of 12,288,905,216 bytes against a 14,345,035,776-byte cap (`j0c-report.md:117`). Its phase 1 also showed that removing idle waits barely moves the wall on this host (`j0c-scope.md:32`).

**Parallelism levers.** None of these changes the host-bound set. Ruled on each:

1. Split preservation and partition into one case per width, and place each 390 half in the project with the most measured slack (dark-390 ended 194.15 s early in the 591.13 s run). Pass the light-1280 variant object with width 390, as the cases already do (`{ ...OWN, width }`, integration.test.ts:1131, 1447). The reading then stays light at 390x800. This moves the 33.00 s scan, its controls, and half the partition off light-1280, and every assertion and control stays. The per-width rows then land in the host project's journey file. Take it.
2. Rebalance the component tables across projects from measured durations, as J0c item 21 did (`j0c-report.md:59`). Take it.
3. Measure first. Before the design, run one full baseline with the JSON reporter added to the dot reporter. In the T3 runs, 80 of the 90 cases that ran have no per-case reading, and 234.95 s of summed growth is unattributed. Take it.
4. Add a fifth concurrent project. Refuse it: the group bound puts it in group 2, the host has 4 CPUs, and J0c's memory peak leaves little headroom.
5. Run cases concurrently inside a project. Refuse it: the cases share one document and the portfolio state.

## Prior unit

J0c is the journey cost unit. It ran 2026-10-02 to 2026-10-03, and its veneer commits are `4070c56`, `0af6193`, `04af924`, `a808e49`, and `39fd514` (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-report.md:123-129`).

**Target.** The brief set the `npm run test:journey` wall at or under 235 s, with every claim still proved in every variant its result depends on (`j0c-brief.md:1, 9`). It modeled the result at 222 to 225 s (`j0c-brief.md:11`).

The owner's 2026-10-02 ruling, carried in the scope note, narrowed the work. It allowed only substantive cuts: repeated readings, waits a claim does not need, and redundant rows. The scope note set the target near 250 s, down from 355 s, required green in two consecutive full runs, and said not to chase seconds (`j0c-scope.md:3, 34-36`). The unit kept items 6, 9, 10, 18, 21, and 23. It dropped items 7, 8, 12 to 17, 19, and 22, because phase 1 showed that removing idle waits barely moves the wall on the 4-core host, where the gate is bound by the work it repeats (`j0c-scope.md:18-32`).

**What it changed:**

- J3 runs at reduced motion, keeps one default-motion landing per variant, and looks up its headings and regions one time (`j0c-brief.md:107-116`).
- Each claim declares its `motion` argument through the published media stage.
- Component statechart waits share one 5,000 ms budget. Three phase-1 failures had come from a 774.5 ms settle against the 1,000 ms default under four-project load (`j0c-scope.md:11-13`).
- Harness failures carry each row's name and cause.
- The face header table runs in light-390 and dark-1280, and the theme and pair tables run in light-390 only.
- J7, J8, and the frozen refusal run in dark-1280 and light-390, with J8 at default motion in light-390.
- The navbar and drawer keep their availability rows only at 1280, plus one unchanged row each.
- One rebalance move: the toast table went from light-390 to dark-390 (`j0c-report.md:59, 81`).

**What it measured.** With the JSON reporter, the gate fell from 352.91 s at `f53c656` (66 passed) to 226.77 s and 217.89 s (60 passed, 0 skipped) (`j0c-report.md:1, 7, 12-13`). Summed per test (`j0c-report.md:19-28`):

| Test | Before | After (two final runs) |
|---|---:|---:|
| J3 | 275.55 s | 84.09 s, 86.89 s |
| Header tables | 166.48 s | 48.35 s, 43.63 s |
| J7 | 70.19 s | 22.90 s, 21.68 s |
| J8 | 76.44 s | 22.81 s, 23.43 s |

For every kept change, the observed saving exceeded the prediction (`j0c-report.md:51-57`). J6 served as the CPU-contention proxy (`j0c-report.md:83-93`). Fifteen mutation controls each read red, then green after restore (`j0c-report.md:63-79`). The 304 captures held with none missing or extra (`j0c-report.md:112`), and memory peaked at 12,288,905,216 bytes against the 14,345,035,776-byte cap (`j0c-report.md:117`). An earlier J0c continuation stopped blocked: it could not reproduce the phase-1 failures in two 66-of-66 runs (`j0c2-report.md:1-3`).

**After J0c.** The suite grew from 60 to 96 cases with the three faces, the paired engine states, the readings, the partition, and the preservation gate. Wall times since then:

- 446 to 480 s before the preservation gate, and 591 s with it (`lanes.md:126`).
- 495 s in T2, with 18 failures (`lanes.md:71`).
- 872.76 s and 761.76 s in T3 (`tmp/units/tokens-t3/journey-5.log:185`; `journey-5b.log:201`).
