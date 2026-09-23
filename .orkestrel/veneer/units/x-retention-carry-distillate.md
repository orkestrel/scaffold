I'll read the brief and the orchestration files it depends on before doing anything else.The brief is a read-only absorption pass. I'll load the retention procedure, the campaign folder, and the Veneer sources it names.The session log shows CHECK at `43d954c` and `main` at `2c10329`. Next I’ll read the verdicts and match the open carriers against the guide.The campaign folder and the Veneer registers disagree about what is still open. `main` in `/home/user/veneer` is `2c10329`; the session branch tip is `43d954c`. The F8 line has no landing commit in `0783b2b..43d954c`.

Surviving commits in that range, taken from `/home/user/veneer/.git/logs/HEAD` after the reset back to `fc228f2` (abandoned amend attempts before that reset are not on the tip). `origin/main` was last pushed at `2c10329` (`.git/logs/refs/remotes/origin/main`). The amend that produced `43d954c` replaced `63ad308`; that commit is the session tip and is not on `main`.

| Commit | Reflog subject |
| --- | --- |
| `71b7388` | Select duplication beside the block sweep: `findDuplication` under the coincidence floor |
| `d4f78e5` | Land the validation states |
| `e0d04ba` | Roadmap fold 13: B-FORMS-VALIDATION landed |
| `fc228f2` | Size the journey's test budget from the showcase it walks |
| `bcf938c` | Land the pagination classes |
| `06eb3c1` | Roadmap fold 14: B-PASSIVE-D landed |
| `7b922b6` | Land the button group and toolbar classes |
| `16b2590` | Roadmap fold 15: B-PASSIVE-B landed |
| `70a7487` | Land the progress, spinner, and placeholder classes |
| `7981fd1` | Roadmap fold 16: B-PASSIVE-E landed |
| `376255a` | Land the form range class |
| `49548e2` | Roadmap fold 17: B-FORMS-RANGE landed |
| `6cce83f` | Land the card and list group classes |
| `808cf53` | Roadmap fold 18: B-PASSIVE-C landed |
| `62ff1a6` | Land the badge, breadcrumb, and close classes |
| `2c10329` | Roadmap fold 19: B-PASSIVE-A landed, the passive family on main |
| `43d954c` | Land the form check classes as a Bootstrap 5.3.8 baseline |

`unit/f8b` is `d9c03a2`, subject "Checkpoint: F8b SHARED-PREFLIGHT as returned, before the F8c SERVICE units (rollback point; not a landing)". F8a’s landing `0783b2b` is the exclusive start of the search range.

## 1. Unit table

Root of `.orkestrel/veneer/`, outside `units/`: `plan.md`, `tenets.txt`, `f8-design-verdict.md`, `f8c-design-verdict.md`, `b-passive-design-verdict.md`, `b-sweep-design-verdict.md`, `b-forms-design-verdict.md`, `veneer-audit-verdict.md`, `cl13-verdict.md`.

