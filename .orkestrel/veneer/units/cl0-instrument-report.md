# Unit CL0 — instrument report

## Script landed

`.orkestrel/veneer/research/calibration-content.mjs`, sibling of the accepted
`.orkestrel/veneer/research/calibration.mjs`. Reuses that instrument's digest check
(`cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792`), `1100×800` viewport,
16px root font size, 500ms `SETTLE_MS`, managed Chromium and Edge (`channel: 'msedge'`) launch,
`light`/`dark` mode loop, and the accepted `setMode` function verbatim (header-button toggle,
`waitForFunction` on `data-mode`).

### Surfaces and specimens (18 surfaces, 43 specimens)

Grouped by the scout's DOM map (`.orkestrel/veneer/units/cl0-scout-report.md` section 1):

| Surface | Specimens | States |
| --- | --- | --- |
| `paragraph` | `paragraph-first`, `paragraph-second` (the `p + p` sibling), `paragraph-section-gap` (the flex `section` itself) | rest |
| `heading` | `heading-h1`…`heading-h6` | rest |
| `list-ul` | `list-ul-outer`, `list-ul-nested` | rest |
| `list-ol` | `list-ol-outer`, `list-ol-nested` | rest |
| `list-dl` | `list-dl`, `list-dl-dt`, `list-dl-dd` | rest |
| `blockquote` | `blockquote` | rest |
| `hr` | `hr` | rest |
| `anchor` | `anchor` | rest, hover |
| `table-bare` | `table-bare`, `table-bare-caption`, `table-bare-th`, `table-bare-td` | rest |
| `table-striped` | `table-striped-row`, `table-striped-cell` | rest, hover |
| `table-bordered` | `table-bordered`, `table-bordered-caption` | rest |
| `figure` | `figure`, `figcaption` | rest |
| `img` | `img-block`, `img-inline` | rest |
| `code-family` | `code-inline`, `pre`, `pre-code`, `kbd`, `samp`, `var` | rest |
| `small-mark` | `small`, `mark` | rest |
| `abbr` | `abbr` | rest |
| `address` | `address` | rest |
| `sub-sup` | `sub`, `sup` | rest |

### Properties read per specimen

One superset list read on every specimen (`PROPERTIES`, 49 entries): the base font metrics
(`font-family`, `font-size`, `line-height`, `font-weight`, `font-style`, `letter-spacing`), paint
(`color`, `background-color`), all four physical and logical margins, all four paddings, the
`border-top-*`, `border-inline-start-*`, `border-block-start-*`, and `border-block-end-*` triples
(width/style/color), `border-collapse`, `border-spacing`, the `text-decoration-*` family plus
`text-underline-offset`, `list-style-type`, `display`, `gap`/`row-gap`/`column-gap`,
`grid-template-columns`, `vertical-align`, `cursor`, `text-wrap`, `caption-side`, `text-align`,
sizing (`max-width`, `max-inline-size`, `width`, `height`), and `opacity`. An inapplicable
property (for example `list-style-type` on a `<p>`) resolves to its inherited or initial value
and costs nothing extra to carry; this closes the scout's named gaps (`margin-*`,
`text-decoration*`, `border-collapse`, `border-spacing`) without per-surface property lists.

Custom properties: every specimen reads the `COMMON_TOKENS` set (`--color-canvas`,
`--color-text`, `--color-text-muted`, `--color-border`, `--color-surface-raised`,
`--color-primary`, `--color-primary-on-canvas`, `--color-text-strong`) plus its surface's
`SURFACE_TOKENS` entry from the scout's section 2 token table (for example `table-bare` also
reads `--set-table-header-background-color`, `--set-table-row-hover-background-color`,
`--set-table-row-striped-background-color`, `--set-table-border-color`,
`--set-table-cell-padding-inline`, `--set-table-cell-padding-block`; `code-family` reads the six
`--set-{code,kbd,pre,samp,var}-*-color` tokens the scout named).

### Deviations settled per the brief's contract

- Settle waits: kept the accepted instrument's single `SETTLE_MS = 500` for every state
  transition rather than adding a longer wait for anchor hover. The scout's own read of
  `_a.scss:111-118` gives the anchor hover transition duration as `--set-transition-duration`
  (150ms), well under the existing 500ms settle; recorded as a code comment beside `SETTLE_MS`
  rather than a second constant.
- DOM path disagreement: none found. Every one of the 43 specimen selectors attached on both
  browsers on the first run (see Absent, below).
- Record column order: `Specimen | State | Property | <browser> light | <browser> dark` per
  browser, repeated for `chromium` then `msedge`, inside one table per surface. Chose specimen
  before state before property so every specimen's full property block reads together.

## Run

Command: `node .orkestrel/veneer/research/calibration-content.mjs`, run once from the scaffold
checkout root (`C:/Users/mikes/WebstormProjects/scaffold`), started as a background task because
it exceeded the 300s foreground cap (two full browser passes over 43 specimens × 2 modes × up to
2 states).

Console output: none written to stdout or stderr; process exited with code `0`.

## Output listing

```
.orkestrel/veneer/research/calibration-content/chromium/readings.json   305784 bytes
.orkestrel/veneer/research/calibration-content/msedge/readings.json     305782 bytes
.orkestrel/veneer/research/calibration-content.md                       340294 bytes
```

## Record header

```
# Content/layout calibration record

Run date: 2026-09-21T08:49:36.229Z. Showcase digest: `cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792`.

One table per surface: specimen, state, property, then light and dark readings per browser.
```

18 `### <surface>` section headings landed, one per row of the surfaces table above.

## Absent surfaces

None. The record's `## Absent` section reads:

```
## Absent

- none: every specimen selector was attached on both browsers.
```

Every one of the 43 specimen CSS selectors resolved and attached within the 10-second
`waitFor` on both Chromium and Edge, across both modes.

## Git status

```
$ git status --porcelain -- .orkestrel
?? .orkestrel/veneer/research/calibration-content.md
?? .orkestrel/veneer/research/calibration-content.mjs
?? .orkestrel/veneer/research/calibration-content/
```

`.orkestrel/veneer/research/calibration.mjs` and `.orkestrel/veneer/research/calibration/` do
not appear in that status: the accepted instrument and its readings are untouched.
