# J-RELEASE-CORE — the writer's report (opus on Opus 5.5, 2026-09-25)

J-RELEASE-CORE is done and every acceptance command exits 0. `Lifetime` exists, `HostSnapshot.write` exists, and `Button` uses both: a `destroy()` nested in its restoration returns with the host restored, and a button that wrote nothing restores nothing. Nothing is committed.

## Measurements and the unknown

1. **Policy gate (`npm run test:policy`).** At `63eabbd` it exits 0 (`109 passed | 1 skipped`). No hosted fleet guide's Surface claims `Lifetime`, `LifetimeInterface`, `LifetimeHolding`, or `matchesHostValue`.
   - The surface rule checks only top-level declaration names, so a static member such as `join` is outside it and cannot collide.
   - Control run: I added `export interface Emitter { readonly join: string }` to `types.ts`, ran the gate, then restored the file from a backup. It reddened with only `surface name belongs to one package: Emitter (emitter)` and nothing about `join`.
   - With the landed code the gate exits 0. `join` is kept.
2. **B1 (witness (e)).** At `63eabbd`: `AssertionError: expected null to be 'mixed'`. The button removed an `aria-pressed` it never wrote.
3. **Nested drain.** A custom element observing `class` reacts to the restoration's first write (the token), calls `destroy()` again, then reads the host. At `63eabbd` it reads `[false, 'true']`: the nested call returned at once and `aria-pressed` was still unrestored.
4. **Unknown: does `HostSnapshot.save` still have callers?** Yes. It stays. `save` is still called in `Alert.ts`, `Carousel.ts`, `Collapse.ts`, `Dropdown.ts`, `Isolation.ts`, `Modal.ts`, `Offcanvas.ts`, `Placement.ts`, `ScrollLock.ts`, `ScrollSpy.ts`, `Swipe.ts`, `Tab.ts`, `Toast.ts`, and `Tooltip.ts`. `Button.ts` no longer calls it.

## Contract as landed (verbatim from `src/browser/types.ts`)

```ts
/**
 * Holds what an owner took, each record with the release that gives it back, and gives every holding back on every destruction.
 *
 * @remarks
 * A release must be resumable: run again while it is still running, it finishes its unfinished work
 * and repeats no effect it completed, as a snapshot's `restore` does. A release gives back only what
 * its record names, and it reads the page again only to skip work that is already done.
 */
export interface LifetimeInterface {
	/** Carries the signal that aborts when destruction begins; a class constructed with it joins the lifetime as a holding. */
	readonly signal: AbortSignal
	/**
	 * Holds a record until its release gives it back, or runs the release at once when destruction has begun.
	 *
	 * @param record - The object that keys the holding and carries what the release needs to finish the take or to skip it.
	 * @param release - Gives the record back; it receives the record, so it acts on what the take recorded.
	 * @returns True if the lifetime holds the record; false when destruction had begun, so the release ran inside this call and the caller takes nothing further.
	 * @remarks
	 * Hold a take that can run consumer code, such as a `showPopover()` call or a child's construction,
	 * before it runs, so a destruction that code starts gives it back. A record the lifetime already
	 * holds keeps its first release, and the call returns true. A record held after destruction began
	 * stays held while its release runs, so a destruction nested in that release runs it again.
	 * @example
	 * ```ts
	 * lifetime.hold(snapshot, (held) => held.restore())
	 * ```
	 */
	hold<TRecord extends object>(record: TRecord, release: (record: TRecord) => void): boolean
	/**
	 * Gives one holding back now.
	 *
	 * @param record - The record that keys the holding.
	 * @returns True if the lifetime held the record; false otherwise.
	 * @remarks
	 * The holding stays in the lifetime while its release runs, so a destruction or a release nested
	 * in that release runs it again, and the holding ends only while the lifetime still holds that
	 * same entry: a record held again after a nested call ended it keeps its new holding. A release
	 * that throws ends its holding, and the error propagates.
	 * @example
	 * ```ts
	 * lifetime.release(snapshot)
	 * ```
	 */
	release(record: object): boolean
	/**
	 * Aborts the signal on the first call, then gives back every pending holding, newest first, on every call.
	 *
	 * @remarks
	 * A call nested in one of the releases drains too: it runs every pending release again, the
	 * running one included, so it returns only after every holding is given back, and the call it
	 * interrupted, resuming, finds nothing left. A release that throws ends its holding; the drain
	 * gives back every other holding and then rethrows the first error.
	 * @example
	 * ```ts
	 * lifetime.destroy()
	 * ```
	 */
	destroy(): void
}

/** Describes one holding a lifetime keeps: the record that keys it and the release bound to that record. */
export interface LifetimeHolding {
	/** Carries the record that keys the holding. */
	readonly record: object
	/** Gives the record back, with the record bound at the hold. */
	readonly release: () => void
}
```

