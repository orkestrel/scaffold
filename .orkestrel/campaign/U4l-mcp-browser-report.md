<!-- U4l — implementer (Opus 5, native), mcp: the publication failure path is pinned, the host records hold on any host. Retained from the completion notification, 2026-09-15 (597 s, 72 tool uses). -->

Unit U4l complete. Both carriers closed; every acceptance criterion green.

## Touched files

| File | Change |
| --- | --- |
| `C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/ModelContext.test.ts` | Carrier 1's pin added at `:181-232`; the native block's comment corrected at `:1163-1169` |
| `C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/factories.test.ts` | The host record at `:1327-1338` replaced with the relationship |
| `C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/validators.test.ts` | The host record at `:95-101` replaced with the relationship |

No other file changed. `src/browser/ModelContext.ts`, `tests/fixtures/modelContext.ts`, and `guides/mcp.md` are byte-identical to their dispatch state.

## Per-carrier closure

**1 — the publication failure path is pinned.** `prunes a failed publication and keeps the names it carries` publishes manager A holding `dropped` and `kept`, reads the fixture's `kept` registration entry, then publishes manager B holding `accepted`, `refused`, `kept` in that order with `fixture.refuse('refused')` armed. The publication rejects its caller with the fixture's own message, and the registry then holds exactly `accepted` and `kept`: the `finally` prune released `dropped` across managers, `refused` never registered, `accepted` registered before the throw, and `kept` is the SAME registration entry the first publication made — asserted by `toBe`, not by name — because `#prune` builds `kept` from the projections rather than from the registrations. The refusal is then cleared and B publishes again, converging on `accepted`, `kept`, `refused`.

**2 — the host records hold on any host.** `factories.test.ts` now asserts `bridge !== undefined` equals `'modelContext' in document` and destroys the bridge where one was built; `validators.test.ts` asserts `isWebMCPDocument(document)` equals `'modelContext' in document`. Neither carries a conditional, a `runIf`, or a `skipIf`. The isolated absence cases are unchanged: `reports undefined for a document exposing no registry`, `accepts a real Document after a registry is installed on it`, and `refuses a document whose modelContext is not a registry`. The factories comment states what the relationship guards — a host shipping the property under a shape the guard refuses reddens there rather than leaving the native scenarios silently uncollected — and points at the `## WebMCP parity` matrix in `guides/mcp.md` for the dated host reading. The native block's comment at `ModelContext.test.ts:1163-1169` now names the isolated document as the ordinary absence assertion and this page's reading as the relationship that file holds.

## Failing-first test names

Every reading was taken against the shipped bytes (`ModelContext.test.ts` `9e3296b6…`, `factories.test.ts` `32ec0fa5…`, `validators.test.ts` `58a99a4b…`).

| Test | Red | Green |
| --- | --- | --- |
| `prunes a failed publication and keeps the names it carries` | `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "prunes a failed publication and keeps the names it carries"` against `#publish` flattened to the reconcile-then-prune order (loop, then `this.#prune(projections)`, no `finally`) → `exit=1`, `Tests 1 failed \| 57 skipped (58)`, `AssertionError: expected [ 'accepted', 'dropped', 'kept' ] to deeply equal [ 'accepted', 'kept' ]` at `:220` | Same command on the restored file → `exit=0`, `Tests 1 passed \| 57 skipped (58)` |
| `prunes a failed publication and keeps the names it carries` (the identity assertion, proved discriminating on a byte copy of the test file by binding the carried entry to `dropped`) | `Tests 1 failed \| 57 skipped (58)`, `AssertionError: expected { tool: { name: 'kept', …(2) }, …(1) } to be { …(2) } // Object.is equality` at `:224` | Restored; SHA-256 `9e3296b6…` before and after |
| `builds a bridge exactly where this page exposes the registry` (discriminating on a byte copy, expected value forced to `!('modelContext' in document)`) | `Tests 1 failed \| 61 skipped (62)`, `AssertionError: expected false to be true` at `factories.test.ts:1335` | Restored; SHA-256 `32ec0fa5…` before and after |
| `detects the registry exactly where this page exposes the property` (same forcing) | `Tests 1 failed \| 10 skipped (11)`, `AssertionError: expected false to be true` at `validators.test.ts:100` | Restored; SHA-256 `58a99a4b…` before and after |

## Acceptance readings

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 133 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root plus the three scoped projects |
| `npm run test:src:browser` | 0 | `Test Files 6 passed (6)`, `Tests 165 passed \| 2 skipped (167)` — one test more than U4k's 164, nothing lost; the 2 skipped are the native block this host does not collect |
| `git status --short --untracked-files=no` | 0 | the same 27 paths, before and after |

Observed beyond the criteria, both exit 0: `test:policy` (`90 passed | 1 skipped`), `test:guides` (`201 passed`).

## Baselines and diffstat

Checkpoint `b9ff0b9`, tree dirty with the whole U4 chain. The 27-path status is identical before and after; the path list is unchanged member for member. `src/browser/ModelContext.ts` SHA-256 is `56ac1dc5588e259d7eaf64403e20719fb508ebdac13aba722a82b42af6da2cc3` before the carrier 1 mutation, `0a4144e203081cdea2085f3f20579fe8402b644b0340322ceb798fb2e38f10a0` mutated, and `56ac1dc5588e259d7eaf64403e20719fb508ebdac13aba722a82b42af6da2cc3` after the restore. This unit's change, measured against the dispatch state:

```
 tests/src/browser/ModelContext.test.ts  +59 -2
 tests/src/browser/factories.test.ts     +11 -6
 tests/src/browser/validators.test.ts     +6 -2
```

Instruments, all in the session scratchpad `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/bab586ba-1c34-4a7e-a280-b3a7e9f303d2/scratchpad`: `u4l-mutate-publish.mjs` (carrier 1's source control), `u4l-mutate-tests.mjs` (the three forced-value controls), and the byte copies under `u4l-baseline/`, `u4l-current/`, and `u4l-final/`. Retained beside this report as `U4l-mutate-publish.mjs.txt` and `U4l-mutate-tests.mjs.txt`.

## Shared-file patches

None.

## Deviation state

No deviation against the objective. The fixture's `refuse` throws the message carrier 1 names, the carried `kept` entry is preserved rather than replaced, and neither relational assertion is red on this host. Four decisions inside the unit's discretion, recorded:

- The membership assertions read a sorted name list through a local binding (`pruned`, `converged`) rather than a chained `.sort()`, because the formatter breaks the three-call chain across five lines; the claim is membership, which is what the brief's "holds exactly" names.
- The identity assertion was proved discriminating by its own control, because carrier 1's source mutation reddens the membership assertion first and so cannot reach it.
- Every control reading was re-taken against the shipped bytes after the formatting and wording edits, so no recorded reading binds to a superseded copy.
- `guides/mcp.md` needed no edit: the `## WebMCP parity` matrix's `Shipping status` row already carries the dated chromestatus reading the factories comment points at.
