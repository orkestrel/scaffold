# U3 fix round 2 — successor to u3-brief-2.md, carrying closing-round claim 4

Same Sol thread (01a00148). Closing-round result: claims 1-3 CONFIRMED by both lanes and closed —
do not touch their behavior. The subjective lane broke claim 4 (three legs below); the objective
lane's claim-5 suspicion was EXECUTED by the Orchestrator and is true (item 4 below).

## Items

1. **A real sub-entity, not the store renamed.** `get pointer() { return this }` leaves all six
   methods public on every store — the synonym triad the round existed to remove, and the parity
   contract would publish it on the view stores. Give each implementer a distinct `#pointer`
   object typed `OperatorPointerInterface`, exposed by the readonly getter per the architecture
   rule: `stores/StorageOperatorPointer.ts` (own Storage handle from the same scope; shares no
   state with views) and `stores/MemoryOperatorPointer.ts`, one class per file; the two test
   stores in `tests/setupBrowser.ts` follow with small local objects. The view stores then
   expose exactly `get/set/delete` plus the `pointer` surface row.
2. **One term: restore.** `resume` is fixed lifecycle vocabulary already bound in this UI
   (`ClientInterface.resume`, the Resume button, `APP_WORKFLOW_RESUME_PATH`). Settle on
   *restore*, which the public types (`RestoreNotice`/`RestoreReason`) already carry:
   `#resume` → `#restore`; the existing `#restore(workflow)` (reads a stored view) → `#read`;
   `constants.ts` comment and every TSDoc "resume pointer" → "restore pointer"; the logout
   fault's user copy names neither internal term — plain words (e.g. "Could not forget the last
   open run.").
3. **True sentences on the seam.** Drop "point access" from the pointer TSDoc (that phrase is
   reserved for `get/set/delete` by the architecture rule); narrow "The operator reports that
   refusal" to the logout door — the restore door's silent discard is correct (the reader already
   has the notice) and the sentence must not claim otherwise; recheck `types.ts:922`'s interface
   summary now that the store also exposes the pointer surface.

4. **Stop overloading `#armed`.** Orchestrator-executed probe at `ed1aade`: a tail-refused open
   (successful inspect, `REQUEST` tail) renders the stack, accepts a selection, and persists
   NOTHING (`store.writes=[]`), where a healthy open persists the view — the `#armed` move
   ungated `#persist()`. Gate `#persist` on its own "a view is rendered" fact (snapshot
   established), leaving `#armed` to mean only "the open fully established" for restore/notice
   logic. Promote the probe as the permanent regression guard, both arms: tail-refused open +
   select → the view write lands; healthy open control unchanged.

## Probe preservation

The permanent probe tests from round 1 are untouched and must stay green unchanged (the renames
in item 2 may touch their imports/names only where the compiler forces it).

## Gates

Static gates scoped; Orchestrator runs the chain. Expected red: guides parity only — the store
method-table rows should SHRINK back (load/save/remove leave the view stores); report the exact
set.

## Output

Diffs of `types.ts` store hunks and the two new pointer classes; `git status --porcelain`;
per-item proof pointers; deviations or none.
