# Unit STATES round 2 report

Round 2 closes claim 3, claim 5, F1, and F2, and it closes claim 7 and F3 at every site except one. That site is the inline centre read in `tests/app/browser/integration.test.ts`. The brief's deviation contract names it as a stop, so it stays unchanged:

- The integration test shoots its frames with the pane unstaged.
- An unstaged shot is painted at the runner's fitting scale, so the element's box does not locate its pixels.
- The helper therefore can't serve that read without the test also staging the pane, which is a change to the app journey outside this brief.

Every acceptance gate exits 0, and the twin plant fails the transition case with an `AssertionError`.

Worktree `/home/user/veneer-sts`, base `2376710`. Round 1 remains uncommitted beneath this round's changes. Nothing is committed.

## Changes by case

These changes are in `tests/src/styles/components/form-range.test.ts`:

- **`runs the thumb fill transition with motion allowed and lands each fill at once under reduced motion`**
  - Claim 3: the case again asserts `transition-property: none` and `transition-duration: 0s` on the gated thumb rule, beside the transition-only longhand filter and the rendered collapse readings. The comment names the defect these readings refuse, which is a twin that keeps a transition on another thumb property.
  - Claim 5: `waitForCondition` is replaced by `retryUntil`. The producer shoots one frame and measures it against the started shot and the held fill.
    - The predicate accepts only a frame that differs from both, at every centre pixel.
    - The assertion reads that accepted frame and its measurements.
    - A frame that reached the held fill can't be the frame read.
  - The comment states the capture budget: the factor stretches the transition to 7.5s, a shot takes about 100 ms on an idle host, and the retry's 3s budget bounds only the refusal.
  - F1: while the hold lasts, after the moving frame, the case asserts `expect(document.getAnimations()).toEqual([])`. The comment says this assertion reports an engine that starts listing the thumb's transition.
- **`paints the held thumb with the blue palette entry mixed three tenths over white`**: the centre region comes from `readCentre(element, 4, element)`, read after `stagePane`.
- **`lets the pointer through the disabled host and paints its thumb with the secondary text color`**:
  - The centre region comes from `readCentre(disabled, 4, disabled)`, read after `stagePane`.
  - The gauge-rounding rationale stays in this case's comment.
- The import of `waitForCondition` is replaced by `retryUntil`, and the import of `readRegion` is replaced by `readCentre`.

The guide change is in `guides/veneer.md` § Form range classes:

- F2: the gauge-rounding sentence is deleted. The Disabled bullet ends at "fills that gauge's thumb with `--bs-secondary-color`."
- The Transition bullet now says the gated rule declares `transition-property: none` and a `0s` duration and nothing else, which refuses a transition surviving on another thumb property.

`tests/src/styles/components/button.test.ts` is unchanged from round 1.

## Helper and proof

The helper is `readCentre(subject: Element, size: number, frame?: Element): FrameRegion`, added to `tests/setupBrowser.ts` beside `readRegion`.

- It returns a square of `size` device pixels, centred on the subject's box in the frame's coordinates.
- It is built on `readRegion`, so the frame argument has the same meaning: omit it for a page frame.
- Its TSDoc states the staging rule. No type was added, because `FrameRegion` already exists in `tests/setup.ts`.

The proof is `reads a square at an off-centre subject centre, in the coordinates of the frame it is photographed inside`, in `tests/setupBrowser.test.ts`.

- **Fixture:** a white frame, fixed at 40,30 and 200x100, holds a red 20x20 subject at 130,60, well off the frame's centre. The pane is staged, and `onTestFinished(releasePane)` releases it.
- **Arithmetic:**
  - The subject's square is at `140*ratio-2, 70*ratio-2`.
  - The control, the frame's own centre, is at `100*ratio-2, 50*ratio-2`.
  - The page-frame form is at the subject's centre plus the scroll offsets.
- **Paint:** on a shot of the frame, the subject's square reads variation 0 against `rgb(255, 0, 0)`, and the control square reads 1.
  - A helper that returned the frame's centre fails this reading.
  - A helper that returned the subject's origin rather than its centre also fails it.

`readCentre` is added to the export-list case, `exports the showcase mount, …`.

## Stop: the integration centre read

