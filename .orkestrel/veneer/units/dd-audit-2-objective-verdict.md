# DROPDOWN (`dd`) audit round 2: objective lane verdict (`analyst` on GPT-6 Astra, journal tmp/codex/dd-audit-2-analyst.jsonl, exec 15:30 to 15:38 UTC)

1. **CONFIRMED — Delta and scope.** The attack was an unreported file change or a stale retained diff. `dd-2-status.txt:1` matches the live status; the owned-file additions in `dd-2.diff:1`, `:307`, `:904`, and `:930` reproduce the worktree bytes. `dd-instruments-2/owned-round-delta.diff:1` contains the stated changes; `DropdownSection.ts` also matches round 1’s retained bytes. The shared patch contains exactly the named paths and no deleted lines. I reconstructed its hunks against `c3ac297` without writing files; every context matched, and every resulting blob matched the patch’s recorded hash.

2. **CONFIRMED — Executed mutations.** The attack was a mutation that never reached the asserted behavior, failed during setup, or reddened only an unrelated selector check. The retained logs show the named behavioral assertions failing, with passing controls in `dd-instruments-2/logs/mutations/control.log.txt:54`, `control-section.log.txt:13`, and `control-setup.log.txt:117`.

   The required mutations distinguish the passing case as follows. Log paths in this list are under `dd-instruments-2/logs/mutations/`.

   - `centering-added`: the centered menu’s edge reading changes; `centering-added.log.txt:129` fails the array assertion at `tests/src/styles/components/dropdown.test.ts:205`.
   - `active-rule-dropped`: the selected item becomes transparent instead of taking the retuned active background; `active-rule-dropped.log.txt:155`, assertion at `dropdown.test.ts:298`.
   - `disabled-rule-dropped`: the disabled item loses its retuned color; `disabled-rule-dropped.log.txt:154`, assertion at `dropdown.test.ts:322`.
   - `header-rule-dropped`: header padding becomes zero; `header-rule-dropped.log.txt:153`, assertion at `dropdown.test.ts:366`.
   - `divider-rule-dropped`: divider margin becomes zero; `divider-rule-dropped.log.txt:152`, assertion at `dropdown.test.ts:379`.
   - `item-text-rule-dropped`: item text becomes inline; `item-text-rule-dropped.log.txt:152`, assertion at `dropdown.test.ts:391`.
   - `position-swapped`: the published start/end values reverse; `position-swapped.log.txt:135`, assertion at `dropdown.test.ts:215`.
   - `sm-end-boundary`: geometry still reads `end`, but the published value is absent at the boundary; `sm-end-boundary.log.txt:131` reports `['end|', 'start|start']` instead of `['end|end', 'start|start']`. `mutate.py:75` moves only the unqualified end rule. Its placement twin and the start rules remain in the original media block.

   I also read the remaining row logs. Their assertions distinguish removal of the partial (`baseline-no-partial.log.txt:99`), removal of visibility (`show-rule-missing.log.txt:160`), wrong upward placement (`dropup-copies-top.log.txt:130`), missing spacing (`spacer-dropped.log.txt:133`), an extra caret (`two-carets-on-dropstart.log.txt:129`), retained empty-toggle margin (`empty-rule-dropped.log.txt:157`), wrong caret height (`raised-flag-flipped.log.txt:130`), absent published positions (`position-omitted.log.txt:168`), unconditioned end placement (`end-rule-unconditioned.log.txt:162`), a moved media block (`wrong-boundary.log.txt:129`), a moved end-rule pair (`sm-end-pair-boundary.log.txt:130`), literal hover paint (`literal-hover-background.log.txt:132`), globally applied dark paint (`dark-block-on-menu.log.txt:206`), fixed plain-menu paint (`plain-background-fixed.log.txt:130`), and literal stacking (`literal-zindex.log.txt:130`). The section and setup mutations are addressed in the following verdicts. The expected-green `nav-row-dropped` row is correctly reported as green.

