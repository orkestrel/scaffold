1. **CONFIRMED — Scope and delta.** The scope-escape attack failed. The retained [status](/home/user/scaffold/.orkestrel/veneer/units/uf-2-status.txt:1) and [owned diff](/home/user/scaffold/.orkestrel/veneer/units/uf-2.diff:1) match the worktree. Comparing the retained rounds finds only the prescribed prose changes in the owned files; the shared-patch changes stay within `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md`, at the named fixes and their reflowed paragraphs.

   `git apply --check /home/user/scaffold/.orkestrel/veneer/units/uf-shared-2.patch` exited 0. This audit checked the unchanged shared targets in the worktree, whose contents match `2a3f223`, rather than creating a scratch extract. Those are the same target contents a fresh extract supplies.

2. **CONFIRMED — F-a: guide claims.** The incorrect-token, display-scale, and incorrect-size attacks failed. The replacement wording appears in the [guide patch](/home/user/scaffold/.orkestrel/veneer/units/uf-shared-2.patch:443), including the departure title, appended size comparison, and [Showcase sentence](/home/user/scaffold/.orkestrel/veneer/units/uf-shared-2.patch:544).

   The retained [value-probe log](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-probe-2.log.txt:2) records `.fw-normal` resolving to 400 under the weight-token retunes, `.fs-1` to 36px, and `.fs-5` to 18px. The compiled declarations agree with the [font partial](/home/user/veneer-uf/src/styles/utilities/_font.scss:24) and [tokens](/home/user/veneer-uf/src/styles/_tokens.scss:258). The installed release supplies the 40px cap and 20px size through its [cap rule](/home/user/veneer-uf/node_modules/bootstrap/dist/css/bootstrap.css:11998) and [size rule](/home/user/veneer-uf/node_modules/bootstrap/dist/css/bootstrap.css:8382).

   The shipped viewport and token-retune assertions distinguish the `fluid`, `literal`, `fs6literal`, and `cap` mutations; see [size assertions](/home/user/veneer-uf/tests/src/styles/utilities/font.test.ts:26) and [retained mutation results](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-mutations.log.txt:11). The weight-retune reading is retained probe evidence, not a shipped weight-token-retune assertion.

3. **CONFIRMED — F-b: step table.** The missing-row and incorrect-property attacks failed. The [table declaration](/home/user/scaffold/.orkestrel/veneer/units/uf-shared-2.patch:138) exports and freezes the table, its rows, and their case collections. Independent in-memory evaluation confirmed their frozen state.

   The [binding case](/home/user/scaffold/.orkestrel/veneer/units/uf-shared-2.patch:197) preserves the inventory comparisons. Its coverage predicate independently derives `fst`, `fw`, and `lh`; evaluating that predicate against the pinned inventory produced those keys.

   The [round-2 mutation log](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-mutations-2.log.txt:3) distinguishes each mutation:

   | Mutation | Assertions distinguish it | Retained result |
   | --- | --- | --- |
   | `droplh` | Yes: coverage equality detects the absent `lh` key. | `uf-mutations-2.log.txt:10`, exit 1 |
   | `dropfst` | Yes: coverage equality detects the absent `fst` key. | `uf-mutations-2.log.txt:21`, exit 1 |
   | `wrongproperty` | Yes: declaration equality detects `font-style` replacing `font-weight`. | `uf-mutations-2.log.txt:32`, exit 1 |

   The control exits 0, and each mutation fails the named binding case. Independent in-memory comparisons also distinguished those mutations. This audit ran no Vitest project.

4. **BROKEN — F-c: prose.** The named replacements landed, but the universal count-compliance claim fails.

   **Failing text:** the added table comment describes the `font` key’s “single step” at [uf-shared-2.patch:135](/home/user/scaffold/.orkestrel/veneer/units/uf-shared-2.patch:135). That states how many steps the inventory records, a population expressly covered by the [count prohibition](/home/user/scaffold/AGENTS.md:172). The test title also retains “carries two of its classes” at [font.test.ts:239](/home/user/veneer-uf/tests/src/styles/utilities/font.test.ts:239); the report incorrectly declares that count permitted at [report:162](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-uf-report-2.md:162).

   **Smallest fix:** name the `monospace` step in the comment and describe “conflicting classes” in the test title. Correct the report’s permitted-sense ruling.

   The viewport-specific comment identifies its reading, and the parent-weight and size-range replacements hold. Font-size distances are measurements; the pre-existing specimen’s `First entry` text is fixture data. Neither is the defect identified here.

