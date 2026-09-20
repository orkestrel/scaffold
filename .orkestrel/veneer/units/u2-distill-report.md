# U2-distill report (Grok, session 6bd3fb30-0f95-452e-a3f7-cb44d433f2f5, 473133 ms)

I'll read the brief first, then follow it exactly and return only the specified output.I'll read only the three files the brief names, then distill the calibration table from them.The JSON files are large, so I’ll map specimen, motion, and unknowns locations first, then pull the rest-state and motion fields the brief asks for.Specimen line numbers match across browsers. Next I’ll pull rest and interactive states, then compare Edge against Chromium.Chromium has interpolated oklab rest values Edge does not. I’ll read Edge’s matching rest and state blocks next, then first and settled motion frames.Question
From the calibration readings of Elements' showcase on managed Chromium and on Edge, what are the resolved foundation values per specimen, state, and mode, where do the two browsers differ, how does each motion behave frame by frame, and which readings are missing?

Evidence

**Meaning of a reading.** `readElementStyle` copies `getComputedStyle` for `PROPERTIES` plus `getBoundingClientRect` width/height. Motions sample `opacity`, `transform`, `translate`, `display` once per `requestAnimationFrame` for 700 ms, plus `::details-content` `block-size`/`opacity` or `::backdrop` `background-color`/`backdrop-filter`. `getAnimations().length` is taken on the first evaluate tick, not per frame. JSON `settled` is the last sampled frame: `firstSettledFrame` stringifies the whole frame, including `elapsedMs`, so consecutive frames never compare equal. Overlay specimens have no `rest` (closed/open). `button-disabled` has no `rest` (disabled only). Foundation rows below use `rest`, else `closed`, else `disabled`.

### 1. Foundation table

Chromium value; Edge is `same` or the Edge string. `font-family` is the first family only (`system-ui` for every row). Shared padding/radius/border-width are listed once per specimen.