```ts
	/**
	 * Writes a value to a target, saving the target first when the write changes it, and joining only a record that already exists when it does not.
	 *
	 * @param target - The attribute, class token, or inline property to write.
	 * @param value - The value to write, in the form the `readHostValue` function reads it; undefined removes the target.
	 * @param priority - The inline property's priority, in the form the `readHostPriority` function reads it; an attribute and a token read the empty string, so a write of either passes none. Default: the empty string, which sets the property without a priority.
	 * @remarks
	 * The target resolves once, as a save resolves it, and the record and the write both use that
	 * name. The write changes the target unless the `matchesHostValue` function reports that the
	 * target already reads the value and the priority; the comparison reads the platform's serialized
	 * form, so a property value the platform serializes differently counts as a change. A write that
	 * changes the target saves it, joining its record or reading the element when no record exists,
	 * and then writes. A write that changes nothing writes nothing, and it joins the target's record
	 * only when another snapshot holds it or a restoration has it still to write back; otherwise it
	 * records nothing, so destruction writes back no value the host already carried, and an edit you
	 * make after that write survives the destruction.
	 * @example
	 * ```ts
	 * snapshot.write({ category: 'attribute', element: host, name: 'aria-expanded' }, 'true')
	 * ```
	 */
	write(target: HostSnapshotTarget, value: string | undefined, priority?: string): void
```

The static member, in `Lifetime.ts`: `static join(signal: AbortSignal | undefined, resource: Pick<LifetimeInterface, 'destroy'>, lifetime: LifetimeInterface): void`.

## Files touched

All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core/`.

- `src/browser/Lifetime.ts` (new): the ledger, the reentrant newest-first drain, and the static `join`.
- `src/browser/HostSnapshot.ts`: adds `write`; `save` moves into a private `#save` that both share; adds a private `#key`; the class remarks and example describe `write`.
- `src/browser/helpers.ts`: adds `matchesHostValue`. The `recordHostWrite` and `rewindHostWrites` bodies call it; `recordHostWrite` keeps its signature.
- `src/browser/Button.ts`: holds its snapshot in a `Lifetime`, saves nothing at construction, and toggles through `write`. `destroy` releases the claim once, then drains on every call. It joins through `Lifetime.join`.
- `src/browser/types.ts`: adds `LifetimeInterface`, `LifetimeHolding`, and `HostSnapshotInterface.write`; updates the `ButtonInterface.destroy` summary and the `ButtonOptions.signal` summary.
- `src/browser/index.ts`: adds the `Lifetime.js` barrel row.
- `tests/src/browser/Lifetime.test.ts` (new): the `Lifetime` and `Lifetime.join` cases.
- `tests/src/browser/HostSnapshot.test.ts`: the `write` cases, covering change, no change, priority, the E25 narrowing, a pending restoration, and name spelling.
- `tests/src/browser/helpers.test.ts`: the `matchesHostValue` cases, including the property values engines write and one re-serialized value.
- `tests/src/browser/Button.test.ts`: B1, the nested drain, and joining a lifetime.
- `tests/src/browser/index.test.ts`: the export list gains `Lifetime` and `matchesHostValue`.
- `guides/veneer.md`:
  - Surface rows: the `Button` summary changes, and rows are added for `LifetimeInterface`, `LifetimeHolding`, `Lifetime`, and `matchesHostValue`.
  - The Button paragraph under Surface now describes what destruction writes back.
  - `#### ButtonInterface` and `#### HostSnapshotInterface` gain their changed rows, and `#### LifetimeInterface` is new.
  - `### Ownership and restoration` has updated signal and save paragraphs and a new drain paragraph.

