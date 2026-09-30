# E-ID-MOTION-COLLAPSE round 2 — report

Retained by the Orchestrator from `/home/user/veneer-mcol/tmp/units/mcol-report-2.md`. Every `tmp/units/` log, script, diff,
and status file it names is retained in `mcol-instruments-2/` beside this report (the edit scripts and backups are not);
other paths are relative to `/home/user/veneer-mcol/`, and the round is committed there as `6c6a0ce` on `unit/mcol`.

**State: done, with no deviation.** This round carries the audit's claims 3, 6, and 7, findings F1 to F3, and
referral R1 (`mcol-audit-verdict.md`). Every acceptance gate exits 0.
- **Reader:** `sampleTransition` takes a pseudo-element.
- **Chevron:** the case reads the running `::after` turn in each direction: its timing, and its start, midpoint, and
  settled frames. A frozen turn fails it.
- **Wording:** every sentence and comment the audit named now states what the code and the case do.
- **Plants:** each one fails a case with an `AssertionError`, and each file was restored byte for byte.

**A change the brief did not name.** The target filter the brief prescribes is only proved when a fixture puts a
descendant's matching pseudo-element transition in the subtree list. So the new `setup:browser` case carries such a
fixture, and a `reader-target` plant proves that the case kills a reader without that filter. I added that plant to
the brief's list.

## Red, then green

**Chevron case red on the round-1 reader.** `tests/setupBrowser.ts` was set back to its `9e1fe4e` bytes, then
restored afterwards.
- **Command:** `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/accordion.test.ts`
- **Result:** 1 failed, 32 passed, exit 1, at load `5.13 7.68 5.89` (`tmp/units/mcol-red-2-chevron.log.txt`).
- **Failure:** `turns the chevron between no transform and the half turn …` failed with an `AssertionError`. The
  round-1 reader finds no `::after` transition, so nothing finishes, and the settled frames read
  `[ 'matrix(-1, 0, 0, -1, 0, 0)', … ]` where `['none', 'matrix(-1, 0, 0, -1, 0, 0)']` is expected.
- **Rules:** the partials' rules equal `9e1fe4e`'s. Only their comments differ.

**Reader cases red on the round-1 reader.**
- **Command:** `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts -t sampleTransition`
- **Result:** 2 failed, 2 passed, 97 skipped, exit 1, at load `4.93 5.75 5.71` (`tmp/units/mcol-red-2-reader.log.txt`).
- **Pseudo-element case:** `reads the named pseudo-element's running transition …` failed with
  `AssertionError: expected undefined to be defined`.
- **No-effect case:** `reads no transition for a named transition that carries no effect` failed with the round-1
  reader's own `Error: The opacity transition carries no effect`. This case pins the reader's changed contract, so its
  red at the base is the old throw, which is a plain `Error`.

**Green after the change.**
- **Owned style proofs:** `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/collapse.test.ts tests/src/styles/components/accordion.test.ts tests/src/styles/components/fade.test.ts`
  gave 51 passed, exit 0, at load `4.55 5.72 5.70` (`tmp/units/mcol-green-2.log.txt`).
- **Setup cases:** `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts`
  gave 101 passed, exit 0, at load `4.85 5.86 5.74` (`tmp/units/mcol-setup-browser-2.log.txt`).

## Case coverage

The following table states what each case this unit owns drives and reads.

