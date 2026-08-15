# U2 fix round 3 — successor to u2-brief-4.md, carrying audit round 1

Three lanes returned FAIL. Every item below is reconciled and decided; none is optional. Same
thread, same scope laws. Owned files grow by nothing; all work is in files U2 already touched
plus `tests/setupBrowser.ts` (granted: shared test infrastructure is its designated home).

## Items

1. **Delete `createRosterManager`.** Both engine lanes broke it independently: a pass-through
   over an equally public constructor, no house precedent (`FeedManager`/`StackManager` have no
   factory), bypassed by the real composition root (`Operator.ts:89`), consumed only by the unit
   test. Construct `new RosterManager(...)` in the test, drop the now-unused imports, and note
   the parity list shrinks to 23.
2. **Give the manager the decay memory.** REDESIGN's settled ruling — "Ended runs decay in place
   (never vanish)" — has no data source: `#launch` replaces `#snapshot` wholesale and a departed
   run leaves no trace, so the rail would need a second roster store in the view layer.
   Orchestrator ruling: add `departed: readonly ApplicationRun[]` to `RosterManagerInterface` —
   the entries the latest snapshot no longer contains, carrying their last-seen state, newest
   departure first, reset by `start()` and `clear()`, untouched by `retry()`/`abort()`. Ids are
   single-use server-side, but handle re-entry defensively: an id that reappears in the roster
   leaves `departed`. Type first in `app/browser/types.ts` with TSDoc naming exactly these
   semantics; prove departure capture, ordering, last-seen state, reset doors, and re-entry by
   test.
3. **`start()` adopts a session — clear the retained snapshot.** Reviewer-substantiated leak:
   after user A's expiry, user B's login window reads A's authorized rows (`snapshot` keeps A's
   roster until B's first frame; unbounded if B's stream faults). Fix inside `#restart(true)`:
   session start clears `snapshot` (and per item 2, `departed`); `retry()` retention is correct
   and must not change. Test: expiry as A, login as B, assert `snapshot === undefined` before
   B's first frame; a stream fault in that window presents loading-with-error, not A's rows.
4. **Fix the `fault` TSDoc.** It reads "cleared by the next start or snapshot" but `retry()`
   clears it synchronously and `clear()` is a fourth door. New sentence: "The last
   non-authentication stream failure, cleared by the next start, retry, snapshot, or clear."
5. **Consolidate the test infrastructure.** `waitForOperator`/`waitForRoster` are one helper
   twice; `RefusingRoster` is a subset of `ScriptedRoster`; `replaceRoster` is a Proxy bypassing
   the shared `ScriptedClient.roster` stub. One wait helper and one scriptable roster fixture in
   `tests/setupBrowser.ts` (extending `ScriptedClient`'s roster to deliver/fail is the smaller
   change); delete all three locals; fix the duplicate `../../../setup.js` import.
6. **Close the analyst's two evidence gaps.** (a) Two concurrent `destroy()` calls settle and
   the owned loop is joined exactly once; a synchronously-throwing `watch()` is contained (routed
   to `fault`, `#task` never rejects). (b) A REAL second `AUTH` refusal: drive two same-session
   `AUTH` outcomes through reachable operations, distinguish the refusal objects, assert exactly
   one expiry crossing; separately deliver a non-`AUTH` failure with a recorder and assert zero
   expiry calls.
7. **The dead assignment.** `RosterManager.ts:118` clears `#fault` on the `AUTH` path; both
   lanes believe it unreachable (every route in has `fault` already undefined). Verify, then
   delete it — or keep it with a test that reaches it.

Recorded, not this round's work: `#decorate`'s positional growth and the clone-freeze idiom
(advisories for a later surface unit); the guide's two-doors note (`operator.roster` owns the
subscription, `client.roster` is transport) is U7's.

## Gates

Static gates in your sandbox; converge lint then format if your edits require it. The
Orchestrator runs the full chain as acceptance. Expected red: guides parity only (report the
exact 23-name list).

## Output

Diffs of `app/browser/types.ts` and `RosterManager.ts`; `git status --porcelain`; per-item proof
pointers; the parity list; deviations or none.
