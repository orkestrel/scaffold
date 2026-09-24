1. **CONFIRMED — Scope.** Comparing the retained diff with the worktree found identical bytes. The status lists only owned files. The addition at [tests/setupBrowser.ts:233](/home/user/veneer-bcf/tests/setupBrowser.ts:233) contains the containment interface and helper; existing exports and the frame manager are unchanged. The [shared patch:63](/home/user/scaffold/.orkestrel/veneer/units/bcf-shared-2.patch:63) appends the resting-frame sentence without replacing PAGE-FRAME’s first-pixel wording. The attempted refutation—an unowned edit or restored stale sentence—failed.

2. **BROKEN — The navbar proof still iterates literal breakpoint steps.** [NavbarSection.test.ts:75](/home/user/veneer-bcf/tests/app/browser/sections/NavbarSection.test.ts:75) expands `['', '-sm', '-md', '-lg', '-xl', '-xxl']` through its `flatMap` method. Reading that expression through the TypeScript parser confirmed the literal population. This contradicts the claim’s universal opening sentence. Adding an infix to the shared breakpoint population cannot extend this selector list.

   The specifically converted cases do distinguish their mutations:

   - The `accordion-ordinary-added` mutation adds an ordinary specimen to the readings at [AccordionSection.test.ts:214](/home/user/veneer-bcf/tests/app/browser/sections/AccordionSection.test.ts:214). The expected tuple list rejects it. The retained `bcf-mutation-2-accordion-ordinary-added.log.txt` file records that assertion failure at line 254.
   - The `dropdown-infix-added` mutation produces missing selectors for the added infix. The retained `bcf-mutation-2-dropdown-infix-added.log.txt` file records those selectors at line 153. Its use-site form exercises the converted selector assertion.
   - The `dropdown-ramp-row-added` mutation reaches the fit and containment cases. Their assertions distinguish the unseated toggle and missing menu: the retained `bcf-mutation-2-dropdown-ramp-row-added.log.txt` file records the fit failure at line 183 and containment failure at line 206.

   **Smallest fix:** derive the navbar’s responsive infixes from the shared breakpoint constant, retain its unconditional expansion case, and demonstrate the added-infix failure there.

3. **CONFIRMED — Shared containment helper.** [tests/setupBrowser.ts:270](/home/user/veneer-bcf/tests/setupBrowser.ts:270) performs the shared measurement through the viewport visitor, throws on a width mismatch, and contains no assertion. The visitor restores the starting viewport on successful and failed readings. The dropdown, nav, and navbar callers assert measured membership and an empty escaped list.

   The attempted vacuous-pass and missed-spill attacks fail at [tests/setupBrowser.test.ts:188](/home/user/veneer-bcf/tests/setupBrowser.test.ts:188). The `helper-menu-spilled` mutation adds the held menu to the escaped list; the `helper-empty-population` mutation empties the measured list. Those assertions distinguish the mutations. I read `bcf-mutation-2-helper-menu-spilled.log.txt:84`, `bcf-mutation-2-helper-empty-population.log.txt:84`, and the passing `bcf-gates-2-5.log.txt:80` records.

4. **CONFIRMED — Hanging-menu rename.** The label and accessible name appear at [app/browser/constants.ts:3505](/home/user/veneer-bcf/app/browser/constants.ts:3505), the subject at [tests/setup.ts:303](/home/user/veneer-bcf/tests/setup.ts:303), and the scenario at [tests/setup.ts:1880](/home/user/veneer-bcf/tests/setup.ts:1880). The section’s expected label agrees.

   Searching the owned files and shared patch for the old label, stem, and accessible name found no occurrence. An independent examination of scenario declarations and subject stems found no proper prefix of the hanging-menu stem. The control found the expanded-navbar stem as a proper prefix of its hover scenario, agreeing with `bcf-2-stem-prefix.log.txt:1`. The attempted stale-name and prefix-collision attacks failed.

5. **CONFIRMED — Ring check follows the placement.** [integration.test.ts:2008](/home/user/veneer-bcf/tests/app/browser/integration.test.ts:2008) obtains the region recorded for the focus placement and compares it with the shot element’s dimensions. The structural guard precedes the pointer-held placement at [integration.test.ts:1965](/home/user/veneer-bcf/tests/app/browser/integration.test.ts:1965).

   The `underline-focus-on-specimen` mutation is distinguished: the left-edge reading becomes false, failing the ring assertion. I read `bcf-mutation-2-underline-focus-on-specimen.log.txt:84` and the passing `bcf-mutation-2-underline-unmutated.log.txt:7` records. The retained dark-390 focus image also shows the ring inside the wrapper’s padding.

   The unregistered-capture mutation fails earlier, at portfolio registration, as `bcf-mutation-2-v6-underline-unregistered-capture.log.txt:85` records. It does not independently prove the assertions following the shot; the report correctly states that limitation.