| specimen | mode | state | font-size / line-height / weight | pad T R B L | border-top-w / radius | color | background-color | border-top-color | box-shadow | outline | rect W×H |
|---|---|---|---|---|---|---|---|---|---|---|---|
| body-copy | light | rest | 14px / 21px / 400 | 0 0 0 0 | 0px / 0px | oklch(0.208 0.042 265.755) same | rgba(0, 0, 0, 0) same | oklch(0.208 0.042 265.755) same | none same | oklch(0.208 0.042 265.755) none 3px same | 520×63 same |
| body-copy | dark | rest | 14px / 21px / 400 | 0 0 0 0 | 0px / 0px | oklch(0.929 0.013 255.508) same | rgba(0, 0, 0, 0) same | oklch(0.929 0.013 255.508) same | none same | oklch(0.929 0.013 255.508) none 3px same | 520×63 same |
| heading-h1 | light | rest | 36px / 43.2px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | oklab(0.929 -0.00325318 -0.0125864) same | none same | oklab(0.929 -0.00325318 -0.0125864) none 3px same | 520×43.1875 same |
| heading-h1 | dark | rest | 36px / 43.2px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.26215 -0.00311973 -0.0396844) \| Edge oklab(0.208 -0.00310889 -0.0418848) | rgba(0, 0, 0, 0) same | same split as color | none same | outline matches color on each browser | 520×43.1875 same |
| heading-h2 | light | rest | 30px / 36px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | matches color same | none same | matches color same | 520×36 same |
| heading-h2 | dark | rest | 30px / 36px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.208 -0.00310889 -0.0418848) same | rgba(0, 0, 0, 0) same | matches color same | none same | matches color same | 520×36 same |
| heading-h3 | light | rest | 24px / 28.8px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | matches color same | none same | matches color same | 520×28.796875 same |
| heading-h3 | dark | rest | 24px / 28.8px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.262266 -0.00311975 -0.0396796) \| Edge oklab(0.208 -0.00310889 -0.0418848) | rgba(0, 0, 0, 0) same | matches color | none same | matches color | 520×28.796875 same |
| heading-h4 | light | rest | 20px / 24px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | matches color same | none same | matches color same | 520×24 same |
| heading-h4 | dark | rest | 20px / 24px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.208 -0.00310889 -0.0418848) same | rgba(0, 0, 0, 0) same | matches color same | none same | matches color same | 520×24 same |
| heading-h5 | light | rest | 18px / 21.6px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | matches color same | none same | matches color same | 520×21.59375 same |
| heading-h5 | dark | rest | 18px / 21.6px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.34822 -0.00313695 -0.0361868) \| Edge oklab(0.21951 -0.0031112 -0.0414171) | rgba(0, 0, 0, 0) same | matches color | none same | matches color | 520×21.59375 same |
| heading-h6 | light | rest | 16px / 19.2px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | matches color same | none same | matches color same | 520×19.1875 same |
| heading-h6 | dark | rest | 16px / 19.2px / 600 | 0 0 0 0 | 0px / 0px | oklab(0.347918 -0.00313689 -0.0361991) \| Edge oklab(0.208 -0.00310889 -0.0418848) | rgba(0, 0, 0, 0) same | matches color | none same | matches color | 520×19.1875 same |
| button-bare | light | rest | 14px / 21px / 400 | 6 12 6 12 | 0px / 6px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0) same | none same | oklab(0.929 -0.00325318 -0.0125864) none 3px same | 52.59375×33 same |
| button-bare | dark | rest | 14px / 21px / 400 | 6 12 6 12 | 0px / 6px | oklab(0.907005 -0.00324878 -0.0134802) \| Edge oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0) same | oklab(0.48 -0.0266547 -0.253603 / 0.013728) 0px 0px 0px 0.0915199px \| Edge none | outline matches color | 52.59375×33 same |
| button-primary | light | rest | 14px / 21px / 400 | 6 12 6 12 | 1px / 6px | rgb(255, 255, 255) same | oklab(0.48154 -0.0271002 -0.252666) \| Edge oklab(0.7 -0.0902723 -0.119795) | matches bg | none same | rgb(255, 255, 255) none 3px same | 72.921875×35 same |
| button-primary | dark | rest | 14px / 21px / 400 | 6 12 6 12 | 1px / 6px | rgb(255, 255, 255) same | oklch(0.7 0.15 233) same | oklch(0.7 0.15 233) same | none same | rgb(255, 255, 255) none 3px same | 72.921875×35 same |
| button-subtle | light | rest | 14px / 21px / 400 | 6 12 6 12 | 1px / 6px | oklab(0.229958 -0.00311329 -0.0409925) \| Edge oklab(0.2098 -0.00310925 -0.0418116) | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0) same | none same | outline matches color | 151.421875×35 same |
| button-subtle | dark | rest | 14px / 21px / 400 | 6 12 6 12 | 1px / 6px | oklab(0.208 -0.00310889 -0.0418848) \| Edge oklch(0.929 0.013 255.508) | oklab(0.129 -0.00388322 -0.0418201 / 0.0317977) \| Edge rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) same | oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px \| Edge none | outline matches color | 151.421875×35 same |
| button-small | light | rest | 12px / 18px / 400 | 4 8 4 8 | 1px / 4px | rgb(255, 255, 255) same | oklab(0.7 -0.0902723 -0.119795) same | matches bg same | none same | rgb(255, 255, 255) none 3px same | 46.640625×28 same |
| button-small | dark | rest | 12px / 18px / 400 | 4 8 4 8 | 1px / 4px | rgb(255, 255, 255) same | oklab(0.44794 -0.0246208 -0.23502) \| Edge oklab(0.446834 -0.0245507 -0.23438) | oklab(0.48 -0.0266547 -0.253603) same | oklab(0.48 -0.0266547 -0.253603 / 0.446781) 0px 0px 0px 2.97854px \| Edge oklab(0.48 -0.0266547 -0.253603 / 0.448819) 0px 0px 0px 2.99212px | rgb(255, 255, 255) none 3px same | 46.640625×28 same |
| button-large | light | rest | 16px / 24px / 400 | 8 16 8 16 | 1px / 8px | rgb(255, 255, 255) same | oklab(0.7 -0.0902723 -0.119795) same | matches bg same | none same | rgb(255, 255, 255) none 3px same | 73.03125×42 same |
| button-large | dark | rest | 16px / 24px / 400 | 8 16 8 16 | 1px / 8px | rgb(255, 255, 255) same | oklab(0.447934 -0.0246204 -0.235017) \| Edge oklab(0.446711 -0.0245429 -0.234309) | oklab(0.48 -0.0266547 -0.253603) same | oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px \| Edge oklab(0.48 -0.0266547 -0.253603 / 0.448998) 0px 0px 0px 2.99332px | rgb(255, 255, 255) none 3px same | 73.03125×42 same |
| button-disabled | light | disabled | 14px / 21px / 400 | 6 12 6 12 | 1px / 6px | rgb(255, 255, 255) same | oklab(0.51245 -0.0360382 -0.233867) \| Edge oklch(0.48 0.255 264) | matches bg | none same | rgb(255, 255, 255) none 3px same | 86.34375×35 same |
| button-disabled | dark | disabled | 14px / 21px / 400 | 6 12 6 12 | 1px / 6px | rgb(255, 255, 255) same | oklab(0.683475 -0.0854937 -0.129846) \| Edge oklab(0.670476 -0.0817349 -0.137752) | matches bg | none same | rgb(255, 255, 255) none 3px same | 86.34375×35 same |
| dialog-modal | light | closed | 16px / 24px / 400 | 16 16 16 16 | 1px / 8px | rgb(0, 0, 0) same | rgb(255, 255, 255) same | oklch(0.869 0.022 252.894) same | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px same | rgb(0, 0, 0) none 3px same | 0×0 same |
| dialog-modal | dark | closed | 16px / 24px / 400 | 16 16 16 16 | 1px / 8px | rgb(0, 0, 0) same | rgb(255, 255, 255) same | oklab(0.869 -0.00647109 -0.0210268) same | same dialog shadow | rgb(0, 0, 0) none 3px same | 467.4089050292969×230.2049560546875 \| Edge 466.6010437011719×229.80709838867188 |
| dialog-nonmodal | light | closed | 16px / 24px / 400 | 16 16 16 16 | 1px / 8px | rgb(0, 0, 0) same | rgb(255, 255, 255) same | oklch(0.869 0.022 252.894) same | same dialog shadow | rgb(0, 0, 0) none 3px same | 0×0 same |
| dialog-nonmodal | dark | closed | 16px / 24px / 400 | 16 16 16 16 | 1px / 8px | rgb(0, 0, 0) \| Edge rgb(33, 33, 33) | rgb(255, 255, 255) \| Edge rgb(225, 225, 225) | oklab(0.869 -0.00647109 -0.0210268) \| Edge oklab(0.809103 -0.00632437 -0.0210676) | same dialog shadow | rgb(0, 0, 0) none 3px \| Edge rgb(33, 33, 33) none 3px | 461.5092468261719×161.52825927734375 \| Edge 466.655029296875×163.32928466796875 |
| details | light | closed | 14px / 21px / 400 | 10 14 10 14 | 1px / 8px | oklab(0.929 -0.00325318 -0.0125864) same | rgba(0, 0, 0, 0) same | oklab(0.4 -0.00532228 -0.0213465) same | none same | matches color same | 520×43 same |
| details | dark | closed | 14px / 21px / 400 | 10 14 10 14 | 1px / 8px | oklch(0.929 0.013 255.508) \| Edge oklab(0.208 -0.00310889 -0.0418848) | rgba(0, 0, 0, 0) same | oklch(0.4 0.022 256) \| Edge oklab(0.869 -0.00647109 -0.0210268) | none same | outline matches color | 520×43 \| Edge 520×58.578125 |
| popover | light | closed | 14px / 21px / 400 | 12 12 12 12 | 1px / 8px | oklch(0.208 0.042 265.755) same | oklch(0.984 0.003 247.858) same | oklch(0.869 0.022 252.894) same | rgba(0, 0, 0, 0.06) 0px 2px 4px 0px, rgba(0, 0, 0, 0.12) 0px 8px 16px -4px same | oklch(0.208 0.042 265.755) none 3px same | 0×0 same |
| popover | dark | closed | 14px / 21px / 400 | 12 12 12 12 | 1px / 8px | oklch(0.929 0.013 255.508) same | oklch(0.235 0.013 256) same | oklch(0.4 0.022 256) same | same popover shadow | matches color same | 272.81982421875×156.36477661132812 \| Edge 273.8980712890625×156.9827880859375 |
| popover-hint | light | closed | 12px / 18px / 400 | 4 8 4 8 | 1px / 8px | rgb(255, 255, 255) same | color(srgb 0.0571636 0.0900503 0.168809 / 0.95) same | rgba(0, 0, 0, 0) same | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px same | rgb(255, 255, 255) none 3px same | 0×0 same |
| popover-hint | dark | closed | 12px / 18px / 400 | 4 8 4 8 | 1px / 8px | oklch(0.208 0.042 265.755) same | color(srgb 0.944349 0.960546 0.976583 / 0.95) same | rgba(0, 0, 0, 0) same | same hint shadow | matches color same | 197.034423828125×45.317901611328125 \| Edge 197.53970336914062×45.43414306640625 |
| aside-drawer | light | closed | 14px / 21px / 400 | 0 16 0 16 | 1px / 8px | oklch(0.208 0.042 265.755) same | oklch(0.984 0.003 247.858) same | oklch(0.869 0.022 252.894) same | same hint shadow | matches color same | 0×0 same |
| aside-drawer | dark | closed | 14px / 21px / 400 | 0 16 0 16 | 1px / 8px | oklch(0.929 0.013 255.508) same | oklch(0.235 0.013 256) same | oklch(0.4 0.022 256) same | same hint shadow | matches color same | 350×800 same |

