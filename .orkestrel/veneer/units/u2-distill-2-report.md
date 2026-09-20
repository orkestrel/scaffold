# U2-distill report, run 2 (Grok, session 658afdc7-ab11-4eb4-9f1d-4107674d20b9, 488735 ms)

I'll read both briefs first, then follow their instructions exactly.The briefs restrict me to three files. I’ll read the instrument first, then both calibration JSON files.The JSON files are large, so I’ll pull structure, rest readings, motions, and unknowns with targeted searches rather than dumping them.Next I’ll pull every specimen’s rest, closed, and interactive-state readings from both browsers.Overlay and remaining specimen readings next, then motion first/settled frames and last-change times.I’ll read the remaining first frames, last-change frames, and Edge counterparts so the motion table can be filled.Question
From the calibration readings of Elements' showcase on managed Chromium and on Edge, what are the resolved foundation values per specimen, state, and mode, where do the two browsers differ, how does each motion behave frame by frame, and which readings are missing?

Evidence

### 0. Settled check

`color` / `background-color` / `border-top-color` at `rest` (or `closed` / `disabled`) are token endpoints (`oklch(...)`, `rgb(...)`, `rgba(...)`) except the rows named below. Every overlay `closed` rect is `0×0`. Chromium and Edge match.

| specimen | mode | state | color | background-color | border-top-color | closed rect | interpolation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| body-copy | light | rest | endpoint | endpoint | endpoint | n/a | — |
| body-copy | dark | rest | endpoint | endpoint | endpoint | n/a | — |
| heading-h1, heading-h2, heading-h3, heading-h4, heading-h5, heading-h6 | light | rest | endpoint | endpoint | endpoint | n/a | — |
| heading-h1, heading-h2, heading-h3, heading-h4, heading-h5, heading-h6 | dark | rest | endpoint | endpoint | endpoint | n/a | — |
| button-bare | light | rest | endpoint | endpoint | endpoint | n/a | — |
| button-bare | dark | rest | endpoint | endpoint | endpoint | n/a | — |
| button-primary | light | rest | endpoint | endpoint | endpoint | n/a | — |
| button-primary | dark | rest | endpoint | endpoint | endpoint | n/a | — |
| button-subtle | light | rest | endpoint | endpoint | endpoint | n/a | — |
| button-subtle | dark | rest | endpoint | endpoint | endpoint | n/a | — |
| button-small | light | rest | endpoint | endpoint | endpoint | n/a | — |
| button-small | dark | rest | endpoint | endpoint | endpoint | n/a | — |
| button-large | light | rest | endpoint | endpoint | endpoint | n/a | — |
| button-large | dark | rest | endpoint | endpoint | endpoint | n/a | — |
| button-disabled | light | disabled | endpoint | endpoint | endpoint | n/a | — |
| button-disabled | dark | disabled | endpoint | endpoint | endpoint | n/a | — |
| dialog-modal | light | closed | endpoint | endpoint | endpoint | 0×0 | — |
| dialog-modal | dark | closed | endpoint | endpoint | endpoint | 0×0 | — |
| dialog-nonmodal | light | closed | endpoint | endpoint | endpoint | 0×0 | — |
| dialog-nonmodal | dark | closed | endpoint | endpoint | endpoint | 0×0 | — |
| details | light | closed | endpoint | endpoint | endpoint | 520×43 (in flow) | — |
| details | dark | closed | endpoint | endpoint | endpoint | 520×43 (in flow) | — |
| popover | light | closed | endpoint | endpoint | endpoint | 0×0 | — |
| popover | dark | closed | endpoint | endpoint | endpoint | 0×0 | — |
| **popover-hint** | **light** | **closed** | `rgb(255, 255, 255)` endpoint | **`color(srgb 0.0571636 0.0900503 0.168809 / 0.95)` mix** | `rgba(0, 0, 0, 0)` endpoint | 0×0 | **interpolation** |
| **popover-hint** | **dark** | **closed** | `oklch(0.208 0.042 265.755)` endpoint | **`color(srgb 0.944349 0.960546 0.976583 / 0.95)` mix** | `rgba(0, 0, 0, 0)` endpoint | 0×0 | **interpolation** |
| aside-drawer | light | closed | endpoint | endpoint | endpoint | 0×0 | — |
| aside-drawer | dark | closed | endpoint | endpoint | endpoint | 0×0 | — |

Named interpolation rows: `popover-hint` light closed `background-color`; `popover-hint` dark closed `background-color`. Same strings on Edge.

