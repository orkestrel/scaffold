<!-- A4b-O — analyst (GPT-6 Astra, codex exec read-only -C mcp), objective and cross-engine lane of the U4d close; journal tmp/codex/A4b-audit.jsonl. Retained verbatim from --output-last-message, 2026-09-15. Immutable. -->

analyst — OBJECTIVE and cross-engine lane; GPT-6 Astra reviewing Opus 5. Read-only review using the supplied execution evidence.

## Numbered verdicts

1. **BROKEN — The shared request refusal and its required proof are incomplete.** [MCPClient.ts:560](C:/Users/mikes/WebstormProjects/mcp/src/core/MCPClient.ts:560) leaves `#request` unguarded; only `call` and `tools` invoke `#checkSession`. The task client receives the unguarded request function at line 251, and subscriptions send separately at line 503.

   The browser’s required red proof also fails for the wrong reason: [U4d-red.log.txt:290](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U4d-red.log.txt:290) reports `TypeError: page.stop is not a function`, before reaching the disconnected-call assertion. The green log proves the repaired scenario passes, but this red does not bind it to the hanging-call defect.

   **UNRESOLVED vectors:** connect a page pair, stop it, then invoke `client.tasks.task('missing')`, `tasks.update('missing', {})`, `tasks.abort('missing')`, and a fresh subscription’s `next()`. Source inspection predicts task requests waiting for their deadline and the subscription parking until cancellation. Add those pins, then run:
   `npm run test:src:browser -- tests/src/browser/factories.test.ts -t "rejects task requests after page stop|rejects a subscription started after page stop"`.

   Smallest correction: guard session-bound requests at their shared entry and the subscription entry, preserving discovery and connection negotiation. Prove the existing browser regression red with `stop` intact and only the refusal disabled:
   `npm run test:src:browser -- tests/src/browser/factories.test.ts -t "settles calls across page destruction"`.

2. **CONFIRMED — The page terminal is `stop`.** The type at [types.ts:205](C:/Users/mikes/WebstormProjects/mcp/src/browser/types.ts:205), factory at [factories.ts:402](C:/Users/mikes/WebstormProjects/mcp/src/browser/factories.ts:402), guide table, fence, and page tests agree. Tracing the lifecycle references found no retained page `destroy` API. `ModelContextInterface.destroy` remains.

3. **CONFIRMED — Ordinary publication reconciliation holds.** The changed-description/schema and second-manager vectors fail meaningfully in the red log and pass in the green log. The equal-descriptor test checks registration identity and absence of `change`. [ModelContext.ts:157](C:/Users/mikes/WebstormProjects/mcp/src/browser/ModelContext.ts:157) compares the manager and descriptor before retaining a registration. The remove-then-add workaround is gone. Destruction during replacement is separately unresolved under claim 6.

4. **CONFIRMED — Call-time descriptors and rejection shape are pinned.** The publish-then-clear and queued-publication vectors fail in the red log and pass after descriptors move before queuing. The rejection test at [ModelContext.test.ts:225](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/ModelContext.test.ts:225) verifies an `Error` carrying `kaboom`; the green log records its execution. The guide documents that shape.

5. **BROKEN — The guide still contradicts its evidence.** These discrepancies remain:

   - [mcp.md:3209](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:3209) promises destruction touches nobody else’s registrations. The green same-name test at [ModelContext.test.ts:492](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/ModelContext.test.ts:492) proves that destroying the earlier handle removes the later handle’s replacement. The registration-identity paragraph acknowledges this, but the overview, fence, and interface remarks retain the unconditional promise.
   - [mcp.md:4790](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:4790) says `@orkestrel/tool` publishes no events. The installed [ToolManagerInterface:351](C:/Users/mikes/WebstormProjects/mcp/node_modules/@orkestrel/tool/dist/src/core/index.d.ts:351) exposes its emitter; U0g records that installation. Correct the rationale while retaining explicit publication within this unit’s scope.
   - [mcp.md:4801](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:4801) turns G5’s “no counterpart found; unknown” into “WebMCP has no counterpart.” Preserve the source’s uncertainty.

   The directional `inputSchema` wording, adoption ruling, Helpers introduction, Methods table, and historical chromestatus date phrasing are present. **UNRESOLVED vector:** removal of the Methods table has only the writer’s reported negative reading. Settle it by removing that table, running `npm run test:guides`, restoring it, and repeating the command.

