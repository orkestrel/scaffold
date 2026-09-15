# Unit U4b — `@orkestrel/mcp` browser face (successor to U4)

Successor to `tmp/units/U4-mcp-browser-brief.md`. Read that brief in full first; it stays the
brief. This file records what changed between its writing and this launch, and each amendment
here wins over the sentence it amends. Nothing else in U4 changes.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs.

## Why a successor

The core adoption finished a third round (U3d) after U4 was written, and the Orchestrator then
committed the whole core chain as a checkpoint, so U4's Evidence, Standing conditions, and Review
evidence name a state that no longer holds.

## Amendments

1. **Baseline.** The mcp checkout is clean at its HEAD commit `feat: adopt the tool contract in
   the core client and server` (the U3 → U3c → U3d chain committed by the Orchestrator on
   2026-09-15). `git status --porcelain` is empty at launch. Your diff for review is `git diff
   HEAD`; the Orchestrator captures it after you exit. The Orchestrator's authoritative gates on
   that commit all exit 0 (`.orkestrel/campaign/U3d-mcp-gates-orchestrator.log.txt`: `test:src`
   1365 passed over 32 files; policy 90 passed, 1 skipped; config 172 passed, 1 skipped; setup 86;
   guides 168; conformance 47; integration 4).
2. **Landed core, corrected.** Replace U4's "U3's landed core (chain U3 → U3c …)" paragraph's
   pointers with: report `.orkestrel/campaign/U3d-mcp-finish-report.md`, diff `A3b-diff.patch.txt`,
   checker close `A3b-check.md` (PASS). Facts that moved in U3d and that you rely on:
   - `MCPServer`'s private execution takes `(request, call, options: MCPMethodOptions,
     progress?)`; the default path calls `tools.execute(call, { signal, caller? })`; a custom
     `execution` handler receives `MCPExecutionContext { request, call, tools, signal, caller?,
     progress? }`.
   - `buildToolDescriptors` and `MCPClient#tool` omit `annotations` when the projection produced
     no member. `toolAnnotationsToMCP` maps `pure → readOnlyHint`, `consequential →
     destructiveHint`, and drops `untrusted`; `mcpAnnotationsToTool` is the inverse. Both are
     exported from `@src/core` (`src/core/helpers.ts:793`, `:813`). `isMCPToolAnnotations`
     validates only the consumed hints.
   - `buildToolCall(request, args?)` mints `{ id, name, arguments }` (`src/core/helpers.ts:651`).
   - The guide's `## Surface` rows for these helpers are in place; the guide's executed refresh
     fence and its transcription in `tests/setup.ts` exist and are byte-equal. Do not touch them.
3. **Tool declaration, as installed.** `node_modules/@orkestrel/tool` is the accepted tool
   tarball (`tmp/tarballs/orkestrel-tool-0.0.14.tgz`, packed 2026-09-15 after U1d), installed
   `--no-save` together with the agent tarball. The one declaration file is
   `node_modules/@orkestrel/tool/dist/src/core/index.d.ts` (not `types.d.ts`). Members you use:
   `ToolContext { signal; caller? }` (`:161`), `ToolDefinition { name; title?; description?;
   parameters?; annotations? }` (`:174`), `ToolAnnotations { pure?; untrusted?; consequential? }`
   (`:134`), `ToolInterface extends ToolDefinition { summary?; execute(args, context) }` (`:237`),
   `ToolManagerInterface { count; add; tool; tools; definitions; execute(call | calls,
   context?); remove; clear }` (`:313`), `ToolCall { id; name; arguments }` (`:151`),
   `createTool(options: ToolOptions)` (`:34`), `createToolManager()` (`:56`), `ToolResult =
   ToolSuccess | ToolFailure` (`:434`). `summary` lives on `ToolInterface`, not on
   `ToolDefinition`, so `publish` iterates `tools.tools()` to reach it.
4. **`guides/tool.md`.** Already byte-identical to the tool checkout's tip (U3d copied it; the
   Orchestrator's `cmp` exit 0 on 2026-09-15). Keep it in Owned so the `cmp` criterion stands,
   and expect no edit.
5. **The parity matrix, to the landed names.** U4 says the matrix from `D1-design-planner.md` § 6
   lands "updated to the rulings in `plan.md`". Apply these concrete corrections when you
   transcribe it, because the planner wrote it before the contract landed:
   - The annotations row names `ToolAnnotations { pure, untrusted, consequential }` (the planner
     wrote `inert`; the landed name is `pure`), projected `pure → readOnlyHint`, `untrusted →
     untrustedContentHint`, `consequential → consequentialHint` by the bridge, and `pure →
     readOnlyHint`, `consequential → destructiveHint` on the MCP wire.
   - The `toolchange` row: the tool registry publishes no events (R4 excluded pending the user's
     authorization of `@orkestrel/emitter` in `tool`); ours is `ModelContextEventMap.change` from
     the document's `toolchange`, and `publish` registers a snapshot the consumer re-publishes
     after changing the registry. Drop the planner's `ToolManagerEventMap` clause and its
     "exceeds" verdict.
   - The origin-scoping row: `createScopeServer`'s `accept` gate and `publish`/`adopt`'s
     `origins`; `createScopeClient` is excluded (R8), so do not name it as ours.
   - The result-shape row: the bridge returns the executed tool's value unchanged; it does not
     project to MCP content blocks. Record the IDL's `Promise<DOMString>` against the README's
     `{ content: [...] }` as the primary source disagreeing with itself, as U4 already says.
   - The shipping-status row: feature detection is `createModelContext` returning `undefined`;
     there is no `supported` flag.
   Every row still ends implement, retain, or exclude and cites its source.
6. **Description fallback.** U4 leaves it to you and asks you to record the choice. Prefer
   `description ?? summary`; when both are absent, decide whether to register with an empty
   `description` (the IDL requires the member) or skip the tool, and record which and why in the
   TSDoc and the guide.
7. **Standing conditions, restated.** `package.json` still declares `@orkestrel/tool` at
   `^0.0.14`; the installed copy is the tarball; do not touch the manifest or lockfile. The
   installed `@orkestrel/agent` is likewise a tarball; this unit does not use it. Windows host,
   Git Bash; `npm run <script>` works; no network; scoped `oxfmt --write` over owned files only.

## Everything else

Objective, Context law, Unknowns, Scope (Owned, Shared, Off-limits), Execution, the surface to
land, Output, Deviation contract, Acceptance criteria, and Review evidence are U4's, unchanged.