| Unit | On `main` (`2c10329`) | Brief / report | Audit verdicts | Instruments | Acceptance evidence |
| --- | --- | --- | --- | --- | --- |
| `f8b` | No commit in the range names it. Checkpoint `d9c03a2` on `unit/f8b` is marked not a landing. `ROADMAP.md:272` says F8b runs in its worktree from `0783b2b`. | `units/f8b-brief.md`, `units/f8b-report.md` | Lane files only. No `f8b-audit-verdict.md`. `units/f8b-audit-claims.md`, `f8b-audit-analyst-brief.md`, `f8b-audit-analyst.sh`, `f8b-audit-analyst-verdict.md`, `f8b-audit-reviewer-brief.md`, `f8b-audit-reviewer-verdict.md`, `f8b-audit-checker-brief.md`, `f8b-audit-checker-verdict.md` | `units/f8b-audit-analyst.sh` | `units/f8b.diff`, `units/f8b-status.txt`, `units/f8b-d6-settle.log.txt` |
| `f8c-a` | No landing commit in the range. `units/f8c-a-fix-3-audit-verdict.md:24` records acceptance as checkpoint `b9c0b0a` on `unit/f8b`. | `units/f8c-a-brief.md`, `f8c-a-brief-2.md`, `f8c-a-brief-3.md`, `f8c-a-report.md`, `f8c-a-report-3.md` | `units/f8c-a-audit-verdict.md`, `f8c-a-fix-3-audit-verdict.md`; lane files `f8c-a-audit-claims.md`, `f8c-a-audit-analyst-brief.md`, `f8c-a-audit-analyst.sh`, `f8c-a-audit-analyst-verdict.md`, `f8c-a-audit-reviewer-brief.md`, `f8c-a-audit-reviewer-verdict.md`, `f8c-a-fix-3-audit-claims.md`, `f8c-a-fix-3-audit-analyst-brief.md`, `f8c-a-fix-3-audit-analyst.sh`, `f8c-a-fix-3-audit-analyst-verdict.md` | `units/f8c-a-audit-analyst.sh`, `f8c-a-fix-3-audit-analyst.sh` | `units/f8c-a-3-setup-rerun.log.txt` |
| `f8c-b` | No landing commit in the range. `plan.md:37-42` names worktree `/home/user/veneer-f8b`. | `units/f8c-b-brief.md`, `f8c-b-brief-2.md`, `f8c-b-brief-3.md`, `f8c-b-brief-4.md`, `f8c-b-report.md`, `f8c-b-report-2.md`, `f8c-b-report-3.md`, `f8c-b-report-4.md` | Reconciled: `units/f8c-b-audit-verdict.md`, `f8c-b-2-audit-verdict.md`. Round 3 has `units/f8c-b-3-checker-verdict.md` and no `*-audit-verdict.md`. Lane files: `f8c-b-audit-claims.md`, `f8c-b-audit-analyst-brief.md`, `f8c-b-audit-analyst.sh`, `f8c-b-audit-analyst-verdict.md`, `f8c-b-audit-reviewer-brief.md`, `f8c-b-audit-reviewer-verdict.md`, `f8c-b-2-audit-claims.md`, `f8c-b-2-audit-analyst-brief.md`, `f8c-b-2-audit-analyst.sh`, `f8c-b-2-audit-analyst-verdict.md` | `units/f8c-b-audit-analyst.sh`, `f8c-b-2-audit-analyst.sh` | `units/f8c-b-2-mutations.log.txt` |
| `f8c` design | No landing commit. | `f8c-design-verdict.md`; `units/f8c-design-brief.md`, `f8c-design-planner-proposal.md`, `f8c-design-analyst-proposal.md` | The design verdict is the round record. | `units/f8c-design-analyst.sh`, `f8c-probe-import.mjs`, `f8c-probe-profiles.mjs` | `units/f8c-probe-import.log.txt`, `f8c-probe-profiles.log.txt`, `f8c-policy.log.txt`, `f8c-config.log.txt`, `f8c-repair.log.txt` |
| `f8p` | No landing commit. Probe, named at `f8-design-verdict.md:7-8`. | `units/f8p-probe-readings.md` | — | `units/f8p-probe.mjs`, `f8p-probe-2.mjs`, `f8p-probe-3.mjs` | The readings file is the probe record. |
| `f8` terrain | F8a landed at `0783b2b`, outside the range. `ROADMAP.md:272` still has F8b in a worktree. | `units/f8-terrain-report.md`, `units/f8-terrain-3-report.md`; design ruling `f8-design-verdict.md` | — | `units/f8-tailwind-intersection.mjs`, `units/f8-tailwind-intersection.json` | `units/f8a.diff` remains after the F8a landing. |
| `bfc` / `b-forms-check` | Landing subject is on `43d954c`, session tip, not on `main`. `ROADMAP.md:278` says CHECK landed from `/home/user/veneer-bfc`. | `units/b-forms-check-brief.md`, `b-forms-check-brief-2.md`, `b-forms-check-brief-3.md`, `b-forms-check-report.md`, `b-forms-check-report-3.md` | `units/bfc-audit-verdict.md`, `bfc-fix-audit-verdict.md`; lane files `bfc-audit-claims.md`, `bfc-audit-analyst-brief.md`, `bfc-audit-analyst.sh`, `bfc-audit-analyst-verdict.md`, `bfc-audit-reviewer-brief.md`, `bfc-audit-reviewer-verdict.md`, `bfc-audit-checker-brief.md`, `bfc-audit-checker-verdict.md`, `bfc-fix-audit-claims.md`, `bfc-fix-audit-analyst-brief.md`, `bfc-fix-audit-analyst.sh`, `bfc-fix-audit-analyst-verdict.md` | `units/bfc-audit-analyst.sh`, `bfc-fix-audit-analyst.sh`, `units/verify-bfc.sh` | `units/bfc-landing-message.txt`, `units/verify-bfc.sh`. `bfc-audit-verdict.md:31` cites `bfc.diff`; that file is not in the folder. |
| `bfg` / `b-forms-group` | No landing commit in the range. `ROADMAP.md:278` says GROUP is next. | `units/b-forms-group-brief.md`, `b-forms-group-brief-2.md`, `b-forms-group-brief-3.md`, `b-forms-group-report.md`, `b-forms-group-report-3.md` | `units/bfg-audit-verdict.md`. Lane files: `bfg-audit-claims.md`, `bfg-audit-analyst-brief.md`, `bfg-audit-analyst.sh`, `bfg-audit-analyst-verdict.md`, `bfg-audit-reviewer-brief.md`, `bfg-audit-reviewer-verdict.md`, `bfg-audit-checker-brief.md`, `bfg-audit-checker-verdict.md`. No fix-round `*-audit-verdict.md`. | `units/bfg-audit-analyst.sh` | `units/b-forms-group-report-3.md:6` says "Nothing committed." |
| `bff` / `b-forms-floating` / `b-forms-floor` | No landing commit in the range. | Floating: `units/b-forms-floating-brief.md`, `b-forms-floating-brief-2.md`, `b-forms-floating-report.md`. Floor: `units/b-forms-floor-brief.md`, `b-forms-floor-report.md` | `units/bff-audit-verdict.md`. Lane files: `bff-audit-claims.md`, `bff-audit-analyst-brief.md`, `bff-audit-analyst.sh`, `bff-audit-analyst-verdict.md`, `bff-audit-reviewer-brief.md`, `bff-audit-reviewer-verdict.md`, `bff-audit-checker-brief.md`, `bff-audit-checker-verdict.md` | `units/bff-audit-analyst.sh` | `units/b-forms-floating-brief-2.md:2-3` says B-FORMS-FLOOR "landed D32 in this worktree and is closed." That close is not a commit in the range. |
| `bfs` / `b-forms-select` | No landing commit in the range. | `units/b-forms-select-brief.md`, `b-forms-select-brief-2.md`, `b-forms-select-report.md` | `units/bfs-audit-verdict.md`. Lane files: `bfs-audit-claims.md`, `bfs-audit-analyst-brief.md`, `bfs-audit-analyst.sh`, `bfs-audit-analyst-verdict.md`, `bfs-audit-reviewer-brief.md`, `bfs-audit-reviewer-verdict.md`, `bfs-audit-checker-brief.md`, `bfs-audit-checker-verdict.md`. No fix-round verdict. | `units/bfs-audit-analyst.sh` | `units/b-forms-select-roadmap.patch` |
| `b-forms-control` | No landing commit. | `units/b-forms-control-brief.md` only. No report. | — | — | — |
| `b-forms-design` | Design record. VALIDATION `d4f78e5` and RANGE `376255a` are on `main`. Their unit briefs and reports are not in the folder. | `b-forms-design-verdict.md`; `units/b-forms-design-brief.md`, `b-forms-design-planner-proposal.md`, `b-forms-design-analyst-proposal.md` | The design verdict. | `units/b-forms-design-analyst.sh` | — |
| `b-forms-terrain` | Terrain record the briefs point at (`plan.md:17-18`). | `units/b-forms-terrain-brief.md`, `units/b-forms-terrain-report.md` | — | — | — |
| `b-forms-pseudo` | Probe only. | — | — | `units/b-forms-pseudo-probe.mjs` | — |
| `b-passive-design`, `-terrain`, `-family`, `-baseline` | A `62ff1a6`, B `7b922b6`, C `6cce83f`, D `bcf938c`, E `70a7487` are on `main`. Per-unit briefs and reports for A–E are not in the folder. `plan.md:107-112` says those artifacts were pruned. | `b-passive-design-verdict.md`; `units/b-passive-design-brief.md`, `b-passive-design-planner-proposal.md`, `b-passive-design-analyst-proposal.md`, `b-passive-terrain-brief.md`, `b-passive-terrain-report.md`, `b-passive-family.md`, `b-passive-baseline.md` | The design verdict, including the D17 amendment at `b-passive-design-verdict.md:77-88`. | `units/b-passive-design-analyst.sh` | — |
| `b-sweep` (beside the passive family) | On `main` as `71b7388`. | `b-sweep-design-verdict.md`; `units/b-sweep-design-brief.md`, `b-sweep-design-planner-proposal.md`, `b-sweep-design-analyst-proposal.md` | The design verdict. | `units/b-sweep-design-analyst.sh` | The landing commit. No sweep diff remains in the folder. |
| `l1` | Landing `ec816c5` is before `0783b2b` (HEAD log: "Return the cascade ledger to the guide (D14)"). `plan.md:120` lists it among closed, pruned units. | — | — | — | `units/l1.diff` |
| `resolve-*`, `sort-*`, `land-*`, `regen-*`, `verify-*` | Shared landing instruments. `plan.md:113-118` says the procedure ran from E on. | — | — | `units/resolve-diff3.py`, `resolve-hunks.py`, `resolve-files-table.py`, `sort-inventories.py`, `land-unit.sh`, `regen-portfolio.sh`, `verify-bfc.sh` | — |
| `codex-*` | — | — | — | `units/codex-queue.sh` | — |
| `decisions-round-2.md` | Register. `plan.md:11` says it carries D2 to D13. The file continues through D36 (`units/decisions-round-2.md:360`). | The file itself. | — | — | — |

