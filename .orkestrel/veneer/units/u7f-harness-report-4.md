# Unit U7f-harness — report 4

## The two changes as landed

`u7f-harness-4.mjs` is a copy of `u7f-harness-3.mjs` with two changes.

1. **Toggle snapshot at the pressed moment.** Between the first click on `TOGGLE_HOST` and the
   restoring click, when `aria-pressed` reads `"true"`, the script now also takes
   `toggleSection.ariaSnapshot()` and holds it in `pressedToggleAriaSnapshot`, beside the existing
   pressed-state triple (`aria-pressed`, class list, background color) and the pressed frame. The
   snapshot taken after the restoring click is now labelled the rest snapshot
   (`toggleRestAriaSnapshot`). The variant `.txt` write appends both: `# Toggle` carries the
   pressed-moment snapshot (or a named absence sentence when `aria-pressed` never read `"true"`),
   and `# Toggle (rest)` carries the snapshot taken after the restoring click.
2. **Settled box-shadow before the focus-ring shot.** Added `settleSpecimenBoxShadow`, the same
   settle shape as `settleSpecimenBackground` but polling `getComputedStyle(el).boxShadow` across
   two consecutive animation frames (120-attempt bound, unchanged). The focus-ring branch now
   calls it before reading the bounding box and before the clipped screenshot, so the shot and the
   recorded `box-shadow` both reflect the settled ring rather than mid-transition. The step log's
   `focus-ring clip` entry now records the settled reading, and its absence branch also reports
   the settle's `attempts`/`stableFrames`.

Every round-3 frame and artifact name is unchanged; no selector, section, or file name moved.

## Run console output

```
U7f-harness complete.
Output directory: C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements
- file:// boot: the showcase did NOT boot from file:// (module script or fetch refusal); fell back to a minimal node:http static server on an ephemeral port.
- Selectors used: variants-section specimen "#button-variants button.primary" (ButtonPage.vue:100-108, the button.primary inside #button-variants), pressed host "#button-toggle button.primary" (ButtonPage.vue:694, the button.primary inside #button-toggle). #button-toggle itself is a <section>, not the button; the brief's "#button-toggle" names that section.
```

One `node` call, no error, no leftover process (Chromium and the fallback static server both
close in the `finally` block before `main` returns).

## Output directory listing (byte sizes)

```
     1093 .
        0 ..
        0 ..
        2 dark-1280-console.json
     1492 dark-1280-steps.jsonl
     3327 dark-1280.txt
        2 dark-390-console.json
     1491 dark-390-steps.jsonl
     3327 dark-390.txt
      959 elements-button-primary-active--dark-1280.png
      952 elements-button-primary-active--dark-390.png
      955 elements-button-primary-active--light-1280.png
      960 elements-button-primary-active--light-390.png
   107445 elements-button-primary-focus--dark-1280.png
    44410 elements-button-primary-focus--dark-390.png
   106859 elements-button-primary-focus--light-1280.png
    44134 elements-button-primary-focus--light-390.png
     1318 elements-button-primary-focus-ring--dark-1280.png
     1315 elements-button-primary-focus-ring--dark-390.png
     1279 elements-button-primary-focus-ring--light-1280.png
     1284 elements-button-primary-focus-ring--light-390.png
      951 elements-button-primary-hover--dark-1280.png
      950 elements-button-primary-hover--dark-390.png
      934 elements-button-primary-hover--light-1280.png
      935 elements-button-primary-hover--light-390.png
   104609 elements-button-primary-pressed--dark-1280.png
    45997 elements-button-primary-pressed--dark-390.png
   104742 elements-button-primary-pressed--light-1280.png
    46198 elements-button-primary-pressed--light-390.png
   105529 elements-button-primary-rest--dark-1280.png
    40362 elements-button-primary-rest--dark-390.png
   104501 elements-button-primary-rest--light-1280.png
    39832 elements-button-primary-rest--light-390.png
    21655 elements-button-states--dark-1280.png
    21227 elements-button-states--dark-390.png
    21623 elements-button-states--light-1280.png
    21019 elements-button-states--light-390.png
        2 light-1280-console.json
     1500 light-1280-steps.jsonl
     3327 light-1280.txt
        2 light-390-console.json
     1495 light-390-steps.jsonl
     3327 light-390.txt
     6498 steps-all.jsonl
      515 unknowns.txt
```