### 1. Foundation table

Chromium `rest` (or `closed` / `disabled`). Beside each value: `same` when Edge’s string matches. First `font-family` only. Padding written `T/R/B/L`.

| specimen | mode | font-family | font-size | line-height | font-weight | padding | border-top-width | border-top-left-radius | color | background-color | border-top-color | box-shadow | outline | rect W×H |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| body-copy | light | system-ui same | 14px same | 21px same | 400 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×63 same |
| body-copy | dark | system-ui same | 14px same | 21px same | 400 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×63 same |
| heading-h1 | light | system-ui same | 36px same | 43.2px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×43.1875 same |
| heading-h1 | dark | system-ui same | 36px same | 43.2px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×43.1875 same |
| heading-h2 | light | system-ui same | 30px same | 36px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×36 same |
| heading-h2 | dark | system-ui same | 30px same | 36px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×36 same |
| heading-h3 | light | system-ui same | 24px same | 28.8px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×28.796875 same |
| heading-h3 | dark | system-ui same | 24px same | 28.8px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×28.796875 same |
| heading-h4 | light | system-ui same | 20px same | 24px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×24 same |
| heading-h4 | dark | system-ui same | 20px same | 24px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×24 same |
| heading-h5 | light | system-ui same | 18px same | 21.6px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×21.59375 same |
| heading-h5 | dark | system-ui same | 18px same | 21.6px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×21.59375 same |
| heading-h6 | light | system-ui same | 16px same | 19.2px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×19.1875 same |
| heading-h6 | dark | system-ui same | 16px same | 19.2px same | 600 same | 0/0/0/0 same | 0px same | 0px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×19.1875 same |
| button-bare | light | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 0px same | 6px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0) same | none same | oklch(0.208 0.042 265.755) none 3px same | 52.59375×33 same |
| button-bare | dark | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 0px same | 6px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0) same | none same | oklch(0.929 0.013 255.508) none 3px same | 52.59375×33 same |
| button-primary | light | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 1px same | 6px same | rgb(255, 255, 255) same | oklch(0.48 0.255 264) same | oklch(0.48 0.255 264) same | none same | rgb(255, 255, 255) none 3px same | 72.921875×35 same |
| button-primary | dark | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 1px same | 6px same | rgb(255, 255, 255) same | oklch(0.7 0.15 233) same | oklch(0.7 0.15 233) same | none same | rgb(255, 255, 255) none 3px same | 72.921875×35 same |
| button-subtle | light | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 1px same | 6px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0) same | none same | oklch(0.208 0.042 265.755) none 3px same | 151.421875×35 same |
| button-subtle | dark | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 1px same | 6px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0) same | none same | oklch(0.929 0.013 255.508) none 3px same | 151.421875×35 same |
| button-small | light | system-ui same | 12px same | 18px same | 400 same | 4/8/4/8 same | 1px same | 4px same | rgb(255, 255, 255) same | oklch(0.48 0.255 264) same | oklch(0.48 0.255 264) same | none same | rgb(255, 255, 255) none 3px same | 46.640625×28 same |
| button-small | dark | system-ui same | 12px same | 18px same | 400 same | 4/8/4/8 same | 1px same | 4px same | rgb(255, 255, 255) same | oklch(0.7 0.15 233) same | oklch(0.7 0.15 233) same | none same | rgb(255, 255, 255) none 3px same | 46.640625×28 same |
| button-large | light | system-ui same | 16px same | 24px same | 400 same | 8/16/8/16 same | 1px same | 8px same | rgb(255, 255, 255) same | oklch(0.48 0.255 264) same | oklch(0.48 0.255 264) same | none same | rgb(255, 255, 255) none 3px same | 73.03125×42 same |
| button-large | dark | system-ui same | 16px same | 24px same | 400 same | 8/16/8/16 same | 1px same | 8px same | rgb(255, 255, 255) same | oklch(0.7 0.15 233) same | oklch(0.7 0.15 233) same | none same | rgb(255, 255, 255) none 3px same | 73.03125×42 same |
| button-disabled | light | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 1px same | 6px same | rgb(255, 255, 255) same | oklch(0.48 0.255 264) same | oklch(0.48 0.255 264) same | none same | rgb(255, 255, 255) none 3px same | 86.34375×35 same |
| button-disabled | dark | system-ui same | 14px same | 21px same | 400 same | 6/12/6/12 same | 1px same | 6px same | rgb(255, 255, 255) same | oklch(0.7 0.15 233) same | oklch(0.7 0.15 233) same | none same | rgb(255, 255, 255) none 3px same | 86.34375×35 same |
| dialog-modal | light | system-ui same | 16px same | 24px same | 400 same | 16/16/16/16 same | 1px same | 8px same | rgb(0, 0, 0) same | rgb(255, 255, 255) same | oklch(0.869 0.022 252.894) same | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px same | rgb(0, 0, 0) none 3px same | 0×0 same |
| dialog-modal | dark | system-ui same | 16px same | 24px same | 400 same | 16/16/16/16 same | 1px same | 8px same | rgb(255, 255, 255) same | rgb(18, 18, 18) same | oklch(0.4 0.022 256) same | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px same | rgb(255, 255, 255) none 3px same | 0×0 same |
| dialog-nonmodal | light | system-ui same | 16px same | 24px same | 400 same | 16/16/16/16 same | 1px same | 8px same | rgb(0, 0, 0) same | rgb(255, 255, 255) same | oklch(0.869 0.022 252.894) same | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px same | rgb(0, 0, 0) none 3px same | 0×0 same |
| dialog-nonmodal | dark | system-ui same | 16px same | 24px same | 400 same | 16/16/16/16 same | 1px same | 8px same | rgb(255, 255, 255) same | rgb(18, 18, 18) same | oklch(0.4 0.022 256) same | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px same | rgb(255, 255, 255) none 3px same | 0×0 same |
| details | light | system-ui same | 14px same | 21px same | 400 same | 10/14/10/14 same | 1px same | 8px same | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.869 0.022 252.894) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×43 same |
| details | dark | system-ui same | 14px same | 21px same | 400 same | 10/14/10/14 same | 1px same | 8px same | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.4 0.022 256) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×43 same |
| popover | light | system-ui same | 14px same | 21px same | 400 same | 12/12/12/12 same | 1px same | 8px same | oklch(0.208 0.042 265.755) same | oklch(0.984 0.003 247.858) same | oklch(0.869 0.022 252.894) same | rgba(0, 0, 0, 0.06) 0px 2px 4px 0px, rgba(0, 0, 0, 0.12) 0px 8px 16px -4px same | oklch(0.208 0.042 265.755) none 3px same | 0×0 same |
| popover | dark | system-ui same | 14px same | 21px same | 400 same | 12/12/12/12 same | 1px same | 8px same | oklch(0.929 0.013 255.508) same | oklch(0.235 0.013 256) same | oklch(0.4 0.022 256) same | rgba(0, 0, 0, 0.06) 0px 2px 4px 0px, rgba(0, 0, 0, 0.12) 0px 8px 16px -4px same | oklch(0.929 0.013 255.508) none 3px same | 0×0 same |
| popover-hint | light | system-ui same | 12px same | 18px same | 400 same | 4/8/4/8 same | 1px same | 8px same | rgb(255, 255, 255) same | color(srgb 0.0571636 0.0900503 0.168809 / 0.95) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px same | rgb(255, 255, 255) none 3px same | 0×0 same |
| popover-hint | dark | system-ui same | 12px same | 18px same | 400 same | 4/8/4/8 same | 1px same | 8px same | oklch(0.208 0.042 265.755) same | color(srgb 0.944349 0.960546 0.976583 / 0.95) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px same | oklch(0.208 0.042 265.755) none 3px same | 0×0 same |
| aside-drawer | light | system-ui same | 14px same | 21px same | 400 same | 0/16/0/16 same | 1px same | 8px same | oklch(0.208 0.042 265.755) same | oklch(0.984 0.003 247.858) same | oklch(0.869 0.022 252.894) same | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px same | oklch(0.208 0.042 265.755) none 3px same | 0×0 same |
| aside-drawer | dark | system-ui same | 14px same | 21px same | 400 same | 0/16/0/16 same | 1px same | 8px same | oklch(0.929 0.013 255.508) same | oklch(0.235 0.013 256) same | oklch(0.4 0.022 256) same | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px same | oklch(0.929 0.013 255.508) none 3px same | 0×0 same |