`veneer-audit-verdict.md:3-8` names `veneer-audit-claims.md`, `units/veneer-audit-evidence.md`, `units/probe-engine.log.txt`, `units/important-census.log.txt`, `units/veneer-audit-checker-report.md`, `units/veneer-audit-reviewer-report.md`, and `units/veneer-audit-analyst-report.md`. Those files are not in the folder. `ROADMAP.md:424-425` says that verdict is folded into the carrier register.

`ROADMAP.md` names these paths; they are not in the folder: `realign-design-verdict.md` (`ROADMAP.md:443`), `research/ledger.md` (`ROADMAP.md:294`; no `research/` directory), `units/remaining-surface.md` (`ROADMAP.md:295`), `units/elements-grid-search.md` (`ROADMAP.md:360`).

## 2. Carry check

Open items below are ones the registers and the reconciled `*-audit-verdict.md` files still leave unfinished. A row is flagged when the recorded carrier is missing, is not a unit, or names more than one unit.

### Decisions D14–D36 still open against `main`

| Item | Carrier as recorded | Flag |
| --- | --- | --- |
| D19, Tailwind proofs move into the `service` project (`units/decisions-round-2.md:169-178`) | "amended by the F8c design round"; F8c-A and F8c-B are the units (`f8c-design-verdict.md:10-11`) | Names F8c-A and F8c-B |
| D20, per-family key lists stay until the family closes (`units/decisions-round-2.md:180-186`) | "the Orchestrator's mechanical integration edits at each landing; B-PASSIVE-CLOSE consolidates" | Orchestrator, and B-PASSIVE-CLOSE |
| D23, `expand`, `variables`, `createTeardown` (`units/decisions-round-2.md:211-220`) | "F8c-A-3 (`units/f8c-a-brief-3.md`)" | Checkpoint `b9c0b0a` is not a commit in the range |
| D24, forbidden-runtime exemption (`units/decisions-round-2.md:222-230`) | "F8c-B MOVE" | Unlanded. Also carried at `units/f8c-a-fix-3-audit-verdict.md:15-16` |
| D25 and D25a, `@import` placement and the cascade-5 citation (`units/decisions-round-2.md:232-241`, `:336-341`) | D25 names "The guide's § Tailwind". `units/f8c-b-2-audit-verdict.md:20-22` carries the prose repair to `units/f8c-b-brief-3.md` | D25's own carrier is the guide section, not a unit. Session `guides/veneer.md` has no `css-cascade-5` / `postcss-import` sentence (search of that file) |
| D26, remove `select-indicator` and `switch-knob` from `$assets` (`units/decisions-round-2.md:243-250`) | "B-FORMS-ASSETS (`builder` on Sonnet)" | Same carrier at `ROADMAP.md:375`. B-FORMS-ASSETS is not a row in `ROADMAP.md:256-289` |
| D27, document-order reading is structural (`units/decisions-round-2.md:252-258`) | "the profiles proof's case comment and in the guide's sentence". `units/f8c-b-audit-verdict.md:19-20` carries it to F8c-B-2 | The decision names no unit. The verdict names F8c-B |
| D28, light island keeps the dark knob (`units/decisions-round-2.md:260-269`) | "the CHECK fix round" | On the session branch the sentence is `guides/veneer.md:743-744` and `units/bfc-landing-message.txt:10-12`, commit `43d954c`. That commit is not on `main` |
| D29, input-group focus drives the button (`units/decisions-round-2.md:271-281`) | "the GROUP fix round" | `units/b-forms-group-report-3.md:6-10` says the worktree closed it and nothing was committed. No fix-round verdict file |
| D30, a size pair takes one `@each` (`units/decisions-round-2.md:283-289`) | CHECK and GROUP fix rounds, and "a finding against B-PASSIVE-CLOSE, recorded in `ROADMAP.md` by the GROUP landing's patch" | CHECK's `@each` is in `43d954c` (not on `main`). GROUP is uncommitted. B-PASSIVE-CLOSE is a second unit. No ROADMAP row states the size-pair finding |
| D31, tooltip specimens and the rounding fixture (`units/decisions-round-2.md:291-299`) | B-FORMS-CLOSE for the tooltip frames; B-FORMS-CONTROL retires `INPUT_GROUP_ROUNDING`; "the fixture's TSDoc is restated … by the GROUP fix round"; the `--vn-space-24` observation "handed to B-FORMS-SELECT's audit claims" | Names B-FORMS-CLOSE, B-FORMS-CONTROL, the GROUP fix round, and B-FORMS-SELECT |
| D32, relative duplication floor moves to 5 (`units/decisions-round-2.md:301-313`) | "B-FORMS-FLOOR … lands with FLOATING" | Not on `main`. Session `tests/setupServer.ts:668-688` still uses `count >= 4` and records the largest overlap as 3 on 2026-09-22. B-FORMS-FLOOR is not a row in `ROADMAP.md:256-289` |
| D33, sized select end padding (`units/decisions-round-2.md:315-322`) | "the GROUP fix round" | Same uncommitted state as D29 |
| D34, floating height scales with density (`units/decisions-round-2.md:324-334`) | "the FLOATING fix round" | `units/bff-audit-verdict.md:52` and `units/b-forms-floating-brief-2.md:10`. No landing commit |
| D35, barrel loads validation last (`units/decisions-round-2.md:343-358`) | "the FLOATING fix round" | `units/bff-audit-verdict.md:14-18`. No landing commit |
| D36, a generic type argument is not an `as` assertion (`units/decisions-round-2.md:360-364`) | "No change to the existing uses." `units/bfs-audit-verdict.md:35` records R1 → D36 | Recorded as no change |