Many heading/button/disabled `oklab(...)` rest strings are interpolated mid-`transition` (0.15s color), not the token endpoint. Overlay `closed` in dark often has non-zero opacity/transform/rect (close still running). Those are not foundation endpoints.

### 2. State deltas

Interactive specimens: `button-bare`, `button-primary`, `button-subtle`, `button-small`, `button-large`. Properties below are those that differ from that specimen's `rest` in the same mode. Rect never changes.

| specimen | mode | hover | focus-visible | active |
|---|---|---|---|---|
| button-bare | light | color `oklch(0.208 0.042 265.755)` same; background-color `oklab(0 0 0 / 0)` same; outline matches color same | color `oklch(0.208 0.042 265.755)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same; outline matches color same | color `oklch(0.208 0.042 265.755)` same; background-color `oklab(0 0 0 / 0)` same; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.333512) 0px 0px 0px 2.22341px` \| Edge `oklab(0.48 -0.0266547 -0.253603 / 0.272664) 0px 0px 0px 1.81776px`; outline matches color |
| button-bare | dark | color `oklch(0.929 0.013 255.508)` same; background-color `oklab(0 0 0 / 0)` \| Edge `oklab(0.999994 0.0000455678 0.0000200868 / 0.0146231)`; box-shadow `none` same; outline matches color | color `oklch(0.929 0.013 255.508)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same; outline matches color | color `oklch(0.929 0.013 255.508)` same; background-color `oklab(0 0 0 / 0)` same; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.333512) 0px 0px 0px 2.22341px` \| Edge `oklab(0.7 -0.0902723 -0.119795 / 0.396499) 0px 0px 0px 2.64333px` |
| button-primary | light | background-color `oklab(0.48 -0.0266547 -0.253603)` same; border-top-color `oklch(0.48 0.255 264)` same | background-color `oklch(0.48 0.255 264)` same; border-top-color `oklch(0.48 0.255 264)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same | background-color `oklab(0.48 -0.0266547 -0.253603)` same; border-top-color `oklch(0.48 0.255 264)` same; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.333512) 0px 0px 0px 2.22341px` (Edge rest was already `oklab(0.7…)`, so hover/active also read as a move toward indigo) |
| button-primary | dark | background-color `oklab(0.7 -0.0902723 -0.119795)` same; border-top-color `oklch(0.7 0.15 233)` same | background-color `oklch(0.7 0.15 233)` same; border-top-color `oklch(0.7 0.15 233)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same | background-color `oklab(0.7 -0.0902723 -0.119795)` same; border-top-color `oklch(0.7 0.15 233)` same; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.333512) 0px 0px 0px 2.22341px` |
| button-subtle | light | color `oklch(0.208 0.042 265.755)` same; background-color `oklab(0 0 0 / 0)` same; outline matches color | color `oklch(0.208 0.042 265.755)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same | color `oklch(0.208 0.042 265.755)` same; background-color `oklab(0 0 0 / 0)` same; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.259127) 0px 0px 0px 1.72752px` |
| button-subtle | dark | color `oklch(0.929 0.013 255.508)` same; background-color `oklab(0 0 0 / 0)` same; box-shadow `none` same | color `oklch(0.929 0.013 255.508)` same; box-shadow Chromium `oklab(0.7 -0.0902723 -0.119795 / 0.0506801) 0px 0px 0px 0.337868px` \| Edge `oklab(0 0 0 / 0) 0px 0px 0px 0px` | color `oklch(0.929 0.013 255.508)` same; background-color `oklab(0 0 0 / 0)` same; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.333512) 0px 0px 0px 2.22341px` |
| button-small | light | background-color `oklab(0.48 -0.0266547 -0.253603)` same; border-top-color `oklch(0.48 0.255 264)` same | background-color `oklch(0.48 0.255 264)` same; border-top-color `oklch(0.48 0.255 264)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same | same hover colors; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.259127) 0px 0px 0px 1.72752px` |
| button-small | dark | background-color `oklab(0.7 -0.0902723 -0.119795)` same; border-top-color `oklch(0.7 0.15 233)` same; box-shadow `none` same | background-color `oklch(0.7 0.15 233)` same; border-top-color `oklch(0.7 0.15 233)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same | same hover colors; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.259127) 0px 0px 0px 1.72752px` |
| button-large | light | background-color `oklab(0.48 -0.0266547 -0.253603)` same; border-top-color `oklch(0.48 0.255 264)` same | background-color `oklch(0.48 0.255 264)` same; border-top-color `oklch(0.48 0.255 264)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same | same hover colors; box-shadow `oklab(0.48 -0.0266547 -0.253603 / 0.333512) 0px 0px 0px 2.22341px` |
| button-large | dark | background-color `oklab(0.7 -0.0902723 -0.119795)` same; border-top-color `oklch(0.7 0.15 233)` same; box-shadow `none` same | background-color `oklch(0.7 0.15 233)` same; border-top-color `oklch(0.7 0.15 233)` same; box-shadow `oklab(0 0 0 / 0) 0px 0px 0px 0px` same | same hover colors; box-shadow `oklab(0.7 -0.0902723 -0.119795 / 0.259127) 0px 0px 0px 1.72752px` |

