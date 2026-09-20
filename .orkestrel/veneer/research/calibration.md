# Elements calibration

The accepted foundation values Veneer's token contract (U3) takes from Elements' rendered
specimens, and the departures the record carries. Every value here was read from Elements'
built showcase (`dist/showcase/index.html` at commit `3b41900`, sha256
`cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792`) by
[`calibration.mjs`](calibration.mjs), run 5 on 2026-09-20, on managed Chromium `153.0.8010.12`
(`calibration/chromium/calibration.json`, `2026-09-20T07:23:39Z`) and Edge `153.0.4234.48`
(`calibration/msedge/calibration.json`, `2026-09-20T07:26:09Z`), at a 1100 × 800 viewport with a
16 px root font, after a settle wait longer than the longest declared transition. Grok's
distillate of both files is retained as `units/u2-distill-2-report.md`; the run logs and the
instrument corrections sit beside it under `units/u2-*`. Runs 1 to 4 are superseded: their
readings were taken before the reaches were unique and before the settle waits, and run 4's
distillate (`units/u2-distill-report.md`) records the mid-transition strings that showed why.

Chromium and Edge read identical settled strings for every value in this record; they differ
only in the intermediate frames of a motion and the millisecond at which a property last changed.
Captures per specimen, state, and mode sit under `calibration/<browser>/`.

## Type

| Specimen | `font-family` (first) | `font-size` | `line-height` | `font-weight` |
| -------- | --------------------- | ----------- | ------------- | ------------- |
| body copy, bare button, `.primary`, `.subtle`, disabled, details, popover, drawer | `system-ui` | 14px | 21px | 400 |
| `h1` | `system-ui` | 36px | 43.2px | 600 |
| `h2` | `system-ui` | 30px | 36px | 600 |
| `h3` | `system-ui` | 24px | 28.8px | 600 |
| `h4` | `system-ui` | 20px | 24px | 600 |
| `h5` | `system-ui` | 18px | 21.6px | 600 |
| `h6` | `system-ui` | 16px | 19.2px | 600 |
| `.small` button, hint | `system-ui` | 12px | 18px | 400 |
| `.large` button, dialog | `system-ui` | 16px | 24px | 400 |

Line height is 1.5 × size for body sizes and 1.2 × size for headings. The heading weight is 600.
Body copy carries `transition: all 0s`, headings `color 0.15s ease`.

## Space, border, and radius

| Specimen | Padding (T/R/B/L) | Border width | Radius | Rect (W × H) |
| -------- | ----------------- | ------------ | ------ | ------------ |
| bare button | 6/12/6/12 | 0px | 6px | 52.59 × 33 |
| `.primary` button, `.subtle`, disabled | 6/12/6/12 | 1px | 6px | 72.92 × 35, 151.42 × 35, 86.34 × 35 |
| `.small` button | 4/8/4/8 | 1px | 4px | 46.64 × 28 |
| `.large` button | 8/16/8/16 | 1px | 8px | 73.03 × 42 |
| details | 10/14/10/14 | 1px | 8px | 520 × 43 (closed) |
| dialog (modal and inline) | 16/16/16/16 | 1px | 8px | 0 × 0 closed |
| popover | 12/12/12/12 | 1px | 8px | 0 × 0 closed |
| hint | 4/8/4/8 | 1px | 8px | 0 × 0 closed |
| drawer | 0/16/0/16 | 1px | 8px | 0 × 0 closed; 350 × 800 open |

The bare button has no border; the `.primary` family draws a 1 px border in its fill colour. The
radius scale the specimens use is 4px, 6px, 8px. The drawer's open inline size is 350px.

## Colour

Every colour endpoint below is the same string on both browsers.