D14’s carrier is L1, commit `ec816c5`, outside the range. D15’s predicate is on `main` in `tests/setupServer.ts:684-688` via `71b7388`. D17’s spinner sentence is `guides/veneer.md:3134-3138`; E landed as `70a7487`. D21 names "B-PASSIVE-E-3"; the E landing in the range is `70a7487`. D22’s regroup heading is `guides/veneer.md:2672` (`#### btn-close`); A landed as `62ff1a6`. The ROADMAP cell for that row still says the Orchestrator does the regroup (`ROADMAP.md:384`).

D18 (`units/decisions-round-2.md:162-167`) names no carrier unit. It says the amendment is "from the B-PASSIVE-E audit". `.claude/rules/styles.md` has no sentence that an unread `@use` is a dead load.

### `plan.md` still calls these live

`plan.md:29-42`: B-FORMS-GROUP, B-FORMS-CHECK, B-FORMS-FLOATING, and B-FORMS-SELECT are live from `main` `2c10329`; CONTROL follows the first landing; CLOSE follows the rest; F8c-B is live in `veneer-f8b` and "the landing of F8c on `main`" follows. CHECK now has `43d954c` on the session branch. `plan.md:122-125` still queues GROUP, CHECK, FLOATING, CONTROL, SELECT, and CLOSE.

