# U8b report — implementer (Opus 5), returned 2026-08-15T12:29Z

## Touched files

| File | Change |
| --- | --- |
| `/workspace/supervisor/app/browser/styles/tokens.css` | **new** — the app's token source of truth: `--app-focus-color` (from `--bs-emphasis-color`), `--app-focus-offset` |
| `/workspace/supervisor/app/browser/styles/focus.css` | **new** — the one output partial: an opaque `outline` on `:is(a, area, button, input, select, summary, textarea, [tabindex]):focus-visible` |
| `/workspace/supervisor/app/browser/styles/index.css` | **new** — the sole compilation barrel, `@import` tokens then partials |
| `/workspace/supervisor/app/browser/main.ts` | loads `./styles/index.css` after the framework cascade |
| `/workspace/supervisor/app/browser/showcase.ts` | same load, same position |
| `/workspace/supervisor/tests/setupBrowser.ts` | same load, same position, so tests read the cascade the app serves |
| `/workspace/supervisor/tests/app/browser/contrast.test.ts` | the pinned findings become one assertion over all 29 readings |
| `/workspace/supervisor/demo/showcase.html` | regenerated build artifact (`build:showcase` + `copy`), now carrying the ring |

```
 app/browser/styles/tokens.css      | 16 ++++++++++++++++   (new)
 app/browser/styles/focus.css       | 18 ++++++++++++++++   (new)
 app/browser/styles/index.css       |  9 +++++++++          (new)
 app/browser/main.ts                |  1 +
 app/browser/showcase.ts            |  1 +
 demo/showcase.html                 |  6 +++---
 tests/app/browser/contrast.test.ts | 31 ++++++++-----------------------
 tests/setupBrowser.ts              |  5 +++++
 8 files changed, 61 insertions(+), 26 deletions(-)
```

## The three surfaces, remeasured

| surface | light before | light after | dark before | dark after | bar |
| --- | --- | --- | --- | --- | --- |
| focus ring: theme switch | 4.32:1 | **18.77:1** | 3.54:1 | **17.10:1** | 3:1 |
| focus ring: filter | 4.90:1 | **21.00:1** | 2.24:1 | **16.20:1** | 3:1 |
| focus ring: drawer | 2.30:1 | **4.28:1** | 1.59:1 | **7.23:1** | 3:1 |

`grep -c "| under |" tmp/contrast/{light,dark}.md` → `0` and `0`; `grep -c "^| "` → `31` each (2 header rows + 29 readings).

## Per-criterion proofs

**Failing proof first.** The assertion flip landed before the stylesheet existed.

`npx vitest run --project app:browser tests/app/browser/contrast.test.ts` (no stylesheet):
```
+   { "bar": 3, "label": "focus ring: drawer", "ratio": 1.58917811449487 },
+   { "bar": 3, "label": "focus ring: filter", "ratio": 2.2397622668510877 },
 Test Files  1 failed (1)
      Tests  2 failed (2)
```

**Criterion 1 — all 29 readings ≥ bar, unweakened instrument.** `readFocus`, the Tab-driven `:focus-visible` reader, and every `measure*` helper in `tests/setupBrowser.ts` are byte-identical; the only edit to that file is the stylesheet import and its comment. Same command after the fix:
```
 Test Files  1 passed (1)
      Tests  2 passed (2)
```

**Criterion 2 — full suites and gates green; the build ships the stylesheet.**

`npx vitest run --project app:browser` → `Test Files 38 passed (38) / Tests 446 passed (446)`

`npm run format:check` → `All matched files use the correct format. Finished in 6257ms on 373 files`
`npm run lint:check` → exit 0, no output
`npm run check` → all five projects clean (`tsc` root, src core/server, app core/browser/server via `vue-tsc`)
`npm run build` → `dist/app/browser/assets/index-D7Bx2Z82.css 451.81 kB`, `dist/app/server/main.cjs 412.74 kB`
`npm test` →
```
 Test Files  22 passed (22)      Tests  251 passed (251)     (src)
 Test Files  67 passed (67)      Tests  782 passed (782)     (app, incl. browser + integration)
 Test Files   1 passed  (1)      Tests   17 passed  (17)     (policy)
 Test Files   1 passed  (1)      Tests  374 passed (374)     (guides)
```

Shipped-cascade proof — tail of `dist/app/browser/assets/index-D7Bx2Z82.css`, the app's rules last after Halfmoon:
```css
:root{--app-focus-color:var(--bs-emphasis-color);--app-focus-offset:.125rem}:is(a,area,button,input,select,summary,textarea,[tabindex]):focus-visible{outline:var(--bs-focus-ring-width) solid var(--app-focus-color);outline-offset:var(--app-focus-offset)}
```

**Portfolio.** All 80 frames in `tests/app/browser/__screenshots__/portfolio/` regenerated (mtime `12:20:43`); `portfolio.test.ts` registry/membership proofs green. The directory is gitignored (`.gitignore:33 tests/**/__screenshots__/`), so the regeneration produces no tracked diff.

## Parity delta