5. **CONFIRMED — Round-1 confirmations.** The regression attack failed. The executable owned changes and the shared changes outside the binding case remain unchanged. Compiling the proposed barrel in memory confirmed the inventory-derived selector population, declaration priority, utilities layer, and order. The heading-scale bindings, Tailwind evidence, specimens, capture rows, and registries retain the subjects confirmed in round 1.

   The following discrimination rulings use the current assertions and the retained [round-1 mutation log](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-mutations.log.txt:1). Log locations refer to that file.

   | Mutation | Assertions still distinguish it | Log location |
   | --- | --- | --- |
   | `monotoken` | Yes: the alias retune detects bypassing the alias. | `:84` |
   | `monoliteral` | Yes: the stack comparison and retunes detect the literal. | `:92` |
   | `fluid` | Yes: viewport and token-retune readings differ. | `:11` |
   | `literal` | Yes: default-size and token-retune readings differ. | `:28` |
   | `fs6literal` | Yes: the token retune distinguishes the equal-default literal. | `:48` |
   | `cap` | Yes: wide-viewport sizes differ. | `:56` |
   | `italicmissing` | Yes: the oblique parent exposes inheritance. | `:126` |
   | `lighter100` | Yes: the 600 parent and relative-weight control differ. | `:100` |
   | `bolder700` | Yes: the 600 parent and relative-weight control differ. | `:109` |
   | `normalmissing` | Yes: the 600 parent exposes inheritance. | `:118` |
   | `lhsm` | Yes: the fixed-size factor reading differs. | `:75` |
   | `lhliteral` | Yes: the body-line-token retune differs. | `:67` |
   | `infixed` | Yes: the exhaustive selector lookup finds the addition. | `:187` |
   | `infixedsample` | Yes: the mounted reading and selector lookup detect it. | `:195` |
   | `moderule` | Yes: dark and light readings differ. | `:171` |
   | `density` | Yes: the density retune changes the mutated reading. | `:179` |
   | `reorder` | Yes: conflicting classes resolve differently. | `:146` |
   | `normal` | Yes: inline, unlayered, and escape assertions expose lost importance. | `:136` |
   | `elementslayer` | Yes: heading/display assertions detect the recorded layer-and-priority mutation. | `:162` |
   | `unlayered` | Yes: the unlayered important override wins. | `:154` |
   | `absent` | Yes: positive value and retune assertions fail. | `:205` |
   | `section` | Yes: independent specimen expectations detect removal. | `:242` |
   | `ledger` | Yes: measured departures lack their required ledger rows. | `:251` |
   | `tablevalue` | Yes: the preserved declaration comparison detects the changed factor. | `:260` |
   | `entryrow` | Yes: inventory-derived membership detects the missing entry. | `:269` |
   | `entryproperty` | Yes: the inventory-property comparison detects the substitution. | `:278` |
   | `tailwind-line` | Yes: derived exclusion membership rejects the nonshared name. | `:287` |

   The relevant current assertions remain in [font.test.ts](/home/user/veneer-uf/tests/src/styles/utilities/font.test.ts:26), [TypeSection.test.ts](/home/user/veneer-uf/tests/app/browser/sections/TypeSection.test.ts:18), and the [binding patch](/home/user/scaffold/.orkestrel/veneer/units/uf-shared-2.patch:197). The retained [Tailwind probe](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-tailwind-probe.log.txt:17) emits its positive controls and no unit name. Round-2 [gate results](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-gates-2.log.txt:3) record passing style, section, setup, and conformance runs.

6. **BROKEN — Law and report.** The forbidden-TypeScript, suppression, fake, and nested-function attacks found no violation in the owned additions or shared patch. The retained [gate log](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-gates-2.log.txt:1) supports the reported gate exits and summaries.

   **Failing text:** [report:129](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-uf-report-2.md:129) says “The new table”; [report:131](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-uf-report-2.md:131) says “which is now a table row.” These are temporal uses prohibited by [writing.md:41](/home/user/scaffold/.claude/rules/writing.md:41).

   **Smallest fix:** write “The table” and “which is a table row.” The report’s command/result tables need no change to resolve this finding.

   **Outside-claim finding REPORT-COUNTS — BROKEN.** The report repeats the inventory tally “single step” at [report:78](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-uf-report-2.md:78) and endorses the class tally at `:162`. Name the step and remove the class tally. Preserve required before/after quotations and measurements tied to retained runs.

   The requested count record follows; locations refer to `b-utilities-uf-report-2.md`.

   | Location | Stated count or quantified wording | Ruling |
   | --- | --- | --- |
   | `:78` | “single step” | Inventory tally; prohibited. |
   | `:137` | 1 passed, 121 skipped, total 122 | Retained control measurement. |
   | `:138`, `:139`, `:140` | 1 failed, 121 skipped, total 122 in each row | Retained mutation measurements. |
   | `:149`, `:155` | “two parent weights” | Required before-text quotation. |
   | `:153` | “first four sizes” | Required before-text quotation. |
   | `:156` | “No two entries set one property” | Required before-text quotation. |
   | `:158` | “one token,” “one size,” “one class” | Quoted per-row or per-class relationships. |
   | `:160` | “one phrase” | Quoted specimen copy. |
   | `:162` | “two of its classes” | Test-title tally; incorrectly endorsed. |
   | `:172` | 28 passed, total 28 | Retained style-run measurement. |
   | `:173` | 7 passed, total 7 | Retained section-run measurement. |
   | `:174` | 122 passed, total 122 | Retained setup-run measurement. |
   | `:175` | 22 passed, total 22 | Retained conformance-run measurement. |
   | `:176` | 1 file passed, total 1 | Retained guide-run measurement. |
   | `:177` | 109 passed, 1 skipped, total 110 | Retained policy-run measurement. |

   “One by one” at `:72` describes iteration. “More than one” at `:76`, `:131`, and `:201` describes the coverage predicate’s threshold; “at least one” at `:159` states an existential condition. The font-size distances at `:160` are values, not population tallies.

**Attacked and held:** the default `.fs-6` literal correctly passes the default-size assertion while failing the retune assertion. Removing the partial correctly leaves the absence-of-infixed-classes assertion green. Dropping importance alone correctly leaves the heading-override case green. The recorded elements-layer mutation also drops importance; it proves that combined mutation, not an isolated move of important declarations.

VERDICT: FAIL 4, 6; outside the claims: REPORT-COUNTS