`button-disabled` has no hover/focus-visible/active. Overlays have no hover/focus-visible/active.

### 3. Transitions

Deduplicated `rest`/`closed`/`disabled` strings (same on Chromium and Edge):

| group | transition-property | transition-duration | transition-timing-function |
|---|---|---|---|
| body-copy | all | 0s | ease |
| heading-h1 heading-h2 heading-h3 heading-h4 heading-h5 heading-h6 | color | 0.15s | ease |
| button-bare button-primary button-subtle button-small button-large button-disabled | color, background-color, border-color, box-shadow, opacity | 0.15s, 0.15s, 0.15s, 0.15s, 0.15s | ease, ease, ease, ease, ease |
| details | color, background-color, border-color | 0.15s, 0.15s, 0.15s | ease, ease, ease |
| dialog-modal dialog-nonmodal | color, background-color, border-color, opacity, transform, overlay, display, position, inset-block-start, inset-inline-start, translate | 0.15s, 0.15s, 0.15s, 0.25s, 0.25s, 0.25s, 0.25s, 0s, 0s, 0s, 0s | ease, ease, ease, ease-out, cubic-bezier(0.32, 0.72, 0, 1), ease, ease, ease, ease, ease, ease |
| popover popover-hint | opacity, transform, overlay, display | 0.15s, 0.15s, 0.15s, 0.15s | ease, ease, ease, ease |
| aside-drawer | transform, opacity, overlay, display | 0.25s, 0.25s, 0.25s, 0.25s | cubic-bezier(0.32, 0.72, 0, 1), ease-out, ease, ease |

### 4. Motion table

JSON `settled` = last frame (~700–716 ms). Last-change = last `elapsedMs` at which that property's string differed from the following frame. `anims` = `animationCount`.

