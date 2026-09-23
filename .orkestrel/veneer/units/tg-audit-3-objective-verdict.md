## Verdict — TOGGLES (`tg`) audit round 3, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/veneer-tg`, launched by `codex-queue-20.sh` after `tg-audit-3-analyst.sh`; journal `tmp/codex/tg-audit-3-analyst.jsonl` (swept at acceptance), thread id `01a0cfb3-7ed2-7be1-8983-bfebc3fc397e`, started 19:17:21 UTC, ended 19:25:53 UTC, exit 0. The lane's returned message follows verbatim.

1. **CONFIRMED — Delta and scope.** Artifact citations resolve under `/home/user/scaffold/.orkestrel/veneer/units/`; source citations resolve under `/home/user/veneer-tg`.

   Attacked with a live status comparison, a byte comparison of the live diff against `tg-3.diff`, comparisons against the round-2 artifacts, verification of the patch’s base and target blob hashes, and `git apply --check --verbose`. The apply check exited 0. The owned-file population matches `tg-3-status.txt:1`; the only round-3 owned-file changes are the specified comments, rename, and adopted case (`tg-3.diff:52`, `tg-3.diff:394`). The shared changes are confined to the specified sites. No forbidden path appears.

2. **CONFIRMED — Guide and constants.** Attacked by reconstructing the patched files in memory and comparing their words and hunks against round 2. The opening paragraph’s words are unchanged and its lines stay within 100 columns (`tg-shared-3.patch:207`). The corners sentence matches the prescription (`tg-shared-3.patch:224`). The specimen blocks carry the state noun (`tg-shared-3.patch:24`, `tg-shared-3.patch:87`). The remaining guide and constants changes match round 2.

3. **BROKEN — The rename is complete, but the required search output is absent.** The report supplies a search command and a characterization of its results, without the matching output lines (`b-collapse-tg-report-3.md:73`). That does not satisfy the claim’s “command and output” clause. Smallest fix: record the actual output and identify the unrelated prose matches.

   The implementation withstands the attack. The table uses the `margin` field (`tg-shared-3.patch:1578`); the binding case uses the prescribed title, destructuring, and declaration (`tg-shared-3.patch:1131`, `tg-shared-3.patch:1167`); the browser case passes that field to each reader (`tests/src/styles/components/button-group.test.ts:326`). Remaining “side” matches describe layout or border geometry.

   As a negative control, pairing the round-3 consumers with the round-2 table produces TS2339 at `button-group.test.ts:327`: the `margin` property does not exist. The same read-only, in-memory TypeScript check with the round-3 shared patch produces no diagnostics.

4. **CONFIRMED — Field nouns and comments.** Attacked by comparing the prescribed remarks and comments with the resulting text and measuring their line lengths. The remarks match the brief and fit its wrapping limit (`tg-shared-3.patch:1399`, `tg-shared-3.patch:1445`, `tg-shared-3.patch:1524`, `tg-shared-3.patch:1565`). The size-loop comment matches the prescription (`src/styles/components/_button-group.scss:93`). The caret comment supplies the required nouns and correctly separates the empty-toggle rule from the dropstart split rule (`tests/src/styles/components/button-group.test.ts:318`; `src/styles/components/_dropdown.scss:111`).

5. **CONFIRMED — Adopted empty-toggle probe.** The case immediately follows the parameterized caret case and contains the specified markup, guards, and assertions (`tests/src/styles/components/button-group.test.ts:345`).

   The distinguishing mutation removes the dropstart split-caret rule; its edit matches the existing dropstart mutation and its filter selects the adopted case (`tg-instruments-3/mutate.py:35`). The assertions distinguish it: the plain-toggle reference remains valid, while the split-toggle assertion receives `3.57` instead of `0`. Read: `tg-instruments-3/logs/mutation-dropstart-caret-rule-omitted-empty.log.txt:92`, with exit 1 at line 117. The unmutated control passes in `tg-instruments-3/logs/gate-styles.log.txt:146`.

