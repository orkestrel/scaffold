<!-- The J-CASCADE writer's final message (opus on Opus 5.5, native subagent a14bb3ba0e37f79c2), retained verbatim from its completion notification because its transcript file was empty; brief: units/j-cascade-brief.md; worktree tmp/worktrees/cascade on unit/cascade from 6dd5034. -->

I finished J-CASCADE with no stop. All three obligations are proved on the shipped cascade, and the instrument killed every seam with no misses. Only the six owned test files changed; no source file changed. Three sentences in the guide's § Engine are now false. They are off-limits to me, so the exact patches are at the end of this report.

## Files touched

All under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/cascade/`:
- `tests/src/browser/Alert.test.ts`: stand-in and false comment removed; five cases load the shipped tokens, fade, and alert sheets; the cascade-reading case reworked; one motion-factor case added.
- `tests/src/browser/Tab.test.ts`: same for the nav sheet; the cascade-reading case reworked, because "no pane fade" is false under the shipped cascade; one motion-factor case added.
- `tests/src/browser/Toast.test.ts`: same for the toast sheet; the cascade-reading case reworked; four cases reworked (listed under C1); one motion-factor case added.
- `tests/src/browser/Tooltip.test.ts`: same for the tooltip sheet. The literal `0.6s` fade is replaced by the shipped fade at factor 4. One motion-factor case added.
- `tests/src/browser/Popover.test.ts`: one trusted-click case on the default `animated: true` path and one motion-factor case added.
- `tests/src/browser/Carousel.test.ts`: one trusted touch-drag case added.
- `tmp/j-cascade/`: the instrument `mutations.py` and its log, the stand-in lister `standins.py`, the edit scripts, and the run logs.

Diffstat: 6 files changed, 500 insertions(+), 76 deletions(-). `git diff --check` is clean.

## Base measurements (at `6dd5034`, before any edit)

The scoped six-file run exited 0: `Test Files  6 passed (6)` and `Tests  233 passed (233)`.

Each stand-in string, and the cases that loaded it, by title (from `tmp/j-cascade/standins-base.log.txt`):
- **Alert**, `const fade`:
  - fades an alert carrying the fade token out…
  - resolves false for a call while a close is in flight…
  - holds no record of the shown token after a completed close…
  - abandons the fade on destruction…
  - stops when the shown token returns during the fade…
- **Tab**, `const fade`:
  - waits for the pane fade to settle…
  - abandons a swap in flight on destruction…
  - stops a swap whose pane loses its shown token during the fade…
  - resolves false for the swap a sibling takes over during the fade…
- **Toast**, `FADE`:
  - reads the shipped toast declarations…
  - shows through the fade and showing tokens…
  - dispatches shown after the fade in finishes when the toast is displayed before it shows…
  - shows and hides at once with animated false…
  - dispatches shown with no animation created under staged reduced motion
  - resolves false for a hide on a hidden toast…
  - abandons the transition in flight on destruction…
  - stops a show when the transition token leaves during its await…
  - clears a pending delay when a show is accepted…
  - stops a hide when the shown token leaves during its transition…
- **Tooltip**, `FADE`:
  - waits for the fade in and the fade out…
  - refuses to show when disabled…
  - rebuilds a settled shown tip on show…
  - resolves a hide false and leaves the tip where a reaction moved it…
  - abandons a show in flight on destruction…
- **Tooltip**, literal `'.fade { transition: opacity 0.6s linear }'`:
  - shows the tip again when the pointer returns while it fades out…

After the change, `python tmp/j-cascade/standins.py` prints nothing, and a grep for the false comment phrases returns exit 1.

## C1: the shipped cascade

- **Swapped cases (Alert, Tab, Tooltip, and most of Toast):** green after the swap. The engines wait on whatever the platform's `getAnimations()` reports, and the shipped fade uses the same property and duration (0.15s) as the stand-in.
- **Three Toast cases went red after the swap.** The run reported `Tests  3 failed | 36 passed (39)`, on:
  - `Toast > dispatches shown after the fade in finishes when the toast is displayed before it shows, under the fade sheet alone`
  - `Toast > abandons the transition in flight on destruction, resolving false and restoring the toast`
  - `Toast > stops a show when the transition token leaves during its await, dispatching no shown event`
  - I did not keep the failure messages; that log was overwritten by the later green run.
  - The cause is the test premise, not the engine. The stand-in carried no `.toast:not(.show) { display: none }` rule and no `.showing` rule, so it let a hidden toast be displayed. Under the shipped cascade a hidden toast has no display, so showing it runs no transition.
  - The fix was to rework each case onto the path the shipped cascade does fade: a show of a toast that is already shown, which the `showing` token fades out. The first case is retitled `dispatches shown after the fade out that a show of a shown toast runs through the showing token finishes`. All three are green.
- **Reduced motion:** the case `dispatches shown with no animation created under staged reduced motion` now mounts a shown toast. Otherwise it would pass without ever reaching a fade.
- **Popover** (`fades its tip in and out on trusted clicks under the shipped cascade by default, dispatching shown and hidden only after each fade finishes`): green from the start. The popover's animated path holds on the shipped cascade under `userEvent.click`.
- **Red readings** come from the instrument's WAIT rows (table below).

## C2: the motion factor

One case per engine, each titled "…at a zero motion factor, and only after the fade the factor lengthens finishes at a large one":
- **At factor 0:** `transitionDuration` reads `0s`, no animation runs, and the completed event arrives.
- **At factor 4:** `transitionDuration` reads `0.6s` and the animation's timing reads 600. One frame in (`waitForFrame`), the event has not arrived and the transition's `playState` is `running`. The event then arrives after `finished`.
- Toast proves this with `hidden`, because showing a hidden toast runs no fade.

All five were green from the start, for the same reason as C1. Their red readings are the TOKEN rows and the C2-wait rows.

## C3: the trusted swipe

The case is `Carousel > slides next on a trusted leftward touch drag and previous on a rightward one under the shipped carousel cascade`. It was green from the start.

The unknown in the brief resolved as a pass. On Chromium 153 under `touch-action: pan-y`, `touchStart`, then `touchMove` in 20 px steps, then `touchEnd` reaches the swipe as a touch pointer drag. The probe read `pointerdown` → 5 × `pointermove` → `pointerup` with no `pointercancel`, then `slid` with direction `left` to index 1. The red reading is the SWIPE row.

## Mutation table (from `tmp/j-cascade/mutations.log.txt`)

Every row passed its expected verdict. Status is `failed` on every KILLED and REFUSED row and `passed` on the CONTROL row. Mutated-source digests:
- `src/browser/Swipe.ts`: `4c16658dc7419e5feaf89dd327fbdf01a819544d8b20bb93515cdde22a2a1b22`
- `src/browser/helpers.ts`: `81941ebf1aac521807d7a90d602451635a0a074db95604391dbe06a5e0da23fe`
- `src/styles/components/_fade.scss`: `c34deb066fa895c273e37f51ca3309996835c41f2099510cb1b48be923937fb9`

The three seams, one mutation each:
- **WAIT:** `settleAnimations` returns before it reads a running animation.
- **TOKEN:** the fade reads `150ms` in place of `var(--vn-motion-feedback)`.
- **SWIPE:** `Swipe` reports each drag in the opposite direction.

| Row | Mutation | Case | Verdict | Failure message |
| --- | --- | --- | --- | --- |
| C1-alert | WAIT | Alert fades an alert carrying the fade token… | KILLED | `AssertionError: expected [ [ 'closed.vn.alert' ] ] to deeply equal [ [ 'finished' ], …(1) ]` |
| C1-tab | WAIT | Tab waits for the pane fade to settle… | KILLED | `AssertionError: expected [ [ 'hidden.vn.tab' ], …(1) ] to deeply equal [ [ 'finished' ], …(2) ]` |
| C1-toast-hide | WAIT | Toast shows through the fade and showing tokens… | KILLED | `AssertionError: expected [ [ 'shown.vn.toast' ], …(1) ] to deeply equal [ [ 'shown.vn.toast' ], …(2) ]` |
| C1-toast-show | WAIT | Toast dispatches shown after the fade out that a show of a shown toast runs… | KILLED | `AssertionError: expected [ [ 'shown.vn.toast' ] ] to deeply equal [ Array(2) ]` |
| C1-tooltip | WAIT | Tooltip waits for the fade in and the fade out… | KILLED | `AssertionError: expected [ [ 'shown.vn.tooltip' ] ] to deeply equal [ [ 'finished' ], …(1) ]` |
| C1-popover | WAIT | Popover fades its tip in and out on trusted clicks… | KILLED | `AssertionError: expected '0' to be '1' // Object.is equality` |
| C2-wait-alert | WAIT | Alert dispatches closed … motion factor… | KILLED | `AssertionError: expected [ Array(2) ] to deeply equal [ [ 'still', 'closed.vn.alert' ] ]` |
| C2-wait-tab | WAIT | Tab dispatches shown … motion factor… | KILLED | `AssertionError: expected [ [ 'still', 'shown.vn.tab' ], …(1) ] to deeply equal [ [ 'still', 'shown.vn.tab' ] ]` |
| C2-wait-toast | WAIT | Toast dispatches hidden … motion factor… | KILLED | `AssertionError: expected [ Array(2) ] to deeply equal [ [ 'still', 'hidden.vn.toast' ] ]` |
| C2-wait-tooltip | WAIT | Tooltip dispatches shown … motion factor… | KILLED | `AssertionError: expected [ …(2) ] to deeply equal [ [ 'still', 'shown.vn.tooltip' ] ]` |
| C2-wait-popover | WAIT | Popover dispatches shown … motion factor… | KILLED | `AssertionError: expected [ …(2) ] to deeply equal [ [ 'still', 'shown.vn.popover' ] ]` |
| C2-alert | TOKEN | Alert … motion factor… | KILLED | `AssertionError: expected '0.15s' to be '0s' // Object.is equality` |
| C2-tab | TOKEN | Tab … motion factor… | KILLED | same message |
| C2-toast | TOKEN | Toast … motion factor… | KILLED | same message |
| C2-tooltip | TOKEN | Tooltip … motion factor… | KILLED | same message |
| C2-popover | TOKEN | Popover … motion factor… | KILLED | same message |
| C3-carousel | SWIPE | Carousel slides next on a trusted leftward touch drag… | KILLED | `AssertionError: expected [ …(2) ] to deeply equal [ …(2) ]` |
| CONTROL | TOKEN written as the equivalent `opacity linear <duration>` shorthand | Alert … motion factor… | HELD | none |
| REFUSAL | WAIT seam with an unbound identifier | Alert fades an alert carrying the fade token… | REFUSED | `ReferenceError: unboundSignal is not defined` |

