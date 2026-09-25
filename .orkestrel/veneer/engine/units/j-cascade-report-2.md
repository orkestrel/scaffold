<!-- The J-CASCADE round-2 writer's final message (opus on Opus 5.5, native subagent a14bb3ba0e37f79c2, resumed), retained verbatim; brief: units/j-cascade-brief-2.md; worktree tmp/worktrees/cascade on unit/cascade over a447ce5. -->

I closed both audit findings, and every row read its expected verdict (`rows 30, missed 0`, `restored byte for byte`). Nothing reached a stop, and no source or guide file changed.

- **R1:** each motion-factor case now bounds when its completed event arrives, to within one frame. The `FIXED` mutation, a flat 1000ms wait, is killed in all five cases.
- **R2:** the instrument now counts a kill only when the failure is an assertion. A thrown `Error('boom')` reads `REFUSED`.

## Files touched

All five are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/cascade/tests/src/browser/`: `Alert.test.ts`, `Tab.test.ts`, `Toast.test.ts`, `Tooltip.test.ts`, and `Popover.test.ts`. Each file's motion-factor case changed in the same way:
- **Factor 0:** the case records the event, the call's resolution, and one `waitForFrame()` started right after the call. It requires `[event, resolved, frame]` in that order.
- **Factor 4:** the case waits one frame from the fade's `finished`, then requires `[finished, event, frame]`.
- **Title:** it now names the frame bound, for example `Alert dispatches closed with no running fade within one frame at a zero motion factor, and within one frame after the fade the factor lengthens finishes at a large one`.

Diffstat: 5 files changed, 125 insertions(+), 20 deletions(-). `git diff --check` is clean.

The instrument and its scripts are in `tmp/j-cascade/`:
- `mutations.py` is the round-2 instrument, and `mutations.log.txt` is its log.
- `mutations-1.py` and `mutations-1.log.txt` keep round 1 unchanged.
- `bound.py` and `retitle.py` are the edit scripts.

## R1 cases under the FIXED row, verbatim

| Row | Case | Verdict | Failure message |
| --- | --- | --- | --- |
| FIXED-alert | Alert dispatches closed with no running fade within one frame at a zero motion factor, and within one frame after the fade the factor lengthens finishes at a large one | KILLED | `AssertionError: expected [ [ 'still', 'frame' ], …(2) ] to deeply equal [ Array(3) ]` |
| FIXED-tab | Tab dispatches shown with no running pane fade within one frame at a zero motion factor, and within one frame after the fade the factor lengthens finishes at a large one | KILLED | `AssertionError: expected [ [ 'still', 'frame' ], …(2) ] to deeply equal [ [ 'still', 'shown.vn.tab' ], …(2) ]` |
| FIXED-toast | Toast dispatches hidden with no running fade within one frame at a zero motion factor, and within one frame after the fade the factor lengthens finishes at a large one | KILLED | `AssertionError: expected [ [ 'still', 'frame' ], …(2) ] to deeply equal [ Array(3) ]` |
| FIXED-tooltip | Tooltip dispatches shown with no running fade on the tip within one frame at a zero motion factor, and within one frame after the fade the factor lengthens finishes at a large one | KILLED | `AssertionError: expected [ [ 'still', 'frame' ], …(2) ] to deeply equal [ …(3) ]` |
| FIXED-popover | Popover dispatches shown with no running fade on the tip within one frame at a zero motion factor, and within one frame after the fade the factor lengthens finishes at a large one | KILLED | `AssertionError: expected [ [ 'still', 'frame' ], …(2) ] to deeply equal [ …(3) ]` |

`FIXED` fails the factor-0 bound first, so these rows alone would not show that the factor-4 bound can fail. I added a `LATE` seam for that: `settleAnimations` waits an extra 400ms after each round in which animations were running. With no animation it returns at once, so the factor-0 bound holds and only the factor-4 bound can fail. All five `LATE` rows read KILLED.

## The instrument's rule

A failed case counts as KILLED only when the first line of its failure message is an assertion failure. That means the line starts with `AssertionError`, or it is the expect library's own message starting `expected `. The pattern is `^(AssertionError\b|expected .+)`.

Every other failure reads REFUSED, whatever it names. So do a case that was not collected and a file that reports a suite-level error. A passed case reads HELD. Each row restores the bytes it read, and the run checks every digest again at the end.

## Mutation table (from `tmp/j-cascade/mutations.log.txt`)

The mutated sources are unchanged since round 1:
- `src/browser/Swipe.ts`: `4c16658dc7419e5feaf89dd327fbdf01a819544d8b20bb93515cdde22a2a1b22`
- `src/browser/helpers.ts`: `81941ebf1aac521807d7a90d602451635a0a074db95604391dbe06a5e0da23fe`
- `src/styles/components/_fade.scss`: `c34deb066fa895c273e37f51ca3309996835c41f2099510cb1b48be923937fb9`

| Row | Mutation | Case | Expected | Verdict | Failure message |
| --- | --- | --- | --- | --- | --- |
| C1-alert | WAIT | Alert fades an alert carrying the fade token… | KILLED | KILLED | `AssertionError: expected [ [ 'closed.vn.alert' ] ] to deeply equal [ [ 'finished' ], …(1) ]` |
| C1-tab | WAIT | Tab waits for the pane fade to settle… | KILLED | KILLED | `AssertionError: expected [ [ 'hidden.vn.tab' ], …(1) ] to deeply equal [ [ 'finished' ], …(2) ]` |
| C1-toast-hide | WAIT | Toast shows through the fade and showing tokens… | KILLED | KILLED | `AssertionError: expected [ [ 'shown.vn.toast' ], …(1) ] to deeply equal [ [ 'shown.vn.toast' ], …(2) ]` |
| C1-toast-show | WAIT | Toast dispatches shown after the fade out that a show of a shown toast runs… | KILLED | KILLED | `AssertionError: expected [ [ 'shown.vn.toast' ] ] to deeply equal [ Array(2) ]` |
| C1-tooltip | WAIT | Tooltip waits for the fade in and the fade out… | KILLED | KILLED | `AssertionError: expected [ [ 'shown.vn.tooltip' ] ] to deeply equal [ [ 'finished' ], …(1) ]` |
| C1-popover | WAIT | Popover fades its tip in and out on trusted clicks… | KILLED | KILLED | `AssertionError: expected '0' to be '1' // Object.is equality` |
| C2-wait-alert | WAIT | Alert … motion factor case | KILLED | KILLED | `AssertionError: expected [ Array(4) ] to deeply equal [ Array(3) ]` |
| C2-wait-tab | WAIT | Tab … motion factor case | KILLED | KILLED | `AssertionError: expected [ [ 'still', 'shown.vn.tab' ], …(3) ] to deeply equal [ [ 'still', 'shown.vn.tab' ], …(2) ]` |
| C2-wait-toast | WAIT | Toast … motion factor case | KILLED | KILLED | `AssertionError: expected [ Array(4) ] to deeply equal [ Array(3) ]` |
| C2-wait-tooltip | WAIT | Tooltip … motion factor case | KILLED | KILLED | `AssertionError: expected [ …(4) ] to deeply equal [ …(3) ]` |
| C2-wait-popover | WAIT | Popover … motion factor case | KILLED | KILLED | `AssertionError: expected [ …(4) ] to deeply equal [ …(3) ]` |
| FIXED-alert through FIXED-popover | FIXED | the five motion factor cases | KILLED | KILLED | as in the preceding FIXED table |
| LATE-alert | LATE | Alert … motion factor case | KILLED | KILLED | `AssertionError: expected [ Array(6) ] to deeply equal [ Array(6) ]` |
| LATE-tab | LATE | Tab … motion factor case | KILLED | KILLED | `AssertionError: expected [ [ 'still', 'shown.vn.tab' ], …(5) ] to deeply equal [ [ 'still', 'shown.vn.tab' ], …(5) ]` |
| LATE-toast | LATE | Toast … motion factor case | KILLED | KILLED | `AssertionError: expected [ Array(6) ] to deeply equal [ Array(6) ]` |
| LATE-tooltip | LATE | Tooltip … motion factor case | KILLED | KILLED | `AssertionError: expected [ …(6) ] to deeply equal [ …(6) ]` |
| LATE-popover | LATE | Popover … motion factor case | KILLED | KILLED | `AssertionError: expected [ …(6) ] to deeply equal [ …(6) ]` |
| C2-alert, C2-tab, C2-toast, C2-tooltip, C2-popover | TOKEN | the five motion factor cases | KILLED | KILLED | `AssertionError: expected '0.15s' to be '0s' // Object.is equality` (each row) |
| C3-carousel | SWIPE | Carousel slides next on a trusted leftward touch drag… | KILLED | KILLED | `AssertionError: expected [ …(2) ] to deeply equal [ …(2) ]` |
| CONTROL | TOKEN written as `opacity linear <duration>` | Alert … motion factor case | HELD | HELD | none |
| BOOM | WAIT seam throws `Error('boom')` | Alert fades an alert carrying the fade token… | REFUSED | REFUSED | `Error: boom` (not an assertion failure) |
| UNBOUND | WAIT seam with an unbound identifier | Alert fades an alert carrying the fade token… | REFUSED | REFUSED | `ReferenceError: unboundSignal is not defined` (not an assertion failure) |

