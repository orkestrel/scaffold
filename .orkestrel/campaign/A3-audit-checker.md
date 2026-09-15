<!-- A3-C — checker (Sonnet, native), mechanical lane on the U3 → U3c chain, blind. Retained from the completion notification, 2026-09-15 (145 s, 14 tool uses). Abridged. -->

MECHANICAL lane (`checker`), round A3.

1. UNRESOLVED — needs executed evidence (the duplex-cancellation test exists at `MCPServer.test.ts`, diff `A3-diff.patch:1391-1402`).
2. CONFIRMED — `buildToolCall(request, args?)` drops the `caller` parameter and spread (`helpers.ts`, diff `:729-741`); `MCPServer.ts:653` calls it without a caller; `options.caller` flows only into the execution context on both paths (`:686-698`); tests assert `Object.hasOwn(context.call, 'caller') === false` (diff `:1438`) and a clean envelope (diff `:1552`).
3. UNRESOLVED — wiring present (`#execute(name, args, context)` → `call(name, args, { signal: context.signal })`, diff `:636-644`; test at `:1290-1331`); behaviour needs execution.
4. CONFIRMED (declaration scope) — `MCPToolAnnotations` is the package's own wire type with external field names and TSDoc naming "the MCP 2026-07-28 specification" (`types.ts`, diff `:866-879`); `toolAnnotationsToMCP`, `mcpAnnotationsToTool`, `isMCPToolAnnotations` exported with `@example` (diff `:780-818`, `:930-954`); `untrusted` never mapped outbound; all three unit-tested.
5. UNRESOLVED — the executed refresh transcription exists (`registerToolRefresh`, diff `:976-1076`; `refreshTools`/`createToolRefresh` in `tests/setup.ts`, diff `:1136-1198`), no polling, plain `for await` over `listen`; passing needs execution.
6. CONFIRMED (textual) — the `execution` TSDoc now says the default path forwards the request signal and optional caller (diff `:886-895`); the non-goal framing is untouched; the removed "conformance gap" paragraph is replaced with prose that does not call it a gap (diff `:160-186`).
7. BROKEN — no `src/browser/**`, `tests/src/browser/**`, `tests/fixtures/**`, manifest, lockfile, or vendored change; but `guides/tool.md` in mcp is NOT byte-identical to the tool checkout's current tip: the tool guide moved after the copy (`isToolError` under `### ToolError`; `toolToDefinition` summary; the "For versions from 0.0.15" sentence; the `variants`/`matched` wording and `Arguments did not parse`; the `errors.test.ts` Tests bullet). U3b criterion 4's byte-identity half is not met on the current tip.
8. UNRESOLVED, split — rule conformance holds (no `any`/`as`/`!`, no suppression, real transports, the bound-method form at diff `:602-627`, every projection helper exported and tested); the mutation-naming row needs execution.
9. UNRESOLVED — judgment; blocked by 7.

Re-dispatchable instruction: regenerate `guides/tool.md` in mcp as an exact byte copy of the tool checkout's current tip, then re-run `test:guides`.

VERDICT: FAIL 1, 3, 5, 6, 7, 8, 9; outside the claims: none

<!-- Orchestrator: claim 7's break is a landing-order fact, not a U3 defect — the copy was identical when made (U3c's SHA-256 matched) and U1d moved tool's guide afterwards. Carried: the mcp mirror refresh is a U4 carrier (U4 owns mcp's guides); the ollama and agent mirrors are refreshed at landing after tool is final. Claims 1, 3, 5, 6, 8's execution halves are settled by the Orchestrator's mcp gate run (`U3c-mcp-gates-orchestrator.log.txt`, all exit 0). -->
