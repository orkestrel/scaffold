<!-- A4-O — analyst (GPT-6 Astra, codex exec read-only -C mcp), objective and cross-engine lane of audit A4 (mcp browser face, U4 → U4c); journal tmp/codex/A4-audit.jsonl. Retained verbatim from --output-last-message, 2026-09-15. Immutable. -->

analyst — OBJECTIVE and cross-engine lane; GPT-6 Astra auditing Opus 5. Source-only verdict.

1. **UNRESOLVED — In-page server and zero network.** [factories.ts:385](C:/Users/mikes/WebstormProjects/mcp/src/browser/factories.ts:385) constructs and binds synchronously. The network test uses Resource Timing and a completed-fetch control. Attack the counter with a request whose response remains pending when it drains. Command: `npm run test:src:browser -- tests/src/browser/factories.test.ts -t "completes connect"` after adding that control. Expected: the instrument detects the issued request before completion; the unmodified pair reports none. The supplied Orchestrator log records `npm test` exit 0 but omits the browser readings.

   All behavioral commands below are unexecuted. Commands naming proposed pins require those pins to be added first.

2. **UNRESOLVED — Complete destruction.** The teardown closes the client transport before unbinding; `bindServer`’s unbind aborts its outstanding requests. However, the test at [factories.test.ts:1165](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/factories.test.ts:1165) checks disconnected state without calling afterward. The source permits a post-destroy request to enter `MCPClient.#pending`; the closed port silently discards its send, leaving the deadline to reject it.

   Proposed pin: start a parked call, destroy, observe server cancellation and pending-call rejection, destroy again, then call afterward. Command: `npm run test:src:browser -- tests/src/browser/factories.test.ts -t "settles calls across page destruction"`. Expected: every promise settles, the repeat is inert, and the post-destroy rejection’s timing and reason are recorded. An indefinitely hanging call is not established.

3. **UNRESOLVED — Cancellation and continued usability.** [factories.test.ts:1178](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/factories.test.ts:1178) observes the server handler’s abort, but proves subsequent usability only by reading `connected`. Extend it with an executable echo tool and call that tool after cancellation. Command: `npm run test:src:browser -- tests/src/browser/factories.test.ts -t "aborts the hosted handler"`. Expected: the parked handler observes abort and the subsequent echo returns its value.

4. **BROKEN — Native feature-test routing is absent.** [factories.test.ts:1218](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/factories.test.ts:1218) hard-codes `'modelContext' in document` to `false`; [validators.test.ts:99](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/validators.test.ts:99) repeats the assumption. The bridge scenarios always install the double. There is no conditional native-host scenario in `tests/src/browser/**`.

   The failing state is a Chromium document exposing the member: the absence assertions fail while integration still uses the double. Smallest fix: record the detected capability, preserve an isolated absence test, and conditionally execute native-registry scenarios. Runtime verification remains **UNRESOLVED**: `npm run test:src:browser`, expected to report the actual capability and execute native scenarios only when available.

5. **UNRESOLVED — Publication snapshot and failure value.** The source identifies these exact vectors:

   - `const pending = bridge.publish(tools); tools.clear(); await pending`. [ModelContext.ts:90](C:/Users/mikes/WebstormProjects/mcp/src/browser/ModelContext.ts:90) defers `definitions()` until queued execution, contradicting the call-time snapshot wording. Expected from the source: no registration.
   - Publish a real tool throwing `new Error('kaboom')`, then execute its registration. The installed manager returns `error: 'kaboom'`; [ModelContext.ts:185](C:/Users/mikes/WebstormProjects/mcp/src/browser/ModelContext.ts:185) throws `new Error(result.error)`. Expected from the source: rejection with an `Error`, whereas the claim requires the failure’s `error` value.

   Proposed pins and command: `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "captures the publish snapshot|preserves the failure value"`. Expected contractual readings: the entry snapshot is published and rejection equals the failure value. If reproduced, capture descriptors before queuing and throw the stipulated failure value.

6. **UNRESOLVED — Registration ownership and interleaving.** Retaining the controller before awaiting registration protects the ordinary destroy-during-registration path. Existing tests exercise completed publications and distinct names, not overlapping calls.

   Proposed vectors: destroy from the first registration’s `toolchange` callback while another registration remains; queue publications around manager mutations; publish the same name through separate handles, then destroy the earlier handle. Command: `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "contains publication interleavings|isolates same-name registration ownership"`. Expected: no registration survives destruction and no other handle’s registration is removed. The double’s name-keyed deletion at [modelContext.ts:111](C:/Users/mikes/WebstormProjects/mcp/tests/fixtures/modelContext.ts:111) predicts failure for the same-name vector; that does not establish native collision semantics.

7. **UNRESOLVED — Executable adoption.** The implementation forwards the registered record, arguments, and `context.signal`. Attack with distinguishable argument values and assert every descriptor field, including `description` and `untrusted`, which the adoption metadata test omits. Command: `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "adopt"`, after strengthening those assertions. Expected: the foreign handler receives the supplied arguments and cancellation, and every mapped field survives.

8. **UNRESOLVED — Event mirroring and subscription cleanup.** Publication emits through the retained listener; destruction removes it before destroying the emitter. The existing post-destroy emission test cannot establish listener removal because the installed emitter ignores emissions after destruction.

   Proposed pin: record subscription addition/removal outside the fixture registry’s public surface, deliver repeated `toolchange` events, destroy, then deliver another. Command: `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "releases the toolchange subscription"`. Expected: emissions track live events, the exact subscription is removed, and later events produce none.

