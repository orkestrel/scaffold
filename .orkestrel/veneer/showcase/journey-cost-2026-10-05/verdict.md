# Journey run cost: the design verdict (2026-10-05)

This verdict was written on 2026-10-05 in the objective lane. It rules on plan v3 (`plan-v3.md`) after the GPT-6 Astra objective check (`plan-v3-astra-check.md`). Every ruling here is the Orchestrator's, and the user can reverse any of them. Paths follow these conventions:

- Plan-folder files are relative to `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/`.
- Veneer paths are relative to `/home/user/veneer` at the start commit `4d21de7`, which is veneer `main` after the token landing (`lanes.md:65`).
- `lanes.md` is `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`.
- Scaffold paths are relative to `/home/user/scaffold`.
- Run A is `tmp/units/tokens-t3/journey-6.log` (858.59 s, line 205). Run B is `tmp/units/tokens-t3/review/landing-prev/test_journey.log` (817.88 s, line 205).

## 1. Ruling

The Orchestrator adopts plan v3 for the journey run-cost tuning unit, together with every correction the Astra check lists, under the user's constraint that the unit loses no proof. It adopts layer 1 (items 0, 11, 1a, 1b, 3, 2, 4 to 7, 9, and 10) in the order plan v3 gives (`plan-v3.md:20`). Each optimization lands only after its probe reads equality and a measured gain, and item 9 lands on its state-cleanup rationale. It adopts layer 2 (item 12) only after the user answers Q1 yes, and it keeps item 13 outside that question. It rules that acceptance is two tests against J-B0: (1) no proof regresses, and (2) the wall falls by at least a requirement frozen in `lanes.md` before the acceptance runs, where the fall is the faster J-B0 wall minus the slower acceptance wall; no modeled figure enters acceptance. It rules Q2 itself: for the unit's duration, every command on this host that launches Chromium or loads the CPU runs through one exclusive serial queue, and the stage B readings and the D-4 run wait.

## 2. Constraint

The Orchestrator rules that the unit loses no proof. Every assertion, control, reading, and logged line stays, in content and in multiplicity, and so does the host-bound set. The `390 header` line (`tests/app/browser/integration.test.ts:256-264`, with its journal record at 251-255) is included. Host-bound failures compare by row and cause, not by title count alone. The following table names the gate that enforces each part of the constraint:

| Proof | Gate | Where it runs |
|---|---|---|
| Every `expect` and `assert` call, and every control | Per-lane Opus review with refuters. It maps each assertion and control in the J-B0 tree to its counterpart in the candidate, and refuses a merge that leaves any of them unmatched. The final falsify round repeats the mapping on the integrated tree. | Before each lane's merge, and before acceptance |
| Controls still bite | The mutation copy: each of the four targets (`tmp/units/tokens-t3/mutations-6.ts:6-9`) occurs exactly once, reads red, then reads green after the restore. Each index control reads red, then green (`plan-v3.md:615-620`). | Each lane gate |
| Readings | Rows gate: the multiset of `## Resolved values` rows across the four artifacts equals J-B0's after the reading-variant prefix is removed. Rows that no move touched keep J-B0's order (`plan-v3.md:623, 644`). | Each lane gate's full run, the checkpoint, the trial, and acceptance |
| Logged lines | Line gate: for each line name and reading variant, the multiset of lines equals J-B0's after `seconds`, `milliseconds`, and `host` are removed. The gated names are the list at `plan-v3.md:622` plus `390 header`. The artifact's Journal entries are compared as a multiset after removing the timing entries that `plan-v3.md:340` counts; lane M lists those entries from J-B0. | As for the rows gate |
| Registration | 92 cases are registered and 0 are skipped after item 11, against 96 and 6 before it (`journey-6.log:203`; `plan-v3.md:108`). | Lane 0's gate onward |
| Host-bound set | Every failing title is in § Host-bound set (`lanes.md:58`). Each host-bound title fails in no more acceptance runs than J-B0 runs. Each failing (title, row, cause) in a candidate run, read from the `Showcase statechart failed` dumps (`tests/app/browser/integration.test.ts:1745-1746, 1815-1816`) and from Vitest's failure message for a title that is not a table, must also fail in at least one J-B0 run with the same cause. | Each lane gate, the checkpoint, the trial, and acceptance |

## 3. Adopted changes

The verdict adopts the following items, in landing order. A measured gain is defined as follows:

- Before its price run, the lane states the gain that makes the item worth keeping (`.claude/rules/quality.md:53`).
- In a price window with every lane paused, the item's changed cases run twice without the item and twice with it.
- The gain is the faster reading without the item minus the slower reading with it. The item lands when that gain meets the figure the lane stated.

