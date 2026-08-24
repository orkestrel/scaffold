# D2a reconciliation — mcp adopts `ProcessOptions.delivery`

Lanes: planner (Opus 5, subjective) and analyst (GPT-5.6 Sol, journaled exec
`tmp/codex/d2a-analyst.jsonl`). Ruled by the Orchestrator, 2026-08-24.

## Rulings

1. **Shape: a defaulted `readonly delivery?: number` leaf on `StdioClientTransportOptions`.**
   Subjective lane's position adopted. `DEFAULT_MCP_DELIVERY = 10_000` in
   `src/server/constants.ts`; `delivery: 0` opts out with the supervisor's own meaning; any other
   value forwards verbatim with no second validator (`validateTimer` in the `Process` constructor
   owns the range). The objective lane's option-only mirror loses to the false-published-claim
   fact (`StdioClientTransport.ts:32` promises a dead peer surfaces at the caller, and the
   unbounded wedge makes that false by default) and to the package's own precedent
   (`DEFAULT_MCP_REQUEST_TIMEOUT`, `DEFAULT_MCP_SESSION_TTL`, `DEFAULT_MCP_KEEPALIVE_INTERVAL`).
   The magnitude is judgment; the load-bearing property is the ordering
   `DEFAULT_MCP_DELIVERY < DEFAULT_MCP_REQUEST_TIMEOUT`, pinned by an executed assertion.
2. **Vocabulary: `delivery`, not `timeout`.** Both lanes effectively agree; the word is the
   supervisor's, the concept is the supervisor's, and `timeout` in this package already means a
   request/response deadline. The divergence from `ProcessOptions`'s omission behavior (omitted
   here selects the default rather than unbounded) is named in the option's `@remarks`.
3. **Voice: the objective lane's split.** `'stdio transport is not connected'` stays for the
   no-live-child arm; a `false` from `child.send` with a live child throws a plain `Error` with
   exactly `stdio transport could not deliver the message`. The dependency does not disclose which
   cause produced `false`, so no message claims one. The subjective lane's per-cause expiry voice
   (`did not deliver within Nms`), its `#faulted` field, and its U1 ordering probe are dropped —
   the claim they existed to support is no longer made. Diagnosis guidance (a live child not
   reading its stdin versus a child that never answers) moves to the guide.
4. **Pinning tests.** The reusable fixture lives in `tests/setupServer.ts`: a real `node -e`
   child that writes a readiness notification, never attaches a stdin reader, and stays alive on
   a timer; the payload is sized above pipe capacity so the kernel cannot confirm the write. The
   bounded case constructs with a small explicit `delivery`, asserts the exact ruled message,
   asserts the child is still running at rejection, asserts no transport `error`/`close` event
   fired for the expiry, and asserts elapsed AT OR ABOVE the bound (the load-safe direction; the
   settlement budget is the coarse upper bound). The existing unbounded deaf-child test is
   re-pinned with an explicit `delivery: 0` and a comment naming it the unbounded control —
   without that, the default silently re-means it. The constants ordering assertion sits beside
   the transport suite. The omitted-default behavioral case is not run at 10 s in the suite; the
   explicit-bound case plus the ordering assertion pin the mechanism.
5. **`StdioServerTransport.send`: out of scope.** Both lanes agree. Successor ROADMAP row:
   "`StdioServerTransport.send` discards its write's outcome — rule on backpressure and error
   surfacing for caller-owned output streams, and pin the ruling."

## Units (serial in the mcp checkout)

| Unit | Role / engine | Owns |
| --- | --- | --- |
| MCP-A | implementer / Opus 5 | `src/server/types.ts`, `src/server/constants.ts`, `src/server/factories.ts` TSDoc |
| MCP-B | sol / GPT-5.6 Sol | `src/server/transports/StdioClientTransport.ts`, `tests/src/server/transports/StdioClientTransport.test.ts`, `tests/setupServer.ts` |
| MCP-C | implementer / Opus 5 | `guides/mcp.md` |
| MCP-V | verifier | host gates (the transport suite spawns children and a grandchild pipe case — bench sandboxes cannot run it) |

Audit: MCP-A and MCP-C by Sol (analyst); MCP-B by checker/reviewer (non-Sol).
