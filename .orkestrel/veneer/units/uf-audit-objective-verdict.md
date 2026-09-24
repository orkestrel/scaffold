1. **CONFIRMED — Scope and delta.** The scope-escape attack failed. [uf-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/uf-status.txt:1) and [uf.diff:1](/home/user/scaffold/.orkestrel/veneer/units/uf.diff:1) match the owned worktree changes. The added files match their retained diffs. The shared patch equals the concatenation of its per-file patches and touches only granted Shared paths. Every shared target remains unchanged from `2a3f223`; `git apply --check` against those base contents exits successfully. No excluded path receives an addition. Evidence: [uf-shared.patch:1](/home/user/scaffold/.orkestrel/veneer/units/uf-shared.patch:1).

2. **CONFIRMED — Cascade against the oracle.** The missing-selector, extra-selector, wrong-order, wrong-layer, and wrong-priority attacks failed. I compiled the barrel with its proposed font import entirely in memory and compared its parsed rules with the inventory. The selectors match the unconditioned inventory population in order; their declarations are important, their layer is utilities, and no font rule declares a custom property or media condition. The values match the claimed token bindings and retained literals. Evidence: [font partial:4](/home/user/veneer-uf/src/styles/utilities/_font.scss:4), [inventory:108392](/home/user/veneer-uf/tests/fixtures/oracle/inventory.json:108392), [Bootstrap utility map:502](/home/user/veneer-uf/node_modules/bootstrap/scss/_utilities.scss:502), and [utility mixin:368](/home/user/veneer-uf/src/styles/_mixins.scss:368).

   The independently calculated differences equal the guide patch’s `fs` and `lh` rows. No difference belongs to `font`, `fst`, or `fw`. The retained conformance run passes; removing the ledger tables makes its missing-departure assertion fail. Evidence: [ledger rows:452](/home/user/scaffold/.orkestrel/veneer/units/uf-shared.patch:452), [conformance assertion:246](/home/user/veneer-uf/tests/conformance.test.ts:246), and [mutation log:251](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-mutations.log.txt:251).

3. **CONFIRMED — Mutation discrimination.** The false-green attack failed for the named mutations. The following rulings use the assertions and the retained [uf-mutations.log.txt](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-mutations.log.txt:1), not a fresh browser run. Its control passes, and its mutation sections identify their edits, commands, exits, summaries, and failing cases.

   | Mutation | Assertions distinguish it from the passing case | Evidence |
   | --- | --- | --- |
   | `monotoken` | Yes. Retuning the Bootstrap alias to `serif` distinguishes bypassing that alias. | `font.test.ts:90`; `uf-mutations.log.txt:84` |
   | `monoliteral` | Yes. The resting stack comparison and alias/token retunes distinguish a literal stack. | `font.test.ts:90`; `uf-mutations.log.txt:92` |
   | `fluid` | Yes. The viewport comparisons and disjoint token retunes distinguish the fluid expressions. | `font.test.ts:27`; `font.test.ts:48`; `uf-mutations.log.txt:11` |
   | `literal` | Yes. The viewport comparisons distinguish differing defaults; token retunes distinguish every literal size. | `font.test.ts:27`; `font.test.ts:48`; `uf-mutations.log.txt:28` |
   | `fs6literal` | Yes. The retune distinguishes `1rem`, although the default viewport comparison correctly remains green. | `font.test.ts:48`; `uf-mutations.log.txt:48` |
   | `cap` | Yes. The wide-viewport comparisons distinguish the restored release caps. | `font.test.ts:27`; `uf-mutations.log.txt:56` |
   | `italicmissing` | Yes. The renamed class inherits the deliberately different oblique parent style. | `font.test.ts:155`; `uf-mutations.log.txt:126` |
   | `lighter100` | Yes. The parent-weight comparison and relative-weight control distinguish the absolute replacement under the heavier parent. | `font.test.ts:119`; `font.test.ts:136`; `uf-mutations.log.txt:100` |
   | `bolder700` | Yes. The same assertions distinguish the absolute replacement under the heavier parent. | `font.test.ts:119`; `font.test.ts:136`; `uf-mutations.log.txt:109` |
   | `normalmissing` | Yes. Under the heavier parent, inheritance differs from the recorded normal weight. | `font.test.ts:119`; `uf-mutations.log.txt:118` |
   | `lhsm` | Yes. The fixed-size factor assertion distinguishes the changed factor. | `font.test.ts:62`; `uf-mutations.log.txt:75` |
   | `lhliteral` | Yes. The body-line-token retune distinguishes the literal from the token reference. | `font.test.ts:76`; `uf-mutations.log.txt:67` |
   | `infixed` | Yes. The exhaustive selector lookup detects the added class outside the mounted sample. | `font.test.ts:193`; `uf-mutations.log.txt:187` |
   | `infixedsample` | Yes. The mounted sample’s computed value differs from its parent; the selector lookup also covers it. | `font.test.ts:170`; `uf-mutations.log.txt:195` |
   | `moderule` | Yes. The dark-island reading differs from the light reading. | `font.test.ts:212`; `uf-mutations.log.txt:171` |
   | `density` | Yes. Doubling the density token changes the mutated line height. | `font.test.ts:212`; `uf-mutations.log.txt:179` |
   | `reorder` | Yes. Opposing classes on the same elements resolve against the asserted source order. | `font.test.ts:238`; `uf-mutations.log.txt:146` |
   | `normal` | Yes. The inline style, later unlayered consumer rule, and important escape expose the dropped priority. | `font.test.ts:238`; `font.test.ts:265`; `font.test.ts:286`; `uf-mutations.log.txt:136` |
   | `elementslayer` | Yes, for the recorded mutation, which also removes importance. The heading/display assertions distinguish that combined edit. | `font.test.ts:250`; `uf-mutations.log.txt:162` |
   | `unlayered` | Yes. The later unlayered important override wins after the utility leaves its layer. | `font.test.ts:286`; `uf-mutations.log.txt:154` |
   | `absent` | Yes. Positive value and retune assertions distinguish the absent partial. The absence-of-infixed-classes assertion correctly remains green. | `font.test.ts:27`; `uf-mutations.log.txt:205` |
   | `section` | Yes. The independent expected specimen list distinguishes deletion from the source table. | `TypeSection.test.ts:18`; `uf-mutations.log.txt:242` |
   | `ledger` | Yes. The measured-versus-recorded comparison detects the removed departure tables. | `conformance.test.ts:246`; `uf-mutations.log.txt:251` |
   | `tablevalue` | Yes. The inventory comparison detects the changed line-height value. | `uf-shared.patch:178`; `uf-mutations.log.txt:260` |
   | `entryrow` | Yes. The inventory-derived key population detects the removed style entry. | `uf-shared.patch:199`; `uf-mutations.log.txt:269` |
   | `entryproperty` | Yes. The recorded declaration-property comparison detects the incorrect property. | `uf-shared.patch:213`; `uf-mutations.log.txt:278` |

   The report correctly states that dropping importance alone leaves the heading-override case green. Its omission from the failing cases is consistent with normal utilities outranking normal components. The elements-layer mutation proves the recorded combined edit fails; it does not independently prove that moving still-important declarations into that layer fails.