Items that overlap are credited as one bundle on the wall. Per-item attribution is optional.

| Item | Lane | Files (at `4d21de7`) | What it keeps | Measured-gain condition |
|---|---|---|---|---|
| 0, measurement through the queue | M | None in the repository. `tmp/units/journey-cost/` (git ignores it, `.gitignore:11`) holds `run.ts`, `measure.ts`, and `mutations.ts`. | The `test:journey` script (`package.json:101`). Every price run uses the J0c command form with `--reporter=dot --reporter=json` (`plan-v3.md:82`). | None. This item is the instrument. |
| 11, one case per width, all four halves in light-1280 | 0 | `tests/app/browser/integration.test.ts:1122-1439, 1440-1695`; `JOURNEY_PLACEMENTS` (`tests/setupBrowser.ts:5339-5346`); the guide titles (`guides/veneer.md:2140, 2174-2175`) and § Variant placement (2578) | Every assertion, control, line, and row runs per width at light theme and WIDTH×800. Each preservation half keeps its own `failures` list, and each partition half keeps its direct `expect` calls. The 300 s budget stays. `variant` names the reading variant, a separate `host` field names the project, and rows carry the reading-variant prefix (`plan-v3.md:97-101`). | None. The split changes no work (credited 0 s, `plan-v3.md:102`). |
| 1a, one owner for the selector-major match | 0 | A helper beside `collectComponentSignatures` (`tests/setupBrowser.ts:1867`), with its proof beside `tests/setupBrowser.test.ts:1088` | The `element.matches` predicate that all three scans use (`tests/setupBrowser.ts:1906, 1994, 2164, 2169`). The helper refuses an invalid selector the same way `element.matches` does. Items 1b, 2, and 3 build no match of their own. | None for the `element.matches` form. A caller takes the `querySelectorAll` form only where P-B or P-D reads deep equality at both widths and a measured gain. |
| 1b, one matched-rule index per preservation half | 1 | `collectComponentPreservation` (`tests/setupBrowser.ts:1938-2058`); `AttributionOptions` (`tests/setupStyles.ts:815-824`); call sites `tests/app/browser/integration.test.ts:1215, 1273, 1282` | The same entries in the same order for each representative and sheet. The index travels in its own field and never in the shared `options` object. The sheet-rewrite controls (1321, 1355, 1407) keep their own scan. The function refuses an index built for other sheets. All four mutation targets stay unique (`plan-v3.md:131-144`). | P-B equality, then a measured gain on the preservation halves, credited together with item 3 |
| 3, signature membership through item 1a | 1 | The `collectComponentSignatures` loop (`tests/setupBrowser.ts:1902-1909`) | The groups, keys, and order, and the logged `signatures` and `excluded` counts | P-D equality and a measured gain in the preservation bundle. The `element.matches` form alone makes the same number of calls (`plan-v3.md:163`), so it does not land on its own. |
| 2, the partition memo | 2 | `collectPartition` (`tests/setupBrowser.ts:2140-2325`); `PartitionOptions` (222-231); `collectSelectorClasses` (`tests/setup.ts:1596`); call sites `tests/app/browser/integration.test.ts:1549, 1553, 1633`, plus 1611 and 1674 after P-C | Three caches, as v3 orders them (`plan-v3.md:175-187`): the whole matched map, keyed by the element and the identities of `options.rules` and `values.bootstrap`; the selector classes, memoized by selector text, with a text that throws left uncached; and the face declarations, built one time per subject and face. The inverse partition stays at 1633. The memo refuses a foreign rules map. The partition mutation target (2294) stays outside the memo. | P-C equality decides which calls take the memo. Then a measured gain on the partition halves. |
| 4, one `resolveSpecimen` call per title per reading set | 3 | `readTailwind` (`tests/setupBrowser.ts:1436-1442`) and a set reader beside it; call sites `tests/app/browser/integration.test.ts:400, 415, 1030` | The engine's exact-name query and both of its refusals (`tests/setupBrowser.ts:1383-1391`). The per-reading refusal (1437-1440). The `readTailwind` export keeps its behavior, because `tests/app/browser/Showcase.test.ts:34` imports it. | P-E equality, then a measured gain on J4 and the matrix reads |
| 5, scoped scrollspy polls | 3 | `tests/setupBrowser.ts:5124-5254` | The whole-document refusal of duplicate navigation at every poll: every link of every navigation that matches the name, refused when more than one is active (5125-5130). The closing whole-document read, the keyboard path, and the activation-event and keyboard-scroll checks (5244-5249) also stay. | Lands only if it keeps that refusal at every poll, a transient duplicate-navigation control reads red, and P-F shows a measured gain on the scrollspy pairs |
| 6, linear reference and class checks | 3 | `tests/setupBrowser.ts:2873-2905` | The same findings in the same order. An id that occurs three times still yields two `duplicate:` findings. The registry-name cache stays behind the dynamic `import('@app/browser')` call (2902). | P-G equality, then a measured gain (an algorithmic repair, `.claude/rules/quality.md:52`) |
| 7, live collection for the Tab-walk bound | 3 | `tests/setupBrowser.ts:2847` | The bound equals the length of `document.querySelectorAll('*')` at each evaluation | A measured gain on the reach case in dark-1280 (P-K). The zero-credit exemption is refused. |
| 9, disable the DOM and CSS domains after the specificity reading | 3 | `readSpecificities` (`tests/setupStyles.ts:277-323`) | Every reading completes before cleanup. Cleanup covers partial setup: any throw after the `DOM.enable` call at 283, including a throw before the `try` at 291, still disables both domains. After a reset failure at 321, both `CSS.disable` and `DOM.disable` are still attempted. When the body throws, the body's error propagates. When only cleanup throws, the first cleanup error propagates after both disables have been attempted. The refusal at `tests/setupStyles.test.ts:239` keeps its message. | No gain is required, because the item lands on its state-cleanup rationale. P-H must read equality. |
| 10, cached longhand names per window and pseudo-element | 3 | `tests/setupStyles.ts:1455-1464` | The keys, order, and values for HTML, SVG, and iframe elements and for the 8 pseudo-elements `readSurface` reads (`plan-v3.md:287`). `isExposed` gives the same answers. | P-I equality, then a measured gain. A differing enumeration drops the item. The zero-credit exemption is refused. |
| 12, placement by measured slack (layer 2) | 4 | `JOURNEY_PLACEMENTS` and its comment; `guides/veneer.md` § Variant placement (2578) | Every case, assertion, control, and reading. Only the host project changes. No host-bound title moves. Each moved piece runs green at its destination and reads red under one mutation there, then green after the restore. | Q1 yes. Item 9 must have landed with P-H green before light-390 or dark-390 is a destination. The placement trial must hold § 2 and the memory rule. The gain is credited only through acceptance test (2). |

