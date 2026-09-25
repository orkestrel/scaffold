# J-RELEASE-SWEEP slice S6 — the lens map (2026-09-25)

`reviewer` on Opus 5.5, holding the objective lens, in Workflow run `wf_29efd986-1c7`. The brief is `units/j-release-sweep-brief.md`. The lens's final message follows verbatim.

**Source review: slice S6, objective lens, reviewer on Opus 5.5.** I ran nothing. Every ruling comes from reading the source at `C:/Users/mikes/WebstormProjects/veneer` (`main`). All four slice files resolved. Line numbers are approximate, so find each site by its symbol.

**The main answer.** The `HostSnapshot` class makes I1 and re-entrant I2 the default, but only for attributes, class tokens, and inline properties. Every other holding is managed by hand in each engine. The `Delegate` class breaks I2 at three places: its `destroy` method, its `#release` method, and its `#construct` method.

## 1. Station table

| # | File and symbol | Holding | Taken at | Given back at | I1 | I2 |
|---|---|---|---|---|---|---|
| 1 | `HostSnapshot.ts` `save` (~100–129): a takeover of a record a restoration is still writing | Shared target record (value, priority, holders, owner) | First read ~112–115, otherwise joins ~110 | The restoration gives the target to the saver: owner set to `undefined` ~118–124 | holds: a joining save uses `record.value` ~110 and never reads the element again ~112 | holds: the entry reaches `#targets` ~128 before it returns. The outer `#withdraw` keeps the record because owner no longer matches ~327 |
| 2 | `HostSnapshot.ts` `restore` → `#writeBack` (~145–164, ~310–321) | Each target this snapshot holds last | `save` | `writeHostValue(target, record.value, record.priority)` ~319 | holds: writes from the record ~319 | holds: passed entries move into `#owned` ~136 before the first write. A nested `restore` walks `#owned` ~139. `written` is marked before the write ~318. `#owned` is cleared in `finally` ~168, after the writes |
| 3 | `HostSnapshot.ts` `restore`, presence removal (~148–151, ~155–161); `#absent` ~268, `#leave` ~243 | Presence record of `class` or `style` | `#join` ~233 | `removeAttribute` ~150, ~159 | holds: removal follows `record.present` (~261, ~274). The fresh emptiness read ~150, ~158 only stops a removal that would delete content | holds: `#joined` moves to `#leaving` ~137 before any write. Each entry leaves only through `#leave` ~248. Any remainder leaves in `finally` ~167 |
| 4 | `HostSnapshot.ts` `restore` `finally` (throw path, ~165–169) | Targets not yet written back | — | Withdrawn without a write ~166 | n/a | holds against the bound: nothing outlives the call. I found no throwing write through shipped code |
| 5 | `HostSnapshot.ts` `clear` (~172–181), a discard | All holdings and pending ownerships | — | Relinquished ~173, withdrawn ~174, left ~180 | n/a | holds. A clear by a snapshot that joined another restoration's pending record forgets that record, so the interrupted restoration writes nothing for it. `types.ts` documents this at ~418–420. The only caller is `Alert.close` (`Alert.ts`:~150), after it has removed its host (~145) |
| 6 | `HostSnapshot.ts` `#relinquish` (~187–207) | This snapshot's holder entries | `save` | Left to other holders ~197, passed to the restoration ~199–200, or forgotten ~202 | holds | holds: `#targets = []` at ~189 runs synchronously before `#owned` takes the passed entries (~136). No consumer code runs in between |
| 7 | `Registry.ts` `release` (~44–46) | The host claim | `claim` ~37 | `#owners.delete` ~45 | holds: deletes only when the recorded engine matches ~45 | n/a: atomic, runs no consumer code. Callers release before they restore (`Modal.ts`:~447, `Alert.ts`:~162), so `find` returns nothing while restoration runs. This feeds row 11 |
| 8 | `Delegate.ts` `destroy` (~454–462) | `#owned` engines, `#controller` listeners, `#observer` | `#acquire` ~1056, constructor ~442–447 | `abort` ~456, `disconnect` ~457, `engine.destroy()` ~460, `clear` ~461 | holds | **violates**. The guard at ~455 makes a nested `destroy` return at once, while engines later in the reverse loop (~460) are still held and unrestored |
| 9 | `Delegate.ts` `#release` (~1084–1090), the observer path | An engine whose host left the root | `#acquire` | `#owned.delete` ~1087, then `engine.destroy()` ~1088 | holds | **violates**. The field is cleared before the release runs, so a `delegate.destroy()` made inside that engine's destruction cannot reach it |
| 10 | `Delegate.ts` `#construct` abort path (~986–1001) | An engine a route constructs | `new X(...)` at the route | `engine.destroy()` ~999 | holds | **violates** (a take in progress). A `delegate.destroy()` made inside the engine's construction writes returns before that engine can be reached. `#construct` destroys it only after `new` returns |
| 11 | `Delegate.ts` `#discard` (~1063–1080) | `#owned` engines | `#acquire` | `#owned.delete` ~1077, when `Registry.find` no longer returns the engine | holds | holds under the documented contract (~193–194): an engine the consumer destroyed directly belongs to that call. It drops an engine mid-destruction (comment ~1061). See section 3 |
| 12 | `Delegate.ts` `#scan` catch (~502–505), an abort path | Engines the scan acquired | ~494, ~500 | `this.destroy()` ~503 | holds | holds. The throwing engine was never acquired and releases its own takes (E25 C1). The unguarded `#acquire` after a destroy is unreachable, because no consumer holds the delegate before its constructor returns |
| 13 | `Delegate.ts` `#routeModal` ~887–894 and `#routeOffcanvas` ~957–964, the focus-return listener | The `hidden` listener | `addEventListener` ~888, ~958 | `once`, `refused.abort()` ~893, ~963, or `#controller` abort ~456 | holds: focuses the recorded `trigger` | holds: its signal includes `#controller`, which `destroy` reaches |
| 14 | `Delegate.ts` observer (~231–236), `#unobserve` ~1093 | The `MutationObserver` observation | `#acquire` ~1053–1055 | `#unobserve` ~1094, `destroy` ~457 | n/a | holds |
| 15 | `helpers.ts` `recordHostWrite` (~950–966), the take for the returning step | A `HostWrite` record | Reads prior value and priority ~963–964 at the first changing write | — | holds: records once ~956–962 and never reads again | n/a. It compares a caller's unnormalised `next` value with the platform's serialised reading (~965). A property value the platform re-serialises therefore records a write that changed nothing. I found no observable effect, because `rewindHostWrites` skips a target that already equals its record (~985) |
| 16 | `helpers.ts` `rewindHostWrites` (~982–989), the returning step | The change's `HostWrite[]`, a local of the call | `recordHostWrite` | `writeHostValue` ~986, in reverse order | holds: writes the recorded value; the fresh read at ~985 only skips a no-op | holds only if a condition holds. The list is not reachable from `destroy`. When `owns()` turns false (~984), the rest is abandoned on the assumption that the engine's `HostSnapshot` saved every recorded target. No type or helper ties the two records together. Each call site pairs them by hand, for example `Collapse.ts`:~212 calls `#save` before the records at ~216 |

