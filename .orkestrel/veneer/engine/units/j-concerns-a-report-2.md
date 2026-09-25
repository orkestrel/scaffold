# J-CONCERNS-A round 2 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-concerns-a-brief-2.md`.

---

# J-CONCERNS-A round 2 report

The Button motion case no longer pins any cascade value. It stays red under the `button-motion` mutation, the focus cases stay red under their mutations, and every gate exits 0. No other round-1 assertion pins a cascade value. The only file changed is `tests/src/browser/Button.test.ts`, with 17 insertions and 9 deletions. `src/**` is unchanged: the `Button.ts` digest is still `993c63d0…2e4`.

## C1: the rewritten case

The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-a`, at base `bd5c882`. The case sits in `tests/src/browser/Button.test.ts`:

```ts
	// Bootstrap's toggle writes the token and the attribute and returns, waiting on no transition the
	// cascade starts, and the same holds here.
	it('completes a toggle and dispatches its event while the shipped cascade still transitions the host', () => {
		scene.load(tokensCascade)
		scene.load(buttonCascade)
		const root = scene.mount('<button type="button" class="btn">Bold</button>')
		const host = requireValue(root.querySelector('button'), 'No host')
		// Reading the animations computes the host's resting style, so the token write transitions
		// from it, and the host runs no motion before the toggle.
		expect(host.getAnimations()).toEqual([])
		const events = createRecorder<readonly [boolean, boolean, string | null, readonly number[]]>()
		const button: ButtonInterface = new Button(host, {
			on: {
				toggle: (event) =>
					events.handler(
						event.detail.pressed,
						button.pressed,
						host.getAttribute('aria-pressed'),
						host
							.getAnimations()
							.filter((animation) => animation.playState === 'running')
							.map((animation) => {
								const duration = animation.effect?.getComputedTiming().duration
								return typeof duration === 'number' ? duration : 0
							}),
					),
			},
		})
		onTestFinished(() => button.destroy())
		expect(button.toggle()).toBe(true)
		expect(
			events.calls.map(([detail, pressed, attribute]) => [detail, pressed, attribute]),
		).toEqual([[true, true, 'true']])
		const durations = events.calls[0]?.[3] ?? []
		expect(durations).not.toEqual([])
		expect(durations.every((duration) => duration > 0)).toBe(true)
	})
```

The two cascade pins are gone:
- **Resting background.** The `backgroundColor` assertion is replaced by `host.getAnimations()` returning an empty list. That read still computes the resting style before the token write, and it also shows that the host runs no motion before the toggle.
- **Property list.** The `arrayContaining(['background-color'])` assertion is replaced by a read of the durations. At the toggle event the host must run at least one animation, and each running one must have a duration above zero. No property, duration, or easing value is named.

The completed toggle is read at the event itself: `detail.pressed`, `button.pressed`, and `aria-pressed` must be `true`, `true`, and `'true'`.

## C2: mutation readings

I ran `LOG=tmp/j-concerns-a/mutations-round2.log.txt bash tmp/j-concerns-a/mutations.sh button-motion button-focus button-blur`. The log is at `tmp/j-concerns-a/mutations-round2.log.txt`, with colour codes stripped. Readings, verbatim:

```
=== button-motion against tests/src/browser/Button.test.ts
applied button-motion to button
 FAIL  |src:browser (chromium)| tests/src/browser/Button.test.ts:501:2 > Button > completes a toggle and dispatches its event while the shipped cascade still transitions the host
AssertionError: expected [] to deeply equal [ [ true, true, 'true' ] ]
      Tests  1 failed | 45 passed (46)
exit=1
restored button 993c63d05d9f523894251be82afc8033d2a6252b463dc912520df6be4b2b52e4
=== button-focus against tests/src/browser/Button.test.ts
applied button-focus to button
 FAIL  |src:browser (chromium)| tests/src/browser/Button.test.ts:480:2 > Button > leaves focus where it is at each toggle, on its host or on another control
AssertionError: expected <button type="button" …(2)></button> to be <button type="button"></button> // Object.is equality
      Tests  1 failed | 45 passed (46)
exit=1
restored button 993c63d05d9f523894251be82afc8033d2a6252b463dc912520df6be4b2b52e4
=== button-blur against tests/src/browser/Button.test.ts
applied button-blur to button
 FAIL  |src:browser (chromium)| tests/src/browser/Button.test.ts:480:2 > Button > leaves focus where it is at each toggle, on its host or on another control
AssertionError: expected <body><div>…(2)</div></body> to be <button type="button" …(2)></button> // Object.is equality
      Tests  1 failed | 45 passed (46)
exit=1
restored button 993c63d05d9f523894251be82afc8033d2a6252b463dc912520df6be4b2b52e4
```

Every run also restored `scrollspy` to `8d39eba2…9545`.

## C3: other round-1 assertions against E32

None of my other round-1 assertions pins a cascade value:
- The ScrollSpy cancellation, focus, keyboard-focus, and reduced-motion cases load no cascade.
- The reduced-motion case and the strengthened viewport case read scroll positions, which the browser produces. They pin no duration, easing, or property.
- The reduced-motion case asserts `matchMedia('(prefers-reduced-motion: reduce)').matches`, which checks that the staging reached the page. It is not a cascade value.
- The Button focus case loads no cascade.

The only cascade value in the ScrollSpy file is the existing case `writes the token the shipped nav cascade paints as the active pill`, which asserts a colour. It predates round 1, and E32 does not cover it because it pins a colour, not a motion value.

## Acceptance output

```
check exit=0
lint:check exit=0          (oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics)
format:check exit=0        (All matched files use the correct format. Finished in 15509ms on 476 files using 16 threads.)
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/ScrollSpy.test.ts tests/src/browser/Button.test.ts
vitest exit=0
 Test Files  2 passed (2)
      Tests  78 passed (78)
```

## `git status --short`

```
 M tests/src/browser/Button.test.ts
```

## Deviation state

None. One point for you to rule on: E32 says that at each completion event a motion proof "reads no running animation on any element the engine moved". Button's toggle event fires while the cascade's feedback transition runs, which matches Bootstrap, and C1 tells this case to prove exactly that. I followed C1. If Button falls under that E32 bullet, the two conflict and the ruling is yours.
