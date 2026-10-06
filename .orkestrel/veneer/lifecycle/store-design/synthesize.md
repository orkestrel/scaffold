# synthesize

# Store tasks: one plan for the Orchestrator

Lane: objective. It covers correctness and what the contracts and the user's rulings permit. Naming and copy wording go to the subjective lane under Tensions. The three maps returned no distillate, so I read the sources that decide the plan myself. Where the designs disagreed on a fact, the Design section names the line that settles it.

The following legend maps the short names this plan cites to absolute paths.

- `setupStore.ts`, `setupStore.test.ts`, `setupService.ts`: C:/Users/mikes/WebstormProjects/ollama/tests/
- `browser.test.ts`: C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts
- `OllamaProvider.ts`: C:/Users/mikes/WebstormProjects/ollama/src/core/OllamaProvider.ts
- `BrowserToolset.ts`, `BrowserJourneyToolset.ts`, `helpers.ts`, `constants.ts`, `factories.ts`: C:/Users/mikes/WebstormProjects/browser/src/core/
- `Agent.ts`: C:/Users/mikes/WebstormProjects/agent/src/core/Agent.ts
- Evidence files under C:/Users/mikes/WebstormProjects/ollama/tmp/codex/: `toolset-probe-last.md`, `model4b-last.md`, `store-campaign4-last.md`, `reliability-design.md`, plus `paging-1.json` and `read-1.json` under `store-campaign/attempt-3/S0/run-1/transcripts/`

## Design

### Diagnosis

Model size explains none of the failures I read. The toolset and the harness lead a small model into dead ends. The 4B result supports the user's position: every 4B failure carried the correct answer and failed on a defect (`model4b-last.md:46-50`).

The 2B is sensitive to bytes. Any change to the tool definitions changes its replies (`toolset-probe-last.md:20-41, :56`). So copy that tries to steer it only changes which dead end it falls into, and campaign 4 reverted both of its copy arms (`store-campaign4-last.md:17-18`). Removing a dead end works whatever the bytes are.

**Library defects.** Each is a contract the code does not keep.

- **L1. A `look` search cannot find page text.**
  - The `look` search description promises "Words to find on this page" (`constants.ts:553`).
  - The `scanBrowserOutline` helper skips headings, StaticText, and every row without a reference (`helpers.ts:251-258`), and the `#look` method builds its block from those matches only (`BrowserToolset.ts:732-740`). A search for text therefore returns the unsearched view, byte for byte.
  - The 2B opens shipping with a `look` search in every probe arm (`toolset-probe-last.md:22-25`) and loops on it in every S0 run (F-1, `store-campaign4-last.md:52-67`).
  - The `read` search matches whole words, with no stemming, and prints only the matched line (`helpers.ts:300-314`). So "shipping cutoff time" returns `## Shipping` but not the 2:40 PM line under it (F-2, `reliability-design.md:146`).
- **L2. Journey results have no size bound.**
  - `BROWSER_TOOL_LIMIT` is documented as "Bounds each tool result" (`constants.ts:402-410`).
  - The journey boundary returns the handler's text without cutting it (`BrowserJourneyToolset.ts:153-164`).
  - The `perform` method passes a tool it does not own through `#boundReceipt` with no clause, which cuts nothing (`BrowserToolset.ts:375-390, :699-706`).
  - `record` and `replay` put text in front of a full `look` result (`BrowserJourneyToolset.ts:230, :484, :611-617`). `save` and `edit` put text in front of a listing (`:286, :409`). The 4B's `record` bodies reached 4,087 and 4,086 characters (`model4b-last.md:46-48`).
- **L3. The agent JSON-encodes string tool results.**
  - Tool message content is `JSON.stringify(outcomeResult.value)` (`Agent.ts:557-562`). Every tool result therefore reaches the model as one escaped line, while the seed arrives as raw lines (`paging-1.json:11` against `:31`).
  - The effect is not measured. Its class, G-8, appears in passing and failing attempts alike.

**Harness and oracle defects.**

- **H1. Page tasks advertise 15 tools, and 7 of them are never needed.**
  - `runStoreTask` always passes `journeys` (`setupStore.ts:1050-1056`), and `createBrowserToolset` always passes `page` (`factories.ts:155-160`). So the 8 page tools (`BrowserToolset.ts:294-307`) are listed beside the 7 journey tools (`BrowserJourneyToolset.ts:116-124`).
  - The journey tools cost 971 prompt tokens on the first turn (`paging-1.json:76-80`: page 2,091, full 3,062).
  - The definition bytes alone moved shipping between 0/16 and 14/16 runs (`toolset-probe-last.md:62-65`).
  - The 2B called a journey tool in 13 S0 page attempts (F-21, `store-campaign4-last.md:52-67`). The 4B's unrequested `record` calls failed its search and checkout.