The log closes with `restored byte for byte` and `rows 19, missed 0`.

## The instrument's refusal rule

A failed case counts as KILLED only when its failure is an assertion the mutation reached. The instrument refuses the kill in any of these conditions:
- the case was not collected;
- the file reports a suite-level error, which covers collection, syntax, and transform failures;
- the failure message or the run's output names any of:
  - `ReferenceError`
  - a `TypeError` of the form `… is not defined`, `… is not a function`, or `… is not a constructor`
  - `SyntaxError`
  - `Transform failed`
  - `Failed to resolve import`, `Failed to load url`, or `Failed to fetch dynamically imported module`
  - a `[sass]` compile error

The REFUSAL row demonstrates the rule.

## Acceptance output

```
check:src:browser exit 0
lint:check exit 0
format:check exit 0        (All matched files use the correct format. Finished in 12220ms on 476 files using 16 threads.)
tsc root exit 0            (npx tsc --noEmit --project tsconfig.json, which also typechecks the tests)
scoped exit 0
 Test Files  6 passed (6)
      Tests  240 passed (240)
   Duration  36.86s
```

The scoped run is the six owned files. The count went from 233 to 240: five motion-factor cases, one Popover C1 case, and one C3 case.

## `git status --short`

```
 M tests/src/browser/Alert.test.ts
 M tests/src/browser/Carousel.test.ts
 M tests/src/browser/Popover.test.ts
 M tests/src/browser/Tab.test.ts
 M tests/src/browser/Toast.test.ts
 M tests/src/browser/Tooltip.test.ts
```