The placement search orders its results by the smallest largest end, then the fewest moves, then destination preference, and dark-1280 wins a tie because it holds no host-bound title. The checkpoint's spans and anonymous peaks are its inputs. The contention inflation of 1.15 to 1.67 (`plan-v3.md:299`) and the tail allowance are labeled as estimates.

At the checkpoint, the Orchestrator rules that a bundle whose changed cases read no gain is investigated and reverted before lane 4 starts. The gain here is J-B0's faster duration of those cases minus the checkpoint's slower duration. Items 7 and 10 have no exemption from this rule, and item 9 is exempt on its state rationale.

## 4. Refused and deferred changes

The verdict refuses or defers the following options:

- **Item 8 (text membership on the representatives only): refused.** It drops the `innerText` and visibility reads on the other elements (`tests/app/browser/integration.test.ts:1182-1192`), which loses proof.
- **Item 13 (split the paired case per family): deferred.** It stays outside Q1 unless a concrete change goes to the user (`plan-v3-astra-check.md:180`).
- **A scoped scrollspy poll backed by a proof that the navigation population is stable (`plan-v3-astra-check.md:27`, alternative form): refused.** The ruling requires the whole-document refusal at every poll. A source-derived counterexample shows that a transient second navigation escapes a scoped poll (`plan-v3-astra-check.md:21`).
- **A scoped scrollspy read through `querySelectorAll`, or one without the two-active throw: refused** (`plan-v3.md:335`).
- **The automatic zero-saving exemptions for items 7 and 10 (`plan-v3.md:52`): refused.** `.claude/rules/quality.md:51` reads: "Refuse a micro optimization (hoisting a small array, caching one cheap read, shaving a constant) unless its own measurement shows a gain worth having."
- **The measured floor of `plan-v3.md:453, 632, 647`: refused.** It sums per-item case improvements that overlap (items 1b and 3 on preservation, and item 10 on both cases), and it adds layer 2's modeled floor while calling the sum measured (`plan-v3-astra-check.md:157-159`).
- **The imbalance clause of `plan-v3.md:648` as an acceptance condition: refused.** It compares the run with a placement prediction. It is recorded beside the result instead.
- **Percentage targets as acceptance (`plan-v3.md:447-451`): refused.** They are recorded against the result.
- **Rerunning an unchanged candidate until acceptance passes: refused** (`plan-v3-astra-check.md:182`). A regressing placement is investigated and changed before acceptance repeats.
- **Counting P-F's queries by replacing `page.getByRole` or `page.elementLocator`: refused.** `.claude/rules/tests.md:29` reads: "Never use mocks, behavioral fakes, module replacement, or framework spies for project-owned or integrated behavior." P-F counts with a `createRecorder` recorder (`.claude/rules/tests.md:207`) called at the harness's own query sites, in an uncommitted copy.
- **A bash window script or bash lock lines: refused.** `AGENTS.md:47` reads: "Never write a bash, PowerShell, or Python script." The unit's runner, sampler, and mutation driver are Node scripts.
- **The unlocked `gates.sh` during the unit: refused.** It takes no lock and redirects output with `>` (`tmp/units/flip-gates-2/gates.sh:7, 10-12`).
- **The cgroup `memory.usage_in_bytes` sampler: refused.** It counts page cache (`plan-v3.md:370-373`).
- **Hard-linked `node_modules`, or a worktree nested inside `/home/user/veneer`: refused** (`plan-v3.md:374-376`).
- **Lanes writing during a price window: refused** (`plan-v3.md:369`).
- **The turnstile with shared and exclusive locks: not taken** (`plan-v3.md:366`).
- **The blanket closure claim at `plan-v3.md:708`: refused.** Section 12 and the Astra table (`plan-v3-astra-check.md:188-227`) replace it.
- **The other refusals at `plan-v3.md:333-376` stand as plan v3 rules them.** These are the `readName` set reader, the inverse move, the script edit, the byte-equal rows file, proposal 1 change 9, both widths in one page build, event waits, cheaper `readPerception`, header-row reuse, the J3 click, proposal 3 changes 4 and 5, and runtime refusals 1 to 10.

