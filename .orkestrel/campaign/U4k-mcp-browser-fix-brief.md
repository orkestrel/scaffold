# Unit U4k — `@orkestrel/mcp` browser face: the prune runs in `finally`, the failure path is pinned, and the prose is exact

Successor to U4j (`tmp/units/U4j-mcp-browser-fix-brief.md`; read it, the U4j report
`.orkestrel/campaign/U4j-mcp-browser-report.md`, and the chain first). This file carries the A4g
findings and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote the chain;
GPT-6 Astra audits this round with the checker.

## What A4g found and what the Orchestrator reproduced

Analyst (`A4g-audit-analyst.md`): claim 2 — the prune failure path (a registry that refuses
`registerTool` leaves the prune unrun, so names the manager dropped stay advertised) needs a pin;
claim 4 — "That skip emits no `change`" follows the sentence describing the release of an existing
registration, and that release DOES dispatch `toolchange` (the abort is the registry's
unregistration path). Reviewer (`A4g-audit-reviewer.md`): PASS; R7 — prune in a `finally` after the
reconcile loop gives the ordering benefit and still prunes when a reconcile throws, because `kept`
protects every name the batch carries whether or not its reconcile ran; F9 — the `#prune` failure
clause names no noun; F10 — the prose claims `describeWebMCPTool` names the uncarriable tool, but it
answers `undefined` for a missing name and an unprojectable one alike; F11 — `types.ts` says
"aborts" where the guide and the class remarks say "releases"; F12 — `destroy` leaves
`#pendingManager` set. Checker (`A4g-audit-checker.md`): the chain walk closed. The Orchestrator's
probe P16 (`P16-a4g-probe.md`) reproduced both U4j controls.

## Carriers (close every one; each names its ruling)

1. **The prune runs in `finally` (analyst 2, reviewer R7).** Ruling: in `#sync` and `#publish`
   the reconcile loop runs inside `try`, and `#prune` runs in `finally`, so a batch that fails
   partway still releases the names the manager dropped (they were never in `kept`) while the
   names the batch carries stay protected whether or not their reconcile ran; the failure still
   rejects the caller (a publication) or is swallowed by the queue (a followed change) as today.
   Read `#prune`'s synchronous aborts into listeners that can `destroy` this handle: the
   `#destroyed` read at the prune's entry (or inside its loop) keeps that safe — state it.
2. **The failure path is pinned (analyst 2).** Give the fixture double one member that makes
   `registerTool` reject for a named tool (`tests/fixtures/modelContext.ts`, beside `suspend()`;
   name it for what it does and report the name). Pin `releases what the manager dropped when a
   registration fails`: publish `add`, then `remove('add')` and `add('subtract')` with the registry
   refusing `subtract` — the sync's reconcile throws, the `finally` prune releases `add`, `subtract`
   is absent; then clear the refusal, add a described `divide`, and show convergence (`subtract`
   and `divide` registered). Red first against the reconcile-then-prune order (mutate on a byte
   copy; record the reading).
3. **The `#prune` comment states the rule with its noun (reviewer F9)**: what a failed batch
   leaves and why, naming "the names the batch dropped" and "the names the batch carries".
4. **The skip sentence and the diagnostic sentence are exact (analyst 4, reviewer F10).** Add a
   `change` recorder to `releases a registered name the manager replaced with a tool WebMCP cannot
   carry`: the release reports a `change`; an unprojectable addition under a name this handle never
   registered reports none. Qualify the prose in `guides/mcp.md` (near `:4096-4101`),
   `src/browser/types.ts` (near `:499-506`), and the class remarks: the skip of a NEW name emits no
   `change`; the release of a REGISTERED name emits the registry's `change` like any release; and
   `describeWebMCPTool` answers `undefined` for a name `definitions()` still lists — that mismatch
   read from the manager's side — never "names the uncarriable tool".
5. **One verb (reviewer F11)**: `types.ts` near `:514` and `:516` say "releases"; "abort" stays
   only where the `AbortController` is the subject.
6. **`destroy` clears `#pendingManager` (reviewer F12)**: teardown is uniform; one line.

## Rulings that stand

Everything U4i and U4j landed; `#pendingManager`'s name; the reconcile-before-prune order (now
`try`/`finally`); the reviewer's R8 (`describeWebMCPTool`'s prefix) is carried to a design round
after the chain lands — do not rename it here.

## Context, law, host, and bench

As U4j. Run only scoped Vitest projects.

## Scope

**Owned.** `src/browser/ModelContext.ts`, `src/browser/types.ts` (TSDoc), `guides/mcp.md`,
`tests/fixtures/modelContext.ts` (the one member), `tests/src/browser/ModelContext.test.ts`,
`tests/setupBrowser.ts` (only if the recorder needs a helper; say which). **Off-limits.**
Everything else.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:src:browser` exit 0 with carrier 2's pin red first (recorded) and carrier 4's
   recorder assertions recorded; every existing pin green.
3. `npm run test:guides` exit 0.
4. Only owned files changed.

## Output

U4j's Output shape.
