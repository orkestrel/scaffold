# Unit U4d — `@orkestrel/mcp` browser face: fix round after audit A4

Successor to `U4-mcp-browser-brief.md`, `U4b-mcp-browser-brief.md`, and `U4c-mcp-browser-fix-brief.md`
(all in `tmp/units/`; read them first — they stay the brief for the surface). This file carries
the findings A4 reconciled and the Orchestrator's ruling on each, and wins over any sentence it
amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote U4 and
U4c; GPT-6 Astra audits this round.

## What A4 found and what the Orchestrator reproduced

Three blind lanes: reviewer (Opus) `FAIL 2, 10, 11, 14; F1–F4`, analyst (Astra) `FAIL 1–14`,
checker (Sonnet) `FAIL 10, 11, 13; F1, F2`. The Orchestrator's probe P9 in the real `src:browser`
project reproduced: a `client.call` after `page.destroy()` still pending after 1500 ms; `publish`
followed by `tools.clear()` registering nothing; a failing tool rejecting with a fresh `Error`
carrying the failure text (ruled not a defect); the pair usable after a cancelled call (held).
Read `.orkestrel/campaign/A4-audit-reviewer.md`, `A4-audit-analyst.md`, `A4-audit-checker.md`,
and `P9-a4-probe.md` in full before editing.

## Carriers (close every one; each names its ruling)

1. **A call on a disconnected client hangs (reviewer 2, analyst 2, P9; referral R2).** Ruling:
   core fix. `MCPClient`'s request path (`src/core/MCPClient.ts` `#request`) refuses at once,
   with a coded MCP error, when the client is not connected and no `connect` is in flight — a
   30 s deadline on a dead transport is a defect for every face, not only this pair. Pin in
   `tests/src/core/MCPClient.test.ts` (`rejects a request on a client that is not connected`,
   red first) and in the browser suite (`settles calls across page destruction`: a parked call
   rejected at `stop`, a later call rejected at once, a repeat `stop` inert). Document on
   `MCPClientInterface`'s `call` and `tools` rows (or the cancellation section) that a request
   on a disconnected client rejects at once.
2. **`PageServerInterface.destroy` → `stop` (reviewer F1).** Rename to the twin's verb; update
   the type, TSDoc, factory, guide (`## Methods` row, the fence at `### Browser transport`), and
   tests. `ModelContextInterface.destroy` stays (it owns an emitter).
3. **`publish` reconciles a replaced descriptor and a second manager (reviewer F2).** Retain
   `{ controller, descriptor, tools }` per name. On a later `publish`: same manager and an equal
   projected descriptor → untouched (no re-registration, no spurious `toolchange`); a changed
   descriptor or a different manager → abort the old controller and register the new descriptor
   bound to the new manager. Keep `leaves a name it already registered alone on a second call`;
   add `re-registers a name whose definition changed` and `rebinds a name published from a second
   manager` (red first). Replace the guide's remove-then-add workaround prose and the `publish`
   TSDoc with the reconciliation rule.
4. **`publish` snapshots at call time (analyst 5a, P9).** Capture the manager's tools before
   queueing, so the documented "holds now" is true; pin `captures the publish snapshot at call
   time` (`publish` then `clear` still registers the snapshot; red first).
5. **Rejection shape (analyst 5b, P9).** Document on the registered `execute` (TSDoc and guide)
   that a failing local tool rejects with an `Error` whose message is `ToolFailure.error`; pin
   `preserves the failure text in the rejection`.
