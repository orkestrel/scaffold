# review

**Lane: objective.** I checked the plan's claims against the source, the transcripts and the user's rulings.

## Verdicts

1. **The experiment guards cannot detect a material fall, so E2 to E4 can keep a regression (high).**
   - **Claim:** a guard that falls below its S0 rate is extended to 16 attempts and reverted only when a one-sided Fisher test at 5% settles the fall.
   - **Evidence:** I computed the hypergeometric tails against the S0 counts the plan cites. These are my calculations, not a run.
     - Search against S0 12/31: 2/16 (12.5%, against 39%) gives p ≈ 0.06 and does not settle; only 1/16 or fewer does.
     - Checkout against 16/16: 12/16 gives p = C(28,12)/C(32,16) ≈ 0.051 and does not settle.
     - Campaign 4 reverted S3 for search 12/16 → 3/8 runs (`store-campaign4-last.md:17, :122`). This rule would have kept it.
     - S4 is the plan's own named weak case, and this guard is nearly blind to it.
   - **Repair:** the "Experiment sequence" section must pre-register the smallest fall each guard can detect, as `attempt-4/S3-plan.json` did. Keep an arm only when each guard passes a non-inferiority margin. When a guard cannot settle at the planned count, extend it or count the arm as failed. Never keep an arm whose guard fall is unsettled.

2. **Change 2 makes the paging oracle accept more transcripts, but the plan says "the claim keeps its words" and asks the user nothing (high, referred).**
   - **Evidence:** `findContinuedRead` (`setupStore.ts:1488-1500`) counts only footers of `read` calls the model made. Today a pass needs the model to choose `read` and then continue it, which is at least two model `read` calls.
   - With the seed's footer counted, a single model `read` at the offset the harness printed passes. The model never picks `read` itself, yet `browser.test.ts:7-8` names that choice as the measured step.
   - The added "seed lacks token" condition is new, but the set of accepted call sequences still grows.
   - **Repair:** add a ruling (call it R8) in "Rulings for the user": "The paging seed becomes a harness `read`; one model `read` at its footer offset passes." Do not count it as non-weakening until the user rules. Whether it weakens the claim is the user's call under "never weaken an oracle's claim", so I refer the judgment to the Orchestrator and the user and do not rule on it.

3. **Part of change 1's stated mechanism is false: `type` keeps `secret` without journeys (medium).**
   - `BROWSER_TOOL_COPY.type` always declares `secret` (`browser/src/core/constants.ts:631-634`).
   - `#create` spreads the copy unchanged (`BrowserToolset.ts:543-547`), and nothing strips it.
   - The 971-token figure is `full − page`, where `page` comes from `inferPageTools`, which also removes `secret` (`setupStore.ts:1581-1590`).
   - **Repair:**
     - In change 1, delete "the `secret` parameter of `type`" from the mechanism.
     - Restate the prediction as 971 minus the cost of `secret`, or measure it in E1.
     - In U1, pin the page task's definitions to `createBrowserToolset(page, { tools })`, not to `inferPageTools`.
     - Keep the rewrite of `browser.test.ts:29-31` from saying `secret` goes away.

4. **Change 6's spec for `plain` cannot be met (medium).**
   - The carry rule keys on lines that start with `#`.
   - `plain` is "plain text, without Markdown" (`constants.ts:587`), and `reading.text()` has no `#` headings. So a `plain` search never carries a section.
   - U4's acceptance "`read` and `plain` list the section" therefore cannot pass.
   - **Repair:** either say that `plain` returns only matched lines, and drop `plain` from that acceptance case, or define headings from the reading's structure rather than a `#` prefix.
   - Also say whether `look` text rows print an `[offset]`. A printed offset would be a `look` offset the model can pass to `read`, which is the foreign-offset problem G-2.

5. **Change 5 bounds `record` and `replay` by cutting off the view's continuation footer (medium).**
   - `#view` returns a complete `look` result: a body of up to 4,000 characters plus its own `call look with offset N` footer (`BrowserJourneyToolset.ts:611-617`). The prefix pushes it over (`:230`).
   - `boundBrowserText` on the whole string cuts the end of the body and drops that footer. It puts the generic view footer in its place (`helpers.ts:608-616`).
   - The toolset already has the correct seam: `#look` shrinks its room by the note length (`BrowserToolset.ts:729-730`).
   - **Repair:** slice the receipt's view to the room left after the prefix (limit minus prefix length), so its footer offset stays exact. If that needs an internal room argument on `perform` or `look`, add it. Otherwise state in change 5 and in the guide that a cut `record` receipt drops its continuation offset. Add a U3 test that pins whichever choice is made.

6. **The L1 framing and some surface claims say more than the code shows (low).**
   - **L1 is documented behavior, not a broken contract.** `scanBrowserOutline` says only referenced rows take part (`helpers.ts:207-213`), and the parameter says "matching elements come first" (`constants.ts:553`). Change 6 is therefore a capability expansion and needs the medium-row treatment; the plan does give it types first and a review.
   - **S2 says the model "cannot write" the wait.** It can: wait text such as "confirmation" would match the inserted line (`setupStore.ts:389`).
   - **S3 says the restart happens "without saying so".** The footer prints `0–N` (`BrowserToolset.ts:760-761, :833`).
   - **Repair:** reword these three passages.