`guides/**` is off-limits, so these are report-only patches against `/workspace/supervisor/guides/src/supervisor.md`. The guides parity suite is green (374 passed) because it proves names, not sentences — this is prose drift the change falsifies, exactly the class `.claude/rules/documentation.md` says a parity test cannot catch.

**Patch A — lines 2675–2678.** Replace:
```
Styling is class-only. The entry loads exactly two stylesheets: Halfmoon's compiled cascade, which
carries the Bootstrap 5 utilities, components, and `[data-bs-theme]` tokens every template uses, and
the icon font, whose classes fill genuine affordance gaps while each icon-bearing control keeps its
accessible name.
```
with:
```
Styling is class-only but for one stylesheet the application writes itself. The entry loads three:
Halfmoon's compiled cascade, which carries the Bootstrap 5 utilities, components, and
`[data-bs-theme]` tokens every template uses; the icon font, whose classes fill genuine affordance
gaps while each icon-bearing control keeps its accessible name; and `app/browser/styles`, which
declares the focus ring and nothing else.
```

**Patch B — lines 2684–2686.** Replace:
```
accessibility tree with it. There is no custom stylesheet, no inline style, and no literal colour: a
`[data-bs-theme]` change on the document element rethemes the whole interface through those tokens,
which is exactly what `useTheme` writes. Bootstrap's JavaScript is never imported — its ESM bundle
```
with:
```
accessibility tree with it. There is no inline style and no literal colour, in the application's own
stylesheet as much as in its templates: a `[data-bs-theme]` change on the document element rethemes
the whole interface through those tokens, which is exactly what `useTheme` writes. Bootstrap's
JavaScript is never imported — its ESM bundle
```

**Patch C — insert after line 2694 (`first.`), as its own paragraph:**
```
The one stylesheet the application owns exists because the cascade cannot pay a bar it owes. A focus
indicator has to reach 3:1 against what it sits on, and Halfmoon draws one as the control's hover
fill plus a halo at a quarter of a colour's opacity, which lands under that bar on the neutral
outline controls in both themes; the `focus-ring-*` utilities only retint the same halo. So
`app/browser/styles` draws an opaque outline over it, coloured from `--bs-emphasis-color` so the ring
flips with the theme like everything else and sized from `--bs-focus-ring-width` so it matches the
chrome it covers. It declares no cascade layer, because the framework declares none and an unlayered
rule outranks every layered one. It is not marked important either, so a control that needs its own
ring can still take this one off.
```

**Patch D — lines 2718–2720.** Replace:
```
outline rather than the neutral one every captioned control shares: the neutral variant draws its
pressed and focused chrome from a grey the dark theme retunes below the mark bar at every surface,
while the accent is the one hue this cascade holds still across both themes.
```
with:
```
outline rather than the neutral one every captioned control shares: the neutral variant draws its
pressed chrome from a grey the dark theme retunes below the mark bar at every surface, while the
accent is the one hue this cascade holds still across both themes. Focus is no longer part of that
argument — every control now wears the same opaque ring — but the pressed state still is.
```

`guides/README.md` needs no change: its directory index already maps `app/browser` to `src/supervisor.md`, and `app/browser/styles` sits under it.

## `git status --porcelain`

```
 M app/browser/main.ts
 M app/browser/showcase.ts
 M demo/showcase.html
 M tests/app/browser/contrast.test.ts
 M tests/setupBrowser.ts
?? app/browser/styles/
```

## Deviations

None that stop the unit. `vite.config.ts` and `configs/**` are untouched — the stylesheet ships through the existing `app/browser` graph with no configuration change. Four ancillary decisions recorded and carried on from:

1. **Plain CSS, not SCSS.** `sass` is not a declared or installed dependency (`ls node_modules | grep -i sass` → empty), and adding one is forbidden. The layer mirrors the styles rule's prescribed structure in CSS: `tokens.css` as the token source of truth, one output partial, `index.css` as the sole barrel loading them. No `_theme.css`: `--bs-emphasis-color` already flips black/white under `[data-bs-theme]`, so a theme file would restate what the framework retunes.
2. **No `@layer`.** Halfmoon declares zero layers (`grep -c "@layer" halfmoon.min.css` → `0`) and an unlayered rule outranks every layered one, so a layer would lose to the very `outline: 0` these rules overrule. The styles rule's own first prohibition — verify against the shipped resolved cascade — decides this against its layer guidance, which addresses a layered dependency this project does not have.
3. **`tests/setupBrowser.ts` touched** (one import plus three comment lines). Not in the owned list and not in the off-limits list. The brief requires the tests to load the stylesheet the way the app does; that file is where the app's cascade is already loaded for tests, with a standing comment explaining why. Any other route (a barrel side-effect, an SFC import) would have been a second, different mechanism.
4. **`demo/showcase.html` regenerated.** Committed build artifact of `showcase.ts`, which I own; leaving it would have shipped a demo showing the old chrome. Produced with `npm run build:showcase` then the repo's `copy` script, not `npm run show`, to avoid a tree-wide mutating `format`.