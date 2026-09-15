OBJECTIVE lane — analyst; the writer’s engine. Source-only audit; runtime vectors remain `UNRESOLVED` as instructed.

## Numbered verdicts

1. **UNRESOLVED — default execution cancellation.** The signal reaches `tools.execute` at [MCPServer.ts:951](C:/Users/mikes/WebstormProjects/mcp/src/core/MCPServer.ts:951). The binder suppresses a cancelled unary response at [helpers.ts:1889](C:/Users/mikes/WebstormProjects/mcp/src/core/helpers.ts:1889).

   Run:
   `npm.cmd run test:src:core -- tests/src/core/MCPServer.test.ts -t "aborts default tool execution"`

   Expected: the parked handler observes abort, the caller rejects, and a subsequent echo succeeds. Extend this test to record server writes and assert that the cancelled request receives **no JSON-RPC response**. MCP’s cancellation guidance says receivers SHOULD suppress that response; it doesn’t prescribe a cancellation error response. See the [cancellation specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation).

   Control: remove default signal forwarding; the handler-abort assertion must fail. Neither this vector nor its control ran here.

2. **UNRESOLVED — caller isolation and delivery.** The source attack found no remaining caller spread onto a `ToolCall`: [helpers.ts:651](C:/Users/mikes/WebstormProjects/mcp/src/core/helpers.ts:651) constructs only `id`, `name`, and `arguments`. Default execution, custom execution, and progress execution pass caller separately.

   Run:
   `npm.cmd run test:src:core -- tests/src/core/MCPServer.test.ts -t "passes caller identity|forwards caller context"`

   Expected: supplied caller reaches the handler, absence remains absent, and the call envelope has no caller property. Add an identity assertion using `toBe`; the custom-handler test presently compares caller values structurally. Control: omit caller from the execution context; delivery assertions must fail.

3. **UNRESOLVED — wrapped-tool cancellation.** [MCPClient.ts:808](C:/Users/mikes/WebstormProjects/mcp/src/core/MCPClient.ts:808) passes `context.signal` into `call`; the following branch retains the non-`complete` rejection.

   Run:
   `npm.cmd run test:src:core -- tests/src/core/MCPClient.test.ts -t "forwards a wrapped tool context signal|a wrapped tool throws"`

   Expected: remote handler abort, wrapped-promise rejection, usable connection afterward, and rejection of deferred outcomes. Control: remove the signal option; the remote-abort proof must fail.

4. **UNRESOLVED — metadata across the wire.** The source projections preserve explicit `false`, omit `untrusted`, and declare the external hint names under `MCPToolAnnotations`, with the revision in its TSDoc. The installed tool projection substitutes summary into description; no separate summary field is advertised.

   Run:
   `npm.cmd run test:src:core -- tests/src/core/MCPServer.test.ts tests/src/core/MCPClient.test.ts tests/src/core/helpers.test.ts tests/src/core/validators.test.ts -t "advertises titles|carries title|projects explicit annotation|accepts optional wire hints"`

   Expected: the declared forward and inverse mappings, metadata loss, and malformed-hint refusals. Also exercise each mapped hint **independently**, with its sibling omitted. The supplied projection test couples their presence. Control: omit `readOnlyHint` whenever `consequential` is absent; the independent-hint case must fail.

5. **UNRESOLVED — refresh ownership.** The guide and transcription track installed **names**, while R11 requires replacing only installed **instances**. At [guides/mcp.md:3935](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:3935), membership in `installed` exempts a name from collision detection; line 3941 removes every such name.

   Settling vector: fetch `remote`; replace that registry entry locally with a different tool also named `remote`; refresh again. Assert that the local replacement remains identical and the incoming remote name is recorded as a collision. Repeat after removing `remote` from the server: the local replacement must still remain.

   Have the host create that probe at `tmp/probe/refreshTools.test.ts`, then run:
   `npm.cmd run test:probe -- tmp/probe/refreshTools.test.ts`

   Predicted reading from source: overwrite in the first case and deletion in the second. This prediction is unexecuted. The smallest candidate repair is to retain installed instances and check identity before accepting replacements or removing entries.

   Run the existing advertised outcomes with:
   `npm.cmd run test:guides`

   Expected: add, replace, initial-local collision refusal, and failed-fetch retention pass. Those scenarios never replace an installed remote entry locally.

