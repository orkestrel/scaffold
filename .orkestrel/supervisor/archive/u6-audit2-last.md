1. **BROKEN** — Visible copy is unified, but `extractCopy()` inspects only direct text nodes. A username `placeholder`, `title`, or other exposed attribute containing “the name” would evade the sweep. Expand the instrument to user-facing attributes and add an outside-population negative control.

2. **CONFIRMED** — Clearing either field during the held request cannot activate validation because `attempted` is cleared before the await. Refusal then owns focus and selection; a subsequent invalid submit restores prompts. The permanent test binds removal of that transition.

3. **CONFIRMED** — The active rate-limit sentence is identical in component and test, states no duration, and distinguishes request limiting from credential refusal.

4. **BROKEN** — The journey’s selection negative control is sound: without `select()`, typing appends and the line-38 value assertion fails. The journey nevertheless violates the recorded doctrine: it targets CSS IDs with `state: 'attached'`, queries `.is-invalid`, and asserts DOM presence rather than resolving visible, focus-reachable controls by accessible role or label and reading perception. Retrofit it through the recorded J1 journey layer.

5. **BROKEN** — The round-one semantics remain intact and U7 correctly carries showcase staleness, but U6 cannot be accepted pending only U8 while Claims 1 and 4 remain false and REDESIGN.md records the journey retrofit under J1.

Findings fitting no claim:

- `journey.test.ts` acquires the browser, context, and page before entering `try`. A `newContext()` or `newPage()` rejection leaks earlier resources; a rejected `context.close()` also skips `browser.close()`. Use nested acquisition/cleanup blocks so every successfully acquired resource closes after setup or teardown failure.

VERDICT: FAIL — 3 broken, 0 unresolved, 0 not-evidenced, 1 findings outside the claims