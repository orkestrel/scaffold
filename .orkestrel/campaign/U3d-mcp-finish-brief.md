# Unit U3d — `@orkestrel/mcp` core finish round after audit A3 — successor of U3c

## Successor note

U3c closed the core adoption (`U3-mcp-core-report.md`; Orchestrator gates all exit 0). Audit A3
(`A3-audit-reviewer.md`, `A3-audit-analyst.md`, `A3-audit-checker.md`) confirmed the cancellation
seam, the caller context, the metadata projection, and the refresh example, and broke the guide
in three places plus eight edge findings. This unit carries every retained finding.

## Role and engine

`sol` route on GPT-6 Astra, `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/mcp`. Sole writer; the tree carries U3 and U3c's edits. Law, host,
standing conditions, tools and limits as in
`C:/Users/mikes/WebstormProjects/mcp/tmp/codex/U3b-mcp-core-brief.md`. Scope: U3b's Owned plus
`guides/tool.md` (byte copy). `src/browser/**` and `tests/src/browser/**` stay report-only.

## Carriers (close every one)

1. **Reviewer claim 6 — stale enumerations.** Name the refresh fence (`Refresh the tools an agent
   holds`) in the declared gap "Not every guide fence is executed" (`guides/mcp.md:4834-4838`) and in
   the `guides.test.ts` Tests bullet (`:4415`).
2. **Reviewer claim 7 / analyst 7 / checker 7 — the tool mirror.** Byte-copy `guides/tool.md` from
   `C:/Users/mikes/WebstormProjects/tool/guides/tool.md` (the accepted tip) and `cmp`.
3. **Analyst claim 6 — the guide still documents `caller` on the envelope.** Rewrite the invariant
   at `guides/mcp.md:4964` (the fence `tools.execute({ id, name, arguments, ...(options.caller ===
   undefined ? {} : { caller: options.caller }) })` and the prose after it) to describe
   `tools.execute(call, context)` with the caller on the context; remove the obsolete envelope
   wording.
4. **Analyst claim 5 — refresh ownership wording.** The refresh example tracks the NAMES it
   installed. State that rule in the guide beside the example: the refresh owns the names it
   installed from the client and replaces or removes them by name; a consumer must not register a
   local tool under a name the refresh installed. Do not change the example's algorithm.
5. **Reviewer F1 — positional parameters.** `#execute` takes `options: MCPMethodOptions` (or the
   two values it needs from one object) instead of `signal, caller?: unknown` positional slots;
   keep `MCPExecutionContext { signal; caller? }` as landed, and in the guide sentence that tells
   a delegating handler to forward, show the omitting spread (`...(context.caller === undefined ?
   {} : { caller: context.caller })`) and use it in the package's own test.
6. **Reviewer F2 — empty `annotations`.** Emit `annotations` on `tools/list` only when the
   projection produced at least one member; on the client, set `annotations` on the wrapped tool
   only when the inverse projection produced a member; pin both with tests (a tool with only
   `untrusted` advertises no `annotations` key; a descriptor with `annotations: {}` yields a
   wrapped tool without `annotations`).
7. **Reviewer F3 — the guard.** Keep `MCPToolAnnotations` complete as the specification's wire
   body; make `isMCPToolAnnotations` check only the members this package consumes (`readOnlyHint`,
   `destructiveHint`, as optional booleans) and ignore the rest; pin: `{ readOnlyHint: true,
   openWorldHint: 'yes' }` is accepted and maps `pure: true`.
8. **Reviewer F4 — fixture types.** Declare `AbortToolsInterface` and `ToolRefreshInterface` in
   `tests/setup.ts` beside the existing fixture interfaces and annotate both factories.
9. **Reviewer F5 — the fence shape.** Rewrite the published refresh fence to return the outcome
   (`{ installed, collisions, failures }`) with the snapshot annotated, and keep the transcription
   byte-equal to the fence.
10. **Reviewer F6 — two sentences.** Name the `inputSchema: { type: 'object' }` default the wire
    adds for a schema-less tool in the round-trip paragraph; write `options.caller` into the
    `MCPTaskHandler` remark at `src/core/types.ts:1182`.
11. **Reviewer F7 — suites.** Keep the refresh proof in `tests/guides.test.ts` only; leave
    `MCPClient.test.ts`'s suite to the wrapped tool's own context, metadata, and abort cases; give
    the projections their own `describe`.
12. **Reviewer F8 — order.** Move the new Surface rows and imports to the positions their files'
    existing order gives (`guides/mcp.md` validator and helper tables; `validators.test.ts` import
    list; `PUBLISHED_GUARDS`).
13. **Reviewer claim 8 weakest tests.** Strengthen `builds call envelopes without caller identity…`
    so restoring a third `caller` parameter reddens it (assert `buildToolCall.length === 2` or drive
    a third argument and assert it is ignored); add the initial-collision case beside `adds remote
    tools beside the local tool…` so deleting the collision branch reddens the add case too.

## Output

Touched files; `git diff --stat main`; `git status --porcelain`; for carriers 5, 6, 7, 13 the test
titles and exact commands with red-then-green counts; acceptance commands with exit codes and
counts; deviation state.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core`, `test:src:server`, `test:integration` exit 0.
3. `npm.cmd run test:guides` exit 0; `guides/tool.md` byte-identical to the tool checkout's tip.
4. `npm.cmd run test:policy`, `test:config`, `test:setup`, `format:check` exit 0; `git diff --check` exit 0; every touched file LF-only.

**Observations.** `npm.cmd run test:src:browser`; `npm.cmd test`.
