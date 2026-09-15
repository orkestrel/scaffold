<!-- U4i — implementer (Opus 5, native), mcp: followed changes reconcile against the manager's live state. Retained from the completion notification, 2026-09-15 (1470 s, 132 tool uses). -->

Unit U4i complete. Every carrier closed; every acceptance criterion green.

## Touched files

| File | Change |
| --- | --- |
| `src/browser/types.ts` | `WebMCPProjection` at `:397` (the tool beside its descriptor); `publish` remarks restated as the convergence rule and the reconciliation's tool-identity reading; `destroy` gains a remark on the released subscription and the stopped synchronisation |
| `src/browser/helpers.ts` | `buildWebMCPDescriptors` becomes `buildWebMCPProjections` at `:218` (same refusal, now returning tool-descriptor pairs from `tools()` through `toolToDefinition`); `collectWebMCPProjections` at `:252` is the skipping sibling the sync reads; `matchesDescriptor` remark corrected |
| `src/browser/ModelContext.ts` | `#added`/`#removed`/`#cleared`/`#release`/`#releaseEach` replaced by one `#changed` door at `:229` and one `#sync` at `:244`; `#reconcile` reads tool identity then descriptor equality (`:268`); `#prune` at `:346` is the single release door, manager-scoped for a sync; each registration records its tool (`:101`); `#pending` at `:114` |
| `guides/mcp.md` | Follow section: the descriptor-bound release paragraph replaced by the convergence rule; reconciliation paragraph restated; helper table rows for the renamed and added leaves; `WebMCPProjection` type row |
| `tests/setupBrowser.ts` | `recordRequests` TSDoc states the completed-response limit (`:162`); `createCyclicTools` at `:456` |
| `tests/src/browser/ModelContext.test.ts` | Eight new pins at `:330`, `:414`, `:436`, `:453`, `:474`, `:500`, `:517`, `:531`, `:549`; four existing comments restated |
| `tests/src/browser/helpers.test.ts` | `buildWebMCPProjections` block restated plus a tool-identity case; `collectWebMCPProjections` block added |
| `tests/src/browser/factories.test.ts` | `completes connect` — the absence claim's bound recorded, and the control now reads the drain while its response is pending and again after it completed |

## Per-carrier closure

**1 — the sync.** A followed `add`, `remove`, or `clear` queues one `#sync` of this handle's registrations for that manager. The sync reads `collectWebMCPProjections(tools)` — `tools.tools()` through `toolToDefinition` + `toolToWebMCP`, unprojectable tools skipped — prunes registrations bound to that manager whose names the manager no longer advertises, then reconciles each projection. `#reconcile` returns on the same tool (no descriptor comparison), keeps the registration and records the new tool on an equal descriptor under a different tool, and otherwise releases and re-registers. `publish` keeps its call-time snapshot, its queue position, its refusal, and its follow. `#prune` is the one release door: a publication hands it its snapshot across managers, a sync hands it the live projections and names the manager.

**2 — the pins.** O1 red first in all four cells (plain remove, plain clear, queued publication, suspended registration); O2 red first in both release cells; O3 red first. The no-churn pin was green before and after, which is its point — it guards the sync against touching a registration whose tool has not moved, and the U4h implementation never reached that name at all.

**3 — the recorder limit.** `recordRequests` now states that an entry appears when the response completes, that an empty drain reports only that nothing finished, and that a claim of absence over work still in flight belongs to a transport recorder. One use claims absence; its table follows.

**4 — prose.** The class remarks, the `publish` and `destroy` TSDoc, and the guide's follow section carry the convergence rule; the descriptor-bound release sentences are gone; the skip rule stands unchanged in all three.

## Coalescing decision

Implemented, as one field: `#pending: ToolManagerInterface | undefined` holds the manager whose sync is queued and not yet started, and `#sync` clears it at entry. A second event for that same manager is not queued, because the queued sync reads the manager when it runs and already covers it.

It holds the manager rather than a boolean deliberately. A boolean suppresses a change to a manager a `publish` took up while the first sync was still queued, and that manager's addition would never register. `registers a change to a manager published while a synchronisation is queued` (`:330`) is the pin for that, and it was proved able to fail: with `if (this.#pending === tools) return` mutated to `if (this.#pending !== undefined) return` on a byte copy, it failed `1 failed | 50 skipped (51)`, `expected [ 'lookup' ] to deeply equal [ 'lookup', 'fresh' ]`. The file was restored from the copy; SHA-256 `71102e91b9026163a3355a1d6d74ddac7478d81cf520db3c05830ef110d35d54` before and after.

## Retitled tests

None. Every existing title stayed true under the ruling. Four comments stated the old mechanism and were restated to the new one, in `tests/src/browser/ModelContext.test.ts`: `leaves a name it already registered alone on a second call`, `registers the snapshot the call captured, then follows the clear that emptied the manager`, `registers each queued publication against its own snapshot`, `preserves an addition made by an earlier clear listener`, and `preserves a same-name addition made by an earlier clear listener`.

## Carrier 3 audit — every `recordRequests` use