## 5. Acceptance

The Orchestrator rules that acceptance holds when both of the following tests pass. No positive measured floor exists before the unit: no candidate run on record measures any of the optimizations (`plan-v3-astra-check.md:155`). Zero seconds is the non-regression bound, not evidence of a gain.

- **Test 1, non-regression against J-B0.** Every gate in § 2 holds in both acceptance runs. Through the queue, every script of `plan-v3.md:649-654` must exit 0 or fail only titles in § Host-bound set. `test:journey:vue` is one of those scripts, and its duration is unpriced.
- **Test 2, wall-time reduction.** R is the requirement frozen in `lanes.md`. Test 2 holds when the faster J-B0 wall minus the slower acceptance wall is at least R. J-B0 and acceptance each consist of two consecutive full runs alone, with every lane paused.

The requirement is frozen as follows:

- After the falsify round and before the first acceptance run, lane M writes R in seconds into `lanes.md` § Log.
- The entry names the observed candidate readings R rests on: the checkpoint pair, plus the placement trial when layer 2 lands.
- R must be greater than 0 s.
- No modeled figure, percentage target, or placement prediction enters R.
- After it is written, R does not move.

A run counts toward either test only when all of the following hold:

- It resolves the Chromium executable that J-B0 recorded (141.0.7390.37 on the T3 tree, `tmp/units/tokens-t3/chromium.txt:1`).
- Its CPU reading outside the run's process tree lies inside J-B0's band, widened by the band's own width.
- `oom_kill` is unchanged.
- The anonymous peak plus the largest single-renderer peak stays at or under the live cgroup limit.

A red in a run that fails these conditions reruns in a price window.

Evidence is collected by command type:

- **Full journey run:** the JSON report, the four `tmp/journey/*.txt` artifacts with mtimes newer than the run's start, the sampler readings, and the stdout and stderr logs, all copied into the run's own folder with a SHA-256 manifest before the queue is released.
- **Any other command:** its stdout and stderr logs and its exit code, in `tmp/units/journey-cost/gates/COMMIT/`. Such commands produce no journey artifact.

## 6. Host discipline

The Orchestrator rules the following for this host for the whole unit:

- **One exclusive serial queue.** Every command that launches Chromium or loads the CPU (build, check, lint, format, install, and every Vitest suite) runs as `flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts …`. That is util-linux `flock` in exclusive mode. The runner spawns its child commands bare and never nests `flock`. Lane M adds the rule to `lanes.md` § Rules before P0.
- **Nothing outside the queue (Q2, ruled by the Orchestrator).** The host runs no command outside the queue during the unit. The stage B readings on this host (the Chromium floor check, `lanes.md:136`), the D-4 Linux run (`lanes.md:81, 121`), and every other veneer worktree's gates wait. Read-only work and file edits between windows continue.
- **Price windows.** Every lane pauses during each price window, J-B0 included. The window holds the queue across all of its runs and their copies.
- **Evidence.** Before any command runs, lane M copies into `tmp/units/journey-cost/evidence/`, with a SHA-256 manifest, every file `plan-v3.md:557-564` lists, together with `tmp/units/flip-gates-2/` as it stands, `gates-4d21de7.txt` included. The landing gate run at `4d21de7` already truncated `tmp/units/flip-gates-2/test:journey.log` (`plan-v3.md:10`). The design folder (`plan-v3.md:8`) is session-scoped. Every run writes into its own run folder, and the runner refuses to reuse one.
- **Worktrees.** Six worktrees (M, 0, 1, 2, 3, and 4) sit under `/home/user/.wave/journey-cost/`. Each gets a copy of the main checkout's `node_modules` made with `cp -a` after `cmp` shows the lockfiles equal; otherwise it runs `npm ci` through the queue. No `node_modules` may exist in `/home/user/.wave` or `/home/user`. Each worktree is built through the queue, and all six exist before J-B0.
- **Memory.** The sampler reads `total_rss + total_shmem` from `memory.stat`, each renderer's RSS grouped by browser root, `oom_kill` before and after, and the live `memory.limit_in_bytes`. It never reads the cgroup usage figure.
- **Duration, as an estimate rather than a bound.** It is about 20,385.3 s (5 h 40 min) of queue time, of which about 8,596.4 s (2 h 23 min) are price windows. Plan v3 itemizes those sums (`plan-v3.md:516-532`), and the Astra check recomputed them (`plan-v3-astra-check.md:114`). The longest window is about 1,717.2 s (`plan-v3.md:532`). The figures come from contended runs, and J-B0 replaces them with readings taken alone. The following work is not priced:
  - `test:journey:vue`;
  - worktree preparation: six copies, six builds, and any `npm ci`;
  - correction runs and re-gates after review fixes;
  - the falsify round's runs;
  - P-K;
  - `test:app:browser` in lane 3's gate (157 s at `tmp/units/flip-gates-2/gates-4d21de7.txt:22`);
  - layer 2 if Q1 is no.

## 7. Probes

Every probe runs inside the lane that writes the code it needs, and every probe command goes through the queue. A probe's queue part reads equality and runs while the other lanes edit. Its price part reads time and runs in a price window. The following table gives each probe's lane, window, and decision:

| Probe | Lane | Window | Decides |
|---|---|---|---|
| J-B0 | M | P0, price | Every baseline: walls, spans, per-case durations, anonymous peaks, the outside-CPU band, and failures by title, row, and cause. Its two runs must agree byte for byte on `## Resolved values`, or the unit stops. |
| P-A | 0 | P1, price | The scan and reuse shares behind items 1b and 2. Item 1b's conditions (e) and (f) (`plan-v3.md:143-144`). |
| P-B | 1 | Queue, then P2 | Item 1a's form for items 1b and 2, by deep equality at both widths, then price |
| P-D | 1 | Queue, then P2 | Item 3: groups deep-equal (including a selector text shared by rules under different conditions), then price |
| P-C | 2 | Queue, then P2 | Which calls take item 2's memo (1553, 1611, 1633, 1674), and its price with and without each of the three caches |
| P-E | 3 | Queue, then P1 | Item 4: the same element per title under each face, the same refusals and messages for zero, two, and non-`HTMLElement` figures and for generated content, then price |
| P-F | 3 | Queue; the price comes from lane 3's scrollspy price runs | Item 5. It counts the removed and the retained queries per row across every wait. The waits include the arrange, act, and assertion waits (`tests/setupBrowser.ts:5172, 5218, 5237`) and the closing reads of `scrollComponentTo` (5158, 5164). It runs the two-active fixture and the transient duplicate-navigation control. Its credit replaces the modeled 4.0 to 11.0 s (`plan-v3.md:226`). |
| P-G | 3 | Queue, then P1 | Item 6: findings deep-equal at one guarded row, then price |
| P-H | 3 | Queue, then P1 | Item 9: specificity readings deep-equal, `document.styleSheets` and the head unchanged, a partial-setup control and a reset-failure control each leaving both domains disabled, and the enable round trips priced. Its result also decides item 12's light-390 and dark-390 destinations. |
| P-I | 3 | Queue, then P1 | Item 10: keys, order, and values equal over the 1,670 partition subjects (`plan-v3.md:496`), the HTML, SVG, and iframe elements, and the 8 pseudo-elements, with at least two elements per pseudo-element, then price |
| P-K | 3 | P1, price | Item 7: the reach case in dark-1280, scoped, twice without and twice with the item |
| Checkpoint | M | P3, price | The bundle gains of layer 1, and the spans and peaks that feed the placement |
| P-J | 4 | P4 and P5, price | Each moved piece at its destination, and then the placement trial under § 2 and the memory rule |
| Acceptance | M | P6, price | Tests 1 and 2 of § 5 |