3. **CONFIRMED — Containment at each width.** The attack was desktop overflow hidden by a default-width test. `tests/app/browser/sections/DropdownSection.test.ts:148` registers the width cases; `:155` measures inside `visitBreakpoint`, and `:156` asserts the actual viewport. The helper resizes before invoking the callback (`tests/setupBrowser.ts:210`).

   `room-dropped.log.txt:21` names failures at 390 and 1280, caused by the escaped-menu assertion at `DropdownSection.test.ts:187`. `dropend-column-narrowed-before.log.txt:10` records the former proof passing; `dropend-column-narrowed.log.txt:24` records only the 1280 case failing with `['Dropend']`. The assertions distinguish the mutation. Removing shown menus cannot make the measurement vacuously pass: `specimen-drops-show.log.txt:91` fails the population assertion at `DropdownSection.test.ts:180`.

4. **CONFIRMED — Partition and caret polarity.** The attacks were removing the navigation deferral while retaining the narrow predicate, and flipping the table’s sideways-caret flag. The patch contains the extended predicate and its landing-order comment at `dd-shared-2.patch:749`; it reads the final recorded alignment at `:765` and asserts the polarity at `:772`.

   The retained `Nav` row is present at `dd-shared-2.patch:283`; `logs/gate-setup.log.txt:32` is green. Removing that row remains green in `logs/mutations/nav-row-dropped.log.txt:117`. Removing the predicate extension as well fails the partition assertion in `nav-row-dropped-narrow-predicate.log.txt:125`. `raised-column-flipped.log.txt:125` fails the derivation assertion. These assertions distinguish their mutations; the partition proof does not claim that NAV’s stylesheet has already landed.

5. **CONFIRMED — Guide changes.** The attacks were stale-base placement, missing links, divergent owner wording, and end alignment without the placement attribute. The reconstructed guide preserves the required positions and text: file row at `dd-shared-2.patch:208`, section at `:216`, conditioned alignment and R7 wording at `:249`, departure table at `:298`, compatibility rows at `:336`, owner ending at `:345`, R8 sentence at `:347`, and proof links at `:356` and `:364`.

   The unplaced end menu is mounted at `dropdown.test.ts:192`; its geometry and published property are asserted at `:205` and `:215`. `logs/mutations/end-rule-unconditioned.log.txt:168` shows the unplaced menu becoming end-aligned, so the assertions distinguish that mutation. The placement-engine wording remains within round 1’s explicit R17 ruling; it promises no Veneer script behavior.

6. **CONFIRMED — Nouns, dark-mode proof, copy, and rename.** The attacks were a surviving identical-scope comparison, reversed caret polarity, and changed emitted CSS. The required nouns and copy appear at `dd-shared-2.patch:34`, `:48`, `:907`, and `:997`. The dark-mode case at `dropdown.test.ts:544` compares dark and light scopes, requires different plain-menu colors, and requires equal dark-menu colors.

   `logs/mutations/plain-background-fixed.log.txt:130` and `dark-block-on-menu.log.txt:206` fail that comparison. The baseline logs distinguish the repair: `baseline-no-partial-before.log.txt:94` shows the light comparison surviving and `:99` reports `46 failed | 1 passed (47)`; `baseline-no-partial.log.txt:95` shows the replacement failing and `:99` reports `46 failed (46)`.

   `_dropdown.scss:18`, `:29`, `:40`, and `:50` carry the required flag values; `:115` emits baseline alignment when the flag is false. The table agrees at `dd-shared-2.patch:919`. The runtime and table polarity mutations fail as cited earlier. `logs/raised-rename-css.log.txt:1` records identical CSS and matching SHA-256 digests.

7. **UNRESOLVED — Validation-copy identity; logged results supported.** The retained evidence supports the reported gate results. `logs/summary.txt:22` records the final chain’s successful exits. The individual result lines are `gate-setup.log.txt:32`, `gate-styles.log.txt:79`, `gate-section.log.txt:10`, `gate-conformance.log.txt:11`, `gate-guides.log.txt:11`, and `gate-policy.log.txt:11`. The format, lint, check, and build logs agree with the report. `logs/apply-check.log.txt:1` records success.

   The journey logs each report `39 passed (39)`: `journey-light-390.log.txt:116`, `journey-light-1280.log.txt:116`, `journey-dark-390.log.txt:115`, and `journey-dark-1280.log.txt:115`. Their driven dropdown and lifted-frame cases pass at `:98`/`:88` for light variants and `:97`/`:87` for dark variants. Removing hover/focus paint would fail the changed-paint assertion at `dd-shared-2.patch:490`; the journey assertions distinguish that failure, although no journey mutation run is retained.

   The remaining gap is the validation copy’s asserted base-tree identity. `b-collapse-dd-report-2.md:251` is the only supplied record of that equality. The instrument directory contains no archive/commit/hash transcript, and the validation copy has been deleted. Independently reading `c3ac297^{tree}` verifies the reference hash, not the deleted copy’s hash. A retained transcript of the copy’s `HEAD^{tree}` would settle this clause. The successful patch reconstruction establishes applicability to the intended base, but cannot establish which base the historical runs used.