`plan.md:107-112` says the passive family, VALIDATION, RANGE, and J1 are closed on `main` and "`veneer-f8b` alone remains." That sentence conflicts with `plan.md:29-36`, which names `veneer-bfg`, `veneer-bfc`, `veneer-bff`, and `veneer-bfs`.

### ROADMAP § Carriers rows whose close is still ahead

| Item | Carrier cell | Flag |
| --- | --- | --- |
| Outline ghost through link-styled button colour (`ROADMAP.md:358`) | "E-ELEMENTS assembles …; the user rules it as APPEARANCE-RULING; E-IDENTITY lands each ruling" | E-ELEMENTS and E-IDENTITY, plus the user |
| Build dropping vendor prefixes (`ROADMAP.md:361`) | "F5 ACCOUNTING" | Not a unit name in the phase table |
| Two deferral grammars (`ROADMAP.md:363`) | "F5 ACCOUNTING" | Not a unit name |
| Container and navigation combinators (`ROADMAP.md:364`) | "F5 ACCOUNTING classifies …; the Navbar unit of B-COLLAPSE … B-SCROLLSPY closes their behaviour" | Two carriers |
| Registry majors and the `pool: 'forks'` pin (`ROADMAP.md:365`) | Cell is "D8". `units/decisions-round-2.md:63-66` says "X-EXIT records the exclusion" | Decision id in the table; X-EXIT in the decision file |
| Forced-colours axis (`ROADMAP.md:366`) | T2 landed; "F9 VENEER-REPIN closes the Compatibility section's open forced-colours reading" | Open remainder is F9. `ROADMAP.md:276` does not mark F9 landed |
| Chrome receipt (`ROADMAP.md:367`) | "F4 HOST-OBSERVATIONS pins …; E-RECEIPTS records the promised hosts; the install is the user's" | F4 and E-RECEIPTS, plus the user |
| U1-del legacy tree (`ROADMAP.md:368`) | "Recorded drop: `fc36cec` … X-RETENTION carries the working-tree deletion" | Open remainder is X-RETENTION |
| Cross-cutting reconciliation (`ROADMAP.md:369`) | "F5 ACCOUNTING, before any family opens" | Not a unit name. B-PASSIVE and B-FORMS are already open in the phase table |
| CL8b gap keys (`ROADMAP.md:370`) | "B-UTILITIES" | — |
| U7c paint calibration (`ROADMAP.md:371`) | "E-ELEMENTS, then E-IDENTITY" | Two units |
| Caption opt-out specimen (`ROADMAP.md:374`) | "F6 FOUNDATION landed …; F7b CAPTION-SPECIMEN supplies the specimen" | Open remainder is F7b. `ROADMAP.md:271` does not mark F7b landed |
| Theme-scope caret and knob (`ROADMAP.md:375`) | "B-FORMS-ASSETS … after B-FORMS-CHECK and B-FORMS-SELECT" | CHECK is on the session branch only. SELECT is unlanded. ASSETS is absent from the phase table |
| Validation tooltip specimens (`ROADMAP.md:376`) | "B-FORMS-GROUP adds `Valid tooltip` and `Invalid tooltip`" | Conflicts with D31, which assigns those specimens to B-FORMS-CLOSE (`units/decisions-round-2.md:293-296`) |
| Cascade-key prose (`ROADMAP.md:377`) | "B-FORMS-CLOSE" | — |
| Showcase region paragraph, customization retune sentence, `below` comment, barrel-neighbour sentences, driven-key lists, stem table (`ROADMAP.md:378-383`) | "B-PASSIVE-CLOSE" | — |
| `.btn-close` departure rows (`ROADMAP.md:384`) | "the Orchestrator regroups them under `#### btn-close` at B-PASSIVE-A's landing" | Carrier is the Orchestrator. The heading is present at `guides/veneer.md:2672`. A landed as `62ff1a6` |
| `visitBreakpoint` / hold refusals / `resolveButton` / `driveOracle` (`ROADMAP.md:390`) | "Recorded drop as satisfied. X-RETENTION verifies each closure citation" | The verifying carrier is X-RETENTION |
| CL12 guide bounds (`ROADMAP.md:391`) | "Recorded drop as satisfied. X-RETENTION confirms each closure citation" | Same |
| Shared class name whose Veneer declarations are all normal (`ROADMAP.md:397`) | "That unit extends the `@source not inline(...)` line" | "That unit" is not a named unit |
| `emitEvent`, `bindEventMap`, `Delegate` move (`ROADMAP.md:398`) | "F6 FOUNDATION records the shape …; B-COLLAPSE moves all three" | Two units. F6 is marked landed at `ROADMAP.md:269` (`04114c5`) |
| Audit claim 4 release-on-removal (`ROADMAP.md:400`) | "F4 … records the present semantics …; B-COLLAPSE rules release-on-removal" | Two units. F4 is marked landed (`af673cb`) |
| Audit claim 11 stripe (`ROADMAP.md:406`) | "F5 …; F6 …; E-IDENTITY rules the stripe value" | E-IDENTITY remains |
| Audit claim 13 which departures stay (`ROADMAP.md:408`) | "F5 …; E-IDENTITY rules which stay" | E-IDENTITY remains |
| Audit claim 14 distribution proof (`ROADMAP.md:409`) | "E-RECEIPTS runs the distribution proof in release mode" | — |
| Audit claim 17 and 25 (`ROADMAP.md:411`, `:415`) | T1 landed; "F9 VENEER-REPIN" deletes the local copies | Open remainder is F9 |
| Checker claims 19 and 23 (`ROADMAP.md:417`) | "19 and 23 held under the reviewer and the analyst and carry nothing" | Carrier recorded as nothing |
| F5d reviewer F-F, briefs listing `ROADMAP.md` as shared and off-limits (`ROADMAP.md:422`) | "the Orchestrator writes every later brief with `ROADMAP.md` once, as report-only" | Carrier is the Orchestrator |
| `ROADMAP.md:425` | "Claims 1, 2, 6, 15, 19, and 23 held and carry nothing." | Held, carrier nothing |