6. **BROKEN — Mutation evidence holds; the case-title account is false.** The report says the styles list contains “two retitles” and describes the rendered titles as changing from the `side` placeholder to the `margin` placeholder (`b-collapse-tg-report-3.md:133`). The placeholder changes in source, but interpolation produces the same rendered titles. Compare `tg-instruments-2/logs/mutation-plain-caret-rule-omitted.log.txt:93` with `tg-instruments-3/logs/list-styles.log.txt:64`; the directional siblings likewise retain their rendered titles. The added empty-toggle title appears at line 68.

   Smallest fix: distinguish the source-template rename from the unchanged rendered styles titles and the renamed setup binding case. The brief’s “two retitled caret cases” wording (`tg-brief-3.md:56`) is also wrong.

   The mutation matrix withstands comparison. Every existing mutation retains its round-2 assertion failure after accounting for the setup binding-title rename. In the following table, each log name resolves under `tg-instruments-3/logs/`; its same-named round-2 log was also read. Each listed assertion distinguishes the mutation from the passing control.

   | Mutation | Distinguishing failure | Log and line |
   |---|---|---|
   | `base-padding-omitted` | Base padding receives 12, expects 9 | `mutation-base-padding-omitted.log.txt:94` |
   | `small-button-form-omitted` | Small padding receives 9, expects 6 | `mutation-small-button-form-omitted.log.txt:94` |
   | `small-group-form-omitted` | Small-group padding receives 9, expects 6 | `mutation-small-group-form-omitted.log.txt:94` |
   | `large-button-form-omitted` | Large padding receives 9, expects 12 | `mutation-large-button-form-omitted.log.txt:107` |
   | `large-group-form-omitted` | Large-group padding receives 9, expects 12 | `mutation-large-group-form-omitted.log.txt:110` |
   | `large-step-reads-base` | Large padding receives 9, expects 12 | `mutation-large-step-reads-base.log.txt:103` |
   | `padding-literal` | Density change leaves padding at 9 instead of 18 | `mutation-padding-literal.log.txt:103` |
   | `plain-caret-rule-omitted` | Caret margin receives 3.57, expects 0 | `mutation-plain-caret-rule-omitted.log.txt:103` |
   | `dropup-caret-rule-omitted` | Caret margin receives 3.57, expects 0 | `mutation-dropup-caret-rule-omitted.log.txt:97` |
   | `dropend-caret-rule-omitted` | Caret margin receives 3.57, expects 0 | `mutation-dropend-caret-rule-omitted.log.txt:97` |
   | `dropstart-caret-rule-omitted` | Caret margin receives 3.57, expects 0 | `mutation-dropstart-caret-rule-omitted.log.txt:93` |
   | `dropstart-caret-rule-omitted-empty` | Empty split caret receives 3.57, expects 0 | `mutation-dropstart-caret-rule-omitted-empty.log.txt:93` |
   | `first-child-selector-dropped` | Leading split retains trailing radii | `mutation-first-child-selector-dropped.log.txt:94` |
   | `plain-toggle-count-left-out` | Unvalidated toggle retains corners that must square | `mutation-plain-toggle-count-left-out.log.txt:94` |
   | `validated-toggle-count-left-out` | Validated leading toggle retains trailing corners | `mutation-validated-toggle-count-left-out.log.txt:94` |
   | `dropstart-toggle-after-action` | Required leading-toggle selector stops matching | `mutation-dropstart-toggle-after-action.log.txt:80` |
   | `dropstart-action-removed` | Following action check receives undefined | `mutation-dropstart-action-removed.log.txt:80` |
   | `group-size-on-buttons` | Selector overlap receives 1, expects 0 | `mutation-group-size-on-buttons.log.txt:87` |
   | `trailing-toggle-kept-count-broken` | Selector readings become `[true, true]` instead of `[true, false]` | `mutation-trailing-toggle-kept-count-broken.log.txt:11` |
   | `split-cases-reordered` | Ordered padding-table binding differs | `mutation-split-cases-reordered.log.txt:10` |
   | `split-cases-unfrozen` | Table freeze check receives false | `mutation-split-cases-unfrozen.log.txt:18` |
   | `caret-cases-reordered` | Ordered caret-rule binding differs | `mutation-caret-cases-reordered.log.txt:10` |
   | `caret-cases-unfrozen` | Row freeze check receives false | `mutation-caret-cases-unfrozen.log.txt:18` |
   | `toggle-cases-reordered` | Group/feedback ordering differs | `mutation-toggle-cases-reordered.log.txt:10` |
   | `toggle-cases-unfrozen` | Table freeze check receives false | `mutation-toggle-cases-unfrozen.log.txt:18` |
   | `forms-reordered` | Specimen order differs from capture registry | `mutation-forms-reordered.log.txt:10` |
   | `forms-unfrozen` | Selector-list freeze check receives false | `mutation-forms-unfrozen.log.txt:18` |

   The relevant assertions remain at `button-group.test.ts:282`, `:311`, `:341`, `:358`, and `:385`; `input-group.test.ts:275`; `ButtonGroupSection.test.ts:174`, `:180`, and `:205`; and `InputGroupSection.test.ts:145`. Shared binding and freeze assertions appear in `tg-shared-3.patch:1112`, `:1148`, `:1162`, `:1177`, `:1267`, and `:1301`.

   Unmutated controls are green in `gate-styles.log.txt:146`, `gate-sections.log.txt:77`, and `gate-setup.log.txt:8`. The given rulings on density, table placement, the removed base-row filter, and the group-size gap withstand this audit.

