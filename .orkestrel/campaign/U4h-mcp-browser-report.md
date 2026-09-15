<!-- U4h — implementer (Opus 5, native), mcp fix round after A4d. Retained from the completion notification, 2026-09-15 (755 s, 72 tool uses). -->

Unit U4h complete. Every carrier closed; every acceptance criterion green.

## Touched files

| File | Change |
| --- | --- |
| `src/browser/ModelContext.ts` | `#release` takes the descriptor the event carried and releases only a registration still advertising it (`:323`); `#releaseEach` maps over descriptors (`:332`); `#cleared` projects the cleared tools at the event (`:259`); `#removed` projects the removed tool the same way (`:243`); `toolToDefinition` imported at `:16`, `toolToWebMCP` at `:23`; the clear bullet in the class remarks at `:49` |
| `src/core/MCPClient.ts` | The `#refuse` comment block only: the transport-loss paragraph at `:553`, and a new paragraph at `:562` stating the deferred-disconnect drain |
| `guides/mcp.md` | The refusal paragraph at `:3676`–`:3684`; the clear paragraph at `:4070`–`:4077` |
| `tests/src/browser/ModelContext.test.ts` | `preserves a same-name addition made by an earlier clear listener` at `:369` |
| `tests/src/core/MCPClient.test.ts` | `settles requests issued after disconnect inside a connect listener` at `:1748` |

`src/browser/types.ts` needed no edit: its `publish` remarks say a `clear` "aborts the registrations for the tools that `clear` carried", which the bound release makes more exactly true, and it carries no sentence about the refusal O1 names.

## Per-carrier closure

**1 — a same-name addition inside an earlier clear listener survives the clear.** The release is now bound to the projection the ended tool advertised. `#cleared` and `#removed` each project their event's tools at the event, through `toolToWebMCP(toolToDefinition(tool))` — `toolToDefinition` is `@orkestrel/tool`'s own advertising projection, the one `definitions()` applies, so a tool carrying a `summary` projects to the same descriptor the registration holds. `#release` then releases only when the held registration is bound to that manager *and* `matchesDescriptor` says it still advertises what the ended tool advertised. The replacement registered inside the clear dispatch advertises its own description, so it stands. `aborts every registration when the registry clears`, `aborts the registration of a tool the registry removes`, `preserves an addition made by an earlier clear listener`, and both snapshot-and-clear tests stay green. Red first, with P13's exact reading.

**2 — the pin for the settled-not-refused contract.** Added and green against the shipped code, which is the point of the pin. It issues `disconnect()`, a `call`, a `tasks.task`, and a subscription's `next()` inside the `connect` listener, asserts each rejects with `MCP client disconnected` (the teardown's drain, not the `-32600` refusal and not the deadline), and reads the elapsed interval against the client's own 1000 ms request deadline. Its comment states that an immediate `-32600` is not this contract, and names the transport-loss test as the other reading.

**3 — the prose distinguishes synchronous transport loss from deferred disconnect drainage.** Both sites now say a transport lost from a `connect` listener invalidates the attempt at once, so every later request refuses; and that a `disconnect` from that same listener defers its teardown through the microtask queue, so the request is admitted onto a still-open transport and the drain rejects it with `MCP client disconnected`, settled inside its deadline rather than refused or parked. No timing changed.

## Decisions recorded

