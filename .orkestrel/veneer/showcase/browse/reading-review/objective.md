Lane: objective (correctness, contracts, test sufficiency, letter of the rules). Evidence comes from reading the files at `fcefa2a` in `C:\Users\mikes\WebstormProjects\browser-wt-browse`, from the diff `tmp/codex/review-reading/diff.patch`, and from the installed `@orkestrel/html` declarations. I ran nothing.

## Verdicts

1. **HOLDS.** `distill` defaults to `false` and links resolve.
   - `src/core/BrowserReading.ts:65,75` both read `?? false`.
   - `#source(false)` maps every element through `resolveAttributes(node, this.#url)`. The installed declaration `node_modules/@orkestrel/html/dist/src/core/index.d.ts:1284` is `resolveAttributes(node: ElementNode, base: string)`, and `map` is at `:656`.
   - No call in `src/` still relies on the old default without passing an option.
   - The TSDoc changed with the default: `BrowserReading.ts:26`, `factories.ts:82`, and `types.ts:2250-2251,2357-2361`.
   - Each mutation is caught:
     - Removing the resolution makes `tests/src/core/BrowserReading.test.ts:117-123` fail, because the output keeps `(/next)`.
     - Reverting the default makes `:53-60` fail.
     - Bypassing distillation makes `tests/src/browser/BrowserDOMView.test.ts:29-32` fail.
   - The service-test updates are UNRESOLVED: only the writer's report says they ran.

2. **HOLDS.** The word rule, best-line matching, and duplicate offsets behave as claimed.
   - `matchBrowserOutline` calls `collectBrowserWords` for both the search and each node.
   - `matchBrowserText` uses `line.index` from `matchAll(/[^\r\n]+/g)` and filters to the best score.
   - The test at `tests/src/core/helpers.test.ts:112-115` tells the mutations apart:
     - Without the top-score filter, the extra row `{0,'cart'}` appears.
     - With offsets taken from the first occurrence, offset 26 becomes 5.
   - `'a to 12'` returns `[]`, which produces no block.

3. **FAILS.**
   - **Held:** the block is first-page only (`start === 0` in `read`, `plain`, `look`, and `journeys`). The block takes at most half the room: the first case at `helpers.test.ts:92` fills exactly half, 24 of 48. A later row that does not fit is skipped with `continue`. Offsets are computed on `whole.text` or the listing, never on the reply. Continuing from a listed offset sets `start = offset` on the retained reading. Journey offsets map the heading position to the listing position.
   - **Broken, test sufficiency:** the surrogate-pair guard (`src/core/helpers.ts:351-352`) is never exercised.
     - `renderBrowserMatches('Matches:', ['a😀tail'], 26)` gives half 13, space 2, end 1. `charCodeAt(0)` is `a`, so the guard is never reached.
     - With the guard deleted, the output is still `'Matches:\na…\n\n'`, so the only proof of "without splitting a surrogate pair" cannot fail.
   - **Broken, correctness:** the room reserved for a later row can cut a row's `[OFFSET]` off entirely.
     - Example: `plain` with search `delivery`, limit 4,000, and no note gives heading length 26 and space 1,972.
     - The first match is a 2,500-character paragraph at offset 120. The second is `[2700] ` followed by a 1,963-character paragraph, 1,970 characters in all.
     - `later` is chosen and `end = 1971 − 1971 = 0`, so the first row renders as `…`.
     - With a 1,958-character second paragraph, `end = 5` and the row renders as `[120…`. A model can read that as offset 120 or 12, so continuing from it is ambiguous.
     - The same applies to a `look` row's `eN` reference.
   - **Dead code:** `src/core/BrowserToolset.ts:719` tests `search === undefined`, but `search` is always a string at `:711`.