### Last reconciled verdicts that still record an open claim

| Verdict | Still open in that file | Carrier that file records |
| --- | --- | --- |
| `units/bfc-fix-audit-verdict.md:12-17` | Claim 10 unresolved until the landing chain. Verdict accepts landing. | The CHECK landing. Commit `43d954c` exists on the session branch. The file does not say the chain ran. |
| `units/bfs-audit-verdict.md:15-42` | FAIL 3, 6, 7, 10; F1–F4 to the fix round; R2 to B-FORMS-CLOSE; R3 and R5 to B-PASSIVE-CLOSE; claim 7's omitted sites to B-FORMS-ASSETS | Fix round, and those three unit names. `units/b-forms-select-brief-2.md` exists. No fix-round verdict. |
| `units/bfg-audit-verdict.md:13-61` | FAIL 3, 4, 5, 6, 8, 10. Fix round for 3, 6, 8. D31 for tooltips. Successor report for claim 5. | GROUP fix round and B-FORMS-CLOSE. `units/b-forms-group-report-3.md` is later than this verdict and says the worktree closed the findings with nothing committed. |
| `units/bff-audit-verdict.md:14-53` | FAIL 2, 6; claim 10 unresolved until the landing chain after GROUP; F1–F3 and D34 to the fix round; R4 to B-PASSIVE-CLOSE; R6 dropped | FLOATING fix round (`units/b-forms-floating-brief-2.md`) and B-PASSIVE-CLOSE |
| `units/f8c-b-2-audit-verdict.md:20-33` | FAIL 9, 11. Claim 9 carrier `units/f8c-b-brief-3.md`. Ledger-path centralization carrier B-PASSIVE-CLOSE, "recorded in `ROADMAP.md` at the F8c landing" | F8c-B and B-PASSIVE-CLOSE. `units/f8c-b-brief-4.md` and `units/f8c-b-report-4.md` exist. No reconciled verdict after round 2. `ROADMAP.md` has no row for that centralization defect. |
| `units/f8c-a-fix-3-audit-verdict.md:11-25` | Claim 8 carried to F8c-B. Claim 15 unresolved until F8c's landing. | F8c-B, then the F8c landing |
| `cl13-verdict.md:155-160` | Finding 1 carrier "The next family's capture work". Finding 5 and 7 "Recorded, no carrier". | `ROADMAP.md:372` later names F7 CAPTURE for the frame grammar, and `ROADMAP.md:270` marks F7 landed (`64e69f6`). The cl13 file still has the unnamed carrier. |

`ROADMAP.md:429-430`: "No decision is open. D2 to D12 were ruled on 2026-09-22". The decisions file contains D13 through D36 after that.

## 3. Promotion check

| File class | What it asserts | Destination the retention rule names | What that destination carries |
| --- | --- | --- | --- |
| `tenets.txt` | Product tenets and execution constraints. `tenets.txt:57`: "Use Grok 4.6 to absorb, distill, and map bulk context." | `ROADMAP.md:12-13` says the tenets are reproduced from that file. `ROADMAP.md:68` repeats the Grok 4.6 sentence. | D13 (`units/decisions-round-2.md:124-131`) says the engines going forward are Grok 4.7, Opus 5.5, and GPT-6 Astra, "Landed in scaffold at 06f9387". The campaign copy and the roadmap copy still say Grok 4.6. |
| `plan.md` | Process diary. `plan.md:1-8` calls itself a bridge to `ROADMAP.md`. Stacked "live units" paragraphs record successive sessions. | Prunes, per the retention rule's diary class. `ROADMAP.md:444` calls it a bridge. | — |
| `units/decisions-round-2.md` | User rulings D2–D13 and later rulings D14–D36. | A decision's home is the commit that made it (`retention.md:80`). Product sentences inside a ruling belong in `guides/veneer.md`. Process sentences belong in a rule. | See the gaps below. |
| Design verdicts (`f8-design-verdict.md`, `f8c-design-verdict.md`, `b-passive-design-verdict.md`, `b-sweep-design-verdict.md`, `b-forms-design-verdict.md`) | Rulings the units execute. `plan.md:14-16` says the live units execute them. | Product rulings to the guide; the ruling itself to the commit. | F8 ruling 10's "Tailwind 4.3" is `guides/veneer.md:296`. F8c's service-project amendment (`f8c-design-verdict.md:10-11`, D19) is not in that section: `guides/veneer.md:303-305` still points the profiles at `tests/tailwind/profiles.test.ts`. |
| `*-audit-verdict.md` and `cl13-verdict.md` | Round rulings and carriers. | Diary, once the carrier row or the commit holds the ruling. `ROADMAP.md:424` says the veneer audit verdict is folded into the register. | `cl13-verdict.md:155` still names "The next family's capture work" where `ROADMAP.md:372` names F7. |
| Briefs and reports | Unit diary, measurements, and successor state. | Diary. | `units/b-forms-group-report-3.md` and `units/b-forms-floating-brief-2.md` are the current uncommitted state for GROUP and FLOATING. |
| Instruments, probes, diffs, logs, `bfc-landing-message.txt` | Executed procedure and landing text. | Diary. A probe that settled a claim becomes a test before the prune (`retention.md:42`). | `units/f8p-probe-readings.md:1` dates `tailwindcss` 4.3.3 to 2026-09-22. The guide sentence is "Tailwind 4.3" (`guides/veneer.md:296`). |
| `units/b-passive-family.md`, `units/b-passive-baseline.md` | `plan.md:16-17`: they "bind every B unit." | Process instructions for units. The durable product sentences are the guide sections those units landed. | — |

