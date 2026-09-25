# J-RELEASE-CORE round 2 — the writer's report (opus on Opus 5.5, 2026-09-25)

# J-RELEASE-CORE round 2 report: `opus` on Opus 5.5, native, in worktree `release-core` over `d702bb8`, uncommitted

All five obligations are implemented, and every acceptance criterion passes. Nothing was committed. The `hold` method refuses after destruction begins. The `join` method lets a joined child leave its owner's ledger when the child's own lifetime ends. `Button` joins before it reads a hook. The prose matches the code.

## Measurements and the unknown

Both red-first cases were written before any source edit and run against `d702bb8`. Each failed on an assertion:
- **Obligation 1:** `Lifetime.test.ts` failed 1 of 19 (`r2-red-lifetime.log.txt`), with `AssertionError: expected [ [ true ] ] to deeply equal [ [ false ] ]`.
- **Obligation 3:** `Button.test.ts` failed 1 of 51 (`r2-red-button.log.txt`), with `AssertionError: expected [ [ 'true', true ] ] to deeply equal [ [ null, false ] ]`.

Both used `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

Later, `get on` returned `{}` instead of `undefined` to satisfy `exactOptionalPropertyTypes`. So I re-took the red readings with the final test text, with `Lifetime.ts` and `Button.ts` swapped to their `d702bb8` bytes (row `base-d702bb8` in the following table). The same assertions failed.

**The unknown.** `owner.release(child)` inside the child's own abort dispatch runs the child's `destroy` again, nested. It does no harm in both orderings, and E35's invariant holds:
- **Direct destroy:** the steps read `destroy, destroy, released`. After that, `owner.release` returns `false`, and a later `owner.destroy()` runs nothing.
- **Owner drain:** the steps read `newest, destroy, destroy, released, oldest`. The child's holding is given back once, before the owner's older holding.
- **Button:** the nested call skips the claim release because the signal is already aborted. It then drains, and the drain does no work twice.

The listener cannot loop: it is `once: true`, and a signal fires `abort` only once. The hooks go before the join listener runs, because `bindEventMap` removes them through the listener `signal` option, which the platform runs before it dispatches `abort`.

## The contract after the round

`LifetimeInterface`, from `src/browser/types.ts`:
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
	/** Carries the signal that aborts when destruction begins; a class that joins through the static `join` method of the `Lifetime` class and is constructed with it becomes one of the lifetime's holdings. */
	readonly signal: AbortSignal
	/**
	 * Holds a record until its release gives it back; after destruction began, it holds nothing more and runs the release of a record it does not hold at once.
	 *
	 * @param record - The object that keys the holding and carries what the release needs to finish the take or to skip it.
	 * @param release - Gives the record back; it receives the record, so it acts on what the take recorded.
	 * @returns True if the lifetime holds the record; false when destruction had begun, so the caller must take nothing further.
	 * @remarks
	 * A take that can run consumer code, such as a `showPopover()` call or a child's construction, must
	 * be held before it runs, so a destruction that code starts gives it back. A record the lifetime
	 * already holds keeps its first release. Before destruction begins, the call then returns true.
	 * After destruction began, every call returns false. For a record the lifetime does not hold, the
	 * call runs the release inside the call. For a record it holds already, the call leaves the holding
	 * pending, and the drain gives it back with its first release. A record held after destruction
	 * began stays held while its release runs, so a destruction nested in that release runs it again.
	 * @example
	 * ```ts
	 * lifetime.hold(snapshot, (held) => held.restore())
	 * ```
	 */
	hold<TRecord extends object>(record: TRecord, release: (record: TRecord) => void): boolean
	// release and destroy: unchanged from round 1
	release(record: object): boolean
	destroy(): void
}
```