- **H2. The paging oracle counts only a tool the seed never names, and the fixture lets a search skip the continuation.**
  - The seed is a `look` result (`setupStore.ts:1061-1065`), and its footer names `look` (`paging-1.json:5`, `BrowserToolset.ts:833`). The `findContinuedRead` function counts only footers of `read` results (`setupStore.ts:1473-1500`).
  - The 2B followed the seed's footer, reached the token in 7.25 s, and still failed (`paging-1.json:16-50, :69`). In S0, 30 of 48 paging attempts reached the token and none passed (`store-campaign4-last.md:126`).
  - The token's line shares "policy" and "token" with the prompt (`setupStore.ts:527-530` against `:1293`). A `read` search at offset 0 therefore prints the token (F-15; 4B attempt 1, `model4b-last.md:50`). The fixture's own remark says the opposite (`setupStore.ts:422-423`).
- **H3. The search case retries on a weaker test than it asserts.** Its retry predicate leaves out the shared oracles (`browser.test.ts:214` against `:218`). This ended the 4B's search after one attempt (`model4b-last.md:9, :46`), and the same happened to S0 run 5 (status F1, `store-campaign4-last.md:37`).
- **H4. A meter that no assertion reads runs on every attempt.**
  - It makes three full-prompt generate calls per attempt (`browser.test.ts:111-121`; `setupStore.ts:1078-1091, :1602-1615`).
  - In run-1, each single-attempt case spent about 6.1 s outside the transcript's `elapsed`: cart 16.91 − 10.78 s, search 18.52 − 12.40 s, checkout 15.13 − 9.03 s.
  - The `elapsed` reading starts before the seed and stops before the meter (`setupStore.ts:1060, :1075`).
- **H5. Two oracles pin the double submission in opposite directions.**
  - Checkout accepts a duplicate order (`browser.test.ts:242, :247`). 15 of the 16 S0 checkout passes placed two orders (G-10, `store-campaign4-last.md:52-66`).
  - The journey oracle needs at least two submissions in the saved listing so its edit can remove one (`setupStore.ts:1897-1913, :1786-1810`). It therefore depends on the double submission.

**Surface choices a small model trips on.**

- **S1. The model follows the footer of the last result, not the system prompt.** `read` was the first call in 0 of 16 shipping attempts, even though the system prompt says "To learn a fact, call read" (F-19, `reliability-design.md:163`). The seed's footer chose paging's tool (`paging-1.json:16`).
- **S2. The handled-submission receipt asks for a `wait` the model cannot write.** `wait` requires the text to wait for (`constants.ts:440-441, :661-678`). Neither model waits; both submit a second time (`model4b-last.md:48`, F-13).
- **S3. Offsets belong to one tool and one projection, but the copy says otherwise.** The copy says "as the last reply names" (`constants.ts:557, :577`). `read` restarts a foreign offset at 0 without saying so (`BrowserToolset.ts:762-774`, G-2).
- **S4. Search is the weakest case still standing.** It passed 12 of 31 S0 attempts (`toolset-probe-last.md:66`). It fails through the seed's `look` footer (F-10), stale references (G-14), and one daemon 500 (F-11). This plan reaches only the share caused by H1, H3, and L1.

The following readings settle the facts the designs disagreed on.

- The page vocabulary is 8 tools, not 6. `press` and `navigate` register because the factory always passes `page` (`factories.ts:159`, `BrowserToolset.ts:294-307`).
- A `read` seed's footer names `read`, because the footer uses the tool's own name (`BrowserToolset.ts:833`). The claim that every view carries a `look` footer is true only for a `look` seed.
- Neither model ran with thinking. The provider sends `think: false` when the agent sets nothing (`OllamaProvider.ts:51, :80`; `Agent.ts:740-741`). The 2B-against-4B thinking tension does not exist.
- The context window did not truncate. A failing shipping attempt reached 11,135 prompt tokens at `num_ctx` 16,384 (`read-1.json:254`), which is past the `num_ctx/2` cut described in Ollama issue 17427.

### Ranked changes

The following list ranks the changes by expected effect per cost. Implementation time is an estimate of executor time; host time is daemon time inside the experiment sequence.

**1. Page tasks advertise the page vocabulary only.**
- Repository: ollama. Files: `setupStore.ts`, `setupStore.test.ts`, `browser.test.ts` (remarks only).
- Change:
  - Add an optional boolean (provisional name `journeys`) to `StoreTask` and `StoreRunOptions`. Set it true on `STORE_TASKS.journey` only.
  - `runStoreTask` passes the `journeys` option only when the flag is true.
  - Rewrite the remarks at `setupStore.ts:668-672, :1036-1038` and `browser.test.ts:29-42`.
  - Keep `STORE_BOUNDS.context`, because page attempts reach 11,135 tokens (`read-1.json:254`).
- Mechanism: the model cannot call a tool the request does not list. Page tasks lose:
  - the unrequested `record` and `save` calls, and with them the oversized results;
  - the `capture` and `edit` bytes the probe tied to the shipping collapse (`toolset-probe-last.md:45-54`);
  - the `secret` parameter of `type` (`setupStore.ts:1581-1590`).
