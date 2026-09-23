## Verdict — UTIL-DISPLAY (`ud`) audit round 3, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/veneer-ud`, launched by `codex-queue-19.sh` after `ud-audit-3-analyst.sh`; journal `tmp/codex/ud-audit-3-analyst.jsonl` (swept at acceptance), thread id `01a0cfad-027a-7a73-a44d-c9251c73ec58`, started 19:10:14 UTC, ended 19:17:15 UTC, exit 0. The lane's returned message follows verbatim.

1. **UNRESOLVED — Delta and scope.** The content checks hold. The retained status matches round 2 and the worktree; the owned-file changes are confined to the label loop, matrix import, and describe title. The shared-patch changes are confined to the named sites, and the `CaptureStem` hunk is unchanged. Every patch index matches its base blob and reconstructed result. My read-only `git apply --check` against the worktree at `e4e6a40` exited 0.

   The claimed retained reverse-application log is missing from `ud-instruments-3/logs/`, including its launch copy. [apply-check.sh:11](/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-3/tools/apply-check.sh:11) specifies the operation; [the report:96](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-ud-report-3.md:96) supplies only the writer’s result. Retain the actual output showing reversal, owned-file removal, clean status, base-tree equality, and successful application check to settle that part.

2. **CONFIRMED — The label loop.** The trailing-label attack fails at the intended assertion. [FlexSection.test.ts:53](/home/user/veneer-ud/tests/app/browser/sections/FlexSection.test.ts:53) collects every selector match, rejects an empty collection, and checks each element’s or child’s exact text. [mutate.py:91](/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-3/tools/mutate.py:91) changes only the trailing fill label. [label-trailing-bare.log.txt:508](/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-3/logs/record/label-trailing-bare.log.txt:508) reports `['Fill']` failing to contain `flex-fill`; its mutation diff preserves the class. [control.log.txt:6](/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-3/logs/record/control.log.txt:6) records the passing control.

   I compared every preceding mutation’s retained round-3 result and failing case titles against round 2. They agree after the declared describe-title change. The assertions distinguish the mutations as follows; each named log is under `ud-instruments-3/logs/record/`.

   | Mutation and log | Distinguishing assertion |
   |---|---|
   | `print-omitted.log.txt`, `print-screen.log.txt` | The screen/print readings change only under the staged print medium, in `display.test.ts:75`. |
   | `print-before-walk.log.txt` | The print class must beat the widest responsive class at the tested viewport, in `display.test.ts:87`. |
   | `display-value-omitted.log.txt`, `display-breakpoint-omitted.log.txt` | Expected class values must replace the inline resting value at each applicable boundary, in `display.test.ts:35`. |
   | `display-walk-reversed.log.txt` | The wider-infix readings differ from the narrower-infix readings, in `display.test.ts:112`. |
   | `display-important-dropped.log.txt`, `flex-important-dropped.log.txt`, `align-important-dropped.log.txt` | The utilities must beat inline resting declarations and later unlayered declarations; the priority and escape assertions distinguish the shared mixin mutation. |
   | `display-mode-override.log.txt` | The dark-island display reading must remain `inline-flex`, in `display.test.ts:124`. |
   | `flex-initial-value.log.txt`, `flex-justify-initial.log.txt` | Expected computed values and constrained layouts differ from the substituted initial values, in `flex.test.ts:41` and its layout case. |
   | `flex-per-entry.log.txt` | A wider infix’s shorthand must override the narrower infix’s grow entry, in the cross-entry case in `flex.test.ts:145`. |
   | `flex-shrink-before-flex.log.txt` | The shrink reading must remain `0` after the shorthand, in the priority case in `flex.test.ts:199`. |
   | `align-initial-value.log.txt` | The expected middle value and distinct rendered line positions differ from baseline, in `vertical-align.test.ts:31` and `vertical-align.test.ts:95`. |
   | `align-responsive.log.txt` | The infixed class must leave the resting value unchanged and have no rule, in `vertical-align.test.ts:35`. |
   | `stack-display-dropped.log.txt`, `vstack-direction-dropped.log.txt`, `hstack-center-dropped.log.txt` | Computed stack properties and measured geometry distinguish the removals, in `stacks.test.ts:13`, `stacks.test.ts:32`, and `FlexSection.test.ts:123`. |
   | `stack-important.log.txt` | Utilities and unlayered consumer rules must override the normal stack declarations, in `stacks.test.ts:53` and `stacks.test.ts:86`. |
   | `stack-utilities-layer.log.txt` | Layer membership is asserted directly, in `stacks.test.ts:78`. |
   | `inline-style-added.log.txt` | Each section’s render case rejects a descendant style attribute, at line 24 of its section test. |
   | `section-residue-left.log.txt` | Destruction must leave only neighboring content, in `DisplaySection.test.ts:114` and `FlexSection.test.ts:142`. |
   | `label-bare.log.txt`, `label-trailing-bare.log.txt` | Exact full-class labels are required for every matched element, in `FlexSection.test.ts:58`. |

   Supporting wrap classes may retain prose labels: the matrix selects the demonstrated family, as the revised remark explicitly requires.

