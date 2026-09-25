# J-CONCERNS-A round 3 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-concerns-a-brief-3.md`.

---

# J-CONCERNS-A round 3 report

R1, R2, and R3 are all done. ScrollSpy's scroll now honours reduced motion, the keyboard-focus case leaves no session-history entry, and Button has a nested-toggle case. Every added case read red against its mutation, and both sources are back at their round-3 digests. All four acceptance checks exit 0.

## Files touched

In the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-a`, on top of `bcea965`:
- **`src/browser/ScrollSpy.ts`:** the `#scrollTo` method gates its scroll on the `matchesReducedMotion` function, and the class remarks say so.
- **`tests/src/browser/ScrollSpy.test.ts`:** the reduced-motion case is flipped, and the keyboard-focus case drops its navigation control.
- **`tests/src/browser/Button.test.ts`:** one case added, for a listener that toggles again.
- **`tmp/j-concerns-a/`** (ignored by git):
  - the successor instrument `mutate-3.cjs` and its runner `mutations-3.sh`;
  - under `round3/`: the pristine sources, the base copies, the logs, the patches, and `j-concerns-a-3.diff`.

The round-1 instrument (`mutate.cjs` and `mutations.sh`) is unchanged.

Diffstat:
```
 src/browser/ScrollSpy.ts            | 15 ++++++++++-----
 tests/src/browser/Button.test.ts    | 29 +++++++++++++++++++++++++++++
 tests/src/browser/ScrollSpy.test.ts | 29 +++++++++++------------------
 3 files changed, 50 insertions(+), 23 deletions(-)
```

## R1: ScrollSpy honours reduced motion

The change in the `#scrollTo` method reads the preference through the existing helper, and nowhere else:
```ts
		event.preventDefault()
		const behavior = matchesReducedMotion(this.#host) ? 'instant' : 'smooth'
		// the host branch and the view branch then pass `behavior`
```

The flipped case is `scrolls the host to the section instantly under staged reduced motion, passing no intermediate position`. It asserts `expect(positions.calls).toEqual([[section.offsetTop]])`: exactly one scroll event, landing at the section.

**Red reading on `bcea965`'s `ScrollSpy.ts`**, from `tmp/j-concerns-a/round3/r1-red.log.txt`:
```
 FAIL  |src:browser (chromium)| tests/src/browser/ScrollSpy.test.ts:587:2 > ScrollSpy > scrolls the host to the section instantly under staged reduced motion, passing no intermediate position
AssertionError: expected [ [ 3 ], [ 14 ], [ 50 ], …(10) ] to deeply equal [ [ 200 ] ]
      Tests  1 failed | 31 passed (32)
```

**Green reading at the tip:**
```
 ✓ |src:browser (chromium)| tests/src/browser/ScrollSpy.test.ts:587:2 > ScrollSpy > scrolls the host to the section instantly under staged reduced motion, passing no intermediate position 201ms
```

The existing smooth cases stay green with no preference staged.

The fix changes behaviour, so I also ran `tests/src/browser/Delegate.test.ts` read-only: `Tests  140 passed (140)`. Nothing turned red.

**Mutation rows.** I retired `scrollspy-reduced`, because it is now the fix. The new row `scrollspy-ungated` replaces the gate with `const behavior = 'smooth'`:
```
=== scrollspy-ungated against tests/src/browser/ScrollSpy.test.ts
 FAIL  |src:browser (chromium)| tests/src/browser/ScrollSpy.test.ts:587:2 > ScrollSpy > scrolls the host to the section instantly under staged reduced motion, passing no intermediate position
AssertionError: expected [ [ 3 ], [ 14 ], [ 50 ], …(10) ] to deeply equal [ [ 200 ] ]
      Tests  1 failed | 31 passed (32)
```

The two instant rows now target the gated `behavior` constant, and each still reads red:
- `scrollspy-instant-host` reds the host smooth case with `expected false to be true`.
- `scrollspy-instant-view` reds the document smooth case with `expected false to be true`.

## R2: I dropped the native-navigation control

The case is renamed `keeps focus on the link a keyboard activation of the smooth scroll pressed, running no fragment navigation`. Its changes:
- The `Outside` link and its section are removed.
- The `history.replaceState` and `window.scrollTo` cleanups are removed.
- It now reads the history length and the hash before the key press, and asserts both unchanged after it.