| motion | pref | browser | first | settled (last frame) | last-change | anims |
|---|---|---|---|---|---|---|
| dialog-modal-open | ordinary | Chromium | 16.8ms opacity 0, transform none, translate -50% -50%, display none; backdrop rgba(0, 0, 0, 0) / none | 713.9ms opacity 1, transform none, translate -50% -50%, display flex; backdrop rgba(0, 0, 0, 0.5) / blur(2px) | display+backdrop 67.1ms (none→flex, transparent→rgba(0, 0, 0, 0.5) blur(2px)); opacity+transform 344.3ms (1 / none); translate never | 0 |
| dialog-modal-open | ordinary | Edge | 16.5ms same closed first | 711.9ms same open last as Chromium | same course (jump then interpolate ~250ms) | 0 |
| dialog-modal-open | reduced | Chromium | 16ms closed | 716.2ms open last (opacity 1, flex, backdrop 0.5/blur(2px)) | display+opacity+backdrop 64.3ms jump 0/none → 1/flex; transform stays none | 0 |
| dialog-modal-open | reduced | Edge | 6.8ms closed | ~700.7ms open | jump at 53.8ms opacity 1 / flex | 0 |
| dialog-modal-close | ordinary | Chromium | 10.3ms opacity 0, matrix(0.96, 0, 0, 0.96, 0, 0), flex, backdrop 0.5/blur(2px) | 710.2ms opacity 1.59923e-08, matrix(0.96…), flex; backdrop rgba(0, 0, 0, 0.1) / blur(3.19846e-08px) | opacity/transform/backdrop still changing at last frame (close not finished / mixed with leftover open) | 2 |
| dialog-modal-close | ordinary | Edge | 0.5ms same open-start keyframe | 701.4ms opacity 0, transform none, display none; backdrop rgba(0, 0, 0, 0) / none | reaches display none (Chromium last frame still flex) | 2 |
| dialog-modal-close | reduced | Chromium | 22.7ms opacity 1, none, flex, backdrop 0.5/blur(2px) | 711.8ms opacity 0, none, none, backdrop transparent/none | jump at 45.5ms to closed | 0 |
| dialog-nonmodal-open | ordinary | Chromium | 7.9ms opacity 0, none, translate -50% -50%, display none | 715ms opacity 1, transform none, translate none, display flex | display+transform+translate 65ms (flex, matrix(1, 0, 0, 1, 0, -8), translate none); opacity+transform 348.5ms (1 / none) | 0 |
| dialog-nonmodal-open | reduced | Chromium | 15.5ms closed | 715.1ms opacity 1, none, translate none, flex | jump 64.3ms | 0 |
| dialog-nonmodal-close | ordinary | Chromium | 8.4ms opacity 0, matrix(1, 0, 0, 1, 0, -8), flex | 708.9ms opacity 0, none, translate -50% -50%, display none | display/translate last changed by ~591ms plateau of none; anims 2 | 2 |
| dialog-nonmodal-close | reduced | Chromium | 7.8ms opacity 1, none, translate none, flex | 707.8ms closed none | jump to none after first frames | 0 |
| details-open | ordinary | Chromium | 12.7ms element opacity 1 / block; ::details-content block-size 0px, opacity 0 | 711.9ms element unchanged; pseudo 85.7812px / 1 | element never; pseudo starts 110.4ms (14.3906px / 0.108819); last 345.5ms (85.7812px / 1) | 0 |
| details-open | ordinary | Edge | 7ms same 0px/0 | 703.3ms 85.7812px / 1 | pseudo last 331.1ms (85.7812px / 1); intermediates 14.875px…85.7656px | 0 |
| details-open | reduced | Chromium | 11.2ms 0px/0 | 708.3ms 85.7812px / 1 | still interpolates (91.8ms 14.3125px → 325ms 85.7812px / 1) — reduced did not skip | 0 |
| details-open | reduced | Edge | 0px/0 then 15px… | 701.9ms 85.7812px / 1 | still interpolates | 0 |
| details-close | ordinary | Chromium | 5.6ms 0px/0 | 705.8ms 0px/0 | **no motion observed** (every pseudo frame 0px/0) | 0 |
| details-close | ordinary | Edge | 0px/0 | 0px/0 | blip 24.1ms 14.8594px / 0.111788 then 0px | 0 |
| details-close | reduced | Chromium | 6.9ms 0px/0 | 707.1ms 0px/0 | blip 23.5ms 14.4062px / 0.108926, 40.7ms 14.4062px / 0.0224376, 57.2ms 0px/0 | 0 |
| details-close | reduced | Edge | 7.3ms 0px/0 | 0px/0 | blip 25.4ms 15.7969px / 0.117736 then 0px | 0 |
| popover-open | ordinary | Chromium | 7.3ms opacity 0, none, none, display none | 715.2ms opacity 1, none, none, display block | jump 65.4ms 0/none → 1/block (no interpolate) | 0 |
| popover-open | reduced | Chromium | 8.7ms none | 709.5ms block/1 | jump 76.4ms | 0 |
| popover-close | ordinary | Chromium | 4.8ms opacity 1, matrix(1, 0, 0, 1, 0, 0), block | 705.4ms opacity 0, none, none | opacity/transform interpolate from 38.1ms; display none by 238.9ms | 0 |
| popover-hint-open | ordinary | Chromium | 16.4ms none | 712.8ms block/1 | jump 61.6ms | 0 |
| popover-hint-open | reduced | Chromium | none | 700.6ms block/1 | jump | 0 |
| popover-hint-close | ordinary | Chromium | 4.1ms opacity 1, matrix(1, 0, 0, 1, 0, 0), block | 704.7ms 0/none/none | interpolate from 38.6ms | 0 |
| popover-hint-close | reduced | Chromium | open then jump to none | 705.9ms none | jump | 0 |
| drawer-open | ordinary | Chromium | 23.2ms opacity 0, none, none; backdrop transparent/none | 702.3ms opacity 1, matrix(1, 0, 0, 1, 0, 0), flex; backdrop rgba(0, 0, 0, 0.5) / blur(2px) | display+backdrop 69.1ms (flex, 0.5/blur(2px), transform matrix(1,0,0,1,350,0)); opacity/transform still arriving by 452.6ms (1 / matrix(1,0,0,1,0,0)) | 0 |
| drawer-open | ordinary | Edge | 22.4ms same closed first | 714.5ms same open last | same course | 0 |
| drawer-open | reduced | Chromium | 15ms closed | 708.9ms open last | jump 59.1ms opacity 1, matrix(1,0,0,1,0,0), flex, backdrop 0.5/blur(2px) | 0 |
| drawer-close | ordinary | Chromium | 6.8ms opacity 0, matrix(1, 0, 0, 1, 350, 0), flex, backdrop 0.5/blur(2px) | 707.1ms opacity 0, none, none; backdrop transparent/none | opacity/transform interpolate (40.7ms 0.108699 / translateX 291.317); display/backdrop none by 689.7ms | 2 |
| drawer-close | ordinary | Edge | 7.5ms same start keyframe | 700.6ms same closed last | same course (42.5ms 0.111511 / 289.537) | 2 |
| drawer-close | reduced | Chromium | 6.6ms opacity 1, matrix(1,0,0,1,0,0), flex, backdrop 0.5/blur(2px) | 707.7ms closed none | jump 40.7ms | 0 |

