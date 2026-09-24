# AP-TYPE audit round 2 — objective verdict (`analyst` on GPT-6 Astra, thread 01a0d571-bffe-7582-aa00-494d1693c5c5)

1. **CONFIRMED — Scope and gates.** The live status matches [apt-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/apt-2-status.txt:1), and every path is owned or shared. The live owned and shared diffs match the supplied artifacts. Attempts to find an unowned change, mismatched gate result, or prohibited command failed. The round-2 gate logs record the reported passing counts and exit 0: `apt-2-gate-test-src-styles.log.txt:8198`, `apt-2-gate-test-setup.log.txt:32`, `apt-2-gate-test-conformance.log.txt:11`, `apt-2-gate-test-guides.log.txt:11`, `apt-2-gate-format-check.log.txt:9`, `apt-2-gate-lint-check.log.txt:5`, and `apt-2-gate-check.log.txt:29`. Searching `apt-instruments-2/` found no forbidden build or formatter invocation. `build:src:styles` is the permitted adjacent case.

2. **BROKEN — G2’s universal proof description.** The override proof at [font.test.ts:312](/home/user/veneer-apt/tests/src/styles/utilities/font.test.ts:312) and layer-escape proof at [font.test.ts:352](/home/user/veneer-apt/tests/src/styles/utilities/font.test.ts:352) visit **1280 only** and contain no oracle comparison. Therefore, “at 1200 and 1280 every size proof” does not describe the assertions. A defect confined to those combinations at 1200 would escape those proofs.

   The exactness repair itself holds in the enumerated fluid proofs: their capped loops use exact strings and exact numeric oracle comparisons, while their fluid loops retain 390 and 1199. Executing the installed matchers rejects `"36.004px"` against `"36px"` and `36.004` against `36`; the former tolerance accepts that displacement. The `important` mutation also distinguishes the override proofs’ passing and failing readings at 1280, recorded in [apt-2-mutation-important.log.txt:701](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-important.log.txt:701) and `:725`. **Smallest fix:** restrict the claim to the enumerated fluid proofs; retain the existing exact override pins.

3. **CONFIRMED — G4 rename.** Comparing the source hunks of `apt.diff` and [apt-2.diff:1](/home/user/scaffold/.orkestrel/veneer/units/apt-2.diff:1), after normalizing the rename and comment wrapping, produces equality for every source partial. A changed-factor control fails that comparison. Searches of `src/`, `tests/`, and `guides/` find neither `fluid(` nor the old backticked function name. The declaration, calls, guide, and [computeFluidSize remarks:1177](/home/user/veneer-apt/tests/setupStyles.ts:1177) use `fluid-size`. The compiled cascades also retain identical declarations outside the intended typography changes.

4. **CONFIRMED — G4 continuity and floor.** The continuity blocks and their measurement maps are removed; their oracle readings remain. A cap displacement still fails the exact capped assertions, so deleting the redundant difference assertions loses no stated property. The `cap` mutation distinguishes the remaining assertions, including [fieldset.test.ts:42](/home/user/veneer-apt/tests/src/styles/elements/fieldset.test.ts:42), as recorded in [apt-2-mutation-cap.log.txt:969](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-cap.log.txt:969).

   [TEXT_FLOOR_CASES:1382](/home/user/veneer-apt/tests/setupStyles.ts:1382) uses `tag`, retains the 12px and 32px retunes, and is consumed by the property-named case at [heading.test.ts:68](/home/user/veneer-apt/tests/src/styles/elements/heading.test.ts:68). Removing the guard produces 16.86 instead of 12; the assertion distinguishes it in [apt-2-mutation-guard.log.txt:588](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-guard.log.txt:588).

5. **CONFIRMED — G5 matrix.** [FLUID_SIZE_CASES:2219](/home/user/veneer-apt/tests/setupStyles.ts:2219) is exported, documented, and frozen with frozen rows. [mixins.test.ts:238](/home/user/veneer-apt/tests/src/styles/mixins.test.ts:238) imports it rather than declaring an inline matrix. Registration and value/freeze assertions exist at `setupStyles.test.ts:406`, `:2948`, and `:2967`.

   Executing those assertion forms against the extracted table passes; removing its outer freeze or changing the 20px root to 16px fails. Thus the assertions distinguish those mutations. The retained setup execution passes in [apt-2-gate-test-setup.log.txt:32](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-test-setup.log.txt:32).

6. **BROKEN — G1 report accuracy.** The readings at [ap-type-report-2.md:87](/home/user/scaffold/.orkestrel/veneer/units/ap-type-report-2.md:87) cannot be attributed unchanged to “both `xxl` mutations.” The full `xxl` mutation records:
   
   - Default legend: **21.4029 versus 21.57 at 390**, in `apt-2-mutation-xxl.log.txt:1003`.
   - Display override: **29.2286px versus 30px at 1280**, at `:1223`.
   - Layer escape: **23.6914px versus 24px at 1280**, at `:1247`.

   Those assertions distinguish the mutation, but they do not produce the report’s 24.24px, 30.6px, and 24.24px readings. Those readings belong to the primary mutations named in the rows and to `xxl-cap`.

   The report also omits the conflicting-class size pin: it passes in [apt-2-baseline-proofs.log.txt:40](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-baseline-proofs.log.txt:40), then fails under the guard mutation with **18.358px versus 16px**, in [apt-2-mutation-guard.log.txt:644](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-guard.log.txt:644). **Smallest fix:** add that mapping and separate the full-`xxl` readings.

   The departure from the brief is justified: the guard mutation reddens `.h5`, `.h6`, `.fs-5`, and `.fs-6` at 390 (`guard` log `:544`, `:558`, `:602`, `:616`). The brief’s contrary statement is wrong. The `.h4` and `.fs-4` defaults remain unchanged under the supplied mutation set because their excess is zero.

