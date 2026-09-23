# bfl audit, objective lane (`analyst` on GPT-6 Astra) — verdict

Journal: `tmp/codex/bfl-audit-analyst.jsonl` (swept at acceptance); session id `01a0cdef-d4cf-7c32-99a7-f9ea389343e0`; exit 0 under the 1800 s cap; the journal names `gpt-6-astra`. Launcher: `units/bfl-audit-analyst.sh`. Brief: `units/bfl-audit-analyst-brief.md`. Claims: `units/bfl-audit-claims.md`.

1. **CONFIRMED — Delta and scope.** The live diff matches `bfl.diff:1` byte for byte, and the live status matches `bfl-status.txt:1`. Comparing the complete changed-path set against the claim found no additional paths or off-limits edits.

2. **CONFIRMED — Partial and barrel.** `src/styles/components/_form-label.scss:4` declares the required size bindings; its rules at lines 6–40 contain the prescribed declarations without an import or additional treatment. `src/styles/index.scss:55` loads the partial immediately before form-control. Reading `dist/src/styles/index.css:1` found every claimed selector in the components layer. The attack for missing selectors, extra declarations, wrong bindings, or wrong layer found none.

3. **BROKEN — The fallback condition is overstated.** At `tests/setupServer.ts:2057`, any inventory recording prevents the all-shipped-keys fallback, including a recording whose key is withheld. Executed input: selector `.form-control-sm`, recording `['form-control']`, shipped keys `['form']`. The function returns `undefined`; the claimed fallback would return `form`.

   The implementation correctly preserves the documented withheld-key exclusion at `tests/setupServer.ts:2017`. Correct the claim to say **“where the inventory records the selector nowhere”**; retain the implementation.

   The remaining ladder assertions held. Read-only mutations distinguished removing the prefix tier, placing it before the exact tier, and removing the longest-first sort. They respectively misattributed the sized control/switch/row-gap selectors, the validation selector, and the switch selector. The assertions at `tests/setupServer.test.ts:2203` reject those results; the helper case at line 2156 also distinguishes the sort mutation. The report records the failing-first run at `b-forms-label-cascade-report.md:185`.

4. **CONFIRMED — Tables.** The contracts and frozen tables are at `tests/setupStyles.ts:4482` and `tests/setupStyles.ts:4909`. Executing the real declaration reader against the expanded cascade reproduced every label and floating per-property map. Changing the horizontal label’s owner to `form` disagreed with the inventory’s `col` recording; moving the floating border token onto padding disagreed with the extracted map. The assertions at `tests/setupStyles.test.ts:2728` and line 2797 distinguish those mutations. The browser layer assertion remains at `tests/src/styles/components/form-floating.test.ts:496`. The retained setup run records `250 passed`.

5. **CONFIRMED — Shipped keys and ledger.** The shipped list includes the form key at `tests/conformance.test.ts:111`; the frozen mapping is at `tests/setupServer.ts:400`. The barrel equality at `tests/conformance.test.ts:350` passed against the installed release sequence and rejected an in-memory swap of label and control.

   The expanded-cascade measurement reproduced **1069 departures and 161 additions**. Every row matched the guide; deleting a recorded row produced drift. Comparing against the baseline guide confined ownership changes to row → row-gap and preserved the forms owners. The shipped-deferral scan returned empty. The retained conformance run records `21 passed`.

6. **CONFIRMED — Browser proof assertions, under the brief’s execution restriction.** The assertions distinguish every reported browser mutation:
   - Literal label or help-text margins fail the density readings at `tests/src/styles/components/form-label.test.ts:25`.
   - Root-relative help-text sizing fails the 17.5px reading at line 35.
   - Reading the Veneer colour token directly fails the wrapper override at line 61.
   - Literal horizontal spacing, an omitted border term, or a literal border width fails the content-top comparison at line 99.
   - Literal line height fails the ratio comparison under retuning at line 105.
   - Swapped large/small bindings fail the size and inset readings at line 126.
   - Removing the legend margin reset or inherited size fails lines 143–144.
   - Moving the rules to utilities fails the components-layer assertion at line 150.

   The mutation log corroborates the named failures, and `b-forms-label-cascade-report.md:160` records the scoped `27 passed` run. This verdict assesses the assertions and supplied runs; no browser ran in this audit. The geometry assertion measures content-box tops, not glyph baselines.

7. **BROKEN — “§ Tests is unchanged” is literally false.** `guides/veneer.md:4137` adds the form-label proof link inside § Tests, which begins at line 4023. Comparing the section with the baseline shows that removing precisely this added link restores byte identity.

   The link is explicitly required by the brief. Retain it and correct the claim/report to say **“§ Tests is unchanged except for the required style-proof link.”** The moved forms sections otherwise compared byte-identical, and an altered-heading control failed that comparison. The required section order, ledger grouping, compatibility rows, retired deferrals, and Showcase paragraph are present. The retained guide run records `18 passed`.

8. **BROKEN — New prose violates the stated writing rules.** Concrete counterexamples include:
   - `tests/conformance.test.ts:321` states the prohibited count “two partials.”
   - `tests/conformance.test.ts:322` leaves the `FORM_PARTIALS` identifier without a following noun.
   - `tests/setupServer.ts:1504` repeats the bare linked-helper construction that the brief required fixing elsewhere.
   - `tests/setupServer.ts:1507` leaves selector/key tokens without nouns.
   - `tests/setupStyles.ts:4928` leaves the `component` identifier without a noun.
   - `guides/veneer.md:991` leaves the accessibility attribute and legend tag without following nouns.

   Remove the count and add the appropriate nouns throughout the newly authored prose. Preserve the byte-identical moved blocks. These are prose defects; the permitted type check passed, and the SCSS structure held.

9. **CONFIRMED — Report evidence and findings.** The criteria, failing-first evidence, mutation mappings, and findings appear at `b-forms-label-cascade-report.md:131`, line 181, line 191, and line 261. The independently executed ladder, table, ledger, barrel, and guide comparisons corroborate the corresponding claims.

   **Keep `font-size: inherit`.** `src/styles/components/_form-label.scss:30` preserves the release’s inheritance relationship. The body token at `src/styles/_tokens.scss:419` and control typography at `src/styles/_mixins.scss:49` explain the differing default sizes. Binding the label to the control’s type token would discard that inheritance contract. The guide documents the limit at `guides/veneer.md:994`.

   The stale select-order sentence remains at `guides/veneer.md:1114`, while the barrel places validation last. It is the acknowledged B-PASSIVE-CLOSE carrier, not an additional finding.

Outside the claims: none.

VERDICT: FAIL 3, 7, 8; outside the claims: none