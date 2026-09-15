# Unit U4j — `@orkestrel/mcp` browser face: coalescing respects publication order, and the prose the reviewer corrected

Successor to U4i (`tmp/units/U4i-mcp-browser-fix-brief.md`; read it, the U4i report
`.orkestrel/campaign/U4i-mcp-browser-report.md`, and the chain first). This file carries the A4f
findings and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote the chain;
GPT-6 Astra audits this round.

## What A4f found and what the Orchestrator reproduced

Analyst (`A4f-audit-analyst.md`): V1, a coalescing defect across a same-manager publication;
reviewer (`A4f-audit-reviewer.md`): the shape CONFIRMED, two prose corrections required, F5–F8,
R4, R5; checker (`A4f-audit-checker.md`): mechanical claims confirmed. The Orchestrator's probe P14
(`P14-a4f-probe.md`, instrument `P14-a4f-probe.test.ts.txt`, logs `P14-a4f-probe.log.txt`,
`P14b-coalescing-control.log.txt`, `P14c-teardown-control.log.txt`) reproduced V1a, V1b, V1c in
real Chromium (V1d holds) and both writer-only mutation controls.

## Carriers (close every one; each names its ruling)

1. **Coalescing respects publication order (analyst 1, 2; P14).** Ruling: a queued
   synchronisation covers the events before the next queued publication for that manager and no
   event after it. `publish` clears the pending mark for the manager it queues behind (so an event
   after the publication queues a fresh synchronisation after it); the mark still suppresses a
   second event before any publication. Pins, red first, named for what they prove: V1a (`clear`,
   then a same-manager `publish`, then `add` — the addition survives the publication's prune), V1b
   (the same behind a suspended registration), V1c (`add`, `publish`, `clear` — nothing stays
   registered); V1d (a publish of another manager between a coalesced event and its sync) stays
   green as the existing pin. Take the P14 scenarios verbatim.
2. **The skip rule is stated as the sync makes it (reviewer 5A).** An unprojectable tool that takes
   a name this handle registered is RELEASED by the synchronisation (it registers only what it can
   carry); say so after the skip sentence in `guides/mcp.md` (near `:4091`), the class remarks
   (`ModelContext.ts` near `:45-48`), and the `publish` TSDoc (`types.ts` near `:494-495`), and pin
   it (reviewer R4): a described tool replaced under its name by a summary-less one ends
   unregistered, and `describeWebMCPTool` returns `undefined` for that name while `adopt()` no longer
   reports it. Rule first whether that release is the right behaviour (the Orchestrator's reading:
   yes — the registry advertises only what WebMCP can carry, and the consumer's diagnostic is
   `describeWebMCPTool`); if you rule otherwise, stop and report.
3. **The equal-descriptor rule names its manager (reviewer 5B).** The class remark (`ModelContext.ts`
   near `:59-60`) says "another tool of that same manager advertising an equal descriptor", as the
   guide and the `publish` TSDoc already do.
4. **The prune ordering is one rule or explained (reviewer R5).** `#sync` prunes before it
   reconciles; `#publish` prunes after. `#prune` aborts synchronously into registry listeners that
   can `destroy` this handle. Rule whether the two orders differ in any observable (a listener that
   destroys mid-operation; a same-name registration crossing the prune) — pin the observable if one
   exists, otherwise make the order one rule or state in each comment why it differs.
5. **Prose hygiene (reviewer F5, F6).** Rewrap the ragged paragraphs (`guides/mcp.md` near `:3280`
   and `:4092-4093`; `src/browser/types.ts` near `:496-497`) to their file's width; replace the
   helpers-table introduction (`guides/mcp.md:3278-3280`) with one sentence naming what follows
   ("This table lists the WebMCP projections, the batches `publish` and a followed change project
   through, and the registry guards."), keeping the `toolAnnotationsToMCP` sentence.
6. **Names (reviewer F7, F8).** `#pending` holds a manager and reads as a boolean; rename it to
   what it holds under `.claude/rules/names.md` (the reviewer's candidates: a noun, or
   `#pendingManager`; a private member may take two words where the rule permits — cite the rule
   you apply). Align `#prune`'s comment with its identifier (one word for the operation).

## Rulings that stand

The sync mechanism, the projection shape (`WebMCPProjection`, `buildWebMCPProjections`,
`collectWebMCPProjections`, `describeWebMCPTool`), the recorder limit and its control (the transport
recorder over the `MessagePort` frames is a nonblocking follow-up, recorded in the ledger), the
generation exemption, the deferred-disconnect drain.

## Context, law, host, and bench

As U4i. Run only scoped Vitest projects; the Orchestrator runs the authoritative gates after you
exit. P14's instrument was removed from the tree before this dispatch.

## Scope

**Owned.** `src/browser/ModelContext.ts`, `src/browser/types.ts` (TSDoc), `guides/mcp.md`,
`tests/src/browser/ModelContext.test.ts`, `tests/setupBrowser.ts` and `tests/fixtures/modelContext.ts`
(only if a pin needs a member; say which). **Off-limits.** Everything else.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:src:browser` exit 0 with the carrier 1 pins (V1a, V1b, V1c) and the carrier 2 pin
   red first (record the readings), and every existing pin green.
3. `npm run test:guides` exit 0.
4. Only owned files changed.

## Output

U4i's Output shape, plus the carrier 4 ruling with its evidence and the carrier 6 rule citation.