6. **BROKEN — the guide still documents caller on the call envelope.** [guides/mcp.md:4964](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:4964) explicitly describes:

   ```ts
   tools.execute({ id, name, arguments, ...(options.caller === undefined ? {} : { caller: options.caller }) })
   ```

   The following prose says absence preserves the former `ToolCall` shape. This contradicts [MCPServer.ts:951](C:/Users/mikes/WebstormProjects/mcp/src/core/MCPServer.ts:951), which supplies signal and caller in the separate context.

   **Smallest fix:** rewrite this invariant to describe `tools.execute(call, context)` and remove the obsolete envelope wording. The revised execution TSDoc is consistent with the implementation; the server-initiated-request entry remains under declared non-goals.

7. **BROKEN — the tool guide is not byte-identical to the sibling checkout.** Independently read SHA-256 values:

   - MCP mirror: `9B1DECAD64E102741191DD32AF9BAA5A2E435B6C8D13ECDF7ABC6411AFFBE332`
   - Tool checkout: `795A8EAB4E7EB60459E740B9C97CFC703FABD72C3FD77E32BA9AC8D246274D0A`

   `git diff --no-index -- guides/tool.md ../tool/guides/tool.md` shows substantive differences, including documented contract-error behavior. The upstream file’s modification time is later than the mirror’s; this establishes present drift, not that the writer’s original copy was incorrect.

   **Smallest fix:** refresh the mirror against the accepted upstream snapshot. The supplied status and independently read status list only owned files; browser files, fixtures, manifests, and dependency declarations show no changes.

8. **UNRESOLVED — rules and test strength.** Projection helpers are exported through the core barrel and have authored tests. No prohibited assertion or mock was identified in the added code. Lint, typechecking, and runtime adequacy remain unexecuted.

   Run `npm.cmd run lint:check`, `npm.cmd run check`, and the targeted tests. Expected: clean diagnostics and collected, passing tests.

   The weakest new tests and predicted surviving mutations are:

   - **`aborts default tool execution on a duplex cancellation and keeps the connection usable`**: remove response suppression at `helpers.ts:1889`. This test inspects caller rejection and reuse, not server writes. Run `npm.cmd run test:src:core -- tests/src/core/MCPServer.test.ts -t "aborts default tool execution"`. Expected: this test stays green; the older binder-specific suppression test must redden.
   - **`passes caller identity to a custom execution handler separately from the call envelope`**: clone a plain-record caller before passing it to custom execution. Its `toEqual` assertions do not distinguish reference identity. Run `npm.cmd run test:src:core -- tests/src/core/MCPServer.test.ts -t "passes caller identity"`. Expected: green despite lost identity.
   - **`projects explicit annotation booleans and omits unmapped hints without defaults`**: suppress `readOnlyHint` when `consequential` is omitted. Every asserted mapped input supplies the mapped siblings together. Run `npm.cmd run test:src:core -- tests/src/core/helpers.test.ts -t "projects explicit annotation booleans"`. Expected: green despite incorrect single-hint projection.

   These mutation readings are predictions, each `UNRESOLVED`; no mutation ran.

9. **UNRESOLVED — release readiness.** I would not ship this state as `0.0.31`. Correct the substantiated guide defects, settle refresh ownership, and obtain independent runtime evidence. The writer’s gate report cannot close those questions. The unchanged `0.0.30` manifest follows the unit’s no-bump instruction and is not itself a defect.

## Findings fitting no claim

None.

## Attacked and held

- The caller-contamination source attack found context-only forwarding. Task startup still receives caller through method options after its call envelope loses caller.
- The boolean-truthiness source attack found explicit `undefined` checks, so authored `false` survives. Dropping unmapped hints is the specified projection.
- The scope attack found no browser, fixture, manifest, or dependency edit in the reported change set. The failed mirror comparison is bounded to upstream-byte parity.

VERDICT: FAIL 1, 2, 3, 4, 5, 6, 7, 8, 9; outside the claims: none