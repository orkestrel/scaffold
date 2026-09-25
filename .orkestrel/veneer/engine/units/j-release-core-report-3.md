# J-RELEASE-CORE round 3 — the writer's report (opus on Opus 5.5, 2026-09-25)

# J-RELEASE-CORE round 3: report

`join`'s owner branch no longer adds an event listener. The class's own lifetime now ends the owner's holding of the class through its drain. So a joined child's release error propagates from both destructions, and a child whose lifetime already ended leaves the owner nothing. Every acceptance command exits 0, every mutation row reddens its proof by an assertion, and nothing was committed.

## Measurements: the red readings at `03526bc`

I added the cases before editing any source. The run was `bash tmp/j-release-core/run-2.sh tests/src/browser/Lifetime.test.ts r3-red-lifetime`.

- **Result:** `Tests 3 failed | 24 passed (27)`, exit 1.
- **Error case, owner destroyed:** `AssertionError: expected [Function] to throw an error` at `expect(() => owner.destroy()).toThrow('release failed')`.
- **Error case, child destroyed directly:** `AssertionError: expected [Function] to throw an error` at `expect(() => child.destroy()).toThrow('release failed')`.
- **Ended-lifetime case:** `AssertionError: expected true to be false` at `expect(owner.release(child)).toBe(false)`.
- **The lost errors:** the same run logged `Unhandled Errors … 2 errors` (`Error: release failed`). These are the listener exceptions the platform reported to the global object instead of propagating.

## `join` and the private ending, verbatim

```ts
	static join(
		signal: AbortSignal | undefined,
		resource: Pick<LifetimeInterface, 'destroy'>,
		lifetime: LifetimeInterface,
	): void {
		if (signal === undefined) return
		const owner = Lifetime.#lifetimes.get(signal)
		if (owner !== undefined) {
			if (!owner.hold(resource, (held) => held.destroy())) return
			// The resource's own lifetime ends the owner's holding in its drain, so an owner that builds
			// and ends a child on every change keeps a bounded ledger, and a release error propagates
			// through the drain. Held first, the ending runs last, after every other holding is given
			// back, so an owner destruction nested before it still reaches the resource. A lifetime that
			// has ended runs the ending at once, and the owner keeps nothing.
			lifetime.hold({ owner, resource }, (held) => held.owner.#end(held.resource))
		} else if (signal.aborted) resource.destroy()
		else {
			signal.addEventListener('abort', () => resource.destroy(), {
				once: true,
				signal: lifetime.signal,
			})
		}
	}

	// Ends the holding of a record without running its release. A joined resource's own lifetime calls
	// it as its oldest holding's release, so the owner keeps the resource until the resource's drain
	// gave everything else back. When that lifetime had ended before the join, it calls it at once.
	#end(record: object): void {
		this.#holdings = this.#holdings.filter((holding) => holding.record !== record)
	}
```

I also rewrote `join`'s `@param lifetime` and `@remarks`. They state the ending, its oldest position, error propagation, and the ended-lifetime case. They also state that the foreign branch destroys the class in an abort listener, so the platform reports a throw there rather than the abort propagating it.

## Files touched

All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core/`. The diffstat is 4 files changed, 143 insertions(+), 24 deletions(-).

- **`src/browser/Lifetime.ts`:** the listener is replaced by the ending the class's own lifetime holds, `#end` is added, and `join`'s TSDoc is rewritten.
- **`tests/src/browser/Lifetime.test.ts`:** four new cases, and the round-2 order assertions updated.
- **`tests/src/browser/Button.test.ts`:** one new case, a nested owner destruction inside the button's restoration.
- **`guides/veneer.md`:** the § Ownership and restoration sentences on `join` rewritten.
- **`src/browser/types.ts`:** unchanged. The `LifetimeInterface` remarks never described the listener, and the rethrow promise in `destroy` is now true for joined children.
- **Instruments, under `tmp/j-release-core/`:**
  - `mutate-3.mjs` is `mutate-2.mjs` with only its table, log, and report paths changed.
  - `build-mutations-3.mjs` builds `mutations-3.json`.
  - `accept-3.sh` is `accept-2.sh` with its log prefix changed to `acc3-`.
  - The logs are `r3-*.log.txt`, `acc3-*.log.txt`, `mutations-3.log.txt`, and `obs3-test-src.log.txt`.

## Proofs