## Deviation state

No stop. These are the choices I settled:
- **Where the factor lives:** on the root, through an unlayered `scene.load(':root { --vn-factor-motion: N }')` sheet that the scene clears after the case. A probe showed a factor set on the host does not reach the fade. The readings were `0.15s`, then `0.15s` with the host's `--vn-motion-feedback` at `calc(150ms * 1)`, then `0.6s` at a root factor of 4, then `0s` at a root factor of 0. Each case carries a one-line comment giving that reason.
- **How the running transition is read:**
  - `getAnimations()[0]` and its `effect.getComputedTiming().duration`.
  - One `waitForFrame()`, then the event reading and `playState === 'running'`.
  - I had used `await transition.ready` first. Under the WAIT mutation that promise rejected with an AbortError ("The user aborted a request.") before any assertion ran, so a kill would not have been an assertion kill. The frame read fixes that.
- **Case order and titles:** each motion-factor case sits after its engine's main fade case, and titles name the behaviour rather than C1, C2, or C3.
- **Toast reworks:** the four Toast reworks listed under C1.
- **Instrument writes:** it temporarily writes the off-limits `src/styles/components/_fade.scss` for the TOKEN seam the brief names, and restores it byte for byte, verified by digest.

Observation for the styles session: `--vn-factor-motion` rescales motion only on the root. The tokens partial resolves `--vn-motion-feedback` there, and every element inherits the already-resolved value.

