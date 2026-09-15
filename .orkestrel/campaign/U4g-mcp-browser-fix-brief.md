# Unit U4g — `@orkestrel/mcp` browser face: fix round after audit A4c

Successor to U4f (`tmp/units/U4f-mcp-browser-fix-brief.md`; read it and the U4 chain first). This
file carries the findings A4c reconciled and the Orchestrator's rulings, and wins over any
sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote the chain;
GPT-6 Astra audits this round.

## What A4c found and what the Orchestrator reproduced

Analyst (Astra): `FAIL 1, 2, 9, 11`, every one an unexecuted vector; checker (Sonnet): `PASS`.
The Orchestrator's probe P12 (`.orkestrel/campaign/P12-a4c-probe.md`, instrument
`P12-a4c-probe.test.ts.txt`, logs `P12-a4c-probe.log.txt` and `P12-a4c-probe-2b.log.txt`) ran the
vectors in real Chromium: claims 1, 2a, and 2b reproduced; 2c and 2d hold. Read
`A4c-audit-analyst.md`, `A4c-audit-checker.md`, and the probe before editing. Copy the probe's
scenarios into the suites as the red-first pins — named for what they prove, never for the claim
number.

## Carriers (close every one; each names its ruling)

1. **The refusal holds across a stop issued from a `connect` listener (analyst 1, P12).**
   `#refuse` (`src/core/MCPClient.ts`) admits any request while `#connecting !== undefined`, and
   `connect` is emitted before the attempt clears that gate, so a `stop()` inside the listener
   leaves `call`, the task client, and a subscription's first `next()` admitted: the requests
   time out and the subscription parks. Ruling (Astra's, adopted): exempt only the current
   negotiation's own requests, preserving discovery; a `stop` invalidates the attempt so that
   every later request refuses at once. Pin `rejects requests issued after stop inside a connect
   listener` in `tests/src/browser/factories.test.ts` (call, task, and subscription `next()` each
   `-32600`, nothing sent) and the core mirror in `tests/src/core/MCPClient.test.ts`. Red first;
   capture the red.
2. **A replaced subscription's events reach nothing (analyst 2, P12 2a).** The bridge's listeners
   on a manager keep firing from the emitter's captured listener array after `#unfollow` ran inside
   the same dispatch. `#added`, `#removed`, and `#cleared` must ignore an event whose manager is
   no longer `#followed` (identity, not destruction). Pin `ignores a manager a re-entrant publish
   replaced` in `tests/src/browser/ModelContext.test.ts` (P12 2a: expect `['lookup']`).
3. **A clear releases what it cleared, not what was added since (analyst 2, P12 2b).** The
   installed manager clears its map and then emits `clear` with the cleared tools
   (`ToolManagerEventMap.clear: readonly [tools: readonly ToolInterface[]]`), so an earlier
   listener's addition inside the clear stays in the manager. `#cleared` must release the names
   the event carries (bound to that manager), never every registration bound to the manager. Pin
   `preserves an addition made by an earlier clear listener` (expect `['fresh']`). Keep the
   existing clear tests green.
4. **The queued-snapshot test distinguishes a run-time projection (analyst 9).** The two restated
   snapshot tests cannot tell a snapshot-at-call from a read-at-execution for a queued call. Add
   `a queued publication does not see a tool added after its call`: `first = publish(tools)`,
   `second = publish(tools)`, then `tools.add(createTool({ name: 'bare', execute: () => 1 }))`
   (no description) before either runs; the snapshot implementation resolves `second` and leaves
   `bare` unregistered, a run-time projection rejects `second`. Record the mutation (project the
   queued call's descriptors at execution) red against this test and green against the two
   restated tests, so the reading Astra predicted is on file.
5. **The guide states that a skipped followed addition emits no `change`** (analyst 8, closed
   with one sentence beside the existing skip prose: the consumer detects the mismatch by comparing
   the manager's advertised definitions with `adopt()`, and `describeWebMCPTool` names an
   unprojectable advertised tool). `guides/mcp.md` and the `publish` TSDoc.

## Rulings that stand from A4c

Keep `destroy`'s entry guard (analyst 6). The `G5` row, the ownership prose, the mutation-proof
tests, and the reuse readings are closed. `emitter.on` returns `void` in the installed emitter;
the retained-handler `off` stays.

## Context, law, host, and bench

As U4f. The installed tool tarball carries `ToolManagerEventMap`; read
`node_modules/@orkestrel/tool/dist/src/core/index.d.ts` for the `clear` payload. Run only scoped
Vitest projects; the Orchestrator runs the authoritative gates after you exit. Probe P12's
instrument was removed from the tree before this dispatch; do not recreate it under that name.

## Scope

**Owned.** `src/core/MCPClient.ts`, `src/browser/ModelContext.ts`, `src/browser/types.ts` (TSDoc),
`guides/mcp.md`, `tests/src/core/MCPClient.test.ts`, `tests/src/browser/ModelContext.test.ts`,
`tests/src/browser/factories.test.ts`, `tests/setupBrowser.ts` and `tests/fixtures/modelContext.ts`
(only if a pin needs a fixture member; state which). **Off-limits.** `package.json`,
`package-lock.json`, the `scaffold repair` set, `guides/tool.md`, `dist/**`, `src/core/types.ts`,
every other file.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:src:core` exit 0 with the core pin red first.
3. `npm run test:src:browser` exit 0 with the four browser pins red first (carrier 4's is red
   against the mutation, green against the implementation; record both).
4. `npm run test:guides` exit 0.
5. Only owned files changed; the U4f-only interdiff plus this unit's delta is the whole change on
   the A4b baseline.

## Output

U4f's Output shape: touched files with `file:line`; per-carrier closure; decisions recorded;
baselines; acceptance readings; `git status --porcelain` and `git diff --stat HEAD`; the red and
green logs verbatim; deviation state.