A passing run therefore navigates nothing and adds no history entry. It still reads red under both focus mutations:
```
=== scrollspy-focus-section
 FAIL  … > keeps focus on the link a keyboard activation of the smooth scroll pressed, running no fragment navigation
AssertionError: expected <section id="spy-four" …(2)></section> to be <a class="nav-link active" …(1)></a> // Object.is equality
      Tests  1 failed | 31 passed (32)
=== scrollspy-navigate
 FAIL  … > keeps focus on the link a keyboard activation of the smooth scroll pressed, running no fragment navigation
AssertionError: expected '#spy-four' to be '' // Object.is equality
      Tests  4 failed | 28 passed (32)
```

The other rows are still killed:
- `scrollspy-cancel`: `2 failed`.
- `scrollspy-focus-link`: `1 failed`.
- `button-motion`, `button-focus`, and `button-blur`: `1 failed | 46 passed (47)` each.

The full readings are in `tmp/j-concerns-a/round3/mutations.log.txt`. Every block there ends with both sources restored: `ScrollSpy.ts` to `367a1d0c…6502` and `Button.ts` to `993c63d0…2e4`.

## R3: the nested-toggle case

```ts
	it('returns the state the host carries when a listener toggles again, delivering each event in the order its call dispatched it', () => {
		const host = build('button')
		const events = createRecorder<readonly [boolean, boolean, string | null]>()
		const inner = createRecorder<readonly [boolean]>()
		const button: ButtonInterface = new Button(host, {
			on: {
				toggle: (event) => {
					events.handler(
						event.detail.pressed,
						host.classList.contains('active'),
						host.getAttribute('aria-pressed'),
					)
					// Only the first event's listener toggles again, so the nested call's event ends the chain.
					if (events.count === 1) inner.handler(button.toggle())
				},
			},
		})
		onTestFinished(() => button.destroy())
		expect(button.toggle()).toBe(false)
		expect(inner.calls).toEqual([[false]])
		expect(events.calls).toEqual([
			[true, true, 'true'],
			[false, false, 'false'],
		])
		expect(button.pressed).toBe(false)
		expect(host.classList.contains('active')).toBe(false)
		expect(host.getAttribute('aria-pressed')).toBe('false')
	})
```

**Mutation `button-stale-return`:** the toggle reads `pressed` before its dispatch, then dispatches and returns that stale value. Red reading:
```
 FAIL  |src:browser (chromium)| tests/src/browser/Button.test.ts:676:2 > Button > returns the state the host carries when a listener toggles again, delivering each event in the order its call dispatched it
AssertionError: expected true to be false // Object.is equality
 FAIL  |src:browser (chromium)| tests/src/browser/Button.test.ts:705:2 > Button > preserves destruction performed by a listener during a toggle and returns the state the host carries
AssertionError: expected true to be false // Object.is equality
      Tests  2 failed | 45 passed (47)
```

## Report-only patches

Both patches are against the tip, under `tmp/j-concerns-a/round3/`:
- **`j-concerns-a-guide-3.patch`:** adds the reduced-motion sentence to the smooth-scroll paragraph in § ScrollSpy of `guides/veneer.md`, and re-wraps the paragraph. Following E34, I added no departure row.
- **`j-concerns-a-types-3.patch`:** the `ScrollSpyOptions.smooth` TSDoc in `src/browser/types.ts` now reads "…scrolls smoothly to its section, or instantly while the view prefers reduced motion, mirroring…". No guide row carries this TSDoc.

`git apply --check` output:
```
Checking patch guides/veneer.md...
git apply --check tmp/j-concerns-a/round3/j-concerns-a-guide-3.patch exit=0
Checking patch src/browser/types.ts...
git apply --check tmp/j-concerns-a/round3/j-concerns-a-types-3.patch exit=0
```

The patched guide copy passes `oxfmt --check`.

## Acceptance output

```
check exit=0
lint:check exit=0        (oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics)
format:check exit=0      (All matched files use the correct format. Finished in 12231ms on 476 files using 16 threads.)
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/ScrollSpy.test.ts tests/src/browser/Button.test.ts
vitest exit=0
 Test Files  2 passed (2)
      Tests  79 passed (79)
```

The class doc block changed, so I also ran `npm run test:guides`, read-only: exit 0, `Test Files 1 passed (1)`.

## `git status --short`

```
 M src/browser/ScrollSpy.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/ScrollSpy.test.ts
```

## Deviation state

None. The objective verdict also named two ScrollSpy issues outside its claims, which this brief does not assign, so I left both alone:
- selection compares section offsets taken in different coordinate systems;
- a smooth scroll still pending at `destroy()` has no proof.

Neither has a carrier yet.