## 8. Lanes and order

The Orchestrator rules the following lanes. Implementation lanes run on Astra (the `astra` route), each in its own copied worktree. Each writing lane takes an Opus review with refuters before it merges. The lanes are the following:

| Lane | Role and engine | Items | Owned files | Depends on | Done when |
|---|---|---|---|---|---|
| M | Measurement and evidence. The Orchestrator runs it, and Astra writes the unit tools, which take one Opus review before J-B0. | 0 | `tmp/units/journey-cost/**`; the lock rule and the records in `lanes.md` | Nothing | The evidence manifest matches its sources; the worktrees are built; the precondition gates pass; and J-B0, the checkpoint, acceptance, and the record are complete |
| 0 | Writer, Astra | 11, 1a | `tests/app/browser/integration.test.ts:1122-1695`; `JOURNEY_PLACEMENTS`; the guide titles and § Variant placement; item 1a's helper and proof | J-B0 | Gate: `test:setup:browser`, the mutation copy, one full run under § 2, and 92 cases registered with 0 skipped |
| 1 | Writer, Astra | 1b, 3 | `collectComponentPreservation`; the `collectComponentSignatures` loop; `AttributionOptions`; call sites 1215, 1273, and 1282 | Lane 0 merged | Gate: as lane 0, plus item 1b's index control red then green, and its W8 price runs |
| 2 | Writer, Astra | 2 | `collectPartition`; `PartitionOptions`; `collectSelectorClasses`; call sites 1549, 1553, 1611, 1633, and 1674 | Lane 0 merged | Gate: as lane 0, plus item 2's memo control red then green, and its W8 price runs |
| 3 | Writer, Astra | 4, 5, 6, 7, 9, 10 | `readTailwind` and the set reader; call sites 400, 415, and 1030; `tests/setupBrowser.ts:2847, 2873-2905, 5124-5254`; `tests/setupStyles.ts:277-323, 1455-1464` | J-B0 | Gate: five suites (`test:setup:browser`, `test:src:tailwindcss`, `test:integration`, `test:src:browser`, and `test:app:browser`), the mutation copy, the controls for items 4 and 5, one full run under § 2, and the W8 price runs. The plan's 737 s estimate prices the same five suites (`plan-v3.md:526`; `tmp/units/flip-gates-2/gates-4333d76.txt:14, 22, 24, 26, 28`). `test:app:browser` is added to step 8's four suites because `tests/app/browser/Showcase.test.ts:26-36` imports `readTailwind`. |
| 4 | Writer, Astra | 12 | `JOURNEY_PLACEMENTS` and its comment; § Variant placement | Q1 answered yes; checkpoint | P-J passes, and `test:setup:browser` passes with the trial as its full run |

The verdict adopts per-lane full runs, so that a difference in rows or lines names its lane without a bisect. The cost of that choice is about two historical full runs, not a fixed 1,717.18 s (`plan-v3-astra-check.md:184`).

The unit runs in the following order:

1. Lane M prepares the unit, through the queue. It copies the evidence, logs the lock rule, writes the tools, creates and builds the worktrees from `4d21de7`, and runs the precondition gates (every suite except `test:journey`). Every failure in those gates must be in § Host-bound set.
2. P0: J-B0 runs alone, before any lane writes.
3. Lanes 0 and 3 write. Lane 3 runs the queue parts of P-E, P-F, P-G, P-H, P-I, and P-K.
4. P1: P-A twice, and lane 3's price parts.
5. Lane 0 takes its Opus review with refuters, then its gate, then merges into worktree M. Lanes 1 and 2 rebase onto it.
6. Lanes 1 and 2 write and run the queue parts of P-B, P-C, and P-D.
7. P2: lanes 1 and 2 run their price parts.
8. Lanes 1, 2, and 3 each take an Opus review with refuters, a gate, and W8 price runs, then merge in that order. Lane 3 can merge any time after lane 0.
9. P3: two checkpoint runs on the merged tree.
10. If Q1 is answered yes, lane 4 computes the placement, runs P4 and the mutations, runs the P5 trial, takes its review, and runs its gate.
11. One `orkestrel-falsify` round on the integrated candidate, by Opus, which wrote none of the code (`.agents/orchestration.md:72`). Each fix is re-gated by its lane. Lane M then freezes R.
12. P6: acceptance, two consecutive runs alone.
13. The landing gates run through the queue on the accepted commit, and the commit lands on veneer `main`.
14. Lane M records J-B0, the checkpoint, the trial, the acceptance runs, the placement, the peaks, the failures by row and cause, and the `readPerception` cost (`plan-v3.md:656-658`) in `lanes.md`.