### Smallest inputs for the violations

- **Row 8.** Build `new Delegate({ root: document })`. Click a collapse trigger, which acquires a `Collapse` and shows the panel. Then click a modal trigger, which acquires a `Modal`, shown with an isolation. Add `modalTrigger.addEventListener('focus', () => { delegate.destroy(); probe = panel.classList.contains('show') })`. Call `delegate.destroy()`.
  - The modal is destroyed first. Its abort ends the isolation (`Modal.ts`:~443, ~448), and the isolation returns focus to the trigger (`types.ts`:~472).
  - The nested `destroy` returns at ~455, so `probe` reads `true`. The collapse is not destroyed yet, and the modal's snapshot has not restored (`Modal.ts`:~453–454).
  - Reachable through shipped code and a documented focus listener.
- **Row 9.** Build the delegate and click a modal trigger. Add `modalTrigger.addEventListener('focus', () => { delegate.destroy(); probe = modalHost.getAttribute('aria-modal') })`. Run `modalHost.remove()` and wait for the observer delivery.
  - `#release` deletes the modal at ~1087, then calls `modal.destroy()` at ~1088. The abort returns focus, and the listener calls `delegate.destroy()`, which skips the modal.
  - `probe` reads the show's value, because `Modal.ts`:~454 has not run yet.
  - Reachable through shipped code and a documented focus listener.