The `join` method, from `src/browser/Lifetime.ts`:
```ts
/**
 * Joins a class to the lifetime that owns a signal, or to the signal itself when no lifetime owns it.
 *
 * @param signal - The signal the class's options carry; undefined joins nothing.
 * @param resource - The class, whose `destroy` method is the release.
 * @param lifetime - The class's own lifetime, whose destruction ends the class's membership: it ends the owner's holding of the class, or removes the listener a signal no lifetime owns carries.
 * @remarks
 * A class must join right after its claim, before it runs any consumer code, so a destruction
 * that code starts reaches it. A lifetime's signal makes the class a holding of that lifetime, so
 * every destruction of it, a nested one included, destroys the class; when that destruction has
 * begun, the class is destroyed inside this call. The destruction of the class's own lifetime ends
 * that holding: the owner's `release` method runs the class's `destroy` method again, nested in the
 * destruction that ended the lifetime, and the owner then holds nothing of the class. So an owner
 * that builds a child and destroys it on every change keeps no holding of a destroyed child. Any
 * other signal destroys the class when it aborts, and at once when it has aborted already.
 * @example
 * ```ts
 * // A class passes the signal its options carry, itself, and its own lifetime, as a button's
 * // constructor does: Lifetime.join(signal, this, this.#lifetime). A lifetime stands in for the
 * // class here.
 * const owner = new Lifetime()
 * const child = new Lifetime()
 * Lifetime.join(owner.signal, child, child)
 * child.destroy() // ends the owner's holding of child
 * owner.release(child) // false
 * ```
 */
static join(
	signal: AbortSignal | undefined,
	resource: Pick<LifetimeInterface, 'destroy'>,
	lifetime: LifetimeInterface,
): void
```

In the owner branch, `join` adds a listener only when `hold` returns `true`: `lifetime.signal.addEventListener('abort', () => owner.release(resource), { once: true })`.

## Files touched

