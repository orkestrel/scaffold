# J-PLACEMENT-141-PROBE report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-placement-141-probe-brief.md`. The probe file is retained as `units/j-placement-141-probe.test.ts`.

---

I wrote the probe file and ran it on Chromium 153. Every control line reads `ok` and the run exited 0. On 153 every variant anchors except `missingAnchor`, the negative control, as designed. On 153, `missingAnchor` gives exactly the reading Chromium 141 gave the round-3 baseline: `top: 2`, `left: 0`, no movement, and the candidate rule keeps its hit target when fully clipped. So 141's failure looks like "no anchor resolved at all".

## File
- Path: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/probe/j-placement-141-probe.test.ts`
- SHA-256: `28e0cd12942d6daf5145f0232754b9365c7605d8ef1804d735d899a5f0fecbbd`
- `j-native-probe-3.test.ts` is unchanged (`56e2061e…`). I did not touch `j-native-probe-2.test.ts`.
- Helpers in `tmp/j-placement-141/`: `run-153.sh`, the exact run script around the brief's command, and `tabulate.mjs`, which reads the log.

## Chromium 153 run
The log is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/j-placement-141/j-placement-141-probe-153.log.txt`. It holds 14 tests passed, 242 `ROW` lines, a duration of 66.81 s, and `exit=0`.

Control and summary lines, verbatim:
```
CONTROL control.V.hitTest ok expected={"visible":true,"hidden":false} actual={"visible":true,"hidden":false}
CONTROL control.baseline.round3.chromium153 ok expected={"full":[283,182,283],"partial":[283,212,283]} actual={"candidate.full":[283,182,283],"candidate.partial":[283,212,283],"always.full":[283,182,283],"always.partial":[283,212,283]}
CONTROL control.baseline.always.full.clippedHitIsOverlay ok expected=true actual=true
CONTROL control.missingAnchor.lost ok expected="anchored=false in every run" actual={"candidate.full":false,"candidate.partial":false,"always.full":false,"always.partial":false}
CONTROL control.coverage ok expected=[] actual=[]
SUMMARY chromium=153 controls=ok baselineAnchors=true referenceNames=1 pass={"baseline":true,"prescrolled":true,"body":true,"display":true,"noClick":true,"entryFocus":true,"noFallback":true,"plainArea":true,"anchorInsets":true,"singleName":true,"missingAnchor":false,"restyle":true} consistentCauses=n/a (the baseline anchors on this build)
```

## Per-variant readings on Chromium 153
Each cell shows the gap (menu top minus reference bottom) at before, clipped, and restored, then the movement as reference/menu for each step. The candidate rule and the `always` rule gave identical geometry in every variant. Hit tests matched the pass condition everywhere except `missingAnchor`: the candidate lost its hit target only under full clipping.

| Variant | Rules | Full clip: gaps; movement | Partial clip: gaps; movement | Pass |
|---|---|---|---|---|
| baseline | both | 2,2,2; −101/−101, 101/101 | 2,2,2; −71/−71, 71/71 | yes |
| prescrolled | both | 2,2,2; −71/−71, 101/101 | 2,2,2; −41/−41, 71/71 | yes |
| body | both | 2,2,2; −101/−101, 101/101 | 2,2,2; −71/−71, 71/71 | yes |
| display | both | same as baseline | same as baseline | yes |
| noClick | both | same as baseline | same as baseline | yes |
| entryFocus | both | same as baseline | same as baseline | yes |
| noFallback | both | same as baseline | same as baseline | yes |
| plainArea | both | same as baseline | same as baseline | yes |
| anchorInsets | both | same as baseline | same as baseline | yes |
| singleName | both | same as baseline | same as baseline | yes |
| missingAnchor | both | −279,−178,−279; −101/0, 101/0 | −279,−208,−279; −71/0, 71/0 | no (control) |
| restyle | both | same as baseline | same as baseline | yes |

## Predictions for Chromium 141
The table gives each candidate cause's prediction per variant, for a build where the baseline fails: P = passes, F = fails, ? = the cause does not decide it. The file holds the same table in its `CAUSES` constant. It prints a `CAUSE` line per cause, marking the cause consistent only when every cell the cause decides matches what the run read.

| Variant | Ancestry | Hidden placement | Spanning area | `flip-block` fallback | Name list |
|---|---|---|---|---|---|
| baseline | F | F | F | F | F |
| prescrolled | F | F | F | F | F |
| body | P | ? | ? | ? | ? |
| display | F | P | F | F | F |
| noClick | F | F | F | F | F |
| entryFocus | F | F | F | F | F |
| noFallback | F | ? | F | P | F |
| plainArea | F | ? | P | F | F |
| anchorInsets | ? | ? | P | P | F |
| singleName | F | F | F | F | P |
| missingAnchor | F | F | F | F | F |
| restyle | F | ? | F | F | F |

How to read a 141 run against it:
- **`restyle` is an added variant.** It rewrites `position-area` to `none` and back, so the final style matches what the placement wrote. If `restyle` passes on 141, then any restyle after `show()` repairs the anchor. In that case a pass in `noFallback`, `plainArea`, or `anchorInsets` does not implicate the area or the fallback.
- **The name-list cause cannot be tested with this fixture.** The reference carries one name (`referenceNames=1`), so `singleName` changes nothing (`unchanged:true`). The file prints `decidable=false` for this cause.
- **A pass outside the four causes needs a new explanation.** If `noClick` or `entryFocus` passes on 141 while no cause is consistent, the trigger is pre-show interaction or focus, which the verdict does not list. Round 3's `V.focus` row, where the 141 candidate lost its hit target, points this way.

## Answers to the brief's unknowns
- **`update()` runs between phases.** Side-attribute writes read 2 at `shown`, then rise by 1 at `clipped` and again at `restored`. Each rise follows a `scrollend` event (0, 0, 1, 2). No `update()` runs between `shown` and `before`, so each post-show change is read back directly. `update()` only writes the side attribute, and only when the menu renders.
- **Moving the menu to `body` does not break the dropdown's lookup.** The dropdown keeps its menu reference (`located:true`), every `show()` in the file resolved `true` (48 of 48), and the lifecycle rows read normally.

## Probe worktree status
`git status --short` prints nothing. `tmp/` is ignored.

## Deviation state
No stop. I settled these choices myself:
- **Row names.** Rows are `ROW <variant>.<rule>.<clip>.<phase>`, with clip `full` or `partial` and phase `shown`, `before`, `clipped`, `restored`, or `lifecycle`. Each rule and clip pair runs on a fresh fixture that is torn down whole.
- **No reads before `show()`.** The baseline's preparation stays exactly as in round 3, including the trusted click.
- **Extra variant and controls.** I added the `restyle` variant, carried over round 3's hit-test control, and added a coverage control.
- **One test per variant.** The configuration caps each test at 60 s.
- **Baseline check per build.** The baseline control looks up the expected round-3 tops for the build it runs on: 283/182/212 on 153 and 2 on 141.
- **Scroll before `show()`.** `prescrolled` scrolls the scroller 30px.

The Chromium 141 run is still outstanding.