7. **UNRESOLVED — Gate results match; complete final-edit chronology is not retained.** Each gate log contains the prescribed command and reports exit 0 with the stated result. These logs were read under `tg-instruments-3/logs/`:

   | Gate | Retained result |
   |---|---|
   | Format | `gate-format.log.txt:8`: correct format; exit 0 |
   | Lint | `gate-lint.log.txt:6`: exit 0 |
   | Check | `gate-check.log.txt:30`: exit 0 |
   | Build | `gate-build.log.txt:58`: exit 0 |
   | Setup | `gate-setup.log.txt:8`: 114 passed; exit 0 |
   | Styles | `gate-styles.log.txt:146`: 62 passed; exit 0 |
   | Sections | `gate-sections.log.txt:77`: 9 passed; exit 0 |
   | Conformance | `gate-conformance.log.txt:12`: 22 passed; exit 0 |
   | Guides | `gate-guides.log.txt:12`: 19 passed; exit 0 |
   | Policy | `gate-policy.log.txt:12`: 109 passed, 1 skipped; exit 0 |

   The owned files’ modification times precede the final gate chain, which starts at 19:10:58 UTC. Mutation stacks also identify the final assertion lines. However, the shared files were edited in the deleted validation copy. The retained instrument records commands, times, and exits, but no shared-file snapshot or modification times (`tg-instruments-3/gates.sh:9`). The assertion that every gate followed the last shared-file edit therefore rests on `b-collapse-tg-report-3.md:188`.

   A retained final-snapshot receipt with gate chronology, or a host gate run over the reconstructed round-3 snapshot, would settle that clause. No retained gate result is contradicted.

8. **BROKEN — Writing and report requirements remain unmet.** Concrete counterexamples include the temporal “now” wording (`b-collapse-tg-report-3.md:33`), “four new TSDoc blocks” (`:78`), “new in this round” (`:182`), and the cross-reference “The mutation matrix above” (`:210`). Bare tokens remain in report prose, including the reader calls and renamed field (`:72`). The retained patch path appears at `:10` and `:217`, contradicting the requirement to name it once.

   Smallest fix: remove the prohibited wording and growable-set tallies, supply nouns after code tokens, and retain the patch’s destination at its canonical report site. The SHA-256 is correct:

   `9f36fb84a292e0cab52ff7671a275ea5e7f8c5eecc9a87b35c30b382df9df583`

   The code-law portion withstands inspection: no prohibited assertion, suppression, mock, or nested declaration was added. No exported helper was introduced.

   **Outside-claim record — REPORT-COUNTS: BROKEN.** The report repeats the prohibited tally pattern carried from round 2. The count-bearing statements are recorded here as required:

   - `:72`: “both” reader calls.
   - `:78`: “four” TSDoc blocks.
   - `:133–136`: “61 titles,” “one addition,” and “two retitles,” with the retitle tally repeated.
   - `:153–171`: each mutation row reports `1 failed`.
   - `:172–179`: each table-control row reports `1 failed`, `113 passed`, and total `114`.
   - `:198–203`: gate measurements report `114`, `62`, `9`, `22`, and `19` passed; policy reports `109 passed`, `1 skipped`, and total `110`. Line 199 also repeats the round-2 tally of `61` cases.
   - `:205–210`: “One intermediate” formatting run, “two” assertion lines, “1 files” in quoted formatter output, “two” calls, and “three lines” per call.
   - `:215`: `1583` patch lines.
   - `:217`: “one unified diff.”
   - `:233–238`: diffstat measurements `61`, `776`, `42`, `192`, and `158`; total `5 files`, `807 insertions`, and `422 deletions`.
   - `:241`: “two” constants doc blocks.
   - `:249–252`: “One ancillary choice,” “two” assertions, “three lines each,” and the “single-line” form.

   The per-toggle row mapping (`:94`), per-run log mapping (`:146`, `:189`), and child-position thresholds (`:96–99`) describe multiplicities or selector constraints. The quoted test results and diffstat are run measurements, permitted by the writing law. The prose tallies of blocks, retitles, calls, and choices substantiate REPORT-COUNTS; remove those tallies rather than updating them.

**Finding outside the claims — REBUILD-RECIPE: BROKEN.** The report’s reconstruction instructions apply the superseded shared patch (`b-collapse-tg-report-3.md:278`). The subsequent sync copies only owned files (`tg-instruments-3/sync.sh:7`), leaving the old table’s `side` field (`tg-shared-2.patch:1568`) paired with the consumer’s `margin` field (`tests/src/styles/components/button-group.test.ts:327`).

A read-only TypeScript compilation of that reconstructed state reports TS2339 at the consumer. Replacing the shared overlay with the round-3 patch produces no diagnostics under the same configuration. Smallest fix: apply the retained round-3 patch in the rebuild recipe. The delivered round-3 patch itself is correct.

**Attacked and held.** The group-size mutation remains distinguished by selector overlap; a size class on the toggle alone does not satisfy the adjacent-action selector. Empty plain, dropup, and dropend toggles legitimately receive zero margin from the empty-toggle rule; the text-bearing cases avoid that masking, and the adopted empty dropstart case measures the rule that still matters there. These adjacent behaviors do not justify changing the retained assertions.

VERDICT: FAIL 3, 6, 7, 8; outside the claims: REPORT-COUNTS, REBUILD-RECIPE