- **The binding lives in `#release`, so it is one rule at the release door.** The brief's parenthetical keeps `#release`'s manager identity, and `#release` is the method both `#removed` and `#cleared` take. Giving the clear its own bound release and leaving the remove door reading the name alone would be two release rules to drift apart. Consequence, recorded as an observation and not as a second criterion: the remove door now carries the same discriminator, which closes the same defect shape there (a `remove` listener that re-adds the name before the bridge's handler runs). No pin was added for it; the brief names the clear, and the existing remove tests cover that door.
- **Descriptor, not tool identity.** Tool identity goes stale on `#reconcile`'s match path: an equal projection leaves the held registration alone while the manager swaps the instance, so a later `remove` or `clear` carrying the new instance would find no identity match and leak the registration. Descriptor equality has no such stale state, and the brief sanctions it.
- **An unencodable descriptor now biases toward preserving.** `matchesDescriptor` reports a descriptor JSON cannot encode — a cyclic `inputSchema` — as unequal, so a `remove` or `clear` of such a tool leaves its registration for the next publication's `#prune` or for `destroy` to take back. That is the same bias `matchesDescriptor` already documents for re-registration, and adding a second equality reading to avoid it would be the duplicate rule this file exists without. Flagging it for the auditor.
- **A tool WebMCP could not carry needs no release.** `toolToWebMCP` returns `undefined` for a definition with no description; such a tool was never registered (a `publish` refuses the batch, a followed `add` skips it), so `#removed` returns and `#cleared` drops it from the descriptors it queues.
- **The core pin was proved able to fail.** With no defect to redden, I ran one throwaway control instead: `#teardown` mutated to `const teardown = this.#closeConnection()` — the synchronous invalidation the O1 prose promised. The pin failed with `expected 'MCP client is not connected, so \'too…' to be 'MCP client disconnected'` (`1 failed | 938 skipped (939)`). The file was restored from a byte copy; SHA-256 `2751ff2c8e1d4a08840a72baca46afb0563b5105b0759e1ce0fc98e261fce61b` before and after, and `Promise.resolve().then(() => this.#closeConnection())` stands at `:972`. The prose edits were made after the restore.

## Baselines

Checkpoint `b9ff0b9`, tree dirty with the U4 chain. `git status --porcelain` names the same 27 paths before and after this unit — no file added, none removed. P13's instrument was not recreated; this unit's instruments were the mutation copy and the run logs, both under the session scratchpad, never under the repository's `tmp/`.

## Failing-first test names

| Test | Red | Green |
| --- | --- | --- |
| `preserves a same-name addition made by an earlier clear listener` (browser) | `1 failed \| 146 skipped (147)`, `AssertionError: expected [] to deeply equal [ 'add' ]` at `ModelContext.test.ts:386` | `2 passed \| 145 skipped (147)` with `preserves an addition made by an earlier clear listener` beside it |
| `settles requests issued after disconnect inside a connect listener` (core) | no defect to redden; under the synchronous-teardown control `1 failed \| 938 skipped (939)`, `expected 'MCP client is not connected, so \'too…' to be 'MCP client disconnected'` | `1 passed \| 938 skipped (939)` against the shipped code |

## Acceptance readings

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root plus the three scoped projects |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 133 files |
| `npm run test:src:browser` | 0 | `Test Files 6 passed (6)`, `Tests 145 passed \| 2 skipped (147)` |
| `npm run test:src:core` | 0 | `Test Files 17 passed (17)`, `Tests 939 passed (939)` |
| `npm run test:guides` | 0 | `Tests 201 passed (201)` |

Observed beyond the criteria, all exit 0: `test:policy` (`90 passed | 1 skipped (91)`), `test:setup` (`86 passed (86)`), `test:integration` (`4 passed (4)`), `test:src:server` (`374 passed (374)`). The two browser skips are the pre-existing native-registry rows — no browser exposes `document.modelContext`.

## Diffstat

This unit's delta against the U4g state, as `git diff --stat HEAD` changed-line counts per file:

```
 guides/mcp.md                          | 393 -> 401  (+8)
 src/browser/ModelContext.ts            | 385 -> 403  (+18)
 src/core/MCPClient.ts                  |  56 ->  61  (+5)
 tests/src/browser/ModelContext.test.ts | 807 -> 828  (+21)
 tests/src/core/MCPClient.test.ts       | 129 -> 177  (+48)
```

`git diff --stat HEAD` totals `27 files changed, 4177 insertions(+), 116 deletions(-)` for the whole chain.

## Shared-file patches

None. No off-limits file carries prose this change falsifies: `src/browser/types.ts:470` and `src/core/types.ts` both hold.

## Deviation state

No deviation.
