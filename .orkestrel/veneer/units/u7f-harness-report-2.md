# U7f-harness report — round 2

## The three changes as landed

Made in `u7f-harness-2.mjs`, a copy of `u7f-harness.mjs`; the round-1 script
is unchanged.

1. **Focus ring element frame.** After the page-frame focus capture succeeds, the specimen's
   bounding box is read and an element frame is shot with `page.screenshot({ clip })`, clipped to
   the specimen padded 12px on every side (`FOCUS_RING_PADDING`), clamped against the viewport
   edge so the clip never runs negative or past the page width. Named
   `elements-button-primary-focus-ring--<variant>.png`. Beside it, the specimen's computed
   `box-shadow` is read through `getComputedStyle(el).boxShadow` at the same moment and logged.
   Where the tab walk never reaches the specimen, the ring frame is logged absent and the
   box-shadow is not read (matching the existing focus-absent branch).
2. **Dark-mode settle wait.** After setting `data-mode` for every variant (not only dark, for
   symmetry), the page evaluates a loop that polls `requestAnimationFrame` up to 120 times,
   comparing `getComputedStyle(document.body).backgroundColor` across consecutive frames and
   `document.getAnimations().length`, and stops once two consecutive frames agree with zero
   running animations or the attempt cap is reached. The settled background value and the loop's
   `stableFrames`/`attempts`/`animations` counters are logged before any capture.
3. **States section.** At the end of each variant capture (after active), the harness waits for
   `#button-states` to be visible, shoots an element frame
   (`elements-button-states--<variant>.png`), reads its ARIA snapshot, and appends it to the
   variant's `<variant>.txt` under a `# States` line, alongside the existing Variants-section
   snapshot.

## Run console output

```text
U7f-harness complete.
Output directory: C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements
- file:// boot: the showcase did NOT boot from file:// (module script or fetch refusal); fell back to a minimal node:http static server on an ephemeral port.
- Selectors used: variants-section specimen "#button-variants button.primary" (ButtonPage.vue:100-108, the button.primary inside #button-variants), pressed host "#button-toggle button.primary" (ButtonPage.vue:694, the button.primary inside #button-toggle). #button-toggle itself is a <section>, not the button; the brief's "#button-toggle" names that section.
```

The script ran to completion from one `node u7f-harness-2.mjs` call and closed its
browser and static server before exiting.

## Output directory listing (bytes)

```text
dark-1280-console.json                             2
dark-1280-steps.jsonl                            1057
dark-1280.txt                                    1364
dark-390-console.json                               2
dark-390-steps.jsonl                             1051
dark-390.txt                                     1364
elements-button-primary-active--dark-1280.png     948
elements-button-primary-active--dark-390.png      944
elements-button-primary-active--light-1280.png    949
elements-button-primary-active--light-390.png     950
elements-button-primary-focus--dark-1280.png   108074
elements-button-primary-focus--dark-390.png     44297
elements-button-primary-focus--light-1280.png  107010
elements-button-primary-focus--light-390.png    44045
elements-button-primary-focus-ring--dark-1280.png    1317
elements-button-primary-focus-ring--dark-390.png     1317
elements-button-primary-focus-ring--light-1280.png   1280
elements-button-primary-focus-ring--light-390.png    1290
elements-button-primary-hover--dark-1280.png      965
elements-button-primary-hover--dark-390.png       961
elements-button-primary-hover--light-1280.png     948
elements-button-primary-hover--light-390.png      952
elements-button-primary-pressed--dark-1280.png  104587
elements-button-primary-pressed--dark-390.png    46100
elements-button-primary-pressed--light-1280.png 104857
elements-button-primary-pressed--light-390.png   46285
elements-button-primary-rest--dark-1280.png     105312
elements-button-primary-rest--dark-390.png       39715
elements-button-primary-rest--light-1280.png    104501
elements-button-primary-rest--light-390.png      39832
elements-button-states--dark-1280.png            21633
elements-button-states--dark-390.png             21231
elements-button-states--light-1280.png           21649
elements-button-states--light-390.png            21018
light-1280-console.json                             2
light-1280-steps.jsonl                           1063
light-1280.txt                                   1364
light-390-console.json                              2
light-390-steps.jsonl                            1058
light-390.txt                                    1364
steps-all.jsonl                                  4813
unknowns.txt                                      515
```