## 9. Question for the user

**Q1.** Two parts of the journey run in fixed projects today:

- The preservation and partition cases run in light-1280 under a recorded ruling (`tests/app/browser/integration.test.ts:1122, 1440`; `guides/veneer.md:2140, 2175`).
- The theme header table runs in light-390 (`tests/setupBrowser.ts:5343`).

Item 11 splits the two cases into four per-width halves, and all four stay in light-1280. The question has two parts:

- (a) May each of those halves run in another journey project? Each half would still build its page from the light-1280 variant object (light theme, WIDTH×800) and keep every assertion, control, reading, and logged line.
- (b) May the theme header table run in a project other than light-390, with its rows unchanged?

Item 13 is not part of this question.

**Ruled by the user on 2026-10-05: yes to both (a) and (b), adopting the recommendation.** Item 9 lands with P-H green before light-390 or dark-390 is a destination; lane 4 runs after the checkpoint; acceptance runs on layers 1 and 2.

**Recommendation: yes to both, with item 9 landed and P-H green before any destination that holds a host-bound title** (light-390 and dark-390, `lanes.md:58`). The case already reads 390×800 inside light-1280 (`tests/app/browser/integration.test.ts:1129-1131, 1446-1447`), so the ruling fixes which reading the case takes, and the host project is a scheduling choice. Acceptance refuses any placement that changes the host-bound failures by row and cause. Plan v3 models a further 90 to 126 s beyond layer 1's central figure, or 24 to 42 s with dark-1280 as the only destination (`plan-v3.md:310`). These are models, not readings. Lane 4 waits on the answer. Acceptance waits too, and if the user rules no, acceptance runs on layer 1 alone.

## 10. Modeled figures

The following figures come from plan v3. Every one is a model, not a run reading, and none enters acceptance:

| Scope | Run A | Run B | Share of the run's wall | Source |
|---|---:|---:|---|---|
| Layer 1, central | 118.3 s | 118.3 s | 13.8 and 14.5 percent | `plan-v3.md:440` |
| Layer 1, range | 64.7 to 168.3 s | 64.7 to 168.3 s | 7.5 to 20.6 percent | `plan-v3.md:441` |
| Layers 1 and 2, every destination, central | 226.0 to 244.1 s | 208.7 to 222.9 s | 25.5 to 28.4 percent | `plan-v3.md:442` |
| Layers 1 and 2, every destination, range | 203.6 to 255.1 s | 186.1 to 225.7 s | 22.8 to 29.7 percent | `plan-v3.md:443` |
| Layers 1 and 2, dark-1280 only, central | 142.0 to 160.1 s | 145.5 to 159.7 s | 16.5 to 19.5 percent | `plan-v3.md:444` |
| Layers 1 and 2, dark-1280 only, range | 117.4 to 200.5 s | 103.3 to 194.1 s | 12.6 to 23.7 percent | `plan-v3.md:445` |

The verdict applies the Astra corrections to these estimates as follows:

- **The layer sums reproduce, as modeled credits.** The floor is 64.7 s, the central figure 118.3 s, and the ceiling 168.3 s (`plan-v3-astra-check.md:39-43`).
- **The end rows reproduce.** Run A gives 858.59, 605.44, 588.05, and 500.13 s, and run B gives 817.88, 595.27, 575.66, and 498.58 s (`plan-v3-astra-check.md:49-50`).
- **Rounding.** The raw untimed seconds total 1,478.9605 s, not 1,478.95 s (`plan-v3-astra-check.md:111`). The verdict rules one convention: carry full precision, and round half up only for display.
- **Item 5's credit is unsupported.** The model assumed two waits per row (`plan-v3.md:229`), and the code shows more (`plan-v3-astra-check.md:112`). P-F replaces the credit.
- **The tail allowance (f − 1) × W / 4 (`plan-v3.md:422`) is a heuristic estimate** (`plan-v3-astra-check.md:113`). So is the contention factor f of 1.15 to 1.67.
- **The targets of 25, 16, and 13 percent (`plan-v3.md:449-451`) are recorded against the result, not tested.**
- **The anonymous memory footprint of a full run, the contention factor, every per-item price, and the duration of `test:journey:vue` are unmeasured** (`plan-v3.md:464-474`; `plan-v3-astra-check.md:115`).
- **Further contended readings are on record.** The landing gate run at `4d21de7` reads 817 s with 2 host-bound failures (`tmp/units/flip-gates-2/gates-4d21de7.txt:30, 45, 53-54`). Run A reads 858.59 s and run B 817.88 s (line 205 of each log). All three ran under load.