The log closes with `restored byte for byte` and `rows 30, missed 0`.

## Acceptance output

```
check:src:browser exit 0
tsc root exit 0
lint:check exit 0
format:check exit 0
All matched files use the correct format.
Finished in 10402ms on 476 files using 16 threads.
scoped exit 0
 Test Files  6 passed (6)
      Tests  240 passed (240)
   Duration  35.60s
```

## `git status --short`

```
 M tests/src/browser/Alert.test.ts
 M tests/src/browser/Popover.test.ts
 M tests/src/browser/Tab.test.ts
 M tests/src/browser/Toast.test.ts
 M tests/src/browser/Tooltip.test.ts
```

## Deviation state

No stop. I worked on the `a447ce5` tip, ran no merge, and committed nothing. I settled these myself:
- **Frame reading:** the bound is read with `waitForFrame` from `@orkestrel/test/browser`. At factor 0 the frame starts right after the call. At factor 4 it starts inside the `finished` callback. No timer is used.
- **Titles:** the five cases now name the frame bound, and the instrument uses the new titles.
- **LATE seam:** I added it beyond the brief so a reader can see the factor-4 bound fail on its own.
- **Round-1 records:** round 1's instrument and log are kept beside the round-2 ones rather than overwritten.
- **Claim 1:** the `.is-fading` case in `Alert.test.ts` is unchanged, as the brief directs.
