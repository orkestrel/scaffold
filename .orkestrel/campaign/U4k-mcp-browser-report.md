<!-- U4k — implementer (Opus 5, native), mcp: the prune runs in `finally`, the failure path is pinned, the prose is exact. Retained from the completion notification, 2026-09-15 (2481 s, 87 tool uses). -->

Unit U4k complete. Every carrier closed; every acceptance criterion green.

## Touched files

| File | Change |
| --- | --- |
| `src/browser/ModelContext.ts` | `#sync` and `#publish` reconcile inside `try` and prune in `finally` (`:276-280`, `:289-293`); `#prune` reads `#destroyed` at its entry and its comment names both nouns (`:370-388`); `destroy` clears `#pendingManager` (`:190`); two class remarks qualified |
| `src/browser/types.ts` | `publish` TSDoc: the failed batch still prunes, the skip and release each named by whose name they touch, the `describeWebMCPTool` sentence corrected, and "aborts"/"aborted" → "releases"/"released" |
| `guides/mcp.md` | The same two corrections in the skip paragraph and the reconcile paragraph, rewrapped to the file's width |
| `tests/fixtures/modelContext.ts` | `refuse(name)` added beside `suspend()`, with the `refused` name set on `ModelContextState` and the rejection in `registerTool` |
| `tests/src/browser/ModelContext.test.ts` | One pin added; the replacement pin gained a `change` recorder, its control case, and a `definitions()` assertion |

`tests/setupBrowser.ts` is byte-identical to its dispatch state — the recorder needed no helper, because `createRecorders` from `@orkestrel/test` already reads the bridge's emitter.

## Per-carrier closure

**1 — the prune runs in `finally`.** Both callers now read `try { reconcile each } finally { prune }`. A batch that fails partway releases the names the manager dropped — they were never in `kept` — and withdraws nothing it carries, because `kept` is built from the projections rather than from the registrations. The failure still propagates: `finally` without `catch` rethrows, so a publication rejects its caller and a followed change is swallowed by `#changed`'s own `.catch`. `#prune`'s synchronous aborts dispatch `toolchange` into listeners that can `destroy` this handle, so the `#destroyed` read moved to the prune's entry, where it replaces the pre-call read each caller held — one door, one reading (`ModelContext.ts:385-387`). The in-loop read after each abort stays.

**2 — the failure path is pinned.** The fixture member is **`refuse(name)`**, returning the release that clears the refusal, shaped like its sibling `suspend()`. It rejects inside `registerTool` after the suspension gate and before anything is recorded. The pin is `releases what the manager dropped when a registration fails`: publish `add`, refuse `subtract`, then `remove('add')` and `add(subtract)` — the reconcile throws, the `finally` prune releases `add`, and `subtract` never reached the registry; then the release is cleared, a described `divide` is added, and the next synchronisation converges on `['subtract', 'divide']`.

**3 — the `#prune` comment states the rule with its noun.** `ModelContext.ts:372-378`: both callers prune in a `finally`; a batch which fails partway "still releases the names it dropped rather than leaving them advertised until some later batch withdraws them"; "a failed batch withdraws nothing it carries: `kept` is read from the projections rather than from the registrations, so the names the batch carries are protected whether or not their reconcile ran".

**4 — the skip sentence and the diagnostic sentence are exact.** The recorder proves the split: the release of a registered name reports exactly one `change`, and an unprojectable addition under a name this handle never registered reports none. The prose in all three places now says so, and that `describeWebMCPTool` "answers `undefined` for a name `definitions()` still lists, which is that mismatch read from the manager's own side". The pin also asserts `tools.definitions()` still lists `add`.

**5 — one verb.** `types.ts:517` and `:519` read "releases" and "is released". `abort` stays at `:310`, `:466`, and `:554` (`destroy`, where the `AbortController` is the subject).

**6 — `destroy` clears `#pendingManager`.** One line, between `#unfollow()` and the registry unsubscription.

## Retitled tests

None.

## Failing-first test names

| Test | Red | Green |
| --- | --- | --- |
| `releases what the manager dropped when a registration fails` | `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "releases what the manager dropped when a registration fails"` → `1 failed \| 56 skipped (57)`, `AssertionError: expected [ { …(2) } ] to deeply equal []`. Red against the live U4j tree (SHA-256 `c373ff768f72fd2d`) — the reconcile-then-prune order is what the tree held | `1 passed \| 56 skipped (57)` in the same filter, and inside the full project run |
| `releases a registered name the manager replaced with a tool WebMCP cannot carry` (carrier 4's recorder assertions) | Already green for its release behaviour; each recorder assertion was proved discriminating on a byte copy of the test file: the first expectation forced to `0` gives `expected 1 to be +0`, the control expectation forced to `2` gives `expected 1 to be 2`. Restored; SHA-256 `118ae1da0e7f0408` before and after | `1 passed \| 56 skipped (57)` |

## Acceptance readings

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root plus the three scoped projects |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 133 files |
| `npm run test:src:browser` | 0 | `Test Files 6 passed (6)`, `Tests 164 passed \| 2 skipped (166)` |
| `npm run test:guides` | 0 | `Tests 201 passed (201)` |

Observed beyond the criteria, both exit 0: `test:setup` (`86 passed`), `test:policy` (`90 passed | 1 skipped`).

## Baselines and diffstat

Checkpoint `b9ff0b9`, tree dirty with the U4 chain. `git status --porcelain` names the same 27 paths before and after this unit. This unit's own change:

```
 src/browser/ModelContext.ts             +35 -22
 src/browser/types.ts                    +15 -12
 guides/mcp.md                           +10  -6
 tests/fixtures/modelContext.ts          +33  -1
 tests/src/browser/ModelContext.test.ts  +33  -2
```

Instruments, all in the session scratchpad: `u4k-baseline/` and `u4k-test-restore.ts`.

## Shared-file patches

None.

## Deviation state

No deviation against the objective. Three decisions inside the unit's discretion, recorded: the carrier 2 red came from the unmutated tree (the reconcile-then-prune order was live); carrier 4's recorder assertions were proved discriminating by forcing their expected values; one clause was added beyond the named carriers in the guide, the TSDoc, and the class remarks — that a failed batch still releases the names it dropped — because carrier 1 makes that observable and carrier 2 pins it.
