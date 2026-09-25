# J-MOTION-PROOFS-B round 3 — the writer's report (opus on Opus 5.5, 2026-09-25)

# J-MOTION-PROOFS-B round 3: report

All five items are done, and every acceptance criterion passed in scoped runs. Nothing is committed. No engine change was needed and no off-limits file was touched, so there was no deviation.

## Files touched

- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/tests/src/browser/Toast.test.ts`: removed the motion-type pin, renamed the factor reading to `shipped` and set the factor to 1 in the case, and added the missing helper words.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/tests/src/browser/Tab.test.ts`: added the reduced-motion case, and renamed the factor reading to `shipped` with the factor set to 1 in the case.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/src/browser/Toast.ts`: class remarks only. Corrected the identity sentence and added a helper word.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/src/browser/Carousel.ts`: class remarks only. Added the helper words.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/guides/veneer.md`: § Toast only. Corrected the `shown` row and the identity paragraph, and added a helper word. The paragraph was rewrapped to width.
- `Carousel.test.ts` needed no change. Its reading is already named `shipped`, and it has no factor case.

The diffstat is below.
```
 guides/veneer.md                | 48 +++++++++++++++++++-------------------
 src/browser/Carousel.ts         |  6 ++---
 src/browser/Toast.ts            | 20 ++++++++--------
 tests/src/browser/Tab.test.ts   | 51 +++++++++++++++++++++++++++++++++++------
 tests/src/browser/Toast.test.ts | 19 +++++++--------
 5 files changed, 93 insertions(+), 51 deletions(-)