| Proof (file, title) | At `03526bc` | Green |
| --- | --- | --- |
| Lifetime: "rethrows a joined child's release error from the owner's destruction after every other holding is given back" | Red: `expected [Function] to throw an error` | Pass |
| Lifetime: "rethrows a joined child's release error from the child's own destruction and ends the owner's holding" | Red: `expected [Function] to throw an error` | Pass |
| Lifetime: "leaves the owner no holding of a child whose lifetime ended before it joined" | Red: `expected true to be false` | Pass |
| Lifetime: "reaches the child from an owner destruction nested in the child's drain, before the child's last holding" | Passes, because the listener also reached the child. The `ending-at-abort` and `join-ledger-3` mutations bind it. | Pass |
| Button: "returns from an owner's destroy a reaction to the button's restoration calls only after the host is restored" | Passes. The `ending-newest` and `ending-at-abort` mutations bind it. | Pass |

The green runs are `r3-green-lifetime` (`27 passed (27)`) and `r3-green-button` (`55 passed (55)`), with no unhandled errors in either. Every round-2 case passes: both orderings, repeated cycles, Button's construction cases, and the error cases.

## Round-2 assertions whose order changed

Both changes come from the same cause: the listener's nested `destroy` no longer runs.

- **"ends the owner's holding of a resource destroyed on its own…"**
  - Before: `[['destroy'], ['destroy'], ['released']]`.
  - After: `[['destroy'], ['released']]`.
  - I also wrapped `resource.destroy()` in `expect(() => resource.destroy()).not.toThrow()`, so the recursive mutation reddens this case by an assertion.
- **"destroys a joined resource from the owner drain…"**
  - Before: `[['newest'], ['destroy'], ['destroy'], ['released'], ['oldest']]` with a count of `5`.
  - After: `[['newest'], ['destroy'], ['released'], ['oldest']]` with a count of `4`.

## Mutation table (round-3 rows)

| Row | Change | Red reading |
| --- | --- | --- |
| `ending-newest` (held newest) | `Button` joins after holding its snapshot | Button 1 failed, `AssertionError`: the restoration-reaction case, `expected [ [ false, 'true' ] ] to deeply equal [ [ false, null ] ]` |
| `ending-at-abort` (runs before every holding, as a newest holding would) | The ending is fired from the class lifetime's abort | Lifetime 2 failed, `AssertionError`: the nested-owner-drain case (steps missing the second `'child released'`) and the ended-lifetime case (`expected true to be false`). Button 1 failed, `AssertionError`: the same restoration-reaction reading. |
| `ending-releases` (the ending runs the release) | `#end` becomes `this.release(record)` | Proof, Lifetime "ends the owner's holding of a resource destroyed on its own…": `AssertionError`, `expected [Function] to not throw an error but 'RangeError…'`. Other cases fail by `RangeError` from the mutation's unbounded recursion: Lifetime `AssertionError=1 RangeError=5`, Button `RangeError=4 AssertionError=2`. |
| `ending-releases-once` (the ending runs the release, without recursion) | The ending ends the holding, then runs its release once | Lifetime 2 failed, `AssertionError`: "ends the owner's holding…" (`[['destroy'],['released'],…(1)]`) and "destroys a joined resource from the owner drain…" (steps with the extra `destroy`) |
| `join-ending-omitted` (the ending omitted; succeeds `join-no-child-release`) | The ending line is removed | Lifetime 5 failed, `AssertionError`, each `expected true to be false` or `[true,true,true]`. Button 3 failed, `AssertionError`: the hook-destroy, hook-throw, and repeated-cycle cases. |
| `ended-enrolled` (an ended class lifetime still enrolled) | The ending is held only while the lifetime is live | Lifetime 1 failed, `AssertionError`: the ended-lifetime case, `expected true to be false` |
| `base-03526bc` | `Lifetime.ts` at `03526bc` under the round-3 tests | Lifetime 5 failed, `AssertionError=5` (the three red-first cases plus the two order assertions). Button: 0 failed. |

## Full `mutate-3.mjs` table re-run

This table carries every `mutations-2.json` row, with the successor rows in place.