Diffstat: `10 files changed, 516 insertions(+), 83 deletions(-)` for tracked files, plus `Lifetime.ts` (119 lines) and `Lifetime.test.ts` (245 lines), both new.

## Red-first proofs

Each command was `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Button.test.ts`.

| Case title | Red at `63eabbd` | Green |
| --- | --- | --- |
| `writes nothing back at destruction when it never wrote the host, keeping the values you set` (B1) | `2 failed \| 47 passed (49)`: `expected null to be 'mixed'` | `50 passed (50)` |
| `returns from a destroy a reaction to its restoration calls only after the host is restored` (nested drain) | same run: `expected [ [ false, 'true' ] ] to deeply equal [ [ false, null ] ]` | `50 passed (50)` |

The `Lifetime`, `write`, and `matchesHostValue` cases test code that does not exist at `63eabbd`, so they can have no red reading there. The mutation table binds them instead.

## Mutation table

Each mutation was applied by `tmp/j-release-core/mutate.mjs` from `tmp/j-release-core/mutations.json`, and the file was restored after each run. The full log is `tmp/j-release-core/mutations.log.txt`.

| Load-bearing line | Mutation | Red reading |
| --- | --- | --- |
| Drain runs on a nested call | `if (aborted) return` at the top of `Lifetime.destroy` | Lifetime: 4 failed, including `drains on a destroy a release calls…`: `expected [ [ 'second' ], …(2) ] to deeply equal [ [ 'second' ], [ 'second' ], …(2) ]`. Button: `returns from a destroy…`: `expected [ [ false, 'true' ] ] to deeply equal [ [ false, null ] ]` |
| An entry ends only while it is the same entry | `#give` filters by `record` instead of by entry | `ends a holding only while…`: `expected [] to deeply equal [ [ {} ] ]` |
| Newest first | drain without `.reverse()` | 4 failed, including `expected [ [ 'first', true ], …(2) ] to deeply equal [ [ 'third', true ], …(2) ]` |
| `hold` after destruction began | always `return true` without releasing | 3 Lifetime cases (`expected true to be false`, `expected +0 to be 1`). Button: `joins the lifetime…`: `expected Button{} to be undefined` |
| Drain continues past a throwing release | remove the `try`/`catch` in `destroy` | `expected [ [ 'newest' ] ] to deeply equal [ [ 'newest' ], [ 'oldest' ] ]` |
| Drain rethrows the first error | `failure = { error }` | `expected [Function] to throw error including 'newer' but got 'older'` |
| `write` creates no record for a write that changes nothing | the no-change branch always saves | `records nothing at a write that changes nothing…`: `expected 'false' to be 'true'` |
| `write` joins a live record | the no-change branch never joins | HostSnapshot: 3 failed (`expected null to be 'true'`, `expected null to be 'open'` twice). Button: `hands the originals…`: `expected null to be 'true'` |
| `write` saves before a changing write | drop the `#save` before `writeHostValue` | HostSnapshot: 9 failed, including `expected null to be 'false'` |
| The predicate compares priority | drop the priority clause | helpers: 4 failed (including `expected true to be false`). HostSnapshot: `expected '' to be 'important'` |
| `Button` releases its claim before the drain | release the claim after `lifetime.destroy()` | 3 failed, including `releases its host before restoring it…`: `expected [ [ …(1) ] ] to deeply equal []` |
| `Button.destroy` has no whole-method latch | add `if (aborted) return` at the top | `expected [ [ false, 'true' ] ] to deeply equal [ [ false, null ] ]` |
| `Button` construction saves nothing | re-add the `aria-pressed` save | B1: `expected null to be 'mixed'` |
| `Button` holds its snapshot | remove the `hold` | 34 failed, including `expected [ 'active', 'is-pressed' ] to deeply equal [ 'active' ]` |
| `join` holds the resource in the owning lifetime | destroy through the abort listener instead | `expected [ [ 'joined' ], [ 'aborted' ], …(2) ] to deeply equal [ [ 'aborted' ], [ 'newest' ], …(2) ]` |
| `join` removes its listener from a signal no lifetime owns | drop `signal: lifetime.signal` | `expected 1 to be +0` |