| Role | Light | Dark |
| ---- | ----- | ---- |
| text (body, headings, bare and subtle buttons, details, popover, drawer) | `oklch(0.208 0.042 265.755)` | `oklch(0.929 0.013 255.508)` |
| text on filled primary and on disabled | `rgb(255, 255, 255)` | `rgb(255, 255, 255)` |
| primary fill and border (`.primary`, `.small`, `.large`, disabled) | `oklch(0.48 0.255 264)` | `oklch(0.7 0.15 233)` |
| dialog text | `rgb(0, 0, 0)` | `rgb(255, 255, 255)` |
| dialog surface | `rgb(255, 255, 255)` | `rgb(18, 18, 18)` |
| popover and drawer surface | `oklch(0.984 0.003 247.858)` | `oklch(0.235 0.013 256)` |
| border (dialog, details, popover, drawer) | `oklch(0.869 0.022 252.894)` | `oklch(0.4 0.022 256)` |
| hint surface (inverted, 95% alpha) | `color(srgb 0.0571636 0.0900503 0.168809 / 0.95)` | `color(srgb 0.944349 0.960546 0.976583 / 0.95)` |
| hint text | `rgb(255, 255, 255)` | `oklch(0.208 0.042 265.755)` |
| page background behind the specimens | transparent on every in-flow specimen | transparent |

The hint surface is the only rest colour the browser reports as a mix: Elements composes it as
the text colour at 95% alpha, so the token carries the base colour and the alpha separately.
Disabled buttons keep the primary fill at full strength in both modes; Elements expresses the
disabled state through the `disabled` attribute's cursor and opacity on the host, which this
instrument did not read (a later Button specimen reads `opacity` and `cursor` on the disabled
host).

## Semantic roles and canvas

Run 6 (2026-09-20, `units/u2-run-6.log.txt`, readings extracted to `units/u2-run-6-extract.md`)
added the page canvas, every variant button, and every variant's `.subtle` and `.filled` styles.
Every string below is identical on Chromium `153.0.8010.12` and Edge `153.0.4234.48`.

| Role (Elements name) | Fill and border, light and dark (`.filled` and the bare variant) | Subtle text, light / dark | Subtle surface, light / dark | Subtle border, light / dark |
| --- | --- | --- | --- | --- |
| primary | `oklch(0.48 0.255 264)` / dark `oklch(0.7 0.15 233)` | `oklab(0.3984 -0.019591 -0.190088)` / `oklab(0.7687 -0.0641665 -0.0876326)` | `oklab(0.937595 -0.00315847 -0.0304147)` / `oklab(0.2835 -0.0162141 -0.0286911)` | `oklab(0.817996 -0.00929954 -0.088748)` / `oklab(0.4675 -0.0467086 -0.0662046)` |
| secondary | `oklch(0.446 0.043 257.281)` both modes | `oklab(0.3746 -0.00755977 -0.0419268)` / `oklab(0.5909 -0.00760306 -0.0331373)` | `oklab(0.933515 -0.00109597 -0.00501571)` / `oklab(0.2454 -0.00409333 -0.0170135)` | `oklab(0.806096 -0.00328393 -0.0146676)` / `oklab(0.3405 -0.00630614 -0.0272793)` |
| tertiary (Veneer addition; no Bootstrap role) | `oklch(0.541 0.281 293.009)` both modes | `oklab(0.4411 0.0759527 -0.193617)` / `oklab(0.6574 0.0759094 -0.184827)` | `oklab(0.944915 0.0132204 -0.0310197)` / `oklab(0.25965 0.0138022 -0.0495184)` | `oklab(0.839346 0.0384723 -0.0905125)` / `oklab(0.388 0.0533456 -0.135629)` |
| success | `oklch(0.527 0.154 150.069)` both modes | `oklab(0.4313 -0.0943551 0.0412221)` / `oklab(0.6476 -0.0943983 0.0500116)` | `oklab(0.943235 -0.0159752 0.00923839)` / `oklab(0.25755 -0.0226923 0.000804124)` | `oklab(0.834446 -0.0466816 0.0269068)` / `oklab(0.381 -0.0683028 0.0321127)` |
| warning | `oklch(0.555 0.163 48.998)` both modes | `oklab(0.4509 0.0739267 0.0735443)` / `oklab(0.6672 0.0738834 0.0823338)` | `oklab(0.946595 0.0128731 0.0147793)` / `oklab(0.26175 0.013368 0.00773032)` | `oklab(0.844246 0.0374593 0.0430679)` / `oklab(0.395 0.0518985 0.0552)` |
| danger | `oklch(0.505 0.213 27.518)` both modes | `oklab(0.4159 0.131299 0.0563228)` / `oklab(0.6322 0.131256 0.0651124)` | `oklab(0.940595 0.0227084 0.0118271)` / `oklab(0.25425 0.0256621 0.00404)` | `oklab(0.826746 0.0661455 0.0344572)` / `oklab(0.37 0.0928787 0.042899)` |
| information (Bootstrap `info`) | `oklch(0.5 0.134 242.749)` both modes | `oklab(0.4124 -0.0438827 -0.0959545)` / `oklab(0.6287 -0.043926 -0.087165)` | `oklab(0.939995 -0.00732276 -0.0142776)` / `oklab(0.2535 -0.0118768 -0.0285909)` | `oklab(0.824996 -0.0214454 -0.0416815)` / `oklab(0.3675 -0.0322511 -0.0658705)` |