- **Row 10.** Use a custom-element tab control (`data-bs-toggle="tab"`) whose `attributeChangedCallback` watches an attribute the tab writes at construction. The callback calls `delegate.destroy()` and reads that attribute. Click the control.
  - The attribute reads the engine's write after `delegate.destroy()` has returned. `#construct` destroys the engine only at ~999.
  - The comment at ~982–984 names this path.
  - Reachable through shipped code and a custom element's synchronous reaction (the reaction class `HostSnapshot.ts`:~53–54 names). This is not a foreign contract.

For rows 8 and 9, fixing the delegate alone does not close the violation. The engine's own nested `destroy` also returns early (`Modal.ts`:~442), which is slice S3.

## 2. Consumer code each station runs, and the fields still set while it runs

- **Rows 1–3, `HostSnapshot.restore`:** only synchronous custom-element reactions to each write (`HostSnapshot.ts`:~53–54). While they run, these are still set:
  - `#owned`, holding every passed entry;
  - `#leaving`;
  - `record.owner` and `record.written` for the target being written.
  
  `#targets` is empty unless a reaction saved again.
- **Row 5, `clear`:** none.
- **Rows 6 and 7:** none.
- **Row 8, `Delegate.destroy`:** everything each `engine.destroy()` runs at ~460. That includes isolation focus-return listeners, which run during the abort in `Modal.ts`:~443, and reactions to snapshot writes. Still set: `#owned` in full, with `#controller` aborted and `#observer` disconnected.
- **Row 9, `#release`:** the same code. Still set: `#owned`, minus the engine being destroyed.
- **Row 10, `#construct`:** reactions to construction writes. Still set: `#owned`, without the engine being constructed.
- **Row 11, `#discard`:** none.
- **Row 13:** consumer focus listeners inside `trigger.focus()`. Still set: `#controller` and `refused`.
- **Row 16, `rewindHostWrites`:** reactions to each write. Still set: the `writes` local of the call, which `destroy` cannot reach, and the engine's snapshot holdings.

## 3. The source

`HostSnapshot` alone keeps a drainable ledger: its `#owned` field outlives an interrupted `restore`, and a nested call finishes that restore's work. Every other holding sits in a field each engine clears by hand, guarded by `if (aborted) return` (`Delegate.ts`:~455, `Modal.ts`:~442). That guard turns a nested `destroy` into a no-op instead of a drain. The returning step keeps a second record (`HostWrite[]`) that no `destroy` can reach. `Registry.release` runs first, so `Registry.find`, which the delegate uses to test whether an engine is live, reports an engine gone while its releases are still running.

**The one change at the source:** one per-owner ledger of holdings, each entry paired with its release. `destroy` drains the ledger, and an entry leaves only after its release returns and only if it is still the same entry. A nested `destroy` drains the same ledger. This generalises `HostSnapshot`'s `#owned` field.

That change would close rows 8–10. It would also:

- make the returning step's list an entry that `destroy` can reach, so the two records become one;
- give the delegate a liveness test that reads the ledger instead of `Registry.find`.

This proposes no public API. Where the ledger lives and what its surface is belong to the design round.

## 4. Claims I could not break

- `HostSnapshot` never writes back from a fresh read. A save made during a restoration keeps the original value (~110, ~112), and `#withdraw` keeps a record another snapshot has taken over (~327).
- A nested `restore` on the same snapshot writes every target the interrupted call still owns. The interrupted call then writes nothing more, because `written` is set before each write (~315–318).
- A nested `clear` on the same snapshot is unreachable through shipped code. `Alert.destroy` aborts before it restores (`Alert.ts`:~162–163, ~185), so `close` is refused (~124).
- Presence removal never deletes an attribute that carries content (~150, ~158).
- `Registry.release` never evicts a newer owner (~45).
- The unguarded `#acquire` in `#scan` is unreachable (row 12).
- `restore`'s throw path: I found no write that throws through shipped code.
- The focus-return listeners and the observer are all reachable from `Delegate.destroy`.
- `rewindHostWrites` skips no-op writes and stops at the first read of `owns()` that returns `false`.

Each engine slice owns the pairing that row 16 depends on: whether every `recordHostWrite` target is also saved in the snapshot. S6 cannot rule on it.