## 11. Open risks

The following risks and judgment calls remain open:

- **Item 5 may yield no gain under the ruling.** The refusal at every poll keeps the whole-document navigation query (`tests/setupBrowser.ts:5125-5128`), which is the query item 5 was meant to remove. If P-F finds no gain, item 5 is dropped.
- **A host-bound row may fail by chance.** Such a row can fail in an acceptance run while it passed in both J-B0 runs: two of the five journey titles fail only in loaded full runs (`lanes.md:58`). The row-and-cause rule then blocks acceptance, and the Orchestrator investigates rather than rerunning. A judgment call remains open: how lane M normalizes measured values inside a cause string. The normalization is frozen with R.
- **The value of R is a judgment call.** The Orchestrator rules on it when it freezes R from the observed candidate runs.
- **The falsify round runs before acceptance.** A fix made after acceptance would invalidate the acceptance runs.
- **The worktree location departs from `.agents/orchestration.md:81`,** which names `tmp/worktrees/` inside the checkout, where Node's upward lookup can hide a missing package (`plan-v3.md:376`). The Orchestrator confirms the departure.
- **Memory headroom is unverified until J-B0** (`plan-v3-astra-check.md:130`).
- **The placement can miss its prediction.** The miss is recorded and does not affect acceptance.
- **The duration estimate is partial** (§ 6). The unit holds the host longer than any figure stated here.
- **Acceptance waits on Q1.** An unanswered question holds the unit after the checkpoint.

## 12. Dispositions of the Astra check's corrections

The verdict adopts every correction of the Astra check, as the following table shows:

| Correction | Where the verdict applies it |
|---|---|
| Q1.1: item 5 keeps the whole-document refusal population at every poll, and a transient duplicate-navigation control is added | § 3, item 5; § 4, where the stability-proof form is refused; § 7, P-F |
| Q1.2: `390 header` joins the line gate, and multiplicity is compared | § 2, line gate |
| Q1.3: host-bound failures compare by row and cause | § 2, host-bound set; § 5, test 1 |
| Q2.1: full precision and one rounding convention | § 10 |
| Q2.2: item 5's credit is replaced after P-F counts all removed and retained queries | § 7, P-F; § 10 |
| Q2.3: the tail is labeled an estimate, and requirements come from observed candidate runs | § 3, placement; § 5, R; § 10 |
| Q2.4: Q2's duration is a partial estimate with its unpriced work named, and "five suites" is reconciled | § 6, duration; § 8, lane 3's gate |
| Q3.1: the acceptance-floor calculation is fixed before it becomes a gate | § 4, measured floor refused; § 5 |
| Q3.2: artifact collection is specified by command type | § 5, evidence |
| Q3.3: item 9's cleanup covers partial setup and attempts both disables after a reset failure | § 3, item 9; § 7, P-H |
| Q3.4: the placement tie-breaks are explicit | § 3, placement |
| Q4.1: the blanket closure claim is replaced by per-finding dispositions | § 4; this table, together with `plan-v3-astra-check.md:188-227` |
| Q4.2: the partial and unclosed findings are repaired: 1.1, 1.4, 1.15, 2.2, and 2.10 | 1.1 in § 10, rounding; 1.4 in § 7, P-F; 1.15 in § 6, duration; 2.2 in § 3, item 5; 2.10 in § 2, line gate |
| Q4.3: the acceptance double count is tracked separately | § 4, measured floor refused; § 5 |
| Q5.1: no positive measured floor is established | § 5 |
| Q5.2: overlapping changes are credited as one bundle | § 3, bundle credit and the checkpoint rule |
| Q5.3: the wall floor is the faster baseline wall minus the slower candidate wall, frozen before acceptance | § 5, test 2 |
| Q5.4: predictions and percentage targets stay separate from acceptance | § 4; § 5; § 10 |
| Q6.1: Q1 is reworded to separate the halves' light-1280 host from the theme table's light-390 host, and item 13 is excluded | § 9 |
| Q6.2: Q2 is stated with its estimated duration and unpriced work | § 6. The Orchestrator rules Q2 itself rather than asking the user, as this verdict's ruling directs. |
| Q6.3: a regressing placement is investigated and changed before acceptance repeats | § 4, reruns refused; § 11 |
| Q6.4: the automatic zero-saving exemptions for items 7 and 10 are removed, and item 9 keeps its state rationale | § 3, items 7, 9, and 10; § 4 |
| Q6.5: per-lane full runs are kept, with their cost stated as about two historical runs | § 8 |