- **Expected:** `tests/app/browser/integration.test.ts`, case `holds each pressed form control on its lifted specimen and photographs the paint its press rule writes`, adopts `readCentre`.
- **Found:** that case shoots `focusShot` and `heldShot` with `page.screenshot({ element: control, save: false })` and never stages the pane. It then reads the pixel at `floor(height / 2), floor(width / 2)` of the decoded image, which is scale-independent.
- **Evidence:** a probe in this worktree shot an unstaged range control whose box is 200x24 CSS px at device ratio 1. The log is `tmp/units/sts-2-probe-unstaged-scale.log.txt`, and the probe was removed afterwards.

  | Viewport | Decoded shot |
  | --- | --- |
  | Default | 77x10 |
  | 1600x900 | 20x3 |
  | 390x844 | 81x10 |

  The runner window was 800 wide. An element-box region such as `readCentre`'s would sit off the scaled pixels.
- **State:** the rest of the unit is done. `integration.test.ts` is untouched.
- **Hypothesis:** staging the pane inside that case's `FRAMES.lift` action, before the focus shot, would let the helper serve it. The hold and `FRAMES.place` would then run on a staged pane, like the form-range cases. Only a run of the app journey project can prove that change.

## Plant table

The runner is `tmp/units/sts-2-plant.py`. The backup and the log are under `tmp/units/`.

| Plant | Command | Failing assertion | Restored |
| --- | --- | --- | --- |
| `twin-other`: the thumb's `@include transition(...)` becomes a bare `transition:` plus `@include reduced-motion { transition: box-shadow 7.5s ease; }` | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-range.test.ts -t 'runs the thumb fill transition with motion allowed and lands each fill at once under reduced motion'` | `AssertionError: expected 'box-shadow' to be 'none'` at the `transition-property` reading. The rendered readings passed under the plant, as the audit measured. 1 failed, 9 skipped. Log: `tmp/units/sts-2-plant-twin-other.log.txt` | `cmp` against `tmp/units/sts-2-plant-twin-other.backup.scss` exit 0, `git diff --stat -- src` empty, styles rebuilt |

## Gate table

The runner is `tmp/units/sts-2-gates.sh`. Each log ends with `exit=<code>`.

| Gate | Command | Result | Log |
| --- | --- | --- | --- |
| check | `npm run check` | exit=0 | `tmp/units/sts-2-check.log.txt` |
| lint | `npm run lint:check` | exit=0 | `tmp/units/sts-2-lint.log.txt` |
| format | `oxfmt --config .oxfmtrc.json --check` on the owned files | exit=0 | `tmp/units/sts-2-format.log.txt` |
| styles | `npm run build:src:styles`, then `npx vitest run --config configs/src/vite.styles.config.ts` on the form-range and button test files | exit=0, 98 passed | `tmp/units/sts-2-styles.log.txt` |
| setup:browser | `npx vitest run --config vite.config.ts --no-cache --project setup:browser` | exit=0, 89 passed | `tmp/units/sts-2-setup-browser.log.txt` |
| guides | `npm run test:guides` | exit=0 | `tmp/units/sts-2-guides.log.txt` |
| policy | `npm run test:policy` | exit=0, 109 passed and 1 skipped | `tmp/units/sts-2-policy.log.txt` |

The app browser project was not run. It is the Orchestrator's observation at landing.

## Diff and status

- Diff: `tmp/units/sts-2.diff` (`git diff 2376710`).
- Status: `tmp/units/sts-2-status.txt`, which lists these files as ` M`: `guides/veneer.md`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/src/styles/components/button.test.ts`, and `tests/src/styles/components/form-range.test.ts`.

The diffstat against `2376710` is:

```
 guides/veneer.md                               |  33 ++++-
 tests/setupBrowser.test.ts                     |  34 +++++
 tests/setupBrowser.ts                          |  30 ++++
 tests/src/styles/components/button.test.ts     |  27 ++++
 tests/src/styles/components/form-range.test.ts | 186 ++++++++++++++++++++++---
```

## Deviation state

One stop was raised, on the integration centre read, per the brief's deviation contract. I settled these within scope:

- the helper's name, `readCentre`, which follows `readRegion`;
- its optional `frame` argument, which has the same meaning as in `readRegion`;
- the proof's title;
- the retry's 3s budget;
- the comments.

Every log, backup, and script for this round is under `tmp/units/`, and none is in the scratchpad. `tmp/units/sts-2-form-range.round1.ts` is the round 1 copy I used to remove the probe byte for byte.