8. **BROKEN — Writing and report accuracy.** The source and assertion review found no prohibited TypeScript assertion, suppression, mock, or disallowed nested function in the owned code and shared additions. The caret loop and token-backed SCSS hold. The report also records the named implementation decisions. Its claim that it states no count does not hold.

   **F1 — Report counts, recorded outside the claims as requested.** The report states “one patch” at `b-collapse-dd-report-2.md:9`, “One unified diff” at `:28`, “one case per width” at `:26` and `:317`, “one case” at `:71`, and “a single case” at `:147`. These tally expandable sets of patches or cases, contrary to `scaffold/AGENTS.md:172`. Delete the tallies while retaining the named artifact and parameterized test. This finding concerns prose; it does not invalidate the mutation results.

   The report’s remaining numerical counts are recorded here for completeness:

   - Owned-file diffstat values at `:36`: `_dropdown.scss` 300; `dropdown.test.ts` 591; `DropdownSection.ts` 20; `DropdownSection.test.ts` 218.
   - Shared-file diffstat values at `:45`: `Showcase.ts` 2; `constants.ts` 162; `index.ts` 1; guide 108; stylesheet barrel 1; showcase proof 3; entry proof 3; integration proof 65; conformance proof 3; setup module 104; server setup proof 1; styles setup proof 124; styles setup module 209; summary 13 files and 786 insertions. The deletion search reports 0 at `:61`.
   - Before/after results at `:180`: `4 passed (4)`; `1 failed | 4 passed (5)`; `46 failed | 1 passed (47)`; `46 failed (46)`; `1 failed | 1 passed | 109 skipped (111)`; `2 passed | 109 skipped (111)`.
   - Mutation-table results at `:216`: controls report 46, 5, and 2 passed, with 109 skipped in the filtered setup run. Style mutations report failed/passed pairs `1/45`, `2/44`, `3/43`, `6/40`, `15/31`, `5/41`, `7/39`, and `11/35`, each totaling 46, plus `46 failed (46)`. Section mutations report `2/3`, `1/4`, and `3/2`, each totaling 5. Setup mutations report `1 failed | 1 passed | 109 skipped (111)` or `2 passed | 109 skipped (111)`.
   - Gate results at `:270`: 252, 46, 5, 22, and 19 passed; policy reports `109 passed | 1 skipped (110)`. The earlier conformance result at `:283` is `1 failed | 21 passed (22)`. Each journey result at `:305` is `39 passed (39)`.

   The command-derived sizes and executed test measurements are distinguishable from the prohibited prose tallies. “One variant at a time” at `:298` states a concurrency limit. Widths, durations, versions, exit codes, and CSS values are values rather than set counts.

   Count wording also remains in comments: “these two widths” at `DropdownSection.test.ts:146` and “those two populations” at `dd-shared-2.patch:850`. Remove the tallies without changing behavior.

   The retained report additionally contains a malformed command at `b-collapse-dd-report-2.md:288`: its patch operand begins `/home/user/veneer-dd//home/user/scaffold/…`. That path does not exist. The earlier reading during this audit had the original launch path; this defect appeared in the retained-path rewrite. Correct the command transcription. It does not refute the successful apply-check log.

**Findings outside the claims:** F1, the report-count finding recorded under claim 8 as the brief requires.

**Attacked and held:** Adjacent behavior is correctly bounded: centered wrappers remain start-aligned; an end menu without the placement attribute still publishes `end`; narrowing the Dropend column remains harmless at 390; and the navigation deferral remains until NAV lands. The supplied journey results establish executed observations, not a captured portfolio verdict.

VERDICT: FAIL 7, 8; outside the claims: F1