```

## Items

1. **The pin.**
   - **Before:** the completion case "dispatches shown after the fade out and the fade in that a show of a shown toast runs through the showing token finish" asserted `expect(animation).toBeInstanceOf(CSSTransition)` on every recorded motion.
   - **After:** that line is deleted, and the positive-duration reading beside it stays.
   - A search of the three owned test files for `CSSTransition|CSSAnimation|transitionProperty|transition-property|easing|TimingFunction|timing-function|transitionDuration|toBeInstanceOf\((CSS|Animation)` finds nothing.
2. **Reduced motion.**
   - **Before:** `Tab.test.ts` had no case under `stageMedia({ motion: false })`.
   - **After:** it has one, in the Collapse and Toast shape, and `releaseMedia` and `stageMedia` are imported. It is covered in its own section later in this report.
3. **The naming.**
   - **Before:** in both factor cases the reading was `const released = readDuration(...)`, with the comment "read at the release's factor". Neither case set the factor before its first reading.
   - **After:** each case loads `scene.load(':root { --vn-factor-motion: 1 }')` before `const shipped = readDuration(...)`, and asserts `scaled / shipped`. The comment reads: "The case replaces the shipped factor with 1 before it reads the slow toast's (pane's) duration, and with 4 before it reads the duration again, so the ratio of the two readings is 4 whatever factor the cascade ships."
   - I kept the phrase "the shipped factor" but did not describe the reading as taken *at* the shipped factor. Once the case sets the factor to 1, that description would be false.
   - **Proof:** I planted a shipped factor of 2 in a scratch copy with `r3-factor-plant.py`. The `fd82ae9` versions of the Toast and Tab tests fail there, each with `AssertionError: expected 2 to be close to 4` (`r3-factor-base.log.txt`). The round-3 tests pass there: Toast 45 of 45, Tab 48 of 48 (`r3-factor.log.txt`). The scratch copy was removed.
4. **The Toast prose.**
   - **`shown` row, before:** "After the fade in the `transition` token's removal starts".
   - **`shown` row, after:** "After the `transition` token leaves; when `animated` is `true`, after the fade in that its removal starts finishes".
   - **`Toast.ts` remarks, before:** "After each write, dispatch, and await, it reads whether the toast is live and whether a later `show` or `hide` call has started".
   - **`Toast.ts` remarks, after:** "After its pre-change dispatch and after each write and await, it reads …". The paragraph then adds: "After its completed event, a call reads only whether the toast is live, and resolves `false` when it is not."
   - **§ Toast paragraph, after:** the same correction. I also changed "It also reads the `transition` token" to "Before its completed event, it also reads the `transition` token", because the word "only" in the new sentence would otherwise contradict it.
   - **Check against the code:** after `emitEvent(host, TOAST_EVENTS.shown …)` and after the `hidden` dispatch, the call runs only `#arm()` and `return !this.#controller.signal.aborted`, so the sentence holds with `animated` both `true` and `false`.
5. **Helper words.**
   - `Toast.ts` remarks and § Toast: "the fade in that removal starts" became "the fade in that the removal starts".
   - `Toast.test.ts` comment: "the fade in its removal starts" became "the fade in that its removal starts".
   - `Toast.test.ts` case title: "resolves false for a show whose fade in a hide takes over, …" became "resolves false for a show that a hide takes over during its fade in, …".
   - `Carousel.ts` remarks: "…to both items, when the host carries the `slide` token waits…" became "…to both items, then, when the host carries the `slide` token, waits…".

## The Tab reduced-motion case

- **Title:** "swaps the panes with no animation created on either pane under staged reduced motion, and dispatches shown".
- **Reading at `fd82ae9`, before any engine change:** it passes. The command was `bash tmp/j-motion-proofs-b/run.sh Tab r3-base`, which ran `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Tab.test.ts`. It returned exit 0, with 48 of 48 tests passing.
- **Mutation `r3-tab-reduced-force`** (`tmp/j-motion-proofs-b/r3-mutations.json`, run through `mutate.py`): in `Tab.ts`, before `if (fading) reflow(pane)`, the mutation inserts `if (fading && matchMedia('(prefers-reduced-motion: reduce)').matches) { pane.style.setProperty('transition', 'opacity 40ms linear') }`. That makes the engine force a pane transition under reduced motion.
- **Mutation reading:** exit 1, "1 failed | 47 passed (48)". The only failure is the new case, with `AssertionError: expected [ CSSTransition{} ] to deeply equal []` at `Tab.test.ts:605:61`. That line is the assertion `expect([...home.getAnimations(), ...pane.getAnimations()]).toEqual([])`. The file was restored byte for byte (`restored True`).
- **Narrowing:** the first draft of the mutation had no reduced-motion condition. It also reddened the zero-factor case, so I added the condition to make it redden only the named case.

## The plant run and its removal

These runs used the round-1 motion plant (`plant.sh` with `plant.py`, label `r3-plant`, log `tmp/j-motion-proofs-b/r3-plant.log.txt`) in a scratch copy of the worktree.
```
PlantProbe exit 0   Tests  2 passed (2)
Collapse exit 0     Tests  49 passed (49)
Toast exit 0        Tests  45 passed (45)
Tab exit 0          Tests  48 passed (48)
Carousel exit 0     Tests  73 passed (73)
scratch removed: yes
```

The same four files also pass unplanted in the worktree (label `r3-unplanted`): Collapse 49 of 49, Toast 45 of 45, Tab 48 of 48, and Carousel 73 of 73, each exiting 0.

## Acceptance output (`bash tmp/j-motion-proofs-b/r3-accept.sh`)

```
npm run check exit 0
npm run lint:check exit 0
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
npm run format:check exit 0

All matched files use the correct format.
Finished in 10500ms on 476 files using 16 threads.
git diff --check exit 0
npm run test:guides exit 0
 Test Files  1 passed (1)
      Tests  26 passed (26)
```

## `git status --short`

```
 M guides/veneer.md
 M src/browser/Carousel.ts
 M src/browser/Toast.ts
 M tests/src/browser/Tab.test.ts
 M tests/src/browser/Toast.test.ts
```

## Deviation state

None, with one ruling recorded:
- **Wording:** "the shipped factor" appears only as the thing each case replaces, never as the factor a reading is taken at. That is item 3's wording, settled under the brief's grant to decide each sentence's wording.

Two things are left for the carrier units the verdict names, not for this round:
- **Identity sentence:** the same sentence stands in four other § sections of the guide, around lines 1093, 1376, 2258, and 2692. Those go to the J-RELEASE family units.
- **Remaining `released` names:** the names still in `Tab.test.ts` and `Carousel.test.ts` refer to a pointer or hook release, not the duration reading, so I left them.

The new instruments are all under `tmp/j-motion-proofs-b/`:
- `r3-mutations.json`
- `r3-factor-plant.py`
- `r3-factor.sh`
- `r3-accept.sh`
- the logs `r3-plant.log.txt`, `r3-factor-base.log.txt`, and `r3-factor.log.txt`
- the `logs/r3-*` files, the `r3-logs/` folder, and `mutations/r3-tab-reduced-force.log.txt`