- Prediction:
  - Zero journey calls in page transcripts, by construction.
  - About 971 fewer prompt tokens on the first turn.
  - No direction is predicted for shipping, because these definition bytes have never been measured.
  - Falsified by a guard fall in cart, checkout, or search.
- Experiment: a deterministic setup test, then E1 and E2. Wall time: about 20 min to implement.

**2. Paging opens on `read`, the oracle counts the seed's footer, and the token's section shares no search word.**
- Repository: ollama. Files: `setupStore.ts`, `setupStore.test.ts`, `browser.test.ts`.
- Change:
  - Add an optional field (provisional name `tool`) to `StoreTask` and `StoreRunOptions` that names the seed tool, `'look' | 'read'`. When omitted, the seed is `look`. `runStoreTask` executes that tool with `STORE_SEED_ARGUMENTS`.
  - `STORE_TASKS.paging` seeds with `read`. Its system prompt equals `STORE_SYSTEM_PROMPT` except that the sentence at `setupStore.ts:133` becomes "The first message shows the page as read returns it."
  - Replace the last `STORE_POLICY` entry (`:527-530`). The heading becomes "Quoting this version" and the paragraph becomes `Quote ${STORE_POLICY_TOKEN} when you write to us, so our workshop can match a message to this version of these terms.` This is the critic's wording, without "your" (`reliability-design.md:138`). Restate the remark at `:422-423`.
  - `findContinuedRead` takes the seed and starts its set of named offsets with `extractFooterOffset(seed)`. A `look` seed yields `undefined` through the read-only regex at `:1474`, so other callers see no change.
  - `matchesPagingOracle` passes `transcript.seed` and also requires that the seed does not contain the token.
  - Update `browser.test.ts:264` and the claim doc at `:23-27`. The claim keeps its words, "a `read` continued at the offset an earlier footer named", and the seed's footer is that earlier footer. The measured step is still the read continuation (`browser.test.ts:7-8`).
- Mechanism:
  - The seed then ends with `call read with offset N for more`, the kind of instruction S1 shows the model follows.
  - The continuation reuses the seed's retained reading (`BrowserToolset.ts:762-774`). It prints no match block past offset 0 (`:778`), so its slice carries the token.
  - A search at offset 0 matches no line of the last section, so the F-15 shortcut is gone.
- Prediction:
  - In E1, the first call is `read` at the seed's footer offset in at least 6 of 8 ports.
  - In E2, paging passes at least 7 of 8 attempts.
  - The 4B passes paging in E5.
  - A result of 3 of 8 or fewer goes to ruling R2.
- Experiment: setup tests, E1, E2. Wall time: about 30 min to implement and about 1.5 min of host time per series.

**3. The search predicate equals its assertion, and each case predicate is exported.**
- Repository: ollama. Files: `setupStore.ts`, `setupStore.test.ts`, `browser.test.ts`.
- Change:
  - `matchesSearchOracle` includes `matchesStoreOracles`, the same way `matchesPagingOracle` does (`setupStore.ts:1511-1513`).
  - The inline predicates of shipping, cart, and checkout (`browser.test.ts:158-172, :191-192, :242-244`) move to exported functions in `setupStore.ts` with the same conditions. Each function takes the store reading it needs as data. The `expect` lines stay.
  - Update the positive search fixtures so they also satisfy the shared oracles.
- Mechanism: a failure on a shared oracle uses a retry the case already has, instead of ending the case.
- Prediction: no search case ends on a shared-oracle failure with attempts left unused. A deterministic test shows a search transcript with a body over the limit is refused.
- Wall time: about 15 min to implement. No host time.

**4. The gate stops metering.**
- Repository: ollama. Files: `browser.test.ts`, `setupStore.ts` (remarks).
- Change:
  - The `attempt` helper passes no meter and builds no provider with `predict: 1` (`browser.test.ts:111-121`).
  - `measureToolCost`, `inferPageTools`, and the `meter` option stay exported and tested. The E1 instrument records the cost once per arm.
  - Rewrite the remarks at `browser.test.ts:31-33` and `setupStore.ts:1040`.
- Mechanism: three full-prompt generate calls disappear from every attempt. No assertion reads `cost`, and the journey oracle does not either (`setupStore.ts:1926-1942`).
- Prediction: time outside `elapsed` falls from about 6.1 s per attempt to at most 3 s. If it stays over 3 s, setup is the main cost, and E2's split names the next lever.
- Wall time: about 10 min to implement.

**5. Every journey result passes the toolset bound.**
- Repository: browser, released as 0.0.27. Files: `BrowserJourneyToolset.ts`, its test, and the guide passage on journey receipts.
- Change:
  - The journey `#create` method takes an optional clause. `#execute` cuts the handler's text with `boundBrowserText(text, this.#limit, clause)` when a clause is set.
  - `record` and `replay` use `BROWSER_TOOL_VIEW_FOOTER` (`constants.ts:472`). `save` and `edit` use `BROWSER_TOOL_CUT_FOOTER` (`:466`). `journeys` keeps its own paging (`BrowserJourneyToolset.ts:351-352`). `forget` and `capture` get no clause.
  - A thrown message longer than the limit is cut with the cut clause and thrown again as a `BrowserError` with its original code and context, as `BrowserToolset.ts:689-694` does.