6. **CONFIRMED — Static attribute and in-flow placement.** The shown navbar menus carry the attribute. The attribute case at [NavbarSection.test.ts:182](/home/user/veneer-bcf/tests/app/browser/sections/NavbarSection.test.ts:182) requires a nonempty derived population and checks its membership and attribute values. The in-flow case at [NavbarSection.test.ts:206](/home/user/veneer-bcf/tests/app/browser/sections/NavbarSection.test.ts:206) derives menus from bars without expansion classes, rejects an empty population, and requires static positioning.

   The assertions distinguish the mutations. The dropped attribute yields a null placement in `bcf-mutation-3-r6-opened-menu-attribute-dropped.log.txt:152`; absolute positioning fails the in-flow assertion in `bcf-mutation-3-r5-opened-menu-absolute.log.txt:155`. The pre-fix failure agrees in `bcf-3-red-before-fix.log.txt:148`, and the restored section run passes in `bcf-gates-3-5.log.txt:145`.

   Bootstrap’s [dropdown script:313](/home/user/veneer-bcf/node_modules/bootstrap/js/src/dropdown.js:313) writes the static attribute in its navbar branch. Its placement rule supplies the top, left, and margin declarations. The [retained cascade reading:3](/home/user/scaffold/.orkestrel/veneer/units/bcf-instruments/bcf-3-cascade.log.txt:3) distinguishes omission from presence: positioning remains static, while the margin and measured gap become 2 pixels. The specimen height increases by that gap. The attempted interpretation that the top declaration absolutely positions this menu fails against those readings.

7. **CONFIRMED — Named prose changes.** The added sentence at [app/browser/constants.ts:2126](/home/user/veneer-bcf/app/browser/constants.ts:2126) matches the retained nav-tab images: the narrow frames cover the wrapped disabled tab, and the wide frames expose it. The navbar remarks match the attribute and positioning evidence under claim 6.

   The rewritten guide sentences in [bcf-shared-2.patch:7](/home/user/scaffold/.orkestrel/veneer/units/bcf-shared-2.patch:7) agree with the retained menu frames, the accordion readings, and the resting-copy implementation. The attempted header-specific weight explanation fails: neither header rule declares a weight; the heading departure records the difference. The `bcf-v14-weight.log.txt` record agrees.

   The resting-frame sentence is supported by the pointer release and padded copy at [integration.test.ts:704](/home/user/veneer-bcf/tests/app/browser/integration.test.ts:704). Removing the release or padding distinguishes the adverse state, as the `bcf-mutations.log.txt:70` records show. Searching the owned files and patch found no statement describing containment as copied loops and no obsolete specimen label.