Open rects (not foundation, for overlay completeness; Edge same): dialog-modal 480×236.40625; dialog-nonmodal 480×168; details 520×136.78125; popover 276×158.1875; popover-hint 200×46; aside-drawer 350×800. button-disabled also reads `opacity` `0.5` (not a foundation-table column).

### 2. State deltas

Interactive specimens: button-bare, button-primary, button-subtle, button-small, button-large. Unlisted properties equal `rest`. Edge strings match Chromium. Rect unchanged. `active` was sampled after `focus-visible` with no focus clear, so `active` carries the focus ring.

| specimen | mode | hover | focus-visible | active |
| --- | --- | --- | --- | --- |
| button-bare | light | background-color `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` | box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.00742457 0.0232852 0.0925134 / 0.22)`; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` |
| button-bare | dark | background-color `color(srgb 1 1 1 / 0.12)` | box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 1 1 1 / 0.22)`; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` |
| button-primary | light | background-color `color(srgb 0.0288046 0.226321 0.817248)` | box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.0263751 0.203249 0.734892)`; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` |
| button-primary | dark | background-color `color(srgb 0.0248835 0.714208 0.933359)` | box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.135692 0.746684 0.940932)`; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` |
| button-subtle | light | background-color `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` | box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.00742457 0.0232852 0.0925134 / 0.22)`; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` |
| button-subtle | dark | background-color `color(srgb 1 1 1 / 0.12)` | box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 1 1 1 / 0.22)`; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` |
| button-small | light | background-color `color(srgb 0.0288046 0.226321 0.817248)` | box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.0263751 0.203249 0.734892)`; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` |
| button-small | dark | background-color `color(srgb 0.0248835 0.714208 0.933359)` | box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.135692 0.746684 0.940932)`; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` |
| button-large | light | background-color `color(srgb 0.0288046 0.226321 0.817248)` | box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.0263751 0.203249 0.734892)`; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` |
| button-large | dark | background-color `color(srgb 0.0248835 0.714208 0.933359)` | box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` | background-color `color(srgb 0.135692 0.746684 0.940932)`; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` |

