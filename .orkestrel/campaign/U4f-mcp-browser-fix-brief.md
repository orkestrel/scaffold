# Unit U4f — `@orkestrel/mcp` browser face: fix round after audit A4b, and the bridge follows the registry

Successor to the U4 chain (`U4-mcp-browser-brief.md`, `U4b-…`, `U4c-…-fix-brief.md`,
`U4d-…-fix-brief.md`, all in `tmp/units/`; read them first). This file carries the findings A4b
reconciled and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote the chain;
GPT-6 Astra audits this round.

## What A4b found and what the Orchestrator reproduced

Analyst (Astra): `FAIL 1, 5, 6, 7, 11`; checker (Sonnet): `FAIL 10, 11` (10 settled by the
Orchestrator on the scope lists). The Orchestrator's probe P11 (`.orkestrel/campaign/P11-a4b-probe.md`
and the instrument `P11-a4b-probe.test.ts.txt`) reproduced in real Chromium: `client.tasks.task`
after `stop` still pending after 1500 ms; a `change` listener that destroys the bridge during a
replacement's unregistration leaves the replacement registered. Read `A4b-audit-analyst.md`,
`A4b-audit-checker.md`, and the probe before editing.

## Carriers (close every one; each names its ruling)

1. **The refusal guards every session-bound request (analyst 1, P11).** Move `#checkSession`
   to the shared entry `#request` so `call`, `tools`, the task client's requests (`tasks.task`,
   `update`, `abort`, …), and a subscription's request all refuse at once while disconnected;
   discovery and connection negotiation stay exempt (they build the session). A subscription
   started after `stop` rejects on its first `next()` (or at `listen`, whichever the contract
   makes honest — record it). Pin `rejects task requests after page stop` and `rejects a
   subscription started after page stop` in the browser suite (P11 is the red for the task case;
   capture your own red for both). Re-take the red of `settles calls across page destruction`
   with `stop` intact and only the refusal disabled, so the red binds to the hang, not to the
   rename.
2. **The bridge follows the registry (analyst 5b, and the emitter the tool tarball now carries).**
   `node_modules/@orkestrel/tool` publishes `ToolManagerEventMap` (`add`, `remove`, `clear`),
   `emitter`, and `destroy` (read the declaration). `publish(tools)` takes its call-time snapshot
   AND subscribes to `tools.emitter` until `destroy` or until a later `publish` of another
   manager replaces the subscription: `add` registers (through the U4d reconciliation, so a
   replacement re-registers and an equal descriptor is left alone), `remove` aborts that name's
   controller, `clear` aborts every controller this handle made for that manager. The
   subscription's cleanup is the function `emitter.on` returns. Pin `registers a tool the registry
   adds after publish`, `aborts the registration of a tool the registry removes`, `aborts every
   registration when the registry clears`, `follows the later manager after a second publish`,
   `stops following the registry after destroy`. Rewrite the `## WebMCP parity` row and the
   `publish` prose: the registry publishes events; the bridge follows them; "re-publish after
   changing the registry" is gone.
3. **Destroy during replacement unregistration (analyst 6, P11).** After releasing the old
   registration and before `#register`, re-read the destroyed flag; a destroyed handle registers
   nothing. Pin `registers nothing when destroy runs during replacement unregistration` (P11 is
   the red).
4. **Ownership prose (analyst 5a).** Everywhere the guide, the fence, and the interface remarks
   promise that `destroy` touches nobody else's registrations, state the per-name identity
   instead: WebMCP registration identity is per name per document, a later registration under
   the same name replaces the earlier, and `destroy` aborts this handle's controllers — which
   removes a same-name registration another handle made later. The same-name test stays.
5. **The `G5` row (analyst 5c).** Where the guide turned G5's "no counterpart found; unknown"
   into "WebMCP has no counterpart", preserve the source's uncertainty in the row's wording.
6. **Mutation-proof tests (analyst 7).** `is inert on a repeat` must go red when the early
   return in `destroy` is deleted: pin the property the flag guards — a `publish` whose
   `registerTool` suspends across `destroy` registers nothing afterwards (the fixture's `executeTool`
   or a deferred `registerTool` in the double can hold the suspension; keep it inside the double).
   The adoption fixture advertises distinguishable hints (`readOnlyHint: true`,
   `consequentialHint: false`, `untrustedContentHint: true`) and the test asserts each mapped
   member by name so a swapped projection goes red.
7. **Red evidence captured.** As U4d: per-test output to `tmp/probe/U4f-red.log.txt` and
   `tmp/probe/U4f-green.log.txt` (delete `tmp/probe/` before you return after copying both into
   your report verbatim, since the Orchestrator retains them from the report).

## Installed primitives

As U4d, plus `@orkestrel/emitter`'s `on` returning its cleanup (read `scaffold/guides/emitter.md`
§ Methods). A helper whose job an export does is a defect.

## Scope

**Owned.** U4d's Owned list, plus `src/core/MCPClient.ts` (the shared entry), `src/core/MCPTaskClient.ts`
and `tests/src/core/MCPTaskClient.test.ts` (only if the task client's path needs the guard
threaded), `tests/src/core/MCPClient.test.ts`, `src/browser/ModelContext.ts`, `src/browser/types.ts`,
`tests/setupBrowser.ts`, `tests/fixtures/modelContext.ts`, `tests/src/browser/**`, `guides/mcp.md`,
`tests/guides.test.ts`. **Off-limits.** The rest of `src/core/**` (the server's `list_changed`
producer is the next unit's, on the objective engine), `src/server/**`, `package.json`,
`package-lock.json`, the `scaffold repair` set, `guides/tool.md`, `dist/**`.

**Baseline.** Dirty with the U4 chain on checkpoint `b9ff0b9`; the emitter tool tarball and the
refreshed tool mirror are installed (Orchestrator, U0g); the Orchestrator's gates on the U4d tree
are all green (`U4d-mcp-gates-orchestrator.log.txt`).

## Acceptance criteria

1. `npm run lint:check`, `format:check`, `check` exit 0.
2. `npm run test:src:core`, `test:src:browser`, `test:src:server` exit 0 with every carrier's
   test red first (captured).
3. `npm run test:guides` exit 0 with the rewritten rows and prose.
4. `npm run test:setup`, `test:policy`, `test:config`, `test:conformance`, `test:integration`,
   `build` exit 0.
5. No local declaration collides with an installed `@orkestrel/test` or `@orkestrel/contract`
   export; no deferred, poll, or deadline read where an export exists.
6. Only owned files changed.

## Output

U4d's Output shape, plus the red and green logs verbatim and the subscription-cleanup reading
(what `emitter.on` returns in the installed emitter).
