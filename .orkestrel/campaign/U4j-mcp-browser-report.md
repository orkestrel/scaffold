<!-- U4j — implementer (Opus 5, native), mcp: coalescing respects publication order, and the prose the reviewer corrected. Retained from the completion notification, 2026-09-15 (993 s, 86 tool uses). -->

Unit U4j complete. Every carrier closed; every acceptance criterion green.

## Touched files

| File | Change |
| --- | --- |
| `src/browser/ModelContext.ts` | `publish` clears the pending mark when it queues (`:164-168`); `#pending` → `#pendingManager` (`:124`); `#sync` prunes after it reconciles (`:261-277`); `#prune`'s comment restated for its identifier and for the one order (`:364`); three class remarks corrected |
| `src/browser/types.ts` | `publish` TSDoc: the publication-order rule, the unprojectable-replacement release, the prune order, and the ragged paragraph rewrapped |
| `guides/mcp.md` | Helpers-table introduction replaced; the follow paragraph carries the publication-order rule; the skip paragraph carries the release rule and is rewrapped; the reconcile paragraph carries the prune order |
| `tests/src/browser/ModelContext.test.ts` | Five pins added; `describeWebMCPTool` imported |

`tests/setupBrowser.ts` and `tests/fixtures/modelContext.ts` are unchanged — no pin needed a new member. The carrier 4 pin reads the existing `traceRegistrations` recorder.

## Per-carrier closure

**1 — coalescing respects publication order.** `publish` sets `#pendingManager` to `undefined` as it queues, so a queued synchronisation covers the events before the next queued publication for that manager and no event after it; the mark still suppresses a second event before any publication. `#sync` clears the mark as it starts, before it reads the manager. V1a, V1b, V1c pinned and green; V1d holds through the existing `registers a change to a manager published while a synchronisation is queued`.

**2 — the skip rule is stated as the sync makes it.** Ruled as the Orchestrator read it: the release is right. The registry advertises only what WebMCP can carry, so a name whose tool the manager replaced with an unprojectable one is released rather than left advertising a descriptor the manager no longer stands behind, and `describeWebMCPTool` is the consumer's diagnostic. Stated in `guides/mcp.md` (skip paragraph), the class remarks (`ModelContext.ts:48-51`), and the `publish` TSDoc; pinned by `releases a registered name the manager replaced with a tool WebMCP cannot carry`, which asserts the registration is gone, `adopt()` reports nothing, and `describeWebMCPTool(tools, 'add')` returns `undefined`.

**3 — the equal-descriptor rule names its manager.** `ModelContext.ts:65` now reads "another tool of that same manager advertising an equal descriptor", matching the guide and the `publish` TSDoc.

**4 — the prune ordering.** Ruled and unified; see the ruling that follows.

**5 — prose hygiene.** The helpers-table introduction is one sentence naming what follows, keeping the `toolAnnotationsToMCP` sentence. Every rewrapped paragraph sits inside its file's width: `guides/mcp.md` prose is at most 95 characters a line, `src/browser/types.ts` TSDoc at most 93, both measured against the unchanged neighbours.

**6 — names.** `#pendingManager`; `#prune`'s comment leads with the operation its identifier names.

## Carrier 4 ruling, with evidence

**The two orders differ in one observable, and the order is now one rule: reconcile what the batch carries, then prune what it does not.**

- The reviewer's two candidates produce no difference in end state. A listener that destroys mid-operation: `destroy` aborts every registration and clears the map itself, and `#prune` iterating a map cleared under it skips the deleted entries, so both orders end with everything released. A same-name registration crossing the prune: `kept` is computed from the projections rather than from `#registrations`, so a name the batch carries survives the prune whichever side of the reconcile it sits on, and a name the batch drops is released on either.
- They differ when a reconcile throws. `#register` rethrows what the registry refused, so a prune placed after the loop is skipped and a prune placed before it has already run. Under the old split, a failed publication kept its stale registrations and a failed synchronisation did not.
- Chosen: prune last in both. A registration that never happened is a missing tool; a prune that happened anyway has withdrawn a tool nothing replaced. Prune-last also never withdraws a name while the tools replacing it are still being registered.
- Pinned by `registers what a change added before it releases what the change removed`, which reads the registry's own `toolchange` dispatches: `[['add', 'subtract'], ['subtract']]`. Red against the old order with `expected [ [], [ 'subtract' ] ] to deeply equal [ [ 'add', 'subtract' ], …(1) ]` — the empty first dispatch is the withdrawal gap the old sync opened.

## Carrier 6 rule citation