- Mechanism: one bound applies to every result, as it already does for page tools (`BrowserToolset.ts:651-696`).
- Prediction: a `record` over a page whose `look` result fills the limit fails before the change (body = limit + prefix) and passes after it (body ≤ limit). The largest journey body in E5 is at most 4,000 characters.
- Wall time: about 30 min to implement, plus one review pass. Tests take seconds.

**6. A `look` or `read` search reaches page text, and a matched heading carries its section.**
- Repository: browser, released as 0.0.27. It depends on change 2's fixture. Without that fixture, carrying sections reopens the paging shortcut the prior design refused (`reliability-design.md:115`).
- Change:
  - Types first: add one exported helper beside `scanBrowserText` that returns `BrowserReadMatch` rows. Its rules:
    - Candidates are non-empty lines that do not start with an element reference (`/^e[1-9]\d* /`).
    - Scoring is the same as `scanBrowserText`: distinct shared words, best score only.
    - A best-scoring line that starts with `#` also returns each following non-empty line, up to the next line that starts with `#`. Each carried line is its own row with its own offset.
    - No line appears twice.
  - `#read`, for both `read` and `plain`, uses the helper in place of `scanBrowserText` (`BrowserToolset.ts:778`).
  - `#look` adds its text rows after its element rows, in one block, under a heading line that counts both. The page line, the closing element-count line, and reference rows are never text candidates.
  - The `look` search description names both elements and lines in at most 100 characters. One candidate from the surface design: "Words to find on this page; matching elements and lines come first." (66 characters).
  - Unchanged: offsets, footers, the half-room cap (`helpers.ts:336-341`), and the empty search, which prints no block, so the seed bytes stay the same.
- Mechanism: the search the 2B sends first reaches the line that holds the fact, whichever of the two tools it picks. The view footer "call look with words to find" (`constants.ts:472`) becomes true for text as well as elements.
- Prediction:
  - In E1′, the first shipping call carries a search word that reaches the fact in at least 6 of 8 ports. The toolset's result for that call is deterministic.
  - In E3, shipping passes at least 7 of 8 attempts, and cart, checkout, and search hold.
  - Falsified if shipping passes 4 of 8 or fewer, or if a guard fall holds up at 16 attempts.
- Wall time: about 60 to 90 min to implement, plus one review pass.

**7. String tool results reach the model unchanged.**
- Repository: agent, released as 0.0.27.
- Change:
  - Types first: the tool-message contract states that a string value is the content as is, and any other value is its JSON.
  - `Agent.ts:559-561` sends a string value unchanged, `JSON.stringify(value)` otherwise, and the error string unchanged.
  - Before editing, search the agent, browser, ollama, mcp, and scaffold checkouts for code that parses tool-message content as JSON, and update every such consumer in the same change.
- Mechanism: the seed and every result share one encoding, and the escapes no longer cost tokens in each tool turn.
- Prediction: in E4, prompt tokens of tool turns fall compared with E3 for the same call sequences, and no guard falls. Keep the change only if both hold; otherwise revert it.
- Wall time: about 45 min to implement, plus the consumer search and one review pass.

**Deferred: checkout pins one order, a handled submission settles before its receipt, and the journey oracle stops depending on a double submission.**
These three land together or not at all. Pinning one order by itself would move checkout from 16/16 toward 1/16. A settling receipt by itself would break the journey oracle (`setupStore.ts:1897-1913`). The journey redesign changes a claim. See ruling R1.

**Dropped this round: ending a turn after two identical results** (economics design, change 8).
It saves time only on failing attempts, and changes 1, 2, and 6 target those failures directly. No count exists of attempts that recovered after a repeated result. Revisit it if E5 shows failing attempts still take most of the wall time.

### Experiment sequence

All steps run in series on one daemon. Each draw or attempt uses a fresh store, which means a fresh port. The port is the sampling unit, because a fixed input produced one identical reply in all 16 draws (`toolset-probe-last.md:18`).

The advance rule for a target task is at least 7 of 8 attempts. If the true per-attempt rate were 0.5, that result would occur with probability 9/256 (3.5%).

A guard task (cart, checkout, or search) that falls below its S0 per-attempt rate is extended to 16 attempts. The S0 rates are 16/18 for cart, 16/16 for checkout, and 12/31 for search. An arm is reverted when a one-sided Fisher test at 5% against the S0 counts settles the fall.

The following table gives each step, its daemon time, and its decision. Daemon times are estimates from run-1: a 2B turn takes 2 to 3.5 s (click-1: 10.78 s over 5 turns; paging-1: 7.25 s over 2 turns), and a first-reply draw takes about 4 s.