4. **CONFIRMED — Heading scale.** The preserved-fluid-scale attack fails against the governing decision: [design verdict R7](/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md:88) expressly requires dropping the fluid formula and cap. The styles rules permit these existing token references in the utilities layer.

   The viewport proof uses the heading cases and compares each utility with its heading class and the expected size. The retune proof uses the existing heading-token cases with values disjoint from the defaults. Evidence: [font.test.ts:27](/home/user/veneer-uf/tests/src/styles/utilities/font.test.ts:27), [font.test.ts:48](/home/user/veneer-uf/tests/src/styles/utilities/font.test.ts:48), [heading cases:2586](/home/user/veneer-uf/tests/setupStyles.ts:2586), and [retune cases:2614](/home/user/veneer-uf/tests/setupStyles.ts:2614). The `fluid`, `literal`, `fs6literal`, and `cap` mutations distinguish these assertions, as recorded under claim 3.

5. **CONFIRMED — Tailwind names.** The hidden-collision attack failed. I compiled the inventory-derived unit names with the installed Tailwind 4.3.3 PostCSS plugin without writing files. It emitted the `font-mono`, `italic`, and `leading-6` controls and no unit class. This agrees with [uf-tailwind-probe.log.txt:17](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-tailwind-probe.log.txt:17).

   The exclusion copies and markup fixture remain unchanged from the base. The `tailwind-line` mutation is distinguished: adding the nonshared name makes the exclusion-set equality fail. Evidence: [consumer assertion:118](/home/user/veneer-uf/tests/service/tailwind/consumer.test.ts:118), [partial-importance assertion:223](/home/user/veneer-uf/tests/service/tailwind/consumer.test.ts:223), and [mutation log:287](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-mutations.log.txt:287).

6. **CONFIRMED — Specimens and registries.** The missing-specimen and self-comparison attacks failed. The section proof compares rendered names and markup with the source table, then independently checks the expected names, markup, and element sequence. Its expected arrays are assertions, not an iterated specimen-case population. Removing the specimens reddens the named case. Evidence: [TypeSection.test.ts:15](/home/user/veneer-uf/tests/app/browser/sections/TypeSection.test.ts:15) and [mutation log:242](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-mutations.log.txt:242).

   The proposed specimens use shipped classes plus the font utilities and contain no inline styles. Each capture row selects a present element and reads the property its utility declares. The barrel, shipped-key list, order mapping, and compatibility set agree. Evidence: [registry patch:286](/home/user/scaffold/.orkestrel/veneer/units/uf-shared.patch:286) and [specimen patch:346](/home/user/scaffold/.orkestrel/veneer/units/uf-shared.patch:346).

   The exported font tables are frozen. The binding predicate independently derives the expected font keys from the inventory; I evaluated that predicate against the pinned inventory and obtained the claimed keys. The `tablevalue`, `entryrow`, and `entryproperty` mutations distinguish the binding assertions. The parent-weight table supplies browser controls rather than release inventory values.