Every round-3 artifact name is present, byte sizes unchanged for the frames; the `.txt` files grew
from round 3's size to carry the added `# Toggle (rest)` block.

## `# Toggle` block, `light-1280.txt`

```
# Toggle
- heading "useButton — toggle composable" [level=2]
- paragraph:
  - code: useButton
  - text: binds toggle semantics to a real
  - code: <button>
  - text: . Clicks flip an internal
  - code: active
  - text: ref, mirror to the host's
  - code: .active
  - text: class +
  - code: aria-pressed
  - text: attribute, and emit
  - code: elements:button:toggle
  - text: with the new value in
  - code: event.detail.active
  - text: . The factory throws if the host isn't an
  - code: HTMLButtonElement
  - text: — toggle semantics require button-role, period.
- button "On — click to turn off" [pressed]
- button "Toggle from outside"
- paragraph:
  - text: "Live state:"
  - code: active = true
- heading "Event log — newest first, max 6" [level=6]
- list:
  - listitem:
    - code: 04:11:10
    - text: ·
    - code: elements:button:toggle
    - text: →
    - code: "active: true"
- group: Markup
```

The `# Toggle` block announces the host pressed: `button "On — click to turn off" [pressed]`,
one event-log row, `active = true`. The `# Toggle (rest)` block that follows it in the same file
announces `button "Off — click to turn on"` (no `[pressed]`), `active = false`, and two event-log
rows (the toggle-on then the restoring toggle-off), which is the rest reading round 3 already
produced. The other three variants (`light-390`, `dark-1280`, `dark-390`) carry the identical
pressed/rest pair, module content unaffected by viewport or theme.

## Settled `box-shadow` per variant, beside round 3's transitional reading

Round 3's step log recorded one transitional reading, alpha `0.333519` at `2.22346px`, taken
immediately at the focus-ring shot with no settle wait. This round's step log records, per
variant, the settled `box-shadow` after the two-consecutive-frame wait:

| Variant     | Round 3 (transitional)                                       | Round 4 (settled)                                             |
| ----------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| light-1280  | `oklab(... / 0.333519) 0px 0px 0px 2.22346px` (reported alpha 0.333519, 2.22346px) | `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` |
| light-390   | same shape as light-1280                                       | `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` |
| dark-1280   | same shape as light-1280 (dark lightness channel)               | `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px`  |
| dark-390    | same shape as dark-1280                                         | `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px`  |

Every settled reading lands at alpha `0.45` and `3px` (`0.1875rem` at the default 16px root font
size), matching the objective lane's citation of Elements' declared ring (45%, `0.1875rem`). The
settle loop's `attempts`/`stableFrames` fields are recorded in each variant's `-steps.jsonl` beside
the `focus-ring clip` entry; none of the four variants exhausted the 120-attempt bound.

## `git status --porcelain` (scaffold checkout)

```
?? .orkestrel/veneer/units/content-layout-scout-brief.md
?? .orkestrel/veneer/units/content-layout-scout-report.md
```

Neither untracked file belongs to this unit; this unit wrote only
`u7f-harness-4.mjs`, `u7f-harness-report-4.md`, and the throwaway output under
`tmp/capture/elements/` (all `tmp/`-scoped, none tracked by git per the repository's `.gitignore`).

## Acceptance criteria

1. **Met.** One `node u7f-harness-4.mjs` call ran to completion; Chromium and the
   fallback static server both close in the `finally` block; no error, no leftover process.
2. **Met.** Every round-3 frame and artifact is present under its round-3 name (listing preceding).
   Each variant's `.txt` carries a `# Toggle` block announcing the host pressed
   (`button "On — click to turn off" [pressed]`) and a `# Toggle (rest)` block announcing it at
   rest (`button "Off — click to turn on"`). Each variant's step log records the settled
   `box-shadow` at the `focus-ring clip` entry (table preceding).