No interactive specimen/mode/state equals `rest` (none are `no change`).

### 3. Transitions

At rest/closed/disabled; Edge same. Deduplicated.

| specimens | transition-property | transition-duration | transition-timing-function |
| --- | --- | --- | --- |
| body-copy | all | 0s | ease |
| heading-h1, heading-h2, heading-h3, heading-h4, heading-h5, heading-h6 | color | 0.15s | ease |
| button-bare, button-primary, button-subtle, button-small, button-large, button-disabled | color, background-color, border-color, box-shadow, opacity | 0.15s, 0.15s, 0.15s, 0.15s, 0.15s | ease, ease, ease, ease, ease |
| dialog-modal, dialog-nonmodal | color, background-color, border-color, opacity, transform, overlay, display, position, inset-block-start, inset-inline-start, translate | 0.15s, 0.15s, 0.15s, 0.25s, 0.25s, 0.25s, 0.25s, 0s, 0s, 0s, 0s | ease, ease, ease, ease-out, cubic-bezier(0.32, 0.72, 0, 1), ease, ease, ease, ease, ease, ease |
| details | color, background-color, border-color | 0.15s, 0.15s, 0.15s | ease, ease, ease |
| popover, popover-hint | opacity, transform, overlay, display | 0.15s, 0.15s, 0.15s, 0.15s | ease, ease, ease, ease |
| aside-drawer | transform, opacity, overlay, display | 0.25s, 0.25s, 0.25s, 0.25s | cubic-bezier(0.32, 0.72, 0, 1), ease-out, ease, ease |

### 4. Motion table

`getAnimations()` is `0` on every pass. `settled` in JSON is the last sampled frame (`elapsedMs` is inside each frame, so consecutive frames never stringify-equal). Last-change = last frame where any sampled property (including pseudo/backdrop) differed from the previous frame. Reduced “interpolated” = more than one distinct intermediate value between first and settled.

