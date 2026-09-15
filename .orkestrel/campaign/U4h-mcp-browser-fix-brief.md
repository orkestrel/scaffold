# Unit U4h — `@orkestrel/mcp` browser face: fix round after audit A4d

Successor to U4g (`tmp/units/U4g-mcp-browser-fix-brief.md`; read it and the chain first). This
file carries the findings A4d reconciled and the Orchestrator's rulings, and wins over any
sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote the chain;
GPT-6 Astra audits this round.

## What A4d found and what the Orchestrator reproduced

Analyst (Astra, `.orkestrel/campaign/A4d-audit-analyst.md`): `FAIL 2, 4, 5, 10` plus `outside O1`;
checker (Sonnet, `A4d-audit-checker.md`): mechanical claims confirmed. The Orchestrator's probe
P13 (`P13-a4d-probe.md`; instrument `P13-a4d-probe.test.ts.txt`; logs `P13-a4d-probe.log.txt`,
`P13-a4d-probe-2.log.txt`, `P13b-a4d-mutation.log.txt`) ran the vectors in real Chromium:

- claim 2 holds: `call`, the task request, and a subscription's first `next()` issued inside a
  `connect` listener right after `disconnect()` all settle before the request deadline (none
  parks, none times out) — the deferred teardown's drain rejects them;
- claim 4 reproduced: an earlier `clear` listener that adds a described tool under the SAME name
  (`add`) leaves the document registry empty while the manager holds the new `add`;
- claim 5 reproduced independently: under the queued-call-only run-time projection the pin `a
  queued publication does not see a tool added after its call` fails (`promise rejected
  "MCPError: WebMCP requires a description…"`) and the two restated snapshot tests pass; the
  shipped implementation passes all three — closed, no change owed.

## Carriers (close every one; each names its ruling)

1. **A same-name addition inside an earlier clear listener survives the clear (analyst 4, P13).**
   The nested `add` queues its reconciliation before `#cleared` queues the release of that same
   name, so the release drops the replacement. Ruling: a clear releases a name only while the
   registration it holds is the one the clear cleared — bind the release to the registration
   (the descriptor or the tool identity the event carried), not to the name alone, so a
   registration made after the clear for the same name is left standing; another manager's
   registration stays protected (`#release`'s manager identity). Pin `preserves a same-name
   addition made by an earlier clear listener` (P13's scenario: expect `['add']` with the
   replacement's description) beside `preserves an addition made by an earlier clear listener`;
   keep `aborts every registration when the registry clears` green. Red first.
2. **The pin for the settled-not-refused contract (analyst 2, P13 claim 2).** Add
   `settles requests issued after disconnect inside a connect listener` in
   `tests/src/core/MCPClient.test.ts`: inside the `connect` listener issue `disconnect()`, a call, a
   task request, and a subscription's `next()`; assert each settles (rejected by the drain) before
   the request deadline. State in the test's comment that immediate `-32600` is not this contract:
   the transport is open at that instant and the teardown drains what was issued.
3. **The prose distinguishes synchronous transport loss from deferred disconnect drainage
   (analyst O1).** `guides/mcp.md:3677` and the `#refuse` comment block in `src/core/MCPClient.ts`
   (near `:546-556`) promise immediate refusal after a `disconnect()` issued inside a `connect`
   listener; the shipped behaviour (and the passing pin at `tests/src/core/MCPClient.test.ts:2095`)
   is that `disconnect` defers its teardown through the microtask queue and the drain settles what
   was issued in between, while a lost transport (`page.stop()`, a closed port) refuses at once.
   Correct both sentences to say exactly that; change no timing.

## Rulings that stand from A4d

Keep the identity guard at all three doors (analyst 3). The generation exemption is exact
(analyst 7). The queued-snapshot pin binds (analyst 5, reproduced). Nothing else moves.

## Context, law, host, and bench

As U4g. Run only scoped Vitest projects; the Orchestrator runs the authoritative gates after you
exit. Probe P13's instrument was removed from the tree before this dispatch.

## Scope

**Owned.** `src/browser/ModelContext.ts`, `src/core/MCPClient.ts` (the comment block only),
`guides/mcp.md`, `tests/src/browser/ModelContext.test.ts`, `tests/src/core/MCPClient.test.ts`.
**Off-limits.** Everything else (`src/browser/types.ts` unless a TSDoc sentence repeats the
prose O1 names — then that sentence only, reported).

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:src:browser` exit 0 with the carrier 1 pin red first.
3. `npm run test:src:core` exit 0 with the carrier 2 pin added (report its reading against the
   current code: it is expected green already, which is the point of the pin).
4. `npm run test:guides` exit 0.
5. Only owned files changed.

## Output

U4g's Output shape.