7. **"Model size explains none of the failures" is not supported (low).**
   - On the same A3 bytes, the 4B passed shipping while the 2B went 0/16 (`model4b-last.md:9, :25`).
   - On A2 bytes, the 2B passed shipping 14/16 through the `look` continuation (`toolset-probe-last.md:65`).
   - **Repair:** two classes of defect fail both models: the oversized `record` and the paging path. On top of that, the 2B's shipping failures depend on the exact bytes it sees. Say that instead.

8. **Some decision outcomes have no rule (low).**
   - E1 paging at 3 to 5 of 8.
   - E3 shipping at 5 to 6 of 8.
   - E4's "tool-turn tokens fall" cannot fail, because removing JSON escapes removes tokens by construction. Keeping change 7 therefore rests on the guards alone, which finding 1 shows are weak.
   - **Repair:** give each step a rule for every count, and give change 7 a criterion that can fail.

9. **U1 acceptance step 3 is wrong as written (low).**
   - `--project service` covers 14 test files under `tests/service/`, so it does not list "the six service cases".
   - `setupService.ts` refuses an absent daemon at import, so `vitest list` may throw on a host without Ollama.
   - **Repair:** scope it to `tests/service/browser.test.ts` and state that the daemon is a precondition.

10. **The time budget misses some costs (low).**
    - The warmup loads the model with no `num_ctx` (`setupService.ts:146-151`), so the gate's first case reloads it at 16,384. The resident 4,096 → 16,384 change is recorded in `toolset-probe-last.md:79`.
    - Shipping turns run about 5.5 s each (`read-1.json:259`: 27.64 s over 5 turns), not the 2 to 3.5 s the budget assumes.
    - E2 at 8 attempts × 5 tasks comes to about 12 min, not 8 to 10.
    - **Repair:** add the reload as a measured setup item and rebase the shipping budget on shipping turns.

11. **A `read` seed lists no references (low).**
    - `findUnlistedReferences` starts from an empty set (`setupStore.ts:1191`). Any `ref` call before a `look` in paging now fails the shared oracle, where today it passes.
    - **Repair:** list this under Risks and add a deterministic case to U1.

## Findings outside the claims

- **Change 7 reaches every live tool test, not only the store tasks.** For example, `page.test.ts:347-369` reads tool-message content. E4 and U7 guard only `-t "the store tasks"`. U5 and U7 must run the full service project.
- **"13 journey-tool calls" in Measurements is a count of attempts.** All 13 F-21 attempts fall in cart and checkout, which passed 16/16 (`store-campaign4-last.md:52-67`). They caused no 2B failure, so the harm H1 implies for the 2B is unshown.

## Attacked and held

- **L1 behavior.** A `look` search with no element match returns the view unchanged: `renderBrowserMatches` returns `''` for no rows (`helpers.ts:360`; `BrowserToolset.ts:733-740`). `read-1.json:102-126` shows identical bodies for three different searches.
- **L2.** Journey results are unbounded: `BrowserJourneyToolset.ts:153-164`, and the unowned path at `BrowserToolset.ts:375-390` calls `#boundReceipt` with no clause (`:699-706`).
- **L3.** Tool content is JSON-encoded (`Agent.ts:559-561`; `read-1.json:30`).
- **H1.** 8 page tools plus 7 journey tools: `BrowserToolset.ts:294-307`, `constants.ts:956-963`, `factories.ts:159`, `setupStore.ts:1050-1056`.
- **H2.** The seed is a `look` (`setupStore.ts:1061-1065`), only `read` footers count (`:1473-1500`), and the token line shares "policy" and "token" with the prompt (`:529` against `:1293`).
- **H3.** The search retry predicate omits the shared oracles (`browser.test.ts:214` against `:218`). Consistent with the 4B's single attempt and S0 run 5 ending F1.
- **H4.** The `elapsed` window is `setupStore.ts:1060/:1075`, and no assertion reads `cost` (`:1926-1942`; `browser.test.ts:292-304`).
- **H5.** Checkout uses `includes` (`browser.test.ts:242, :247`), and the journey oracle needs two submissions (`setupStore.ts:1904-1906`, `:1796-1801`).
- **Thinking was off.** `think` is false: `OllamaProvider.ts:51, :80`, `Agent.ts:740-741`, and `createLiveOllama` passes no `think`.
- **Change 2 mechanics.**
  - The retained reading is reused (`BrowserToolset.ts:762-774`), and no match block prints past offset 0 (`:778`).
  - The `read` footer matches `extractFooterOffset` (`:833`; `setupStore.ts:1474`).
  - The proposed heading and paragraph share no word of 3 or more letters with the paging prompt.
- **Change 6 on archived shipping searches.** "shipping cutoff time", "shipping" and "free shipping" each make `# Shipping` a best-scoring line, so its section carries the cutoff line. "free" ties at score 1. "delivery" and "delivery time" (`run-9..11/read-3.json`) still match nothing.
- **Arithmetic.** The S0 counts 12/31, 16/18, 15/16 G-10 and 13 F-21 are right. 9/256 is right, and 1 − 0.05^(1/16) = 17.07%.
- **Rulings.** No bound, attempt count, limit, predict or temperature is raised. `capture` stays in the library. The proposed `look` description is 66 characters.

**FAIL**: findings 1, 2 (needs a user ruling), 3, 4 and 5 need changes before any unit launches.