## Report-only guide patches (`guides/veneer.md` § Engine, off-limits to this unit)

These three sentences are false under the shipped `_fade.scss`.

§ Alert:
```diff
-alert inserted in the same task has a computed style and its fade still runs. The shipped cascade
-declares no `.fade` rule, so under it alone a close finds no animation and completes in a
-microtask; a stylesheet that declares Bootstrap's `.fade` transition makes the close wait for it.
+alert inserted in the same task has a computed style and its fade still runs. The shipped fade
+partial fades an alert carrying the `fade` token through its opacity over the `--vn-motion-feedback`
+duration, so the close waits for that fade and the `--vn-factor-motion` factor on the root rescales
+the wait. Under a zero factor or reduced motion the fade creates no animation, and the close
+completes in a microtask.
```

§ Tab:
```diff
-fade to settle. The shipped `_nav.scss` sheet transitions a control's colors and supplies no pane
-fade, so a pane fades only under a stylesheet of your own that animates the `fade` token. The call
+fade to settle. The shipped `_nav.scss` sheet transitions a control's colors, and the shipped fade
+partial fades a pane carrying the `fade` token over the `--vn-motion-feedback` duration, so the
+`--vn-factor-motion` factor on the root rescales the wait. The call
```

§ Toast:
```diff
-The shipped cascade declares no transition on the toast, and no Veneer rule reads the `fade` token,
-so under the shipped cascade both calls complete in a microtask. Where a sheet of yours carries
-Bootstrap's `.fade` transition, hiding waits for the fade out. Showing takes the toast from no
-display to displayed at no opacity, which starts no transition, so `shown.vn.toast` dispatches in a
-microtask and the fade in runs after it, as the `transition` token leaves.
+The toast partial declares no transition of its own, and the shipped fade partial fades a toast
+carrying the `fade` token through its opacity over the `--vn-motion-feedback` duration. Hiding
+therefore waits for the fade out the `transition` token starts, and the `--vn-factor-motion` factor
+on the root rescales the wait. Showing a hidden toast takes it from no display to displayed at no
+opacity, which starts no transition, so `shown.vn.toast` dispatches in a microtask and the fade in
+runs after it, as the `transition` token leaves. Showing a shown toast first fades it out under
+the `transition` token and waits for that fade.
```

Carried as the brief says: the Delegate stand-in and the Modal and Offcanvas motion-factor cases go to J-OVERLAYS.