| motion | pass | Chromium first | Chromium settled | Chromium last-change (ms) | Chromium any-last (ms) | Edge first | Edge settled | Edge last-change (ms) | Edge any-last (ms) | reduced interpolated |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| dialog-modal-open | ordinary | 17ms: opacity 0, transform none, translate -50% -50%, display none, backdrop rgba(0, 0, 0, 0) / none | opacity 1, transform none, translate -50% -50%, display flex, backdrop rgba(0, 0, 0, 0.5) / blur(2px) | display+backdrop 65.2; opacity+transform 337.2 | 337.2 | 18.2ms: same closed | same open | display+backdrop 68.6; opacity+transform 351.8 | 351.8 | n/a |
| dialog-modal-open | reduced | 16.3ms: same closed | same open | snap 64.9 | 64.9 | 16.6ms: same closed | same open | snap 75.5 | 75.5 | no |
| dialog-modal-close | ordinary | 0.9ms: opacity 1, transform none, translate -50% -50%, display flex, backdrop rgba(0, 0, 0, 0.5) / blur(2px) | opacity 0, transform none, translate -50% -50%, display none, backdrop rgba(0, 0, 0, 0) / none | opacity/transform/display/backdrop 320.3 | 320.3 | 4.2ms: same open | same closed | 339.9 | 339.9 | n/a |
| dialog-modal-close | reduced | 1.5ms: same open | same closed | snap 45.2 | 45.2 | 2ms: same open | same closed | snap 54.5 | 54.5 | no |
| dialog-nonmodal-open | ordinary | 10.4ms: opacity 0, transform none, translate -50% -50%, display none | opacity 1, transform none, translate none, display flex | display+translate 77.7 (transform matrix(1,0,0,1,0,-8) then Y-offset interpolates); opacity+transform 328.2 | 328.2 | 17.8ms: same closed | same open | opacity+transform 348.9 | 348.9 | n/a |
| dialog-nonmodal-open | reduced | 17.1ms: same closed | same open | snap 67.8 (translate to none) | 67.8 | 17.2ms: same closed | same open | snap after 54.6 (still closed at 54.6) | snap | no |
| dialog-nonmodal-close | ordinary | 1.7ms: opacity 1, transform none, translate none, display flex | opacity 0, transform none, translate -50% -50%, display none | 313.9 | 313.9 | (open) | same closed | 317.6 | 317.6 | n/a |
| dialog-nonmodal-close | reduced | 1.2ms: same open | same closed | snap 36.5 | 36.5 | 3.9ms: same open | same closed | snap after 35.7 (still open) | snap | no |
| details-open | ordinary | 12ms: element opacity 1 display block; ::details-content block-size 0px opacity 0 | element unchanged; ::details-content block-size 85.7812px opacity 1 | pseudo 328.4 | 328.4 | 7.4ms: same | same 85.7812px / 1 | 314.4 | 314.4 | n/a |
| details-open | reduced | 19.6ms: same 0px / 0 | same 85.7812px / 1 | pseudo 318.2 (course still interpolates from 84.3) | 318.2 | 11.8ms: same 0px / 0 | same 85.7812px / 1 | 329.8 (course interpolates from 82.7) | 329.8 | **yes** (both) |
| details-close | ordinary | 2ms: ::details-content 85.7812px / 1 | 0px / 0 | pseudo 307.1 | 307.1 | 1.2ms: 85.7812px / 1 | 0px / 0 | 317.8 | 317.8 | n/a |
| details-close | reduced | 2ms: 85.7812px / 1 | 0px / 0 | 318.9 (interpolates from 70.2) | 318.9 | (open) | 0px / 0 | 316.1 | 316.1 | **yes** (both) |
| popover-open | ordinary | 0.2ms: opacity 0, transform none, display none | opacity 1, transform none, display block | snap 60.8 | 60.8 | 9ms: same closed | same open | snap after 45 (still closed; no 0.x intermediates) | snap | n/a |
| popover-open | reduced | 8.5ms: same closed | same open | snap 76.4 | 76.4 | (closed prefix) | same open | snap, no 0.x | snap | no |
| popover-close | ordinary | 0.4ms: opacity 1, transform matrix(1, 0, 0, 1, 0, 0), display block | opacity 0, transform none, display none | 161.2 | 161.2 | (open) | same closed | 162.4 | 162.4 | n/a |
| popover-close | reduced | 17.8ms: already opacity 0 display none | same | **no motion observed** | — | 15.5ms: already closed | same | **no motion observed** | — | no |
| popover-hint-open | ordinary | 9.3ms: opacity 0 display none | opacity 1 display block | snap 74.4 | 74.4 | (closed prefix) | same open | snap, no 0.x | snap | n/a |
| popover-hint-open | reduced | 8ms: same closed | same open | snap 61.5 | 61.5 | (closed prefix) | same open | snap, no 0.x | snap | no |
| popover-hint-close | ordinary | 0.4ms: opacity 1, transform matrix(1, 0, 0, 1, 0, 0), display block | opacity 0, transform none, display none | 157.1 | 157.1 | (open) | same closed | 144.6 | 144.6 | n/a |
| popover-hint-close | reduced | 1.1ms: already opacity 0 display none | same | **no motion observed** | — | (already closed; no 0.x) | same | **no motion observed** | — | no |
| drawer-open | ordinary | 14.9ms: opacity 0, transform none, display none, backdrop rgba(0, 0, 0, 0) / none | opacity 1, transform matrix(1, 0, 0, 1, 0, 0), display flex, backdrop rgba(0, 0, 0, 0.5) / blur(2px) | display+backdrop 81 (transform matrix(1,0,0,1,350,0)); opacity+transform 348.9 | 348.9 | 23.8ms: same closed | same open (identity matrix) | 340.5 | 340.5 | n/a |
| drawer-open | reduced | 9ms: same closed | same open | snap 58.6 | 58.6 | 8.6ms: same closed | same open | snap after 41.6 (still closed) | snap | no |
| drawer-close | ordinary | 1.5ms: opacity 1, transform matrix(1, 0, 0, 1, 0, 0), display flex, backdrop rgba(0, 0, 0, 0.5) / blur(2px) | opacity 0, transform none, display none, backdrop rgba(0, 0, 0, 0) / none | 305.7 | 305.7 | (open) | same closed | 305.7 | 305.7 | n/a |
| drawer-close | reduced | 2.8ms: same open | same closed | snap 49.8 | 49.8 | (open) | same closed | snap | snap | no |