| Step | Run | Daemon time | Decision |
| --- | --- | --- | --- |
| E0 | Unit tests for units U1, U3, U4, U5. Count every search argument in the archived `/policy` transcripts (S0, A2, 4B) to build the fixture word test. | none (minutes of CPU) | Gates the units |
| E1 | First replies, arm H (changes 1 to 4), 5 tasks × 8 ports | about 3 min | Paging: `read` at the seed's offset in at least 6 of 8 → go on; 2 of 8 or fewer → put R2 to the user before E2. Other tasks: record first calls as warnings of byte shifts |
| E2 | Single attempts, arm H on browser 0.0.26 and agent 0.0.26, 8 per task | about 8 to 10 min | Paging at least 7 of 8; guards as defined; also read the setup time per attempt |
| E1′ | First replies, arm H+L, shipping plus the 3 guard tasks × 8 ports (the `look` description bytes change) | about 2 min | Shipping's first search reaches the fact |
| E3 | Single attempts, arm H+L (browser pack with changes 5 and 6), 8 per task | about 8 to 10 min | Keep L if shipping passes at least 7 of 8 and no guard falls |
| E4 | Single attempts, arm H+L+A (agent pack), 8 per task | about 8 to 10 min | Keep A if tool-turn tokens fall and no guard falls |
| E5 | 16 full store-task runs on the kept arm; 4B: 2 runs; journey case: 1 run | about 16 to 20 min, plus 5 min, plus 1 to 3 min | Per-task run passes, runs that pass all five, upper failure bound; 4B passes all five; largest journey body ≤ 4,000 |

The total is about 55 to 65 min of daemon time, plus about 1.5 min for one store-task run after the re-pin.

Sixteen clean runs match the S0 population for direct comparison. They bound the per-run failure rate under about 17% at 95% (1 − 0.05^(1/16)).

### Per-case time budget

The following table gives each case's budget when it passes on its first attempt with the meter off. Each budget is the run-1 `elapsed` plus setup, which change 4 predicts at 3 s or less and E2 measures. The gate asserts none of these. The series and the confirmation report each case's duration and attempt count, and a case over budget is read from its transcript.

| Case | Budget | Basis | Run-1 duration |
| --- | --- | --- | --- |
| Shipping | ≤ 20 s | 2 to 3 turns at 2 to 3.5 s each | 86.25 s (3 attempts) |
| Cart | ≤ 15 s | `elapsed` 10.78 s | 16.91 s |
| Search | ≤ 16 s | `elapsed` 12.40 s | 18.52 s |
| Checkout | ≤ 12 s | `elapsed` 9.03 s | 15.13 s |
| Paging | ≤ 12 s | `read` seed plus 2 turns (paging-1: 7.25 s) | 36.66 s (3 attempts) |
| All five store tasks | ≤ 75 s | sum of the above | 173.5 s |
| Journey | about 45 to 50 s per attempt | meter removed | 153.42 s (3 attempts) |

A failing attempt costs up to 8 turns, about 20 to 28 s (run-1 shipping attempts). At S0's search rate of 12 in 31, search averages about 2 attempts, or about 30 s. Its budget holds only if E2 to E4 raise that rate.

### Rulings for the user

- **R1. Double submission.** Recommendation: defer to one later round that lands three parts together:
  1. Checkout requires exactly one order.
  2. A handled submission's receipt waits for the page's first change inside `BROWSER_TOOL_TIMEOUT_MS` minus `BROWSER_TOOL_CAPTURE_MS`, or `wait` accepts a call with no text.
  3. The journey task removes some step that a single submission leaves behind; the user picks that step.

  Until that round lands, a checkout pass can include a duplicate order.
- **R2. Paging fallback.** If E2 shows paging at 3 of 8 or fewer, the remaining option is to count a continuation by the same tool, with the `look` seed counted. That widens "continues a read" (`browser.test.ts:255`). Recommendation: refuse it.
- **R3. The token loses its "policy reference token" label.** The answer is never asserted (`browser.test.ts:23-27`), so the claim stands. Recommendation: allow it.
- **R4. Publish browser 0.0.27 (changes 5 and 6) and agent 0.0.27 (change 7) after E4.** Both change behavior across the fleet.
- **R5. Acceptance size.** 16 clean runs bound per-run failure under about 17%. 29 runs bound it under 10% (`store-campaign4-last.md:203`) and take about 35 min at the predicted run time.
- **R6. The user's premise and the 4B.** Two 4B runs (about 5 min) can disprove "a 2B pass implies a 4B pass" for this gate, but cannot certify it. The research matrix, row 4, finds that the best format differs by capability. Recommendation: 2 runs in E5, and one 4B run at each release.
- **R7. Journey case in the gate.** It took 153.42 s in run-1, passed 4 of 16 S0 runs as the harness design reported, and its oracle is tied to R1. Recommendation: run the tuned gate as `-t "the store tasks"` and keep the journey case for releases until R1 lands.