| Case | Drives | Reads |
| --- | --- | --- |
| `tests/setupBrowser.test.ts` › `reads the named pseudo-element's running transition on the named element and nothing else, and reads none there when no pseudo-element is named` (new) | A host whose `::after` box widens, with no transition of its own; a second host that widens itself, whose `::after` box holds still, and whose child's `::after` box widens; each with other timing | The first host: none without a pseudo-element, none for `::before`, and for `::after` 400 ms `ease-in` from `10px` to a midpoint between `10px` and `30px`, paused there, with the host's own list empty. The second host: its own 200 ms `linear` transition, and none for `::after`, which kills a reader that returns the child's. The child's `::after`: 300 ms, showing a transition runs there |
| `tests/setupBrowser.test.ts` › `reads no transition for a named transition that carries no effect` (was `refuses a named transition that carries no effect`) | The fixture's opacity transition, with its `effect` shadowed to `null` | `undefined` for opacity, and the width transition beside it still read at 400 ms |
| `accordion.test.ts` › `turns the chevron between no transform and the half turn over the feedback duration on the standard curve in each direction, twice as long at a doubled motion factor, and at once at a zero factor or under the reduced-motion preference` (rewritten) | Through `sweepMotionFactor` under the ordinary and the reduced-motion preference: an expanded button takes `collapsed`, and a collapsed button loses it | At the resting factor, for each button, through `sampleTransition(button, 'transform', '::after')`: the presence of the sample; a midpoint frame apart from both ends; a duration and easing equal to a specimen's resolved `--vn-motion-feedback` and `--vn-ease-standard`; a start frame equal to the frame left. After `finish`, the settled frame: `none` on the collapsed button and `matrix(-1, 0, 0, -1, 0, 0)` on the expanded one. At the doubled factor: a ratio of 2 and the same easing, with the same settled frames. At the zero factor, and at every factor under reduced motion: no sample, and the end frames at once. The `::after` slots are `transform`, `0s`, and the standard curve at zero, and `none`, `0s`, `ease` under reduced motion |
| `accordion.test.ts` › `transitions the button paint and the chevron turn and collapses both under the reduced-motion preference` (round 1, unchanged) | The shared markup, before and after the staged preference | The resolved slots of the button and the chevron, with the chevron at `transform`, `0.15s`, `ease` |
| `collapse.test.ts` › `opens and closes a vertical panel …` and › `declares the recorded closing box …` (round 1, unchanged) | The engine's class and size writes on each axis; the declared rules | As in round 1 |
| `fade.test.ts` › `gives an element carrying the fade and collapsing classes the transition of the collapsing rule rather than that of the fade rule` | The compound element, a plain `.collapsing` element, and a plain `.fade` element | `closing` differs from `fading`; `fading` is `['opacity', '0.15s', 'ease-out']`; `compound` equals `closing`. It no longer pins the collapsing rule's property |

## Plants

`tmp/units/mcol-plants-2.mjs` ran every plant. Each plant is logged to `tmp/units/mcol-plant-<name>.log.txt` with its
SHA-256 digests before and after. Each style plant ran the owned style proofs, and each reader plant ran the
`setup:browser` file.

| Plant | Written | Failing case, from its log | Restored |
| --- | --- | --- | --- |
| `collapse-literal` | `@include transition(height 0.35s ease);` on `.collapsing` | 2 failed, 49 passed. The declaration case, and the motion case (`[ 350, 'ease', '0px' ]` against `[ 250, … ]`), each with an `AssertionError` | identical, `eca7013f…` |
| `chevron-literal` | `--bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;` | 2 failed, 49 passed. The slot case, and the chevron case (`[ 200, 'ease-in-out', … ]` against `[ 150, 'ease', … ]`), each with an `AssertionError` | identical, `9adb4204…` |
| `collapse-opacity` | `.collapsing` given `(height var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-panel))` | 2 failed, 49 passed. The declaration case, and the motion case (the declared list is not `['height', 'height']`), each with an `AssertionError`. The fade case passes, because it no longer pins the collapsing rule's property (F3) | identical, `eca7013f…` |
| `fade-order` | A later `@layer components { .fade { transition: … } }` sheet after the fade case's elements | 1 failed, 50 passed. The fade case (`[ 'opacity', '0.15s', 'ease-out' ]` against `[ 'height', '0.25s', … ]`), with an `AssertionError` | identical, `ccde6ca4…` |
| `chevron-frozen` | `--bs-accordion-btn-icon-transition: transform var(--vn-motion-feedback) steps(1, end);` | 2 failed, 49 passed. The chevron case on its midpoint reading (`expected [ 'matrix(-1, 0, 0, -1, 0, 0)', … ] to not include 'matrix(-1, 0, 0, -1, 0, 0)'`), and the slot case on the easing, each with an `AssertionError` | identical, `9adb4204…` |
| `reader-pseudo` | The `animation.effect.pseudoElement === (pseudo ?? null)` term removed from `sampleTransition` | 1 failed, 100 passed. The new pseudo-element case, on the `::before` reading, which received the `::after` transition (400 ms `ease-in`), with an `AssertionError` | identical, `2d7ca1f2…` |
| `reader-target` | The `animation.effect.target === element` term removed from `sampleTransition` | 1 failed, 100 passed. The new pseudo-element case, on the second host's `::after` reading, which received the child's transition (300 ms `ease-out`), with an `AssertionError` | identical, `2d7ca1f2…` |