Only the primary retunes by mode; every other role keeps one fill in both modes. Filled text is
`rgb(255, 255, 255)` on every role. The subtle tiers are Elements' own `color-mix()` results in
oklab (the browser serializes them as `oklab(...)`), so the token contract reproduces them as
oklab mixes over each role's fill whose percentages the U3 unit reads from Elements' token source
and proves against these strings.

| Canvas | Light | Dark |
| --- | --- | --- |
| `body` background | `rgb(255, 255, 255)` | `oklch(0.21 0.013 256)` |
| `body` text | `oklch(0.208 0.042 265.755)` | `oklch(0.929 0.013 255.508)` |
| `main` background | transparent | transparent |

The full font stack on every specimen is
`system-ui, -apple-system, "Segoe UI", roboto, "Helvetica Neue", arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`.

The sRGB triplets of the calibrated colours, read from the engines by `instruments/srgb-probe.mjs`
and `instruments/paint-probe.mjs` (see [instruments](instruments.md)): primary light `8, 65, 234`,
primary dark `0, 172, 236` (painted; the colour is outside the sRGB gamut), text `15, 23, 43` /
`226, 232, 240`, border `202, 213, 226` / `64, 72, 84`, raised surface `248, 250, 252` /
`26, 30, 36`.

Hover and active fills per role, light and dark, are in `units/u2-run-6-extract.md` (the
`color(srgb …)` strings); they calibrate the Button unit.

## Interaction states

Read on the five interactive button specimens; the `active` reading was taken with the focus
ring still present from the preceding `focus-visible` drive, so `active` rows carry the ring.

| State | Bare and `.subtle` (light) | Bare and `.subtle` (dark) | `.primary` family (light) | `.primary` family (dark) |
| ----- | -------------------------- | ------------------------- | ------------------------- | ------------------------ |
| hover | `background-color` `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` (text colour at 12%) | `color(srgb 1 1 1 / 0.12)` | `background-color` `color(srgb 0.0288046 0.226321 0.817248)` | `color(srgb 0.0248835 0.714208 0.933359)` |
| active | `background-color` at 22% (`/ 0.22`) | `color(srgb 1 1 1 / 0.22)` | `color(srgb 0.0263751 0.203249 0.734892)` | `color(srgb 0.135692 0.746684 0.940932)` |
| focus-visible | `box-shadow` `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px` | `oklab(0.7 -0.0902723 -0.119795 / 0.45) 0px 0px 0px 3px` | same ring as bare | same ring as bare |

The focus ring is a 3 px spread `box-shadow` in the primary colour at 45% alpha, with `outline`
kept at `none` (the `outline` string reads as `<color> none 3px` on every specimen, so the
outline colour and width are declared and the style suppressed). Hover and active on the
`.primary` family darken the fill in light mode and lighten it in dark mode; the exact tints are
the sRGB strings above, which U3 reproduces through `color-mix()` against the primary token and
proves against these readings.

## Elevation

| Surface | `box-shadow` |
| ------- | ------------ |
| dialog | `rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px` |
| popover | `rgba(0, 0, 0, 0.06) 0px 2px 4px 0px, rgba(0, 0, 0, 0.12) 0px 8px 16px -4px` |
| hint, drawer | `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px` |
| buttons, details | `none` |

Three elevation steps, identical in light and dark.

## Motion

Declared transitions at rest (identical on both browsers):