Backdrop course (dialog-modal and drawer): closed `rgba(0, 0, 0, 0)` / `none`; open `rgba(0, 0, 0, 0.5)` / `blur(2px)`; ordinary close interpolates backdrop alpha and blur; reduced close jumps. `dialog-nonmodal` has no backdrop samples (`backdrop: false`).

### 5. Unknowns

No `message` field on any entry. Verbatim reason for every group: `no bounding box for screenshot`. Combined Chromium+Edge:

| context (specimen) | reason | n |
|---|---|---|
| dialog-modal:closed:light | no bounding box for screenshot | 2 |
| dialog-nonmodal:closed:light | no bounding box for screenshot | 2 |
| popover:closed:light | no bounding box for screenshot | 2 |
| popover-hint:closed:light | no bounding box for screenshot | 2 |
| aside-drawer:closed:light | no bounding box for screenshot | 2 |
| dialog-modal-close | no bounding box for screenshot | 3 |
| dialog-nonmodal-close | no bounding box for screenshot | 4 |
| popover-close | no bounding box for screenshot | 4 |
| popover-hint-close | no bounding box for screenshot | 4 |
| drawer-close | no bounding box for screenshot | 4 |

Missing from the instrument, not listed in `unknowns`: `rest` for overlays and `button-disabled`; motion samples are not per light/dark; `settled` is the last 700 ms tick, not visual settle; `animationCount` is the start tick; several rest/closed color/rect values are mid-transition; `details-close` ordinary on Chromium captured after close.

### 6. Browser identity

| file | browser | version | date | showcaseDigest |
|---|---|---|---|---|
| chromium/calibration.json | chromium | 153.0.8010.12 | 2026-09-20T07:09:48.072Z | cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792 |
| msedge/calibration.json | msedge | 153.0.4234.48 | 2026-09-20T07:10:32.248Z | cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792 |

Distillate