| Use | Claim | How absence is proven |
| --- | --- | --- |
| `tests/src/browser/factories.test.ts` `completes connect, tools/list, and tools/call with no request leaving the page` | No request left the page during the in-page MCP round trip | **Control, not transport recorder.** The scenario's own work has settled before the drain — `connect`, `tools`, and `call` each resolved and were asserted — so a request carrying that traffic must have completed, which is the population the drain reports. The control beside it draws one real request to this page's own origin and reads the drain twice: empty while the response is pending, non-empty after it completed. That is the instrument's bound and the proof it can report at all. The transport route was unavailable: `createPageServer` exposes no peer recorder, and `src/browser/factories.ts` is off-limits to this unit. |

No other use of `recordRequests` exists in the tree (`tests/setupBrowser.ts:176` declares it; `tests/src/browser/factories.test.ts:76` imports it; `:1098` is the sole call).

## Decisions recorded

- **One handler for three events.** All three events ask the same question, so `#follow` subscribes one bound `#changed` and `#unfollow` hands it back per event. The `#follows` identity guard still runs for every followed event; it is one door rather than three copies.
- **Two batch leaves, not one with a switch.** The refusal and the skip are different rules for different callers, and the file already carried that split. A `refuse` parameter would be a literal selecting a different action.
- **`describeWebMCPTool` stays exported.** The sync no longer calls it. It remains the documented way a consumer names an advertised tool the projection cannot carry, and the guide still points to it there.
- **Publish records instances too.** Without it, the first sync after a publication would compare descriptors for a publication-made registration, and an unencodable one would churn on every unrelated change. That is why `buildWebMCPProjections` returns pairs.
- **A queued sync for a replaced manager still runs.** The identity guard stays at the door alone, per the ruling. Such a sync registers that manager's tools and the publication that replaced it then reconciles and prunes them, so the end state is the publication's.

## Failing-first test names

| Test | Red | Green |
| --- | --- | --- |
| `preserves an equal-descriptor replacement made by an earlier remove listener`, `… by an earlier clear listener`, `… while a publication is still queued`, `… while a registration is suspended` | `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "equal-descriptor"` → `4 failed \| 46 skipped (50)`, each `AssertionError: expected [] to deeply equal [ 'echo' ]` | `4 passed` in the same filter, inside the full project run |
| `releases an unencodable descriptor after remove`, `… after clear` | `-t "unencodable"` → `2 failed \| 1 passed \| 47 skipped (50)`, each `expected [ 'cyclic' ] to deeply equal []` | `3 passed` in the same filter |
| `leaves an unencodable descriptor alone while its tool stays` | no defect to redden — green before the sync landed, because U4h's `#added` never reached that name; it guards the sync's own risk | green |
| `drops additions erased when the followed manager is destroyed` | `-t "erased when the followed manager is destroyed"` → `1 failed \| 49 skipped (50)`, `expected [ 'fresh' ] to deeply equal []` | green |
| `registers a change to a manager published while a synchronisation is queued` | no defect to redden; under the boolean-coalescing control `1 failed \| 50 skipped (51)`, `expected [ 'lookup' ] to deeply equal [ 'lookup', 'fresh' ]` | `1 passed \| 50 skipped (51)` |

## Acceptance readings

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root plus the three scoped projects |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 133 files |
| `npm run test:src:browser` | 0 | `Test Files 6 passed (6)`, `Tests 158 passed \| 2 skipped (160)` |
| `npm run test:guides` | 0 | `Tests 201 passed (201)` |

Observed beyond the criteria, all exit 0: `test:src:core` (`939 passed`), `test:src:server` (`374 passed`), `test:setup` (`86 passed`), `test:policy` (`90 passed | 1 skipped`), `test:integration` (`4 passed`). The two browser skips are the pre-existing native-registry rows — no browser exposes `document.modelContext`.

## Baselines and diffstat

Checkpoint `b9ff0b9`, tree dirty with the U4 chain. `git status --porcelain` names the same 27 paths before and after this unit — no file added, none removed. The chain moved from `4177 insertions(+), 116 deletions(-)` to `4511 insertions(+), 116 deletions(-)`: this unit added 334 lines and deleted no line that HEAD still carried.

Whole-chain `git diff --numstat HEAD` for the files this unit touched:

```
 398  13  guides/mcp.md
 387   0  src/browser/ModelContext.ts
 261   0  src/browser/helpers.ts
 414   2  src/browser/types.ts
 406   2  tests/setupBrowser.ts
1006   0  tests/src/browser/ModelContext.test.ts
 362   5  tests/src/browser/factories.test.ts
 288   0  tests/src/browser/helpers.test.ts
```

Instruments, all in the session scratchpad and never under the repository's `tmp/`: `ModelContext.ts.bak` (the restore copy), `mutate.js` (the boolean-coalescing control), `insert-row.js` (the guide type-table row insert).

## Shared-file patches

None. `src/browser/index.ts` needed no edit — it re-exports `./helpers.js` whole, so the rename and the addition reach the barrel unchanged. No off-limits file carries prose this change falsifies.

## Deviation state

No deviation. One decision inside the unit's discretion is flagged for the auditor: the rename of the public `buildWebMCPDescriptors` to `buildWebMCPProjections`. The brief authorized a pure leaf in `helpers.ts`; recording the tool instance on the publication path required the batch leaf to carry the tool beside its descriptor, so the existing export changed shape and its name changed with it. Every consumer, the guide row, and its tests moved in the same change.