## Alternatives

The following options each have a constraint in their favor, with the reason this design wins.

- **Count a same-tool `look` continuation in the paging oracle** (harness design). For: no seed change, and the 2B already takes that path. Against: it widens the stated claim (`browser.test.ts:23-27, :255`), and the `read` seed reaches the same continuation without widening anything. Held as R2.
- **Use a "Policy token" heading and count offsets named by match rows** (harness design). Against: the heading becomes a `read` match row that names an offset. That invites a read at the row's offset, which the strict oracle refuses, and counting row offsets widens the claim.
- **Narrow the page vocabulary with an agent scope, dropping `plain`, `press`, and `navigate`** (surface design). For: the tool-count research (matrix rows 1 and 10). Against: the proof claims the vocabulary `createBrowserToolset` ships with a page (`factories.ts:135`), and `journeys` is the opt-in option. This is the next lever if E2 to E4 show those tools in failing paths.
- **Restrict `look`'s search description to element names and print a zero-match line** (prior design rank 1 and its critic). For: a smaller behavior change, with no added overlap between `look` and `read`. Against: S3's zero-match line left shipping at 0/8 and cut search to 3/8 (`store-campaign4-last.md:17, :114-127`). The 2B opens shipping with a `look` search either way, so the fix that holds makes that search work.
- **Drop the view from `record`'s receipt.** Against: the view is pinned by `BrowserJourneyToolset.test.ts:993-1001` and the guide, as the economics design reported.
- **Seed shipping with `read`.** Against: it leaves L1 in place for every consumer and turns shipping into a second continuation case.
- **Run the cases concurrently.** Against: one CPU-bound daemon gains no throughput, and the repeatability of first replies was measured with serial runs.
- **Lower the `STORE_BOUNDS` deadlines.** Against: deadlines bound hangs, not passing runs, and no hang is recorded.

## Constraints

The following lines constrain the design.

- `setupStore.ts:1050-1056`: journeys are always passed. `:1061-1065`: the seed is a `look`. `:133`: the system prompt says the seed is a `look` view. `:1271`: each task can carry its own prompt.
- `setupStore.ts:1405-1412`: the shared oracles, including the body bound. `:1473-1500`: only `read` footers count. `:1511-1513`: the paging oracle.
- `setupStore.ts:1602-1615, :1078-1091`: the meter. `:1060, :1075`: what the `elapsed` reading covers.
- `setupStore.ts:1897-1913, :1786-1810`: the journey oracle needs two submissions. `:527-530, :422-423`: the token fixture and its remark.
- `browser.test.ts:7-8`: the measured steps. `:23-27, :255`: the paging claim. `:29-42`: the stated journey condition. `:111-121`: the meter. `:214, :218`: the search predicate against its assertion. `:242, :247`: `includes` on orders.
- `BrowserToolset.ts:294-307`: the page tools. `:375-390, :699-706`: unowned tools are not bounded. `:651-696`: the page boundary. `:732-740, :778`: match blocks. `:762-774`: reuse and restart. `:833`: the footer names its own tool.
- `helpers.ts:251-258, :300-314, :336-341, :608-616`: the search and bound rules.
- `BrowserJourneyToolset.ts:116-124, :153-164, :230, :286, :409, :484, :611-617`: journey tools and composed results.
- `constants.ts:402-410, :440-441, :466, :472, :532-541, :553`: the limit, the receipt status, the footer clauses, the copy rules, and the `look` search description.
- `Agent.ts:557-562, :740-741`: tool content encoding and the `think` setting. `OllamaProvider.ts:51, :80`: `think` defaults to false.
- C:/Users/mikes/WebstormProjects/ollama/guides/README.md:21, :47: `guides/browser.md` is a mirror and must be refreshed, never edited.

## Refusals

The following options are ruled out.

- **Raising attempts, the iteration limit, predict, temperature, a budget, or `BROWSER_TOOL_LIMIT`.** The user ruled: "no raised budget, attempt count, iteration limit, predict, or temperature". Raising the limit would also weaken the shared oracle.
- **Exempting journey results from the shared bound, or accepting a token seen in a match block as paging success.** The user ruled: "never weaken an oracle's claim".
- **Copy that says where the cutoff or the token is, and the "open its page first" sentence.** The user ruled: "no copy that answers a task" and "rank 4 ... is refused".
- **Removing `capture`, or a parameter description over 100 characters.** The user ruled: "the capture tool is a wanted feature ... the 100-character parameter-description bound ... stands".
- **Unwrapping JSON in the ollama provider.** AGENTS.md: "No compatibility shims. Update every consumer in the same change."
- **A fake provider in unit tests.** AGENTS.md: "NEVER use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior." Use a recorder and the scripted transport the setup tests already use (`setupStore.test.ts:1422`).
- **Editing `ollama/guides/browser.md`.** README.md:47: "Refresh a mirror from its own repository rather than editing it here".