| Row | Lifetime | Button | Other |
| --- | --- | --- | --- |
| `base-d702bb8` | 6/27 A=6 | 3/55 A=3 | |
| `hold-held-after-destroy` | 1/27 A=1 | 0/55 | |
| `join-ending-omitted` (successor) | 5/27 A=5 | 3/55 A=3 | |
| `button-join-after-hooks` | | 2/55 A=2 | |
| `drain-nested` | 5/27 A=5 | 2/55 A=2 | |
| `same-entry` | 1/27 A=1 | | |
| `newest-first` | 7/27 A=7 | | |
| `hold-after-destroy` | 5/27 A=5 | 1/55 A=1 | |
| `drain-past-throw` | 3/27 A=3 | | |
| `first-error` | 1/27 A=1 | | |
| `join-ledger-3` (successor) | 4/27 A=4 | | |
| `join-unlisten` | 1/27 A=1 | | |
| `write-no-record` | | | HostSnapshot 1/55 A=1 |
| `write-join` | | 1/55 A=1 | HostSnapshot 3/55 A=3 |
| `write-change` | | | HostSnapshot 9/55 A=9 |
| `priority` | | | helpers 4/105 A=4; HostSnapshot 1/55 A=1 |
| `claim-before-drain` | | 3/55 A=3 | |
| `button-latch` | | 2/55 A=2 | |
| `button-construction-save` | | 1/55 A=1 | |
| `button-snapshot-held` | | 39/55 A=39 | |
| `base-03526bc` | 5/27 A=5 | 0/55 | |
| `ending-newest` | | 1/55 A=1 | |
| `ending-at-abort` | 2/27 A=2 | 1/55 A=1 | |
| `ending-releases` | 6/27 A=1 R=5 | 6/55 A=2 R=4 | |
| `ending-releases-once` | 2/27 A=2 | 0/55 | |
| `ended-enrolled` | 1/27 A=1 | | |

`A` is `AssertionError` and `R` is `RangeError`. No row was skipped, and none had a collection error. The per-case detail is in `tmp/j-release-core/mutations-3.log.txt`.

## Acceptance output (`bash tmp/j-release-core/accept-3.sh`), verbatim

```
check: exit 0; 
lint: exit 0; 
format: exit 0; Finished in 23489ms on 489 files using 16 threads. 
policy: exit 0;  Test Files  1 passed (1)       Tests  109 passed | 1 skipped (110) 
guides: exit 0;  Test Files  1 passed (1)       Tests  26 passed (26) 
setup-browser: exit 0;  Test Files  1 passed (1)       Tests  93 passed (93) 
Lifetime: exit 0;  Test Files  1 passed (1)       Tests  27 passed (27) 
HostSnapshot: exit 0;     at throwUnhandlerError (http://localhost:63315/@fs/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)  Test Files  1 passed (1)       Tests  55 passed (55) 
helpers: exit 0;  Test Files  1 passed (1)       Tests  105 passed (105) 
Button: exit 0;  Test Files  1 passed (1)       Tests  55 passed (55) 
index: exit 0;  Test Files  1 passed (1)       Tests  3 passed (3) 
```

The HostSnapshot line is the `DOMTokenList` empty-token trace. It appears identically in round 2's `acc2-HostSnapshot.log.txt`, and the file passes.

## Observation: `npm run test:src`

- The run exits 1 with `Test Files 1 failed | 114 passed (115)` and `Tests 1 failed | 1509 passed (1510)`; a separate project block reports `Tests 1100 passed (1100)`.
- The one failure is `tests/src/styles/elements/button.test.ts:198`, the `.btn` rest, hover, press, and focus parity case. That is the styles session's button-reboot standing condition, not this unit's.

## `git status --short`

```
 M guides/veneer.md
 M src/browser/Lifetime.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/Lifetime.test.ts
```

## Deviation state

None. The prescription meets E35's invariant in every ordering the proofs reach. I settled these choices myself:

- **Private method's name:** `#end`.
- **The ending's record:** a fresh `{ owner, resource }` object, not `owner`. A lifetime that joins several resources to one owner then keeps a separate ending for each.
- **The extra mutation row:** I added `ending-releases-once`, so the "runs the release" defect is also proven by assertions without a stack overflow.

**Observation for the audit:** the ending runs last only if the class's lifetime holds nothing before `join`. `Button` meets this. A caller who passes a `Lifetime` that already holds something gets an ending that is not the oldest. The remarks and the guide now state this as a precondition: "before its own lifetime holds anything". No code enforces it, because `lifetime` is typed as a `LifetimeInterface`.
