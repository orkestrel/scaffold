1. **CONFIRMED — Scope and gates.** The live owned and shared diffs equal `apt-3.diff` and `apt-shared-3.patch`; the live status matches [apt-3-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/apt-3-status.txt:1), with only authorized paths. Comparing the `src/` hunks against round 2 produces equality; an in-memory changed-factor control fails that comparison. Searching `src/`, `tests/`, and `guides/` finds no `(^|[^-])fluid\(` match. The retained comparison and search agree: `apt-instruments-3/apt-3-src-hunks.log.txt:1` and `apt-3-grep-fluid.log.txt:2`. Each gate log ends on exit 0, with the reported test results listed under claim 6.

2. **CONFIRMED — J3 and J5.** The attempted counterexample was the fixed 1rem row. “Applies the responsive rule” correctly describes that row, without claiming it shrinks. [mixins.test.ts:233](/home/user/veneer-apt/tests/src/styles/mixins.test.ts:233) names the font-size mixin, as does [setupStyles.ts:2211](/home/user/veneer-apt/tests/setupStyles.ts:2211).

   Executed arithmetic for the table’s rows at 390, 1199, 1200, and 1280 gives:

   | Size and root | Resolved sizes, px |
   |---|---|
   | 3rem, 16px | 30.99, 47.979, 48, 48 |
   | 1rem, 16px | 16, 16, 16, 16 |
   | 2.25rem, 20px | 32.85, 44.985, 45, 45 |

   The assertions distinguish removal of the guard for the 1rem row: 18.43 versus 16 at 390 (`apt-instruments-2/apt-2-mutation-guard.log.txt:530`). Removing the cap distinguishes the other rows: 49.68 versus 48 and 46.2 versus 45 at 1280 (`apt-2-mutation-cap.log.txt:555`, `:573`). The fixed row correctly survives cap mutations. Bootstrap’s compiled `.display-5` and `.fs-6` values also agree with the corresponding default-root calculations (`node_modules/bootstrap/dist/css/bootstrap.css:651`, `:8386`).

3. **CONFIRMED — J2.** [guides/veneer.md:6169](/home/user/veneer-apt/guides/veneer.md:6169) names `_font.scss` explicitly. The precedence sentence at `:6190` agrees with [dist/src/styles/index.css:1](/home/user/veneer-apt/dist/src/styles/index.css:1): `.fs-6` supplies the important expression over `--vn-size-3`, then its important token cap from 1200px; `.h1` supplies a normal declaration.

   The previous counterexample no longer breaks the sentence. Evaluating the compiled expression and the oracle at [setupStyles.ts:1186](/home/user/veneer-apt/tests/setupStyles.ts:1186) gives 24.71px at 390 and 32px at 1280 for a 32px token. A 106px retune gives 53.755px and 106px. Tokens at or below the floor remain fixed. The former “resolves the token’s value” wording fails the 32px/390 control; “responsive size derived from” holds.

   The assertions distinguish the `important` mutation, including the display override and layer escape (`apt-instruments-2/apt-2-mutation-important.log.txt:701`, `:725`).

4. **CONFIRMED — J4.** The attempted refutation was a width or case claimed without a corresponding assertion. [guides/veneer.md:6195](/home/user/veneer-apt/guides/veneer.md:6195) accurately describes the default comparisons, retuned comparisons, and heading-tag case at [font.test.ts:28](/home/user/veneer-apt/tests/src/styles/utilities/font.test.ts:28), `:63`, and `:100`, using the width tables at `setupStyles.ts:2199` and `:2208`.

   The paragraph’s “It also reads” sentence correctly separates the remaining cases; it does not claim their execution at every listed width. The override and layer-escape cases still visit 1280 only. Their assertions distinguish `important`; the heading-tag assertion distinguishes `guard` (`apt-2-mutation-guard.log.txt:630`). No unsupported width claim remains.