- **Current files:** each digest equals the current file's digest.
- **Superseded runs:** a first `reader-target` run passed, because the fixture then gave the second host its own
  `::after` transition, which comes before the child's in the subtree list. The fixture now holds that box still, and
  the reader plants were run again on the final fixture. The run summary is in `tmp/units/mcol-plants-2-run.log.txt`.

## Shared-file hunks

These hunks are also written to `tmp/units/mcol-2-shared.diff` (`git diff 9e1fe4e -- tests/setupBrowser.ts tests/setupBrowser.test.ts`).
Send them to the engine session before the landing. No line outside `sampleTransition`, its doc block, and the
`describe('sampleTransition')` cases changed.

`tests/setupBrowser.ts`:
```diff
@@ -2139,16 +2139,20 @@ export interface TransitionSample {
 }
 
 /**
- * Samples the transition the browser runs on one property of one element.
+ * Samples the transition the browser runs on one property of one element or of one of its
+ * pseudo-elements.
  *
- * @param element - The element whose own animations to read, after the style change that starts
- *   the transition.
+ * @param element - The element whose animations to read, after the style change that starts the
+ *   transition.
  * @param property - The transitioned property, as the `transitionProperty` member of a
  *   `CSSTransition` names it, such as `opacity`.
+ * @param pseudo - The pseudo-element of `element` whose transition to read, written with two
+ *   colons as the `pseudoElement` member of a `KeyframeEffect` reports it, such as `::after`.
+ *   Default: the element itself, and no pseudo-element's transition.
  * @returns The running transition with its duration, its easing, and the computed value at its
- *   start and at its midpoint, or `undefined` when no transition on that property runs.
- * @throws Thrown when the transition carries no effect, or reports no numeric duration or no
- *   easing.
+ *   start and at its midpoint, or `undefined` when no transition on that property of that target
+ *   runs.
+ * @throws Thrown when the transition reports no numeric duration or no easing.
  *
  * @remarks
  * The reading comes from the Web Animations model the browser runs, not from the declared or
@@ -2158,6 +2162,11 @@ export interface TransitionSample {
  * or a style change the browser did not animate reads as `undefined` rather than as a declared
  * value nothing runs.
  *
+ * An element's own list leaves out its pseudo-elements' animations, so a named pseudo-element is
+ * read from the element's subtree list, keeping the transition whose keyframe effect targets
+ * `element` with that pseudo-element, and its values are read from that pseudo-element's computed
+ * style. A transition carrying no keyframe effect targets neither, so it reads as `undefined`.
+ *
  * The midpoint is the delay plus half the duration, so a delayed transition is read halfway
  * through its active phase. The transition stays paused at that midpoint, so a caller's further
  * readings see the same frame. Call the `finish` or `cancel` method on the returned transition to
@@ -2173,27 +2182,32 @@ export interface TransitionSample {
  * sampleTransition(element, 'opacity')?.easing // 'ease-out'
  * ```
  */