4. **HOLDS.** `what` is refused and the placeholder is `purpose`.
   - `validateBrowserToolArguments` lists `Object.keys(properties)`. No copy declares `what`, so a call sending it is refused with "call X with search and offset" (or "with search" on `tabs`).
   - Tests cover the refusal on `look`, `read`, and `plain` (`BrowserToolset.test.ts:160-179`), on `tabs` (`:4135-4137`), and on `journeys` (`BrowserJourneyToolset.test.ts:68-70`).
   - The placeholder is `purpose` in `deriveBrowserToolSchema`, in `BrowserRegistry.ts:417-418`, and in `BrowserToolset.ts:1245`. Its description is unchanged.

5. **HOLDS.** `plain` behaves as specified.
   - It projects `reading.text()` from the same `view.read()` capture.
   - Its annotations are `{pure, untrusted}`, asserted at `:120`.
   - It is listed in `BROWSER_OBSERVATION_TOOL_NAMES`, so it counts as an observation, is admitted under a hold, and records no action (asserted at `:124-142`). It is also excluded as a journey step through `BROWSER_JOURNEY_NON_STEP_TOOLS`.
   - It is refused while a dialog is open, because `#execute` calls `#refuseDialog` for every tool except `dialog`; `:1070` asserts this.
   - The retained reading is keyed by projection: the `retained.name !== name` check recaptures. Without it, `:147-153` fails on `start` 50 and on the capture count.

6. **HOLDS.** The copy matches the brief character for character, and both bounds are correct.
   - I recounted the serialized length by hand. The `plain` definition adds 445 characters. The other changes add +30 (`read` description), −13 (`look`), +32 (`read` parameters), +19 (`tabs`), and +23 (`journeys`).
   - That is +536, so 6,023 + 536 = 6,559. The journey measurement is 3,067 + 23 = 3,090.
   - 6,600 and 3,100 are the smallest multiples of 50 that hold those lengths. They are recorded at `tests/src/core/BrowserToolset.test.ts:884,888-889` and `guides/browser.md:3024`.

7. **HOLDS for the 14 listed mutations.** Each assertion separates the defect from correct behavior:
   - Top-score filter removed: row `{0,'cart'}` appears.
   - Duplicate offsets from the first occurrence: 26 becomes 5.
   - Link resolution removed: `(/next)` remains.
   - Distillation bypassed: `toBe('Main article words')` fails.
   - Block suppressed: the `startsWith` on the block fails.
   - Markdown served for `plain`: `## ` and the offset differ.
   - Block repeated on continuation: `jumped.startsWith` fails.
   - Projection identity removed: `start` is 50 and the capture count is off.
   - `plain` dropped from the hold list: the "replaying" refusal is raised.
   - Tab matching disabled: the exact `toBe` at `:4133` fails.
   - Journey matching disabled: the `startsWith` at `:61` fails.
   - `what` admitted: the `rejects` assertion fails.
   - First row skipped instead of cut: the output becomes `'Matches:\nlast\n\n'`.
   - Scan stopped at the first long row: `last` is missing in both cases.

   The surrogate guard is the one claimed behavior with no mutation that can fail it; see item 3.

8. **FAILS, on guide parity.**
   - **Held:** the source diff adds no `as`, `!`, `any`, or suppression directive. The only nested functions are callbacks passed as arguments (`bind`, `map`, `find`). `BrowserReadMatch` is in `src/core/types.ts`. The three helpers are in `helpers.ts`, carry TSDoc, and have guide rows at `:386-388,1091`. The banned-term sweep found no added `should`, `simply`, `currently`, `just`, `via`, `e.g.`, `ensure`, or similar.
   - **Broken:** `guides/browser.md:36` still says "The system prompt is the one the store proof in `@orkestrel/ollama` runs with". That store proof's prompt (`ollama/tests/setupStore.ts:134`) still says "call read with what set to your question", and its seed (`:881`) sends `what: 'the page'`. The guide's own `:3443` says the recorded proof used the earlier argument name, so the two passages contradict each other.
   - **Broken:** the receipt table (`guides/browser.md:2945-2947`) shows only `look`'s `MATCHED elements match "SEARCH":`. The headings a model sees from the other tools appear nowhere in the guide: `N lines match` / `1 line matches` for `read` and `plain`, `N tabs match` / `1 tab matches`, and `N journeys match` / `1 journey matches`.
   - Whether `npm run test:guides` and the other gates pass is UNRESOLVED: only the writer's report says so.