5. **CONFIRMED — J1’s table and mutation mappings.** Attempts to reproduce the previous wrong attributions failed. The failing-first table at [ap-type-report-3.md:50](/home/user/scaffold/.orkestrel/veneer/units/ap-type-report-3.md:50) matches the retained readings:

   | Baseline-passing proof | Mutation, distinguishing reading, and log |
   |---|---|
   | Default legend | `cap` and `xxl-cap`: 24.24px versus 24px at 1280 (`apt-2-mutation-cap.log.txt:971`; `apt-2-mutation-xxl-cap.log.txt:1012`). `xxl`: 21.4029 versus 21.57 at 390 (`apt-2-mutation-xxl.log.txt:1004`). |
   | Display override | `important` and `xxl-cap`: 30.6px versus 30px; `xxl`: 29.2286px versus 30px, at 1280 (`important:702`; `xxl-cap:1259`; `xxl:1224`). |
   | Layer escape | `important` and `xxl-cap`: 24.24px versus 24px; `xxl`: 23.6914px versus 24px, at 1280 (`important:726`; `xxl-cap:1283`; `xxl:1248`). |
   | Later-value case | `guard`: 18.358px versus 16px (`guard:645`), distinguished by the exact assertion at `font.test.ts:306`. |
   | Retuned 12px `h6` | `guard`: 16.86 versus 12 at 390 (`guard:589`). |
   | `<h1 class="fs-6">` | `guard`: 18.43 versus 16 at 390 (`guard:631`). |
   | Default `.h5`, `.h6`, `.fs-5`, `.fs-6` | `guard`: 19.215 versus 18, or 18.43 versus 16, at 390 (`guard:545`, `:559`, `:603`, `:617`). |
   | Default `.h4`, `.fs-4` | No supplied mutation distinguishes these zero-excess defaults. Their survival is correctly described as regression coverage. |

   All abbreviated log references in this claim name `apt-instruments-2/apt-2-mutation-<name>.log.txt`.

   The mutation section also holds. `literal` distinguishes the heading-token declaration and retunes (`literal:530`, `:559`, `:577`); `literal-cap` distinguishes the capped retunes (`literal-cap:573`, `:591`). `cap` distinguishes the exact capped readings (`cap:556`, `:646`, `:971`). `xxl` and `xxl-cap` distinguish exactly the same failing test set, matching the report’s list at `:79`; their readings differ as reported. `guard` and `important` distinguish the cases listed in their rows.

   Each log records build exit 0, test exit 1, and byte-identical restoration. The remaining report sentence outside these mappings is addressed in F1.

6. **CONFIRMED — Law and prose in the diff.** Parsing the added TypeScript finds no prohibited `any`, assertion, non-null expression, nested function declaration, or assigned nested function. An in-memory control containing those constructs is detected. The added helper is exported from the centralized setup module at [setupStyles.ts:1186](/home/user/veneer-apt/tests/setupStyles.ts:1186); no hidden helper or suppression is added.

   Inspection of the added prose and retitled tests finds no prohibited count or banned term. The case titles describe their assertions. The case-insensitive substitution-term sweep covers added lines in `apt-3.diff` and `apt-shared-3.patch`; its planted banned-prose control matches. “Below” and “above” describe numerical positions, and “both” names its operands.

   The report’s test counts match these retained executions:

   | Execution | Reported result | Evidence |
   |---|---|---|
   | Baseline | 34 failed, 39 passed, 73 collected; separate mixin load failure | `apt-instruments-2/apt-2-baseline-proofs.log.txt:115`, `:162` |
   | `literal` | 3 failed of 119 | `apt-2-mutation-literal.log.txt:169` |
   | `literal-cap` | 2 failed of 119 | `apt-2-mutation-literal-cap.log.txt:198` |
   | `cap` | 38 failed of 119 | `apt-2-mutation-cap.log.txt:194` |
   | `xxl` | 40 failed of 119 | `apt-2-mutation-xxl.log.txt:235` |
   | `xxl-cap` | 40 failed of 119 | `apt-2-mutation-xxl-cap.log.txt:235` |
   | `guard` | 10 failed of 119 | `apt-2-mutation-guard.log.txt:169` |
   | `important` | 11 failed of 119 | `apt-2-mutation-important.log.txt:178` |
   | Styles | 1439 passed; exit 0 | `apt-instruments-3/apt-3-gate-test-src-styles.log.txt:8198`, `:8202` |
   | Setup | 320 passed; exit 0 | `apt-3-gate-test-setup.log.txt:32`, `:36` |
   | Conformance | 26 passed; exit 0 | `apt-3-gate-test-conformance.log.txt:11`, `:15` |
   | Guides | 20 passed; exit 0 | `apt-3-gate-test-guides.log.txt:11`, `:15` |
   | Format, lint, check | Exit 0 | `apt-3-gate-format-check.log.txt:9`; `apt-3-gate-lint-check.log.txt:5`; `apt-3-gate-check.log.txt:29` |

**F1 — BROKEN: the report misclassifies the remaining size readers.** [ap-type-report-3.md:61](/home/user/scaffold/.orkestrel/veneer/units/ap-type-report-3.md:61) says none of the remaining baseline-passing tests reads a size this unit changes. The mode/density case at [font.test.ts:274](/home/user/veneer-apt/tests/src/styles/utilities/font.test.ts:274) and unlayered-priority case at `:331` both read `font-size` through the `.fs-3` row at [setupStyles.ts:3434](/home/user/veneer-apt/tests/setupStyles.ts:3434).

The baseline log records both passing at `apt-2-baseline-proofs.log.txt:39` and `:42`. The base compiled `.fs-3` declaration resolves 24px; the changed compiled expression evaluates to 21.642px at 414px. These assertions compare relationships, so they correctly pass despite that changed reading. They also pass under the full `xxl` mutation (`apt-2-mutation-xxl.log.txt:155`, `:159`); they do not distinguish its size error.

The smallest fix is to describe these as relational size proofs whose assertions remain true under the supplied mutations. The production rule and those assertions need no change.

**Attacked and held:** zero-excess cases correctly survive boundary mutations; relational invariance tests correctly survive changes to the absolute size. Neither survival establishes that the tests read no changed size.

VERDICT: FAIL none; outside the claims: F1