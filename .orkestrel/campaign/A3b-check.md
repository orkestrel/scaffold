<!-- A3b — checker (Sonnet, native), mechanical close of U3d. Retained from the completion notification, 2026-09-15 (153 s, 28 tool uses). -->

Verdict: PASS

1. Reviewer 6 — met. `guides/mcp.md:4838-4841` names the refresh fence in the declared gap; the Tests bullet at `guides/mcp.md:4419` lists the `Refresh the tools an agent holds` demonstration.
2. Reviewer 7 / analyst 7 — met. `mcp/guides/tool.md` and `tool/guides/tool.md` carry the same line count (454) and identical distinguishing lines (`tool.md:307` "For versions from 0.0.15…", `tool.md:448` the `errors.test.ts` bullet); corroborates the Orchestrator's `cmp` exit 0.
3. Analyst 6 — met. The invariant (diff hunk `@@ -4878,9 +4966,10 @@`) reads `tools.execute(call, context)` with `{ id, name, arguments }` on the call and `signal`/optional `caller` on the context; the envelope spread is gone.
4. Analyst 5 — met. The guide states "The refresh owns the names it installed from the client and replaces or removes tools by name. You must not register a local tool under a name the refresh installed."
5. F1 — met. `MCPServer.ts` `#execute(request, call, options: MCPMethodOptions, progress?)`; `MCPExecutionContext` keeps `signal` and `caller?`; the guide's delegation sentence shows the omitting spread and `passes caller identity to a custom execution handler separately from the call envelope` uses it.
6. F2 — met. `buildToolDescriptors` and `MCPClient#tool` emit `annotations` only when the projection produced a member; `omits annotations on tools/list when a tool only declares untrusted` and `omits wrapped annotations when the wire descriptor has empty annotations` exist.
7. F3 — met. `MCPToolAnnotations` still declares `title?, readOnlyHint?, destructiveHint?, idempotentHint?, openWorldHint?`; `isMCPToolAnnotations` checks only `readOnlyHint`/`destructiveHint` as optional booleans; `validators.test.ts` pins the malformed-`openWorldHint`-accepted case.
8. F4 — met. `AbortToolsInterface` and `ToolRefreshInterface` declared in `tests/setup.ts`; `createAbortTools` and `createToolRefresh` annotated.
9. F5 — met. Fence and `refreshTools` transcription byte-identical; both return `{ installed, collisions, failures }` with `snapshot: readonly ToolInterface[]` annotated.
10. F6 — met. Guide names the `inputSchema: { type: 'object' }` default; `MCPTaskHandler` remark reads "Mint it from `options.caller` and the canonical call".
11. F7 — met. No `refresh`-titled test in `MCPClient.test.ts`; refresh proof only in `tests/guides.test.ts`; `helpers.test.ts` has `describe('tool annotation projections', …)` apart from `describe('buildToolDescriptors', …)`.
12. F8 — met. Surface rows and imports in their files' existing order; `isMCPToolAnnotations` alphabetical among `isMCPT*` entries.
13. Claim-8 tests — met. `helpers.test.ts` asserts `buildToolCall.length` is 2; `refuses an initial remote name collision while adding noncolliding tools beside the local tool` sits beside `adds remote tools beside the local tool from an initial snapshot`.
14. Scope and rules — met. Status lists only `guides/mcp.md`, `guides/tool.md`, `src/core/{MCPClient,MCPServer,helpers,types,validators}.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/src/core/{MCPClient,MCPServer,helpers,validators}.test.ts`; no `src/browser/**`, `tests/src/browser/**`, `tests/fixtures/**`, manifest, lockfile, vendored file; no `any`, bare `as`, `!`, suppression, nested function; `guides/mcp.md` has no `\r`.

Not met: none. Referrals: none.
