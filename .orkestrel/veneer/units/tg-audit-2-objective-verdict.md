## Verdict — TOGGLES (`tg`) audit round 2, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/veneer-tg`, launched by `codex-queue-14.sh` after `tg-audit-2-analyst.sh`; journal `tmp/codex/tg-audit-2-analyst.jsonl` (swept at acceptance), thread id `01a0cf83-a371-7051-8691-c664b8aa7efa`, started 18:25:05 UTC, ended 18:34:01 UTC, exit 0. The lane's returned message follows verbatim.

1. **CONFIRMED — Delta and scope.** The live status and diff match `tg-2-status.txt:1` and `tg-2.diff:1` byte-for-byte. Only the owned files changed. The input-group partial’s diff is identical to round 1.

   The shared patch’s base hashes match the `a658879` blobs, its SHA-256 matches the report, and `git apply --check --verbose` exits 0. Comparing the reconstructed shared files between rounds found the specified changes; the capture registry is unchanged. The unauthorized-file, stale-base, and unintended-guide-edit attacks failed. Evidence: `tg-shared-2.patch:1`, `:106`, `:1040`, and `:1367`.

2. **CONFIRMED — Guide corrections.** The reconstructed round-to-round guide comparison contains the prescribed corrections and the reported wrapping. The calculation expressions have their value nouns; the validation sentence names its class; the dropdown explanation uses separate sentences; and the button-group opening names the split toggle.

   The attack for an omitted correction or unrelated sentence change failed. Evidence: `tg-shared-2.patch:133`, `:167`, `:196`, `:208`, and `:218`. The navigation wording remains subject to the explicitly assigned landing reconciliation.

3. **UNRESOLVED — Doc blocks, comments, and the reported empty-toggle probe.** The requested text and menu classes are present at `tg-shared-2.patch:22`, `:79`, `:96`, and `:101`; `src/styles/components/_button-group.scss:94`; and `tests/src/styles/components/button-group.test.ts:204` and `:318`.

   The corrected caret limit agrees with an in-memory compilation. Empty-toggle rules clear the `::after` margin; the dropstart caret uses the `::before` margin. Removing the dropstart split rule removes its reset while leaving the dropdown margin declaration. The retained text-bearing assertion distinguishes that mutation: `tg-instruments-2/logs/mutation-dropstart-caret-rule-omitted.log.txt:94` reports `3.57` against `0`.

   However, the exact **empty-toggle runtime readings** have only the writer’s report as evidence: `b-collapse-tg-report-2.md:117`. Neither the probe nor its output is retained in the supplied instrument directories. The existing caret assertions deliberately use text-bearing toggles. Retaining the empty-toggle probe’s source and output, or rerunning that probe on the host, would settle this portion. The corrected CSS explanation is not falsified.

4. **CONFIRMED — Case tables and their controls.** Evaluating the patched declarations in memory confirmed the required placement, derivation, rows, and recursive freezing. Reproducing the binding comparisons against the inventory and capture registry passed. Reordering each moved table broke its comparison; mutable copies failed the freeze condition.

   The binding assertions compare padding classes and values, caret selectors and declarations, specimen names and sized selectors, and toggle corners against independent recorded data. Evidence: `tg-shared-2.patch:1125`, `:1280`, `:1401`, `:1444`, `:1526`, and `:1563`.

   I read every following control log under `tg-instruments-2/logs/`. Each records `1 failed | 113 passed (114)` on the reported case.

   | Control | Distinguishing assertion | Log evidence |
   | --- | --- | --- |
   | `split-cases-reordered` | Padding classes disagree with inventory order. | `mutation-split-cases-reordered.log.txt:9`, `:48` |
   | `split-cases-unfrozen` | Split table fails its freeze assertion. | `mutation-split-cases-unfrozen.log.txt:9`, `:30` |
   | `caret-cases-reordered` | Caret selectors disagree with inventory order. | `mutation-caret-cases-reordered.log.txt:9`, `:72` |
   | `caret-cases-unfrozen` | Caret rows fail their freeze assertion. | `mutation-caret-cases-unfrozen.log.txt:9`, `:30` |
   | `toggle-cases-reordered` | Group and feedback combinations disagree with the declared case order. | `mutation-toggle-cases-reordered.log.txt:9`, `:44` |
   | `toggle-cases-unfrozen` | Toggle table fails its freeze assertion. | `mutation-toggle-cases-unfrozen.log.txt:9`, `:30` |
   | `forms-reordered` | Specimen names disagree with capture-registry order. | `mutation-forms-reordered.log.txt:9`, `:35` |
   | `forms-unfrozen` | Selector list fails its freeze assertion. | `mutation-forms-unfrozen.log.txt:9`, `:30` |

   The styles and section consumers import the tables without restating their rows. The input-group section derives subjects from rendered toggle specimens, filters the registry, and compares the resulting subjects with that population at `tests/app/browser/sections/InputGroupSection.test.ts:134`. The unmutated setup run records `114 passed (114)` at `gate-setup.log.txt:8`.