Product truth or process law the folder states, and the destination file that does not state it:

| Folder sentence | Destination searched |
| --- | --- |
| "`guides/` holds guides alone — the package's own guide, the map, and the catalog mirrors." `units/decisions-round-2.md:141-143`. The same paragraph says the vendored policy sweep that refused `guides/ledger.md` states this law. | `.claude/rules/documentation.md` (read through the parity section) does not contain that sentence. A search for `holds guides alone` and `guides/ledger` under `/home/user/scaffold` hits the campaign folder and `units/b-passive-baseline.md:18-19`. `ROADMAP.md:267` records the refusal and the revert commit `ec816c5`. The reflog subject is "Return the cascade ledger to the guide (D14)". |
| "an unread `@use` is a dead load" `units/decisions-round-2.md:165-167` | `.claude/rules/styles.md:23-34` states how `@use` loads. It does not state that an unread `@use` is a dead load. |
| "`querySelector<HTMLSelectElement>(…)` and `querySelectorAll<HTMLElement>(…)` pass the type parameter the DOM declarations declare; they are not the `as` assertion `AGENTS.md` bans" `units/decisions-round-2.md:362-364` | A search of `AGENTS.md` for `querySelector` and `type parameter` found no sentence. The decision says no change. |
| D25's CSS-syntax citation, Cascade Level 5 `#at-import` and `#layer-empty`, verified 2026-09-23 (`units/decisions-round-2.md:336-341`; `units/f8c-b-2-audit-verdict.md:11-19`) | `guides/veneer.md` § Tailwind (`:292-349`) has the recipes and "Veneer supports Tailwind 4.3." It has no `css-cascade-5` citation. The recipes at `:329-336` and `:343-349` place `@import` ahead of `@source`. |
| D32: relative floor 5, largest independent overlap 4, dated 2026-09-23 (`units/decisions-round-2.md:301-310`) | `tests/setupServer.ts:668-673` still says the relative arm takes an overlap of at least 4, the absolute arm at least 6, and "the largest overlap two partials wrote independently being 3 declarations … on 2026-09-22." `guides/veneer.md` has no such sentence. `.claude/rules/styles.md:46-48` has the qualitative coincidence line and no number. |
| D19 / `f8c-design-verdict.md:71-74`: proofs live at `tests/service/tailwind/{profiles,consumer,preflight}.test.ts` and `prepublishOnly` gains `test:service` | `guides/veneer.md:303-305` names `tests/tailwind/profiles.test.ts` as the profile proof. |

Sentences the guide already carries from the folder: the dark-knob limit (`guides/veneer.md:741-744`, matching D28 and `units/bfc-landing-message.txt:10-12` on the session branch); the grow-spinner empty frame (`guides/veneer.md:3134-3138`, matching `b-passive-design-verdict.md:79-85`); Tailwind 4.3 (`guides/veneer.md:296`, matching `f8-design-verdict.md:97`).

## 4. Measurement check

Numbers that appear in the campaign folder and in a sentence of `guides/veneer.md`. The date is the one the folder writes next to that number.