6. **UNRESOLVED — Replacement introduces an unmeasured destruction interleaving.** Publish a tool, change its descriptor, subscribe a `change` listener that destroys the bridge, then publish again. At [ModelContext.ts:166](C:/Users/mikes/WebstormProjects/mcp/src/browser/ModelContext.ts:166), aborting the old registration synchronously dispatches the fixture’s event. Destruction can finish before line 168 calls `#register`, which creates another live controller without rechecking destruction.

   Source inspection predicts a replacement surviving destruction; the supplied logs do not execute this vector. Add `registers nothing when destroy runs during replacement unregistration`, then run:
   `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "registers nothing when destroy runs during replacement unregistration"`.

   If reproduced, recheck destruction after releasing the old registration and before creating its replacement. The existing initial-registration interleaving, adoption, listener-removal, and `ontoolchange` tests have green readings. Native scenarios are capability-gated and skipped on the recorded host; native execution remains unmeasured. Its settling command on a capable host is `npm run test:src:browser`.

7. **UNRESOLVED — The named mutations are not demonstrated to go red.** The local registry-member table and anonymous callback assignments were corrected. However, the strengthened [“is inert on a repeat” test](C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/ModelContext.test.ts:458) still appears compatible with deleting the early return from `destroy`: the remaining cleanup operations are individually idempotent.

   Apply that mutation alone and run:
   `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "is inert on a repeat"`.

   The adoption fixture also assigns `true` to both `readOnlyHint` and `consequentialHint`, so swapping their projections appears invisible to its named assertion. Apply that swap alone and run:
   `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "reads each registered tool as a tool advertising the inverse projection"`.

   These are unexecuted mutation hypotheses, not observed failures.

8. **CONFIRMED — The named reuse gaps closed.** `recordFrame` was replaced with `createRecorder` and its handler; WebSocket protocol narrowing uses installed `isString`. The browser recordings and transport tests have green readings. P5b3 explicitly reports no collisions over its stated export-name pattern and `src/**`/`tests/**` population; that result establishes name collisions, not universal semantic reuse.

9. **CONFIRMED — The option group and buffer changes landed.** [types.ts:178](C:/Users/mikes/WebstormProjects/mcp/src/browser/types.ts:178) uses `Omit<MCPClientOptions, 'transport'>`, with a corresponding type assertion. [setupBrowser.ts:176](C:/Users/mikes/WebstormProjects/mcp/tests/setupBrowser.ts:176) raises and clears the Resource Timing buffer before recording. The supplied typecheck and browser gates pass.

10. **CONFIRMED — The supplied scope evidence matches the combined grants.** The A4b diff and status contain the U4/U4c/U4d files and the explicitly identified Orchestrator integrations. They contain no manifest, version, lockfile, or vendored-file change. The tool-guide refresh is attributed to U0g, as the brief requires.

11. **UNRESOLVED — I would not ship this state as 0.0.31.** The Orchestrator logs establish successful gates, including build and the full test chain. They do not settle the request-path, replacement-destruction, or mutation vectors above, and the documented contradictions remain. Resolve those before accepting this foundation for U5 and U4e.

## Findings fitting no claim

None.

## Attacked and held

- Discovery before connection is an intentional, tested capability. A refusal fix must preserve it.
- Descriptor key-order changes compare equal; the cyclic-descriptor test establishes the documented unequal result.
- A fresh error containing failure text is the accepted rejection contract; preserving the original thrown instance is not required.
- Distinct-name registrations survive another handle’s destruction. The ownership contradiction concerns overlapping names.

VERDICT: FAIL 1, 5, 6, 7, 11; outside the claims: none