6. **The `inputSchema` parity row and the `adopt` ruling (reviewer 10).** Correct the row to
   name the direction ("implement, exceeds in the publish direction; an adopted tool carries the
   foreign `inputSchema` as `parameters` and validates nothing"). Record on `adopt`'s TSDoc and in
   the guide the ruling: an adopted tool does not compile the foreign schema into a contract,
   because a hostile or unreadable schema must not break `adopt` for the whole registry, and
   validating foreign input is the foreign handler's job. Fix the browser `#### Helpers`
   introduction to a complete sentence naming the table and move the SSE sentence off it.
7. **`## Methods` table for `WebMCPRegistryInterface` (analyst 10).** Add it; add the parity
   assertion in `tests/guides.test.ts` that every behavioural interface in the browser Surface
   has a Methods table (red first by removing one).
8. **Conditional native-host scenarios (analyst 4).** The feature-detection test records the
   reading; the bridge scenarios always run against the double and additionally against the
   native registry when `'modelContext' in document` is true on the real host, through a
   capability-gated `describe` (never a skip that hides the absence — the absence case stays an
   ordinary assertion).
9. **Interleavings (analyst 6).** Pin: `destroy` from a `toolchange` listener while another
   registration is in flight leaves no registration alive; `publish` queued around a registry
   mutation registers the snapshot; the same name published through two handles on one document
   — state in the guide what WebMCP registration identity is (per name per document; a later
   registration replaces the earlier) and pin the double's behaviour.
10. **Adoption assertions (analyst 7).** Assert every mapped field (`title`, `description`,
    `parameters`, `pure`, `untrusted`, `consequential`) with distinguishable values, and the
    forwarded arguments.
11. **`toolchange` listener removal (analyst 8).** Pin through the double's `EventTarget`: a
    recorder on its `addEventListener`/`removeEventListener` (in the fixture, never on the
    package) shows the exact listener removed at `destroy`.
12. **The double's `ontoolchange` attribute (analyst 9).** Add the IDL `EventHandler` attribute
    to `ModelContextRegistry` (assign, replace, clear semantics); pin `dispatches the IDL
    ontoolchange handler`. `WebMCPRegistryInterface` stays reduced.
13. **Test declarations and weak tests (analyst 12, reviewer 12).** Move `REGISTRY_MEMBERS` to
    `tests/setupBrowser.ts`; replace anonymous functions assigned inside test callbacks with
    named setup helpers or direct-argument callbacks; strengthen: `is inert on a repeat` (prove
    the destroyed flag guards a `publish` suspended across `destroy`); `omits exposedTo when no
    origins were asked for` (read through `readOne`); `hands back a client that is bound but not
    yet connected` (assert the binding); `is narrowed by the same guard the factory runs` (assert
    or rename); `emits nothing more after the handle is destroyed` (listener removal, carrier 11);
    `leaves a name it already registered alone on a second call` (registration identity);
    `reads each registered tool as a tool advertising the inverse projection` (carrier 10).
14. **Pre-campaign reuse gaps (analyst 13).** `tests/fixtures/browserServer.ts` `recordFrame` →
    `createRecorder().handler` with the drain reading `calls`; `src/browser/transports/WebSocketClientTransport.ts`
    `typeof protocols === 'string'` → `isString`. Granted files.
15. **Date phrasing (reviewer F3).** At every site (guide, `factories.ts`, `types.ts` banner,
    fixture, test comments): "the chromestatus record, read 2026-09-15 and last updated
    2026-08-12, reports `Proposed` with `"flag": false` and `"origintrial": false`".
16. **`client` option group (reviewer F4).** `readonly client?: Omit<MCPClientOptions, 'transport'>`
    with TSDoc naming the one omission; the Shape cell unchanged; the barrel type test updated.
17. **Resource Timing buffer (reviewer R1).** In `recordRequests`, raise the buffer with
    `performance.setResourceTimingBufferSize` and clear entries at creation so a full buffer
    cannot make the empty reading vacuous; record it as an observation.
18. **Not defects (recorded).** `WEBMCP_CHANGE_EVENT` beside the `'toolchange'` literal;
    `isWebMCPDocument`'s pre-check sentence; `change` per published tool; `adopt` returning the
    page's own tools — leave them.

## Installed primitives

As U4c: `scaffold/guides/test.md` § Surface, `guides/contract.md` § Surface, the declarations
under `node_modules/@orkestrel/test` and `node_modules/@orkestrel/contract`. A helper whose job an
export does is a defect. Errors are built through the package's own error helpers in
`src/core/errors.ts` (read them before adding the coded refusal in carrier 1).

## Scope

**Owned.** U4c's Owned list, plus `src/core/MCPClient.ts`, `tests/src/core/MCPClient.test.ts`
(carrier 1), `tests/fixtures/browserServer.ts`, `src/browser/transports/WebSocketClientTransport.ts`,
`tests/src/browser/transports/**` (carrier 14), `src/core/errors.ts` (only if carrier 1 needs a
new coded error; report it), `guides/mcp.md`, `tests/guides.test.ts`, `tests/setupBrowser.test.ts`
(if a moved helper needs its setup proof). **Off-limits.** The rest of `src/core/**`, `src/server/**`,
`package.json`, `package-lock.json`, the `scaffold repair` set, `guides/tool.md` (the mirror is
refreshed by the Orchestrator at the tool repack), `dist/**`.

**Baseline.** Dirty with U4c's work on checkpoint `b9ff0b9`; `git diff HEAD` plus untracked files
is your diff for review. Do not revert U4c; correct it. `npm run check`, `npm run test:src:browser`,
and `npm run test:src:core` were green at U4c's exit (Orchestrator's gates); record your baseline.

## Acceptance criteria

1. `npm run lint:check`, `npm run format:check`, `npm run check` exit 0.
2. `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server` exit 0 with
   every carrier's new or strengthened test red first where the carrier says so (captured to
   `tmp/probe/U4d-red.log.txt` and `tmp/probe/U4d-green.log.txt`, per-test output, one heading per
   title; the Orchestrator reads the files).
3. `npm run test:guides` exit 0 with the corrected row, the new Methods table, the parity
   assertion, and the reconciliation prose.
4. `npm run test:setup`, `test:policy`, `test:config`, `test:conformance`, `test:integration` exit 0.
5. `npm run build` exit 0.
6. No local declaration collides with an installed `@orkestrel/test` or `@orkestrel/contract`
   export; no `Promise.withResolvers` or `addEventListener('abort'` observing an abort or event in
   an owned test or setup file; `performance.now()` deadline reads absent from owned tests.
7. Only owned files changed.

## Output

U4's Output shape, plus: one line per carrier naming the closing `file:line` and test title; the
red and green log paths; the carrier-1 error code chosen and why; deviation state.

## Deviation contract

Stop and report on: carrier 1 needing a change outside `MCPClient.ts`/`errors.ts`; a rule
forbidding a named member; the native registry present on this host (report the reading; the
gated scenarios then run). Decide, record, carry on for wording, test placement, and the
reconciliation's equality reading (structural equality of the projected descriptor).