## Acceptance output (verbatim)

```
check exit 0
lint:check exit 0
format:check exit 0
All matched files use the correct format.
Finished in 21377ms on 489 files using 16 threads.
test:policy exit 0
      Tests  109 passed | 1 skipped (110)
test:guides exit 0
      Tests  26 passed (26)
test:setup:browser exit 0
      Tests  93 passed (93)
Lifetime.test.ts exit 0      Tests  18 passed (18)
HostSnapshot.test.ts exit 0  Tests  55 passed (55)
helpers.test.ts exit 0       Tests  105 passed (105)
Button.test.ts exit 0        Tests  50 passed (50)
index.test.ts exit 0         Tests  3 passed (3)
```

After that run I corrected the `priority` parameter's TSDoc in `types.ts`. A re-run afterwards: `tsc` on the browser project clean, oxfmt and oxlint on the file clean, `test:guides` exit 0.

Observations, not criteria:
- I also ran `Delegate.test.ts` (140 passed), `Collapse.test.ts` (49), `Tab.test.ts` (47), and `Toast.test.ts` (44), all read-only, because the `recordHostWrite` body changed. All passed.
- `HostSnapshot.test.ts` prints an "Unhandled error" `SyntaxError` from the existing case `withdraws a shared target when the last holder restoration throws inside a reaction`, which throws on purpose. The run still exits 0.

## `git status --short`

```
 M guides/veneer.md
 M src/browser/Button.ts
 M src/browser/HostSnapshot.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/HostSnapshot.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
?? src/browser/Lifetime.ts
?? tests/src/browser/Lifetime.test.ts
```

## Deviation state

No stop. These are the choices I made and recorded:

- **Static member name:** `join`, since the policy gate does not inspect static members.
- **`join` takes a third parameter, the class's own `lifetime`.** It is used for one thing: when the class is destroyed first, the listener on a foreign signal is removed, as Button does today. Without it, every destroyed class would stay attached to a long-lived foreign signal.
- **A class destroyed directly stays enrolled in its owner lifetime** until the owner releases it or is destroyed. The owner's later call to its `destroy` finds nothing to give back. This is documented on `join`. J-RELEASE-DELEGATE's discard path (`release(engine)`) owns closing it.
- **A write that changes nothing also joins a record a restoration still has to write back**, not only one a live snapshot holds. The existing Button case `hands the originals to an engine constructed at the token write of its restoration` requires it (the write-join mutation reddens it), and it matches E25's takeover rule.
- **`release(record)` called inside that record's own release runs the release again**, the same way a nested `destroy` does.
- **Holding a record that is already held keeps its first release** and returns true.
- **Layout:** `Lifetime` sits flat at `src/browser/Lifetime.ts`. It stores each release through `release.bind(undefined, record)`, so there is no nested function and no type assertion.
- **`rewindHostWrites` also calls `matchesHostValue`,** so the whole file has one comparison. Its behaviour is unchanged.
- **One guide paragraph outside the named sections changed:** the Button paragraph under Surface. It stated "the `aria-pressed` value it found at construction", which the change makes false.
- **Process slip:** I ran one empty heredoc command, which the brief forbids. It created an empty file under `tmp/j-release-core/`, which I deleted. It touched no owned or shared file.

Records: the logs, the mutation script, and its input are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core/tmp/j-release-core/`.