| specimen | mode | size / leading / weight | pad / bw / radius | color | bg | border | shadow | outline | W×H | Edge |
|---|---|---|---|---|---|---|---|---|---|---|
| body-copy | light | 14px / 21px / 400 | 0 / 0px / 0px | oklch(0.208 0.042 265.755) | rgba(0, 0, 0, 0) | oklch(0.208 0.042 265.755) | none | oklch(0.208 0.042 265.755) none 3px | 520×63 | same |
| body-copy | dark | 14px / 21px / 400 | 0 / 0px / 0px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.929 0.013 255.508) | none | oklch(0.929 0.013 255.508) none 3px | 520×63 | same |
| heading-h1 | light | 36px / 43.2px / 600 | 0 / 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | oklab(0.929 -0.00325318 -0.0125864) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 520×43.1875 | same |
| heading-h1 | dark | 36px / 43.2px / 600 | 0 / 0px / 0px | oklab(0.26215 -0.00311973 -0.0396844) | rgba(0, 0, 0, 0) | oklab(0.26215 -0.00311973 -0.0396844) | none | oklab(0.26215 -0.00311973 -0.0396844) none 3px | 520×43.1875 | color/border/outline oklab(0.208 -0.00310889 -0.0418848) |
| heading-h2 | light | 30px / 36px / 600 | 0 / 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | oklab(0.929 -0.00325318 -0.0125864) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 520×36 | same |
| heading-h2 | dark | 30px / 36px / 600 | 0 / 0px / 0px | oklab(0.208 -0.00310889 -0.0418848) | rgba(0, 0, 0, 0) | oklab(0.208 -0.00310889 -0.0418848) | none | oklab(0.208 -0.00310889 -0.0418848) none 3px | 520×36 | same |
| heading-h3 | light | 24px / 28.8px / 600 | 0 / 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | oklab(0.929 -0.00325318 -0.0125864) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 520×28.796875 | same |
| heading-h3 | dark | 24px / 28.8px / 600 | 0 / 0px / 0px | oklab(0.262266 -0.00311975 -0.0396796) | rgba(0, 0, 0, 0) | oklab(0.262266 -0.00311975 -0.0396796) | none | oklab(0.262266 -0.00311975 -0.0396796) none 3px | 520×28.796875 | color/border/outline oklab(0.208 -0.00310889 -0.0418848) |
| heading-h4 | light | 20px / 24px / 600 | 0 / 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | oklab(0.929 -0.00325318 -0.0125864) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 520×24 | same |
| heading-h4 | dark | 20px / 24px / 600 | 0 / 0px / 0px | oklab(0.208 -0.00310889 -0.0418848) | rgba(0, 0, 0, 0) | oklab(0.208 -0.00310889 -0.0418848) | none | oklab(0.208 -0.00310889 -0.0418848) none 3px | 520×24 | same |
| heading-h5 | light | 18px / 21.6px / 600 | 0 / 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | oklab(0.929 -0.00325318 -0.0125864) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 520×21.59375 | same |
| heading-h5 | dark | 18px / 21.6px / 600 | 0 / 0px / 0px | oklab(0.34822 -0.00313695 -0.0361868) | rgba(0, 0, 0, 0) | oklab(0.34822 -0.00313695 -0.0361868) | none | oklab(0.34822 -0.00313695 -0.0361868) none 3px | 520×21.59375 | color/border/outline oklab(0.21951 -0.0031112 -0.0414171) |
| heading-h6 | light | 16px / 19.2px / 600 | 0 / 0px / 0px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | oklab(0.929 -0.00325318 -0.0125864) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 520×19.1875 | same |
| heading-h6 | dark | 16px / 19.2px / 600 | 0 / 0px / 0px | oklab(0.347918 -0.00313689 -0.0361991) | rgba(0, 0, 0, 0) | oklab(0.347918 -0.00313689 -0.0361991) | none | oklab(0.347918 -0.00313689 -0.0361991) none 3px | 520×19.1875 | color/border/outline oklab(0.208 -0.00310889 -0.0418848) |
| button-bare | light | 14px / 21px / 400 | 6/12/6/12 / 0px / 6px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 52.59375×33 | same |
| button-bare | dark | 14px / 21px / 400 | 6/12/6/12 / 0px / 6px | oklab(0.907005 -0.00324878 -0.0134802) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | oklab(0.48 -0.0266547 -0.253603 / 0.013728) 0px 0px 0px 0.0915199px | oklab(0.907005 -0.00324878 -0.0134802) none 3px | 52.59375×33 | color/outline oklch(0.929 0.013 255.508); shadow none |
| button-primary | light | 14px / 21px / 400 | 6/12/6/12 / 1px / 6px | rgb(255, 255, 255) | oklab(0.48154 -0.0271002 -0.252666) | oklab(0.48154 -0.0271002 -0.252666) | none | rgb(255, 255, 255) none 3px | 72.921875×35 | bg/border oklab(0.7 -0.0902723 -0.119795) |
| button-primary | dark | 14px / 21px / 400 | 6/12/6/12 / 1px / 6px | rgb(255, 255, 255) | oklch(0.7 0.15 233) | oklch(0.7 0.15 233) | none | rgb(255, 255, 255) none 3px | 72.921875×35 | same |
| button-subtle | light | 14px / 21px / 400 | 6/12/6/12 / 1px / 6px | oklab(0.229958 -0.00311329 -0.0409925) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | none | oklab(0.229958 -0.00311329 -0.0409925) none 3px | 151.421875×35 | color/outline oklab(0.2098 -0.00310925 -0.0418116) |
| button-subtle | dark | 14px / 21px / 400 | 6/12/6/12 / 1px / 6px | oklab(0.208 -0.00310889 -0.0418848) | oklab(0.129 -0.00388322 -0.0418201 / 0.0317977) | rgba(0, 0, 0, 0) | oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px | oklab(0.208 -0.00310889 -0.0418848) none 3px | 151.421875×35 | color/outline oklch(0.929 0.013 255.508); bg rgba(0, 0, 0, 0); shadow none |
| button-small | light | 12px / 18px / 400 | 4/8/4/8 / 1px / 4px | rgb(255, 255, 255) | oklab(0.7 -0.0902723 -0.119795) | oklab(0.7 -0.0902723 -0.119795) | none | rgb(255, 255, 255) none 3px | 46.640625×28 | same |
| button-small | dark | 12px / 18px / 400 | 4/8/4/8 / 1px / 4px | rgb(255, 255, 255) | oklab(0.44794 -0.0246208 -0.23502) | oklab(0.48 -0.0266547 -0.253603) | oklab(0.48 -0.0266547 -0.253603 / 0.446781) 0px 0px 0px 2.97854px | rgb(255, 255, 255) none 3px | 46.640625×28 | bg oklab(0.446834 -0.0245507 -0.23438); shadow / 0.448819 2.99212px |
| button-large | light | 16px / 24px / 400 | 8/16/8/16 / 1px / 8px | rgb(255, 255, 255) | oklab(0.7 -0.0902723 -0.119795) | oklab(0.7 -0.0902723 -0.119795) | none | rgb(255, 255, 255) none 3px | 73.03125×42 | same |
| button-large | dark | 16px / 24px / 400 | 8/16/8/16 / 1px / 8px | rgb(255, 255, 255) | oklab(0.447934 -0.0246204 -0.235017) | oklab(0.48 -0.0266547 -0.253603) | oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px | rgb(255, 255, 255) none 3px | 73.03125×42 | bg oklab(0.446711 -0.0245429 -0.234309); shadow / 0.448998 2.99332px |
| button-disabled | light | 14px / 21px / 400 | 6/12/6/12 / 1px / 6px | rgb(255, 255, 255) | oklab(0.51245 -0.0360382 -0.233867) | oklab(0.51245 -0.0360382 -0.233867) | none | rgb(255, 255, 255) none 3px | 86.34375×35 | bg/border oklch(0.48 0.255 264) |
| button-disabled | dark | 14px / 21px / 400 | 6/12/6/12 / 1px / 6px | rgb(255, 255, 255) | oklab(0.683475 -0.0854937 -0.129846) | oklab(0.683475 -0.0854937 -0.129846) | none | rgb(255, 255, 255) none 3px | 86.34375×35 | bg/border oklab(0.670476 -0.0817349 -0.137752) |
| dialog-modal | light | 16px / 24px / 400 | 16 / 1px / 8px | rgb(0, 0, 0) | rgb(255, 255, 255) | oklch(0.869 0.022 252.894) | rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px | rgb(0, 0, 0) none 3px | 0×0 | same |
| dialog-modal | dark | 16px / 24px / 400 | 16 / 1px / 8px | rgb(0, 0, 0) | rgb(255, 255, 255) | oklab(0.869 -0.00647109 -0.0210268) | same dialog shadow | rgb(0, 0, 0) none 3px | 467.4089050292969×230.2049560546875 | 466.6010437011719×229.80709838867188 |
| dialog-nonmodal | light | 16px / 24px / 400 | 16 / 1px / 8px | rgb(0, 0, 0) | rgb(255, 255, 255) | oklch(0.869 0.022 252.894) | same dialog shadow | rgb(0, 0, 0) none 3px | 0×0 | same |
| dialog-nonmodal | dark | 16px / 24px / 400 | 16 / 1px / 8px | rgb(0, 0, 0) | rgb(255, 255, 255) | oklab(0.869 -0.00647109 -0.0210268) | same dialog shadow | rgb(0, 0, 0) none 3px | 461.5092468261719×161.52825927734375 | color rgb(33, 33, 33); bg rgb(225, 225, 225); border oklab(0.809103 -0.00632437 -0.0210676); outline rgb(33, 33, 33) none 3px; 466.655029296875×163.32928466796875 |
| details | light | 14px / 21px / 400 | 10/14/10/14 / 1px / 8px | oklab(0.929 -0.00325318 -0.0125864) | rgba(0, 0, 0, 0) | oklab(0.4 -0.00532228 -0.0213465) | none | oklab(0.929 -0.00325318 -0.0125864) none 3px | 520×43 | same |
| details | dark | 14px / 21px / 400 | 10/14/10/14 / 1px / 8px | oklch(0.929 0.013 255.508) | rgba(0, 0, 0, 0) | oklch(0.4 0.022 256) | none | oklch(0.929 0.013 255.508) none 3px | 520×43 | color/outline oklab(0.208 -0.00310889 -0.0418848); border oklab(0.869 -0.00647109 -0.0210268); H 58.578125 |
| popover | light | 14px / 21px / 400 | 12 / 1px / 8px | oklch(0.208 0.042 265.755) | oklch(0.984 0.003 247.858) | oklch(0.869 0.022 252.894) | rgba(0, 0, 0, 0.06) 0px 2px 4px 0px, rgba(0, 0, 0, 0.12) 0px 8px 16px -4px | oklch(0.208 0.042 265.755) none 3px | 0×0 | same |
| popover | dark | 14px / 21px / 400 | 12 / 1px / 8px | oklch(0.929 0.013 255.508) | oklch(0.235 0.013 256) | oklch(0.4 0.022 256) | same popover shadow | oklch(0.929 0.013 255.508) none 3px | 272.81982421875×156.36477661132812 | 273.8980712890625×156.9827880859375 |
| popover-hint | light | 12px / 18px / 400 | 4/8/4/8 / 1px / 8px | rgb(255, 255, 255) | color(srgb 0.0571636 0.0900503 0.168809 / 0.95) | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px | rgb(255, 255, 255) none 3px | 0×0 | same |
| popover-hint | dark | 12px / 18px / 400 | 4/8/4/8 / 1px / 8px | oklch(0.208 0.042 265.755) | color(srgb 0.944349 0.960546 0.976583 / 0.95) | rgba(0, 0, 0, 0) | same hint shadow | oklch(0.208 0.042 265.755) none 3px | 197.034423828125×45.317901611328125 | 197.53970336914062×45.43414306640625 |
| aside-drawer | light | 14px / 21px / 400 | 0/16/0/16 / 1px / 8px | oklch(0.208 0.042 265.755) | oklch(0.984 0.003 247.858) | oklch(0.869 0.022 252.894) | same hint shadow | oklch(0.208 0.042 265.755) none 3px | 0×0 | same |
| aside-drawer | dark | 14px / 21px / 400 | 0/16/0/16 / 1px / 8px | oklch(0.929 0.013 255.508) | oklch(0.235 0.013 256) | oklch(0.4 0.022 256) | same hint shadow | oklch(0.929 0.013 255.508) none 3px | 350×800 | same |

