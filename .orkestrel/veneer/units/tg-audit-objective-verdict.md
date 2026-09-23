1. **CONFIRMED — Delta and scope.** The live status matches `tg-status.txt:1`, and the diff against `a658879` contains only the owned files. The shared patch names only the authorized shared files. Inspection of its deletions, ignoring table padding, found only the retired deferrals, the retired constant and its consumers, and the rewritten prose and assertions. `git apply --check --verbose` exited 0. The attack for unauthorized files or unrelated removals failed.

2. **CONFIRMED — Partials and cascade.** An in-memory Sass compilation matched the inventory’s selector order and declaration sets. The relevant selectors occur only in the owning partials: `src/styles/components/_button-group.scss:59`, `:78`, `:83`, `:89`, and `:95`; `src/styles/components/_input-group.scss:90` and `:99`. The attempted duplicate, missing-selector, extra-declaration, and reordered-selector attacks failed.

   The tokens at `src/styles/_tokens.scss:288`, `:290`, and `:292` resolve at density 1 to `0.5rem`, `0.75rem`, and `1rem`. Multiplication by `0.75` yields the recorded small, resting, and large padding. `tg-instruments/logs/built-rows.log.txt:1` agrees throughout and contains no `ABSENT`. Neither the inventory nor the compiled cascade contains `.btn-group.show .dropdown-toggle`. The inventory supports squaring the leading split toggle’s trailing corners.

3. **CONFIRMED — Cascade proofs.** The assertions distinguish every named mutation. I read each corresponding file under `tg-instruments/logs/`; the following citations identify the failure evidence.

   | Mutation | Distinguishing assertion and retained log |
   | --- | --- |
   | `first-child-selector-dropped` | Corner array becomes `[6,6,6,6]` instead of `[6,0,0,6]`; `mutation-first-child-selector-dropped.log.txt:100`. |
   | `base-padding-omitted` | Resting padding becomes 12 instead of 9; `mutation-base-padding-omitted.log.txt:95`. |
   | `padding-literal` | Density override leaves padding at 9 instead of 18; `mutation-padding-literal.log.txt:93`. |
   | `small-button-form-omitted` | Small button form reads 9 instead of 6; `mutation-small-button-form-omitted.log.txt:94`. |
   | `small-group-form-omitted` | Small group form reads 9 instead of 6; `mutation-small-group-form-omitted.log.txt:94`. |
   | `large-button-form-omitted` | Large button form reads 9 instead of 12; `mutation-large-button-form-omitted.log.txt:108`. |
   | `large-group-form-omitted` | Large group form reads 9 instead of 12; `mutation-large-group-form-omitted.log.txt:107`. |
   | `large-step-reads-base` | Large padding reads 9 instead of 12; `mutation-large-step-reads-base.log.txt:93`. |
   | `plain-caret-rule-omitted` | Caret margin reads 3.57 instead of 0; `mutation-plain-caret-rule-omitted.log.txt:94`. |
   | `dropup-caret-rule-omitted` | Caret margin reads 3.57 instead of 0; `mutation-dropup-caret-rule-omitted.log.txt:100`. |
   | `dropend-caret-rule-omitted` | Caret margin reads 3.57 instead of 0; `mutation-dropend-caret-rule-omitted.log.txt:99`. |
   | `dropstart-caret-rule-omitted` | Caret margin reads 3.57 instead of 0; `mutation-dropstart-caret-rule-omitted.log.txt:100`. |
   | `plain-toggle-count-left-out` | The plain group’s leading toggle retains its trailing radii; `mutation-plain-toggle-count-left-out.log.txt:99`. |
   | `validated-toggle-count-left-out` | The validated group’s leading toggle retains its trailing radii; `mutation-validated-toggle-count-left-out.log.txt:99`. |

   The assertions are at `tests/src/styles/components/button-group.test.ts:290`, `:314`, `:342`, and `:371`, and `tests/src/styles/components/input-group.test.ts:277`. The small-form mutations remove that form across the size loop, rather than isolating the small size; their small readings still distinguish the mutation. The separately executed large-form mutations cover the large readings.

   The controls agree: `wt-red-styles.log.txt:290` reports `8 failed | 53 passed (61)`; `wt-styles.log.txt:146` and `gate-styles.log.txt:146` report `61 passed (61)`. The excluded-toggle cases are outside the failing population and remain green. These are retained browser executions, not browser reruns in this sandbox.