5. **CONFIRMED — Guard and mutation readings.** The leading-split case guards indexed elements at `tests/src/styles/components/button-group.test.ts:356`. Comparing the retained mutation logs between rounds confirms the reported readings and padding-label changes.

   Every following assertion distinguishes its mutation from the passing case. Log filenames resolve under `tg-instruments-2/logs/`.

   | Mutation | Distinguishing result | Log evidence |
   | --- | --- | --- |
   | `first-child-selector-dropped` | Leading corners become `[6,6,6,6]` instead of `[6,0,0,6]`. | `mutation-first-child-selector-dropped.log.txt:94` |
   | `base-padding-omitted` | Base leading padding becomes `12` instead of `9`. | `mutation-base-padding-omitted.log.txt:99` |
   | `padding-literal` | Density override leaves padding at `9` instead of `18`. | `mutation-padding-literal.log.txt:94` |
   | `small-button-form-omitted` | Small leading padding becomes `9` instead of `6`. | `mutation-small-button-form-omitted.log.txt:93` |
   | `small-group-form-omitted` | Small-group leading padding becomes `9` instead of `6`. | `mutation-small-group-form-omitted.log.txt:105` |
   | `large-button-form-omitted` | Large leading padding becomes `9` instead of `12`. | `mutation-large-button-form-omitted.log.txt:112` |
   | `large-group-form-omitted` | Large-group leading padding becomes `9` instead of `12`. | `mutation-large-group-form-omitted.log.txt:113` |
   | `large-step-reads-base` | Large leading padding becomes `9` instead of `12`. | `mutation-large-step-reads-base.log.txt:94` |
   | `plain-caret-rule-omitted` | Caret margin becomes `3.57` instead of `0`. | `mutation-plain-caret-rule-omitted.log.txt:94` |
   | `dropup-caret-rule-omitted` | Caret margin becomes `3.57` instead of `0`. | `mutation-dropup-caret-rule-omitted.log.txt:94` |
   | `dropend-caret-rule-omitted` | Caret margin becomes `3.57` instead of `0`. | `mutation-dropend-caret-rule-omitted.log.txt:94` |
   | `dropstart-caret-rule-omitted` | Caret margin becomes `3.57` instead of `0`. | `mutation-dropstart-caret-rule-omitted.log.txt:94` |
   | `plain-toggle-count-left-out` | The plain group’s leading toggle retains trailing radii. | `mutation-plain-toggle-count-left-out.log.txt:94` |
   | `validated-toggle-count-left-out` | The validated group’s leading toggle retains trailing radii. | `mutation-validated-toggle-count-left-out.log.txt:99` |
   | `dropstart-toggle-after-action` | The required leading-toggle selector is absent. | `mutation-dropstart-toggle-after-action.log.txt:80` |
   | `dropstart-action-removed` | The following-action assertion receives `undefined`. | `mutation-dropstart-action-removed.log.txt:80` |
   | `group-size-on-buttons` | The disjointness assertion receives `shared: 1` instead of `0`. | `mutation-group-size-on-buttons.log.txt:84` |
   | `trailing-toggle-kept-count-broken` | Matching becomes `[true,true]` instead of `[true,false]`. | `mutation-trailing-toggle-kept-count-broken.log.txt:10` |

   Each log records the named test failing, rather than a collection or build failure. The small-form mutations remove their selector form across the size loop; the separately executed large-form mutations distinguish the large cases.

   The sized-toggle gap does **not** leave a recorded selector unproved. Adding a size class only to the toggle does not make its preceding action button satisfy the button-size selector. The styles fixture independently mounts unsized buttons inside sized groups, and the group-form removal mutations still fail. Evidence: `tests/src/styles/components/button-group.test.ts:270`, `src/styles/components/_button-group.scss:97`, and the group-form logs cited here.

   The unmutated controls record `61 passed (61)` and `9 passed (9)` at `gate-styles.log.txt:147` and `gate-sections.log.txt:78`. The case titles remain unchanged.