## Measurements

The following readings were supplied or read for this plan.

- 2B S0 run passes: shipping 0/16, cart 16/16, search 12/16, checkout 16/16, paging 0/16.
- 2B S0 attempt passes: 0/48, 16/18, 12/31, 16/16, 0/48 (`store-campaign4-last.md:33-48`, `toolset-probe-last.md:64-66`).
- With A2 definitions, shipping and search each passed 14/16 runs (`toolset-probe-last.md:62-67`).
- A fixed input gave a repeatable first reply, but the reply changed with the port (`toolset-probe-last.md:18, :56`).
- Prompt cost: bare 1,032, page 2,091, full 3,062 tokens (`paging-1.json:76-80`). Prompt growth reached 11,135 tokens (`read-1.json:254`).
- The 4B run took 344.86 s, with the call sequences for each attempt recorded (`model4b-last.md:5, :23-33`).
- Run-1 durations and `elapsed` values, as the designs read them. Paging-1's `elapsed` was 7.25 s (`paging-1.json:69`).
- 13 journey-tool calls and 15 double-order checkouts in S0 (`store-campaign4-last.md:52-67`).

The following readings are missing.

- How the 6.1 s per attempt splits between setup and the meter.
- First replies and pass rates under page-only definitions, under a `read` seed, and under L or A.
- The effect of the L3 encoding.
- Search's per-attempt rate under any arm in this plan.
- The failure classes of the journey case in S0 (it was excluded, `store-campaign4-last.md:11`).
- A direct timing of one generate call; it is inferred here as 2 to 3.5 s per turn.

## Units

Every executor does its own work, spawns nothing, and reports the commands it ran. Each unit stops at its project boundary. `verifier` runs the tree-wide gates once per repository after integration.

**U1: ollama harness (changes 1 to 4, plus the instrument seam)**
- Role `builder`, engine Sonnet 5.5.
- Owns `setupStore.ts`, `setupStore.test.ts`, `browser.test.ts`. Off-limits: `guides/`, `src/`, and the package files.
- Dependencies: none.
- Brief: changes 1 to 4 as the Design section specifies them. Also export one function that runs the head of `runStoreTask`: navigate, create and start the toolset, seed, and build the prompt. It returns the toolset, the system prompt, the seed, and the prompt, and the caller destroys the toolset. Declare its result type beside `StoreRunOptions`, and have `runStoreTask` call the function.
- Acceptance, cheapest first:
  1. `npx vitest run --config vite.config.ts --project setup tests/setupStore.test.ts` passes with these cases:
     - A page task's toolset lists no member of `BROWSER_JOURNEY_TOOL_NAMES`, and the journey task's toolset lists all of them.
     - `findContinuedRead` counts a `read` at the offset the `read` seed's footer names, and refuses a `look` seed's offset, a `look` continuation, and offset 0.
     - The paging oracle refuses a seed that contains the token.
     - The last `STORE_POLICY` heading and paragraph share no `collectBrowserWords` word with the paging prompt or with E0's list of archived search words, written into the test as data.
     - Each exported case predicate holds for its passing fixture and fails for a transcript with a result body over the limit.
     - The paging prompt differs from `STORE_SYSTEM_PROMPT` only in the seed sentence and passes the 120-word test (`setupStore.test.ts:433`).
     - A real-browser case, following the `attemptStoreTask` pattern at `setupStore.test.ts:1454-1480`, uses a scripted transport that calls `read` at the seed's footer offset, and the result satisfies `matchesPagingOracle`.
  2. `npm run test:setup` and `npm run check` pass.
  3. `npx vitest list --config vite.config.ts --project service` lists the six service cases.
- Review: one `reviewer` pass (Opus 5.5) on numbered claims: the paging claim is kept; the search predicate equals its assertion; no oracle loses a condition.

**U2: ollama instruments**
- Role `builder`, engine Sonnet 5.5.
- Owns `C:/Users/mikes/WebstormProjects/ollama/tmp/probes/store-first.test.ts` and `store-series.test.ts`.
- Dependencies: U1.
- Brief:
  - `store-first` runs one draw per task, arm, and port. Each draw uses a fresh store and an isolated context, runs U1's head function with the arm's flags, and makes one `generate` call with the live settings and the listed definitions. It executes no tool. It writes rows of `{task, arm, port, definitionsSha256, promptTokens, call, arguments, textFirst}` and records `measureToolCost` once per arm. Reuse the archived instrument under `tmp/codex/toolset-probe/instruments/` where it fits.
  - `store-series` runs single attempts through `attemptStoreTask`, with no meter and no retry. It judges each attempt with U1's exported predicates and writes rows of `{task, attempt, port, pass, elapsed, wall, calls, turns}`.
  - The arms and the attempt count are constants in each file. The count is the one the experiment sequence names.
- Acceptance: each file passes `npx vitest run --config vite.config.ts --project probe tmp/probes/<file>` with the count set to 1. It writes one row per draw or attempt, including the port, at settings equal to `STORE_BOUNDS`.