| Specimen | `transition-property` | Durations | Easings |
| -------- | --------------------- | --------- | ------- |
| buttons | color, background-color, border-color, box-shadow, opacity | 0.15s each | ease |
| headings | color | 0.15s | ease |
| details | color, background-color, border-color | 0.15s each | ease |
| dialog | color, background-color, border-color, opacity, transform, overlay, display, position, inset-block-start, inset-inline-start, translate | 0.15s ×3, 0.25s ×4, 0s ×4 | ease ×3, ease-out, `cubic-bezier(0.32, 0.72, 0, 1)`, ease ×6 |
| popover, hint | opacity, transform, overlay, display | 0.15s each | ease |
| drawer | transform, opacity, overlay, display | 0.25s each | `cubic-bezier(0.32, 0.72, 0, 1)`, ease-out, ease, ease |

Observed courses (frames sampled once per animation frame for 700 ms; `getAnimations()` read 0 at
every start, so these are CSS transitions, not Web Animations):

| Motion | Ordinary | Reduced motion |
| ------ | -------- | -------------- |
| modal dialog open | `display` flips to `flex` and `::backdrop` jumps to `rgba(0, 0, 0, 0.5)` / `blur(2px)` at about 65 ms; `opacity` 0 → 1 and `transform` settle by about 337 ms (Chromium) / 352 ms (Edge) | snaps closed → open at about 65 ms (Chromium) / 76 ms (Edge) |
| modal dialog close | `opacity`, `transform`, backdrop colour and blur interpolate down; `display` none at about 320 ms / 340 ms | snaps at about 45 ms / 55 ms |
| inline dialog open | `display` flex with `transform` `matrix(1, 0, 0, 1, 0, -8)` at about 78 ms, then the 8 px offset and opacity settle by about 328 ms / 349 ms | snaps at about 68 ms / 55 ms |
| inline dialog close | settles to `display` none by about 314 ms / 318 ms | snaps at about 37 ms |
| details open | `::details-content` `block-size` 0 → 85.7812px and `opacity` 0 → 1, settled by about 328 ms / 314 ms | **still interpolates** (Chromium last change 318 ms, Edge 330 ms) |
| details close | reverse course, settled by about 307 ms / 318 ms | **still interpolates** (319 ms / 316 ms) |
| popover and hint open | snap to `display` block, `opacity` 1 at about 61 ms to 74 ms; no intermediate opacity | snap |
| popover and hint close | `opacity` 1 → 0 with `transform` `matrix(1, 0, 0, 1, 0, 0)`, `display` none by about 161 ms / 145 ms to 162 ms | already closed when sampled (no motion observed) |
| drawer open | `display` flex with `transform` `matrix(1, 0, 0, 1, 350, 0)` and backdrop at about 81 ms; slide to identity and opacity 1 settle by about 349 ms / 341 ms | snaps at about 59 ms / 42 ms |
| drawer close | slide out and backdrop fade settle by about 306 ms on both | snaps at about 50 ms |

The drawer slides its full 350 px inline size. Dialog and drawer backdrops share
`rgba(0, 0, 0, 0.5)` with `blur(2px)`. The popover family does not animate its entry; only its
exit fades.

## Departures and open readings

- **Details under reduced motion.** Elements' `::details-content` transition still interpolates
  when `prefers-reduced-motion: reduce` is emulated, on both browsers (the `reduced-motion` mixin
  is not applied to that partial, as `motion.md` already noted). Veneer's contract collapses that
  motion under reduced motion; the U3 mixin proof and the later Details specimen read it.
- **Popover exit only.** Elements' popover and hint show no entry motion (a snap) and a
  150 ms fade on exit. Veneer keeps the reading as the calibrated value and records it as an
  Elements decision, not a Bootstrap one.
- **Disabled appearance.** The instrument read the disabled button's colours but not its
  `opacity` or `cursor`; the disabled treatment is an open reading for the Button specimen.
- **Hover and active tints.** The `.primary` hover and active fills are sRGB mixes the browser
  reports without their formula; U3 declares them as `color-mix()` steps against the primary
  token and proves the resolved strings equal these readings on both browsers.
- **Bootstrap disagreements** are recorded in `guides/tokens.md` when U3 binds each `--bs-*`
  alias: Bootstrap's body font is `1rem` and its headings are `500` weight with a `1.2` line
  height; Elements' 14 px body, 600 heading weight, and 6 px default radius take precedence per
  the plan's Identity decision.