4. **CONFIRMED — Specimens and section proofs.** The constants patch supplies the claimed markup, size derivation, names, closed states, and menu relationships (`tg-shared.patch:20`, `:35`, and `:87`). Evaluating the patched constants in memory and parsing their markup found the expected structures and attributes.

   The section assertions distinguish the named mutations:

   - `dropstart-toggle-after-action` breaks specimen-local selector presence at `ButtonGroupSection.test.ts:188`; log `mutation-dropstart-toggle-after-action.log.txt:11`.
   - `dropstart-action-removed` breaks the following-action assertion at `ButtonGroupSection.test.ts:214`; log `mutation-dropstart-action-removed.log.txt:11`.
   - `group-size-on-buttons` breaks the size-class exclusion at `ButtonGroupSection.test.ts:218`; log `mutation-group-size-on-buttons.log.txt:10`.
   - `trailing-toggle-kept-count-broken` changes the matching vector from `[true,false]` to `[true,true]` at `InputGroupSection.test.ts:145`; log `mutation-trailing-toggle-kept-count-broken.log.txt:10`.

   `gate-sections.log.txt:9` reports `9 passed (9)`. `wt-red-sections.log.txt:114` reports `5 failed | 4 passed (9)` without the constants patch. The missing-form and misplaced-toggle attacks failed against the passing specimen definitions.

5. **CONFIRMED — Capture rows.** The subject additions and appended resting rows match the claim (`tg-shared.patch:932` and `:945`). There is no driven-row or state-member addition.

   The parsed specimens supply the required adjacent sized buttons, leading split toggle, and input-group child positions. Each registered property belongs to its matching compiled rule. The input-group selectors select the leading toggle while excluding the trailing toggle. The attempted wrong-specimen and wrong-property attacks found no mismatch.

   The journey requires each selector inside its named specimen at `tests/app/browser/integration.test.ts:636`; a selector changed to an absent host fails that requirement. The retained executions report success in `journey-light-390.log.txt:77` and `journey-dark-1280.log.txt:77`. This confirms registry reachability, not an inspected screenshot portfolio.

6. **CONFIRMED — Tables, ledger, and deferrals.** The table additions preserve inventory order and place the input-group selectors beside their squaring rules (`tg-shared.patch:1127` and `:1153`). Retiring `INPUT_GROUP_DEFERRED` is substantive: the withheld capability has ended, and the replacement assertion requires that no recorded input-group selector remain deferred (`tg-shared.patch:1039`). This is not removal to silence lint.

   I evaluated the patched tables and reproduced the relevant comparison expressions in memory. Removing the toggle rules produces input-group multiplicity mismatches. Assigning `.dropdown-toggle-split` to `DROPDOWN_SELECTORS` produces a partition violation. The passing partition has no leftover selector and retains the `startsWith` restriction (`tg-shared.patch:1086`).

   The real `collectLedger` comparison reproduces the patch’s `btn` and `dropdown` rows as `tokenized`. Comparing those rows returns empty `unrecorded` and `stale` lists; changing a category to `declared` produces entries in each list. This independently agrees with `ledger-drift.log.txt:1`. `gate-conformance.log.txt:12` reports `22 passed (22)`. The patched guide contains no `Disclosure` occurrence.

7. **BROKEN — Guide token wording.** The added padding paragraph does not give every code token its noun. At `tg-shared.patch:173`, `:174`, and `:175`, the calculation tokens are followed by “at” or “after”, contrary to `/home/user/scaffold/.claude/rules/writing.md:49`.

   The smallest fix is to name each calculation as an expression or value. The padding arithmetic, corner descriptions, ledger attribution, retained navigation deferrals, and plugin ownership statements otherwise agree with the implementation.