font-family first family: `system-ui` on every row, both browsers.

Unknowns
dialog-modal:closed:light / no bounding box for screenshot / n=2 / `no bounding box for screenshot`
dialog-nonmodal:closed:light / no bounding box for screenshot / n=2 / `no bounding box for screenshot`
popover:closed:light / no bounding box for screenshot / n=2 / `no bounding box for screenshot`
popover-hint:closed:light / no bounding box for screenshot / n=2 / `no bounding box for screenshot`
aside-drawer:closed:light / no bounding box for screenshot / n=2 / `no bounding box for screenshot`
dialog-modal-close / no bounding box for screenshot / n=3 / `no bounding box for screenshot`
dialog-nonmodal-close / no bounding box for screenshot / n=4 / `no bounding box for screenshot`
popover-close / no bounding box for screenshot / n=4 / `no bounding box for screenshot`
popover-hint-close / no bounding box for screenshot / n=4 / `no bounding box for screenshot`
drawer-close / no bounding box for screenshot / n=4 / `no bounding box for screenshot`

Journal
unspecified

Deviation
Brief supplied no session id. `unknowns` entries have no `message` field; the reason string is quoted. Overlay/`button-disabled` rows use `closed`/`disabled` because those specimens have no `rest`. For interpolating closes, last-change is the last observed property change in the sampled window; JSON `settled` is always the last tick.
