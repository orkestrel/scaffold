1. **CONFIRMED — Scope and delta.** The hidden-change attack failed. The retained owned diff reproduces the live files, and the status records agree. Applying the retained interdiffs in memory reproduces round 2 exactly: only the authorized assertion, comment, rename, and prose sites change. The stylesheet sources and specimen markup remain byte-identical. Evidence: [usp-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/usp-2-status.txt:1), [owned interdiff:1](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-2-owned-interdiff.txt:1), and [shared interdiff:1](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-2-shared-interdiff.txt:1). The Orchestrator’s apply-check ruling stands.

2. **CONFIRMED — Derived auto-margin population.** The stale literal-population attack failed. The [side-order derivation:16](/home/user/veneer-usp/tests/app/browser/sections/SpacingSection.test.ts:16) reads the shorthand entry, and the [class derivation:189](/home/user/veneer-usp/tests/app/browser/sections/SpacingSection.test.ts:189) reads the side table.

   I read [usp-mutations-2.log.txt:2](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutations-2.log.txt:2). Each zero-margin mutation fails the named auto-margin case through its assertions, rather than through collection failure:

   | Mutated rule | Distinguishing assertion | Retained log line |
   |---|---|---|
   | `.m-auto` | Opposite edges agree and room is positive; zeroing breaks the edge comparison. | 2 |
   | `.mx-auto` | Left and right room agree; mutation reads 1 against 207. | 9 |
   | `.my-auto` | Vertical room is positive; mutation reads zero. | 16 |
   | `.mt-auto` | Bottom room is zero and top room is positive. | 23 |
   | `.me-auto` | The following card reaches the line’s end with a positive intervening gap; mutation leaves trailing room. | 30 |
   | `.mb-auto` | Top room is zero and bottom room is positive. | 37 |
   | `.ms-auto` | Right room is zero and left room is positive. | 44 |

   The [assertions:214](/home/user/veneer-usp/tests/app/browser/sections/SpacingSection.test.ts:214) distinguish every listed mutation. The restored case passes at [log line 51](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutations-2.log.txt:51).

3. **BROKEN — Census coverage.** The census silently excludes selectors that belong to the unit but contain a pseudo-class. Its [anchored grammar:16](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-cascade-2.mjs:16) rejects them before [declaration inspection:23](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-cascade-2.mjs:23).

   I executed the retained census body in memory against Sass-compiled unit partials and the pinned inventory, substituting only input/output boundaries. The baseline returned exit 0. Appending `.m-6{margin:4rem!important}` returned exit 1 with an extra-selector finding. Appending `.m-6:hover{margin:4rem!important}` instead returned exit 0 with every finding array empty. Normal declarations, custom properties, and repeated sites beneath `.m-3:hover` likewise escaped inspection.

   These selectors belong to the unit: executing the repository’s [selector attribution:2052](/home/user/veneer-usp/tests/setupServer.ts:2052) assigns them to the margin key. An unrelated selector correctly remains outside that population.

   The retained [census runs:79](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutations-2.log.txt:79) do establish the reported built-cascade pass and plain-selector controls. Those controls distinguish their mutations, but not the excluded selector forms. This finding concerns the instrument, not a demonstrated defect in the shipped stylesheet.

   Smallest correct fix: use the repository’s selector-to-key attribution for membership, preserve the full selector in each site, and retain a pseudo-class negative control.

4. **CONFIRMED — Guide wording.** The missing-wording and density-overclaim attacks failed. The required sentences appear at [patch line 824](/home/user/scaffold/.orkestrel/veneer/units/usp-shared-2.patch:824), [line 851](/home/user/scaffold/.orkestrel/veneer/units/usp-shared-2.patch:851), and [line 892](/home/user/scaffold/.orkestrel/veneer/units/usp-shared-2.patch:892). They agree with the partials and token definitions.

   The density assertion distinguishes replacing the step token with a literal: the retained [mutation run:68](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutate.log.txt:68) fails the [retuning case:127](/home/user/veneer-usp/tests/src/styles/utilities/spacing.test.ts:127). Removing importance also fails the override assertions, as recorded at [mutation log line 168](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutate.log.txt:168). Literal zero and auto values correctly remain outside the density-dependent steps.

5. **BROKEN — Token nouns.** The named source comments and table documentation are repaired, but the universal noun claim still fails in the report, which is part of the audited subject. At [report lines 29–30](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-usp-report-2.md:29), the sentence places the noun before the `SIDES` identifier and ends with the bare `SPACING_SIDE_CASES` identifier.

   This is fresh explanatory prose, not a historical quotation or code example. It violates the [following-noun rule:48](/home/user/scaffold/.claude/rules/writing.md:48). Write: “The `SIDES` constant reads the shorthand entry’s `sides` field from the `SPACING_SIDE_CASES` table.” Sweep the report’s remaining explanatory prose under the same rule.

6. **CONFIRMED — Rename.** The stale-reader attack failed. AST inspection found no remaining identifier for the former field in the owned TypeScript files or patched style setup files. The table and documentation use the [replacement field:145](/home/user/scaffold/.orkestrel/veneer/units/usp-shared-2.patch:145), and the binding assertion independently compares generated keys against inventory keys.

   The margin-prefix mutation distinguishes the defect: changing its value to `'p'` duplicates padding keys and removes margin keys. I read the retained failure and restored pass at [mutation log line 54](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutations-2.log.txt:54). Existing prose about CSS initial values is unrelated to the renamed field.

7. **CONFIRMED — Interaction copy, prohibited constructs, and gate record.** The copy agrees with the [hit-test assertions:80](/home/user/veneer-usp/tests/app/browser/sections/InteractionSection.test.ts:80): the pointer-disabled link yields its parent, while enabled links yield themselves. Changing pointer-events from none to auto would violate that target equality; the corresponding style mutation fails in the retained [log:90](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutate.log.txt:90).

   AST inspection found no prohibited added type, assertion, or nested function. Planted controls verified that the inspection detects those constructs. The report contains none of the prohibited temporal vocabulary. Its numerical totals are recorded execution measurements, rather than discretionary structural tallies.

   Commands and outcomes agree with the retained [gate log:2](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-gates-2.log.txt:2), [guide log:10](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-guides-2.log.txt:10), and [service observation:3](/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-service-2.log.txt:3). The service observation is explicitly red, not represented as a passing criterion.

   The report states these counts:

   | Report location | Counts |
   |---|---|
   | [57–64](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-usp-report-2.md:57) | Each auto-margin mutation: 1 failed, 4 skipped, total 5. Restored: 1 passed, 4 skipped, total 5. |
   | [124–128](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-usp-report-2.md:124) | Setup mutations: 1 failed, 121 passed, total 122. Restored: 122 passed. The quoted diagnostic carries an omitted-member count of 9 on each side. |
   | [172](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-usp-report-2.md:172) | Inventory 551; cascade 551; declarations 710; finding arrays empty. |
   | [189–194](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-usp-report-2.md:189) | Styles 22 passed; sections 8 passed; setup 122 passed; conformance 22 passed; guides 19 passed; policy 109 passed and 1 skipped, total 110. |
   | [202](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-usp-report-2.md:202) | Service observation: 2 failed, 16 passed, total 18. |

Findings outside the claims: none.

Attacked and held: Named expectations remain legitimate assertions rather than a duplicated iterated population. Historical before-and-after quotations remain evidence; the noun finding concerns the report’s authored explanatory prose.

VERDICT: FAIL 3, 5; outside the claims: none