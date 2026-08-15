1. **UNRESOLVED** — Requires the subjective lane’s refused-state capture portfolio across both viewports and themes.

2. **UNRESOLVED** — Requires the subjective lane’s first-load and empty-submit captures.

3. **BROKEN** — A reachable interleaving defeats both invalid-state and focus guarantees: submit valid values, edit either enabled input to empty while the request is pending, then receive `AUTH`. Because `attempted` remains true, `unnamed`/`unsealed` wins before `refused`; the field renders `aria-invalid`, and focus can land on the username or an unselected password instead of the selected password. Separately, generic transport failure focuses the submit control despite neither the design record nor acceptance criteria establishing that destination. The second-alert attack failed: only one conditional `role="alert"` node exists. Smallest fix: clear local-attempt validation state after a submission passes local validation, and remove the unrecorded generic-failure focus branch or establish the intended focus destination in the governing design first.

4. **BROKEN** — The component and test strings are byte-identical, and neither refusal nor rate-limit copy guesses which credential failed. However, “Too many login attempts.” is a verbless fragment and therefore does not satisfy the claim’s active-voice requirement. Smallest fix in component and test: use an active sentence such as “Too many login attempts reached the supervisor.”

5. **BROKEN** — The seven plausible failing-first test names exist and cover the changed semantics. The refused-state test pins one alert, no marks, preserved values, password focus, and selection. However, the newly added busy-state assertion that the icon is absent passes against the baseline component because the baseline already used the same `v-if="busy"`/`v-else` structure. It does not bind this change. Smallest fix: remove that unrelated assertion. The exact-copy assertions otherwise match the component.

6. **UNRESOLVED** — Shipment remains dependent on the subjective capture portfolio and U8’s measured contrast evidence; claims 3–5 also require repair before acceptance.

VERDICT: FAIL — 3 broken, 3 unresolved, 0 not-evidenced, 0 findings outside the claims