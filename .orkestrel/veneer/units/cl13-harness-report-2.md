<!-- builder on the native cheap tier, round 2 of the CL13 harness. Retained 2026-09-22.
Its brief is cl13-harness-brief-2.md over cl13-harness-brief.md. Closed the capture-scope gap
the first brief created: element frames now match Veneer scope, page frames kept as context. -->

# CL13-harness report 2 — matched element frames

Continues `tmp/cl13/capture.mjs` from round 1, in place, rather than starting over. All round-1
facts not restated here (script path, invocation, stylesheet source, theme mechanism, markup
mirroring, tear-down, blank-check approach) are unchanged; see `tmp/units/cl13-harness-report.md`.

## 1. Frame naming and the full list the run now produces

Two frame kinds per variant, named so either can be cited unambiguously:

- **Page frame**: `<specimen>--<theme>--<width>.page.png` — the whole viewport, kept as context.
- **Element frame**: `<specimen>--<theme>--<width>.element.png` — the single element the cascade
  key's own selector matches inside that page, captured with Playwright's
  `locator(selector).screenshot()`, which shoots the element itself rather than a wrapper around
  it (round 1's frames, previously named `<stem>.png`, are now `<stem>.page.png`; nothing else
  moved).

The run wrote, under `tmp/cl13/portfolio/`:

- 16 page frames (`*.page.png`), unchanged in content from round 1.
- 16 element frames (`*.element.png`), new this round.
- 16 accessibility snapshots (`*.accessibility.yaml`), unchanged.
- 16 step logs (`*.steps.log.txt`), each now also recording the element selector, its match
  count, the element's own pixel variation, and its dimensions.
- `manifest.json`, now listing per-variant records (`stem`, `page`, `element`, `elementSelector`,
  `elementMatchCount`, `elementDimensions`) rather than a bare filename list.
- `control.json` and `harness.log.txt`, unchanged in shape.

## 2. Element frame dimensions per specimen, per theme, per width

Theme made no difference to any element's dimensions (expected: theme changes color, not layout).

| Specimen           | Selector        | 1280×720 | 390×720 |
| ------------------- | --------------- | -------- | ------- |
| `capped-container`  | `.container`    | 1140×24  | 390×24  |
| `numbered-columns`  | `.row`          | 1280×24  | 390×48  |
| `base-table`        | `.table`        | 1280×163 | 390×163 |
| `role-links`        | `.link-primary` | 83×21    | 83×21   |

Both theme rows (light, dark) at each width match exactly; see
`tmp/cl13/portfolio/harness.log.txt` for all 16 individual readings.

## 3. Unknowns

- **Whether every key's selector matches exactly one element in the page.** Yes, for every one of
  the 16 variants. The harness logs `selector <selector> matched <count> element(s)` per capture,
  and every line reads `matched 1 element(s)`; see `tmp/cl13/portfolio/harness.log.txt`. This
  holds because each Bootstrap page here is the mirrored specimen alone (no surrounding showcase
  chrome), so `.container`, `.row`, `.table`, and `.link-primary` each answer to one element by
  construction, not by selector precision. `.link-primary` matches one anchor while the
  `role-links` specimen's markup carries nine role-link anchors total (`link-primary`,
  `link-secondary`, `link-success`, `link-info`, `link-warning`, `link-danger`, `link-light`,
  `link-dark`, `link-body-emphasis`) — the selector reaches exactly the one the cascade key names,
  the same scope Veneer's own 73×19 link frame reaches. This harness's link element frame comes
  back 83×21, narrow for the same reason: `.link-primary` names one anchor, not the row of nine.
  The 83×21 and 73×19 dimensions are close but not identical, which is a finding for the verdict
  round (font metrics, padding, or link text differ slightly between the two markups' rendered
  anchor), not something to adjust here.
- **Whether an element frame at the specimen's own position comes back blank.** No blank was hit.
  Every element frame in this harness sits at the very top of a minimal document — each page
  serves exactly one specimen's markup as the entire `<body>`, with no showcase chrome above or
  around it — so there is no deep-scroll position for `locator.screenshot()` to fail at the way
  Veneer's own capture did against its full showcase page. No lift-to-document-start workaround
  was needed. Every element frame's own pixel-variation check (the same `variation <= 0` guard
  applied to every page frame) passed with a positive reading; see item 4.

## 4. Blank-check reading for every new frame

Every element frame is asserted the same way as every page frame, inline during capture, with the
identical `if (variation <= 0) throw` guard proven able to fail in round 1's control (reproduced
this run too; see `tmp/cl13/portfolio/control.json` and the `RED`/`GREEN` lines in
`harness.log.txt`). All 16 element-frame readings:

| Frame stem                          | Element variation      |
| ------------------------------------ | ----------------------- |
| `capped-container--light--1280`      | 0.02083333333333333     |
| `capped-container--light--390`       | 0.02083333333333333     |
| `capped-container--dark--1280`       | 0.02083333333333333     |
| `capped-container--dark--390`        | 0.02083333333333333     |
| `numbered-columns--light--1280`      | 0.05208333333333333     |
| `numbered-columns--light--390`       | 0.09201388888888889     |
| `numbered-columns--dark--1280`       | 0.05208333333333333     |
| `numbered-columns--dark--390`        | 0.09201388888888889     |
| `base-table--light--1280`            | 0.03082342791411043     |
| `base-table--light--390`             | 0.059572125216297       |
| `base-table--dark--1280`             | 0.03082342791411043     |
| `base-table--dark--390`              | 0.059572125216297       |
| `role-links--light--1280`            | 0.3092369477911647      |
| `role-links--light--390`             | 0.3092369477911647      |
| `role-links--dark--1280`             | 0.3092369477911647      |
| `role-links--dark--390`              | 0.3092369477911647      |

Every value is greater than zero; every element frame passed. The exact numbers are also in each
variant's own `*.steps.log.txt` and in `harness.log.txt`.

## 5. `git status --porcelain --untracked-files=all`

```
$ git status --porcelain --untracked-files=all
(no output)
```

Nothing tracked changed. `tmp/` is git-ignored; the edited `tmp/cl13/capture.mjs` and its
regenerated `tmp/cl13/portfolio/` artifacts report nothing.

## 6. What could not be closed

Nothing in this round's assigned scope. Sixteen element frames exist beside the sixteen page
frames (32 total), every pair named unambiguously (`.page.png` / `.element.png` sharing one
stem), every frame of both kinds passed the blank check, the script still runs to completion in
one invocation with clean tear-down (browser closed, server closed, no orphaned process or port),
and no tracked file changed.

One observation carried forward rather than fixed: the `role-links` element frame's dimensions
(83×21) are close to but not identical with Veneer's own link element frame (73×19). Both are
narrow for the identical structural reason — a one-anchor selector against a nine-anchor
specimen — and per Obligation 3 the selector was not widened to produce a wider picture. The
residual size difference is left for the verdict round to weigh against the two markups' font and
padding.