7. **BROKEN — Mutation coverage wording.** [ap-type-report-2.md:113](/home/user/scaffold/.orkestrel/veneer/units/ap-type-report-2.md:113) says each boundary mutation reddens “every size proof.” Both logs explicitly pass the default `.h4`–`.h6` and `.fs-4`–`.fs-6` cases, the 12px floor case, `<h1 class="fs-6">`, and the 1rem mixin case. See `apt-2-mutation-xxl.log.txt:85`, `:128`, `:143`, `:168`, `:223`, and the corresponding lines in `apt-2-mutation-xxl-cap.log.txt`. Their assertions cannot distinguish these boundary mutations where the guarded excess is zero. **Smallest fix:** name the affected proofs instead of claiming universal failure.

   The mutations themselves reach distinguishing assertions as follows. Each cited log records build exit 0, test exit 1, and byte-identical restoration.

   | Mutation | Distinguishing assertion and reading | Log; restoration |
   |---|---|---|
   | `literal` | Yes: `.h1` and `.fs-1`, 36px versus 101px at 1200 | [literal:558](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-literal.log.txt:558); `:595` |
   | `literal-cap` | Yes: the same capped retunes | [literal-cap:572](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-literal-cap.log.txt:572); `:609–610` |
   | `cap` | Yes: display 83.6px versus 80px; legend 24.24px versus 24px at 1280 | [cap:645](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-cap.log.txt:645), `:969`; `:1218` |
   | `xxl` | Yes for affected sizes: `.h1` 33.9429px versus 36px at 1200 | [xxl:624](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-xxl.log.txt:624); `:1266–1267` |
   | `xxl-cap` | Yes for affected sizes: display 83.6px versus 80px at 1280 | [xxl-cap:686](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-xxl-cap.log.txt:686); `:1301–1302` |
   | `guard` | Yes: retuned `h6`, 16.86 versus 12 at 390 | [guard:588](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-guard.log.txt:588); `:661` |
   | `important` | Yes: `.fs-1`, 36.96px versus 36px at 1280 | [important:539](/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-important.log.txt:539); `:744` |

8. **BROKEN — G3 sentence accuracy.** The requested token-family, terminology, and walk edits are present at [guides/veneer.md:6154](/home/user/veneer-apt/guides/veneer.md:6154). However, `:6190–6191` still says an element carrying `.h1` and `.fs-6` resolves the size the `--vn-size-3` token carries, without a viewport or floor qualification.

   Counterexample: at 390px with `--vn-size-3: 32px`, the important `.fs-6` expression in [dist/src/styles/index.css:1](/home/user/veneer-apt/dist/src/styles/index.css:1) evaluates to **24.71px**, not 32px. Executing the compiled arithmetic and the independent oracle gives that same result. The default 16px token and capped widths correctly resolve the token directly. **Smallest fix:** say the element resolves the responsive size derived from `--vn-size-3`; preserve the correct precedence statement.

9. **CONFIRMED — Law.** Inspection of the added TypeScript syntax finds no prohibited assertion, `any`, non-null assertion, suppression, nested function declaration, or hidden test helper. An in-memory control containing those constructs is detected. Added and retitled cases name their tested properties, including [heading.test.ts:68](/home/user/veneer-apt/tests/src/styles/elements/heading.test.ts:68), [mixins.test.ts:239](/home/user/veneer-apt/tests/src/styles/mixins.test.ts:239), and [setupStyles.test.ts:1530](/home/user/veneer-apt/tests/setupStyles.test.ts:1530).

   The report’s run counts match the retained logs:
   
   - Baseline proofs: **34 failed, 39 passed, 73 collected**, plus the separately reported mixin load failure (`apt-2-baseline-proofs.log.txt:115`, `:162`).
   - Mutation failures, respectively: **3, 2, 38, 40, 40, 10, 11 of 119** (`literal:169`, `literal-cap:198`, `cap:194`, `xxl:235`, `xxl-cap:236`, `guard:169`, `important:178`).
   - Final owned proofs: **119 passed** (`apt-2-proofs.log.txt:480`).
   - Final gates: styles **1439**, setup **320**, conformance **26**, guides **20** passed, at the gate-log locations in claim 1.

Findings outside the claims: none.

Attacked and held: the zero-excess cases correctly survive cap and boundary mutations; that survival limits the report’s coverage claim rather than indicating a production defect. The unchanged default legend cannot distinguish the former formula from the shared rule; its 40px retune does, recording 35.17 versus 27.85 at 390 in `apt-2-baseline-proofs.log.txt:112`.

VERDICT: FAIL 2, 6, 7, 8; outside the claims: none