All files are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core/`:
- `src/browser/Lifetime.ts`: `hold` returns `!aborted` for a record it already holds; `join` ends the owner's holding when the child's own lifetime ends; the class remarks, the `join` TSDoc and example, and the `once` comment are corrected.
- `src/browser/Button.ts`: reads `signal` before the claim and joins right after the claim, before the snapshot hold and the hooks; the remarks and constructor summary are updated.
- `src/browser/HostSnapshot.ts`: class remarks only, for the amended no-change join.
- `src/browser/types.ts`: `LifetimeInterface.signal`, `hold`'s summary, `@returns`, and remarks, the `HostSnapshotInterface.write` remarks, and the `ButtonOptions.signal` doc.
- `tests/src/browser/Lifetime.test.ts`: 5 new cases.
- `tests/src/browser/Button.test.ts`: 4 new cases and one retitled case.
- `tests/src/browser/HostSnapshot.test.ts`: 2 retitled cases.
- `guides/veneer.md`: the `hold` Methods row, the Button signal paragraph, the save paragraph (split and reflowed), and the Lifetime paragraph, now two paragraphs.
- Instruments in `tmp/j-release-core/`: `run-2.sh`, `accept-2.sh`, `mutate-2.mjs`, `mutations-2.json`, and the `*-2*.log.txt` and `acc2-*.log.txt` logs.

Diffstat against `d702bb8`: 8 files changed, 262 insertions(+), 68 deletions(-).

## Obligations and their proofs

Every case passes after the fix: `Lifetime` 23/23, `Button` 54/54, `HostSnapshot` 55/55. The red readings are at `d702bb8` under the final tests.

**Obligation 1: `hold` after destruction**
- *"returns false for a record it holds already after destruction began, keeping the first release for the drain"*: red, `expected [ [ true ] ] to deeply equal [ [ false ] ]`.
- The round-1 case "keeps the first release of a record it holds already" (before destruction) still holds.

**Obligation 2: `join` leaves with its child**
- *"ends the owner's holding of a resource destroyed on its own, so the owner neither releases nor destroys it again"* (direct destroy): red, `expected [ [ 'destroy' ], [ 'released' ] ] to deeply equal [ [ 'destroy' ], [ 'destroy' ], …(1) ]`.
- *"ends the owner's holding of a lifetime joined as its own class when that lifetime is destroyed"* (the `@example`, executed): red, `expected true to be false`.
- *"leaves no holding behind across repeated joins of resources destroyed on their own"*: red, `expected [ true, true, true ] to deeply equal [ false, false, false ]`.
- *"destroys a joined resource from the owner drain, whose own lifetime ending ends the holding inside that release"* (owner-drain ordering): red, `expected [ [ 'newest' ], [ 'destroy' ], …(2) ] to deeply equal [ [ 'newest' ], [ 'destroy' ], …(3) ]`.
- `Button`, *"leaves its owner no holding when a hook destroys it during its construction"* (destroyed inside its own construction): red, `expected true to be false`.
- `Button`, *"leaves its owner no holding when a hook read throws during its construction"* (the constructor's `catch` path): green at `d702bb8`, because the old order never joined. The `join-no-child-release` mutation reddens it.
- `Button`, *"leaves its owner no holding across repeated construction and destruction"*: red, `expected [ true, true, true ] to deeply equal [ false, false, false ]`.

**Obligation 3: `Button` joins first**
- *"joins the lifetime that owns its signal before it reads a hook, so a destruction a hook starts restores the host before it returns"*: red, `expected [ [ 'true', true ] ] to deeply equal [ [ null, false ] ]`.

**Obligation 4: the prose** is covered in the following section. `npm run test:guides` exits 0.

**Obligation 5: the replay row `button-snapshot-held`** fails 38 of 54 cases, and all 38 are `AssertionError`. That is round 1's 34 plus 4 of this round's new cases. No failure has another error class. Round 1's count of 16 was the old runner logging one assertion line per `FAIL` block; `mutate-2.mjs` classifies every failed case from the Vitest JSON report.

## Corrected sentences

**`hold` remarks (types.ts)**
- Before: "A record the lifetime already holds keeps its first release, and the call returns true."
- After: "A record the lifetime already holds keeps its first release. Before destruction begins, the call then returns true. After destruction began, every call returns false. For a record the lifetime does not hold, the call runs the release inside the call. For a record it holds already, the call leaves the holding pending, and the drain gives it back with its first release."

**`hold` summary and guide Methods row**
- Before: "Holds a record until its release gives it back, or runs the release at once when destruction has begun."
- After: "Holds a record until its release gives it back; after destruction began, it holds nothing more and runs the release of a record it does not hold at once."

**`hold` `@returns`**
- Before: "…false when destruction had begun, so the release ran inside this call and the caller takes nothing further."
- After: "…false when destruction had begun, so the caller must take nothing further."

**Item 2, `LifetimeInterface.signal`**
- Before: "…a class constructed with it joins the lifetime as a holding."
- After: "…a class that joins through the static `join` method of the `Lifetime` class and is constructed with it becomes one of the lifetime's holdings."

**Item 2, `Lifetime` class remarks**
- Before: "A class whose options take a `signal` joins through the static `join` method: a lifetime's signal makes the class one of that lifetime's holdings, with its `destroy` method as the release, and any other signal destroys the class when it aborts."
- After: "The static `join` method makes a class constructed with a lifetime's `signal` one of that lifetime's holdings, with the class's `destroy` method as the release, until the class's own lifetime ends; a button joins this way."
- Item 3 in the same remarks: "An owner holds a take…" became "An owner must hold a take…".

**Item 2, guide**
- Before: "A class constructed with a lifetime's `signal` joins that lifetime through the static `join` method of the `Lifetime` class, with its own `destroy` method as the release."
- After: "The static `join` method of the `Lifetime` class makes a class constructed with a lifetime's `signal` one of that lifetime's holdings, with the class's own `destroy` method as the release; a button joins this way. A class must join right after its claim, before it runs any consumer code. The class passes its own lifetime too, and the destruction of that lifetime ends the owner's holding of the class, so an owner that builds a child and destroys it on every change keeps no holding of a destroyed child. A signal no lifetime owns destroys the class when it aborts."

**Item 3, guide**
- Before: "The `hold` method enrolls a record before the take can run other code, and runs the release at once when destruction has begun; …" and "Each release is resumable: …"
- After: "The `hold` method holds a record, the `release` method gives one holding back, and the `destroy` method … After destruction began, the `hold` method returns `false` for every record. It runs the release of a record it does not hold at once, and it leaves a record it holds already pending for the drain to give back." Then, in a new paragraph: "An engine that keeps a lifetime must hold each take before the take can run other code, so a destruction that code starts gives the take back. When the `hold` method returns `false`, the engine must take nothing further. Each release must be resumable: …"

**Item 4, guide save paragraph**
- Before: "A button writes through the snapshot's `write` method, which saves a target only at a write that changes it: construction writes nothing, so a button destroyed before its first toggle writes nothing back, and a toggle write that leaves a target as it reads records nothing for it unless another snapshot holds it or a restoration has it still to write back, in which case the write joins that record."
- After: "A button writes through the snapshot's `write` method, which saves a target only at a write that changes it. Construction writes nothing, so a button destroyed before its first toggle writes nothing back. A toggle write that leaves a target as it reads joins the target's record when a live holder holds it or a restoration has it still to write back, and otherwise records nothing."

**`write` remarks (types.ts)**
- Before: "…joins the target's record only when another snapshot holds it or a restoration has it still to write back; otherwise it records nothing, …"
- After: "A write that changes nothing writes nothing. It joins the target's record when a live holder holds it or a restoration has it still to write back, so the record is written back only when its last holder, this snapshot included, restores. Otherwise it records nothing, …"

**`HostSnapshot` class remarks**
- Before: "A write that changes nothing records nothing, unless another snapshot holds the target or a restoration has it still to write back, and then it joins that record."
- After: "A write that changes nothing joins the target's record when a live holder holds it or a restoration has it still to write back, and otherwise records nothing."

**`join` remarks and example**
- The sentence "A class destroyed on its own stays held until its owner releases it or is destroyed, …" is replaced by the obligation 2 behaviour in the contract section.
- The example now shows what a class passes.

**Button additions**
- Guide: "The button joins right after its claim, before it reads a hook, so a destruction a hook starts reaches it. The button's own destruction ends that holding."
- Class remarks: the same sentence, plus "until the button is destroyed".
- `ButtonOptions.signal`: "…a holding of that lifetime until the button is destroyed, …".
- Constructor summary: "Claims the host, joins the lifetime its signal names, holds its snapshot, and binds initial hooks."

**Item 5, titles and `once`**
- `HostSnapshot.test.ts`: "resolves the target name once, so a write under another spelling joins the record the first write keyed" became "shares one record across spellings of an attribute name, so only the last holder writes it back".
- `HostSnapshot.test.ts`: "joins a live holder record…" became "joins a live holder's record…".
- `Button.test.ts`: "…destroyed at construction once that destruction began" became "…after that destruction began".
- `Lifetime.ts` comment: "skipped once it has ended" became "skipped after it has ended".

## Mutation table for the new behaviour

These rows come from `node tmp/j-release-core/mutate-2.mjs`, logged in `mutations-2.log.txt`. Every failure in them is an `AssertionError`.

| Row | Red reading |
| --- | --- |
| `hold-held-after-destroy` (`hold` returns `true` for a held record after destruction began) | `Lifetime` 1/23: "returns false for a record it holds already…", `expected [ [ true ] ] to deeply equal [ [ false ] ]`. `Button` 0/54. |
| `join-no-child-release` (`join` without the child-lifetime release) | `Lifetime` 4/23: the 4 obligation-2 cases. `Button` 3/54: the hook-destroys, hook-throws, and repeated-cycle cases, each `expected true to be false` or `expected [ true, true, true ] to deeply equal [ false, false, false ]`. |
| `button-join-after-hooks` (`Button` joins after its hooks) | `Button` 2/54: "joins … before it reads a hook…" (`expected [ [ 'true', true ] ] to deeply equal [ [ null, false ] ]`) and "leaves its owner no holding when a hook destroys it…" (`expected true to be false`). |

## Round 1's rows, re-run through `mutate-2.mjs`

`mutate-2.mjs` is a successor to `mutate.mjs`. It classifies every failed case, and it adapts the `join-ledger` find to the new owner branch. Every row reddened its named cases, and every failure is an `AssertionError`:

| Row | Failed cases |
| --- | --- |
| `drain-nested` | `Lifetime` 4, `Button` 1 |
| `same-entry` | `Lifetime` 1 |
| `newest-first` | `Lifetime` 5 |
| `hold-after-destroy` | `Lifetime` 4, `Button` 1 |
| `drain-past-throw` | `Lifetime` 1 |
| `first-error` | `Lifetime` 1 |
| `join-ledger` | `Lifetime` 3 |
| `join-unlisten` | `Lifetime` 1 |
| `write-no-record` | `HostSnapshot` 1 |
| `write-join` | `HostSnapshot` 3, `Button` 1 |
| `write-change` | `HostSnapshot` 9 |
| `priority` | `helpers` 4, `HostSnapshot` 1 |
| `claim-before-drain` | `Button` 3 |
| `button-latch` | `Button` 1 |
| `button-construction-save` | `Button` 1 |
| `button-snapshot-held` | `Button` 38 |

No row was skipped, no row hit a collection error, and no failure was unclassified. The log's `files failed` field counts failed suites, including `describe` blocks.

## Acceptance output

From `bash tmp/j-release-core/accept-2.sh`, verbatim:
```
check: exit 0;
lint: exit 0;
format: exit 0; Finished in 20707ms on 489 files using 16 threads.
policy: exit 0;  Test Files  1 passed (1)       Tests  109 passed | 1 skipped (110)
guides: exit 0;  Test Files  1 passed (1)       Tests  26 passed (26)
setup-browser: exit 0;  Test Files  1 passed (1)       Tests  93 passed (93)
Lifetime: exit 0;  Test Files  1 passed (1)       Tests  23 passed (23)
HostSnapshot: exit 0;     at throwUnhandlerError (…error-catcher.js:38:33)  Test Files  1 passed (1)       Tests  55 passed (55)
helpers: exit 0;  Test Files  1 passed (1)       Tests  105 passed (105)
Button: exit 0;  Test Files  1 passed (1)       Tests  54 passed (54)
index: exit 0;  Test Files  1 passed (1)       Tests  3 passed (3)
```
- **Pre-existing readings:** the `HostSnapshot` console line is a deliberately thrown `DOMTokenList` error that round 1's `acc-HostSnapshot.log.txt` also shows. The policy skip also appears in round 1's `acc-policy.log.txt`.
- **Final comment edit:** after this run, the `join` example comment changed wording only. On that file, `oxfmt --check` and `oxlint` exit 0, `npm run test:guides` exits 0, and `Lifetime.test.ts` passes 23/23.

## `git status --short`

```
 M guides/veneer.md
 M src/browser/Button.ts
 M src/browser/HostSnapshot.ts
 M src/browser/Lifetime.ts
 M src/browser/types.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/HostSnapshot.test.ts
 M tests/src/browser/Lifetime.test.ts
```

## Deviation state

No deviation. I settled these choices myself:
- **Child-lifetime release:** it takes the subjective lane's abort-listener shape, added only when `hold` returns `true`.
- **Where `Button` reads `signal`:** before the claim, so nothing runs between the claim and the join.
- **Wording and titles:** my own, within each item.

Two observations outside my scope:
- **`once` meaning "after" in an unowned file:** `tests/src/browser/helpers.test.ts` has the title "…skips it once it holds that value and priority". The file is not in my owned set, and the title was already there at `63eabbd`.
- **An already-ended lifetime:** `join` does not handle a `lifetime` that has already ended when it is called. No class reaches that case, because each one joins right after its claim with a fresh lifetime.