7. **BROKEN — Guide truth.** The added Showcase sentence falsely says the utilities share the display classes’ sizes. Evidence: [uf-shared.patch:503](/home/user/scaffold/.orkestrel/veneer/units/uf-shared.patch:503).

   **Failing state:** with the default tokens, the compiled `.fs-1` rule reads `--vn-size-8`, whose value is `2.25rem`; `.display-1` reads `--vn-display-1`, whose value is `5rem`. I reproduced these declarations by compiling the token, type, and font partials in memory. Evidence: [type partial:29](/home/user/veneer-uf/src/styles/components/_type.scss:29) and [tokens:263](/home/user/veneer-uf/src/styles/_tokens.scss:263).

   **Smallest fix:** restrict the shared-scale statement to the heading classes. Preserve the display scale and the utility’s ability to override a display class. The guide’s placement, departure rows, compatibility rows, proof link, and distinct “Font utilities” heading otherwise withstand the checks.

8. **BROKEN — Law and report.** The binding proof introduces an inline case matrix of key, property, and table tuples at [uf-shared.patch:178](/home/user/scaffold/.orkestrel/veneer/units/uf-shared.patch:178). The testing rule requires case matrices in setup modules at any size. **Smallest fix:** export and freeze that matrix in the setup module, then iterate it in the proof. Keep the independent inventory comparisons.

   The prose-compliance claim also fails. The comment at [font.test.ts:194](/home/user/veneer-uf/tests/src/styles/utilities/font.test.ts:194) uses “above” as a cross-reference; [report:140](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-uf-report.md:140) uses “now”; and the added guide text counts “first four sizes” and “two parent weights.” **Smallest fix:** use the named cases, classes, or weights and remove the prohibited temporal wording.

   The forbidden-TypeScript and dependency-duplication attacks found no defect in the additions. The unit introduces tables rather than replacement helpers. The retained [gate log:1](/home/user/scaffold/.orkestrel/veneer/units/uf-instruments/uf-gates.log.txt:1), formatting log, and lint log support the reported scoped gate results. These are retained runs, not gates executed by this audit.

   **Outside-claim finding REPORT-COUNTS — BROKEN.** The report adds gratuitous size summaries despite the writing contract’s count prohibition, including “54 lines,” “298 lines,” and “five entries” at [report:10](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-uf-report.md:10). Remove those prose summaries; preserve measurements the brief expressly requires beside their commands. This finding does not dispute the numeric test results.

   The requested record of the report’s counts follows. References identify lines in `b-utilities-uf-report.md`; versions, identifiers, viewport widths, CSS values, durations, and exit codes are not counted here.

   | Report location | Counts stated |
   | --- | --- |
   | `:10–17` | 54 lines; five entries; one walk; 298 lines; 28 cases; +39 lines; one line; diffstat values 2 and 39; two added files; 8 changed files; 316 insertions; 4 deletions. |
   | `:28–29` | 22 passed; 18 passed. |
   | `:37` | 27 failed; 1 passed; total 28; “the one that passed”; 28 passed after restoration. |
   | `:38–40` | Five removed specimens; 1 failed and 1 passed; 2 passed; 1 failed and 21 passed; 22 passed; one changed table value, one removed entry row, one changed row property; 1 failed for each binding mutation. |
   | `:44` | 24 inventory records; 20 unconditioned selectors; 4 conditioned records; 20 cascade rules; one declaration per rule. |
   | `:50–59` | Mutation failures: 1 each; 10 and 13; 13 and 1; 4; 3; 2, 2, and 1; 2; 1; 1 each; 1 each. Also “the same two cases,” 7 weight records, and two parent weights. |
   | `:61` | 0 failed; 28 passed. |
   | `:65–68` | Two classes in the precedence-case title; mutation failures of 1, 3, 2, and 1. |
   | `:83–88` | 20 candidate names, repeated for the direct compile; 2 failed and 16 passed. |
   | `:101` | One departure row for each named capped level. |
   | `:114` | 20 selectors; exactly one inventory key per selector. |
   | `:121–127` | 353 formatted files; 24 inventory records; 20 cascade rules; 28 passed; 93 style files and 1087 tests; 7 section-related tests; 40 application files and 112 tests; 22 conformance tests; 18 service tests. |
   | `:130–133` | 267 setup tests; two earlier runs; 4 processor cores; one timeout per earlier run; 109 passed and 1 skipped; 176 journey tests; five capture rows. |
   | `:141–146` | One representative class per entry; one class and one longhand in the binding description; three scratchpad items; two scratchpad files. |
   | `:151–153` | One Showcase sentence; five compatibility keys. |

   **Attacked and held:** the default `.fs-6` literal agrees with its token’s default, so the viewport case correctly stays green while the retune fails. Removing the partial correctly leaves the absence-of-infixed-classes case green. Removing importance correctly leaves the heading-override case green while the priority cases fail. The corresponding attacks and retained log references appear under claim 3; none establishes a defect in those adjacent behaviors.

VERDICT: FAIL 7, 8; outside the claims: REPORT-COUNTS