Every round-1 frame is present under its round-1 name at its round-1 state; the eight new frames
(`focus-ring` and `states` at each of `light-1280`, `light-390`, `dark-1280`, `dark-390`) are
present, and every `.txt` now carries a `# States` section after the original Variants ARIA
snapshot.

## The two frames opened

- `elements-button-primary-focus-ring--light-1280.png` (1280 x 1290 bytes): a tight element frame
  around the "Primary" specimen, padded 12px on every side. The frame shows a clearly visible
  light-blue focus ring wrapping the button's rounded border, distinct from the button's own fill
  — the ring that the full-page frame renders too faint to read at 1280px is unambiguous at this
  crop.
- `elements-button-states--light-1280.png`: an element frame of the "States" section, showing its
  heading, the descriptive paragraph naming `:focus-visible`, `.active`, `[disabled]`, and
  `.loading`, and the four demo buttons in a row: "Default · hover me" (rest), ".active" with a
  lighter selected fill, "[disabled]" rendered in a muted/grayed style, and "Loading" carrying a
  spinner glyph. The `Markup` disclosure sits below, collapsed.

## Settled dark background value

Read from `steps-all.jsonl`'s `settle` entries:

- `data-mode=light`: settled background `rgb(255, 255, 255)`.
- `data-mode=dark`: settled background `oklch(0.21 0.013 256)`.

The same value recurs across both widths for each mode (`1280` and `390`), so the two dark rest
frames now agree: `elements-button-primary-rest--dark-1280.png` (opened; see following section)
shows a fully dark chrome — background, sidebar, and cards — matching the already-dark
`elements-button-primary-rest--dark-390.png`, unlike round 1's mid-transition `dark-1280` frame.

**Caveat found while running the settle wait**: every `settle` entry reports `attempts=120`
(the loop's cap) and `animations=1` throughout, meaning `document.getAnimations().length` never
reached 0 within the 120-frame budget (about 2 seconds), even though the background value itself
was already stable frame-to-frame. This points to a persistent CSS animation elsewhere on the
page unrelated to the theme transition — most likely the `.loading` spinner glyph in the States
section (`ButtonPage.vue:308-310`), which spins continuously regardless of page state. The loop
still returns a useful reading because it records the background value even after hitting the
attempt cap, and the captured dark-1280 frame is visibly fully settled (confirmed by opening it),
so this caveat does not indicate a missed capture — it means the `animations.length === 0`
condition as specified never triggers on this page and the loop's cap, not its stability
condition, is what ends the wait in practice.

## Focus `box-shadow` reading per variant

Read from `steps-all.jsonl`'s `focus-ring clip` entries:

- `light-1280`: `oklab(0.48 -0.0266547 -0.253603 / 0.259127) 0px 0px 0px 1.72752px`
- `light-390`: `oklab(0.48 -0.0266547 -0.253603 / 0.155953) 0px 0px 0px 1.03969px`
- `dark-1280`: `oklab(0.7 -0.0902723 -0.119795 / 0.259127) 0px 0px 0px 1.72752px`
- `dark-390`: `oklab(0.7 -0.0902723 -0.119795 / 0.155939) 0px 0px 0px 1.0396px`

All four are non-empty, matching `_focus.scss:69-73`'s `color-mix` box-shadow recipe (the browser
resolves it to an `oklab()` function); the 1280 and 390 readings differ in alpha and spread
because `--set-focus-box-shadow-opacity`/`-width` scale with the viewport-dependent root font
size, and light/dark differ in hue because `--set-focus-color` resolves to the primary variant's
background token, which retunes per theme.

## `git status --porcelain` of the scaffold checkout

```text
(empty)
```

Nothing changed under version control; every output sits under `tmp/`, which the root
`.gitignore` file excludes.