**::details-content course** (both browsers, ordinary and reduced): open `0px`/`0` → many intermediate block-size and opacity samples → `85.7812px`/`1`. Close reverse (`85.7812px`/`1` → intermediates → `0px`/`0`). Reduced still interpolates.

**::backdrop course** (dialog-modal and drawer): ordinary open jumps to `rgba(0, 0, 0, 0.5)` / `blur(2px)` when `display` becomes flex and holds. Ordinary close interpolates backdrop-color and blur down to `rgba(0, 0, 0, 0)` / `none`. Reduced snaps between those two endpoints. dialog-nonmodal, popover, popover-hint: no backdrop samples (`backdrop: false`).

Browsers differ on interpolation sample strings and last-change milliseconds, not on settled endpoints.

### 5. Unknowns

Both files. Reason always `no bounding box for screenshot`. No `message` field; verbatim reason used.

| group (specimen / context, reason) | count (Chromium+Edge) | verbatim |
| --- | --- | --- |
| dialog-modal closed (light, dark) | 4 | no bounding box for screenshot |
| dialog-nonmodal closed (light, dark) | 4 | no bounding box for screenshot |
| popover closed (light, dark) | 4 | no bounding box for screenshot |
| popover-hint closed (light, dark) | 4 | no bounding box for screenshot |
| aside-drawer closed (light, dark) | 4 | no bounding box for screenshot |
| dialog-modal-close (ordinary+reduced settled shot) | 4 | no bounding box for screenshot |
| dialog-nonmodal-close (ordinary+reduced settled shot) | 4 | no bounding box for screenshot |
| popover-close (ordinary+reduced settled shot) | 4 | no bounding box for screenshot |
| popover-hint-close (ordinary+reduced settled shot) | 4 | no bounding box for screenshot |
| drawer-close (ordinary+reduced settled shot) | 4 | no bounding box for screenshot |

### 6. Browser identity

| file | browser | version | date | showcaseDigest |
| --- | --- | --- | --- | --- |
| chromium/calibration.json | chromium | 153.0.8010.12 | 2026-09-20T07:23:39.151Z | cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792 |
| msedge/calibration.json | msedge | 153.0.4234.48 | 2026-09-20T07:26:09.639Z | cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792 |

Digest matches `SHOWCASE_DIGEST` in `calibration.mjs`. Motions sample `opacity`, `transform`, `translate`, `display` plus `::details-content` `block-size`/`opacity` or `::backdrop` `background-color`/`backdrop-filter`, once per animation frame for 700 ms.

Distillate