8. **CONFIRMED — Stated syntax and gate-result claims.** Inspection of added lines, including a TypeScript syntax scan with an in-memory adverse control, found no added prohibited assertion, unrestricted type, suppression, disallowed nested function, mock, spy, or fake clock. The helper throws rather than asserting. Anonymous argument callbacks are permitted.

   The quoted gate summaries agree with the retained gate logs, including the guide run. The lint and typecheck logs contain no summary result line, as the reports state. This confirms the specific numbered claim; the reports’ separate output-contract violations are finding F2.

   The following inventories refer to [report 2](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-bcf-report-2.md:1) and [report 3](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-bcf-report-3.md:1).

   **Counts stated in report 2:**

   - “one containment helper” at lines 1 and 53; length 2 at line 36; the seated value 2 at line 37; “a pair of menus” at line 38; the menu value 2 at line 40; “one unseated toggle and one shown menu” at line 42; the seated reading 0 against 2 at line 43; the menu reading 1 against 2 at line 44; “One sentence” at line 97; “both widths” in the quoted former sentence at line 109; “One slip” and “one throwaway stem list” at line 235.
   - `Tests 26 passed (26)` result at lines 9 and 187.
   - `Tests 4 failed | 22 passed (26)` result at line 21.
   - `Tests 1 failed | 25 passed (26)` result at line 30.
   - `Tests 5 failed | 21 passed (26)` result at line 45.
   - `Tests 1 failed | 74 passed (75)` result at lines 71 and 73.
   - `Tests 1 failed | 45 skipped (46)` result at lines 160 and 168.
   - `Tests 1 passed | 45 skipped (46)` result at line 162.
   - `Test Files 4 passed (4)` and `Tests 299 passed (299)` results at line 184.
   - `Test Files 1 passed (1)` and `Tests 75 passed (75)` results at line 185.
   - `Test Files 5 passed (5)` result at line 187.
   - `Test Files 1 passed (1)` and `Tests 19 passed (19)` results at line 190.

   **Counts stated in report 3:**

   - `Tests 1 failed | 27 passed (28)` result at lines 26 and 29.
   - `Tests 1 passed | 45 skipped (46)` result at line 51.
   - `Tests 3 failed | 25 passed (28)` result at line 66.
   - `Test Files 4 passed (4)` and `Tests 299 passed (299)` results at line 93.
   - `Test Files 5 passed (5)` and `Tests 28 passed (28)` results at line 95.

   Round identifiers, finding identifiers, source-line references, exit codes, viewport widths, weights, and pixel readings are identifiers or measured values rather than growable-set tallies. The requested result quotations retain their reported counts.

   **Temporal wording:**

   - Report 2 contains “Before,” “After,” or their lowercase forms at lines 8, 17, 18, 26, 27, 35, 37, 38, 40, 50, 97, 98, 100, 108, 110, 112, 115, 120, 126, 130, 135, 138, 139, 149, 152, 162, 170, 171, and 176; “when” at lines 60 and 145; “already” at line 85; “predate” at line 92; “at landing” at line 92; “then” at line 100; “again” at line 162; “last source edit” at line 176; “following the rename” at line 233; “early” at line 235; and “straight away” at line 236.
   - Report 3 contains “first” at line 5; “before” or “after” at lines 25, 30, 32, 35, 68, 70, 74, 76, 85, 99, and 125; “no longer” at line 73; “last source edit” at line 85; and “at landing” at line 53.
   - The required before/after labels and execution-order descriptions document comparisons or sequencing. References to preceding text, later tabs, and first/last accordion items describe location or position rather than dating the implementation. “Above” at report 3 line 73 is a cross-reference.

   **Code spans lacking a following noun:**

   - Report 2: the commit identifier at line 8; expressions at lines 17–18 and 26–29; mutation labels at lines 19, 28, 41, 70, 72, 154, and 165; specimen labels at lines 19, 33, 39, 41, and 77; expressions or readings at lines 35, 37, 40, 43–44, and 57; stems at lines 78 and 88–90; accessible names at line 83; branch and commit identifiers at line 104; the quoted weight at line 118; method calls at line 149; the assertion at line 152; the placement call and capture setting at line 155; capture settings at lines 167 and 171; the patch name at line 189; mutation names at lines 201–204; owned-path entries at lines 208–214; the directory at line 215; and artifact, runner, and commit entries at lines 216–218 and 220–222.
   - Report 3: source paths at lines 3–4; the method call and source path at lines 12–13; the reading at line 27; the mutation label at line 28; the attribute span at line 35; property/value cells at lines 37–40; the display property at line 49; the expansion prefix at line 60; the static value at line 62; the reading at line 64; search spans at line 97; source paths at lines 105–106; the directory at line 108; and artifact or commit entries at lines 109–117.
   - The command spans are also bare: report 2 lines 158–159, 180, 182–186, 188, 192, and 203; report 3 lines 50, 89, 91–94, and 96. The result spans listed in the count inventory likewise lack following nouns. Report 2’s diagnostic spans at lines 156–157 and 170 are bare quotations.
   - Coordinated spans with a shared following noun, such as the scenario and subject fields or the frame filenames, have an identifying noun. Line wrapping does not remove that noun.

**Findings outside the claims**

- **F1 — BROKEN: containment documentation excludes a real caller’s state.** [tests/setupBrowser.ts:237](/home/user/veneer-bcf/tests/setupBrowser.ts:237) says that a shown menu is positioned out of flow and adds nothing to its specimen’s box. The opened-navbar specimen is a counterexample: the [retained cascade reading:4](/home/user/scaffold/.orkestrel/veneer/units/bcf-instruments/bcf-3-cascade.log.txt:4) records static positioning and a specimen-height increase from its margin. The helper measures that specimen through the navbar caller. **Smallest fix:** qualify the explanation as applying to out-of-flow menus. The containment algorithm itself correctly measures static and absolute menus.

- **F2 — BROKEN: report output requirements remain violated.** The successor briefs require reports without growable-set tallies and with following nouns for code tokens. [Report 2:97](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-bcf-report-2.md:97) states “One sentence”; [report 2:235](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-bcf-report-2.md:235) tallies a slip and a scratch list. [Report 3:28](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-bcf-report-3.md:28) leaves its mutation identifier without a following noun. The inventories under claim 8 identify the remaining sites. **Smallest fix:** remove incidental tallies and supply the identifying nouns. Preserve the expressly requested gate-result quotations and before/after evidence.

**Attacked and held:** Literal expected readings remain legitimate independent oracles; claim 2 concerns the population being measured. Closed menus correctly remain outside the helper’s population, while shown menus without boxes are escaped. Historical capture filenames retain the former navbar stem and are evidence artifacts, not missed source renames. The static placement attribute does not require static CSS positioning: the expanded navbar correctly uses absolute positioning.

VERDICT: FAIL 2; outside the claims: F1, F2