3. **CONFIRMED — The family matrix.** The extraction preserves the former matrix’s names, contexts, and properties. The table follows the resting values in [ud-shared-3.patch:1082](/home/user/scaffold/.orkestrel/veneer/units/ud-shared-3.patch:1082), and the consumer imports it without restating rows at [FlexSection.test.ts:7](/home/user/veneer-ud/tests/app/browser/sections/FlexSection.test.ts:7).

   The freeze assertions cover the outer table, entries, and property arrays at [ud-shared-3.patch:899](/home/user/scaffold/.orkestrel/veneer/units/ud-shared-3.patch:899). My in-memory controls replaced each frozen level with an unfrozen copy: the corresponding `Object.isFrozen` reading changed from true to false. Thus those assertions distinguish each mutation. The retained passing run is [setup/control.log.txt:5](/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-3/logs/setup/control.log.txt:5). The accepted inference choice preserves readonly properties and readonly arrays.

4. **BROKEN — The prefix derivation is misdescribed; the omission proof works.** [ud-shared-3.patch:867](/home/user/scaffold/.orkestrel/veneer/units/ud-shared-3.patch:867) returns the regular expression’s captured family prefix. It does not remove the final hyphenated segment. For the retained `.flex-row-reverse` selector at [inventory.json:89419](/home/user/veneer-ud/tests/fixtures/oracle/inventory.json:89419), the implementation returns `flex`; the claimed last-hyphen operation returns `flex-row`. My in-memory inventory comparison reproduced that difference, including the grow, shrink, column, and wrap prefixes.

   Correct the claim’s derivation clause to describe the captured family prefix. Preserve the implementation: splitting at the last hyphen would conflict with the table’s legitimate compound value keys.

   Every retained setup control fails at a distinguishing assertion in the binding case:

   | Control | Assertion and retained failure |
   |---|---|
   | Display values reordered | Ordered selector equality; `logs/setup/display-values-reordered.log.txt:148`. |
   | Alignment value dropped | Inventory selector equality; `logs/setup/align-value-dropped.log.txt:146`. |
   | Flex entry value changed | Selector/property/value equality; `logs/setup/flex-entry-value-changed.log.txt:150`. |
   | Resting declaration changed to a written value | The matching inventory declarations must be empty; `logs/setup/flex-resting-written.log.txt:146`. |
   | Flex table unfrozen | The table must be frozen; `logs/setup/flex-table-unfrozen.log.txt:140`. |
   | Order prefix omitted | Independently derived prefix equality; `logs/setup/flex-prefix-omitted.log.txt:146`. |

   These paths are under `ud-instruments-3/`. Each log records the binding case as the sole failure. The control passes in `logs/setup/control.log.txt:5`. Their restored setup-file digest also matches the setup file reconstructed from the returned patch. The earlier assertions remain present.