| specimen | mode | font-family | font-size | line-height | font-weight | padding T/R/B/L | bw | radius | color | background-color | border-top-color | box-shadow | outline | rect | Edge |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| body-copy | light | system-ui | 14px | 21px | 400 | 0/0/0/0 | 0px | 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×63 | same |
| body-copy | dark | system-ui | 14px | 21px | 400 | 0/0/0/0 | 0px | 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×63 | same |
| heading-h1 | light | system-ui | 36px | 43.2px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×43.1875 | same |
| heading-h1 | dark | system-ui | 36px | 43.2px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×43.1875 | same |
| heading-h2 | light | system-ui | 30px | 36px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×36 | same |
| heading-h2 | dark | system-ui | 30px | 36px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×36 | same |
| heading-h3 | light | system-ui | 24px | 28.8px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×28.796875 | same |
| heading-h3 | dark | system-ui | 24px | 28.8px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×28.796875 | same |
| heading-h4 | light | system-ui | 20px | 24px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×24 | same |
| heading-h4 | dark | system-ui | 20px | 24px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×24 | same |
| heading-h5 | light | system-ui | 18px | 21.6px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×21.59375 | same |
| heading-h5 | dark | system-ui | 18px | 21.6px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×21.59375 | same |
| heading-h6 | light | system-ui | 16px | 19.2px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×19.1875 | same |
| heading-h6 | dark | system-ui | 16px | 19.2px | 600 | 0/0/0/0 | 0px | 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×19.1875 | same |
| button-bare | light | system-ui | 14px | 21px | 400 | 6/12/6/12 | 0px | 6px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | none | oklch(0.208 0.042 265.755) none 3px | 52.59375×33 | same |
| button-bare | dark | system-ui | 14px | 21px | 400 | 6/12/6/12 | 0px | 6px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | none | oklch(0.929 0.013 255.508) none 3px | 52.59375×33 | same |
| button-primary | light | system-ui | 14px | 21px | 400 | 6/12/6/12 | 1px | 6px | rgb(255, 255, 255) | oklch(0.48 0.255 264) | oklch(0.48 0.255 264) | none | rgb(255, 255, 255) none 3px | 72.921875×35 | same |
| button-primary | dark | system-ui | 14px | 21px | 400 | 6/12/6/12 | 1px | 6px | rgb(255, 255, 255) | oklch(0.7 0.15 233) | oklch(0.7 0.15 233) | none | rgb(255, 255, 255) none 3px | 72.921875×35 | same |
| button-subtle | light | system-ui | 14px | 21px | 400 | 6/12/6/12 | 1px | 6px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | none | oklch(0.208 0.042 265.755) none 3px | 151.421875×35 | same |
| button-subtle | dark | system-ui | 14px | 21px | 400 | 6/12/6/12 | 1px | 6px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | none | oklch(0.929 0.013 255.508) none 3px | 151.421875×35 | same |
| button-small | light | system-ui | 12px | 18px | 400 | 4/8/4/8 | 1px | 4px | rgb(255, 255, 255) | oklch(0.48 0.255 264) | oklch(0.48 0.255 264) | none | rgb(255, 255, 255) none 3px | 46.640625×28 | same |
| button-small | dark | system-ui | 12px | 18px | 400 | 4/8/4/8 | 1px | 4px | rgb(255, 255, 255) | oklch(0.7 0.15 233) | oklch(0.7 0.15 233) | none | rgb(255, 255, 255) none 3px | 46.640625×28 | same |
| button-large | light | system-ui | 16px | 24px | 400 | 8/16/8/16 | 1px | 8px | rgb(255, 255, 255) | oklch(0.48 0.255 264) | oklch(0.48 0.255 264) | none | rgb(255, 255, 255) none 3px | 73.03125×42 | same |
| button-large | dark | system-ui | 16px | 24px | 400 | 8/16/8/16 | 1px | 8px | rgb(255, 255, 255) | oklch(0.7 0.15 233) | oklch(0.7 0.15 233) | none | rgb(255, 255, 255) none 3px | 73.03125×42 | same |
| button-disabled | light | system-ui | 14px | 21px | 400 | 6/12/6/12 | 1px | 6px | rgb(255, 255, 255) | oklch(0.48 0.255 264) | oklch(0.48 0.255 264) | none | rgb(255, 255, 255) none 3px | 86.34375×35 | same |
| button-disabled | dark | system-ui | 14px | 21px | 400 | 6/12/6/12 | 1px | 6px | rgb(255, 255, 255) | oklch(0.7 0.15 233) | oklch(0.7 0.15 233) | none | rgb(255, 255, 255) none 3px | 86.34375×35 | same |
| dialog-modal | light | system-ui | 16px | 24px | 400 | 16/16/16/16 | 1px | 8px | rgb(0, 0, 0) | rgb(255, 255, 255) | oklch(0.869 0.022 252.894) | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px | rgb(0, 0, 0) none 3px | 0×0 | same |
| dialog-modal | dark | system-ui | 16px | 24px | 400 | 16/16/16/16 | 1px | 8px | rgb(255, 255, 255) | rgb(18, 18, 18) | oklch(0.4 0.022 256) | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px | rgb(255, 255, 255) none 3px | 0×0 | same |
| dialog-nonmodal | light | system-ui | 16px | 24px | 400 | 16/16/16/16 | 1px | 8px | rgb(0, 0, 0) | rgb(255, 255, 255) | oklch(0.869 0.022 252.894) | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px | rgb(0, 0, 0) none 3px | 0×0 | same |
| dialog-nonmodal | dark | system-ui | 16px | 24px | 400 | 16/16/16/16 | 1px | 8px | rgb(255, 255, 255) | rgb(18, 18, 18) | oklch(0.4 0.022 256) | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px | rgb(255, 255, 255) none 3px | 0×0 | same |
| details | light | system-ui | 14px | 21px | 400 | 10/14/10/14 | 1px | 8px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.869 0.022 252.894) | none | oklch(0.208 0.042 265.755) none 3px | 520×43 | same |
| details | dark | system-ui | 14px | 21px | 400 | 10/14/10/14 | 1px | 8px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.4 0.022 256) | none | oklch(0.929 0.013 255.508) none 3px | 520×43 | same |
| popover | light | system-ui | 14px | 21px | 400 | 12/12/12/12 | 1px | 8px | oklch(0.208 0.042 265.755) | oklch(0.984 0.003 247.858) | oklch(0.869 0.022 252.894) | rgba(0, 0, 0, 0.06) 0px 2px 4px 0px, rgba(0, 0, 0, 0.12) 0px 8px 16px -4px | oklch(0.208 0.042 265.755) none 3px | 0×0 | same |
| popover | dark | system-ui | 14px | 21px | 400 | 12/12/12/12 | 1px | 8px | oklch(0.929 0.013 255.508) | oklch(0.235 0.013 256) | oklch(0.4 0.022 256) | rgba(0, 0, 0, 0.06) 0px 2px 4px 0px, rgba(0, 0, 0, 0.12) 0px 8px 16px -4px | oklch(0.929 0.013 255.508) none 3px | 0×0 | same |
| popover-hint | light | system-ui | 12px | 18px | 400 | 4/8/4/8 | 1px | 8px | rgb(255, 255, 255) | color(srgb 0.0571636 0.0900503 0.168809 / 0.95) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px | rgb(255, 255, 255) none 3px | 0×0 | same |
| popover-hint | dark | system-ui | 12px | 18px | 400 | 4/8/4/8 | 1px | 8px | oklch(0.208 0.042 265.755) | color(srgb 0.944349 0.960546 0.976583 / 0.95) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px | oklch(0.208 0.042 265.755) none 3px | 0×0 | same |
| aside-drawer | light | system-ui | 14px | 21px | 400 | 0/16/0/16 | 1px | 8px | oklch(0.208 0.042 265.755) | oklch(0.984 0.003 247.858) | oklch(0.869 0.022 252.894) | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px | oklch(0.208 0.042 265.755) none 3px | 0×0 | same |
| aside-drawer | dark | system-ui | 14px | 21px | 400 | 0/16/0/16 | 1px | 8px | oklch(0.929 0.013 255.508) | oklch(0.235 0.013 256) | oklch(0.4 0.022 256) | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px | oklch(0.929 0.013 255.508) none 3px | 0×0 | same |

Unknowns
dialog-modal closed × light/dark: 4, no bounding box for screenshot
dialog-nonmodal closed × light/dark: 4, no bounding box for screenshot
popover closed × light/dark: 4, no bounding box for screenshot
popover-hint closed × light/dark: 4, no bounding box for screenshot
aside-drawer closed × light/dark: 4, no bounding box for screenshot
dialog-modal-close: 4, no bounding box for screenshot
dialog-nonmodal-close: 4, no bounding box for screenshot
popover-close: 4, no bounding box for screenshot
popover-hint-close: 4, no bounding box for screenshot
drawer-close: 4, no bounding box for screenshot

Journal
unavailable (not in the three allowed files)

Deviation
Session id is not in the three allowed files. Exact Edge snap elapsed is missing for popover-open reduced, popover-hint-open ordinary and reduced, dialog-nonmodal-open reduced, dialog-nonmodal-close reduced, drawer-open reduced, and drawer-close reduced; those passes have no intermediate 0.x opacity and are snaps or already-closed. `getAnimations()` is recorded at sample start and is 0 on every motion.