**U3: browser change 5**
- Role `builder`, engine Sonnet 5.5.
- Owns `BrowserJourneyToolset.ts`, `tests/src/core/BrowserJourneyToolset.test.ts`, and the passage in `guides/browser.md` on journey receipts.
- Dependencies: none.
- Acceptance: record the failing command and count before the change, then show the same command green after it: `npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserJourneyToolset.test.ts`. Then `npm run test:src:core`, `npm run check`, and `npm run test:guides` pass.
- Review: one `reviewer` pass on the bound and on the error path.

**U4: browser change 6**
- Role `astra`, engine GPT-6 Astra.
- Owns `helpers.ts`, `BrowserToolset.ts` (`#look`, `#read`), `constants.ts` (the `look` search description), `tests/src/core/helpers.test.ts`, `tests/src/core/BrowserToolset.test.ts`, and `guides/browser.md`.
- Dependencies: U3, because both edit the guide in one checkout, and U1 landed.
- Acceptance: these cases pass:
  - The helper returns a matched heading's section rows, each with its own offset, best score only, skipping reference rows and never repeating a row.
  - On a fixture page whose shipping paragraph lies past the limit, a `look` with "shipping" lists the heading and the paragraph, and the footer names the end of the slice.
  - `read` and `plain` list the section.
  - An empty search prints no block.
  - The copy-limit tests pass.

  Then `npm run test:src:core`, `npm run check`, and `npm run test:guides` pass.
- Review: one `reviewer` pass on the offset and bound invariants.

**U5: agent change 7**
- Role `builder`, engine Sonnet 5.5.
- Owns `Agent.ts`, the TSDoc for the tool message in agent `src/core/types.ts`, `tests/src/core/Agent.test.ts`, the agent guide passage if it states the encoding, and each consumer file the search finds. List those files before editing them. Stop and report any hit inside a checkout another unit holds.
- Acceptance: tests with a recorder provider show that a string reaches the next request unchanged, an object reaches it as JSON, and an error reaches it unchanged. Then `npm run test:src:core`, `npm run check`, and `npm run test:guides` pass.
- Review: one `reviewer` pass.

**U6: measurements E1 to E5**
- Role `verifier`, engine Sonnet 5.5. It edits no source.
- Dependencies: U2. E3 needs the browser pack built from U3 and U4; E4 needs the agent pack from U5.
- Brief:
  - Work in a detached ollama worktree, with packs installed by `npm install --no-save` (`model4b-last.md:74`).
  - Record the daemon version and the model digest before and after each step.
  - Launch through the dispatch skill's `launch.ts` with a cap.
  - Write records under C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign5/.
  - Apply the decision rules as written, and stop at the first rule that fires.
- Acceptance: each step's record has the identity readings, one row per draw, attempt, or run, and the outcome of its rule.

**U7: re-pin, after the user publishes browser 0.0.27 and agent 0.0.27**
- Role `builder`, engine Sonnet 5.5.
- Owns ollama `package.json`, `package-lock.json`, and the refresh of the `guides/browser.md` mirror.
- Acceptance: `npm run test:service -- -t "the store tasks"` passes once.

## Tensions

The following points need a ruling from the subjective lane or the Orchestrator.

- **Naming, for the subjective lane:** the seed-tool field (`tool` or `view`), the `journeys` flag, the paging prompt constant, the section-search helper, the head function and its result type, the names of the case predicates, and the wording of the `look` search description.
- **The stated condition at `browser.test.ts:29-35` changes.** The user's ruling puts the change in scope, and the journey case keeps the claim that page and journey tools work side by side.
- **Change 6 widens `look`'s search toward `read`'s.** The overlap research (matrix row 1) argues against that. E3's guards decide.
- **Fleet-wide byte changes.** Changes 5 to 7 shift the prompt or results of every consumer.
- **Engine routing.** The routing record says the desktop app's `sonnet` alias serves Sonnet 5. Launch `builder` and `verifier` units on an engine measured to serve Sonnet 5.5, or on Sol.

## Risks

- Any byte change can flip cart or checkout off 16/16. The guards in E1 to E4 read it.
- Under the `read` seed, the 2B might call `look` at the `read` offset, which belongs to a different projection. That would be an honest failure; E1 reads it.
- Carrying a section makes match blocks larger, so the half-room cap shortens the slice. Continuation offsets stay exact.
- Cutting a `record` receipt removes `look`'s offset footer, so a continuation after `record` goes through a `look` search.
- Search stays the weakest case (S4). If E4 leaves it under its S0 rate, the next levers are the agent scope and the stale-reference copy (G-14).
- Change 7 can break a consumer that parses tool content as JSON. The consumer search covers this.
- Both releases wait on the user's one-time password.
- Two 4B runs cannot certify the 4B.
- Measurement uses packs installed with `--no-save` in a worktree, so its identity readings must match the published versions.
