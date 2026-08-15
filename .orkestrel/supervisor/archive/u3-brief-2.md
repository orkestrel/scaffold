# U3 fix round 1 — successor to u3-brief.md, carrying audit round 1 (both lanes FAIL)

Same Sol thread (01a00148), same scope laws, baseline now the committed U6 checkpoint (LoginPanel files are off-limits to you), plus `tests/setupBrowser.ts` granted (the two test
stores live there). Every decision below is made; none is optional. The subject reshapes the
contract, so read the current `app/browser/types.ts` before editing.

## Items

1. **The notice becomes a reactive fact; `consume()` dies.** Replace with
   `readonly notice: RestoreNotice | undefined` backed by a `shallowRef` — repeat-safe reads, Vue
   tracking (the audit executed a watcher that observed nothing when the plain field changed).
   Clearing doors: a later successful `open()`, `login()`, `logout()`; a new restore attempt
   supersedes any stale value (the audit proved a `gone` notice survives a later successful
   restore today). TSDoc enumerates the doors — the U2 lesson.
2. **An open is complete only when it completes.** `#armed` is set before the tail attaches, so a
   tail refusal after a successful inspect reads as a successful restore: fault set, pointer
   retained, NO notice (executed: `fault:"REQUEST"`, pointer `"build"`, no notice). Distinguish
   the completed/failed outcome truthfully — a restore whose open did not fully establish sets
   the notice (`refused`) beside the ordinary fault.
3. **Only unrecoverable refusals clear the pointer.** Today every non-`AUTH` refusal deletes it,
   so a server restart permanently revokes zero-step resume (the ruling says cleared on LOGOUT).
   Clear on `ABSENT` (gone) and `FORBIDDEN` (not this reader's); retain on transport-class
   refusals (`REQUEST`, `CONFIG`) — those land on the rail with the stated reason and resume on
   the next reload. Amend the `it.each` rows to assert pointer survival for the transport class.
4. **The logout boundary is observable and page-true.** A storage whose `removeItem` refuses
   currently retains the pointer silently across logout→login (executed). Fix: (a) a removal
   failure surfaces through the logout fault channel; (b) a same-page login after logout never
   consults the pointer regardless of storage state (in-memory suppression until the next
   successful save); (c) the cross-reload residue with a refusing storage is documented on the
   store member's TSDoc as the storage's breach, not silently absorbed.
5. **The pointer gets its own seam; the store members become required.** `OperatorStoreInterface`
   now carries two verb triads (`get/set/delete` + optional `load?/save?/remove?`) — three
   synonym pairs on one interface, and optionality is a greenfield shim (all four implementers
   can implement; the two test stores close in ~4 lines each). Reshape: the view store keeps
   point access only; the resume pointer moves to its own small seam per the store law — a
   sub-entity noun on the store interface carrying `load/save/remove`, REQUIRED, implemented by
   all four implementers (`MemoryOperatorStore`, `StorageOperatorStore`, `RecordingOperatorStore`,
   `RejectingOperatorStore` — the latter two in `tests/setupBrowser.ts`), with its own storage
   key constant (not bare `VIEW_PREFIX`). Drop every `?.` on the contract. Update
   `factories.ts`'s "Point access" sentence if your reshape moves what it describes.
6. **Vocabulary and legibility.** Rename `#restoreOpen` so it cannot be confused with the
   adjacent `#restore` (the resume vs reading a stored view — `#resume` suggested); give it the
   explanatory comment every other private in the class carries, stating what the completed-open
   predicate means; order the store interface's primary shape first in `types.ts`.

## Probe preservation (owner instruction)

The audit's executed attacks become permanent tests, not lost verdict prose. Each lands in the
canonical mirrored suite under a name stating what it proves (never the audit's claim number):

- the stale-notice attack (a `gone` notice surviving a later successful restore) binds item 1;
- the false-success restore (tail refusal after successful inspect) binds item 2;
- the refusing-`removeItem` logout attack binds item 4;
- the transport-refusal pointer survival binds item 3 as the amended `it.each` rows.

Where the property spans the real server — the server-restart-while-reloading journey behind
item 3 is the natural case — put the proof in the integration files under the harness
conventions (module-file imports, concrete waits) rather than approximating it on a stub.

Recorded elsewhere, not this round: the three false guide sentences (U7's brief names them
explicitly); the integration test's relative import is the harness convention and stays.

## Gates

Static gates in your sandbox; converge lint then format scoped to your files. The Orchestrator
runs the full chain as acceptance. Expected red: guides parity only — report the exact set (the
`consume` rows disappear; your reshape may add store-seam rows).

## Output

Diffs of `app/browser/types.ts` and `Operator.ts` (contract hunks); `git status --porcelain`;
per-item proof pointers; the seam name you chose with one line of reasoning; deviations or none.