`.claude/rules/names.md` § Entity-scoped names fixes one word as a hard target for public properties, public methods, ungrouped and grouped option keys, and events, and states the latitude for a private member: "Private methods: two or three words are acceptable." A `#` field is not in that list of hard targets, and the private row is the nearest stated latitude, so a two-word private field is in rule. § General vocabulary drives the rename itself: "Properties are nouns" and "Booleans read as assertions" — `pending` is a participle reading as an assertion while the field holds a `ToolManagerInterface`, so it takes the noun it holds.

## Coalescing decision

One field still, `#pendingManager`, holding the manager. `publish` clears it unconditionally when it queues: the mark means "a synchronisation is queued for this manager with nothing queued behind it", and any publication queued behind it ends that condition whichever manager the publication names. `#sync` clears it only when it names the same manager, at entry. The guard can clear a mark a later change left, which costs one synchronisation that was already covered and never one too few; that direction is stated in the comment at `ModelContext.ts:262-265`.

## Retitled tests

None. Every existing title stayed true.

## Failing-first test names

| Test | Red | Green |
| --- | --- | --- |
| `registers a tool added after a same-manager publication queued behind a synchronisation`, `leaves nothing registered when a clear lands after a same-manager publication` | `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "after a same-manager publication"` → `2 failed \| 54 skipped (56)`; `expected [] to deeply equal [ 'fresh' ]` and `expected [ { …(2) }, { tool: { …(3) }, …(1) } ] to deeply equal []` | `2 passed` in the same filter, inside the full project run |
| `registers a tool added after a queued publication while a registration is suspended` | `-t "after a queued publication while a registration is suspended"` → `1 failed \| 55 skipped (56)`, `expected [] to deeply equal [ 'fresh' ]` | green |
| `registers what a change added before it releases what the change removed` | `-t "before it releases what the change removed"` → `1 failed \| 55 skipped (56)`, `expected [ [], [ 'subtract' ] ] to deeply equal [ [ 'add', 'subtract' ], …(1) ]` | green |
| `releases a registered name the manager replaced with a tool WebMCP cannot carry` | **Green first** — `1 passed \| 55 skipped (56)`. The U4i synchronisation already released the name, so there was no defect to redden; the pin fixes the behaviour the carrier 2 ruling states rather than repairing one. Proved able to fail under a control: `#prune`'s skip condition mutated on a byte copy to keep a name the manager still holds (`\|\| tools.tool(name) !== undefined`), giving `1 failed \| 55 skipped (56)`, `expected [ { …(2) } ] to deeply equal []`. Restored from the copy; SHA-256 `25e85e16f695b4fc` before the control and after the restore | green |

## Acceptance readings

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root plus the three scoped projects |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 133 files |
| `npm run test:src:browser` | 0 | `Test Files 6 passed (6)`, `Tests 163 passed \| 2 skipped (165)` |
| `npm run test:guides` | 0 | `Tests 201 passed (201)` |

Observed beyond the criteria, both exit 0: `test:policy` (`90 passed | 1 skipped`), `test:setup` (`86 passed`). The two browser skips are the pre-existing native-registry rows.

## Baselines and diffstat

Checkpoint `b9ff0b9`, tree dirty with the U4 chain. `git status --porcelain` names the same 27 paths before and after this unit — no file added, none removed. This unit's own change, measured against a byte copy of each owned file taken at dispatch:

```
 src/browser/ModelContext.ts             +57 -28
 src/browser/types.ts                    +22 -15
 guides/mcp.md                           +23 -16
 tests/src/browser/ModelContext.test.ts  +81  -1
```

Whole-chain `git diff --numstat HEAD` for those files: `405 13 guides/mcp.md`, `414 0 src/browser/ModelContext.ts`, `421 2 src/browser/types.ts`, `1102 0 tests/src/browser/ModelContext.test.ts`.

Instruments, all in the session scratchpad and never under the repository's `tmp/`: `u4j-baseline/` (the per-file byte copies), `ModelContext.ts.bak` (the restore copy), `mutate-prune.js` (the carrier 2 control).

## Shared-file patches

None. No off-limits file carries prose this change falsifies.

## Deviation state

No deviation against the objective. Two items for the record:

- `.orkestrel/campaign/A4f-audit-reviewer.md` did not exist at dispatch (the Orchestrator retained it after the unit started). The unit closed reviewer 5A, 5B, F5–F8, R4, and R5 from the U4j brief's own restatement of them, which carries each finding with its file and line.
- One decision inside the unit's discretion: the carrier 4 pin reads the registry's `toolchange` dispatch order rather than a failed registration, because the fixture exposes no way to make `registerTool` reject and the brief scoped a fixture member to a pin that needs one. The failure-path half of the ruling is stated in the `#prune` comment as the order's consequence and is not asserted by a test.