8. **BROKEN — Law and report.** The report’s blanket caret-frame limitation is false for dropstart. `b-collapse-tg-report.md:474` and `:492`, and the comment at `tests/src/styles/components/button-group.test.ts:321`, treat empty toggles as masking every split caret-margin rule.

   The empty-toggle rule at `src/styles/components/_dropdown.scss:112` clears `margin-left` on `::after`. The dropstart caret instead receives `margin-right: 0.255em` on `::before` at `:100`. The split rule at `src/styles/components/_button-group.scss:89` clears that margin. An in-memory compilation with that split rule removed retains `0.255em`; the control emits `0`. Emptiness does not mask this difference. The retained text-bearing mutation independently reports the corresponding margin failure at `mutation-dropstart-caret-rule-omitted.log.txt:100`.

   Correct the report, test comment, and Orchestrator ruling to limit the empty-toggle explanation to the plain, dropup, and dropend `::after` carets. Keep the dropstart specimen. No visually hidden label capability is needed to expose its margin difference. No screenshot was supplied to measure the resulting frame.

   The writing claim also fails: the added constants comments use the banned “here” wording (`tg-shared.patch:23` and `:83`), and the partial comment says “both forms” without naming those forms (`src/styles/components/_button-group.scss:94`). Replace the locator wording and name the button-size and group-size forms.

   The code restrictions otherwise held: the delta adds no prohibited assertion, suppression, mock, nested function, or exported helper. The size loop shares the padding implementation. The retained gate readings match the report, including the setup timeout and subsequent successful readings.

   The carried styles-table fix must move these rows into `tests/setupStyles.ts`:

   - `BUTTON_GROUP_SPLIT_PADDING_CASES`: the Base, Small, Small group, Large, and Large group tuples at `button-group.test.ts:270`; imported by “pads each split toggle at three quarters…”.
   - `BUTTON_GROUP_SPLIT_CARET_CASES`: the wrapper, pseudo-element, and margin-property rows at `button-group.test.ts:324`; imported by “drops the caret…”.

   **Outside finding REPORT-COUNTS — BROKEN.** The report retains prose tallies prohibited by its brief and `/home/user/scaffold/AGENTS.md:172`: “both sized forms” at `b-collapse-tg-report.md:21`, “both forms” at `:59`, “both specimen tables” at `:89`, “one size list” at `:124`, “both toggle selectors” at `:210`, and “both forms” at `:386` and `:388`. Name the members or remove the tally. The specimen and ledger “pair” wording appears at `:123`, `:158`, `:317`, and `:318`. The criterion references at `:13`, `:438`, and `:469` also name list items by position.

   The report’s numerical count record is:

   - Owned diffstat at `:31`: `41, 7, 95, 54, 140, 48`; summary at `:37`: `6 files`, `375 insertions`, `10 deletions`.
   - Shared diffstat at `:72`: `58, 731, 42, 56, 21`; summary at `:77`: `5 files`, `506 insertions`, `402 deletions`.
   - Deferral search at `:298`: `0`.
   - Styles results at `:346`, `:347`, `:396`, `:410`, and `:431`: `8 failed | 53 passed (61)` and `61 passed (61)`.
   - Section results at `:365`, `:366`, `:397`, and `:432`: `5 failed | 4 passed (9)` and `9 passed (9)`.
   - Mutation result at `:378`: `1 failed`.
   - Conformance results at `:411`, `:414`, and `:433`: `5 failed | 17 passed (22)` and `22 passed (22)`.
   - Baseline results at `:415`: `99 passed (99)` and `7 passed (7)`.
   - Setup results at `:430`: `1 failed | 252 passed (253)`, `1 passed | 96 skipped (97)`, and `253 passed (253)`.
   - Remaining gates at `:434`, `:435`, and `:436`: `19 passed (19)`, `109 passed | 1 skipped (110)`, and `78 passed (78)`.
   - Journey results at `:445`: `40 passed (40)` for each named run.

   These command-associated measurements are supported by the retained evidence and fall under the root contract’s measurement exception. Padding multiples, selector thresholds, viewport sizes, versions, durations, exit codes, and patch coordinates are values rather than prose population tallies.

**Outside finding SECTION-CASE-TABLES — BROKEN.** The centralization finding extends beyond the styles cases already acknowledged. The added specimen-to-selector matrix at `tests/app/browser/sections/ButtonGroupSection.test.ts:164` and specimen-to-squaring-selector matrix at `tests/app/browser/sections/InputGroupSection.test.ts:130` remain inline. `/home/user/scaffold/.claude/rules/tests.md:187` requires case matrices in setup files regardless of size.

Move them to exported, frozen `BUTTON_GROUP_SPLIT_SPECIMEN_CASES` and `INPUT_GROUP_DROPDOWN_SPECIMEN_CASES` tables in host-independent test setup, and import them into the existing section cases. Their assertions and mutation sensitivity remain valid; moving the data must preserve those assertions.

**Attacked and held.** A leading split toggle correctly loses its trailing corners; an ordinary excluded toggle correctly retains them. Empty plain, dropup, and dropend toggles correctly mask the corresponding `::after` margin reset, while text-bearing proof fixtures distinguish its removal. These adjacent behaviors do not justify the report’s dropstart exemption.

VERDICT: FAIL 7, 8; outside the claims: REPORT-COUNTS, SECTION-CASE-TABLES