| Number | Folder | Date the folder records | Guide sentence |
| --- | --- | --- | --- |
| Tailwind 4.3, and the probe's `tailwindcss` 4.3.3 | `f8-design-verdict.md:7` and `:23` and `:97`; `units/f8p-probe-readings.md:1` | 2026-09-22 (`f8-design-verdict.md:3`; `units/f8p-probe-readings.md:1`) | `guides/veneer.md:296`: "Veneer supports Tailwind 4.3." The guide sentence does not carry `4.3.3`. |
| 527 class names; 209-name Bootstrap intersection | `f8-design-verdict.md:23-25` | 2026-09-22 on the same verdict | No guide sentence carries 527 or 209. |
| 12% tint and 5% inset | `veneer-audit-verdict.md:28` | 2026-09-22 (`veneer-audit-verdict.md:1`) | `guides/veneer.md:1435` `--vn-state-hover` is `12%`. `guides/veneer.md:1437` `--vn-state-stripe` is `5%`. |
| `transform: scale(0)` and `opacity: 0` | `b-passive-design-verdict.md:79-80` | 2026-09-22 (`b-passive-design-verdict.md:77`) | `guides/veneer.md:3134-3135` |
| Largest coincidence 3; relative floor 4; absolute floor 6 | `b-sweep-design-verdict.md:47-48` and `:64-65` | 2026-09-22 | No guide sentence. The landed remarks are `tests/setupServer.ts:668-673`, same numbers, dated 2026-09-22. |
| Largest overlap 4; relative floor 5 | `units/decisions-round-2.md:301-310` | 2026-09-23 | No guide sentence. `tests/setupServer.ts:668-673` still records 3, 4, and 6. |
| `#86b7fe`, half a channel step | `units/b-forms-check-report.md:84` ("measured"); `units/bfc-audit-analyst-verdict.md:5` | Undated on the report line. The reconciled CHECK verdict is dated 2026-09-23 (`units/bfc-audit-verdict.md:1`) and does not restate the hex. | `guides/veneer.md:761-762` |
| `0.15s ease-in-out` resolved as `0.15s ease` | `units/b-forms-check-report.md:86`; `units/b-forms-select-report.md:150-152` | Undated | `guides/veneer.md:765-766` |

## 5. Alignment of `plan.md` with `ROADMAP.md`

| Topic | `plan.md` | `ROADMAP.md` |
| --- | --- | --- |
| CHECK | `plan.md:29-33` lists B-FORMS-CHECK as a live unit from `2c10329`. `plan.md:122-123` queues CHECK. | `ROADMAP.md:278`: "CHECK landed from `/home/user/veneer-bfc` … and GROUP is next." The landing commit `43d954c` is on the session branch, not on `main` `2c10329`. |
| GROUP, FLOATING, SELECT | `plan.md:29-33` lists all three as live, in parallel. | The phase row names GROUP as next and does not name FLOATING or SELECT as in progress (`ROADMAP.md:278`). |
| CONTROL, CLOSE, ASSETS, FLOOR | `plan.md:33-34`: CONTROL follows the first landing, CLOSE the rest. No ASSETS or FLOOR. | The eight units at `ROADMAP.md:278` match the design verdict (`b-forms-design-verdict.md:123-130`): VALIDATION, RANGE, GROUP, CHECK, FLOATING, CONTROL, SELECT, CLOSE. ASSETS is only a carrier (`ROADMAP.md:375`). FLOOR is only in `units/decisions-round-2.md:312`. |
| F8 | `plan.md:37-42`: F8c-B is the live unit; F8c-A is accepted at `b9c0b0a`; landing of F8c on `main` follows. `plan.md:112`: "`veneer-f8b` alone remains." | `ROADMAP.md:272`: F8a landed as `0783b2b`; "F8b SHARED-PREFLIGHT runs on Opus 5 in its own worktree". No F8c row. |
| Passive family | `plan.md:107-112` lists D `bcf938c`, B `7b922b6`, E `70a7487`, C `6cce83f`, A `62ff1a6`, B-SWEEP `71b7388`, and says they are on `main`. | `ROADMAP.md:277` lists the same commits and adds "B-PASSIVE-CLOSE carries the family's cross-cutting rows." `plan.md` does not name B-PASSIVE-CLOSE. |
| Decisions | `plan.md:11`, `:44`, `:62`, and `:82` each say the decisions file "carries the user's rulings D2 to D13". `plan.md:99-102` adds "the Orchestrator's rulings D14 to D22". | `ROADMAP.md:429`: "No decision is open. D2 to D12 were ruled". The file on disk goes through D36. |
| Engine generation | `tenets.txt:57` and the roadmap copy at `ROADMAP.md:68` say Grok 4.6. | D13 in the decisions file says Grok 4.7 (`units/decisions-round-2.md:124-128`). The roadmap tenets were not updated with that sentence. |
| Records to read | `plan.md:14-18` names `f8-design-verdict.md`, `f8c-design-verdict.md`, `b-passive-design-verdict.md`, `b-sweep-design-verdict.md`, `b-forms-design-verdict.md`, `units/b-passive-family.md`, `units/b-passive-baseline.md`, and the three terrain reports. Those files are present. | `ROADMAP.md:441-444` also names `realign-design-verdict.md`. That file is absent. `ROADMAP.md:294-295` names `research/ledger.md` and `units/remaining-surface.md`. Those paths are absent. `ROADMAP.md:360` names `units/elements-grid-search.md`. That file is absent. |
| Tooltip specimens | Not in `plan.md`. | `ROADMAP.md:376` assigns them to B-FORMS-GROUP. `units/decisions-round-2.md:293-296` and `units/bfg-audit-verdict.md:17-19` assign them to B-FORMS-CLOSE. |
| Worktrees still live | `plan.md:112` says only `veneer-f8b` remains. `plan.md:29-37` names `veneer-bfg`, `veneer-bfc`, `veneer-bff`, `veneer-bfs`, and `veneer-f8b`. | `ROADMAP.md:278` names `/home/user/veneer-bfc` as the CHECK source and does not name the other worktrees. |