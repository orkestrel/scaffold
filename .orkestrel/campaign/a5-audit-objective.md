Lane: objective (analyst, GPT 6 Astra)

1. **CONFIRMED — The hop is real.** Searched `tests/setup.ts`, `tests/guides.test.ts`, and `vite.config.ts` for transport replacement and setup hooks. The global transport recorder is declared but never installed there. The socket cases omit the `fetch` option. `AgentProvider.ts:91` binds the global transport to its receiver. The Orchestrator’s route mutation makes the socket cases fail, excluding a direct-handler bypass.

2. **CONFIRMED — The dispatcher owns the route answers.** The installed router derives `HEAD` only from a registered `GET`; it adds `OPTIONS` when answering automatic options requests, not to this method-refusal header. The server boundary produces neither tested answer. The supplied refusal probe records `405`, `Allow: POST`, and `404`. The tests consume each response body. A listener that never starts cannot satisfy these assertions.

3. **CONFIRMED — The authorization refusal crosses the socket.** The supplied probes establish the HTTP error and unentered upstream. Source inspection excludes the proposed counter defect: `ScriptedProvider.stream()` increments `started` independently of the recording option. The error reader appends no excerpt for an empty body. The flagship case retains the error-class, code, status, exact-message, and upstream-counter assertions.

4. **CONFIRMED — The comparisons are independent within the script’s scope.** The flagship case compares against the literal and a separate provider instance. Each provider owns its cursor; neither mutates the shared script. The direct result bypasses the relay framing and HTTP reader. This proves the supplied content-only result, without establishing coverage for additional result fields.

5. **CONFIRMED — The parked-pull cancellation establishes adapter abort.** The restored socket case passes in the Orchestrator’s control record. The recorder increments `steps` before awaiting the gate and records the signal’s state when its return method runs. Assertions precede gate resolution and server shutdown. The provider deadline is 120,000 ms; the condition waits have 1,000 ms budgets.

   The response pump cannot obtain a chunk while this gate remains pending, excluding its chunk-processing exit as an alternative cancellation source. Returning the unstarted inner generator closes it; after gate resolution, the relay’s settled-state check discards the late result. This proves cancellation before the first delivered chunk, not cleanup after a generator body has begun executing.

6. **BROKEN — Added comments overstate the evidence.** At `tests/guides.test.ts:567–569`, the comment attributes the reused-socket wait to the whole drain budget. The supplied `trip-then-cancel` measurement is **3011.2 ms**, with `pending=0` and `upgraded=0`; the default drain budget is **10,000 ms**. The implementation clears the drain deadline before awaiting socket closure.

   **Smallest fix:** attribute the measured delay to socket closure and retain the isolated-listener rationale. At lines 456–457, narrow “runs as written, apart from the host” to the handler, dispatcher, and listener composition: signal registration is also substituted. Remove the credential-isolation assertion at lines 501–503; the fixture supplies no model credential whose retention it measures.

7. **UNRESOLVED — The shutdown budget lacks independent contention evidence.** The monotonic clock and margin over the supplied isolated measurements are appropriate. They do not establish the budget under representative host contention. V3 can establish that the bound survives its gate run.

   **Settlement:** run `npm --prefix agent run test:guides` under representative contention and record the existing shutdown interval across repeated runs. Explain the retained threshold against those measurements and the supplied reused-socket delay.

8. **BROKEN — The shutdown sentence contradicts executed behavior.** I executed a read-only Node probe against the installed server and router. A `/hold` handler awaited a gate. After entry, the probe called the stop method and opened a separate connection to `/probe`, using `Connection: close`.

   Observed output:

   ```text
   listening control 200 {"aborted":false}
   status before fresh request stopping
   fresh request during stop 200 {"aborted":true}
   after-stop control refused
   ```

   The server accepts and dispatches a fresh connection while draining. `server/index.js:1878–1897` waits for drain before calling the close helper; the request handler has no stopping-state refusal. The installed declaration and scaffold guide repeat the false ordering.

   **Smallest A5 fix:** change the comment in the guide, TSDoc twin, and substring guard to “signal cancellation, drain, then close the listener.” Record the dependency’s documented-versus-actual shutdown discrepancy for its owner.

   The substitution paragraph also omits the browser fence’s abort-factory replacement with native controllers. **Fix:** name that substitution and its reason, alongside the dynamic-import and message-type substitutions. The dependency declaration, direct byte-limit rationale, and supplied round-trip result otherwise agree with the evidence.

9. **BROKEN — Changed prose violates the code-token noun rule.** Swept `guides/agent.md:1097,1099,1126,1475` and added comment blocks at `tests/guides.test.ts:50–51,456–457,468–470,486–487,501–503,524–525,551–553,567–569`.

   The case-insensitive vocabulary pattern included `should|simply|easy|easier|easiest|just|currently|now|new|latest|soon|utiliz\w*|leverag\w*|via|ensur\w*|guarantee\w*|above|below|since|once|both|one|two`. Manual review treats “new connections” as non-temporal and “One server per case” as an allocation constraint.

   Concrete violations include the package token followed by “declares” at guide line 1097, the limit token followed by “caps” at line 1099, and the interface token followed by “exactly” at test line 501.

   **Smallest fix:** supply the nouns “package,” “option,” and “interface,” and apply the same correction to the remaining bare API tokens. No possessivized-token violation was found in the changed prose.

10. **CONFIRMED — The specified parity holds.** Comparisons of committed blobs establish equality between each titled fence and its TSDoc twin after stripping comment prefixes. Altering a compared factory name makes the comparison fail. The browser pair is unchanged. Clause 36 is identical to the baseline; an altered-clause control fails. The manifest declares no NDJSON package dependency.

11. **CONFIRMED — The stated scope and structural requirements hold.** The commit diff contains only the owned guide, factory, and test files; the factory change is confined to the comment. Setup files are unchanged. TypeScript syntax inspection finds no added prohibited assertion, `any` type, access modifier, or function declaration; a control containing prohibited syntax is detected. Imports occur inside the command callback, and each listener has loopback binding and awaited teardown. Parsed substring assertions retain every prior string and add the required strings.

12. **UNRESOLVED — Preservation holds; whole-package regression remains V3’s gate.** Parsed test-case comparisons establish that the browser-only decoding and byte-limit cases are unchanged. The folded authorization assertions remain present. The Orchestrator’s restored control reports 43 passing guide tests, but it does not replace V3’s authoritative whole-chain reading.

   **Settlement:** V3 supplies results for `npm --prefix agent run format:check`, `npm --prefix agent run lint:check`, `npm --prefix agent run check`, `npm --prefix agent run build`, and `npm --prefix agent test`, in that order.

13. **BROKEN — I would not ship this wording.** The false shutdown explanations and incomplete substitution account prevent acceptance. The cancellation case also calls its scenario “mid-stream” although its gate prevents delivery of the first chunk.

   **Smallest fix:** resolve claims 6, 8, and 9; rename the cancellation case to identify cancellation with the first pull pending. Preserve the authorized fixture shape. Acceptance also requires the evidence outstanding under claims 7 and 12.

**Findings outside the claims:** None. The dependency shutdown discrepancy is substantiated under claim 8.

**Attacked and held:** The optional `serve` entry is an alternative adapter entry; its absence from this server composition does not require another direct-handler test. Automatic options handling does not widen the tested method-refusal header. Returning the parked recorder does not prove that its inner generator’s cleanup body executed, and the test makes no such assertion.

VERDICT: FAIL 6, 7, 8, 9, 12, 13; outside the claims: none