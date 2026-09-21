# Unit U7f-harness — report 3

Script: `u7f-harness-3.mjs` (copy of `u7f-harness-2.mjs`, edited per
`u7f-harness-brief-3.md`).

## The two changes as landed

1. **Pointer-shot settle, and the theme settle's dropped animation condition.** Added a
   `settleSpecimenBackground` helper that waits until `getComputedStyle(el).backgroundColor` on
   the specimen stops changing across two consecutive `requestAnimationFrame` callbacks
   (bounded at 120 attempts, matching the theme settle's cap). It runs immediately before the
   hover shot (once `matches(':hover')` is true) and immediately before the active shot (once
   `matches(':active')` is true), and its settled value, frame count, and `stableFrames` are
   recorded in the step log entry that already covers that capture. The theme settle's
   `document.getAnimations().length === 0` condition is removed: the loop now stops on two
   stable consecutive body-background frames alone, and the attempt cap remains the bound. The
   step log's settle message no longer reports an `animations` count.
2. **Pressed host state and the Toggle ARIA snapshot.** When `aria-pressed` reads `"true"`
   after the first click, the harness now reads the toggle host's `aria-pressed` attribute,
   `Array.from(el.classList)`, and `getComputedStyle(el).backgroundColor` in one `evaluate` call
   before the pressed shot, and appends that reading to the existing pressed step-log entry. A
   `TOGGLE_SECTION` selector (`#button-toggle`) is added, and its `ariaSnapshot()` is appended to
   each variant's `.txt` under a `# Toggle` line, alongside the existing `# States` block.

## Run's console output

```
U7f-harness complete.
Output directory: C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements
- file:// boot: the showcase did NOT boot from file:// (module script or fetch refusal); fell back to a minimal node:http static server on an ephemeral port.
- Selectors used: variants-section specimen "#button-variants button.primary" (ButtonPage.vue:100-108, the button.primary inside #button-variants), pressed host "#button-toggle button.primary" (ButtonPage.vue:694, the button.primary inside #button-toggle). #button-toggle itself is a <section>, not the button; the brief's "#button-toggle" names that section.
```

The process exited cleanly after this output; no child process or listener remained.

## Output directory listing, with byte sizes

```
dark-1280-console.json                          2
dark-1280-steps.jsonl                         1383
dark-1280.txt                                 2402
dark-390-console.json                            2
dark-390-steps.jsonl                          1383
dark-390.txt                                  2402
elements-button-primary-active--dark-1280.png  959
elements-button-primary-active--dark-390.png   952
elements-button-primary-active--light-1280.png 955
elements-button-primary-active--light-390.png  960
elements-button-primary-focus--dark-1280.png  107567
elements-button-primary-focus--dark-390.png    44297
elements-button-primary-focus--light-1280.png 107015
elements-button-primary-focus--light-390.png   44045
elements-button-primary-focus-ring--dark-1280.png   1321
elements-button-primary-focus-ring--dark-390.png    1318
elements-button-primary-focus-ring--light-1280.png  1284
elements-button-primary-focus-ring--light-390.png   1290
elements-button-primary-hover--dark-1280.png    951
elements-button-primary-hover--dark-390.png     950
elements-button-primary-hover--light-1280.png   934
elements-button-primary-hover--light-390.png    935
elements-button-primary-pressed--dark-1280.png  104770
elements-button-primary-pressed--dark-390.png    46119
elements-button-primary-pressed--light-1280.png 104814
elements-button-primary-pressed--light-390.png   46351
elements-button-primary-rest--dark-1280.png     105597
elements-button-primary-rest--dark-390.png       40378
elements-button-primary-rest--light-1280.png    104501
elements-button-primary-rest--light-390.png      39832
elements-button-states--dark-1280.png            21671
elements-button-states--dark-390.png             21224
elements-button-states--light-1280.png           21608
elements-button-states--light-390.png            21055
light-1280-console.json                            2
light-1280-steps.jsonl                          1391
light-1280.txt                                  2402
light-390-console.json                             2
light-390-steps.jsonl                           1387
light-390.txt                                   2402
steps-all.jsonl                                 6064
unknowns.txt                                     515
```

Every frame and artifact name from round 2 is present unchanged.

## Settled hover and active values per variant

| Variant     | Hover settled background                 | Active settled background                |
| ----------- | ------------------------------------------ | ------------------------------------------ |
| dark-1280   | `color(srgb 0.0248835 0.714208 0.933359)` after 12 frames (stableFrames=2)  | `color(srgb 0.135692 0.746684 0.940932)` after 10 frames (stableFrames=2)  |
| dark-390    | `color(srgb 0.0248835 0.714208 0.933359)` after 11 frames (stableFrames=2)  | `color(srgb 0.135692 0.746684 0.940932)` after 12 frames (stableFrames=2)  |
| light-1280  | `color(srgb 0.0288046 0.226321 0.817248)` after 12 frames (stableFrames=2)  | `color(srgb 0.0263751 0.203249 0.734892)` after 11 frames (stableFrames=2) |
| light-390   | `color(srgb 0.0288046 0.226321 0.817248)` after 11 frames (stableFrames=2)  | `color(srgb 0.0263751 0.203249 0.734892)` after 9 frames (stableFrames=2)  |

The theme settle itself (`data-mode` switch, without the animation condition) reports two
stable frames after two attempts for both `light` (`rgb(255, 255, 255)`) and `dark`
(`oklch(0.21 0.013 256)`), across both light and dark variants.

## Pressed host's recorded state per variant

| Variant    | `aria-pressed` | class list        | computed `background-color`                     |
| ---------- | -------------- | ------------------ | ------------------------------------------------- |
| dark-1280  | `true`         | `primary active`   | `oklab(0.7 -0.0902723 -0.119795)`                  |
| dark-390   | `true`         | `primary active`   | `oklab(0.698614 -0.0898715 -0.120638)`             |
| light-1280 | `true`         | `primary active`   | `oklab(0.48 -0.0266547 -0.253603)`                 |
| light-390  | `true`         | `primary active`   | `oklab(0.48 -0.0266547 -0.253603)`                 |

Each `.txt` gained a `# Toggle` block, for example `light-1280.txt`:

```
# Toggle
- heading "useButton — toggle composable" [level=2]
- paragraph:
  - code: useButton
  ...
```

## The two frames opened at `light-1280`

- **`elements-button-primary-hover--light-1280.png`**: a tight element crop of the specimen
  alone, showing the `Primary` button on its blue hover fill, cropped to the button's own
  bounding box with no surrounding page chrome.
- **`elements-button-primary-pressed--light-1280.png`**: a full-page shot of the Elements
  showcase's Button page, `useButton — toggle composable` section. The toggle host reads
  `On — click to turn off` on a blue fill matching the button's base (unpressed) color, a `Live
  state: active = true` line confirms the ref flipped, and the event log records one
  `elements:button:toggle → active: true` entry. This matches the round-1 objective-lane
  finding: the host announces `On` while keeping its base fill, with no visual pressed-state
  differentiation on the button itself; the fill difference the brief asked to check for is
  absent, and the recorded `aria-pressed`/class/background-color values above are the artifact
  that now documents that moment directly.

## `git status --porcelain` (scaffold checkout)

```
(empty — working tree clean)
```