5. **CONFIRMED — TSDoc, remark, and title.** Comparing the prescribed text against the returned patch found no omission or substitution. [ud-shared-3.patch:1065](/home/user/scaffold/.orkestrel/veneer/units/ud-shared-3.patch:1065) carries the exact interface and member documentation. [ud-shared-3.patch:85](/home/user/scaffold/.orkestrel/veneer/units/ud-shared-3.patch:85) removes the item tally and includes the supporting-class sentence after the convention. [vertical-align.test.ts:12](/home/user/veneer-ud/tests/src/styles/utilities/vertical-align.test.ts:12) uses the prescribed title.

6. **BROKEN — The gate results agree, but the isolated-case attribution does not.** Every listed gate log records exit 0 and the stated result. The retained evidence under `ud-instruments-3/logs/gates/` is:

   | Log | Result evidence |
   |---|---|
   | `format-check.log.txt:9` | Correct formatting; exit 0 at line 11. |
   | `lint-check.log.txt:7` | Exit 0, no finding. |
   | `check.log.txt:31` | Exit 0, no diagnostic. |
   | `build-src.log.txt:59` | Exit 0 after the builds. |
   | `styles-proofs.log.txt:286` | 37 passed; exit 0 at line 290. |
   | `app-proofs.log.txt:148` | 11 passed; exit 0 at line 152. |
   | `test-guides.log.txt:13` | 19 passed; exit 0 at line 17. |
   | `test-policy.log.txt:13` | 109 passed, 1 skipped; exit 0 at line 17. |
   | `test-setup.log.txt:34` | 251 passed; exit 0 at line 38. |
   | `test-conformance.log.txt:13` | 22 passed; exit 0 at line 17. |
   | `conformance-verbose.log.txt:30` | 22 passed; exit 0 at line 34. |
   | `test-service.log.txt:26` | 18 passed; exit 0 at line 30. |

   [setup/control.log.txt:4](/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-3/logs/setup/control.log.txt:4) runs the entire setup-styles test file without a case filter. Its 110-passed reading belongs to that file, not the binding case alone. Correct that attribution in the claim and [report:82](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-ud-report-3.md:82). The mutation runs likewise execute that file, with only the binding case failing.

7. **BROKEN — Law and report.** The report violates the writing claim. Examples include “below” at [report:5](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-ud-report-3.md:5), “now” at lines 30 and 40, “new” at line 35, and “etc.” at line 129. Bare or possessive code tokens occur at lines 30–31, 48–50, and 125–129. These conflict with [writing.md:49](/home/user/scaffold/.claude/rules/writing.md:49) and its substitution table. Rewrite those sentences with the required nouns and permitted terms.

   The report records the collision and recovery narrative, but supplies no retained collision output or process listing supporting it. The final mutation results and matching restoration digests support the standing no-content-effect ruling; they do not establish the reported process history.

   The syntax attack found no prohibited type assertion, non-null assertion, or explicit `any` node in the owned and reconstructed patched TypeScript files. The delta adds tables and a data interface, not an exported helper duplicating the installed packages.

   **Outside-claim finding R-counts — Report tallies.** The report’s statement that it contains no growable-set count is false. The following records every count-bearing expression in the report, including permitted measurements:

   - Line 6: rebuilt “once”; line 122: “once more.”
   - Line 14: “one matching element.”
   - Line 49: “one-line interface doc” and “one-line doc.”
   - Line 52: quoted “three items.”
   - Lines 52–53: “one line,” describing the layout condition.
   - Line 87: “both the styles and sections commands,” explicitly naming the members.
   - Line 98: “index lines: 15; diff headers: 15,” attributed to the missing patch-check output.
   - Line 102: “a single unified diff.”
   - Lines 113 and 117: “two” concurrent processes; line 117 also says those processes were “both present.”
   - Lines 70–77: measured test results—37, 11, 19, 109 passed with 1 skipped out of 110, 251, 22, 22, and 18.
   - Line 83: the measured 110-passed setup-file result.

   The test measurements are supported by the cited logs. The layout condition and explicitly named styles/sections pairing are permitted. The matching-element and process tallies contradict the report’s no-count claim independently of those exceptions. Remove unnecessary tallies while preserving the mutation identity, recovery actions, and measured gate results. Round identifiers, source locations, exit codes, and digits within code identifiers are not population counts.

VERDICT: FAIL 1, 4, 6, 7; outside the claims: R-counts