6. **CONFIRMED — Gates.** The retained final validation-copy logs contain the commands and results the report states. The wrong-command, nonzero-exit, and mismatched-result attacks failed.

   | Gate | Recorded result | Evidence under `tg-instruments-2/logs/` |
   | --- | --- | --- |
   | Formatting | Correct format; exit `0`. | `gate-format.log.txt:8`, `:10` |
   | Lint | No findings; exit `0`. | `gate-lint.log.txt:1`, `:6` |
   | Type checks | Exit `0`. | `gate-check.log.txt:30` |
   | Source build | Exit `0`. | `gate-build.log.txt:58` |
   | Setup | `114 passed (114)`; exit `0`. | `gate-setup.log.txt:8`, `:12` |
   | Styles | `61 passed (61)`; exit `0`. | `gate-styles.log.txt:147`, `:151` |
   | Sections | `9 passed (9)`; exit `0`. | `gate-sections.log.txt:78`, `:82` |
   | Conformance | `22 passed (22)`; exit `0`. | `gate-conformance.log.txt:12`, `:16` |
   | Guides | `19 passed (19)`; exit `0`. | `gate-guides.log.txt:12`, `:16` |
   | Policy | `109 passed | 1 skipped (110)`; exit `0`. | `gate-policy.log.txt:12`, `:16` |

   These are retained host executions. No Vitest project or browser was rerun in this sandbox.

7. **BROKEN — Writing law and report.** The delivered text still violates the writing contract:

   - `b-collapse-tg-report-2.md:229` says “Every run above,” using the prohibited cross-reference.
   - `tg-shared-2.patch:1522` identifies a table entry as “The last row.” Name the unvalidated-with-feedback row.
   - The added TSDoc uses bare field tokens followed by verbs at `tg-shared-2.patch:1394`, `:1439`, and `:1517`. Give the tokens their field nouns.
   - The corrected caret comment still omits nouns after property and pseudo-element tokens at `tests/src/styles/components/button-group.test.ts:319` and `:321`.

   These are direct textual counterexamples to the universal writing claim. The smallest correction changes the wording without changing assertions, table rows, or styles.

   The code restrictions held: TypeScript AST inspection found no prohibited type construct in the affected TypeScript files; the delta adds no suppression, mock, or prohibited nested function. The added exports are data tables, not helpers duplicating installed primitives. The report’s gate commands and readings match the retained logs.

   **Outside finding REPORT-COUNTS — BROKEN.** `b-collapse-tg-report-2.md:13` says “One reading moved,” despite its no-tally assertion at `:197` and the rule at `/home/user/scaffold/AGENTS.md:172`. Name the `group-size-on-buttons` mutation’s changed reading directly.

   The report’s count record is:

   - Owned diffstat, `:31` through `:37`: `42, 7, 82, 57, 142, 31`; `6 files`, `347 insertions`, `14 deletions`.
   - Mutation result, `:229`: `1 failed`.
   - Table-control results, `:236` through `:243`: `1 failed | 113 passed (114)` for each named control.
   - Setup, styles, sections, conformance, guides, and policy results, `:264` through `:269`: `114 passed (114)`, `61 passed (61)`, `9 passed (9)`, `22 passed (22)`, `19 passed (19)`, and `109 passed | 1 skipped (110)`.
   - Patch length, `:275`: `1575 lines`.
   - Shared diffstat, `:283` through `:288`: `59, 772, 42, 192, 156`; `5 files`, `801 insertions`, `420 deletions`.
   - Disjointness readings, `:218` and `:313`: expected `0`, received `1`.
   - Historical text quoted at `:102`, `:334`, and `:335`: “both forms,” “the sized pair,” “one size list,” “the one position,” and “The dropdown pair.”
   - Mapping or artifact cardinalities at `:140`, `:255`, `:277`, `:319`, `:324`, and `:325`: a corner row per toggle, a log per gate, a unified diff, a derivation home, and a row per group.

   Command-associated measurements and fixed mapping arities are distinct from the continuing prose tally. The historical quotations document replaced text. Calculation factors, selector thresholds, pixel readings, versions, exit codes, and claim identifiers are values rather than additional population tallies.

**Attacked and held.** The per-row padding comparison detects fallback to base padding without the removed filter. Empty plain, dropup, and dropend toggles correctly mask their `::after` margin resets; that behavior does not extend to dropstart. A size class on a sized group’s action button creates selector overlap, whereas the same class on its toggle alone does not.

VERDICT: FAIL 3, 7; outside the claims: REPORT-COUNTS