## Findings outside the claims

- **Edge case (advisory):** `renderBrowserMatches` can emit a block whose only row is `…` when `space` is 1 to 2. For example, `('Matches:', ['row'], 24)` returns `'Matches:\n…\n\n'`. That needs a very long `search` or a small `limit`, so it is advisory. The fix for item 3 covers it.
- **Cost (advisory):** `BrowserReading.#source(false)` runs `html.map` once for Markdown and again for text, copying the tree twice per reading. No realistic load shows harm (an 18,018-element table), so this stays advisory.
- **Bench figures:** these rest on the writer's report and are UNRESOLVED. The first showcase `look` median exceeded the stated threshold, and the repeat run stayed within it. Neither run is a capture I can check.

## Referrals

- **To the Orchestrator:** re-pinning `@orkestrel/ollama` breaks its store proof, because `look`, `read`, `tabs`, and `journeys` now refuse `what`. The places to migrate are `ollama/tests/setupStore.ts:134` (the prompt), `:881` (the seed), and every `buildStoreCall(..., { what: ... })` in `ollama/tests/setupStore.test.ts`. The veneer mirror `C:\Users\mikes\WebstormProjects\veneer\guides\browser.md` also needs refreshing on re-pin.
- **To the subjective lane or the Orchestrator:** `tests/src/core/BrowserToolset.test.ts:884` labels the measurements "Reading change: …". `.claude/rules/writing.md` § Code comments forbids narrating history, but browse.md § Item 12 rulings requires both lengths to be recorded. That wording question is not mine to rule on.

## Attacked and held

- **Journey listings:** fault listings between journeys shift the listing offset, and the `listingOffset` accounting includes them. A carriage return inside a heading cannot occur, because the description is JSON-quoted.
- **Read and plain:** `whole = project(reading)` is unbounded by default and cached per mode. The `space < 1` branch cannot be reached when `room ≥ 2`. A switch of projection at offset > 0 recaptures and restarts at 0.
- **Tabs:** `#drainNote` now runs inside `tabs`, but the note still comes first, because `#execute`'s later `#drain()` returns `''`.
- **Synthetic placeholder:** detection in the registry is still `parameters !== tool.schema`. The conformance fixture renamed its own authored parameter to `search`, which is a required parameter, not the placeholder.
- **Description length:** the `read` description is 25 words and `plain` is 24, both within the 25-word limit. Each parameter description is under 100 characters.

## Required changes

1. **`tests/src/core/helpers.test.ts:95`:** room 26 never reaches the surrogate guard, so deleting `src/core/helpers.ts:351-352` keeps the test green. Assert with room 28 (half 14, space 3, end 2 on the high surrogate), expecting `'Matches:\na…\n\n'`; without the guard the output is `'Matches:\na\uD83D…\n\n'`.
2. **`src/core/helpers.ts:349-350`:** reserving room for the first later row that fits can cut the first row to `…` or to a partial `[OFFSET` (example in item 3). Reserve only while the cut first row keeps at least its leading token, `row.indexOf(' ') + 1` characters, plus one character, or reserve the shortest fitting later row. Otherwise cut without reserving. Add a case where the later row nearly fills the space, and update the TSDoc and `guides/browser.md:2933` to match.
3. **`src/core/BrowserToolset.ts:719`:** `search === undefined` can never be true. Pass `search` directly.
4. **`guides/browser.md:36`:** the sentence calls this the store proof's prompt, which is false. State that the prompt follows the reading vocabulary and that the recorded store proof used the earlier prompt, as `:3443` does.
5. **`guides/browser.md:2945-2947`:** the receipt table has only `look`'s match heading. Add rows for `COUNT lines match "SEARCH":` (`1 line matches`) on `read` and `plain` with `[OFFSET] LINE` rows, `COUNT tabs match` (`1 tab matches`), and `COUNT journeys match` (`1 journey matches`) with `[OFFSET] HEADING` rows.

VERDICT: FAIL 3, 8