-export function sampleTransition(element: Element, property: string): TransitionSample | undefined {
+export function sampleTransition(
+	element: Element,
+	property: string,
+	pseudo?: string,
+): TransitionSample | undefined {
 	const transition = element
-		.getAnimations()
+		.getAnimations({ subtree: pseudo !== undefined })
 		.find(
-			(animation): animation is CSSTransition =>
-				animation instanceof CSSTransition && animation.transitionProperty === property,
+			(animation): animation is CSSTransition & { readonly effect: KeyframeEffect } =>
+				animation instanceof CSSTransition &&
+				animation.transitionProperty === property &&
+				animation.effect instanceof KeyframeEffect &&
+				animation.effect.target === element &&
+				animation.effect.pseudoElement === (pseudo ?? null),
 		)
 	if (transition === undefined) return undefined
-	const timing = requireValue(
-		transition.effect,
-		`The ${property} transition carries no effect`,
-	).getTiming()
+	const timing = transition.effect.getTiming()
 	const duration = timing.duration
 	if (typeof duration !== 'number')
 		throw new Error(`The ${property} transition reports no numeric duration`)
 	const easing = requireValue(timing.easing, `The ${property} transition reports no easing`)
 	transition.pause()
 	transition.currentTime = 0
-	const start = readStyle(element, property)
+	const start = readStyle(element, property, pseudo)
 	transition.currentTime = (timing.delay ?? 0) + duration / 2
-	const midpoint = readStyle(element, property)
+	const midpoint = readStyle(element, property, pseudo)
 	return { transition, duration, easing, start, midpoint }
 }
```

`tests/setupBrowser.test.ts`:
```diff
@@ -2148,7 +2148,59 @@ describe('sampleTransition', () => {
 		expect([readStyle(element, 'opacity'), readStyle(element, 'width')]).toEqual(['0', '50px'])
 	})
 
-	it('refuses a named transition that carries no effect', () => {
+	// The pseudo-element fixture runs one width transition on a host's `::after` box and nothing on
+	// the host. A second host beside it runs a width transition of its own and none on its `::after`
+	// box, and its child runs one on the child's own `::after` box, each with other timing. A reader
+	// that ignored the pseudo-element would read no transition with it named on the first host, and
+	// one on the first host with `::before` named; one that ignored which element an effect targets
+	// would read the child's `::after` transition with `::after` named on the second host.
+	it("reads the named pseudo-element's running transition on the named element and nothing else, and reads none there when no pseudo-element is named", () => {
+		scene.load(
+			'.vn-probe-pseudo::after, .vn-probe-pseudo > p::after { content: ""; display: block; width: 10px; transition: width 400ms ease-in; } .vn-probe-pseudo > p::after { transition: width 300ms ease-out; } .vn-probe-pseudo.moved:not(.owned)::after, .vn-probe-pseudo.moved > p::after { width: 50px; } .vn-probe-pseudo.owned { width: 100px; transition: width 200ms linear; } .vn-probe-pseudo.owned.moved { width: 60px; }',
+		)
+		const host = scene.mount(
+			'<div class="vn-probe-pseudo">Buoy</div><div class="vn-probe-pseudo owned"><p>Mooring</p></div>',
+		)
+		const [lone, owned] = [...host.children]
+		const bare = requireValue(lone, 'No pseudo-element host')
+		const busy = requireValue(owned, 'No host with its own transition')
+		const child = requireValue(busy.firstElementChild, 'No child')
+		expect([
+			readStyle(bare, 'width', '::after'),
+			readStyle(busy, 'width', '::after'),
+			readStyle(busy, 'width'),
+			readStyle(child, 'width', '::after'),
+		]).toEqual(['10px', '10px', '100px', '10px'])
+		bare.classList.add('moved')
+		busy.classList.add('moved')
+		expect(sampleTransition(bare, 'width')).toBeUndefined()
+		expect(sampleTransition(bare, 'width', '::before')).toBeUndefined()
+		const marker = sampleTransition(bare, 'width', '::after')
+		expect(marker).toBeDefined()
+		const turning = requireValue(marker, 'No pseudo-element transition')
+		expect([turning.duration, turning.easing, turning.start]).toEqual([400, 'ease-in', '10px'])
+		// The ease-in curve trails the linear one at its midpoint, so the box sits strictly between its
+		// endpoints and short of the linear halfway value of 30px.
+		const width = Number.parseFloat(turning.midpoint)
+		expect(width).toBeGreaterThan(10)
+		expect(width).toBeLessThan(30)
+		expect([turning.transition.playState, readStyle(bare, 'width', '::after')]).toEqual([
+			'paused',
+			turning.midpoint,
+		])
+		expect(bare.getAnimations()).toEqual([])
+		const own = sampleTransition(busy, 'width')
+		expect(own).toBeDefined()
+		expect([own?.duration, own?.easing, own?.start]).toEqual([200, 'linear', '100px'])
+		expect(sampleTransition(busy, 'width', '::after')).toBeUndefined()
+		// The child's own `::after` transition runs, so the second host's reading had one to pass over.
+		expect(sampleTransition(child, 'width', '::after')?.duration).toBe(300)
+	})
+
+	// The mutation this catches is a reader that dereferences the effect before checking it: a
+	// transition carrying no keyframe effect targets no element, so it reads as none rather than
+	// throwing, and the width transition beside it still reads.
+	it('reads no transition for a named transition that carries no effect', () => {
 		scene.load(cascade)
 		const element = requireValue(
 			scene.mount('<div class="vn-probe-sample">Buoy</div>').firstElementChild,
@@ -2168,9 +2220,8 @@ describe('sampleTransition', () => {
 		// The native effect setter cancels a CSS transition and drops it from getAnimations, so the
 		// own property shadows the accessor instead, keeping the transition findable with no effect.
 		Object.defineProperty(transition, 'effect', { value: null })
-		expect(() => sampleTransition(element, 'opacity')).toThrow(
-			'The opacity transition carries no effect',
-		)
+		expect(sampleTransition(element, 'opacity')).toBeUndefined()
+		expect(sampleTransition(element, 'width')?.duration).toBe(400)
 	})
 })
```

**R1.** The filter's `KeyframeEffect` narrowing is in the find predicate's type, so the no-effect `requireValue` guard
and its `@throws` clause are removed, not left unreachable. The `@throws` line names only the remaining throws.

## Sentences as written

**`guides/veneer.md` § Accordion classes, the motion paragraph (claim 6):**
> The chevron turns its `transform` between `none` and the release's own `rotate(-180deg)` half turn over the same
> `--vn-motion-feedback` token on the `--vn-ease-standard` curve.

**`guides/veneer.md` § Accordion classes, the proof paragraph (claims 3, 6):**
> It reads the turn the browser runs on each chevron as one button takes the collapsed class and another loses it:
> the duration and curve, which equal the feedback duration and standard curve a specimen resolves from the tokens;
> the start frame, which is the frame the chevron leaves; a midpoint frame apart from both ends; and the settled
> frame, the half turn on the expanded button and none on the collapsed one. At a doubled factor it reads twice that
> duration on the same curve, and at a zero factor or under the staged preference it reads no turn and each chevron
> on its end frame at once.

**`guides/veneer.md` § Collapse classes, the departure bullet's close (claim 6).** The control points were read
before writing: the panel curve is `cubic-bezier(0.32, 0.72, 0, 1)`, and the release's `ease` is
`cubic-bezier(0.25, 0.1, 0.25, 1)`.
> A panel therefore opens and closes sooner than the release's, and it starts at speed rather than easing in: the
> panel curve's first control point is `(0.32, 0.72)`, where the release's `ease` curve,
> `cubic-bezier(0.25, 0.1, 0.25, 1)`, has `(0.25, 0.1)`. Both curves settle into the end size.

**`_accordion.scss` header (F1):**
> Every value here is Bootstrap 5.3.8's own, apart from the forced-colors focus outline and the chevron's turn, which
> runs on the feedback motion tokens in place of the release's timing.

**`_accordion.scss` chevron comment (F1):**
> The chevron turns between no transform and the release's half turn, in each direction, over the feedback duration on
> the standard curve, so the motion factor scales it.

**`_collapse.scss` comment (F2):**
> An engine writes inline the size an opening panel grows to, and clears the inline size so a closing panel shrinks to
> this rule's zero.

**`fade.test.ts` (F3).** `expect(closing?.[0]).toBe('height')` is replaced by `expect(closing).not.toEqual(fading)`,
and the case comment is kept.

**Chevron case comment (`accordion.test.ts`):**
> The mutations this catches are the release's `transform 0.2s ease-in-out` timing restored on the chevron, a
> duration written as a literal, a turn that does not move between its endpoints, and the transition written outside
> the mixin. One button takes the collapsed class and another loses it, and each reading is the transition the browser
> runs on that button's `::after` chevron: its duration and curve against the feedback duration and the standard
> curve a specimen resolves from the tokens at the same factor, apart from the accordion's rules; its start frame
> against the frame the chevron left; its midpoint frame against both endpoints; and the frame it settles at once
> finished. The doubled duration is read as a ratio to the resting one. A zero factor and the reduced-motion preference
> start no turn, and the chevron lands on its end frame at once.

## Gates

Each gate is logged to `tmp/units/mcol-<gate>-2.log.txt` by `tmp/units/mcol-gate-2.sh`, with the command first,
then `exit=`, then `/proc/loadavg`.

| Gate | Command | Result | Load |
| --- | --- | --- | --- |
| `check` | `npm run check` | exit 0 | `5.04 6.13 5.82` |
| `lint-check` | `npm run lint:check` | exit 0 | `4.88 6.08 5.81` |
| `oxfmt-check` | `oxfmt --config .oxfmtrc.json --check` over the owned files, `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` included | exit 0 | `4.65 5.96 5.77` |
| `setup` | `npm run test:setup` | exit 0; 357 passed | `6.12 5.32 4.20` |
| `setup-browser` | `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` | exit 0; 101 passed | `4.85 5.86 5.74` |
| `build-src` | `npm run build:src` | exit 0 | `7.31 5.68 4.38` |
| `conformance` | `npm run test:conformance` | exit 0; 45 passed | `9.69 6.84 4.96` |
| `guides` | `npm run test:guides` | exit 0; 26 passed | `10.02 7.04 5.06` |
| `policy` | `npm run test:policy` | exit 0; 109 passed, 1 skipped (the skip already present at the base) | `10.47 7.24 5.14` |
| `collapse-browser` | `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Collapse.test.ts`, after `build:src` | exit 0; 49 passed | `11.23 7.67 5.34` |
| `app` | `npm run test:app`, after `build:src` | exit 0; 223 passed | `13.50 9.28 6.11` |
| `green` | the owned style proofs | exit 0; 51 passed | `4.55 5.72 5.70` |

**Re-run after the fixture change.** `check`, `lint-check`, `oxfmt-check`, `setup-browser`, and `green` were run
again after the final fixture change. The other gates read no file that change touched.

## Diff and status

- **Diff:** `tmp/units/mcol-2.diff` holds `git diff 9e1fe4e`. `--numstat` reads as follows:

| File | Added | Removed |
| --- | --- | --- |
| `guides/veneer.md` | 15 | 10 |
| `src/styles/components/_accordion.scss` | 10 | 9 |
| `src/styles/components/_collapse.scss` | 3 | 3 |
| `tests/setupBrowser.test.ts` | 55 | 4 |
| `tests/setupBrowser.ts` | 30 | 16 |
| `tests/src/styles/components/accordion.test.ts` | 75 | 52 |
| `tests/src/styles/components/fade.test.ts` | 1 | 1 |

- **Status:** `tmp/units/mcol-2-status.txt` lists `M` for exactly those files. `collapse.test.ts` is unchanged this
  round.
- **Instruments:** these files are in `tmp/units/`:
  - the edit scripts (`edit-reader*.mjs`, `edit-setup-case-*.mjs`, `edit-chevron-2.mjs`, `edit-prose-*.mjs`,
    `edit-header.mjs`, and `edit-noeffect.mjs`);
  - the plant script `mcol-plants-2.mjs` and its backups;
  - the gate script `mcol-gate-2.sh`;
  - the round-1 copies (`*.r1`);
  - every log.