9. **BROKEN — The double is not member-for-member IDL-faithful.** G5c’s IDL declares `attribute EventHandler ontoolchange`. [ModelContextRegistry:47](C:/Users/mikes/WebstormProjects/mcp/tests/fixtures/modelContext.ts:47) does not implement it; inheriting `EventTarget` supplies no such attribute. This discrepancy is independent of the explicitly accepted return-type contradiction.

   Smallest fix: implement the fixture’s IDL event-handler attribute and its dispatch behavior. The package’s deliberately reduced registry interface need not gain an unused member. Behavioral vector remains **UNRESOLVED**: `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "dispatches the IDL ontoolchange handler"`, expected to invoke the assigned handler and stop invoking a replaced or cleared handler.

10. **BROKEN — Methods parity is incomplete.** [mcp.md:3314](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:3314) publishes `WebMCPRegistryInterface`, but `## Methods` has no table for its callable members. The parity loop at [guides.test.ts:668](C:/Users/mikes/WebstormProjects/mcp/tests/guides.test.ts:668) iterates existing guide tables, so a wholly omitted table receives no method assertions.

    Smallest fix: document that interface’s methods and assert that every applicable behavioral interface has a table. Verification remains **UNRESOLVED**: `npm run test:guides`, expected to fail when the table is removed and pass when restored. The conformance-gap promise that the same scenarios will run against the native global also needs the routing identified in claim 4.

11. **BROKEN — The literal “core untouched” claim is stale.** The supplied diff changes [validators.ts:702](C:/Users/mikes/WebstormProjects/mcp/src/core/validators.ts:702), replacing the annotation guard with `objectOf`. **U4c explicitly grants this change**, so this is a defect in A4’s claim, not unauthorized implementation. The `tests/setupBrowser.test.ts` change also matches the writer’s report-only documentation patch.

    Smallest correction: update A4’s scope assertion to acknowledge U4c’s grant and the integrated shared-file patch. Do not revert the authorized reuse fix. Manifest, lockfile, version, and vendored paths are absent from the diff. The local tool guide and the tool checkout’s committed guide resolve to the same Git blob: `b1e52e8ef70f251a5078cace44f95a0d8cb8d0b5`.

12. **BROKEN — New tests violate declaration rules.** [validators.test.ts:14](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/validators.test.ts:14) declares a test data table locally. Lines 37 and 46 assign anonymous functions inside test callbacks, outside the permitted direct-argument/direct-return exceptions. Move the table into setup infrastructure and use suitable existing handler references.

    The weakest new tests and their unexecuted mutations are:

    - **“emits nothing more after the handle is destroyed”**: delete the registry `removeEventListener` call. The destroyed emitter still suppresses delivery.
    - **“leaves a name it already registered alone on a second call”**: make every subsequent publication a no-op. Registration identity remains unchanged.
    - **“reads each registered tool as a tool advertising the inverse projection”**: omit `description` in `webMCPToTool`. Its assertions never inspect description.

    Each mutation is **UNRESOLVED** until executed. Command: `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "emits nothing more|leaves a name|reads each registered tool"`, applying each mutation separately. Expected: its named weak test remains green; strengthened assertions must reject it.

13. **BROKEN — Reuse gaps remain within the claim’s population.** These predate U4; they are not introduced regressions:

    - [browserServer.ts:90](C:/Users/mikes/WebstormProjects/mcp/tests/fixtures/browserServer.ts:90), `recordFrame`, only appends callback input to `RECORDED`. The installed equivalent is `createRecorder<TArgs extends readonly unknown[]>(): RecorderInterface<TArgs>` at `node_modules/@orkestrel/test/dist/src/core/index.d.ts:128`, with `handler`, `calls`, and `clear`. Use its handler directly; retain HTTP response construction in the drain.
    - [WebSocketClientTransport.ts:84](C:/Users/mikes/WebstormProjects/mcp/src/browser/transports/WebSocketClientTransport.ts:84) spells `typeof protocols === 'string'`. Installed `isString(value: unknown): value is string` has exactly that implementation.

    P5’s export-name comparison cannot detect either semantic overlap; G6’s campaign-diff sweep did not carry them. Verification after correction remains **UNRESOLVED**: `npm run test:src:browser`, expected to preserve fixture recordings and protocol selection.

14. **UNRESOLVED — Readiness for U5 and 0.0.31.** I would not ship this state. Resolve the static defects and obtain the behavioral readings named above before accepting the browser foundation. The supplied Orchestrator log establishes exit 0 for formatting, lint, typechecking, and `npm test`; it contains no build reading or isolated browser-consumer receipt. Release verification requires `npm run build` and, after U5 implements the intended consumer proof, `npm run test:distribution -- --mode release`. Expected: the packed browser entry resolves and completes the page scenario in the isolated consumer.

## Findings fitting no claim

None. The reuse findings belong to claim 13.

## Attacked and held

- **Connected at return:** the effective U4 surface explicitly permits a bound, unconnected client. The implementation, public types, and guide agree; requiring connection before return would contradict that decision.
- **Description precedence:** the installed manager deliberately advertises `summary ?? description`. Reading `definitions()` preserves that advertised description; choosing the summary is not an invented fallback.
- **Omitted annotations:** projection branches preserve explicit `false` and omit absent hints. The source does not invent annotation defaults.
- **Retained helper composition:** parked handlers use installed `waitForAbort`; their directly resolved entry latches serve a different purpose. `readOne` adds a surplus-member check beyond `requireValue`.

VERDICT: FAIL 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14; outside the claims: none