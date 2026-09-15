# Unit U4i — `@orkestrel/mcp` browser face: followed changes reconcile against the manager's live state

Successor to U4h (`tmp/units/U4h-mcp-browser-fix-brief.md`; read it and the chain first). This file
carries the A4e findings and the Orchestrator's mechanism ruling, and wins over any sentence it
amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote the chain;
GPT-6 Astra audits this round.

## Why the mechanism changes

Four rounds (A4b, A4c, A4d, A4e) each found one more interleaving in the same seam: a followed
`remove` or `clear` cannot identify WHICH registration ended when it is keyed by name (U4f) or by
descriptor (U4h). A4e (`.orkestrel/campaign/A4e-audit-analyst.md`, `A4e-audit-checker.md`) names
three more cells: O1 an equal-descriptor same-name replacement made inside an earlier remove or
clear listener (the reconciliation keeps it, the outer release then deletes it); O2 an unencodable
descriptor (a cyclic `parameters` schema) stays advertised after `remove`/`clear` until `destroy`;
O3 `tools.destroy()` emits `clear`, destroys its emitter, then empties its map silently
(`node_modules/@orkestrel/tool/dist/src/core/index.js:255`), so a listener's addition during that
clear stays advertised while the manager is empty. Patching cells is following the frame; the
source is the key.

**Ruling.** A followed change is a trigger, not a fact. Each followed `add`, `remove`, or `clear`
queues ONE synchronisation of this handle's registrations for that manager against the manager's
state AT THE TIME THE QUEUED WORK RUNS — `tools.tools()` (the instances) projected through
`toolToDefinition` + `toolToWebMCP`, unprojectable tools skipped as today: a held name the manager
no longer holds is released; a held name the manager holds under the SAME tool instance is left
alone (no descriptor comparison, so an unencodable descriptor does not churn); a held name under a
different instance with an equal descriptor is left registered (execution routes through the
manager by name — `#run(tools, name)` — so the new handler is reached; record the held instance);
a different descriptor is released and re-registered; a name the manager holds and this handle
does not is registered. `publish` KEEPS its call-time snapshot and its queued semantics (the
contract A4d/A4e confirmed and the pin `a queued publication does not see a tool added after its
call` binds); it still installs the follow. `#reconcile` stays the one door both paths take;
`#release`/`#releaseEach` bound to descriptors go away in favour of the sync's absence test;
`#prune` (or its equivalent inside the sync) prunes only registrations bound to that manager.
Every registration records the tool instance it was made for.

With that, O1 closes (at run time the manager holds the replacement → kept), O2 closes (absent →
released; present-and-unencodable → same instance → untouched), O3 closes (the sync queued by the
clear runs after `destroy()` returned and reads an empty manager → releases everything), and the
P12/P13 cells stay closed. State this in the class remarks, the `publish` TSDoc, and the guide's
follow paragraph (replacing the "releases what it cleared" sentence): the bridge converges on the
manager's state after every change it follows.

## Carriers

1. **The sync.** Implement the ruling. Coalescing: a sync already queued and not yet started for
   the same manager need not be queued twice — implement it only if it stays one flag, otherwise
   queue one sync per event and say so; both are correct.
2. **The pins (red first, named for what they prove).** In `tests/src/browser/ModelContext.test.ts`:
   `preserves an equal-descriptor replacement made by an earlier remove listener`, `… by an earlier
   clear listener` (O1; also with the publication queued and with it suspended through the
   fixture's `suspend()`); `releases an unencodable descriptor after remove`, `… after clear` (O2: a
   `parameters` schema referencing itself; assert absence from `getTools()` and `adopt()` after the
   sync and again after `destroy`); `leaves an unencodable descriptor alone while its tool stays`
   (O2: no `toolchange` beyond the first registration across a later followed change to another
   name); `drops additions erased when the followed manager is destroyed` (O3). Every existing
   follow, clear, remove, snapshot, and destroy pin stays green; retitle any whose sentence the
   ruling makes false.
3. **The pending-response recorder limit (A4e claim 7 ← A4 analyst 5).** `recordRequests` in
   `tests/setupBrowser.ts` reads Resource Timing entries, which appear when a response completes; a
   pending response is not observed. State that limit in its TSDoc, and audit every use whose
   claim is absence ("nothing was sent"): where a test's claim depends on absence, prove it through
   the transport recorder (`loopback.sent`, as the core mirror does) or through a control that
   holds a response pending and shows the recorder's reading, and record which. The `completes
   connect` case (`tests/src/browser/factories.test.ts` near `:1097`) is the one the auditor names.
4. **Prose.** Class remarks, `publish`/`destroy` TSDoc in `src/browser/types.ts`, the guide's
   follow section and parity rows: the convergence rule in one paragraph; drop the
   descriptor-bound release sentences; keep the skip rule (unprojectable followed tools stay
   unregistered, no `change`).

## Rulings that stand

`#follows` identity guard at the three doors; `#refuse`'s generation exemption; the deferred
`disconnect` drain and its pin; the queued-snapshot pin; `describeWebMCPTool`; `traceRegistrations`;
the fixture's `suspend()`/`holding()`.

## Context, law, host, and bench

As U4h. Installed: `@orkestrel/tool` (`tools()`, `definitions()`, `toolToDefinition`, the manager's
`destroy` order), `@orkestrel/emitter` 0.0.10 (`on` returns `void`; `off` releases), `@orkestrel/test`,
`@orkestrel/contract` (`canonicalStringify`, `attempt`). Run only scoped Vitest projects; the
Orchestrator runs the authoritative gates after you exit.

## Scope

**Owned.** `src/browser/ModelContext.ts`, `src/browser/types.ts` (TSDoc), `src/browser/helpers.ts`
(only if the sync needs a pure leaf — export and test it), `guides/mcp.md`, `tests/setupBrowser.ts`
(the recorder TSDoc; a fixture member if a pin needs one), `tests/fixtures/modelContext.ts` (only
if a pin needs a member; say which), `tests/src/browser/ModelContext.test.ts`,
`tests/src/browser/factories.test.ts`, `tests/src/browser/helpers.test.ts`. **Off-limits.**
`package.json`, `package-lock.json`, the `scaffold repair` set, `guides/tool.md`, `src/core/**`,
`dist/**`.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:src:browser` exit 0 with the carrier 2 pins red first (O1, O2, O3 each red
   against the U4h implementation before the sync lands; record the readings).
3. `npm run test:guides` exit 0.
4. Only owned files changed.

## Output

U4h's Output shape, plus: the coalescing decision, the retitled tests (old → new), and the
carrier 3 audit table (each `recordRequests` use, its claim, and how absence is proven).
